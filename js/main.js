import { Router } from "./Router.js";

const navLinks = document.querySelectorAll("#navLink");
const router = new Router(navLinks);

// add routes
router.add("/", "/pages/home.html","url(./images/home.png)");
router.add("/home", "/pages/home.html", "url(./images/home.png)");
router.add(404, "/pages/404.html", "url(./images/home.png)");
router.add("/ouniverso", "/pages/ouniverso.html", "url(./images/ouniverso.png)");
router.add("/exploracao", "/pages/exploracao.html", "url(./images/exploracao.png)");
router.handler();

// add events to the window
window.onpopstate = (event) => router.handler(event);
window.route = (event) => router.route(event);

document.documentElement.style.setProperty("--bg-image-body", "url(./images/home.png)");
router.route();
