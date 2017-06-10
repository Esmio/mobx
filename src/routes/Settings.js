import React from 'react';
import { connect } from 'dva';
import styles from './Settings.css';
import WrapperNav from '../components/Common/WrapperNav';
import SettingsSection from '../components/Settings/SettingsSection';

function Settings({dispatch}) {
  return (
    <div className={styles.normal}>
    	<WrapperNav title={'设置'} dispatch={dispatch} />
    	<SettingsSection dispatch={dispatch}/>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Settings);
