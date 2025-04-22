<template>
  <!-- <v-row class="mt-5">
    <v-col cols="12">
      <div class="profile-box">
        <v-row>
          <v-col cols="12" md="6">
            <div class="d-flex flex-column align-center image-box">
              <p class="username my-2">
                {{ user.firstName }} {{ user.lastName }}
              </p>
              <p class="level my-2">سطح کاربری : C</p>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div class="d-flex flex-column align-center prof-box">
              <div class="d-flex mt-5">
                <BankCartIcon />
                <p class="green mx-2">کارت بانکی</p>
              </div>
              <div class="bankcart-box">
                <div class="d-flex justify-space-around">
                  <p class="cart-text">{{ user.bankName }}</p>
                  <div class="icon-box">
                    <CartIcon />
                  </div>
                </div>
                <div class="d-flex flex-column align-center justify-center">
                  <p class="cart-number">{{ user.cardNumber }}</p>
                  <p class="cart-number">{{ user.shebaNumber }}</p>
                </div>
              </div>
              <div class="d-flex justify-center w-100 my-2">
                <v-btn
                  color="#00603a"
                  size="small"
                  class="mx-2 px-4"
                  variant="text"
                  @click="cartListDialog = true"
                  >لیست کارت ها</v-btn
                >
                <v-btn
                  color="#00603a"
                  size="small"
                  class="mx-2 px-4"
                  variant="outlined"
                  >افزودن کارت جدید</v-btn
                >
              </div>
            </div>
          </v-col>
          <v-col cols="12">
            <div class="my-4 w-100 d-flex justify-space-evenly prof-box">
              <div class="d-flex flex-column">
                <div class="m-2 d-flex flex-column align-start my-3">
                  <p class="k-title">کد ملی :</p>
                  <p class="k-text">{{ user.nationalCode }}</p>
                </div>
                <div class="m-2 d-flex flex-column align-start my-3">
                  <p class="k-title">تاریخ تولد :</p>
                  <p class="k-text">{{ user.birthDate }}</p>
                </div>
                <div class="m-2 d-flex flex-column align-start my-3">
                  <p class="k-title">نام پدر :</p>
                  <p class="k-text">{{ user.fatherName }}</p>
                </div>
              </div>
              <div class="d-flex flex-column">
                <div class="m-2 d-flex flex-column align-start my-3">
                  <p class="k-title">محل تولد :</p>
                  <p class="k-text">{{ user.officeName }}</p>
                </div>
                <div class="m-2 d-flex flex-column align-start my-3">
                  <p class="k-title">شماره همراه :</p>
                  <p class="k-text">{{ user.phoneNumber }}</p>
                </div>
                <div class="m-2 d-flex flex-column align-start my-3">
                  <p class="k-title">جنسیت :</p>
                  <p class="k-text">
                    {{ user.gender == true ? "آقا" : "خانم" }}
                  </p>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-col>
  </v-row> -->

  <v-row class="mt-5 mb-4">
    <v-col cols="12">
      <div class="profile-box">
        <div class="d-flex flex-column align-center mb-6">
          <UserIcon />
          <h3 class="title">اطلاعات شخصی</h3>
          <div class="profile-level">
            <p class="mx-2">سطح کاربری:</p>
            <p class="mx-2">C</p>
          </div>
          <div class="referral-code">
            <p class="mx-2">کد معرف:</p>
            <p class="mx-2">{{ user.Referral }}</p>
            <v-btn
              icon="mdi-content-copy"
              variant="text"
              size="x-small"
              class="copy-btn"
              @click="copyReferral"
            ></v-btn>
          </div>
        </div>
        <v-row>
          <v-col cols="12" md="6" lg="4" class="my-1">
            <div class="profile-item">
              <p class="ma-0">نام:</p>
              <v-progress-circular
                v-if="userLoading == true"
                color="#00603a"
                :size="20"
                width="1"
                indeterminate
              ></v-progress-circular>
              <p class="ma-0" v-else>{{ user.firstName }}</p>
            </div>
          </v-col>
          <v-col cols="12" md="6" lg="4" class="my-1">
            <div class="profile-item">
              <p class="ma-0">نام خانوادگی:</p>
              <v-progress-circular
                v-if="userLoading == true"
                color="#00603a"
                :size="20"
                width="1"
                indeterminate
              ></v-progress-circular>
              <p class="ma-0" v-else>{{ user.lastName }}</p>
            </div>
          </v-col>
          <v-col cols="12" md="6" lg="4" class="my-1">
            <div class="profile-item">
              <p class="ma-0">نام پدر:</p>
              <v-progress-circular
                v-if="userLoading == true"
                color="#00603a"
                :size="20"
                width="1"
                indeterminate
              ></v-progress-circular>
              <p class="ma-0" v-else>{{ user.fatherName }}</p>
            </div>
          </v-col>
          <v-col cols="12" md="6" lg="4" class="my-1">
            <div class="profile-item">
              <p class="ma-0">جنسیت:</p>
              <v-progress-circular
                v-if="userLoading == true"
                color="#00603a"
                :size="20"
                width="1"
                indeterminate
              ></v-progress-circular>
              <div v-else>
                <p class="ma-0" v-if="user.gender == true">آقا</p>
                <p class="ma-0" v-else>خانم</p>
              </div>
              <!-- <p class="ma-0" v-else>{{ user.gender }}</p> -->
            </div>
          </v-col>
          <v-col cols="12" md="6" lg="4" class="my-1">
            <div class="profile-item">
              <p class="ma-0">کد ملی:</p>
              <v-progress-circular
                v-if="userLoading == true"
                color="#00603a"
                :size="20"
                width="1"
                indeterminate
              ></v-progress-circular>
              <p class="ma-0" v-else>{{ user.nationalCode }}</p>
            </div>
          </v-col>
          <v-col cols="12" md="6" lg="4" class="my-1">
            <div class="profile-item">
              <p class="ma-0">شهر تولد:</p>
              <v-progress-circular
                v-if="userLoading == true"
                color="#00603a"
                :size="20"
                width="1"
                indeterminate
              ></v-progress-circular>
              <p class="ma-0" v-else>{{ user.officeName }}</p>
            </div>
          </v-col>
          <v-col cols="12" md="6" lg="4" class="my-1">
            <div class="profile-item">
              <p class="ma-0">تاریخ تولد:</p>
              <v-progress-circular
                v-if="userLoading == true"
                color="#00603a"
                :size="20"
                width="1"
                indeterminate
              ></v-progress-circular>
              <p class="ma-0" v-else>{{ user.birthDate }}</p>
            </div>
          </v-col>
          <v-col cols="12" md="6" lg="4" class="my-1">
            <div class="profile-item">
              <p class="ma-0">شماره موبایل:</p>
              <v-progress-circular
                v-if="userLoading == true"
                color="#00603a"
                :size="20"
                width="1"
                indeterminate
              ></v-progress-circular>
              <p class="ma-0" v-else>{{ user.phoneNumber }}</p>
            </div>
          </v-col>
          <v-col cols="12" md="6" lg="4" class="my-1">
            <div class="profile-item auth">
              <p class="ma-0">وضعیت احراز:</p>
              <v-progress-circular
                v-if="userLoading == true"
                color="#00603a"
                :size="20"
                width="1"
                indeterminate
              ></v-progress-circular>
              <p class="ma-0" v-else>احراز شده</p>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-col>
  </v-row>

  <v-alert
    v-if="alertError"
    color="error"
    border="bottom"
    elevation="2"
    class="k-alert alert-animatiton"
    closable
  >
    {{ errorMsg }}
  </v-alert>
  <v-alert
    v-if="alertSuccess"
    color="success"
    border="bottom"
    elevation="2"
    class="k-alert alert-animatiton"
    closable
  >
    {{ successMsg }}
  </v-alert>
  <v-dialog
    v-model="cartListDialog"
    transition="dialog-bottom-transition"
    width="auto"
  >
    <template v-slot:default="{ isActive }">
      <v-card width="330px">
        <v-toolbar title="لیست کارت های بانکی شما"></v-toolbar>

        <div class="d-flex flex-column pa-5">
          <div class="list-cart-box my-2">
            <!-- image cart -->
            <div class="d-flex justify-space-between align-center">
              <div class="d-flex align-center">
                <img
                  src="/src/assets/images/bank/saman.svg"
                  alt=""
                  width="30"
                  height="30"
                />
                <span class="name">سامان</span>
              </div>
              <div>
                <v-btn
                  class="pa-1"
                  icon="mdi-delete-outline"
                  variant="text"
                  color="#FF0000"
                  size="small"
                ></v-btn>
              </div>
            </div>
            <div class="d-flex justify-end pa-1">
              <p class="number">6219861053804984</p>
            </div>
            <div class="d-flex justify-end pa-1">
              <p class="number">IR320560083388802922191001</p>
            </div>
            <div class="d-flex justify-start">
              <p class="number">علیرضا جوادزاده</p>
            </div>
          </div>
          <div class="list-cart-box my-2">
            <!-- image cart -->
            <div class="d-flex justify-space-between align-center">
              <div class="d-flex align-center">
                <img
                  src="/src/assets/images/bank/saman.svg"
                  alt=""
                  width="30"
                  height="30"
                />
                <span class="name">سامان</span>
              </div>
              <div>
                <v-btn
                  class="pa-1"
                  icon="mdi-delete-outline"
                  variant="text"
                  color="#FF0000"
                  size="small"
                ></v-btn>
              </div>
            </div>
            <div class="d-flex justify-end pa-1">
              <p class="number">6219861053804984</p>
            </div>
            <div class="d-flex justify-end pa-1">
              <p class="number">IR320560083388802922191001</p>
            </div>
            <div class="d-flex justify-start">
              <p class="number">علیرضا جوادزاده</p>
            </div>
          </div>
        </div>

        <v-card-actions class="justify-end">
          <v-btn text="Close" @click="isActive.value = false"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup>
