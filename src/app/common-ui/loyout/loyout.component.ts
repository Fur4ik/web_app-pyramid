import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import {PopupComponent} from '../popup/popup.component';

@Component({
  selector: 'app-loyout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, PopupComponent],
  templateUrl: './loyout.component.html',
  styleUrls: ['./loyout.component.scss']
})

export class LoyoutComponent {
}
