import React from 'react';
import styles from './LottoItem.css';
import { routerRedux } from 'dva/router';

function renderBalls(openStatus, openCode) {
	if(openStatus) {
	  	let ballNumber = openCode.split(',');
	  	let balls = ballNumber.map((item, index)=>(
	  		<span className={styles.ball} key={index}>{item}</span>
	  	))
	  	return balls;
	  }else {
	  	return <span className={styles.waiting}>等待开奖</span>
	  }
	}

class LottoItem extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			item: null
		};
		this.handleItemClick = this.handleItemClick.bind(this);
		this._renderItems = this._renderItems.bind(this);
	}
	static defaultProps = {
		record: false
	};
	componentWillMount() {
		let {record, item} = this.props;
		if(!record) {
			let	lotteryIconStr = localStorage.getItem('lotteryIconStr'),
				lotteryIcon = JSON.parse(lotteryIconStr),
				iconKey = item.gameUniqueId;
			item.gameIconUrl = lotteryIcon[iconKey];
		}
		this.setState({
			item: item
		})
	}
	componentWillReceiveProps(nextProps) {
		let {item} = nextProps;
		this.setState({
			item: item
		})
	}
	getTimeStr() {
		let nowtime = this.props.item.officialOpenTimeEpoch,
			date = new Date(nowtime),
			month = date.getMonth() + 1,
			day = date.getDate(),
			hours = date.getHours(),
			minutes = date.getMinutes();
		month = month.toString().length < 2  ? ('0' + month) : month;
		day = day.toString().length < 2 ? ('0' + day) : day;
		let timeStr = `${month}-${day} ${hours}:${minutes}`;
		return timeStr
	}
	handleItemClick() {
		let {item, dispatch} = this.props;
		let { gameUniqueId, gameNameInChinese } = item;
		dispatch({type:'startLotto/results',payload:{gameUniqueId,gameNameInChinese}});
		dispatch(routerRedux.push({
			pathname: '/trend',
			query: {
				gameUniqueId: gameUniqueId,
				navigationBar: '1'
			}
		}))
		
	}
	_renderBalls(openStatus, openCode) {
	  if(openStatus) {
	  	let ballNumber = openCode.split(',');
	  	let balls = ballNumber.map((item, index)=>(
	  		<span className={styles.ball} key={index}>{item}</span>
	  	))
	  	return balls;
	  }else {
	  	return <span className={styles.waiting}>等待开奖</span>
	  }
	}
	_renderIconItems(item) {
		return <div className={styles.normal} onClick={this.handleItemClick}>
    	<div className={styles.lottoLeft}>
				<img className={styles.lottoIcon} src={item.gameIconUrl}/>
			</div>
			<div className={styles.lottoInfo}>
				<div className={styles.infoText}>
					<span className={styles.title}>{item.gameNameInChinese}</span>
					<span className={styles.phase}>第{item.uniqueIssueNumber}期</span>
					<span className={styles.openTime}>{this.getTimeStr()}</span>
				</div>
				<div className={styles.lottoBalls}>
					{this._renderBalls(item.openStatus, item.openCode)}
				</div>
			</div>
		</div>
	}
	_renderItems(item) {
		return <div className={styles.normal} style={{paddingBottom: '0'}}>
			<div className={styles.recordLottoInfo}>
				<div className={styles.infoText}>
					<span className={styles.phase}>第{item.uniqueIssueNumber}期</span>
					<span className={styles.openTime}>{this.getTimeStr()}</span>
				</div>
				<div className={styles.lottoBalls}>
					{this._renderBalls(item.openStatus, item.openCode)}
				</div>
			</div>
		</div>
	}
	render(){
		let {item} = this.state;
		let {record} = this.props;
		return record ? this._renderItems(item) : this._renderIconItems(item);
	}
}

export default LottoItem;
