import React from 'react';
import styles from './MineContent.css';
import { connect } from 'dva';
import HeaderTopUp from './HeaderTopUp';
import OrderInfo from './OrderInfo';
import InfoList from './InfoList';

function MineContent({userData, loginData, dispatch}) {
  return (
    <div className={styles.normal}>
    	<HeaderTopUp loginData={loginData} dispatch={dispatch}/>
    	<OrderInfo dispatch={dispatch}/>
    	<InfoList dispatch={dispatch}/>
    </div>
  );
}

function mapStateToProps(state) {
	const {userData} = state.mine
  const {loginData} = state.login
	return {userData, loginData}
}

export default connect(mapStateToProps)(MineContent);