import UserIcon from "@/assets/images/icons/userIcon2.vue";
import BankCartIcon from "@/assets/images/icons/bankCart.vue";
import CartIcon from "@/assets/images/icons/CartIcon.vue";
import { ref, onMounted } from "vue";
import AuthService from "@/service/auth/auth";
import router from "@/router";

const alertError = ref(false);
const errorMsg = ref("");
const cartListDialog = ref(false);
const userLoading = ref(false);
const alertSuccess = ref(false);
const successMsg = ref("");

const user = ref({
  firstName: "",
  fatherName: "",
  lastName: "",
  officeName: "",
  cardNumber: "**** **** **** ****",
  phoneNumber: "",
  nationalCode: "",
  gender: "",
  birthDate: "",
  shebaNumber: "",
  bankName: "نام بانک",
  Referral: "",
});

const GetUser = async () => {
  try {
    userLoading.value = true;
    const response = await AuthService.Profile();
    let x = response.birthDate.split("");
    user.value.birthDate = `${x[0]}${x[1]}${x[2]}${x[3]}/${x[4]}${x[5]}/${x[6]}${x[7]}`;
    user.value.firstName = response?.firstName;
    user.value.lastName = response?.lastName;
    user.value.fatherName = response?.fatherName;
    user.value.officeName = response?.officeName;
    user.value.cardNumber = response?.bankAccounts[0]?.cardNumber;
    user.value.phoneNumber = response?.phoneNumber;
    user.value.nationalCode = response?.nationalCode;
    user.value.gender = response?.gender;
    user.value.shebaNumber = response?.bankAccounts[0]?.shebaNumber;
    user.value.bankName = response?.bankAccounts[0]?.name;
    user.value.Referral = response?.Referral;
    return response;
  } catch (error) {
    if (error.response.status == 401) {
      localStorage.clear();
      router.replace("/Login");
    }
    errorMsg.value = error.response.data.msg || "خطایی رخ داده است!";
    alertError.value = true;
    setTimeout(() => {
      alertError.value = false;
    }, 10000);
  } finally {
    userLoading.value = false;
  }
};

