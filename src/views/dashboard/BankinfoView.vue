<template>
  <div>
    <v-row class="mt-5">
      <v-col cols="12" md="6">
        <div class="d-card asset">
          <div class="d-flex justify-space-between align-center w-100">
            <p class="text">موجودی کیف پول :</p>
            <div
              class="d-flex flex-column justify-space-between h-100 align-end"
            >
              <v-progress-circular
                v-if="walletLoading"
                :size="10"
                color="#fff"
                indeterminate
              ></v-progress-circular>
              <p class="price my-1" v-else>
                {{ formatNumber(wallet.balance) }} تومان
              </p>
              <v-progress-circular
                v-if="walletLoading"
                :size="10"
                color="#fff"
                indeterminate
              ></v-progress-circular>
              <p class="gold-price my-1" v-else>
                معادل
                {{ (wallet.balance / goldPriceLive.buyPrice).toFixed(2) }} گرم
                طلا
              </p>
            </div>
          </div>
          <div class="action">
            <v-btn
              variant="flat"
              color="#00603A"
              class="wallet-btn"
              @click="depositDialog = true"
              >شارژ کیف پول</v-btn
            >
            <v-btn
              variant="outlined"
              color="#00603A"
              class="wallet-btn"
              @click="withdrawDialog = true"
              >برداشت</v-btn
            >
          </div>
        </div>
      </v-col>

      <v-col cols="12" md="6">
        <div class="d-flex flex-column h-100 w-100">
          <div class="asset-card mb-3">
            <p class="text">موجودی صندوق طلا :</p>
            <div
              class="d-flex flex-column justify-space-between h-100 align-end"
            >
              <v-progress-circular
                v-if="walletLoading"
                :size="10"
                color="#fff"
                indeterminate
              ></v-progress-circular>
              <p class="gold-weight my-1" v-else>{{ wallet.goldWeight }} گرم</p>
              <v-progress-circular
                v-if="walletLoading"
                :size="10"
                color="#fff"
                indeterminate
              ></v-progress-circular>
              <p class="gold-price my-1" v-else>
                معادل
                {{
                  formatNumber(
                    +(wallet.goldWeight * goldPriceLive.buyPrice).toFixed()
                  )
                }}تومان
              </p>
            </div>
          </div>
          <div class="amount-card">
            <div class="d-flex justify-space-between">
              <p class="text">دارایی کل</p>
              <v-progress-circular
                v-if="walletLoading"
                :size="10"
                color="#fff"
                indeterminate
              ></v-progress-circular>

              <!-- <p class="price my-1" v-else>{{ parseInt((wallet.goldWeight * goldPriceLive.buyPrice) +
                            (wallet.balance))
                            }} تومان
                        </p> -->

              <p class="price my-1" v-else>
                {{ formatNumber(wallet.TotalAssets) }} تومان
              </p>
            </div>
            <div class="d-flex justify-space-between mt-2">
              <p class="text">در انتظار پرداخت</p>
              <v-progress-circular
                v-if="walletLoading"
                :size="10"
                color="#fff"
                indeterminate
              ></v-progress-circular>

              <!-- <p class="price my-1" v-else>{{ parseInt((wallet.goldWeight * goldPriceLive.buyPrice) +
                            (wallet.balance))
                            }} تومان
                        </p> -->

              <p class="price my-1" v-else>
                {{ formatNumber(wallet.blocked) }} تومان
              </p>
            </div>
            <div class="d-flex justify-space-between mt-2">
              <p class="text">در صف انتقال</p>
              <v-progress-circular
                v-if="walletLoading"
                :size="10"
                color="#fff"
                indeterminate
              ></v-progress-circular>

              <!-- <p class="price my-1" v-else>{{ parseInt((wallet.goldWeight * goldPriceLive.buyPrice) +
                            (wallet.balance))
                            }} تومان
                        </p> -->

              <p class="price my-1" v-else>{{ wallet.goldBlock }} گرم</p>
            </div>
          </div>
        </div>
      </v-col>

      <v-col cols="12">
        <h3 class="transaction-title">تاریخچه تراکنش ها</h3>
        <div class="trade-history">
          <div class="d-flex justify-space-between">
            <v-tabs v-model="historyTab" bg-color="white">
              <v-tab value="one">واریز</v-tab>
              <v-tab value="two">برداشت</v-tab>
            </v-tabs>
            <v-combobox
              label="وضعیت پرداخت"
              :items="filter"
              item-title="text"
              item-value="value"
              density="comfortable"
              variant="solo"
              class="transaction-filter"
              @update:modelValue="filterChange"
            ></v-combobox>
          </div>
          <v-tabs-window v-model="historyTab">
            <v-tabs-window-item value="one" class="transaction-box">
              <div class="d-flex justify-end"></div>
              <v-data-table
                :headers="Transactionheaders"
                :items="DepositeTransactionItems"
                :loading="TransactionLoading"
                class="transaction-table"
              >
                <template v-slot:item.status="{ item }">
                  <div class="">
                    <v-chip
                      :text="
                        item.status == 'completed'
                          ? 'موفق'
                          : item.status == 'pending'
                          ? 'نامشخص'
                          : 'ناموفق'
                      "
                      :color="
                        item.status == 'completed'
                          ? 'green'
                          : item.status == 'pending'
                          ? '#666666'
                          : 'red'
                      "
                      size="small"
                    ></v-chip>
                  </div>
                </template>
                <template v-slot:item.amount="{ item }">
                  <p>{{ formatNumber(item.amount) }}</p>
                </template>
              </v-data-table>
            </v-tabs-window-item>

            <v-tabs-window-item value="two" class="transaction-box">
              <v-data-table
                :headers="Transactionheaders"
                :items="WithdrawTransactionItems"
                :loading="TransactionLoading"
                class="transaction-table"
              >
                <template v-slot:item.status="{ item }">
                  <div class="">
                    <v-chip
                      :text="
                        item.status == 'completed'
                          ? 'موفق'
                          : item.status == 'pending'
                          ? 'در انتظار'
                          : 'ناموفق'
                      "
                      :color="
                        item.status == 'completed'
                          ? 'green'
                          : item.status == 'pending'
                          ? '#666666'
                          : 'red'
                      "
                      size="small"
                    ></v-chip>
                  </div>
                </template>
                <template v-slot:item.amount="{ item }">
                  <p>{{ formatNumber(item.amount) }}</p>
                </template>
              </v-data-table>
            </v-tabs-window-item>
          </v-tabs-window>
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

    <v-dialog v-model="depositDialog" width="500">
      <v-card class="cart-Dialog">
        <div class="my-1">
          <p>مبلغ مورد نظر را جهت واریز وارد نمایید</p>
        </div>
        <v-form
          ref="form"
          v-model="isValidcharge"
          @submit.prevent="behpardakhtDeposit"
        >
          <v-text-field
            v-model="priceAmount"
            variant="outlined"
            color="rgba(135, 104, 36, 1)"
            density="compact"
            label="مبلغ (تومان)"
            class="mb-0 mt-2"
            @input="limitInput"
          ></v-text-field>
          <!-- <div v-if="priceAmount">
            <p class="amount-word">{{ DepositeAmountInWords }}</p>
          </div> -->
          <v-select
            v-model="cartId"
            :loading="cartsLoading"
            label="انتخاب کارت"
            :items="carts"
            density="compact"
            variant="outlined"
            item-title="cardNumber"
            item-value="id"
            class="mt-3"
            :rules="[(v) => !!v || 'لطفا کارت خود را انتخاب کنید']"
          ></v-select>
          <div class="title my-2">
            <InfoIcon />
            <p>حداقل مبلغ شارژ باید 100,000 تومان باشد</p>
          </div>
          <v-btn
            type="submit"
            text="شارژ حساب"
            block
            color="#9D7E3B"
            variant="flat"
            class="submit-cart-btn"
            :disabled="!isValidcharge || !cartId"
            :loading="depositLoading"
          ></v-btn>
        </v-form>
      </v-card>
    </v-dialog>

    <v-dialog v-model="withdrawDialog" width="500">
      <v-card class="cart-Dialog">
        <div class="title my-1">
          <p>مبلغ برداشت باید بیشتر از 100,000 تومان باشد</p>
        </div>
        <v-form ref="form" v-model="isValidPrice" @submit.prevent="withdraw">
          <v-text-field
            v-model="withdrawAmount"
            variant="outlined"
            color="rgba(135, 104, 36, 1)"
            density="compact"
            label="مبلغ (تومان)"
            class="mb-0 mt-2 goldconvert-input"
            :rules="validatePrice"
            @input="limitWithdrawInput"
          >
            <template #append-inner>
              <span class="allWallet-text" @click="allWallet()"
                >تمام موجودی</span
              >
            </template>
          </v-text-field>
          <!-- <div v-if="withdrawAmount">
            <p class="amount-word">{{ amountInWords }}</p>
          </div> -->
          <v-select
            v-model="selectCartId"
            :loading="cartsLoading"
            label="انتخاب کارت"
            :items="carts"
            density="compact"
            variant="outlined"
            item-title="cardNumber"
            item-value="id"
            class="mt-3"
            :rules="[(v) => !!v || 'لطفا کارت خود را انتخاب کنید']"
          ></v-select>
          <v-btn
            type="submit"
            text="برداشت از حساب"
            block
            color="#9D7E3B"
            variant="flat"
            class="submit-cart-btn"
            :disabled="!isValidPrice"
            :loading="withdrawLoading"
          ></v-btn>
        </v-form>
      </v-card>
    </v-dialog>

    <v-dialog max-width="500" v-model="successModal" class="trade-modal">
      <v-card class="success-modal">
        <div class="successModal-content py-5">
          <h3>تایید فاکتور کیف پول</h3>
          <img
            src="/src/assets/images/success-done.jpg"
            alt="قبت کارت"
            width="200"
            height="200"
          />
          <p>{{ doneText }}</p>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog max-width="600" v-model="errorDialog" class="trade-modal">
      <v-card class="trade-modal">
        <div class="transferModal-content py-5">
          <h3>خطا</h3>
          <img
            src="/src/assets/images/error.jpg"
            alt="خطا"
            width="200"
            height="200"
          />
          <p class="text-lg">{{ errorMsg }}</p>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog max-width="600" v-model="updateDialog" class="trade-modal">
      <v-card class="trade-modal">
        <div class="transferModal-content py-5">
          <h3>به روز رسانی</h3>
          <img
            src="/src/assets/images/update.svg"
            alt="خطا"
            width="150"
            height="150"
          />
          <p class="text-lg">{{ updateMsg }}</p>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import AuthService from "@/service/auth/auth";
