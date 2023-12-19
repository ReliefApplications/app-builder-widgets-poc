document
  .getElementById("login")
  .addEventListener("click", redirectToLogin, false);

/**
 * Redirect to login
 * @param {*} e click event
 */
function redirectToLogin(e) {
  e.preventDefault();

  signIn();
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
function goToPage(path) {
  console.log(path);
  widget = document.querySelector("apb-application");
  widget.path = path;
}

/**
 * Display the list of application pages
 * @param {*} pages list of pages
 */
function setAppNavigation(pages) {
  navigation = document.getElementById("application-navigation");
  pagesNavigation = document.getElementById("application-pages");
  pagesNavigation.innerHTML = "";
  for (let page of pages) {
    console.log(page);
    if (page.visible) {
      let button = document.createElement("button");
      button.addEventListener(
        "click",
        function () {
          console.log("teggdf");
          goToPage(page.path);
        },
        false
      );
      button.classList.add("btn", "nav-link", "w-100", "text-truncate");
      button.textContent = page.name;

      let listItem = document.createElement("li");
      listItem.classList.add("nav-item", "w-100", "text-truncate");
      listItem.appendChild(button);

      pagesNavigation.appendChild(listItem);
    }
  }

  widget = document.getElementById("widget");
  widget.classList.remove("col");
  widget.classList.add("col-9");
  navigation.style.display = "inherit";
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

// There is an application to load
if (id) {
  openWidget("application", id);
  widget = document.querySelector("apb-application");
}
