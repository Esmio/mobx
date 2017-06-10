import React from 'react';
import styles from './DropButtonsNav.css';
import { NavBar, Icon } from 'antd-mobile';
import icon_back from '../../assets/image/icon_back.png';
import {routerRedux} from 'dva/router';

class DropButtonsNav extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			show: false,
			buttonIndex: '0'
		}
		this.handleBackClick = this.handleBackClick.bind(this)
		this.handleCenterClick = this.handleCenterClick.bind(this)
		this.handleButtonClick = this.handleButtonClick.bind(this)
		this.handleShadeClick = this.handleShadeClick.bind(this)
	}
	handleBackClick(){
		const {dispatch} = this.props;
		dispatch(routerRedux.goBack())
	}
	static defaultProps = {
		buttons: ['全部订单', '中奖订单', '待开奖订单', '未中奖订单', '已开奖订单'],
		type: 'getOrdersList'
	}
	handleCenterClick(){
		this.setState({show: !this.state.show})
	}
	handleButtonClick(e){
		const {dispatch, type} = this.props;
		let {index, button} = e.target.dataset;
		this.setState({title: button, show: !this.state.show, buttonIndex: index})
		dispatch({type: `mine/${type}`, payload: index})
	}
	handleShadeClick(){
		this.setState({show: !this.state.show})
	}
	componentWillMount() {
		const defaultTitle = this.props.buttons[0]
		this.setState({title: defaultTitle})
	}
	_renderButtons(){
		const {buttons} = this.props
		const {buttonIndex} = this.state
		let border = '.01rem solid red';
		let nodes =  buttons.map((button, index)=>{
			return <span 
				className={styles.button} 
				key={index} 
				data-button={button}
				data-index={index}
				style={{border: buttonIndex == index ? border : ''}}
				onClick={this.handleButtonClick}>
				{button}
			</span>
		})
		return nodes
	}
	render() {
		let display = this.state.show ? 'flex' : 'none'
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
								background: `url(${icon_back}) center center / 0.32rem 0.56rem no-repeat`
							}}
							onClick={this.handleBackClick}
						/>
	     		]}>
		     	<div className={styles.center} onClick={this.handleCenterClick}>
		     		{this.state.title}
		     		<span className={styles.titleArrow}></span>
		     	</div>
	     	</NavBar> 
	     	<div className={styles.dropbox} style={{ display : display }}>
	     		{this._renderButtons()}
	     	</div>
	     	<div className={styles.shade} style={{ display : display }} onClick={this.handleShadeClick}></div>
	    </div>
	  )
	}
}

export default DropButtonsNav;
