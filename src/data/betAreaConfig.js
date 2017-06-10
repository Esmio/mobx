

//选择正确的位数和球
function getDigitsAndBalls(gameUniqueId, gameMathString) {
  switch(gameUniqueId) {
    case 'HF_CQSSC' :
    case 'HF_XJSSC' :
    case 'HF_TJSSC' :
    case 'HF_JXSSC' :
    case 'HF_LFSSC' :  {
      return chooseDigitsAndBalls(gameMathString)
      break;
    }
    case 'HF_BJPK10' : 
    case 'HF_LFPK10' : {
      return chooseDigitsAndBallsOfPK10(gameMathString)
      break;
    }
    case 'HF_SHD11' : 
    case 'HF_GDD11' : 
    case 'HF_JXD11' : 
    case 'HF_SDD11' : 
    case 'HF_AHD11' : {
      return chooseDigitsAndBallsOfD11(gameMathString)
      break;
    }
    case 'HF_BJ28' : 
    case 'HF_SG28' : {
      return chooseDigitsAndBallsOf28(gameMathString)
      break;
    }
    case 'X3D' : 
    case 'HF_SHSSL' : 
    case 'PL3' : {
      return chooseDigitsAndBallsOf3D(gameMathString)
      break;
    }
    case 'MARK_SIX' : {
      return chooseDigitsAndBallsOfMARK6(gameMathString)
      break;
    }
    case 'HF_CQKL10F' : 
    case 'HF_TJKL10F' : 
    case 'HF_GDKL10F' : {
      return chooseDigitsAndBallsOfHappy10(gameMathString)
      break;
    }
    case 'HF_AHK3' : 
    case 'HF_JSK3' : 
    case 'HF_GXK3' : {
      return chooseDigitsAndBallsOfK3(gameMathString)
      break;
    }
  }
}

function chooseDigitsAndBallsOfK3(gameMathString) {
  let digits=[], balls=[];
  switch(gameMathString){
    case '和值' : {
      digits = [{digit: '和值', odds: '赔率'}];
      balls = []
      break;
    }
    case '三同号通选' : {
      digits = ['号码'];
      balls = ['三同号通选']
      break;
    }
    case '三同号单选' : {
      digits = ['号码'];
      balls = ['111','222','333','444','555','666']
      break;
    }
    case '三不同号' : 
    case '二不同号' : 
    case '猜一个号' : {
      digits = ['号码'];
      balls = [1,2,3,4,5,6]
      break;
    }
    case '三连号通选' : {
      digits = ['号码'];
      balls = ['三连号通选'];
      break;
    }
    case '二同号复选' : {
      digits = ['号码']; 
      balls = ['11', '22', '33', '44', '55', '66']
      break;
    }
    case '二同号单选' : {
      digits = ['同号', '不同号'];
      balls = ['1', '2', '3', '4', '5', '6']
      break;
    }
    case '二不同号胆拖' : {
      digits = ['胆码', '拖码'];
      balls = [1,2,3,4,5,6];
      break;
    }
  }
  return {digits, balls}
}

