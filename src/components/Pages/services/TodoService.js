import axios from "axios";

export default class TodoService {
	static getListofTodos() {
		return axios.get(
			process.env.REACT_APP_BASE_URL_DEV + "/todos/wilsonwang"
		);
	}

	static deleteTodo(id) {
		return axios.delete(
			process.env.REACT_APP_BASE_URL_DEV + `/todos/wilsonwang/${id}`
		);
	}

	static updateTodo(id, todo) {
		return axios.put(
			process.env.REACT_APP_BASE_URL_DEV + `/todos/wilsonwang/${id}`,
			todo
		);
	}

	static addTodo(todo) {
		return axios.post(
			process.env.REACT_APP_BASE_URL_DEV + `/todos/wilsonwang`,
			todo
		);
	}
}
