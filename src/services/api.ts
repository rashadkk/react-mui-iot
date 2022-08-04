import axios, { AxiosRequestConfig } from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

class API {
  constructor() {
    console.log('baseurl', baseURL);
    axios.defaults.baseURL = baseURL;

    axios.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        //   const token = localStorageService.getAccessToken()
        //   if (token) {
        //     config.headers['Authorization'] = 'Bearer ' + token
        //   }
        // config.headers['Content-Type'] = 'application/json';
        return config
      },
      error => {
        Promise.reject(error)
      }
    )
  }

  get(url: string) {
    return axios.get(url);
  }

  post(url: string, params: any) {
    return axios.post(url, params);
  }

  put(url: string, data: any) {
    return axios.put(url, data);
  }

  delete(url: string) {
    return axios.delete(url);
  }
}

export default new API();
