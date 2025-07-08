// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withErrorHandler<Args extends any[], Return>(
  fn: (...args: Args) => Promise<Return>
): (...args: Args) => Promise<Return> {
  return async (...args: Args) => {
    try {
      return await fn(...args);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  };
}
