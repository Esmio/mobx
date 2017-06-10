import React from 'react';
import { Router, Route, routerRedux } from 'dva/router';
import IndexPage from './routes/IndexPage';
import PlaygroundPage from './routes/PlaygroundPage';
import LoginPage from "./routes/LoginPage.js";
import ResultsPage from "./routes/ResultsPage.js";
import LottoItem from './components/StartLotto/LottoItem';
import TrendChartPage from "./routes/TrendChartPage.js";

import BetResultsPage from "./routes/BetResultsPage.js";

import BetSuccessPage from "./routes/BetSuccessPage.js";

import RegisterPage from "./routes/RegisterPage.js";

import Settings from "./routes/Settings.js";

import AboutUs from "./routes/AboutUs.js";

import Agreement from "./routes/Agreement.js";

import AccountDetail from "./routes/AccountDetail.js";

import SingleDetailPage from "./routes/SingleDetailPage.js";

import TopUpRecordPage from "./routes/TopUpRecordPage.js";

import WithdrawalsPage from "./routes/WithdrawalsPage.js";

import OrderListPage from "./routes/OrderListPage.js";

import OrderDetailPage from "./routes/OrderDetailPage.js";

import SubOrderDetailPage from "./routes/SubOrderDetailPage.js";

import PasswordPage from "./routes/PasswordPage.js";

import PasswordResetPage from "./routes/PasswordResetPage.js";

import MessagePage from "./routes/MessagePage.js";

import BindBankCardPage from "./routes/BindBankCardPage.js";

function RouterConfig({history,app}) {
  return (
    <Router history={history}>
      <Route path="/" component={LoginPage} />
      <Route path="/home" component={IndexPage}  />
      <Route path="/play" component={PlaygroundPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/result" component={ResultsPage} />
      <Route path="/trend"  component={TrendChartPage}  />
      <Route path="/betresults" component={BetResultsPage} />
      <Route path="/success" component={BetSuccessPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/settings" component={Settings} />
      <Route path="/aboutus" component={AboutUs} />
      <Route path="/agreement" component={Agreement} />
      <Route path="/medetail" component={AccountDetail} />
      <Route path="/single" component={SingleDetailPage} />
      <Route path="/topupdetail" component={TopUpRecordPage} />
      <Route path="/withdrawals" component={WithdrawalsPage} />
      <Route path="/orderlist" component={OrderListPage} />
      <Route path="/orderdetail" component={OrderDetailPage} />
      <Route path="/suborderdetail" component={SubOrderDetailPage} />
      <Route path="/passwordmanage" component={PasswordPage} />
      <Route path="/passwordreset" component={PasswordResetPage} />
      <Route path="/message" component={MessagePage} />
      <Route path="/BindBankCardPage" component={BindBankCardPage} />
    </Router>
  );
}

export default RouterConfig;
      
