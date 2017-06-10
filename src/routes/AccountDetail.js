import React from 'react';
import { connect } from 'dva';
import styles from './AccountDetail.css';
import WrapperNav from '../components/Common/WrapperNav';
import DetailSection from '../components/DetailSection/DetailSection';

function AccountDetail({dispatch, detailData}) {
  return (
    <div className={styles.normal}>
    	<WrapperNav title={'账户明细'} dispatch={dispatch} />
			<DetailSection detailList={detailData} dispatch={dispatch}/>
    </div>
  );
}

function mapStateToProps(state) {
  const {detailData} = state.mine
  return {detailData};
}

export default connect(mapStateToProps)(AccountDetail);
