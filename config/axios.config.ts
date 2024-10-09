  import axios from "axios";
  //https://api-docs.almasaalswda.com
  const baseURL = "https://api-docs.almasaalswda.com";

  export const api = axios.create({
    baseURL,
  });

  api.interceptors.request.use(
    async (config) => {
      // Get the token from cookies
      const token = await getToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const { response } = error;
      if (!response || response.status !== 401) {
        return Promise.reject(error)
      }

      return redirectToLogin()
    }
  );

  export async function getToken() {
    if (typeof window === 'undefined') {
      const { cookies } = (await import('next/headers'))
      return cookies().get('token')?.value
    }
    const value = `; ${document.cookie}`;
    const parts = value.split(`; token=`);
    // @ts-ignore
    if (parts.length === 2) return parts?.pop().split(';').shift();
  }

  async function redirectToLogin() {
    const path = "/auth/login"
    if (typeof window !== 'undefined') {
      window.location.href = path;
    }

    const redirect = (await import('next/navigation')).redirect
    redirect(path)

    return
  }
  export {}

