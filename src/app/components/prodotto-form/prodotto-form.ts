import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {ProdottoService} from '../../services/prodotto.service';
import {Prodotto} from '../../models/prodotto';


@Component({
  selector: 'app-prodotto-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './prodotto-form.html'
})
export class ProdottoFormComponent implements OnInit {
  prodotto: Prodotto = {id: 0, nome: '', prezzo: 0, quantita: 0};
  isEdit = false;

  constructor(
    private prodottoService: ProdottoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.prodottoService.getById(+id).subscribe(data => this.prodotto = data);
    }
  }

  salva(): void {
    if (this.isEdit) {
      this.prodottoService.update(this.prodotto.id, this.prodotto).subscribe(() => {
        this.router.navigate(['/prodotti']);
      });
    } else {
      const {id, ...payload} = this.prodotto as any;
      this.prodottoService.create(payload as any).subscribe(() => {
        this.router.navigate(['/prodotti']);
      });
    }
  }
}
