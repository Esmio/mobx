import React from 'react';
import styles from './PrizeList.css';
import CardCom from './CardCom';
import { connect } from 'dva';
import { Carousel } from 'antd-mobile';

class PrizeList extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			top: 0,
			nodes: [],
			transition: 'top 2s',
			list: []
		}
	}
	static defaultProps = {
	}
	renderLists(prizeList) {
		if(!prizeList){
			return null
		}
		const nodes = prizeList.map((item, idx)=>(
			<li className={styles.prizeList} style={{height: '.45rem',fontSize: '.24rem'}} key={idx}>
				<span className={styles.prizeName}>{item.username}</span>
				<span className={styles.prizeAmount}>喜中{item.winningAmount}元</span>
				<span className={styles.prizeGame}>购买{item.gameNameInChinese}</span>
			</li>
		))
		return <div className="haha">{nodes}</div>;
	}
	play() {
		this.timer = setInterval(()=>{
			let top = this.state.top
			if(top > 550){
				top = -650
				this.setState({
					transition: ''
				})
			}
			this.setState({
				top: top+450,
				transition: 'top 2s'
			})
		},2000) 
	}
	componentWillMount() {
		
	}
	componentDidMount() {
	}

	componentWillReceiveProps(nextProps) {
		// let prizeList = nextProps.prizeList;
		// let list = prizeList.slice();
		// let arr = list.splice(0,10)
		// let nodes = this.renderLists(arr)
		// this.play();
	}
	componentWillUnMount() {
		clearInterval(this.timer)
	}
	render() {
		return (
	    <CardCom title="最新中奖榜">
	    	<div className={styles.wrapper}>
			   	<ul ref="ul" style={{width: '100%',padding: '0 0.3rem',position: 'absolute', top: (-this.state.top/100 + 'rem'), transition: this.state.transition}}>
			   		{this.state.nodes}
			   	</ul>	
	    	</div>
	    </CardCom>
	  );
	}
}

export default PrizeList;
