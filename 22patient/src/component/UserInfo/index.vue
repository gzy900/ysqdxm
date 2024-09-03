<template>
  <div class="user-info-body">
    <div class="user-info-body-scr">

      <div class="user-info-body-content">
        <div class="user-info-body-form-menu" v-if="userInfoLook ==='base'">
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
            >
              <a :href="'#'+activity.href" style="cursor: pointer">
                {{ activity.content }}
              </a>
            </el-timeline-item>
          </el-timeline>
        </div>
        <div class="user-info-body-form" v-if="userInfoDialogType==='add'||getInfoLoading">
          <el-scrollbar wrap-class="scrollbar-wrapper" style="overflow-x: hidden">
            <el-form
              ref="form"
              label-suffix="："
              :model="form"
              label-width="220px"
              :rules="rules"
              style="overflow: hidden"
            >
              <!--          :disabled="formDisabled"-->

              <!--          <el-divider v-if="userInfoDialogType!=='add'" content-position="center">基础信息</el-divider>-->
              <template v-if="userInfoLook==='user'">

                <el-form-item v-if="userInfoDialogType!=='add'" label="患者唯一编码">
                  <el-col :span="12">
                    <el-input v-model="CODE" disabled></el-input>
                  </el-col>
                </el-form-item>

                <el-form-item label="联系方式" prop="cellphone">
                  <el-col :span="12">
                    <el-input
                      type="textarea"
                      :rows="4"
                      v-model="form.cellphone"
                      placeholder="请输入患者联系方式，多个以逗号 , 隔开"
                    ></el-input>
                  </el-col>
                </el-form-item>

                <el-form-item label="姓名" prop="patientName">
                  <el-col :span="4">
                    <el-input v-model="form.patientName"></el-input>
                  </el-col>
                </el-form-item>

                <el-form-item label="身份证号" prop="idCard">
                  <el-col :span="12">
                    <el-input v-model="form.idCard"></el-input>
                  </el-col>
                </el-form-item>

                <el-form-item label="出生日期" prop="birthday">
                  <el-col :span="6">
                    <el-date-picker
                      v-model="form.birthday"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="timestamp"
                    >
                    </el-date-picker>
                  </el-col>
                </el-form-item>

                <el-form-item label="身高" prop="height">
                  <el-col :span="6">
                    <el-input v-model="form.height">
                      <template slot="append">cm</template>
                    </el-input>
                  </el-col>
                </el-form-item>

                <el-form-item label="体重" prop="weight">
                  <el-col :span="6">
                    <el-input v-model="form.weight">
                      <template slot="append">kg</template>
                    </el-input>
                  </el-col>
                </el-form-item>

                <el-form-item label="BMI">
                  <el-col :span="6">
                    <el-input :value="(form.weight / ((form.height/100) * (form.height/100))).toFixed(2)" disabled>
                      <template slot="append">BMI</template>
                    </el-input>
                  </el-col>
                </el-form-item>

                <el-form-item label="性别" prop="gender">
                  <el-radio-group v-model="form.gender">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="0">女</el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="所属机构" prop="orgId">
                  <el-col :span="6">
                    <el-select v-model="form.orgId" placeholder="请选择所属机构" @change="jigou">
                      <el-option v-for="item in orgList" :label="item.orgName" :value="item.orgId"></el-option>
                      <!--                <el-option label="上海移视科技" :value="1"></el-option>-->
                    </el-select>
                  </el-col>
                </el-form-item>
              </template>

              <template v-if="userInfoLook ==='base'">
                <span id="time_fc" style="height: 1px"></span>
                <el-divider content-position="center">房颤信息</el-divider>

                <el-form-item label="房颤类型">
                  <el-radio-group v-model="form.afType">
                    <el-radio :label="0">初发心房颤动</el-radio>
                    <el-radio :label="1">阵发性心房颤动</el-radio>
                    <el-radio :label="2">持续性心房颤动</el-radio>
                    <el-radio :label="3">永久性房颤</el-radio>
                  </el-radio-group>
                </el-form-item>

                <template v-if="form.af_type==='持续性心房颤动'">
                  <el-form-item label="持续性心房颤动-持续时间">
                    <el-col :span="6">
                      <el-input v-model="form.name">
                        <template slot="append">天</template>
                      </el-input>
                    </el-col>
                  </el-form-item>

                  <el-form-item label="持续性心房颤动-发现时间">
                    <el-col :span="6">
                      <el-date-picker v-model="form.onsetYears"></el-date-picker>
                    </el-col>
                  </el-form-item>
                </template>

                <el-form-item label="房颤症状">
                  <el-radio-group v-model="form.symptomOrNot">
                    <el-radio :label="0">症状性心房颤动</el-radio>
                    <el-radio :label="1">隐匿性心房颤动</el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="是否合并其它房性心律失常">
                  <el-checkbox-group v-model="form.combinedArrhythmia" class="CHA-num">
                    <el-checkbox label="房性早搏" name="type"></el-checkbox>
                    <el-checkbox label="房性心动过速" name="type"></el-checkbox>
                    <el-checkbox label="心房扑动" name="type"></el-checkbox>
                    <!--              <el-checkbox label="心肌梗死" name="type"></el-checkbox>-->
                  </el-checkbox-group>
                </el-form-item>

                <!--          <el-form-item label="是否服用抗心律失常药">-->
                <!--            <el-switch-->
                <!--              v-model="form.delivery"-->
                <!--              active-text="是"-->
                <!--              inactive-text="否"-->
                <!--            ></el-switch>-->
                <!--          </el-form-item>-->

                <el-form-item label="服用心律失常药名">
                  <el-col :span="6">
                    <el-input v-model="form.antiarrhythmicDrugs" placeholder="请输入服用的心律失常药名，多个以逗号隔开"></el-input>
                  </el-col>
                </el-form-item>

                <!--          <el-form-item label="是否服用抗凝药">-->
                <!--            <el-switch-->
                <!--              v-model="form.delivery"-->
                <!--              active-text="是"-->
                <!--              inactive-text="否"-->
                <!--            ></el-switch>-->
                <!--          </el-form-item>-->

                <el-form-item label="抗凝药物种类">
                  <el-checkbox-group v-model="form.anticoagulantsType" class="CHA-num">
                    <el-checkbox label="0">华法林</el-checkbox>
                    <el-checkbox label="1">利伐沙班</el-checkbox>
                    <el-checkbox label="2">达比加群</el-checkbox>
                    <el-checkbox label="3">艾多沙班</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>

                <span id="time_jwss" style="height: 1px"></span>
                <el-divider content-position="center">既往相关手术史</el-divider>

                <el-form-item label="消融">
                  <el-col :span="6">
                    <el-input v-model="form.ablationHistory">
                      <template slot="append">次</template>
                    </el-input>
                  </el-col>
                </el-form-item>

                <el-form-item label="左心耳封堵史">
                  <el-switch
                    v-model="form.leftAtrial"
                    active-text="有"
                    inactive-text="无"
                    :active-value="1"
                    :inactive-value="0"
                  ></el-switch>
                </el-form-item>

                <el-form-item label="起搏器植入史">
                  <el-switch
                    v-model="is_pacemaker"
                    active-text="有"
                    inactive-text="无"
                  ></el-switch>
                </el-form-item>

                <el-form-item label="起搏器植入位置" v-show="is_pacemaker">
                  <el-radio-group v-model="form.pacemaker">
                    <el-radio :label="1">右室心尖部</el-radio>
                    <el-radio :label="2">高位间隔部</el-radio>
                    <el-radio :label="3">希氏束</el-radio>
                    <el-radio :label="4">左束支</el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item
                  v-if="false"
                  label="手术详细"
                  class="operation"
                >
                  <el-row :gutter="20" style="display: inline-block;width: 100%;">
                    <el-col class="addOperation" :span="24" style="height: 72px;margin-bottom: 20px">
                      <p @click="addDomain">
                        <i class="el-icon-plus" style="font-size: 16px;text-align: center;"/>
                        新增手术信息
                      </p>
                    </el-col>
                    <el-col
                      v-for="(domain, index) in surgeyFromList"
                      :key="domain.key"
                      :span="24"
                      style="margin-bottom: 20px"
                      :style="{height: OperationStatus[index]?'auto':'72px'}"
                    >
                      <el-card class="operation">

                        <el-form-item
                          label="操作"
                          label-width="130px"
                        >
                          <el-button type="success" @click.prevent="handleSubmitSurgery(index)">提交</el-button>
                          <el-button @click.prevent="removeDomain(index,domain)">删除这条手术记录</el-button>
                        </el-form-item>
                      </el-card>
                    </el-col>
                  </el-row>
                </el-form-item>

                <el-form-item label="基础疾病史">
                  <el-checkbox-group v-model="form.basicIllness" class="CHA-num">
                    <el-checkbox label="高血压" name="type"></el-checkbox>
                    <el-checkbox label="糖尿病" name="type"></el-checkbox>
                    <el-checkbox label="冠心病（确诊）" name="type"></el-checkbox>
                    <el-checkbox label="外周冠脉支架史" name="type"></el-checkbox>
                    <el-checkbox label="心衰" name="type"></el-checkbox>
                    <el-checkbox label="肾功能不全" name="type"></el-checkbox>
                    <el-checkbox label="肝功能不全" name="type"></el-checkbox>
                    <el-checkbox label="中风/TIA/血栓史" name="type"></el-checkbox>
                    <el-checkbox label="瓣膜疾病" name="type"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>

                <span id="time_pf" style="height: 1px"></span>
                <el-divider content-position="center">评分</el-divider>

                <el-form-item label="CHA2DS2-VASc评分">

                  <div style="width: 100px">
                    <el-input :value="VASC" :disabled="true">
                    </el-input>
                  </div>
                  <!--            <el-checkbox-group v-model="form.CHA2DS2_VASc" class="CHA-num">-->
                  <!--              <el-checkbox label="充血性心力衰竭/左心功能不全（1分）" name="type"></el-checkbox>-->
                  <!--              <el-checkbox label="高血压（1分）" name="type"></el-checkbox>-->
                  <!--              <el-checkbox label="年龄≥75岁（2分）" name="type"></el-checkbox>-->
                  <!--              <el-checkbox label="糖尿病（1分）" name="type"></el-checkbox>-->
                  <!--              <el-checkbox label="中风/TIA/血栓史（2分）" name="type"></el-checkbox>-->
                  <!--              <el-checkbox label="血管病变（1分）" name="type"></el-checkbox>-->
                  <!--              <el-checkbox label="年龄65-74岁（1分）" name="type"></el-checkbox>-->
                  <!--              <el-checkbox label="性别（女性）（1分）" name="type"></el-checkbox>-->
                  <!--            </el-checkbox-group>-->

                  <!--            heartFailure: null,-->
                  <!--            vascHypertension: null,-->
                  <!--            vascAge: null,-->
                  <!--            diabetes: null,-->
                  <!--            strokeTiaThrombosis: null,-->
                  <!--            vascularDisease: null,-->
                  <!--            vascGender: null,-->
                  <el-checkbox v-model="form.heartFailure" :true-label="1" :false-label="0" label="充血性心力衰竭/左心功能不全（1分）"
                  ></el-checkbox>
                  <br/>
                  <el-checkbox v-model="form.vascHypertension" :true-label="1" :false-label="0"
                               label="高血压（1分）"></el-checkbox>
                  <br/>
                  <el-checkbox v-model="form.vascAge" :true-label="2" :false-label="0" label="年龄≥75岁（2分）"></el-checkbox>
                  <br/>
                  <el-checkbox v-model="form.diabetes" :true-label="1" :false-label="0" label="糖尿病（1分）"></el-checkbox>
                  <br/>
                  <el-checkbox v-model="form.strokeTiaThrombosis" :true-label="2" :false-label="0"
                               label="中风/TIA/血栓史（2分）"
                  ></el-checkbox>
                  <br/>
                  <el-checkbox v-model="form.vascularDisease" :true-label="1" :false-label="0"
                               label="血管病变（1分）"></el-checkbox>
                  <br/>
                  <el-checkbox v-model="form.vascAge" :true-label="1" :false-label="0"
                               label="年龄65-74岁（1分）"></el-checkbox>
                  <br/>
                  <el-checkbox v-model="form.vascGender" :true-label="1" :false-label="0"
                               label="性别（女性）（1分）"></el-checkbox>

                </el-form-item>

                <el-form-item label="HAS-BLED评分">
                  <div style="width: 100px">
                    <el-input :value="HAS_BLED" :disabled="true">
                    </el-input>
                  </div>
                  <el-checkbox v-model="form.bledHypertension" :true-label="1" :false-label="0"
                               label="高血压（1分）"></el-checkbox>
                  <br/>
                  <el-checkbox v-model="form.liverFunction" :true-label="1" :false-label="0"
                               label="异常的肝功能（1分）"></el-checkbox>
                  <br/>
                  <el-checkbox v-model="form.kidneyFunction" :true-label="1" :false-label="0" label="异常的肾功能（1分）"
                  ></el-checkbox>
                  <br/>
                  <el-checkbox v-model="form.stroke" :true-label="1" :false-label="0" label="卒中（1分）"></el-checkbox>
                  <br/>
                  <el-checkbox v-model="form.bleeding" :true-label="1" :false-label="0" label="出血（1分）"></el-checkbox>
                  <br/>
                  <el-checkbox v-model="form.inrStable" :true-label="1" :false-label="0"
                               label="INR不稳定（1分）"></el-checkbox>
                  <br/>
                  <el-checkbox v-model="form.bledAge" :true-label="1" :false-label="0" label="年龄≥65岁（1分）"></el-checkbox>
                  <br/>
                  <el-checkbox v-model="form.drug" :true-label="1" :false-label="0" label="药物（1分）"></el-checkbox>
                  <br/>
                  <el-checkbox v-model="form.drinking" :true-label="1" :false-label="0" label="饮酒（1分）"></el-checkbox>
                  <br/>
                </el-form-item>

                <span id="time_jy" style="height: 1px"></span>
                <el-divider content-position="center">检验相关</el-divider>

                <el-form-item label="血常规">
                  <div style="width: 250px;">
                    <el-input placeholder="" v-model="form.leukocyte">
                      <template slot="prepend">白细胞（*10<sup>9</sup>）</template>
                    </el-input>
                  </div>
                  <div style="width: 250px;margin-top: 10px">
                    <el-input placeholder="" v-model="form.redCells">
                      <template slot="prepend">红细胞（*10<sup>12</sup>）</template>
                    </el-input>
                  </div>
                  <div style="width: 250px;margin-top: 10px">
                    <el-input placeholder="" v-model="form.hemoglobin">
                      <template slot="prepend">血红蛋白（g/L）</template>
                    </el-input>
                  </div>
                  <div style="width: 250px;margin-top: 10px">
                    <el-input placeholder="" v-model="form.platelets">
                      <!--              <template slot="prepend"></template>-->
                      <template slot="prepend">血小板（*10<sup>9</sup>）</template>
                    </el-input>
                  </div>
                </el-form-item>

                <el-form-item label="肝功能">
                  <div style="width: 250px;">
                    <el-input placeholder="" v-model="form.alt">
                      <template slot="prepend">谷丙转氨酶（ALT）</template>
                    </el-input>
                  </div>
                  <div style="width: 250px;margin-top: 10px">
                    <el-input placeholder="" v-model="form.ast">
                      <template slot="prepend">谷草转氨酶（AST）</template>
                    </el-input>
                  </div>
                </el-form-item>

                <el-form-item label="肾功能">
                  <div style="width: 250px;">
                    <el-input placeholder="" v-model="form.creatinine">
                      <template slot="prepend">肌酐</template>
                    </el-input>
                  </div>
                  <div style="width: 250px;margin-top: 10px">
                    <el-input placeholder="" v-model="form.glomerular">
                      <template slot="prepend">肾小球滤过率</template>
                    </el-input>
                  </div>
                  <div style="width: 250px;margin-top: 10px">
                    <el-input placeholder="" v-model="form.uricAcid">
                      <template slot="prepend">尿酸</template>
                    </el-input>
                  </div>
                </el-form-item>

                <el-form-item label="凝血">
                  <div style="width: 250px;">
                    <el-input placeholder="" v-model="form.dd">
                      <template slot="prepend">D-D二聚体</template>
                    </el-input>
                  </div>
                  <div style="width: 250px;margin-top: 10px">
                    <el-input placeholder="" v-model="form.inr">
                      <template slot="prepend">INR</template>
                    </el-input>
                  </div>
                </el-form-item>

                <el-form-item label="糖代谢">
                  <div style="width: 250px;">
                    <el-input placeholder="" v-model="form.glucose">
                      <template slot="prepend">葡萄糖</template>
                    </el-input>
                  </div>
                  <div style="width: 250px;margin-top: 10px">
                    <el-input placeholder="" v-model="form.glycatedHemoglobin">
                      <template slot="prepend">糖化血红蛋白</template>
                    </el-input>
                  </div>
                </el-form-item>

                <el-form-item label="甲状腺功能">
                  <div style="width: 250px;">
                    <el-input placeholder="" v-model="form.t3">
                      <template slot="prepend">T3</template>
                    </el-input>
                  </div>
                  <div style="width: 250px;margin-top: 10px">
                    <el-input placeholder="" v-model="form.t4">
                      <template slot="prepend">T4</template>
                    </el-input>
                  </div>
                  <div style="width: 250px;margin-top: 10px">
                    <el-input placeholder="" v-model="form.ft3">
                      <template slot="prepend">FT3</template>
                    </el-input>
                  </div>
                  <div style="width: 250px;margin-top: 10px">
                    <el-input placeholder="" v-model="form.ft4">
                      <template slot="prepend">FT4</template>
                    </el-input>
                  </div>
                  <div style="width: 250px;margin-top: 10px">
                    <el-input placeholder="" v-model="form.tsh">
                      <template slot="prepend">TSH</template>
                    </el-input>
                  </div>
                </el-form-item>

                <el-form-item label="心肌标志物">
                  <div style="width: 250px;">
                    <el-input placeholder="" v-model="form.tntTi">
                      <template slot="prepend">TNT-T/TNT-I</template>
                    </el-input>
                  </div>
                  <div style="width: 250px;margin-top: 10px">
                    <el-input placeholder="" v-model="form.bnp">
                      <template slot="prepend">BNP（NT-proBNP）</template>
                    </el-input>
                  </div>
                </el-form-item>

                <span id="time_jc" style="height: 1px"></span>

                <el-divider content-position="center">检查相关</el-divider>

                <el-form-item label="心电图">

                  <div style="width: 250px;">
                    <el-input placeholder="" v-model="form.bpm">
                      <template slot="prepend">心率（bpm）</template>
                    </el-input>
                  </div>
                  <div style="width: 250px;margin-top: 10px">
                    <el-input placeholder="" v-model="form.pr">
                      <template slot="prepend">P-R间期（ms）</template>
                    </el-input>
                  </div>
                  <div style="width: 250px;margin-top: 10px">
                    <el-input placeholder="" v-model="form.qrsTime">
                      <template slot="prepend">QRS时限（ms）</template>
                    </el-input>
                  </div>
                  <div style="width: 250px;margin-top: 10px">
                    <el-input placeholder="" v-model="form.qrsShaft">
                      <template slot="prepend">QRS电轴（°）</template>
                    </el-input>
                  </div>
                  <div style="width: 250px;margin-top: 10px">
                    <el-input placeholder="" v-model="form.qt">
                      <template slot="prepend">Q-T间期（ms）</template>
                    </el-input>
                  </div>
                  <div style="width: 250px;margin-top: 10px">
                    <el-input placeholder="" v-model="form.qtc">
                      <template slot="prepend">QTc（ms）</template>
                    </el-input>
                  </div>
                  <div style="width: 250px;margin-top: 10px">
                    <el-input placeholder="" v-model="form.rS">
                      <template slot="prepend">R（V5）+S（V1）（mv）</template>
                    </el-input>
                  </div>
                </el-form-item>

                <el-form-item label="有无传导阻滞">
                  <el-checkbox-group v-model="form.conductionBlock" class="CHA-num">
                    <!--              <el-checkbox value="0" label="无" name="type"></el-checkbox>-->
                    <el-checkbox label="1">完全性左束支传导阻滞</el-checkbox>
                    <el-checkbox label="2">完全性右束支传导阻滞</el-checkbox>
                    <el-checkbox label="3">室内传导阻滞</el-checkbox>
                    <el-checkbox label="4">左前分支阻滞</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>

                <el-form-item label="文件上传">
                  <el-upload
                    action="https://suifang.maillife.cn:23409/uploads"
                    :headers="{authorization:token}"
                    :data="{
                patientId:'123',
                recordId:'123',
              }"
                    name="uploadFiles"
                    :file-list="ecgFileUrl"
                    :on-success="handleUploadSuccessECG"
                    list-type="picture-card"
                  >
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                      <img
                        class="el-upload-list__item-thumbnail"
                        :src="file.url" alt=""
                      >
                      <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file,'ecgFileUrl')"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)"
                  >
                    <i class="el-icon-download"></i>
                  </span>
                  <span
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file,'ecgFileUrl')"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
                    </div>
                  </el-upload>
                </el-form-item>

                <span id="time_ht" style="height: 1px"></span>

                <el-divider content-position="center">Holter</el-divider>

                <el-form-item label="平均心率">
                  <el-col :span="5">
                    <el-input placeholder="" v-model="form.averageBpm">
                      <template slot="append">bpm</template>
                    </el-input>
                  </el-col>
                </el-form-item>

                <el-form-item label="最快心率">
                  <el-col :span="5">

                    <el-input placeholder="" v-model="form.fastestBpm">
                      <template slot="append">bpm</template>
                    </el-input>
                  </el-col>
                </el-form-item>

                <el-form-item label="最慢心率">
                  <el-col :span="5">
                    <el-input placeholder="" v-model="form.slowestBpm">
                      <template slot="append">bpm</template>
                    </el-input>
                  </el-col>
                </el-form-item>

                <el-form-item label="SDNN">
                  <el-col :span="5">
                    <el-input placeholder="" v-model="form.sdnn">
                      <template slot="append">ms</template>
                    </el-input>
                  </el-col>
                </el-form-item>

                <el-form-item label="SDANN">
                  <el-col :span="5">
                    <el-input placeholder="" v-model="form.sdann">
                      <template slot="append">ms</template>
                    </el-input>
                  </el-col>
                </el-form-item>

                <el-form-item label="rMSSD">
                  <el-col :span="5">
                    <el-input placeholder="" v-model="form.rmssd">
                      <template slot="append">ms</template>
                    </el-input>
                  </el-col>
                </el-form-item>

                <el-form-item label="Pnn50">
                  <el-col :span="5">
                    <el-input placeholder="" v-model="form.pnn50">
                      <template slot="append">%</template>
                    </el-input>
                  </el-col>
                </el-form-item>

                <el-form-item label="心律失常事件">
                  <el-checkbox-group v-model="form.arrhythmicEvents" class="CHA-num">
                    <el-checkbox label="室性早搏" name="type"></el-checkbox>
                    <el-checkbox label="房性早搏" name="type"></el-checkbox>
                    <el-checkbox label="房速" name="type"></el-checkbox>
                    <el-checkbox label="心房扑动" name="type"></el-checkbox>
                    <el-checkbox label="心房颤动" name="type"></el-checkbox>
                    <el-checkbox label="室速" name="type"></el-checkbox>
                    <el-checkbox label="室颤" name="type"></el-checkbox>
                    <el-checkbox label="长间歇" name="type"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>

                <el-form-item label="Holter文件上传">
                  <el-upload
                    action="https://suifang.maillife.cn:23409/uploads"
                    :headers="{authorization:token}"
                    :data="{
                patientId:'123',
                recordId:'123',
              }"
                    name="uploadFiles"
                    :file-list="hrFileUrl"
                    :on-success="handleUploadSuccessHR"
                    list-type="picture-card"
                  >
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                      <img
                        class="el-upload-list__item-thumbnail"
                        :src="file.url" alt=""
                      >
                      <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)"
                  >
                    <i class="el-icon-download"></i>
                  </span>
                  <span
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file,'hrFileUrl')"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
                    </div>
                  </el-upload>
                </el-form-item>

                <span id="time_xc" style="height: 1px"></span>
                <el-divider content-position="center">心超</el-divider>

                <el-form-item label="主动脉根部宽度（ARD）">
                  <el-col :span="5">
                    <el-input placeholder="" v-model="form.ard">
                      <!--              <template slot="append">%</template>-->
                    </el-input>
                  </el-col>
                </el-form-item>

                <el-form-item label="左房内径（LAD）">
                  <el-col :span="5">
                    <el-input placeholder="" v-model="form.lad">
                      <!--              <template slot="append">%</template>-->
                    </el-input>
                  </el-col>
                </el-form-item>

                <el-form-item label="右房内径">
                  <el-col :span="5">
                    <el-input placeholder="" v-model="form.rightAtrialDiameter">
                      <!--              <template slot="append">%</template>-->
                    </el-input>
                  </el-col>
                </el-form-item>

                <el-form-item label="左室舒张末期内径（LVDD）">
                  <el-col :span="5">
                    <el-input placeholder="" v-model="form.lvdd">
                      <!--              <template slot="append">%</template>-->
                    </el-input>
                  </el-col>
                </el-form-item>

                <el-form-item label="左室收缩末期内径（LVSD）">
                  <el-col :span="5">
                    <el-input placeholder="" v-model="form.lvsd">
                      <!--              <template slot="append">%</template>-->
                    </el-input>
                  </el-col>
                </el-form-item>

                <el-form-item label="室间隔厚度（IST）">
                  <el-col :span="5">
                    <el-input placeholder="" v-model="form.ist">
                      <!--              <template slot="append">%</template>-->
                    </el-input>
                  </el-col>
                </el-form-item>

                <el-form-item label="左室后侧厚度（LVPWT）">
                  <el-col :span="5">
                    <el-input placeholder="" v-model="form.lvpwt">
                      <!--              <template slot="append">%</template>-->
                    </el-input>
                  </el-col>
                </el-form-item>

                <el-form-item label="LVEF（%）">
                  <el-col :span="5">
                    <el-input placeholder="" v-model="form.lvef">
                      <!--              <template slot="append">%</template>-->
                    </el-input>
                  </el-col>
                </el-form-item>

                <!--              <el-form-item label="心衰类型">-->
                <!--                <el-radio-group v-model="form.heartFailureType">-->
                <!--                  <el-radio :label="0">1HFrEF</el-radio>-->
                <!--                  <el-radio :label="1">2HFmrEF</el-radio>-->
                <!--                  <el-radio :label="2">3HFpEF</el-radio>-->
                <!--                </el-radio-group>-->
                <!--              </el-form-item>-->

                <el-form-item label="返流类型">
                  <el-row>

                    <el-col :span="4">
                      <el-checkbox v-model="is_refluxTypeTwo">二尖瓣</el-checkbox>
                    </el-col>

                    <el-radio-group v-model="form.refluxTypeTwo" v-show="is_refluxTypeTwo">
                      <el-radio :label="0">无</el-radio>
                      <el-radio :label="1">轻度</el-radio>
                      <el-radio :label="2">轻中度</el-radio>
                      <el-radio :label="3">中度</el-radio>
                      <el-radio :label="4">重度</el-radio>
                    </el-radio-group>
                  </el-row>

                  <el-row>
                    <el-col :span="4">
                      <el-checkbox v-model="is_refluxTypeThree">三尖瓣</el-checkbox>
                    </el-col>
                    <el-radio-group v-model="form.refluxTypeThree" v-show="is_refluxTypeThree">
                      <el-radio :label="0">无</el-radio>
                      <el-radio :label="1">轻度</el-radio>
                      <el-radio :label="2">轻中度</el-radio>
                      <el-radio :label="3">中度</el-radio>
                      <el-radio :label="4">重度</el-radio>
                    </el-radio-group>
                  </el-row>

                  <el-row>
                    <el-col :span="4">
                      <el-checkbox v-model="is_refluxTypeAorta">主动脉瓣</el-checkbox>
                    </el-col>
                    <el-radio-group v-model="form.refluxTypeAorta" v-show="is_refluxTypeAorta">
                      <el-radio :label="0">无</el-radio>
                      <el-radio :label="1">轻度</el-radio>
                      <el-radio :label="2">轻中度</el-radio>
                      <el-radio :label="3">中度</el-radio>
                      <el-radio :label="4">重度</el-radio>
                    </el-radio-group>
                  </el-row>

                </el-form-item>

                <el-form-item label="心超文件上传">
                  <el-upload
                    action="https://suifang.maillife.cn:23409/uploads"
                    :headers="{authorization:token}"
                    :data="{
                patientId:'123',
                recordId:'123',
              }"
                    name="uploadFiles"
                    :file-list="eyFileUrl"
                    :on-success="handleUploadSuccessEY"
                    list-type="picture-card"
                  >
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                      <img
                        class="el-upload-list__item-thumbnail"
                        :src="file.url" alt=""
                      >
                      <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)"
                  >
                    <i class="el-icon-download"></i>
                  </span>
                  <span
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file,'eyFileUrl')"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
                    </div>
                  </el-upload>
                </el-form-item>

                <span id="time_qt" style="height: 1px"></span>
                <el-divider content-position="center">其他</el-divider>

                <el-form-item label="备注">
                  <el-col :span="13">
                    <el-input type="textarea" v-model="form.remark"></el-input>
                  </el-col>
                </el-form-item>
              </template>

            </el-form>
          </el-scrollbar>
        </div>
      </div>

      <div class="user-info-body-btn">
        <template v-if="formDisabled">
          <el-button type="primary" @click="handleSubmit">提交</el-button>
          <el-button type="info" @click="handleDownloadPDF('form')">导出PDF</el-button>

          <!--        <el-button type="primary" @click="handleUp">修改</el-button>-->
        </template>

        <template v-else>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
          <el-button @click="formDisabled = true">取消修改</el-button>
        </template>
        <!--      <el-button type="danger" @click="visible = false">关闭窗口</el-button>-->
      </div>
    </div>

    <el-dialog append-to-body :visible.sync="imgDialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
