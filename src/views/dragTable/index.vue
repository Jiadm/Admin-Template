<template>
  <div class="app-container">
    <div>
      <el-table :data="tableData" row-key="id">
        <el-table-column
          v-for="(item, index) in col"
          :key="`col_${index}`"
          :prop="dropCol[index].prop"
          :label="item.label"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getList } from "@/api/table";
import Sortable from "sortablejs";
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      col: [
        { label: "日期", prop: "date" },
        { label: "姓名", prop: "name" },
        { label: "地址", prop: "address" },
      ],
      dropCol: [
        { label: "日期", prop: "date" },
        { label: "姓名", prop: "name" },
        { label: "地址", prop: "address" },
      ],
      tableData: [
        {
          id: "1",
          date: "2016-05-02",
          name: "王小虎1",
          address: "上海市普陀区金沙江路 100 弄",
        },
        {
          id: "2",
          date: "2016-05-04",
          name: "王小虎2",
          address: "上海市普陀区金沙江路 200 弄",
        },
        {
          id: "3",
          date: "2016-05-01",
          name: "王小虎3",
          address: "上海市普陀区金沙江路 300 弄",
        },
        {
          id: "4",
          date: "2016-05-03",
          name: "王小虎4",
          address: "上海市普陀区金沙江路 400 弄",
        },
      ],
    };
  },
  created() {
    this.fetchData();
  },
  mounted() {
    this.rowDrop();
  },
  methods: {
    fetchData() {
      //this.listLoading = false
      this.listLoading = true;
      getList()
        .then((response) => {
          this.list = response.data.items;
          this.listLoading = false;
        })
        .catch((error) => console.log(error));
    },
    // 行拖拽
    rowDrop() {
      // 此时找到的元素是要拖拽元素的父容器
      const tbody = document.querySelector(".el-table__body-wrapper tbody");
      const _this = this;
      Sortable.create(tbody, {
        //  指定父元素下可被拖拽的子元素
         ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        draggable: ".el-table__row",
        onEnd({ newIndex, oldIndex }) {
          const currRow = _this.tableData.splice(oldIndex, 1)[0];
          _this.tableData.splice(newIndex, 0, currRow);
        },
      });
    },
  },
};
</script>

<style >
  .sortable-ghost{
  opacity: .8;
  color: #fff!important;
  background: #42b983!important;
}
</style>
