interface EnvironmentVariables {
  SECURE_LS: string;
  API_URL: string;
  BASE_URL: string;
  GOOGLE_MAP_API_KEY: string;
}

export const ENV: EnvironmentVariables = {
  SECURE_LS: import.meta.env.VITE_SECURE_LS,
  API_URL: import.meta.env.VITE_API_URL,
  GOOGLE_MAP_API_KEY: import.meta.env.VITE_GOOGLE_API_KEY,
  BASE_URL: 'https://nakanaki.vercel.app',
};
