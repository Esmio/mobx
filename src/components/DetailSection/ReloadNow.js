import React from 'react';
import styles from './ReloadNow.css';

class ReloadNow extends React.Component {
	constructor(props) {
		super(props);
		this.handleButtonClick = this.handleButtonClick.bind(this)
	}
	handleButtonClick(){
		//const {dispatch} = this.props
		console.log('去充值')
	}
	render() {
		let {tab, opType} = this.props
		return (
		  <div className={styles.normal}>
				<div className={styles.img}></div>
				<div className={styles.note}>暂无{opType}{tab.slice(-2)}记录</div>
				<div className={styles.incite}>大奖不等待，速去购彩吧~</div>
				{opType === '充值' ? <div className={styles.button} onClick={this.handleButtonClick}>立即充值</div> : null}
		  </div>
		);
	}
  
}

export default ReloadNow;
