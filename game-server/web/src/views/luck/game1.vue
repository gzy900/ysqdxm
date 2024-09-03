<template>
  <div class="index" @click="handleClick" @touchstart.prevent @touchmove.prevent @touchend.prevent>
    <div class="game" v-if="loading">
      <div class="list1">
        <p class="player" v-for="item in 9"
           :style="{transform: 'scale('+(0.9+playerList[item]['gameData'].click/30)+')'}"
           :key="item">
          <!--          {{-->
          <!--            playerList[item + 3].name-->
          <!--          }}-->
          <img :src="heroList[playerList[item].hero]"/>

        </p>
      </div>
      <div class="list2">
        <p class="player" v-for="item in 9" :key="item"
           :style="{transform: 'scale('+(0.9+playerList[item+8]['gameData'].click/30)+')'}"
        >
          <img :src="heroList[playerList[item+8].hero]"/>

          <!--          {{-->
          <!--            playerList[item + 3].name-->
          <!--          }}-->
        </p>
      </div>
      <div class="playerMe">
        <p class="player " :style="{transform: 'scale('+(0.9+playerMe.click/30)+')'}" :key="'me'">
          <img :src="heroList[hero]"/>
        </p>
      </div>
    </div>
    <div class="game-load" v-if="gamePlay">
      <div class="mask"></div>
      <div class="game-load-body">
        <p>游戏开始倒计时：{{ gamePlayLoad }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      name: '',
      hero: '',
      loginType: false,
      ws: null,
      msg: '',
      key: '',
      loading: false,
      gamePlayLoad: 10,
      gamePlay: false,
      playGame: false,
      playerMe: {
        name: '',
        click: 1
      },
      playerList: [],
      time: null,
      heroList: {
        ly: require('../../assets/image/ly.gif'),
        gfm: require('../../assets/image/gfm.gif'),
        cjy: require('../../assets/image/cjy.gif'),
        dyj: require('../../assets/image/dyj.jpg'),
        twl: require('../../assets/image/twl.gif'),
        wwh: require('../../assets/image/wwh.jpg'),
        mj: require('../../assets/image/mj.jpg'),
        tzq: require('../../assets/image/tzq.jpg'),
        wq: require('../../assets/image/wq.png'),
        sml: require('../../assets/image/sml.jpg'),
        dyc: require('../../assets/image/dyc.gif'),
        sqw: require('../../assets/image/sqw.jpg'),
        qph: require('../../assets/image/qph.gif'),
        sy: require('../../assets/image/sy.gif'),
        hy: require('../../assets/image/hy.gif'),
        xx: require('../../assets/image/xx.gif'),
        xj: require('../../assets/image/xj.gif'),
        gzh: require('../../assets/image/gzh.gif'),
        zy: require('../../assets/image/zy.gif'),
      }
    }
  },
  mounted() {
    let userInfo = localStorage.getItem('userInfo')
    if (!userInfo) {        //未登录
      this.$router.push({name: 'luck'})
    } else {    // 已登录
      this.loginType = true
      userInfo = JSON.parse(userInfo)
      this.name = userInfo.name
      this.hero = userInfo.hero
      this.playerMe.name = userInfo.name
    }
    this.connection()
  },
  methods: {
    handleClick() {
      if (this.playGame) {
        this.playerMe.click++
      }
    },

    play() {
      this.gamePlay = true
      const time = setInterval(() => {
        this.gamePlayLoad--
        if (this.gamePlayLoad <= 0) {
          this.gamePlay = false
          this.startGame()
          clearInterval(time)
        }
      }, 1000)

    },
    startGame() {
      this.playGame = true
      this.time = setInterval(() => {
        const msg = {
          user: this.name,
          msg_type: '2',
          msg: {
            type: '1',
            click: this.playerMe.click,
            name: this.name
          }
        }
        this.ws.send(JSON.stringify(msg))
      }, 1000 / 30)
    },
    endGame() {
      this.$message({
        message: '游戏结束',
        type: 'warning'
      })
      clearInterval(this.time)
      this.playGame = false
    },

    // 建立连接
    connection() {
      const that = this
      this.ws = new WebSocket("ws://172.16.2.193:8080");
      this.ws.onopen = function () {
        console.log('数据连接成功');
        that.getPlayerInfo()
      }
      this.ws.onmessage = function (e) {
        // var stocksData = JSON.parse(e.data);
        const msg = JSON.parse(e.data)
        // console.log(msg)

        //
        if (msg.type === '0') {
          that.$message({
            message: msg.message,
            type: msg.msgType
          })
          if (msg.msgType === 'success') {
            that.loginType = true
            localStorage.setItem('userInfo', JSON.stringify({
              name: that.name,
              key: that.key,
              token: '',
              color: msg.msg.color,
              hero: msg.msg.hero,
            }))
          }
          return
        }

        // 游戏开始结束
        if (msg.type === '1') {
          if (msg.msg.gameType === '1') {
            if (msg.msg.gameStatus === 'start') {
              that.play()
            } else {
              that.endGame()
            }
          }
        }

        // 获取到玩家 游戏数据消息
        if (msg.type === '2') {
          msg.msg.forEach((item, index) => {
            if (item.name === that.name) {
              msg.msg.splice(index, 1)
            }
          })
          that.playerList = msg.msg
        }

        // 获取其他玩家信息
        if (msg.type === '3') {
          msg.msg.forEach((item, index) => {
            if (item.name === that.name) {
              msg.msg.splice(index, 1)
            }
          })
          that.playerList = msg.msg
          that.loading = true
        }

        // 获取中奖信息
        if (msg.type === '5' && msg.msg.luckType === '1') {
          that.$message({
            message: '恭喜 ' + msg.msg.name + ' 获得一等奖',
            type: 'success',
            duration: 0
          })
        }
      };
    },

    // 去请求其他玩家消息
    getPlayerInfo() {
      let msg = {}
      msg = {
        user: this.name,
        key: '',
        user_type: '1',
        msg_type: '3',
        msg: {}
      }
      this.ws.send(JSON.stringify(msg));
    },
    sendMessage() {
      let msg = {}
      msg = {
        user: this.name,
        key: '',
        user_type: '1',
        msg_type: '0',
        msg: {}
      }
      this.ws.send(JSON.stringify(msg));
      // 消息格式
      /*
      {
          user:'王琪'  发送消息人  *
          key:'', 长连接Key ，连接开始时返回。
          user_type:'0'  消息人类型  管理员admin(0)  或玩家player(1)  *
          msg_type:'0'  消息类型：0：登陆消息，1：游戏开始或结束消息。2：玩家游戏数据消息  *
          msg:'{}'
      }
       */
    },
  }
}
</script>

<style scoped>
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.game {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.list1 {
  width: auto;
  height: 100%;
  display: flex;
  float: left;
  flex-direction: column;
  justify-content: space-between;
}

.list2 {
  width: auto;
  height: 100%;
  display: flex;
  float: right;
  flex-direction: column;
  justify-content: space-between;
}

.list3 {
  width: 60px;
  float: right;
}

.player {
  width: auto;
  height: 10%;
  overflow: hidden;
  margin: 0;
  padding: 0;
  border: 1px solid #999;
  border-radius: 50%;
}

.player img {
  width: auto;
  height: 100%;
  float: left;
}

.playerMe {
  width: auto;
  height: 100%;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translateX(-50%);
}

</style>