// userInfo
// `id` bigint(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
// `patient_id` bigint(8) UNSIGNED NOT NULL COMMENT '病人ID',
// `patient_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '病人姓名',
// `gender` tinyint(1) UNSIGNED NOT NULL COMMENT '性别：1,男；0，女;2,无',
// `birthday` bigint(8) UNSIGNED NOT NULL COMMENT '出生日期',
// `id_card` char(18) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '身份证号',
// `height` tinyint(1) UNSIGNED NOT NULL COMMENT '身高，单位：cm',
// `weight` float UNSIGNED NOT NULL COMMENT '体重，单位：kg',
// `cellphone` char(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '手机号',
// `org_id` bigint(8) UNSIGNED NOT NULL COMMENT '所属机构ID',
// `org_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '机构名称',

// sf_medical_history
//   `af_type` tinyint(1) UNSIGNED NOT NULL COMMENT '房颤类型，0：初发心房颤动、1：阵发性心房颤动、2：持续性心房颤动、3：永久性房颤',
//   `symptom_or_not` tinyint(1) UNSIGNED NOT NULL COMMENT '0:症状性心房颤动,1:隐匿性心房颤动',
//   `onset_years` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '可追溯的房颤发病年限',
//   `combined_arrhythmia` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '是否合并其它房性心律失常,房性早搏、房性心动过速、心房扑动（多选）',
//   `antiarrhythmic_drugs` tinyint(1) UNSIGNED NOT NULL COMMENT '是否服用抗心律失常药：1:是/0:否',
//   `anticoagulants` tinyint(1) UNSIGNED NOT NULL COMMENT '是否服用抗凝药：1:是/0:否',
//   `anticoagulants_type` tinyint(1) UNSIGNED NOT NULL COMMENT '0:华法林、1:利伐沙班、2:达比加群、3:艾多沙班',
//   `ablation_history` tinyint(1) UNSIGNED NOT NULL COMMENT '既往有无消融史：是/否（二选一，是选择填入数字几次）',
//   `left_atrial` tinyint(1) UNSIGNED NOT NULL COMMENT '有无左心耳封堵史：是/否（二选一）',
//   `pacemaker` tinyint(1) NOT NULL COMMENT '有无起搏器植入史：0:否,1:右室心尖部、2:高位间隔部、3:希氏束、4:左束支\r\n',
//   `basic_illness` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '高血压、糖尿病、冠心病（确诊）、外周冠脉支架史、心衰、肾功能不全、肝功能不全、中风/TIA/血栓史、瓣膜疾病等',

