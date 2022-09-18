import { Inject, Controller, Get, Post, Body } from '@midwayjs/decorator';
import { Context } from 'egg';
import { User } from 'src/entity/user';
import { IGetUsersResponse, ICreateUserResponse } from '../interface';
import { UserService } from '../service/user';

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