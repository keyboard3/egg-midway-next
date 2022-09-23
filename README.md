# egg-midway-next
采用 monorepo 管理 server 的 Midway.js 代码 和 render 的 Next.js 代码。两个仓库代码独立，不耦合。

由 server 的 Midway.js 负责启动，Midway.js 启动时会有根路由中间件分发，Next.js 的聚合接口通过 global.serverFetch 接口访问 Midway.js api

在线预览 https://keyboard3.com/egg-midway-next/

/server/src/controller/api.ts
```typescript
@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Post('/user')
  async createUser(@Body() createUserDTO: typeof User): Promise<ICreateUserResponse> {
    const user = await this.userService.createUser(createUserDTO);
    return { success: true, message: 'OK', data: user as any };
  }

  @Get('/users')
  async getUsers(): Promise<IGetUsersResponse> {
    const users = await this.userService.getAll();
    return { success: true, message: 'OK', data: users as any };
  }
}
```

/render/pages/index.tsx
```typescript
export async function getServerSideProps(context: NextPageContext) {
  const response = await global.serverFetch('http://127.0.0.1/api/users');
  return {
    props: { users: response.json().data }, // will be passed to the page component as props
  }
}
```