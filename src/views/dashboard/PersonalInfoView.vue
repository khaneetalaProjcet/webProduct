<template>
  <v-row class="mt-5">
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
});

const GetUser = async () => {
  try {
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
  }
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
  background-color: #38785d;
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
  right: 15%;
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
    right: 40%;
    font-size: 12px;
    padding: 2px !important;
    min-width: 5rem;
    z-index: 1000;
  }
}
</style>
