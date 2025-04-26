<template>
   <div class="app-container">
      <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch">
         <el-form-item label="设备安装位置" prop="installLocation">
            <el-input
               v-model="queryParams.installLocation"
               placeholder="请输入设备安装位置"
               clearable
               style="width: 200px"
               @keyup.enter="handleQuery"
            />
         </el-form-item>
         <el-form-item label="设备状态" prop="lockState">
            <el-select v-model="queryParams.lockState" placeholder="设备状态" clearable style="width: 200px">
               <el-option
                  v-for="dict in sys_normal_disable"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
               />
            </el-select>
         </el-form-item>
         <el-form-item>
            <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
            <el-button icon="Refresh" @click="resetQuery">重置</el-button>
         </el-form-item>
      </el-form>

      <el-row :gutter="10" class="mb8">
         <el-col :span="1.5">
            <el-button type="primary" plain icon="Plus" @click="handleAdd"
               v-hasPermi="['system:lock:add']">新增</el-button>
         </el-col>
         <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate"
               v-hasPermi="['system:lock:edit']">修改</el-button>
         </el-col>
         <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete"
               v-hasPermi="['system:lock:remove']">删除</el-button>
         </el-col>
         <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
      </el-row>

      <el-table v-loading="loading" :data="lockList" @selection-change="handleSelectionChange">
         <el-table-column type="selection" width="30" align="center" />
         <el-table-column label="设备编号" width="80" align="center" prop="lockId" />
         <el-table-column label="设备电池电量" width="120" align="center" prop="devBat" />
         <el-table-column label="设备安装位置"  align="center" prop="installLocation" />
         <el-table-column label="设备状态" align="center" prop="lockState">
            <template #default="scope">
               <dict-tag :options="sys_normal_disable" :value="scope.row.lockState" />
            </template>
         </el-table-column>
         <el-table-column label="创建时间" align="center" prop="createTime" width="180">
            <template #default="scope">
               <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
         </el-table-column>
         <el-table-column label="操作" width="240" align="center" class-name="small-padding fixed-width">
            <template #default="scope">
               <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)"
                  v-hasPermi="['system:lock:edit']">修改</el-button>
                  <el-button link type="primary" icon="Edit" @click="handleChangeState(scope.row)"
                  v-hasPermi="['system:lock:edit']">{{ scope.row.lockState == 1 ? '关闭' : '开启'}}</el-button>
               <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)"
                  v-hasPermi="['system:lock:remove']">删除</el-button>
            </template>
         </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum"
         v-model:limit="queryParams.pageSize" @pagination="getList" />

      <!-- 添加或修改设备对话框 -->
      <el-dialog :title="title" v-model="open" width="600px" append-to-body>
         <el-form ref="lockRef" :model="form" :rules="rules" label-width="120px">
            <!-- 添加选择公司选项 -->
            <el-form-item label="选择公司" prop="deptId">
               <el-tree-select v-model="form.deptId" :data="deptStore.deptList"
                  :props="{ value: 'deptId', label: 'deptName', children: 'children' }" value-key="deptId"
                  placeholder="请选择公司" check-strictly style="width: 100%;" />
            </el-form-item>
            <el-form-item label="主机SN" prop="deviceSn">
               <el-input v-model="form.deviceSn" placeholder="请输入主机SN" />
            </el-form-item>
            <!-- 其他表单项保持不变 -->
            <el-form-item label="IMEI" prop="imei">
               <el-input v-model="form.imei" placeholder="请输入IMEI" />
            </el-form-item>
            <el-form-item label="IMSI" prop="imsi">
               <el-input v-model="form.imsi" placeholder="请输入IMSI" />
            </el-form-item>
            <el-form-item label="主机硬件版本号" prop="devHVer">
               <el-input v-model="form.devHVer" placeholder="请输入主机硬件版本号" />
            </el-form-item>
            <el-form-item label="主机软件版本号" prop="devSVer">
               <el-input v-model="form.devSVer" placeholder="请输入主机软件版本号" />
            </el-form-item>
            <el-form-item label="设备电池电量" prop="devBat">
               <el-input-number v-model="form.devBat" :min="0" :max="100" placeholder="请输入设备电池电量(0-100)"
                  style="width: 100%;" />
            </el-form-item>
            <el-form-item label="锁状态" prop="lockState">
               <el-radio-group v-model="form.lockState">
                  <el-radio :label="0">关锁状态</el-radio>
                  <el-radio :label="1">开锁状态</el-radio>
               </el-radio-group>
            </el-form-item>
            <el-form-item label="设备信号值" prop="sign">
               <el-input v-model="form.sign" placeholder="请输入设备信号值" />
            </el-form-item>
            <el-form-item label="安装位置" prop="installLocation">
               <el-input v-model="form.installLocation" placeholder="请输入安装位置" />
            </el-form-item>
            <el-form-item label="备注" prop="remark">
               <el-input v-model="form.remark" type="textarea" placeholder="请输入备注内容" />
            </el-form-item>
         </el-form>
         <template #footer>
            <div class="dialog-footer">
               <el-button type="primary" @click="submitForm">确 定</el-button>
               <el-button @click="cancel">取 消</el-button>
            </div>
         </template>
      </el-dialog>
   </div>