function chooseDigitsAndBalls(gameMathString) {
  let digits=[], balls=[];
  switch(gameMathString) {
    case '任选二-直选复式':
    case '任选三-直选复式':
    case '任选四-直选复式':
    case '五星-五星通选':
    case '五星-五星直选':
    case '定位胆-定位胆': {
      digits = ['万位','千位','百位','十位','个位'];
      balls = getSumArray(9);
      break;
    }
    case '三星-三星直选': {
      digits = ['百位','十位','个位'];
      balls = getSumArray(9);
      break;
    }
    case '三星-三星组三':
    case '三星-三星组六':
    case '任选三-组六复式':
    case '任选三-组三复式': {
      digits = ['选号'];
      balls = getSumArray(9);
      break;
    }
    case '二星-二星直选': {
      digits = ['十位','个位'];
      balls = getSumArray(9);
      break;
    }
     case '二星-二星组选': {
      digits = ['选号'];
      balls = getSumArray(9);
     }
    case '一星-一星直选': {
      digits = ['个位']
      balls = getSumArray(9);
      break;
    }
    case '大小单双-后二大小单双': {
      digits = ['十位','个位'];
      balls = ['大', '小', '单', '双'];
      break;
    }
    case '大小单双-前二大小单双': {
      digits = ['万位', '千位'];
      balls = ['大', '小', '单', '双'];
      break;
    }
    case '大小单双-后三大小单双': {
      digits = ['百位', '十位', '个位'];
      balls = ['大', '小', '单', '双'];
      break;
    }
    case '大小单双-前三大小单双': {
      digits = ['万位', '千位', '百位'];
      balls = ['大', '小', '单', '双'];
      break;
    }
    case '不定位-五星三码':
    case '不定位-五星二码':
    case '不定位-五星一码':
    case '不定位-后四二码':
    case '不定位-后四一码':
    case '不定位-前四二码':
    case '不定位-前四一码':
    case '不定位-后三二码':
    case '不定位-后三一码':
    case '不定位-前三二码':
    case '不定位-前三一码': {
      digits = ['不定位'];
      balls = getSumArray(9);
      break;
    }
    case '任选二-组选和值':
    case '任选二-直选和值': {
      digits = ['和值'];
      balls = getSumArray(18);
      break;
    }
    case '任选三-组选和值':
    case '任选三-直选和值': {
      digits = ['和值'];
      balls = getSumArray(27);
      break;
    }
    case '任选二-组选复式': {
      digits = ['组选'];
      balls = getSumArray(9);
      break;
    }
    case '任选四-组选24': {
      digits = ['组选24'];
      balls = getSumArray(9);
      break;
    }
    case '任选四-组选12': {
      digits = ['二重号', '单号']
      balls = getSumArray(9);
      break;
    }
    case '任选四-组选6': {
      digits = ['二重号'];
      balls = getSumArray(9);
      break;
    }
    case '任选四-组选4': {
      digits = ['三重号', '单号'];
      balls = getSumArray(9);
      break;
    }
  }
  return {digits, balls}
}

function chooseDigitsAndBallsOfPK10(gameMathString) {
  let digits=[], balls=[];
  switch(gameMathString) {
    case '前一' : {
      digits = ['冠军'];
      balls = getSumArrayOf10(10);
      break;
    }
    case '前二' : {
      digits = ['冠军', '亚军'];
      balls = getSumArrayOf10(10);
      break;
    }
    case '前三' : {
      digits = ['冠军', '亚军', '季军'];
      balls = getSumArrayOf10(10);
      break;
    }
    case '定位胆' : {
      digits = ['冠军', '亚军', '季军', '第四名', '第五名', '第六名', '第七名', '第八名', '第九名', '第十名'];
      balls = getSumArrayOf10(10);
      break;
    }
  }
  return {digits, balls}
}

function chooseDigitsAndBallsOfD11(gameMathString) {
  let digits=[], balls=[];
  switch(gameMathString) {
    case '任选二' :
    case '任选三' :
    case '任选四' :
    case '任选五' :
    case '任选六' :
    case '任选七' :
    case '任选八' : 
    case '前一直选' : 
    case '前二组选' : 
    case '前三组选' : {
      digits = ['选号'];
      balls = getSumArrayOf10(11);
      break;
    }
    case '前二直选' : {
      digits = ['万位','千位'];
      balls = getSumArrayOf10(11);
      break;
    }
    case '前三直选' : {
      digits = ['万位','千位', '百位'];
      balls = getSumArrayOf10(11);
      break;
    }
    case '任选二胆拖' : 
    case '任选三胆拖' : 
    case '任选四胆拖' : 
    case '任选五胆拖' : 
    case '任选六胆拖' : 
    case '任选七胆拖' : 
    case '任选八胆拖' : 
    case '前二组选胆拖' : 
    case '前三组选胆拖' :  {
      digits = ['胆码', '拖码'];
      balls = getSumArrayOf10(11);
      break;
    }
  }
  return  {digits, balls}
}

