

export function getNumbersOfLottery(gameUniqueId, gameMathString, arr, selectedDigit) {
  switch(gameUniqueId) {
    case 'HF_CQSSC' :
    case 'HF_XJSSC' :
    case 'HF_TJSSC' :
    case 'HF_JXSSC' :
    case 'HF_LFSSC' :  {
    	return getNumberOfSSC(gameMathString, arr, selectedDigit);
      break;
    }
    case 'HF_BJPK10' : 
    case 'HF_LFPK10' : {
    	return getNumberOfPK10(gameMathString, arr)
      break;
    }
    case 'HF_SHD11' : 
    case 'HF_GDD11' : 
    case 'HF_JXD11' : 
    case 'HF_SDD11' : 
    case 'HF_AHD11' : {
    	return getNumberOfD11(gameMathString, arr)
      break;
    }
    case 'HF_BJ28' : 
    case 'HF_SG28' : {
    	return getNumberOf28(gameMathString, arr)
      break;
    }
    case 'X3D' : 
    case 'HF_SHSSL' : 
    case 'PL3' : {
    	return getNumberOfX3D(gameMathString, arr);
      break;
    }
    case 'MARK_SIX' : {
    	return getNumberOfMark6(arr);
      break;
    }
    case 'HF_CQKL10F' : 
    case 'HF_TJKL10F' : 
    case 'HF_GDKL10F' : {
    	return getNumberOfKL10(gameMathString, arr);
      break;
    }
    case 'HF_AHK3' : 
    case 'HF_JSK3' : 
    case 'HF_GXK3' : {
    	return getNumberOfK3(gameMathString, arr);
    	break;
    }
  }
}
// K3
function getNumberOfK3(gameMathString, arr){
	switch(gameMathString){
		case '和值' : 
		case '三同号通选' : 
		case '三同号单选' : 
		case '三连号通选' : 
		case '二同号复选' : {
			return getBetNumberOfZX(arr);
			break;
		}
		case '三不同号' : {
			return getBetNumberOf3DZFS(arr, 3);
			break;
		}
		case '二不同号' : {
			return getBetNumberOf3DZFS(arr, 2);
			break;
		}
		case '二同号单选' : {
			return getBetNumberOfZX(arr);
			break;
		}
		case '二不同号胆拖' : {
			return getBetNumberOfD11AnyTD(arr, 2)
			break;
		}
		case '猜一个号' : {
			return getBetNumberOfZX(arr) * 21;
			break;
		}
	}
}
// KL10
function getNumberOfKL10(gameMathString, arr){
	switch(gameMathString){
		case '首位数投' : 
		case '首位红投' : {
			return getBetNumberOfZX(arr);
			break;
		}
		case '二连直' : {
			return getBetNumberOfAny4ZX4(arr);
			break;
		}
		case '二连组' : 
		case '快乐二' : {
			return getBetNumberOf3DZFS(arr, 2)
			break;
		}
		case '前三直' : {
			return getBetNumberOfKL10Q3(arr)
			break;
		}
		case '前三组' : 
		case '快乐三' : {
			return getBetNumberOf3DZFS(arr, 3);
			break;
		}
		case '快乐四' : {
			return getBetNumberOf3DZFS(arr, 4);
			break;
		}
		case '快乐五' : {
			return getBetNumberOf3DZFS(arr, 5);
			break;
		}

	}
}
// 前三直
function getBetNumberOfKL10Q3(arr){
	arr = arr.split('|')
	let arr1 = arr[0].split(' '),
		arr2 = arr[1].split(' '),
		arr3 = arr[2].split(' ');
	let number = 0;
	arr1 && arr1.map((item, index)=>{
		let nextArrIndex = arr2.indexOf(item)
		console.log(nextArrIndex)
		let arr2Copy = arr2.slice()
		if(nextArrIndex>-1) arr2Copy.splice(nextArrIndex,1);
		arr2Copy.map((item2, index2)=>{
			let nextArr3Index2 = arr3.indexOf(item2),
				nextArr3Index1 = arr3.indexOf(item)
			let arr3Copy = arr3.slice()
			if(nextArr3Index2 > -1) arr3Copy.splice(nextArr3Index2,1)
			if(nextArr3Index1 > -1) arr3Copy.splice(nextArr3Index1,1)
			number += arr3Copy.length
		})
	})
	return number;
}

