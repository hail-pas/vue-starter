<script setup lang="ts">
import type {
  UserListFilterSchema,
  UserList,
  UserCreateSchema,
  UserUpdateSchema,
} from "@/api/user/types";
import {} from "@/api/user/user";
import { nextTick, onMounted, reactive, ref, type Ref } from "vue";
import { useI18n } from "vue-i18n";
import { setAllPropertiesToUndefined } from "@/common/utils";
import type { RoleList } from "@/api/role/types";
// import { reqDeleteUser } from '@/api/user/user';
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { validatePhoneNumber } from "@/common/validators";
import {
  reqGetUserList,
  reqCreateUser,
  reqUpdateUser,
  reqDeleteUser,
} from "@/api/user/user";
import { reqGetRoleList } from "@/api/role/role";

const { t: $t } = useI18n();
// read
const total = ref(0);
const listFilterSchema = reactive<UserListFilterSchema>({
  page: 1,
  size: 10,
});
const resetBtnHandler = () => {
  setAllPropertiesToUndefined(listFilterSchema, ["page", "size"]);
};

const roleList: Ref<RoleList[], RoleList[]> = ref([]);
const listData: Ref<UserList[], UserList[]> = ref([]);

onMounted(async () => {
  await getlistData();
});

async function getRoleList(roleName?: string) {
  const resp = await reqGetRoleList({ label: roleName, size: 100, page: 1 });
  roleList.value = resp.data!.records!;
  // roleList.value = [
  //   {
  //     id: 1,
  //     label: "超级管理员",
  //     created_at: "",
  //     updated_at: "",
  //   },
  //   {
  //     id: 2,
  //     label: "普通管理员",
  //     created_at: "",
  //     updated_at: "",
  //   },
  // ];
}

async function getlistData() {
  const resp = await reqGetUserList(listFilterSchema);
  listData.value = resp.data!.records!;
  total.value = resp.data?.page_info.total_count || 0;

  // userList.value = [
  //   {
  //     id: 1,
  //     username: "phoenix",
  //     nickname: "phoenix",
  //     phone: "18059247212",
  //     role: {
  //       id: 1,
  //       label: "超级管理员",
  //       created_at: "2025-03-13 00:00:00",
  //       updated_at: "2025-03-13 00:00:00",
  //     },
  //     is_super_admin: true,
  //     created_at: "2025-03-13 00:00:00",
  //     updated_at: "2025-03-13 00:00:00",
  //   },
  // ];
}

// deletee
const deleteBtnHandler = async (id: number) => {
  try {
    await reqDeleteUser(id);
  } catch {
    return;
  }

  ElMessage({
    type: "success",
    message: "删除成功",
  });

  listFilterSchema.page =
    listData.value.length > 1 || listFilterSchema.page === 1
      ? listFilterSchema.page
      : listFilterSchema.page - 1;

  await getlistData();
};

// create
const createDialogVisible = ref(false);
const createDialogTitle = ref(
  $t("functionBtn.add") + " " + $t("main.user.user"),
);
const createFormData = reactive<UserCreateSchema>({
  username: "",
  nickname: "",
  phone: "",
  role_id: undefined,
});
const createFormRef = ref<FormInstance>();

const validatePhoneInput = (
  _rule: unknown,
  value: string,
  callback: (error?: string | Error) => void,
) => {
  if (!validatePhoneNumber(value).isValid) {
    callback(
      new Error(
        $t("main.badInputValueTipPrefix") + $t("main.user.phoneNumber"),
      ),
    );
  } else {
    createFormRef.value?.clearValidate("phone");
    callback();
  }
};

