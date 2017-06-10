import React from 'react';
import { connect } from 'dva';
import styles from './MessagePage.css';
import DropButtonsNav from '../components/Common/DropButtonsNav';
import MessageSection from '../components/SettingSection/MessageSection';

function MessagePage({dispatch}) {
	let buttons = ['全部消息', '普通消息', '优惠消息', '出入款消息']
  return (
    <div className={styles.normal}>
    	<DropButtonsNav dispatch={dispatch} buttons={buttons}/>
    	<MessageSection dispatch={dispatch} />
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(MessagePage);
