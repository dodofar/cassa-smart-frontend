import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrdineService } from '../../services/ordine.service';
import {Ordine} from '../../models/ordine';


@Component({
  selector: 'app-ordini-lista',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ordini-lista.html'
})
export class OrdiniListaComponent implements OnInit {
  ordini: Ordine[] = [];

  constructor(private ordineService: OrdineService) {}

  ngOnInit(): void {
    this.ordineService.getAll().subscribe(data => this.ordini = data);
  }

  deleteOrdine(o: Ordine): void {
    if (!o || !o.id) return;
    const ok = confirm(`Eliminare l'ordine #${o.id}?`);
    if (!ok) return;
    this.ordineService.delete(o.id).subscribe({
      next: () => {
        this.ordini = this.ordini.filter(or => or.id !== o.id);
      },
      error: (err) => {
        console.error('Errore eliminazione ordine', err);
        alert('Errore durante l\'eliminazione dell\'ordine.');
      }
    });
  }
}
