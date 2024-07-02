import { Routes } from '@angular/router';
import { ResponseComponent } from './response/response.component';
import { InputComponent } from './input/input.component';

export const routes: Routes = [
    { path: 'response', component: ResponseComponent },
    { path: 'input', component: InputComponent },
    { path: '', redirectTo: '/input', pathMatch: 'full' }
];