import React from 'react';
import styles from './CarouselCom.css';
import { Carousel } from 'antd-mobile';

function renderImage(list) {
	let items = list.map((item, index)=>(
		<a style={{display:'block'}} href={item.userClickUrl} key={index}><img className={styles.imgSize} src={item.bannerImageUrl} /></a>
	))
	return items
}

function CarouselCom({promotionBanners}) {
  if(!promotionBanners) {
    return null
  }
  return (
    <div className={styles.normal}>
    	<Carousel
    		className="my-carousel" autoplay={true} infinite
    		beforeChange = {(from, to)=>null}
    		afterChange = {index =>null }
    		style={{width:'100%'}}
    	>
    		{
    			renderImage(promotionBanners)
    		}
    	</Carousel>
    </div>
  );
}

export default CarouselCom;
