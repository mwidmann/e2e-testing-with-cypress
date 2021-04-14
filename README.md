# e2e testing the vn.at login form with Cypress.io

This is the final codebase for the e2e testing with Cypress.io talk.

To get started, clone this project and an the following command in your shell.

```bash
npm install
```

Once installed you have two scripts set up in `package.json`.

- `npm run cy:open` - opens cypress in its full glory for development and all the nice stuff it provides
- `npm run test:e2e` - runs cypress in headless mode (used on CI)

More information about the requirements for running Cypress.io in your CI can be found [here](https://docs.cypress.io/guides/continuous-integration/introduction).

## Notes

As seen in the talk (while the demo was still working 😭) I refactored the login functionality out to a custom command stored in `cypress/support/commands.js`. There's plenty more you can do with such commands. See [Custom Commands](https://docs.cypress.io/api/cypress-api/custom-commands) in the Docs.

As I'm not going to share the actual log in data, this version uses a fully mocked out login api using fixtures. See `cypress/integration/login-with-fixtures.spec.js` for this. One of the cooles features of Cypress.io is how easy it is to intercept any kind of http traffic going in or coming out from your application.

For example the call to the cookiebot javascript loaded from `https://consent.cookiebot.com/uc.js` is mocked and returns an empty function. This is very useful and helps you speed up your tests, as cypress doesn't have to evaluate all those 3rd party js libraries being loaded by your marketing team.

This is achieved with `cy.intercept`, one of the most powerful APIs in cypress. See [intercept](https://docs.cypress.io/api/commands/intercept) for more information.

Last but not least, `cypress/integration/fixtures-are-fun.spec.js` shows a fun and easy way to use intercept for shits and giggles. 😉 While this example just shows how simple it is to replace all images with a fixture there could also be performance benefits from using this approach as it would allow you to keep using the one small image you have in your fixtures folder, instead of downloading all images from the web.

## Resources

The community behind cypress is lovely and very helpful. These are resources I'd recommend.

- [The Cypress.io documentation](https://docs.cypress.io/guides/overview/why-cypress)
- [Gleb Bahmutov's blog](https://glebbahmutov.com/blog/). Gleb works at Cypress and has a really good blog about real world challenges with e2e testing (in cypress). His youtube channel is also very recommended.
- [Cypress.io Gitter community](https://gitter.im/cypress-io/cypress)
- [Cypress.io Youtube channel](https://www.youtube.com/channel/UC-EOsTo2l2x39e4JmSaWNRQ) with great talks, case studies and intros.
- [The Cypress twitter account](https://twitter.com/Cypress_io) for announcments and links to great resources
- [The Cypress.io German Community](https://www.meetup.com/cypress-de-community) is new, but the topics talked about there are very interesting.
- [Cypress Testing Library](https://testing-library.com/docs/cypress-testing-library/intro/) add useful functionality from the testing library to be used in cypress.

If there are any questions I'd be happy to answer them. Please contact me on Slack.