import React from 'react';
import { connect } from 'dva';
import styles from './OrderDetailPage.css';
import WrapperNav from '../components/Common/WrapperNav';
import OrderDetail from '../components/DetailSection/OrderDetail';


function OrderDetailPage({dispatch, orderDetailData}) {
  return (
    <div className={styles.normal}>
    	<WrapperNav title={'彩票订单详情'} dispatch={dispatch} />
		<OrderDetail orderDetailData={orderDetailData} dispatch={dispatch} />
    </div>
  );
}

function mapStateToProps(state) {
	const {orderDetailData} = state.mine
	console.log('orderDetailData', orderDetailData)
  return {orderDetailData};
}

export default connect(mapStateToProps)(OrderDetailPage);
