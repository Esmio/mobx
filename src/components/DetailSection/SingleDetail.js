import React from 'react';
import styles from './SingleDetail.css';
import Clipboard from 'clipboard';
import {showToast} from '../../common/globalToasts';

class SingleDetail extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		new Clipboard('#copy')
	}
	handleCopyClick(){
		showToast('已复制！')
	}
	render() {
		const {singleDetailData} = this.props
		const {id, action, color, time, income, payment} = singleDetailData;
		let hide = id
		hide = hide.replace(hide.substring(6, 33),'******')
		return (
		    <div className={styles.normal}>
		    	<div className={styles.line}>
		    		<span className={styles.title}>订单号：</span>
						<span className={styles.hide}>{hide}</span>
						<input type="text" id='hide' defaultValue={id} style={{opacity: '0', position: 'fixed', zIndex:'-1'}}/>
						<span className={styles.copy} id="copy" data-clipboard-target="#hide" onClick={this.handleCopyClick}>复制</span>
		    	</div>
		    	<div className={styles.line}>
		    		<span className={styles.title}>类型：</span>
						<span className={styles.action}>{action}</span>
		    	</div>
		    	<div className={styles.line}>
		    		<span className={styles.title}>收入：</span>
						<span style={{color}} className={styles.income}>{income}</span>
		    	</div>
		    	{payment ? <div className={styles.line}>
		    		<span className={styles.title}>支付方式：</span>
						<span className={styles.payment}>{payment}</span>
		    	</div> : null}
		    	<div className={styles.line}>
		    		<span className={styles.title}>时间：</span>
						<span className={styles.time}>{time}</span>
		    	</div>
		    </div>
		  );
	}
}

export default SingleDetail;
