<script setup lang="ts">
import {
  reqCreateRole,
  reqDeleteRole,
  // reqGetRoleDetail,
  // reqGetRoleList,
  reqUpdateRole,
} from "@/api/role/role";
import type {
  RoleCreateSchema,
  RoleDetail,
  RoleList,
  RoleListFilterSchema,
  RoleUpdateSchema,
} from "@/api/role/types";
import { reqGetSystemResourceList } from "@/api/sys-resource/main";
import { setAllPropertiesToUndefined } from "@/common/utils";
import {
  ElMessage,
  type FormInstance,
  type FormRules,
  type TabsPaneContext,
} from "element-plus";
import { nextTick, onMounted, reactive, ref, type Ref } from "vue";
import UserPage from "@/views/sys-manage/user/User.vue";
import { useI18n } from "vue-i18n";

const { t: $t } = useI18n();
// read
const total = ref(0);
const listFilterSchema = reactive<RoleListFilterSchema>({
  page: 1,
  size: 10,
});
const resetBtnHandler = () => {
  setAllPropertiesToUndefined(listFilterSchema, ["page", "size"]);
};

const listData: Ref<RoleList[], RoleList[]> = ref([]);
const detailDrawerVisibale = ref(false);

onMounted(async () => {
  await getlistData();
});

async function getlistData() {
  // const resp = await reqGetRoleList(listFilterSchema);
  // listData.value = resp.data!.records!;
  // total.value = resp.data?.page_info.total_count || 0;
  listData.value = [
    {
      id: 1,
      label: "超级管理员",
      created_at: "2025-03-24 11:11:11",
      updated_at: "",
    },
    {
      id: 2,
      label: "普通管理员",
      created_at: "2025-03-24 11:11:11",
      updated_at: "",
    },
  ];
  total.value = listData.value.length;
}

const selected_fole_id = ref(0);
const handleDetailClick = async (item: RoleList) => {
  selected_fole_id.value = item.id;
  if (deatailTabActiveName.value == "detail") {
    await getRoleDetail();
  }
  detailDrawerVisibale.value = true;
};

const deatailTabActiveName = ref("detail");
let roleDetail: Ref<RoleDetail | null, RoleDetail | null> = ref(null);
const getRoleDetail = async () => {
  // const resp = await reqGetRoleDetail(selected_fole_id.value)
  // roleDetail.value = resp.data;
  roleDetail.value = {
    id: 1,
    label: "超级管理员",
    created_at: "2025-03-24 11:11:11",
    updated_at: "",
    system_resources: [1, 2, 3, 4],
  };
};

const detailEditBtnHandler = () => {
  detailDrawerVisibale.value = false;
  editBtnHandler(roleDetail.value!);
};

const handleDetailTabClick = async (tab: TabsPaneContext) => {
  if (tab.paneName!.toString() == "detail") {
    await getRoleDetail();
  }
};

