<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="studentList"
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
      <el-table-column label="学生编号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学生姓名" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="专业" align="center">
        <template slot-scope="scope">
          {{ scope.row.major }}
        </template>
      </el-table-column>
      <el-table-column label="年级" align="center">
        <template slot-scope="scope">
          {{ scope.row.grade }}
        </template>
      </el-table-column>
      <el-table-column label="年龄" align="center">
        <template slot-scope="scope">
          {{ scope.row.age }}
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
      @current-change="fetchStudentList">
    </el-pagination>
    <div v-if="dialogFormVisible">
      <el-dialog title="学生信息" :visible.sync="dialogFormVisible">
        <el-form :model="student">
          <el-form-item label="学生编号" :label-width="formLabelWidth">
            <el-input v-model="student.id" autocomplete="off" style="width: 450px" readonly></el-input>
          </el-form-item>
          <el-form-item label="学生姓名" :label-width="formLabelWidth">
            <el-input v-model="student.name" autocomplete="off" style="width: 450px" readonly></el-input>
          </el-form-item>
          <el-form-item label="学生专业" :label-width="formLabelWidth">
            <el-input v-model="student.major" autocomplete="off" style="width: 450px"></el-input>
          </el-form-item>
          <el-form-item label="学生年级" :label-width="formLabelWidth">
            <el-input v-model="student.grade" autocomplete="off" style="width: 450px"></el-input>
          </el-form-item>
          <el-form-item label="学生年龄" :label-width="formLabelWidth">
            <el-input v-model="student.age" autocomplete="off" style="width: 450px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateStudent">修 改</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getStudentList, getStudentInfo, updateStudentInfo } from '@/api/student'

export default {
  data() {
    return {
      curPage: 0,
      pageSize: 10,
      totalSize: null,
      studentList: null,
      listLoading: true,
      dialogFormVisible: false,
      student: null,
      formLabelWidth: '120px'
    }
  },
  created() {
    this.fetchStudentList()
  },
  methods: {
    fetchStudentList() {
      this.listLoading = true
      var params = {
        pageNumber: this.curPage + 1,
        pageSize: this.pageSize
      }
      const _this = this
      getStudentList(params).then(response => {
        _this.totalSize = response.data.totalItems
        _this.studentList = response.data.items
        _this.listLoading = false
      })
    },
    showDialog(studentId) {
      const _this = this
      getStudentInfo(studentId).then(response => {
        _this.dialogFormVisible = true
        _this.student = response.data
      })
    },
    updateStudent() {
      const _this = this
      updateStudentInfo(_this.student).then(response => {
        _this.$message.success('修改成功')
        _this.$router.push('/')
        _this.dialogFormVisible = false
        // _this.$router.go(0)
      })
    }
  }
}
</script>
