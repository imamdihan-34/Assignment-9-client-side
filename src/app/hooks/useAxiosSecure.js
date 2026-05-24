import axios from "axios";

const axiosSecure = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default function useAxiosSecure() {
  return axiosSecure;
}