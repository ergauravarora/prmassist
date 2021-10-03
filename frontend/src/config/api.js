import axios from "axios";
import { ApiUrl } from "./config";

const baseUrl = ApiUrl;
let isRetried = false

//request interceptor to add the auth token header to requests
axios.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        config.headers["Authorization"] = `bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  //response interceptor to refresh token on receiving token expired error
axios.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      const originalRequest = error.config;
      let refreshToken = localStorage.getItem("refreshToken");
   
  if ( refreshToken && (error && error.response && error.response.status === 401) && !isRetried ) 
  {
        isRetried = true;
        return axios
          .post(`${baseUrl}/RefreshToken`, { refreshToken: refreshToken })
          .then((res) => {
            if (res.status === 200) {
              localStorage.setItem("accessToken", res.data.accessToken);
              console.log("Access token refreshed!");
              isRetried = false
              return axios(originalRequest);
            }
          });
    }
      return Promise.reject(error);
    }
  );
  //functions to make api calls
  const api = {

    GetTokenAgainstUid:(body)=>{
        return axios.post(`${ApiUrl}/GetTokenAgainstUid`, body,new Headers({'content-type': 'application/json'}));  
    },
    GetUserById: (body) => {
      return axios.post(`${ApiUrl}/GetUserById`, body,new Headers({'content-type': 'application/json'}));
    },
    GetAllUser:()=>{
      return axios.get(`${ApiUrl}/GetAllUser`,new Headers({'content-type': 'application/json'}));
    },
    ReportBug:(body) => {
      return axios.post(`${ApiUrl}/ReportBug`, body,new Headers({'content-type': 'application/json'}));
    },
    FileUpload:(body) => {
      return axios.post(`${ApiUrl}/FileUpload`, body);
    },
  };
  export default api;