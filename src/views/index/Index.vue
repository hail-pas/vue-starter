<script setup lang="ts">
import type { PageResponse } from "@/api/types";
import { http } from "@/common/request";
import { onMounted, reactive, ref, type Ref } from "vue";

const currentPage = ref(0);
const pageSize = ref(10);
const total = ref(0);

interface D {
  code: string;
  label: string;
  description: string;
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
  data.value = brandResp.data?.records || [];
  total.value = brandResp.data?.page_info.total_count || 0;
};

let data: Ref<D[], D[]> = ref([]);

onMounted(async () => {
  await getBrand();
});

let addDialogFormVisible = ref(false);

const form = reactive({
  code: "",
  label: "",
  description: "",
});

const reqAddBrand = async () => {
  console.log("added");
  addDialogFormVisible.value = !addDialogFormVisible.value;
};
</script>

<template>
  <el-card>
    <el-button
      class="add-btn"
      type="primary"
      sizee="default"
      icon="Plus"
      @click="addDialogFormVisible = !addDialogFormVisible"
      >添加品牌</el-button
    >
    <el-table border :data="data">
      <el-table-column align="center" type="index"></el-table-column>
      <el-table-column
        label="品牌code"
        align="center"
        prop="code"
      ></el-table-column>
      <el-table-column label="品牌名" align="center">
        <!-- eslint-disable-next-line vue/valid-attribute-name -->
        <template #="{ row }">
          <span>{{ row.label }}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述" align="center" prop="description">
      </el-table-column>
      <el-table-column label="操作项" align="center">
        <el-button type="warning" zise="small" icon="Edit" circle></el-button>
        <el-button type="danger" zise="small" icon="Delete"></el-button>
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
  <el-dialog v-model="addDialogFormVisible" title="添加品牌">
    <el-form :model="form" label-position="top">
      <el-form-item label="品牌code">
        <el-input v-model="form.code" placeholder="输入品牌code" />
      </el-form-item>
      <el-form-item label="品牌名">
        <el-input v-model="form.label" placeholder="输入品牌名"> </el-input>
      </el-form-item>
      <el-form-item label="品牌描述">
        <el-input v-model="form.description" placeholder="输入品牌描述">
        </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="addDialogFormVisible = !addDialogFormVisible"
          >取消</el-button
        >
        <el-button type="primary" @click="reqAddBrand"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
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

.el-form {
  width: 80%;
}
</style>
