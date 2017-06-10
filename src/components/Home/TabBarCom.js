import React from 'react';
import styles from './TabBarCom.css';
import { TabBar, Icon } from 'antd-mobile';
import TabHomeContent from './TabHomeContent';
import { connect } from 'dva';
import BuyLotteryContent from '../BuyLottery/BuyLotteryContent';
import StartLottoContent from '../StartLotto/StartLottoContent';
import MineContent from '../Mine/MineContent';

import ButtomBarHome from '../../assets/image/bottom_bar_icon1.png'
import ButtomBarHomeActive from '../../assets/image/bottom_bar_icon11.png'
import ButtomBarBet from '../../assets/image/bottom_bar_icon5.png'
import ButtomBarBetActive from '../../assets/image/bottom_bar_icon55.png'
import ButtomBarRun from '../../assets/image/bottom_bar_icon3.png'
import ButtomBarRunActive from '../../assets/image/bottom_bar_icon33.png'
import ButtomBarMine from '../../assets/image/bottom_bar_icon4.png'
import ButtomBarMineActive from '../../assets/image/bottom_bar_icon44.png'

class TabBarCom extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			selectedTab: 'blueTab',
			hidden: false
		}
	}
  handleOnpress() {
    const {dispatch} = this.props;
  }
	renderContent(pageText) {
		return (
			<div style={{backgroundColor: 'white', height: '100%', textAlign: 'center'}}>
				<div style={{ paddingTop: 60 }}>你一点击“{pageText}”</div>
				<a style={{ display: 'block', marginTop: 40, marginBottom: 600, color: '#108ee9' }} onClick={(e)=>{
					this.setState({
						hidden: !this.state.hidden,
					})
				}}
				>
					点击切换显示/隐藏
				</a>
			</div>
		)
	}
	render() {
		return (
			<TabBar
				unselectedTintColor="#949494"s
				tintColor="#33A3F4"
				barTintColor="white"
				hidden={this.state.hidden}
        style={{height: '2rem'}}
			>
				<TabBar.Item
					title="首页"
					key="首页"
					icon={<div style={{
						width: '0.44rem',
						height: '0.44rem',
						background: 'url('+ButtomBarHome+') center center /  0.42rem 0.42rem no-repeat'}}
					/>
					}
					selectedIcon={<div style={{
            width: '0.44rem',
            height: '0.44rem',
            background: 'url('+ButtomBarHomeActive+') center center /  0.42rem 0.42rem no-repeat' }}
          /> 
        	}
          selected={this.state.selectedTab === 'blueTab'}
          badge={1} 
          onPress={()=>{
          	this.setState({
          		selectedTab: 'blueTab'
          	})
          }}
          data-seed="logId"        
				>
					<TabHomeContent/>
				</TabBar.Item>
				<TabBar.Item
          icon={<div style={{
						width: '0.44rem',
						height: '0.44rem',
						background: 'url('+ButtomBarBet+') center center /  0.42rem 0.42rem no-repeat'}}
					/>
					}
					selectedIcon={<div style={{
            width: '0.44rem',
            height: '0.44rem',
            background: 'url('+ButtomBarBetActive+') center center /  0.42rem 0.42rem no-repeat' }}
          /> 
        	}
          title="购彩"
          key="购彩"
          badge={'买'}
          selected={this.state.selectedTab === 'redTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'redTab',
            });
          }}
          data-seed="logId1"
        >
          <BuyLotteryContent/>
        </TabBar.Item>
        <TabBar.Item
          icon={
            <div style={{
              width: '0.44rem',
              height: '0.44rem',
              background: 'url('+ButtomBarRun+') center center /  0.42rem 0.42rem no-repeat' }}
            />
          }
          selectedIcon={
            <div style={{
              width: '0.44rem',
              height: '0.44rem',
              background: 'url('+ButtomBarRunActive+') center center /  0.42rem 0.42rem no-repeat' }}
            />
          }
          title="开奖"
          key="开奖"
          dot
          selected={this.state.selectedTab === 'greenTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'greenTab',
            });
          }}
        >
          <StartLottoContent history={this.props.history}/>
        </TabBar.Item>
        <TabBar.Item
          icon={
            <div style={{
              width: '0.44rem',
              height: '0.44rem',
              background: 'url('+ButtomBarMine+') center center /  0.42rem 0.42rem no-repeat' }}
            />
          }
          selectedIcon={
            <div style={{
              width: '0.44rem',
              height: '0.44rem',
              background: 'url('+ButtomBarMineActive+') center center /  0.42rem 0.42rem no-repeat' }}
            />
          }
          title="我的"
          key="我的"
          selected={this.state.selectedTab === 'yellowTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'yellowTab',
            });
          }}
        >
          {<MineContent/>}
        </TabBar.Item>
			</TabBar>
		)
	}
}


export default TabBarCom;
