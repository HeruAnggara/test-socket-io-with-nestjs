import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat/chat.gateway';
import { MessagesModule } from './messages/messages.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [MessagesModule],
})
export class AppModule {}
