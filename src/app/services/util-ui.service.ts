import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilUiService {

  private closeDialogEvent: Subject<void> = new Subject<void>();

  constructor() { }

  public emitCloseDialogEvent(): void {
    this.closeDialogEvent.next();
  }

  public watchCloseDialogEvent$(): Observable<void> {
    return this.closeDialogEvent.asObservable();
  }
}
