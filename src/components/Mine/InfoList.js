import React from 'react';
import styles from './InfoList.css';
import { List } from 'antd-mobile';
import {routerRedux} from 'dva/router';

import img_account_detail from '../../assets/image/account.png';
import img_pay_records from '../../assets/image/pay_records.png';
import img_withdraw from '../../assets/image/withdraw_withdraw.png';
import img_secure from '../../assets/image/secure.png';
import img_bank_manage from '../../assets/image/bank_manage.png';
import img_set from '../../assets/image/set.png';


const Item = List.Item;

class InfoList extends React.Component {
  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this)
    this._renderList = this._renderList.bind(this)
  }

  static defaultProps = {
    list : [
      {
        icon: img_account_detail,
        name: '账户明细',
        target: '/medetail',
        type: 'mine/getAccountDetails'
      },
      {
        icon: img_pay_records,
        name: '充值记录',
        target: 'topupdetail',
        type: 'mine/getTopUpDetail'
      },
      {
        icon: img_withdraw,
        name: '提款记录',
        target: 'withdrawals',
        type: 'mine/getTopUpDetail'
      },
      {
        icon: img_secure,
        name: '账户安全',
        target: 'passwordmanage',
      },
      {
        icon: img_bank_manage,
        name: '银行卡管理',
        target: 'cardmanage'
      },
      {
        icon: img_bank_manage,
        name: '个人信息',
        target: 'message'
      },
      {
        icon: img_set,
        name: '设置',
        target: 'settings',
        className: 'settings'
      }
    ]
  }
  handleItemClick(e){
    while(!e.target.dataset.target){
      e.target = e.target.parentNode;
    }
    let {target, type} = e.target.dataset;
    const {dispatch} = this.props
    if(type) dispatch({type})
    dispatch(routerRedux.push({
      pathname: target
    }))
  }
  _renderList(){
    const {list} = this.props
    let nodes = list.map((item, index)=>{
      const {icon, name, target, type, className} = item
      return <div className={className ? styles[className] : styles.item} key={index} data-target={target} data-type={type} onClick={this.handleItemClick}>
          <img src={icon} className={styles.icon} />
          <span className={styles.itemName}>{name}</span>
          <span className={styles.iconNext}></span>
      </div>
    })
    return nodes
  }
  render() {
    return (
      <div className={styles.normal}>
        {this._renderList()}
      </div>
    );
  }
}

export default InfoList;
