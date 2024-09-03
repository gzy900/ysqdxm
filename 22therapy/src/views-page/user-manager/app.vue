<template xmlns="http://www.w3.org/1999/html">
  <div>
    <div class="page-header">
      <div class="search">

        <el-row :gutter="20">

          <template v-if="userInfo.isDoctor">
            <el-col :span="8">
              <div class="search-item">
                <p class="search-item-title">类别：</p>
                <p class="search-item-input">
                  <el-select v-model="myListQuery.type">
                    <el-option v-for="item in lqTypeOption" :value="item.value" :label="item.label"></el-option>
                  </el-select>
                </p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="search-item">
                <p class="search-item-title">搜索字段：</p>
                <p class="search-item-input">
                  <el-input v-model="myListQuery.search" placeholder="请输入姓名或手机号码"></el-input>
                </p>
              </div>
            </el-col>
          </template>

          <el-col :span="8" v-else>
            <div class="search-item">
              <p class="search-item-title">搜索字段：</p>
              <p class="search-item-input">
                <el-input v-model="listQuery.search" placeholder="请输入姓名或手机号码"></el-input>
              </p>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="search-item">
              <!--              <p class="search-item-title">操作：</p>-->
              <p class="search-item-input">
                <el-button type="primary" @click="getList"><i class="el-icon-search"/> 查询</el-button>
                <!--                <el-button type="success" @click="handleAddUser"><i class="el-icon-document-add"/> 新增医生</el-button>-->
              </p>
            </div>
          </el-col>
        </el-row>

      </div>
    </div>

    <el-card class="page-content">
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
          width="320"
        >
          <template slot-scope="scope">
            <el-button @click="handleOpenDynamic(scope.row)" type="primary">动态</el-button>
            <el-button @click="handleInfo(scope.row)" type="">资料</el-button>
            <template v-if="userInfo.isDoctor">
              <el-button v-if="scope.row.sportId" @click="handleOpenMaterial(scope.row)" type="warning">处方详情</el-button>
              <el-button v-else @click="handleOpenMaterial(scope.row)" type="success">开具处方</el-button>

              <el-popover
                style="margin-left: 10px"
                placement="right"
                trigger="hover">
                <div class="diaBtn">
                  <el-button @click="handleOpenQuest(scope.row)">发问卷调查</el-button>
                  <el-button @click="handleOpenSuiFang(scope.row)">发随访通知</el-button>

                  <el-popconfirm
                    style="margin-left: 10px"
                    @onConfirm="handleOpenMotion(scope.row)"
                    title="确定发送运动测试吗？"
                  >
                    <el-button slot="reference">发运动测试</el-button>
                  </el-popconfirm>
                </div>
                <el-button slot="reference" type="info">发任务</el-button>
              </el-popover>

            </template>
          </template>
        </el-table-column>

        <!--        <el-table-column-->
        <!--          prop="province"-->
        <!--          label="账户状态"-->
        <!--          width="100"-->
        <!--        >-->
        <!--          <template slot-scope="scope">-->
        <!--            <el-tag :type="scope.row.status| statusFilterType">-->
        <!--              {{ scope.row.status | statusFilterTitle }}-->
        <!--            </el-tag>-->
        <!--          </template>-->
        <!--        </el-table-column>-->

        <el-table-column
          prop="username"
          label="患者名称"
          width="120"
        >
        </el-table-column>

        <el-table-column
          prop="noticeSign"
          label="标签"
          width="380"
          v-if="userInfo.isDoctor"
        >
          <template slot-scope="scope">
            <el-tag v-for="item in scope.row.noticeSign.split(',')" :type="item | noticeSignFilterType">
              {{ item | noticeSignFilterTitle }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column
          prop="phone"
          label="手机"
          width="180"
        >
        </el-table-column>

        <el-table-column
          label="性别"
          width="80"
        >
          <template slot-scope="scope">
            {{ scope.row.sex | sexFilterTitle }}
          </template>
        </el-table-column>

        <el-table-column
          prop="age"
          label="年龄"
          width="80"
        >
        </el-table-column>

        <el-table-column
          prop="height"
          label="身高"
          width="80"
        >
        </el-table-column>

        <el-table-column
          prop="weight"
          label="体重"
          width="80"
        >
        </el-table-column>

        <el-table-column
          prop="actionChief"
          label="主诉"
          width="200"
        >
        </el-table-column>

        <el-table-column
          prop="patientId"
          label="账户ID"
          width="280"
        >
        </el-table-column>

        <el-table-column
          prop="createTime"
          label="注册时间"
        >
        </el-table-column>
      </el-table>
    </el-card>

    <pagination
      v-if="userInfo.isDoctor"
      ref="pagination"
      v-show="total>0"
      :total="total"
      :page.sync="myListQuery.pageCount"
      :limit.sync="myListQuery.pageSize"
      @pagination="getList"
    />

    <pagination
      v-else
      ref="pagination"
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.pageCount"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"
    />

    <el-dialog
      :title="''"
      :visible.sync="userInfoDialogVisible"
      width="68%"
      top="5vh"
      custom-class="userInfoDialog"
    >
      <el-row class="userInfoContent">
        <el-col :span="18">
          <el-col :span="24" style="height: calc(100% - 54px)">
            <el-scrollbar wrap-class="scrollbar-wrapper" style="overflow-x: hidden;">
              <el-form class="report-style" ref="form" :model="form" label-width="120px" v-if="userInfoDialogVisible">
                <el-col :span="24" class="user-info-title">
                  【基础信息】
                </el-col>
                <el-col :span="8">
                  <el-form-item label="患者名称">
                    <el-input v-model="formData.userInfo.username" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="性别">
                    <!--                  <el-input v-model="form.sex"></el-input>-->
                    <el-select
                      v-model="formData.userInfo.sex"
                      disabled
                    >
                      <el-option :value="0" label="女"></el-option>
                      <el-option :value="1" label="男"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="年龄">
                    <el-input v-model="formData.userInfo.age" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="身高">
                    <el-input v-model="formData.userInfo.height" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="体重">
                    <el-input v-model="formData.userInfo.weight" disabled></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="16">
                  <el-form-item label="手机号">
                    <el-input v-model="formData.userInfo.phone" disabled></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="24" class="user-info-title">
                  【主诉】
                </el-col>
                <el-col :span="24">
                  <el-form-item label="主诉">
                    <el-input
                      autosize
                      type="textarea"
                      v-model="formData.userInfo.actionChief"
                      disabled
                    >
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="24" class="user-info-title">
                  【关键指数】
                </el-col>

                <el-col :span="24">
                  <el-col :span="12">
                    <el-form-item label="目标心率">
                      <el-input v-model="formData.userInfo.targetRate" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="运动峰值心率">
                    <el-input v-model="formData.maxRateList.value" disabled>
                      <el-button @click="handleClickHisData(form.maxRateList,'运动峰值心率')" type="text" slot="append">历史
                      </el-button>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="静息心率">
                    <el-input v-model="formData.restingHeartRateList.value" disabled>
                      <el-button @click="handleClickHisData(form.restingHeartRateList,'静息心率')" type="text"
                                 slot="append">
                        历史
                      </el-button>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="体重">
                    <el-input v-model="formData.weightList.value">
                      <el-button @click="handleClickHisData(form.weightList,'体重')" type="text" slot="append">历史
                      </el-button>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="BMI">
                    <el-input v-model="formData.bmiList.value" disabled>
                      <el-button @click="handleClickHisData(form.bmiList,'BMI')" type="text" slot="append">历史
                      </el-button>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="静息血压(收缩)">
                    <el-input v-model="formData.restingBloodPressure.min">
                      <el-button @click="handleClickHisData(form.restingBloodPressure,'静息血压(收缩)')" type="text"
                                 slot="append">历史
                      </el-button>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="静息血压(舒张)">
                    <el-input v-model="formData.restingBloodPressure.max">
                      <el-button @click="handleClickHisData(form.restingBloodPressure,'静息血压(舒张)')" type="text"
                                 slot="append">历史
                      </el-button>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="运动后血压(收缩)">
                    <el-input v-model="formData.afterSportBloodPressure.min" disabled>
                      <el-button @click="handleClickHisData(form.afterSportBloodPressure,'运动后血压(收缩)')" type="text"
                                 slot="append">历史
                      </el-button>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="运动后血压(舒张)">
                    <el-input v-model="formData.afterSportBloodPressure.max" disabled>
                      <el-button @click="handleClickHisData(form.afterSportBloodPressure,'运动后血压(舒张)')" type="text"
                                 slot="append">历史
                      </el-button>
                    </el-input>
                  </el-form-item>
                </el-col>

                <!--                <el-col :span="24">-->
                <!--                  <el-form-item label="生化检验">-->
                <!--                    <el-input>-->
                <!--                      <el-button type="text" slot="append">历史</el-button>-->
                <!--                    </el-input>-->
                <!--                  </el-form-item>-->
                <!--                </el-col>-->

                <el-col :span="24" class="user-info-title">
                  【诊断信息】
                </el-col>

                <el-col :span="12">
                  <el-form-item label="诊断">
                    <el-select v-model="formData.diagnoseList.diagnoseName">
                      <el-option v-for="item in diagnosisOption" :value="item.field"></el-option>
                    </el-select>
                    <!--                    <el-input v-model="formData.diagnoseList.diagnoseName"></el-input>-->
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="疼痛部位">
                    <el-select v-model="formData.diagnoseList.diagnosePart">
                      <el-option v-for="item in diagnosePartOption" :label="item.label" :value="item.label"></el-option>
                    </el-select>
                    <!--                    <el-input v-model="formData.diagnoseList.diagnosePart"></el-input>-->
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="呼吸困难">
                    <el-select
                      v-model="formData.diagnoseList.breath"
                    >
                      <el-option :value="0" label="无呼吸困难"></el-option>
                      <el-option :value="1" label="呼吸困难"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>


                <p class="move-btn" style="overflow: hidden;width: 100%;display: block">
                  <!--                <span v-if="form.suifangRecords.length<=1||suifangOpenStatus">没有更多了</span>-->
                  <!--                <el-button type="text" @click="handleCloseMedicine('suifangOpenStatus')" v-if="suifangOpenStatus">-->
                  <!--                  收起-->
                  <!--                </el-button>-->
                  <!--                <el-button-->
                  <!--                  type="text"-->
                  <!--                  @click="handleOpenMedicine('suifangOpenStatus')"-->
                  <!--                  v-if="form.suifangRecords.length>1&&!suifangOpenStatus"-->
                  <!--                >点击查看更多诊断记录-->
                  <!--                </el-button>-->
                  <el-button type="text" @click="handleAddMedicine('新增诊断')">新增诊断</el-button>
                </p>

                <el-col :span="24" class="user-info-title">
                  【用药史 {{ formData.medicineRecords.length }}】
                </el-col>

                <el-card
                  v-for="medicine in (medicineOpenStatus?formData.medicineRecords:formData.medicineRecords.slice(0,1))">

                  <el-col :span="24">
                    <el-form-item label="药名">
                      <el-input v-model="medicine.medicineName"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item label="用药量">
                      <el-input v-model="medicine.medicineCount"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item label="用药量单位">
                      <el-select v-model="medicine.medicineUnit">
                        <el-option value="毫克"></el-option>
                        <el-option value="克"></el-option>
                        <el-option value="片"></el-option>
                        <el-option value="IU"></el-option>
                        <el-option value="毫升"></el-option>
                      </el-select>
                      <!--                      <el-input v-model="medicine.medicineUnit"></el-input>-->
                    </el-form-item>
                  </el-col>


                  <el-col :span="12">
                    <el-form-item label="用药频率">
                      <el-select v-model="medicine.medicineFrequency">
                        <el-option value="每日一次"></el-option>
                        <el-option value="每日俩次"></el-option>
                        <el-option value="每日三次"></el-option>
                        <el-option value="每日四次"></el-option>
                        <el-option value="隔日一次"></el-option>
                        <el-option value="每2周一次"></el-option>
                        <el-option value="每四周一次"></el-option>
                      </el-select>
                      <!--                      <el-input v-model="medicine.medicineFrequency"></el-input>-->
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item label="用药方式">
                      <!--                      <el-input v-model="medicine.medicineWay"></el-input>-->
                      <el-select v-model="medicine.medicineWay">
                        <el-option value="口服"></el-option>
                        <el-option value="注射"></el-option>
                        <el-option value="经皮用药（外用）"></el-option>
                        <el-option value="吸入"></el-option>
                        <el-option value="舌下含服"></el-option>
                        <el-option value="眼部"></el-option>
                        <el-option value="耳部"></el-option>
                        <el-option value="鼻腔"></el-option>
                        <el-option value="直肠"></el-option>
                        <el-option value="阴道"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item label="用药时间">
                      <el-date-picker
                        v-model="medicine.startTime"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item label="停用时间">
                      <el-date-picker
                        v-model="medicine.endTime"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>


                  <el-col :span="24">
                    <el-form-item label="提醒时间">
                      <el-date-picker
                        v-model="medicine.noticeTime"
                        type="datetime"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd HH:mm:ss"
                      >
                        <!--                format="yyyy-MM-dd"-->

                      </el-date-picker>
                    </el-form-item>
                  </el-col>


                  <el-col :span="24">
                    <el-form-item label="操作">
                      <el-button size="mini" type="warning"
                                 @click="handleDel(medicine.medicineId,'medicineId','/patient/delMed')">
                        删除这条用药记录
                      </el-button>
                    </el-form-item>
                  </el-col>
                </el-card>
                <p class="move-btn">
                  <span v-if="formData.medicineRecords.length<=1||medicineOpenStatus">没有更多了</span>
                  <el-button type="text" @click="handleCloseMedicine('medicineOpenStatus')" v-if="medicineOpenStatus">收起
                  </el-button>
                  <el-button
                    type="text"
                    @click="handleOpenMedicine('medicineOpenStatus')"
                    v-if="formData.medicineRecords.length>1&&!medicineOpenStatus"
                  >点击查看更多用药史
                  </el-button>
                  <el-button type="text" @click="handleAddMedicine('新增用药')">新增用药史</el-button>
                </p>

                <el-col :span="24" class="user-info-title">
                  【手术史 {{ form.operationRecords.length }}】
                </el-col>
                <el-card
                  v-for="operation in (operationOpenStatus?form.operationRecords:form.operationRecords.slice(0,1))">
                  <el-col :span="12">
                    <el-form-item label="手术名称">
                      <el-input v-model="operation.operationName" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="手术时间">
                      <el-date-picker
                        v-model="operation.operationDate"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        disabled
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <!--                <el-col :span="24">-->
                  <!--                  <el-form-item label="操作">-->
                  <!--                    <el-button size="mini" type="warning" @click="handleDel(operation.oper,'/patient/delMed')">-->
                  <!--                      删除这条手术记录-->
                  <!--                    </el-button>-->
                  <!--                  </el-form-item>-->
                  <!--                </el-col>-->
                </el-card>
                <p class="move-btn">
                  <span v-if="form.operationRecords.length<=1||operationOpenStatus">没有更多了</span>
                  <el-button type="text" @click="handleCloseMedicine('operationOpenStatus')" v-if="operationOpenStatus">
                    收起
                  </el-button>
                  <el-button
                    type="text"
                    @click="handleOpenMedicine('operationOpenStatus')"
                    v-if="form.operationRecords.length>1&&!operationOpenStatus"
                  >点击查看更多手术史
                  </el-button>
                  <el-button type="text" @click="handleAddMedicine('新增手术')">新增手术</el-button>
                </p>

                <el-col :span="24" class="user-info-title">
                  【随访记录 {{ form.suifangRecords && form.suifangRecords.length }}】
                </el-col>
                <el-card
                  v-for="(suifang,index) in suifangOpenStatus?(formData.suifangRecords? formData.suifangRecords:[]):(formData.suifangRecords? formData.suifangRecords:[]).slice(0,1)">
                  <!--                  v-for="(suifang,index) in (suifangOpenStatus?formData.suifangRecords:formData.suifangRecords.slice(0,1))">-->

                  <el-col :span="24">
                    <el-form-item label="随访标题">
                      <el-input v-model="suifang.name"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="随访时间">
                      <el-date-picker
                        v-model="suifang.suifangDate"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item label="随访状态">
                      <!--                    <el-input v-model="suifang.status"></el-input>-->
                      <el-tag :type="suifang.status|suifangStatusFilterType">
                        {{ suifang.status|suifangStatusFilterName }}
                      </el-tag>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="随访内容">
                      <el-input
                        autosize
                        type="textarea"
                        v-model="suifang.content"
                      >
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="标签">
                      <el-select
                        v-model="form.suifangRecords[index].tagList"
                        @change="tagChange($event,index)"
                        multiple
                      >
                        <el-option v-for="tag in tagList" :label="tag.field" :value="tag.field"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="医嘱">
                      <el-input
                        autosize
                        type="textarea"
                        v-model="suifang.note"
                      >
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="患者上传的报告">
                      <template
                        v-if="!suifang.reportFiles||Object.prototype.toString.call(suifang.reportFiles) !== '[object Array]'||suifang.reportFiles.length<=0"
                      >
                        <span>暂无</span>
                      </template>
                      <template v-else>
                        <div
                          v-for="img in suifang.reportFiles.filter(item=>{return item.createUser===row.patientId})"
                          class="image-package">
                          <el-image
                            style="width: 100%;height: 100%"
                            :src="img.fileUrl"
                            :preview-src-list="[img.fileUrl]"
                            fit="fill">
                            <div slot="error" class="image-slot">
                              <i class="el-icon-picture-outline"></i>
                            </div>
                          </el-image>
                          <span class="img-del" @click="handleDel(img.fileId,'fileId','/patient/delReport')">删除</span>
                        </div>
                      </template>
                    </el-form-item>
                    <el-form-item label="医生上传的报告">

                      <template
                        v-if="!suifang.reportFiles||Object.prototype.toString.call(suifang.reportFiles) !== '[object Array]'||suifang.reportFiles.length<=0"
                      >
                        <span>暂无</span>
                      </template>
                      <template v-else>
                        <div
                          class="image-package"
                          v-for="img in suifang.reportFiles.filter(item=>{return item.createUser!==row.patientId})"
                        >
                          <el-image
                            style="width: 100%;height: 100%"
                            :src="img.fileUrl"
                            :preview-src-list="[img.fileUrl]"
                            fit="fill">
                            <div slot="error" class="image-slot">
                              <i class="el-icon-picture-outline"></i>
                            </div>
                          </el-image>
                          <span class="img-del" @click="handleDel(img.fileId,'fileId','/patient/delReport')">删除</span>

                          <!--                          <span class="img-del" @click="handleDelReport(img,index)">删除</span>-->
                        </div>
                      </template>
                      <el-col :span="24">
                        <el-upload
                          class="el-upload-col"
                          ref="upload"
                          multiple
                          list-type="picture-card"
                          action="1233"
                          :file-list="form.suifangRecords[index].fileList"
                          name="uploadFiles"
                          :auto-upload="false"
                          :on-change="(file,fileList)=>{handleUploadChange(file,fileList,suifang,index)}"
                        >
                          <i class="el-icon-plus"></i>
                        </el-upload>
                        <!--                      :on-preview="handlePreview"-->
                        <!--                      :on-remove="handleRemove"-->
                        <!--                      submitUpload-->
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="操作">
                      <el-button
                        size="mini"
                        type="warning"
                        @click="handleDel(suifang.sid,'sid','/suifang/deleteSuifang?sid='+suifang.sid)">
                        删除这条随访
                      </el-button>
                    </el-form-item>
                  </el-col>
                </el-card>

                <p class="move-btn">
                  <span v-if="formData.suifangRecords?(formData.suifangRecords.length<=1||suifangOpenStatus):true">没有更多了</span>
                  <!--                  <span v-if="(formData.suifangRecords&&formData.suifangRecords.length<=1)||suifangOpenStatus">没有更多了</span>-->
                  <el-button type="text" @click="handleCloseMedicine('suifangOpenStatus')" v-if="suifangOpenStatus">
                    收起
                  </el-button>
                  <el-button
                    type="text"
                    @click="handleOpenMedicine('suifangOpenStatus')"
                    v-if="formData.suifangRecords?(formData.suifangRecords.length>1&&!suifangOpenStatus):false"
                  >点击查看更多随访记录
                  </el-button>
                  <el-button type="text" @click="handleAddMedicine('新增随访')">新增随访</el-button>
                </p>
              </el-form>
            </el-scrollbar>
          </el-col>

          <el-col :span="24" style="height: 32px;margin-top: 22px;text-align: right">
            <el-button @click="userInfoDialogVisible = false">返回列表</el-button>
            <el-button type="success" @click="handleSubmit">更新</el-button>
          </el-col>
        </el-col>

        <el-col :span="6">
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :type="activity.type"
              :hide-timestamp="true"
            >
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
        </el-col>
      </el-row>

    </el-dialog>

    <el-dialog
      :title="addType"
      :visible.sync="addDataVis"
      width="50%"
      top="15vh"
    >
      <el-form style="overflow: hidden" ref="form" :model="form" label-width="120px">
        <template v-if="addType==='新增用药'">
          <el-col :span="24">
            <el-form-item label="药名">
              <el-input v-model="medicineForm.medicineName"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="用药量">
              <el-input v-model="medicineForm.medicineCount"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="用药量单位">
              <!--              <el-input v-model="medicineForm.medicineUnit"></el-input>-->
              <el-select v-model="medicineForm.medicineUnit">
                <el-option value="毫克"></el-option>
                <el-option value="克"></el-option>
                <el-option value="片"></el-option>
                <el-option value="IU"></el-option>
                <el-option value="毫升"></el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="用药频率">
              <el-select v-model="medicineForm.medicineFrequency">
                <el-option value="每日一次"></el-option>
                <el-option value="每日俩次"></el-option>
                <el-option value="每日三次"></el-option>
                <el-option value="每日四次"></el-option>
                <el-option value="隔日一次"></el-option>
                <el-option value="每2周一次"></el-option>
                <el-option value="每四周一次"></el-option>
              </el-select>
              <!--              <el-input v-model="medicineForm.medicineFrequency"></el-input>-->
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="用药方式">
              <!--              <el-input v-model="medicineForm.medicineWay"></el-input>-->
              <el-select v-model="medicineForm.medicineWay">
                <el-option value="口服"></el-option>
                <el-option value="注射"></el-option>
                <el-option value="经皮用药（外用）"></el-option>
                <el-option value="吸入"></el-option>
                <el-option value="舌下含服"></el-option>
                <el-option value="眼部"></el-option>
                <el-option value="耳部"></el-option>
                <el-option value="鼻腔"></el-option>
                <el-option value="直肠"></el-option>
                <el-option value="阴道"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="用药时间">
              <el-date-picker
                v-model="medicineForm.startTime"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="停用时间">
              <el-date-picker
                v-model="medicineForm.endTime"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="提醒时间">
              <el-date-picker
                v-model="medicineForm.noticeTime"
                type="datetime"
                placeholder="选择日期"
                value-format="yyyy-MM-dd HH:mm:ss"
              >
                <!--                format="yyyy-MM-dd"-->

              </el-date-picker>
            </el-form-item>
          </el-col>
        </template>

        <template v-if="addType==='新增手术'">
          <el-col :span="12">
            <el-form-item label="手术名称">
              <el-input v-model="operationForm.operationName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手术时间">
              <el-date-picker
                v-model="operationForm.operationDate"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </template>

        <template v-if="addType==='新增诊断'">
          <el-col :span="12">
            <el-form-item label="诊断">
              <!--              <el-input v-model="diagnoseForm.diagnoseName"></el-input>-->
              <el-select v-model="diagnoseForm.diagnoseName">
                <el-option v-for="item in diagnosisOption" :value="item.field"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="疼痛部位">
              <el-select v-model="diagnoseForm.diagnosePart">
                <el-option v-for="item in diagnosePartOption" :label="item.label" :value="item.label"></el-option>
              </el-select>
              <!--              <el-input v-model="diagnoseForm.diagnosePart"></el-input>-->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="呼吸困难">
              <el-select
                v-model="diagnoseForm.breath"
              >
                <el-option :value="0" label="无呼吸困难"></el-option>
                <el-option :value="1" label="呼吸困难"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </template>

        <template v-if="addType==='新增随访'||addType==='随访详情'">
          <el-col :span="24">
            <el-form-item label="随访标题">
              <el-input v-model="suifangForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item label="随访时间">
                <el-date-picker
                  v-model="suifangForm.suifangDate"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-form-item label="随访内容">
              <el-input
                autosize
                type="textarea"
                v-model="suifangForm.content"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="标签">
              <el-select
                v-model="suifangForm.tagList"
                multiple
              >
                <el-option v-for="tag in tagList" :label="tag.field" :value="tag.field"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="医嘱">
              <el-input
                autosize
                type="textarea"
                v-model="suifangForm.note"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </template>

        <el-col :span="24">
          <el-form-item label="操作">
            <el-button type="success" @click="handleSubmitAdd">提交</el-button>
            <el-button @click="addDataVis= false">取消</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-dialog>

    <el-dialog
      :title="chartDialogTitle"
      :visible.sync="chartDialogVisible"
      width="50%"
      top="15vh"
    >
      <chart v-if="chartDialogVisible" :data="chartData"></chart>
    </el-dialog>

    <el-dialog
      :title="'选择发送的问卷'"
      :visible.sync="questDialogVisible"
      width="50%"
      top="15vh"
    >
      <el-row>
        <el-col :span="18" class="questSelectBody">
          <el-checkbox-group v-model="questSelect" size="medium">
            <el-checkbox v-for="item in dicList" :label="item" border>
              {{ item.field }}
            </el-checkbox>
          </el-checkbox-group>
        </el-col>
        <el-col :span="24" style="margin-top: 20px;text-align: right">
          <el-button @click="questDialogVisible=false" type="">返回</el-button>
          <el-button @click="handleAddQuest" type="success">发送</el-button>
        </el-col>
      </el-row>

    </el-dialog>

    <el-dialog
      :title="'处方'"
      :visible.sync="materialDialogVisible"
      width="50%"
      top="8vh"
      :destroy-on-close="true"
      @close="usingSportClose"
    >
      <material
        v-if="materialDialogVisible"
        :row="usingSport"
        :show.sync="materialDialogVisible"
        @closeMaterial="closeMaterial"
        :sportDefault="sportDefault"
        material-type="recipel"
        :patient-id="row.patientId"
      />
    </el-dialog>

    <el-dialog
      :title="'患者动态'"
      :visible.sync="dynamicDialogVisible"
      width="60%"
      top="5vh"
      custom-class="userInfoDialog"
    >
      <el-row class="userInfoContent" v-if="dynamicDialogVisible">
        <el-col :span="24">
          <el-scrollbar wrap-class="scrollbar-wrapper" style="overflow-x: hidden">
            <el-form class="report-style" ref="form" :model="form" label-width="120px">

              <el-col :span="24" class="user-info-title">
                【处方信息】 <span v-if="sportsForm.prescription" class="subTitle">启用时间: {{
                  new Date(sportsForm.prescription.createTime) | parseTime('{y}-{m}-{d}')
                }}</span>
              </el-col>
              <template v-if="sportsForm.prescription">
                <el-col :span="24">
                  <el-form-item label="处方名称">
                    <el-input v-model="sportsForm.prescription.sportName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="最大心率">
                    <el-input v-model="sportsForm.prescription.maxHeartrate"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="目标心率">
                    <el-input v-model="sportsForm.prescription.targetHeartrate"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="运动总量">
                    <el-input v-model="sportsForm.prescription.lastTime"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="运动强度">
                    <el-input v-model="sportsForm.prescription.sportPower"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="运动频率">
                    <el-input v-model="sportsForm.prescription.sevenDays"></el-input>
                  </el-form-item>
                </el-col>
              </template>
              <p v-else class="move-btn">
                <span>没有使用中的处方信息..</span>
              </p>

              <el-col :span="24" class="user-info-title">
                【运动记录】
              </el-col>

              <el-row>
                <el-col :span="24">
                  <el-timeline class="motion">
                    <el-timeline-item
                      v-for="item in sportsForm.sportRecord"
                      :timestamp="new Date(item.createTime) | parseTime('{y}-{m}-{d} {h}:{i}:{s}')"
                      placement="top">
                      <el-card>
                        <div class="sports-record">
                          <p>运动完成度</p>
                          <el-progress
                            :text-inside="true"
                            :stroke-width="16"
                            :percentage="getPercentage(item)"></el-progress>
                          <el-divider></el-divider>
                          <p>{{ getPercentage(item) >= 100 ? "" : item.remark }}</p>
                        </div>
                      </el-card>
                    </el-timeline-item>
                  </el-timeline>

                  <p class="move-btn">
                    <span v-if="sportsForm.sportRecord&&sportsForm.sportRecord.length<=0">没有运动记录..</span>
                    <el-button
                      v-else
                      type="text"
                      @click="handleMoveSportRecord"
                    >点击查看更多运动记录
                    </el-button>
                  </p>
                </el-col>
              </el-row>

              <el-col :span="24" class="user-info-title">
                【运动统计】
              </el-col>

              <el-row :gutter="20" style="overflow: hidden" v-if="sportsForm.prescription">
                <el-col :span="6">
                  <el-card class="sports-statistics">
                    <p>{{ sportsForm.prescription.totalDays }}天</p>
                    <p>总运动时长</p>
                  </el-card>
                </el-col>
                <el-col :span="6">
                  <el-card class="sports-statistics">
                    <p>{{ sportsForm.prescription.sucDays }}天</p>
                    <p>总达标时长</p>
                  </el-card>
                </el-col>
                <el-col :span="6">
                  <el-card class="sports-statistics">
                    <p>{{ sportsForm.prescription.nowDays || 0 }}天</p>
                    <p>当前处方时长</p>
                  </el-card>
                </el-col>
                <el-col :span="6">
                  <el-card class="sports-statistics">
                    <p>{{ sportsForm.prescription.usedSucDays }}天</p>
                    <p>当前处方达标时长</p>
                  </el-card>
                </el-col>
              </el-row>
              <p v-else class="move-btn">
                <span>没有统计信息..</span>
              </p>

              <el-row :gutter="20">
                <el-col :span="8">
                  <el-card>
                    <div slot="header" class="clearfix card-header">
                      <span>最新运动测试结果</span>
                      <!--                      <el-button-->
                      <!--                        @click="handleMoveSportTest"-->
                      <!--                        style="float: right; padding: 3px 0"-->
                      <!--                        type="text">-->
                      <!--                        查看更多-->
                      <!--                      </el-button>-->
                    </div>
                    <div class="sports-test">
                      <div class="sports-test-item" v-for="item in sportsForm.sportTest">
                        <p>
                          <span class="title">{{ item.taskName }}</span>
                          <span class="status">
<!--                            <el-tag type="success">{{ item.taskStatus }}</el-tag>-->
                          </span>
                        </p>
                        <p>
                          <span class="time">
                            {{ new Date(item.updateTime) | parseTime('{y}-{m}-{d}') }}</span>
                          <span class="move">
                            <el-button type="text" @click="getOneSportTest(item.selectId)">详情</el-button>
                          </span>
                        </p>
                      </div>
                      <p class="move-btn">
                        <span v-if="sportsForm.sportTest&&sportsForm.sportTest.length<=0">没有运动测试信息..</span>
                      </p>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="8">
                  <el-card>
                    <div slot="header" class="clearfix card-header">
                      <span>最新随访记录</span>
                      <el-button
                        :disabled="sportsForm.suifang&&sportsForm.suifang.length<=0?true:false"
                        @click="handleMoveSuifang"
                        style="float: right; padding: 0"
                        type="text">
                        查看更多
                      </el-button>
                    </div>

                    <div class="sports-test">
                      <div class="sports-test-item" v-for="item in sportsForm.suifang">
                        <p>
                          <span class="title">{{ item.name }}</span>
                          <span class="status">
                            <el-tag :type="item.status|suifangStatusFilterType">
                              {{ item.status | suifangStatusFilterName }}
                            </el-tag>
                          </span>
                        </p>
                        <p>
                          <span class="time">
                            {{ new Date(item.updateTime) | parseTime('{y}-{m}-{d}') }}
                          </span>
                          <span class="move">
                            <el-button @click="handleOpenSuiFangInfo(item)" type="text">详情</el-button>
                          </span>
                        </p>
                      </div>
                      <p class="move-btn">
                        <span v-if="sportsForm.suifang&&sportsForm.suifang.length<=0">没有随访信息..</span>
                      </p>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="8">
                  <el-card>
                    <div slot="header" class="clearfix card-header">
                      <span>最新问卷调查结果</span>

                      <!--                      <el-button-->
                      <!--                        @click="handleMoveTask"-->
                      <!--                        style="float: right; padding: 3px 0"-->
                      <!--                        type="text">-->
                      <!--                        查看更多-->
                      <!--                      </el-button>-->
                    </div>
                    <div class="sports-test">
                      <div class="sports-test-item" v-for="item in sportsForm.task">
                        <p>
                          <span class="title">{{ item.taskName }}</span>
                          <span class="status">
<!--                            <el-tag type="success">-->
                            <!--                              {{ item.taskStatus | suifangStatusFilterName}}-->
                            <!--                            </el-tag>-->


                            <el-tag :type="item.taskStatus|taskStatusFilterType">
                              {{ item.taskStatus | taskStatusFilterName }}
                            </el-tag>

                          </span>
                        </p>
                        <p>
                          <span class="time">
                            {{ new Date(item.updateTime) | parseTime('{y}-{m}-{d}') }}
                          </span>
                          <span class="move">
                            <el-button @click="getOneQuestion(item)" type="text">详情</el-button>
                          </span>
                        </p>
                      </div>
                      <p class="move-btn">
                        <span v-if="sportsForm.task&&sportsForm.task.length<=0">没有问卷信息..</span>
                      </p>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-form>
          </el-scrollbar>
        </el-col>
      </el-row>
    </el-dialog>

    <el-dialog
      :title="'运动记录'"
      :visible.sync="sportRecordDialogVisible"
      width="800px"
      top="5vh"
    >
      <el-timeline class="motion">
        <el-timeline-item
          v-for="item in sportRecordList"
          :timestamp="item.date"
          placement="top">
          <el-card>
            <div class="sports-record">
              <p>运动完成度</p>
              <el-progress :text-inside="true" :stroke-width="16" :percentage="getPercentage(item)"></el-progress>
              <el-divider></el-divider>
              <p>{{ getPercentage(item) >= 100 ? '' : '未完成原因：' + (item.remark || '无') }}</p>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <pagination
        style="overflow: hidden"
        ref="pagination"
        v-show="SRtotal>0"
        :total="SRtotal"
        :page.sync="SRlistQuery.pageNum"
        :limit.sync="SRlistQuery.pageCount"
        @pagination="getSportRecord"
      />
    </el-dialog>

    <el-dialog
      :title="'运动测试'"
      :visible.sync="sportTestDialogVisible"
      width="40%"
      top="5vh"
    >
      <div class="sports-test">
        <div class="sports-test-item" v-for="item in sportTestList">
          <p>
            <span class="title">{{ item.taskName }}</span>
            <span class="status">
              <el-tag type="success">{{ item.taskStatus }}</el-tag>
            </span>
          </p>
          <p>
            <span class="time">{{ new Date(item.updateTime) | parseTime('{y}-{m}-{d}') }}</span>
            <span class="move">
              <el-button type="text">详情</el-button>
            </span>
          </p>
        </div>
      </div>
    </el-dialog>

    <el-dialog
      :title="'随访记录'"
      :visible.sync="suifangDialogVisible"
      width="40%"
      top="5vh"
    >
      <div class="sports-test">
        <div class="sports-test-item" v-for="item in suifangList">
          <p>
            <span class="title">{{ item.name }}</span>
            <span class="status">
              <el-tag
                :type="item.status|suifangStatusFilterType">
                {{ item.status | suifangStatusFilterName }}
              </el-tag>
            </span>
          </p>
          <p>
            <span class="time">{{ new Date(item.suifangDate) | parseTime('{y}-{m}-{d}') }}</span>
            <span class="move">
              <el-button @click="handleOpenSuiFangInfo(item)" type="text">详情</el-button>
            </span>
          </p>
        </div>
      </div>
    </el-dialog>

    <el-dialog
      :title="'问卷调查'"
      :visible.sync="taskDialogVisible"
      width="40%"
      top="5vh"
    >
      <div class="sports-test">
        <div class="sports-test-item" v-for="item in taskList">
          <p>
            <span class="title">{{ item.questionnaireName }}</span>
            <span class="status">
              <el-tag type="success">{{ item.status }}</el-tag>
            </span>
          </p>
          <p>
            <span class="time">{{ new Date(item.updateTime) | parseTime('{y}-{m}-{d}') }}</span>
            <span class="move">
              <el-button type="text">详情</el-button>
            </span>
          </p>
        </div>
      </div>
    </el-dialog>

    <el-dialog
      :title="'运动测试详情'"
      :visible.sync="sportTestInfoDialogVisible"
      width="40%"
      top="5vh"
    >
      <div class="sports-test-info">
        <el-form>
          <p class="title">
            心肺评估
          </p>
          <el-card>
            <div slot="header" class="clearfix card-header">
              <span>心肺耐力</span>
            </div>
            <div>
              <el-form-item label="静息心率" label-width="160px">{{ sportOption[0].actionValue || '无' }}</el-form-item>
              <el-form-item label="心肺运动实验" label-width="160px">

                <template v-if="sportOption[1].actionValue&&sportOption[1].actionValue.length>0">
                  <p
                    style="display: inline-block;margin: 0;padding: 0"
                    v-for="item in sportOptionImg"
                  >
                    <el-image
                      style="width: 50px; height: 50px"
                      :src="item"
                      :preview-src-list="sportOptionImg">
                    </el-image>
                  </p>
                </template>
                <template v-else>
                  无
                </template>
              </el-form-item>
              <el-form-item label="六分钟步行实验" label-width="160px">
                <template v-if="sportOption[7].actionValue&&sportOption[7].actionValue.length>0">
                  <p
                    style="display: inline-block;margin: 0;padding: 0"
                    v-for="item in sportOptionImg7"
                  >
                    <el-image
                      style="width: 50px; height: 50px"
                      :src="item"
                      :preview-src-list="sportOptionImg">
                    </el-image>
                  </p>
                </template>
                <template v-else>
                  无
                </template>
              </el-form-item>
              <el-form-item label="三分钟台阶测试" label-width="160px">{{ sportOption[8].actionValue || '无' }}</el-form-item>
            </div>
          </el-card>

          <p class="title">
            耐力与肌力
          </p>
          <el-card>
            <div slot="header" class="clearfix card-header">
              <span>上肢肌力</span>
            </div>
            <div>
              <el-col :span="8">
                <el-form-item label="个数" label-width="60px">
                  <template
                    v-if="sportOption[9].actionValue&&sportOption[9].actionValue.length>0&&sportOption[9].actionValue.split(',').length>0">
                    {{ sportOption[9].actionValue.split(',')[0] }}
                  </template>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="重量" label-width="60px">
                  <template
                    v-if="sportOption[9].actionValue&&sportOption[9].actionValue.length>0&&sportOption[9].actionValue.split(',').length>1">
                    {{ sportOption[9].actionValue.split(',')[1] }}
                  </template>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="力量" label-width="60px">

                  <template
                    v-if="sportOption[9].actionValue&&sportOption[9].actionValue.length>0&&sportOption[9].actionValue.split(',').length>1">
                    {{
                      Math.floor((1 + 0.0333 * sportOption[9].actionValue.split(',')[0]) * sportOption[9].actionValue.split(',')[1])
                    }}
                  </template>
                </el-form-item>
              </el-col>
            </div>
          </el-card>

          <el-card>
            <div slot="header" class="clearfix card-header">
              <span>下肢肌力</span>
            </div>
            <div>
              <el-col :span="8">
                <el-form-item label="个数" label-width="60px">
                  <template
                    v-if="sportOption[10].actionValue&&sportOption[10].actionValue.length>0&&sportOption[10].actionValue.split(',').length>0">
                    {{ sportOption[10].actionValue.split(',')[0] }}
                  </template>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="重量" label-width="60px">
                  <template
                    v-if="sportOption[10].actionValue&&sportOption[10].actionValue.length>0&&sportOption[10].actionValue.split(',').length>1">
                    {{ sportOption[10].actionValue.split(',')[1] }}
                  </template>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="力量" label-width="60px">
                  <template
                    v-if="sportOption[10].actionValue&&sportOption[10].actionValue.length>0&&sportOption[10].actionValue.split(',').length>1">
                    {{
                      Math.floor((1 + 0.0333 * sportOption[10].actionValue.split(',')[0]) * sportOption[10].actionValue.split(',')[1])
                    }}
                  </template>
                </el-form-item>
              </el-col>
            </div>
          </el-card>

          <p class="title">
            柔韧性
          </p>
          <el-card>
            <div slot="header" class="clearfix card-header">
              <span>上肢灵活性</span>
            </div>
            <div>
              <el-form-item label="右侧抓背" label-width="160px">{{ sportOption[2].actionValue || '无' }}</el-form-item>
              <el-form-item label="左侧抓背" label-width="160px">{{ sportOption[3].actionValue || '无' }}</el-form-item>
            </div>
          </el-card>
          <el-card>
            <div slot="header" class="clearfix card-header">
              <span>下肢灵活性</span>
            </div>
            <div>
              <el-form-item label="坐位体前屈" label-width="160px">{{ sportOption[4].actionValue || '无' }}</el-form-item>
            </div>
          </el-card>

          <p class="title">
            平衡性
          </p>
          <el-card>
            <div slot="header" class="clearfix card-header">
              <span>身体平衡性</span>
            </div>
            <div>
              <el-form-item label="右侧单腿站立" label-width="160px">{{ sportOption[5].actionValue || '无' }}</el-form-item>
              <el-form-item label="左侧单腿站立" label-width="160px">{{ sportOption[6].actionValue || '无' }}</el-form-item>
            </div>
          </el-card>

          <p class="title">
            综合
          </p>
          <el-card>
            <div slot="header" class="clearfix card-header">
              <span>综合</span>
            </div>
            <div>
              <el-form-item label="坐站起走" label-width="160px">{{ sportOption[8].actionValue || '无' }}</el-form-item>
            </div>
          </el-card>
        </el-form>
      </div>
    </el-dialog>

    <el-dialog
      :title="'问卷调查详情'"
      :visible.sync="taskInfoDialogVisible"
      width="40%"
      top="5vh"
    >
      <div class="task-info">
        <div class="task-info-handle">
          <p class="text-info">
            <span class="score">{{ taskInfo.totalScore }}</span>
            <span class="info">{{ questionEndScore.content }}</span>
            <span class="proposal">{{ questionEndScore.remark }}</span>
          </p>
          <p class="type-info">
            <i class="el-icon-warning-outline"/>
          </p>
        </div>
        <div class="task-info-content">
          <p class="task-info-item" v-for="item in questionList">
            <span class="title">{{ item.questionName }}</span>
            <span v-for="d_item in item.answers" :class="d_item.check?'check':''">{{ d_item.answerName }}</span>
          </p>
        </div>
      </div>
    </el-dialog>

    <div class="seat-100">

    </div>
  </div>
</template>

<script>
import Upload from '@/component/upload'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { parseTime, deepClone } from '@/utils'
import { getList as getDicList } from '@/api/dictionary'
import {
  getList,
  getInfo,
  upUserInfo,
  addWeight,
  addBmi,
  addRbp,
  addRhr,
  addSbp,
  addMed,
  addOperation,
  addDiagnose,
  updateDiagnose,
  deleteDiagnose,
  findCommonTag,
  uploadReport,
  addSuifang,
  updMed,
  updateSuifang,
  delData,
  addQuest,
  addStTask,
  getMypatients,
  getHealthMsg,
  getSportRecord,
  getListSportTest,
  getQuestionRecord,
  findSuifangList,
  getOneSportTest,
  getOneQuestion,
  getUsingSport,
  getOneSport,
  findRhr
} from '@/api/app-user'
import { getList as getQuest } from '@/api/questionnaire'
import { mapGetters } from "vuex";
import chart from '@/component/chart'
import material from '@/component/material'

const default_form = {
  actionChief: '',
  afterSportBloodPressure: '',
  age: '',
  birthday: '',
  bloodSugar: '',
  bmiList: '',
  createTime: '',
  deletedFlag: '',
  diagnoseList: '',
  diseaseList: '',
  doctorList: '',
  emerUser: '',
  emergencyList: '',
  height: '',
  highDensityLipoprotein: '',
  id: '',
  lowDensityLipoprotein: '',
  maxRateList: '',
  medicineRecords: '',
  noteCode: '',
  noticeSign: '',
  operationRecords: '',
  password: '',
  patientId: '',
  phone: '',
  pic: '',
  registrationId: '',
  restingBloodPressure: '',
  restingHeartRateList: '',
  sex: '',
  smoke: '',
  step: '',
  suifangRecords: '',
  targetRate: '',
  totalCholesterol: '',
  triglyceride: '',
  triglycerideHemoglobin: '',
  updateTime: '',
  username: '',
  weight: '',
  weightList: '',
}

let that

function washSuifangData(data) {
  if (Object.prototype.toString.call(data.tag) === '[object Array]') {
    data.tag = data.tag.join(',')
  }
  return data
}

const dataApi = {
  userInfo: {
    handle: upUserInfo,
    dataName: 'userInfo',
    form: null
  },
  restingHeartRateList: {
    handle: addRhr,
    dataName: 'restingHeartRateList',
    form: null
  },
  weightList: {
    handle: addWeight,
    dataName: 'weightList',
    form: null

  },
  bmiList: {
    handle: addBmi,
    dataName: 'bmiList',
    form: null
  },
  restingBloodPressure: {
    handle: addRbp,
    dataName: 'restingBloodPressure',
    form: null

  },
  afterSportBloodPressure: {
    handle: addSbp,
    dataName: 'afterSportBloodPressure',
    form: null
  },
  diagnoseList: {
    handle: updateDiagnose,
    dataName: 'diagnoseList',
    form: null
  },

  medicineRecords: {
    handle: updMed,
    dataName: 'medicineRecords',
    form: null
  },
  suifangRecords: {
    handle: updateSuifang,
    handleOther: (data) => {
      that.handleUpLoadFile(data)
    },
    dataName: 'suifangRecords',
    form: null
  },
}
const dataApiChange = []

const defaultSportOption = [
  { actionName: '静息心率', actionValue: null, actionType: '心肺耐力' },
  { actionName: '心肺运动试验', actionValue: null, actionType: '院内心肺评估' },
  { actionName: '右侧抓背', actionValue: null, actionType: '上肢灵活性' },
  { actionName: '左侧抓背', actionValue: null, actionType: '上肢灵活性' },
  { actionName: '坐位体前屈', actionValue: null, actionType: '下肢灵活性' },
  { actionName: '右侧单腿站立', actionValue: null, actionType: '身体平衡性' },
  { actionName: '左侧单腿站立', actionValue: null, actionType: '身体平衡性' },
  { actionName: '六分钟台阶测试', actionValue: null, actionType: '院内心肺评估' },
  { actionName: '坐站起走', actionValue: null, actionType: '综合' },
  { actionName: '上肢肌力', actionValue: null, actionType: '上肢肌力' },
  { actionName: '下肢肌力', actionValue: null, actionType: '下肢肌力' },
  { actionName: '三分钟台阶测试', actionValue: null, actionType: '心肺耐力' },

]

export default {
  name: 'Doctor',
  components: { Pagination, chart, material },
  filters: {
    statusFilterType(status) {
      status = status || '0'
      const statusMap = {
        '0': 'danger',
        '1': 'success'
      }
      return statusMap[status]
    },
    suifangStatusFilterType(status) {
      status = status || '0'
      const statusMap = {
        '0': 'warning',
        '1': 'success',
        '2': 'info',
      }
      return statusMap[status]
    },
    suifangStatusFilterName(status) {
      status = status || '0'
      const statusMap = {
        '0': '未随访',
        '1': '已随访',
        '2': '已过期'
      }
      return statusMap[status]
    },
    taskStatusFilterType(status) {
      status = status || '0'
      const statusMap = {
        '0': '',
        '1': 'warning',
        '2': 'success',
        '3': 'info',
      }
      return statusMap[status]
    },
    taskStatusFilterName(status) {
      status = status || '0'
      const statusMap = {
        '0': '未完成',
        '1': '进行中',
        '2': '已完成',
        '3': '已过期',
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
    },
    sexFilterTitle(sex) {
      sex = sex || 0
      const statusMap = {
        0: '男',
        1: '女'
      }
      return statusMap[sex]
    },
    noticeSignFilterType(value) {
      value = value || 0
      const statusMap = {
        '': 'info',
        '0': '',
        '1': 'success',
        '2': '',
        '3': 'warning',
        '4': 'danger',
        '5': 'info',
        '6': 'success',
      }
      return statusMap[value]
    },
    // 0.警告标识,1.发新处方,2.微调处方,3.7天内需随访,4.3个月内未随访,5.发问卷,6.发测试*/
    noticeSignFilterTitle(value) {
      value = value || ''
      const statusMap = {
        '': '无',
        '0': '无',
        '1': '发新处方',
        '2': '微调处方',
        '3': '7天内需随访',
        '4': '3个月内未随访',
        '5': '发问卷',
        '6': '发测试',
      }
      return statusMap[value]
    }
  },
  data() {
    return {
      api: process.env.VUE_APP_BASE_API,
      total: 10,
      userDataView: true,
      userInfoDialogVisible: false,
      userInfoDialogType: 'add', // add || edit

      sportRecordDialogVisible: false,
      sportRecordList: [],

      SRtotal: 0,
      SRlistQuery: {
        pageCount: 10,
        pageNum: 1,
        prescriptId: '1',
      },

      suifangDialogVisible: false,
      suifangList: [],

      taskDialogVisible: false,
      taskList: [],

      sportTestDialogVisible: false,
      sportTestList: [],

      taskInfoDialogVisible: false,
      taskInfo: {},

      sportTestInfoDialogVisible: false,
      sportTestInfo: {},

      chartDialogVisible: false,
      chartDialogTitle: '历史',
      chartData: null,

      dynamicDialogVisible: false,
      dynamicDialogTitle: '历史',

      questDialogVisible: false,
      questSelect: [],
      questForm: {
        patientId: '',
        questionnaireName: '',
        questionnaireType: '',
        createUser: '',
        createUsername: '',
      },
      sportDefault: {
        maxHr: '',
        rhr: '',
        targetHr: ''
      },

      form: deepClone(default_form),
      sportsForm: {},
      listQuery: {
        pageCount: 1,
        pageSize: 10,
        search: ''
      },
      lqTypeOption: [
        { label: '全部', value: 0 },
        { label: '发处方', value: 1 },
        { label: '需随访', value: 2 },
        { label: '发问卷', value: 3 },
        { label: '发测试', value: 4 },
      ],
      myListQuery: {
        pageCount: 1,
        pageSize: 10,
        type: 0,
        search: '',
        doctorId: ''
      },
      activities: [
        {
          content: '基础信息',
        }, {
          content: '主诉',
        }, {
          content: '诊断信息',
        }, {
          content: '用药史',
        }, {
          content: '手术史',
        }, {
          content: '关键指标',
        }, {
          content: '随访记录',
        }
      ],
      tableData: [],
      medicineOpenStatus: false,
      operationOpenStatus: false,
      suifangOpenStatus: false,
      formDataOption: {
        userInfo: {
          listData: 1,
          isOne: 1,
        },
        maxRateList: {
          listData: 0,
          isOne: 1,
        },
        restingHeartRateList: {
          listData: 0,
          isOne: 1,
        },
        weightList: {
          listData: 0,
          isOne: 1,
        },
        bmiList: {
          listData: 0,
          isOne: 1,
        },
        restingBloodPressure: {
          listData: 0,
          isOne: 1,
        },
        afterSportBloodPressure: {
          listData: 0,
          isOne: 1,
        },
        medicineRecords: {
          listData: 1,
          isOne: 0,
        },
        suifangRecords: {
          listData: 1,
          isOne: 0,
        },
        diagnoseList: {
          listData: 0,
          isOne: 1,
        },
      },
      formData: {
        userInfo: {
          patientId: '',
          actionChief: '',
          age: '',
          birthday: '',
          height: '',
          maxRate: '',
          phone: '',
          sex: '',
          smoke: '',
          targetRate: '',
          username: '',
          weight: '',
        },
        maxRateList: {
          value: ''
        },
        restingHeartRateList: {
          value: ''
        },
        weightList: {
          value: ''
        },
        bmiList: {
          value: ''
        },
        restingBloodPressure: {
          min: '',
          max: '',
        },
        afterSportBloodPressure: {
          min: '',
          max: '',
        },
        diagnoseList: {},
        medicineRecords: null,
        suifangRecords: null,
      },
      formDataDefault: {},
      addType: '新增诊断', // 诊断，用药，手术，随访
      addDataVis: false,
      medicineForm: {},
      operationForm: {},
      diagnoseForm: {},
      suifangForm: {},
      tagList: [],
      row: {},
      materialDialogVisible: false,

      dicList: [],
      usingSport: {},
      questionList: [],

      sportOption: deepClone(defaultSportOption),

      questionEndScore: {},
      questionEnd: [
        {
          type: '7c19ac7b8917468f98ba28a4bcc879c6', // 匹兹堡睡眠质量指数
          levelOption: [
            {
              min: -1,
              max: 5,
              content: '睡眠质量很好',
              remark: ''
            },
            {
              min: 5,
              max: 10,
              content: '睡眠质量还行',
              remark: ''
            },
            {
              min: 10,
              max: 15,
              content: '睡眠质量一般',
              remark: ''
            },
            {
              min: 15,
              max: 21,
              content: '睡眠质量很差',
              remark: ''
            }
          ]
        },
        {
          type: 'b87f3eaf83814372ace8aedfaa860f4d', // 尼古丁依赖量
          levelOption: [
            {
              min: -1,
              max: 2,
              content: '尼古丁轻度依赖',
              remark: ''
            },
            {
              min: 2,
              max: 5,
              content: '尼古丁中度依赖',
              remark: ''
            },
            {
              min: 5,
              max: 10,
              content: '尼古丁重度依赖',
              remark: ''
            },
          ]
        },
        {
          type: '8edf0c3441b140be8830939076e920e3', // PHQ-9抑郁症筛查量表
          levelOption: [
            {
              min: -1,
              max: 4,
              content: '没有忧郁症',
              remark: '注意自我保重'
            },
            {
              min: 4,
              max: 9,
              content: '可能有轻微忧郁症',
              remark: '建议咨询心理医生或心理医学工作者'
            },
            {
              min: 9,
              max: 14,
              content: '可能有中度忧郁症',
              remark: '建议咨询心理医生或心理医学工作者'
            },
            {
              min: 14,
              max: 19,
              content: '可能有中重度忧郁症',
              remark: '建议咨询心理医生或心理医学工作者'
            },
            {
              min: 19,
              max: 27,
              content: '可能有重度忧郁症',
              remark: '一定要看心理医生或心理医学工作者'
            },
          ]
        },
        {
          type: '5b3595ee8f8445be9a28df8d5310f97f', // 焦虑症筛查量表GAD-7
          levelOption: [
            {
              min: -1,
              max: 4,
              content: '没有焦虑症',
              remark: '注意自我保重'
            },
            {
              min: 4,
              max: 9,
              content: '可能有轻微焦虑症',
              remark: '建议咨询心理医生或心理医学工作者'
            },
            {
              min: 9,
              max: 13,
              content: '可能有中度焦虑症',
              remark: '建议咨询心理医生或心理医学工作者'
            },
            {
              min: 13,
              max: 18,
              content: '可能有中重度焦虑症',
              remark: '建议咨询心理医生或精神科医生'
            },
            {
              min: 19,
              max: 21,
              content: '可能有重度焦虑症',
              remark: '一定要看心理医生或精神科医生'
            },
          ]
        },
        {
          type: '5ed571c030c146f481403b5d0beac74f', // 体力活动状态（IPAQ）评估量表
          levelOption: [
            {
              content: '体力活动足',
            },
            {
              content: '体力活动不足',
            }
          ]
        },
        {
          type: 'cc3bb6631033468fb2a022c63301f8a6', // SF-36生活质量筛查表
          levelOption: [
            {
              min: 0,
              max: 71,
              content: '差',
              remark: ''
            },
            {
              min: 71,
              max: 117,
              content: '中',
              remark: ''
            },
            {
              min: 117,
              max: 141,
              content: '良',
              remark: ''
            },
          ]
        },
      ],
      diagnosePartOption: [
        {
          label: '没有疼痛',
        },
        {
          label: '颈部疼痛',
        },
        {
          label: '上肢疼痛',
        },
        {
          label: '下肢疼痛',
        },
        {
          label: '躯干疼痛',
        }
      ],
      diagnosisOption: []
    }
  },
  created() {
  },
  mounted() {
    that = this
    this.myListQuery.doctorId = this.userInfo.userId
    // this.userInfo.isDoctor = true
    this.getList()

    this.getTag()
    this.getDicList()
    this.getDiagnosisOption()
  },
  watch: {},
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    sportOptionImg() {
      const list = []
      if (!!this.sportOption[1].actionValue && this.sportOption[1].actionValue.length > 0) {
        this.sportOption[1].actionValue.split(';').forEach(item => {
          if (!!item && item.length > 0) {
            list.push(item)
          }
        })
      }
      return list
    },
    sportOptionImg7() {
      const list = []
      if (!!this.sportOption[1].actionValue && this.sportOption[1].actionValue.length > 0) {
        this.sportOption[1].actionValue.split(';').forEach(item => {
          if (!!item && item.length > 0) {
            list.push(item)
          }
        })
      }
      return list
    }
  },
  methods: {
    closeMaterial() {
      this.materialDialogVisible = false
    },
    getPercentage(item) {
      if (!item || Object.prototype.toString.call(item.actions) !== '[object Array]' || item.actions.length <= 0) {
        return 0
      } else {
        let len = 0
        item.actions.forEach(i => {
          if (i.status === 1) {
            len++
          }
        })
        return Math.floor(len / item.actions.length * 100)
      }
    },
    handleMoveSportRecord() {
      this.getSportRecord()
    },

    handleMoveSportTest() {
      this.getListSportTest()
    },

    handleMoveSuifang() {
      this.findSuifangList()
    },
    handleMoveTask() {
      this.getQuestionRecord()
    },
    async getSportRecord() {
      const data = await getSportRecord({ patientId: this.row.patientId, ...this.SRlistQuery })
      this.sportRecordList = data.data.records
      this.SRtotal = data.data.total
      this.sportRecordDialogVisible = true
    },
    async findSuifangList() {
      const data = await findSuifangList({ patientId: this.row.patientId })
      console.log(data)
      this.suifangList = data.data.records
      this.suifangDialogVisible = true
    },
    async getQuestionRecord() {
      const data = await getQuestionRecord({ patientId: this.row.patientId, date: new Date() })

      this.taskList = data.data
      console.log(data.data)
      this.taskDialogVisible = true
    },
    async getListSportTest() {
      const data = await getListSportTest({ patientId: this.row.patientId })
      this.sportTestList = data.data.records
      this.sportTestDialogVisible = true
      console.log(this.sportTestList)
      console.log(data)
    },
    async getOneSportTest(tid) {
      this.sportOption = deepClone(defaultSportOption)
      const data = await getOneSportTest({ tid: tid })
      this.sportTestInfoDialogVisible = true
      this.sportTestInfo = data.data
      if (Object.prototype.toString.call(this.sportTestInfo) === '[object Array]') {
        this.sportTestInfo.forEach(item => {
          this.sportOption.forEach(s_item => {
            if (item.actionName === s_item.actionName && item.actionType === s_item.actionType) {
              s_item.actionValue = item.actionValue
            }
          })
        })
      }
      console.log(1111)
      console.log(this.sportOption)
    },
    async getOneQuestion(item) {
      console.log(item)
      const data = await getOneQuestion({ recordId: item.selectId })
      const question = await getQuest({ questionType: data.data.questionnaireType })
      this.calcScore(data.data)
      this.washQuestion(data.data, question.data)
      this.taskInfoDialogVisible = true
      this.taskInfo = deepClone(data.data)
    },
    calcScore(data) {
      // questionEndScore
      const score = Number(data.totalScore)
      this.questionEnd.forEach((item) => {
        if (item.type === data.questionnaireType) {

          if (item.type === '5ed571c030c146f481403b5d0beac74f') {
            const scoreList = []
            data.answerId.split(';').forEach((s_item, s_index) => {
              if (s_index <= 1) {
                if (isNaN(Number(s_item))) {
                  scoreList.push(0)
                  scoreList.push(0)
                } else {
                  scoreList.push(Number(s_item))
                }
              } else {
                scoreList.push(s_item)
              }
              // splice
            })
            console.log(scoreList)
            if (scoreList[0] * scoreList[1] >= 75 || scoreList[2] * scoreList[3] >= 150) {
              this.questionEndScore = deepClone(item.levelOption[0])
            } else {
              this.questionEndScore = deepClone(item.levelOption[1])
            }
          } else {
            console.log(score)
            console.log(item)
            item.levelOption.forEach(l_item => {
              if (l_item.min < score && score <= l_item.max) {
                this.questionEndScore = deepClone(l_item)
              }
            })
          }
        }
      })

      console.log(123123123123123)
      console.log(data)
      console.log(this.questionEndScore)
      // questionnaireType
    },
    washQuestion(data, question) {
      console.log(123123)
      console.log(data)
      console.log(question)
      let answerList = []
      if (data.questionnaireType === '5ed571c030c146f481403b5d0beac74f') {
        data.answerId.split(';').forEach((s_item, s_index) => {
          if (s_index <= 1) {
            answerList.push('0')
            answerList.push('0')
          } else {
            answerList.push(s_item)
          }
          // splice
        })
      } else {
        answerList = data.answerId.split(';')
      }
      console.log(answerList)
      answerList.forEach((item, index) => {
        if (!!item) {
          const list = item.split(',')
          list.forEach(a_i => {
            let check = null
            question[index].answers.forEach(d_i => {
              check = d_i
            })
            if (check) {
              this.$set(check, 'check', true)
            } else {
              question[index].answers.push({
                answerName: a_i,
                check: true
              })
            }
          })
          answerList[index] = list
        } else {
          answerList[index] = []
        }
      })
      this.questionList = question

      console.log('11111')
      console.log(this.questionList)
      console.log(answerList)
    },
    async getOneSport(row) {
      const data = await getOneSport({ sportId: row.sportId })
      this.usingSport = data.data
      this.findRhr(row)
      console.log(6666)
      console.log(data)
    },
    async findRhr(row) {
      const res = await findRhr({ patientId: row.patientId })
      const rhr = res.data
      if (!isNaN(row.age)) {
        this.sportDefault.maxHr = 220 - row.age - 10
      }
      if (!isNaN(rhr)) {
        this.sportDefault.rhr = rhr
        // this.sportDefault.targetHr = (this.sportDefault.maxHr - this.sportDefault.rhr) * 0.5 + this.sportDefault.rhr
      }
      this.materialDialogVisible = true
    },
    handleOpenQuest(row) {
      this.questForm.patientId = row.patientId
      this.questForm.createUser = this.userInfo.userId
      this.questForm.createUsername = this.userInfo.userName
      this.questDialogVisible = true
    },

    handleOpenDynamic(row) {
      // row.patientId = '27fa26e049974936ac98c4c7d1ec48af'
      this.row = row
      this.getHealthMsg()
    },

    handleOpenMotion(row) {
      console.log(row)
      const data = {
        patientId: row.patientId,
        createUser: this.userInfo.userId,
        createUsername: this.userInfo.userName
      }
      return new Promise((resolve, reject) => {
        addStTask(data).then(response => {
          this.$message({
            message: '提交成功！',
            type: 'success'
          })
          resolve(true)
        }).catch(() => {
          reject(false)
        })
      })
    },

    handleOpenMaterial(row) {
      this.row = row
      if (row.sportId) {
        this.getOneSport(row)
      } else {
        this.usingSport = null
        this.findRhr(row)
      }
    },

    handleOpenSuiFang(row) {
      this.row = row
      this.addType = '新增随访'
      this.addDataVis = true
    },

    handleOpenSuiFangInfo(item) {
      this.suifangForm = item
      if (!item.tag || item.tag.length <= 0) {
        this.$set(item, 'tagList', [])
      } else {
        this.$set(item, 'tagList', item.tag.split(','))
      }
      this.addType = '随访详情'
      this.addDataVis = true
    },

    handleAddQuest() {
      const list = []
      this.questSelect.forEach((item) => {
        const itemData = deepClone(this.questForm)
        itemData.questionnaireName = item.field
        itemData.questionnaireType = item.did
        list.push(itemData)
      })
      console.log(list)

      return new Promise((resolve, reject) => {
        addQuest(list).then(response => {
          console.log(response)
          this.$message({
            message: '提交成功！',
            type: 'success'
          })
          this.questDialogVisible = false
          resolve(true)
        }).catch(() => {
          reject(false)
        })
      })
    },

    async getDicList() {
      const data = await getDicList({ parentId: '6a05678225ff457db9e263fccbc3acf2' })
      this.washDicData(data.data)
      console.log(121212)
      console.log(this.dicList)
    },

    async getDiagnosisOption() {
      const data = await getDicList({ parentId: '54f9beb2f5ab48419070623e40c23471' })
      this.diagnosisOption = data.data
      console.log(this.diagnosisOption)
    },
    washDicData(list) {
      list.forEach(item => {
        if (item.children && item.children.length > 0) {
          this.washDicData(item.children)
        } else {
          this.dicList.push(item)
        }
      })
    },

    handleUpLoadFile(data) {
      console.log(1)
      const sid = data.sid
      let fileList = []
      console.log(this.form.suifangRecords)
      this.form.suifangRecords.forEach(item => {
        if (item.sid === sid) {
          fileList = item.fileList2
          this.$set(item, 'fileList', [])
          console.log(12345555555)
        }
      })
      console.log(this.form)
      if (Object.prototype.toString.call(fileList) === '[object Array]') {
        const formData = new FormData()
        console.log(fileList)
        fileList.forEach((item) => {
          formData.append('uploadFiles', item.raw)
        })
        formData.set('jointId', sid)
        formData.set('createUser', this.userInfo.userId)
        return new Promise((resolve, reject) => {
          uploadReport(formData).then(response => {
            console.log(response)
            // this.$message({
            //   message: '提交成功！',
            //   type: 'success'
            // })
            this.addDataVis = false
            resolve(true)
          }).catch(() => {
            reject(false)
          })
        })
      }
    },

    handleClickHisData(data, title) {
      this.chartDialogTitle = title
      this.chartData = data
      this.chartDialogVisible = true
    },
    handleUploadChange(file, fileList, data, index) {
      console.log('change')
      console.log(fileList)
      const uidList = []
      fileList.forEach((item) => {
        uidList.push(item.uid)
      })
      this.form.suifangRecords[index].fileList2 = fileList
      data.fileList2 = uidList.join(',')

      console.log(this.formData)
      console.log(this.formDataDefault)
    },
    handleOpenMedicine(obj) {
      this[obj] = true
    },

    handleCloseMedicine(obj) {
      this[obj] = false
    },

    handleAddMedicine(type) {
      this.addType = type
      this.addDataVis = true
    },

    handleInfo(row) {
      this.userInfoDialogType = 'edit'
      this.row = row
      this.getInfo()
    },
    handleAddUser() {
      this.userInfoDialogVisible = true
      this.userInfoDialogType = 'add'
    },
    async getList() {
      if (this.userInfo.isDoctor) {
        const data = await getMypatients(this.myListQuery)
        this.tableData = deepClone(data.data.records)
        this.total = data.data.total
      } else {
        const data = await getList(this.listQuery)
        this.tableData = deepClone(data.data.records)
        console.log(this.tableData)
        this.total = data.data.total
      }
    },
    async getHealthMsg() {
      const data = await getHealthMsg({ patientId: this.row.patientId })
      this.sportsForm = data.data
      console.log(111111)
      console.log(this.sportsForm)
      this.dynamicDialogVisible = true
    },
    async getMypatients() {

      const data = await getMypatients(this.myListQuery)
      this.tableData = deepClone(data.data.records)
      this.total = data.data.total
    },
    async getTag() {
      const data = await findCommonTag()
      this.tagList = data.data
    },
    async getInfo() {
      const data = await getInfo({ patientId: this.row.patientId })
      console.log(1234)
      console.log(data.data)
      this.form = deepClone(data.data)
      this.washFormData()
      this.userInfoDialogVisible = true
      if (Object.prototype.toString.call(this.form.suifangRecords) === '[object Array]') {
        this.form.suifangRecords.forEach(item => {
          if (!item.tag || item.tag.length <= 0) {
            this.$set(item, 'tagList', [])
          } else {
            this.$set(item, 'tagList', item.tag.split(','))
          }
        })
      }
    },

    tagChange(value, index) {
      this.formData.suifangRecords[index].tag = value.join(',')
    },
    washFormData() {
      const d_form = deepClone(this.form)
      for (const formItem in this.formDataOption) {
        if (Object.prototype.toString.call(d_form[formItem]) === '[object Array]') {
          if (this.formDataOption[formItem].listData === 0) {
            const obj = this.formData[formItem]
            this.formData[formItem] = (({ ...obj }) => ({ ...obj }))(d_form[formItem][d_form[formItem].length - 1])
          } else {
            this.formData[formItem] = d_form[formItem]
          }
        }
        if (Object.prototype.toString.call(d_form[formItem]) === '[object Object]') {
          this.formData[formItem] = {
            ...this.formData[formItem],
            ...d_form[formItem]
          }
        }
        if (d_form[formItem] && !(d_form[formItem] instanceof Object)) {
          this.formData[formItem] = d_form[formItem]
        }
      }

      for (const userItem in this.formData.userInfo) {
        this.formData.userInfo[userItem] = d_form[userItem]
      }
      this.formDataDefault = deepClone(this.formData)
      console.log(11111)
      console.log(this.formData)
    },
    deepCompare(defaultObj, newObj, changeFieldList = [], currentLayer = 0) {
      for (const item in newObj) {
        //
        if (!(newObj[item] instanceof Object)) {
          if (defaultObj[item] !== newObj[item]) {
            if (this.formDataOption[changeFieldList[0]].isOne === 0) {
              const d_index = dataApiChange.push(deepClone(dataApi[changeFieldList[0]]))
              console.log(d_index)
              console.log(dataApiChange)
              dataApiChange[d_index - 1].form = newObj
              return
            } else {
              let flag = false
              dataApiChange.forEach(dc_item => {
                if (dc_item.dataName === changeFieldList[0]) {
                  flag = true
                }
              })
              if (!flag) {
                const d_index = dataApiChange.push(deepClone(dataApi[changeFieldList[0]]))
                dataApiChange[d_index - 1].form = newObj
              }
            }
          }
        } else {
          changeFieldList[currentLayer] = item
          this.deepCompare(defaultObj[item], newObj[item], changeFieldList, currentLayer + 1)
        }
      }
    },
    handleSubmit() {
      console.log('formData')
      console.log(this.formDataDefault)
      console.log(this.formData)
      this.deepCompare(this.formDataDefault, this.formData, [], 0)
      console.log(22222)
      console.log(deepClone(dataApiChange))
      console.log(dataApiChange)
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const promiseList = []
          dataApiChange.forEach((item) => {
            if (Object.prototype.toString.call(item.handleOther) === '[object Function]') {
              item.handleOther(item.form)
            }
            const promise = new Promise((resolve, reject) => {
              item.handle({ ...item.form, patientId: this.form.patientId }).then(response => {
                console.log(response)
                resolve(true)
              }).catch(() => {
                reject(false)
              })
            })
            promiseList.push(promise)
          })

          Promise.all(promiseList).then(response => {
            console.log(response)
            this.$message({
              message: '提交成功！',
              type: 'success'
            })
            dataApiChange.length = 0
            this.getInfo()
          }).catch((error) => {
            console.log(error)
          })
        } else {
          this.$message({
            message: '数据格式不对，请检查表单内标红提示！',
            type: 'error'
          })
        }
      })
    },
    handleDel(id, idName, url) {
      this.$confirm('确定删除操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {}
        data[idName] = id
        return new Promise((resolve, reject) => {
          delData(data, url).then(response => {
            console.log(response)
            this.$message({
              message: '删除成功！',
              type: 'success'
            })
            this.getInfo()
            resolve(true)
          }).catch(() => {
            reject(false)
          })
        })
      })
    },
    usingSportClose() {
      this.usingSport = {}
    },
    handleDelReport(img, index) {
      const list = this.formData.suifangRecords[index].reportFiles
      const data = list.filter((item) => {
        return item.fileId !== img.fileId
      })
      this.formData.suifangRecords[index].reportFiles = data
    },
    handleSubmitAdd() {
      if (this.addType === '新增用药') {
        return new Promise((resolve, reject) => {
          addMed({ ...this.medicineForm, patientId: this.form.patientId }).then(response => {
            console.log(response)
            this.$message({
              message: '提交成功！',
              type: 'success'
            })
            this.getInfo()
            this.addDataVis = false
            resolve(true)
          }).catch(() => {
            reject(false)
          })
        })
      }

      if (this.addType === '新增手术') {
        return new Promise((resolve, reject) => {
          addOperation({ ...this.operationForm, patientId: this.form.patientId }).then(response => {
            console.log(response)
            this.$message({
              message: '提交成功！',
              type: 'success'
            })
            this.getInfo()

            this.addDataVis = false
            resolve(true)
          }).catch(() => {
            reject(false)
          })
        })
      }

      if (this.addType === '新增诊断') {
        return new Promise((resolve, reject) => {
          addDiagnose({ ...this.diagnoseForm, patientId: this.form.patientId }).then(response => {
            console.log(response)
            this.$message({
              message: '提交成功！',
              type: 'success'
            })
            this.getInfo()

            this.addDataVis = false
            resolve(true)
          }).catch(() => {
            reject(false)
          })
        })
      }

      if (this.addType === '新增随访') {
        this.suifangForm.tag = this.suifangForm.tagList.join(',')
        this.suifangForm.createUser = this.userInfo.userId
        console.log(this.row.patientId)
        return new Promise((resolve, reject) => {
          addSuifang({ ...this.suifangForm, patientId: this.row.patientId }).then(response => {
            console.log(response)
            this.$message({
              message: '提交成功！',
              type: 'success'
            })
            this.getInfo()

            this.addDataVis = false
            resolve(true)
          }).catch(() => {
            reject(false)
          })
        })
      }

      if (this.addType === '随访详情') {
        this.suifangForm.tag = this.suifangForm.tagList.join(',')
        // this.suifangForm.createUser = this.userInfo.userId
        return new Promise((resolve, reject) => {
          updateSuifang({ ...this.suifangForm }).then(response => {
            console.log(response)
            this.$message({
              message: '提交成功！',
              type: 'success'
            })
            this.getInfo()

            this.addDataVis = false
            resolve(true)
          }).catch(() => {
            reject(false)
          })
        })
      }
    },
  }
}
</script>

