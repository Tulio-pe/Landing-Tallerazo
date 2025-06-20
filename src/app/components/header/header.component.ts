import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);
  currentLang: string = 'en';
  constructor(private translate: TranslateService) {
    // Set default language
    this.translate.setDefaultLang('en');
    
    // Try to get language from localStorage if in browser environment
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('preferredLanguage');
      if (savedLang && (savedLang === 'en' || savedLang === 'es')) {
        this.currentLang = savedLang;
        this.translate.use(savedLang);
      } else {
        this.currentLang = 'en';
        this.translate.use('en');
      }
    } else {
      // For server-side rendering, default to English
      this.currentLang = 'en';
      this.translate.use('en');
    }
  }
  ngOnInit(): void {
    // Initialize browser-specific code
    if (isPlatformBrowser(this.platformId)) {
      // Uncomment if navbar initialization is needed
      // this.initNavbar();
    }
  }

  changeLanguage(lang: string): void {
    this.currentLang = lang;
    this.translate.use(lang);
    
    // Save language preference
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('preferredLanguage', lang);
    }
  }



/*
  ngOnInit(): void {
    // Only run browser-specific code if we're in a browser
    if (isPlatformBrowser(this.platformId)) {
      this.initNavbar();
      this.setupSmoothScrolling();
    }
  }
  initNavbar(): void {
    // Using timeout to ensure the DOM is fully loaded
    setTimeout(() => {
      const navButton = this.document.querySelector("[data-toggle-nav]") as HTMLElement;
      const navMenu = this.document.querySelector("[data-navbar]") as HTMLElement;
      const navOverlay = this.document.querySelector("[data-nav-overlay]") as HTMLElement;

      if (navButton && navMenu && navOverlay) {
        const toggleNavHandler = (): void => {
          const isOpen = navButton.getAttribute("data-open-nav") === "true";

          navButton.setAttribute("data-open-nav", isOpen ? "false" : "true");

          if (!isOpen) {
            navOverlay.classList.remove("hidden");
            this.document.body.classList.add("overflow-hidden");
            setTimeout(() => {
              navMenu.classList.add("show");
            }, 50);
          } else {
            navMenu.classList.remove("show");
            navOverlay.classList.add("hidden");
            this.document.body.classList.remove("overflow-hidden");
          }
        };

        navButton.addEventListener("click", toggleNavHandler);
        navOverlay.addEventListener("click", toggleNavHandler);
      }
    }, 0);
  }
  setupSmoothScrolling(): void {
    setTimeout(() => {
      const navLinks = this.document.querySelectorAll('a[href^="#"]');

      navLinks.forEach((link: Element) => {
        link.addEventListener('click', (e: Event) => {
          e.preventDefault();

          // Get the target element
          const targetId = link.getAttribute('href');
          if (!targetId || targetId === '#') return;

          const targetElement = this.document.querySelector(targetId);
          if (!targetElement) return;

          // Close mobile menu if open
          const navButton = this.document.querySelector("[data-toggle-nav]") as HTMLElement;
          const navMenu = this.document.querySelector("[data-navbar]") as HTMLElement;
          const navOverlay = this.document.querySelector("[data-nav-overlay]") as HTMLElement;

          if (navButton && navMenu && navOverlay) {
            const isOpen = navButton.getAttribute("data-open-nav") === "true";
            if (isOpen) {
              navButton.setAttribute("data-open-nav", "false");
              navMenu.classList.remove("show");
              navOverlay.classList.add("hidden");
              this.document.body.classList.remove("overflow-hidden");
            }
          }
            // Scroll to the target element
          window.scrollTo({
            top: (targetElement as HTMLElement).offsetTop - 80, // Offset for header height
            behavior: 'smooth'
          });
        });
      });
    }, 0);
  }
    // Removed language functionality
    */
}
