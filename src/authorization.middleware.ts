import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';

// cái này test thôi chứ đéo có tác dụng
export const loggerMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const value = await next();
  console.log('render', value);
  return value;
};
