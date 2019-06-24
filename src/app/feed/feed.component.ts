import { Component, OnInit } from '@angular/core';
import { FeedService } from './feed.service';
import { Feed } from './feed';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  public message: string = '';
  public blatz: Feed[] = [];
  constructor(public feedService: FeedService ) {}

  ngOnInit() {
    this.getBlatz();
  }

  public getBlatz() {
    this.feedService.getBlatz().subscribe(
      (blatz: Feed[]) => {
        this.blatz = blatz;
      },
      (error) => {
        // this.blatz = [{
        //   blatId: '41362a35-129f-41aa-add6-422b4c3a1b71',
        //   message:	'hi',
        //   creator:	'john',
        //   timestamp: 1547569991
        // }, {
        //   blatId: '41362a35-129f-41aa-add6-422b4c3a1b71',
        //   message:	'beep boop',
        //   creator:	'john',
        //   timestamp: 1547569991
        // }];
        console.error('error:' + error);
      }
    );
  }

  public postBlat(): void {
    this.feedService.postBlatz(this.message).subscribe(
      () => {
        this.message = '';
        this.getBlatz();
      },
      (error) => {
        console.error('error:' + error);
      }
    );
  }
}
