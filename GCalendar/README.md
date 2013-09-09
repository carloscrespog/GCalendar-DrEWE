# GCalendar-DrEWE

A Node.js module that simplifies the use of RESTful Google Calendar API without any interaction with the user, retrieve all events on a given calendar and send them to a GSN server

## How to Install

```bash
npm install 
```


## How to use

```bash
node GCalendar.js 
```

Inside the config.js you can find six important parameters:

  - consumer_key    : Client ID for your project, you'll obtain it once you've registered your project in the [API Console](https://code.google.com/apis/console/)
  - consumer_secret : Client secret for your project, same as above
  - redirect_url : you must grant access to this url in the API Console,
  - access_token : access token for your application,
  - refresh_token : refresh token for your application,
  - calendarId: your calendar's ID, it can be obtained from google calendar normal service

Despite there are several methods to retrieve the token, I hardly encourage to go to [Google Oauth Playground](https://developers.google.com/oauthplayground/) and configure it to "Use your own OAuth credentials"

## License

```
Copyright 2013 UPM-GSI: Group of Intelligent Systems - Universidad Politécnica de Madrid (UPM)

Licensed under the Apache License, Version 2.0 (the "License"); 
You may not use this file except in compliance with the License. 
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0 Unless required by 
applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific 
language governing permissions and limitations under the License.
```
![GSI Logo](http://gsi.dit.upm.es/templates/jgsi/images/logo.png)

This project has been developed as the master thesis of [Carlos Crespo](https://github.com/carloscrespog) under the tutelage of [Miguel Coronado](https://github.com/miguelcb84) and the supervision of [Carlos A. Iglesias](https://github.com/cif2cif) at [gsi-upm](https://github.com/gsi-upm)