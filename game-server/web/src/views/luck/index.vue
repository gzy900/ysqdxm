<template>
  <div class="index">
    <div class="input" v-if="!loginType">
      <el-input v-model="name" property="请输入您的姓名！" placeholder="请输入您的名字"></el-input>
      <el-button class="button" @click="sendMessage">确定</el-button>
    </div>

    <div class="loginMsg" v-else>
      {{ name }} 您好，您已登录。<br>
      待 王彦祖 通知时，点击下方按钮进入游戏。 <br>
      <el-button class="button" @click="pushGame3">三等奖游戏</el-button>
      <br>
      <el-button class="button" @click="pushGame2">二等奖游戏</el-button>
      <br>
      <el-button class="button" @click="pushGame1">一等奖游戏</el-button>
      <br>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      name: '',
      loginType: false,
      ws: null,
      msg: '',
      key: ''
    }
  },
  mounted() {
    // localStorage.removeItem('userInfo')
    let userInfo = localStorage.getItem('userInfo')
    if (!userInfo) {        //未登录
      this.loginType = false
    } else {    // 已登录
      this.loginType = true
      userInfo = JSON.parse(userInfo)
      this.name = userInfo.name
    }
    this.connection()
  },
  methods: {

    // 建立连接
    connection() {
      this.ws = new WebSocket("ws://172.16.2.193:8080");
      this.ws.onopen = function () {
        console.log('数据连接成功');
      }
      const that = this
      this.ws.onmessage = function (e) {
        // var stocksData = JSON.parse(e.data);
        const msg = JSON.parse(e.data)
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
        }
      };
    },
    pushGame1() {
      this.$router.push({name: 'game1'})
    },
    pushGame2() {
      this.$router.push({name: 'game2'})
    },
    pushGame3() {
      this.$router.push({name: 'game3'})
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

.input {
  width: 68%;
  height: auto;
  position: absolute;
  top: 30%;
  left: 16%;
  text-align: center;
}

.button {
  margin-top: 20px;
}

.loginMsg {
  position: absolute;
  top: 20%;
  width: 80%;
  left: 10%;
  font-size: 16px;
  text-align: left;
  color: rgba(255, 255, 255, .9);
  line-height: 30px;
}
</style>