const createRules = reactive<FormRules<UserCreateSchema>>({
  username: [
    {
      required: true,
      message: () => $t("main.inputTipPrefix") + $t("main.user.username"),
      trigger: "change",
    },
    {
      min: 4,
      max: 16,
      message: () => $t("login.usernameLengthValidation"),
      trigger: "change",
    },
  ],
  nickname: [
    {
      required: true,
      message: () => $t("main.inputTipPrefix") + $t("main.user.nickname"),
      trigger: "change",
    },
    {
      min: 4,
      max: 20,
      message: () => $t("main.user.nicknameLengthValidation"),
      trigger: "change",
    },
  ],
  phone: [
    {
      required: true,
      trigger: "change",
      validator: validatePhoneInput,
    },
  ],
  role_id: [
    {
      required: true,
      message: () => $t("main.selectTipPrefix") + $t("main.role.role"),
      trigger: "change",
    },
  ],
});

const createBtnHandler = () => {
  createDialogVisible.value = true;
  createFormRef.value?.resetFields();
  nextTick(() => {
    createFormRef.value?.clearValidate();
  });
};

const createConfirmBtnHandler = async () => {
  try {
    await createFormRef.value!.validate();
  } catch {
    return;
  }

  try {
    await reqCreateUser(createFormData);
  } catch {
    return;
  }

  ElMessage({
    type: "success",
    message: $t("main.operationSuccess"),
  });
  createDialogVisible.value = false;
  await getlistData();
};

// update
const updateDialogVisible = ref(false);
const updateDialogTitle = ref(
  $t("functionBtn.edit") + " " + $t("main.user.user"),
);
let updateFormData: UserUpdateSchema;
const updateFormRef = ref<FormInstance>();

const updateRules = reactive<FormRules<UserUpdateSchema>>({
  nickname: [
    {
      required: true,
      message: () => $t("main.inputTipPrefix") + $t("main.user.nickname"),
      trigger: "change",
    },
    {
      min: 4,
      max: 20,
      message: () => $t("main.user.nicknameLengthValidation"),
      trigger: "change",
    },
  ],
  role_id: [
    {
      required: true,
      message: () => $t("main.selectTipPrefix") + $t("main.role.role"),
      trigger: "change",
    },
  ],
});

async function editBtnHandler(item: UserList) {
  updateFormData = reactive<UserUpdateSchema>({
    id: item.id,
    nickname: item.nickname,
    role_id: item.role.id,
  });
  if (roleList.value.length <= 0) {
    await getRoleList();
  }
  updateDialogVisible.value = true;
  updateFormRef.value?.clearValidate();
}

const updateConfirmBtnHandler = async () => {
  try {
    await updateFormRef.value!.validate();
  } catch {
    return;
  }

  try {
    await reqUpdateUser(updateFormData);
  } catch {
    return;
  }

  ElMessage({
    type: "success",
    message: $t("main.operationSuccess"),
  });
  updateDialogVisible.value = false;
  await getlistData();
};
</script>

