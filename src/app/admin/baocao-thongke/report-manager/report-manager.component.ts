import {Component, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import {ApiService} from '../../../shared/service/api.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-report-manager',
  templateUrl: './report-manager.component.html',
  styleUrls: ['./report-manager.component.css']
})
export class ReportManagerComponent implements OnInit {
  hsActive = 0;

  allHS = 0;

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Học sinh Hoạt động', 'Tổng số học sinh'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [{data: [0, 0], label: 'Học sinh'}];

  constructor(
    private api: ApiService,
    private title: Title
  ) {

  }

  ngOnInit(): void {
    this.title.setTitle('Báo cáo thống kê!');
    this.countActive();
    this.countAll();
  }

  countActive() {
    this.api.get('/api/hoc-sinh/count-hs-active').subscribe(res => {
      this.hsActive = res;
      this.barChartData.splice(0, res);
    });
  }

  countAll() {
    this.api.get('/api/hoc-sinh/count-all-hs').subscribe(res => {
      this.allHS = res;
      this.barChartData.splice(1, res);
    });
  }
}