<style lang="scss">

.sports-test-info {
  .el-form-item__label {
    text-align: left;
  }
}

.userInfoDialog {
  height: 90vh;
  overflow: hidden;

  .el-dialog__body {
    height: calc(100% - 54px);
    overflow: hidden;
  }

  .el-scrollbar__view {
    overflow-x: hidden;
  }
}

.el-upload-col {
  .el-upload--picture-card {

    width: 60px;
    height: 60px;
    font-size: 30px;
    line-height: 60px;
  }

  .el-upload-list--picture-card .el-upload-list__item {
    width: 60px;
    height: 60px;
  }

  .el-textarea.is-disabled .el-textarea__inner {
    background-color: #ffffff;
  }
}

.image-slot {
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  background: #f5f7fa;
  color: #909399;
  cursor: default;
  aspect-ratio: 1/1;

}
</style>
<style scoped lang="scss">
.userInfoContent {
  height: 100%;

  .el-col {
    height: 100%;
  }
}

.user-info-title {
  text-align: center;
  font-size: 15px;
  font-weight: bold;
  padding-bottom: 15px;
  padding-top: 30px;

  .subTitle {
    font-size: 12px;
    font-weight: normal;
    color: #aaa;
  }
}

.el-card {
  margin-bottom: 20px;
}

