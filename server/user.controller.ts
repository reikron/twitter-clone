import { Bind, Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './models/entities/user.entity';
import * as crypto from "crypto";

@Controller("users")
export class UserController {

  @Post()
  @Bind(Body())
  async create(body): Promise<User> {
    console.log("Body ", body);
    let user = new User();
    user.fullname = body.fullname;
    user.email = body.email;
    user.passwordHash = crypto.createHash("md5").update("test").digest("hex");
    user.timestamp = Date.now();
    await user.save();
    console.log("User ", user);
    return user;
  }
}