function chooseDigitsAndBallsOf3D(gameMathString) {
  let digits=[], balls=[];
  switch(gameMathString){
    case '三星-直选复式' : 
    case '定位胆-定位胆' : {
      digits = ['百位', '十位', '个位'];
      balls = getSumArray(9);
      break;
    }
    case '三星-直选和值' : 
    case '三星-组三和值' : {
      digits = ['和值'];
      balls = getSumArray(26, 1);
      break;
    }
    case '三星-组三复式' : 
    case '三星-组六复式' : 
    case '二星-前二组选' : 
    case '二星-后二组选' : {
      digits = ['选号'];
      balls = getSumArray(9);
      break;
    }
    case '三星-组六和值' : {
      digits = ['和值'];
      balls = getSumArray(24, 3);
      break;
    }
    case '二星-前二直选' : {
      digits = ['百位', '十位'];
      balls = getSumArray(9);
      break;
    }
    case '二星-后二直选' : {
      digits = ['十位', '个位'];
      balls = getSumArray(9);
      break;
    }
    case '不定位-一码不定位' : {
      digits = ['一码'];
      balls = getSumArray(9);
      break;
    }
    case '不定位-二码不定位' : {
      digits = ['二码'];
      balls = getSumArray(9);
      break;
    }
    case '大小单双-后二大小单双' : {
      digits = ['十位', '个位'];
      balls = ['大', '小', '单', '双'];
      break;
    }
    case '大小单双-前二大小单双' : {
      digits = ['百位', '十位']; 
      balls = ['大', '小', '单', '双'];
      break;
    }
  }

  return {digits, balls}
}

function chooseDigitsAndBallsOf28(gameMathString) {
  let digits=[], balls=[];
  switch(gameMathString) {
    case '混合' : {
      digits = [{digit: '混合', odds: '赔率'}];
      balls = [
        {ball: '大', odds: 1.98}, 
        {ball: '小', odds: 1.98}, 
        {ball: '单', odds: 1.98}, 
        {ball: '双', odds: 1.98}, 
        {ball: '大单', odds: 3}, 
        {ball: '大双', odds: 3},
        {ball: '小单', odds: 3},
        {ball: '小双', odds: 3},
        {ball: '极大', odds: 10},
        {ball: '极小', odds: 10},
      ]
      break;
    }
    case '特码' : {
      digits = [{digit: '混合', odds: '赔率'}];
      balls = getSumArrayOfTM(27);
      break;
    }
    case '特码包三' : {
      digits = [{digit: '包三', odds: '赔率'}];
      balls = getSumArrayOfTMB3(27);
      break;
    }
    case '波色' : {
      digits = [{digit: '波色', odds: '赔率'}];
      balls = [
        {ball : '红波', odds : 3.5},
        {ball : '绿波', odds : 3.5},
        {ball : '蓝波', odds : 3.5}
      ]
      break;
    }
    case '豹子' : {
      digits = [{digit: '豹子', odds: '赔率'}];
      balls = [{ball : '豹子', odds : 50}]
      break;
    }
  }
  return {digits, balls}
}

function chooseDigitsAndBallsOfX3D(gameMathString) {
  let digits=[], balls=[];
  switch(gameMathString) {
    case '3D直选' : {
      digits = ['百位', '十位', '个位'];
      balls = getSumArray(9);
      break;
    }
    case '3D组三复式' :
    case '3D组六' : {
      digits = ['选号'];
      balls = getSumArray(9);
      break;
    }
  }
  return {digits, balls}
}

