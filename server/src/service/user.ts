import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '../entity/user';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userModel: ReturnModelType<typeof User>;

  async createUser(createUserDto: typeof User) {
    // create data
    const { _id: id } = await this.userModel.create(createUserDto); // an "as" assertion, to have types for all properties
    // find data
    const user = await this.userModel.findById(id).exec();
    return user;
  }

  async getAll() {
    const users = await this.userModel.find().exec();
    return users.map(item => ({ name: item.name, jobs: item.jobs, id: item.id?.toString() }));
  }
}