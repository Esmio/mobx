import React from 'react';
import { connect } from 'dva';
import styles from './BindBankCardPage.css';

function BindBankCardPage() {
  return (
    <div className={styles.normal}>
      Route Component: BindBankCardPage
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(BindBankCardPage);
