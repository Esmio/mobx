import React from 'react';
import styles from './BetItem.css';
import {showToast} from '../../common/globalToasts';
import {getGameMathKeyWithTitle} from '../../data/playMathConfig';

class BetItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			clickedMap : {},
			results: []
		}
		this._renderBalls = this._renderBalls.bind(this)
		this.handleBallClick = this.handleBallClick.bind(this)
		this._renderBallsM6TMSB = this._renderBallsM6TMSB.bind(this)
	}
	static defaultProps = {
		balls: []
	}
	// ball样式
	getAddBallStyle(){
		const {gameMathString, gameUniqueId} = this.props;
		let addBallStyle = {}, wrapStyle = {};
		if(gameUniqueId==='HF_BJ28' || gameUniqueId==='HF_SG28'){
			switch(gameMathString){
				case '混合' : 
				case '波色' : {
					addBallStyle = {
						width: '2rem',
						height: '1.4rem',
						borderRadius: '.2rem',
					}
					wrapStyle = {
						marginLeft: '.3rem'
					}
					break;
				}
				case '特码' : 
				case '特码包三' : 
				case '豹子' : {
					addBallStyle = {
						width: '1rem',
						height: '1rem',
						borderRadius: '.5rem',
					}
					break;
				}
			}
			
		}else if(gameUniqueId==='MARK_SIX'){
			switch(gameMathString){
				case '特码-种类' : 
				case '色波-半波' : 
				case '色波-半半波' : 
				case '特肖-生肖' : 
				case '头尾数' : 
				case '五行' : 
				case '平特一肖' : 
				case '平特尾数' : 
				case '正肖-生肖' : 
				case '7色波-种类' : 
				case '总肖-种类' : {
					addBallStyle = {
						width: '1.5rem',
						height: '1rem',
						borderRadius: '.2rem'
					}
					wrapStyle = {
						marginLeft: '.1rem'
					}
					break;
				}
				case '特码-色波' : {
					addBallStyle = {
						width: '100%',
						height: '2rem',
						borderRadius: '.2rem'
					}
					wrapStyle = {
						width: '100%',
						marginLeft: '.2rem',
						marginRight: '.2rem'
					}
					break;
				}
			}
		}else if( gameUniqueId === 'HF_AHK3' || gameUniqueId==='HF_JSK3' || gameUniqueId === 'HF_GXK3'){
			switch(gameMathString) {
				case '三同号通选' : 
				case '三同号单选' : 
				case '三连号通选' : {
					addBallStyle = {
						width: '2.2rem',
						height: '1rem',
						borderRadius: '.2rem',
						marginLeft: '.5rem'
					}
					wrapStyle = {
						marginLeft: '.5rem'
					}
					break;
				}
				 
				case '三不同号' : 
				case '二同号复选' : 
				case '二不同号' : 
				case '猜一个号' : {
					addBallStyle = {
						width: '1rem',
						height: '1rem',
						borderRadius: '.5rem',
						marginLeft: '.25rem'
					}
					break;
				} 
				case '和值' :{
					addBallStyle = {
						width: '1rem',
						height: '1rem',
						borderRadius: '.5rem',
					}
					wrapStyle = {
						marginLeft: '.1rem'
					}
					break;
				}
			}
		}
		return {addBallStyle, wrapStyle};
	}
	_renderBallsM6TMSB(){
		const {balls, digitOrder} = this.props;
		const {clickedMap} = this.props;
		let ballStyle = {
			backgroundColor: '#ef2d0e',
			color: '#fff'
		}
		let {addBallStyle, wrapStyle} = this.getAddBallStyle()
		const nodes = balls.map((item, index)=>{
			let ballName = item.ball[0], ballList = item.ball[1];
			let ballNameColor = '#ef2d0e';
			if(ballName === '蓝波'){
				ballNameColor = '#108ee9';
			} 
			if(ballName === '绿波'){
				ballNameColor = 'green';
			} 
			let ballTextStyle={color: ballNameColor}
			let style = clickedMap[`ball${digitOrder}-${index}`] ? ballStyle : ballTextStyle,
				outStyle = {};
			Object.assign(style, addBallStyle)
			Object.assign(outStyle, wrapStyle)
			return (<div key={index} className={styles.oddsWrap} style={outStyle}>
				<span className={styles.ballWithElement} 
					data-digit-order={digitOrder} 
					data-ball-index={index} 
					data-value={ballName} 
					style={style} 
					onClick={this.handleBallClick}>
					<span className={styles.ballName}  onClick={(e)=>{}}>{ballName}</span>
					<span className={styles.ballList}>{ballList.join(' ')}</span>
				</span>
				<span className={styles.oddsText}>赔率 {item.odds}</span>
			</div>)
		})
		return nodes;
	}
	_renderBalls() {
		const {balls, digitOrder, gameMathString, digit} = this.props;
		const {clickedMap} = this.props;
		let ballStyle = {
			backgroundColor: '#ef2d0e',
			color: '#fff'
		}
		let {addBallStyle, wrapStyle} = this.getAddBallStyle()
		const nodes = balls.map((item, index)=>{
			if(gameMathString === '二同号单选' && digit === '同号') item = item + item;
			let style = clickedMap[`ball${digitOrder}-${index}`] ? ballStyle : {},
				outStyle = {};
			Object.assign(style, addBallStyle)
			Object.assign(outStyle, wrapStyle)
			return typeof item === 'object' ? 
			(<div key={index} className={styles.oddsWrap} style={outStyle}>
				<span className={styles.ball} 
					data-digit-order={digitOrder} 
					data-ball-index={index} 
					data-value={item.ball} 
					style={style} 
					onClick={this.handleBallClick}>
					{item.ball}
				</span>
				<span className={styles.oddsText}>{item.odds}</span>
			</div>) :
			(<span className={styles.ball} 
				data-digit-order={digitOrder} 
				data-ball-index={index} 
				data-value={item} 
				style={style} 
				key={index} 
				onClick={this.handleBallClick}>
				{item}
			</span>)
		})
		return nodes;
	}
	// 从服务器拿ball
	_renderBallsWithServerOdds(){
		const {digitOrder} = this.props;
		const {clickedMap} = this.props;
		const {gameUniqueId, gameMathString, allGamesPrizeSettings} = this.props
		let mathKey = getGameMathKeyWithTitle(gameMathString, gameUniqueId)
		if(!allGamesPrizeSettings) return null
		let {prizeSettings} = allGamesPrizeSettings[gameUniqueId].singleGamePrizeSettings[mathKey]
		let ballStyle = {
			backgroundColor: '#ef2d0e',
			color: '#fff'
		}
		let {addBallStyle, wrapStyle} = this.getAddBallStyle()
		const nodes = prizeSettings.map((item, index)=>{
			let style = clickedMap[`ball${digitOrder}-${index}`] ? ballStyle : {},
				outStyle = {};
			Object.assign(style, addBallStyle)
			Object.assign(outStyle, wrapStyle)
			let {prizeNameForDisplay, prizeAmount} = item;
			prizeNameForDisplay = prizeNameForDisplay.replace('和值', '')
			return (<div key={index} className={styles.oddsWrap} style={outStyle}>
				<span className={styles.ball} 
					data-digit-order={digitOrder} 
					data-ball-index={index} 
					data-value={prizeNameForDisplay} 
					style={style} 
					onClick={this.handleBallClick}>
					{prizeNameForDisplay}
				</span>
				<span className={styles.oddsText}>{prizeAmount}</span>
			</div>)
		})
		return nodes;
	}
	getClickedNumber(map){
		let num = 0
		for(let key in map){
			if(map[key]) num ++
		}
		return num
	}
	handleBallClick(e) {
		const {dispatch, results, clickedMap, gameMathString, digit} = this.props;
		if(!e.target.dataset.value) e.target = e.target.parentNode;
		const {digitOrder, ballIndex, value} = e.target.dataset;
		let arrStr = `ball${digitOrder}-${ballIndex}`
		// checkballs
		if(digit === '胆码' && !clickedMap[arrStr]){
			let {ext} = this.getNote(gameMathString, digit);
			let dNum = 0
			let arr = results[0] || []
			arr.map((item, index)=>{
				if(item){
					dNum++
				}
			})
			if(dNum >= ext){
				showToast(`最多不能超过${ext}个`)
				return false
			}
		}
		// 胆拖2选1
		if(digit === '胆码' || digit === '拖码' || gameMathString==='二同号单选'){
			let otherDigitOrder = digit === '胆码' || digit === '同号' ? 1 : 0;
			let otherArrStr = `ball${otherDigitOrder}-${ballIndex}`
			if(!(results[otherDigitOrder] instanceof Array)){
				results[otherDigitOrder] = []
			}
			results[otherDigitOrder][ballIndex] = '';
			clickedMap[otherArrStr] = false;
		}
		// 特码包三
		if(gameMathString === '特码包三') {
			if(!(results[digitOrder] instanceof Array)){
				results[digitOrder] = []
			}
			let num = this.getClickedNumber(clickedMap);
			let smallest = 0;
			if(num===3){
				for(let i = 0; i < results[digitOrder].length; i++){
					if(results[digitOrder][i]) {
						smallest = i;
						break;
					}
				}
			}
			let smallestArr = `ball${digitOrder}-${smallest}`;
			results[digitOrder][smallest] = '';
			clickedMap[smallestArr] = false;
		}
		// ball click
		if(!(results[digitOrder] instanceof Array)){
			results[digitOrder] = []
		} 
		results[digitOrder][ballIndex] = clickedMap[arrStr] ? '' : value;
		clickedMap[arrStr] = !clickedMap[arrStr];
		
		let resultsStr = JSON.stringify(results),
			clickedMapStr = JSON.stringify(clickedMap);
		dispatch({type: 'play/saveResult', payload: {resultsStr, clickedMapStr, digit}})
	}
	// 胆码最大最小
	getNote(gameMathString, digit){
		let note = '', ext = 0, extText = ''
		if(digit === '拖码'){
			note = '我认为可能出的号'
		}else if(digit === '胆码'){
			note = '我认为必出的号'
			switch(gameMathString){
				case '任选二胆拖' : 
				case '前二组选胆拖' : 
				case '二不同号胆拖' : {
					ext = 1
					break;
				}
				case '任选三胆拖' : 
				case '前三组选胆拖' : {
					ext = 2
					break;
				}
				case '任选四胆拖' : {
					ext = 3
					break;
				}
				case '任选五胆拖' : {
					ext = 4
					break;
				}
				case '任选六胆拖' : {
					ext = 5
					break;
				}
				case '任选七胆拖' : {
					ext = 6
					break;
				}
				case '任选八胆拖' : {
					ext = 7
					break;
				}
			}
			extText = `至少选1个，最多选${ext}个`
		}
		return {note, ext, extText}
	}
	// 左侧digit位置
	showDigitStyle(){
		let show = false;
		const {gameMathString, gameUniqueId} = this.props
		show = /胆拖/.test(gameMathString);
		switch(gameUniqueId){
			case 'HF_BJ28' : 
    		case 'HF_SG28' : 
    		case 'MARK_SIX' : {
		    	show = true
		    	break;
		    }
		    case 'HF_AHK3' : 
    		case 'HF_JSK3' : 
    		case 'HF_GXK3' : {
    			if(gameMathString === '和值' || gameMathString === '三同号单选') show = true;
    			break;
    		}
		}
		return show
	}
	switchBallRenders(){
		const {gameUniqueId, gameMathString} = this.props
		switch(gameUniqueId){
			case 'MARK_SIX' : {
				if(gameMathString==='特码-色波'){
					return this._renderBallsM6TMSB()
				}
				break;
			}
			case 'HF_AHK3' : 
	    	case 'HF_JSK3' : 
	    	case 'HF_GXK3' : {
	    		if(gameMathString==='和值'){
	    			return this._renderBallsWithServerOdds()
	    		}
	    		break;
	    	}
		}
		return this._renderBalls()
	}
	render() {
		const {digit, clickedMap, gameMathString, gameUniqueId} = this.props;
		let curDigit = '', odds = 0
		if(typeof digit === 'object') {
			curDigit = digit.digit;
			odds = digit.odds;
		}
		let digitStyle = {}
		let show = this.showDigitStyle()
		if(show){
			digitStyle = {
				justifyContent: 'flex-start',
				paddingTop: '.2rem'
			}
		}
		let {note, extText} = this.getNote(gameMathString, digit)
		return (
	    <div className={styles.normal}>
	      <div className={styles.left} style={digitStyle}>
	      	<span className={styles.digit} >{curDigit ? curDigit : digit}</span>
	      	{odds ? <span className={styles.odds}>{odds}</span> : null}
	      </div>
	      <div className={styles.right}>
	      	<div className={styles.note}>{note}<span className={styles.ext}>{extText}</span></div>
	      	<div className={styles.ballsContainer}>
	      		{this.switchBallRenders()}
	      	</div>
	      </div>
	    </div>
	  );
	}
  
}

export default BetItem;