function chooseDigitsAndBallsOfMARK6(gameMathString) {
  let digits=[], balls=[];
  switch(gameMathString) {
    case '特码B' : {
      digits = [{digit: '选码', odds: '赔率'}]
      balls = getSumArrayOf6(49, 48.06)
      break;
    }
    case '特码A' : {
      digits = [{digit: '选码', odds: '赔率'}]
      balls = getSumArrayOf6(49, 41.06)
      break;
    }
    case '特码-种类' : {
      digits = [{digit: '种类', odds: '赔率'}]
      balls = [
        {ball: '特大', odds: 1.95},
        {ball: '特小', odds: 1.95},
        {ball: '特尾大', odds: 1.95},
        {ball: '特尾小', odds: 1.95},
        {ball: '特单', odds: 1.95},
        {ball: '特双', odds: 1.95},
        {ball: '特大单', odds: 3.7},
        {ball: '特大双', odds: 3.7},
        {ball: '特合大', odds: 1.95},
        {ball: '特合小', odds: 1.95},
        {ball: '特小单', odds: 3.7},
        {ball: '特小双', odds: 3.7},
        {ball: '特合单', odds: 1.95},
        {ball: '特合双', odds: 1.95},
        {ball: '特天肖', odds: 1.95},
        {ball: '特地肖', odds: 1.95},
        {ball: '特前肖', odds: 1.95},
        {ball: '特后肖', odds: 1.95},
        {ball: '特家肖', odds: 1.95},
        {ball: '特野肖', odds: 1.95},
        {ball: '总大', odds: 1.95},
        {ball: '总小', odds: 1.95},
        {ball: '总单', odds: 1.95},
        {ball: '总双', odds: 1.95},
      ]
      break;
    }
    case '特码-色波' : {
      digits = ['种类'];
      let redWave = getSumArrayOf6TMSB(49, 0),
        blueWave = getSumArrayOf6TMSB(49, 2),
        greenWave = getSumArrayOf6TMSB(49, 4);
      balls = [
        {ball: ['红波', redWave], odds: 2.73},
        {ball: ['蓝波', blueWave], odds: 2.73},
        {ball: ['绿波', greenWave], odds: 2.73}
      ]
      break;
    }
    case '色波-半波' : {
      digits = [{digit: '种类', odds: '赔率'}];
      balls = [
        {ball: '红单', odds: 5.49},
        {ball: '红双', odds: 4.98},
        {ball: '红大', odds: 6.4},
        {ball: '红小', odds: 4.43},
        {ball: '蓝单', odds: 5.49},
        {ball: '蓝双', odds: 5.49},
        {ball: '蓝大', odds: 4.92},
        {ball: '蓝小', odds: 6.48},
        {ball: '绿单', odds: 5.49},
        {ball: '绿双', odds: 6.35},
        {ball: '绿大', odds: 5.49},
        {ball: '绿小', odds: 6.42}
      ]
      break;
    }
    case '色波-半半波' : {
      digits = [{digit: '种类', odds: '赔率'}];
      balls = [
        {ball: '红大单', odds: 14.57},
        {ball: '红大双', odds: 10.95},
        {ball: '红小单', odds: 8.78},
        {ball: '红小双', odds: 8.78},
        {ball: '蓝大单', odds: 8.78},
        {ball: '蓝大双', odds: 10.95},
        {ball: '蓝小单', odds: 14.59},
        {ball: '蓝小双', odds: 10.95},
        {ball: '绿大单', odds: 10.95},
        {ball: '绿大双', odds: 10.95},
        {ball: '绿小单', odds: 10.95},
        {ball: '绿小双', odds: 14.59}
      ]
      break;
    }
    case '特肖-生肖' : {
      digits = [{digit: '种类', odds: '赔率'}];
      balls = getSumArrayOf6SX(11.42, {ball: '鸡', odds: 9.35});
      break;
    }
    case '头尾数' : {
      digits = [{digit: '种类', odds: '赔率'}];
      let head = getSumArrayOf6TWS(4, 4.29, '头'),
        tail = getSumArrayOf6TWS(9, 9.11, '尾', {ball: '0尾', odds: 10.99})
      balls = head.concat(tail);
      break;
    }
    case '正码-选号' : {
      digits = [{digit: '选码', odds: '赔率'}]
      balls = getSumArrayOf6(49, 7.89);
      break;
    }
    case '五行' : {
      digits = [{digit: '种类', odds: '赔率'}]
      balls = [
        {ball: '金', odds: 4.62},
        {ball: '木', odds: 4.62},
        {ball: '水', odds: 4.62},
        {ball: '火', odds: 4.62},
        {ball: '土', odds: 4.72},
      ]
      break;
    }
    case '平特一肖' : {
      digits = [{digit: '种类', odds: '赔率'}];
      balls = getSumArrayOf6SX(2.06, {ball: '鸡', odds: 1.77});
      break;
    }
    case '平特尾数' : {
      digits = [{digit: '种类', odds: '赔率'}];
      balls = getSumArrayOf6TWS(9, 1.77, '尾', {ball: '0尾', odds: 2.06})
      break;
    }
    case '正肖-生肖' : {
      digits = [{digit: '种类', odds: '赔率'}];
      balls = getSumArrayOf6SX(1.89, {ball: '鸡', odds: 1.72});
      break;
    }
    case '7色波-种类' : {
      digits = [{digit: '种类', odds: '赔率'}];
      balls = [
        {ball: '红波', odds: 2.75},
        {ball: '蓝波', odds: 2.75},
        {ball: '绿波', odds: 2.75},
        {ball: '和局', odds: 22.65},
      ]
      break;
    }
    case '总肖-种类' : {
      digits = [{digit: '种类', odds: '赔率'}];
      balls = [
        {ball: '2肖', odds: 13.79},
        {ball: '3肖', odds: 13.79},
        {ball: '4肖', odds: 13.79},
        {ball: '5肖', odds: 3.01},
        {ball: '6肖', odds: 1.92},
        {ball: '7肖', odds: 5.22},
        {ball: '总肖单', odds: 1.92},
        {ball: '总肖双', odds: 1.82}
      ]
      break;
    }
  }
  return {digits, balls}
}

