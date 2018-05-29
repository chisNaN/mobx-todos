import React from 'react';
import ReactDOM from 'react-dom';
import {observable, action, autorun, computed, configure} from "mobx"
import {observer} from "mobx-react"
import './index.css';
import registerServiceWorker from './registerServiceWorker';
configure({ enforceActions: true });

class AppState {
  @observable timer = 0;
  constructor(something){
    this.something = something;
    console.log('getter ', this.test);
    //autorun(_ => console.log('getter ', this.test));
  }
  @action resetTimer() {
    console.log(this.test);
      this.timer = 0;
  };
   @action increment (){
    this.timer += 1
  }
  startTimer() {
     setInterval(() => this.increment() , 1000);
  }
  @computed get test() {
    return this.timer * this.something;
  }
}

@observer
class TimerView extends React.Component {
  constructor(props){
    super(props);
    props.appState.startTimer();
  }
    render() {
        return (<button onClick={() => this.props.appState.resetTimer()}>
                Seconds passed: {this.props.appState.timer}
            </button>);
    }
}

ReactDOM.render(<TimerView appState={new AppState(10)} />, document.getElementById('root'));
