import dva from 'dva';
import {browserHistory, routerRedux} from 'dva/router';
import './index.css';

// 1. Initialize
const app = dva({
	history: browserHistory,
	onError:(err,dispatch) => {
		if(err.message === '401'){
			dispatch(routerRedux.push({
				pathname: '/'
			}))
		}
		console.log('err',err)
	}
});

app.model(require("./models/home"));

app.model(require("./models/betresults"));

app.model(require("./models/play"));

app.model(require("./models/startLotto"));

app.model(require("./models/login"));

app.model(require("./models/buyLottery"));

app.model(require("./models/mine"));

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
