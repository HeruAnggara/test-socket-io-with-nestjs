import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: any, ...args: any[]) {
    client.handshake.headers.origin = '*';
    console.log('Client connected');

    const sendRandomMessage = () => {
      const randomMessage = Math.random().toString(36).substring(7);
      this.server.emit('chat message', randomMessage);
      this.server.emit('kode message', 'Hello');
      console.log(randomMessage);
    };

    const intervalId = setInterval(sendRandomMessage, 3000);

    client.on('stop messages', () => {
      clearInterval(intervalId);
    });

    client.on('disconnect', () => {
      console.log('Client disconnected');
    });
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected');
  }
}

// export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
//   @WebSocketServer() server: Server;

//   afterInit(server: Server) {
//     console.log('WebSocket Server initialized');
//   }

//   handleDisconnect(client: any) {
//     console.log('Client disconnected');
//   }

//   @SubscribeMessage('stop messages')
//   handleStopMessages(client: any) {
//     clearInterval(client.intervalId);
//   }

//   @SubscribeMessage('connection')
//   handleConnection(client: any, payload: any) {
//     console.log('Client connected');

//     const sendRandomMessage = () => {
//       const randomMessage = Math.random().toString(36).substring(7);
//       this.server.emit('chat message', randomMessage);
//     };

//     client.intervalId = setInterval(sendRandomMessage.bind(this), 5000);
//   }
// }