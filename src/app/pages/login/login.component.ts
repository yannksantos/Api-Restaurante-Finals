import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder , ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {

  public formBuilderService = inject(FormBuilder) 
  constructor(
    private router: Router,
    private userService: UserService,
    public authService: AuthService) {

  }

  protected loginForm = this.formBuilderService.group({
    email: ['' , Validators.required , Validators.email] ,
    senhas: ['' , Validators.required ]
  })

  get dadosForm() {
    return this, this.loginForm.controls;
  }
}
