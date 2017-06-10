import React from 'react';
import styles from './TrendContent.css';
import { Button, Toast } from 'antd-mobile';

class TrendContent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			keyNum: 0,
			top: 0,
			marginTop: 1.3,
			navigationBar: '',
			tabArr: [],
			chartItemArr: [],
			loader: true,
			buttonNumber: 40
		}
		this.handleTabsClick = this.handleTabsClick.bind(this);
		this._renderTabs = this._renderTabs.bind(this);
	}
	$(str) {
		return document.querySelector(str);
	}
	getQueryString(name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
	    var result = window.location.search.substr(1).match(reg);
	    if (result!=null) {
			return result[2];
	    } else {
			return null;
	    };
	}
	componentWillMount() {
		let gameUniqueId = this.getQueryString('gameUniqueId')
		const {tabArr, chartItemArr, marginTop} = this.chooseButtonsAndBalls(gameUniqueId)
		this.setState({tabArr, chartItemArr, marginTop})
	}
	chooseButtonsAndBalls(id){
		let tabArr = ['万','千','百','十','个'],
			chartItemArr = [0,1,2,3,4,5,6,7,8,9],
			marginTop = 1.3;
		switch(id){
			case 'HF_BJPK10' : 
			case 'HF_LFPK10' : {
				tabArr = ['一位', '二位', '三位', '四位', '五位', '六位', '七位', '八位', '九位', '十位'];
				chartItemArr = [1,2,3,4,5,6,7,8,9,10];
				marginTop = 1.7;
				break;
			}
			case 'HF_SHD11' : 
			case 'HF_GDD11' : 
			case 'HF_JXD11' : 
			case 'HF_SDD11' : 
	    	case 'HF_AHD11' : {
				chartItemArr = ['01','02','03','04','05','06','07','08','09','10','11'];
	    		break;
	    	}
	    	case 'HF_AHK3' : 
	    	case 'HF_JSK3' : 
	    	case 'HF_GXK3' : {
	    		chartItemArr = [1,2,3,4,5,6];
	    		break;
	    	}
		}
		return {tabArr, chartItemArr, marginTop}
	}
	componentWillUnmount() {
		let $ = this.$;
		let canvas = $('canvas');
		canvas.remove();
	}

	componentWillReceiveProps(nextProps) {
		const {navigationBar} = nextProps
		if(navigationBar==='1') {
			this.setState({
				top: 0.9,
			})
		}
	}
	componentDidMount() {
	}
	componentDidUpdate()  {
		let canvas = {}
		if(this.$('canvas')) {
			canvas = this.$('canvas')
			canvas.width = canvas.width;
			canvas.height = canvas.height;
		}else {
			canvas = document.createElement('canvas');
			let html = this.$('html');
			html.appendChild(canvas)
			canvas.style.position = 'absolute'
			canvas.width = html.offsetWidth;
			canvas.height = html.offsetHeight;
			canvas.style.top='0px';
			canvas.style.left='0px';	
		}
		let ctx = canvas.getContext('2d');
		ctx.lineWidth = 3;
		ctx.beginPath();
		ctx.strokeStyle= '#5891db';
		let {refs} = this
		for(let i = 0; ; i++) {
			let x = 0 , y = 0, ele = refs['circle-'+i];
			if(!ele) break;
			x = ele.offsetLeft + ele.clientWidth/2;
			y = ele.offsetTop + ele.clientHeight/2;
			if(i === 0) {
				ctx.moveTo(x, y)
			}else {
				ctx.lineTo(x, y)
			}
		}
		ctx.stroke();
		ctx.closePath();
		this.renderMissings()

	}
	handleTabsClick(e) {
		const keyNum = parseInt(e.target.dataset.index);
		this.setState({keyNum})
	}
	getTapsLength(){
		const sampleJson = this.props.resultsData[0];
		const length = sampleJson.openCode.split(',').length;
		return length;
	}
	_renderTabs() {
		const {tabArr} = this.state;
		let length = this.getTapsLength()
		let {keyNum} = this.state;
		let currentTabArr = tabArr.slice(-length);
		let nodes = currentTabArr.map( (item, index) => {
			const style = keyNum === index ? {boxShadow: '0px 5px 3px #1c378a'} : null
			return <span className={length > 5 ? styles.tapFix : styles.tap} key={index} style={style} data-index={index} onClick={this.handleTabsClick}>{item}</span>
		})
		return nodes
	}
	_renderTableSpecificRow(title, bg, defaultText, k) {
		const {chartItemArr} = this.state;
		const nodes = chartItemArr.map((item, index)=>{
			let refStr = k ? `M-${index}-${k}` : `N-${index}`
			return <span className={styles.item} ref={refStr} key={index}>{defaultText ? item : ''}</span>
		})
		return <div className={styles.chartLine} style={{backgroundColor:bg}}><span className={styles.chineseTitle}>{title}</span>{nodes}</div>
	}
	_renderTableRow(lineData, lineKey) {
		const {chartItemArr} = this.state;
		const {openCode} = lineData;
		let openCodeArr = openCode.split(',');
		let {keyNum} = this.state;
		let showNum = parseInt(openCodeArr[keyNum]);
		let lineStyle = lineKey%2!==0 ? {backgroundColor: '#ddd'} : null;
		const nodes = chartItemArr.map((item, index)=>{
			const refStr = 'circle-'+ lineKey;
			const itemRef = `item-${index}-${lineKey}`
        	if(this.refs[itemRef] && this.refs[itemRef].childNodes[0] && this.refs[itemRef].childNodes[0].nodeName==='#text') this.refs[itemRef].innerText = ''
			const node = item == showNum ? <span className={styles.showNum} ref={refStr}>{item}</span> : null;
			return <span className={styles.itemMiss} ref={itemRef} key={index}>{node}</span>
		})
		let {planNo} = lineData;
		let {length} = planNo.toString();
		if(length < 3){
			let j = 3 - length;
			while(j > 0) {
				planNo = '0' + planNo;
				j--
			}
		}
		return <div key={lineKey} style={lineStyle} className={styles.chartLine}><span className={styles.itemTitle}>{planNo}</span>{nodes}</div>
	}
	_renderTableLines() {
		const {resultsData} = this.props;
		const nodes = resultsData.map((item, lineKey)=>{
			return this._renderTableRow(item, lineKey)
		})
		return nodes
	}
	renderColumnMissings(j){
		let {buttonNumber} = this.state;
        let numbers = parseInt(buttonNumber, 10)
		let num = 1, times = 0, max = 0, seq = 0, maxSeq = 0;
		for(let i = 0; ;i++){
			let str = `item-${j}-${i}`;
			const ele = this.refs[str]
			if(!ele) break;
			let child = ele.childNodes
			let itemIsText = ele.childNodes[0] && ele.childNodes[0].nodeName === '#text'
			if(child.length === 0 || itemIsText){
				ele.innerText = num;
				max = max > num ? max : num 
                num++
                seq = 0
			}else{
				num = 1
				times++
                seq++
                maxSeq = maxSeq > seq ? maxSeq : seq;
			}
			let average = times === 0 ? numbers : parseInt(numbers/times)
            let dict = [average, max];
            dict.map((item, index)=>{
                let eleMinssing = this.refs[`M-${j}-${index}`]
                eleMinssing.innerText = item
            })
		}
	}
	renderMissings(){
		let {chartItemArr} = this.state;
		for(let i = 0; i < chartItemArr.length; i++){
            this.renderColumnMissings(i)
        }
	}
	render() {
		let {resultsData} = this.props;
		let navigationBar = this.getQueryString('navigationBar')
		let {top, marginTop} = this.state;
		if(navigationBar==='1') top = 0.9;
		let FixedTop = (marginTop + top).toFixed(1);
		if(!resultsData) return null;
	 	let barStyle={}, chartStyle={};
		let length = this.getTapsLength()
	  return (
	    <div className={styles.normal}>
	      <div className={length>5 ? styles.tapBarFix : styles.tapBar} style={{top : `${top}rem`, height: `${marginTop}rem`}}>
	      	{this._renderTabs()}
	      </div>
	      <div className={styles.chart} id="chart" style={{marginTop : `${FixedTop}rem`}}>
	      	{this._renderTableSpecificRow("期数",'#ddd', true)}
	      	{this._renderTableLines()}
	      	{this._renderTableSpecificRow("平均遗漏",'#51c9eb',false, '0')}
	      	{this._renderTableSpecificRow("最大遗漏",'#ddd', false, '1')}
	      </div>
	    </div>
	  );
	}
}

export default TrendContent;
