import React from 'react';
import styles from './BetArea.css';
import BetItem from './BetItem';
import {gameRandom} from '../../data/randomBetting';
import {getGameMathKeyWithTitle} from '../../data/playMathConfig';


class BetArea extends React.Component {
	constructor(props) {
		super(props);
		this.handleDigitClick = this.handleDigitClick.bind(this)
		this.handleShakeClick = this.handleShakeClick.bind(this)
		this.deviceShake = this.deviceShake.bind(this)
	}
	static defaultProps = {
		digits: [],
		balls: []
	}
	getSumArray(max) {
		let arr = []
		for (let i = 0; i <= max; i++) {
			arr[i] = i;
		}
		return arr
	}

	reArangeDigit(arr){
		let orignal = ['W','Q','B','S','G'],
			arranged = [];
		orignal.map((item, index)=>{
			if(arr.indexOf(item)>-1){
				arranged.push(item)
			}
		})
		return arranged;
	}

	handleDigitClick(e) {
		let {dispatch, selectedDigit} = this.props;
		let digit = e.target.dataset.digit || e.target.parentNode.dataset.digit;
		let index = selectedDigit.indexOf(digit)
		index > -1 ? selectedDigit.splice(index, 1) : selectedDigit.push(digit);
		selectedDigit = this.reArangeDigit(selectedDigit)
		dispatch({type: 'play/save', payload:{selectedDigit}})
	}
	renderItems() {
		const { dispatch, results, clickedMap, digits, balls, gameMathString, gameUniqueId, allGamesPrizeSettings } = this.props;
		const itemProps = {dispatch, results}
		const nodes = digits.map((digit, index) => {
			const betItem ={
				key: index,
				digit,
				balls,
				clickedMap,
				digitOrder: index,
				gameMathString,
				gameUniqueId,
				allGamesPrizeSettings,
				...itemProps
			}
			return <BetItem {...betItem}/>
		})
		return nodes
	}
	_renderDigits(){
		let {selectedDigit} = this.props;
		let gray = '#ddd', green = '#00B72B';
		const digits = [{'W': '万位'}, {'Q': '千位'}, {'B': '百位'}, {'S': '十位'}, {'G': '个位'} ]
		let nodes = digits.map((item, index)=>{
			for(let i in item){
				let color = selectedDigit.indexOf(i) > -1 ? green : gray
				return <div key={index} data-digit={i} className={styles.digit} onClick={this.handleDigitClick}>
					<span className={styles.icon} style={{backgroundColor: color}}></span>
					{item[i]}
				</div>
			}
		})
		return (
			<div className={styles.digits}>
				{nodes}
			</div>
		)
	}
	// 摇一摇
	deviceShake(){
		let SHAKE_THRESHOLD = 800;
		let last_update = 0;
		let x =0, y =0, z =0, last_x =0, last_y =0, last_z = 0;
		if(window.DeviceMotionEvent) {
			window.addEventListener('devicemotion', deviceMotionHandler, false);
		}else{
			alert('本设备不支持摇一摇')
		}
		function deviceMotionHandler(eventData){
			let acceleration = eventData.accelerationIncludingGravity;
			let curTime = +new Date();
			if((curTime - last_update) > 300) {
				let diffTime = curTime - last_update
				last_update = curTime
				x = acceleration.x
				y = acceleration.y
				z = acceleration.z
				let speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
				if(speed > SHAKE_THRESHOLD){
					this.handleShakeClick()
				}
				last_x = x
				last_y = y
				last_z = z
			}
		}
	}
	showDigitsBanner(){
		const {gameUniqueId, gameMathString} = this.props
		let show = false;
		switch(gameMathString){
			case '任选二-直选和值': 
			case '任选二-组选复式': 
			case '任选二-组选和值': 
			case '任选三-直选和值': 
			case '任选三-组三复式': 
			case '任选三-组六复式': 
			case '任选三-组选和值': 
			case '任选三-直选和值': 
			case '任选四-组选24': 
			case '任选四-组选12': 
			case '任选四-组选6': 
			case '任选四-组选4': {
				show = true
				break;
			} 
		}
		return show
	}
	handleShakeClick(){
		let {balls, digits, gameMathString, gameUniqueId, dispatch, allGamesPrizeSettings} = this.props;
		let mathKey = getGameMathKeyWithTitle(gameMathString, gameUniqueId)
    	let {prizeSettings} = allGamesPrizeSettings[gameUniqueId].singleGamePrizeSettings[mathKey]
    	if(!balls[0]) balls = prizeSettings.map((item, index)=>{
	      return {ball: item.prizeNameForDisplay.replace('和值', ''), odds: item.prizeAmount}
	    })
    	const {resultsStr, clickedMapStr} = gameRandom(gameUniqueId, gameMathString, digits, balls);
    	dispatch({type: 'play/saveResult', payload: {resultsStr, clickedMapStr}})
	}
	render() {
		//this.deviceShake()   //摇一摇
		this.showDigitsBanner()
	  return (
	    <div className={styles.normal}>
	    	<div className={styles.shake} onClick={this.handleShakeClick}><span className={styles.shakeIcon}></span>摇一摇机选</div>
			{this.renderItems()}
			{this.showDigitsBanner() ?  this._renderDigits() : null}
	    </div>
	  );		
	}
}

export default BetArea;
