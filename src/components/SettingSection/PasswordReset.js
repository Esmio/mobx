import React from 'react';
import styles from './PasswordReset.css';
import {showToast} from '../../common/globalToasts';

class PasswordReset extends React.Component {
	constructor(props) {
		super(props);
		this.handleXClick = this.handleXClick.bind(this)
		this.handleConfirmClick = this.handleConfirmClick.bind(this)
		this.handleOldChange = this.handleOldChange.bind(this)
		this.handleNewPwdChange = this.handleNewPwdChange.bind(this)
		this.handleAgainChange = this.handleAgainChange.bind(this)
	}
	state = {
		show: true,
		mode: "",
		newPassword: "", 
		password: "",
		again: ""
	}
	static defaultProps = {
		dict : {
			'PASSWORD' : {
				old: '旧密码',
				newPwd: '新密码（6-15位）',
				again: '再次输入新密码'
			},
			'SECURITY_PASSWORD' : {
				old: '请输入旧密码',
				newPwd: '请输入新密码',
				again: '确定密码'
			} 
		}
	}
	handleConfirmClick(){
		let {password, newPassword, again} = this.state
		let {mode, dispatch} = this.props
		password = password.trim()
		newPassword = newPassword.trim()
		again = again.trim()
		console.log('mode',mode)
		if(password === '' || newPassword === '' || again === '' ){
			showToast('输入不可为空！')
			return false;
		} 
		if(mode==="PASSWORD"){
			if(newPassword < 6 || newPassword > 15){
				showToast('密码需在6-15位之间！')
				return false;
			}
		}else if(mode==="SECURITY_PASSWORD"){
			if(password.length!==4 || newPassword.length !== 4){
				showToast('请输入4位取款密码！')
			}
		}
		if(newPassword !== again){
			showToast('两次输入密码不一致！')
			return false;
		}
		
		let postData = {"mode":mode, "password":password, "newPassword":newPassword}
		dispatch({type: 'mine/restPassword', payload: {postData}})
	}
	handleXClick(){
		this.setState({show: !this.state.show})
	}
	handleOldChange(e){
		this.setState({password: e.target.value})
	}
	handleNewPwdChange(e){
		this.setState({newPassword: e.target.value})
	}
	handleAgainChange(e){
		this.setState({again: e.target.value})
	}
	_renderTips(){
		return <div className={styles.tips}>交易密码会影响到您的充值和提现，请谨慎填写！
			<span className={styles.xbutton} onClick={this.handleXClick}></span>
		</div>
	}
	render() {
		let {mode, dict} = this.props;
		let {old, newPwd, again} = dict[mode];
		return (
		    <div className={styles.normal}>
		    	{mode === 'SECURITY_PASSWORD' && this.state.show ? this._renderTips() : null}
				<div className={styles.old}>
					<input type="text" type="password" placeholder={old} onChange={this.handleOldChange}/>
				</div>
				<div className={styles.newPwd}>
					<input type="text" type="password" placeholder={newPwd} onChange={this.handleNewPwdChange}/>
				</div>
				<div className={styles.again}>
					<input type="text" type="password" placeholder={again} onChange={this.handleAgainChange}/>
				</div>
				<div className={styles.button} onClick={this.handleConfirmClick}>确定</div>
		    </div>
		)
	}
}

export default PasswordReset;
