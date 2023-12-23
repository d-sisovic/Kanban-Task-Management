import { IBoard } from '../../../../ts/models/board.model';
import { Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContentStoreService {

  private boardState: WritableSignal<IBoard[]> = signal([]);

  constructor() { }

  public setBoards(boards: IBoard[]): void {
    this.boardState.set(this.updateInitialBoardProperties(boards));
  }

  public get getBoards(): WritableSignal<IBoard[]> {
    return this.boardState;
  }

  public get getSelectedBoard(): Signal<IBoard | null> {
    return computed(() => this.getBoards().find(board => board.selected) || null);
  }

  private updateInitialBoardProperties(boards: IBoard[]): IBoard[] {
    return boards.map((board, index) => ({ ...board, selected: index === 0 }));
  }
}