// deletee
const deleteBtnDisabled = ref(false);
const deleteBtnHandler = async (id: number) => {
  try {
    deleteBtnDisabled.value = true;
    await reqDeleteRole(id);
  } catch {
    deleteBtnDisabled.value = false;
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
  deleteBtnDisabled.value = false;
};

// create
const createDialogVisible = ref(false);
const createDialogTitle = ref(
  $t("functionBtn.add") + " " + $t("main.role.role"),
);
const createFormData = reactive<RoleCreateSchema>({
  label: "",
  system_resources: [],
});
const createFormRef = ref<FormInstance>();

const createRules = reactive<FormRules<RoleCreateSchema>>({
  label: [
    {
      required: true,
      message: () => $t("main.inputTipPrefix") + $t("main.label"),
      trigger: "change",
    },
    {
      min: 2,
      max: 20,
      message: () => $t("main.role.labelLengthValidation"),
      trigger: "change",
    },
  ],
  // system_resources: [
  //   {
  //     required: true,
  //     message: () => $t("main.inputTipPrefix") + $t("main.user.nickname"),
  //     trigger: "change",
  //   },
  //   {
  //     min: 4,
  //     max: 20,
  //     message: () => $t("main.user.nicknameLengthValidation"),
  //     trigger: "change",
  //   },
  // ],
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
    await reqCreateRole(createFormData);
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
let updateFormData: RoleUpdateSchema;
const updateFormRef = ref<FormInstance>();

const updateRules = reactive<FormRules<RoleUpdateSchema>>({
  label: [
    {
      required: true,
      message: () => $t("main.inputTipPrefix") + $t("main.label"),
      trigger: "change",
    },
    {
      min: 2,
      max: 20,
      message: () => $t("main.role.labelLengthValidation"),
      trigger: "change",
    },
  ],
});

async function editBtnHandler(item: RoleList | RoleDetail) {
  const sysresourceResp = await reqGetSystemResourceList({
    role_id: item.id,
    page: 1,
    size: 200,
  });
  updateFormData = reactive<RoleUpdateSchema>({
    id: item.id,
    label: item.label,
    system_resources: (sysresourceResp.data?.records || []).map((sr) => sr.id),
  });
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
    await reqUpdateRole(updateFormData);
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
        <el-form-item :label="$t('main.label')" prop="label">
          <el-input
            :placeholder="$t('main.inputTipPrefix') + $t('main.label')"
            v-model="listFilterSchema.label"
          ></el-input>
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
      <el-table-column :label="$t('main.label')" align="center">
        <!-- eslint-disable-next-line vue/valid-attribute-name -->
        <template #="{ row }">
          <span clsss="label-span" @click="handleDetailClick(row)">{{
            row.label
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('main.createdAt')"
        align="center"
        prop="created_at"
      ></el-table-column>
      <el-table-column align="left" fixed="right">
        <!-- eslint-disable-next-line vue/valid-attribute-name -->
        <template #="{ row }">
          <el-button
            type="success"
            zise="small"
            icon="View"
            circle
            @click="handleDetailClick(row)"
          ></el-button>
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
            :disabled="deleteBtnDisabled"
            @confirm="deleteBtnHandler(row.id)"
          >
            <template #reference>
              <el-button
                type="danger"
                zise="small"
                icon="Delete"
                circle
              ></el-button>
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

  <!-- detail drawer -->
  <el-drawer v-model="detailDrawerVisibale" :with-header="false" size="70%">
    <el-tabs v-model="deatailTabActiveName" @tab-click="handleDetailTabClick">
      <el-tab-pane :label="$t('main.detail')" name="detail">
        <template v-if="roleDetail == null"> Loading </template>
        <template v-else>
          <el-descriptions title="">
            <el-descriptions-item :label="$t('main.label') + ':'">{{
              roleDetail!.label
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('main.createdAt') + ':'">{{
              roleDetail!.created_at
            }}</el-descriptions-item>
          </el-descriptions>

          <!-- button -->
          <div class="detail-btn-container">
            <el-button
              type="warning"
              zise="small"
              icon="Edit"
              circle
              @click="detailEditBtnHandler"
            ></el-button>
            <el-popconfirm
              title="确认删除"
              icon="Delete"
              :disabled="deleteBtnDisabled"
              @confirm="deleteBtnHandler(roleDetail!.id)"
            >
              <template #reference>
                <el-button
                  type="danger"
                  zise="small"
                  icon="Delete"
                  circle
                ></el-button>
              </template>
            </el-popconfirm>
          </div>
        </template>
      </el-tab-pane>
      <el-tab-pane
        :label="$t('main.role.detailUserList')"
        name="detailUserList"
      >
        <UserPage
          :specify_role_id="selected_fole_id"
          v-if="deatailTabActiveName == 'detailUserList'"
        />
      </el-tab-pane>
    </el-tabs>
  </el-drawer>

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
      <el-form-item :label="$t('main.label')" prop="label">
        <el-input
          required
          v-model="createFormData.label"
          :placeholder="$t('main.inputTipPrefix') + $t('main.label')"
        />
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
      <el-form-item :label="$t('main.label')" prop="label">
        <el-input
          v-model="updateFormData.label"
          :placeholder="$t('main.inputTipPrefix') + $t('main.label')"
        >
        </el-input>
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

.detail-btn-container {
  display: flex;
  justify-content: right;
  padding-right: 1rem;
}
</style>
