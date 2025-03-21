<script setup lang="ts">
import type { SystemResourceFilterSchema } from "@/api/auth/types";
import {
  reqCreateSystemResource,
  reqDeleteSystemResource,
  reqGetSystemResourceList,
  reqUpdateSystemResource,
} from "@/api/sys-resource/main";
import type {
  SystemResourceCreateSchema,
  SystemResourceList,
  SystemResourceUpdateSchema,
} from "@/api/sys-resource/types";
import { setAllPropertiesToUndefined } from "@/common/utils";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { nextTick, onMounted, reactive, ref, type Ref } from "vue";
import { useI18n } from "vue-i18n";

const { t: $t } = useI18n();

// read
const systemResourceTypeList = [
  {
    id: "menu",
    label: $t("main.sysResource.menu"),
  },
  {
    id: "button",
    label: $t("main.sysResource.button"),
  },
  {
    id: "api",
    label: $t("main.sysResource.api"),
  },
];

const total = ref(0);
const listData: Ref<SystemResourceList[], SystemResourceList[]> = ref([]);
const listFilterSchema = reactive<SystemResourceFilterSchema>({
  page: 1,
  size: 10,
});

const getlistData = async () => {
  // const resp = await reqGetSystemResourceList(listFilterSchema);
  // listData.value = resp.data!.records!;
  listData.value = [
    {
      id: 1,
      code: "index",
      label: "首页",
      route_path: "/index",
      icon_path: "HomeFilled",
      type: "menu",
      order_num: 1,
      enabled: true,
      assignable: false,
      parent_id: 0,
      children: [],
      order: 0,
    },
    {
      id: 2,
      code: "systemManage",
      label: "系统管理",
      route_path: "/sys-manage",
      icon_path: "Tools",
      type: "menu",
      order_num: 1,
      enabled: true,
      assignable: false,
      parent_id: 0,
      children: [
        {
          id: 3,
          code: "SystemManageUser",
          label: "用户管理",
          route_path: "/sys-manage/user",
          icon_path: "UserFilled",
          type: "menu",
          order_num: 2,
          enabled: true,
          assignable: false,
          parent_id: 2,
          children: [],
          order: 0,
        },
        {
          id: 4,
          code: "SystemManageRole",
          label: "角色管理",
          route_path: "/sys-manage/role",
          icon_path: "Lock",
          type: "menu",
          order_num: 2,
          enabled: true,
          assignable: false,
          parent_id: 2,
          children: [],
          order: 0,
        },
        {
          id: 5,
          code: "SystemManageMenu",
          label: "菜单管理",
          route_path: "/sys-manage/menu",
          icon_path: "Menu",
          type: "menu",
          order_num: 4,
          enabled: true,
          assignable: false,
          parent_id: 2,
          children: [
            {
              id: 6,
              code: "SystemManageMenuC1",
              label: "菜单管理1",
              route_path: "/sys-manage/menu/c1",
              icon_path: "Lock",
              type: "menu",
              order_num: 3,
              enabled: true,
              assignable: false,
              parent_id: 5,
              children: [],
              order: 0,
            },
            {
              id: 7,
              code: "SystemManageMenuC2",
              label: "菜单管理2",
              route_path: "/sys-manage/menu/c2",
              icon_path: "Menu",
              type: "menu",
              order_num: 4,
              enabled: true,
              assignable: false,
              parent_id: 5,
              children: [],
              order: 0,
            },
          ],
          order: 0,
        },
      ],
      order: 0,
    },
  ];

  // total.value = resp.data?.page_info.total_count || 0;
};

onMounted(async () => {
  await getlistData();
});

const resetBtnHandler = () => {
  setAllPropertiesToUndefined(listFilterSchema, ["page", "size"]);
};

// Create
const createDialogVisible = ref(false);
const createDialogTitle = ref(
  $t("functionBtn.add") + " " + $t("main.sysResource.label"),
);
const dropDownListData: Ref<SystemResourceList[], SystemResourceList[]> = ref(
  [],
);
const createFormData = reactive<SystemResourceCreateSchema>({
  parent_id: null,
  code: "",
  type: "",
  label: "",
  order: 1,
});
const createFormRef = ref<FormInstance>();

const getDropDownListData = async (lebel?: string) => {
  const resp = await reqGetSystemResourceList({
    label: lebel,
    page: 1,
    size: 100,
  });
  dropDownListData.value = resp.data?.records || [];
};

const createBtnHandler = () => {
  createDialogVisible.value = true;
  createFormRef.value?.resetFields();
  nextTick(() => {
    createFormRef.value?.clearValidate();
  });
};

