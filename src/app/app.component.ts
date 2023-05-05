import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CityService} from "./services/city.service";
import {City} from "./models/city";
import {debounceTime, Subject, Subscription, take} from "rxjs";
import {CityForm} from "./models/forms/city.form";
import {PaginationComponent} from "./components/pagination/pagination.component";
import {MatDialog} from "@angular/material/dialog";
import {LoginDialogComponent} from "./components/login-dialog/login-dialog.component";
import {ApiService} from "./services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  cities: City[];

  private keyword = '';
  private subs: Subscription[] = [];

  search$ = (new Subject<any>());

  @ViewChild('paginationComponent') paginationComponent: PaginationComponent;
  loggedIn$ = this.apiService.loggedIn$;

  constructor(private cityService: CityService,
              private apiService: ApiService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              ) { }

  ngOnInit(): void {
    this.cityService.getCities() // load initial data
      .pipe(take(1))
      .subscribe(cities => this.cities = cities);

    this.subs.push(
      this.search$.pipe(debounceTime(500)).subscribe((event) => this.search(event.target.value))
    );
  }


  pageClick(page: number) {
    this.cityService.getCities(page, this.keyword)
      .pipe(take(1))
      .subscribe(cities => this.cities = cities);
  }

  save(cityForm: CityForm) {
    this.cityService.saveCity(cityForm)
      .subscribe(city => {
        const index = this.cities.findIndex(c => c.getId() === city.getId());
        if (index !== -1) {
          this.cities[index] = city;
        }
      }, (err: HttpErrorResponse) => {
        this.snackBar.open(err.error?.message ?? 'Unknown error',undefined, {
          duration: 2000,
        });
      });
  }

  search(keyword: string) {
    this.cityService.getCities(0, keyword)
      .pipe(take(1))
      .subscribe(cities => this.cities = cities);
    this.keyword = keyword;
    this.paginationComponent.reset();
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  openDialog(): void {
    this.dialog.open(LoginDialogComponent, {
      width: '500px',
    });
  }
}

