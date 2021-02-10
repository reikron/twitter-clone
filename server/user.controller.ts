import { Bind, Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { User } from './models/entities/user.entity';
import * as crypto from "crypto";
import { CreateUserCommand } from './models/commands/create-user.command';

@Controller("users")
export class UserController {

  @Post()
  @Bind(Body())
  async create(command: CreateUserCommand): Promise<User> {
    return command.isValid()
      .then(async () => {
        let user = new User();
        user.fullname = command.fullname;
        user.email = command.email;
        user.passwordHash = crypto.createHash("md5").update("test").digest("hex");
        user.timestamp = Date.now();
        await user.save();
        return user;
      });
  }
}
