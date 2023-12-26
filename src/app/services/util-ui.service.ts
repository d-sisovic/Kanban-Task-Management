import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilUiService {

  constructor() { }

  public static getColorByIndex(index: number): string {
    const predefinedColors = ['#49C4E5', '#8471F2', '#67E2AE'];

    if (index < predefinedColors.length) { return predefinedColors[index]; }

    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
}
