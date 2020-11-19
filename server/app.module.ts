import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { AppService } from './app.service';
import { User } from './models/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: __dirname + "/../data/db/development.sqlite3",
      entities: [User],
      synchronize: true
    })
  ],
  controllers: [UserController],
  providers: [AppService],
})
export class AppModule {}
