import { timer, Subscription } from 'rxjs';
import { TrendingService } from './trending.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

export enum TimeOptions {
  Hour = 'Hour',
  Day = 'Day',
  Week = 'Week',
  Month = 'Month',
  Year = 'Year'
}

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class TrendingComponent implements OnInit, OnDestroy {

  public trending: string[] = [];
  public TimeOptions: typeof TimeOptions = TimeOptions;
  public timeOptions: string[] = [TimeOptions.Hour, TimeOptions.Day, TimeOptions.Week, TimeOptions.Month, TimeOptions.Year];
  public selectedTimeOption: string = TimeOptions.Day;
  private trendingPoller: Subscription;
  private readonly POLLING_INTERVAL: number = 10000;

  constructor(private trendingService: TrendingService) { }

  public ngOnInit(): void {
    this.trendingPoller = timer(0, this.POLLING_INTERVAL).subscribe(() => {
      this.updateTimeOption(this.selectedTimeOption);
    });
  }

  public ngOnDestroy(): void {
    this.trendingPoller.unsubscribe();
  }

  public getTrending(startTime: number): void {
    this.trendingService.getTrending(startTime).subscribe((trending: string[]) => {
      this.trending = trending;
    }, () => {
      // this.trending = [
      //   'asdf',
      //   'hello',
      //   'hidon',
      // ];
      console.error('error getting trending');
    });
  }

  public updateTimeOption(timeOption: string) {
    this.selectedTimeOption = timeOption;
    const timeSeconds = Math.round((new Date).getTime() / 1000);
    if (timeOption === TimeOptions.Hour) {
      this.getTrending(timeSeconds - (60 * 60));
    } else if (timeOption === TimeOptions.Day) {
      this.getTrending(timeSeconds - (24 * 60 * 60));
    } else if (timeOption === TimeOptions.Week) {
      this.getTrending(timeSeconds - (7 * 24 * 60 * 60));
    } else if (timeOption === TimeOptions.Month) {
      this.getTrending(timeSeconds - (30 * 24 * 60 * 60));
    } else if (timeOption === TimeOptions.Year) {
      this.getTrending(timeSeconds - (52 * 7 * 24 * 60 * 60));
    } else {
      console.error('Error updating time options');
    }
  }
}
