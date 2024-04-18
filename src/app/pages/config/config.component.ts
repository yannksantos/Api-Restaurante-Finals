import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ToolbarComponent } from "../../components/toolbar/toolbar.component";
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cliente } from '../../interfaces/cliente';
import { ClienteService } from '../../services/cliente.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-config',
    standalone: true,
    templateUrl: './config.component.html',
    styleUrl: './config.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        ToolbarComponent,
        ReactiveFormsModule
    ]
})
export default class ConfigComponent implements OnInit { 


  constructor(private toaster:ToastrService){

  }

  private userService = inject(UserService)
  private clienteService = inject(ClienteService)
  private formBuilder = inject(FormBuilder)

  public clienteForm!: FormGroup;
  public buscarForm!: FormGroup;

  ngOnInit(): void {
    this.onMostrarUser();

    this.clienteForm = this.formBuilder.group({
      Nome: ['', Validators.required],
      Sobrenome: ['', Validators.required],
      Telefone: ['', Validators.required],
      CPF: ['', Validators.required], 
      Endereco: this.formBuilder.group({
        Rua: ['', Validators.required],
        NumeroCasa: ['', Validators.required],
        CEP: ['', Validators.required]
      })
    });
    
    this.buscarForm = this.formBuilder.group({
      Buscar: ['', Validators.required]
    })
  

  }

  protected userName = ''
  protected emails = ''

  onMostrarUser(){
    this.emails = this.userService.nomeUser();
    const email = this.userService.nomeUser();
  
  if (email.includes('@')) {
    this.userName = email.split('@')[0];
  } else {
    this.userName = email;
  }
 }

 onSalvar(){
  if (this.clienteForm.valid) {
    const cliente : Cliente = this.clienteForm.value;
    this.clienteService.AdicionarCliente(cliente).subscribe(() => console.log('Cliente adicionado'))
    this.toaster.success("Sucesso", 'Cliente salvo!',{
      positionClass:'toast-top-center',timeOut:1000
    })
    console.log(this.clienteForm.value)
    } else {
    console.log('Formulário inválido');
    }
  }

  onBuscar(){
    const buscar : string = this.buscarForm?.get('Buscar')?.value;
    if (buscar) {
      this.clienteService.ObterClienteCPF(buscar).subscribe(
        (cliente: any) => {
          console.log('Cliente encontrado', cliente);
          this.preencherFormulario(cliente);
          const nomecliente = cliente.nome
          this.toaster.success(nomecliente, 'Cliente encontrado!',{
            positionClass:'toast-top-center',timeOut:1000
          })
        },
        (erro) => {
          this.toaster.error('Digite corretamente os dados', 'Cliente nao encontrado!',{
            positionClass:'toast-top-center',timeOut:1000
          })
        }
      );
    } else {
      console.log('CPF não fornecido');
    }
  }
  
  
  preencherFormulario(cliente: any) {
    if (cliente && cliente.endereco) {
      this.clienteForm.patchValue({
        Nome: cliente.nome,
        Sobrenome: cliente.sobrenome,
        Telefone: cliente.telefone,
        CPF: cliente.cpf,
        Endereco: {
          Rua: cliente.endereco.rua,
          NumeroCasa: cliente.endereco.numeroCasa,
          CEP: cliente.endereco.cep
        }
      });
    } else {
      console.log('Cliente ou Endereco não definido');
    }
  }
}
  
