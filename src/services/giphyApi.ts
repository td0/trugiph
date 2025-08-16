import { env } from "@/config/env";
import type {
  GiphyResponse,
  GiphySearchParams,
  GiphyTrendingParams,
} from "@/types/giphy";

class GiphyApiService {
  private baseUrl = env.giphy.baseUrl;
  private apiKey = env.giphy.apiKey;

  private async fetchGiphy<T>(
    endpoint: string,
    params: GiphySearchParams | GiphyTrendingParams = {}
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);

    // Add API key and other params
    url.searchParams.append("api_key", this.apiKey);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(
        `Giphy API error: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  }

  /**
   * Get trending GIFs
   */
  async getTrending(params: GiphyTrendingParams = {}): Promise<GiphyResponse> {
    const defaultParams = {
      limit: 25,
      offset: 0,
      rating: "g" as const, // SAFE FOR WORK
      ...params,
    };

    return this.fetchGiphy<GiphyResponse>("/gifs/trending", defaultParams);
  }

  /**
   * Search GIFs
   */
  async searchGifs(params: GiphySearchParams): Promise<GiphyResponse> {
    const defaultParams = {
      limit: 25,
      offset: 0,
      rating: "g" as const, // SAFE FOR WORK
      lang: "en",
      ...params,
    };

    return this.fetchGiphy<GiphyResponse>("/gifs/search", defaultParams);
  }
}

export const giphyApi = new GiphyApiService();