// 'HAS-BLED评分
//   `hypertension` tinyint(1) UNSIGNED NOT NULL COMMENT '高血压',
//   `liver_function` tinyint(1) UNSIGNED NOT NULL COMMENT '异常的肝功能',
//   `kidney_function` tinyint(1) UNSIGNED NOT NULL COMMENT '异常的肾功能',
//   `stroke` tinyint(1) UNSIGNED NOT NULL COMMENT '卒中',
//   `bleeding` tinyint(1) UNSIGNED NOT NULL COMMENT '出血',
//   `inr` tinyint(1) UNSIGNED NOT NULL COMMENT 'INR不稳定',
//   `age` tinyint(1) UNSIGNED NOT NULL COMMENT '年龄',
//   `drug` tinyint(1) UNSIGNED NOT NULL COMMENT '药物',
//   `drinking` tinyint(1) UNSIGNED NOT NULL COMMENT '饮酒',

// CHA2DS2-VASc评分
//   `heart_failure` tinyint(1) UNSIGNED NOT NULL COMMENT '充血性心力衰竭/左心功能不全',
//   `hypertension` tinyint(1) UNSIGNED NOT NULL COMMENT '高血压',
//   `age` tinyint(1) NOT NULL COMMENT '年龄>=75岁(2分），65-74（1分）',
//   `diabetes` tinyint(1) UNSIGNED NOT NULL COMMENT '糖尿病',
//   `stroke_tia_thrombosis` tinyint(1) UNSIGNED NOT NULL COMMENT '中风/TIA/血栓史',
//   `vascular_disease` tinyint(1) UNSIGNED NOT NULL COMMENT '血管病变',
//   `gender` tinyint(1) UNSIGNED NOT NULL COMMENT '性别',

