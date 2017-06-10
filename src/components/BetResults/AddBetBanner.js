import React from 'react';
import styles from './AddBetBanner.css';
import {routerRedux} from 'dva/router';

class AddBetBanner extends React.Component {
	constructor(props) {
		super(props);
		this.handleSelfBet = this.handleSelfBet.bind(this);
	}
	handleSelfBet() {
		const {dispatch} = this.props;
		dispatch(routerRedux.goBack());
	}
	getRandomBetOne() {
		console.log('random one');
	}
	getRandomBetFive() {
		console.log('random five');
	}
	render() {
		return (
		    <div className={styles.normal}>
		    	<div className={styles.buttons}>
		    		<span className={styles.self} onClick={this.handleSelfBet}>+ 自选号码</span>
		    		<span className={styles.one} onClick={this.handleRandomBetOne}>+ 机选一注</span>
		    		<span className={styles.five} onClick={this.handleRandomBetFive}>+ 机选五注</span>
		    	</div>
		    </div>
		  );
	}
  
}

export default AddBetBanner;
