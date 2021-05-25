<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="teacherList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序列号" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="教师编号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="教师姓名" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="专业" align="center">
        <template slot-scope="scope">
          {{ scope.row.major }}
        </template>
      </el-table-column>
      <el-table-column label="级别" align="center">
        <template slot-scope="scope">
          {{ scope.row.grade }}
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          {{ scope.row.gender===true?'男':'女' }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="showDialog(scope.row.id)">修改信息</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="totalSize"
      :current-page.sync="curPage"
      @current-change="fetchTeacherList">
    </el-pagination>
    <div v-if="dialogFormVisible">
      <el-dialog title="教师信息" :visible.sync="dialogFormVisible">
        <el-form :model="teacher">
          <el-form-item label="教师编号" :label-width="formLabelWidth">
            <el-input v-model="teacher.id" autocomplete="off" style="width: 450px" readonly></el-input>
          </el-form-item>
          <el-form-item label="教师姓名" :label-width="formLabelWidth">
            <el-input v-model="teacher.name" autocomplete="off" style="width: 450px" readonly></el-input>
          </el-form-item>
          <el-form-item label="教师专业" :label-width="formLabelWidth">
            <el-input v-model="teacher.major" autocomplete="off" style="width: 450px"></el-input>
          </el-form-item>
          <el-form-item label="教师级别" :label-width="formLabelWidth">
            <el-input v-model="teacher.grade" autocomplete="off" style="width: 450px"></el-input>
          </el-form-item>
          <el-form-item label="教师性别" :label-width="formLabelWidth">
            <el-input v-model="teacher.gender===true?'男':'女'" autocomplete="off" style="width: 450px" readonly></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateTeacher">修 改</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getTeacherList, getTeacherInfo, updateTeacherInfo } from '@/api/teacher'

export default {
  data() {
    return {
      curPage: 0,
      pageSize: 10,
      totalSize: null,
      teacherList: null,
      listLoading: true,
      dialogFormVisible: false,
      teacher: null,
      formLabelWidth: '120px'
    }
  },
  created() {
    this.fetchTeacherList()
  },
  methods: {
    fetchTeacherList() {
      this.listLoading = true
      var params = {
        pageNumber: this.curPage + 1,
        pageSize: this.pageSize
      }
      const _this = this
      getTeacherList(params).then(response => {
        _this.totalSize = response.data.totalItems
        _this.teacherList = response.data.items
        _this.listLoading = false
      })
    },
    showDialog(teacherId) {
      const _this = this
      getTeacherInfo(teacherId).then(response => {
        _this.dialogFormVisible = true
        _this.teacher = response.data
      })
    },
    updateTeacher() {
      const _this = this
      updateTeacherInfo(_this.teacher).then(response => {
        _this.$message.success('修改成功')
        _this.dialogFormVisible = false
        _this.$router.go(0)
      })
    }
  }
}
</script>
