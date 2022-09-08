# egg-midway-next
同胞兄弟 [next-daruk](https://github.com/keyboard3/next-daruk) daruk 轻量级的 web 框架

分身 [koa-midway-next](https://github.com/keyboard3/koa-midway-next)

阿里的 [midway](https://www.midwayjs.org/docs/intro) 重量级的 web 框架，生态完备。[Next.js](https://nextjs.org/docs)强大的 ssr 前端框架。强强联合

[midway](https://www.midwayjs.org/docs/intro) 的写法, 给个 controller 的例子
/src/controller
```typescript
import { Inject, Controller, Query, Get } from '@midwayjs/decorator';
import { Context } from 'egg';
import { IGetUserResponse } from '../interface';
import { UserService } from '../service/user';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/get_user')
  async getUser(@Query('uid') uid: string): Promise<IGetUserResponse> {
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: user };
  }
}
```

/pages/index.tsx
```typescript
export async function getServerSideProps(context: NextPageContext) {
  const user: any = await getApi('get_user?uid=111');
  return {
    props: { name: user.username }, // will be passed to the page component as props
  }
}
```
