import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticheService {
  private apiUrl = 'http://localhost:8080/ordini/statistiche';

  constructor(private http: HttpClient) {
  }

  giornaliere(giorno: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/giornaliere?giorno=${giorno}`);
  }

  mensili(mese: number, anno: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/mensili?mese=${mese}&anno=${anno}`);
  }

  annuali(anno: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/annuali?anno=${anno}`);
  }
}
