import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { ServicesComponent } from './components/services/services.component';
import { AboutComponent } from './components/about/about.component';
import { CtaComponent } from './components/cta/cta.component';
import { PlansComponent } from './components/plans/plans.component';
import { TeamComponent } from './components/team/team.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,  imports: [
    RouterOutlet, 
    CommonModule,
    HeaderComponent,
    HeroComponent,
    ServicesComponent,
    AboutComponent,
    CtaComponent,
    PlansComponent,
    TeamComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);
  
  title = 'Tallerazo';
  isMobileMenuOpen = false;
  activeSection = 'home';
  
  services = [
    {
      icon: 'https://img.icons8.com/?size=100&id=774&format=png&color=000000',
      title: 'Gestión de citas online',
      description: 'Reserva tu cita en el taller más cercano y disponible sin llamadas ni complicaciones.'
    },
    {
      icon: 'https://img.icons8.com/ios/50/follow.png',
      title: 'Seguimiento en tiempo real',
      description: 'Conoce el estado de la reparación de tu vehículo desde cualquier lugar.'
    },
    {
      icon: 'https://img.icons8.com/ios/50/chat-message--v1.png',
      title: 'Comunicación directa',
      description: 'Habla directamente con el taller, recibe actualizaciones, cotizaciones y reportes claros.'
    }
  ];
  
  teamMembers = [
    {
      name: 'Tulio Rodriguez',
      role: 'CEO & Fundador',
      image: './assets/img/team-1.jpg',
      bio: 'Experto en tecnología automotriz con más de 10 años de experiencia en la industria.'
    },
    {
      name: 'Ana María López',
      role: 'COO',
      image: './assets/img/team-2.jpg',
      bio: 'Especialista en operaciones y procesos con amplia experiencia en empresas de tecnología.'
    },
    {
      name: 'Carlos Mendoza',
      role: 'CTO',
      image: './assets/img/team-3.jpg',
      bio: 'Ingeniero de software con experiencia en desarrollo de aplicaciones móviles y web.'
    },
    {
      name: 'Laura Torres',
      role: 'CMO',
      image: './assets/img/team-4.jpg',
      bio: 'Experta en marketing digital y estrategias de crecimiento para startups.'
    }
  ];
  
  plans = [
    {
      name: 'Básico',
      price: '0',
      features: [
        'Acceso a la plataforma',
        'Gestión de citas básica',
        'Comunicación con clientes',
        'Reportes mensuales',
        'Soporte por email'
      ],
      cta: 'Comenzar gratis'
    },
    {
      name: 'Premium',
      price: '29.99',
      popular: true,
      features: [
        'Todas las características Básicas',
        'Integración con calendario',
        'Panel de control avanzado',
        'Reportes detallados',
        'Soporte prioritario 24/7'
      ],
      cta: 'Comenzar ahora'
    },
    {
      name: 'Empresarial',
      price: '79.99',
      features: [
        'Todas las características Premium',
        'API personalizada',
        'Onboarding personalizado',
        'Gerente de cuenta dedicado',
        'Soporte VIP'
      ],
      cta: 'Contactar ventas'
    }
  ];

  ngOnInit() {
    // Only run browser-specific code if we're in a browser
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    
    // Use setTimeout to ensure DOM is ready when running client-side
    setTimeout(() => {
      this.initializeClientSide();
    }, 0);
  }
  
  private initializeClientSide(): void {
    // Setup mobile navigation toggle
    const navToggleBtn = this.document.querySelector('[data-toggle-nav]');
    const navElement = this.document.querySelector('[data-navbar]');
    const navOverlay = this.document.querySelector('[data-nav-overlay]');
    
    if (navToggleBtn && navElement && navOverlay) {
      navToggleBtn.addEventListener('click', () => {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
        if (this.isMobileMenuOpen) {
          navElement.classList.remove('h-0');
          navElement.classList.add('h-auto');
          navOverlay.classList.remove('hidden');
          this.document.getElementById('line1')?.classList.add('rotate-45', 'translate-y-1.5');
          this.document.getElementById('line2')?.classList.add('opacity-0');
          this.document.getElementById('line3')?.classList.add('-rotate-45', '-translate-y-1.5');
        } else {
          navElement.classList.add('h-0');
          navElement.classList.remove('h-auto');
          navOverlay.classList.add('hidden');
          this.document.getElementById('line1')?.classList.remove('rotate-45', 'translate-y-1.5');
          this.document.getElementById('line2')?.classList.remove('opacity-0');
          this.document.getElementById('line3')?.classList.remove('-rotate-45', '-translate-y-1.5');
        }
      });
      
      navOverlay.addEventListener('click', () => {
        this.isMobileMenuOpen = false;
        navElement.classList.add('h-0');
        navElement.classList.remove('h-auto');
        navOverlay.classList.add('hidden');
        this.document.getElementById('line1')?.classList.remove('rotate-45', 'translate-y-1.5');
        this.document.getElementById('line2')?.classList.remove('opacity-0');
        this.document.getElementById('line3')?.classList.remove('-rotate-45', '-translate-y-1.5');
      });
    }
    
    // Smooth scroll for navigation links
    this.document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetElement = this.document.querySelector(targetId);
          if (targetElement) {
            this.activeSection = targetId.substring(1);
            targetElement.scrollIntoView({
              behavior: 'smooth'
            });
            this.closeMobileMenu();
          }
        }
      });
    });
  }
  
  closeMobileMenu(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    this.isMobileMenuOpen = false;
    const navElement = this.document.querySelector('[data-navbar]');
    const navOverlay = this.document.querySelector('[data-nav-overlay]');
    
    if (navElement && navOverlay) {
      navElement.classList.add('h-0');
      navElement.classList.remove('h-auto');
      navOverlay.classList.add('hidden');
      this.document.getElementById('line1')?.classList.remove('rotate-45', 'translate-y-1.5');
      this.document.getElementById('line2')?.classList.remove('opacity-0');
      this.document.getElementById('line3')?.classList.remove('-rotate-45', '-translate-y-1.5');
    }
  }
}
