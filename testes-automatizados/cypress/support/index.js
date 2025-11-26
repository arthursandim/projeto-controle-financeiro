// ************************************************************
// Support File - Central entry point for Cypress configuration
// Imported automatically before each spec file
// ************************************************************

// Import custom commands (will be populated as we create them)
import './commands.js';

// Suppress specific logs
const app = window.top;
if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
  const style = app.document.createElement('style');
  style.innerHTML =
    '.command-name-request, .command-name-xhr { display: none }';
  style.setAttribute('data-hide-command-log-request', '');

  app.document.head.appendChild(style);
}
