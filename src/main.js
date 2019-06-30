let members = [
    {
        "id": "0",
        "name": "Kristoffer",
        "image": "src/members/kristoffer.png",
        "languages": "Javascript"
    }, {
        "id": "1",
        "name": "Nikolai",
        "languages": "Javascript"
    }, {
        "id": "2",
        "name": "Simen",
        "languages": "Python"
    }, {
        "id": "3",
        "name": "Markus",
        "languages": "Ingenting"
    }
];

let projects = [
    {
        "name": "Minesweeper",
        "html": "minesweeper.html"
    }, {
        "name": "Nanogram",
        "html": "nanogram.html"
    }
];



function projectTemplate(project) {
    return `
        <a href="${project.html}">${project.name}</a>
    `;
}

window.addEventListener('load', function () {
    document.getElementById('navigation-bar').innerHTML = `
    <a href="index.html">
    <img id="logo" src="src/index/logo_white_small.png">
    <h1>HJEM</h1>
    </a>

    <div class="navigation-projects">
    <button class="navigation-projects-button">PROSJEKTER</button>
    <img id="arrow" src="src/index/arrow_down.png">
    <div class="navigation-projects-content">
     ${projects.map(projectTemplate).join('')}
    </div>
    </div>
`});
