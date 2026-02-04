import { Controller, Get } from '@nestjs/common';
import { ReportService } from './report.service';
import { ResponseReport } from '../../types/report';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  getReport(): Promise<ResponseReport> {
    return this.reportService.getReport();
  }
}
