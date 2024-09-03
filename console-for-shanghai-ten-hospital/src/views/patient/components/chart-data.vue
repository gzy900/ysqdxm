<template functional>
  <el-table :data="props.trs" fit>
    <el-table-column v-for="(td) in props.ths" :key="td.value" :property="td.value" :label="td.label">
      <template slot-scope="scope">
        <el-tag v-if="scope.row[`${td.value}_flag`]" type="danger">{{ scope.row[td.value] }}</el-tag>
        <span v-else>{{ scope.row[td.value] }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>