// MARK_SIX 
function getNumberOfMark6(arr){
	return getBetNumberOfZX(arr);
}

// X3D 
function getNumberOfX3D(gameMathString, arr){
	switch(gameMathString){
		case '三星-直选复式' : 
		case '二星-前二直选' : 
		case '二星-后二直选' : 
		case '不定位-一码不定位' : 
		case '大小单双-后二大小单双' : 
		case '大小单双-前二大小单双' : {
			return getBetNumberOfZX(arr);
			break;
		}
		case '二星-前二组选' : 
		case '二星-后二组选' : 
		case '不定位-二码不定位' : {
			return getBetNumberOf3DZFS(arr, 2)
			break;
		}
		case '三星-直选和值' : {
			return getBetNumberOfAny3Sum(arr);
			break;
		}
		case '三星-组三复式' : {
			return 2 * getBetNumberOf3DZFS(arr, 2)
			break;
		}
		case '三星-组六复式' : {
			return getBetNumberOf3DZFS(arr, 3)
			break;
		}
		case '三星-组三和值' : {
			return getBetNumberOf3DSumZ3(arr);
			break;
		}
		case '三星-组六和值' : {
			return getBetNumberOf3DSumZ6(arr);
			break;
		}
		case '定位胆-定位胆' : {
			return getBetNumberOfDN(arr);
			break;
		}
	}
}
// 三星-组三复式
function getBetNumberOf3DZFS(arr, num){
	arr = arr.split(' ');
	return arr[0] ? combination(arr.length, num): 0
}
// 三星-组三和值
function getBetNumberOf3DSumZ3(arr){
	arr = arr.split(' ');
	let num = 0
	arr.map((item, index)=>{
		item = parseInt(item)
		for(let i = 9; i>=0; i--){
			for(let j = 0; j < i; j++){
				if(i*2+j===item||i+j*2===item){
					num++;
				}
			}
		}
	})
	return num;
}
// 三星-组六和值
function getBetNumberOf3DSumZ6(arr) {
	arr = arr.split(' ');
	let num = 0;
	arr.map((item, index)=>{
		item = parseInt(item)
		for(let i = 9; i>=0; i--){
			for(let j = i-1; j>=0; j--){
				for(let k = j-1; k>=0; k--){
					if(i + j + k === item){
						num++
					}
				}
			}
		}
	})
	return num;
}

// 28
function getNumberOf28(gameMathString, arr) {
	switch(gameMathString){
		case '混合' : 
		case '特码' : 
		case '波色' : 
		case '豹子' : {
			return getBetNumberOf28HH(arr);
			break;
		}
		case '特码包三' : {
			return getBetNumberOf28TMB3(arr)
			break;
		}
	}
}
// 混合
function getBetNumberOf28HH(arr){
	arr = arr.split(' ')
	return arr[0] ? arr.length : 0;
}
// 特码包三
function getBetNumberOf28TMB3(arr) {
	arr = arr.split(' ')
	return arr[0] && arr.length === 3 ? 1 : 0 
}

