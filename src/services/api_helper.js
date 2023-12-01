import HttpService from "./http-service";
import { AUTH, USER } from "../common/const.api";

const http = new HttpService();

export const apiCreateUser = async (email, password, name) => {
  const body = {
    email,
    password,
    name,
  };
  return await http.post(USER, { body });
};

export const apiLogin = async (email, password) => {
  const auth = {
    username: email,
    password,
  };

  return await http.post(AUTH, { auth });
};
