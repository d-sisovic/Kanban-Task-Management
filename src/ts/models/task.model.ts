import { TaskStatus } from "../enum/task-status.enum";
import { ISubtask } from "./subtask.model";

export interface ITask {
  title: string;
  description: string;
  status: TaskStatus;
  subtasks: ISubtask[];
}
