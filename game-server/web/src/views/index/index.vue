<template>
  <div class="page">
    <p class="page-bg"></p>
    <div class="body">
      <div class="login" v-if="!loginStatus">

      </div>
      <div class="game-list" v-else>

        <div class="game-item" v-for="item in gameList" :key="item.name" @click="routerGame(item)">
          <p class="game-title">{{ item.name }}</p>
          <p class="game-people-num">
            <i class="iconfont icon-spot"></i> X {{ item.people }}
          </p>
          <p class="game-describe">{{ item.describe }}</p>
        </div>

      </div>
      <player></player>
    </div>
  </div>
</template>

<script>
import Player from '../../components/Player/index'

// x1 = x0 + r * Math.cos(angle * Math.PI / 180)
//
// y1 = y0 + r * Math.sin(angle * Math.PI/180)

export default {
  name: "index",
  components: {Player},
  data() {
    return {
      loginStatus: true,
      gameList: [
        {
          name: '狼口逃生',
          describe: '青青草原的小肥羊们到底能不能逃脱灰太狼的魔爪呢。少侠等你来战',
          people: '10',
          router: ''
        },
        {
          name: '快乐粉刷匠',
          describe: '粉刷刷粉刷刷粉刷刷',
          people: '10',
          router: ''
        },
        {
          name: '双人打飞机',
          describe: '少侠，一起来打飞机',
          people: '10',
          router: ''
        },
        {
          name: '绝命左轮之救赎',
          describe: '屏幕中间一把左轮，周围一圈玩家，依次开枪，左轮转向下一个玩家。中奖则枪中打出一个礼盒',
          people: '10',
          router: ''
        },
        {
          name: '绝命左轮之救赎 疯狂版',
          describe: '还是屏幕中一把左轮，每轮玩家依次开枪，开枪前选择 装填子弹数，最多六颗，最少一颗。六颗赌卡壳。枪没响则加分。',
          people: '10',
          router: ''
        },
        {
          name: '小猪佩奇跳水坑',
          describe: '左侧随机出现水坑，右侧一只猪。按住蓄力，蓄力越久跳的越远。跳的越靠近水坑中心，得分越高。',
          people: '10',
          router: ''
        },
        {
          name: '野猪佩奇跳水坑',
          describe: '规则与小猪一样，但多了一个高度蓄力。高度蓄力不是越久越高，越是越靠近一个中心点越高。水花与水坑中心越近和高度成正比',
          people: '10',
          router: ''
        },
        {
          name: '二战之钢铁洪流',
          describe: '坦克大战对抗版',
          people: '10',
          router: ''
        }
      ]
    }
  },
  methods: {
    routerGame(item) {
      console.log(item)
    }
  }
}
</script>

<style scoped>

.game-list {
  width: 100%;
  height: auto;
  padding: .5rem;
  overflow: hidden;
}

.game-list .game-item {
  width: 100%;
  background-color: rgba(255, 255, 255, .3);
  padding: .8rem;
  margin-top: .8rem;
  border-radius: 4px;
  overflow: hidden;
}

.game-item > p {
  float: left;
  margin-bottom: .4rem;
  height: 1rem;
  line-height: 1rem;
}

.game-item .game-title {
  width: 65%;
  font-size: .8rem;
  font-weight: bold;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.game-item .game-describe {
  width: 100%;
  height: 1rem;
  font-size: .7rem;
  color: rgba(102, 102, 102, .8);

  margin-bottom: 0;


  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.game-item .game-people-num {
  width: 25%;
  margin-left: 10%;
  height: 1rem;
  font-size: .7rem;
  text-align: right;
  color: rgba(102, 102, 102, .8);


  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}


.page {
  width: 100%;
  height: 100%;
  color: rgba(51, 51, 51, .8);
  font-size: .7rem;
}

.page-bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  filter: blur(50px);

  background-image: url('../../assets/image/bg1.jpg');
  background-size: auto 100%;
  background-position: center;
}

.body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
