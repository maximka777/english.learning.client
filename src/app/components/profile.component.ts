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
        this.drawChart();
      });
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

      const margin = {top: 40, right: 20, bottom: 30, left: 130},
        width = 600 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

      const x = d3.scaleTime().range([0, width]);
      const y = d3.scaleQuantile().range([height, 0]);

      const valueline = d3.line()
        .x(function(d: any) { return x( +d.passDate ); })
        .y(function(d: any) { return y( d.correctCount); });

      const svg = d3ParentElement.append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform',
          'translate(' + margin.left + ',' + margin.top + ')');

      const minDataNumber = d3.min(this.results, (c: any)  => +c.passDate);
      const maxDataNumber = d3.max(this.results, (c: any) => +c.passDate);
      const minData = new Date(new Date(0).setSeconds(minDataNumber));
      const maxData = new Date(new Date(0).setSeconds(maxDataNumber));
      x.domain([minData, maxData]);

      const minCorrect = d3.min(this.results, (c: any) => +c.correctCount);
      const maxCorrect = d3.max(this.results, (c: any) => +c.totalCount);
      y.domain([minCorrect, maxCorrect]);

      svg.append('path')
        .data([this.results])
        .attr('class', 'line')
        .attr('d', valueline);

      svg.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x));

      svg.append('g')
        .call(d3.axisLeft(y));

      const infoSvg = d3ParentElement.append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform',
          'translate(' + margin.left + ',' + margin.top + ')');

      infoSvg.append("text")
        .attr("x", 0)
        .attr("y", 0)
        .attr("dy", ".35em")
        .style('fill', 'darkBlue')
        .text('Количество правильных ответов: ');

      infoSvg.append("line")
        .attr("x1", margin.left * 2 + 10)
        .attr("y1", 0)
        .attr("x2", margin.left * 2 + 40)
        .attr("y2", 0)
        .style("stroke", "green")
        .style("stroke-width", 3);

      infoSvg.append("text")
        .attr("x", 0)
        .attr("y", 30)
        .attr("dy", ".35em")
        .style('fill', 'darkBlue')
        .text('Количество неправильных ответов: ');

      infoSvg.append("line")
        .attr("x1", margin.left * 2 + 10)
        .attr("y1", 30)
        .attr("x2", margin.left * 2 + 40)
        .attr("y2", 30)
        .style("stroke", "red")
        .style("stroke-width", 3);

      this.results.forEach( (d, i, arr) => {
        if(i === 0) {
          svg.append("circle")
            .attr("cx", (+d.passDate - minDataNumber) * ( width / (maxDataNumber - minDataNumber)))
            .attr("cy", height - d.correctCount * (height / maxCorrect))
            .attr("r", 5)
            .style("fill", "green");
          svg.append("text")
            .attr("x", (+d.passDate - minDataNumber) * ( width / (maxDataNumber - minDataNumber)))
            .attr("y", height - d.correctCount * (height / maxCorrect) - 10)
            .attr("dy", ".35em")
            .style('fill', 'darkBlue')
            .text(d.correctCount.toString());
          svg.append("circle")
            .attr("cx", (+d.passDate - minDataNumber) * ( width / (maxDataNumber - minDataNumber)))
            .attr("cy", height - (d.totalCount - d.correctCount) * (height / maxCorrect))
            .attr("r", 5)
            .style("fill", "red");
          svg.append("text")
            .attr("x", (+d.passDate - minDataNumber) * ( width / (maxDataNumber - minDataNumber)))
            .attr("y", height - (d.totalCount - d.correctCount) * (height / maxCorrect) - 10)
            .attr("dy", ".35em")
            .style('fill', 'darkBlue')
            .text((d.totalCount - d.correctCount).toString());
        } else {
          svg.append("line")
            .attr("x1", (+(arr[i - 1].passDate) - minDataNumber) * ( width / (maxDataNumber - minDataNumber)))
            .attr("y1", height - arr[i - 1].correctCount * (height / maxCorrect))
            .attr("x2", (+d.passDate - minDataNumber) * ( width / (maxDataNumber - minDataNumber)))
            .attr("y2", height - d.correctCount * (height / maxCorrect))
            .style("stroke", "green")
            .style("stroke-width", 3);
          svg.append("circle")
            .attr("cx", (+d.passDate - minDataNumber) * ( width / (maxDataNumber - minDataNumber)))
            .attr("cy", height - d.correctCount * (height / maxCorrect))
            .attr("r", 5)
            .style("fill", "green");
          svg.append("text")
            .attr("x", (+d.passDate - minDataNumber) * ( width / (maxDataNumber - minDataNumber)))
            .attr("y", height - d.correctCount * (height / maxCorrect) - 10)
            .attr("dy", ".35em")
            .style('fill', 'darkBlue')
            .text(d.correctCount.toString());
          svg.append("line")
            .attr("x1", (+(arr[i - 1].passDate) - minDataNumber) * ( width / (maxDataNumber - minDataNumber)))
            .attr("y1", height - (arr[i - 1].totalCount - arr[i - 1].correctCount) * (height / maxCorrect))
            .attr("x2", (+d.passDate - minDataNumber) * ( width / (maxDataNumber - minDataNumber)))
            .attr("y2", height - (d.totalCount - d.correctCount) * (height / maxCorrect))
            .style("stroke", "red")
            .style("stroke-width", 3);
          svg.append("circle")
            .attr("cx", (+d.passDate - minDataNumber) * ( width / (maxDataNumber - minDataNumber)))
            .attr("cy", height - (d.totalCount - d.correctCount) * (height / maxCorrect))
            .attr("r", 5)
            .style("fill", "red");
          svg.append("text")
            .attr("x", (+d.passDate - minDataNumber) * ( width / (maxDataNumber - minDataNumber)))
            .attr("y", height - (d.totalCount - d.correctCount) * (height / maxCorrect) - 10)
            .attr("dy", ".35em")
            .style('fill', 'darkBlue')
            .text((d.totalCount - d.correctCount).toString());
        }
      });
    }
  }
}
