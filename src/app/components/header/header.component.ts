import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent /*implements OnInit*/ {
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);

  constructor() { }



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
