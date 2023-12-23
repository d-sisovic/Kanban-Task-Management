import { ISubtask } from "./subtask.model";

export interface ITask {
  title: string;
  description: string;
  status: string;
  subtasks: ISubtask[];
}
