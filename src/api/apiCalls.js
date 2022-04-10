import Axios from "axios";

export const signup = body => {
    return Axios.post('/api/1.0/users', body);
  };

export const changeLanguage = language => {
    Axios.defaults.headers['accept-language'] = language;
  };