import { ObjectType, Field, InputType } from '@nestjs/graphql';

@ObjectType('UserType')
@InputType('UserInput')
export class UserType {
  @Field()
  name: string;

  @Field()
  user_name: string;

  @Field()
  password: string;

  @Field()
  email: string;
}

@InputType('LoginInput')
export class LoginInput {
  @Field()
  user_name: string;

  @Field()
  password: string;
}