// sf_inspection_related 检验相关表
//   `leukocyte` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '白细胞',
//   `red_cells` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '红细胞',
//   `hemoglobin` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '血红蛋白',
//   `platelets` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '血小板',
//   `alt` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '谷丙转氨酶\r\n',
//   `ast` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '谷草转氨酶',
//   `creatinine` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '肌酐',
//   `glomerular` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '肾小球滤过率',
//   `uric_acid` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '尿酸',
//   `dd` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'D-D二聚体',
//   `inr` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'INR',
//   `glucose` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '葡萄糖',
//   `glycated_hemoglobin` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '糖化血红蛋白',
//   `t3` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'T3',
//   `t4` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'T4',
//   `ft3` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'FT3',
//   `ft4` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'FT4',
//   `tsh` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'TSH',
//   `tnt_t_i` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'TNT-T/TNT-I',
//   `bnp` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'BNP（NT-proBNP）',

// sf_ecg 检查相关表
//   `bpm` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '心率（bpm）',
//   `pr` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'P-R间期',
//   `qrs_time` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'QRS时限（ms）',
//   `qrs_shaft` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'QRS电轴（°）',
//   `qt` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Q-T间期（ms）',
//   `qtc` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'QTc（ms）',
//   `r_s` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'R（V5）+S（V1）（mv）',
//   `conduction_block` tinyint(1) UNSIGNED NOT NULL COMMENT '0：无，1：完全性左束支传导阻滞，2：完全性右束支传导阻滞，3：室内传导阻滞，4：左前分支阻滞',

