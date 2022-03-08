const toggleButtons = {};

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

class Brightness {
    static light = "light";
    static dark = "dark";

    static opposite = (brightness) => brightness == Brightness.light ? Brightness.dark : Brightness.light;
}

(() => {
    console.log(Brightness.light)
    addToggleButton(Brightness.light, "Passa al tema scuro", "dark_mode");
    addToggleButton(Brightness.dark, "Passa al tema chiaro", "light_mode");

    const toggle = document.getElementById("toggle");
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    var brightness = prefersDarkScheme.matches ? Brightness.dark : Brightness.light;
    brightness = setMode(toggle, brightness);

    toggle.addEventListener("click", () => {
        brightness = setMode(toggle, brightness);
    });
})();    