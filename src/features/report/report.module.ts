import { Module } from '@nestjs/common';
import { BoxesModule } from '../boxes/boxes.module';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';

@Module({
  imports: [BoxesModule],
  providers: [ReportService],
  controllers: [ReportController],
})
export class ReportModule {}
