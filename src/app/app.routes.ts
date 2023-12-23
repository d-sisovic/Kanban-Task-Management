import { Routes } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import { conterResolver } from './components/content/services/content-resolver';

export const routes: Routes = [
  {
    path: '', component: ContentComponent, resolve: { data: conterResolver }
  }
];
