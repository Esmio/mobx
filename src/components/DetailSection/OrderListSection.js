import React from 'react';
import styles from './OrderListSection.css';
import {isEmpty} from '../../common/tools';
import {routerRedux} from 'dva/router';

class OrderListSection extends React.Component {
	constructor(props) {
		super(props);
		this._renderLists = this._renderLists.bind(this)
		this.handleItemClick = this.handleItemClick.bind(this)
	}
	handleItemClick(e){
		const {dispatch} = this.props
		while(!e.target.dataset.uuid){
			e.target = e.target.parentNode
		}
		let {uuid} = e.target.dataset
		dispatch({type: 'mine/getOrderDetail', payload: uuid})
	}
	_renderLists(){
		const {ordersList} = this.props
		console.log('ordersList', ordersList)
		if(isEmpty(ordersList)) return null
		let nodes = ordersList.map((item, index)=>{
			const {bettingTime, 
				gameIssueNo, 
				gameNameInChinese, 
				totalUnits, 
				transactionAmount, 
				transactionState, 
				transactionTimeuuid, 
				winAmount} = item;
			let state = transactionState === 'LOSS' ? '未中奖' : `中${winAmount}元`
			let color = ''
			switch(transactionState){
				case 'LOSS' : {
					state = '未中奖';
					break;
				}
				case 'PENDING' : {
					state = '待开奖';
					break;
				}
				case 'WIN' : {
					state = `中${winAmount}元`;
					color = 'red';
					break;
				}

			}
			return <div className={styles.item}
				key={index} 
				data-uuid={transactionTimeuuid}
				onClick={this.handleItemClick}>
				<div className={styles.left}>
					<span className={styles.up}>{gameNameInChinese}</span>
					<span className={styles.down}>共{totalUnits}注</span>
				</div>
				<div className={styles.center}>
					<span className={styles.up}>第{gameIssueNo}期</span>
					<span className={styles.down}>{bettingTime}</span>
				</div>
				<div className={styles.right}>
					<span className={styles.money}>{transactionAmount.toFixed(2)}元</span>
					<span className={styles.result} style={{color}}>{state}</span>
				</div>
			</div>
		})
		return nodes
	}
	render() {
		const {ordersList} = this.props
		return (
		    <div className={styles.normal}>
		      {this._renderLists()}
		    </div>
		);
	}
  
}

export default OrderListSection;
