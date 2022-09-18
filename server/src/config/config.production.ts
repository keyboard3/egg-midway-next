import { MidwayConfig, MidwayAppInfo } from '@midwayjs/core';
import { User } from 'src/entity/user';

export default (appInfo: MidwayAppInfo) => {
  return {
    // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + '_1662652344192_2119',
    egg: {
      port: 3000,
    },
    // security: {
    //   csrf: false,
    // },
    mongoose: {
      dataSource: {
        default: {
          uri: 'mongodb://test:test1234@mongodb.default.svc.cluster.local:27017/db_test',
          // 关联实体
          entities: [ User ]
        }
      }
    }
  } as MidwayConfig;
};
