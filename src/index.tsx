import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './infrastructure/components/App';
import UseCaseRegistry from "./application/useCase/UseCaseRegistry";
import registerServiceWorker from './registerServiceWorker';

import FirebaseProviderAuthentication from "./infrastructure/firebase/firebaseProviderAuthentication";
import * as firebase from 'firebase';
import firebaseConfig from './infrastructure/firebase/config';
import {injectGlobal} from 'styled-components';

firebase.initializeApp(firebaseConfig);

const firebaseProviderAuthentication = new FirebaseProviderAuthentication(firebase);
const useCaseRegistry = new UseCaseRegistry(firebaseProviderAuthentication);

ReactDOM.render(
    <App useCaseRegistry={useCaseRegistry} />,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();

// Global style
/* tslint:disable-next-line */
injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }`;

