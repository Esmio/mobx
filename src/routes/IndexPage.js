import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import TabBarCom from '../components/Home/TabBarCom';

function IndexPage({dispatch, selectedTab}) {
  return (
    <div className={styles.normal}>
      <TabBarCom dispatch={dispatch} selectedTab={selectedTab} />
    </div>
  );
}

IndexPage.propTypes = {
};

function mapStateToProps(state) {
	const {selectedTab} = state.home
	return {selectedTab}
}

export default connect(mapStateToProps)(IndexPage);
