<template>
  <div class="layout">
    <!-- <div>
            <div class="alert-box">
                <closeIcon />
                <p class="mx-2">عملیات ناموفق</p>
            </div>
            <div class="content">
                <p>مشکلی در پرداخت پیش آمده است!</p>
            </div>
            <div>
                <v-btn color="#876824" class="mt-2" @click="backHome">بازگشت به صفحه اصلی {{ timer }}</v-btn>
            </div>
        </div> -->

    <div>
      <div class="d-flex">
        <img src="/src/assets/images/payment-failed.png" alt="پرداخت ناموفق" class="payment-image" />
      </div>
      <div class="my-8">
        <p class="payment-text">پرداخت شما <span class="text-red">ناموفق</span> بوده است</p>
      </div>
      <div>
        <v-btn color="#876824" class="mt-2" @click="backHome"
          >بازگشت به صفحه اصلی {{ timer }}</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import closeIcon from "@/assets/images/icons/close.vue";
import router from "@/router";

const timer = ref("10");
const paymentDetail = ref({});

const backHome = () => {
  router.replace("/");
};

onMounted(() => {
  paymentDetail.value = history.state;
  const interval = setInterval(() => {
      if (timer.value > 0) {
          timer.value--;
      } else {
          clearInterval(interval);
          backHome();
      }
  }, 1000);
});
</script>

<style scoped>
.layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.layout > div {
  background-color: rgba(254, 253, 251, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.alert-box {
  background-color: rgba(156, 28, 28, 1);
  color: #fff;
  font-size: 28px;
  font-weight: 700;
  border-radius: 16px;
  padding: 12px 24px;
  display: flex;
}

.layout .content {
  margin: 2rem 0;
  box-shadow: 4px 4px 12px 0px rgba(212, 205, 191, 0.4);
  backdrop-filter: blur(12px);
  padding: 48px;
  min-width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (min-width: 768px) {
  .layout .content {
    min-width: 50%;
  }
}

.k-row {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 0;
  border-bottom: 1px solid rgba(214, 214, 214, 1);
}

.payment-image{
    max-width: 100%;
    height: auto;
    width: 20rem;
}

.payment-text{
font-size: 24px;
font-weight: bold;
}
</style>