// D11
function getNumberOfD11(gameMathString, arr) {
	switch(gameMathString){
		case '任选二' : 
		case '前二组选' : {
			return getBetNumberOfD11Any(arr, 2)
			break;
		}
		case '任选三' : 
		case '前三组选' : {
			return getBetNumberOfD11Any(arr, 3)
			break;
		}
		case '任选四' : {
			return getBetNumberOfD11Any(arr, 4)
			break;
		}
		case '任选五' : {
			return getBetNumberOfD11Any(arr, 5)
			break;
		}
		case '任选六' : {
			return getBetNumberOfD11Any(arr, 6)
			break;
		}
		case '任选七' : {
			return getBetNumberOfD11Any(arr, 7)
			break;
		}
		case '任选八' : {
			return getBetNumberOfD11Any(arr, 8)
			break;
		}
		case '前一直选' : {
			return getBetNumberOfD11Q1ZX(arr)
			break;
		}
		case '前二直选' : {
			return getBetNumberOfQ2(arr);
			break;
		}
		case '前三直选' : {
			return getBetNumberOfQ3(arr);
			break;
		}
		case '任选二胆拖' : 
		case '前二组选胆拖' : {
			return getBetNumberOfD11AnyTD(arr, 2);
			break;
		}
		case '任选三胆拖' : 
		case '前三组选胆拖' : {
			return getBetNumberOfD11AnyTD(arr, 3);
			break;
		}
		case '任选四胆拖' : {
			return getBetNumberOfD11AnyTD(arr, 4);
			break;
		}
		case '任选四胆拖' : {
			return getBetNumberOfD11AnyTD(arr, 5);
			break;
		}
		case '任选六胆拖' : {
			return getBetNumberOfD11AnyTD(arr, 6);
			break;
		}
		case '任选七胆拖' : {
			return getBetNumberOfD11AnyTD(arr, 7);
			break;
		}
		case '任选八胆拖' : {
			return getBetNumberOfD11AnyTD(arr, 8);
			break;
		}
	}
}
// 前一直选
function getBetNumberOfD11Q1ZX(arr) {
	arr = arr.split(' ')
	return arr.length;
}
// 任选
function getBetNumberOfD11Any(arr, num) {
	arr = arr.split(' ')
	return combination(arr.length, num)
}
// 任选胆拖 
function getBetNumberOfD11AnyTD(arr, num) {
	arr = arr.split('|')
	let arr1 = arr[0],
		arr2 = arr[1];
	arr1 = arr1.split(' ');
	arr2 = arr2.split(' ');
	let length1 = arr1[0] ? arr1.length : 0;
	let length2 = arr2[0] ? arr2.length : 0;
	let number = 0;
	if(!length1) number = 0
	else {
		number = combination(length2, num - length1) 
	}
	return number;
}

