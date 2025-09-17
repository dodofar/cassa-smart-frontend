import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import {Ordine} from '../models/ordine';


@Injectable({
  providedIn: 'root'
})
export class OrdineService {
  private apiUrl = '/ordini';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Ordine[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((arr) => (arr || []).map((o: any) => ({
        id: o.id ?? o.ordineId ?? 0,
        dataCreazione: o.dataCreazione ?? o.data ?? o.createdAt ?? '',
        totale: Number(o.totale ?? o.importoTotale ?? o.total ?? 0),
        item: (o.item ?? o.items ?? []).map((it: any) => ({
          id: it.id ?? 0,
          prodottoId: it.prodottoId ?? it.productId ?? it.prodotto?.id ?? 0,
          nomeProdotto: it.nomeProdotto ?? it.productName ?? it.prodotto?.nome ?? '',
          quantita: Number(it.quantita ?? it.quantity ?? 0),
          prezzoTotale: Number(it.prezzoTotale ?? it.totalPrice ?? 0)
        }))
      } as Ordine)))
    );
  }

  getById(id: number): Observable<Ordine> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map((o: any) => ({
        id: o.id ?? o.ordineId ?? 0,
        dataCreazione: o.dataCreazione ?? o.data ?? o.createdAt ?? '',
        totale: Number(o.totale ?? o.importoTotale ?? o.total ?? 0),
        item: (o.item ?? o.items ?? []).map((it: any) => ({
          id: it.id ?? 0,
          prodottoId: it.prodottoId ?? it.productId ?? it.prodotto?.id ?? 0,
          nomeProdotto: it.nomeProdotto ?? it.productName ?? it.prodotto?.nome ?? '',
          quantita: Number(it.quantita ?? it.quantity ?? 0),
          prezzoTotale: Number(it.prezzoTotale ?? it.totalPrice ?? 0)
        }))
      } as Ordine))
    );
  }

  create(ordine: Ordine): Observable<Ordine> {
    const body: any = { ...ordine };
    if (!body.id) delete body.id;
    delete body.dataCreazione;
    delete body.totale;
    const itemsRaw = body.item ?? body.items ?? [];
    const itemsArray = Array.isArray(itemsRaw)
      ? itemsRaw
      : (itemsRaw && typeof itemsRaw === 'object' ? [itemsRaw] : []);
    body.items = itemsArray.map((it: any) => {
      const prodottoId = Number(it.prodottoId ?? it.productId ?? it.prodotto?.id ?? 0);
      const quantita = Number(it.quantita ?? it.quantity ?? 0);
      const mapped: any = { quantita };
      if (prodottoId > 0) {
        mapped.prodottoId = prodottoId;
        mapped.prodotto = { id: prodottoId };
      }
      return mapped;
    });
    const toSend = body.items;
    return this.http.post<Ordine>(this.apiUrl, toSend);
  }

  update(id: number, ordine: Ordine): Observable<Ordine> {
    const body: any = { ...ordine };
    delete body.dataCreazione;
    delete body.totale;
    const itemsRaw = body.item ?? body.items ?? [];
    const itemsArray = Array.isArray(itemsRaw)
      ? itemsRaw
      : (itemsRaw && typeof itemsRaw === 'object' ? [itemsRaw] : []);
    body.items = itemsArray.map((it: any) => {
      const prodottoId = Number(it.prodottoId ?? it.productId ?? it.prodotto?.id ?? 0);
      const quantita = Number(it.quantita ?? it.quantity ?? 0);
      const mapped: any = { quantita };
      if (prodottoId > 0) {
        mapped.prodottoId = prodottoId;
        mapped.prodotto = { id: prodottoId };
      }
      return mapped;
    });
    body.item = body.items;
    return this.http.put<Ordine>(`${this.apiUrl}/${id}`, body);
  }
}
