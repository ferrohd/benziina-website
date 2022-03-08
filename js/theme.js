class Brightness {
    static light = "light";
    static dark = "dark";

    static opposite = (brightness) => brightness == Brightness.light ? Brightness.dark : Brightness.light;
}

const toggleButtons = {};

let favicon = [];

const linkDetails = [
    {rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png"},
    {rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png"},
    {rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png"},
    {rel: "manifest", href: "/site.webmanifest"},
    {rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "foreground"},
];
const metaDetails = [
    {name: "msapplication-TileColor", content: "foreground"},
    {name: "theme-color", content: "background"},
];
const colors = {};
colors[Brightness.light] = {foreground: "#4464ad", background: "#ffffff"};
colors[Brightness.dark] = {foreground: "#e4733f", background: "#000000"};

function addToggleButton(brightness, title, icon) {
    const toggle = document.createElement("span");
    toggle.classList.add("material-icons-outlined");
    toggle.setAttribute("title", title);
    toggle.innerText = icon;
    toggleButtons[brightness] = toggle;
}

function setMode(toggle, brightness) {
    document.body.setAttribute("data-brightness", brightness);
    toggle.replaceChild(toggleButtons[brightness], toggle.firstChild);
    return Brightness.opposite(brightness);
}

function getFaviconElem(details, tagName, brightness) {
    const elem = document.createElement(tagName);
    for(const detail of Object.keys(details)) {
        let value = details[detail];
        if(detail == "href") {
            value = "img/icon/" + brightness + value;
        } else if(value == "foreground" || value == "background") {
            value = colors[brightness][value];
        }
        elem.setAttribute(detail, value);
    }
    return elem;
}

function setFavicon(brightness) {
    const elements = [];
    for(const link of linkDetails) {
        elements.push(getFaviconElem(link, "link", brightness));
    }
    for(const meta of metaDetails) {
        elements.push(getFaviconElem(meta, "meta", brightness));
    }
    for(const child of favicon) {
        document.head.removeChild(child);
    }   
    for(const child of elements) {
        document.head.appendChild(child);
    }
    favicon = elements; 
}

(() => {
    addToggleButton(Brightness.light, "Passa al tema scuro", "dark_mode");
    addToggleButton(Brightness.dark, "Passa al tema chiaro", "light_mode");

    const toggle = document.getElementById("toggle");
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    var brightness = prefersDarkScheme.matches ? Brightness.dark : Brightness.light;
    setFavicon(brightness);
    brightness = setMode(toggle, brightness);

    toggle.addEventListener("click", () => {
        setFavicon(brightness);
        brightness = setMode(toggle, brightness);
    });
})();    