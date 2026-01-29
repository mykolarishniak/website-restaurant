import './commands';
import { mount } from 'cypress/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../src/frontend/context/AuthContext';
import { UserProvider } from '../../src/frontend/context/UserContext';
import { CartProvider } from '../../src/frontend/context/CartContext';
import '../../src/index.css';

Cypress.Commands.add('mount', (component, options = {}) => {
  const { withRouter = true, withProviders = true } = options;

  let wrapped = component;

  if (withProviders) {
    wrapped = (
      <AuthProvider>
        <UserProvider>
          <CartProvider>{wrapped}</CartProvider>
        </UserProvider>
      </AuthProvider>
    );
  }

  if (withRouter) {
    wrapped = <BrowserRouter>{wrapped}</BrowserRouter>;
  }

  return mount(wrapped);
});

Cypress.on('window:alert', () => true);
Cypress.on('window:confirm', () => true);
