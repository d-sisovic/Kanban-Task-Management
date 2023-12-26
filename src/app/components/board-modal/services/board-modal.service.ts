import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BoardModalService {

  private readonly formBuilder = inject(FormBuilder);

  public buildBoardModalForm(): FormGroup {
    return this.formBuilder.group({});
  }
}
