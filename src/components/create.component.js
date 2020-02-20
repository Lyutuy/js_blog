import { Form } from '../core/form';
import { Component } from '../core/component';
import { Validators } from '../core/validators';
import { apiService } from '../services/api.service';

export class CreateComponent extends Component {
    constructor(id) {
        super(id);
    }

    init() {
        this.$el.addEventListener('submit', submitHandler.bind(this));

        this.form = new Form(this.$el, {
            title: [Validators.require],
            fulltext: [Validators.require, Validators.minLength(2)]
        });
    }
}

async function submitHandler(event) {
    event.preventDefault();

    if (this.form.isValid()) {
        const formData = {
            type: this.$el.type.value,
            date: new Date().toLocaleDateString(),
            ...this.form.value()
        }

        await apiService.createPost(formData);
        this.form.clear();
        alert('Запись создана!')
    }
}