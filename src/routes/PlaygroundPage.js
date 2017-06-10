import React from 'react';
import styles from './PlaygroundPage.css';
import {connect} from 'dva';
import PlaygroundNav from '../components/Playground/PlaygroundNav';
import CountingBanner from '../components/Playground/CountingBanner';
import BetArea from '../components/Playground/BetArea';
import ConfirmBanner from '../components/Playground/ConfirmBanner';
import BetConfirm from '../components/Playground/BetConfirm';
import {getDigitsAndBalls} from '../data/betAreaConfig';

function PlaygroundPage({dispatch, results, gameUniqueId, gameMathString, clickedMap, betConfirmDisplay, number, allGamesPrizeSettings, countData, betStr, selectedDigit}) {
  const {digits, balls} = getDigitsAndBalls(gameUniqueId, gameMathString);
  let BetAreaProps = {results, dispatch, gameUniqueId, gameMathString, clickedMap, digits, balls, selectedDigit, allGamesPrizeSettings};
  let BetConfirmProps = {dispatch, number, betConfirmDisplay, gameUniqueId, allGamesPrizeSettings, gameMathString, betStr, countData};
  let CountingBannerProps = {countData, dispatch, gameUniqueId};
  return (
    <div className={styles.normal}>
    	<PlaygroundNav {...BetAreaProps}/>
    	<CountingBanner {...CountingBannerProps}/>
    	<BetArea {...BetAreaProps}/>
    	<ConfirmBanner {...BetAreaProps}/>
      <BetConfirm {...BetConfirmProps}/>
    </div>
  );
}

function mapStateToProps(state) {
  let {results, gameUniqueId, gameMathString, clickedMap, betConfirmDisplay, number, allGamesPrizeSettings, countData, betStr, selectedDigit} = state.play
  return {results, gameUniqueId, gameMathString, clickedMap, betConfirmDisplay, number, allGamesPrizeSettings, countData, betStr, selectedDigit}
}

export default connect(mapStateToProps)(PlaygroundPage);
