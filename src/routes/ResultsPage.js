import React from 'react';
import { connect } from 'dva';
import styles from './ResultsPage.css';
import LottoMain from '../components/StartLotto/LottoMain';
import WrapperNav from '../components/Common/WrapperNav';

function ResultsPage({resultsData, gameNameInChinese, location, dispatch, history}) {
	console.log('resultpagelocation',location);
  return (
    <div className={styles.normal}>
    	<WrapperNav history={history} title={gameNameInChinese}/>
    	<LottoMain startLottoData={resultsData} record={true}/>
    </div>
  );
}

function mapStateToProps(state) {
	const { resultsData, gameNameInChinese } = state.startLotto;
  return {resultsData, gameNameInChinese};
}

export default connect(mapStateToProps)(ResultsPage);
