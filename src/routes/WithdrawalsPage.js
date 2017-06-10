import React from 'react';
import { connect } from 'dva';
import styles from './WithdrawalsPage.css';
import WrapperNav from '../components/Common/WrapperNav';
import TopUpDetail from '../components/DetailSection/TopUpDetail';

function WithdrawalsPage({dispatch, withdrawals}) {
  return (
    <div className={styles.normal}>
    	<WrapperNav title={'提款记录'} dispatch={dispatch} />
		<TopUpDetail dispatch={dispatch} topUpData={withdrawals} opType="提现"/>
    </div>
  );
}
function mapStateToProps(state) {
	const {withdrawals} = state.mine
	console.log(withdrawals)
  return {withdrawals};
}

export default connect(mapStateToProps)(WithdrawalsPage);
