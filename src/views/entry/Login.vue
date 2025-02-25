<script setup lang="ts">
import { User, Lock } from "@element-plus/icons-vue";
import { type LoginSchema } from "@/api/auth/types";
import type { FormInstance, FormRules } from "element-plus";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { RouteNameEnum } from "@/router/enum";
import { useLanguageStore } from "@/stores/lang/main";
import { reactive, ref } from "vue";
import SvgIcon from "@/components/global/SvgIcon.vue";
import { reqLogin } from "@/api/auth/auth";
import { ElMessage, ElNotification } from "element-plus";
import { useUserInfoStore } from "@/stores/user/main";
import { getOrUpdateSystemResources } from "@/stores/user/utils";

const router = useRouter();

const langStore = useLanguageStore();

const { t: $t } = useI18n();

// 切换语言

let loading = ref(false);
let languageIconColor = ref("black");

let loginData: LoginSchema = reactive<LoginSchema>({
  username: "admin",
  password: "11111111",
});

const ruleFormRef = ref<FormInstance>();

const formRules: FormRules<LoginSchema> = {
  username: [
    {
      required: true,
      message: () => $t("login.usernamePlaceholder"),
      trigger: "blur",
    },
    {
      min: 4,
      max: 16,
      message: () => $t("login.usernameLengthValidation"),
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: () => $t("login.passwordPlaceholder"),
      trigger: "blur",
    },
    {
      min: 8,
      max: 16,
      message: () => $t("login.passwordLengthValidation"),
      trigger: "blur",
    },
  ],
};

let loginBtnDisabled = ref(
  loginData.username === "" || loginData.password === "",
);

// 登录

function _getGreeting() {
  const currentHour = new Date().getHours();

  if (currentHour >= 0 && currentHour < 12) {
    return $t("login.loginSuccessMorning");
  } else if (currentHour >= 12 && currentHour < 18) {
    return $t("login.loginSuccessAfternoon");
  } else {
    return $t("login.loginSuccessEvening");
  }
}

const submitForm = async (formEl: FormInstance | undefined) => {
  loading.value = true;
  if (await validateForm(formEl)) {
    reqLogin(loginData).then((res) => {
      // 保存token到本地
      useUserInfoStore().setToken(res.data.token);

      const systemResources = getOrUpdateSystemResources(true);

      if (!systemResources || systemResources.length == 0) {
        ElMessage({
          type: "error",
          message: $t("login.sysResourceInvalid"),
        });
        loading.value = false;
        return;
      }

      router.push({ name: RouteNameEnum.Home });

      ElNotification({
        type: "success",
        message: $t("login.loginSuccessWelcom"),
        title: _getGreeting(),
      });
    });
  } else {
    ElMessage({
      type: "error",
      message: $t("error.wrongInputValue"),
    });
  }
  loading.value = false;
};

const validateForm = async (formEl: FormInstance | undefined) => {
  let validateResult = false;
  if (!formEl) {
    loginBtnDisabled.value = true;
    return validateResult;
  }

  await formEl.validate((isValid) => {
    if (isValid) {
      loginBtnDisabled.value = false;
      validateResult = true;
    } else {
      loginBtnDisabled.value = true;
    }
  });
  return validateResult;
};

// 忘记密码
function goForgetPassword() {
  router.push({
    name: RouteNameEnum.ForgotPassword, // 目标路由的 name
    query: { user: loginData.username }, // 带上用户名
  });
}
</script>

<template>
  <div class="login_container">
    <el-config-provider :locale="langStore.getEleLocale().value">
      <el-row>
        <el-col :span="10" :lg="8" :md="7" :sm="6" :xs="3"></el-col>
        <el-col :span="4" :lg="8" :md="10" :sm="12" :xs="18">
          <el-form
            ref="ruleFormRef"
            class="login_form"
            :rules="formRules"
            :model="loginData"
            :scroll-to-error="true"
            :show-message="true"
          >
            <h1>{{ $t("login.title") }}</h1>
            <h2>{{ $t("login.subtitle") }}</h2>
            <!-- 用户名 -->
            <el-form-item prop="username">
              <el-input
                v-model="loginData.username"
                clearable
                autocomplete="on"
                autofocus
                maxlength="16"
                minlength="4"
                :placeholder="$t('login.usernamePlaceholder')"
                @input="validateForm(ruleFormRef)"
              >
                <template #prefix>
                  <el-icon color="black" size="1.6em">
                    <User />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
              <!-- <label for="password" :prefix-icon="Lock">{{ $t('login.password') }}</label> -->
              <el-input
                v-model="loginData.password"
                show-password
                maxlength="20"
                minlength="8"
                clearable
                :placeholder="$t('login.passwordPlaceholder')"
                @input="validateForm(ruleFormRef)"
              >
                <template #prefix>
                  <el-icon color="black" size="1.6em">
                    <Lock />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <!-- 登录按钮 -->
            <el-form-item>
              <el-button
                class="login_btn"
                type="primary"
                :loading="loading"
                :disabled="loginBtnDisabled"
                @click="submitForm(ruleFormRef)"
                >{{ $t("login.login") }}</el-button
              >
            </el-form-item>
            <!-- 记住密码 -->
            <div class="login_footer">
              <SvgIcon
                name="language"
                class="language_icon"
                :color="languageIconColor"
                @click="langStore.toggleLanguage"
                @mouseover="languageIconColor = 'blue'"
                @mouseout="languageIconColor = 'black'"
              />
              <span class="forget_pwd_span" @click="goForgetPassword">{{
                $t("login.forgotPassword")
              }}</span>
            </div>
          </el-form>
        </el-col>
      </el-row>
    </el-config-provider>
  </div>
</template>

<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100vh; // 或者根据你需求，也可以是100%
  background: url("@/assets/images/login-bg.jpg") no-repeat;
  background-size: cover;

  /* 1. 让 .login_container 成为弹性容器 */
  display: flex;

  /* 2. 子元素沿主轴（水平）如何排列？如果你不需要让子元素水平居中，可不加或者使用其他值 */
  justify-content: flex-start;

  /* 3. 子元素沿交叉轴（垂直）居中 */
  align-items: center;

  .el-row {
    /* 让 el-row 占满父容器剩余空间 */
    width: 100%;
  }

  .login_form {
    max-width: 75%;
    margin: 0 auto; // 如果想在这列里水平居中
    padding: 1.5em;
    // background: rgb(255, 255, 255, 0.2);
    // border-radius: 2em;
    // box-shadow: 0 0 1.5em rgba(0, 0, 0, 0.6);

    :deep(.el-input__wrapper) {
      box-shadow: none !important;
      border-bottom: 1px solid black;
      border-radius: 0;
      background: transparent;
    }

    .el-input {
      font-size: large;
    }

    :deep(.el-form-item__error) {
      font-size: 1em; /* 你可以根据需要调整字体大小 */
      font-weight: 500;
    }

    .login_footer {
      width: 100%;
      display: flex;
      // 两边对齐
      justify-content: space-between;
      margin-top: 10px;
      align-items: center;
    }

    .login_btn {
      width: 100%;
      border-radius: 2em;
    }

    .forget_pwd_span {
      color: #666;
      cursor: pointer;
    }

    .forget_pwd_span:hover {
      color: blue;
    }

    .language_icon {
      margin-left: 0.3em;
      font-size: 1.6em;
      cursor: pointer;
    }
  }
}
</style>