<template>
  <!-- 过滤项 -->
  <el-card class="filter-card">
    <el-form :model="listFilterSchema" :inline="true">
      <div>
        <el-form-item :label="$t('main.user.username')" prop="username">
          <el-input
            :placeholder="$t('main.inputTipPrefix') + $t('main.user.username')"
            v-model="listFilterSchema.username"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('main.user.phoneNumber')" prop="phone">
          <el-input
            :placeholder="
              $t('main.inputTipPrefix') + $t('main.user.phoneNumber')
            "
            v-model="listFilterSchema.phone"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('main.role.role')">
          <el-select
            v-model="listFilterSchema.role_id"
            filterable
            remote
            :remote-method="getRoleList"
            clearable
            remote-show-suffix
            :placeholder="$t('main.selectTipPrefix') + $t('main.role.role')"
          >
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </div>
      <div>
        <el-form-item>
          <el-button
            type="primary"
            zise="default"
            circle
            icon="Search"
            @click="getlistData"
          ></el-button>
          <el-button type="primary" zise="default" @click="resetBtnHandler">{{
            $t("functionBtn.reset")
          }}</el-button>
        </el-form-item>
      </div>
    </el-form>
  </el-card>

  <!-- 内容展示区 -->
  <el-card class="content-card">
    <el-button type="primary" zise="default" @click="createBtnHandler">{{
      $t("functionBtn.add")
    }}</el-button>
    <el-table :data="listData">
      <!-- <el-table-column type="selection" align="center"></el-table-column> -->
      <el-table-column type="index" align="center"></el-table-column>
      <!-- <el-table-column :label='$t("main.id")' align="center" prop="id"></el-table-column> -->
      <el-table-column
        :label="$t('main.user.username')"
        align="center"
        prop="username"
      ></el-table-column>
      <el-table-column
        :label="$t('main.user.nickname')"
        align="center"
        prop="nickname"
      ></el-table-column>
      <el-table-column
        :label="$t('main.user.phoneNumber')"
        align="center"
        prop="phone"
      ></el-table-column>
      <el-table-column
        :label="$t('main.role.role')"
        align="center"
        prop="role.label"
      ></el-table-column>
      <el-table-column
        :label="$t('main.createdAt')"
        align="center"
        prop="created_at"
      ></el-table-column>
      <el-table-column :label="$t('main.actions')" align="center">
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
      v-model:current-page="listFilterSchema.page"
      v-model:page-size="listFilterSchema.size"
      :page-sizes="[1, 2, 3, 4, 10]"
      size="small"
      :disabled="false"
      :background="true"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
      @change="getlistData"
    />
  </el-card>

  <!-- create dialog -->
  <el-dialog v-model="createDialogVisible" :title="createDialogTitle">
    <el-form
      :model="createFormData"
      label-position="right"
      ref="createFormRef"
      :rules="createRules"
      label-width="auto"
      status-icon
    >
      <el-form-item :label="$t('main.user.username')" prop="username">
        <el-input
          required
          v-model="createFormData.username"
          :placeholder="$t('main.inputTipPrefix') + $t('main.user.username')"
        />
      </el-form-item>
      <el-form-item :label="$t('main.user.phoneNumber')" prop="phone">
        <el-input
          v-model="createFormData.phone"
          :placeholder="$t('main.inputTipPrefix') + $t('main.user.phoneNumber')"
        >
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('main.user.nickname')" prop="nickname">
        <el-input
          v-model="createFormData.nickname"
          :placeholder="$t('main.inputTipPrefix') + $t('main.user.nickname')"
        >
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('main.role.role')" prop="role_id">
        <el-select
          v-model="createFormData.role_id"
          filterable
          remote
          :remote-method="getRoleList"
          clearable
          remote-show-suffix
          :placeholder="$t('main.selectTipPrefix') + $t('main.role.role')"
        >
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="createDialogVisible = false">{{
          $t("functionBtn.cancel")
        }}</el-button>
        <el-button type="primary" @click="createConfirmBtnHandler">
          {{ $t("functionBtn.confirm") }}
        </el-button>
      </div>
    </template>
  </el-dialog>

  <!-- update dialog -->
  <el-dialog v-model="updateDialogVisible" :title="updateDialogTitle">
    <el-form
      :model="updateFormData"
      label-position="right"
      ref="updateFormRef"
      :rules="updateRules"
      label-width="auto"
      status-icon
    >
      <el-form-item :label="$t('main.user.nickname')" prop="nickname">
        <el-input
          v-model="updateFormData.nickname"
          :placeholder="$t('main.inputTipPrefix') + $t('main.user.nickname')"
        >
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('main.role.role')" prop="role_id">
        <el-select
          v-model="updateFormData.role_id"
          filterable
          remote
          :remote-method="getRoleList"
          clearable
          remote-show-suffix
          :placeholder="$t('main.selectTipPrefix') + $t('main.role.role')"
        >
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="updateDialogVisible = false">{{
          $t("functionBtn.cancel")
        }}</el-button>
        <el-button type="primary" @click="updateConfirmBtnHandler">
          {{ $t("functionBtn.confirm") }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
@use "@/styles/share/content-card.scss";
</style>
