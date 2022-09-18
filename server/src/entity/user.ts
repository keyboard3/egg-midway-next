import { prop } from '@typegoose/typegoose';

export class User {
  @prop()
  public name?: string;

  @prop({ type: () => [String] })
  public jobs?: string[];
}