import PriceService from "@/service/auth/price";
import TradeService from "@/service/auth/trade";
import { useRoute } from "vue-router";
import router from "@/router";
import { numberToWords } from "@persian-tools/persian-tools";
import InfoIcon from "@/assets/images/icons/InfoIcon.vue";

const route = useRoute();

const updateDialog = ref(false);
const updateMsg = ref("");
const selectCartId = ref("");
const errorMsg = ref("");
const alertError = ref(false);
const alertSuccess = ref(false);
const historyTab = ref(null);
const TransactionLoading = ref(false);
const cartsLoading = ref(false);
const cartId = ref(null);
const DepositeTransactionItems = ref();
const WithdrawTransactionItems = ref();
const walletLoading = ref(false);
const GoldPriceLoading = ref(false);
const withdrawLoading = ref(false);
const carts = ref([]);
const depositDialog = ref(false);
const withdrawDialog = ref(false);
const priceAmount = ref("");
const withdrawAmount = ref("");
const isValidPrice = ref("");
const depositLoading = ref(false);
const successMsg = ref("");
const successModal = ref(false);
const errorDialog = ref(false);
const doneText = ref("");
const filter = ref([
  {
    text: "همه",
    value: "",
  },
  {
    text: "موفق",
    value: "completed",
  },
  {
    text: "ناموفق",
    value: "failed",
  },
  {
    text: "نامشخص",
    value: "pending",
  },
]);
const Transactionheaders = ref([
  {
    title: "تاریخ",
    key: "date",
  },
  {
    title: "زمان",
    key: "time",
  },
  {
    title: "مقدار(تومان)",
    key: "amount",
  },
  {
    title: "وضعیت",
    key: "status",
  },
]);
const wallet = ref({
  balance: 0,
  goldWeight: 0,
  goldprice: 0,
  TotalAssets: 0,
  blocked: 0,
  goldBlock: 0,
});

