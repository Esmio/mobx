import React from 'react';
import styles from './MoreLotteryCard.css';
import CardCom from './CardCom';
import LotteryOption from './LotteryOption';

function renderItems(arr, dispatch) {
	let items = arr.map((item, index)=>{
		const optionProps = {
			item: item,
			key: index,
			index: index,
			dispatch
		}
		return  <LotteryOption {...optionProps} />
	})
	return items
}

function MoreLotteryCard({gameInfosRecommend, dispatch}) {
  if(!gameInfosRecommend) {
		return null
	}
 	return(
 		<CardCom title="更多彩种推荐">
 			{renderItems(gameInfosRecommend, dispatch)}
 		</CardCom>
 	)
}

export default MoreLotteryCard;
