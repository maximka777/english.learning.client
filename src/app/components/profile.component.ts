import {Component, OnInit, ElementRef } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { D3Service, D3, Selection } from 'd3-ng2-service';
import {TestResultsService} from "../services/test-results.service";
import * as _ from 'lodash';

const moment = require('moment');

@Component({
  moduleId: module.id,
  selector: 'profile',
  templateUrl: './templates/profile.component.html',
  styleUrls: ['./styles/profile.component.css']
})
export class ProfileComponent implements OnInit {
  private results = [];
  private d3: D3;
  private parentNativeElement: any;
  private data: any;

  constructor(private authService: AuthService,
              private testResultsService: TestResultsService,
              private element: ElementRef,
              private d3Service: D3Service
  ) {
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {
    if (!this.authService.isLogged()) {
      return this.authService.navigateToLogin();
    }
    if (this.authService.isAdmin()) {
      return this.authService.navigateToAdminRoot();
    }
    this.testResultsService.getAll(this.authService.user.id)
      .then((res: any) => {
        this.results = _.sortBy(res, r => -r.passDate);
      });
    this.drawChart();
  }

  isGoodResult(result) {
    return result.correctCount / result.totalCount > 0.5;
  }

  formatPassDate(result) {
    return moment.unix(result.passDate).format('YYYY-DD-MM HH:mm');
  }

  drawChart() {
    const d3 = this.d3;
    let d3ParentElement: Selection<any, any, any, any>;
    if (this.parentNativeElement !== null) {

      d3ParentElement = d3.select(this.parentNativeElement);

      this.data = [
        {date: '1-May-12', close: '58.13'},
        {date: '30-Apr-12', close: '53.98'},
        {date: '27-Apr-12', close: '67.00'},
        {date: '26-Apr-12', close: '89.70'},
        {date: '25-Apr-12', close: '99.00'}
      ];

      const margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

      const parseTime = d3.timeParse('%d-%b-%y');

      const x = d3.scaleTime().range([0, width]);
      const y = d3.scaleLinear().range([height, 0]);

      const valueline = d3.line()
        .x(function(d: any) { return x(d.date); })
        .y(function(d: any) { return y(d.close); });

      const svg = d3ParentElement.append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform',
          'translate(' + margin.left + ',' + margin.top + ')');

      this.data.forEach(function(d) {
        d.date = parseTime(d.date);
        d.close = +d.close;
      });

      // x.domain(d3.extent(data, function(d: any) { return d.date; }));
      // y.domain([0, d3.max(data, function(d: any) { return d.close; })]);

      svg.append('path')
        .data([this.data])
        .attr('class', 'line')
        .attr('d', valueline);

      svg.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x));

      svg.append('g')
        .call(d3.axisLeft(y));
    }
  }
}
