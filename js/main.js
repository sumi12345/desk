// 09 practical component exercise 1: message
Vue.component('message', {
    template: `
    <div class="alert alert-warning" v-show="isVisible">
        <button @click="hideModal" class="close" data-dismiss="alert"><span>&times;</span></button>
        <strong>{{ title }}</strong> {{ body }}
    </div>`,

    props: ['title', 'body'],

    data() {
        return {
            isVisible: true
        };
    },

    methods: {
        hideModal() {
            this.isVisible = false;
        }
    }
});

// 08 component within component
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

// 07 component
Vue.component('task', {
    template: '<li><slot></slot></li>'
});