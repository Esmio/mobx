import React from 'react';
import { connect } from 'dva';
import styles from './LoginPage.css';
import WrapperNav from '../components/Common/WrapperNav';
import LoginSection from '../components/Login/LoginSection';

function LoginPage({dispatch, history, data, isLogin}) {
  return (
    <div className={styles.normal}>
      <WrapperNav title={'登录'} dispatch={dispatch} />
      <LoginSection dispatch={dispatch} history={history}/>  
    </div>
  );
}

function mapStateToProps(state) {
  const { data, isLogin } = state.login
  return { data, isLogin };
}

export default connect(mapStateToProps)(LoginPage);
