<template>
  <div class="user-info-body">
    <div class="user-info-body-form">
      <p>
        {{ visitTypeName }}
      </p>
      <el-form ref="form" :model="form" label-width="220px" :disabled="!isEdit" :rules="rules">

        <!--        <el-form-item :label="visitTypeList[visitType]">-->
        <!--          <el-col :span="13">-->
        <!--            <el-input-->
        <!--              :value="'这是一个 '+(visitTypeList[visitType])+' 随访，后续会根据随访不同实现不同的录入界面'"-->
        <!--              disabled-->
        <!--            ></el-input>-->
        <!--          </el-col>-->
        <!--        </el-form-item>-->

        <el-divider content-position="left">心电图</el-divider>

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

        <el-divider content-position="left">Holter</el-divider>

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

        <el-divider content-position="left">心超</el-divider>

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

        <el-form-item label="心衰类型">
          <el-radio-group v-model="form.heartFailureType">
            <el-radio :label="0">1HFrEF</el-radio>
            <el-radio :label="1">2HFmrEF</el-radio>
            <el-radio :label="2">3HFpEF</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="返流类型">
          <el-radio-group v-model="form.refluxType">
            <el-radio :label="0">二尖瓣</el-radio>
            <el-radio :label="1">三尖瓣</el-radio>
            <el-radio :label="2">主动脉瓣</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="返流程度">
          <el-radio-group v-model="form.degree">
            <el-radio :label="0">轻</el-radio>
            <el-radio :label="1">中</el-radio>
            <el-radio :label="2">重</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-divider content-position="left">检验相关</el-divider>

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

        <el-divider content-position="left">评分</el-divider>

        <el-form-item label="CHA2DS2-VASc评分">

          <div style="width: 100px">
            <el-input :value="VASC" :disabled="true">
            </el-input>
          </div>
          <el-checkbox v-model="form.heartFailure" :true-label="1" :false-label="0" label="充血性心力衰竭/左心功能不全（1分）"
          ></el-checkbox>
          <br/>
          <el-checkbox v-model="form.vascHypertension" :true-label="1" :false-label="0" label="高血压（1分）"></el-checkbox>
          <br/>
          <el-checkbox v-model="form.vascAge" :true-label="2" :false-label="0" label="年龄≥75岁（2分）"></el-checkbox>
          <br/>
          <el-checkbox v-model="form.diabetes" :true-label="1" :false-label="0" label="糖尿病（1分）"></el-checkbox>
          <br/>
          <el-checkbox v-model="form.strokeTiaThrombosis" :true-label="2" :false-label="0" label="中风/TIA/血栓史（2分）"
          ></el-checkbox>
          <br/>
          <el-checkbox v-model="form.vascularDisease" :true-label="1" :false-label="0" label="血管病变（1分）"></el-checkbox>
          <br/>
          <el-checkbox v-model="form.vascAge" :true-label="1" :false-label="0" label="年龄65-74岁（1分）"></el-checkbox>
          <br/>
          <el-checkbox v-model="form.vascGender" :true-label="1" :false-label="0" label="性别（女性）（1分）"></el-checkbox>

        </el-form-item>

        <el-divider content-position="left">用药情况</el-divider>


        <!--        take_antiarrhythmic_drugs: '',-->
        <!--        drug_name: '',-->
        <!--        dose: '',-->
        <!--        take_anticoagulants: '',-->
        <!--        types_of_anticoagulant_drugs: '',-->
        <!--        Are_there_any_symptoms: '',-->
        <!--        Is_there_evidence_of_recurrence_of_atrial_fibrillation: '',-->
        <!--        Is_there_any_stroke_TIA: '',-->

        <el-form-item label="是否服用抗心律失常药">
          <div style="width: 250px;">
            <el-switch
              v-model="form.take_antiarrhythmic_drugs"
              active-text="是"
              inactive-text="否"
            ></el-switch>
          </div>
          <div style="width: 250px;margin-top: 10px">
            <el-input v-model="form.drug_name">
              <template slot="prepend">药物名称</template>
            </el-input>
          </div>
          <div style="width: 250px;margin-top: 10px">
            <el-input v-model="form.dose">
              <template slot="prepend">剂量</template>
            </el-input>
          </div>
        </el-form-item>

        <el-form-item label="是否服用抗凝药">
          <div style="width: 250px;">
            <el-switch
              v-model="form.take_anticoagulants"
              active-text="是"
              inactive-text="否"
            ></el-switch>
          </div>
        </el-form-item>

        <el-form-item label="抗凝药物种类">
          <el-radio-group v-model="form.types_of_anticoagulant_drugs">
            <el-radio label="华法林">华法林</el-radio>
            <el-radio label="利伐沙班">利伐沙班</el-radio>
            <el-radio label="达比加群">达比加群</el-radio>
            <el-radio label="艾多沙班">艾多沙班</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="是否有症状">
          <el-switch
            v-model="form.Are_there_any_symptoms"
            active-text="是"
            inactive-text="否"
          ></el-switch>
        </el-form-item>

        <el-form-item label="是否有房颤复发证据">
          <el-checkbox-group v-model="form.Is_there_evidence_of_recurrence_of_atrial_fibrillation" class="CHA-num">
            <el-checkbox label="房性心动过速" name="type"></el-checkbox>
            <el-checkbox label="心房扑动" name="type"></el-checkbox>
            <el-checkbox label="心房颤动" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="是否有发生脑卒中/TIA">
          <el-switch
            v-model="form.Is_there_any_stroke_TIA"
            active-text="是"
            inactive-text="否"
          ></el-switch>
        </el-form-item>

        <template v-if="visitType.indexOf('3')>=0||visitType.indexOf('4')>=0">
          <el-divider content-position="left">起搏器手术与房室结消融</el-divider>
          <!--        感知、阈值、阻抗、起搏比例-->
          <el-form-item label="感知">

            <div style="width: 250px">
              <el-input value="">
              </el-input>
            </div>
          </el-form-item>
          <el-form-item label="阈值">

            <div style="width: 250px">
              <el-input value="">
              </el-input>
            </div>
          </el-form-item>
          <el-form-item label="阻抗">

            <div style="width: 250px">
              <el-input value="">
              </el-input>
            </div>
          </el-form-item>
          <el-form-item label="起搏比例">

            <div style="width: 250px">
              <el-input value="">
              </el-input>
            </div>
          </el-form-item>
        </template>

        <template v-if="visitType.indexOf('4')>=0">
          <el-form-item label="是否重连">
            <el-switch
              v-model="form.delivery"
              active-text="是"
              inactive-text="否"
            ></el-switch>
          </el-form-item>
        </template>
      </el-form>
    </div>
    <div class="user-info-body-btn">
      <el-button v-if="formDisabled" type="primary" @click="handleUp">修改</el-button>
      <template v-else>
        <el-button v-if="isEdit" type="success" @click="handleSubmit(1)">完成随访</el-button>
        <el-button v-if="isEdit" type="primary" @click="handleSubmit(2)">保存数据</el-button>
        <el-button type="info" @click="handleDownloadPDF('form')">导出PDF</el-button>
        <el-button @click="handleReturn">返回列表</el-button>
      </template>
    </div>
  </div>