// PK10
function getNumberOfPK10(gameMathString, arr){
	switch(gameMathString){
		case '前一' : {
			return getBetNumberOfQ1(arr);
			break;
		}
		case '前二' : {
			return getBetNumberOfQ2(arr);
			break;
		}
		case '前三' : {
			return getBetNumberOfQ3(arr);
			break;
		}
		case '定位胆' : {
			return getBetNumberOfPK10DN(arr);
			break;
		}
	}
}
// 定位胆
function getBetNumberOfPK10DN(arr){
	arr = arr.replace(/\|/g, ' ')
	arr = arr.trim()
	arr = arr.split(' ')
	let number = 0
	number = arr[0] ? arr.length : 0;
	return number;
}
function getBetNumberOfQ1(arr){
	arr = arr.split(' ');
	if(!arr[0]) return 0;
	else return arr.length;
}
function getBetNumberOfQ2(arr) {
	arr = arr.split('|');
	let arr1 = arr[0].trim().split(' ')
	let arr2 = arr[1].trim().split(' ')
	let number = 0;
	arr1.map((item,index)=>{
		if(item && arr2[0]) {
			number += arr2.indexOf(item) > -1 ? arr2.length - 1 : arr2.length;
		}
	})
	return number;
}
function getBetNumberOfQ3(arr) {
	let result = [];
	arr = arr.split('|')
	let arr1 = arr[0].trim().split(' ')
	let arr2 = arr[1].trim().split(' ')
	let arr3 = arr[2].trim().split(' ')
	let number = 0;
	for(let i = 0; i < arr1.length; i++){
		for(let j = 0; j < arr2.length; j++){
			if(arr1[i]!==arr2[j]){
				for(let k = 0; k < arr3.length; k++){
					if(arr1[i] !== arr3[k] && arr2[j] !== arr3[k]){
						number++
						let item = [i,j,k]
						//result.push(item);// 所有投注结果
					}
				}
			}
		}
	}
	return number;
}
// 时时彩
function getNumberOfSSC(gameMathString, arr, selectedDigit) {
	switch(gameMathString){
		case '定位胆-定位胆' : {
			return getBetNumberOfDN(arr)
			break;
		}
		case '五星-五星通选' : 
		case '五星-五星直选' : 
		case '三星-三星直选' : 
		case '二星-二星直选' : 
		case '大小单双-后二大小单双': 
    case '大小单双-后三大小单双': 
    case '大小单双-前二大小单双': 
    case '大小单双-前三大小单双': 
    case '不定位-前三一码': 
    case '不定位-后三一码': 
    case '不定位-前四一码': 
    case '不定位-后四一码': 
    case '不定位-五行一码': {
			return getBetNumberOfZX(arr)
			break;
		}
		case '三星-三星组三' : {
			return getBetNumberOfZ3(arr)
			break;
		}
		case '三星-三星组六' : 
		case '不定位-五星三码': {
			return getBetNumberCommon(arr, 3)
			break;
		}
		case '二星-二星组选' : 
		case '不定位-前三二码': 
		case '不定位-后三二码': 
		case '不定位-前四二码': 
		case '不定位-后四二码': 
		case '不定位-五星二码': {
			return getBetNumberCommon(arr, 2)
			break;
		}
		case '任选二-直选复式' : {
			return getBetNumberOfAny2(arr, 2);
			break;
		}
		case '任选二-直选和值' : {
			return getBetNumberOfAny2Sum(arr, selectedDigit);
			break;
		}
		case '任选三-直选和值' : {
			return getBetNumberOfAny3Sum(arr, selectedDigit);
			break;
		}
		case '任选二-组选复式' : {
			return getBetNumberOfAnyZX(arr, selectedDigit, 2);
			break;
		}
		case '任选三-组六复式' : {
			return getBetNumberOfAnyZX(arr, selectedDigit, 3);
			break;
		}
		case '任选三-组三复式' : {
			return getBetNumberOfAny3Z3(arr, selectedDigit);
			break;
		}
		case '任选二-组选和值' : {
			return getBetNumberOfAny2SumZX(arr, selectedDigit);
			break;
		}
		case '任选三-组选和值' : {
			return getBetNumberOfAny3SumZX(arr, selectedDigit);
			break;
		}
		case '任选三-直选复式' : {
			return getBetNumberOfAny3(arr, 3);
			break;
		}
		case '任选四-直选复式' : {
			return getBetNumberOfAny4(arr, 4);
			break;
		}
		case '任选四-组选24' : {
			return getBetNumberOfAny4ZX24(arr, selectedDigit);
			break;
		}
		case '任选四-组选12' : {
			return getBetNumberOfAny4ZX12(arr, selectedDigit);
			break;
		}
		case '任选四-组选6' : {
			return getBetNumberOfAny4ZX6(arr, selectedDigit);
			break;
		}
		case '任选四-组选4' : {
			return getBetNumberOfAny4ZX4(arr, selectedDigit)
			break;
		}
	}
}

// 注数

// 通用
function getBetNumberCommon(arr, digit){
	return combination(arr.replace(/\s/g, '').length, digit) 
}

