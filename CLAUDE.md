# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern, responsive portfolio website built for SDE roles, featuring a clean single-page application using vanilla HTML, CSS, and JavaScript. The site showcases technical projects, skills, and professional information with a modern design system supporting light/dark/system themes.

## Architecture

### File Structure
- `index.html` - Modern semantic HTML with accessibility features
- `style.css` - Modern CSS with custom properties, CSS Grid, and Flexbox
- `script.js` - Modular ES6 JavaScript with class-based architecture
- `assets/` - Static assets including images, favicon, and resume PDF
- `robots.txt` - Search engine directives

### Key Features
- **Theme System** - Light/dark/system theme toggle with localStorage persistence and system preference detection
- **Responsive Navigation** - Mobile-first hamburger menu with smooth animations and proper accessibility
- **Modern Project Grid** - CSS Grid layout with hover effects and interactive overlays
- **Enhanced Contact Form** - Modal-based form with EmailJS integration, validation, and loading states
- **Performance Optimized** - Lazy loading, smooth scrolling, and optimized animations
- **Professional Content** - SDE-focused project descriptions with technical details and impact metrics

### Modern CSS Architecture
- **CSS Custom Properties** for theming with light/dark mode support
- **Modern Layout** using CSS Grid and Flexbox for responsive design
- **Design System** approach with consistent spacing, typography, and color scales
- **Component-based** styling with reusable classes (.btn, .card, .section-header)
- **Inter font** for modern, professional typography
- **Smooth animations** with optimized performance using CSS transforms

### JavaScript Architecture (Modular ES6 Classes)
- **ThemeManager** - Handles light/dark/system theme switching with localStorage
- **NavigationManager** - Responsive nav with smooth scrolling and active section detection  
- **TypingAnimation** - Customizable typing animation with multiple text rotation
- **ContactFormManager** - Complete modal form system with EmailJS integration
- **ScrollEffects** - Smooth scrolling and subtle parallax effects
- **PerformanceOptimizer** - Lazy loading and asset preloading
- **PortfolioApp** - Main application class that initializes all components

## Development

### Modern Development Approach
This is a static site built with modern web standards:
- ES6+ JavaScript with classes and modules
- Modern CSS with custom properties and advanced layout
- Semantic HTML5 with proper accessibility attributes
- Progressive enhancement principles

### Local Development
1. Open `index.html` directly in a modern browser, or
2. Use a local server: `python -m http.server 8000` or `npx serve`
3. For development, use browser dev tools to test responsive design
4. Theme toggle works immediately - test light/dark/system modes

### Key Technologies
- **CSS Grid & Flexbox** for modern layouts
- **CSS Custom Properties** for theming
- **Intersection Observer** for performance optimization
- **EmailJS** for serverless contact form
- **Font Awesome 6** for modern icons
- **Inter font** from Google Fonts

### Deployment
The site is deployed via GitHub Pages from the master branch: https://msun0320.github.io/portfolio-website

## Technical Implementation Details

### Theme System
The theme system supports three modes:
- **Light**: Clean, professional light theme
- **Dark**: Easy-on-eyes dark theme  
- **System**: Automatically follows user's system preference
- Themes persist in localStorage and apply on page load
- Smooth transitions between theme changes

### Responsive Design
- Mobile-first approach with breakpoints at 768px and 480px
- CSS Grid that adapts from multi-column to single-column layouts
- Touch-friendly navigation with proper tap targets
- Optimized typography scales with viewport size using `clamp()`

### Project Showcase
Modern card-based grid layout with:
- Hover effects with smooth transforms
- Image overlays with action buttons
- Technical skill tags with hover interactions
- Professional project descriptions focused on impact and technical details

### Contact Form Enhancement
- Modal with backdrop blur and smooth animations
- Form validation with inline error handling
- Loading states during submission
- Success/error feedback with auto-close
- Keyboard accessibility (Escape to close, focus management)

### Performance Features
- Lazy loading for images using `loading="lazy"`
- Intersection Observer for advanced lazy loading
- Smooth scrolling with `scroll-behavior: smooth`
- Optimized animations using CSS transforms
- Debounced scroll and resize event handlers

### SDE-Focused Content
- Technical project descriptions emphasizing problem-solving
- Skills organized by category (Languages, Frameworks, Tools, etc.)
- Professional statistics and metrics
- Resume download prominently featured
- GitHub and LinkedIn integration