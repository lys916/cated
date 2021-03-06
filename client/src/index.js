import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});
// import registerServiceWorker from './registerServiceWorker';

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

const store = createStore(
   rootReducer,
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
   applyMiddleware(thunk)
);

ReactDOM.render(
   <Provider store={store}>
   <MuiThemeProvider theme={theme}>
        <div className="body">
            <div className="mobile-version">
                Desktop version of this app is not available at this time, resize your browser smaller to view in a mobile version.
            </div>
            <App />
        </div> 
    </MuiThemeProvider>
   </Provider>, 
   document.getElementById('root')
);
serviceWorker.unregister();
// registerServiceWorker();



