import React, {Component} from 'react';
import Splash from './src/components/SplashScreen';
import Error from './src/components/ErrorScreen';
import Navigation from './src/pages/Navigations';
// import {MenuProvider} from 'react-native-popup-menu';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './src/redux/reducer/globalReducer';
import thunk from 'redux-thunk';
import {LogBox} from 'react-native';
import JailMonkey from 'jail-monkey';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const storeRedux = createStore(rootReducer, applyMiddleware(thunk));

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: <Splash />,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      if (true) {
        if (JailMonkey.isJailBroken()) {
          this.setState({
            view: <Error />,
          });
        } else {
          this.setState({
            view: <Navigation />,
          });
        }
      }
    }, 2000);
  }

  render() {
    return (
      <Provider store={storeRedux}>
        {/* <MenuProvider> */}
        {this.state.view}
        {/* </MenuProvider> */}
      </Provider>
    );
  }
}
