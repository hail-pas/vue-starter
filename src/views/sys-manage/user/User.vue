<script setup lang="ts">
import type {
  UserListFilterSchema,
  UserList,
  UserCreateSchema,
} from "@/api/user/types";
// import { reqGetUserList } from '@/api/user/user';
import { onMounted, reactive, ref, type Ref } from "vue";
import { useI18n } from "vue-i18n";
import { setAllPropertiesToUndefined } from "@/common/utils";
import type { RoleList } from "@/api/role/types";
// import { reqDeleteUser } from '@/api/user/user';
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { validatePhoneNumber } from "@/common/validators";
// import { reqGetRoleList } from '@/api/role/role';
// import { reqGetRoleList } from '@/api/role/role';

const { t: $t } = useI18n();
// read
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const userListFilterSchema = ref<UserListFilterSchema>({});

const roleList: Ref<RoleList[], RoleList[]> = ref([]);
const userList: Ref<UserList[], UserList[]> = ref([]);

onMounted(async () => {
  await getUserList();
});

async function getRoleList() {
  // (roleName?: string) {
  // const resp = await reqGetRoleList({label: roleName})
  // roleList.value = resp.data!.records!;
  roleList.value = [
    {
      id: 1,
      label: "超级管理员",
      created_at: "",
      updated_at: "",
    },
    {
      id: 2,
      label: "普通管理员",
      created_at: "",
      updated_at: "",
    },
  ];
}

async function getUserList() {
  // const resp = await reqGetUserList(userListFilterSchema.value)
  // userList.value = resp.data!.records!;\

  userList.value = [
    {
      id: 1,
      username: "phoenix",
      nickname: "phoenix",
      phone: "18059247212",
      role: {
        id: 1,
        label: "超级管理员",
        created_at: "2025-03-13 00:00:00",
        updated_at: "2025-03-13 00:00:00",
      },
      is_super_admin: true,
      created_at: "2025-03-13 00:00:00",
      updated_at: "2025-03-13 00:00:00",
    },
  ];
}

const resetBtnHandler = () => {
  setAllPropertiesToUndefined(userListFilterSchema.value);
};

// deletee
const deleteBtnHandler = async (id: number) => {
  // await reqDeleteUser(id);
  console.log("deleted", id);
  ElMessage({
    type: "success",
    message: "删除成功",
  });

  currentPage.value =
    userList.value.length > 1 || currentPage.value === 1
      ? currentPage.value
      : currentPage.value - 1;

  await getUserList();
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

// const clearCreateFormData = () => {

// }

const createConfirmBtnHandler = async () => {
  console.log(createFormData);

  try {
    await createFormRef.value!.validate();
  } catch {
    return;
  }
  console.log(">>>>>>>>>>>>>", createFormData);

  createDialogVisible.value = false;
};

// update
function editBtnHandler(item: UserList) {
  console.log(item);
}
</script>

<template>
  <!-- 过滤项 -->
  <el-card class="filter-card">
    <el-form :model="userListFilterSchema" :inline="true">
      <div>
        <el-form-item :label="$t('main.user.username')" prop="username">
          <el-input
            :placeholder="$t('main.inputTipPrefix') + $t('main.user.username')"
            v-model="userListFilterSchema.username"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('main.user.phoneNumber')" prop="phone">
          <el-input
            :placeholder="
              $t('main.inputTipPrefix') + $t('main.user.phoneNumber')
            "
            v-model="userListFilterSchema.phone"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('main.role.role')">
          <el-select
            v-model="userListFilterSchema.role_id"
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
            @click="getUserList"
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
    <el-button
      type="primary"
      zise="default"
      @click="createDialogVisible = true"
      >{{ $t("functionBtn.add") }}</el-button
    >
    <el-table :data="userList">
      <!-- <el-table-column type="selection" align="center"></el-table-column> -->
      <el-table-column
        type="index"
        :label="$t('main.orderNo')"
        align="center"
      ></el-table-column>
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
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[1, 2, 3, 4, 10]"
      size="small"
      :disabled="false"
      :background="true"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
      @change="getUserList"
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
        <el-button @click="createDialogVisible = !createDialogVisible">{{
          $t("functionBtn.cancel")
        }}</el-button>
        <el-button type="primary" @click="createConfirmBtnHandler">
          {{ $t("functionBtn.confirm") }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.filter-card {
  height: 4.5rem;

  .el-form {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.content-card {
  margin-top: 1rem;

  .el-table {
    margin-top: 1rem;
  }
}
</style>
