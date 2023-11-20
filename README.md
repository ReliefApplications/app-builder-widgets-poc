# POC of Web Elements

## Introduction

This repository was created for a Proof of Concept, of Angular made Web Components.

[Web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) is the idea of creating reusable custom elements, injectable in any web application.

Web components presented by this project are created from this [repository](https://github.com/ReliefApplications/oort-frontend).

POC is using Express handlebars.

## Usage

### Authentication

Because the web components are duplicating widgets, loading data from a protected system, it is needed to authenticate the user.

This is handled in the PoC by [oidc-client](https://www.npmjs.com/package/oidc-client) library.

App builder needs to use tokens stored in local storage with key `idtoken`.

The file `main.js` first asks the user to login, redirecting it to login page provided by the system.

After login, the token will be stored in local storage, and web components will be able to use it. If the token is valid, the API will be able to consume it.

### Embed Web Components

Web components code is loaded from a blob storage. The code is built in the Angular repository.

In Angular repository of the front-end, the command `npm run bundle:widgets` will first build the widgets sub-project, and then put all generated files into a single file, that can be distributed.

Code must be loaded in a script tag, in html:

```html
<script type="text/javascript" src="<url>"></script>
```

### API

When loaded, the code provides a web-element, that allows to load applications generated from the App Builder.

Web element tag is:
```html
<apb-application></apb-application>
```

#### Inputs
Web element has (so far) two inputs:

##### ID
ID of the application to load.

##### Path
Path to navigate to. Used by Angular router to navigate in the application.

#### Outputs
Web element has (so far) two outputs:

##### filterActive$
Indicates when a filter is used or not by the application.

##### pages
Return list of application pages.

Example:

```js
widget.addEventListener(
  "pages",
  function (e) {
    setAppNavigation(e.detail);
  },
  false
);
```

Where `widget` is a reference to the html element ( in that case, a `<apb-application>` tag).

As in Angular, components can create events, and leave the possibility to other components to subscribe to them.
In VanillaJS, it is possible to use EventListener in order to do so.
System is then able to interpret the event, based on its own logic.

#### Global variables
It is also possible to change some core elements, by setting global variables through javascript.

##### Base Href
Base href tells the browser where the script files will execute, and helpts the router to compose a navigation url.
If you host the code at the root of your platform, you don't need to think about it.
Nevertheless, if the platform is hosted at a certain path, you will need to change it.
As the base href can change depending on the platform that hosts the web elements, we put the configuration in a global variable, instead of an input.

Example:
```
<script>
  window.baseHref = '/widgets/';
</script>
```

Putting this code before you import the javascript to use App Builder's web elements will dynamically change the base href.
All router urls will start with your root url + '/widgets/'.
