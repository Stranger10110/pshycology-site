const skills = [
    {name: 'html', level: 85},
    {name: 'css', level: 75},
    {name: 'python', level: 95},
    {name: 'c', level: 90}
];
const skillsList = document.querySelector('dl.skills-list');

skills.forEach(e => {
    const skill = document.createElement('dt');
    const level = document.createElement('dd');
    const level_data = document.createElement('div');
    const icon = document.createElement('i');

    skill.classList.add(`skill-${e.name}`);
    skill.innerText = ` ${e.name.replace(/^\w/, (c) => c.toUpperCase())}`; // Capitalize string

    level.classList.add(`level`);
    level_data.style.width = `${e.level}%`;
    level_data.innerText = level_data.style.width;

    let addition = '';
    switch (e.name) {
        case 'html':
            addition = '5';
            break;
        case 'css':
            addition = '3-alt';
    }
    icon.classList.add(e.name != 'c' ? `fa-brands` : 'fa-regular',
                       `fa-${e.name != 'c' ? e.name : 'file-code'}${addition}`);

    skillsList.append(skill);
    skill.prepend(icon);
    skillsList.append(level);
    level.append(level_data);
})