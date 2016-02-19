# React Email Workflow
[![Build Status](https://travis-ci.org/jaredpalmer/react-email-workflow.svg?branch=master)](https://travis-ci.org/jaredpalmer/react-email-workflow) [![Code Climate](https://codeclimate.com/github/jaredpalmer/react-email-workflow/badges/gpa.svg)](https://codeclimate.com/github/jaredpalmer/react-email-workflow) [![Test Coverage](https://codeclimate.com/github/jaredpalmer/react-email-workflow/badges/coverage.svg)](https://codeclimate.com/github/jaredpalmer/react-email-workflow/coverage) [![Issue Count](https://codeclimate.com/github/jaredpalmer/react-email-workflow/badges/issue_count.svg)](https://codeclimate.com/github/jaredpalmer/react-email-workflow)

A drag-and-drop newsletter design tool. Built with React, Redux, JSXStyle, Express, Premailer and Embedly.

#### Features
- Battle-tested default template
- Drag and drop support
- CSS Inliner via Premail
- Livereload both rendered and HTML view.
- Customizeable header and footer
- Basic Components: Link, Heading, Text, and custom HTML (with Codemirror editor)
- Custom CSS


### Screenshot
![Screenshot](https://cloud.githubusercontent.com/assets/4060187/13156316/e2bcd9f6-d64f-11e5-9686-852ad92f148d.gif)


### Development
#### Getting started
Open up your terminal and navigate to the directory of your choice. Clone the repository and install its dependencies.
```bash
git clone https://github.com/jaredpalmer/react-email-workflow.git MyEmailApp
cd MyEmailApp
npm install
```
In order to get webscraping to work, you'll need an Embedly account and an API key.
Then create a `.env` file in your root directory as follows.
```bash
# .env
EMBEDLY=XXXXXXXXXXXXXXXXXX   # Embedly API Key
```
#### Run in development mode
Open your `Procfile`. Comment out the first line and replace and add a second line as follows.
```bash
# web: npm run build && npm run start:prod  # production
web: npm run start # dev
```
Enter the following command in your terminal:
```bash
heroku local
```
This will start an Express server with Webpack Dev + Hot Middleware and React Hot Loader at `localhost:5000`. It will watch for changes on the frontend.

##### Styles
When you examine the codebase you'll notice a lack of CSS files. All styling is done through jsxstyle. I encourage you read up on the documentation. 95% of the time, jsxstyle is fantastic. However, due to a lack of psuedo selectors, certain things can get annoying...like hover states. Included are some helper classes like `<HoverRegion/>` and `<Button>` to help you out.

#### Run in production mode
Open your `Procfile` and comment out the development line, but now uncomment the production line:
```bash
web: npm run build && npm run start:prod  # production
```
This will compile the frontend and start an express server in production mode.
Open a browser to `localhost:5000`.

### Deployment
You can deploy REW to Heroku. This config supports Heroku's new pipeline + Github integration.

