import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import './styles/main.scss'
import './styles/colors.scss'
import 'antd/dist/antd.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(

      <BrowserRouter>
          <App />
          <ToastContainer />
      </BrowserRouter>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
