import { StoreBoardService } from './store-board.service';
import { ITask } from '../../../../../ts/models/task.model';
import { IBoard } from '../../../../../ts/models/board.model';
import { IColumn } from '../../../../../ts/models/column.model';
import { ISubtask } from '../../../../../ts/models/subtask.model';
import { Injectable, Signal, computed, inject } from '@angular/core';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class StoreTaskService {

  private readonly storeBoardService = inject(StoreBoardService);

  // Returns selected task by taskId from the selected board
  public getSelectedTask(taskId: string): Signal<ITask | null> {
    return computed(() => {
      const selectedBoard = this.storeBoardService.getSelectedBoard();

      if (!selectedBoard) { return null; }

      const [selectedTask] = selectedBoard.columns.reduce((accumulator, column) => {
        const matchingTask = column.tasks.find(task => task.id === taskId) || null;

        return !matchingTask ? accumulator : [...accumulator, matchingTask];
      }, [] as Array<ITask | null>);

      return selectedTask;
    });
  }

  // Updates selected task status (actually it's column name), and transfer selected task to another column
  public updateTaskStatus(taskId: string, newStatus: string): void {
    this.storeBoardService.getBoards.update(previous => (previous || []).reduce((accumulator, board) => {
      const { columns } = board;
      const isTaskInsideColumn = this.isTaskInColumns(columns, taskId);

      if (!isTaskInsideColumn) { return [...accumulator, board]; }

      const newColumns = this.filterTaskInPreviousColumn(columns, taskId);
      const [newTask] = this.getTaskInBoardByName(columns, taskId, newStatus);

      return [...accumulator, { ...board, columns: newColumns }].map(board => this.transferUpdatedTaskToColumn(board, newTask));
    }, [] as IBoard[]));
  }

  // Updates selected subtask status to isCompleted value
  public updateSubtaskStatus(isCompleted: boolean, subtaskId: string): void {
    this.storeBoardService.getBoards.update(previous => (previous || []).reduce((accumulator, board) => {
      const { columns } = board;
      const isSubtaskInsideColumn = this.isSubtaskInColumn(columns, subtaskId);

      if (!isSubtaskInsideColumn) { return [...accumulator, board]; }

      const updatedColumns = this.getUpdatedColumnsBySubtaskStatus(columns, isCompleted, subtaskId);

      return [...accumulator, { ...board, columns: updatedColumns }];
    }, [] as IBoard[]));
  }

  // Handles adding new task in selected column
  public addNewTask(taskForm: ITask, boardId: string | null): void {
    this.storeBoardService.getBoards.update(previous => (previous || []).map(board => {
      if (board.id !== boardId) { return board; }

      return { ...board, columns: this.addNewTaskToColumn(board.columns, taskForm) };
    }));
  }

  // Handles updating existing task info
  public updateTask(taskForm: ITask, boardId: string | null): void {
    this.storeBoardService.getBoards.update(previous => (previous || []).map(board => {
      if (board.id !== boardId) { return board; }

      return { ...board, columns: this.updateTaskInColumn(board.columns, taskForm) };
    }));
  }

  // Convert subtask titles to ISubtask[]
  public createNewSubtasks(subtasks: string[]): ISubtask[] {
    return subtasks.map(title => ({ id: uuid.v4(), title, isCompleted: true }));
  }

  // Removes selected task
  public deleteTask(taskId: string, boardId: string): void {
    this.storeBoardService.getBoards.update(previous => (previous || []).map(board => {
      if (board.id !== boardId) { return board; }

      return { ...board, columns: this.filterTaskInPreviousColumn(board.columns, taskId) };
    }));
  }

  // Handle move task on drag on drop in another column
  public transferTaskInAnotherColumn(column: IColumn, previousColumnId: string, selectedBoardId: string, currentIndex: number, previousIndex: number): void {
    this.storeBoardService.getBoards.update(previous => (previous || []).map(board => {
      if (board.id !== selectedBoardId) { return board; }

      const matchingTask = this.findTaskInColumnForDND(board.columns, column.name, previousColumnId, previousIndex);

      if (!matchingTask) { return board; }

      const filteredColumns = this.filterTaskInPreviousColumn(board.columns, matchingTask.id);
      const columns = this.reorderTaskInColumn(filteredColumns, matchingTask, column.id, currentIndex);

      return { ...board, columns };
    }));
  }

  // Handle move task on drag on drop in existing column
  public moveTaskInExistingColumn(column: IColumn, selectedBoardId: string, currentIndex: number, previousIndex: number): void {
    this.storeBoardService.getBoards.update(previous => (previous || []).map(board => {
      if (board.id !== selectedBoardId) { return board; }

      const matchingTask = column.tasks[previousIndex];
      const filteredColumns = this.filterTaskInPreviousColumn(board.columns, matchingTask.id);
      const columns = this.reorderTaskInColumn(filteredColumns, matchingTask, column.id, currentIndex);

      return { ...board, columns };
    }));
  }

  // Checks whether task is in the specific column, and if it is calls updateExistingTask fn
  private updateTaskInColumn(columns: IColumn[], taskForm: ITask): IColumn[] {
    return columns.map(column => {
      const { name, tasks } = column;

      return name !== taskForm.status ? column : { ...column, tasks: this.updateExistingTask(tasks, taskForm) };
    });
  }

  // Updates existing task with changed info from modal
  private updateExistingTask(tasks: ITask[], taskForm: ITask): ITask[] {
    return tasks.map(task => task.id !== taskForm.id ? task : taskForm);
  }

  // Adds new task in selected column
  private addNewTaskToColumn(columns: IColumn[], taskForm: ITask): IColumn[] {
    return columns.map(column => {
      const { tasks, name } = column;

      return name !== taskForm.status ? column : { ...column, tasks: [taskForm, ...tasks] };
    });
  }

  // Updates subtasks status in board column
  private getUpdatedColumnsBySubtaskStatus(columns: IColumn[], isCompleted: boolean, subtaskId: string): IColumn[] {
    return columns.map(column => {
      const isSubtaskInsideColumn = this.isSubtaskInColumn(columns, subtaskId);

      if (!isSubtaskInsideColumn) { return column; }

      return { ...column, tasks: this.getUpdatedTasksBySubtaskStatus(column.tasks, isCompleted, subtaskId) };
    });
  }

  // Updates subtasks isCompleted property for all matching subtasks, based on subtaskId value
  private getUpdatedTasksBySubtaskStatus(tasks: ITask[], isCompleted: boolean, subtaskId: string): ITask[] {
    return tasks.map(task => ({ ...task, subtasks: this.updateSubtaskByChangedStatus(task.subtasks, isCompleted, subtaskId) }));
  }

  // Updates subtasks isCompleted property
  private updateSubtaskByChangedStatus(subtasks: ISubtask[], isCompleted: boolean, subtaskId: string): ISubtask[] {
    return subtasks.map(subtask => subtask.id !== subtaskId ? subtask : { ...subtask, isCompleted });
  }

  // Moves task in new column, where user selected through dropdown
  private transferUpdatedTaskToColumn(board: IBoard, newTask: ITask): IBoard {
    const columns = board.columns.map(column => {
      const { tasks, name } = column;

      return name !== newTask.status ? column : { ...column, tasks: [newTask, ...tasks] };
    });

    return { ...board, columns };
  }

  // Reorders tasks in the column matching by columnId
  private reorderTaskInColumn(columns: IColumn[], task: ITask, columnId: string, index: number): IColumn[] {
    return columns.map(column => column.id !== columnId ? column : { ...column, tasks: this.reorderTask(column.tasks, task, index) });
  }

  // Adds task at specific index in the array
  private reorderTask(tasks: ITask[], task: ITask, index: number): ITask[] {
    const newTasks = [...tasks];

    newTasks.splice(index, 0, task);

    return newTasks;
  }

  // Filters out task which is going to be in another column
  private filterTaskInPreviousColumn(columns: IColumn[], taskId: string): IColumn[] {
    return columns.map(column => {
      const isTaskInsideColumn = this.isTaskInColumn(column, taskId);

      if (!isTaskInsideColumn) { return column; }

      return { ...column, tasks: column.tasks.filter(task => task.id !== taskId) };
    });
  }

  // Returns matching task by name in the columns + updates it's new status
  private getTaskInBoardByName(columns: IColumn[], taskId: string, newStatus: string): ITask[] {
    return columns.reduce((accumulator, column) => {
      const matchingTask = column.tasks.find(task => task.id === taskId);

      return matchingTask ? [...accumulator, { ...matchingTask, status: newStatus }] : accumulator;
    }, [] as ITask[]);
  }

  // Checks whether subtask is in the provided columns
  private isSubtaskInColumn(columns: IColumn[], subtaskId: string): boolean {
    return columns.some(column => column.tasks.find(task => task.subtasks.find(subtask => subtask.id === subtaskId)));
  }

  // Checks whether specified task is in the provided columns
  private isTaskInColumns(columns: IColumn[], taskId: string): boolean {
    return columns.some(column => column.tasks.find(task => task.id === taskId));
  }

  // Gets matching task by index in provided columnId, and updates it's status by newely transfered column name
  private findTaskInColumnForDND(columns: IColumn[], status: string, columnId: string, taskIndex: number): ITask | null {
    const matchingTask = columns.find(column => column.id === columnId)?.tasks[taskIndex] || null;

    return matchingTask ? { ...matchingTask, status } : null;
  }

  // Checks whether specified task is in the provided column
  private isTaskInColumn(column: IColumn, taskId: string): boolean {
    return column.tasks.some(task => task.id === taskId);
  }
}
