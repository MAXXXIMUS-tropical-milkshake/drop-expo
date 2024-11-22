export type Result<T> =
  | { success: true; data: T }
  | { success: false; data: ErrorResponse };

export type ErrorResponse = {
  status: number;
  message: string;
  details: any;
};
