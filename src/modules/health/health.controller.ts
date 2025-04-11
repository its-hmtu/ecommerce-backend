import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  getHealth(): string {
    return 'App is running, but DB might not be connected';
  }

  @Get('timeout-test')
  async timeoutTest(): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('This is a timeout test');
      }, 15000); // Adjust the timeout duration as needed
    });
  }
}
