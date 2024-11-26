import { AuthRepository } from "./AuthRepository";
import { Result } from "./Response";

export type WithRefreshTokenRequest = {
  refreshToken: string;
  accessToken: string;
  refresh: (accessToken: string | null, refreshToken: string | null) => void;
};

export class Middleware {
  static async withRefreshToken<Request>(
    refreshToken: WithRefreshTokenRequest,
    request: (accessToken: string) => Promise<Result<Request>>,
  ): Promise<Result<Request>> {
    const response = await request(refreshToken.accessToken);

    if (response.success) {
      return response;
    }

    if (response.data.status === 401) {
      const response = await AuthRepository.refreshToken({
        refreshToken: refreshToken.refreshToken,
      });

      if (response.success) {
        refreshToken.refresh(response.data.accessToken, response.data.refreshToken);
        return request(response.data.accessToken);
      }

      refreshToken.refresh(null, null);
      return response;
    }

    return response;
  }
}
