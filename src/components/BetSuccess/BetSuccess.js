import React from 'react';
import styles from './BetSuccess.css';
import {routerRedux} from 'dva/router'

class BetSuccess extends React.Component {
	constructor(props) {
		super(props);
		this.handleConfirmClick = this.handleConfirmClick.bind(this);
	}
	handleConfirmClick() {
		const {dispatch} = this.props;
		dispatch(routerRedux.goBack());
		dispatch({type: 'betresults/clearList'})
	}
	render() {
		const {current} = this.props;
		console.log(current)
		const {gameNameInChinese, uniqueIssueNumber} = current;
		return (
	  	<div className={styles.normal}>
	      <div className={styles.main}>
	      	<div className={styles.successIcon}></div>
	      	<div className={styles.successText}>投注成功，祝您中奖！</div>
	      	<div className={styles.currentLottery}>当前投注彩种：{gameNameInChinese}</div>
	      	<div className={styles.IssueNumber}>当前投注期数：第{uniqueIssueNumber}期</div>
	      </div>
	      <div className={styles.button} onClick={this.handleConfirmClick}>确定</div>
	    </div>
	 	);
	}
}

export default BetSuccess;
