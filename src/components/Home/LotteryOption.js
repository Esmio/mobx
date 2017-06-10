import React from 'react';
import styles from './LotteryOption.css';
import { Link } from 'dva';
import { routerRedux } from 'dva/router';

class LotteryOption extends React.Component {
	constructor(props) {
		super(props);
		this.handleOptionClick = this.handleOptionClick.bind(this)
	}
	static defaultProps =  {
		item: {},
		color: '#333',
		hot: 3,
		index: 0
	}
	handleOptionClick() {
		const {item, dispatch} = this.props;
		const {gameUniqueId} = item;
		dispatch(routerRedux.push({
			pathname: '/play',
			query: { gameUniqueId}
		}))
	}
	render() {
		const {item, hot, color, index} = this.props;
		let borderLeft = '.01rem solid #f5f5f5';
		let borderTop = 'none';
		if(index%2!==0){
			 borderLeft = 'none'
		}
		if(index===0||index===1) {
			borderTop = '.01rem solid #f5f5f5'
		}
		return (
	    <div className={styles.option} style={{borderLeft:borderLeft,borderTop:borderTop}} onClick={this.handleOptionClick}>
			<div className={styles.text} style={{order: hot}}>
				<span style={{color: color }}  className={styles.title}>{item.gameNameInChinese}</span>
				<span className={styles.promotion}>{item.gameDescription}</span>
			</div>
			<div className={styles.logo}>
				<img className={styles.logoimg} src={item.gameIconUrl}/>				
			</div>
		</div>
	  );
	}
}

export default LotteryOption;
