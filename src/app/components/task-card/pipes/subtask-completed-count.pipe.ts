import { Pipe, PipeTransform } from '@angular/core';
import { ISubtask } from '../../../../ts/models/subtask.model';

@Pipe({
  name: 'subtaskCompletedCount',
  standalone: true
})
export class SubtaskCompletedCountPipe implements PipeTransform {

  public transform(subtasks: ISubtask[]): number {
    return subtasks.filter(subtask => subtask.isCompleted).length;
  }
}