// 三星组六 可用通用替代
function getBetNumberOfZ6(arr) {
	arr = arr.replace(/\s/g,'');
	let length = arr.length;
	return combination(length, 3);
}
// 三星组三
function getBetNumberOfZ3(arr){
	arr = arr.replace(/\s/g, '')
	let length = arr.length;
	return combination(length, 2) * 2
}
// 处理排列数
function combination(length, j){
	if(j <= 0 ) return 0;
	if(j === 1) return length;
	let number = 0
	for(let i = length; i >= j; i--){
		number += combination(i-1, j-1)
	}
	return number;
}

// 直选
function getBetNumberOfZX(arr) {
  let number = 0
  arr = arr.split('|');
  if(!arr.join().replace(/,/g,'')){
    number = 0
  }else {
    for(let i = 0; i < arr.length; i++){
    	if(arr[i]) {
    		let digit = arr[i];
    		digit = digit.split(' ')
    		let length = digit.length;
      	number = number ? number * length : length;
    	}else{
    		number = 0;
    		break;
    	}
    }
  }
  return number;
}
//定位胆
function getBetNumberOfDN(arr) {
	let number = 0
	arr = arr.replace(/\|/g, '').replace(/\s/g, '')
	number = arr.length;
	return number;
}

// 任选二-直选复式
function getBetNumberOfAny2(arr, digit) {
	let number = 0, commonNumbers = 0, invalidNumbers = 0;
	let totalStr = arr.slice();
	let totalLength = totalStr.replace(/[\s\|]/g, '').length;
	commonNumbers = combination(totalLength, digit);
	arr = arr.split('|');
	arr.map((item, index)=>{
		item = item.replace(/\s/g, '');
		let itemLength = item.length;
		invalidNumbers += combination(itemLength, digit)
	})
	number = commonNumbers - invalidNumbers;
	return number;
}
// 任选三-直选复式
function getBetNumberOfAny3(arr, digit) {
	let number = 0, commonNumbers = 0, invalidNumbers = 0;
	let totalStr = arr.slice();
	let totalLength = totalStr.replace(/[\s\|]/g, '').length;
	commonNumbers = combination(totalLength, digit);
	arr = arr.split('|');
	let curDigit = digit;
	arr.map((item, index)=>{
		item = item.replace(/\s/g, '');
		let itemLength = item.length;	
		invalidNumbers += combination(itemLength, digit)
		invalidNumbers += combination(itemLength, 2) * (combination(totalLength-2, digit-2) - combination(itemLength-2, digit-2))
	})
	number = commonNumbers - invalidNumbers;
	return number;
}
// 任选四-直选复式 
function getBetNumberOfAny4(arr, digit){
	let number = 0;
	let totalStr = arr.slice();
	let totalLength = totalStr.replace(/[\s\|]/g, '').length;
	let subIndex = totalStr.indexOf('|');
	let firstArr = totalStr.substring(0, subIndex);
	let arrForAny3 = totalStr.substring(subIndex+1);
	let firstLength = firstArr.split(' ').length
	let lastNumbers = getBetNumberOfAny3(arrForAny3, 3)
	number += firstLength * lastNumbers;
	if(arr.split('|').length >= 3) number += getBetNumberOfAny4(arrForAny3, 3)
	return number
}
// 任选二 直选和值
function getBetNumberOfAny2Sum(arr, selectedDigit){
	arr = arr.split(' ');
	let num = 0
	arr.map((item, index)=>{
		for(let i = 0; i <= 9; i++){
			for(let j = 0; j <= 9; j++){
				if(i+j===parseInt(item)){
					num++
				}
			}
		}
	})
	let length = selectedDigit.length;
	let times = combination(length, 2);
	let number = times * num;
	return number
}
// 任选三-直选和值
function getBetNumberOfAny3Sum(arr, selectedDigit){
	arr = arr.split(' ');
	let num = 0, times = 1;
	arr.map((item, index)=>{
		for(let i = 0; i <= 9; i++){
			for(let j = 0; j <= 9; j++){
				for(let k = 0; k <= 9; k++){
					if(i+j+k===parseInt(item)){
						num++
					}
				}
			}
		}
	})
	if(selectedDigit)	times = combination(selectedDigit.length, 3);
	let number = times * num;
	return number
}

