import React from 'react';
import { connect } from 'dva';
import styles from './BetResultsPage.css';
import BetResults from '../components/BetResults/BetResults';
import BetResultsNav from '../components/BetResults/BetResultsNav';
import AddBetBanner from '../components/BetResults/AddBetBanner';
import ConfirmBanner from '../components/BetResults/ConfirmBanner';

function BetResultsPage({dispatch, betList, current}) {
	let betResultsProps = {
		dispatch,
		betList
	}
	let navProps = {
		dispatch,
		current
	}
	let addBetProps = {
		dispatch,
		current
	}
	let confirmBannerProps = {
		dispatch,
		betList,
		current
	}
  return (
    <div className={styles.normal}>
    	<BetResultsNav {...navProps}/>
			<AddBetBanner {...addBetProps}/>
    	<BetResults {...betResultsProps}/>
			<ConfirmBanner {...confirmBannerProps}/>
    </div>
  );
}

function mapStateToProps(state) {
	let { betList, current } = state.betresults;
  return { betList, current };
}

export default connect(mapStateToProps)(BetResultsPage);
