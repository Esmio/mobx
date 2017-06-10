import React from 'react';
import { connect } from 'dva';
import styles from './RegisterPage.css';
import WrapperNav from '../components/Common/WrapperNav';
import RegisterSection from '../components/register/RegisterSection';

function RegisterPage({dispatch}) {
  return (
    <div className={styles.normal}>
    	<WrapperNav title={'立即注冊'} dispatch={dispatch} />
    	<RegisterSection dispatch={dispatch}/>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(RegisterPage);
