import React, {Component} from 'react';
import Splash from './src/components/SplashScreen';
import Error from './src/components/ErrorScreen';
import Navigation from './src/pages/Navigations';
import JailMonkey from 'jail-monkey';

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
    return this.state.view;
  }
}
