
export function gameRandom(gameId, gameMathString, digits, balls) {
  switch(gameId) {
    case 'HF_CQSSC' :
    case 'HF_XJSSC' :
    case 'HF_TJSSC' :
    case 'HF_JXSSC' :
    case 'HF_LFSSC' : {
      return selectRandomFunctionOfSSC(gameMathString, digits, balls)
      break;
    }
    case 'HF_BJPK10' : 
    case 'HF_LFPK10' : {
      return selectRandomFunctionOfPK10(gameMathString, digits, balls)    
      break;
    }
    case 'HF_SHD11' : 
    case 'HF_GDD11' : 
    case 'HF_JXD11' : 
    case 'HF_SDD11' : 
    case 'HF_AHD11' : {
      return selectRandomFunctionOfD11(gameMathString, digits, balls)
      break;
    }
    case 'HF_BJ28' : 
    case 'HF_SG28' : {
      return selectRandomFunctionOf28(gameMathString, digits, balls)
      break;
    }
    case 'X3D' : 
    case 'HF_SHSSL' : 
    case 'PL3' : {
      return selectRandomFunctionOf3D(gameMathString, digits, balls);
      break;
    }
    case 'MARK_SIX' : {
      return selectRandomFunctionOfMark6(gameMathString, digits, balls);
      break;
    }
    case 'HF_CQKL10F' :      
    case 'HF_TJKL10F' : 
    case 'HF_GDKL10F' : {
      return selectRandomFunctionOfHappy10(gameMathString, digits, balls);
      break;
    }
    case 'HF_AHK3' : 
    case 'HF_JSK3' : 
    case 'HF_GXK3' : {
      return selectRandomFunctionOfK3(gameMathString, digits, balls)
      break;
    }
  }
}

function selectRandomFunctionOfK3(gameMathString, digits, balls){
  switch(gameMathString){
    case '和值' : 
    case '三同号通选' : 
    case '三同号单选' : 
    case '三连号通选' : 
    case '二同号复选' : 
    case '二同号单选' : 
    case '猜一个号' : {
      return randomSelect(digits, balls, digits.length, 1)
      break;
    }
    case '二不同号' : {
      return randomSelect(digits, balls, digits.length, 2)
      break;
    }
    case '三不同号' : {
      return randomSelect(digits, balls, digits.length, 3)
      break;
    }
    case '二不同号胆拖' : {
      return randomSelect(digits, balls, digits.length, 1)
      break;
    }
  }
}

function selectRandomFunctionOfMark6(gameMathString, digits, balls) {
  switch(gameMathString) {
    case '特码B' : 
    case '特码A' : 
    case '特码-种类' : 
    case '特码-色波' : 
    case '特码-半波' : 
    case '特码-半半波' : 
    case '特肖-生肖' : 
    case '头尾数' : 
    case '正码-选号' : 
    case '五行' : 
    case '平特一肖' : 
    case '平特尾数' : 
    case '正肖-生肖' : 
    case '7色波-种类' : 
    case '总肖-种类' : {
      return randomSelect(digits, balls, digits.length, 1)
      break;
    }
  }
}

function selectRandomFunctionOf3D(gameMathString, digits, balls) {
  switch(gameMathString) {
    case '三星-直选复式' : 
    case '三星-直选和值' : 
    case '三星-组三和值' : 
    case '三星-组六和值' : 
    case '二星-前二直选' : 
    case '二星-后二直选' : 
    case '不定位-一码不定位' : 
    case '大小单双-后二大小单双' : 
    case '大小单双-前二大小单双' : {
      return randomSelect(digits, balls, digits.length, 1)
      break;
    }
    case '三星-组三复式' : 
    case '二星-前二组选' : 
    case '二星-后二组选' : 
    case '不定位-二码不定位' : {
      return randomSelect(digits, balls, digits.length, 2)
      break;
    }
    case '三星-组六复式' : {
      return randomSelect(digits, balls, digits.length, 3)
      break;
    }
    case '定位胆-定位胆' : {
      return randomSelect(digits, balls, 1, 1)
      break;
    }
  }
}

