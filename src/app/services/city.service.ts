import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {City} from "../models/city";
import {ApiService} from "./api.service";
import {CityForm} from "../models/forms/city.form";

@Injectable({ providedIn: 'root' })
export class CityService {

  constructor(private apiService: ApiService) { }

  public getCities(page = 0, search?: string): Observable<City[]>{
    return this.apiService.getCities(page, search)
      .pipe(
        map(response => response.map(dto => new City(dto.id, dto.name, dto.url)))
      );
  }

  public saveCity(cityForm: CityForm): Observable<City> {
    return this.apiService.patchCity(cityForm)
      .pipe(
        map(response => new City(response.id, response.name, response.url))
      );
  }
}
