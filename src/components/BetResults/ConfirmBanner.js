import React from 'react';
import styles from './ConfirmBanner.css';
import {routerRedux} from 'dva/router';

class ConfirmBanner extends React.Component {
	constructor(props) {
		super(props);

		this.handleClearClick = this.handleClearClick.bind(this)
		this.handleConfirm = this.handleConfirm.bind(this)
	}
	handleClearClick() {
		const {dispatch} = this.props;
		dispatch({type: 'betresults/clearList'})
	}
	handleConfirm() {
		const {dispatch, betList, current} = this.props;
		const {sum, moneySum} = this.caculateTotal()
		const {gameUniqueId, uniqueIssueNumber} = current
		let betJSON = {
		  betEntries: betList,
		  drawIdentifier: {
		    gameUniqueId,
		    issueNum: uniqueIssueNumber
		  },
		  numberOfUnits: sum,
		  purchaseInfo: {
		    purchaseType: "METHOD_UNDEFINED"
		  },
		  totalAmount: moneySum,
		  userSubmitTimestampMillis: +new Date()
		}
		dispatch({type: 'mine/checkBalance', payload: betJSON})
	}
	caculateTotal() {
		const {betList} = this.props;
		let sum=0, moneySum=0;
		betList.map((item, index)=>{
			let {numberOfUnits, amount} = item;
			sum += numberOfUnits
			moneySum += amount
		})
		return {sum, moneySum};
	}
	render() {
		const {sum, moneySum} = this.caculateTotal()		
		return (
	      <div className={styles.normal}>
	        <div className={styles.clear} onClick={this.handleClearClick}>清空列表</div>
	        <div className={styles.result}>
	          <span className={styles.betResult}><b className={styles.money}>共{moneySum}元</b></span>
	          <span className={styles.betNum}>共{sum}注</span>
	        </div>
	        <div className={styles.button} onClick={this.handleConfirm}>付款</div>
	      </div>
	    );
	}
}

export default ConfirmBanner;
