<template>
  <div class="app-container">
    <div v-if="!dialogTableVisible">
      <el-table
        v-loading="listLoading"
        :data="classList"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="ID" width="95">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column label="课程号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="授课教师" align="center">
          <template slot-scope="scope">
            {{ scope.row.teacherId }}
          </template>
        </el-table-column>
        <el-table-column label="上课教室" align="center">
          <template slot-scope="scope">
            {{ scope.row.classRoomId }}
          </template>
        </el-table-column>
        <el-table-column label="开始周次" align="center">
          <template slot-scope="scope">
            {{ scope.row.startNumber }}
          </template>
        </el-table-column>
        <el-table-column label="结束周次" align="center">
          <template slot-scope="scope">
            {{ scope.row.endNumber }}
          </template>
        </el-table-column>
        <el-table-column label="星期" align="center">
          <template slot-scope="scope">
            {{ scope.row.week }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="fetchClassRecordList(scope.row.id)">考勤信息</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="totalSize"
        :current-page.sync="curPage"
        @current-change="fetchClassList">
      </el-pagination>
    </div>
    <div v-if="dialogTableVisible">
      <el-table
        id = "out-table"
        v-loading="listLoading"
        :data="classRecordList"
        element-loading-text="Loading"
        :default-sort = "{prop: 'time', order: 'descending'}"
        border
        fit
        highlight-current-row>
        <el-table-column align="center" label="序列号" width="95">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="记录编号"
        >
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="time"
          label="打卡时间"
          sortable
        >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            {{ scope.row.time }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="学生编号"
        >
          <template slot-scope="scope">
            {{ scope.row.studentId }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="学生姓名"
          width="100"
        >
          <template slot-scope="scope">
            {{ scope.row.student.name }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="课程编号">
          <template slot-scope="scope">
            {{ scope.row.courseId }}
          </template>
        </el-table-column>
      </el-table>
      <div style="margin: 40px;"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">返 回</el-button>
        <el-button type="primary" @click="exportExcel">导 出</el-button>
      </span>
    </div>
  </div>
</template>

<script>
import { getClassList, getClassRecordList } from '@/api/record'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
  data() {
    return {
      curPage: 0,
      pageSize: 10,
      totalSize: 10,
      classList: null,
      listLoading: true,
      // recordSize: 0,
      classRecordList: null,
      dialogTableVisible: false,
      teacherId: null
    }
  },
  created() {
    this.teacherId = window.localStorage.getItem('userId')
    this.fetchClassList()
  },
  methods: {
    fetchClassList() {
      this.listLoading = true
      var params = {
        pageNumber: this.curPage + 1,
        pageSize: this.pageSize,
        teacherId: this.teacherId
      }
      const _this = this
      getClassList(params).then(response => {
        _this.totalSize = response.data.totalItems
        _this.classList = response.data.items
        _this.listLoading = false
      })
    },
    fetchClassRecordList(Id) {
      const _this = this
      // alert(classId)
      var params = {
        courseId: Id,
        pageNumber: 1,
        pageSize: 1
      }
      // alert(params.courseId)
      getClassRecordList(params).then(response => {
        if (response.data.totalItems !== 0) {
          params.pageSize = response.data.totalItems
        } else {
          params.pageSize = 1
        }
        // console.log(params)
        getClassRecordList(params).then(response => {
          _this.classRecordList = response.data.items
          _this.dialogTableVisible = true
          // alert(params.pageSize)
        })
      })
    },
    exportExcel() {
      if (this.classRecordList.length === 0) {
        this.$message.warning('该课程暂无考勤数据')
      } else {
        /* 从表生成工作簿对象 */
        var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
        /* 获取二进制字符串作为输出 */
        var wbout = XLSX.write(wb, {
          bookType: 'xlsx',
          bookSST: true,
          type: 'array'
        })
        try {
          FileSaver.saveAs(
            // Blob 对象表示一个不可变、原始数据的类文件对象。
            // Blob 表示的不一定是JavaScript原生格式的数据。
            // File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
            // 返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
            new Blob([wbout], { type: 'application/octet-stream' }),
            // 设置导出文件名称
            '课程' + this.classRecordList[0].courseId + '考勤记录.xlsx'
          )
        } catch (e) {
          this.$message.error('导出失败')
          // if (typeof console !== 'undefined') console.log(e, wbout)
        }
        return wbout
      }
    }
  }
}
</script>