const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const goldPriceLive = ref({
  sellPrice: "",
  buyPrice: "",
  change: "",
});

const filterTransaction = ref({
  type: "",
  status: "",
});

const paymentUrl = ref("");

const verifyDetail = ref({});

const GetWallet = async () => {
  try {
    walletLoading.value = true;
    const response = await AuthService.Wallet();
    wallet.value.balance = response.balance;
    wallet.value.goldWeight = response.goldWeight;
    wallet.value.TotalAssets = response.totalAssets;
    wallet.value.blocked = response.blocked;
    wallet.value.goldBlock = response.goldBlock;
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
    walletLoading.value = false;
  }
};

const GetGoldPrice = async () => {
  try {
    GoldPriceLoading.value = true;
    const response = await PriceService.GoldPrice();
    goldPriceLive.value.buyPrice = response.buyPrice;
    goldPriceLive.value.sellPrice = response.sellPrice;
    goldPriceLive.value.change = response.change;
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
    GoldPriceLoading.value = false;
  }
};

const behpardakhtDeposit = async () => {
  try {
    depositLoading.value = true;
    const cleanedAmount = priceAmount.value.replaceAll(",", "");
    const response = await TradeService.DepositWalletBehpardakht(
      cleanedAmount,
      cartId.value
    );

    const RefId = response.data;
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://bpm.shaparak.ir/pgwchannel/startpay.mellat";
    // form.target = "_blank";

    const refIdInput = document.createElement("input");
    // refIdInput.type = "hidden";
    refIdInput.name = "RefId";
    refIdInput.value = RefId;
    form.appendChild(refIdInput);
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
    // paymentUrl.value = response.data;
    // window.location.href = paymentUrl.value;
    return response;
  } catch (error) {
    console.log(error);
    if (error.response.status == 401) {
      localStorage.clear();
      router.replace("/Login");
    } else if (error.response.status == 503) {
      updateMsg.value = error.response.data.msg || "خطایی رخ داده است!";
      updateDialog.value = true;
      setTimeout(() => {
        updateDialog.value = false;
      }, 5000);
    } else {
      errorMsg.value = error.response.data.msg || "خطایی رخ داده است!";
      errorDialog.value = true;
      setTimeout(() => {
        errorDialog.value = false;
      }, 5000);
    }
    // errorMsg.value = error.response.data.msg || "خطایی رخ داده است!";
    // errorDialog.value = true;
    // setTimeout(() => {
    //   errorDialog.value = false;
    // }, 5000);
  } finally {
    depositLoading.value = false;
  }
};

