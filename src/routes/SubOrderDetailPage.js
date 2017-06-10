import React from 'react';
import { connect } from 'dva';
import styles from './SubOrderDetailPage.css';
import WrapperNav from '../components/Common/WrapperNav';
import SubOrderDetail from '../components/DetailSection/SubOrderDetail';

function SubOrderDetailPage({dispatch, orderDetailData}) {
  return (
    <div className={styles.normal}>
    	<WrapperNav title={'彩票详情'} dispatch={dispatch} />
			<SubOrderDetail dispatch={dispatch} orderDetailData={orderDetailData}/>
    </div>
  );
}

function mapStateToProps(state) {
	const {orderDetailData} = state.mine
  return {orderDetailData};
}

export default connect(mapStateToProps)(SubOrderDetailPage);
