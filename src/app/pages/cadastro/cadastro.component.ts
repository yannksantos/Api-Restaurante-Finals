import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CadastroComponent {

  private router = inject(Router)
  private formBuilder = inject(FormBuilder)
  private usersService = inject(UsersService)

  public loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      cpf: ['', Validators.required]
    });
  }

  onCadastrarClick() {
    if (this.loginForm.valid) {

      console.log('Email:', this.loginForm.value.email);
      console.log('Senha:', this.loginForm.value.senha);
      console.log('CPF:', this.loginForm.value.cpf);

      const user = this.loginForm.value
      console.log(this.loginForm.value , "do user")

      this.usersService.AdicionarUsuario( user ).pipe(delay(1500)).subscribe(
        resp =>  {
          console.log(user , "user logado")
          this.router.navigate([''])
        }
      )
    }
  }
 }
