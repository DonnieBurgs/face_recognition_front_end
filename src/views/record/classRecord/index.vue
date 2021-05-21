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
  <!--      <el-table-column label="Title">-->
  <!--        <template slot-scope="scope">-->
  <!--          {{ scope.row.title }}-->
  <!--        </template>-->
  <!--      </el-table-column>-->
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
  <!--      <el-table-column class-name="status-col" label="Status" width="110" align="center">-->
  <!--        <template slot-scope="scope">-->
  <!--          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>-->
  <!--        </template>-->
  <!--      </el-table-column>-->
  <!--      <el-table-column align="center" prop="created_at" label="Display_time" width="200">-->
  <!--        <template slot-scope="scope">-->
  <!--          <i class="el-icon-time" />-->
  <!--          <span>{{ scope.row.display_time }}</span>-->
  <!--        </template>-->
  <!--      </el-table-column>-->
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
<!--      <el-table :data="classRecordList">-->
<!--        <el-table-column property="id" label="记录编号" align="center"></el-table-column>-->
<!--        <el-table-column property="studentId" label="学生编号" align="center"></el-table-column>-->
<!--        <el-table-column property="courseId" label="课程编号" align="center"></el-table-column>-->
<!--        <el-table-column property="time" label="打卡时间" align="center"></el-table-column>-->
<!--      </el-table>-->
      <el-table
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
          sortable
          >
          <template slot-scope="scope">
            {{ scope.row.studentId }}
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
        <el-button type="primary" @click="dialogTableVisible = false">导 出</el-button>
      </span>
    </div>
<!--    <el-dialog title="课程考勤信息" :visible.sync="dialogTableVisible">-->
<!--      <el-table :data="classRecordList" height="300">-->
<!--        <el-table-column property="id" label="记录编号" width="150"></el-table-column>-->
<!--        <el-table-column property="studentId" label="学生编号" width="200"></el-table-column>-->
<!--        <el-table-column property="courseId" label="课程编号"></el-table-column>-->
<!--        <el-table-column property="time" label="打卡时间"></el-table-column>-->
<!--      </el-table>-->
<!--      <span slot="footer" class="dialog-footer">-->
<!--        <el-button @click="dialogTableVisible = false">取 消</el-button>-->
<!--        <el-button type="primary" @click="dialogTableVisible = false">导 出</el-button>-->
<!--      </span>-->
<!--    </el-dialog>-->
  </div>
</template>

<script>
import { getClassList, getClassRecordList } from '@/api/record'

export default {
  // filters: {
  //   statusFilter(status) {
  //     const statusMap = {
  //       published: 'success',
  //       draft: 'gray',
  //       deleted: 'danger'
  //     }
  //     return statusMap[status]
  //   }
  // },
  data() {
    return {
      curPage: 0,
      pageSize: 10,
      totalSize: 10,
      classList: null,
      listLoading: true,
      // recordSize: 0,
      classRecordList: null,
      dialogTableVisible: false
    }
  },
  created() {
    this.fetchClassList()
  },
  methods: {
    fetchClassList() {
      this.listLoading = true
      var params = {
        pageNumber: this.curPage + 1,
        pageSize: this.pageSize
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
        pageSize: 1000
      }
      // alert(params.courseId)
      getClassRecordList(params).then(response => {
        params.pageSize = response.data.totalItems
        getClassRecordList(params).then(response => {
          _this.classRecordList = response.data.items
          _this.dialogTableVisible = true
          // alert(params.pageSize)
        })
      })
    }
  }
}
</script>
