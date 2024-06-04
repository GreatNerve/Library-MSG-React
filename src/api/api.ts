import axios from "axios";


export const getBooks = async ({
  query,
  page = 1,
  limit = 10,
  signal,
}: {
  query: string;
  page?: number;
  limit?: number;
  signal?: AbortSignal;
}) => {
  try {
    const response = await axios.get(`https://openlibrary.org/search.json?q=${query}&page=${page}&limit=${limit}`, {
      signal,
    });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      throw new Error("Request cancelled");
    }
  }
};
