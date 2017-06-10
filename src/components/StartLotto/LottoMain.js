import React from 'react';
import styles from './LottoMain.css';
import LottoItem from './LottoItem';
import { connect } from 'dva';

function renderItems(arr, dispatch, record) {
	if(!arr){
		return null;
	}
	const nodes = arr.map((item, index)=>(
		<LottoItem item={item} key={index} record={record} dispatch={dispatch}/>
	))
	return nodes;
}

function LottoMain({startLottoData, dispatch, record}) {
  return (
    <div className={styles.normal}>
    	{renderItems(startLottoData, dispatch, record)}
    </div>
  );
}


export default LottoMain;
