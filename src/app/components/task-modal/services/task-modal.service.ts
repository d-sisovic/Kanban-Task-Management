import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TaskModalService {

  private readonly formBuilder = inject(FormBuilder);

  public buildTaskModalForm(): FormGroup {
    return this.formBuilder.group({
      status: ['']
    });
  }
}
