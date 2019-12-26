import React from 'react';
import './App.css';
import TodoList from './container/TodoList';

class App extends React.Component {
	render() {
		return (
			<React.Fragment>
				<TodoList />
			</React.Fragment>
		  );
	}
}

export default App;
