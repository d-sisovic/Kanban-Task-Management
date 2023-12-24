import { ITask } from '../../../../ts/models/task.model';
import { IBoard } from '../../../../ts/models/board.model';
import { IColumn } from '../../../../ts/models/column.model';
import { ISubtask } from '../../../../ts/models/subtask.model';
import { ILabelValue } from '../../../../ts/models/label-value.model';
import { Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContentStoreService {

  private boardState: WritableSignal<IBoard[] | null> = signal(null);

  // Sets initial board value to signal
  public setBoards(boards: IBoard[]): void {
    this.boardState.set(this.updateInitialBoardProperties(boards));
  }

  // Returns whole board value as signal
  public get getBoards(): WritableSignal<IBoard[] | null> {
    return this.boardState;
  }

  // Returns selected user's board
  public get getSelectedBoard(): Signal<IBoard | null> {
    return computed(() => this.getBoards()?.find(board => board.selected) || null);
  }

  // Returns available column names (usually it's TODO, DOING, DONE) from selected board
  public get getTaskStatus(): Signal<ILabelValue[]> {
    return computed(() => {
      const selectedBoard = this.getSelectedBoard();

      if (!selectedBoard) { return []; }

      return selectedBoard.columns.map(column => ({ label: column.name, value: column.name }));
    });
  }

  // Returns selected task by taskTitle from the selected board
  public getSelectedTask(taskTitle: string): Signal<ITask | null> {
    return computed(() => {
      const selectedBoard = this.getSelectedBoard();

      if (!selectedBoard) { return null; }

      const [selectedTask] = selectedBoard.columns.reduce((accumulator, column) => {
        const matchingTask = column.tasks.find(task => task.title === taskTitle) || null;

        return !matchingTask ? accumulator : [...accumulator, matchingTask];
      }, [] as Array<ITask | null>);

      return selectedTask;
    });
  }

  // Updates selected task status (actually it's column name), and transfer selected task to another column
  public updateTaskStatus(taskTitle: string, newStatus: string): void {
    this.boardState.update(previous => (previous || []).reduce((accumulator, board) => {
      const { columns } = board;
      const isTaskInsideColumn = this.isTaskInColumn(columns, taskTitle);

      if (!isTaskInsideColumn) { return [...accumulator, board]; }

      const newColumns = this.filterTaskInPreviousColumn(columns, taskTitle);
      const [newTask] = this.getTaskInBoardByName(columns, taskTitle, newStatus);

      return [...accumulator, { ...board, columns: newColumns }].map(board => this.transferUpdatedTaskToColumn(board, newTask));
    }, [] as IBoard[]));
  }

  // Updates selected subtask status to isCompleted value
  public updateSubtaskStatus(isCompleted: boolean, subtaskTitle: string): void {
    this.boardState.update(previous => (previous || []).reduce((accumulator, board) => {
      const { columns } = board;
      const isSubtaskInsideColumn = this.isSubtaskInColumn(columns, subtaskTitle);

      if (!isSubtaskInsideColumn) { return [...accumulator, board]; }

      const updatedColumns = this.getUpdatedColumnsBySubtaskStatus(columns, isCompleted, subtaskTitle);

      return [...accumulator, { ...board, columns: updatedColumns }];
    }, [] as IBoard[]));
  }

  // Updates subtasks status in board column
  private getUpdatedColumnsBySubtaskStatus(columns: IColumn[], isCompleted: boolean, subtaskTitle: string): IColumn[] {
    return columns.map(column => {
      const isSubtaskInsideColumn = this.isSubtaskInColumn(columns, subtaskTitle);

      if (!isSubtaskInsideColumn) { return column; }

      return { ...column, tasks: this.getUpdatedTasksBySubtaskStatus(column.tasks, isCompleted, subtaskTitle) };
    });
  }

  // Updates subtasks isCompleted property for all matching subtasks, based on subtaskTitle value
  private getUpdatedTasksBySubtaskStatus(tasks: ITask[], isCompleted: boolean, subtaskTitle: string): ITask[] {
    return tasks.map(task => ({ ...task, subtasks: this.updateSubtaskByChangedStatus(task.subtasks, isCompleted, subtaskTitle) }));
  }

  // Updates subtasks isCompleted property
  private updateSubtaskByChangedStatus(subtasks: ISubtask[], isCompleted: boolean, subtaskTitle: string): ISubtask[] {
    return subtasks.map(subtask => subtask.title !== subtaskTitle ? subtask : { ...subtask, isCompleted });
  }

  // Moves task in new column, where user selected through dropdown
  private transferUpdatedTaskToColumn(board: IBoard, newTask: ITask): IBoard {
    const columns = board.columns.map(column => {
      const { tasks, name } = column;

      return name !== newTask.status ? column : { ...column, tasks: [newTask, ...tasks] };
    });

    return { ...board, columns };
  }

  // Filters out task which is going to be in another column
  private filterTaskInPreviousColumn(columns: IColumn[], taskTitle: string): IColumn[] {
    return columns.map(column => {
      const isTaskInsideColumn = this.isTaskInColumn(columns, taskTitle);

      if (!isTaskInsideColumn) { return column; }

      return { ...column, tasks: column.tasks.filter(task => task.title !== taskTitle) };
    });
  }

  // Returns matching task by name in the columns + updates it's new status
  private getTaskInBoardByName(columns: IColumn[], taskTitle: string, newStatus: string): ITask[] {
    return columns.reduce((accumulator, column) => {
      const matchingTask = column.tasks.find(task => task.title === taskTitle);

      return matchingTask ? [...accumulator, { ...matchingTask, status: newStatus }] : accumulator;
    }, [] as ITask[]);
  }

  // Checks whether subtask is in the provided columns
  private isSubtaskInColumn(columns: IColumn[], subtaskTitle: string): boolean {
    return columns.some(column => column.tasks.find(task => task.subtasks.find(subtask => subtask.title === subtaskTitle)));
  }

  // Checks whether specified task is in the provided columns
  private isTaskInColumn(columns: IColumn[], taskTitle: string): boolean {
    return columns.some(column => column.tasks.find(task => task.title === taskTitle));
  }

  // Set's initially selected board by 0 index
  private updateInitialBoardProperties(boards: IBoard[]): IBoard[] {
    return boards.map((board, index) => ({ ...board, selected: index === 0 }));
  }
}
