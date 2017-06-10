import React from 'react';
import styles from './OrderInfo.css';
import {routerRedux} from 'dva/router';

import img_dai from '../../assets/image/dai.png'
import img_win from '../../assets/image/jiangli.png'
import img_open from '../../assets/image/dingdan.png'

class OrderInfo extends React.Component {
    constructor(props) {
        super(props);
        this._renderItems = this._renderItems.bind(this);
        this.handleAllOrdersClick = this.handleAllOrdersClick.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }
    static defaultProps = {
       menus : [
            {
                img: img_dai,
                name: '待开奖订单',
                buttonIndex: '2'
            },
            {
                img: img_win,
                name: '中奖订单',
                buttonIndex: '1'
            },
            {
                img: img_open,
                name: '已开奖订单',
                buttonIndex: '4'
            }
        ] 
    }
    handleMenuClick(e){
        const {dispatch} = this.props;
        while(!e.target.dataset.index){
            e.target = e.target.parentNode;
        }
        let {index} = e.target.dataset;
        let query={index}
    }
    _renderItems(){
        const {menus} = this.props;
        let nodes = menus.map((item, index)=>{
            let {img, name, buttonIndex} = item
            return (
                <div className={styles.item} key={index} data-index={buttonIndex} onClick={this.handleMenuClick}>
                    <img className={styles.img} src={img}/>
                    <span className={styles.name}>{name}</span>
                </div>
            )
        })
        return nodes
    }
    handleAllOrdersClick(){
        const {dispatch} = this.props
        dispatch({type: 'mine/getOrdersList', payload: {buttonIndex: '0'}})
        dispatch(routerRedux.push({
            pathname : 'orderlist'
        }))
    }
    render() {
        return (
            <div className={styles.normal}>
                <div className={styles.header}>
                    <span className={styles.mytext}>我的彩票</span>
                    <span className={styles.allOrder} onClick={this.handleAllOrdersClick}>查看全部订单</span>
                    <span className={styles.nextIcon}></span>
                </div>
                <div className={styles.content}>
                    {this._renderItems()}
                </div>
            </div>
        );
    }
}

export default OrderInfo;
