import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { UserType } from './dto/user.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async create(createUserDto: UserType): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async update(id: string, updateUserDto: UserType): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  async delete(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }

  async getUserByUserName(user_name: string): Promise<User | undefined> {
    return this.userModel.findOne({ user_name: user_name });
  }

  createToken({ user_name, password }: UserType) {
    return jwt.sign({ user_name, password }, 'secret');
  }
}
