import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppContainer from './infrastructure/components/App/AppContainer';
import UserActionsUseCaseRegistry from "./application/useCase/userActions/UserActionsUseCaseRegistry";
import registerServiceWorker from './registerServiceWorker';

import FirebaseProviderAuthentication from "./infrastructure/firebase/firebaseProviderAuthentication";
import * as firebase from 'firebase';
import firebaseConfig from './infrastructure/firebase/config';
import {injectGlobal} from 'styled-components';
import {Provider} from 'react-redux'

import store from 'src/infrastructure/store/store';

firebase.initializeApp(firebaseConfig);

const firebaseProviderAuthentication = new FirebaseProviderAuthentication(firebase);
const useCaseRegistry = new UserActionsUseCaseRegistry(firebaseProviderAuthentication);

ReactDOM.render(
    <Provider store={store}>
        <AppContainer useCaseRegistry={useCaseRegistry} />
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();

// Global style
/* tslint:disable-next-line */
injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-family: "Roboto", sans-serif;;
  }`;