.move-btn {
  margin: 0;
  padding: 10px 0;
  text-align: center;

  span {
    font-size: 12px;
    margin-right: 10px;
  }
}

.el-upload-col {
  width: 100%;
  height: 100%;
}

.image-package {
  width: 60px;
  height: 60px;
  margin: 0 8px 8px 0;
  position: relative;
  overflow: hidden;
  cursor: zoom-in;
  display: inline-block;

  .img-del {
    position: absolute;
    top: 0px;
    right: 0px;
    color: red;
    background: #cccccc;
    padding: 0 5px;
    font-size: 14px;
    line-height: 18px;
    cursor: pointer;
  }
}

//.diaBtn {
//  text-align: center;
//
//  .el-button {
//    margin: 0;
//  }
//
//  .el-button + .el-button {
//    margin-top: 10px;
//
//  }
//}

.questSelectBody {

  .el-checkbox-group {
    width: 100%;
  }

  .el-checkbox {
    width: 100%;
  }

  .el-checkbox + .el-checkbox {
    margin-left: 0;
    margin-top: 20px;
  }
}

.motion {
  .el-card {
    margin-bottom: 0;
  }
}

.sports-record {
  p {
    padding: 0 20px;
    margin: 0;
  }

  .el-progress {
    padding: 0 20px;
    margin-top: 10px;
  }
}