const deposit = async () => {
  try {
    depositLoading.value = true;
    const response = await TradeService.DepositWallet(
      priceAmount.value.replaceAll(",", ""),
      cartId.value
    );
    paymentUrl.value = response.url;
    window.location.href = paymentUrl.value;
    return response;
  } catch (error) {
    if (error.response.status == 401) {
      localStorage.clear();
      router.replace("/Login");
    }
    errorMsg.value = error.response.data.msg || "خطایی رخ داده است!";
    errorDialog.value = true;
    setTimeout(() => {
      errorDialog.value = false;
    }, 5000);
  } finally {
    depositLoading.value = false;
  }
};

const VerifyDeposit = async (zarinpal) => {
  try {
    const response = await TradeService.VerifyDepositWallet(zarinpal);
    verifyDetail.value = response;
    return response;
  } catch (error) {
    errorMsg.value = error.response.data.msg || "خطایی رخ داده است!";
    errorDialog.value = true;
    setTimeout(() => {
      errorDialog.value = false;
    }, 5000);
  } finally {
  }
};

const withdraw = async () => {
  try {
    withdrawLoading.value = true;
    const response = await TradeService.WithdrawWallet(
      withdrawAmount.value.replaceAll(",", ""),
      selectCartId.value
    );
    withdrawDialog.value = false;
    doneText.value = `مبلغ ${withdrawAmount.value} پس از تایید کارشناس طی 72 ساعت آینده به حساب شما واریز خواهد شد.`;
    successModal.value = true;
    setTimeout(() => {
      successModal.value = false;
    }, 10000);
    // successMsg.value = `مبلغ ${withdrawAmount.value} پس از تایید کارشناس به حساب شما واریز خواهد شد.`;
    // alertSuccess.value = true;
    // setTimeout(() => {
    //   alertSuccess.value = false;
    // }, 5000);
    GetWallet();
    withdrawTransaction();
    return response;
  } catch (error) {
    if (error.response.status == 401) {
      localStorage.clear();
      router.replace("/Login");
    }
    errorMsg.value = error.response.data.msg || "خطایی رخ داده است!";
    errorDialog.value = true;
    setTimeout(() => {
      errorDialog.value = false;
    }, 5000);
  } finally {
    withdrawLoading.value = false;
  }
};

