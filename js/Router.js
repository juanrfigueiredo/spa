export class Router {
  routes = {};
  navLinks = [];

  constructor(navLinks) {
    this.navLinks = navLinks ?? [];
  }

  /**
   * @param {string} path the url path
   * @param {string} resource the relative path to the resource
   */
  add(path, resource, background) {
    this.routes[path] = { resource, background };
  }

  /**
   * route takes the path and retrieves the resource
   */
  route(event) {
    event = event || window.event;
    event?.preventDefault();
    if (event?.target?.href) window.history.pushState({}, "", event.target.href);
    this.handler();
  }

  /**
   * handles the fetching of the page resource and inserts into the first HTML element with the id app
   */
  handler() {
    const pathname = window.location.pathname;
    const route = this.routes[pathname].resource ?? this.routes[404].resource;
    this.changeBackground(this.routes[pathname].background);
    this.changeNavLink(pathname);
    fetch(route)
      .then((data) => data.text())
      .then((html) => {
        document.querySelector("#app").innerHTML = html;
      });
  }

  changeNavLink(pathname) {
    this.navLinks.forEach((nl) => {
      let href = nl.getAttribute("href");
      if (href === pathname) nl.classList.add("selected");
      else nl.classList.remove("selected");
    });
  }

  changeBackground(background){
    const dp = document.documentElement.style.getPropertyValue("--bg-image-body");
    if(dp !== background) document.documentElement.style.setProperty("--bg-image-body", background);
  }
}
