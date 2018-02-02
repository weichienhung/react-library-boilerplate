import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import MyComponent from 'my-react-library';
import { AppContainer } from 'react-hot-loader';

const appElement = document.getElementById('example');
const renderApp = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>
    , appElement);
}

renderApp(MyComponent);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('my-react-library', (module) => {
    console.log(module);
    renderApp(MyComponent);
  });
}
