<template>
  <div class="body">
    <section class="privacy-content">
      <span class="privacy-content-title">灵心隐私政策摘要</span>
      <span>更新时间：【2023】年【03】月【03】日</span>
      <span>生效时间：【2033】年【03】月【03】日</span>
      <span>灵心高度重视您的个人信息安全，我们将严格遵守法律法规，为您提供更加安全、可靠的服务。以下摘要能帮助您更直观、简洁地概览灵心隐私政策的内容。</span>

      <br>
      <span>1.我们收集的信息</span>
      <span>业务场景： 灵心注册</span>
      <span>收集方式： 通过第三方SDK</span>
      <span>信息类型： 运营商、网络，手机号</span>

      <br>
      <span>业务场景： 灵心个人信息设置</span>
      <span>收集方式： 您主动提供的信息</span>
      <span>信息类型： 性别、年龄、身高、体重、吸烟史、手术史、服药史、疾病史、行为习惯，家族遗传疾病史等信息</span>

      <br>
      <span>业务场景： 产品安全及优化体验需要</span>
      <span>收集方式： 我们收集的信息</span>
      <span>信息类型： 设备型号、操作系统、唯一设备标识符、登录IP地址、灵心软件版本号、接入网络的方式、类型和状态、网络质量数据、设备加速器、操作日志、服务日志信息等日志信息、位置信息</span>

      <br>
      <span>业务场景： 灵心分享功能</span>
      <span>收集方式： 您主动提供的信息</span>
      <span>信息类型： 用户的紧急联系人手机号</span>

      <br>
      <span>业务场景： 灵心报告功能</span>
      <span>收集方式： 我们收集的信息</span>
      <span>信息类型： 用户的心电数据，蓝牙数据，接入网络的方式、类型和状态、网络质量数据，设备型号，唯一设备标识符</span>

      <br>
      <span>业务场景： 消息推送功能</span>
      <span>收集方式： 我们收集的信息</span>
      <span>信息类型： 位置信息</span>
      <span>业务场景： 灵心日常/运动/睡眠/筛查监测等功能</span>
      <span>收集方式： 我们收集的信息</span>
      <span>信息类型： 用户的心电数据，蓝牙数据，接入网络的方式、类型和状态、网络质量数据，设备型号，唯一设备标识符</span>

      <br>
      <span>2.我们如何保护信息我们为您的信息提供相应的安全保障，以防止信息的丢失、不当使用、未经授权访问或披露，包括：</span>
      <span>• 我们严格遵守法律法规保护用户的通信秘密。</span>
      <span>• 我们将在合理的安全水平内使用各种安全保护措施以保障信息的安全。</span>
      <span>• 我们通过不断提升的技术手段加强安装在您设备端的软件的安全能力。</span>
      <span>• 我们建立专门的管理制度、操作规程和组织以保障信息的安全。</span>

      <br>
      <span>3.我们服务中涉及的第三方数据处理我们与第三方合作过程中，将遵守法律规定，按照最小必要原则，安全审慎地处理相关数据。我们将按照法律法规的规定，对数据处理涉及的第三方进行严格的限制，要求其严格遵守我们关于数据隐私保护的措施与要求，包括但不限于根据数据保护协议、承诺书及相关数据处理政策进行处理，保障数据安全。</span>

      <br>
      <span>4.您如何管理自己的信息您在使用我们服务的过程中， 可以通过查阅、复制、更正、补充、删除等方式来管理您的个人信息。具体方式包括：查阅您的个人信息：您可通过“灵心-我的-头像栏”、“灵心-我的-通用设置-账号与安全”、等路径来查询您的头像、昵称、年龄、性别、体重、身高、吸烟史、吸烟史、手术史、服药史、疾病史，手机号、灵心密码、实名认证、紧急联系人等个人信息。具体路径详见《灵心隐私政策》完整版。您可以通过查看《第三方信息共享清单》了解您的个人信息处理情况。</span>

      <br>
      <span>更正您的个人信息：您可通过“灵心-我的-头像栏”、“灵心-我的-通用设置-帐号与安全”“灵心-我-通用设置-紧急联系人”等路径来更正、补充您的头像、昵称、年龄、性别、体重、身高、吸烟史、吸烟史、手术史、服药史、疾病史，手机号、灵心密码、实名认证、紧急联系人等个人信息。具体路径详见《灵心隐私政策》完整版。</span>

      <br>
      <span>功能及权限管理：您可通过“灵心-我的-通用设置-分享设置-被动分享”路径撤回紧急联系人等已授权系统权限的授权；通过“灵心-我-通用设置-推送设置-关闭推送” 路径撤回推送授权等。具体路径详见《灵心隐私政策》完整版。</span>

      <br>
      <span>注销帐号：您可通过“灵心-我的-通用设置-账号与安全-注销帐号”路径注销您的灵心帐号。完整版本请查看<router-link to="/agree/private">《灵心隐私政策》</router-link>。</span>

    </section>
  </div>
</template>

<script>
export default {
  name: "info-share"
}
</script>

<style scoped>
.body {
  width: 100%;
  height: 100%;
  padding: 1rem;
  color: #868686;
}

.privacy-content {
  overflow: hidden;
  font-size: .7rem;
  color: #666;
  line-height: 1.4rem;
  letter-spacing: 1px;
  white-space: pre-wrap
}


.privacy-content-title {
  display: inline-block;
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  padding-bottom: .6rem;
}

.privacy-content span {
  /*text-indent: 1rem;*/
  display: block;
}

.mt5 {
  margin-top: .5rem;
}

.article-other {
  font-size: .6rem;
  overflow: hidden;
  line-height: .6rem;
  padding: .5rem 0;
}


.article-other span {
  float: right;
  margin-left: .5rem;
}
</style>