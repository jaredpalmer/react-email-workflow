'use strict';

const moment = require('moment');

function button({
  type = 'primary',
  align = 'center',
  url = 'http://www.shellypalmer.com',
  title = 'Click Here',
}) {
  return `<table class="btn btn-${type}">
      <tr>
        <td align="${align}">
          <table>
            <tr>
              <td>
                <a href="${url}">${title}</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>`;
}

const renderElements = (elements) => {
  return elements
    .map((story, i) => {
      switch (story.kind) {
        case 'url':
          const cta = story.video ? 'Watch Now' : 'Read More';
          return `<h3><a class="story-title" href="${story.url}">${story.title}</a></h3>
            <p class="story-excerpt"><a class="story-excerpt-link" href="${story.url}">${story.content}</a></p>
            <p class="story-author"><a class="story-author-link" href="${story.url}">${cta}<span class="more"> · ${story.author}</span></a></p>`;
        case 'text':
          return `<p class="story-excerpt story-excerpt-link">${story.content}</p>`;
        case 'html':
          return `${story.content}`;
        case 'heading':
          return `<h3>${story.content}</h3>`;
        case 'button':
          return button(story);
        case 'image':
          return story.url
            ? `<a href="${story.url}"><img class="bodyImage" src="${story.src}" alt="" width="${story.width}" height="${story.height}"></a>`
            : `<img class="bodyImage" src="${story.src}" alt="" width="${story.width}" height="${story.height}">`;
        default:
          return ' ';
      }
    })
    .join(' ');
};

