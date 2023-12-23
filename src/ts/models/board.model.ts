import { IColumn } from "./column.model";

export interface IBoard {
  name: string;
  columns: IColumn[];
  selected: boolean;
}
