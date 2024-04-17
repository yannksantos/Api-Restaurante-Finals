import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { delay } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-usuario',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './loginUsuario.component.html',
  styleUrl: './loginUsuario.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginUsuarioComponent {


  constructor(private toaster:ToastrService){
  }

  private router = inject(Router)
  private formBuilder = inject(FormBuilder)
  private loginService = inject(UserService)

  public loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  onLoginClick() {
    if (this.loginForm.valid) {
      console.log('Email:', this.loginForm.value.email);
      console.log('Senha:', this.loginForm.value.senha);

      this.loginService.login(this.loginForm.value.email , this.loginForm.value.senha ).pipe(delay(1000)).subscribe(
        token =>  {
          console.log(token)
          this.router.navigate(['/home'])
        }
      )
    }
  }

  onCadastrarClick(){
    this.router.navigate(['cadastro'])
  }
 }
