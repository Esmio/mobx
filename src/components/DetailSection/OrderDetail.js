import React from 'react';
import styles from './OrderDetail.css';
import {isEmpty} from '../../common/tools';
import {routerRedux} from 'dva/router';


class OrderDetail extends React.Component {
  constructor(props) {
		super(props);
		this._renderLists = this._renderLists.bind(this)
		this.handleItemClick = this.handleItemClick.bind(this)
	}
	handleItemClick(e){
		const {dispatch} = this.props
		while(!e.target.dataset.index){
			e.target = e.target.parentNode
		}
		let {index} = e.target.dataset;
		console.log('index', index)
		dispatch(routerRedux.push({
			pathname: 'suborderdetail',
			query: {index}
		}))
	}
	_renderLists(){
		const {orderDetailData} = this.props
		if(isEmpty(orderDetailData)) return null
		let {subOrders, orderInfo} = orderDetailData
		let {gameNameInChinese} = orderInfo
		let nodes = subOrders.map((item, index)=>{
			let {bettingAmount, gameMethodInChinese, totalUnits, transactionState, winningAmount} = item
			let color = transactionState === 'WIN' ? 'red' : '';
			let stateDict = {
				'LOSS' : '未中奖',
				'PENDING' : '待开奖',
				'WIN' : `中${winningAmount}元`
			}
			let state = stateDict[transactionState];
			return <div className={styles.item}
				key={index}
				data-index={index}
				onClick={this.handleItemClick}>
				<div className={styles.left}>
					<span className={styles.up}>{gameNameInChinese}</span>
					<span className={styles.down}>共{totalUnits}注</span>
				</div>
				<div className={styles.center}>
					<span className={styles.centerUp}>{gameMethodInChinese}</span>
					<span className={styles.down} style={{color: '#fff'}}>{'|'}</span>
				</div>
				<div className={styles.right}>
					<span className={styles.money}>{bettingAmount.toFixed(2)}元</span>
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

export default OrderDetail;
