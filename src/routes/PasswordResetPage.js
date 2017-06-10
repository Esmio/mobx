import React from 'react';
import { connect } from 'dva';
import styles from './PasswordResetPage.css';
import WrapperNav from '../components/Common/WrapperNav';
import PasswordReset from '../components/SettingSection/PasswordReset';

function PasswordResetPage({dispatch}) {
	console.log(location)
	let {search} = location;
	let i = /^\?i=(.*)$/.exec(search)[1]
	let dict = ['登录', '交易'],
		modeDict = ['PASSWORD', 'SECURITY_PASSWORD'];
	let title = `修改${dict[i]}密码`, mode = modeDict[i];
  return (
    <div className={styles.normal}>
    	<WrapperNav title={title} dispatch={dispatch} />
    	<PasswordReset mode={mode} dispatch={dispatch}/>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(PasswordResetPage);
