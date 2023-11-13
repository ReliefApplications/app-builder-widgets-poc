document
  .getElementById("login")
  .addEventListener("click", redirectToLogin, false);

Oidc.Log.logger = console;
Oidc.Log.level = Oidc.Log.INFO;

// OIDC configuration
var settings = {
  // authority: process.env.AUTHORITY,
  // client_id: process.env.CLIENT_ID,
  // redirect_uri: process.env.REDIRECT_URI,
  authority: "https://id-dev.oortcloud.tech/auth/realms/oort",
  client_id: "oort-client",
  redirect_uri: "http://localhost:4200/",
  // redirect_uri: "https://widgets.oortcloud.tech/",
  response_type: "code",
  scope: "openid profile email offline_access",
  filterProtocolClaims: true,
  loadUserInfo: true,
};
var mgr = new Oidc.UserManager(settings);

/**
 * Redirect to login
 * @param {*} e click event
 */
function redirectToLogin(e) {
  e.preventDefault();

  mgr
    .signinRedirect({ state: "some data" })
    .then(function () {
      console.log("signinRedirect done");
    })
    .catch(function (err) {
      console.log(err);
    });
}

/**
 * Open a widget
 * @param {*} widget name of widget
 */
function openWidget(widget, id) {
  switch (widget) {
    case "application":
      console.log("change of application");
      console.log(id);
      document.getElementById(
        "widget"
      ).innerHTML = `<apb-application id=${id}></apb-application`;
      widget = document.querySelector("apb-application");
      widget.addEventListener(
        "pages",
        function (e) {
          setAppNavigation(e.detail);
        },
        false
      );
      widget.addEventListener("filterActive$", function (e) {
        filterBadge = document.getElementById("filter-badge");
        if (e.detail) {
          filterBadge.style.visibility = "visible";
        } else {
          filterBadge.style.visibility = "hidden";
        }
      });
      break;
    case "dashboard":
      document.getElementById(
        "widget"
      ).innerHTML = `<dashboard-widget id=${id}></dashboard-widget`;
      widget = document.querySelector("dashboard-widget");
      hideAppNavigation();
      break;
    case "form":
      document.getElementById(
        "widget"
      ).innerHTML = `<form-widget id=${id}></form-widget`;
      widget = document.querySelector("form-widget");
      hideAppNavigation();
      break;
    case "workflow":
      document.getElementById(
        "widget"
      ).innerHTML = `<workflow-widget id=${id}></workflow-widget`;
      widget = document.querySelector("workflow-widget");
      hideAppNavigation();
      break;
    default:
      break;
  }
}

function toggleFilter() {
  widget = document.querySelector("apb-application");
  if (widget) {
    widget.toggleFilter = true;
  }
}

/**
 * Update the current application page
 * @param {*} id page id
 */
function goToPage(id) {
  widget = document.querySelector("application-widget");
  widget.pageId = id;
}

/**
 * Display the list of application pages
 * @param {*} pages list of pages
 */
function setAppNavigation(pages) {
  console.log("ici");
  html = "";
  for (let page of pages) {
    html += `<li class="nav-item w-100 text-truncate"><button id='${page.id}' class="btn nav-link w-100 text-truncate">${page.name}</button></li>`;
  }
  navigation = document.getElementById("application-navigation");
  pagesNavigation = document.getElementById("application-pages");
  pagesNavigation.innerHTML = html;
  widget = document.getElementById("widget");
  widget.classList.remove("col");
  widget.classList.add("col-9");
  navigation.style.display = "inherit";
  for (let page of pages) {
    button = document.getElementById(page.id);
    button.addEventListener(
      "click",
      function () {
        goToPage(page.id);
      },
      false
    );
  }
}

/**
 * Removes the app navigation
 */
function hideAppNavigation() {
  console.log("hide");
  document.getElementById("application-navigation").style.display = "none";
  widget = document.getElementById("widget");
  widget.classList.remove("col-9");
  widget.classList.add("col");
}

/**
 * Handle the authentication response
 */
function processLoginResponse() {
  mgr
    .signinRedirectCallback()
    .then(function (user, bb) {
      localStorage.setItem("idtoken", user.access_token);
      document.getElementById("widget-navigation").style.visibility = "visible";
      // openWidget('application', '653b7d6e45408fa9b0c85614');
    })
    .catch(function (err) {
      console.log("Error completing auth code + pkce flow", err);
    });
}

/**
 * Look out for a authentication response, then log it and handle it
 */
if (window.location.href.indexOf("?") >= 0) {
  processLoginResponse();
}
