import React from 'react';
import { connect } from 'dva';
import styles from './SingleDetailPage.css';
import WrapperNav from '../components/Common/WrapperNav';
import SingleDetail from '../components/DetailSection/SingleDetail';


function SingleDetailPage({dispatch, singleDetailData}) {
  return (
    <div className={styles.normal}>
    	<WrapperNav title={'账单详情'} dispatch={dispatch} />
			<SingleDetail singleDetailData={singleDetailData}/>
    </div>
  );
}

function mapStateToProps(state) {
	const {singleDetailData} = state.mine;
  return {singleDetailData};
}

export default connect(mapStateToProps)(SingleDetailPage);