const createRules = reactive<FormRules<SystemResourceCreateSchema>>({
  type: [
    {
      required: true,
      message: () => $t("main.selectTipPrefix") + $t("main.type"),
      trigger: "change",
    },
  ],
  code: [
    {
      required: true,
      message: () => $t("main.inputTipPrefix") + $t("main.code"),
      trigger: "change",
    },
    {
      min: 4,
      max: 16,
      message: () => $t("main.sysResource.codeLengthValidation"),
      trigger: "change",
    },
  ],
  label: [
    {
      required: true,
      message: () => $t("main.inputTipPrefix") + $t("main.label"),
      trigger: "change",
    },
    {
      min: 2,
      max: 20,
      message: () => $t("main.sysResource.labelLengthValidation"),
      trigger: "change",
    },
  ],
  order: [
    {
      required: true,
      message: () => $t("main.inputTipPrefix") + $t("main.ascSortOrder"),
      trigger: "change",
    },
  ],
  parent_id: [
    {
      required: true,
      message: () =>
        $t("main.selectTipPrefix") + $t("main.sysResource.parentSysResource"),
      trigger: "change",
    },
  ],
});

const createConfirmBtnHandler = async () => {
  try {
    await createFormRef.value!.validate();
  } catch {
    return;
  }

  try {
    await reqCreateSystemResource(createFormData);
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

// Update
const updateDialogVisible = ref(false);
const updateDialogTitle = ref(
  $t("functionBtn.edit") + " " + $t("main.sysResource.label"),
);
const updateFormRef = ref<FormInstance>();
let updateFormData: SystemResourceUpdateSchema;

const updateRules = reactive<FormRules<SystemResourceUpdateSchema>>({
  label: [
    {
      required: true,
      message: () => $t("main.inputTipPrefix") + $t("main.label"),
      trigger: "change",
    },
    {
      min: 2,
      max: 20,
      message: () => $t("main.sysResource.labelLengthValidation"),
      trigger: "change",
    },
  ],
  order: [
    {
      required: true,
      message: () => $t("main.inputTipPrefix") + $t("main.ascSortOrder"),
      trigger: "change",
    },
  ],
});

const editBtnHandler = async (item: SystemResourceList) => {
  updateFormData = reactive<SystemResourceUpdateSchema>({
    id: item.id,
    label: item.label,
    order: item.order,
  });
  // if (dropDownListData.value.length <= 0) {
  //   await getDropDownListData();
  // }
  updateDialogVisible.value = true;
  updateFormRef.value?.clearValidate();
};

const updateConfirmBtnHandler = async () => {
  try {
    await updateFormRef.value!.validate();
  } catch {
    return;
  }

  try {
    await reqUpdateSystemResource(updateFormData);
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

// Delete
const deleteBtnDisabled = ref(false);
const deleteBtnHandler = async (id: number) => {
  try {
    deleteBtnDisabled.value = true;
    await reqDeleteSystemResource(id);
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
</script>

<template>
  <!-- <RouterView></RouterView> -->
  <el-card class="filter-card">
    <el-form :model="listFilterSchema" :inline="true">
      <div>
        <el-form-item :label="$t('main.type')">
          <el-select
            v-model="listFilterSchema.type"
            filterable
            clearable
            remote-show-suffix
            :placeholder="$t('main.selectTipPrefix') + $t('main.type')"
          >
            <el-option
              v-for="item in systemResourceTypeList"
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
    <el-table :data="listData" row-key="id">
      <!-- <el-table-column type="selection" align="center"></el-table-column> -->
      <el-table-column type="index" align="center"></el-table-column>
      <el-table-column prop="date" label="Date" sortable />
      <el-table-column prop="name" label="Name" sortable />
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
            :disabled="deleteBtnDisabled"
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
      <el-form-item :label="$t('main.type')" prop="type">
        <el-select
          v-model="createFormData.type"
          filterable
          clearable
          :placeholder="$t('main.selectTipPrefix') + $t('main.type')"
        >
          <el-option
            v-for="item in systemResourceTypeList"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('main.code')" prop="code">
        <el-input
          v-model="createFormData.code"
          :placeholder="$t('main.inputTipPrefix') + $t('main.code')"
        >
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('main.label')" prop="label">
        <el-input
          v-model="createFormData.label"
          :placeholder="$t('main.inputTipPrefix') + $t('main.label')"
        >
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('main.label')" prop="order">
        <el-input-number v-model="createFormData.order" :min="1" />
      </el-form-item>
      <el-form-item
        :label="$t('main.sysResource.parentSysResource')"
        prop="parent_id"
      >
        <el-select
          v-model="createFormData.parent_id"
          filterable
          remote
          :remote-method="getDropDownListData"
          clearable
          remote-show-suffix
          :placeholder="$t('main.selectTipPrefix') + $t('main.role.role')"
        >
          <el-option
            v-for="item in dropDownListData"
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
      <el-form-item :label="$t('main.label')" prop="label">
        <el-input
          v-model="updateFormData.label"
          :placeholder="$t('main.inputTipPrefix') + $t('main.label')"
        >
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('main.label')" prop="order">
        <el-input-number v-model="updateFormData.order" :min="1" />
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
