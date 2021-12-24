import axios from "axios";

export default class HelloWorldService {
	static getHelloWorldMessage() {
		return axios.get("http://localhost:8080/hello-world");
	}

	static getHelloWorldBeanMessage() {
		return axios.get("http://localhost:8080/hello-world-bean");
	}

	static getHelloWorldBeanPathVariableMessage(name, id, nick) {
		return axios.get(
			`http://localhost:8080/hello-world-bean/ww/${name}?id=${id}&nick=${nick}`
		);
	}
}
