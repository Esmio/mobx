import React from 'react';
import styles from './TabHomeContent.css';
import NavBarCom from './NavBarCom';
import CarouselCom from './CarouselCom';
import Notice from './Notice';
import Menu from './Menu';
import HotLotteryCard from './HotLotteryCard';
import MoreLotteryCard from './MoreLotteryCard';
import PrizeList from './PrizeList';

import { connect } from 'dva';

function mapItems(data, target) {
	data.map((item, index)=> {
		let iconKey = item.gameUniqueId,
			iconValue = item.gameIconUrl;
		if(!target[iconKey]) {
			target[iconKey] = iconValue;
		}
	})
}

function TabHomeContent({dispatch, gameInfosHot, gameInfosRecommend, promotionBanners, menuIcons, prizeList}){
	if(!gameInfosHot || !gameInfosRecommend ) {
		return null
	}
	let lotteryIcon = {}
	mapItems(gameInfosHot, lotteryIcon)
	mapItems(gameInfosRecommend, lotteryIcon)
	let lotteryIconStr = JSON.stringify(lotteryIcon)
	localStorage.setItem('lotteryIconStr', lotteryIconStr)
	return (
		<div className={styles.normal}>
			<NavBarCom/>
			<CarouselCom promotionBanners={promotionBanners} dispatch={dispatch}/>
			<Notice/>
			<Menu menuIcons={menuIcons} dispatch={dispatch}/>
			<HotLotteryCard gameInfosHot={gameInfosHot} dispatch={dispatch}/>
			<MoreLotteryCard gameInfosRecommend={gameInfosRecommend} dispatch={dispatch}/>
			<PrizeList prizeList={prizeList}/>
		</div>
	)
}

function mapStateToProps(state) {
	const {announcement, announcements, gameInfosHot, gameInfosRecommend, generalContents, menuIcons, promotionBanners, prizeList} = state.home;
	return {announcement, announcements, gameInfosHot, gameInfosRecommend, generalContents, menuIcons, promotionBanners, prizeList}
}

export default connect(mapStateToProps)(TabHomeContent);
