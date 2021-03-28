import { SocketGateway } from './socket.gateway';
import { HttpModule, Module } from '@nestjs/common';

@Module({
  imports: [HttpModule],
  providers: [SocketGateway],
})
export class SocketsModule {}