function chooseDigitsAndBallsOfHappy10(gameMathString) {
  let digits=[], balls=[];
  switch(gameMathString) {
    case '首位数投' : {
      digits = ['首位'];
      balls = getSumArrayOf10(18)
      break;
    }
    case '首位红投' : {
      digits = ['首位'];
      balls = [19, 20];
      break;
    }
    case '二连直' : {
      digits = ['前位', '后位'];
      balls = getSumArrayOf10(20);
      break;
    }
    case '二连组' : {
      digits = ['二连组']; 
      balls = getSumArrayOf10(20);
      break;
    }
    case '前三直' : {
      digits = ['第一位', '第二位', '第三位'];
      balls = getSumArrayOf10(20);
      break;
    }
    case '前三组' : {
      digits = ['前三组'];
      balls = getSumArrayOf10(20);
      break;
    }
    case '快乐二' : {
      digits = ['快乐二'];
      balls = getSumArrayOf10(20);
      break;
    }
    case '快乐三' : {
      digits = ['快乐三']; 
      balls = getSumArrayOf10(20);
      break;
    }
    case '快乐四' : {
      digits = ['快乐四'];
      balls = getSumArrayOf10(20);
      break;
    }
    case '快乐五' : {
      digits = ['快乐五']; 
      balls = getSumArrayOf10(20);
      break;
    }
  }
  return {digits, balls}
}

function getSumArrayOf6SX(odds, sOdds) {
  let arr = [],
    sx = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
    arr = sx.map((ball, index)=> {
      if(sOdds && ball === sOdds.ball) odds = sOdds.odds;
      return {ball, odds}
    })
  return arr;
}
function getSumArrayOf6TWS(max, odds, lastword, sOdds) {
  let arr = [];
  for(let i = 0; i <= max; i++) {
    let j = i;
    j += lastword;
    if(sOdds && j === sOdds.ball) odds = sOdds.odds;
    arr[i] = {ball : j, odds}
  }
  return arr;
}

function getSumArrayOf6TMSB(max, num) {// to be fixed
  let arr = [], x = 0;
  for ( let i = num; i <= max; i++) {
    if((i-num)%6===1 || (i-num)%6===2){
      let j = i;
      j = j <= 9 ? '0' + j : j
      arr.push(j);
    }
  }
  return arr;
}

function getSumArrayOf6(max, odds) {
  let arr = [];
  for ( let i = 1; i <= max; i++) {
    let ball = i <= 9 ? '0' + i : i + '';
    arr[i-1] = {ball, odds}
  }
  return arr;
}

function getSumArrayOfTMB3(max) {
  let arr = [];
  for (let i = 0; i <= max; i++) {
    let ball = i, odds = 3.5;
    arr[i] = {ball, odds}
  }
  return arr;
}

function getSumArrayOfTM(max) {
  let arr = []
  for(let i = 0; i <= max; i++) {
    let ball = i, odds = 10;
    if(i===0 || i===max) {
      odds = 100
    }else if(i <= 5){
      odds = 16 - i
    }else if(max-i <=5){
      odds = 16 - (max - i)
    }
    arr[i] = {ball, odds}
  }
  return arr;
}

function getSumArray(max, min) {
  if(!min) min = 0;
  let arr = []
  for (let i = min; i <= max; i++) {
    arr[i] = i;
  }
  return arr
}

function getSumArrayOf10(max) {
  let arr = []
  for (let i = 1; i <= max; i++) {
    let j = i
    j = j.toString();
    if(j.length < 2) {
      j = '0' + j;
    }
    arr[i-1] = j;
  }
  return arr;
}

export {
  getDigitsAndBalls
}