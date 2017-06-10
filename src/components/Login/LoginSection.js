import React from 'react';
import styles from './LoginSection.css';
import { Button, Toast } from 'antd-mobile';

class LoginSection extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		}
		this.handleUsername = this.handleUsername.bind(this);
		this.handlePassword = this.handlePassword.bind(this);
		this.handleButtonClick = this.handleButtonClick.bind(this);
		this.loadingToast = this.loadingToast.bind(this);
	}
	handleButtonClick() {
		const { dispatch } = this.props;
		const params = this.state
		dispatch({type: 'login/login', payload: params})
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
	  Toast.loading('', 1, this.handleButtonClick, true);
	}
	render() {
		return (
	    <div className={styles.normal}>
	    	<div className={styles.username}>
	    		<input type='text' defaultValue='' onChange={this.handleUsername}/>    		
	    	</div>
	    	<div className={styles.password}>
	    		<input type='password' defaultValue='' onChange={this.handlePassword}/>    	
	    	</div>
	    	<input className={styles.button} type='button' value='登录' onClick={this.loadingToast}/>
	    	<div className={styles.links}>
	    		<a>立即注册 ></a>
	    		<a>忘记密码 ?</a>
	    	</div>
	    </div>
	  )
	}
  
}

export default LoginSection;
