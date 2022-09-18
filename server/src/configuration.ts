import { App, Configuration } from '@midwayjs/decorator';
import { ILifeCycle } from '@midwayjs/core';
import { Application } from 'egg';
import { join } from 'path';
import * as egg from '@midwayjs/web';
import * as typegoose from '@midwayjs/typegoose';
import { NextMiddleware } from './middleware/next-bridge.middleware';

@Configuration({
  imports: [egg, typegoose],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;

  async onReady() {
    this.app.useMiddleware([NextMiddleware]);
    (global as any).koaApp = this.app;
  }
}