import React from 'react';
import styles from './NavBarCom.css';
import { NavBar, Icon } from 'antd-mobile';
import img_personal from '../../assets/image/index_personal.png'

class NavBarCom extends React.Component {
    constructor(props) {
        super(props);
    }
    _renderMineIcon() {
      return (
        <div key='1' style={{
          width: '0.9rem',
          height: '0.9rem',
          background: `url(${img_personal}) center center /  0.88rem 0.88rem no-repeat`}}
          onClick={()=>console.log('clickIcon')}
        />
      )
    }
    _renderRegisterIcon() {
      return (
        <span onClick={()=>{
          console.log('register')
        }}></span>
      )
    }
    _renderLoginIcon() {
      return (
        <span onClick={()=>{
          console.log('login')
        }}></span>
      )
    }
    render() {
      return (
        <div className={styles.normal}>
            <NavBar
                mode="light"
                style={{background: 'none', color: '#fff', fontWeight: "600", height: ".9rem", fontFamily: 'MicroSoft Yahei'}}
                iconName={false}
                leftContent={this._renderMineIcon()}
                rightContent={[
                    <Icon key="0" type={img_personal} style={{marginRight: '0.32rem'}} />
                ]}
            ><span style={{color: '#fff', fontSize: '.42rem'}}>106彩票</span></NavBar>
        </div>
      );
    }
  
}

export default NavBarCom;
