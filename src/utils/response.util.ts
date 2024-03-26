// api-response.entity.ts
export class ApiResponse<T> {
  data: T;
  statusCode: number;
  message: any;
  error: any;

  constructor(
    data: T,
    statusCode: number = 200,
    message: any = null,
    error: any = null,
  ) {
    this.data = data;
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
  }

  static async create<T>(
    promise: Promise<T>,
    statusCode: number = 200,
    message: any = null,
    error: any = null,
  ): Promise<ApiResponse<T>> {
    try {
      const data = await promise;
      return new ApiResponse(data, statusCode, message, null);
    } catch (err) {
      statusCode = err.statusCode || 400;
      return new ApiResponse(null, statusCode, null, err.message || error);
    }
  }

  static async paginate<T>(
    data: { list: T[]; count: number },
    statusCode: number = 200,
    message: any = null,
    error: any = null,
  ): Promise<ApiResponse<{ list: T[]; count: number }>> {
    try {
      const result = data.list;
      return new ApiResponse(
        { list: result, count: data.count }, // Wrap result in an array
        statusCode,
        message,
        null,
      );
    } catch (err) {
      statusCode = err.statusCode || 400;
      return new ApiResponse(null, statusCode, null, err.message || error);
    }
  }

  static async success<T>(
    promise: T,
    statusCode: number = 200,
    message: any = null,
    error: any = null,
  ): Promise<ApiResponse<T>> {
    try {
      const data = await promise;
      return new ApiResponse(data, statusCode, message, null);
    } catch (err) {
      statusCode = err.statusCode || 400;
      return new ApiResponse(null, statusCode, null, err.message || error);
    }
  }

  static async successNoData<T>(
    statusCode: number = 200,
    message: any = null,
    error: any = null,
  ): Promise<ApiResponse<T>> {
    try {
      return new ApiResponse(null, statusCode, message, null);
    } catch (err) {
      statusCode = err.statusCode || 400;
      return new ApiResponse(null, statusCode, null, err.message || error);
    }
  }

  static async error(statusCode: number = 200, error: any = null) {
    return new ApiResponse(null, statusCode, null, error);
  }
}
