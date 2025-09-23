import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {ProdottoService} from '../../services/prodotto.service';
import {OrdineService} from '../../services/ordine.service';
import {Prodotto} from '../../models/prodotto';
import {Ordine} from '../../models/ordine';
import {OrdineItem} from '../../models/ordine-item';


@Component({
  selector: 'app-ordine-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './ordine-form.html',
  styleUrls: ['./ordine-form.css']
})
export class OrdineForm implements OnInit {
  prodotti: Prodotto[] = [];
  ordine: Ordine = {id: 0, dataCreazione: '', totale: 0, item: []};
  selectedProdottoId: number | null = null;
  selectedQuantita = 1;
  isEdit = false;
  loading = false;

  constructor(
    private prodottoService: ProdottoService,
    private ordineService: OrdineService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.prodottoService.getAll().subscribe({
      next: (ps) => this.prodotti = ps || [],
      complete: () => this.loading = false
    });
    const rawId = this.route.snapshot.paramMap.get('id') || this.route.snapshot.queryParamMap.get('id');
    const idNum = rawId !== null && /^\d+$/.test(rawId) ? Number(rawId) : null;
    if (idNum !== null) {
      this.isEdit = true;
      this.ordineService.getById(idNum).subscribe(o => {
        this.ordine = o;
        this.recomputeTotale();
      });
    } else {
      this.isEdit = false;
    }
  }

  addItem(): void {
    if (!this.selectedProdottoId || this.selectedQuantita <= 0) return;
    const p = this.prodotti.find(pr => pr.id === this.selectedProdottoId);
    if (!p) return;
    const existing = this.ordine.item.find(i => i.prodottoId === p.id);
    if (existing) {
      existing.quantita += this.selectedQuantita;
      existing.prezzoTotale = existing.quantita * p.prezzo;
    } else {
      const nuovo: OrdineItem = {
        id: 0,
        prodottoId: p.id,
        nomeProdotto: p.nome,
        quantita: this.selectedQuantita,
        prezzoTotale: p.prezzo * this.selectedQuantita
      };
      this.ordine.item.push(nuovo);
    }
    this.selectedProdottoId = null;
    this.selectedQuantita = 1;
    this.recomputeTotale();
  }

  removeItem(index: number): void {
    this.ordine.item.splice(index, 1);
    this.recomputeTotale();
  }

  recomputeTotale(): void {
    this.ordine.totale = this.ordine.item.reduce((s, it) => s + (it.prezzoTotale || 0), 0);
  }

  salva(): void {
    const payload: Ordine = {
      ...this.ordine,
      dataCreazione: this.ordine.dataCreazione || new Date().toISOString()
    };
    const idIsValid = Number.isFinite(this.ordine.id) && this.ordine.id > 0;
    if (this.isEdit && idIsValid && (this.ordineService as any).update) {
      (this.ordineService as any).update(this.ordine.id, payload).subscribe({
        next: () => this.router.navigate(['/ordini']),
        error: (err: any) => {
          console.error('Errore nel salvataggio ordine (update):', err);
          alert('Errore nel salvataggio dell\'ordine (modifica). Controlla la console per dettagli.');
        }
      });
    } else {
      this.ordineService.create(payload).subscribe({
        next: () => this.router.navigate(['/ordini']),
        error: (err: any) => {
          console.error('Errore nel salvataggio ordine (create):', err);
          alert('Errore nel salvataggio del nuovo ordine. Controlla la console per dettagli.');
        }
      });
    }
  }
}
