const skills = {
    data: [
        {name: 'html', level: 85},
        {name: 'css', level: 75},
        {name: 'python', level: 95},
        {name: 'c', level: 90}
    ],
    skillsList: document.querySelector('dl.skills-list'),

    compareByLevelAscending: (a, b) => a.level - b.level,
    compareByLevelDescending: (a, b) => b.level - a.level,
    compareByName: (a, b) => {
        if (a.name > b.name) { return 1; }
        if (a.name < b.name) { return -1; }
        return 0;
    },

    generateList: function () {
        this.skillsList.innerHTML = '';

        this.data.forEach(e => {
            const skill = document.createElement('dt');
            const level = document.createElement('dd');
            const level_data = document.createElement('div');
            const icon = document.createElement('i');

            skill.className = `skill-${e.name}`;
            skill.innerText = ` ${e.name.replace(/^\w/, (c) => c.toUpperCase())}`; // Capitalize string

            level.className = `level`;
            level_data.style.width = `${e.level}%`;
            level_data.innerText = level_data.style.width;

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
            level.append(level_data);
        })
    }
}

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
                console.log('boba 3');
                skills.data.sort(skills.compareByName);

        }
        skills.generateList();
    }
})