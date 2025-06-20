import { Component, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.css'
})
export class PlansComponent {
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);
  
  showModal = false;
  selectedPlan: any = null;
  
  // Form data
  purchaseData = {
    name: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  };

  constructor(private translate: TranslateService) { }
  
  openModal(plan: string, price: string): void {
    if (isPlatformBrowser(this.platformId)) {
      this.selectedPlan = { name: plan, price: price };
      this.showModal = true;
      document.body.classList.add('overflow-hidden');
    }
  }
  
  closeModal(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.showModal = false;
      document.body.classList.remove('overflow-hidden');
      this.resetForm();
    }
  }
    processPurchase(): void {
    // Here you would add the logic to process the payment
    const message = this.translate.instant('PLANS.PURCHASE_SUCCESS', { plan: this.selectedPlan.name });
    alert(message);
    this.closeModal();
  }
  
  resetForm(): void {
    this.purchaseData = {
      name: '',
      email: '',
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    };
  }
}
