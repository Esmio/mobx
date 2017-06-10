import React from 'react';
import styles from './RegisterSection.css';
import { Button, Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';

class RegisterSection extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			agree: false
		}
		this.handleUsername = this.handleUsername.bind(this);
		this.handlePassword = this.handlePassword.bind(this);
		this.handleButtonClick = this.handleButtonClick.bind(this);
		this.loadingToast = this.loadingToast.bind(this);
		this.handleAgreeClick = this.handleAgreeClick.bind(this);
		this.handleFreeTrialClick = this.handleFreeTrialClick.bind(this);
		this.handleQuickLogin = this.handleQuickLogin.bind(this);
	}
	handleButtonClick() {
		const { dispatch } = this.props;
		const {username, password} = this.state;
		let params = {username, password}
		dispatch({type: 'login/register', payload: params})
	}
	handleUsername(e) {
		this.setState({
			username: e.target.value
		})
	}
	handlePassword(e) {
		this.setState({
			password: e.target.value
		})
	}
	loadingToast() {
		const {agree} = this.state
		console.log(agree)
		if(!agree) return false
	  Toast.loading('', 1, this.handleButtonClick, true);
	}
	handleAgreeClick(){
		let {agree} = this.state
		this.setState({agree: !agree})
	}
	handleFreeTrialClick(){
		const {dispatch} = this.props
		dispatch(routerRedux.push({
			pathname: '/login'
		}))
	}
	handleQuickLogin(){
		const {dispatch} = this.props
		dispatch(routerRedux.push({
			pathname: '/login'
		}))
	}
	render() {
		const {agree} = this.state
		return (
	    <div className={styles.normal}>
	    	<div className={styles.username}>
	    		<input type='text' defaultValue='' onChange={this.handleUsername} placeholder={'用户名(手机号,字母或数字[4-12位])'}/>    		
	    	</div>
	    	<div className={styles.password}>
	    		<input type='password' defaultValue='' onChange={this.handlePassword} placeholder={'密码(6-15位字母或数字)'}/>    	
	    	</div>
	    	<div className={styles.password}>
	    		<input type='password' defaultValue='' onChange={this.handlePassword} placeholder={'再次输入密码'}/>    	
	    	</div>
	    	<div className={styles.password}>
	    		<input type='password' defaultValue='' onChange={this.handlePassword} placeholder={'推荐人(选填)'}/>    	
	    	</div>
	    	<div className={styles.agree}>
	    		<span className={styles.icon} style={{backgroundColor: agree ? '#00B72B' : '#ddd'}} onClick={this.handleAgreeClick}></span><span>我已看过并同意《<a className={styles.doclink}>用户购彩服务协议</a>》</span>
	    	</div>
	    	<input className={styles.button} style={{backgroundColor: agree ? '#1c378a' : '#ddd'}} type='button' value='立即注册' onClick={this.loadingToast}/>
	    	<input className={styles.trialButton} type='button' value='免费试玩' onClick={this.handleFreeTrialClick}/>
	    	<div className={styles.links}>
	    		<a onClick={this.handleQuickLogin}>快速登录 ></a>
	    		<a>忘记密码 ?</a>
	    	</div>
	    </div>
	  )
	}
}

export default RegisterSection;
