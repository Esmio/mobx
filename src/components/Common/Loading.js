import React from 'react';
import styles from './Loading.css';

function Loading() {
  return (
    <div className={styles.normal}>
      	<div className={styles.loaderbox} style={{display : this.state.loader ? 'flex' : 'none'}}>
	      	<div className={styles.loader}>Loading...</div>
	    </div>
    </div>
  );
}

export default Loading;
