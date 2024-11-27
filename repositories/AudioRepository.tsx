import { Result } from "./Response";

const baseURL = "http://192.168.212.26:8083"

export type FeedResponse = {
  id: string;
  beatmaker: {
    id: string;
    username: string;
    pseudonym: string;
  };
  image: string;
  name: string;
  description: string;
  genre: string;
  created_at: string;
};

export class AudioRepository {
  static async feed(token: string): Promise<Result<FeedResponse>> {
    const response = await fetch(`${baseURL}/v1/feed/audio`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const payload = await response.json();
    if (response.ok) {
      return {
        success: true,
        data: payload,
      };
    }

    return {
      success: false,
      data: {
        ...payload,
        status: response.status,
      },
    };
  }
}
