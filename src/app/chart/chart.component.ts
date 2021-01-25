import { Compiler, Component, Injector, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ComponentFactoryClass } from '../shared/utils/component-factory';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { TooltipModule } from '../tooltip/tooltip.module';
import { CATEGORIES, SERIES } from './constants';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  constructor(private injector: Injector, private compiler: Compiler) {}

  ngOnInit(): void {
    Highcharts.chart('chart-container', this.prepareChart());
  }

  prepareChart(): Highcharts.Options {
    // Dynamically create and inject the tooltip
    const component = new ComponentFactoryClass<
      TooltipModule,
      TooltipComponent
    >(this.injector, this.compiler).createComponent(
      TooltipModule,
      TooltipComponent
    );

    // Build options
    return {
      credits: {
        enabled: false,
      },
      chart: {
        type: 'line',
      },
      title: {
        text: 'Dynamic Tooltip Example',
      },
      xAxis: {
        categories: CATEGORIES,
      },
      yAxis: {
        title: {
          text: 'Temperature (°C)',
        },
      },
      tooltip: {
        useHTML: true,
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderRadius: 0,
        shadow: false,
        shape: 'square',
        outside: true,
        padding: 0,
        formatter(): string {
          // Pass the point data to the dynamic tooltip component
          component.instance.data = this;
          component.changeDetectorRef.detectChanges();
          // Return the tooltip html to highcharts
          return component.location.nativeElement.outerHTML;
        },
      },
      series: SERIES as Highcharts.SeriesOptionsType[],
    };
  }
}