.sports-statistics {
  p {
    margin: 0;
    padding: 0 20px;
  }

  p + p {
    margin-top: 10px;
  }
}

.sports-test {
  .sports-test-item {
    overflow: hidden;
  }

  .sports-test-item + .sports-test-item {
    margin-top: 20px;
  }

  p {
    margin: 0;
    padding: 0 20px;
  }

  p + p {
    margin-top: 2px;
  }

  span {
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    vertical-align: middle;
  }

  .title {
    width: 60%;
    text-align: left;
    font-size: 14px;
    font-weight: bold;
  }

  .status {
    width: 40%;
    text-align: right;
    height: 24px;
  }

  .time {
    width: 60%;
  }

  .move {
    width: 40%;
    text-align: right;
  }
}

.card-header {
  font-weight: bold;
  vertical-align: middle;
  line-height: 16px;
}

.task-info-content {
  overflow: hidden;

  .task-info-item {
    display: inline-block;
    width: 100%;
    font-size: 14px;
    margin: 0;
    margin-bottom: 20px;

    .title {
      font-weight: bold;
      padding: 10px 0;
    }

    .check {
      color: #42b983;
    }

    span {
      display: inline-block;
      width: 100%;
      padding: 5px 0;
    }
  }
}

.task-info-handle {
  border: 1px #ffa51f dashed;
  border-radius: 5px;
  padding: 20px;
  display: flex;
  justify-content: center;

  .type-info {
    color: #ffedd2;
    font-size: 60px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-self: center;
    margin: 0;
    flex: auto;

    i {
      margin: 0;
      padding: 0;
    }
  }

  .text-info {
    width: 60%;
    margin: 0;
    padding: 0;
    flex: none;

    span {
      width: 100%;
      display: inline-block;
      color: #ffa51f;
    }

    .score {
      font-size: 46px;
      font-weight: bold;
    }

    .info {
      margin: 10px 0;
      color: #666666;
      font-size: 16px;
    }

    .proposal {
      font-size: 12px;
    }
  }
}
</style>
