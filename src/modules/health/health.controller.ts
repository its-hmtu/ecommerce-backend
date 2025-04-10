import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  getHealth(): string {
    return 'App is running, but DB might not be connected';
  }
}
