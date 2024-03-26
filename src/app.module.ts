import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { PrismaService } from './database/prisma.service';
import { RolesController } from './controllers/roles.controller';


@Module({
  imports: [],
  controllers: [AppController, RolesController],
  providers: [PrismaService],
})
export class AppModule {}
