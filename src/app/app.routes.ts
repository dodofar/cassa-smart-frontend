import { Routes } from '@angular/router';

// Pagine Prodotti
import {ProdottiListaComponent} from './components/prodotti-lista/prodotti-lista';
import { ProdottoFormComponent } from './components/prodotto-form/prodotto-form';

// Pagine Ordini
import { OrdiniLista } from './components/ordini-lista/ordini-lista';
import { OrdineForm } from './components/ordine-form/ordine-form';

// Statistiche
import { Statistiche } from './components/statistiche/statistiche';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'prodotti' },

  // Prodotti
  { path: 'prodotti', component: ProdottiListaComponent },
  { path: 'prodotti/nuovo', component: ProdottoFormComponent },
  { path: 'prodotti/modifica/:id', component: ProdottoFormComponent },

  // Ordini
  { path: 'ordini', component: OrdiniLista },
  { path: 'ordini/nuovo', component: OrdineForm },
  { path: 'ordini/modifica/:id', component: OrdineForm },

  // Statistiche
  { path: 'statistiche', component: Statistiche },

  // Fallback
  { path: '**', redirectTo: 'prodotti' }
];
