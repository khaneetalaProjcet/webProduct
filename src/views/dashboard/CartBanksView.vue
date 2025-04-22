<template>
  <v-row class="mt-5 mb-4">
    <v-col cols="12">
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
        <div class="d-flex flex-wrap">
          <div class="py-10" v-if="cartsLoading == true">
            <p>در حال استعلام کارت های شما ...</p>
          </div>
          <div
            class="list-cart-box ma-3"
            v-for="(item, i) in cartList"
            :key="i"
            v-else
          >
            <!-- icon cart -->
            <div class="d-flex justify-space-between align-center">
              <div class="d-flex align-center">
                <span>{{ item.name }}</span>
              </div>
              <!-- <div class="d-flex align-center" v-if="item.name == 'SAMAN'">
                <i class="ibl64 ibl-sb"></i>
              </div>

              <div class="d-flex align-center" v-else-if="item.name == tejarat">
                <i class="ibl64 ibl-sb"></i>
              </div>

              <div class="d-flex align-center" v-else-if="item.name == SAMAN">
                <i class="ibl64 ibl-sb"></i>
              </div>

              <div class="d-flex align-center" v-else-if="item.name == SAMAN">
                <i class="ibl64 ibl-sb"></i>
              </div>

              <div class="d-flex align-center" v-else-if="item.name == SAMAN">
                <i class="ibl64 ibl-sb"></i>
              </div>

              <div class="d-flex align-center" v-else-if="item.name == SAMAN">
                <i class="ibl64 ibl-sb"></i>
              </div>

              <div class="d-flex align-center" v-else-if="item.name == SAMAN">
                <i class="ibl64 ibl-sb"></i>
              </div>

              <div class="d-flex align-center" v-else-if="item.name == SAMAN">
                <i class="ibl64 ibl-sb"></i>
              </div>

              <div class="d-flex align-center" v-else-if="item.name == SAMAN">
                <i class="ibl64 ibl-sb"></i>
              </div> -->

              <div>
                <v-btn
                  class="pa-1"
                  icon="mdi-delete-outline"
                  variant="text"
                  color="#FF0000"
                  size="small"
                  :loading="deleteLoading[i]"
                  @click="deleteCart(item,i)"
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
              <p class="number">{{ user.firstName }} {{ user.lastName }}</p>
            </div>
          </div>
        </div>
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
</template>

<script setup>
import CartIcon from "@/assets/images/icons/bankCart.vue";
import router from "@/router";
import AuthService from "@/service/auth/auth";
import { onMounted, ref } from "vue";

const cartLoading = ref(false);
const cartsLoading = ref(false);
const deleteLoading = ref([]);
const cardNumber = ref("");
const successMsg = ref("");
const alertSuccess = ref(false);
const errorMsg = ref("");
const alertError = ref(false);
const isValid = ref(false);
const cartList = ref([]);
const user = ref({
  firstName: "",
  lastName: "",
});

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
    getCarts()
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
    cartList.value = response.data.bankAccounts;
    user.value.firstName = response.data.firstName;
    user.value.lastName = response.data.lastName;
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

const deleteCart = async (item,i) => {
  try {
    deleteLoading.value[i] = true;
    const response = await AuthService.DeleteCart(item.id);
    getCarts();
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
    deleteLoading.value[i] = false;
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
.k-alert {
  position: fixed;
  top: 10px;
  right: 15%;
  font-size: 12px;
  padding: 2px !important;
  min-width: 15rem;
  z-index: 1000;
}

@media (min-width: 768px) {
  .k-alert {
    position: fixed;
    top: 10px;
    right: 40%;
    font-size: 12px;
    padding: 2px !important;
    min-width: 20rem;
    z-index: 1000;
  }
}

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
  padding: 0.5rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  width: 100%;
}

@media (min-width: 768px) {
  .list-cart-box {
    width: 15rem;
  }
}

.list-cart-box .name {
  font-size: 11px;
  margin-right: 0.2rem;
}

.list-cart-box .number {
  font-size: 14px;
}
</style>
