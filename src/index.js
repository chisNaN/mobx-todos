import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import {observable, toJS, action, computed, configure, reaction} from "mobx"
import {observer} from "mobx-react"
import './index.css';
configure({ enforceActions: true });

class Todos {

  @observable todos = [];
  constructor() {
    this.years = Array(5).fill(new Date().getFullYear() -1).map((v, k) => v + k).map(String);
    reaction(_ => this.report, r => console.log(r));
  }

  @action addTodo(todo) {
    const o = {
      todo,
      date: new Date(this.years[~~(Math.random() * this.years.length)]).toLocaleDateString({ year: 'numeric', month: 'long', day: 'numeric' }),
      completed: !!~~(Math.random() * 2)
    };
    this.todos.push(o);
  }

  @computed get completedTodos() {
    return this.todos.filter(v => v.completed).length;
  }

  @computed get report() {
    console.log(toJS(this.todos));
    return `todos progression ${~~(this.completedTodos / this.todos.length * 100)} %`;
   }
}
const TodoView = observer(props => {
    return (
      <Fragment>
        <button onClick={() => props.store.addTodo(String.fromCharCode(...Array(25).fill(65).map(_ => ~~(Math.random() * 25) + _)))}>add something</button>
        <Fragment>
          {props.store.todos.map((todo, k) => <li key={k}>{todo.todo} {todo.completed.toString()} {todo.date} </li>)}
        </Fragment>
      </Fragment>
    );
});

ReactDOM.render(<TodoView store={new Todos()} />, document.getElementById('root'));
