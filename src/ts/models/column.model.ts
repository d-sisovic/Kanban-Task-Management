import { ITask } from "./task.model";

export interface IColumn {
  id: string;
  name: string;
  tasks: ITask[];
}
