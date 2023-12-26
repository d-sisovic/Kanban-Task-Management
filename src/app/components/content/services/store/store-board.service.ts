import { IBoard } from '../../../../../ts/models/board.model';
import { IColumn } from '../../../../../ts/models/column.model';
import { ILabelValue } from '../../../../../ts/models/label-value.model';
import { Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class StoreBoardService {

  private boards: WritableSignal<IBoard[] | null> = signal(null);

  constructor() { }

  // Sets initial boards to signal
  public setBoards(boards: IBoard[]): void {
    this.boards.set(this.formatInitialBoards(boards));
  }

  // Returns whole boards as signal
  public get getBoards(): WritableSignal<IBoard[] | null> {
    return this.boards;
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

  // Sets initially selected board by 0 index
  private formatInitialBoards(boards: IBoard[]): IBoard[] {
    return boards.map((board, index) => {
      const { name } = board;
      const selected = index === 0;
      const columns = this.setBoardDataValueIds(board);

      return { ...board, selected, id: name, columns };
    });
  }

  // Assign to selected board, columns/tasks/subtasks ids
  private setBoardDataValueIds(board: IBoard): IColumn[] {
    return this.assignIdToPassedArray(board.columns).map(column => ({
      ...column,
      tasks: this.assignIdToPassedArray(column.tasks).map(task => ({
        ...task,
        subtasks: this.assignIdToPassedArray(task.subtasks)
      }))
    }));
  }

  // Assign to object id, based on the key provided
  private assignIdToPassedArray<T>(data: Array<T>): Array<T> {
    return data.map(item => ({ ...item, id: uuid.v4() }));
  }
}
