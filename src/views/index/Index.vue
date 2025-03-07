<script setup lang="ts">
import type { PageResponse } from "@/api/types";
import { http } from "@/common/request";
import {
  ElMessage,
  type FormInstance,
  type FormRules,
  type UploadProps,
} from "element-plus";
import { nextTick, onMounted, reactive, ref, type Ref } from "vue";

const currentPage = ref(0);
const pageSize = ref(10);
const total = ref(0);

interface D {
  code: string;
  label: string;
  description: string;
  imageUniqueKey?: string;
}

currentPage.value = 1;
pageSize.value = 1;

const getBrand = async () => {
  const brandResp = await http.get<PageResponse<D>>(
    `/v1/brand?page=${currentPage.value}&size=${pageSize.value}`,
    {
      withCredentials: true,
    },
  );
  listData.value = brandResp.data?.records || [];
  total.value = brandResp.data?.page_info.total_count || 0;
};

let listData: Ref<D[], D[]> = ref([]);

onMounted(async () => {
  await getBrand();
});

let addDialogFormVisible = ref(false);
let dialogTitle = ref("");

const uploadImgUrl = `${import.meta.env.VITE_API_PREFIX}/v1/auth/login`;

const formRef = ref<FormInstance>();

const form = reactive({
  id: 0,
  code: "",
  label: "",
  description: "",
  imageUniqueKey: "",
});

function validateCodeInput(
  _rule: unknown,
  value: string,
  callback: (error?: string | Error) => void,
) {
  if (value.trim().length > 8 || value.trim().length < 2) {
    console.log("trigger...");

    callback(new Error("请正确输入code"));
  } else {
    formRef.value!.clearValidate("code");
    callback();
  }
}

function validateImageUKInoput(
  _rule: unknown,
  value: string,
  callback: (error?: string | Error) => void,
) {
  if (value) {
    callback();
  } else {
    callback(new Error("请上传图片"));
  }
}

const rules = reactive<FormRules<D>>({
  code: [{ required: true, trigger: "change", validator: validateCodeInput }],
  imageUniqueKey: [{ required: true, validator: validateImageUKInoput }],
});

function _clearForm() {
  formRef.value?.resetFields();
  imageUrl.value = "";
}

const reqAddEditBrand = async () => {
  try {
    await formRef.value!.validate();
  } catch {
    return;
  }

  console.log("added/edited");
  ElMessage({
    type: "success",
    message: "操作成功",
  });
  addDialogFormVisible.value = !addDialogFormVisible.value;
  await getBrand();
};

const imageUrl = ref("");

const handleAvatarSuccess: UploadProps["onSuccess"] = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _uploadFile,
) => {
  imageUrl.value = "test"; // response.data.data.path;
  form.imageUniqueKey = "testKey"; // response.data.data.unique_key;
  formRef.value!.clearValidate("imageUniqueKey");
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  // if (rawFile.type !== 'image/jpeg') {
  //   ElMessage.error('Avatar picture must be JPG format!')
  //   return false
  // } else
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  return true;
};

const addBtnClickHandler = () => {
  addDialogFormVisible.value = !addDialogFormVisible.value;
  dialogTitle.value = "添加";
  _clearForm();
  nextTick(() => {
    formRef.value!.clearValidate();
  });
};

const editBtnHandler = (row: D) => {
  form.id = 1;
  form.code = row.code;
  form.label = row.label;
  form.description = row.description;
  form.imageUniqueKey = row.imageUniqueKey ? row.imageUniqueKey : "";
  // Object.assign(form, row);
  imageUrl.value = "";
  addDialogFormVisible.value = !addDialogFormVisible.value;
  dialogTitle.value = "修改";
  formRef.value?.clearValidate();
};

