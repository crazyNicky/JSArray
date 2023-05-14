const yearElement = document.getElementById('year');
const currentYear = new Date().getFullYear();
yearElement.textContent = currentYear;

function invertColor(rgbColor) {
    // Schritt 1: Entfernen des "rgb(" am Anfang und ")" am Ende der Farbe
    rgbColor = rgbColor.slice(4, -1);
    // Schritt 2: Zerlegen der RGB-Komponenten in separate Variablen
    let rgbArray = rgbColor.split(',');
    let red = parseInt(rgbArray[0]);
    let green = parseInt(rgbArray[1]);
    let blue = parseInt(rgbArray[2]);
    // Schritt 3: Negieren jeder Komponente
    red = 255 - red;
    green = 255 - green;
    blue = 255 - blue;
    // Schritt 4: Setzen  der negiertem Farbe als RGB-String zurück
    let invertedColor = 'rgb(' + red + ',' + green + ',' + blue + ')';
    return invertedColor;
}
function darkLight(){
    let rootElement = document.querySelector(":root");
    let colorG = invertColor(window.getComputedStyle(rootElement).getPropertyValue("--color-global"));
    let colorG_BG = invertColor(window.getComputedStyle(rootElement).getPropertyValue("--background-color-global"));
    let colorI = invertColor(window.getComputedStyle(rootElement).getPropertyValue("--color-input"));
    let colorI_BG = invertColor(window.getComputedStyle(rootElement).getPropertyValue("--background-color-input"));
    let colorH = invertColor(window.getComputedStyle(rootElement).getPropertyValue("--color-hover"));
    let colorH_BG = invertColor(window.getComputedStyle(rootElement).getPropertyValue("--background-color-hover"));
    let colorS = invertColor(window.getComputedStyle(rootElement).getPropertyValue("--background-color-switch"));
    
    let idTemp = window.getComputedStyle(rootElement).getPropertyValue("--id-show");
    let iTemp = document.querySelector("#"+idTemp);
    rootElement.style.setProperty("--id-show", window.getComputedStyle(rootElement).getPropertyValue("--id-hide"));
    rootElement.style.setProperty("--id-hide", idTemp);
    document.getElementById("team").setAttribute("href",!(idTemp=="bvb")?"https://www.bvb.de/":"https://schalke04.de/")
    iTemp.setAttribute("id", window.getComputedStyle(rootElement).getPropertyValue("--id-show")); 
    
    rootElement.style.setProperty("--color-global", colorG);
    rootElement.style.setProperty("--background-color-global", colorG_BG);
    rootElement.style.setProperty("--color-input", colorI);
    rootElement.style.setProperty("--background-color-input", colorI_BG);
    rootElement.style.setProperty("--color-hover", colorH);
    rootElement.style.setProperty("--background-color-hover", colorH_BG);
    rootElement.style.setProperty("--background-color-switch", colorS);
}