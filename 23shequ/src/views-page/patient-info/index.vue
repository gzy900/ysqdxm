<template>
  <div>
    <div class="page-header">
      <div class="search">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="search-item">
              <p class="search-item-title">患者信息：</p>
              <p class="search-item-input">
                <el-input size="small" clearable :label="'基础信息'" v-model="listQuery.filter"
                          placeholder="姓名/手机号"></el-input>
              </p>
            </div>
          </el-col>

          <el-col :span="6" v-if="userInfo.doctorId==='0'">
            <div class="search-item">
              <p class="search-item-title">所属医生：</p>
              <p class="search-item-input">
                <el-select
                  clearable
                  v-model="listQuery.doctorId"
                  placeholder="请选择所属医生">
                  <el-option v-for="item in doctorList" :label="item.doctorName" :value="item.doctorId"></el-option>
                  <!--                <el-option label="上海移视科技" :value="1"></el-option>-->
                </el-select>
              </p>
            </div>
          </el-col>


          <el-col :span="6">
            <div class="search-item">
              <p class="search-item-title">病理因素：</p>
              <p class="search-item-input">
                <el-select
                  clearable
                  v-model="listQuery.pathFactors"
                  placeholder="请选择病理因素">
                  <el-option v-for="item in pathFactorsOption" :label="item.label" :value="item.value"></el-option>
                  <!--                <el-option label="上海移视科技" :value="1"></el-option>-->
                </el-select>
              </p>
            </div>
          </el-col>


          <el-col :span="6">
            <div class="search-item">
              <p class="search-item-title">生理因素：</p>
              <p class="search-item-input">
                <el-select
                  clearable
                  v-model="listQuery.physiFactors"
                  placeholder="请选择病理因素">
                  <el-option v-for="item in physiFactorsOption" :label="item.label" :value="item.value"></el-option>
                  <!--                <el-option label="上海移视科技" :value="1"></el-option>-->
                </el-select>
              </p>
            </div>
          </el-col>

          <el-col :span="6">
            <div class="search-item">
              <p class="search-item-title">机构：</p>
              <p class="search-item-input">
                <el-select v-model="listQuery.orgId" placeholder="请选择所属机构" @change="jigou">
                  <el-option v-for="item in orgList" :label="item.orgName" :value="item.orgId"></el-option>

                </el-select>
              </p>
            </div>
          </el-col>

          <el-col :span="6">
            <div class="search-item">
              <p class="search-item-title">性别：</p>
              <p class="search-item-input">
                <el-select
                  clearable
                  v-model="listQuery.gender"
                  placeholder="请选择性别"
                >
                  <el-option label="男" :value="1"></el-option>
                  <el-option label="女" :value="0"></el-option>
                </el-select>
              </p>
            </div>
          </el-col>

          <el-col :span="6">
            <div class="search-item">
              <p class="search-item-title">干预治疗：</p>
              <p class="search-item-input">
                <el-select
                  clearable
                  v-model="listQuery.isHeal"
                  placeholder="请选择"
                >
                  <el-option label="无需治疗" :value="0"></el-option>
                  <el-option label="需要干预" :value="1"></el-option>
                </el-select>
              </p>
            </div>
          </el-col>

          <el-col :span="6">
            <div class="search-item">
              <p class="search-item-title">地址：</p>
              <p class="search-item-input">
                <el-input v-model="listQuery.address"></el-input>
              </p>
            </div>
          </el-col>

          <el-col :span="6">
            <div class="search-item">
              <!--              <p class="search-item-title">操作：</p>-->
              <p class="search-item-input">
                <el-button type="primary" class="pan-btn blue-btn" @click="handleSearch"><i class="el-icon-search"/> 查询
                </el-button>
                <!--                <el-button type="info" class="pan-btn ash-btn"><i class="el-icon-refresh-right"/> 还原</el-button>-->
              </p>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <el-card class="page-content">
      <div class="page-content-btn">
        <p>
          <!--          <svg-icon icon-class="excel" />-->
          <!--          <svg-icon icon-class="pdf" />-->

          <svg-icon class="toggleView" @click="toggleUserDataView" icon-class="component" v-if="userDataView"/>
          <svg-icon class="toggleView" @click="toggleUserDataView" icon-class="list" v-else/>
        </p>
        <p>
          <!--          <el-button type="info" class="pan-btn ash-btn" @click="handleDownload">-->
          <!--            <svg-icon icon-class="excel"/>-->
          <!--            导出Excel-->
          <!--          </el-button>-->
          <el-button
            type="info"
            class="pan-btn ash-btn"
            @click="handleDownloadALL"
            v-loading.fullscreen.lock="downLoadLoading">
            <svg-icon icon-class="excel"/>
            导出Excel
          </el-button>
          <!--          <el-button type="info" class="pan-btn ash-btn" @click="handleDownloadPDF('table')">-->
          <!--            <svg-icon icon-class="pdf"/>-->
          <!--            导出PDF-->
          <!--          </el-button>-->
          <el-button @click="handleAddUser" type="primary" class="pan-btn blue-btn">
            <i class="el-icon-plus"/>
            新增患者
          </el-button>
        </p>
      </div>
      <el-table
        v-if="userDataView"
        :data="tableData"
        border
        style="width: 100%"
        ref="table"
      >
        <el-table-column
          fixed="left"
          label="操作"
          width="390"
        >
          <template slot-scope="scope">
            <el-button @click="handleInfo(scope)" type="">详情</el-button>
            <el-button @click="handleDelete(scope)" type="danger">删除</el-button>
            <!--            <el-button-->
            <!--              v-if="Math.floor(scope.row.frozenStatus)===0"-->
            <!--              @click="handleOpenUserStatus(scope,1)"-->
            <!--              type="danger">冻结-->
            <!--            </el-button>-->
            <!--            <el-button v-else @click="handleOpenUserStatus(scope,0)" type="warning">解冻</el-button>-->

            <el-button @click="handleOpenReportList(scope)" type="primary">报告记录</el-button>
            <el-button @click="handleAddReport(scope)" type="success">新增报告</el-button>
            <el-button v-if="scope.row.deviceStatus==='1'" @click="handleUpdeviceStatus(scope,'0')">归还</el-button>
            <el-button v-else @click="handleUpdeviceStatus(scope,'1')" type="warning">借出</el-button>
          </template>
        </el-table-column>

        <!--        <el-table-column-->
        <!--          label="用户标签"-->
        <!--          width="200"-->
        <!--        >-->
        <!--          <template slot-scope="scope">-->
        <!--            &lt;!&ndash;            <el-tag :type="Math.floor(Math.random()*3)|tagType" closable @close="handleCloseTag">&ndash;&gt;-->
        <!--            &lt;!&ndash;              {{ Math.floor(Math.random() * 3)| tagName }}&ndash;&gt;-->
        <!--            &lt;!&ndash;            </el-tag>&ndash;&gt;-->
        <!--            &lt;!&ndash;            <el-button type="text">&ndash;&gt;-->
        <!--            &lt;!&ndash;              新增 +&ndash;&gt;-->
        <!--            &lt;!&ndash;            </el-button>&ndash;&gt;-->

        <!--            <el-select v-model="scope.row.tagValue" multiple placeholder="请选择">-->
        <!--              <el-option-->
        <!--                v-for="item in tagOption"-->
        <!--                :key="item.value"-->
        <!--                :label="item.label"-->
        <!--                :value="item.value">-->
        <!--              </el-option>-->
        <!--            </el-select>-->
        <!--          </template>-->
        <!--        </el-table-column>-->

        <!--        <el-table-column-->
        <!--          label="账户状态"-->
        <!--          width="80"-->
        <!--        >-->
        <!--          <template slot-scope="scope">-->
        <!--            <el-tag :type="scope.row.frozenStatus|fitterFrozenStatusType">-->
        <!--              {{ scope.row.frozenStatus| fitterFrozenStatus }}-->
        <!--            </el-tag>-->
        <!--          </template>-->
        <!--        </el-table-column>-->


        <el-table-column
          prop="patientName"
          label="姓名"
          width="150"
        >
        </el-table-column>

        <el-table-column
          prop="cellphone"
          label="联系方式"
          width="180"
        >
          <template slot-scope="scope">
            {{ scope.row.cellphone| cellphoneList }}

            <el-popover
              v-if="scope.row.cellphone.split(',').length>1"
              placement="bottom"
              width="200"
              trigger="click">
              <span v-for="item in scope.row.cellphone.split(',')">
                {{ item }} <br/>
              </span>
              <span slot="reference" style="cursor: pointer;color: #1890ff">[更多]</span>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column
          prop="pathFactors"
          label="病理因素"
          width="140px"
        >
        </el-table-column>

        <el-table-column
          prop="physiFactors"
          label="生理因素"
          width="140px"

        >
        </el-table-column>

        <el-table-column
          prop="diagnose"
          label="诊断"
          width="140px"
        >
          <template slot-scope="scope">
            {{ diagnoseLen(scope.row.diagnose) }}
          </template>
        </el-table-column>

        <el-table-column
          prop="isHeal"
          label="干预治疗"
          width="90px"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.isHeal|healFilterType">
              {{ scope.row.isHeal|healFilterTitle }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column
          prop="suggestion"
          label="建议"
          width="140px"

        >
        </el-table-column>

        <el-table-column
          prop="orgName"
          label="机构"
          width="100"
        >
        </el-table-column>

        <el-table-column
          prop="doctorName"
          label="所属医生"
          width="100"
        >
        </el-table-column>

        <el-table-column
          prop="gender"
          label="性别"
          width="100"
        >
          <template slot-scope="scope">
            {{ scope.row.gender| genderType }}
          </template>
        </el-table-column>

        <!--        <el-table-column-->
        <!--          label="出生日期"-->
        <!--          width="100"-->
        <!--        >-->
        <!--          <template slot-scope="scope">-->
        <!--            {{ scope.row.birthday|parseTime('{y}-{m}-{d}') }}-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <!--        -->
        <el-table-column
          label="年龄"
          width="100"
        >
          <template slot-scope="scope">
            {{ scope.row.age }}
          </template>
        </el-table-column>

        <el-table-column
          prop="height"
          label="身高(cm)"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="weight"
          label="体重(kg)"
          width="80"
        >
        </el-table-column>

        <el-table-column
          prop="patientName"
          label="患者编码"
          width="150"
        >
          <template slot-scope="scope">
            {{ scope.row.id| userCode(orgList,scope.row.orgId) }}
          </template>
        </el-table-column>

        <!--        <el-table-column-->
        <!--          prop="province"-->
        <!--          label="手术记录"-->
        <!--          width="100"-->
        <!--        >-->
        <!--          <template slot-scope="scope">-->
        <!--            <el-tag :type="scope.row.num| numFilterType">-->
        <!--              {{ scope.row.num }}-->
        <!--            </el-tag>-->
        <!--          </template>-->
        <!--        </el-table-column>-->

        <!--        <el-table-column-->
        <!--          prop="province"-->
        <!--          label="随访次数"-->
        <!--          width="100"-->
        <!--        >-->
        <!--          <template slot-scope="scope">-->
        <!--            <el-tag :type="scope.row.num| numFilterType">-->
        <!--              {{ scope.row.num }}-->
        <!--            </el-tag>-->
        <!--          </template>-->
        <!--        </el-table-column>-->

        <!--        <el-table-column-->
        <!--          prop="province"-->
        <!--          label="随访需求"-->
        <!--          width="100"-->
        <!--        >-->
        <!--          <template slot-scope="scope">-->
        <!--            <el-tag :type="scope.row.status| statusFilterType">-->
        <!--              {{ scope.row.status | statusFilterTitle }}-->
        <!--            </el-tag>-->
        <!--          </template>-->
        <!--        </el-table-column>-->

        <el-table-column
          prop="idCard"
          label="身份证号"
          width="140px"

        >
        </el-table-column>

        <el-table-column
          prop="deviceNum"
          label="设备号"
          width="140px"
        >
        </el-table-column>

        <el-table-column
          prop="operator"
          label="操作员"
          width="140px"

        >
        </el-table-column>

        <el-table-column
          prop="address"
          label="地址"
          width="140px"
        >
        </el-table-column>

        <el-table-column
          label="创建日期"
          width="120px"
        >
          <template slot-scope="scope">
            {{ scope.row.updateTime|parseTime('{y}-{m}-{d}') }}
          </template>
        </el-table-column>
      </el-table>

      <el-row v-else :gutter="20" class="table-list">
        <chart></chart>
      </el-row>
    </el-card>

    <sticky :z-index="10" className="pagination-sticky" style="margin-top: 15px;">
      <pagination
        ref="pagination"
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.pageNum"
        :limit.sync="listQuery.pageCount"
        @pagination="getList"
      />
    </sticky>

    <el-dialog
      :title="userInfoDialogType==='add'?'新增患者':'患者详情'"
      :visible.sync="userInfoDialogVisible"
      width="72%"
      top="5vh"
      custom-class="workbench"
      @close="handleUserInfoClose"
    >
      <el-form
        v-if="userInfoDialogVisible"
        ref="form"
        label-suffix="："
        :model="form"
        label-width="220px"
        :rules="rules"
        style="overflow: auto;height: 100%"
        class="shequhuangzhe"
      >

        <el-form-item v-if="userInfoDialogType!=='add'" label="患者唯一编码">
          <el-col :span="12">
            <el-input v-model="CODE" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="姓名" prop="patientName">
          <el-col :span="6">
            <el-input v-model="form.patientName"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="年龄">
          <el-col :span="6">
            <el-input v-model="form.age"></el-input>
          </el-col>
        </el-form-item>

        <!--        <el-form-item label="出生日期" prop="birthday">-->
        <!--          <el-col :span="6">-->
        <!--            <el-date-picker-->
        <!--              v-model="form.birthday"-->
        <!--              type="date"-->
        <!--              placeholder="选择日期"-->
        <!--              format="yyyy 年 MM 月 dd 日"-->
        <!--              value-format="timestamp"-->
        <!--            >-->
        <!--            </el-date-picker>-->
        <!--          </el-col>-->
        <!--        </el-form-item>-->

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


        <el-form-item label="身份证号">
          <el-col :span="12">
            <el-input v-model="form.idCard"></el-input>
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

        <el-form-item label="所属医生" prop="doctorId">
          <el-col :span="12">
            <el-select :disabled="userInfo.doctorId!=='0'" v-model="form.doctorId" placeholder="请选择所属医生">
              <el-option v-for="item in doctorList" :label="item.doctorName" :value="item.doctorId"></el-option>
              <!--                <el-option label="上海移视科技" :value="1"></el-option>-->
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label="所属机构" prop="orgId">
          <el-col :span="12">
            <el-select v-model="form.orgId" placeholder="请选择所属机构" @change="jigou">
              <el-option v-for="item in orgList" :label="item.orgName" :value="item.orgId"></el-option>
              <!--                <el-option label="上海移视科技" :value="1"></el-option>-->
            </el-select>
          </el-col>
        </el-form-item>


        <el-form-item label="病理因素">
          <el-col :span="12">
            <el-select v-model="form.pathFactorsList" placeholder="请选择病理因素" multiple>
              <el-option v-for="item in pathFactorsOption" :label="item.label" :value="item.value"></el-option>
              <!--                <el-option label="上海移视科技" :value="1"></el-option>-->
            </el-select>
          </el-col>
        </el-form-item>


        <el-form-item label="症状">
          <el-col :span="12">
            <!--            <el-select v-model="form.deviceNum" placeholder="请输入设备号" @change="jigou">-->
            <!--              <el-option v-for="item in orgList" :label="item.orgName" :value="item.orgId"></el-option>-->
            <!--              &lt;!&ndash;                <el-option label="上海移视科技" :value="1"></el-option>&ndash;&gt;-->
            <!--            </el-select>-->
            <el-input v-model="form.symptom"></el-input>

          </el-col>
        </el-form-item>

        <el-form-item label="生理因素">
          <el-col :span="12">
            <el-select v-model="form.physiFactorsList" placeholder="请选择生理因素" multiple>
              <el-option v-for="item in physiFactorsOption" :label="item.label" :value="item.value"></el-option>
              <!--                <el-option label="上海移视科技" :value="1"></el-option>-->
            </el-select>
          </el-col>
        </el-form-item>


        <el-form-item label="设备号">
          <el-col :span="12">
            <el-input v-model="form.deviceNum" @input="handleChangeDeviceNum"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="设备状态">
          <el-col :span="12">
            <el-select v-model="form.deviceStatus">
              <el-option value="0" label="归还状态"></el-option>
              <el-option value="1" label="借出状态"></el-option>
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label="诊断">
          <el-col :span="12">

            <el-cascader
              v-model="form.diagnoseList"
              :show-all-levels="false"
              :options="diagnoseOption"
              :props="{multiple:true,expandTrigger:'hover'}"
              clearable>

            </el-cascader>
          </el-col>
        </el-form-item>

        <el-form-item label="干预治疗">
          <el-col :span="12">

            <el-switch
              style="display: block"
              v-model="form.isHeal"
              active-color="#ffba00"
              active-text="需要干预"
              :active-value='1'

              inactive-color="#13ce66"
              inactive-text="无需干预"
              :inactive-value="0"
            >
            </el-switch>
          </el-col>
        </el-form-item>

        <el-form-item label="建议">
          <el-col :span="12">
            <el-input
              type="textarea"
              :rows="4"
              v-model="form.suggestion"
              placeholder="请输入建议"
            ></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="地址">
          <el-col :span="12">
            <el-input
              type="textarea"
              :rows="4"
              v-model="form.address"
              placeholder="请输入地址"
            ></el-input>
          </el-col>
        </el-form-item>


        <el-form-item style="text-align: right">
          <el-button @click="userInfoDialogType = false">取消</el-button>
          <el-button :disabled="submitStatus===1" @click="handleConfirmAddUser" type="primary">提交</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>

    <el-dialog
      :title="'确认吗?'"
      :visible.sync="userStatusVisible"
      width="400px"
      top="30vh"
    >
      <el-form>
        <el-form-item v-if="userStatus === 1">
          <el-input type="textarea" :rows="3" v-model="userStatusFrom.frozenRemark" placeholder="请输入冻结原因"/>
        </el-form-item>

        <el-form-item style="text-align: right">
          <el-button @click="userStatusVisible = false">取消</el-button>
          <el-button @click="handleUpStatus" type="primary">确认{{ userStatus === 1 ? '冻结' : '解冻' }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      :title="'报告列表'"
      :visible.sync="reportDialog"
      width="1000px"
      top="15vh">
      <report v-if="reportDialog" :patient-id="form.patientId"></report>
    </el-dialog>

    <el-dialog
      :title="'上传报告'"
      :visible.sync="reportAddDialog"
      width="800px"
      top="15vh">
      <div style="height: 200px">
        <el-upload
          ref="upload"
          class="upload-demo"
          name="uploadFiles"
          :action="baseUrl+'/report/add'"
          :auto-upload="false"
          multiple
          :limit="0"
          :headers="uploadHeaders"
          :data="uploadData"
          :on-exceed="handleExceed"
          :on-success="handleUploadSuccess"
          :on-error="handleUploadError"
          :on-change="handleUploadChange"
          :file-list="fileList">
          <el-button size="small" type="primary">选择文件</el-button>
          <!--          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
        </el-upload>

        <p style="margin-top: 20px">
          <el-button @click="handleAddReportSubmit" type="success">确认上传</el-button>
          <el-button @click="reportAddDialog = false" type="">取消</el-button>
        </p>
      </div>
    </el-dialog>

    <div class="seat-100">

    </div>
    <!--    <chart/>-->
    <div class="seat-100">

    </div>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

import { deepClone, parseTime, uploadFile } from '@/utils'
import { getList, upUser, upStatus, addUser, delData } from '@/api/patient'
import { getList as getOrg } from '@/api/org'
import { getList as getDoctor } from '@/api/doctorManage'

import report from '@/views-page/patient-info/report'
import Operation from '@/component/Operation'
import { validIdCard, validPhone } from '@/utils/validate'
import { getToken } from "@/utils/auth";
import Chart from "@/component/charts";

const defaultForm = {
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
  age: null,

  pathFactors: '',
  pathFactorsList: [],
  physiFactors: '',
  physiFactorsList: [],
  diagnose: '',
  diagnoseList: [],
  suggestion: '',
  deviceNum: '',
  deviceStatus: '0',
  address: '',
  doctorId: '',
  doctorName: '',
  remark: '无',
  symptom: '',
  isHeal: 0
}

export default {
  name: 'PatientInfo',
  components: { Chart, Pagination, Sticky, report },
  filters: {

    healFilterType(status) {
      status = status || '0'
      const statusMap = {
        '0': 'primary',
        '1': 'warning'
      }
      return statusMap[status]
    },
    healFilterTitle(status) {
      status = status || '0'
      const statusMap = {
        '0': '无需治疗',
        '1': '需要干预'
      }
      return statusMap[status]
    },
    numFilterType(num) {
      const status = num <= 0 ? '0' : '1'
      const statusMap = {
        '0': 'info',
        '1': ''
      }
      return statusMap[status]
    },
    statusFilterType(status) {
      status = status || '0'
      const statusMap = {
        '0': 'info',
        '1': ''
      }
      return statusMap[status]
    },
    statusFilterTitle(status) {
      status = status || '0'
      const statusMap = {
        '0': '近期无随访',
        '1': '近期需随访'
      }
      return statusMap[status]
    },
    genderType(status) {
      status = status || '0'
      const statusMap = {
        '1': '男',
        '0': '女'
      }
      return statusMap[status]
    },
    tagName(status) {
      status = status || 0
      const statusMap = {
        0: '房颤',
        1: '心梗',
        2: '脑梗'
      }
      return statusMap[status]
    },
    tagType(status) {
      status = status || 0
      const statusMap = {
        0: 'success',
        1: 'danger',
        2: 'warning'
      }
      return statusMap[status]
    },
    fitterFrozenStatus(status) {
      status = status || 0
      const statusMap = {
        0: '正常',
        1: '冻结'
      }
      return statusMap[status]
    },
    fitterFrozenStatusType(status) {
      status = status || 0
      const statusMap = {
        0: 'success',
        1: 'danger'
      }
      return statusMap[status]
    },
    cellphoneList(phone) {
      const phoneList = phone.split(',')
      return phoneList[0]
    },
    userCode(uid, orgList, orgId) {
      const code = 'NSH'
      let org = ''
      orgList = orgList || []
      orgList.forEach((item) => {
        if (item.orgId === orgId) {
          org = item.id.toString() || ''
        }
      })
      while (org.length < 4) {
        org = '0' + org
      }
      uid = uid.toString() || ''
      while (uid.length < 8) {
        uid = '0' + uid
      }
      const uid1 = uid.substr(0, 4)
      const uid2 = uid.substr(4, 4)
      return code + '-' + org + '-' + uid1 + '-' + uid2
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
      uploadData: {},
      uploadHeaders: {
        Authorization: getToken()
      },
      fileList: [],
      baseUrl: process.env.VUE_APP_BASE_API,
      submitStatus: 0,
      reportDialog: false,
      reportAddDialog: false,
      doctorList: [],
      pathFactorsOption: [
        {
          label: '冠心病',
          value: '冠心病'
        },
        {
          label: '高血压',
          value: '高血压'
        },
        {
          label: '甲亢',
          value: '甲亢'
        },
        {
          label: '糖尿病',
          value: '糖尿病'
        },
      ],
      physiFactorsOption: [
        {
          label: '抽烟',
          value: '抽烟'
        },
        {
          label: '喝酒',
          value: '喝酒'
        },
      ],
      diagnoseOption: [
        {
          label: '窦性心律失常',
          value: '窦性心律失常',
          children: [
            {
              label: '窦性心律',
              value: '窦性心律',
            },
            {
              label: '窦性心动过速',
              value: '窦性心动过速',
            },
            {
              label: '窦性心动过缓',
              value: '窦性心动过缓',
            },
            {
              label: '窦性心律不齐',
              value: '窦性心律不齐',
            },
            {
              label: '窦性停搏',
              value: '窦性停搏',
            },
            {
              label: '病窦综合征',
              value: '病窦综合征',
            },
            {
              label: '频发房性早搏',
              value: '频发房性早搏',
            },
            {
              label: '频发室性早搏',
              value: '频发室性早搏',
            },
            {
              label: '偶发房性早搏',
              value: '偶发房性早搏',
            },
            {
              label: '偶发室性早搏',
              value: '偶发室性早搏',
            },
            {
              label: '差传',
              value: '差传',
            },
          ]
        },
        {
          label: '异位性心动过速',
          value: '异位性心动过速',
          children: [
            {
              label: '非阵发性房室交界性心动过速',
              value: '非阵发性房室交界性心动过速',
            },
            {
              label: '室性心动过速',
              value: '室性心动过速',
            },
          ]
        },
        {
          label: '房颤、房扑',
          value: '房颤、房扑',
        },
        {
          label: '心脏病理性传导阻滞',
          value: '心脏病理性传导阻滞',
          children: [
            {
              label: '窦房传导阻滞（完全性）',
              value: '窦房传导阻滞（完全性）',
            },
            {
              label: '窦房传导阻滞（不完全性）',
              value: '窦房传导阻滞（不完全性）',
            },
            {
              label: '房室传导阻滞（完全性）',
              value: '房室传导阻滞（完全性）',
            },
            {
              label: '房室传导阻滞（不完全性）',
              value: '房室传导阻滞（不完全性）',
            },
            {
              label: '束支传导阻滞（完全性）',
              value: '束支传导阻滞（完全性）',
            },
            {
              label: '束支传导阻滞（不完全性）',
              value: '束支传导阻滞（不完全性）',
            },
            {
              label: '分支传导阻滞（完全性）',
              value: '分支传导阻滞（完全性）',
            },
            {
              label: '分支传导阻滞（不完全性）',
              value: '分支传导阻滞（不完全性）',
            },
          ]
        },
        {
          label: '预激综合征',
          value: '预激综合征',
        },
        {
          label: '逸搏、逸搏心律',
          value: '逸搏、逸搏心律',
        },
        {
          label: '起搏器诊断',
          value: '起搏器诊断',
        },
        {
          label: '阵发性交界性心律',
          value: '阵发性交界性心律',
        },
        {
          label: '房性早搏',
          value: '房性早搏',
        },
        {
          label: '室性早搏',
          value: '室性早搏',
        },
        {
          label: '异常Q波',
          value: '异常Q波',
        },
        {
          label: '心电轴左偏',
          value: '心电轴左偏',
        },
        {
          label: '左心室高电压',
          value: '左心室高电压',
        },
        {
          label: '偶发性房早',
          value: '偶发性房早',
        },
        {
          label: '偶发性室早',
          value: '偶发性室早',
        },
        {
          label: 'ST-T改变',
          value: 'ST-T改变',
        },
        {
          label: 'T波改变',
          value: 'T波改变',
        },
        {
          label: '胸导联V1-V3R波递增不良',
          value: '胸导联V1-V3R波递增不良',
        },
        {
          label: 'ST段以T点抬高为主',
          value: 'ST段以T点抬高为主',
        },
      ],
      userInfo: '',

      form: Object.assign({}, defaultForm),
      downLoadLoading: false,
      total: 10,
      userStatus: 0,
      userStatusVisible: false,
      baseinfoDialogVisible: false,
      userDataView: true,
      userInfoDialogVisible: false,
      orgList: [],
      userInfoDialogType: 'add', // add || edit
      userStatusFrom: {
        frozenRemark: '',
        frozenStatus: '',
        patientId: ''
      },
      listQuery: {
        pageNum: 1,
        pageCount: 10,
        filter: '',
        doctorId: '',
        pathFactors: '',
        physiFactors: '',
        gender: '',
        address: '',
        isHeal: '',

        startDate: '',
        endDate: ''
      },
      row: {},
      tableData: [],
      tagOption: [
        {
          label: '房颤',
          value: '房颤'
        },
        {
          label: '心梗',
          value: '心梗'
        },
        {
          label: '脑梗',
          value: '脑梗'
        }
      ],

      rules: {
        patientName: [{ required: true, message: '请输入患者姓名', trigger: 'blur' }],
        idCard: [
          { required: true, message: '请输入患者身份证号码', trigger: 'blur' },
          { validator: checkIdCard, message: '请输入正确的身份证号码！', trigger: 'blur' }
        ],
        gender: [{ required: true, message: '请选择患者性别', trigger: 'change' }],
        // birthday: [{ required: true, message: '请选择患者的出生日期', trigger: 'blur' }],
        // height: [{required: true, message: '请输入患者身高', trigger: 'blur'}],
        // weight: [{required: true, message: '请输入患者体重', trigger: 'blur'}],
        orgId: [{ required: true, message: '请选择患者所属机构', trigger: 'change' }],
        doctorId: [{ required: true, message: '请选择患者所属医生', trigger: 'change' }],
        cellphone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' },
          // {validator: checkPhone, message: '请输入正确的手机号码', trigger: 'blur'}
        ]
      },
    }
  },
  created() {
  },
  mounted() {
    this.userInfo = this.$store.getters.userInfo
    console.log(this.userInfo)
    if (this.userInfo.doctorId !== '0') {
      this.listQuery.doctorId = this.userInfo.doctorId
      defaultForm.doctorId = this.userInfo.doctorId
      defaultForm.doctorName = this.userInfo.doctorName
    }

    this.getDoctor()
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

    diagnoseLen: () => {
      return (str) => {
        const reList = []
        str.split('+').forEach((item) => {
          const list = item.split('---')
          if (list.length > 0) {
            reList.push(list[list.length - 1])
          }
        })
        return reList.join('+')
      }
    },
    CODE: function () {
      const code = 'NSH'
      console.log(1)
      let org = ''
      console.log(this.row.orgId)
      console.log(this.orgList)
      this.orgList.forEach((item) => {
        if (item.orgId === this.row.orgId) {
          org = item.id.toString() || ''
        }
      })
      console.log(org)

      while (org.length < 4) {
        org = '0' + org
      }
      let uid = this.row.id.toString() || ''
      while (uid.length < 8) {
        uid = '0' + uid
      }
      const uid1 = uid.substr(0, 4)
      const uid2 = uid.substr(4, 4)
      return code + '-' + org + '-' + uid1 + '-' + uid2
    }
  },
  methods: {
    handleUserInfoClose() {
      this.form = deepClone(defaultForm)
    },
    handleAddReportSubmit() {

      const formData = new FormData()
      // 将上传的文件放到数据对象中
      console.log(this.fileList)
      this.fileList.forEach(file => {
        formData.append('uploadFiles', file.raw)
      })

      formData.append('patientId', this.uploadData.patientId)
      uploadFile(formData).then((response) => {
        if (response.data.code === '200') {
          this.handleUploadSuccess()
        } else {
          this.handleUploadError()
        }
      })
      // this.$refs['upload'].submit()
    },
    handleUploadChange(file, fileList) {
      this.fileList = fileList
    },
    handleExceed(files, fileList) {
      this.$set(fileList[0], 'raw', files[0])
      this.$set(fileList[0], 'name', files[0].name)
      this.$refs['upload'].clearFiles()
      this.$refs['upload'].handleStart(files[0])
    },
    handleUploadSuccess() {
      this.$message({
        message: '上传成功！',
        type: 'success'
      })
      this.$refs['upload'].clearFiles()

      this.reportAddDialog = false
    },
    handleUploadError() {
      this.$message({
        message: '上传失败，请重选选择！',
        type: 'error'
      })
      this.$refs['upload'].clearFiles()
    },
    handleCloseTag(tag, index) {
      console.log(tag)
      console.log(index)
    },
    async getDoctor() {
      const data = await getDoctor({
        pageNum: 1,
        pageCount: 100,
        status: 2,
        filter: '',
        parentOrgId: ''
      })
      this.doctorList = data.data.records
      this.getOrg()
    },
    jigou(e) {
      this.orgList.forEach((item) => {
        if (item.orgId === e) {
          this.form.orgName = item.orgName
        }
      })
    },
    handleOpenReportList({ row }) {
      this.reportDialog = true
      this.form = deepClone(row)
    },
    handleUpdeviceStatus({ row }, status) {
      const form = deepClone(row)
      form.deviceStatus = status
      if (status === '0') {
        this.$confirm('确认已归还吗！', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async ({ value }) => {
          form.deviceNum = value
          const res = await upUser(form)
          this.getList()
          if (res.code === '200') {
            this.$message({
              message: '成功！',
              type: 'success'
            })
          } else {
            this.$message({
              message: '系统错误，请联系管理员！',
              type: ''
            })
          }
        }).catch(() => {
          this.$message({
            message: '已取消！',
            type: ''
          })
        })
      } else {
        this.$prompt('请输入设备号！', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async ({ value }) => {
          form.deviceNum = value
          const res = await upUser(form)
          this.getList()
          if (res.code === '200') {
            this.$message({
              message: '成功！',
              type: 'success'
            })
          } else {
            this.$message({
              message: '系统错误，请联系管理员！',
              type: ''
            })
          }
        }).catch(() => {
          this.$message({
            message: '已取消！',
            type: ''
          })
        })
      }

    },
    handleAddReport({ row }) {
      this.uploadData.patientId = row.patientId
      this.reportAddDialog = true
    },
    handleDelete({ row }) {
      this.$confirm('确认删除吗？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await delData({ 'patientId': row.patientId })
        this.getList()
        if (res.code === '200') {
          this.$message({
            message: '删除成功！',
            type: 'success'
          })
        } else {
          this.$message({
            message: '系统错误，请联系管理员！',
            type: ''
          })
        }
      }).catch(() => {
        this.$message({
          message: '已取消删除！',
          type: ''
        })
      })
    },
    handleInfo({ row }) {
      this.row = row

      if (this.row.physiFactors && this.row.physiFactors.length > 0) {
        this.row.physiFactorsList = this.row.physiFactors.split(',')
      } else {
        this.row.physiFactorsList = []
      }
      if (this.row.pathFactors && this.row.pathFactors.length > 0) {
        this.row.pathFactorsList = this.row.pathFactors.split(',')
      } else {
        this.row.pathFactorsList = []
      }

      if (this.row.diagnose && this.row.diagnose.length > 0) {
        this.row.diagnoseList = []
        this.row.diagnose.split('+').forEach((item) => {
          this.row.diagnoseList.push(item.split('---'))
        })
      } else {
        this.row.diagnoseList = []
      }

      if (this.row.diagnoseList.length > 0) {
        const diagnossList = []
        this.row.diagnoseList.forEach((item) => {
          this.diagnoseOption.forEach((op) => {
            const diaList = []
            diaList[0] = op.label
            if (item[item.length - 1] === op.label) {
              diagnossList.push(deepClone(diaList))

            } else if (op.children && op.children.length > 0) {
              op.children.forEach((opc) => {
                diaList[1] = opc.label
                if (item[item.length - 1] === opc.label) {
                  diagnossList.push(deepClone(diaList))
                }
              })
            }
          })
        })
        this.row.diagnoseList = diagnossList
      }

      console.log(12344444444)
      console.log(this.row.diagnoseList)

      this.form = deepClone(this.row)

      this.userInfoDialogType = 'edit'
      this.userInfoDialogVisible = true
    },
    handleAddUser() {
      this.row = {}
      this.form = deepClone(defaultForm)
      this.userInfoDialogType = 'add'
      // this.baseinfoDialogVisible = true
      this.userInfoDialogVisible = true
    },
    async getOrg() {
      const data = await getOrg({
        pageNum: 1,
        pageCount: 100,
        status: 2,
        filter: '',
        parentOrgId: ''
      })
      this.orgList = data.data.records
      this.getList()
    },
    handleSearch() {
      this.listQuery.pageNum = 1
      this.getList()
    },
    async getList() {
      const data = await getList(this.listQuery)
      this.tableData = data.data.records
      this.total = data.data.total
    },
    handleOpenUserStatus({ row }, type) {
      this.userStatus = type
      this.userStatusVisible = true
      this.userStatusFrom.frozenStatus = type
      this.userStatusFrom.patientId = row.patientId
    },
    handleUpStatus() {
      return new Promise((resolve, reject) => {
        upStatus(this.userStatusFrom).then(response => {
          console.log(response)
          this.$message({
            message: '提交成功！',
            type: 'success'
          })
          this.userStatusVisible = false
          this.getList()
          resolve(true)
        }).catch(() => {
          reject(false)
        })
      })
    },
    handleChangeDeviceNum(value) {
      if (value === '') {
        this.form.deviceStatus = '0'
      } else {
        this.form.deviceStatus = '1'
      }
    },
    handleConfirmAddUser() {
      this.submitStatus = 1
      const form = deepClone(this.form)
      form.physiFactors = form.physiFactorsList.join(',')
      form.pathFactors = form.pathFactorsList.join(',')

      const diagnose = []
      console.log(form.diagnoseList)
      form.diagnoseList.forEach((item) => {
        diagnose.push(item.join('---'))
      })
      form.diagnose = diagnose.join('+')

      if (!form.doctorId && form.doctorId.length <= 0) {
        form.doctorId = this.userInfo.doctorId
        form.doctorName = this.userInfo.doctorName
      } else {
        this.doctorList.forEach((item) => {
          if (item.doctorId === form.doctorId) {
            form.doctorName = item.doctorName
          }
        })
      }

      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.userInfoDialogType === 'add') {
            delete form.patientId
            return new Promise((resolve, reject) => {
              addUser(form).then(response => {
                console.log(response)
                this.$message({
                  message: '提交成功！',
                  type: 'success'
                })
                this.userInfoDialogVisible = false
                this.submitStatus = 0
                this.getList()
                resolve(true)
              }).catch(() => {
                this.submitStatus = 0
                reject(false)
              })
            })
          } else {
            return new Promise((resolve, reject) => {
              upUser(form).then(response => {
                console.log(response)
                this.$message({
                  message: '提交成功！',
                  type: 'success'
                })
                this.userInfoDialogVisible = false
                this.submitStatus = 0
                this.getList()
                resolve(true)
              }).catch(() => {
                this.submitStatus = 0
                reject(false)
              })
            })
          }
        } else {
          this.submitStatus = 0
          this.$message({
            message: '信息填写有误，请检查！',
            type: 'error'
          })
        }
      })
    },
    toggleUserDataView() {
      this.userDataView = !this.userDataView
    },
    handleDownloadPDF(ref) {
      localStorage.setItem('PDF_info', JSON.stringify({ title: '患者列表', content: this.$refs[ref].$el.innerHTML }))
      const routeData = this.$router.resolve({ path: '/pdf/download' })
      window.open(routeData.href, '_blank')
    },
    async handleDownloadALL() {
      this.downLoadLoading = true
      const listQuery = deepClone(this.listQuery)
      listQuery.pageCount = this.total
      const data = await getList(listQuery)
      const table = data.data.records
      this.handleDownload(table)
      this.downLoadLoading = false
    },
    handleDownload(tableData) {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['姓名', '性别', '年龄', '身高', '体重', '机构', '身份证号', '联系方式', '病理因素', '生理因素', '诊断', '建议', '设备号', '地址', '是否需要干预治疗', '医生姓名', '设备状态']
        const filterVal = ['patientName', 'gender', 'age', 'height', 'weight', 'orgName', 'idCard', 'cellphone', 'pathFactors', 'physiFactors', 'diagnose', 'suggestion', 'deviceNum', 'address', 'isHeal', 'doctorName', 'deviceStatus']
        let list = []
        if (Object.prototype.toString.call(tableData) === '[object Array]') {
          list = tableData
        } else {
          list = this.tableData
        }
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else if (j === 'gender') {
          if (v[j] === 1) {
            return '男'
          } else if (v[j] === 0) {
            return '女'
          } else {
            return '无'
          }
        } else if (j === 'isHeal') {
          return parseInt(v[j]) === 1 ? '需要干预' : '无需治疗'
        } else if (j === 'deviceStatus') {
          return parseInt(v[j]) === 1 ? '借出' : '归还'
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

<style lang="scss">

.shequhuangzhe {
  .el-switch__label {
    display: inline;
  }
}

</style>
<style scoped lang="scss">

.el-switch {
  line-height: 32px;
  height: 32px;
}

.el-tag + .el-button {
  margin-left: 5px;
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
  height: 188px;
  margin: 10px 0;
}
</style>