// 任选二-组选和值 
function getBetNumberOfAny2SumZX(arr, selectedDigit){
	arr = arr.split(' ');
	let num = 0
	arr.map((item, index)=>{
		for(let i = 0; i <= 9; i++){
			for(let j = 0; j<=9; j++){
				if(i!==j && i+j===parseInt(item)){
					num++
				}
			}
		}
	})
	num /= 2;
	arr.map((item, index)=>{
		for(let i = 0; i <= 9; i++){
			for(let j = 0; j <=9; j++) {
				if(i===j && i + j === parseInt(item)){
					num++
				}
			}
		}
	})
	let length = selectedDigit.length;
	let times = combination(length, 2);
	let number = times * num;
	return number
}
// 任选三-组选和值
function getBetNumberOfAny3SumZX(arr, selectedDigit){
	arr = arr.split(' ');
	let num = 0 , num1 = 0, num2 = 0;
	arr.map((item, index)=>{
		for(let i = 0; i <= 9; i++){
			for(let j = 0; j <= 9; j++){
				for(let k = 0; k <= 9; k++){
					if(i+j+k===parseInt(item)) {
						if(i!==j && j!==k && i!==k) {
							num1++
						}else if((i===j || j===k || i===k) && !(i===j && j===k)){
							num2++
						}else if(i===j && j===k){
							num++
						}
					}
				}
			}
		}
	})
	num += num1/6 + num2/3
	let length = selectedDigit.length;
	let times = combination(length, 3);
	let number = times * num;
	return number
}
// 任选二-组选复式   任选三-组六复式
function getBetNumberOfAnyZX(arr, selectedDigit, zNum){
	arr = arr.split(' ');
	let arrLength = arr.length;
	let digitLength = selectedDigit.length;
	let arrNumber = combination(arrLength, zNum);
	let digitNubmer = combination(digitLength, zNum);
	let number = arrNumber * digitNubmer;
	return number;
}
// 任选三-组三复式
function getBetNumberOfAny3Z3(arr, selectedDigit){
	arr = arr.split(' ');
	let arrLength = arr.length;
	let digitLength = selectedDigit.length;
	let arrNumber = combination(arrLength, 2) * 2;
	let digitNubmer = combination(digitLength, 3);
	let number = arrNumber * digitNubmer;
	return number;
}
// 任选四-组选24
function getBetNumberOfAny4ZX24(arr, selectedDigit){
	let length = arr.split(' ').length;
	let digitLength = selectedDigit.length;
	let number = combination(length, 4) * combination(digitLength, 4);
	return number;
}
// 任选四-组选12
function getBetNumberOfAny4ZX12(arr, selectedDigit){
	arr = arr.split('|')
	let arr1 = arr[0].split(' '),
		arr2 = arr[1].split(' ');
	let number = 0;
	arr1.map((item, index)=>{
		number += arr2.indexOf(item)>-1 ? combination(arr2.length-1,2) : combination(arr2.length, 2);
	})
	return number;
}
// 任选四-组选6
function getBetNumberOfAny4ZX6(arr, selectedDigit){
	let length = arr.split(' ').length;
	let digitLength = selectedDigit.length;
	return combination(length, 2) * combination(digitLength, 4)
}
// 任选四-组选4  二连直
function getBetNumberOfAny4ZX4(arr, selectedDigit){
	arr = arr.split('|')
	let number = 0;
	let arr1 = arr[0].split(' '),
		arr2 = arr[1].split(' ');
	let length1 = arr1.length,
		length2 = arr2.length;
	arr1.map((item, index)=>{
		number += arr2.indexOf(item)>-1 ? length2-1 : length2;
	})
	return selectedDigit ? combination(selectedDigit.length, 4) * number : number;
}