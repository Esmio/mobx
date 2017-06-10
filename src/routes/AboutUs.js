import React from 'react';
import { connect } from 'dva';
import styles from './AboutUs.css';
import WrapperNav from '../components/Common/WrapperNav';


function AboutUs({dispatch}) {
  return (
    <div className={styles.normal}>
    	<WrapperNav title={'关于我们'} dispatch={dispatch} />
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(AboutUs);
