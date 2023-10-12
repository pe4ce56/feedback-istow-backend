import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModule } from './question/question.module';
import { Question } from './question/entities/question.entity';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import configuration from './config/configuration';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { QuestionerModule } from './questioner/questioner.module';
import { Customers } from './questioner/entities/customer.entity';
import { Questioner } from './questioner/entities/questioner.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      entities: [Question, User, Customers, Questioner],
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    }),

    AuthModule,
    QuestionModule,
    UserModule,
    QuestionerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
