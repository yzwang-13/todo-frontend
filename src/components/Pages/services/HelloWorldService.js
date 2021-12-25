import axios from "axios";

export default class HelloWorldService {
	static getHelloWorldMessage() {
		return axios.get(process.env.REACT_APP_BASE_URL_DEV + "/hello-world");
	}

	static getHelloWorldBeanMessage() {
		return axios.get(
			process.env.REACT_APP_BASE_URL_DEV + "/hello-world-bean"
		);
	}

	static getHelloWorldBeanPathVariableMessage(name, id, nick) {
		return axios.get(
			process.env.REACT_APP_BASE_URL_DEV +
				`/hello-world-bean/ww/${name}?id=${id}&nick=${nick}`
		);
	}
}
