import React from 'react';
import { connect } from 'dva';
import styles from './TopUpRecordPage.css';
import WrapperNav from '../components/Common/WrapperNav';
import TopUpDetail from '../components/DetailSection/TopUpDetail';


function TopUpRecordPage({dispatch, topUpData}) {
  return (
    <div className={styles.normal}>
    	<WrapperNav title={'充值记录'} dispatch={dispatch} />
    	<TopUpDetail dispatch={dispatch} topUpData={topUpData} opType="充值"/>
    </div>
  );
}

function mapStateToProps(state) {
	const {topUpData} = state.mine
  return {topUpData};
}

export default connect(mapStateToProps)(TopUpRecordPage);
