<template>
  <div>
    <el-card class="page-content">
      <div class="page-content-btn">
        <p>
        </p>
        <p>
          <template>
            <el-button @click="handleAdd" type="primary" class="pan-btn blue-btn">
              <i class="el-icon-plus"/>
              新增手术
            </el-button>
          </template>
        </p>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        ref="table"
      >
        <el-table-column
          fixed="left"
          label="操作"
          width="180"
        >
          <template slot-scope="scope">
            <el-button @click="handleInfo(scope.row)" type="">详情</el-button>
            <el-button @click="removeDomain(scope)" type="">删除</el-button>
          </template>
        </el-table-column>

        <!--        <el-table-column-->
        <!--          prop="province"-->
        <!--          label="机构状态"-->
        <!--          width="100"-->
        <!--        >-->
        <!--          <template slot-scope="scope">-->
        <!--            <el-tag :type="scope.row.status| statusFilterType">-->
        <!--              {{ scope.row.status | statusFilterTitle }}-->
        <!--            </el-tag>-->
        <!--          </template>-->
        <!--        </el-table-column>-->

        <el-table-column
          label="手术类型"
        >
          <template slot-scope="scope">
            {{ scope.row.surgeyType | typeFilterValue }}
          </template>
        </el-table-column>

        <el-table-column
          label="术者"
          prop="surgeyDoctor"

        >
          <!--          <template slot-scope="scope">-->
          <!--            {{ scope.row.surgeryDoctor }}-->
          <!--          </template>-->
        </el-table-column>

        <el-table-column
          label="手术时间"
        >
          <template slot-scope="scope">
            {{ scope.row.surgeyTime | parseTime }}
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      :title="dialogType==='add'?'新增手术':'手术详情'"
      :visible.sync="dialogVisible"
      width="60%"
      top="5vh"
      append-to-body
      custom-class="workbench"
    >
      <el-scrollbar wrap-class="scrollbar-wrapper" style="overflow-x: hidden">
        <el-form ref="form" :model="form" label-width="80px">
          <el-row>
            <el-form-item
              label-width="130px"
              class="operation-item"
              label="手术类型"
              :rules="{required: true, message: '手术类型不能为空', trigger: 'change'}"
            >
              <el-select
                multiple
                v-model="surgeyFrom.surgeyType"
                @change="operationChange()"
              >
                <el-option
                  v-for="item in operationOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label-width="130px"
              class="operation-item"
              label="时间"
              :rules="{required: true, message: '手术时间不能为空', trigger: 'change'}"
            >
              <el-date-picker
                v-model="surgeyFrom.surgeyTime"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="timestamp"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item
              label-width="130px"
              class="operation-item"
              label="术者"
              :rules="{required: true, message: '术者不能为空', trigger: 'change'}"
            >
              <el-select v-model="surgeyFrom.surgeyDoctor">
                <el-option
                  v-for="item in operationAuthorOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-row>

          <!--                  冷冻消融-->
          <template v-if="surgeyFrom.surgeyType.some((item)=>{return item === '0'})">
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="术前心率"
                  label-width="130px"
                >
                  <el-select v-model="surgeyFrom.surgeyInfo.rhythm">
                    <el-option label="窦性" value="窦性"></el-option>
                    <el-option label="房颤" value="房颤"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="术后复率"
                  label-width="130px"
                >
                  <el-switch
                    v-model="surgeyFrom.surgeyInfo.recovery"
                    active-text="有"
                    inactive-text="无"
                    active-value="1"
                    inactive-value="0"
                  ></el-switch>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item
                  label="冷冻记录"
                  label-width="130px"
                >
                  <el-card
                    v-for="(freezing, f_index) in surgeyFrom.surgeyInfo.freezing_list"
                    :key="f_index"
                    style="margin-bottom: 20px"
                  >
                    <el-row>
                      <el-form-item
                        label="冷冻部位"
                        label-width="130px"
                      >

                        <el-radio-group
                          v-model="surgeyFrom.surgeyInfo.freezing_list[f_index].position"
                        >
                          <el-radio label="LSPV"></el-radio>
                          <el-radio label="LIPV"></el-radio>
                          <el-radio label="RSPV"></el-radio>
                          <el-radio label="RIPV"></el-radio>
                          <el-radio label="其他"></el-radio>
                        </el-radio-group>

                        <!--                              <el-col :span="12">-->
                        <!--                                <el-select v-model="form.operation.aaa">-->
                        <!--                                  <el-option label="LSPV" value="LSPV"></el-option>-->
                        <!--                                  <el-option label="LIPV" value="LIPV"></el-option>-->
                        <!--                                  <el-option label="RSPV" value="RSPV"></el-option>-->
                        <!--                                  <el-option label="RIPV" value="RIPV"></el-option>-->
                        <!--                                </el-select>-->
                        <!--                              </el-col>-->
                      </el-form-item>
                      <!--                              position: '',-->
                      <!--                              time0: '',-->
                      <!--                              c30: '',-->
                      <!--                              c60: '',-->
                      <!--                              c120: '',-->
                      <!--                              freezing_time: '',-->
                      <!--                              mimi_c: '',-->
                      <!--                              tti_time: '',-->
                      <!--                              complication: '',-->
                      <!--                              work_together: '',-->
                      <!--                              vestibular_ablation: ''-->
                      <el-form-item
                        label="0°时间"
                        label-width="130px"
                      >
                        <el-col :span="12">
                          <el-input v-model="surgeyFrom.surgeyInfo.freezing_list[f_index].time0">
                            <template slot="append">秒</template>
                          </el-input>
                        </el-col>
                      </el-form-item>
                      <el-form-item
                        label="30s温度"
                        label-width="130px"
                      >
                        <el-col :span="12">
                          <el-input v-model="surgeyFrom.surgeyInfo.freezing_list[f_index].c30">
                            <template slot="append">℃</template>
                          </el-input>
                        </el-col>
                      </el-form-item>
                      <el-form-item
                        label="60s温度"
                        label-width="130px"
                      >
                        <el-col :span="12">
                          <el-input v-model="surgeyFrom.surgeyInfo.freezing_list[f_index].c60">
                            <template slot="append">℃</template>
                          </el-input>
                        </el-col>
                      </el-form-item>
                      <el-form-item
                        label="120s温度"
                        label-width="130px"
                      >
                        <el-col :span="12">

                          <el-input v-model="surgeyFrom.surgeyInfo.freezing_list[f_index].c120">
                            <template slot="append">℃</template>
                          </el-input>
                        </el-col>
                      </el-form-item>
                      <el-form-item
                        label="冷冻时间"
                        label-width="130px"
                      >
                        <el-col :span="12">
                          <el-input
                            v-model="surgeyFrom.surgeyInfo.freezing_list[f_index].freezing_time"
                          >
                            <template slot="append">秒</template>
                          </el-input>
                        </el-col>
                      </el-form-item>
                      <el-form-item
                        label="最低温度"
                        label-width="130px"
                      >
                        <el-col :span="12">
                          <el-input
                            v-model="surgeyFrom.surgeyInfo.freezing_list[f_index].mimi_c">
                            <template slot="append">℃</template>
                          </el-input>
                        </el-col>
                      </el-form-item>
                      <el-form-item
                        label="TTI时间"
                        label-width="130px"
                      >
                        <el-col :span="12">
                          <el-input
                            v-model="surgeyFrom.surgeyInfo.freezing_list[f_index].tti_time">
                            <template slot="append">秒</template>
                          </el-input>
                        </el-col>

                      </el-form-item>
                      <el-form-item
                        label="并发症"
                        label-width="130px"
                      >
                        <el-checkbox-group
                          v-model="surgeyFrom.surgeyInfo.freezing_list[f_index].complication"
                          class="CHA-num"
                        >
                          <el-checkbox label="迷走反射" name="type"></el-checkbox>
                          <el-checkbox label="膈神经麻痹" name="type"></el-checkbox>
                        </el-checkbox-group>
                      </el-form-item>

                      <el-form-item
                        label="是否共干"
                        label-width="130px"
                      >
                        <el-switch
                          v-model="surgeyFrom.surgeyInfo.freezing_list[f_index].work_together"
                          active-text="有"
                          inactive-text="无"
                        ></el-switch>
                      </el-form-item>

                      <el-form-item
                        label="是否行前庭消融"
                        label-width="130px"
                      >
                        <el-switch
                          v-model="surgeyFrom.surgeyInfo.freezing_list[f_index].vestibular_ablation"
                          active-text="有"
                          inactive-text="无"
                        ></el-switch>
                      </el-form-item>

                      <el-form-item
                        label=""
                        label-width="130px"
                      >
                        <el-button @click.prevent="remove_freezingList(f_index)">删除这条冷冻记录</el-button>
                      </el-form-item>
                    </el-row>
                  </el-card>

                  <el-row>
                    <el-button type="primary" @click="add_freezingList()">
                      + 新增冷冻记录
                    </el-button>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="冷冻总次数"
                  label-width="130px"
                >
                  <el-input disabled :value="get_freezing_all_num()"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="冷冻总时间"
                  label-width="130px"
                >
                  <el-input disabled :value="get_freezing_all_time()">
                    <template slot="append">秒</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="手术时间"
                  label-width="130px"
                >
                  <el-input v-model="surgeyFrom.surgeyInfo.operation_time">
                    <template slot="append">分钟</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="透视时间"
                  label-width="130px"
                >

                  <el-input
                    v-model="surgeyFrom.surgeyInfo.perspective_time"
                  >
                    <template slot="append">秒</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="透视计量"
                  label-width="130px"
                >
                  <el-input
                    v-model="surgeyFrom.surgeyInfo.perspective_metrology"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>

          </template>

          <!--                  射频消融-->
          <template v-if="surgeyFrom.surgeyType.some((item)=>{return item === '1'})">
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="症状"
                  label-width="130px"
                >
                  <el-checkbox-group
                    v-model="surgeyFrom.surgeyInfo.symptom"
                    class="CHA-num"
                  >
                    <!--                            心房颤动、心房颤动（Re-do）、心房扑动、房性心动过速、室性心动过速、房早、室早-->
                    <el-checkbox label="心房颤动" name="type"></el-checkbox>
                    <el-checkbox label="心房颤动（Re-do）" name="type"></el-checkbox>
                    <el-checkbox label="心房扑动" name="type"></el-checkbox>
                    <el-checkbox label="房性心动过速" name="type"></el-checkbox>
                    <el-checkbox label="室性心动过速" name="type"></el-checkbox>
                    <el-checkbox label="房早" name="type"></el-checkbox>
                    <el-checkbox label="室早" name="type"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="补点位置"
                  label-width="130px"
                >
                  <el-checkbox-group
                    v-model="surgeyFrom.surgeyInfo.supplement_point"
                    class="CHA-num"
                  >
                    <!--                            心房颤动、心房颤动（Re-do）、心房扑动、房性心动过速、室性心动过速、房早、室早-->
                    <el-checkbox label="左肺静脉上" name="type"></el-checkbox>
                    <el-checkbox label="左肺静脉下" name="type"></el-checkbox>
                    <el-checkbox label="左肺静脉前" name="type"></el-checkbox>
                    <el-checkbox label="左肺静脉后" name="type"></el-checkbox>
                    <el-checkbox label="右肺静脉上" name="type"></el-checkbox>
                    <el-checkbox label="右肺静脉下" name="type"></el-checkbox>
                    <el-checkbox label="右肺静脉前" name="type"></el-checkbox>
                    <el-checkbox label="右肺静脉后" name="type"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
          </template>

          <!--                  左心耳封堵-->
          <template v-if="surgeyFrom.surgeyType.some((item)=>{return item === '2'})">
            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="左心耳形态"
                  label-width="130px"
                >
                  <el-select v-model="surgeyFrom.surgeyInfo.Left_atrial_appendage_morphology">
                    <el-option label="菜花样" value="菜花样"></el-option>
                    <el-option label="鸡翅形" value="鸡翅形"></el-option>
                    <el-option label="反鸡翅" value="反鸡翅"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="封堵器类型"
                  label-width="130px"
                >
                  <el-radio-group v-model="surgeyFrom.surgeyInfo.occluder_type">
                    <el-radio label="盘式"></el-radio>
                    <el-radio label="塞式"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="封堵器品牌"
                  label-width="130px"
                >
                  <el-input v-model="surgeyFrom.surgeyInfo.brand"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="封堵器大小"
                  label-width="130px"
                >
                  <el-input v-model="surgeyFrom.surgeyInfo.occluder_size"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="是否有反流"
                  label-width="130px"
                >
                  <el-switch
                    v-model="surgeyFrom.surgeyInfo.Whether_there_is_reflux"
                  >
                    active-text="是"
                    inactive-text="否"
                  </el-switch>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="回收次数"
                  label-width="130px"
                >
                  <el-input v-model="surgeyFrom.surgeyInfo.Recovery_times"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="是否换伞"
                  label-width="130px"
                >
                  <el-switch
                    v-model="surgeyFrom.surgeyInfo.Whether_to_change_the_umbrella"
                  >
                    active-text="是"
                    inactive-text="否"
                  </el-switch>
                </el-form-item>
              </el-col>
            </el-row>
          </template>

          <!--                  永久起搏器植入术-->
          <template v-if="surgeyFrom.surgeyType.some((item)=>{return item === '3'})">
            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="起搏器适应症"
                  label-width="130px"
                >
                  <!--                          病态窦房结综合征、高度房室传导阻滞、房室结消融、快慢综合征、室速/室颤、心脏再同步治疗-->
                  <el-checkbox-group
                    v-model="surgeyFrom.surgeyInfo.Pacemaker_indications"
                    class="CHA-num"
                  >
                    <el-checkbox label="病态窦房结综合征"></el-checkbox>
                    <el-checkbox label="高度房室传导阻滞"></el-checkbox>
                    <el-checkbox label="房室结消融"></el-checkbox>
                    <el-checkbox label="快慢综合征"></el-checkbox>
                    <el-checkbox label="室速/室颤"></el-checkbox>
                    <el-checkbox label="心脏再同步治疗"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="起搏器型号"
                  label-width="130px"
                >
                  <el-input
                    v-model="surgeyFrom.surgeyInfo.Pacemaker_model"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="单/双腔"
                  label-width="130px"
                >
                  <el-switch
                    v-model="surgeyFrom.surgeyInfo.Single_double_cavity"
                    active-text="单腔"
                    inactive-text="双腔"
                  >
                  </el-switch>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item
                  label="起搏部位"
                  label-width="130px"
                >
                  <el-radio-group
                    v-model="surgeyFrom.surgeyInfo.Pacing_site"
                  >
                    <!--                            左束支、希氏束、高位间隔部、右室心尖部-->
                    <el-radio label="左束支"></el-radio>
                    <el-radio label="希氏束"></el-radio>
                    <el-radio label="高位间隔部"></el-radio>
                    <el-radio label="右室心尖部"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="达峰时间"
                  label-width="130px"
                >
                  <el-input
                    v-model="surgeyFrom.surgeyInfo.Peak_time"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="心室电极"
                  label-width="130px"
                >
                  <el-row>
                    <el-col :span="24" style="margin-bottom: 20px">
                      <el-input v-model="surgeyFrom.surgeyInfo.Ventricular_electrode_perception">
                        <template slot="prepend">感知</template>
                      </el-input>
                    </el-col>
                    <el-col :span="24" style="margin-bottom: 20px">
                      <el-input v-model="surgeyFrom.surgeyInfo.Ventricular_electrode_threshold">
                        <template slot="prepend">阈值</template>
                      </el-input>
                    </el-col>
                    <el-col :span="24">
                      <el-input v-model="surgeyFrom.surgeyInfo.Ventricular_electrode_impedance">
                        <template slot="prepend">阻抗</template>
                      </el-input>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="心房电极"
                  label-width="130px"
                >
                  <el-row>
                    <el-col :span="24" style="margin-bottom: 20px">
                      <el-input v-model="surgeyFrom.surgeyInfo.Atrial_electrode_perception">
                        <template slot="prepend">感知</template>
                      </el-input>
                    </el-col>
                    <el-col :span="24" style="margin-bottom: 20px">
                      <el-input v-model="surgeyFrom.surgeyInfo.Atrial_electrode_threshold">
                        <template slot="prepend">阈值</template>
                      </el-input>
                    </el-col>
                    <el-col :span="24">
                      <el-input v-model="surgeyFrom.surgeyInfo.Atrial_electrode_impedance">
                        <template slot="prepend">阻抗</template>
                      </el-input>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
          </template>

          <!--                  房室结消融-->
          <template v-if="surgeyFrom.surgeyType.some((item)=>{return item === '4'})">
            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="房室结消融能量"
                  label-width="130px"
                >
                  <el-input
                    v-model="surgeyFrom.surgeyInfo.Atrioventricular_node_ablation_energy"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="房室结消融时间"
                  label-width="130px"
                >
                  <el-input
                    v-model="surgeyFrom.surgeyInfo.Atrioventricular_node_ablation_time"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </template>
          <el-form-item
            label="操作"
            label-width="130px"
          >
            <el-button type="success" @click.prevent="handleSubmitSurgery()">提交</el-button>
          </el-form-item>

        </el-form>
      </el-scrollbar>
    </el-dialog>
    <div class="seat-100">

    </div>
  </div>
