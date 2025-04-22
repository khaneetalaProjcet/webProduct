<template>
  <v-row class="mt-5 mb-4">
    <v-col cols="12">
      <i class="ibl64 ibl-bsi"></i>
      <div class="cart-box">
        <div class="d-flex flex-column align-center mb-6">
          <CartIcon />
          <h3 class="title">کارت های بانکی</h3>
        </div>
        <div class="cart-text-box">
          <div>
            <p>-کارت بانکی باید متعلق به خود شما باشد.</p>
            <p>
              -خرید یا افزایش اعتبار از طریق درگاه بانکی فقط با شماره کارت ثبت
              شده امکان پذیر است.
            </p>
            <p>
              -در صورتی که با کارت ثبت نشده خرید یا افزایش اعتبار نمایید، وجه طی
              1 الی 72 ساعت کاری به حساب شما برگشت می‌شود.
            </p>
          </div>
        </div>
        <div class="w-100 d-flex justify-center">
          <v-form
            ref="form"
            v-model="isValid"
            @submit.prevent="submitCart"
            class="card-form"
          >
            <v-text-field
              v-model="cardNumber"
              variant="outlined"
              color="#00603a"
              label="شماره کارت"
              class="mb-2"
              :rules="cartValidationRule"
              @input="limitCartInput"
            ></v-text-field>
            <v-btn
              type="submit"
              text="ثبت کارت"
              block
              color="#00603a"
              variant="flat"
              class="submit-cart-btn"
              :disabled="!isValid"
              :loading="cartLoading"
            ></v-btn>
          </v-form>
        </div>
        <v-divider></v-divider>
        <div class="d-flex">
          <div
            class="list-cart-box my-2"
            v-for="(item, i) in cartList"
            :key="i"
          >
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
              <p class="number">{{ item.cardNumber }}</p>
            </div>
            <div class="d-flex justify-end pa-1">
              <p class="number">{{ item.shebaNumber }}</p>
            </div>
            <div class="d-flex justify-start">
              <p class="number">علیرضا جوادزاده</p>
            </div>
          </div>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import CartIcon from "@/assets/images/icons/bankCart.vue";
import AuthService from "@/service/auth/auth";
import { onMounted, ref } from "vue";

const cartLoading = ref(false);
const cartsLoading = ref(false);
const cardNumber = ref("");
const successMsg = ref("");
const alertSuccess = ref(false);
const errorMsg = ref("");
const alertError = ref(false);
const isValid = ref(false);
const cartList = ref([]);

const limitCartInput = () => {
  cardNumber.value = cardNumber.value.replace(/\D/g, "").slice(0, 16);
};

const submitCart = async () => {
  try {
    cartLoading.value = true;
    const response = await AuthService.BankCart(cardNumber.value);
    cardNumber.value = "";
    successMsg.value = "کارت با موفقیت ثبت شد";
    alertSuccess.value = true;
    setTimeout(() => {
      alertSuccess.value = false;
    }, 10000);
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
    cartLoading.value = false;
  }
};

const getCarts = async () => {
  try {
    cartsLoading.value = true;
    const response = await AuthService.GetCarts();
    cartList.value = response.data;
    console.log(cartList.value);
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
    cartsLoading.value = false;
  }
};

const cartValidationRule = [
  (v) => /^\d{16}$/.test(v) || "شماره کارت باید 16 رقم باشد",
  (v) => !!v || "شماره کارت نمی‌تواند خالی باشد",
];

onMounted(() => {
  getCarts();
});
</script>

<style scoped>
.cart-box {
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

.cart-box .title {
  font-size: 32px;
  font-weight: 700;
  color: rgba(0, 96, 58, 1);
  text-align: center;
  margin-top: 0.5rem;
}

.cart-text-box {
  display: flex;
  justify-content: center;
  align-items: center;
}

.cart-text-box > div {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  color: rgb(67, 67, 67);
}

.card-form {
  width: 100%;
  margin: 2rem 0;
}

@media (min-width: 768px) {
  .cart-text-box > div {
    max-width: 70%;
  }

  .card-form {
    max-width: 30%;
  }
}

.cart-text-box p {
  font-size: 15px;
  margin: 0.5rem 0;
}

.list-cart-box {
  border: 1px solid rgba(77, 179, 138, 0.3);
  padding: 0.3rem;
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
}
</style>
