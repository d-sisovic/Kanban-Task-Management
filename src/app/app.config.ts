import { routes } from './app.routes';
import { provideRouter } from '@angular/router';
import { ApplicationConfig } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
