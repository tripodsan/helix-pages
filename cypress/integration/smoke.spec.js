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

/* global context, it, cy, expect */

context('Helix Pages own content', () => {
  it('index.md content', () => {
    cy.visit('/index.html');

    // check various content pieces
    cy.title().should('include', 'Helix Pages');
    cy.get('h1').should('have.text', 'Helix Pages');
    cy.get('p').first().then(p => expect(p.text()).to.equal('Welcome to Helix Pages!'));
  });

  it('static resources', () => {
    cy.visit('/index.html');

    // static resources are loaded
    cy.waitForResources('/style.css', '/scrani.js');

    // style in css is applied
    cy.get('body').should('have.css', 'background-color', 'rgb(255, 255, 255)');
  });
});
