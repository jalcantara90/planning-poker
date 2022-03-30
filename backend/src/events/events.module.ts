import { Module, Logger } from '@nestjs/common';
import { EventsGateway } from './events.gateway';

@Module({
  providers: [
    EventsGateway,
    Logger
  ],
})
export class EventsModule {}
