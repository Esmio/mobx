import React from 'react';
import styles from './BetSuccessNav.css';
import { NavBar } from 'antd-mobile';
import icon_back from '../../assets/image/icon_back.png';
import {routerRedux} from 'dva/router';

class BetSuccessNav extends React.Component {
	constructor(props) {
		super(props);

		this.handleBackClick = this.handleBackClick.bind(this)
	}
	handleBackClick() {
		const {dispatch} = this.props;
		console.log(dispatch);
		dispatch(routerRedux.goBack(-2))
	}
	render() {
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
	     		<span style={{color: '#fff', fontSize: '.38rem'}}>{"投注成功"}</span>
	     	</NavBar>
	    </div>
		);
	}
}

export default BetSuccessNav;
