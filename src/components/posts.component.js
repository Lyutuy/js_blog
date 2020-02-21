import { Component } from '../core/component';
import { apiService } from '../services/api.service';
import { TransformService } from '../services/transform.service';
import { renderPost } from '../../templates/post.template';


export class PostsComponent extends Component {
    constructor(id, { loader }) {
        super(id);
        this.loader = loader;
    }

    init() {
        this.$el.addEventListener('click', buttonHandler.bind(this));
    }

    async onShow() {
        this.loader.show();
        const fbData = await apiService.fetchPosts();
        const posts = TransformService.fireBaseObjToArr(fbData);
        const html = posts.map(post => renderPost(post, { withButton: true }));
        this.loader.hide();
        this.$el.insertAdjacentHTML('afterbegin', html.join(' '));
    }

    onHide() {
        this.$el.innerHTML = '';
    }
}


function buttonHandler(evet) {
    const $el = event.target;
    const id = $el.dataset.id;

    if (id) {
        let favoriets = JSON.parse(localStorage.getItem('favorites')) || [];

        if (favoriets.includes(id)) {
            //del element
            $el.textContent = 'Сохранить';
            $el.classList.add('button-primary');
            $el.classList.remove('button-danger');
            favoriets = favoriets.filter(fID => fID !== id)
        } else {
            //add element
            $el.textContent = 'Удалить';
            $el.classList.remove('button-primary');
            $el.classList.add('button-danger');
            favoriets.push(id);
        }
        //save id in Local Storage
        localStorage.setItem('favorites', JSON.stringify(favoriets));
    }
}