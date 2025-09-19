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
}
