import React from 'react';
import styles from './HotLotteryCard.css';
import CardCom from './CardCom';
import LotteryOption from './LotteryOption';

function renderItems(arr, textColors, hot, dispatch) {
	let items = arr.map((item, index)=>{
		const optionProps = {
			item: item,
			color: textColors[index],
			hot: hot,
			key: index,
			index: index,
			dispatch: dispatch
		}
		return  <LotteryOption {...optionProps} />
	})
	return items
}

function HotLotteryCard({gameInfosHot, dispatch}) {
	if(!gameInfosHot) {
		return null
	}
	const textColors = ['#4292cd','#ef2d0e','#18a53d','#e79811']
	const hot = 1
 	return(
 		<CardCom title="热门彩票">
 			{renderItems(gameInfosHot, textColors, hot, dispatch)}
 		</CardCom>
 	)
}


export default HotLotteryCard;
