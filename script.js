const skills = {
    data: null,
    skillsList: document.querySelector('dl.skills-list'),

    compareByLevelAscending: (a, b) => a.level - b.level,
    compareByLevelDescending: (a, b) => b.level - a.level,

    compareByNameAscending: (a, b) => skills.compareByNameDescending(b, a),
    compareByNameDescending: (a, b) => a.name.localeCompare(b.name),

    generateList: function () {
        this.skillsList.innerHTML = '';

        this.data.forEach(e => {
            const skill = document.createElement('dt'),
                  level = document.createElement('dd'),
                  levelData = document.createElement('div'),
                  icon = document.createElement('i');

            skill.className = `skill-${e.name}`;
            skill.innerText = ` ${e.name.replace(/^\w/, (c) => c.toUpperCase())}`; // Capitalize string

            level.className = `level`;
            levelData.style.width = `${e.level}%`;
            levelData.innerText = levelData.style.width;

            let addition = '';
            switch (e.name) {
                case 'html':
                    addition = '5'; break;
                case 'css':
                    addition = '3-alt';
            }
            icon.classList.add(e.name != 'c' ? `fa-brands` : 'fa-regular',
                               `fa-${e.name != 'c' ? e.name : 'file-code'}${addition}`);

            this.skillsList.append(skill);
            skill.prepend(icon);
            this.skillsList.append(level);
            level.append(levelData);
        })
    }
}

function generateSkills(json) {
    skills.data = json
    skills.generateList();

    document.querySelector('#sort-skills').addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            switch ([...e.target.classList].join(', ')) {
                case 'sort-skills-by-level':
                    skills.data.sort(skills.compareByLevelDescending);
                    e.target.classList.toggle('ascending');
                    break;

                case 'sort-skills-by-level, ascending':
                    skills.data.sort(skills.compareByLevelAscending);
                    e.target.classList.toggle('ascending');
                    break;

                case 'sort-skills-by-name':
                    skills.data.sort(skills.compareByNameAscending);
                    e.target.classList.toggle('descending');
                    break;

                case 'sort-skills-by-name, descending':
                    skills.data.sort(skills.compareByNameDescending);
                    e.target.classList.toggle('descending');

            }
            skills.generateList();
        }
    })
}

fetch('db/skills.json')
    .then(data => data.json())
    .then(json => generateSkills(json))
    .catch(() => console.error('Что-то пошло не так...'))