import React from 'react';
import styles from './LotteryTapItem.css';

class LotteryTapItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			countTime: 0,
			item: this.props.item
		}
	}
	componentDidMount() {
		this.countDown();
	}
	componentWillMount() {
		let stopTime = this.props.item.stopOrderTimeEpoch
		let timestamp = new Date().getTime();
		timestamp = parseInt(timestamp/1000);
		let countTime = stopTime - timestamp;
		let item = this.props.item,
			lotteryIconStr = localStorage.getItem('lotteryIconStr'),
			lotteryIcon = JSON.parse(lotteryIconStr),
			iconKey = item.gameUniqueId;
		item.gameIconUrl = lotteryIcon[iconKey];
		this.setState({
			countTime : countTime,
			item: item
		})
	}
	static defaultProps = {
		item: {}
	}
	countDown() {
		let countTime = this.state.countTime;
		if(countTime <= 0) {
			countTime = 0
		}else{
			countTime--
		}
		this.timer = setTimeout(()=>{
				this.countDown()
		},1000)
	}
	getTimeStr() {
		let countTime = this.state.countTime,
			hour = parseInt(countTime/3600),
			hourLeft = countTime%3600,
			minute = parseInt(hourLeft/60),
			second = hourLeft%60;
		hour = this.checkTime(hour);
		minute = this.checkTime(minute);
		second = this.checkTime(second);
		let timeStr = `${hour}:${minute}:${second}`;
		return timeStr;
	}
	checkTime(time) {
		return time.toString().length < 2  ? ('0' + time) : time;
	}
	_renderBalls(openStatus, openCode) {
		if(openCode){
	  	let ballNumber = openCode.split(',');
	  	let balls = ballNumber.map((item, index)=>(
	  		<span className={styles.ball} key={index}>{item}</span>
	  	))
	  	return balls;
	  }else {
	  	return <span className={styles.waiting}>等待开奖</span>
	  }
	}
	_itemRow(timeStr) {
		let item = this.state.item
		return (
			<div className={styles.normal}>
	    	<div className={styles.lottoLeft}>
					<img className={styles.lottoIcon} src={item.gameIconUrl}/>
				</div>
				<div className={styles.lottoInfo}>
					<div className={styles.infoText}>
						<span className={styles.title}>{item.gameNameInChinese}</span>
						<span className={styles.phase}>第{item.uniqueIssueNumber}期</span>
						
					</div>
					<div className={styles.lottoBalls}>
						{this._renderBalls(item.openStatus, item.lastOpenCode)}
					</div>
					<div className={styles.nextOpenTime}>
						<span className={styles.nextOpenTimeInfo}>距第{item.uniqueIssueNumber+1}期截止还有</span>
						<span className={styles.openTime}>{timeStr}</span>
					</div>
				</div>
			</div>
		)
	}
	_itemSquare(timeStr) {
		let item = this.state.item
		return (
			<div className={styles.tap}>
				<img className={styles.tapImg} src={item.gameIconUrl} />
				<span className={styles.tapName}>{item.gameNameInChinese}</span>
				<span className={styles.tapCount}>{timeStr}</span>
			</div>
		)
	}
	render() {
		let timeStr = this.getTimeStr()
		return this.props.buyLotteryDisplay ? this._itemSquare(timeStr) : this._itemRow(timeStr);
	}
}

export default LotteryTapItem;