// sf_holter
//   `average_bpm` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '平均心率（bpm）',
//   `fastest_bpm` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '最快心率（bpm）',
//   `slowest_bpm` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '最慢心率（bpm）',
//   `sdnn` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'SDNN（ms）',
//   `sdann` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'SDANN（ms）',
//   `rmssd` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'rMSSD（ms）',
//   `pnn50` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Pnn50（%）',
//   `arrhythmic_events` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '心律失常事件（勾选，多选）房性早搏、室性早搏、房速、心房扑动、心房颤动、室速、室颤、长间歇\r\n',

// sf_echocardiography 心超
// `ard` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '主动脉根部宽度（ARD）',
//   `lad` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '左房内径（LAD）',
//   `lvdd` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '左室舒张末期内径（LVDD）',
//   `lvsd` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '左室收缩末期内径（LVSD）',
//   `ist` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '室间隔厚度（IST）',
//   `lvpwt` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '左室后侧厚度（LVPWT）',
//   `right_atrial_diameter` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '右房内径',
//   `lvef` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'LVEF（%）',
//   `heart_failure_type` tinyint(1) UNSIGNED NOT NULL COMMENT '心衰类型0：1HFrEF，1：2HFmrEF:，2：3HFpEF（三选一）',
//   `reflux_type` tinyint(1) UNSIGNED NOT NULL COMMENT '0：二尖瓣、1：三尖瓣、2：主动脉瓣',
//   `degree` tinyint(1) UNSIGNED NOT NULL COMMENT '0：轻、1：中、2：重',