</template>

<script>
import {deepClone} from '@/utils'
import {addData, upData} from '@/api/visit'

let default_record = {
  context: '',
  doctorId: '',
  doctorName: '',
  patientId: '',
  patientName: '',
  planType: '',
  status: '',
  remark: '',
  timeArrayList: []
}
let default_form = {

  // sf_ecg
  bpm: null,
  pr: null,
  qrsTime: null,
  qrsShaft: null,
  qt: null,
  qtc: null,
  rS: null,
  conductionBlock: [],

  ecgFileUrl: '',
  hrFileUrl: '',
  eyFileUrl: '',

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
  heartFailureType: null,
  refluxType: null,
  degree: null,

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

  // CHA2DS2_VASc
  heartFailure: 0,
  vascHypertension: 0,
  vascAge: 0,
  diabetes: 0,
  strokeTiaThrombosis: 0,
  vascularDisease: 0,
  vascGender: 0,

  take_antiarrhythmic_drugs: '否',
  drug_name: '',
  dose: '',
  take_anticoagulants: '否',
  types_of_anticoagulant_drugs: '',
  Are_there_any_symptoms: '否',
  Is_there_evidence_of_recurrence_of_atrial_fibrillation: [],
  Is_there_any_stroke_TIA: '否',

  remark: '无'
}
export default {
  name: 'VisitInfo',
  props: {
    visitType: {
      type: String,
      default: '' // 0 常规 ，1日常，2起搏器手术，3房室结消融
    },
    editInfoType: {
      type: String,
      default: 'edit'
    },
    row: {
      type: Object,
      default: null
    },
    editType: {
      type: Boolean,
      default: null
    },
    isEdit: {
      type: Boolean,
      default: null
    }
  },
  data() {
    return {
      visitTypeList: [],
      formDisabled: false,
      record_form: {},
      form: {},
      rules: {
        name: [{required: true, message: '请输入患者姓名', trigger: 'change'}],
        id: [{required: true, message: '请输入患者身份证号码', trigger: 'change'}],
        sex: [{required: true, message: '请选择患者性别', trigger: 'blur'}]
      },
      userInfo: ''
    }
  },
  beforeMount() {
    console.log(this.row)
    this.record_form = deepClone(this.row)
    if (this.editInfoType === 'edit' && this.record_form.context && this.record_form.context.length > 0) {
      this.form = JSON.parse(this.record_form.context)
    } else {
      this.form = deepClone(default_form)
    }
    console.log(1234)
    console.log(this.visitType)
    console.log(this.form)
  },
  mounted() {
    this.userInfo = this.$store.getters.userInfo
    // this.userInfoDialogType === 'add' ? this.formDisabled = false : this.formDisabled = true
  },
  watch: {
    userInfoDialogType(value) {
      value === 'add' ? this.formDisabled = false : this.formDisabled = true
    }
  },
  computed: {
    // 计算属性的 getter
    visitTypeName: function () {
      if (this.visitType === 'p') {
        return '周期随访'
      }
      if (this.visitType === 'i') {
        return '主动随访'
      }
      if (this.visitType && this.visitType.length > 0) {
        const list = this.visitType.split(',')
        const name = []
        const nameList = {
          '0': '冷冻消融',
          '1': '射频消融',
          '2': '左心耳封堵',
          '3': '永久起搏器植入术',
          '4': '房室结消融'
        }
        list.forEach((item) => {
          name.push(nameList[item])
        })
        return name.join('+')
      }
    },
    VASC: function () {
      return this.form.heartFailure + this.form.vascHypertension + this.form.vascAge + this.form.diabetes + this.form.strokeTiaThrombosis + this.form.vascularDisease + this.form.vascGender
    }
  },
  methods: {
    handleUp() {
      this.formDisabled = false
    },
    handleSubmit(status) {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.editInfoType === 'add') {
            return new Promise((resolve, reject) => {

              const form = JSON.stringify(this.form)
              this.record_form.context = form
              const data = deepClone(this.record_form)

              data.timeArrayList = new Date().getTime()
              data.status = status
              data.planType = 0

              delete data.id
              delete data.recordId
              delete data.startTime
              delete data.createTime
              delete data.updateTime
              data.doctorId = this.userInfo.doctorId
              data.doctorName = this.userInfo.doctorName

              addData(data).then(response => {
                this.$message({
                  message: '提交成功！',
                  type: 'success'
                })
                this.handleReturn()
                this.handleRefresh()

                resolve(true)
              }).catch(() => {
                reject(false)
              })
            })
          } else {
            return new Promise((resolve, reject) => {
              const form = JSON.stringify(this.form)
              this.record_form.context = form
              this.record_form.status = status
              this.record_form.doctorId = this.userInfo.doctorId
              this.record_form.doctorName = this.userInfo.doctorName
              upData(this.record_form).then(response => {
                this.$message({
                  message: '提交成功！',
                  type: 'success'
                })
                this.handleReturn()
                this.handleRefresh()
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
    handleRefresh() {
      this.$emit('handleRefresh')
    },
    handleReturn() {
      this.$emit('update:editType', false)
    },
    handleDownloadPDF(ref) {
      localStorage.setItem('PDF_info', JSON.stringify({title: '随访', content: this.$refs[ref].$el.innerHTML}))
      const routeData = this.$router.resolve({path: '/pdf/download'})
      window.open(routeData.href, '_blank')
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
  display: flex;
  flex-direction: column;
}

.user-info-body-form {
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  flex: auto;
}

.user-info-body-btn {
  flex: none;
  text-align: right;
}

.CHA-num {
  .el-checkbox {
    display: block;
  }
}
</style>
