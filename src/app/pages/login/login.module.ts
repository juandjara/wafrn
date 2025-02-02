import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { userLoggedGuard } from 'src/app/guards/user-logged.guard';

const routes: Routes = [
      {
        path: '',
        component: LoginComponent,
        canActivate: [userLoggedGuard]

      }
    ];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    RouterModule.forChild(routes)
  ]
})
export class LoginModule { }
