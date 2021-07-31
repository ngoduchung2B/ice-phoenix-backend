import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserType } from './dto/user.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserType])
  @UseGuards(GqlAuthGuard)
  async users() {
    return this.userService.findAll();
  }

  @Mutation(() => UserType)
  async createUser(@Args('input') input: UserType) {
    return this.userService.create(input);
  }

  @Mutation(() => UserType)
  @UseGuards(GqlAuthGuard)
  async updateUser(@Args('id') id: string, @Args('input') input: UserType) {
    return this.userService.update(id, input);
  }

  @Mutation(() => UserType)
  @UseGuards(GqlAuthGuard)
  async deleteUser(@Args('id') id: string) {
    return this.userService.delete(id);
  }
}
