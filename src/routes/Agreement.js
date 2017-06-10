import React from 'react';
import { connect } from 'dva';
import styles from './Agreement.css';
import WrapperNav from '../components/Common/WrapperNav';

function Agreement({dispatch}) {
  return (
    <div className={styles.normal}>
    	<WrapperNav title={'法律声明'} dispatch={dispatch} />
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Agreement);
