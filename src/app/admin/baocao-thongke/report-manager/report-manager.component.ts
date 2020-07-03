import {Component, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import {ApiService} from '../../../shared/service/api.service';
import {Title} from '@angular/platform-browser';
import {Chart} from 'chart.js';

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
  //Polararea , Doughnut, line
  barChartLabels: Label[] = ['Học sinh Hoạt động', 'Tổng số học sinh'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [{data: [], label: 'Học sinh'}];
  barchart = [];

  points = [];
  data = [6, 6];

  barChar = {
    data: [],
    label: ''
  }
  Linechart: any[] = [];

  constructor(
    private api: ApiService,
    private title: Title
  ) {

  }

  ngOnInit(): void {
    this.title.setTitle('Báo cáo thống kê!');
    this.barChartData.forEach(ite => {
      ite.data = [];
    });
    this.api.get('/api/hoc-sinh/count-hs-active').subscribe(res => {
      this.hsActive = res;
      this.data.push(this.hsActive);
      this.barChartData.forEach(ite => {
        ite.data.push(this.hsActive);
        this.points.push(this.hsActive);
      });
      this.api.get('/api/hoc-sinh/count-all-hs').subscribe(res => {
        this.allHS = res;
        this.data.push(this.allHS);
        this.barChartData.forEach(ite => {
          ite.data.push(this.allHS);
          this.points.push(this.allHS);
        });
      });
    });
  }


  countActive() {
    this.api.get('/api/hoc-sinh/count-hs-active').subscribe(res => {
      this.hsActive = res;
      this.data.push(this.hsActive);
      this.barChartData.forEach(ite => {
        ite.data.push(this.hsActive);
      });
    });
  }

  countAll() {
    this.api.get('/api/hoc-sinh/count-all-hs').subscribe(res => {
      this.allHS = res;
      this.data.push(this.allHS);
      this.barChartData.forEach(ite => {
        ite.data.push(this.allHS);
      });
    });
  }
}
