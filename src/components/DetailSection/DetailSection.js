import React from 'react';
import styles from './DetailSection.css';
import {routerRedux} from 'dva/router';

class DetailSection extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			nowList: [],
			scrollTop: 0
		}
		this.handleItemClick = this.handleItemClick.bind(this);
	}
	getDate(timestamp){
		let date = new Date(timestamp*1000);
		let Y, M, D, h, m, s;
		Y = date.getFullYear();
		M = date.getMonth()
		M = this.check(M+1)
		D = this.check(date.getDate());
		h = this.check(date.getHours());
		m = this.check(date.getMinutes());
		s = this.check(date.getSeconds()); 
		return `${Y}-${M}-${D} ${h}:${m}:${s}`
	}
	check(num){
		return num < 10 ? '0' + num : num
	}
	handleItemClick(e){
		const {dispatch} = this.props
		while(!e.target.dataset.id){
			e.target = e.target.parentNode;
		}
		const {id, action, color, time, income} = e.target.dataset
		let singleDetailData = {id, action, color, time, income};
		dispatch({type: 'mine/save' , payload: {singleDetailData}})
		dispatch(routerRedux.push({
			pathname: '/single'
		}))
	}
	isEmpty(obj){
    for (var name in obj) 
    {
        return false;
    }
    return true;
	}
	_renderItems(){
		const ActionDict = {
			"WIN" : "中奖",
			"CHARGE" : "购彩",
			"REBATE" : "返水",
			"WITHDRAW" : "提现"
		}
		const TypeDict = {
			"WIN" : "+",
			"CHARGE" : "-",
			"WITHDRAW" : "-"
		}
		const numberColor ={
			"+" : "#FF0000",
			"-" : "#008000"
		}
		const {nowList} = this.state
		let nodes = nowList.map((item, index)=>{
			let {delta, crossReferenceId, moneyOperationType, remarks, createdTime} = item
			let action = ActionDict[moneyOperationType],
				type = TypeDict[moneyOperationType],
				color = numberColor[type],
				time = this.getDate(createdTime),
				income = `${type} ${delta}`;
			return <div className={styles.item} key={index}
						 data-id = {crossReferenceId} 
						 data-action = {action}
						 data-color ={color}
						 data-time = {time}
						 data-income = {income}
						 onClick={this.handleItemClick}>
				<div className={styles.left}>
					<span className={styles.up}>
						<span className={styles.action}>{action}</span>
						<span className={styles.amouts}><span className={styles.number} style={{color}}>{income} </span>元</span>
					</span>
					<span className={styles.down}>
						<span className={styles.date}>{time}</span>
					</span>
				</div>
				<div className={styles.right}></div>
			</div>
		})
		return nodes
	}
	componentWillReceiveProps(nextProps) {
		const {detailList} = nextProps;                                                                
		if(this.isEmpty(detailList)) return null;
		let list = detailList.slice()
		let nowList = list.splice(0,20);
		this.setState({list, nowList})
	}
	componentWillMount() {
		const {detailList} = this.props;                                                                
		if(this.isEmpty(detailList)) return null;
		let list = detailList.slice()
		let nowList = list.splice(0,20);
		this.setState({list, nowList})
	}
	componentDidMount() {
		const {dom} = this.refs
		dom.addEventListener('touchmove', ()=>{
			let prevScrollTop = this.state.scrollTop;
			let {list, nowList} = this.state;
			let {scrollTop} = document.body;
			if(scrollTop === prevScrollTop && prevScrollTop !== 0){
				let newList = list.splice(0,10);
				nowList = nowList.concat(newList)
				this.setState({nowList, list})
			}
			this.setState({scrollTop}) 
		})
	}
	render() {
		return (
		    <div className={styles.normal} ref='dom'>
				{this._renderItems()}
		    </div>
		);
	}
}

export default DetailSection;
