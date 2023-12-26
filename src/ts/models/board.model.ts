import { IColumn } from "./column.model";

export interface IBoard {
  id: string;
  name: string;
  columns: IColumn[];
  selected: boolean;
}
