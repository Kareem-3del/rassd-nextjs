import axios from "axios";

const baseURL = "https://api-docs.almasaalswda.com";

export const api = axios.create({
  baseURL,
});

async function getToken() {
  if (typeof window === 'undefined') {
    const { cookies } = (await import('next/headers'))
    return cookies().get('token')?.value
  }
  const value = `; ${document.cookie}`;
  const parts = value.split(`; token=`);
  // @ts-ignore
  if (parts.length === 2) return parts?.pop().split(';').shift();
}

api.interceptors.request.use(
  async (config) => {
    // Get the token from cookies
    const token = await getToken();
  console.log(token)
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);