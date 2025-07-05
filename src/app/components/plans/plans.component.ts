import { Component, PLATFORM_ID, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.css'
})
export class PlansComponent implements OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);
  
  showModal = false;
  selectedPlan: any = null;
  isLoading = false;
  isClosing = false;
  showSuccess = false;
  redirectCountdown = 5;
  private countdownInterval: any;
  
  // Form data
  purchaseData = {
    name: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  };

  // Form validation errors
  formErrors = {
    name: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  };

  constructor(private translate: TranslateService, private router: Router) { }
  
  // Nueva función para redirección directa (para el botón "Comenzar gratis")
  redirectToFrontEnd(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Redirect to home page or main application
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 300);
    }
  }
  
  openModal(plan: string, price: string): void {
    if (isPlatformBrowser(this.platformId)) {
      this.selectedPlan = { name: plan, price: price };
      this.showModal = true;
      this.isClosing = false;
      this.showSuccess = false;
      this.document.body.classList.add('overflow-hidden');
      this.resetForm();
    }
  }
  
  closeModal(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Clear any existing countdown
      if (this.countdownInterval) {
        clearInterval(this.countdownInterval);
        this.countdownInterval = null;
      }
      
      this.isClosing = true;
      setTimeout(() => {
        this.showModal = false;
        this.isClosing = false;
        this.document.body.classList.remove('overflow-hidden');
        this.resetForm();
      }, 300);
    }
  }

  validateForm(): boolean {
    let isValid = true;
    this.formErrors = {
      name: '',
      email: '',
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    };

    // Validate name
    if (!this.purchaseData.name.trim()) {
      this.formErrors.name = 'El nombre es obligatorio';
      isValid = false;
    } else if (this.purchaseData.name.trim().length < 2) {
      this.formErrors.name = 'El nombre debe tener al menos 2 caracteres';
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.purchaseData.email.trim()) {
      this.formErrors.email = 'El correo electrónico es obligatorio';
      isValid = false;
    } else if (!emailRegex.test(this.purchaseData.email)) {
      this.formErrors.email = 'Ingrese un correo electrónico válido';
      isValid = false;
    }

    // Validate card number
    const cardNumber = this.purchaseData.cardNumber.replace(/\s/g, '');
    if (!cardNumber) {
      this.formErrors.cardNumber = 'El número de tarjeta es obligatorio';
      isValid = false;
    } else if (cardNumber.length < 13 || cardNumber.length > 19) {
      this.formErrors.cardNumber = 'Número de tarjeta inválido';
      isValid = false;
    }

    // Validate expiry date
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!this.purchaseData.expiryDate) {
      this.formErrors.expiryDate = 'La fecha de expiración es obligatoria';
      isValid = false;
    } else if (!expiryRegex.test(this.purchaseData.expiryDate)) {
      this.formErrors.expiryDate = 'Formato inválido (MM/YY)';
      isValid = false;
    }

    // Validate CVV
    if (!this.purchaseData.cvv) {
      this.formErrors.cvv = 'El CVV es obligatorio';
      isValid = false;
    } else if (this.purchaseData.cvv.length < 3 || this.purchaseData.cvv.length > 4) {
      this.formErrors.cvv = 'CVV inválido (3-4 dígitos)';
      isValid = false;
    }

    return isValid;
  }

  formatCardNumber(event: any): void {
    let value = event.target.value.replace(/\s/g, '');
    let formattedValue = value.replace(/(.{4})/g, '$1 ');
    if (formattedValue.endsWith(' ')) {
      formattedValue = formattedValue.slice(0, -1);
    }
    this.purchaseData.cardNumber = formattedValue;
  }

  formatExpiryDate(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    this.purchaseData.expiryDate = value;
  }

  formatCvv(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    this.purchaseData.cvv = value;
  }

  processPurchase(): void {
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;

    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;
      this.showSuccess = true;
      this.startRedirectCountdown();
    }, 2000);
  }

  private startRedirectCountdown(): void {
    this.redirectCountdown = 5;
    
    this.countdownInterval = setInterval(() => {
      this.redirectCountdown--;
      
      if (this.redirectCountdown <= 0) {
        clearInterval(this.countdownInterval);
        this.redirectToHome();
      }
    }, 1000);
  }

  private redirectToHome(): void {
    // Close modal first
    this.closeModal();
    
    // Wait for modal close animation to complete, then redirect
    setTimeout(() => {
      if (isPlatformBrowser(this.platformId)) {
        // Scroll to top of the page smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Redirect to home page
        this.router.navigate(['/']);
      }
    }, 400);
  }
  
  resetForm(): void {
    this.purchaseData = {
      name: '',
      email: '',
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    };
    this.formErrors = {
      name: '',
      email: '',
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    };
    this.isLoading = false;
    this.showSuccess = false;
    this.redirectCountdown = 5;
    
    // Clear countdown interval if exists
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }
  }

  ngOnDestroy(): void {
    // Clean up interval on component destroy
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }
}
