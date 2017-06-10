import React from 'react';
import { connect } from 'dva';
import styles from './PasswordPage.css';
import WrapperNav from '../components/Common/WrapperNav';
import PasswordSetting from '../components/SettingSection/PasswordSetting';


function PasswordPage({dispatch}) {
  return (
    <div className={styles.normal}>
    	<WrapperNav title={'密码管理'} dispatch={dispatch} />
		<PasswordSetting dispatch={dispatch}/>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(PasswordPage);
