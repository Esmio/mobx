import React from 'react';
import { connect } from 'dva';
import styles from './OrderListPage.css';
import DropButtonsNav from '../components/Common/DropButtonsNav';
import OrderListSection from '../components/DetailSection/OrderListSection';

function OrderListPage({dispatch, ordersList, buttonIndex}) {
  return (
    <div className={styles.normal}>
    	<DropButtonsNav dispatch={dispatch} buttonIndex={buttonIndex}/>
    	<OrderListSection ordersList={ordersList} dispatch={dispatch}/>
    </div>
  );
}

function mapStateToProps(state) {
	const {ordersList, buttonIndex} = state.mine
  return {ordersList, buttonIndex};
}

export default connect(mapStateToProps)(OrderListPage);
