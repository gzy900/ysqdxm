<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu clearfix">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="'https://cdn.mp.txtkeji.com/txt/pictures/logo.png'" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>主页</el-dropdown-item>
          </router-link>
          <router-link to="/system/account">
            <el-dropdown-item>修改密码</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-select v-model="hospital.name" placeholder="请选择医院" :class="`clearfix ${hospital.name ? '' : 'guide'}`" style="line-height: 50px; float: right; margin-right: 50px; min-width: 250px;" @change="onSelectHospital">
      <el-option
        v-for="item in hospitals"
        :key="item.id"
        :label="item.name"
        :value="item.name"
      />
    </el-select>
    <div v-if="!hospital.name" class="fullscreen-mask" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getList, getHospital } from '../../api/hospital'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      departments: [],
      input: '测试输入内容',
      hospitals: []
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'hospital'
    ])
  },
  created() {
    this.getAllHospital()
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    async getAllDepartment() {
      let result
      try {
        result = await getList()
      } catch (error) {
        return console.error(error)
      }
      this.departments = result.data.data
    },
    async onSelectDepartment(param) {
      const [hospitalId, departmentId] = param.split('-')
      this.$store.commit('app/SET_HOSPITAL', hospitalId)
      this.$store.commit('app/SET_DEPARTMENT', departmentId)
    },
    async getAllHospital() {
      let result
      try {
        result = await getHospital()
      } catch (error) {
        return console.error(error)
      }
      this.hospitals = result.data.data.data
      if (!this.hospital || !this.hospital.name) {
        const [current] = result.data.data.data
        this.$store.commit('app/SET_HOSPITAL', current)
        localStorage.setItem('hospital', JSON.stringify(current))
      }
    },
    onSelectHospital(hospitalName) {
      this.getAllHospital()
      const currentHospital = this.hospitals.find((item) => {
        return item.name === hospitalName
      })
      this.$store.commit('app/SET_HOSPITAL', currentHospital)
      localStorage.setItem('hospital', JSON.stringify(currentHospital))
    }
  }
}
</script>

<style lang="scss" scoped>
.clearfix {
  &::after {
    display: block;
    content: "";
    clear: both;
  }
}
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
.guide {
  z-index: 101;
}
.fullscreen-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(100, 100, 100, .8);
  z-index: 100;
}
</style>
