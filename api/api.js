import axios from "axios";
import { API_KEY } from "@env";

export const api = () => {
	return axios.create({
		baseURL: "https://api.humorapi.com/",
		headers: {
			"x-api-key": API_KEY,
		},
	});
};
