import {
  Component,
  OnInit,
  Input,
  ElementRef,
  OnChanges,
  SimpleChanges,
  SimpleChange
} from '@angular/core';
import * as d3 from 'd3';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
import * as twix from 'twix';
import { UserService } from '../../services/user.service';

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class AnalyticsComponent implements OnInit {

  firstDate: any = new Date();
  secondDate: any = new Date();
  columnsList = ['test1', 'test2', 'test3', 'test4'];
  data = [
    {
      allotted: 604,
      indzone: 70
    },
    {
      indzone: 706,
      allotted: 952
    },
    {
      indzone: 34,
      allotted: 701
    },
    {
      indzone: 45,
      allotted: 708
    },
    {
      indzone: 50,
      allotted: 608
    },
    {
      indzone: 80,
      allotted: 608
    },
    {
      indzone: 570,
      allotted: 608
    }
  ];

  private w: number = 600;
  private h: number = 500;
  private margin = { top: 10, right: 10, bottom: 20, left: 40 };
  private width = this.w - this.margin.left - this.margin.right;
  private height = this.h - this.margin.top - this.margin.bottom;
  private x0: any;
  private x1: any;
  private y: any;
  private color: any = ['#00D7D2', '#313c53', '#7BD500'];
  private barNames;
  keys;
  private svg: any;
  private chart: any;
  private xAxis: any;
  private yAxis: any;
  private legend: any;
  private tooltip: any;
  private x00: any;
  dataArrray: any = [];
  allProd:any = [];

  constructor(private container: ElementRef, private userService: UserService) { }

  filter() {

    try{
      document.getElementsByClassName('chart-container')[0].innerHTML = "";
    }catch(e){}

    this.firstDate = _moment(this.firstDate).format("YYYY-MM-DD");
    this.secondDate = _moment(this.secondDate).format("YYYY-MM-DD");

    // this.width = document.getElementById("parentDiv").parentNode.parentElement.clientWidth;
    function dateRange(startDate, endDate, steps = 1) {
      const dateArray = [];
      let currentDate = new Date(startDate);

      while (currentDate <= new Date(endDate)) {
        dateArray.push(new Date(currentDate));
        // Use UTC date to prevent problems with time zones and DST
        currentDate.setUTCDate(currentDate.getUTCDate() + steps);
      }

      return dateArray
    }

    const dates = dateRange(this.firstDate, this.secondDate);
    let newArr = dates.map((resp: any) => {
      return _moment(resp).format("YYYY-MM-DD");
    })

    this.columnsList = newArr

    this.userService.analytics(this.firstDate, this.secondDate).subscribe((res: any) => {

      let objKey = Object.keys(res.data);
      let totalProduct = {};
      this.allProd = [];

      for (let i = 0; i < objKey.length; i++) {
        let aa = Object.keys(res.data[objKey[i]])
        for (let j = 0; j < aa.length; j++) {
          if (!totalProduct.hasOwnProperty(aa[j])) {
            totalProduct[aa[j]] = 0
          }
        }
      }

      // console.log(this.allProd,'---',totalProduct)

      for (let k = 0; k < this.columnsList.length; k++) {
        this.allProd.push(totalProduct)
      }

      // console.log("jjjj1111", this.allProd)

      newArr.forEach((response: any, index: number) => {
        objKey.forEach((resp: any, ind: number) => {
          if (new Date(response).setHours(0, 0, 0, 0) == new Date(resp).setHours(0, 0, 0, 0)) {
            this.allProd[index] = res.data[resp]
          }
        })
      })

      // console.log("jjjj", this.allProd)

      this.data = this.allProd;

      this.keys = Object.keys(this.data[0])[0];
      this.color = d3
        .scaleOrdinal()
        .range(['#00D7D2', '#313c53', '#7BD500', '#98abc5', '#8a89a6']);
      this.initScales();
      this.initSvg();
      this.drawChart();
      this.drawAxis();

    })

  }

  ngOnInit() {
    // this.keys = Object.keys(this.data[0])[0];
    // this.color = d3
    //   .scaleOrdinal()
    //   .range(['#00D7D2', '#313c53', '#7BD500', '#98abc5', '#8a89a6']);
    // this.initScales();
    // this.initSvg();
    // this.drawChart();
    // this.drawAxis();
    this.filter();
  }

  //////////////////////////////////////////////////////////////
  chosenYearHandler(normalizedYear: any) {
    // const ctrlValue = this.date.value;
    // ctrlValue.year(normalizedYear.year());
    // this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: any, datepicker: MatDatepicker<any>) {
    // const ctrlValue = this.date.value;
    // ctrlValue.month(normalizedMonth.month());
    // this.date.setValue(ctrlValue);
    datepicker.close();
  }

  //////////////////////////////////////////////////////////////

  private initScales() {
    this.x0 = d3
      .scaleBand()
      .domain(this.data.map(d => d[this.keys]))
      .rangeRound([0, this.width])
      .padding(0.05);

    this.x00 = d3
      .scaleBand()
      .domain(this.columnsList.map(d => d))
      .rangeRound([0, this.width])
      .padding(0.05);

    this.x1 = d3
      .scaleBand()
      .domain(this.keys)
      .rangeRound([0, this.x0.bandwidth()])
      .padding(0.05);
    this.y = d3
      .scaleLinear()
      .range([this.height, 0])
      .domain([0, d3.max(this.data, d => d3.max(this.keys, key => d[key]))])
      .nice();
  }

  private initSvg() {
    this.tooltip = d3
      .select('body')
      .append('div')
      .classed('chart-tooltip', true)
      .style('display', 'none');

    this.svg = d3
      .select(this.container.nativeElement)
      .select('.chart-container')
      .append('svg')
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('class', 'chart')
      .attr('width', this.w)
      .attr('height', this.h)
      .attr('viewBox', '0 0 600 400');

    this.chart = this.svg
      .append('g')
      .classed('chart-contents', true)
      .attr(
        'transform',
        'translate(' + this.margin.left + ',' + this.margin.top + ')'
      );
  }

  private drawAxis() {
    this.xAxis = d3.axisBottom(this.x00).
      ticks(5).
      tickFormat(function (d, i) {
        // return '$' + d;
        if (i % 2 == 0) {
          return d;
        }
      });
    this.yAxis = d3
      .axisLeft(this.y)
      .ticks(7)
      .tickFormat(function (d, i) {
        // return '$' + d;
        return d;
      });
    // this.divTooltip =this.chart.append("div").attr("class", "toolTip");

    this.chart
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(this.xAxis);

    this.chart
      .append('g')
      .attr('class', 'y axis')
      .call(this.yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Population');
    var borderRadiusX = 20;

    var borderRadiusY = 20;
    var state = this.chart
      .selectAll('.state')
      .data(this.data)
      .enter()
      .append('g')
      .attr('class', 'state')
      .attr('transform', d => {
        return 'translate(' + this.x0(d[this.keys]) + ',0)';
      });

    state
      .selectAll('rect')
      .data(d => {
        // debugger;
        return d.element;
      })
      .enter()
      .append('rect')
      .attr('width', this.x1.bandwidth())
      .attr('x', d => {
        return this.x1(d.name);
      })
      .attr('y', d => {
        return this.y(d.value || 0);
      })
      .attr('height', d => {
        // debugger;
        return this.height - this.y(d.value || 0);
      })
      .on('mouseover', () => {
        d3.select('.chart-tooltip').style('display', null);
      })
      .on('mouseout', () => {
        d3.select('.chart-tooltip').style('display', 'none');
      })
      .on('mousemove', (d: any, i) => {
        d3.select('.chart-tooltip')
          .style('left', d3.event.pageX + 'px')
          .style('top', d3.event.pageY + 'px')
          .html(d.name + '<br>' + d.value);
      })
      .style('fill', (d, i) => {
        return this.color(d.name);
      })
      .attr({ ry: borderRadiusX, rx: borderRadiusY });

    this.legend = this.chart
      .append('g')
      .attr('text-anchor', 'end')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .selectAll('g')
      .data(this.barNames.slice().reverse())
      .enter()
      .append('g')
      .attr('transform', function (d, i) {
        return 'translate(0,' + i * 20 + ')';
      });

    this.legend
      .append('rect')
      .attr('x', this.width - 19)
      .attr('width', 19)
      .attr('height', 19)
      .attr('fill', this.color);

    this.legend
      .append('text')
      .attr('x', this.width - 24)
      .attr('y', 9.5)
      .attr('dy', '0.32em')
      .text(function (d) {
        return d;
      });
  }

  private drawChart() {
    this.barNames = d3.keys(this.data[0]).filter(key => {
      return key;
    });

    this.data.forEach((d: any) => {
      d.element = this.barNames.map(name => {
        return { name: name, value: +d[name] };
      });
    });

    this.x0.domain(
      this.data.map((d: any) => {
        return d[this.keys];
      })
    );

    this.x1.domain(this.barNames).rangeRound([0, this.x0.bandwidth()]);

    this.y.domain([
      0,
      d3.max(this.data, function (d) {
        return d3.max(d.element, function (d) {
          return d.value;
        });
      })
    ]);
  }
}
