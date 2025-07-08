import { Component, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);

  constructor() { }

  redirectToWorkshop(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.document.defaultView?.open('https://chapa-tu-ruta-frontend.web.app/workshops', '_blank');
    }
  }
}
