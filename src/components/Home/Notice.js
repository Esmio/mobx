import React from 'react';
import styles from './Notice.css';

function Notice() {
  return (
    <div className={styles.normal}>
      <span className={styles.title}>公告</span><marquee className={styles.marquee}>下载106彩票手机APP即送16元礼金，祝您赢大奖，满106元就可提款，还在等什么呢？赶快加入106吧</marquee>
    </div>
  );
}

export default Notice;
