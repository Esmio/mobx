import React from 'react';
import styles from './Menu.css';
import {routerRedux} from 'dva/router';


class Menu extends React.Component {
	constructor(props) {
		super(props);
		this._renderItems = this._renderItems.bind(this);	
		this.handleItemClick = this.handleItemClick.bind(this);
	}
	handleItemClick(e){
		const {dispatch} = this.props
		console.log(dispatch, routerRedux)
	}
	_renderItems(){
		const {menuIcons} = this.props
		if(!menuIcons) {
			return null
		}
		const items = menuIcons.map((item, index)=>(
			<div className={styles.item} key={index} onClick={this.handleItemClick}>
				<img className={styles.img}  src={item.iconUrl}/>
				<span className={styles.itemName}>{item.nameInChinese}</span>
			</div>
		))
		return items;
	}
	render(){
		return (
			<div className={styles.normal}>
				{this._renderItems()}
			</div>
		)
	}
}

export default Menu;
