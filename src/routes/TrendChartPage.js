import React from 'react';
import { connect } from 'dva';
import styles from './TrendChartPage.css';
import TrendNav from '../components/TrendChart/TrendNav';
import TrendContent from '../components/TrendChart/TrendContent';

function TrendChartPage({resultsData, gameUniqueId, navigationBar, dispatch}) {
  return (
    <div className={styles.normal}>
    	{navigationBar==='1' ? <TrendNav title={'基本走势'} dispatch={dispatch}/> : null}
    	<TrendContent resultsData={resultsData} navigationBar={navigationBar}/>
    </div>
  );
}

function mapStateToProps(state) {
  const {resultsData, gameUniqueId, navigationBar } = state.startLotto;
  return {resultsData, gameUniqueId, navigationBar};
}

export default connect(mapStateToProps)(TrendChartPage);
