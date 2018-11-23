Vue.component('task-list', {
    template: `<ul>
        <task v-for="task in tasks">{{ task.name }}</task>
    </ul>`,
    data() {
        return {
            tasks: [
                { name: 'Go to the store', complete: false },
                { name: 'Go to the email', complete: true },
                { name: 'Go to the farm', complete: true },
                { name: 'Go to work', complete: false },
            ]
        }
    }
});

Vue.component('task', {
    template: '<li><slot></slot></li>'
});