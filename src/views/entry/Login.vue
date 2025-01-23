<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue';
import { type LoginSchema } from '@/api/types';
import type { FormInstance, FormRules } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router'
import { RouteNameEnum } from '@/router/enum';
import { useLanguageStore } from "@/stores/lang/main";
import { LangCodeEnum } from '@/i18n/enum';
import { reactive, ref } from 'vue';

const router = useRouter()

const langStore = useLanguageStore()

const { t: $t } = useI18n();

const toggle = () => {
    langStore.setLanguage(langStore.getLanguage().value === LangCodeEnum.zh ? LangCodeEnum.en : LangCodeEnum.zh)
}


let loginData: LoginSchema = reactive<LoginSchema>({
    username: 'admin',
    password: 'admin'
})

const ruleFormRef = ref<FormInstance>()

const formRules: FormRules<LoginSchema> = {
    username: [
        { required: true, message: $t('login.usernamePlaceholder'), trigger: 'blur' },
        { min: 4, max: 16, message: $t('login.usernameLengthValidation'), trigger: 'blur' }
    ],
    password: [
        { required: true, message: $t('login.passwordPlaceholder'), trigger: 'blur' },
        { min: 8, max: 16, message: $t('login.passwordLengthValidation'), trigger: 'blur' }
    ]
}

const submitForm = async (loginData: FormInstance | undefined) => {
    if (!loginData) return
    await loginData.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!', fields)
        }
    })
}

function goForgetPassword() {
    router.push({
        name: RouteNameEnum.ForgotPassword, // 目标路由的 name
        query: { user: loginData.username } // 带上用户名
    })
}

</script>

<template>
    <div class="login_container">
        <el-config-provider :locale="langStore.getEleLocale().value">
            <el-row>
                <el-col :span="12" :xs="0"></el-col>
                <el-col :span="12" :xs="24">
                    <el-button mb-2 @click="toggle">Switch Language</el-button>
                    <el-form ref="ruleFormRef" class="login_form" :rules="formRules" :model="loginData"
                        :scroll-to-error="true" :inline-message="true" :show-message="true">
                        <h1>{{ $t('login.title') }}</h1>
                        <h2>{{ $t('login.subtitle') }}</h2>
                        <!-- 用户名 -->
                        <el-form-item prop="username">
                            <el-input v-model="loginData.username" :prefix-icon="User" clearable autocomplete="on"
                                autofocus :placeholder="$t('login.usernamePlaceholder')">
                            </el-input>

                        </el-form-item>
                        <!-- 密码 -->
                        <el-form-item prop="password">
                            <!-- <label for="password" :prefix-icon="Lock">{{ $t('login.password') }}</label> -->
                            <el-input v-model="loginData.password" :prefix-icon="Lock" show-password maxlength="16"
                                minlength="4" clearable :placeholder="$t('login.passwordPlaceholder')"></el-input>
                        </el-form-item>
                        <!-- 登录按钮 -->
                        <div class="login_btn_container">

                            <el-button class="btn login_btn" type="primary" :loading="false"
                                @click="submitForm(ruleFormRef)">{{
                                    $t('login.login') }}</el-button>

                            <el-button class="btn forget_pwd_btn" type="primary" :loading="false"
                                @click="goForgetPassword">{{
                                    $t('login.forgotPassword') }}</el-button>

                        </div>
                    </el-form>
                </el-col>
            </el-row>
        </el-config-provider>
    </div>
    <br/>
    <el-config-provider :locale="langStore.getEleLocale().value">
            <el-table mb-1 :data="[]" />
            <el-pagination :total="100" />
        </el-config-provider>
</template>

<style lang="scss" scoped>
.login_container {
    width: 100%;
    height: 100vh; // 或者根据你需求，也可以是100%
    background: url('@/assets/images/login-bg.svg') no-repeat;
    background-size: contain;

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
        padding: 20px;
        background: rgb(255, 255, 255, 0.8);
        border-radius: 10px;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);

        .login_btn_container {
            width: 100%;
            display: flex;
            // 两边对齐
            justify-content: space-between;
            margin-top: 10px;
        }

        .login_btn {
            width: 48%;
        }

        .forget_pwd_btn {
            width: 48%;
        }
    }
}
</style>
