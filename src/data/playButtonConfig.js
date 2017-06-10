const buttonsUp = {
	"PK10" : ['前一', '前二', '前三', '定位胆'],
	"SSC" :  ['定位胆', '五星', '三星', '二星', '大小单双', '不定位', '任选二', '任选三', '任选四'],
	"D28" : ['混合', '特码', '特码包三', '波色', '豹子'],
	"3D" : ['三星', '二星', '定位胆', '不定位', '大小单双'],
	'MARK6' : ['特码B', '特码A', '特码-种类', '特码-色波', '色波-半波', '色波-半半波', '特肖-生肖', '头尾数', '正码-选号', '五行', '平特一肖', '平特尾数', '正肖-生肖', '7色波-种类', '总肖-种类'],
	'D11' : {
		'普通' : ['任选二', '任选三', '任选四', '任选五', '任选六', '任选七', '任选八', '前一直选', '前二组选', '前二直选', '前三组选', '前三直选'],
		'胆拖' : ['任选二', '任选三', '任选四', '任选五', '任选六', '任选七', '任选八', '前二组选', '前三组选']
	},
	'HAPPY10' : ['首位数投', '首位红投', '二连直', '二连组', '前三直', '前三组', '快乐二', '快乐三', '快乐四', '快乐五'],
	'K3' : ['和值', '三同号通选', '三同号单选', '三不同号', '三连号通选', '二同号复选', '二同号单选', '二不同号', '二不同号胆拖','猜一个号']

}

const buttonsDown ={
	"SSC" : {
		'定位胆' : ['定位胆'],
		'五星' : ['五星通选', '五星直选'],
		'三星' : ['三星直选', '三星组三', '三星组六'],
		'二星' : ['二星直选', '二星组选'],
		'大小单双' : ['后二大小单双', '后三大小单双', '前二大小单双', '前三大小单双'],
		'不定位' : ['前三一码', '前三二码', '后三一码', '后三二码', '前四一码', '前四二码', '后四一码', '后四二码', '五星一码', '五星二码', '五星三码'],
		'任选二' : ['直选复式', '直选和值', '组选复式', '组选和值'],
		'任选三' : ['直选复式', '直选和值', '组三复式', '组六复式', '组选和值'],
		'任选四' : ['直选复式', '组选24', '组选12', '组选6', '组选4']
	},
	"3D" : {
		'三星' : ['直选复式', '直选和值', '组三复式', '组六复式', '组三和值', '组六和值'],
		'二星' : ['前二直选', '后二直选', '前二组选', '后二组选'],
		'定位胆' : ['定位胆'],
		'不定位' : ['一码不定位', '二码不定位'],
		'大小单双' : ['后二大小单双', '前二大小单双']
	}
}

function chooseButtons(gameId) {
	switch(gameId) {
		case 'HF_CQSSC' :
		case 'HF_XJSSC' :
		case 'HF_TJSSC' :
		case 'HF_JXSSC' :
		case 'HF_LFSSC' : {
			return {buttonsUp: buttonsUp["SSC"], buttonsDown: buttonsDown["SSC"]}
			break;
		}
		case 'HF_BJPK10' : 
		case 'HF_LFPK10' : {
			return {buttonsUp: buttonsUp["PK10"]}
			break;
		}
		case 'HF_SHD11' : 
		case 'HF_GDD11' : 
		case 'HF_JXD11' : 
		case 'HF_SDD11' : 
    	case 'HF_AHD11' : {
			return {buttonsUp: buttonsUp["D11"]}
			break;
		}
		case 'HF_BJ28' : 
    	case 'HF_SG28' : {
			return {buttonsUp: buttonsUp["D28"]}
			break;
		}
		case 'X3D' : 
		case 'HF_SHSSL' : 
		case 'PL3' : {
			return {buttonsUp: buttonsUp["3D"], buttonsDown: buttonsDown["3D"]}
			break;
		}
		case 'MARK_SIX' : {
			return {buttonsUp: buttonsUp["MARK6"]}
			break;
		}
		case 'HF_CQKL10F' : 
	    case 'HF_TJKL10F' : 
	    case 'HF_GDKL10F' : {
	    	return {buttonsUp: buttonsUp["HAPPY10"]}
	    	break;
	    }
	    case 'HF_AHK3' : 
	    case 'HF_JSK3' : 
	    case 'HF_GXK3' : {
	    	return {buttonsUp: buttonsUp["K3"]}
	    	break;
	    }
	}
}

export {
	chooseButtons
}