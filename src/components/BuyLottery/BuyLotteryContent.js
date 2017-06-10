import React from 'react';
import styles from './BuyLotteryContent.css';
import { connect } from 'dva';
import BuyNavBar from './BuyNavBar.js';
import LotteryTab from './LotteryTab';

function BuyLotteryContent({dispatch,buyLotteryDisplay}) {
	const buyNavBarProps = {
		changeDisplayType(){
			dispatch({type: 'home/changeDisplay'})
		},
		displayType: buyLotteryDisplay
	}
	const lotteryTabProps = {
		displayType: buyLotteryDisplay
	}
  return (
    <div className={styles.normal}>
    	<BuyNavBar {...buyNavBarProps} />
    	<LotteryTab {...lotteryTabProps}/>
    </div>
  );
}
function mapStateToProps(state) {
	const {buyLotteryDisplay} = state.home
	console.log('buyLotteryDisplay',buyLotteryDisplay)
	return {buyLotteryDisplay}
}

export default connect(mapStateToProps)(BuyLotteryContent);
