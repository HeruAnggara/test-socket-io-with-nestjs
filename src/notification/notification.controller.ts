// notification.controller.ts

import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { NotificationService } from './notification.service';

@WebSocketGateway()
export class NotificationController implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly notificationService: NotificationService) {}

  async handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
    // const notifications = await this.notificationService.findAll();
    const notifications = "Test Notifikasi";
    client.emit('notifications', notifications); // Mengirim data notifikasi ke client saat koneksi terhubung
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('getNotifications')
  async getNotifications(@MessageBody() data: any, client: Socket) {
    const notifications = await this.notificationService.findAll();
    client.emit('notifications', notifications);
  }
}