const validatePrice = [
  (v) => !!v || "مقدار ورودی نمی‌تواند خالی باشد",
  (v) => /^\d+$/.test(v.replace(/,/g, "")) || "فقط عدد مجاز است",
  (v) => parseInt(v.replace(/,/g, "")) > 99999 || "",
];

const isValidcharge = computed(() => {
  const amount = parseFloat(priceAmount.value.replace(/,/g, ""));
  return amount >= 100000;
});

const limitInput = () => {
  priceAmount.value = priceAmount.value.replace(/\D/g, "");
  if (priceAmount.value.length > 10) {
    priceAmount.value = priceAmount.value.slice(0, 11);
  }
  priceAmount.value = formatNumberWithCommas(priceAmount.value);
};

const limitWithdrawInput = () => {
  withdrawAmount.value = withdrawAmount.value.replace(/\D/g, "");
  if (withdrawAmount.value.length > 10) {
    withdrawAmount.value = withdrawAmount.value.slice(0, 11);
  }
  withdrawAmount.value = formatNumberWithCommas(withdrawAmount.value);
};

const formatNumberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const depositTransaction = async () => {
  try {
    filterTransaction.value.type = "deposit";
    TransactionLoading.value = true;
    const response = await TradeService.WalletTransaction(
      filterTransaction.value
    );
    DepositeTransactionItems.value = response;
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
    TransactionLoading.value = false;
  }
};

const withdrawTransaction = async () => {
  try {
    filterTransaction.value.type = "withdraw";
    TransactionLoading.value = true;
    const response = await TradeService.WalletTransaction(
      filterTransaction.value
    );
    WithdrawTransactionItems.value = response;
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
    TransactionLoading.value = false;
  }
};