const deleteBtnHandler = async (id: number) => {
  console.log("deleted", id);
  ElMessage({
    type: "success",
    message: "删除成功",
  });

  currentPage.value =
    listData.value.length > 1 || currentPage.value === 1
      ? currentPage.value
      : currentPage.value - 1;

  await getBrand();

  // ElMessageBox.confirm(
  //   '确认删除',
  //   '',
  //   {
  //     confirmButtonText: 'Confirm',
  //     cancelButtonText: 'Cancel',
  //     type: 'warning',
  //   }
  // )
  //   .then(async () => {
  //     console.log("deleted");
  //     ElMessage({
  //       type: 'success',
  //       message: '删除成功',
  //     })
  //     await getBrand()
  //   })
  //   .catch(() => {
  //     // ElMessage({
  //     //   type: 'info',
  //     //   message: '取消删除',
  //     // })
  //   })
};
const handleClick = (code: string) => {
  const inputEle = document.getElementById(`bni-${code}`);
  const spanEle = document.getElementById(`bns-${code}`);
  inputEle?.classList.remove("hidden");
  inputEle?.focus();
  spanEle?.classList.add("hidden");
};

const inputBlurHandler = (code: string) => {
  const inputEle = document.getElementById(`bni-${code}`);
  const spanEle = document.getElementById(`bns-${code}`);
  inputEle?.classList.add("hidden");
  spanEle?.classList.remove("hidden");
};
</script>

<template>
  <el-card>
    <el-button
      class="add-btn"
      type="primary"
      sizee="default"
      icon="Plus"
      @click="addBtnClickHandler"
      >添加品牌</el-button
    >
    <el-table border :data="listData">
      <el-table-column align="center" type="index"></el-table-column>
      <el-table-column
        label="品牌code"
        align="center"
        prop="code"
      ></el-table-column>
      <el-table-column label="品牌名" align="center">
        <!-- eslint-disable-next-line vue/valid-attribute-name -->
        <template #="{ row }">
          <input
            :id="`bni-${row.code}`"
            :value="row.label"
            @blur="inputBlurHandler(row.code)"
            class="hidden"
          />
          <span :id="`bns-${row.code}`" @click="handleClick(row.code)">{{
            row.label
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述" align="center" prop="description">
      </el-table-column>
      <el-table-column label="操作项" align="center">
        <!-- eslint-disable-next-line vue/valid-attribute-name -->
        <template #="{ row }">
          <el-button
            type="warning"
            zise="small"
            icon="Edit"
            circle
            @click="editBtnHandler(row)"
          ></el-button>
          <el-popconfirm
            title="确认删除"
            icon="Delete"
            @confirm="deleteBtnHandler(row.id)"
          >
            <template #reference>
              <el-button type="danger" zise="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[1, 2, 3, 4, 10]"
      size="small"
      :disabled="false"
      :background="true"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
      @change="getBrand"
    />
  </el-card>

  <!-- addDialog -->
  <el-dialog v-model="addDialogFormVisible" :title="dialogTitle">
    <el-form
      :model="form"
      label-position="right"
      ref="formRef"
      :rules="rules"
      label-width="auto"
      status-icon
    >
      <el-form-item label="品牌code" prop="code">
        <el-input required v-model="form.code" placeholder="输入品牌code" />
      </el-form-item>
      <el-form-item label="品牌名" prop="label">
        <el-input v-model="form.label" placeholder="输入品牌名"> </el-input>
      </el-form-item>
      <el-form-item label="品牌描述" prop="description">
        <el-input v-model="form.description" placeholder="输入品牌描述">
        </el-input>
      </el-form-item>
      <el-form-item label="图片" prop="imageUniqueKey">
        <el-upload
          class="avatar-uploader"
          :action="uploadImgUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="addDialogFormVisible = !addDialogFormVisible"
          >取消</el-button
        >
        <el-button type="primary" @click="reqAddEditBrand"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.hidden {
  display: none;
}

input {
  border-radius: 0.2rem;
  padding: 0.3rem;
}
span {
  font-style: italic;
  font-weight: bold;
}

.add-btn {
  margin-bottom: 1rem;
}

.el-pagination {
  margin-top: 1rem;
}

.avatar-uploader .avatar {
  width: 8rem;
  height: 8rem;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 1rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 2rem;
  color: #8c939d;
  width: 8rem;
  height: 8rem;
  text-align: center;
}
</style>
