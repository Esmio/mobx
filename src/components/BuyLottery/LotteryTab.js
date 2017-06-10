import React from 'react';
import styles from './LotteryTab.css';
import { Tabs } from 'antd-mobile';
import { connect } from 'dva';
import LotteryTapItem from './LotteryTapItem';

const TabPane = Tabs.TabPane

function callback(key) {
	console.log(key);
}

function rendertabs(arr, buyLotteryDisplay, type) {
	if(!arr) {
		return null;
	}
	switch(type) {
		case 'all':
			arr = arr;
			break;
		case 'hf': 
			let hArr=[]
			arr.map((item,index)=>{
				if(/^HF/.test(item.gameUniqueId)){
					hArr.push(item)
				}
			})
			arr = hArr
			break;
		case 'lf':
			let lArr = []
			arr.map((item, index)=>{
				if(!/^HF/.test(item.gameUniqueId)){
					lArr.push(item)
				}
			})
			arr = lArr;
			break;
	}
	const nodes = arr.map((item, index)=>{
		return <LotteryTapItem buyLotteryDisplay={buyLotteryDisplay} item={item} key={index}/>
	})
	return nodes
}

function LotteryTab({gameInfosRecommend, buyLotteryData, buyLotteryDisplay}) {
  return (
    <div className={styles.normal}>
      <Tabs defaultActiveKey="1" swipeable={false} onChange={callback}>
	      <TabPane tab="全部彩种" key="1" >
	        <div className={styles.tabContent}>
	        	{rendertabs(buyLotteryData, buyLotteryDisplay, 'all')}
	        </div>
	      </TabPane>
	      <TabPane tab="高频彩" key="2">
	        <div className={styles.tabContent}>
	          {rendertabs(buyLotteryData, buyLotteryDisplay, 'hf')}
	        </div>
	      </TabPane>
	      <TabPane tab="低频彩" key="3">
	        <div className={styles.tabContent}>
	          {rendertabs(buyLotteryData, buyLotteryDisplay, 'lf')}
	        </div>
	      </TabPane>
	    </Tabs>
    </div>
  );
}

function mapStateToProps(state) {
	const { gameInfosRecommend, buyLotteryData, buyLotteryDisplay } = state.home
	return { gameInfosRecommend, buyLotteryData, buyLotteryDisplay }
}

export default connect(mapStateToProps)(LotteryTab);
