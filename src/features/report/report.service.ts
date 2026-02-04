import { Injectable } from '@nestjs/common';
import { BoxesService } from '../boxes/boxes.service';
import { SYSTEM_START_DATE } from '../system_start';
import { ResponseReport } from '../../types/report';

@Injectable()
export class ReportService {
  constructor(private readonly boxesService: BoxesService) {}

  async getReport(): Promise<ResponseReport> {
    const boxes = await this.boxesService.getBoxesWithProducts();

    if (!boxes) {
      return {
        StartDate: SYSTEM_START_DATE.toLocaleString(),
        EndDate: new Date().toLocaleString(),
        boxes: [],
      };
    }

    const resBoxes = boxes.map((box) => {
      return {
        name: box.name,
        products: box.products.map((p) => p.name),
      };
    });
    return {
      StartDate: SYSTEM_START_DATE.toLocaleString(),
      EndDate: new Date().toLocaleString(),
      boxes: resBoxes,
    };
  }
}
