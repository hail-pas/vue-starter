<script setup lang="ts">
import type { SystemResourceFilterSchema } from "@/api/auth/types";
import {
  reqCreateSystemResource,
  reqDeleteSystemResource,
  reqUpdateSystemResource,
} from "@/api/sys-resource/main";
import type {
  SystemResourceCreateSchema,
  SystemResourceList,
  SystemResourceUpdateSchema,
} from "@/api/sys-resource/types";
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

const listData: Ref<SystemResourceList[], SystemResourceList[]> = ref([]);
const listFilterSchema = reactive<SystemResourceFilterSchema>({
  page: 1,
  size: 200,
});

const getlistData = async () => {
  // const resp = await reqGetSystemResourceList(listFilterSchema);
  // listData.value = resp.data!.records!;
  listData.value = [
    {
      id: 1,
      code: "Index",
      label: "首页",
      route_path: "/index",
      icon_path: "HomeFilled",
      type: "menu",
      enabled: true,
      assignable: false,
      parent_id: 0,
      children: [],
      order: 0,
    },
    {
      id: 2,
      code: "SystemManage",
      label: "系统管理",
      route_path: "/sys-manage",
      icon_path: "Tools",
      type: "menu",
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
          enabled: true,
          assignable: false,
          parent_id: 2,
          children: [
            {
              id: 6,
              code: "SystemManageMenuAdd",
              label: "菜单管理-add",
              route_path: "",
              icon_path: "Menu",
              type: "button",
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
  enabled: true,
});
const createFormRef = ref<FormInstance>();

const createBtnHandler = (item?: SystemResourceList) => {
  createDialogVisible.value = true;
  createFormRef.value?.resetFields();
  createFormData.parent_id = item ? item.id : null;
  dropDownListData.value = item ? [item] : [];
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
    enabled: item.enabled,
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
  <!-- 内容展示区 -->
  <el-card class="content-card">
    <el-button
      type="primary"
      zise="default"
      @click="createBtnHandler(undefined)"
      >{{ $t("functionBtn.add") }}</el-button
    >
    <el-table :data="listData" row-key="id">
      <!-- <el-table-column type="selection" align="center"></el-table-column> -->
      <el-table-column type="index" align="center"></el-table-column>
      <el-table-column prop="label" :label="$t('main.label')" />
      <el-table-column prop="code" :label="$t('main.code')" />
      <el-table-column prop="type" :label="$t('main.type')" />
      <el-table-column align="left">
        <!-- eslint-disable-next-line vue/valid-attribute-name -->
        <template #="{ row }">
          <el-button
            v-if="row.type == 'menu'"
            type="primary"
            size="small"
            icon="Plus"
            circle
            @click="createBtnHandler(row)"
          ></el-button>
          <el-button
            type="warning"
            size="small"
            icon="Edit"
            circle
            @click="editBtnHandler(row)"
          ></el-button>
          <el-popconfirm
            v-if="row.children && row.children.length <= 0"
            title="确认删除"
            icon="Delete"
            :disabled="deleteBtnDisabled"
            @confirm="deleteBtnHandler(row.id)"
          >
            <template #reference>
              <el-button
                type="danger"
                size="small"
                icon="Delete"
                circle
              ></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
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
      <el-form-item :label="$t('main.enabled')" prop="enabled">
        <el-switch v-model="createFormData.enabled" />
      </el-form-item>
      <el-form-item :label="$t('main.ascSortOrder')" prop="order">
        <el-input-number v-model="createFormData.order" :min="1" />
      </el-form-item>
      <el-form-item
        v-if="dropDownListData.length > 0"
        :label="$t('main.sysResource.parentSysResource')"
        prop="parent_id"
      >
        <el-select v-model="createFormData.parent_id" disabled>
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
      <el-form-item :label="$t('main.enabled')" prop="enabled">
        <el-switch v-model="updateFormData.enabled" />
      </el-form-item>
      <el-form-item :label="$t('main.ascSortOrder')" prop="order">
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
