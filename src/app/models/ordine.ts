import {OrdineItem} from './ordine-item';

export interface Ordine {
  id: number;
  dataCreazione: string;
  totale: number;
  item: OrdineItem[];
}
