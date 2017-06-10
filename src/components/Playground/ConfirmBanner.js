import React from 'react';
import styles from './ConfirmBanner.css';
import {showToast} from '../../common/globalToasts';
import {gameRandom} from '../../data/randomBetting';
import {getNumbersOfLottery} from '../../data/calculateNumbers';
import {getGameMathKeyWithTitle} from '../../data/playMathConfig';


class ConfirmBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultStr: '',
      number: 0
    }
    this.handleClearClick = this.handleClearClick.bind(this);
    this.handleRandomClick = this.handleRandomClick.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }
  buttonSwitch(clickedMap) {
    let clear = false
    for(let key in clickedMap) {
      if(!!clickedMap[key]){
        clear = true
        break;
      }
    }
    return clear;
  }
  handleClearClick() {
    const {dispatch} = this.props
    this.setState({clear: false})
    dispatch({type: 'play/clearResult'})
  }

  handleRandomClick() {
    let {balls, digits, gameMathString, gameUniqueId, dispatch, allGamesPrizeSettings} = this.props;
    let mathKey = getGameMathKeyWithTitle(gameMathString, gameUniqueId)
    let {prizeSettings} = allGamesPrizeSettings[gameUniqueId].singleGamePrizeSettings[mathKey]
    console.log('balls',balls)
    if(!balls[0]) balls = prizeSettings.map((item, index)=>{
      return {ball: item.prizeNameForDisplay.replace('和值', ''), odds: item.prizeAmount}
    })
    const {resultsStr, clickedMapStr} = gameRandom(gameUniqueId, gameMathString, digits, balls);
    dispatch({type: 'play/saveResult', payload: {resultsStr, clickedMapStr}})
  }
  //確定投注
  handleConfirm() {
    const { dispatch } = this.props;
    const { number, resultStr } = this.state;
    this.checkBetStr(resultStr) ? 
    dispatch({type: 'play/betConfirmDisplay', payload: {betConfirmDisplay: 'block', number, betStr: resultStr}}) :
    showToast('投注错误！');
  }
  checkBetStr(str) {
    let flag = false
    if(str){
      let s = str.split('|')
      s.map((item, index)=>{
        flag = flag ? flag : Boolean(item)
      })
    }
    return flag;
  }
  // 转换betString
  getResultStr(props) {
    const { results, digits } = props;
    let resultStr = '',
      length = digits.length,
      resultArr = new Array(length);
    if(results) {
      let resultsLength = results.length;
      while(resultsLength--) {
        resultArr[resultsLength] = results[resultsLength];
      }
      resultArr = resultArr.map((arr, index)=> {
        if(!arr) return [];
        return arr.join(' ')
      })
      resultStr = resultArr.join('|').replace(/\s+/g, ' ').replace(/\s?\|\s?/g,'|').trim();
    }
    return resultStr;
  }
  componentWillReceiveProps(nextProps) {
    let resultStr = this.getResultStr(nextProps);
    let {gameUniqueId, gameMathString, selectedDigit} = nextProps;
    let number = getNumbersOfLottery(gameUniqueId, gameMathString, resultStr, selectedDigit);
    this.setState({resultStr, number})
  }
  componentDidMount() {
  }
  render() {
    const {results, digits, clickedMap} = this.props;
    const {resultStr, number} = this.state;
    let clear = this.buttonSwitch(clickedMap);
    return (
      <div className={styles.normal}>
        { clear ? <div className={styles.clear} onClick={this.handleClearClick}>清空</div> :
        <div className={styles.button} onClick={this.handleRandomClick}>机选</div>}
        <div className={styles.result}>
          <span className={styles.betResult}>{resultStr}</span>
          <span className={styles.betNum}>共{number}注 <b className={styles.money}>{2 * number}元</b></span>
        </div>
        <div className={styles.button} onClick={this.handleConfirm}>确定</div>
      </div>
    );
  }
}

export default ConfirmBanner;
