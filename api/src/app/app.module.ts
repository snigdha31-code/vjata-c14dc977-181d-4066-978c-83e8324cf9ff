import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ProtectedController } from './protected.controller';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/task.entity';
import { User } from './auth/user.entity';
//import { AuditLogModule } from './audit-log/audit-log.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Task, User],
      synchronize: true,
    }),
    AuthModule,
    TasksModule,
    //AuditLogModule,
  ],
  controllers: [ProtectedController],
})
export class AppModule {}
