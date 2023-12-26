import { ISubtask } from "./subtask.model";

export interface ITask {
  id: string;
  title: string;
  status: string;
  description: string;
  subtasks: ISubtask[];
}
