import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';

@Component({
  selector: 'app-do-dia',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    ToolbarComponent
  ],
  templateUrl: './doDia.component.html',
  styleUrl: './doDia.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DoDiaComponent { }
