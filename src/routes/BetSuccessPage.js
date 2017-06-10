import React from 'react';
import { connect } from 'dva';
import styles from './BetSuccessPage.css';
import BetSuccessNav from '../components/BetSuccess/BetSuccessNav';
import BetSuccess from '../components/BetSuccess/BetSuccess';

function BetSuccessPage({dispatch, current}) {
	let navProps = {
		dispatch
	},
    successProps = {
      dispatch,
      current
    };

  return (
    <div className={styles.normal}>
    	<BetSuccessNav {...navProps}/>
    	<BetSuccess {...successProps}/>
    </div>
  );
}

function mapStateToProps(state) {
  const {current} = state.betresults
  return {current};
}

export default connect(mapStateToProps)(BetSuccessPage);
