import {Inject, Injectable} from "@angular/core";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {CityDto} from "../models/api/city.dto";
import {HttpClient} from "@angular/common/http";
import {ENVIRONMENT} from "../app.module";
import {Environment} from "../../environments/environment";
import {CityForm} from "../models/forms/city.form";
import {AuthDto} from "../models/api/auth.dto";


@Injectable({ providedIn: 'root' })
export class ApiService {

  private readonly CITY_URL = 'city';
  private readonly LOGIN_URL = 'auth';

  // For simplicity kept authentication logic here, in real case would build special service for refreshing, validation etc.
  private token: string | null = null;

  private _loggedIn$ = new BehaviorSubject<boolean>(false);
  public loggedIn$ = this._loggedIn$.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(ENVIRONMENT) private environment: Environment,
  ) { }

  public getCities(page = 0, search?: string): Observable<CityDto[]>{
    let params = `page=${page}`

    if (search)
      params += `&search=${search}`;

    return this.http.get<CityDto[]>(`${this.environment.api_url}/${this.CITY_URL}?${params}`);
  }

  public patchCity(cityForm: CityForm): Observable<CityDto> {
    let body = null;

    if (cityForm.name) {
      body = { name: cityForm.name };
    }

    if (cityForm.url) {
      body = cityForm.name ? {...body, url: cityForm.url } :
        { url: cityForm.url };
    }

    return this.http.patch<CityDto>(`${this.environment.api_url}/${this.CITY_URL}/${cityForm.id}`, body,
      {
        headers: {
          'Authorization': 'Bearer ' + this.token
        }
      }
      );
  }

  public login(username: string, password: string): Observable<AuthDto> {
    return this.http.post<AuthDto>(`${this.environment.api_url}/${this.LOGIN_URL}`, {
      username,
      password
    }).pipe(tap(auth => {
      this.token = auth.token;
      this._loggedIn$.next(true);
    }))
  }


  public getToken(): string | null {
    return this.token;
  }
}
