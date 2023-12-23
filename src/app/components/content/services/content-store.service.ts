import { ITask } from '../../../../ts/models/task.model';
import { IBoard } from '../../../../ts/models/board.model';
import { IColumn } from '../../../../ts/models/column.model';
import { ILabelValue } from '../../../../ts/models/label-value.model';
import { Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContentStoreService {

  private boardState: WritableSignal<IBoard[]> = signal([]);

  public setBoards(boards: IBoard[]): void {
    this.boardState.set(this.updateInitialBoardProperties(boards));
  }

  public get getBoards(): WritableSignal<IBoard[]> {
    return this.boardState;
  }

  public get getSelectedBoard(): Signal<IBoard | null> {
    return computed(() => this.getBoards().find(board => board.selected) || null);
  }

  public get getTaskStatus(): Signal<ILabelValue[]> {
    return computed(() => {
      const selectedBoard = this.getSelectedBoard();

      if (!selectedBoard) { return []; }

      return selectedBoard.columns.map(column => ({ label: column.name, value: column.name }));
    });
  }

  public updateTaskStatus(taskTitle: string, newStatus: string): void {
    this.boardState.update(previous => previous.reduce((accumulator, board) => {
      const { columns } = board;
      const isTaskInsideColumn = this.isTaskInColumn(columns, taskTitle);

      if (!isTaskInsideColumn) { return [...accumulator, board]; }

      const newColumns = this.filterTaskInPreviousColumn(columns, taskTitle);
      const [newTask] = this.getTaskInBoardByName(columns, taskTitle, newStatus);

      return [...accumulator, { ...board, columns: newColumns }].map(board => this.transferUpdatedTaskToColumn(board, newTask));
    }, [] as IBoard[]));
  }

  private transferUpdatedTaskToColumn(board: IBoard, newTask: ITask): IBoard {
    const { columns } = board;

    const updatedColumns = columns.map(column => {
      const { tasks, name } = column;

      return name !== newTask.status ? column : { ...column, tasks: [newTask, ...tasks] };
    });

    return { ...board, columns: updatedColumns };
  }

  private filterTaskInPreviousColumn(columns: IColumn[], taskTitle: string): IColumn[] {
    return columns.map(column => {
      const isTaskInsideColumn = this.isTaskInColumn(columns, taskTitle);

      if (!isTaskInsideColumn) { return column; }

      return { ...column, tasks: column.tasks.filter(task => task.title !== taskTitle) };
    });
  }

  private getTaskInBoardByName(columns: IColumn[], taskTitle: string, newStatus: string): ITask[] {
    return columns.reduce((accumulator, column) => {
      const matchingTask = column.tasks.find(task => task.title === taskTitle);

      return matchingTask ? [...accumulator, { ...matchingTask, status: newStatus }] : accumulator;
    }, [] as ITask[]);
  }

  private isTaskInColumn(columns: IColumn[], taskTitle: string): boolean {
    return columns.some(column => column.tasks.find(task => task.title === taskTitle));
  }

  private updateInitialBoardProperties(boards: IBoard[]): IBoard[] {
    return boards.map((board, index) => ({ ...board, selected: index === 0 }));
  }
}
