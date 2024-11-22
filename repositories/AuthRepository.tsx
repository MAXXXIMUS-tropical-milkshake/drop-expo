import { Result } from "./Response";

const baseURL = "http://localhost:8080";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  refreshToken: string;
  accessToken: string;
};

export type SignupRequest = {
  username: string;
  email: {
    email: string;
    code: string;
  };
  password: string;
  first_name: string;
  last_name: string;
  pseudonym: string;
};

export type SignupResponse = {
  id: number;
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  pseudonym: string;
};

export type VerifyRequest = {
  code: string;
};

export type RefreshTokenRequest = {
  refreshToken: string;
};

export type RefreshTokenResponse = {
  refreshToken: string;
  accessToken: string;
};

export type SendEmailRequest = {
  is_verified: boolean;
  email: string;
};

export class AuthRepository {
  static async login(data: LoginRequest): Promise<Result<LoginResponse>> {
    const response = await fetch(`${baseURL}/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
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

  static async signup(data: SignupRequest): Promise<Result<SignupResponse>> {
    const response = await fetch(`${baseURL}/v1/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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

  static async verify(data: VerifyRequest): Promise<Result<void>> {
    const response = await fetch(`${baseURL}/v1/auth/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: data.code,
      }),
    });

    if (response.ok) {
      return {
        success: true,
        data: undefined,
      };
    }

    const payload = await response.json();
    return {
      success: false,
      data: {
        ...payload,
        status: response.status,
      },
    };
  }

  static async refreshToken(
    data: RefreshTokenRequest,
  ): Promise<Result<RefreshTokenResponse>> {
    const response = await fetch(`${baseURL}/v1/auth/token/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: data.refreshToken,
      }),
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

  static async sendEmail(data: SendEmailRequest): Promise<Result<void>> {
    console.log(data);

    const queryParams = new URLSearchParams(data as any).toString();

    const response = await fetch(
      `${baseURL}/v1/auth/email/send?${queryParams}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (response.ok) {
      return {
        success: true,
        data: undefined,
      };
    }

    const payload = await response.json();
    return {
      success: false,
      data: {
        ...payload,
        status: response.status,
      },
    };
  }
}
