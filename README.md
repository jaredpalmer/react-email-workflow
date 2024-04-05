# React Email Workflow
[![Build Status](https://travis-ci.org/jaredpalmer/react-email-workflow.svg?branch=master)](https://travis-ci.org/jaredpalmer/react-email-workflow) [![Code Climate](https://codeclimate.com/github/jaredpalmer/react-email-workflow/badges/gpa.svg)](https://codeclimate.com/github/jaredpalmer/react-email-workflow) [![Test Coverage](https://codeclimate.com/github/jaredpalmer/react-email-workflow/badges/coverage.svg)](https://codeclimate.com/github/jaredpalmer/react-email-workflow/coverage) [![Dependency Status](https://david-dm.org/jaredpalmer/react-email-workflow.svg)](https://david-dm.org/jaredpalmer/react-email-workflow) [![devDependency Status](https://david-dm.org/jaredpalmer/react-email-workflow/dev-status.svg)](https://david-dm.org/jaredpalmer/react-email-workflow#info=devDependencies) [![Issue Count](https://codeclimate.com/github/jaredpalmer/react-email-workflow/badges/issue_count.svg)](https://codeclimate.com/github/jaredpalmer/react-email-workflow) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)


A drag-and-drop newsletter design tool.

#### Features
- Drag and drop support
- Worker services for web scraping and CSS inlining connected through RabbitMQ
- Livereload both rendered and HTML view.
- Basic Components: Link, Heading, Text, and custom HTML (with Codemirror editor)


### Screenshot
![Screenshot](https://cloud.githubusercontent.com/assets/4060187/13156316/e2bcd9f6-d64f-11e5-9686-852ad92f148d.gif)

### Development
#### Under the Hood
 - React
 - JSXStyle
 - Redux
 - Babel ES6 / Webpack
 - Express
 - Node
 - RabbitMQ
 - Premailer

#### Getting started
Open up your terminal and navigate to the directory of your choice. Clone the repository and install its dependencies.
```bash
git clone https://github.com/jaredpalmer/react-email-workflow.git MyEmailApp
cd MyEmailApp
npm install

# if you don't have RabbitMQ installed locally yet...
brew services install rabbitmq
```
Create a `.env` file in your root directory as follows. If you are not running RabbitMQ locally,
also enter your CLOUDAMQP_URL.
```bash
# .env
CLOUDAMQP_URL=XXXXXXXXXXXXXXXXXXXX # RabbitMQ URL
```
#### Run in development mode
Enter the following command in your terminal:
```bash
brew services start rabbitmq
heroku local -f Procfile.local
```
This will start an Express server with Webpack Dev + Hot Middleware and on `localhost:5000`.
It will watch for changes from the `client` dir.

#### Run in production mode
```bash
heroku local
```

#### Testing
As a one off thing:
```bash
npm test
```

I like to put `mocha` in `watch` mode when I am writing reducers etc.
```bash
npm test -- --watch
```

#### Styles
When you examine the codebase you'll notice a lack of CSS files, except for `global.css`. I encourage you read up on the documentation. 90% of the time, jsxstyle is fantastic. However, due to a lack of psuedo selectors, certain things can get annoying...like hover states. Checkout `components/Button.js` to see how to work around this.

#### Email Template
This is left up to you. Basically, you are in charge of your templating functions and converting the element tree into your own email. Checkout `services/premail/createHTML.js`.

### Deployment
This is meant for Heroku at the moment

### Troubleshooting
The following will cover 95% of issues:

  1. Clear your browsers `localStorage`.
  - `rm -rf node_modules` and then `npm i`

### Roadmap 

  - [] Real Database, not just local storage
  - [] Save elements
  - [] Save templates
  - [] Tag, or search elements and templates
  - [] Images
    - [] From URL, Upload to S3 / CDN
    - [] Document how to setup a thumbor instance
  - [] Auth Flow
  - [] Custom CSS in HTML component
  - [] Button component
  - [] Spacer component
  - [] Drop React-dnd, up/down arrows would be more efficent
    - React-DnD-HTML5 also negated any hopes of mobile support, so this isn't very responsive, different ordering ui would change that.
  - [] WSYISWYG component (via draftjs??)
  - [] Test emails! (use nodemailer)
