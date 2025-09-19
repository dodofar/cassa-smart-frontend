import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {ProdottoService} from '../../services/prodotto.service';
import {Prodotto} from '../../models/prodotto';


@Component({
  selector: 'app-prodotti-lista',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './prodotti-lista.html'
})
export class ProdottiListaComponent implements OnInit {
  prodotti: Prodotto[] = [];

  constructor(private prodottoService: ProdottoService, private router: Router) {
  }

  ngOnInit(): void {
    this.loadProdotti();
  }

  loadProdotti(): void {
    this.prodottoService.getAll().subscribe(raw => {
      const data = raw as any[] || [];
      this.prodotti = data.map(p => ({
        id: p.id ?? p.prodottoId ?? 0,
        nome: p.nome ?? p.name ?? '',
        prezzo: Number(p.prezzo ?? p.price ?? 0),
        quantita: Number(p.quantita ?? p.quantitaDisponibile ?? p.stock ?? 0)
      }));
    });
  }

  eliminaProdotto(id: number): void {
    const conferma = confirm('Sei sicuro di voler eliminare questo prodotto?');
    if (!conferma) {
      return;
    }
    this.prodottoService.delete(id).subscribe(() => this.loadProdotti());
  }

  modificaProdotto(id: number): void {
    this.router.navigate(['/prodotti/modifica', id]);
  }
}
