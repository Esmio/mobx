import React from 'react';
import styles from './BuyNavBar.css';
import { NavBar, Icon } from 'antd-mobile';
import img_personal from '../../assets/image/icon_back.png';
import img_toplist from '../../assets/image/bar_toplist.png';
import img_toplist2 from '../../assets/image/bar_toplist2.png';


class BuyNavBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.info('thisbuy',this.props)
    let img = this.props.displayType ? img_toplist : img_toplist2;
    const dispatch = this.props.dispatch;
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
            background: `url(${img_personal}) center center /  0.32rem 0.56rem no-repeat`}}
            onClick={()=>console.log('clickLeftIcon')}
          />
          ]}
          rightContent={[
            <div key='1' style={{
            width: '0.98rem',
            height: '0.98rem',
            background: `url(${img}) center center /  0.98rem 0.98rem no-repeat`}}
            onClick={this.props.changeDisplayType}
          />
          ]}
        ><span style={{color: '#fff', fontSize: '.32rem'}}>购彩大厅</span></NavBar>
      </div>
    );
  }
}

export default BuyNavBar;


