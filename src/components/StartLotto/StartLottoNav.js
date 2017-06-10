import React from 'react';
import styles from './StartLottoNav.css';
import { NavBar, Icon } from 'antd-mobile';
import icon_back from '../../assets/image/icon_back.png';

function StartLottoNav() {
  return (
    <div className={styles.normal}>
		<NavBar 
     		mode="light"
     		style={{background: 'none', color: '#fff', fontWeight: "600", height: ".9rem", fontFamily: 'MicroSoft Yahei'}}
     		iconName={false}
     		leftContent={[
     			<div key='1' style={{
					width: '0.33rem',
					height: '0.57rem',
					background: `url(${icon_back}) center center /  0.32rem 0.56rem no-repeat`}}
					onClick={()=>console.log('clickLeftIcon')}
				/>
     		]}
     		rightContent={[
     		]}
     	><span style={{color: '#fff', fontSize: '.32rem'}}>开奖大厅</span></NavBar>    
     </div>
  );
}

export default StartLottoNav;