</template>

<script>

import {parseTime, deepClone} from '@/utils'
import {addSurgery, delSurgery, getSurgery, upSurgery} from "@/api/surgery";

let orgList = []

const surgeyFromDefault = {
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

export default {
  name: 'PatientInfo',
  components: {},
  filters: {
    typeFilterValue(type) {
      // p：周期性随访，i:主动性随访，手术类型：0-冷冻消融;1-射频消融;2-左心耳封堵;3-永久起搏器植入术;4-房室结消融
      type = type || []
      const typeMap = {
        '0': '冷冻消融',
        '1': '射频消融',
        '2': '左心耳封堵',
        '3': '永久起搏器植入术',
        '4': '房室结消融'
      }
      const key = []
      type.forEach((item) => {
        key.push(typeMap[item])
      })
      return key.join('+')
    },
    orgFilterName(id) {
      const row = orgList.find((item) => {
        return item.id === id
      }) || {
        orgName: '无'
      }
      return row.orgName
    },
    statusFilterType(status) {
      status = status || '0'
      const statusMap = {
        '0': 'danger',
        '1': 'success'
      }
      return statusMap[status]
    },
    statusFilterTitle(status) {
      status = status || '0'
      const statusMap = {
        '0': '冻结',
        '1': '正常'
      }
      return statusMap[status]
    }
  },
  props: {
    patientId: {
      type: String,
      default: ''
    },
    patientName: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      total: 10,
      dialogVisible: false,
      surgeyFrom: {},
      dialogType: 'add',
      form: {
        orgId: '',
        orgName: '',
        status: '',
        parentOrgId: '',
        provice: '',
        city: '',
        remark: ''
      },
      listQuery: {
        pageCount: 50,
        pageNum: 1,
        parentOrgId: '',
        status: '2',
        filter: ''
      },
      tableData: [],
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
    }
  },
  created() {
  },
  mounted() {
    this.getList()
  },
  beforeMount() {
    surgeyFromDefault.patientId = this.patientId
    surgeyFromDefault.patientName = this.patientName
    this.surgeyFrom = deepClone(surgeyFromDefault)
  },
  computed: {
    get_freezing_all_num: function () {
      return () => {
        const num = this.surgeyFrom.surgeyInfo.freezing_list.length
        this.surgeyFrom.surgeyInfo.freezing_all_num = num
        return num
      }
    },
    get_freezing_all_time: function () {
      return () => {
        let time = 0
        this.surgeyFrom.surgeyInfo.freezing_list.forEach((item) => {
          time += parseInt(item.freezing_time)
        })
        this.surgeyFrom.surgeyInfo.freezing_all_time = time
        return time
      }
    }
  },
  methods: {
    handleSearch() {
      this.listQuery.pageNum = 1
      this.getList()
    },
    handleInfo(row) {
      console.log(row)
      this.dialogVisible = true
      this.dialogType = 'edit'
      this.surgeyFrom = deepClone(row)
      // this.form.surgeyInfo = JSON.parse(this.form.surgeryInfo)
    },
    handleAdd() {
      this.dialogType = 'add'
      this.dialogVisible = true
      this.surgeyFrom = deepClone(surgeyFromDefault)

    },
    async getList() {
      const data = await getSurgery({patientId: this.patientId})
      const surgeyList = data.data || []
      surgeyList.forEach((item) => {
        item.surgeyInfo = JSON.parse(item.surgeryInfo)
        item.surgeyType = item.surgeryType.split(',')
        item.surgeyDoctor = item.surgeryDoctor
        item.surgeyId = item.surgeryId
        item.surgeyTime = item.surgeryTime

        delete item.surgeryType
        delete item.surgeryDoctor
        delete item.surgeryTime
        delete item.surgeryInfo
        delete item.createTime
        delete item.updateTime
      })
      this.tableData = surgeyList
      console.log(this.tableData)
    },
    surgeryTimeList(surgeryTime) {

      const time = []
      let date
      if (!surgeryTime) {
        date = new Date()
      } else {
        date = new Date(surgeryTime)
      }
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
    handleSubmitSurgery(index) {
      // 提交手术信息
      const data = deepClone(this.surgeyFrom)
      console.log(2)
      data.surgeyInfo = JSON.stringify(data.surgeyInfo)
      data.surgeyType = data.surgeyType.join(',')
      data.timeArrayList = this.surgeryTimeList(data.surgeyTime)
      console.log(1)
      if (!data.surgeyId || data.surgeyId.length <= 0) {
        return new Promise((resolve, reject) => {
          console.log(3)
          addSurgery(data).then(response => {
            this.$message({
              message: '提交成功！',
              type: 'success'
            })
            this.dialogVisible = false
            this.getList()
            resolve(true)
          }).catch(() => {
            reject(false)
          })
        })
      } else {
        return new Promise((resolve, reject) => {
          upSurgery(data).then(response => {
            console.log(response)
            this.$message({
              message: '提交成功！',
              type: 'success'
            })
            this.dialogVisible = false
            this.getList()
            resolve(true)
          }).catch(() => {
            reject(false)
          })
        })
      }
    },

    operationChange() {
      // 手术类型改变
      const surgeyFrom = this.surgeyFrom
      surgeyFrom.surgeyInfo = {}
      console.log(surgeyFrom.surgeyType)
      surgeyFrom.surgeyType.forEach((item) => {
        this.$set(this.surgeyFrom, 'surgeyInfo', {
          ...surgeyFrom.surgeyInfo,
          ...surgey[item]
        })
      })
      console.log(this.surgeyFrom)
    },
    remove_freezingList(f_index) {
      this.surgeyFrom.surgeyInfo.freezing_list.splice(f_index, 1)
    },
    add_freezingList() {
      // 新增冷冻记录
      this.surgeyFrom.surgeyInfo.freezing_list.push(deepClone(freezing_info))
    },

    addDomain() {
      this.surgeyFrom = deepClone(surgeyFromDefault)
    },
    removeDomain(score) {
      const index = score.$index
      const item = score.row
      this.$confirm('此操作将删除该记录,不可恢复。 是否继续?', '提示', {
        confirmButtonText: '继续',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (item.surgeyId && item.surgeyId.length > 0) {
          return new Promise((resolve, reject) => {
            delSurgery({surgeryId: item.surgeyId}).then(response => {
              console.log(response)
              this.tableData.splice(index, 1)

              this.$message({
                message: '删除成功！',
                type: 'success'
              })
              resolve(true)
            }).catch(() => {
              reject(false)
            })
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.dark {
  background-color: #344b58;

  .toggleView {
    color: #ffffff;
  }
}

.table-list-item-info-btn {
  color: #1890ff;
  cursor: pointer;
}

.table-list-item-info-btn:hover {
  text-decoration: underline;

}

.table-list {
  margin-top: -10px;
  margin-bottom: -10px;
}

.table-list-item {
  height: 168px;
  margin: 10px 0;
}

</style>
