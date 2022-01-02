import axios from "axios";
import * as buffer from "buffer";

export default class TodoService {
	// static getBase64Encode(username, password) {
	// 	let str = `Basic ${username}:${password}`;
	// 	let bufferObj = buffer.Buffer.from(str, "utf8");
	// 	let base64String = bufferObj.toString("base64");
	// 	console.log(base64String);

	// 	console.log(buffer.Buffer.from(str, "base64").toString("base64"));
	// 	// console.log(Buffer.from(str, "base64").toString(""));
	// 	console.log(new buffer.Buffer(str).toString("base64"));
	// 	return new buffer.Buffer.from(str, "base64").toString("base64");
	// }

	static getListofTodos() {
		console.log("getListofTodos");
		return axios.get(
			process.env.REACT_APP_BASE_URL_DEV + "/todos/wilsonwang"
			// {
			// 	auth: {
			// 		username: "aaa",
			// 		password: "aaa"
			// 	}
			// }
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
