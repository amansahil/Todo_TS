import React, {Component} from 'react';
import { Provider } from 'react-redux';

import Tabs from './screens/Tabs'
import store from './store';

class App extends Component{
  render() {
    return (
      <Provider store={store}>
        <Tabs />
      </Provider>
    );
  }
}

export default App;