function selectRandomFunctionOf28(gameMathString, digits, balls) {
  switch(gameMathString){
    case '混合' : 
    case '特码' : 
    case '波色' : 
    case '豹子' : {
      return randomSelect(digits, balls, digits.length, 1)
      break;
    }
    case '特码包三' : {
      return randomSelect(digits, balls, digits.length, 3)
      break;
    }

  }
}

function selectRandomFunctionOfHappy10(gameMathString, digits, balls) {
  switch(gameMathString) {
    case '首位数投' : 
    case '首位红投' : 
    case '二连直' : 
    case '前三直' : {
      return randomSelect(digits, balls, digits.length, 1)
      break;
    }
    case '二连组' : 
    case '快乐二' : {
      return randomSelect(digits, balls, digits.length, 2)
      break;
    }
    case '前三组' : 
    case '快乐三' : {
      return randomSelect(digits, balls, digits.length, 3)
      break;
    }
    case '快乐四' : {
      return randomSelect(digits, balls, digits.length, 4)
      break;
    }
    case '快乐五' : {
      return randomSelect(digits, balls, digits.length, 5)
      break;
    }
  }
}

function selectRandomFunctionOfD11(gameMathString, digits, balls){
  switch(gameMathString) {
    case '任选二' : 
    case '前二组选' : {
      return randomSelect(digits, balls, 1, 2)
      break;
    }
    case '任选三' : 
    case '前三组选' : {
      return randomSelect(digits, balls, 1, 3)
      break;
    }
    case '任选四' : {
      return randomSelect(digits, balls, 1, 4)
      break;
    }
    case '任选五' : {
      return randomSelect(digits, balls, 1, 5)
      break;
    }
    case '任选六' : {
      return randomSelect(digits, balls, 1, 6)
      break;
    }
    case '任选七' : {
      return randomSelect(digits, balls, 1, 7)
      break;
    }
    case '任选八' : {
      return randomSelect(digits, balls, 1, 7)
      break;
    }
    case '前一直选' : {
      return randomSelect(digits, balls, 1, 1)
      break;
    }
    case '前二直选' : 
    case '前三直选' : 
    case '任选二胆拖' : 
    case '前二组选胆拖' : {
      return randomSelect(digits, balls, digits.length, 1)
      break;
    }
    case '任选三胆拖' : 
    case '前三组选胆拖' : {
      return randomSelect12(digits, balls, digits.length, 2, '胆码')
      break;
    }
    case '任选四胆拖' : {
      return randomSelect12(digits, balls, digits.length, 3, '胆码')
      break;
    }
    case '任选五胆拖' : {
      return randomSelect12(digits, balls, digits.length, 4, '胆码')
      break;
    }
    case '任选六胆拖' : {
      return randomSelect12(digits, balls, digits.length, 5, '胆码')
      break;
    }
    case '任选七胆拖' : {
      return randomSelect12(digits, balls, digits.length, 6, '胆码')
      break;
    }
    case '任选八胆拖' : {
      return randomSelect12(digits, balls, digits.length, 7, '胆码')
      break;
    }
  }

}
// PK10
function selectRandomFunctionOfPK10(gameMathString, digits, balls) {
  switch(gameMathString) {
    case '前一' : 
    case '前二' : 
    case '前三' : {
      return randomSelect(digits, balls, digits.length, 1)
      break;
    }
    case '定位胆' : {
      return randomSelect(digits, balls, 1, 1)
      break;
    }
  }
}

