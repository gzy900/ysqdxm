<template>
  <div class="index">

    <div class="game" @touchstart.prevent="touchstart" @touchend.prevent="touchend" @touchmove.prevent="touchmove">

      <canvas id="game-bg"></canvas>
      <canvas id="game-body"></canvas>

      <div class="handle">
        <p :style="touchStatus?{'transform':'translate('+(handleLeft+'px,')+(handleTop+'px')+')'}:{}"></p>
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
let gameBodyCtx = null
let gameBgCtx = null
let width = null
let height = null


let motion = false;
let motionTop = 0;      // 0 ,往上，1，往下，2，停止
let motionLeft = 0;   // 0 ,往左，1，往右，2，停止

let prizeList = []
let prizeImg = []
let prizeListNow = []
let prizeTime = null

let goodWidth = null

let heroGame = {
  x: 0,
  y: 0,
  speedX: 0,
  speedY: 0,
  img: null,
  time: false,
  color: null,
  prize: false
}
export default {
  name: "game3",
  data() {
    return {
      name: '',
      hero: '',
      // gameBody: null,
      // gameBg: null,

      touchStatus: false,
      handleLeft: 0,    // 计算 handleLeft    的值 ，大于15则往右，小于往左。 handleTop 同理。
      handleTop: 0,
      handX: 0,
      handY: 0,

      gamePlayLoad: 10,
      gamePlay: false,

      startGameStatus: false,

      time: null,
      playerList: {},
      prizeSrc: require('../../assets/image/prize.png'),
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
    this.isLogin()
    this.initCanvas()
    this.connection()

    prizeImg = new Image()
    prizeImg.onload = () => {
    }
    prizeImg.src = this.prizeSrc

    heroGame.img = new Image()
    heroGame.img.onload = () => {
      heroGame.time = setInterval(this.loop, 1000 / 30)
    }
    heroGame.img.src = this.heroList[this.hero]
  },
  methods: {
    play() {
      this.gamePlay = true
      const time = setInterval(() => {
        this.gamePlayLoad--
        if (this.gamePlayLoad <= 0) {
          this.gamePlay = false
          this.startGame()
          clearInterval(time)
          this.gamePlayLoad = 10
        }
      }, 1000)
    },
    startGame() {

      this.startGameStatus = true
      prizeTime = setInterval(() => {
        if (prizeList.length <= 0) {
          clearInterval(prizeTime)
          return
        }
        prizeListNow.push(prizeList.pop())
      }, 1000)

      this.time = setInterval(() => {
        const msg = {
          user: this.name,
          msg_type: '2',
          msg: {
            type: '3',
            x: heroGame.x / width,
            y: heroGame.y / height,
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
      this.startGameStatus = false
    },
    loopPlayer(msg) {
      // console.log(msg)
      msg = msg || []
      msg.forEach((item) => {
        this.playerList[item.hero].gameData.x = item.gameData.x * width
        this.playerList[item.hero].gameData.y = item.gameData.y * height
      })
    },
    loop() {

      gameBodyCtx.clearRect(0, 0, width, height)

      if (this.handleLeft < -8) {
        motionLeft = '0'
      } else if (this.handleLeft > 8) {
        motionLeft = '1'
      } else {
        motionLeft = '2'
      }

      if (this.handleTop < -8) {
        motionTop = '0'
      } else if (this.handleTop > 8) {
        motionTop = '1'
      } else {
        motionTop = '2'
      }

      if (motion) {
        if (motionLeft === '0') {
          heroGame.x -= heroGame.speedX
        } else if (motionLeft === '1') {
          heroGame.x += heroGame.speedX
        }
        if (motionTop === '0') {
          heroGame.y -= heroGame.speedY
        } else if (motionTop === '1') {
          heroGame.y += heroGame.speedY
        }
      }

      if (heroGame.x < 0) {
        heroGame.x = 0
      }
      if (heroGame.x > width - goodWidth) {
        heroGame.x = width - goodWidth
      }
      if (heroGame.y < 0) {
        heroGame.y = 0
      }
      if (heroGame.y > height - goodWidth) {
        heroGame.y = height - goodWidth
      }

      if (this.startGameStatus) {
        // 绘制元宝 与 循环检测碰撞
        prizeListNow.forEach((item, index) => {
          const px = item[0] * width
          const ph = item[1] * height
          gameBodyCtx.drawImage(prizeImg, px, ph, goodWidth, goodWidth)
          if (!heroGame.prize && heroGame.x < px + goodWidth && heroGame.x > px - goodWidth && heroGame.y < ph + goodWidth && heroGame.y > ph - goodWidth) {
            this.setPrize(index)
            heroGame.prize = true
            prizeListNow.splice(index, 1)
          }
        })
      }

      for (const item in this.playerList) {
        const player = this.playerList[item]

        gameBodyCtx.beginPath();
        gameBodyCtx.arc(player.gameData.x + width / 16, player.gameData.y + width / 16, width / 16, 0, 2 * Math.PI);
        gameBodyCtx.fillStyle = '#f3f4f5';
        gameBodyCtx.fill();

        gameBodyCtx.drawImage(player.img, player.gameData.x, player.gameData.y, goodWidth, width / 8)
        if (player.Yuanbao) {
          gameBodyCtx.drawImage(prizeImg, player.gameData.x + goodWidth / 2, player.gameData.y + goodWidth / 2, goodWidth, goodWidth)
        }
      }

      // 绘制自己的背景
      gameBodyCtx.beginPath();
      gameBodyCtx.arc(heroGame.x + width / 16, heroGame.y + width / 16, width / 16, 0, 2 * Math.PI);
      gameBodyCtx.fillStyle = '#f3f4f5';
      gameBodyCtx.fill();

      // 绘制自己英雄
      gameBodyCtx.drawImage(heroGame.img, heroGame.x, heroGame.y, goodWidth, goodWidth)

      if (heroGame.prize) {
        gameBodyCtx.drawImage(prizeImg, heroGame.x + goodWidth / 2, heroGame.y + goodWidth / 2, goodWidth, goodWidth)

      }
    },

    // 以获取到元宝，告知服务器
    setPrize(index) {
      let msg = {}
      msg = {
        user: this.name,
        key: '',
        user_type: '1',
        msg_type: '4',
        msg: {
          index: index,
          hero: this.hero
        }
      }
      this.ws.send(JSON.stringify(msg));
    },
    touchstart(e) {
      this.touchStatus = true
      e = e || {}
      const x = e.touches[0].clientX
      const y = e.touches[0].clientY
      this.handX = x
      this.handY = y
      motion = true
    },
    touchmove(e) {
      e = e || {}
      const x = e.touches[0].clientX
      const y = e.touches[0].clientY

      this.handleLeft += (x - this.handX)
      this.handleTop += (y - this.handY)

      if (this.handleLeft < -15) {
        this.handleLeft = -15
      }
      if (this.handleLeft > 15) {
        this.handleLeft = 15
      }
      if (this.handleTop < -15) {
        this.handleTop = -15
      }
      if (this.handleTop > 15) {
        this.handleTop = 15
      }
      this.handX = x
      this.handY = y
    },
    touchend(e) {
      motion = false
      this.handleLeft = 0
      this.handleTop = 0
      this.touchStatus = false
    },
    initPlayer(msg) {
      msg = msg || []
      msg.forEach((item) => {
        item.img = new Image()
        item.img.onload = () => {
          this.playerList[item.hero] = item
        }
        item.img.src = this.heroList[item.hero]
      })
    },
    initCanvas() {
      // 初始化画布
      width = document.body.clientWidth
      height = document.body.clientHeight
      const gameBody = document.getElementById('game-body')
      const gameBg = document.getElementById('game-bg')
      gameBody.width = width
      gameBody.height = height
      gameBg.width = width
      gameBg.height = height

      goodWidth = width / 8

      heroGame.speedX = width / 2 / 30
      heroGame.speedY = height / 5 / 30
      gameBodyCtx = gameBody.getContext('2d')
      gameBgCtx = gameBg.getContext('2d')
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
          if (msg.msg.gameType === '3') {
            if (msg.msg.gameStatus === 'start') {
              prizeList = msg.prize
              console.log(prizeList)
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
          that.loopPlayer(msg.msg)
        }

        // 获取其他玩家信息
        if (msg.type === '3') {
          msg.msg.forEach((item, index) => {
            if (item.name === that.name) {
              msg.msg.splice(index, 1)
            }
          })
          that.initPlayer(msg.msg)
          // that.loading = true
        }

        // 其他玩家金元宝消息
        if (msg.type === '4') {
          console.log(msg.msg)
          if (msg.msg.name !== that.name) {
            prizeListNow.splice(msg.msg.index, 1)
            that.playerList[msg.msg.hero].Yuanbao = true
          }
          // that.loading = true
        }

        // 获取中奖信息
        if (msg.type === '5' && msg.msg.luckType === '3') {
          that.$message({
            message: '恭喜 ' + msg.msg.name + ' 获得三等奖',
            type: 'success',
            duration: 0
          })
        }
      };
    },

    isLogin() {
      // localStorage.removeItem('userInfo')
      let userInfo = localStorage.getItem('userInfo')
      if (!userInfo) {        //未登录
        this.$router.push({name: 'luck'})
      } else {    // 已登录
        this.loginType = true
        userInfo = JSON.parse(userInfo)
        this.name = userInfo.name
        this.hero = userInfo.hero
        heroGame.color = userInfo.color
        // this.playerMe.name = userInfo.name
      }
    }
  }
}
</script>

<style scoped>
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  background-color: #F3F4F5;
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
}

.game {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
