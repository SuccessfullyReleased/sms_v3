import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {AppRouter} from "./router/Router";

import './assets/css/common.css';
// import {store} from "./store";
// import {Provider} from "react-redux";
//
// const Root = () => (
// 	<Provider store={store}>
// 		<AppRouter/>
// 	</Provider>
// );

ReactDOM.render(<AppRouter/>, document.getElementById('root'));

serviceWorker.unregister();
