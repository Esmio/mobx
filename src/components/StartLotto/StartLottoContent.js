import React from 'react';
import styles from './StartLottoContent.css';
import StartLottoNav from './StartLottoNav';
import LottoMain from './LottoMain';
import {connect} from 'dva';

function StartLottoContent({history, dispatch, startLottoData}) {
  return (
    <div className={styles.normal}>
      <StartLottoNav/>
      <LottoMain history={history} dispatch={dispatch} startLottoData={startLottoData} />
    </div>
  );
}

function mapStateToProps(state) {
	const {startLottoData} = state.home
	return {startLottoData}
}

export default connect(mapStateToProps)(StartLottoContent);