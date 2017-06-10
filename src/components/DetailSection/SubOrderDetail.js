import React from 'react';
import styles from './SubOrderDetail.css';
import Clipboard from 'clipboard';
import {showToast} from '../../common/globalToasts';


class SubOrderDetail extends React.Component {
	constructor(props) {
		super(props);
	}
	handleCopyClick(){
		showToast('已复制！')
	}
	getOriginalData(){
		const {orderDetailData} = this.props
		let {orderInfo, subOrders} = orderDetailData;
		let index = /index=(.*)$/.exec(location.search)[1]
		let curOrder = subOrders[index]
		return {curOrder, orderInfo}
	}
	_renderHeader(){
		let {curOrder, orderInfo} = this.getOriginalData()
		let {drawNumber, gameIssueNo, gameNameInChinese, gameUniqueId, transactionState, transactionTimeuuid} = orderInfo;
		let lotteryIconStr = localStorage.getItem("lotteryIconStr");
		let lotteryIcon = JSON.parse(lotteryIconStr);
		let {gameMethodInChinese, bettingAmount} = curOrder;
		drawNumber = transactionState === 'PENDING' ? '未开奖' : drawNumber;
		return <div className={styles.header}>
			<div className={styles.icon}>
				<img src={lotteryIcon[gameUniqueId]} alt="icon"/>
			</div>
			<div className={styles.right}>
				<span className={styles.title}>{gameNameInChinese}(<span className={styles.game}>{gameMethodInChinese}</span>)</span>
				<span className={styles.issue}>第 {gameIssueNo} 期</span>
				<span className={styles.result}>开奖号码：<span className={styles.number}>{drawNumber}</span></span>
			</div>
		</div>
	}
	_renderContentLine(){
		let {curOrder, orderInfo} = this.getOriginalData()
		let {drawNumber, transactionTimeuuid, bettingTime} = orderInfo;
		let {gameMethodInChinese, bettingAmount, totalUnits, rebate, transactionState, winningAmount} = curOrder;
		let color = transactionState === 'WIN' ? 'red' : '';
		let stateDict = {
			'LOSS' : '未中奖',
			'PENDING' : '待开奖',
			'WIN' : `中${winningAmount}元`
		}
		let state = stateDict[transactionState];
		let hide = transactionTimeuuid
		hide = hide.replace(hide.substring(6, 33),'******')
		const order = [
			{name: '订单号', text: hide, copy: true},
			{name: '投注金额', text: bettingAmount.toFixed(2)+' 元'},
			{name: '投注注数', text: totalUnits+ ' 注'},
			{name: '投注返水', text: rebate+ ' 元'},
			{name: '投注时间', text: bettingTime},
			{name: '是否中奖', text: state, color}
		]
		let nodes = order.map((item, index)=>{
			let {name, text, copy, color} = item
			return <div className={styles.line} key={index}>
				<span className={styles.name}>{name}</span>
				<span className={styles.text} style={{color}}>{text}</span>
				{copy ? <span className={styles.copy} id='copy' data-clipboard-target="#hide" onClick={this.handleCopyClick}>
					复制
					<input type="text" id='hide' defaultValue={transactionTimeuuid} style={{opacity: '0', position: 'fixed', zIndex:'-1'}}/>
				</span> : null}
			</div>
		})
		return nodes
	}
	_renderContent(){
		let {curOrder} = this.getOriginalData()
		let {betString, bettingAmount, transactionState, winningAmount} = curOrder;
		let color = transactionState === 'WIN' ? 'red' : '';
		let stateDict = {
			'LOSS' : '未中奖',
			'PENDING' : '待开奖',
			'WIN' : `中${winningAmount}元`
		}
		let state = stateDict[transactionState];
		return <div className={styles.content}>
			<div className={styles.order}>
				<div className={styles.hint}>订单内容</div>
				{this._renderContentLine()}
			</div>
			<div className={styles.bet}>
				<div className={styles.hint}>投注号码</div>
				<div className={styles.table}>
					<div className={styles.row}>
						<span className={styles.up}>投注号码</span>
						<span className={styles.down}>09|11</span>
					</div>
					<div className={styles.row}>
						<span className={styles.up}>投注金额</span>
						<span className={styles.down}>2.00</span>
					</div>
					<div className={styles.row}>
						<span className={styles.up}>中奖情况</span>
						<span className={styles.down} style={{color}}>{state}</span>
					</div>
				</div>
			</div>
		</div>
	}
	componentDidMount() {
		new Clipboard('#copy')
	}
	handleButtonClick(){
		console.log('one more')
	}
	render() {
		return (
	    <div className={styles.normal}>
	    	{this._renderHeader()}
	    	{this._renderContent()}
	      <div className={styles.button} onClick={this.handleButtonClick}>再来一注</div>
	    </div>
	  );
	}
}

export default SubOrderDetail;
