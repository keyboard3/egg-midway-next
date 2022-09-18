/**
 * @description User-Service parameters
 */

import { User } from "./entity/user";

export interface ICreateUserResponse {
  success: boolean;
  message: string;
  data: typeof User;
}
export interface IGetUsersResponse {
  success: boolean;
  message: string;
  data: (typeof User)[];
}
