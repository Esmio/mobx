import React from 'react';
import styles from './LineItem.css';
import {routerRedux} from 'dva/router';

class LineItem extends React.Component {
	constructor(props) {
		super(props);
		this.handleItemClick = this.handleItemClick.bind(this);
	}
	handleItemClick(e){
		const {dispatch} = this.props
		while(!e.target.dataset.id){
			e.target = e.target.parentNode;
		}
		const {id, action, color, time, income, payment} = e.target.dataset
		let singleDetailData = {id, action, color, time, income, payment};
		dispatch({type: 'mine/save' , payload: {singleDetailData}})
		dispatch(routerRedux.push({
			pathname: '/single'
		}))
	}
	render() {
		const payment = {
			"ALIPAY_TOPUP" : "支付宝支付",
			"MANUAL_TOPUP" : "手工充值",
			"WECHAT_TOPUP" : "微信支付",
			"BANK_TRANSFER_WITHDRAWAL" : "银行取款"
		}
		const {id, action, color, time, income, actionState, type, subType, dispatch} = this.props;
		return (
	    <div className={styles.item}
						 data-id = {id} 
						 data-action = {action}
						 data-color ={color}
						 data-time = {time}
						 data-income = {type + ' ' + income}
						 data-payment = {payment[subType]}
						 onClick={this.handleItemClick}>
				<div className={styles.left}>
					<span className={styles.up}>
						<span className={styles.action}>
							{action}
							{actionState ? <span className={styles.actionStateWrap}> (<span className={styles.actionState}>{actionState}</span>)</span> : null}
						</span>
						<span className={styles.amouts}><span className={styles.number} style={{color}}>{type} {income} </span>元</span>
					</span>
					<span className={styles.down}>
						<span className={styles.date}>{time}</span>
					</span>
				</div>
				<div className={styles.right}></div>
			</div>
	  );
	}
}

export default LineItem;
