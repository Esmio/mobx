import React from 'react';
import styles from './BetConfirm.css';
import {getGameMathKeyWithTitle} from '../../data/playMathConfig';
import {routerRedux} from 'dva/router';

class BetConfirm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedLeft: 0,
			index: '1',
			rangePercents: 0.0,
			moneyInput: 2
		}
		this.handleCancleClick = this.handleCancleClick.bind(this)
		this.handleTouchMove = this.handleTouchMove.bind(this)
		this.handleWagerClick = this.handleWagerClick.bind(this)
		this.handleInputOnChange = this.handleInputOnChange.bind(this)
		this.handleConfirmClick = this.handleConfirmClick.bind(this)
	}
	componentWillUnmount() {
		const {dispatch} = this.props;
		dispatch({type: 'play/clearResult'})
		dispatch({type: 'play/betConfirmDisplay', payload: {betConfirmDisplay: 'none'}})
	}
	handleCancleClick() {
		const {dispatch, number} = this.props;
		dispatch({type: 'play/betConfirmDisplay', payload: {betConfirmDisplay: 'none', number}})
	}
	//自选确认
	handleConfirmClick() {
		const {dispatch, betStr, number, gameMathString, gameUniqueId, countData} = this.props;
		const { moneyInput, index } = this.state
		const {current} = countData
		let unit = parseInt(index)
		let money = (moneyInput/unit).toFixed(2);
		let amount = money * number;
		let mathKey = getGameMathKeyWithTitle(gameMathString, gameUniqueId);
		const {rebateOriginal} = this.getOddsAndRebate()
		let betItem = {
			amount,
			betString : betStr,
			gameplayMethod : mathKey,
			numberOfUnits : number,
			pricePerUnit : parseFloat(money),
			returnMoneyRatio : parseFloat(rebateOriginal)/100,
			gameMathString
		}
		console.log(betItem)
		dispatch({type: 'betresults/saveBetList', payload: {current, betItem}})
		dispatch(routerRedux.push({
			pathname: '/betresults'
		}))
	}
	handleTouchMove(e) {
		let {range} = this.refs;
		let rangeLeft = range.getBoundingClientRect().left;
		let touchLeft = e.targetTouches[0].pageX;
		let maxWidth = range.clientWidth;
		let left = touchLeft - rangeLeft;
		if(left < 0) left = 0;
		if(left > maxWidth) left = maxWidth;
		let rangePercents = left/maxWidth;
		rangePercents = rangePercents.toFixed(2);
		this.setState({selectedLeft: left,rangePercents})
	}
	handleWagerClick(e) {
		let index = e.target.dataset.index
		this.setState({index})
	}
	componentDidMount() {
	}
	handleInputOnChange(e) {
		let moneyInput = e.target.value;
		this.setState({moneyInput})
	}
	// 计算赔率返利
	getOddsAndRebate() {
		const { gameUniqueId, allGamesPrizeSettings, gameMathString} = this.props
		const {rangePercents} = this.state;
		let oddsOriginal, rebateOriginal;
		if(allGamesPrizeSettings) {
			const currentGame = allGamesPrizeSettings[gameUniqueId].singleGamePrizeSettings
			let mathKey = getGameMathKeyWithTitle(gameMathString, gameUniqueId)
			const currentPlay = currentGame[mathKey]
		 	let {ratioOfReturnAmount, prizeSettings} = currentPlay;
		 	let {prizeAmount} = prizeSettings[0];
		 	rebateOriginal = rangePercents * ratioOfReturnAmount;
		 	oddsOriginal = prizeAmount - prizeAmount * rebateOriginal;
		 	oddsOriginal = oddsOriginal.toFixed(2);
			rebateOriginal = (rebateOriginal*100).toFixed(1) + '%';
		}
		return {oddsOriginal, rebateOriginal}
	}

	showOdds(){
		let showOdds = true
		const {gameMathString, gameUniqueId} = this.props;
		switch(gameUniqueId){
			case 'HF_BJ28' : 
    	case 'HF_SG28' : 
    	case 'MARK_SIX' : {
    		showOdds = false
    		break;
    	}
		}
		return showOdds
	}
	_renderOddsConfirm(){
		const {betConfirmDisplay, number} = this.props
		let {oddsOriginal, rebateOriginal} = this.getOddsAndRebate()
		let { selectedLeft, index, moneyInput } = this.state
		const style = {
			display: betConfirmDisplay
		}
		const wagerStyle = {
			color: '#fff',
			backgroundColor: '#f49935'
		}
		let unit = parseInt(index);
		let sum = (number * moneyInput/unit).toFixed(2);
		let topReward = sum * oddsOriginal;
		topReward = topReward.toFixed(3);
		return (
	    <div className={styles.normal} style={style}>
	    	<div className={styles.modal}>
	    		<div className={styles.header}>
	    			<h4>注单设定</h4>
	    		</div>
		    	<div className={styles.content}>
		    		<div className={styles.rangeText}><span>赔率:{oddsOriginal}</span><span>返利:{rebateOriginal}</span></div>
		    		<div className={styles.range} ref='range'>
		    			<div className={styles.selected} style={{width: selectedLeft}}></div>
		    			<div className={styles.rangeButton} style={{left: selectedLeft}} onTouchMove={this.handleTouchMove}></div>
		    		</div>
		    		<div className={styles.wager}>
		    			<span className={styles.betInputBar}>
		    				<span className={styles.betInputLabel}>单注金额：</span>
		    				<input className={styles.betInput} type='number' onChange={this.handleInputOnChange} value={moneyInput} pattern="\d*"/>
		    			</span>
	    				<span className={styles.yuan} data-index='1' style={index==='1'? wagerStyle: null} onClick={this.handleWagerClick}>元</span>
	    				<span className={styles.jiao} data-index='10' style={index==='10'? wagerStyle: null} onClick={this.handleWagerClick}>角</span>
	    				<span className={styles.fen} data-index='100' style={index==='100'? wagerStyle: null} onClick={this.handleWagerClick}>分</span>
		    		</div>
		    		<p className={styles.number}>注数：{number}注</p>
		    		<p className={styles.amount}>总额：{sum} 元</p>
		    		<p className={styles.rewards}>若中奖，最高中：<span className={styles.rewardsAmount}>{topReward}</span> 元</p>
		    	</div>
		    	<div className={styles.footer}>
		    		<div className={styles.cancel} onClick={this.handleCancleClick}>取消</div>
		    		<div className={styles.confirm} onClick={this.handleConfirmClick}>确定</div>
		    	</div>
	    	</div>
	    	<div className={styles.mask}></div>
	    </div>
	  );
	}
	_renderNormalConfirm(){
		const {betConfirmDisplay, number} = this.props
		let { selectedLeft, index, moneyInput } = this.state
		const style = {
			display: betConfirmDisplay
		}
		let sum = (number * moneyInput).toFixed(2);
		return (
	    <div className={styles.normal} style={style}>
	    	<div className={styles.normalModal}>
	    		<div className={styles.header}>
	    			<h4>注单设定</h4>
	    		</div>
		    	<div className={styles.normalContent}>
		    		<div className={styles.wager}>
		    			<span className={styles.betInputBar}>
		    				<span className={styles.betInputLabel}>单注金额：</span>
		    				<input className={styles.betInput} type='number' onChange={this.handleInputOnChange} value={moneyInput} pattern="\d*"/>
		    			</span>
	    				<span >元</span>
		    		</div>
		    		<p className={styles.number}>注数：{number}注</p>
		    		<p className={styles.amount}>总额：{sum} 元</p>
		    	</div>
		    	<div className={styles.footer}>
		    		<div className={styles.cancel} onClick={this.handleCancleClick}>取消</div>
		    		<div className={styles.confirm} onClick={this.handleConfirmClick}>确定</div>
		    	</div>
	    	</div>
	    	<div className={styles.mask}></div>
	    </div>
	  );
	}
	render() {
		return this.showOdds() ? this._renderOddsConfirm() : this._renderNormalConfirm()
	}
}

export default BetConfirm;