function createHTML(data, cb) {
  const presetOptions = {
    shelly: {
      title: 'ShellyPalmer',
      url: 'https://www.shellypalmer.com',
      subtitle: 'Think About This',
    },
    metacademy: {
      title: 'AI for Brand Marketers',
      url: 'https://www.shellypalmer.com/blog',
      subtitle: `By Shelly Palmer & Brand Innovators`,
    },
    aibrand: {
      title: 'AI Innovators',
      url: 'https://www.shellypalmer.com/ai',
      subtitle: `Today's Top Stories in AI & Emerging Tech`,
    },
    aibrand2: {
      title: 'AI Innovators',
      url: 'https://www.shellypalmer.com/ai',
      subtitle: `By Shelly Palmer`,
    },
  };
  const preset = presetOptions[data.meta.preset];
  const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta name="viewport" content="width=device-width" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>${data.meta.subject}</title>
    <style type="text/css">
    .btn {
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
      -premailer-width: 100%;
      width: 100%;
    }
    .btn > tr > td {
      padding-bottom: 15px;
    }
    .btn table {
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
      -premailer-width: auto;
      width: auto;
    }
    .btn table td {
      background-color: #fff;
      border-radius: 5px;
      text-align: center;
    }
    .btn a {
      background-color: #fff;
      border: solid 1px #0070ff;
      border-radius: 5px;
      color: #0070ff;
      cursor: pointer;
      display: inline-block;
      font-size: 14px;
      font-weight: bold;
      margin: 0;
      padding: 12px 25px;
      text-decoration: none;
    }
    .btn-primary table td {
      background-color: #0070ff;
    }
    .btn-primary a {
      background-color: #0070ff;
      border-color: #0050dd;
      color: #fff;
    }
    .btn-secondary table td {
      background-color: transparent;
    }
    .btn-secondary a {
      background-color: transparent;
      border-color: #0070ff;
      color: #0070ff;
    }
    .btn-twitter table td {
      background-color: #55acee;
    }
    .btn-twitter a {
      background-color: #55acee;
      border-color: #55acee;
      color: #fff;
    }
    .btn-facebook table td {
      background-color: #3b5998;
    }
    .btn-facebook a {
      background-color: #3b5998;
      border-color: #3b5998;
      color: #fff;
    }
    #outlook a {
      padding: 0;
    }
    /* Force Outlook to provide a "view in browser" menu link. */
    body {
      width: 100% !important;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      margin: 0;
      padding: 0;
      font-family: -apple-system,BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
      color: #141823;
      background-color: #ffffff;
    }
    /* Prevent Webkit and Windows Mobile platforms from changing default font sizes.*/
    .ExternalClass {
      width: 100%;
    }
    /* Force Hotmail to display emails at full width */
    .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td,
    .ExternalClass div {
      line-height: 100%;
    }
    #backgroundTable {
      margin: 0;
      padding: 10px;
      width: 100% !important;
      line-height: 100% !important;
    }
    /* End reset */
    body {
      -webkit-font-smoothing: antialiased;
      font-size: 14px;
      height: 100% !important;
      font-family:  -apple-system,BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
    }
    h1,
    h2,
    h3,
    h4 {
      color: #141823 !important;
      font-family:  -apple-system,BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
      font-weight: bold;
      line-height: 1.4em;
      margin: 0;
      margin-bottom: 6px;
    }
    h1 {
      font-size: 38px;
      font-weight: 300;
    }
    h2 {
      font-size: 24px;
    }
    h3 {
      font-size: 20px;
    }
    h4 {
      font-size: 14px;
      font-weight: 500;
    }
    p,
    ul,
    ol {
      font-family:  -apple-system,BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
      font-size: 16px;
      font-weight: normal;
      margin: 0;
      margin-bottom: 16px;
      line-height: 24px;
      color: #141823;
    }
    p li,
    ul li,
    ol li {
      list-style-position: inside;
      margin-left: 5px;
    }
    a {
      color: #0070ff;
      text-decoration: underline;
    }
    .purple {
      color: #9C27B0;
    }
    .story-title {
      text-decoration: none;
      color: #141823;
    }
    .story-excerpt {
      margin-bottom: 6px;
    }
    .story-excerpt-link {
      text-decoration: none;
      color: #595f6c;
    }
    .story-author {
      margin-bottom: 36px;
    }
    .story-author-link {
      text-decoration: none;
    }
    .story-author .more {
      color: #595f6c;
    }
    .logo {
      color: #141823;
      font-size: 38px;
      letter-spacing: -0.03em;
      text-decoration: none;
      font-weight: bold;
      display: block;
      margin-top: 24px;
      margin-bottom: 6px;
      line-height: 1;
    }
    .tagline {
      display: block;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-top: 8px;
      color: #0070ff;
    }
    .date {
      color: #595f6c;
      font-size: 14px;
      text-transform: uppercase;
      margin: 24px 0;
      display: block;
      letter-spacing: 0.08em;
    }
    .fine-print {
      font-size: 11px;
      color: #b7b7b7;
      line-height: 1.1;
      font-family:  -apple-system,BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
    }
    .fine-print a {
      font-size: 11px;
      line-height: 1.1;
      color: #0070ff;
    }
    .follow {
      margin-bottom: 36px;
    }
    .footer {
      padding-bottom: 36px;
    }
    .preheader {
      color: transparent;
      display: none;
      height: 0;
      max-height: 0;
      max-width: 0;
      opacity: 0;
      overflow: hidden;
      mso-hide: all;
      visibility: hidden;
      width: 0;
    }
    hr {
      background-color: #eee;
      color: #eee;
      border: 1px solid #eee;
      margin: 48px auto;
      width: 50px;
    }
    .hr-med {
      background-color: #eee;
      border: 1px solid #eee;
      color: #eee;
      margin: 24px auto;
      width: 50px;
    }
    .hr-strong {
      background-color: #555;
      border: 3px solid #555;
    }
    .stamp {
      font-size: 20px;
      margin: 48px auto;
      text-align: center;
    }
    ul {
      margin-left: 0 !important;
      padding-left: 0 !important;
    }
    li {
      padding-left: 0;
      margin-left: 0 !important;
    }
    .bodyImage {
      height: auto !important;
      max-width: 498px !important;
      width: 100% !important;
      margin-bottom: 16px;
    }
    @media only screen and (max-width: 480px) {
      .bodyImage {
        height: auto !important;
        max-width: 498px !important;
        width: 100% !important;
        margin-bottom: 16px;
      }
    }
    .listItem--first {
      margin-bottom: 16px;
    }
    .text3-pretty {
      font-family: Georgia, serif;
      font-style: italic;
      font-size: 24px;
      color: #999;
    }
    .padding-all-sm {
      padding: 0 12px 24px;
    }
    .margin-micro {
      padding-bottom: 6px;
    }
    .margin-small {
      padding-bottom: 12px;
    }
    .margin-med {
      padding-bottom: 24px;
    }
    .margin-big {
      padding-bottom: 36px;
    }
    .border {
      border: 1px solid #eee;
    }
    .text-center {
      text-align: center;
    }
    .text-left {
      text-align: left;
    }
    .lead {
      font-size: 15px;
      line-height: 20px;
      font-weight: 400;
      color: #595f6c;
    }
    .schedule-title {
      font-size: 28px;
      font-weight: bold;
      letter-spacing: -1px;
      padding: 36px 0 12px;
      line-height: 32px;
    }
    .schedule-day {
      letter-spacing: 1px;
      text-transform: uppercase;
      color: #7f7f7f;
      padding: 24px 0 12px;
    }
    .schedule-event-title {
      font-weight: bold;
      padding-bottom: 4px;
      line-height: 1.2;
    }
    .schedule-event-title a {
      text-decoration: none;
      color: #000;
    }
    .schedule-event-time {
      font-weight: 400;
      font-size: 13px;
      padding: 0 0 12px;
      color: #999999;
    }
    sup {
      font-size: 8px;
    }
    .heading {
      text-align: center;
    }
    </style>
  </head>
  <body>
    <table cellpadding="0" cellspacing="0" border="0" id="backgroundTable">
      <tbody>
        <tr>
          <td width="500" valign="top">
            <table cellpadding="0" cellspacing="0" border="0" align="center">
              <tbody>
                <tr>
                  <td width="498" class="container" valign="top">
                    <table>
                    </table>
                      <span class="preheader">${data.meta.preheader}</span>
                      <table cellpadding="0" cellspacing="0" border="0" align="center">
                        <tr>
                          <td width="498" class="container" align="center">
                            <h1><a class="logo" href="${preset.url}">${
    preset.title
  }</a></h1>
                            <p class="tagline">${preset.subtitle}</p>
                            <p class="date">${moment(
                              data.meta.date,
                              moment.ISO_8601
                            ).format('dddd, MMMM D, YYYY')}</p>
                          </td>
                        </tr>
                      </table>
                      <table class="main">
                        <tr>
                          <td class="wrapper">
                            <table>
                              <tr>
                                <td>
                                 ${renderElements(data.elements)}
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
   
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <table>
    </table>
  </body>
  </html>`;
  cb(html);
}

module.exports = createHTML;
