import React from 'react';
import styles from './TopUpDetail.css';
import LineItem from './LineItem';
import ReloadNow from './ReloadNow';

class TopUpDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			tabIndex: 0,
			deltaHieght: 0,
		}
		this.handleTabClick = this.handleTabClick.bind(this);
	}
	static defaultProps = {
		tabs : ['全部', '已完成', '失败']
	}
	handleTabClick(e){
		const {dispatch, opType} = this.props;
		const Dict = ['', 'COMPLETED', 'FAILED']
		const opTypeDict = {
			"充值" : "getTopUpDetail",
			"提现" : "getWithdrawals"
		}
		const {index} = e.target.dataset
		let topUpState = Dict[index];
		dispatch({type: `mine/${opTypeDict[opType]}`, payload: topUpState})
		this.setState({tabIndex: index})
	}
	_renderTabs(){
		const {tabs} = this.props 
		const {tabIndex} = this.state
		const activeColor = 'red'
		let nodes = tabs.map((tab, index)=>{
			let color = tabIndex==index ? activeColor : ''
			return <span 
				className={styles.tab}
				key={index}
				data-index={index}
				style={{color:color}}		
				onClick={this.handleTabClick}>
				{tab}
			</span>
		})
		return nodes;
	}
	getDate(timestamp){
		let date = typeof(timestamp) === 'string' ?  new Date(timestamp) : new Date(timestamp*1000);
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
	isEmpty(obj){
	    for (var name in obj) 
	    {
	        return false;
	    }
	    return true;
	}
	check(num){
		return num < 10 ? '0' + num : num
	}

	_renderLineItems(topUpData){
		const ActionDict = {
			"TOPUP" : "充值",
			"WITHDRAWAL" : "提现"
		}
		const typeDict = {
			"TOPUP" : "+",
			"WITHDRAWAL" : "-"
		}
		const numberColor ={
			"TOPUP" : "#FF0000",
			"WITHDRAWAL" : "#008000"
		}
		const stateDict = {
			"IN_PROGRESS" : "待审核",
			"COMPLETED" : "已完成",
			"CLOSE" : "关闭"
		}
		const {dispatch} = this.props;

		if(this.isEmpty(topUpData)) return null
		console.log('hhhh')
		let nodes = [];
		topUpData.map((item, index)=>{
			let {amount, createTime, state, subType, transactionId, type} = item
			let itemProps = {
				action: ActionDict[type],
				color: numberColor[type],
				time: this.getDate(createTime),
				income: amount.toFixed(2),
				id: transactionId,
				actionState: stateDict[state],
				type: typeDict[type],
				subType,
				dispatch
			}
			nodes.push(<LineItem {...itemProps} key={index}/>) 
		})
		return nodes;
	}
	shouldComponentUpdate(nextProps, nextState) {
		if(JSON.stringify(this.props.topUpData) === JSON.stringify(nextProps.topUpData)){
			return false	
		}
		return true
	}
	_renderContentItems(){
		const {tabIndex} = this.state
		const {tabs, opType, topUpData} = this.props
		let nodes = tabs.map((tab, index)=>{
			let lineItems = tabIndex == index ? this._renderLineItems(topUpData) : null
			return <div className={styles.container} key={index} ref='container' style={{height: this.state.deltaHieght}}>
				{lineItems}
				{tabIndex == index && !lineItems ? <ReloadNow opType={opType} tab={tab}/> : null}
			</div>
		})
		return nodes
	}
	getElementTop(element){
		var actualTop = element.offsetTop;
		var current = element.offsetParent;
		while (current !== null){
			actualTop += current.offsetTop;
			current = current.offsetParent;
		}
		return actualTop;
	}
	componentDidMount() {
		let deltaHieght = document.body.scrollHeight - this.getElementTop(this.refs.container)
		this.setState({deltaHieght})
	}
	render() {
		const dict = ['0', '33%', '67%']
		const conDict = ['0', '-100%', '-200%']
		const {tabIndex} = this.state
		let left = dict[tabIndex]
		let conLeft = conDict[tabIndex]
		return (
	    <div className={styles.normal}>
				<div className={styles.tabs}>
					{this._renderTabs()}
					<span className={styles.active} style={{left: left}} ></span>
				</div>
				<div className={styles.content} style={{left: conLeft}}>
					{this._renderContentItems()}
				</div>
	    </div>
	  );
	}
}

export default TopUpDetail;
