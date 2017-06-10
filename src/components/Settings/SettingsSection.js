import React from 'react';
import styles from './SettingsSection.css';
import img_tool_agreement from '../../assets/image/tool_agreement.png';
import img_tool_about from '../../assets/image/tool_about.png';
import {routerRedux} from 'dva/router'


class SettingsSection extends React.Component {
	constructor(props) {
		super(props);
		this.handleAboutClick = this.handleAboutClick.bind(this)	
		this.handleAgreementClick = this.handleAgreementClick.bind(this)
		this.handleLogoutClick = this.handleLogoutClick.bind(this)
	}
	handleAboutClick() {
		const {dispatch} = this.props
		dispatch(routerRedux.push({
			pathname: 'aboutus'
		}))
	}
	handleAgreementClick() {
		const {dispatch} = this.props;
		dispatch(routerRedux.push({
			pathname: 'agreement'
		}))
	}
	handleLogoutClick(){
		const {dispatch} = this.props;
		dispatch({type: 'login/loginout'})
	}
  render() {
  	return (
	    <div className={styles.normal}>
	    	<div className={styles.item} onClick={this.handleAgreementClick}>
	          <img src={img_tool_agreement} className={styles.icon} />
	          <span className={styles.itemName}>法律声明</span>
	          <span className={styles.iconNext}></span>
	        </div>
	        <div className={styles.item} onClick={this.handleAboutClick}>
	          <img src={img_tool_about} className={styles.icon} />
	          <span className={styles.itemName}>关于我们</span>
	          <span className={styles.iconNext}></span>
	        </div>
		    <input className={styles.button} type='button' value='退出登录' onClick={this.handleLogoutClick} />
	    </div>
	  );
  }
}

export default SettingsSection;
