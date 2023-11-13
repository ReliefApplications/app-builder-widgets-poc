# POC of Web Elements

## Introduction

This repository was created for a Proof of Concept, of Angular made Web Components.

[Web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) is the idea of creating reusable custom elements, injectable in any web application.

Web components presented by this project are created from this [repository](https://github.com/ReliefApplications/oort-frontend).

## Usage

### Authentication

Because the web components are duplicating widgets, loading data from a protected system, it is needed to authenticate the user.

This is handled in the PoC by [oidc-client](https://www.npmjs.com/package/oidc-client) library.

App builder needs to use tokens stored in local storage with key `idtoken`.

The file `main.js` first asks the user to login, redirecting it to login page provided by the system ( in that case, https://id-dev.oortcloud.tech/ ).

After login, the token will be stored in local storage, and web components will be able to use it. If the token is valid, the API will be able to consume it.

### Embed Web Components

Web components code is put in `app-builder.js` file. The code is built in the Angular repository.

In Angular repository of the front-end, the command `npm run bundle:widgets` will first build the widgets sub-project, and then put all generated files into a single file, that can be distributed.

Code must be loaded in a script tag, in html:

```html
<script type="text/javascript" src="/app-builder.js"></script>
```

The javascript file of Web Components declares four different widgets:

- application-widget
- workflow-widget
- dashboard-widget
- form-widget

All these widgets can be used as a html tag, like so:

```html
<dashboard-widget></dashboard-widget>
```

Each widget then has its own API. API is composed of inputs and outputs.

#### Inputs

##### ID:

```html
<dashboard-widget id="<id>"></dashboard-widget>
```

Where `<id>` is the identifier of the component to display.

Putting id as attribute will allow the widget to load the data of the component, in order to display it, as in main system.

ID API is avaible for the four types of widgets.

#### Outputs

##### pages

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
Where `widget` is a reference to the html element ( in that case, a `<application-widget>` tag).

As in Angular, components can create events, and leave the possibility to other components to subscribe to them.
In VanillaJS, it is possible to use EventListener in order to do so.
System is then able to interpret the event, based on its own logic.
