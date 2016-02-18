# react-email-workflow
[![Build Status](https://travis-ci.org/jaredpalmer/react-email-workflow.svg?branch=master)](https://travis-ci.org/jaredpalmer/react-email-workflow) [![Code Climate](https://codeclimate.com/github/jaredpalmer/react-email-workflow/badges/gpa.svg)](https://codeclimate.com/github/jaredpalmer/react-email-workflow) [![Test Coverage](https://codeclimate.com/github/jaredpalmer/react-email-workflow/badges/coverage.svg)](https://codeclimate.com/github/jaredpalmer/react-email-workflow/coverage) [![Issue Count](https://codeclimate.com/github/jaredpalmer/react-email-workflow/badges/issue_count.svg)](https://codeclimate.com/github/jaredpalmer/react-email-workflow)

#### The easiest way to create an email digest newsletter. You do the curation, and this tool makes sure it looks good.

## Screenshot
![Screenshot](https://cloud.githubusercontent.com/assets/4060187/13156316/e2bcd9f6-d64f-11e5-9686-852ad92f148d.gif)

## Features
- Battle-tested default template
- Drag and drop components
- CSS Inliner + Livereload
- Customizeable components and colors

## Development
REW is built with an awesome setup...
- React
- Redux
- React-DnD
- jsxstyle
- Webpack
- Express
- Premailer
- Embedly or Unfluff for webscraping

### Webpack + React Hot Loader
```bash
git clone 
npm install
npm start
```

### Run in production mode
```bash
npm run start:prod
```

### Testing
REW uses mocha and chai for testing. Isparta and codeclimate.
```bash
npm run test # for one off tests
```

```bash
npm run test:watch  # for test driven development
```


In order to get webscraping to work, you'll need an embedly account and API key.
Then create a `.env` file in your root directory as follows.

```bash
# .env
EMBEDLY=XXXXXXXXXXXXXXXXXX   # Embedly API Key
```

## Deployment
You can deploy REW to Heroku. This config supports Heroku's new pipeline + Github integration.

