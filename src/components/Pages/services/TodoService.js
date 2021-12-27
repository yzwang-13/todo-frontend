import axios from "axios";

export default class TodoService {
	static getListofTodos() {
		// console.log(process.env.REACT_APP_BASE_URL_DEV + "/todos/wilsonwang");
		return axios.get(
			process.env.REACT_APP_BASE_URL_DEV + "/todos/wilsonwang"
		);
	}

	static deleteTodo(id) {
		// console.log(process.env.REACT_APP_BASE_URL_DEV + "/todos/wilsonwang");
		return axios.delete(
			process.env.REACT_APP_BASE_URL_DEV + `/todos/wilsonwang/${id}`
		);
	}

	static updateTodo(id, todo) {
		// console.log(process.env.REACT_APP_BASE_URL_DEV + "/todos/wilsonwang");
		return axios.put(
			process.env.REACT_APP_BASE_URL_DEV + `/todos/wilsonwang/${id}`,
			todo
		);
	}
}
