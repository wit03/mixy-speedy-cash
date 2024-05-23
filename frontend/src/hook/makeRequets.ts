import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from "axios"

const source:CancelTokenSource = axios.CancelToken.source();

export const api = axios.create({
  withCredentials: true,
  cancelToken : source.token,
})

type MakeRequest<T> = {
  error: AxiosResponse<T, any> | null;
  data: T | null;
  status: number;
}

export async function makeRequest<T>(url:string, options:AxiosRequestConfig): Promise<MakeRequest<T>> {
   try {
    const res = await api<T>(url, options);
    if(res.status === 200 || res.status === 201){
      return { error: null, data: res.data, status:res.status };
    }
    else {
      return { error: res, data:res.data, status:res.status ? res.status : -1 };
    }
   } catch (error: any) {
    return { error: error.response, data:null, status:error?.response?.status ? error.response?.status :  400 };
  }
}