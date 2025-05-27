# Tallerazo Landing Page - Angular Implementation

This project is an Angular implementation of the Tallerazo landing page, a platform for car repair shop management.

## Features

- Responsive design using Tailwind CSS v3.4.1
- Smooth scrolling navigation with SSR compatibility
- Mobile-friendly navigation with toggle functionality
- Modular component architecture
- Dynamic content rendering
- SSR (Server-Side Rendering) ready implementation

## Project Structure

The application is built with a component-based architecture following Angular best practices:

- **Header Component**: Navigation bar with mobile-responsive menu
- **Hero Component**: Main banner section
- **Services Component**: Services offered by Tallerazo
- **About Component**: Information about the platform
- **CTA Component**: Call to action section
- **Plans Component**: Pricing plans
- **Team Component**: Team members showcase
- **Footer Component**: Site footer with dynamic year and social links

## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm start
   ```
4. Open your browser and navigate to `http://localhost:4200/`

## Technologies Used

- Angular 19
- Tailwind CSS 3.4.1
- TypeScript 5.4+
- HTML5/CSS3
- SSR (Server-Side Rendering)

## Implemented Functionality

- **Smooth Scrolling**: Clicking on navigation links smoothly scrolls to the corresponding section
- **Mobile Navigation**: Responsive menu for mobile devices with toggle functionality
- **Dynamic Year**: Footer automatically displays the current year
- **Responsive Design**: Fully responsive layout that works on all device sizes
- **SSR Compatibility**: Components safely handle Server-Side Rendering without DOM-related errors
- **Performance Optimized**: Tailwind CSS setup optimized for production builds

## Future Enhancements

- Add animations for better user experience
- Implement form validation for contact forms
- Add multilingual support
- Integrate with backend services for actual booking functionality
