import React from 'react';
import styles from './CardCom.css';
import { Card } from 'antd-mobile';



class CardCom extends React.Component{
	constructor(props) {
		super(props);
	}
	render() {
		return (
	    <div className={styles.normal}>
	    	<Card full style={{padding: 0, border: 'none'}} >
	    		<Card.Header
	    			title={this.props.title}
	    			style={{height:'.6rem',fontSize:'.24rem',lineHeight: '.6rem'}}
	    		/>
	    		<Card.Body style={{padding: '0', border: 'none', hieght: 'auto'}}>
	    			{this.props.children}
	    		</Card.Body>
	    	</Card>
	    </div>
	  );
	}
}

export default CardCom;