const copyReferral = () => {
  navigator.clipboard.writeText(user.value.Referral).then(() => {
    successMsg.value = "کد معرف شما کپی شد";
    alertSuccess.value = true;
    setTimeout(() => {
      alertSuccess.value = false;
    }, 5000);
  });
};

onMounted(() => {
  GetUser();
});
</script>

<style scoped>
.profile-box {
  width: 100%;
  box-shadow: 4px 4px 12px 0px rgba(212, 205, 191, 0.4);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  height: 100%;
  background-color: #fff;
  padding: 4rem 1rem;
  display: flex;
  flex-direction: column;
}

.image-box {
  width: 100%;
  height: 100%;
  background-color: #e6e6e6;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px;
  border-radius: 16px;
}

.image-box p {
  color: #00603a;
  font-size: 20px;
  font-weight: 400;
}

.k-title {
  color: #00603a;
  font-size: 14px;
  font-weight: 400;
}

.k-text {
  color: #000;
  font-size: 14px;
  font-weight: 400;
}

.username {
  font-size: 24px;
  font-weight: 400;
}

.level {
  font-size: 20px;
  font-weight: 400;
}

.green {
  font-size: 24px;
  font-weight: 400;
  color: #38785d;
}

.prof-box {
  min-height: 200px;
}

.bankcart-box {
  margin-top: 1rem;
  background-color: #00603a;
  width: 270px;
  height: 120px;
  box-shadow: 4px 4px 20px 0px rgba(77, 179, 138, 0.4);
  border-radius: 16px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.icon-box {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4e9d4;
  border-radius: 8px;
  padding: 5px;
}

.cart-text {
  color: #fff;
}

.cart-number {
  color: #fff;
}

.k-alert {
  position: fixed;
  top: 10px;
  right: 25%;
  font-size: 12px;
  padding: 2px !important;
  min-width: 5rem;
  z-index: 1000;
  min-width: 10rem;
}

@media (min-width: 768px) {
  .k-alert {
    position: fixed;
    top: 10px;
    right: 50%;
    font-size: 12px;
    padding: 2px !important;
    min-width: 5rem;
    z-index: 1000;
  }
}

/* .list-cart-box {
  border: 1px solid rgba(77, 179, 138, 0.3);
  padding: 0.3rem;
  width: 100%;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}

.list-cart-box .name {
  font-size: 11px;
  margin-right: 0.2rem;
}

.list-cart-box .number {
  font-size: 14px;
} */
/* new version */
.profile-box .title {
  font-size: 32px;
  font-weight: 700;
  color: rgba(0, 96, 58, 1);
  text-align: center;
  margin-top: 0.5rem;
}

.profile-item {
  background-color: rgba(0, 96, 58, 0.1);
  border-radius: 6px;
  padding: 0.6rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.profile-item.auth {
  color: #00603a;
}

.profile-level {
  font-size: 22px;
  margin: 0.8rem 0;
  display: flex;
  color: #38785d;
}

.referral-code {
  display: flex;
  align-items: center;
  background-color: rgba(0, 96, 58, 0.1);
  border-radius: 6px;
  padding: 0.1rem;
  color: #38785d;
}

.copy-btn {
  padding: 0 !important;
  height: 8px;
}
</style>
