/**
 * The base URL for the API.
 * If the environment variable BASE_URL is set, it will be used as the base URL.
 * Otherwise, it will default to an empty string.
 */
const apiBaseUrl: string = process.env.BASE_URL || "http://localhost:3300";

/**
 * The complete API URL.
 */
const apiUrl: string = apiBaseUrl + "/api";

/**
 * Fetches data from the API with an interceptor. Added for further enhancements.
 * @param url The URL to fetch data from.
 * @param options The options for the fetch request.
 * @returns A Promise that resolves to the fetch response.
 * @throws An error if the fetch request fails.
 */
const fetchWithInterceptor = async (
  url: string,
  options: RequestInit = {},
  token: string | undefined = ""
): Promise<Response> => {
  // Request Interceptor: Modify request before it goes out
  options.headers = { ...options.headers, Authorization: `Bearer ${token}` };

  try {
    const response = await fetch(url, options);

    // Response Interceptor: Handle the response
    if (response.status === 401) {
      // Refresh token logic or redirect to login
      console.error("Unauthorized! Redirecting to login.");
    }

    return response;
  } catch (error) {
    // Error handling logic (similar to Axios interceptors)
    console.error("Fetch error:", error);
    throw error;
  }
};

export default apiUrl;
export { fetchWithInterceptor };
