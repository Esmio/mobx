import React from 'react';
import styles from './CountingBanner.css';

class CountingBanner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          countTime : 0,
          openCode: '',
          send: 1
        }
        this.getTimeStr = this.getTimeStr.bind(this)
    }
    componentWillMount() {
      const {countData} = this.props;
      const {countTime} = this.state;
      if(countData) {
        let { current, lastOpen} = countData;
        let {stopOrderTimeEpoch, openStatus } = current;
        let { openCode } = lastOpen;
        this.setCountTime(stopOrderTimeEpoch,openCode)
      }
    }
    componentWillReceiveProps(nextProps) {
      const {countData} = nextProps;
      const {countTime} = this.state;
      if(countData) {
        let { current, lastOpen} = countData;
        let {stopOrderTimeEpoch, openStatus } = current;
        let { openCode } = lastOpen;
        this.setCountTime(stopOrderTimeEpoch,openCode)
      }
    }
    setCountTime(stopTime, openCode) {
      let timeStamp = new Date().getTime();
      timeStamp = Math.round(timeStamp/1000);
      let countTime = stopTime - timeStamp;
      this.setState({countTime, openCode})
    }
    countDown() {
      let {countTime, openCode, send} = this.state;
      const {gameUniqueId, dispatch} = this.props
      send--
      if(countTime <= 0) {
        countTime = 0
          if(!send && openCode!=='') {
            dispatch({type:'play/getCurrentLotteryData', payload:{gameUniqueId}})
            send = this.getRandom(3) + this.getRandom(3)
          }
      }else{
        countTime = this.state.countTime - 1
      }
      this.setState({countTime, send})
      this.timer = setTimeout(()=> {
        this.countDown();
      }, 1000)
    }
    getRandom(num) {
      return Math.ceil(Math.random()*num)
    }
    getTimeStr() {
      let {countTime} = this.state,
        hour = parseInt(countTime/3600),
        hourLeft = countTime%3600,
        minute = parseInt(hourLeft/60),
        second = hourLeft%60;
      hour = this.checkTime(hour);
      minute = this.checkTime(minute);
      second = this.checkTime(second);
      let timeStr = `${hour}:${minute}:${second}`;
      return timeStr;
    }
    checkTime(time) {
      return time.toString().length < 2  ? ('0' + time) : time;
    }
    componentDidMount() {
      this.countDown()
    }
    componentWillUnmount() {
      clearTimeout(this.timer)
    }
    checkPlanNo(num) {
      num = num.toString()
      let {length} = num
      while(length < 3) {
        num = '0' + num
        length = num.length
      }
      return num
    }
    render() {
      const {countData, gameUniqueId} = this.props;
      let {countTime} = this.state;
      if(!countData) return null;
      let { current, lastOpen} = countData;
      let {openCode, planNo} = lastOpen;
      let currentPlanNo = current.planNo,
        {openStatus} = current,
        lastStatus = lastOpen.openStatus;
      if(lastStatus){
        openCode = openCode.split(',')
        if(gameUniqueId==='HF_BJ28'||gameUniqueId==='HF_SG28'){
          let sum = 0
          openCode.map((num, i)=>{
            sum += parseInt(num)
          })
          openCode = openCode.join('+') + ' = ' + sum;
        }else{
          openCode = openCode.join(' ')
        }
      }else {
        openCode = '等待开奖'
      }
      let timeStr = this.getTimeStr();
      planNo = this.checkPlanNo(planNo);
      currentPlanNo = this.checkPlanNo(currentPlanNo);
      return (
        <div className={styles.normal}>
          <div className={styles.upline}>
            <span className={styles.title}>{planNo}期</span>
            <span className={styles.note}>距{currentPlanNo}期截止</span>
          </div>
          <div className={styles.downline}>
            <span className={styles.result}>{openCode}</span>
            <span className={styles.counting}>{timeStr}</span>
          </div>
        </div>
      );        
    }
}

export default CountingBanner;
