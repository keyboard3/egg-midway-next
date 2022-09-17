import compose from "koa-compose";
import http from "http";
const mockRequest = {
  headers: {
    'x-forwarded-for': '127.0.0.1',
    host: '127.0.0.1',
    hostname: '127.0.0.1',
    'Content-Type': '',
    'Content-Length': 0
  },
  method: 'GET',
  url: '/',
  socket: {
    remoteAddress: '127.0.0.1',
    remotePort: 3000
  }
};
function mockHttp(req: Object = {}) {
  const request = { ...JSON.parse(JSON.stringify(mockRequest)), ...req };
  const response = new http.ServerResponse(request);
  return {
    request,
    response
  };
}
function mockContext(appServer: any, req?: {}) {
  const { request, response } = mockHttp(req);
  // 使用 koa 的 createContext 方法创建一个 ctx
  const ctx = appServer.createContext(request, response);
  return ctx;
}
export async function getApi(url: string, query?: any) {
  const appServer = (global as any).koaApp;
  const mockCtx = mockContext(appServer, {
    url: `/api/${url}`,
    path: `/api/${url}`,
    method: 'GET',
  })
  const koa = appServer;
  return new Promise((resolve, reject) => {
    const fn = compose([async (ctx: typeof mockCtx, next: () => Promise<any>) => {
      try {
        await next();
        const body: any = ctx.response.body;
        resolve(body?.data);
      } catch (err) {
        reject(err);
      }
    }, ...koa.middleware]);
    (appServer as any).handleRequest(mockCtx, fn);
  });
}
