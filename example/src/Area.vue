<template>
  <div class="area" ref="area">
    <div class="top"
         :style="{height:area.top+'%'}">
      <div class="panel panel1"
           :style="{width: area.left+'%'}">{{ area.left }}
      </div>
      <div class="Resizer vertical"
           @mousedown="mouseDownHandle($event,'x')"></div>
      <div class="panel panel2"
           :style="{width: (100-area.left)+'%'}"></div>
    </div>
    <div class="Resizer horizontal"
         @mousedown="mouseDownHandle($event,'y')"></div>
    <div class="bottom"
         :style="{height:(100-area.top)+'%'}">
      <div class="panel"></div>
    </div>

  </div>
</template>


<script>
export default {
  name: 'area-page',
  data() {
    return {
      area: {
        left: 50,
        top: 50,
      },
      rect: {
        width: 1000,
        height: 1000
      }
    };
  },
  methods: {
    init() {
      const react = this.$refs.area.getBoundingClientRect();
      this.react = react;
    },
    mouseDownHandle(e, direction) {
      let startPos = {
        x: e.clientX,
        y: e.clientY
      };
      const mouseMoveHandle = (e) => {
        const pos = {
          x: e.clientX,
          y: e.clientY
        };
        if (e.clientX > this.react.width + this.react.left) {
          e.clientX = this.react.width + this.react.left;
        }
        if (e.clientY > this.react.height + this.react.top) {
          e.clientY = this.react.height + this.react.top;
        }
        const diff = {
          x: pos.x - startPos.x,
          y: pos.y - startPos.y
        };


        if (direction === 'y') {
          const rateY = (diff.y / this.react.height) * 100;
          if (this.area.top + rateY > 90) {
            this.area.top = 90;
          } else if (this.area.top + rateY < 10) {
            this.area.top = 10;
          } else {
            this.area.top = this.area.top + rateY;
          }
        } else {
          const rateX = (diff.x / this.react.width) * 100;
          if (this.area.left + rateX > 90) {
            this.area.left = 90;
          } else if (this.area.left + rateX < 10) {
            this.area.left = 10;
          } else {
            this.area.left = this.area.left + rateX;
          }
        }
        startPos = pos;
      };
      const mouseUpHandle = (e) => {
        console.log('mouseUpHandle33333', e);
        // 去更新x-spreadsheet的宽高
        document.removeEventListener('mousemove', mouseMoveHandle);
        document.removeEventListener('mouseup', mouseUpHandle);
      };
      document.addEventListener('mousemove', mouseMoveHandle);
      document.addEventListener('mouseup', mouseUpHandle);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  }
};
</script>

<style scoped lang="less">
.area {
  width: 800px;
  height: 500px;
  display: flex;
  flex-direction: column;

  .top {
    height: 60%;
    display: flex;
    min-height: 10%;

    .panel {
      flex: auto;
      width: 50%;
      min-width: 100px;
    }
  }

  .bottom {
    height: 40%;
    min-height: 10%;

    .panel {
      width: 100%;
      background-color: #000;
      height: 100%;

    }
  }
}

.Resizer {

}

.vertical {
  cursor: col-resize;
  width: 11px;
  margin: 0 -5px;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
}

.horizontal {
  width: 100%;
  height: 11px;
  cursor: ns-resize;
}

.panel1 {
  background-color: pink;
}

.panel2 {
  background-color: yellow;
}
</style>