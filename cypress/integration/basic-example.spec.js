/*
 * Copyright 2019 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

// <reference types="Cypress" />

/* global context, it, cy, expect, Cypress */

context('Helix Pages - basic example', () => {
  it('index.md content', () => {
    cy.visit(`https://helix-example-basic-adobe.${Cypress.env('TEST_DOMAIN')}/index.html`);

    // check various content pieces
    cy.title().should('include', 'Helix: Basic Example');
    cy.get('main h1').should('have.text', 'Helix: Basic Example');
    cy.get('main p').first().then(p => expect(p.text()).to.equal('It works, your Helix website is up and running!'));
  });

  it('static resources', () => {
    cy.visit(`https://helix-example-basic-adobe.${Cypress.env('TEST_DOMAIN')}/index.html`);

    // static resources are loaded
    cy.waitForResources('/style.css', '/scrani.js');

    // style in css is applied
    cy.get('body').should('have.css', 'background-color', 'rgb(173, 216, 230)');
  });
});
