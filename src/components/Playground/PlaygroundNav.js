import React from 'react';
import styles from './PlaygroundNav.css';
import { NavBar } from 'antd-mobile';

import {chooseButtons} from '../../data/playButtonConfig.js';

import img_personal from '../../assets/image/icon_back.png';
import img_toplist from '../../assets/image/bar_toplist.png';
import img_toplist2 from '../../assets/image/bar_toplist2.png';

class PlaygroundNav extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			display: 'none',
			popover: 'none',
			mask: 'none',
			upButtonSelected: '',
			upIndex: 0,
			downButtonSelected: '',
			downIndex: 0,
			gameMathString: ''
		}
		this.handleBarCenterClick = this.handleBarCenterClick.bind(this)
		this.handleBarRightClick = this.handleBarRightClick.bind(this)
		this.handleMaskClick = this.handleMaskClick.bind(this)
		this._renderButtons = this._renderButtons.bind(this)
		this.handleButtonClick = this.handleButtonClick.bind(this)
		this.switchRenderButtons = this.switchRenderButtons.bind(this)
	}
	componentWillMount() {
		// 初始化
		const {dispatch, gameUniqueId} = this.props
		const {buttonsUp, buttonsDown} = chooseButtons(gameUniqueId)
		// 设置nav默认标题
		let upButtonSelected = buttonsUp instanceof Array ? buttonsUp[0] : buttonsUp['普通'][0], downButtonSelected = '', gameMathString = '';
		if(buttonsDown) {
			downButtonSelected = buttonsDown[upButtonSelected][0]
			gameMathString = `${upButtonSelected}-${downButtonSelected}`;
		}else {
			gameMathString = upButtonSelected;
		}
		this.setState({upButtonSelected, downButtonSelected, gameMathString});
		dispatch({type: 'play/getGameMathString', payload: {gameMathString}});
	}
	handleBarCenterClick() {
		this.setState({
			display: 'flex',
			mask: 'flex'
		})
	}
	handleBarRightClick() {
		this.setState({
			popover: 'flex',
			mask: 'flex' 
		})
	}
	handleMaskClick() {
		this.setState({
			display: 'none',
			popover: 'none',
			mask: 'none'
		})
	}
	handleButtonClick(e) {
		const {dispatch, gameUniqueId} = this.props;
		const {buttonsUp, buttonsDown} = chooseButtons(gameUniqueId)
		const {upButtonSelected, downButtonSelected} = this.state;
		const ButtonSelected = e.target.innerHTML
		const Index = e.target.dataset.index
		const type = e.target.dataset.type
		let gameMathString = '';
		switch(type) {
			case undefined : {
				gameMathString = ButtonSelected;
				this.setState({
					upButtonSelected: ButtonSelected,
					upIndex: Index,
					display: 'none',
					mask: 'none'
				})
				break;
			}
			case 'up': {
				let downButtonStr = buttonsDown[ButtonSelected][0];
				gameMathString = `${ButtonSelected}-${downButtonStr}`;
				this.setState({
					upButtonSelected: ButtonSelected,
					upIndex: Index,
					downButtonSelected: downButtonStr,
					downIndex: '0'
				})
				break;
			}
			case 'down': {
				gameMathString = `${upButtonSelected}-${ButtonSelected}`;
				this.setState({
					downButtonSelected: ButtonSelected,
					downIndex: Index,
					display: 'none',
					mask: 'none'
				})
				break;
			}
			case '普通' : {
				gameMathString = ButtonSelected;
				this.setState({
					upButtonSelected: ButtonSelected,
					upIndex: Index,
					display: 'none',
					mask: 'none'
				})
				break;
			}
			case '胆拖' : {
				gameMathString = ButtonSelected + type;
				this.setState({
					upButtonSelected: ButtonSelected,
					upIndex: parseInt(Index),
					display: 'none',
					mask: 'none'
				})
			}
		}
		dispatch({type: 'play/clearResult'})
		dispatch({type: 'play/getGameMathString', payload:{gameMathString}})
	}
	_renderButtons(type) {
		const {gameUniqueId} = this.props;
		const {buttonsUp, buttonsDown} = chooseButtons(gameUniqueId)
		const {upIndex, downIndex, upButtonSelected} = this.state;
		let title = '', buttonStr='';
		let arr = [], typeIndex = '';
		switch(type) {
			case undefined : {
				arr = buttonsUp;
				typeIndex = upIndex;
				buttonStr = 'upButtonSelected'
				break;
			}
			case 'up': {
				arr = buttonsUp;
				typeIndex = upIndex;
				buttonStr = 'upButtonSelected'
				title = this.state[buttonStr]
				break;
			}
			case 'down' : {
				arr = buttonsDown[upButtonSelected];
				typeIndex = downIndex;
				buttonStr = 'downButtonSelected'
				title = this.state[buttonStr]
				break;
			}
			case '普通' : {
				arr = buttonsUp[type]
				typeIndex = upIndex;
				buttonStr = 'upButtonSelected'
				title=type
				break;
			}
			case '胆拖' : {
				arr = buttonsUp[type]
				typeIndex = upIndex;
				buttonStr = 'upButtonSelected'
				title=type
				break;
			}
		}
		const clickedStyle = {borderColor: '#ef2d0e', borderWidth: '.02rem'}
		const btns = arr.map((item, index)=>{
			if(type === '胆拖') index += 20;
			let style = parseInt(typeIndex) === index ? clickedStyle : {};
			return (<span 
				className={styles.button} 
				onClick={this.handleButtonClick}
				data-index={index}
				data-type={type}
				style={style}
				key={index}>
				{item}
			</span>)
		})
		return (
			<div className={styles.sectionWrap}>
				<span className={styles.sectionTitle}>{title}</span>
	     		<div className={styles.navSection}>
	     			{btns}	     			
	     		</div>
     		</div>
		)
	}
	// 玩法buttons
	switchRenderButtons(gameId) {
		switch(gameId) {
			case 'HF_CQSSC' :
			case 'HF_XJSSC' :
			case 'HF_TJSSC' :
			case 'HF_JXSSC' :
			case 'HF_LFSSC' : 
			case 'X3D' : 
			case 'HF_SHSSL' : 
			case 'PL3' : {
				return(
					<div style={{width: '100%'}}>
						{this._renderButtons('up')}
						{this._renderButtons('down')}
					</div>
				) 
				break;
			}
			case 'HF_BJPK10' :
			case 'HF_LFPK10' : {
				return this._renderButtons()
				break;
			}
			case 'HF_SHD11' : 
			case 'HF_GDD11' : 
			case 'HF_JXD11' : 
			case 'HF_SDD11' : 
	    	case 'HF_AHD11' : {
				return (
					<div style={{width: '100%'}}>
						{this._renderButtons('普通')}
						{this._renderButtons('胆拖')}
					</div>
				)
				break;
			}
			case 'HF_BJ28' : 
	    	case 'HF_SG28' : {
	    		return this._renderButtons()
	    		break;
	    	}
	    	case 'MARK_SIX' : {
	    		return this._renderButtons()
	    		break;
	    	}
	    	case 'HF_CQKL10F' : 
    		case 'HF_TJKL10F' : 
    		case 'HF_GDKL10F' : {
    			return this._renderButtons();
    			break;
    		}
    		case 'HF_AHK3' : 
		    case 'HF_JSK3' : 
		    case 'HF_GXK3' : {
		    	return this._renderButtons();
    			break;
		    }
		}
	}
	render() {
		const {gameUniqueId, gameMathString} = this.props
		const {display, popover, mask, upButtonSelected, downButtonSelected} = this.state
		return (
	    <div className={styles.normal}>
	      <NavBar 
	     		mode="light"
	     		style={{background: 'none', color: '#fff', fontWeight: "600", height: ".9rem", fontFamily: 'MicroSoft Yahei'}}
	     		iconName={false}
	     		leftContent={[
	     			<div key='1' style={{
							width: '0.33rem',
							height: '0.57rem',
							background: `url(${img_personal}) center center /  0.32rem 0.56rem no-repeat`}}
							onClick={()=>{location.href='/home'}}
						/>
		     		]}
		     		rightContent={[
		     			<span 
		     				style={{
		     					fontSize: '.28rem',
		     					fontWeight: '500'
		     				}}
		     				onClick={this.handleBarRightClick}
		     				key='2'>购彩助手</span>
		     		]}
	     	>
	     		<span className={styles.titleMethod}>玩法</span>
	     		<span className={styles.title}
	     			onClick={this.handleBarCenterClick}
	     		>
	    			{gameMathString.replace('大小单双-', '')}
	     			<span className={styles.titleArrow}></span>
	     		</span>
	     	</NavBar>
	     	<div className={styles.selectPane} style={{display: display}}>
	     		<h3 className={styles.paneTitle}>选择玩法</h3>							
	     		{this.switchRenderButtons(gameUniqueId)}
	     	</div>
	     	<div className={styles.popover} style={{display: popover}}>
	     		<span className={styles.betRecord}>投注记录</span>
	     		<span className={styles.startHistory}>开奖历史</span>
	     		<span className={styles.playInstruction}>玩法说明</span>
	     	</div>
	     	<div className={styles.mask} style={{display: mask}} onClick={this.handleMaskClick}>
	     	</div>
	    </div>
	  );
	}
}

export default PlaygroundNav;
