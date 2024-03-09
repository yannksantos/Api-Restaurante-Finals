import { Routes } from '@angular/router';
import { userGuard } from './guards/User.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent : () => import('./pages/loginUsuario/loginUsuario.component'),
    },
    {
        path: 'cadastro',
        loadComponent : () => import('./pages/cadastro/cadastro.component'),
    },
    {
        path: 'home',
        loadComponent : () => import('./pages/home/home.component'),
        canActivate: [userGuard]
    },
    {
        path: 'quemsomos',
        loadComponent : () => import('./pages/quemsomos/quemsomos.component'),
        canActivate: [userGuard]

    },
    {
        path: 'cardapio',
        loadComponent : () => import('./pages/cardapio/cardapio.component'),
        canActivate: [userGuard]

    },
    {
        path: 'dodia',
        loadComponent : () => import('./pages/doDia/doDia.component'),
        canActivate: [userGuard]
    },
    {
        path: 'carrinho',
        loadComponent : () => import('./pages/carrinho/carrinho.component'),
        canActivate: [userGuard]
    },
    {
        path: 'adicionaritem',
        loadComponent : () => import('./pages/adicionarItemsAdministrador/adicionarItemsAdministrador.component'),
        canActivate: [userGuard]
    },
    {
        path: 'configuracoes',
        loadComponent : () => import('./pages/config/config.component'),
        canActivate: [userGuard]
    },
    {
        path: 'pagamento',
        loadComponent : () => import('./pages/pagamento/pagamento.component'),
        canActivate: [userGuard]
    },
    {
        path: 'pedidos',
        loadComponent : () => import('./pages/pedidos/pedidos.component'),
        canActivate: [userGuard]
    },
];
