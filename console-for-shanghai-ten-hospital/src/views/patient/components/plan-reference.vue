<template>
  <el-card>
    <el-row style="margin-bottom: 15px;">
      <el-col :span="4">
        <el-alert title="T4" effect="dark" class="custom-alert" style="background-color: #741D19;" :closable="false" />
      </el-col>
      <el-col :span="20">
        <el-alert title="A + C SPC + D + MRA" class="custom-alert" description="(Perindopril 8mg + Amlodipine 5mg + Indapamide 1.5mg + Spironolaction 20mg)" effect="dark" style="background-color: #741D19;" :closable="false" />
      </el-col>
    </el-row>
    <el-row style="margin-bottom: 15px;">
      <el-col :span="4">
        <el-alert title="T3" effect="dark" class="custom-alert" style="background-color: #AE2D26;" :closable="false" />
      </el-col>
      <el-col :span="20">
        <el-alert title="A + C SPC + D" class="custom-alert" description="(Perindopril 8mg + Amiodipine 5mg + Indapamide 1.5mg)" effect="dark" style="background-color: #AE2D26;" :closable="false" />
      </el-col>
    </el-row>
    <el-row style="margin-bottom: 15px;">
      <el-col :span="4">
        <el-alert title="T2" effect="dark" class="custom-alert" style="background-color: #E28A84;" :closable="false" />
      </el-col>
      <el-col :span="20">
        <el-alert title="A + C SPC" class="custom-alert" description=" (Perindopril 8mg + Amiodipine 5mg)" effect="dark" style="background-color: #E28A84;" :closable="false" />
      </el-col>
    </el-row>
    <el-row style="margin-bottom: 15px;">
      <el-col :span="4">
        <el-alert title="T1" effect="dark" class="custom-alert" style="background-color: #EAAFAC;" :closable="false" />
      </el-col>
      <el-col :span="20">
        <el-alert title="1/2 A + C SPC" class="custom-alert" description="(Perindopril 4mg + Amoldipine 2.5mg)" effect="dark" style="background-color: #EAAFAC;" :closable="false" />
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {

}
</script>

<style scoped>
.custom-alert {
  height: 60px;
}
</style>
