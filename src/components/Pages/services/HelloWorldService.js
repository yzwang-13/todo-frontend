import axios from "axios";

export default class HelloWorldService {
	static getHelloWorldMessage() {
		return axios
			.get("http://localhost:8080/hello-world");
	}
}