const getCarts = async () => {
  try {
    cartsLoading.value = true;
    const response = await AuthService.GetCarts();
    carts.value = response.data.bankAccounts;
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

const filterChange = (filterValue) => {
  filterTransaction.value.status = filterValue.value;
  depositTransaction();
  withdrawTransaction();
};

// const amountInWords = computed(() => {
//   if (withdrawAmount.value) {
//     const amountWithoutCommas = withdrawAmount.value.replace(/,/g, "");
//     const amountInRial = parseInt(amountWithoutCommas, 10);

//     if (amountInRial < 1) {
//       return "کمتر از یک تومان";
//     }

//     return numberToWords(Math.floor(amountInRial)) + " تومان";
//   }
//   return "";
// });

//const DepositeAmountInWords = computed(() => {
//  if (priceAmount.value) {
//    const amountWithoutCommas = priceAmount.value.replace(/,/g, "");
//    const amountInRial = parseInt(amountWithoutCommas, 10);
//    if (amountInRial < 1) {
//      return "کمتر از یک تومان";
//    }
//
//    return numberToWords(Math.floor(amountInRial)) + " تومان";
//  }
//  return "";
//});

watch(withdrawDialog, (newValue) => {
  if (!newValue) {
    withdrawAmount.value = "";
  }
});

watch(depositDialog, (newValue) => {
  if (!newValue) {
    priceAmount.value = "";
  }
});

const allWallet = () => {
  withdrawAmount.value = wallet.value.balance;
  limitWithdrawInput();
};

onMounted(() => {
  GetWallet();
  GetGoldPrice();
  depositTransaction();
  withdrawTransaction();
  getCarts();

  // const zarinpal = ref({
  //   authority: route.query.Authority,
  //   status: route.query.Status,
  // });
  // if (zarinpal.value.authority && zarinpal.value.status) {
  //   VerifyDeposit(zarinpal.value);
  //   if (zarinpal.value.status === "OK") {
  //     router.push({ name: "success", query: verifyDetail.value });
  //   } else {
  //     router.push({ name: "failed", query: verifyDetail.value });
  //   }
  // }
});
</script>

<style scoped>
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

.transaction-box {
  padding: 2rem 1rem;
}

.transaction-table {
  box-shadow: 4px 4px 12px 0px rgba(212, 205, 191, 0.4);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  border: 1px solid #009358;
}

.d-card {
  padding: 12px 24px;
  border-radius: 16px;
  background-color: rgba(254, 253, 251, 0.6);
  box-shadow: 4px 4px 12px 0px rgba(212, 205, 191, 0.4);
  backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  min-height: 12rem;
  width: 100%;
}

.d-card .title {
  width: 100%;
  font-size: 18px;
  font-weight: 300;
  display: flex;
  justify-content: flex-start;
}

.d-card .content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 0;
}

.d-card .content p {
  font-size: 22px;
  font-weight: 700;
}

.d-card .content span {
  box-shadow: 0px 2px 4px 0px rgba(230, 219, 197, 1);
  color: #fff;
  background: #876824;
  font-size: 12px;
  font-weight: 700;
  border-radius: 12px;
  padding: 4px 6px;
}

.d-card .action {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.k-btn {
  padding: 0.5rem 4rem;
  border-radius: 8px;
  background: #00603a;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
}

.k-btn:hover {
  background: #017245;
}

.k-btn:active {
  background: #02834f;
}

.k-btn-second {
  padding: 0.5rem 4rem;
  border-radius: 8px;
  background: #fff;
  color: #017245;
  font-size: 16px;
  font-weight: 700;
  border: 1px solid #017245;
}

.k-btn-second:hover {
  background: #f0fff9;
}

.k-btn-second:active {
  background: #d9f9ec;
}

.wallet-btn {
  letter-spacing: 0 !important;
  width: 45%;
}

.transaction-title {
  font-size: 28px;
  font-weight: 700;
  color: #00603a;
  margin: 3rem;
  text-align: center;
}

.price-amount {
  min-width: 250px;
  margin: 1rem 3rem;
}

.asset {
  height: 100%;
}

.asset .text {
  color: #00603a;
  font-size: 20px;
}

.asset .price {
  color: #00603a;
  font-size: 20px;
  font-weight: 400;
}

.asset .gold-price {
  color: #00603a;
  font-size: 14px;
}

.asset-card {
  box-shadow: 4px 4px 12px 0px rgba(212, 205, 191, 0.4);
  backdrop-filter: blur(12px);
  padding: 12px 24px;
  border-radius: 16px;
  background-color: rgba(254, 253, 251, 0.6);
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.amount-card {
  box-shadow: 4px 4px 12px 0px rgba(212, 205, 191, 0.4);
  backdrop-filter: blur(12px);
  padding: 12px 24px;
  border-radius: 16px;
  background-color: rgba(254, 253, 251, 0.6);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.asset-card {
  color: rgba(60, 60, 60, 1);
  font-weight: 400;
}

.cart-Dialog {
  border-radius: 16px !important;
  padding: 2rem;
}

.cart-Dialog .title {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffe7e7;
  color: #ff0000;
  padding: 0.4rem 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
}

.cart-Dialog .title p {
  margin: 0 0.3rem;
  font-size: 12px;
}

.cart-Dialog svg {
  filter: invert(19%) sepia(88%) saturate(7474%) hue-rotate(358deg)
    brightness(94%) contrast(109%);
}

.submit-cart-btn {
  height: 2.6rem !important;
}

.transaction-filter {
  max-width: 15rem;
}

.amount-word {
  font-size: 12px;
  color: #b00020;
  padding-bottom: 0.5rem;
}

.success-modal {
  border-radius: 10px !important;
  padding: 2rem;
}

.successModal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.successModal-content p {
  font-size: 12px;
}

@media (min-width: 768px) {
  .successModal-content p {
    font-size: 14px;
  }
}

.allWallet-text {
  font-size: 12px;
  font-weight: 100;
  text-align: center;
  height: 100%;
  width: 100%;
  border-radius: 8px 0 0 8px;
  cursor: pointer;
  min-width: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid rgba(0, 147, 88, 0.3);
  background-color: #fff;
}

.transferModal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.transferModal-content p {
  font-size: 12px;
}

@media (min-width: 768px) {
  .transferModal-content p {
    font-size: 14px;
  }
}
</style>
