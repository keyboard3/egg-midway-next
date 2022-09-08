import { IMiddleware, NextFunction } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { parse } from "url";
import next from "next";
import { Context } from 'egg';

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000

const app = next({ dev, hostname, port })
app.prepare();
const nextRequestHandler = app.getRequestHandler();

@Middleware()
export class NextMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      let result;
      const parsedUrl = parse(ctx.url, true)
      const { pathname } = parsedUrl
      if (pathname?.startsWith('/api')) {
        result = await next();
      } else {
        ctx.logger.info(`page ${ctx.url} access`);
        result = await nextRequestHandler(ctx.req, ctx.res, parsedUrl);
      }
      return result;
    };
  }

  static getName(): string {
    return 'next';
  }
}
