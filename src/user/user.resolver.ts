import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserType, LoginOutput, LoginInput } from './dto/user.dto';
import {UseGuards} from '@nestjs/common'
import {AuthGuard} from './auth.guard'

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserType])
  @UseGuards(new AuthGuard())
  async users() {
    return this.userService.findAll();
  }

  @Mutation(() => UserType)
  async createUser(@Args('input') input: UserType) {
    return this.userService.create(input);
  }

  @Mutation(() => UserType)
  async updateUser(@Args('id') id: string, @Args('input') input: UserType) {
    return this.userService.update(id, input);
  }

  @Mutation(() => UserType)
  async deleteCat(@Args('id') id: string) {
    return this.userService.delete(id);
  }

  @Mutation(() => LoginOutput)
  async login(@Args('input') input: LoginInput) {
    const user = await this.userService.getUserByUserName(input.user_name);
    return { token: this.userService.createToken(user) };
  }

  @Query(() => UserType)
  @UseGuards(new AuthGuard())
  me(@Context('user') user: LoginInput) {
    return user;
  }
}