import {deepClone, isString, toHump, getAge} from '@/utils'
import {addData, upData, getInfo} from '@/api/patient'
import {addSurgery, upSurgery, getSurgery, delSurgery} from '@/api/surgery'
import {getToken} from '@/utils/auth'
import {validIdCard, validPhone} from '@/utils/validate'

const default_form = {
  timeArrayList: [],

  // userInfo
  // id: null,
  patientId: null,
  patientName: null,
  gender: null,
  birthday: null,
  idCard: null,
  height: null,
  weight: null,
  cellphone: null,
  orgId: null,
  orgName: '上海移视科技',

  // frequency: '6', // 随访间隔
  // period: '86400000', // 随访时间

  // sf_medical_history
  afType: null,
  symptomOrNot: null,
  onsetYears: null,
  combinedArrhythmia: [],
  antiarrhythmicDrugs: null,
  anticoagulants: null, // 是否服用抗凝药
  anticoagulantsType: [], // 服用抗凝药物种类
  ablationHistory: null,
  leftAtrial: null,
  pacemaker: null,
  basicIllness: [],

  // HAS_BLED
  HAS_BLED: [],
  bledHypertension: 0,
  liverFunction: 0,
  kidneyFunction: 0,
  stroke: 0,
  bleeding: 0,
  inrStable: 0,
  bledAge: 0,
  drug: 0,
  drinking: 0,

  // CHA2DS2_VASc
  CHA2DS2_VASc: [],
  heartFailure: 0,
  vascHypertension: 0,
  vascAge: 0,
  diabetes: 0,
  strokeTiaThrombosis: 0,
  vascularDisease: 0,
  vascGender: 0,

  // sf_inspection_related
  leukocyte: null,
  redCells: null,
  hemoglobin: null,
  platelets: null,
  alt: null,
  ast: null,
  creatinine: null,
  glomerular: null,
  uricAcid: null,
  dd: null,
  inr: null,
  glucose: null,
  glycatedHemoglobin: null,
  t3: null,
  t4: null,
  ft3: null,
  ft4: null,
  tsh: null,
  tntTi: null,
  bnp: null,

  // sf_ecg
  bpm: null,
  pr: null,
  qrsTime: null,
  qrsShaft: null,
  qt: null,
  qtc: null,
  rS: null,
  conductionBlock: [],
  ecgFileUrl: [],
  hrFileUrl: [],
  eyFileUrl: [],

  // sf_holter
  averageBpm: null,
  fastestBpm: null,
  slowestBpm: null,
  sdnn: null,
  sdann: null,
  rmssd: null,
  pnn50: null,
  arrhythmicEvents: [],

  // sf_echocardiography
  ard: null,
  lad: null,
  lvdd: null,
  lvsd: null,
  ist: null,
  lvpwt: null,
  rightAtrialDiameter: null,
  lvef: null,
  // heartFailureType: null,  // 6.27 已删除该字段

  refluxType: null,

  is_refluxTypeAorta: false,
  is_refluxTypeThree: false,
  is_refluxTypeTwo: false,

  refluxTypeAorta: 0,
  refluxTypeThree: 0,
  refluxTypeTwo: 0,

  degree: null,

  remark: '无'
}

let surgeyFrom = {
  patientId: '',
  surgeyTime: '',
  surgeyType: [],
  surgeyDoctor: '',
  surgeyInfo: '',
  timeArrayList: []
}

const freezing_info = {
  position: '',
  time0: '',
  c30: '',
  c60: '',
  c120: '',
  freezing_time: 0,
  mimi_c: '',
  tti_time: '',
  complication: [],
  work_together: false,
  vestibular_ablation: false
}

