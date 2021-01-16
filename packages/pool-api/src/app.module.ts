import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { SnakeNamingStrategy } from 'lib/typeorm/snake_naming';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from './modules/config/config.module';
import { ConfigService } from './modules/config/config.service';
import { UserModule } from './modules/user/user.module';
import { PollModule } from './modules/poll/poll.module';
import { MailerModule } from 'src/modules/mailer/mailer.module';
import { FileModule } from 'src/modules/file/file.module';
import { MewtwoModule } from 'src/modules/mewtwo/mewtwo.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres' as any,
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/**/**.entity{.ts,.js}'],
        synchronize: false,
        ssl: true,
        namingStrategy: new SnakeNamingStrategy(),

        // https://github.com/nestjs/typeorm/issues/61
        keepConnectionAlive: true,
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      autoSchemaFile: 'schema.gql',
      introspection: true,
      uploads: {
        maxFileSize: 20000000, // 20mb
        maxFiles: 5,
      },
    }),
    AuthModule,
    UserModule,
    PollModule,
    MailerModule,
    FileModule,
    MewtwoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
