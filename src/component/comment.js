import {h} from './element';
import {cssPrefix} from '../config';

export default class Comment {
    constructor() {
        this.el = h('div', `${cssPrefix}-comments`)
            .children(
                this.titleEl = h('div', `${cssPrefix}-comments-title`),
                this.contentEl = h('div', `${cssPrefix}-comments-content`),
            );
        this.el.hide();
    }

    init(title, content) {
        this.titleEl.html(title || '错误数据提示');
        this.contentEl.html(content);
        return this;
    }

    setPos(pos) {
        this.el.css('left', `${pos.left}px`)
            .css('top', `${pos.top}px`);
        return this;
    }

    showComment({
        title,
        content,
        left,
        top,
    }) {
        this.init(title, content);
        this.setPos({
            left,
            top,
        });
        this.el.show();
    }

    hideComment() {
        this.el.hide();
    }
}
