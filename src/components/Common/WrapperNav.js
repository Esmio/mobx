import React from 'react';
import styles from './WrapperNav.css';
import { NavBar, Icon } from 'antd-mobile';
import icon_back from '../../assets/image/icon_back.png';
import {routerRedux} from 'dva/router';

class WrapperNav extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: ''
		}
		this.handleBackClick = this.handleBackClick.bind(this)

	}
	handleBackClick(){
		const {dispatch} = this.props;
		dispatch(routerRedux.goBack())
		location.reload()
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
	     		rightContent={title === '基本走势' ? [
					<span  className={styles.rightName} onClick={this.handleRightClick}>彩种</span>
	     		] : ''}
	     	><span style={{color: '#fff', fontSize: '.42rem', letterSpacing: '.04rem'}}>{title}</span></NavBar>
	    </div>
	  );
	}
}

export default WrapperNav;
