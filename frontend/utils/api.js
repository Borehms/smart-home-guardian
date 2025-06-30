import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.214.214:5000/api",
  timeout: 5000,
});
