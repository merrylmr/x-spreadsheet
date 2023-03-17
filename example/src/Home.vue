<template>
  <div>
    <div id="spread-sheet"></div>
  </div>
</template>

<script>

import SpreadSheet from '../../src';
import Test from '@/assets/test';
import TestJson from '@/assets/fake.json';

export default {
  name: 'home-page',
  data() {
    return {
      spreadsheet: null,
      options: {
        showToolbar: true,
        showGrid: true,
        showBottomBar: true,
        row: {
          len: 40000
        }
      }
    };
  },
  methods: {

    mockData(row, col) {
      const data = {
        rows: {
          len: row,
        }
      };
      for (let i = 0; i < row; i++) {
        const cells = {};
        for (let j = 0; j < col; j++) {
          cells[j] = { text: this.generateRandomString() };
        }
        data.rows[i] = { cells };
      }
      return data;
    },

    generateRandomString() {
      return Math.random()
          .toString(36)
          .substring();
    },
    init() {
      // const data = this.mockData(100000, 20);
      this.xspr = new SpreadSheet('#spread-sheet', this.options)
          .loadData({
            name: 'sheet1',
            // ...data
            ...TestJson,
            comments: {
              '0-0': 'test',
              '0-13': 'test2',
              '0-12': '宗教信仰',
              '18-0': 'xxxx',
              '19-0': 'xxxx'
            }
          });
      this.$once('hook:beforeDestroy', () => {
        this.xspr.sheet.destroy();
      });
      new Test();
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  }
};
</script>