const surgey = {
  '0': {
    rhythm: '', // 术前心律
    recovery: '', // 术后复率
    freezing_list: [
      {
        ...deepClone(freezing_info)
      }
    ], // 冷冻记录
    freezing_all_num: '', // 冷冻总次数
    freezing_all_time: '', // 冷冻总时间
    operation_time: '', // 手术时间
    perspective_time: '', // 透视时间
    perspective_metrology: '' // 透视计量
  },
  '1': { // 射频消融
    symptom: [],
    supplement_point: []
  },
  '2': { // 左心耳封堵
    Left_atrial_appendage_morphology: '',
    occluder_type: '',
    brand: '',
    occluder_size: '',
    Whether_there_is_reflux: false,
    Recovery_times: '',
    Whether_to_change_the_umbrella: false
  },
  '3': { // 永久起搏器植入术
    Pacemaker_indications: [],
    Pacemaker_model: '',
    Single_double_cavity: false,
    Pacing_site: '',
    Peak_time: '',
    Ventricular_electrode_perception: '',
    Ventricular_electrode_threshold: '',
    Ventricular_electrode_impedance: '',
    Atrial_electrode_perception: '',
    Atrial_electrode_threshold: '',
    Atrial_electrode_impedance: ''
  },
  '4': { // 房室结消融
    Atrioventricular_node_ablation_energy: '',
    Atrioventricular_node_ablation_time: ''
  }
}

const freezing_operation = {
  freezingList: [
    {}
  ]
}

