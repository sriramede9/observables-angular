import { Component, OnInit, OnDestroy } from "@angular/core";
import { UserService } from "./user.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  isActivated: boolean = false;
  private isActivatedSubscribe: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // this.userService.activatedEmitter.subscribe((x) => (this.isActivated = x));

    this.isActivatedSubscribe = this.userService.activatedSubject.subscribe(
      (d) => (this.isActivated = d)
    );
  }

  ngOnDestroy(): void {
    this.isActivatedSubscribe.unsubscribe();
  }
}
