// 15 inline template
Vue.component('progress-view', {
    data() {
        return {
            completionRate: 50
        };
    },
    computed: {
        progressStyle() {
            return 'width: ' + this.completionRate + '%;';
        }
    }
});

// 14 named slots in a nutshell
Vue.component('panel', {
    template: `
<div class="panel panel-primary">
  <div class="panel-heading">
    <slot name="header">default panel title</slot>
  </div>
  
  <div class="panel-body">
    <slot name="body">default panel content</slot>
  </div>
  
  <div class="panel-footer">
    <slot name="footer">default panel footer</slot>
  </div>
</div>`,
});

// 13 component communication example 2: event dispatcher
window.Event = new Vue();

Vue.component('coupon2', {
    template: `<input v-on:blur="onCouponApply" class="form-control"/>`,

    methods: {
        onCouponApply() {
            Event.$emit('couponApply');
        }
    }
});

// 12 component communication example 1: custom events
Vue.component('coupon', {
    template: `<input v-on:blur="onCouponApply" class="form-control"/>`,

    methods: {
        onCouponApply() {
            this.$emit('apply');
        }
    }
});

// 10 practical component exercise 2: modal
Vue.component('modal', {
    template: `
    <div class="alert alert-warning">
        <button @click="$emit('close')" class="close" data-dismiss="alert"><span>&times;</span></button>
        <strong>{{ title }}</strong> {{ body }}
    </div>`,

    props: ['title', 'body'],
});

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