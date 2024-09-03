<template>
  <div class="index">
    <p>三等奖:
      <el-button @click="handleStart('3')">开始游戏</el-button>
      <el-button @click="handleEnd('3')">结束游戏</el-button>
    </p>
    <p>二等奖:
      <el-button @click="handleStart('2')">开始游戏</el-button>
      <el-button @click="handleEnd('2')">结束游戏</el-button>
    </p>
    <p>一等奖:
      <el-button @click="handleStart('1')">开始游戏</el-button>
      <el-button @click="handleEnd('1')">结束游戏</el-button>
    </p>
  </div>
</template>

<script>
export default {
  name: "control",
  data() {
    return {}
  },
  mounted() {
    this.connection()
  },
  methods: {
    /*
        {
            user:'王琪'  发送消息人  *
            key:'', 长连接Key ，连接开始时返回。
            user_type:'0'  消息人类型  管理员admin(0)  或玩家player(1)  *
            msg_type:'0'  消息类型：0：登陆消息，1：游戏开始或结束消息。2：游戏数据消息。3，获取其他玩家信息  *
            msg:'{}'
        }
         */
    handleStart(type) {
      let msg = {}
      msg = {
        user: '管理员',
        key: '',
        user_type: '0',
        msg_type: '1',
        msg: {
          gameType: type,
          gameStatus: 'start'
        }
      }
      this.ws.send(JSON.stringify(msg));
    },
    handleEnd(type) {
      let msg = {}
      msg = {
        user: '管理员',
        key: '',
        user_type: '0',
        msg_type: '1',
        msg: {
          gameType: type,
          gameStatus: 'end'
        }
      }
      this.ws.send(JSON.stringify(msg));
    },
    connection() {
      const that = this
      this.ws = new WebSocket("ws://172.16.2.193:8080");
      this.ws.onopen = function () {
        console.log('数据连接成功');
      }
      this.ws.onmessage = function (e) {
        const msg = JSON.parse(e.data)
        // console.log(msg)
        //
        if (msg.type === '1' && msg.msg.gameStatus === 'start') {
          console.log(msg)
          that.$message({
            message: '游戏开始',
            type: 'success'
          })
        }
        if (msg.type === '1' && msg.msg.gameStatus === 'end') {
          that.$message({
            message: '游戏结束',
            type: 'warning'
          })
        }
      };
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

p {
  margin-top: 30px;
}
</style>
