import { UNSPLASH } from "../config";

export interface Photo {
  id: string;
  width: number;
  height: number;
  urls: {
    full: string;
    thumb: string;
  };
}

export interface SearchResult<Result> {
  total: number;
  total_pages: number;
  results: Result[];
}

export async function search(query: string): Promise<SearchResult<Photo>> {
  const url =
    UNSPLASH.BASE_URL + "search/photos?query=" + encodeURIComponent(query);

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Accept-Version": "v1",
      Authorization: "Client-ID " + UNSPLASH.ACCESS_KEY
    }
  });

  return response.json();
}

export default {
  search
};
