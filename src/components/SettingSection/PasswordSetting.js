import React from 'react';
import styles from './PasswordSetting.css';
import img_tools_password from '../../assets/image/tools_password.png';
import img_tools_password2 from '../../assets/image/tools_password2.png';
import {routerRedux} from 'dva/router'

class PasswordSetting extends React.Component {
	constructor(props) {
		super(props);
		this.handleloginClick = this.handleloginClick.bind(this)
		this.handleTransactionClick = this.handleTransactionClick.bind(this)
	}
	handleloginClick(){
		const {dispatch} = this.props
		console.log('login', dispatch)
		dispatch(routerRedux.push({
			pathname: 'passwordreset',
			query: {i: 0}
		}))
	}
	handleTransactionClick(){
		const {dispatch} = this.props
		dispatch(routerRedux.push({
			pathname: 'passwordreset',
			query: {i: 1}
		}))
	}
	render() {
		return (
	    <div className={styles.normal}>
	      <div className={styles.item} onClick={this.handleloginClick}>
		      <img src={img_tools_password} className={styles.icon} />
		      <span className={styles.itemName}>登录密码</span>
		      <span className={styles.iconNext}></span>
		    </div>
		    <div className={styles.item} onClick={this.handleTransactionClick}>
		      <img src={img_tools_password2} className={styles.icon} />
		      <span className={styles.itemName}>交易密码</span>
		      <span className={styles.iconNext}></span>
		    </div>
	    </div>
	  );
	}
}

export default PasswordSetting;
