import { Result, ErrorResponse } from './Response'

const baseURL = 'http://localhost:8080'

interface LoginRequest {
    email: string
    password: string
};

interface LoginResponse {
    refreshToken: string,
    accessToken: string
};

interface SignupRequest {
    username: string
    email: string
    password: string
    first_name: string
    last_name: string
    nickname: string
};

interface SignupResponse {
    id: number
    username: string
    email: string
    password: string
    first_name: string
    last_name: string
    nickname: string
};

interface VerifyRequest {
    code: string
};

interface RefreshTokenRequest {
    refreshToken: string
};

interface RefreshTokenResponse {
    refreshToken: string,
    accessToken: string
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
        })

        const payload = await response.json();
        if (response.ok) {
            return {
                success: true,
                data: payload
            };
        }

        return {
            success: false,
            data: {
                ...payload,
                status: response.status
            }
        };
    };

    static async signup(data: SignupRequest): Promise<Result<SignupResponse>> {
        const response = await fetch(`${baseURL}/v1/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: data.username,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                password: data.password,
                pseudonym: data.nickname,
            }),
        });

        const payload = await response.json();
        if (response.ok) {
            return {
                success: true,
                data: payload
            };
        }

        return {
            success: false,
            data: {
                ...payload,
                status: response.status
            }
        };
    };

    static async verify(data: VerifyRequest): Promise<Result<void>> {
        const response = await fetch(`${baseURL}/v1/auth/verify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                code: data.code,
            }),
        })

        if (response.ok) {
            return {
                success: true,
                data: undefined
            };
        }

        const payload = await response.json();
        return {
            success: false,
            data: {
                ...payload,
                status: response.status
            }
        };
    };

    static async refreshToken(data: RefreshTokenRequest): Promise<Result<RefreshTokenResponse>> {
        const response = await fetch(`${baseURL}/v1/auth/token/refresh`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                refreshToken: data.refreshToken
            })
        });

        const payload = await response.json()
        if (response.ok) {
            return {
                success: true,
                data: payload
            };
        }

        return {
            success: false,
            data: {
                ...payload,
                status: response.status
            }
        };
    };

};