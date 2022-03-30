import { Logger } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayInit,
  OnGatewayDisconnect,
  ConnectedSocket
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  transport: ['websocket']
})
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private logger: Logger) {}

  handleConnection(client: any) {
    this.logger.log(`Client connected: ${client.id}`, 'CONNECTION');
  }

  afterInit(server: any) {
    this.logger.log(server, 'INIT');
  }
  
  handleDisconnect(client: any) {
    this.logger.log(`Client disconnected: ${client.id}`, 'DISCONNECTION');
  }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('JOIN_GAME')
  joinGame(@ConnectedSocket() client: Socket, @MessageBody() data: { user: any, gameId: string }) {
    client.join(data.gameId);
    return client.to(data.gameId).emit('USER_JOINED', { user: data.user });
  }

  @SubscribeMessage('CONNECT_GAME')
  connectGame(@ConnectedSocket() client: Socket, @MessageBody() data: { gameId: string }) {
    this.logger.log(data, 'CONNECT_GAME');
    client.join(data.gameId);
    return client.to(data.gameId).emit('TEST', { data });
  }

  @SubscribeMessage('REMOVE_CLIENT')
  removeClient(client: Socket, data: { user: any, gameId: string }) {
    this.logger.log(data, 'REMOVE_CLIENT');
    client.leave(data.gameId);
  }
}
