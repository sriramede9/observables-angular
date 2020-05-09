import { Component, OnInit, OnDestroy } from "@angular/core";

import { interval, Subscription } from "rxjs";
import { Observable } from "rxjs/";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  private testSubscription: Subscription;
  constructor() {}

  ngOnInit() {
    // this.testSubscription = interval(1000).subscribe((cx) => {
    //   console.log(cx);
    // });
    const customIntervalObservable = Observable.create((observer) => {
      let count: number = 0;
      setInterval(() => {
        observer.next(count);
        if (count == 2) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error("count greater than 3 are you awake?"));
        }
        count++;
      }, 1000);
    });

    this.testSubscription = customIntervalObservable.subscribe(
      (c) => console.log(c),
      (error) => alert(error.message),
      () => {
        console.log("completed");
      }
    );
  }
  ngOnDestroy() {
    this.testSubscription.unsubscribe();
  }
}
