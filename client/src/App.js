import React from 'react';
import io from 'socket.io-client';

class App extends React.Component {

  state = {
    tasks: [],
    taskName: '',
  }

  componentDidMount() {
    this.socket = io('http://localhost:8000');
    this.socket.on('addTask', task => {
      this.addTask(task);
    });
    this.socket.on('removeTask', removedTask => {
      this.removeTask(removedTask);
    });
    this.socket.on('updateData', (updateData) => {
      this.updateTasks(updateData)
    });
  }

  removeTask = (removedTask) => {
    this.setState(state => {
      return state.tasks.splice(removedTask, 1);
    });
    this.socket.emit('removeTask', removedTask);
  };

  submitForm = (e) => {
    e.preventDefault();
    this.addTask({name: this.state.taskName});
    this.socket.emit('addTask', {name: this.state.taskName});
  };

  addTask = (task) => {
    this.setState({
      tasks: [...this.state.tasks, task],
    })
  };

  updateTasks = (updateData) => {
    this.setState({ tasks: updateData});
  }

  render() {
    const { tasks, taskName } = this.state;
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
                <button class="btn btn--red"
                onClick={() => this.removeTask(tasks.indexOf(task))}>
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <form id="add-task-form">
            <input
            className="text-input"
            autocomplete="off"
            type="text"
            placeholder="Type your description"
            id="task-name"
            value={taskName}
            onChange={(e) => this.setState({ taskName: e.target.value })}
            />
            <button className="btn" type="submit" onClick={e => this.submitForm(e)}>Add</button>
          </form>
        </section>
      </div>
    );  };

};

export default App;