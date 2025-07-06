import { Component, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './cta.component.html',
  styleUrl: './cta.component.css'
})
export class CtaComponent {
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);

  redirectToWorkshop(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.document.defaultView?.open('https://chapa-tu-ruta-frontend.web.app/workshop/login', '_blank');
    }
  }
}
