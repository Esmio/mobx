import React from 'react';
import styles from './TrendNav.css';
import { NavBar, Icon } from 'antd-mobile';
import icon_back from '../../assets/image/icon_back.png';
import {routerRedux} from 'dva/router';

class TrendNav extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			show: false,
			curId: ''
		}
		this.handleBackClick = this.handleBackClick.bind(this)
		this.handleRightClick = this.handleRightClick.bind(this)
		this.handleShadeClick = this.handleShadeClick.bind(this)
		this._renderButtons = this._renderButtons.bind(this)
		this.handleButtonClick = this.handleButtonClick.bind(this)
	}
	static defaultProps = {
		lotto : [
			{'HF_BJPK10' : '北京PK拾'},
			{'HF_LFPK10' : '二分PK拾'},
			{'HF_CQSSC' : '重庆时时彩'},
			{'HF_LFSSC' : '二分时时彩'},
			{'HF_TJSSC' : '天津时时彩'},
			{'HF_XJSSC' : '新疆时时彩'},
			{'HF_AHD11' : '安徽11选5'},
			{'HF_GDD11' : '广东11选5'},
			{'HF_JXD11' : '江西11选5'},
			{'HF_SDD11' : '山东11选5'},
			{'HF_SHD11' : '上海11选5'},
			{'HF_SHSSL' : '上海时时乐'},
			{'PL3' : '排列三'},
			{'X3D' : '福彩3D'},
			{'HF_AHK3' : '安徽快3'},
			{'HF_GXK3' : '广西快3'},
			{'HF_JSK3' : '江苏快3'}
		]
	}
	componentWillMount() {
		let id = /Id=(.*)($|&)/.exec(location.search)[1]
		this.setState({curId: id})
	}
	changeTitle(){
		let {lotto} = this.props
		lotto.map((item, index)=>{
			for(let key in item){
				if(key === id){
					document.title=item[key]
				}
			}
		})
	}
	handleBackClick(){
		const {dispatch} = this.props;
		location.href = '/home'
	}
	handleRightClick(){
		this.setState({show: !this.state.show})
	}
	handleShadeClick(){
		this.setState({show: !this.state.show})
	}
	handleButtonClick(e){
		const {dispatch} = this.props
		const {id} = e.target.dataset
		const {curId, show} = this.state;
		let queryStr = location.search
		queryStr = queryStr.replace(curId, id)
		this.setState({curId: id, show:!show})
		dispatch(routerRedux.push({
			pathname: 'trend',
			search: queryStr
		}))
		location.reload()
	}
	_renderButtons(){
		const {lotto} = this.props;
		if(!lotto) return null
		const {curId} = this.state
		let nodes = lotto.map((item, index)=>{
			for(let key in item){
				let borderColor = key === curId ? 'red' : ''
				return <span key={key}
					className={styles.button} 
					data-id={key}
					style={{borderColor}}
					onClick={this.handleButtonClick}>
					{item[key]}
				</span>
			}
		})
		return nodes
	}
	render() {
		const {title} = this.props
		return (
	    <div className={styles.normal}>
	      	<NavBar 
	     		mode="light"
	     		style={{background: 'none', color: '#fff', fontWeight: "600", height: ".9rem", fontFamily: 'MicroSoft Yahei'}}
	     		iconName={false}
	     		leftContent={[
	     			<div key='1' style={{
						width: '0.33rem',
						height: '0.57rem',
						background: `url(${icon_back}) center center /  0.32rem 0.56rem no-repeat`}}
						onClick={this.handleBackClick}
					/>
	     		]}
	     		rightContent={[
					<span key='2' className={styles.rightName} onClick={this.handleRightClick}>彩种</span>
	     		]}
	     	><span style={{color: '#fff', fontSize: '.42rem'}}>{title}</span></NavBar>
	     	{this.state.show ? <div className={styles.box}>
	     		<div className={styles.header}>选择彩种</div>
	     		<div className={styles.content}>
	     			{this._renderButtons()}
	     		</div>
	     	</div> : null}
	     	{this.state.show ? <div className={styles.shade} onClick={this.handleShadeClick}></div> : null}
	    </div>
	  );
	}
  
}

export default TrendNav;
