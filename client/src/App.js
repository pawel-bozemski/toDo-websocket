import React from 'react';
import io from 'socket.io-client';

class App extends React.Component {

  state = {
    tasks: [
      {id: 1, name: 'Shopping'},
      {id: 2, name: 'Read a book'},
    ],
  }

  componentDidMount() {
    this.socket = io('http://localhost:8000');
  }

  removeTask (taskId) {
    this.setState(state => {
      return state.tasks.splice(taskId, 1);
    });
  };

  render() {
    return (
      <div className="App">

        <header>
          <h1>ToDoList.app</h1>
        </header>

        <section className="tasks-section" id="tasks-section">
          <h2>Tasks</h2>

          <ul className="tasks-section__list" id="tasks-list">
            {this.state.tasks.map(task =>(
              <li key={task.id} class="task">
                {task.name}
                <button class="btn btn--red" onClick={() => this.removeTask(this.state.tasks.indexOf(task))}>Remove</button>
              </li>
            ))}
          </ul>

          <form id="add-task-form">
            <input className="text-input" autocomplete="off" type="text" placeholder="Type your description" id="task-name" />
            <button className="btn" type="submit">Add</button>
          </form>

        </section>
      </div>
    );  };

};

export default App;