</template>

<script setup name="Lock">
import { getLockLists, addLock, delLock, getLockDetail, updateLock, changeLockStatus } from "@/api/system/lock";
import useDeptStore from "@/store/modules/dept"; // 引入部门store

const { proxy } = getCurrentInstance();
const deptStore = useDeptStore(); // 使用部门store
const sys_normal_disable = [{
   "label": "关闭",
   "value": "0",
   "elTagType": "danger",
   "elTagClass": null
}, {
   "label": "开启",
   "value": "1",
   "elTagType": "primary",
   "elTagClass": null
}]

const lockList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");

const data = reactive({
   form: {},
   queryParams: {
      pageNum: 1,
      pageSize: 10,
      installLocation: undefined,
      lockState: undefined
   },
   rules: {
      deptId: [{ required: true, message: "请选择公司", trigger: "change" }],
      deviceSn: [{ required: true, message: "主机SN不能为空", trigger: "blur" }],
      imei: [{ required: true, message: "IMEI不能为空", trigger: "blur" }],
      imsi: [{ required: true, message: "IMSI不能为空", trigger: "blur" }],
      devHVer: [{ required: true, message: "主机硬件版本号不能为空", trigger: "blur" }],
      devSVer: [{ required: true, message: "主机软件版本号不能为空", trigger: "blur" }],
      devBat: [
         { required: true, message: "设备电池电量不能为空", trigger: "blur" },
         { type: 'number', min: 0, max: 100, message: '电池电量必须在0到100之间', trigger: 'blur' }
      ],
      lockState: [{ required: true, message: "锁状态不能为空", trigger: "change" }],
      sign: [{ required: true, message: "设备信号值不能为空", trigger: "blur" }],
      installLocation: [{ required: true, message: "安装位置不能为空", trigger: "blur" }],
   }
});

/** 表单重置 */
function reset() {
   form.value = {
      lockId: undefined,
      deviceSn: undefined,
      imei: undefined,
      imsi: undefined,
      devHVer: undefined,
      devSVer: undefined,
      devBat: 100, // 默认设置为100
      lockState: "0",
      sign: undefined,
      installLocation: undefined,
      remark: undefined,
      deptId: undefined // 添加dept_id字段
   };
   proxy.resetForm("lockRef");
}

const { queryParams, form, rules } = toRefs(data);

/** 查询设备列表 */
function getList() {
   loading.value = true;
   getLockLists(queryParams.value).then(response => {
      lockList.value = response.rows;
      total.value = response.total;
      loading.value = false;
   });
}

/** 取消按钮 */
function cancel() {
   open.value = false;
   reset();
}

/** 搜索按钮操作 */
function handleQuery() {
   queryParams.value.pageNum = 1;
   getList();
}

/** 重置按钮操作 */
function resetQuery() {
   proxy.resetForm("queryRef");
   handleQuery();
}

/** 多选框选中数据 */
function handleSelectionChange(selection) {
   ids.value = selection.map(item => item.lockId);
   single.value = selection.length != 1;
   multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
   reset();
   open.value = true;
   title.value = "添加设备";
}

/** 修改按钮操作 */
function handleUpdate(row) {
   reset();
   const lockId = row.lockId || ids.value;
   getLockDetail(lockId).then(response => {
      form.value = response.data;
      open.value = true;
      title.value = "修改设备";
   });
}

async function handleChangeState(row) {
   try {
      await changeLockStatus({
      lockId: row.lockId,
      lockState: row.lockState == 1 ? 0 : 1
   })
   } finally {
      getList();
   }
}

/** 提交按钮 */
function submitForm() {
   proxy.$refs["lockRef"].validate(valid => {
      if (valid) {
         if (form.value.lockId != undefined) {
            updateLock(form.value).then(response => {
               proxy.$modal.msgSuccess("修改成功");
               open.value = false;
               getList();
            });
         } else {
            addLock(form.value).then(response => {
               proxy.$modal.msgSuccess("新增成功");
               open.value = false;
               getList();
            });
         }
      }
   });
}

/** 删除按钮操作 */
function handleDelete(row) {
   const lockIds = row.lockId || ids.value;
   proxy.$modal.confirm('是否确认删除设备编号为"' + lockIds + '"的数据项？').then(function () {
      return delLock(lockIds);
   }).then(() => {
      getList();
      proxy.$modal.msgSuccess("删除成功");
   }).catch(() => { });
}

/** 导出按钮操作 */
function handleExport() {
   proxy.download("system/lock/export", {
      ...queryParams.value
   }, `lock_${new Date().getTime()}.xlsx`);
}

// 在组件挂载时加载部门列表
onMounted(() => {
   getList();
});
</script>
