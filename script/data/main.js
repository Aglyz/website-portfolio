const app = document.getElementById('app');
const body = document.getElementsByTagName('body')[0];

const root_url = body.id === "page-main" ? "view/" : "";
const asset_url = "https://assets.portfolio-agly.synology.me/assets/";
const icon_url = asset_url + "icons/";
const json_url = asset_url + "json/";
const svg_url = asset_url + "svg/";
const img_url = asset_url + "images/";

const project_components_dir = (body.id === "page-main" ? "script/" : "../script/") + "components/projects/";
const experience_components_dir = (body.id === "page-main" ? "script/" : "../script/") + "components/experiences/";

const breaks = [
    {attr: "content-sm"},
    {attr: "content-md"},
    {attr: "content-lg"},
    {attr: "content-xl"},
    {attr: "content-xxl"}
];

const pages = [
    { key: "page.bio",      name: "Bio",      path: "bio.html",       table: "bio-nav.json",  active: body.id === "page-bio" },
    { key: "page.projects", name: "Projets",  path: "projects.html",  table: "",              active: body.id === "page-projects" },
    { key: "page.contact",  name: "Contact",  path: "contact.html",   table: "",              active: body.id === "page-contact" }
];

// Global expose
window.app = app;
window.body = body;

window.root_url = root_url;
window.asset_url = asset_url;
window.icon_url = icon_url;
window.svg_url = svg_url;
window.img_url = img_url;

window.project_components_dir = project_components_dir;
window.experience_components_dir = experience_components_dir;

window.breaks = breaks;
window.pages = pages;