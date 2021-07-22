import { ObjectType, Field, InputType } from '@nestjs/graphql';

@ObjectType('User')
@InputType('UserInput')
export class User {
  @Field()
  name: string;

  @Field()
  user_name: string;

  @Field()
  password: string;

  @Field()
  email: string;
}
