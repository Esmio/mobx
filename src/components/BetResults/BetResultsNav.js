import React from 'react';
import styles from './BetResultsNav.css';
import { NavBar } from 'antd-mobile';
import icon_back from '../../assets/image/icon_back.png';
import {routerRedux} from 'dva/router';


class BetResultsNav extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			countTime: 0
		}
		this.handleBackClick = this.handleBackClick.bind(this)
	}
	componentWillMount() {
		const {dispatch, current} = this.props;
		const {stopOrderTimeEpoch} = current;
		let timestamp = new Date().getTime();
		timestamp = parseInt(timestamp/1000);
		let countTime = stopOrderTimeEpoch - timestamp;
		this.setState({countTime})
	}
	componentWillUnmount() {
		clearTimeout(this.timer)
	}
	componentDidMount() {
		this.countDown()
	}
	handleBackClick() {
		const {dispatch} = this.props;
		dispatch(routerRedux.goBack());
	}
	countDown() {
		let {countTime} = this.state
		if(countTime <= 0) {
			countTime = 0
		}else{
			countTime--
		}
		this.setState({countTime})
		this.timer = setTimeout(()=>{
			this.countDown();
		},1000)
	}
	getTimeStr() {
		let {countTime} = this.state,
			hour = parseInt(countTime/3600),
			hourLeft = countTime%3600,
			minute = parseInt(hourLeft/60),
			second = hourLeft%60;
		hour = this.checkStr(hour,2);
		minute = this.checkStr(minute,2);
		second = this.checkStr(second,2);
		let timeStr = `${hour}:${minute}:${second}`;
		return timeStr;
	}
	checkStr(str, length) {
		return str.toString().length < length ? ('0' + str) : str;
	}
	render() {
		let {current} = this.props;
		let {gameNameInChinese, planNo, stopOrderTimeEpoch} = current;
		planNo = this.checkStr(planNo, 3)
		let timeStr = this.getTimeStr()
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
		     		]}>
		     		<span style={{color: '#fff', fontSize: '.38rem'}}>{gameNameInChinese}</span>
		     	</NavBar>
		     	<div className={styles.banner}>距{planNo}期截止  <span className={styles.bannerText}>{timeStr}</span></div>
		    </div>
		  );
	}
  
}

export default BetResultsNav;
