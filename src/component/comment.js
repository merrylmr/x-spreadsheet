import { h } from './element';

export default class Comment {
  constructor() {
    this.el = h('div', 'comments')
      .children(
        this.titleEl = h('div', 'title'),
        this.contentEl = h('div', 'content')
      );
    this.el.hide();
  }

  init(title, content) {
    this.titleEl.html(title || '修改建议');
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
    top
  }) {
    this.init(title, content);
    this.setPos({
      left,
      top
    });
    this.el.show();
  }

  hideComment() {
    this.el.hide()
  }
}