import { ITask } from "./task.model";

export interface IColumn {
  name: string;
  tasks: ITask[];
}
