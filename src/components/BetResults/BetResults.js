import React from 'react';
import styles from './BetResults.css';
import {routerRedux} from 'dva/router';
import itembg from '../../assets/image/order_bottom.png';

class BetResults extends React.Component {
	constructor(props) {
		super(props);
		this._renderBetItemsList = this._renderBetItemsList.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}
	handleDelete(e) {
		let {dispatch} = this.props;
		let {index} = e.target.dataset;
		console.log(index)
		dispatch({type: 'betresults/delete', payload: index})
	}

	componentWillMount() {
		const { dispatch, betList } = this.props;
	}
	
	_renderBetItemsList(){
		let {betList} = this.props;
		let {length} = betList;
		let betItemStyle = {
			backgroundImage: `url(${itembg})`,
			backgroundRepeat: 'no-repeat',
			backgroundSize: '100%',
			backgroundPosition: '0 1.39rem'
		}
		let normalItemStyle = {
			borderBottom: '.01rem solid #f4f4f4'
		}
		/*
			{
				amount: 2,
				betString: "||5||",
				gameplayMethod: "DN",
				numberOfUnits: 1,
				pricePerUnit: 2,
				returnMoneyRatio: 0
			}
		*/
		let items = betList.map((item, index)=>{
			console.log('betResults.js', item)
			let {betString, numberOfUnits, gameplayMethod, pricePerUnit, amount, gameMathString} = item;
			return (
				<div className={styles.betItem} style={ index === length-1 ? betItemStyle : normalItemStyle} key={index}>
					<span className={styles.itemText}>
						<span className={styles.result}>{betString}</span>
						<span className={styles.number}>{gameMathString} {numberOfUnits}注{amount}元</span>
					</span>
					<span className={styles.delete} data-index={index} onClick={this.handleDelete}></span>
				</div>
			)
		})
		return items;
	}
	render() {
		return (
		    <div className={styles.normal}>
		    	<div className={styles.orderTop}></div>
		    	{this._renderBetItemsList()}
		    </div>
		  );
	}
  
}

export default BetResults;
