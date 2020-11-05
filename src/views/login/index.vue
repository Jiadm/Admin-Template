<template>
  <div class="app-login">
    <el-main class="app-login-main">
      <el-row class="app-login-header" :gutter="20">
        <el-col :span="18">
          <a class="app-login-logo" href="/Login">
            <strong class="hidden-xs-only">{{$t("login.systemName")}}</strong>
          </a>
        </el-col>
      </el-row>

      <div class="app-login-form">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          auto-complete="on"
          label-position="left"
        >
          <div class="login-title--container">
            <h3 class="title">
              <span>{{$t("login.loginForm")}}</span>
            </h3>
          </div>
          <el-form-item prop="userName">
            <el-input
              v-model="loginForm.username"
              v-on:keyup.native.enter="handleLogin"
              ref="username"
              id="login-form-username"
              :placeholder="$t('login.name')"
              name="userName"
              type="text"
              :maxlength="100"
              auto-complete="on"
            >
              <i slot="prepend" class="el-icon-user"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-on:keyup.native.enter="handleLogin"
              ref="password"
              id="login-form-password"
              v-model="loginForm.password"
              :placeholder="$t('login.password')"
              name="password"
              :maxlength="30"
              auto-complete="on"
            >
              <i slot="prepend" class="el-icon-lock"></i>
            </el-input>
          </el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            style="width: 100%; margin-bottom: 30px"
            v-on:click="handleLogin"
            >{{$t("login.login")}}</el-button
          >
        </el-form>
      </div>
      <footer class="app-login-footer">
        {{$t("company.copyright")}}©2009-{{(new Date()).getFullYear()}}  {{$t("company.Yizit")}}
      </footer>
    </el-main>

     <!-- <div class="login-i18n">
        <span>english：</span>
        <el-dropdown @@command="handleLanguageChange">
            <span class="el-dropdown-link">
                <i class="app-header-item iconfont el-icon-language"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="lo in locales" :key="lo.value" :disabled="lo.value === locale" :command="lo.value">{{lo.label}}</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div> -->
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import { getlanguage } from "@/utils/lang"
import { Message } from "element-ui";
export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    return {
      locale: getlanguage(),//selected language
      locales: this.$store.getters.locales,//applicable language
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [{ required: true, trigger: "blur" }],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  mounted() {
    //光标默认选中用户名
    this.$refs.username.focus();
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;

          this.$store
            .dispatch("user/login", this.loginForm)
            .then((resolve) => {
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch((error) => {
              Message({
                message: "user or password is not incorrect",
                type: "error",
                duration: 1.5 * 1000,
              });

              this.loading = false;
            });
             
            this.$store.dispatch("lang/setLanguage",this.locale)
            
        } else {
          //console.log("error submit!!");
          return false;
        }
      });
    },
    handleLanguageChange(){

    }
  },
};
</script>

<style>
.app-login {
  height: 100%;
  background: #2d3a4b url("../../assets/login-bg.jpg") center no-repeat;
  background-size: cover;
  color: #fff;
}

.app-login-main {
  height: 100%;
}

.app-login-header {
  height: 60px;
}

.app-login-form {
  height: calc(100% - 76px);
  min-height: 370px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.app-login-footer {
  text-align: center;
}

.app-login-logo {
  display: inline-flex;
  color: #fff !important;
  text-decoration: none;
  align-items: center;
  justify-content: center;
}
.app-login-logo .el-image {
  flex-shrink: 0;
}
.app-login-logo > strong {
  white-space: nowrap;
  font-size: 20px;
}

.app-login .el-input-group__append,
.el-input-group__prepend {
  padding-left: 10px;
  padding-right: 10px;
}

.login-svg--container {
  padding: 6px 5px 6px 15px;
  vertical-align: middle;
  width: 30px;
  display: inline-block;
}
.login-form {
  background: #fff;
  border-radius: 3px;
  padding: 50px 30px;
  width: 100%;
}

@media all and (min-width: 768px) {
  .login-form {
    width: 400px;
  }
}

.login-title--container {
  position: relative;
}

.login-title--container h3 {
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-title--container .title {
  font-size: 26px;
  color: #2a568c;
  margin: 0 auto 40px auto;
  text-align: center;
  font-weight: normal;
}

.login-title--container .set-language {
  color: #fff;
  position: absolute;
  top: 5px;
  right: 0;
}
.login-i18n {
  position: fixed;
  top: 30px;
  right: 30px;
  margin-left: 20px;
}
.login-i18n > span {
  font-size: 14px;
}
</style>