import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Prodotto} from '../models/prodotto';

@Injectable({
  providedIn: 'root'
})
export class ProdottoService {
  private apiUrl = '/prodotti';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Prodotto[]> {
    return this.http.get<Prodotto[]>(this.apiUrl);
  }

  getById(id: number): Observable<Prodotto> {
    return this.http.get<Prodotto>(`${this.apiUrl}/${id}`);
  }

  create(prodotto: Prodotto): Observable<Prodotto> {
    return this.http.post<Prodotto>(this.apiUrl, prodotto);
  }

  update(id: number, prodotto: Prodotto): Observable<Prodotto> {
    return this.http.put<Prodotto>(`${this.apiUrl}/${id}`, prodotto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