export default {
  name: 'UserInfo',
  props: {
    row: {
      type: Object,
      default: null
    },
    userInfoDialogType: {
      type: String,
      default: 'add'
    },
    userInfoLook: {
      type: String,
      default: 'user'
    },
    visible: {
      type: Boolean,
      default: false
    },
    orgList: {
      type: Array,
      default: null
    }
  },

  data() {
    const checkPhone = (rule, value, callback) => {
      console.log(value)
      if (validPhone(value)) {
        callback()
      } else {
        callback(new Error(rule.message))
      }
    }
    const checkIdCard = (rule, value, callback) => {
      console.log(value)
      if (validIdCard(value)) {
        callback()
      } else {
        callback(new Error(rule.message))
      }
    }
    return {

      activities: [{
        content: '房颤信息',
        timestamp: '',
        href: 'time_fc'
      }, {
        content: '既往手术史',
        timestamp: '',
        href: 'time_jwss'
      }, {
        content: '评分',
        timestamp: '',
        href: 'time_pf'
      }, {
        content: '检验',
        timestamp: '',
        href: 'time_jy'

      }, {
        content: '检查',
        timestamp: '',
        href: 'time_jc'

      }, {
        content: 'Holter',
        timestamp: '',
        href: 'time_ht'

      }, {
        content: '心超',
        timestamp: '',
        href: 'time_xc'

      }, {
        content: '其他',
        timestamp: '',
        href: 'time_qt'

      }],

      token: getToken(),

      ecgFileUrl: [],
      hrFileUrl: [],
      eyFileUrl: [],
      is_refluxTypeAorta: false,
      is_refluxTypeTwo: false,
      is_refluxTypeThree: false,

      imgDialogVisible: false,
      dialogImageUrl: '',
      formDisabled: false,
      getInfoLoading: false,
      operationAuthorOption: [
        {
          label: '赵冬冬',
          value: '赵冬冬'
        },
        {
          label: '徐亚伟',
          value: '徐亚伟'
        },
        {
          label: '郭荣',
          value: '郭荣'
        }
      ],
      operationOption: [
        {
          label: '冷冻消融',
          value: '0'
        },
        {
          label: '射频消融',
          value: '1'
        },
        {
          label: '左心耳封堵',
          value: '2'
        },
        {
          label: '永久起搏器植入术',
          value: '3'
        },
        {
          label: '房室结消融',
          value: '4'
        }
      ],
      OperationStatus: [],
      form: {},
      surgeyFromList: [],
      rules: {
        patientName: [{required: true, message: '请输入患者姓名', trigger: 'blur'}],
        idCard: [
          {required: true, message: '请输入患者身份证号码', trigger: 'blur'},
          {validator: checkIdCard, message: '请输入正确的身份证号码！', trigger: 'blur'}
        ],
        gender: [{required: true, message: '请选择患者性别', trigger: 'change'}],
        birthday: [{required: true, message: '请选择患者的出生日期', trigger: 'blur'}],
        // height: [{required: true, message: '请输入患者身高', trigger: 'blur'}],
        // weight: [{required: true, message: '请输入患者体重', trigger: 'blur'}],
        orgId: [{required: true, message: '请选择患者所属机构', trigger: 'change'}],
        cellphone: [
          {required: true, message: '请输入联系方式', trigger: 'blur'},
          // {validator: checkPhone, message: '请输入正确的手机号码', trigger: 'blur'}

        ]
      },

      is_pacemaker: false
    }
  },
  beforeMount() {
    this.form = deepClone(default_form)
    if (this.userInfoDialogType === 'add') {
      this.formDisabled = false
    } else {
      this.formDisabled = true
      this.form = {
        ...this.row
      }
      this.getInfo()
    }
  },
  mounted() {
  },
  watch: {
    'form.idCard': {
      handler(newValue) {
        if (newValue && newValue.length === 18) {
          this.form.birthday = getAge(newValue)
        }
      }
    },
    is_pacemaker: {
      handler(newValue) {
        if (!newValue) {
          this.form.pacemaker = null
        }
      }
    },
    userInfoDialogType(value) {
      value === 'add' ? this.formDisabled = false : this.formDisabled = true
    }
  },
  computed: {

    // 计算属性的 getter
    HAS_BLED: function () {
      console.log(this.form.drinking)
      return this.form.bledHypertension + this.form.liverFunction + this.form.kidneyFunction + this.form.stroke + this.form.bleeding + this.form.inrStable + this.form.bledAge + this.form.drug + this.form.drinking
    },
    VASC: function () {
      return this.form.heartFailure + this.form.vascHypertension + this.form.vascAge + this.form.diabetes + this.form.strokeTiaThrombosis + this.form.vascularDisease + this.form.vascGender
    },
    CODE: function () {
      const code = 'NSH'
      let org = ''

      this.orgList.forEach((item) => {
        if (item.orgId === this.form.orgId) {
          org = item.id.toString() || ''
        }
      })
      while (org.length < 4) {
        org = '0' + org
      }
      let uid = this.form.id.toString() || ''
      while (uid.length < 8) {
        uid = '0' + uid
      }
      const uid1 = uid.substr(0, 4)
      const uid2 = uid.substr(4, 4)
      return code + '-' + org + '-' + uid1 + '-' + uid2
    }
  },
  methods: {
    togglesOperationStatus(index) {
      this.$set(this.OperationStatus, index, !this.OperationStatus[index])
      // this.OperationStatus[index] = !this.OperationStatus[index]
    },
    handleDownloadPDF(ref) {
      localStorage.setItem('PDF_info', JSON.stringify({title: '患者信息', content: this.$refs[ref].$el.innerHTML}))
      const routeData = this.$router.resolve({path: '/pdf/download'})
      window.open(routeData.href, '_blank')
    },
    handleUp() {
      this.formDisabled = false
    },

    async getInfo() {
      const data = await getInfo({patientId: this.row.patientId})
      const info = deepClone(data.data)
      for (const item in info) {
        const itemData = info[item]
        for (const i in itemData) {
          if (isString(itemData[i]) && itemData[i].indexOf('_isList_') >= 0) {
            const d = itemData[i].split('_isList_')[0]
            if (d.length > 0) {
              itemData[i] = d.split('-,-')
            } else {
              itemData[i] = []
            }
          }
          if (i.indexOf('_') >= 0) {
            const f1 = toHump(i)
            itemData[f1] = itemData[i]
            delete itemData[i]
          }

          if (itemData[i] === null || itemData[i] === undefined || itemData[i].length <= 0) {
            delete itemData[i]
          }
        }
        this.form = {
          ...this.form,
          ...itemData
        }
      }

      this.form.ecgFileUrl.forEach((item) => {
        this.ecgFileUrl.push({name: item, url: item, response: {data: item}})
      })
      this.form.hrFileUrl.forEach((item) => {
        this.hrFileUrl.push({name: item, url: item, response: {data: item}})
      })
      this.form.eyFileUrl.forEach((item) => {
        this.eyFileUrl.push({name: item, url: item, response: {data: item}})
      })

      this.is_refluxTypeAorta = false
      this.is_refluxTypeTwo = false
      this.is_refluxTypeThree = false
      if (this.form.refluxTypeAorta && this.form.refluxTypeAorta > 0) {
        this.is_refluxTypeAorta = true
      }
      if (this.form.refluxTypeTwo && this.form.refluxTypeTwo > 0) {
        this.is_refluxTypeTwo = true
      }
      if (this.form.refluxTypeThree && this.form.refluxTypeThree > 0) {
        this.is_refluxTypeThree = true
      }

      if (this.form.pacemaker) {
        this.is_pacemaker = true
      }
      this.getInfoLoading = true
      //
      // for (const f in this.form) {
      //   if (this.form[f].indexOf('-,-')) {
      //     this.form[f] = this.form[f].split('-,-')
      //   }
      //   if (f.indexOf('_') >= 0) {
      //     const f1 = toHump(f)
      //     this.form[f1] = this.form[f]
      //     delete this.form[f]
      //   }
      // }
      // this.form.ablationHistory = 1
      // this.form.antiarrhythmicDrugs = 1
    },

    handleSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const form = deepClone(this.form)
          form.ecgFileUrl = []
          form.hrFileUrl = []
          form.eyFileUrl = []

          this.ecgFileUrl.forEach((item) => {
            item.response.data.split(';').forEach((p) => {
              if (p.length > 0) {
                form.ecgFileUrl.push(p)
              }
            })
          })
          this.hrFileUrl.forEach((item) => {
            item.response.data.split(';').forEach((p) => {
              if (p.length > 0) {
                form.hrFileUrl.push(p)
              }
            })
          })
          this.eyFileUrl.forEach((item) => {
            item.response.data.split(';').forEach((p) => {
              if (p.length > 0) {
                form.eyFileUrl.push(p)
              }
            })
          })

          for (const f in form) {
            if (Object.prototype.toString.call(form[f]) === '[object Array]') {
              form[f] = form[f].join('-,-') + '_isList_'
            }
          }
          console.log(2)

          if (this.userInfoDialogType === 'add') {
            return new Promise((resolve, reject) => {
              delete this.form.patientId
              delete this.form.id

              form.timeArrayList = this.surgeryTimeList()
              addData(form).then(response => {
                console.log(response)
                this.$message({
                  message: '提交成功！',
                  type: 'success'
                })
                this.handleRefresh()
                this.handleReturn()
                resolve(true)
              }).catch(() => {
                reject(false)
              })
            })
          } else {
            return new Promise((resolve, reject) => {
              upData(form).then(response => {
                console.log(response)
                this.$message({
                  message: '提交成功！',
                  type: 'success'
                })
                this.handleRefresh()
                this.handleReturn()
                resolve(true)
              }).catch(() => {
                reject(false)
              })
            })
          }
        } else {
          this.$message({
            message: '数据格式不对，请检查表单内标红提示！',
            type: 'error'
          })
        }
      })
    },

    surgeryTimeList() {
      const time = []
      const date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      const day = date.getDate()

      const interval = [1, 2, 3, 6, 6, 6, 6, 6, 6, 6] // 每次累加的月数。第一次随访在一个月后，所以+1。第二次随访在三个月后。在第一个月的基础上+2。1，3，6，12。
      interval.forEach((item) => {
        // month = (month + item) % 12 + 1
        month += item
        if (month > 12) {
          year++
          month -= 12
        }
        const push_date = new Date(year + '/' + month + '/' + day).getTime()
        time.push(push_date)
      })
      return time.join(',')
    },
    jigou(e) {
      this.orgList.forEach((item) => {
        if (item.orgId === e) {
          this.form.orgName = item.orgName
        }
      })
    },

    handleRemove(file, name) {
      const index = this[name].indexOf(file)
      if (index > -1) {
        this[name].splice(index, 1)
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.imgDialogVisible = true
    },
    handleDownload(file) {
      window.open(file.url)
      console.log(file)
    },
    handleUploadSuccessECG(res, file, fileList) {
      this.ecgFileUrl = fileList
    },
    handleUploadSuccessHR(res, file, fileList) {
      this.hrFileUrl = fileList
    },
    handleUploadSuccessEY(res, file, fileList) {
      this.eyFileUrl = fileList
      console.log(this.eyFileUrl)
    },

    handleRefresh() {
      console.log('handleRefresh')
      this.$emit('handleRefresh')
    },
    handleReturn() {
      console.log('userInfoDialogVisible')
      this.$emit('update:visible', false)
    },
    handleTimeLine(id) {
      console.log(id)
    }
  }

}
</script>

<style scoped lang="scss">
.user-info-body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 15px 20px;
}

.user-info-body-scr {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.user-info-body-content {
  width: 100%;
  flex: auto;
  overflow: hidden;
  display: flex;
  flex-direction: row;
}

.user-info-body-btn {
  height: 40px;
  flex: none;
  text-align: right;
}

.user-info-body-form {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  flex: auto;
}

.user-info-body-form-menu {
  width: 120px;
  height: 100%;
  flex: none;
  margin-top: 20px;
  margin-right: 20px;
}

.el-timeline {
  margin: 0;
  padding: 0;
}

.CHA-num {
  .el-checkbox {
    display: block;
  }
}

.el-divider__text {
  font-weight: bold;
  color: #606266;
}

.addOperation {
  p {
    width: 100%;
    height: 100%;
    text-align: center;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    cursor: pointer;

    border: 1px solid #e6ebf5;

    //border: 0;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  }

  p:hover {
    border: 1px dashed #ccc;
    box-shadow: 0 0 0 0 rgb(0 0 0);
  }
}

//.form-item-title{
//  font-weight: bold;
//  font-size: 18px;
//}

</style>
