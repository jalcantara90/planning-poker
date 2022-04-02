import { LeftUserGameCommand } from './commands/LeftUserGame/LeftUSerGameCommand';
import { ResetGameCommand } from './commands/ResetGame/ResetGameCommand';
import { PickUserCardCommand } from './commands/PickUserCard/PickUserCardCommand';
import { AddUserToGameRoomCommand } from './commands/AddUserToGameRoom/AddUserToGameRoomCommand';
import { CommandBus } from '@nestjs/cqrs';
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
export class GameRoomGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private logger: Logger,
    private commandBus: CommandBus  
  ) {}

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
  async joinGame(@ConnectedSocket() client: Socket, @MessageBody() {user, gameId}: { user: any, gameId: string }) {
    client.join(gameId);
    const { userList } = await this.commandBus.execute(new AddUserToGameRoomCommand(gameId, user));
    this.server.emit('REFRESH_USERLIST', { userList, gameId });
  }

  @SubscribeMessage('LEFT_GAME')
  async removeClient(@MessageBody() { gameId, user }: { user: any, gameId: string }) {
    const { userList } = await this.commandBus.execute(
      new LeftUserGameCommand(gameId, user)
    );

    this.server.emit('REFRESH_USERLIST', { userList, gameId });
  }
  
  @SubscribeMessage('PICK_CARD')
  async pickCard(@MessageBody() {gameId, user, selectedValue}: { user: any, gameId: string, selectedValue: string }) {
    const { userList } = await this.commandBus.execute(new PickUserCardCommand(gameId, user, selectedValue));
    this.server.emit('REFRESH_USERLIST', { userList, gameId });
    return { userList, gameId };
  }

  @SubscribeMessage('RESET_GAME')
  async resetGame(@MessageBody() {gameId}: { gameId: string }) {
    const { userList } = await this.commandBus.execute(new ResetGameCommand(gameId));
    this.server.emit('RESET_CARDS', { userList, gameId });
  }
  
  @SubscribeMessage('INIT_REVEAL_CARDS')
  async initShowCards(@MessageBody() {gameId}: { gameId: string }) {
    this.server.emit('INIT_SHOW_CARDS', { gameId });
  }
  
  @SubscribeMessage('SHOW_CARDS')
  async showCards(@MessageBody() {gameId}: { gameId: string }) {
    this.server.emit('REVEAL_CARDS', { gameId });
  }
}
