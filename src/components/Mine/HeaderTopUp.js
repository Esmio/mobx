import React from 'react';
import styles from './HeaderTopUp.css';
import img_user from '../../assets/image/user_default_icon.png';
import {routerRedux} from 'dva/router';

// images
import img_eye_open from '../../assets/image/icon_eye.png';
import img_eye_close from '../../assets/image/icon_eye2.png';


class HeaderTopUp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hideMoney: false,
			balance: 0,
			username: ''
		}
		this.handleEyeOpen = this.handleEyeOpen.bind(this)
		this.handleRefreshMoney = this.handleRefreshMoney.bind(this);
		this.handleSettingClick = this.handleSettingClick.bind(this);
	}
	componentWillMount() {
		const {loginData} = this.props;
		if(!loginData) return null;
		const {username, balance} = loginData;
		this.setState({
			username,
			balance
		})
	}
	handleEyeOpen() {
		this.setState({
			hideMoney: !this.state.hideMoney
		})
	}
	handleRefreshMoney() {
		const {dispatch} = this.props;
		dispatch({type: 'mine/refresh'})
	}
	handleSettingClick(){
		const {dispatch} = this.props;
		dispatch(routerRedux.push({
			pathname: '/settings'
		}))
	}
  render() {
  	const {balance, username} = this.state;
  	let eyeImg = this.state.hideMoney ? img_eye_close : img_eye_open;
  	let eyeStyle = {
  		backgroundImage: `url(${eyeImg})`,
  		backgroundPostion: '0 0',
  		backgroundRepeat: 'no-repeat',
  		backgroundSize: '100%'
  	}
  	return (
	    <div className={styles.normal}>
	    	<div className={styles.profileHeader}>
				<div className={styles.setting} onClick={this.handleSettingClick}>
	    		</div>
	    		<div className={styles.info}>
			   		<img className={styles.profileIcon} src={img_user}/>
		    		<span className={styles.username}>{username}</span>			
	    		</div>
	    	</div>
	    	<div className={styles.balance}>
	    		<div className={styles.balanceWrapper}>
	    			<span className={styles.money}>{ this.state.hideMoney ? '******' :  balance}</span>
	    			<span className={styles.moneyIcon}
	    				onTouchEnd={this.handleEyeOpen}
	    			 	style={eyeStyle}></span>
	    			<span className={styles.refreshMoney} onClick={this.handleRefreshMoney}>刷新余额</span>
	    		</div>
	    	</div>
	    	<div className={styles.cashValue}>
	    		<div className={styles.topUp}>
	    			<span className={styles.topUpIcon}></span>
	    			<span className={styles.topUpText}>充值</span>
	    		</div>
	    		<div className={styles.withdraw}>
	    			<span className={styles.withdrawIcon}></span>
	    			<span className={styles.withdrawText}>提款</span>
	    		</div>
	    	</div>
	    </div>
	  );
  }
  
}

export default HeaderTopUp;
