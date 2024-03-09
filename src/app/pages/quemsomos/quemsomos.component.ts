import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ToolbarComponent } from "../../components/toolbar/toolbar.component";

@Component({
    selector: 'app-quemsomos',
    standalone: true,
    templateUrl: './quemsomos.component.html',
    styleUrl: './quemsomos.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        NavbarComponent,
        ToolbarComponent
    ]
})
export default class QuemsomosComponent { }
