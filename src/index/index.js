

function memberTemplate(member) {
    return `
    <div class="member">
            <img src="${member.image ? member.image : "src/index/user.png"}">
            <h4>${member.name}</h4>
            <p>${member.languages}</p>
        </div>
    `;
}

window.addEventListener('load', function () {
    document.getElementById('members-wrapper').innerHTML = `
        ${members.map(memberTemplate).join('')}
    `;
    document.getElementById('members-title').innerHTML = members.length + " personer";
    document.getElementById('projects-count').innerHTML = projects.length + " prosjekter";

});