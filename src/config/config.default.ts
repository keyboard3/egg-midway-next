import { MidwayConfig, MidwayAppInfo } from '@midwayjs/core';

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
  } as MidwayConfig;
};
