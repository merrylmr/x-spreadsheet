import { h } from './element';
import { cssPrefix } from '../config';
import Modal from './modal';
import Button from './button';

export default class SplitColumn extends Modal {
  constructor() {
    const html = `
   <div class="split-title">分隔符</div>
   <div class="options">
     <div>
      <input type="checkbox"  name="separator" class="separator" value="\t" />
      <label for="tab">Tab分隔符</label>
    </div>
     <div>
      <input type="checkbox"  name="separator" class="separator"   value=";" />
      <label for="semicolon">分号</label>
    </div>
    <div>
      <input type="checkbox"  name="separator" class="separator"   value="," />
      <label for="comma">逗号</label>
    </div>
    <div>
      <input type="checkbox"  name="separator" class="separator"  value="\s" />
      <label for="space">空格</label>
    </div>
    <div>
      <input type="checkbox"  name="separator" class="other separator" value="other" />
      <label for="other">其他</label>
      <input type="text" class="otherValue">
    </div>
</div>

    <div class="split-title">数据预览</div>
    <div class="split-preview">

</div>
`;
    // eslint-disable-next-line indent
        const options = h('div', 'split-column').html(html);
    super('文本分列', [options,
      h('div', `${cssPrefix}-buttons`).children(
        new Button('cancel').on('click', () => this.btnClick('cancel')),
        new Button('save', 'primary').on('click', () => this.btnClick('save')),
      )]);


    this.splitCoumn = [];
    this.checked = [];
    this.change = () => {
    };
    setTimeout(() => {
      const optionsDom = this.options.el.querySelectorAll('.separator');
      const otherValue = this.options.el.querySelector('.otherValue');
      const other = this.options.el.querySelector('.other');
      otherValue.addEventListener('blur', () => {
        if (otherValue.value && other.checked) {
          this.checked.push(otherValue.value);
        }
        const result = this.splitData(this.data);
        this.splitCoumn = result;
        this.previewData(result);
      });
      optionsDom.forEach((item) => {
        item.addEventListener('input', () => {
          console.log(item.value, item.checked);
          if (item.checked) {
            if (item.value === 'other') {
              if (otherValue.value) {
                this.checked.push(otherValue.value);
              }
            } else {
              this.checked.push(item.value);
            }
          } else if (item.value === 'other' && otherValue.value) {
            this.checked = this.checked.filter(it => it !== otherValue.value);
          } else {
            this.checked = this.checked.filter(it => it !== item.value);
          }
          console.log('this.checked', this.checked);


          const result = this.splitData(this.data);
          this.splitCoumn = result;
          this.previewData(result);
        });
      });
      console.log(optionsDom);
    });
    this.options = options;
  }

  btnClick(action) {
    console.log('action', action);
    if (action === 'save') {
      this.change(this.splitCoumn, Object.values(this.splitCoumn)[0].length);
    }
    this.resetData();
    this.hide();
  }

  resetData() {
    const optionsDom = this.options.el.querySelectorAll('.separator');
    optionsDom.forEach((item) => {
      item.checked = false;
    });
    const otherValue = this.options.el.querySelector('.otherValue');
    otherValue.value = '';
    this.checked = [];
  }

  buildRegex() {
    const regex = this.checked.map((item) => {
      if (item === '\s') {
        return '\\s';
      }
      return item;
    }).join('|');
    console.log('regex', regex, regex.length);
    if (regex) {
      return new RegExp(regex, 'g');
    }
    return '';
  }

  // 拆分data数据
  splitData(data) {
    const reg = this.buildRegex();
    const v = Object.values(data);
    const maxLength = reg ? Math.max(...v.map(str => str[0].split(reg).length)) : 1;

    const result = {};
    if (!reg) {
      return data;
    }
    for (const key in data) {
      const item = data[key];
      const splitted = item[0].split(reg);
      const diff = maxLength - splitted.length;
      const padding = new Array(diff).fill('');
      result[key] = [...splitted, ...padding];
    }
    return result;
  }

  showDlg(data) {
    this.previewData(data);
    // 拿到列数据，然后根据分隔符进行分割，然后展示
    this.data = data;
    this.splitCoumn = data;

    this.show();
  }

  previewData(v) {
    const data = Object.values(v);
    // 拿到列数据，然后根据分隔符进行分割，然后展示
    const previewDom = this.options.el.querySelector('.split-preview');
    console.log('data', previewDom, data);
    if (data && data.length > 0) {
      let previewHtml = '<table border cellpadding="5" cellspacing="0">';
      data.forEach((item) => {
        previewHtml += '<tr>';
        item.forEach((it) => {
          previewHtml += `
              <td>${it || ''}</td>`;
        });
        previewHtml += '</tr>';
      });
      previewHtml += '</table>';
      console.log('previewHtml:', previewHtml);
      previewDom.innerHTML = previewHtml;
    }
  }
}
