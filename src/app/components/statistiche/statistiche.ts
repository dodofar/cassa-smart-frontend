import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdineService } from '../../services/ordine.service';
import {Ordine} from '../../models/ordine';


interface StatPoint { label: string; value: number; }

@Component({
  selector: 'app-statistiche',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistiche.html',
  styleUrls: ['./statistiche.css']
})
export class Statistiche implements OnInit {
  view: 'giorno'|'mese'|'anno' = 'mese';
  ordini: Ordine[] = [];
  points: StatPoint[] = [];
  maxValue = 0;
  somma = 0;
  loading = false;

  constructor(private ordineService: OrdineService) {}

  ngOnInit(): void {
    this.loading = true;
    this.ordineService.getAll().subscribe({
      next: (data) => {
        this.ordini = (data || []).map(o => ({
          id: (o as any).id ?? 0,
          dataCreazione: (o as any).dataCreazione ?? (o as any).data ?? (o as any).createdAt ?? '',
          totale: Number((o as any).totale ?? (o as any).importoTotale ?? (o as any).total ?? 0),
          item: (o as any).item ?? (o as any).items ?? []
        }));
        this.recompute();
      },
      error: () => { this.ordini = []; this.recompute(); },
      complete: () => this.loading = false
    });
  }

  setView(v: 'giorno'|'mese'|'anno') { this.view = v; this.recompute(); }

  private recompute(){
    const map = new Map<string, number>();
    for(const o of this.ordini){
      const d = this.parseDate(o.dataCreazione);
      if(!d) continue;
      let key = '';
      if(this.view === 'giorno') key = this.formatDate(d, 'dd/MM/yyyy');
      else if(this.view === 'mese') key = this.formatDate(d, 'MM/yyyy');
      else key = this.formatDate(d, 'yyyy');
      map.set(key, (map.get(key) || 0) + (o.totale || 0));
    }
    const entries = Array.from(map.entries());
    entries.sort((a,b) => this.keyToDate(a[0]).getTime() - this.keyToDate(b[0]).getTime());
    this.points = entries.map(([label, value]) => ({ label, value }));
    this.maxValue = this.points.reduce((m,p) => Math.max(m, p.value), 0);
    this.somma = this.points.reduce((s,p) => s + p.value, 0);
  }

  private parseDate(val: string): Date | null {
    if(!val) return null;
    const d = new Date(val);
    if(!isNaN(d.getTime())) return d;
    const m = val.match(/^(\d{2})\/(\d{2})\/(\d{4})/);
    if(m){
      const day = +m[1], mon = +m[2]-1, yr = +m[3];
      const dd = new Date(yr, mon, day);
      return isNaN(dd.getTime()) ? null : dd;
    }
    return null;
  }

  private formatDate(d: Date, pattern: 'dd/MM/yyyy'|'MM/yyyy'|'yyyy'): string {
    const pad = (n: number) => n < 10 ? '0'+n : ''+n;
    switch(pattern){
      case 'dd/MM/yyyy': return `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()}`;
      case 'MM/yyyy': return `${pad(d.getMonth()+1)}/${d.getFullYear()}`;
      case 'yyyy': return `${d.getFullYear()}`;
    }
  }

  private keyToDate(key: string): Date {
    const parts = key.split('/');
    if(parts.length === 3){
      const [dd, mm, yyyy] = parts.map(p => +p);
      return new Date(yyyy, mm-1, dd);
    }
    if(parts.length === 2){
      const [mm, yyyy] = parts.map(p => +p);
      return new Date(yyyy, mm-1, 1);
    }
    const y = +key;
    return new Date(isNaN(y) ? 0 : y, 0, 1);
  }
}