// 随机位球-时时彩
function selectRandomFunctionOfSSC(gameMathString, digits, balls){
  switch(gameMathString){
    case '定位胆-定位胆' : 
    case '不定位-前三一码' :
    case '不定位-后三一码' :
    case '不定位-前四一码' :
    case '不定位-后四一码' :
    case '不定位-五星一码' : 
    case '任选二-直选和值' : 
    case '任选二-组选和值' : 
    case '任选三-直选和值' : 
    case '任选三-组选和值' : {
      return randomSelect(digits, balls, 1, 1)
      break;
    }
    case '五星-五星通选' :
    case '五星-五星直选' : 
    case '三星-三星直选' : 
    case '二星-二星直选' :
    case '大小单双-后二大小单双': 
    case '大小单双-后三大小单双': 
    case '大小单双-前二大小单双': 
    case '大小单双-前三大小单双': {
      return randomSelect(digits, balls, digits.length, 1)
      break;
    }
    case '不定位-前三二码' :
    case '不定位-后三二码' :
    case '不定位-前四二码' :
    case '不定位-后四二码' :
    case '不定位-五星二码' :
    case '二星-二星组选' : 
    case '三星-三星组三' : 
    case '任选二-组选复式' : 
    case '任选三-组三复式' : {
      return randomSelect(digits, balls, 1, 2)
      break;
    }
    case '不定位-五星三码' :
    case '三星-三星组六' : 
    case '任选三-组六复式' : {
      return randomSelect(digits, balls, 1, 3)
      break;
    }
    case '任选四-组选24' : {
      return randomSelect(digits, balls, 1, 4)
      break;
    }
    case '任选二-直选复式' : 
    case '任选四-组选4' : {
      return randomSelect(digits, balls, 2, 1)
      break;
    }
    case '任选四-组选12' : {
      return randomSelect12(digits, balls, 2, 2, '二重号')
      break;
    }
    case '任选四-组选6' : {
      return randomSelect(digits, balls, 2, 2)
    }
    case '任选三-直选复式' : {
      return randomSelect(digits, balls, 3, 1)
      break;
    }
    case '任选四-直选复式' : {
      return randomSelect(digits, balls, 4, 1)
      break;
    }
  }
}
// 机选公共方法
function randomSelect(digits, balls, digitsTimes, ballsTimes){
  let results = [], 
    clickedMap = {},
    digitsLength = digits.length,
    ballsLength = balls.length,
    randomDigitsArr = getArray(digitsLength),
    randomBallsArr = getArray(ballsLength);
  for(let i = 0; i < digitsTimes; i++) {
    let randomDigitIndex = getRandomIndex(randomDigitsArr)
    for(let j = 0; j < ballsTimes; j++) {
        let randomBallIndex = getRandomIndex(randomBallsArr)
      if(!(results[randomDigitIndex] instanceof Array)) {
        results[randomDigitIndex] = []
      }
      results[randomDigitIndex][randomBallIndex] = balls[randomBallIndex] instanceof Object ? balls[randomBallIndex].ball : balls[randomBallIndex];
      let arrStr = `ball${randomDigitIndex}-${randomBallIndex}`;
      clickedMap[arrStr] = true;
    }
  }
  let resultsStr = JSON.stringify(results),
    clickedMapStr = JSON.stringify(clickedMap);
  return {resultsStr, clickedMapStr}
}
// 任选四-组选12
function randomSelect12(digits, balls, digitsTimes, ballsTimes, doubleSignStr){
  let results = [], 
    clickedMap = {},
    digitsLength = digits.length,
    ballsLength = balls.length,
    randomDigitsArr = getArray(digitsLength),
    randomBallsArr = getArray(ballsLength);
  let randomBallIndex = -1
  for(let i = 0; i < digitsTimes; i++) {
    let randomDigitIndex = getRandomIndex(randomDigitsArr)
    for(let j = 0; j < ballsTimes; j++) {
      if(digits[randomDigitIndex] !== doubleSignStr){
        randomBallIndex = getRandomIndex(randomBallsArr)
      }else if(randomBallIndex === -1) {
        randomBallIndex = getRandomIndex(randomBallsArr)
      }
      if(!(results[randomDigitIndex] instanceof Array)) {
        results[randomDigitIndex] = []
      }
      results[randomDigitIndex][randomBallIndex] = balls[randomBallIndex];
      let arrStr = `ball${randomDigitIndex}-${randomBallIndex}`;
      clickedMap[arrStr] = true;
    }
  }
  let resultsStr = JSON.stringify(results),
    clickedMapStr = JSON.stringify(clickedMap);
  return {resultsStr, clickedMapStr}
}

// 多选不重复
function getRandomIndex(arr) {
  let index = 0;
  let randomArrayLength = arr.length;
  let randomArrayIndex = getRandomNumber(randomArrayLength)
  index = arr[randomArrayIndex];
  arr.splice(randomArrayIndex,1)
  return index;
}
// 生成数组
function getArray(num) {
  let arr = []
  for(let i = 0; i < num; i++){
    arr[i] = i
  }
  return arr;
}
// 向下取整获取随机数
function getRandomNumber(num) {
  return Math.floor(Math.random() * num);
}

