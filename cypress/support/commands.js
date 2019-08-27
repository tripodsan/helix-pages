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

/* global Cypress, cy */

// eslint-disable-next-line import/no-extraneous-dependencies
require('cypress-wait-until');

const { isPlainObject, last } = Cypress._;

/**
 * Adds command "cy.waitForResources(name1, name2, ...)"
 * that checks performance entries for resources that end with the given names.
 * This command will be available in every spec file.
 *
 * @example cy.waitForResources('base.css', 'app.css')
 *
 * You can pass additional options, like "timeout"
 *
 * @example cy.waitForResources('base.css', 'app.css', { timeout: 3000 })
 */
Cypress.Commands.add('waitForResources', (...args) => {
  let names;
  let options;

  if (isPlainObject(last(args))) {
    names = args.slice(0, args.length - 1);
    options = last(args);
  } else {
    names = args;
    options = {};
  }

  const log = false; // let's not log inner commands
  const timeout = options.timeout || Cypress.config('defaultCommandTimeout');

  cy.log(`Waiting for resources ${names.join(', ')}`);

  cy.window({ log }).then(
    // note that ".then" method has options first, callback second
    // https://on.cypress.io/then
    { log, timeout },
    win => new Cypress.Promise((resolve, reject) => {
      // flag set when we find all names
      let foundResources;
      let interval;

      // control how long we should try finding the resource
      // and if it is still not found. An explicit "reject"
      // allows us to show nice informative message
      setTimeout(() => {
        if (foundResources) {
          // nothing needs to be done, successfully found the resource
          return;
        }

        clearInterval(interval);
        reject(
          new Error(`Timed out waiting for resources ${names.join(', ')}`),
        );
      }, timeout);

      interval = setInterval(() => {
        foundResources = names.every(name => win.performance
          .getEntriesByType('resource')
          .find(item => item.name.endsWith(name)));
        if (!foundResources) {
          // some resource not found, will try again
          return;
        }

        cy.log('Found all resources');
        clearInterval(interval);
        resolve();
      }, 100);
    }),
  );
});
