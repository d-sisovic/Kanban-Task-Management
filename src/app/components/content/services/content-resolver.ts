import { Observable } from "rxjs";
import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { IBoard } from "../../../../ts/models/board.model";
import { ContentHttpService } from "./content-http.service";

export const conterResolver: ResolveFn<(any)> = (): Observable<IBoard[]> => {
  const contentHttpService = inject(ContentHttpService);

  return contentHttpService.fetchBoardData$();
};
