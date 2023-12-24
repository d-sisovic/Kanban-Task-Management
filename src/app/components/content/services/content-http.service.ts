import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IBoard } from '../../../../ts/models/board.model';
import { LocalStorage } from '../../../ts/enums/local-storage.enum';
import { IDataResponse } from '../../../../ts/models/data-response.model';

@Injectable({
  providedIn: 'root'
})
export class ContentHttpService {

  private readonly assetsUrl: string = 'assets/data.json';

  private readonly http: HttpClient;

  constructor() {
    this.http = inject(HttpClient);
  }

  public fetchBoardData$(): Observable<IBoard[]> {
    const storedBoards = this.getStoredBoards();

    if (storedBoards) { return JSON.parse(storedBoards); }

    return this.http.get<IDataResponse>(this.assetsUrl)
      .pipe(
        map(response => response.boards)
      );
  }

  private getStoredBoards(): string | null {
    return localStorage.getItem(LocalStorage.FRONTEND_MENTOR_KANBAN);
  }
}
