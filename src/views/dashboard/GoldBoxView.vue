<template>
  <div>
    <v-container class="px-0" fluid>
      <v-row class="my-1">
        <v-col cols="12">
          <div class="d-flex flex-column align-center">
            <h3 class="title">خرید و فروش طلا</h3>
          </div>
        </v-col>
        <v-col cols="12">
          <v-tabs v-model="tab" bg-color="white" class="tab-header">
            <v-tab value="one">خرید</v-tab>
            <v-tab value="two">فروش</v-tab>
            <v-tab value="three">انتقال</v-tab>
            <v-tab value="four">استفاده</v-tab>
          </v-tabs>
        </v-col>
      </v-row>
      <v-tabs-window v-model="tab" class="my-1">
        <v-tabs-window-item value="one">
          <v-container>
            <v-row>
              <v-col cols="12" md="7" class="pa-0 my-2">
                <div class="goldbox-section buy me-2">
                  <div class="live-price-box">
                    <span class="live-tag">لحظه ای</span>
                    <p>قیمت طلای 18 عیار:</p>
                    <p class="fade-badge">
                      {{ formatNumber(goldPriceLive.buyPrice) }} تومان
                    </p>
                  </div>
                  <div
                    class="my-1"
                    :class="{ 'order-3': isSwapped, 'order-1': !isSwapped }"
                  >
                    <span>وزن طلا (گرم)</span>
                    <v-text-field
                      v-model="buyInfo.goldWeight"
                      variant="outlined"
                      color="rgba(135, 104, 36, 1)"
                      density="compact"
                      @input="buyGoldweightConvert"
                      :rules="validateWeight"
                      class="transition-field goldconvert-input"
                    >
                    </v-text-field>
                  </div>
                  <div class="d-flex justify-center align-center order-2">
                    <v-btn
                      icon="mdi-swap-horizontal"
                      variant="text"
                      class="change-btn"
                      @click="swapFields"
                    ></v-btn>
                  </div>
                  <div
                    class="my-1"
                    :class="{ 'order-1': isSwapped, 'order-3': !isSwapped }"
                  >
                    <span>مبلغ (تومان)</span>
                    <v-text-field
                      v-model="buyInfo.goldprice"
                      variant="outlined"
                      color="rgba(135, 104, 36, 1)"
                      density="compact"
                      @input="buyGoldpriceConvert"
                      class="transition-field goldconvert-input"
                    >
                      <template #append-inner>
                        <span
                          class="allWallet-text buy"
                          @click="allWalletInBuy()"
                          >تمام موجودی</span
                        >
                      </template>
                    </v-text-field>
                    <p class="price-in-word">{{ BuyAmountInWords }}</p>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="5" class="pa-0 my-2">
                <div class="goldbox-section">
                  <!-- <div class="Treasury-box">
                    <p>موجودی خزانه :</p>
                    <p>15678 گرم</p>
                  </div> -->
                  <div class="wallet-box">
                    <p>موجودی کیف پول :</p>
                    <p>
                      {{ formatNumber(+userStore.user?.wallet?.balance) }} تومان
                    </p>
                  </div>
                  <div class="d-flex justify-space-between py-2 px-4 my-1">
                    <p class="mb-0">گرم طلا :</p>
                    <p class="mb-0">{{ buyInfo.goldWeight }} گرم</p>
                  </div>
                  <v-divider></v-divider>
                  <div class="d-flex justify-space-between py-2 px-4 my-1">
                    <p class="mb-0">کارمزد خرید :</p>
                    <p class="mb-0">0٪</p>
                  </div>
                  <v-divider></v-divider>
                  <div class="d-flex justify-space-between py-2 px-4 my-1">
                    <p class="mb-0">مبلغ قابل پرداخت :</p>
                    <p class="mb-0">
                      {{ formatNumber(buyInfo.goldprice) }} تومان
                    </p>
                  </div>
                  <div class="my-2">
                    <v-btn
                      color="#00603a"
                      :loading="loading"
                      @click="CreateBuy"
                      block
                      >خرید</v-btn
                    >
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-tabs-window-item>
        <v-tabs-window-item value="two">
          <v-container>
            <v-row>
              <v-col cols="12" md="7" class="pa-0 my-2">
                <div class="goldbox-section sell me-2">
                  <div class="live-price-box">
                    <span class="live-tag">لحظه ای</span>
                    <p>قیمت طلای 18 عیار:</p>
                    <p class="fade-badge">
                      {{ formatNumber(goldPriceLive.buyPrice) }} تومان
                    </p>
                  </div>
                  <div
                    class="my-1"
                    :class="{ 'order-3': isSwapped, 'order-1': !isSwapped }"
                  >
                    <span>وزن طلا (گرم)</span>
                    <v-text-field
                      v-model="sellInfo.goldWeight"
                      variant="outlined"
                      color="rgba(135, 104, 36, 1)"
                      density="compact"
                      @input="sellGoldweightConvert"
                      :rules="weightRules"
                      class="transition-field goldconvert-input"
                    >
                      <template #append-inner>
                        <span
                          class="allWallet-text sell"
                          @click="allWalletInSell()"
                          >تمام موجودی</span
                        >
                      </template>
                    </v-text-field>
                  </div>
                  <div class="d-flex justify-center align-center order-2">
                    <v-btn
                      icon="mdi-swap-horizontal"
                      variant="text"
                      class="change-btn"
                      @click="swapFields"
                    ></v-btn>
                  </div>
                  <div
                    class="my-1"
                    :class="{ 'order-1': isSwapped, 'order-3': !isSwapped }"
                  >
                    <span>مبلغ (تومان)</span>
                    <v-text-field
                      v-model="sellInfo.goldPrice"
                      variant="outlined"
                      color="rgba(135, 104, 36, 1)"
                      density="compact"
                      class="transition-field goldconvert-input"
                      @input="sellGoldpriceConvert"
                    ></v-text-field>
                    <p class="price-in-word">{{ SellAmountInWords }}</p>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="5" class="pa-0 my-2">
                <div class="goldbox-section">
                  <!-- <div class="Treasury-box sell">
                    <p>موجودی خزانه :</p>
                    <p>15678 گرم</p>
                  </div> -->
                  <div class="wallet-box sell">
                    <p>موجودی صندوق طلا :</p>
                    <p>{{ userStore.user?.wallet?.goldWeight }} گرم</p>
                  </div>
                  <div class="d-flex justify-space-between py-2 px-4 my-1">
                    <p class="mb-0">گرم طلا :</p>
                    <p class="mb-0">{{ sellInfo.goldWeight }} گرم</p>
                  </div>
                  <v-divider></v-divider>
                  <div class="d-flex justify-space-between py-2 px-4 my-1">
                    <p class="mb-0">کارمزد فروش :</p>
                    <p class="mb-0">1٪</p>
                  </div>
                  <v-divider></v-divider>
                  <div class="d-flex justify-space-between py-2 px-4 my-1">
                    <p class="mb-0">مبلغ قابل دریافت :</p>
                    <p class="mb-0">
                      {{ formatNumber(sellInfo.goldPrice) }} تومان
                    </p>
                  </div>
                  <div class="my-2">
                    <v-btn
                      color="#930606"
                      :loading="sellLoading"
                      @click="CreateSell"
                      block
                      >فروش</v-btn
                    >
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-tabs-window-item>
        <v-tabs-window-item value="three">
          <v-container>
            <v-row>
              <v-col cols="12" class="pa-0 my-2">
                <div class="d-flex flex-column goldbox-section transfer">
                  <div
                    class="d-flex flex-column flex-md-row justify-center w-100"
                  >
                    <div class="w-100 me-md-4">
                      <span>وزن طلا (گرم)</span>
                      <v-text-field
                        v-model="transfer.goldWeight"
                        variant="outlined"
                        color="rgba(135, 104, 36, 1)"
                        density="compact"
                        class="transition-field"
                        :rules="weightRules"
                        @input="transferGoldweight"
                      ></v-text-field>
                    </div>
                    <div class="w-100 ms-md-4">
                      <span>کد ملی گیرنده</span>
                      <v-text-field
                        v-model="transfer.nationalCode"
                        variant="outlined"
                        color="rgba(135, 104, 36, 1)"
                        density="compact"
                        class="transition-field"
                        :rules="nationalCodeRules"
                      ></v-text-field>
                    </div>
                  </div>
                  <div class="d-flex flex-column" v-if="showOtp">
                    <v-otp-input
                      :length="4"
                      v-model="otp"
                      type="number"
                      variant="outlined"
                      class="otp-input"
                      inputmode="numeric"
                      autocomplete="one-time-code"
                      @input="handleOTPInput"
                    ></v-otp-input>
                    <p class="transfer-otp">
                      زمان باقی مانده : {{ Transfertimer }} ثانیه
                    </p>
                  </div>
                  <div class="d-flex justify-end w-100 mt-3">
                    <v-btn
                      color="#af8b4a"
                      class="px-8"
                      @click="createTransfer"
                      :disabled="!validTransfer"
                      :loading="createTransferLoading"
                      v-if="!showOtp"
                      >ثبت انتقال</v-btn
                    >
                    <v-btn
                      color="#af8b4a"
                      class="px-8"
                      @click="VerifyTransferOtp"
                      :disabled="!validTransfer"
                      :loading="verifyTransferOtpLoading"
                      v-else
                      >تایید</v-btn
                    >
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-tabs-window-item>
        <v-tabs-window-item value="four">
          <v-container>
            <v-row>
              <v-col cols="12" class="pa-0 my-2">
                <div class="d-flex flex-column goldbox-section use">
                  <v-row>
                    <v-col cols="12" md="4" class="my-6">
                      <v-text-field
                        v-model="useGold.goldWeight"
                        label="وزن طلا (گرم)"
                        variant="outlined"
                        color="rgba(135, 104, 36, 1)"
                        class="transition-field"
                        :rules="weightRules"
                        @input="useGoldweight"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" class="my-6">
                      <v-select
                        v-model="useGold.branchId"
                        :items="branches"
                        label="شعبه ها"
                        variant="outlined"
                        :rules="BranchRules"
                        item-title="name"
                        item-value="id"
                        @update:modelValue="defineSellers"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="4" class="my-6">
                      <v-select
                        v-model="useGold.sellerId"
                        :items="seller"
                        label="فروشنده"
                        variant="outlined"
                        :rules="BranchRules"
                        item-title="lastName"
                        item-value="id"
                        v-if="useGold.branchId"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <div
                    class="d-flex flex-column align-center"
                    v-if="showUseGoldOtp"
                  >
                    <p class="transfer-otp">کد احراز برای فروشنده ارسال شد</p>
                    <v-otp-input
                      :length="4"
                      v-model="useGoldOtpInput"
                      type="number"
                      variant="outlined"
                      class="otp-input"
                      inputmode="numeric"
                      autocomplete="one-time-code"
                      @input="handleOTPInput"
                    ></v-otp-input>
                    <p class="transfer-otp">
                      زمان باقی مانده : {{ UseGoldtimer }} ثانیه
                    </p>
                  </div>
                  <div class="d-flex justify-end w-100 mt-3">
                    <v-btn
                      color="#af8b4a"
                      class="px-8"
                      @click="createUseGold"
                      :loading="useGoldCreateLoading"
                      :disabled="!validUseGold"
                      v-if="!showUseGoldOtp"
                      >ثبت استفاده</v-btn
                    >

                    <v-btn
                      color="#af8b4a"
                      class="px-8"
                      @click="verifyUseGold"
                      :loading="verifyUseGoldLoading"
                      v-else
                      >تایید</v-btn
                    >
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-tabs-window-item>
      </v-tabs-window>
      <h3 class="title mt-10">تاریخچه تراکنش ها</h3>
      <div class="trade-history pa-md-3">
        <div class="d-flex flex-column flex-md-row justify-space-between">
          <v-tabs v-model="historyTab" bg-color="white" class="w-100">
            <v-tab value="one">خرید</v-tab>
            <v-tab value="two">فروش</v-tab>
          </v-tabs>
          <div class="d-flex justify-start justify-md-end w-100 mt-3">
            <v-combobox
              label="وضعیت پرداخت"
              :items="filter"
              item-title="text"
              item-value="value"
              density="comfortable"
              variant="solo"
              class="transaction-filter w-100"
              @update:modelValue="filterChange"
            ></v-combobox>
          </div>
        </div>
        <v-tabs-window v-model="historyTab">
          <v-tabs-window-item value="one" class="transaction-box">
            <div class="d-flex justify-end"></div>
            <v-data-table
              :headers="Transactionheaders"
              :items="BuyTransactionItems"
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
              <template v-slot:item.goldPrice="{ item }">
                <p>{{ formatNumber(item.goldPrice) }}</p>
              </template>
              <template v-slot:item.totalPrice="{ item }">
                <p>{{ formatNumber(item.totalPrice) }}</p>
              </template>
              <template v-slot:item.tradeType="{ item }">
                <div class="">
                  <v-chip
                    :text="
                      item.tradeType == 0
                        ? 'آنلاین'
                        : item.tradeType == 1
                        ? 'تلفنی'
                        : item.tradeType == 2
                        ? 'حضوری'
                        : 'حواله'
                    "
                    color="#78909C"
                    size="small"
                  ></v-chip>
                </div>
              </template>
            </v-data-table>
          </v-tabs-window-item>

          <v-tabs-window-item value="two" class="transaction-box">
            <v-data-table
              :headers="Transactionheaders"
              :items="SellTransactionItems"
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
              <template v-slot:item.goldPrice="{ item }">
                <p>{{ formatNumber(item.goldPrice) }}</p>
              </template>
              <template v-slot:item.totalPrice="{ item }">
                <p>{{ formatNumber(item.totalPrice) }}</p>
              </template>
              <template v-slot:item.tradeType="{ item }">
                <div class="">
                  <v-chip
                    :text="
                      item.tradeType == 0
                        ? 'آنلاین'
                        : item.tradeType == 1
                        ? 'تلفنی'
                        : item.tradeType == 2
                        ? 'حضوری'
                        : 'حواله'
                    "
                    color="#78909C"
                    size="small"
                  ></v-chip>
                </div>
              </template>
            </v-data-table>
          </v-tabs-window-item>
        </v-tabs-window>
      </div>
    </v-container>

    <v-dialog
      max-width="500"
      v-model="buyModal"
      transition="dialog-bottom-transition"
    >
      <v-card class="trade-modal buy">
        <v-row>
          <v-col cols="12">
            <div class="d-flex justify-center">
              <h3>فاکتور خرید</h3>
            </div>
          </v-col>
          <v-col cols="12">
            <v-alert
              class="ma-0 text-center modal-alert"
              color="#00603a"
              text="مبلغ انتخابی شما طبق فاکتور زیر اصلاح شد"
              variant="tonal"
            ></v-alert>
          </v-col>
          <v-col cols="12" class="py-1 py-md-3 px-2 my-md-2">
            <div class="invoice-item">
              <p class="ma-0">مقدار طلا :</p>
              <p>{{ buyInfo.goldWeight }} گرم</p>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="py-1 py-md-3 px-2 my-md-2">
            <div class="invoice-item">
              <p class="ma-0">قیمت لحظه ای طلا :</p>
              <p>{{ formatNumber(goldPriceLive.buyPrice) }} تومان</p>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="py-1 py-md-3 px-2 my-md-2">
            <div class="invoice-item">
              <p class="ma-0">موجودی کیف پول :</p>
              <p>{{ formatNumber(paymentInfo.balance) }} تومان</p>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="py-1 py-md-3 px-2 my-md-2">
            <div class="invoice-item">
              <p class="ma-0">مبلغ قابل پرداخت :</p>
              <p>{{ buyInfo.goldprice }} تومان</p>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="py-1 py-md-3 px-2 my-md-2">
            <div class="invoice-item">
              <p class="ma-0">کارمزد :</p>
              <p>0 ٪</p>
            </div>
          </v-col>
          <v-col cols="12" class="my-0 my-md-2">
            <v-select
              v-model="paymentInfo.cartId"
              :loading="cartsLoading"
              label="انتخاب کارت"
              :items="carts"
              variant="underlined"
              item-title="cardNumber"
              item-value="id"
              :rules="[(v) => !!v || 'لطفا کارت خود را انتخاب کنید']"
            >
            </v-select>
          </v-col>
          <v-col cols="12">
            <v-alert
              class="ma-0 text-center modal-alert"
              color="error"
              variant="tonal"
            >
              پس از <span class="timer-color">{{ timer }}</span> ثانیه، فاکتور
              شما منقضی میشود
            </v-alert>
          </v-col>
          <v-col cols="12" md="6" class="py-1 py-md-2">
            <v-btn
              text="پرداخت مستقیم"
              class="pay-btn"
              color="#00603a"
              :loading="directPayLoading"
              :disabled="!paymentInfo.cartId"
              @click="CompleteBuy('direct')"
              block
            ></v-btn>
          </v-col>
          <v-col cols="12" md="6" class="py-1 py-md-2">
            <v-btn
              text="پرداخت از کیف پول"
              class="pay-btn"
              color="#00603a"
              variant="outlined"
              :loading="walletPayLoading"
              @click="CompleteBuy('wallet')"
              block
            ></v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>

    <v-dialog
      max-width="600"
      v-model="sellModal"
      class="trade-modal"
      transition="dialog-bottom-transition"
    >
      <v-card class="trade-modal sell">
        <v-row>
          <v-col cols="12">
            <div class="d-flex justify-center">
              <h3>فاکتور فروش</h3>
            </div>
          </v-col>
          <v-col cols="12">
            <v-alert
              class="ma-0 text-center modal-alert"
              color="error"
              text="مبلغ انتخابی شما طبق فاکتور زیر اصلاح شد"
              variant="tonal"
            ></v-alert>
          </v-col>
          <v-col cols="12" class="py-1 py-md-3 px-2 my-md-2">
            <div class="invoice-item">
              <p class="ma-0">مقدار طلا :</p>
              <p>{{ sellInfo.goldWeight }} گرم</p>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="py-1 py-md-3 px-2 my-md-2">
            <div class="invoice-item">
              <p class="ma-0">قیمت لحظه ای طلا :</p>
              <p>{{ formatNumber(goldPriceLive.buyPrice) }} تومان</p>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="py-1 py-md-3 px-2 my-md-2">
            <div class="invoice-item">
              <p class="ma-0">موجودی صندوق طلا :</p>
              <p>{{ userStore.user?.wallet?.goldWeight }} گرم</p>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="py-1 py-md-3 px-2 my-md-2">
            <div class="invoice-item">
              <p class="ma-0">مبلغ قابل دریافت :</p>
              <p>{{ formatNumber(sellInfo.goldPrice) }} تومان</p>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="py-1 py-md-3 px-2 my-md-2">
            <div class="invoice-item">
              <p class="ma-0">کارمزد :</p>
              <p>1 ٪</p>
            </div>
          </v-col>
          <v-col cols="12">
            <v-alert
              class="ma-0 text-center modal-alert"
              color="error"
              variant="tonal"
            >
              پس از <span class="timer-color">{{ timer }}</span> ثانیه، فاکتور
              شما منقضی میشود
            </v-alert>
          </v-col>
          <v-col cols="12" class="py-1 py-md-2">
            <v-btn
              text="تایید فروش"
              class="pay-btn"
              color="#930606"
              :loading="CompleteSellLoading"
              @click="CompleteSell()"
              block
            ></v-btn>
          </v-col>
        </v-row>
      </v-card>

      <!-- <v-card class="trade-modal">
        <v-alert
          class="ma-4 text-center"
          color="error"
          text="مبلغ انتخابی شما طبق فاکتور زیر اصلاح شد"
          variant="tonal"
        ></v-alert>
        <div class="buyModal-content py-5">
          <h3>فاکتور فروش</h3>
          <div class="wallet-badge my-2">
            <span class="pe-6">موجودی کیف پول</span>
            <span>{{ paymentSellInfo.goldWeight }} گرم</span>
          </div>
          <div
            class="d-flex justify-space-evenly align-center w-100 my-2 k-text"
          >
            <p class="pe-6">مقدار طلا</p>
            <p>{{ sellInfo.goldWeight }} گرم</p>
          </div>
          <div
            class="d-flex justify-space-evenly align-center w-100 my-2 k-text"
          >
            <p class="pe-6">مبلغ</p>
            <p>{{ sellInfo.goldPrice }} تومان</p>
          </div>
          <div class="d-flex justify-space-evenly align-center w-100 my-2">
            <span class="fee">کارمزد 1 درصد</span>
            <div class="d-flex">
              <span>{{ timer }}</span>
              <TimerIcon />
            </div>
          </div>
        </div>
        <div class="d-flex justify-space-around mt-2 mb-7">
          <v-btn
            text="تایید فروش"
            class="pay-btn"
            color="#9D7E3B"
            @click="CompleteSell()"
          ></v-btn>
        </div>
      </v-card> -->
    </v-dialog>

    <v-dialog
      max-width="500"
      v-model="transferModal"
      class="trade-modal"
      transition="dialog-bottom-transition"
    >
      <v-card class="trade-modal">
        <div class="transferModal-content py-5">
          <h3 class="my-4">فاکتور انتقال</h3>
          <v-row>
            <v-col cols="6" class="my-1 my-md-2 pa-1">
              <div class="d-flex align-center">
                <p>گرم انتقال :</p>
                <p>{{ TransferInvoice.goldWeight }}</p>
              </div>
            </v-col>
            <v-col cols="6" class="my-1 my-md-2 pa-1">
              <div class="d-flex align-center">
                <p>شماره فاکتور :</p>
                <p>{{ TransferInvoice.invoiceId }}</p>
              </div>
            </v-col>
            <v-col cols="6" class="my-1 my-md-2 pa-1">
              <div class="d-flex align-center">
                <p>تاریخ انتقال :</p>
                <p>{{ TransferInvoice.date }}</p>
              </div>
            </v-col>
            <v-col cols="6" class="my-1 my-md-2 pa-1">
              <div class="d-flex align-center">
                <p>زمان انتقال :</p>
                <p>{{ TransferInvoice.time }}</p>
              </div>
            </v-col>
            <v-divider></v-divider>
            <v-col cols="12">
              <div class="d-flex justify-start">
                <p class="font-weight-bold">اطلاعات انتقال دهنده</p>
              </div>
            </v-col>
            <v-col cols="6" class="my-1 my-md-2 pa-1">
              <div class="d-flex align-center">
                <p>نام :</p>
                <p>{{ TransferInvoice.sender.firstName }}</p>
              </div>
            </v-col>
            <v-col cols="6" class="my-1 my-md-2 pa-1">
              <div class="d-flex align-center">
                <p>نام خانوادگی :</p>
                <p>{{ TransferInvoice.sender.lastName }}</p>
              </div>
            </v-col>
            <v-col cols="6" class="my-1 my-md-2 pa-1">
              <div class="d-flex align-center">
                <p>کد ملی :</p>
                <p>{{ TransferInvoice.sender.nationalCode }}</p>
              </div>
            </v-col>
            <v-col cols="6" class="my-1 my-md-2 pa-1">
              <div class="d-flex align-center">
                <p>موجودی :</p>
                <p>{{ TransferInvoice.sender.goldWeight }} گرم</p>
              </div>
            </v-col>
            <v-divider></v-divider>
            <v-col cols="12">
              <div class="d-flex justify-start">
                <p class="font-weight-bold">اطلاعات گیرنده</p>
              </div>
            </v-col>
            <v-col cols="6" class="my-1 my-md-2 pa-1">
              <div class="d-flex align-center">
                <p>نام :</p>
                <p>{{ TransferInvoice.reciever.firstName }}</p>
              </div>
            </v-col>
            <v-col cols="6" class="my-1 my-md-2 pa-1">
              <div class="d-flex align-center">
                <p>نام خانوادگی :</p>
                <p>{{ TransferInvoice.reciever.lastName }}</p>
              </div>
            </v-col>
            <v-col cols="6" class="my-1 my-md-2 pa-1">
              <div class="d-flex align-center">
                <p>کد ملی :</p>
                <p>{{ TransferInvoice.reciever.nationalCode }}</p>
              </div>
            </v-col>
          </v-row>
        </div>
        <div class="d-flex justify-space-around mt-2 mb-7">
          <v-btn
            text="تایید انتقال"
            class="pay-btn"
            color="#9D7E3B"
            block
            :loading="transferOtpLoading"
            @click="transferOtp"
          ></v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog
      max-width="500"
      v-model="useGoldModal"
      class="trade-modal"
      transition="dialog-bottom-transition"
    >
      <v-card class="trade-modal">
        <div class="transferModal-content py-5">
          <h3 class="my-4">فاکتور استفاده از طلا</h3>
          <v-row>
            <v-col cols="6" class="my-1 my-md-2 pa-1">
              <div class="d-flex align-center">
                <p>گرم انتقال :</p>
                <p>{{ useGoldInvoiceDetail.goldWeight }}</p>
              </div>
            </v-col>
            <v-col cols="6" class="my-1 my-md-2 pa-1">
              <div class="d-flex align-center">
                <p>شماره فاکتور :</p>
                <p>{{ useGoldInvoiceDetail.invoiceId }}</p>
              </div>
            </v-col>
            <v-col cols="6" class="my-1 my-md-2 pa-1">
              <div class="d-flex align-center">
                <p>تاریخ ایجاد :</p>
                <p>{{ useGoldInvoiceDetail.date }}</p>
              </div>
            </v-col>
            <v-col cols="6" class="my-1 my-md-2 pa-1">
              <div class="d-flex align-center">
                <p>زمان ایجاد :</p>
                <p>{{ useGoldInvoiceDetail.time }}</p>
              </div>
            </v-col>
            <v-col cols="6" class="my-1 my-md-2 pa-1">
              <div class="d-flex align-center">
                <p>قیمت لحظه ای :</p>
                <p>{{ formatNumber(useGoldInvoiceDetail.goldPrice) }} تومان</p>
              </div>
            </v-col>
            <v-col cols="6" class="my-1 my-md-2 pa-1">
              <div class="d-flex align-center">
                <p>قیمت کل :</p>
                <p>{{ formatNumber(useGoldInvoiceDetail.totalPrice) }} تومان</p>
              </div>
            </v-col>
            <v-divider></v-divider>
            <v-col cols="12">
              <div class="d-flex justify-start">
                <p class="font-weight-bold">اطلاعات کاربر</p>
              </div>
            </v-col>
            <v-col cols="6" class="my-1 my-md-2 pa-1">
              <div class="d-flex align-center">
                <p>نام :</p>
                <p>{{ useGoldInvoiceDetail.user.firstName }}</p>
              </div>
            </v-col>
            <v-col cols="6" class="my-1 my-md-2 pa-1">
              <div class="d-flex align-center">
                <p>نام خانوادگی :</p>
                <p>{{ useGoldInvoiceDetail.user.lastName }}</p>
              </div>
            </v-col>
            <v-col cols="6" class="my-1 my-md-2 pa-1">
              <div class="d-flex align-center">
                <p>کد ملی :</p>
                <p>{{ useGoldInvoiceDetail.user.nationalCode }}</p>
              </div>
            </v-col>
            <v-divider></v-divider>
            <v-col cols="12">
              <div class="d-flex justify-start">
                <p class="font-weight-bold">اطلاعات فروشنده</p>
              </div>
            </v-col>
            <v-col cols="6" class="my-1 my-md-2 pa-1">
              <div class="d-flex align-center">
                <p>نام :</p>
                <p>{{ useGoldInvoiceDetail.seller.firstName }}</p>
              </div>
            </v-col>
            <v-col cols="6" class="my-1 my-md-2 pa-1">
              <div class="d-flex align-center">
                <p>نام خانوادگی :</p>
                <p>{{ useGoldInvoiceDetail.seller.lastName }}</p>
              </div>
            </v-col>
          </v-row>
        </div>
        <div class="d-flex justify-space-around mt-2 mb-7">
          <v-btn
            text="تایید استفاده"
            class="pay-btn"
            color="#9D7E3B"
            block
            :loading="useGoldOtpLoading"
            @click="useGoldOtp"
          ></v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog max-width="500" v-model="successModal" class="trade-modal">
      <v-card class="trade-modal">
        <div class="transferModal-content py-5">
          <h3>تایید فاکتور</h3>
          <img
            src="/src/assets/images/success-done.jpg"
            alt="تایید فاکتور"
            width="200"
            height="200"
          />
          <p>{{ doneText }}</p>
        </div>
      </v-card>
    </v-dialog>

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
  </div>
</template>

<script setup>
import PriceService from "@/service/auth/price";
import TradeService from "@/service/auth/trade";
import TimerIcon from "@/assets/images/icons/TimerIcon.vue";
import { onMounted, ref, watch, onUnmounted, computed, nextTick } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import { numberToWords } from "@persian-tools/persian-tools";
import AuthService from "@/service/auth/auth";
import { useUserStore } from "@/stores/user/userStore";

const userStore = useUserStore();
const route = useRoute();

const successModal = ref(false);
const transferModal = ref(false);
const walletUser = ref("");
const tab = ref(null);
const loading = ref(false);
const sellLoading = ref(false);
const CompleteSellLoading = ref(false);
const GoldPriceLoading = ref(false);
const transferOtpLoading = ref(false);
const verifyTransferOtpLoading = ref(false);
const verifyUseGoldLoading = ref(false);
const createTransferLoading = ref(false);
const useGoldOtpLoading = ref(false);
const cartsLoading = ref(false);
const branchLoading = ref(false);
const sellerLoading = ref(false);
const walletPayLoading = ref(false);
const directPayLoading = ref(false);
const useGoldCreateLoading = ref(false);
const errorMsg = ref("");
const successMsg = ref("");
const alertError = ref(false);
const alertSuccess = ref(false);
const buyModal = ref(false);
const sellModal = ref(false);
const isSwapped = ref(false);
const historyTab = ref(null);
const showOtp = ref(false);
const showUseGoldOtp = ref(false);
const Transfertimer = ref(120);
const UseGoldtimer = ref(120);
const doneText = ref("فاکتور شما با موفقیت ثبت شد");
const transfer = ref({
  goldWeight: "",
  nationalCode: "",
});
const useGold = ref({
  goldWeight: "",
  branchId: "",
  sellerId: "",
});
const useGoldInvoiceDetail = ref({});

const branches = ref([
  { label: "آنلاین", value: "0" },
  { label: "کوچصفهان", value: "1" },
]);
const useGoldModal = ref(false);
const seller = ref([]);
const otp = ref("");
const useGoldOtpInput = ref("");
const carts = ref([]);
const goldPriceLive = ref({
  sellPrice: "",
  buyPrice: "",
  change: "",
});
const timer = ref(30);
const TransactionLoading = ref(false);
const SellTransactionItems = ref();
const BuyTransactionItems = ref();
const Transactionheaders = ref([
  {
    title: "تاریخ",
    key: "date",
  },
  {
    title: "روش ثبت",
    key: "tradeType",
  },
  {
    title: "زمان",
    key: "time",
  },
  {
    title: "وزن طلا(گرم)",
    key: "goldWeight",
  },
  {
    title: "قیمت نهایی",
    key: "totalPrice",
  },
  {
    title: "قیمت طلا در لحظه",
    key: "goldPrice",
  },
  {
    title: "وضعیت",
    key: "status",
  },
]);
const filter = ref([
  {
    text: "همه",
    value: "",
  },
  {
    text: "موفق",
    value: "success",
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
let interval = ref(null);
const invoice = ref({
  invoiceId: "",
  paymentUrl: "",
});
let timerInterval = null;
let usegoldTimerInterval = null;
const TransferInvoice = ref({
  id: "",
  time: "",
  date: "",
  goldWeight: "",
  invoiceId: "",
  reciever: {
    firstName: "",
    lastName: "",
    nationalCode: "",
  },
  sender: {
    firstName: "",
    lastName: "",
    nationalCode: "",
    goldWeight: "",
  },
});
const buyInfo = ref({
  goldprice: "",
  goldWeight: "",
});
const sellInfo = ref({
  goldPrice: "",
  goldWeight: "",
});
const paymentInfo = ref({
  invoiceId: "",
  isFromWallet: "",
  balance: 0,
  cartId: null,
});

const paymentSellInfo = ref({
  invoiceId: "",
  isFromWallet: "",
  balance: 0,
  goldWeight: 0,
});

const payInfo = ref({
  type: "",
  totalPrice: "",
  goldPrice: "",
  goldWeight: "",
});
const paySellInfo = ref({
  type: "",
  totalPrice: "",
  goldPrice: "",
  goldWeight: "",
});

const filterTransaction = ref({
  status: "",
});

const verifyDetail = ref({});

const weightRules = [
  (v) => !!v || "مقدار ورودی نمی‌تواند خالی باشد",
  (v) => /^\d+(\.\d{1,3})?$/.test(v) || "فقط عدد مجاز است و حداکثر 3 رقم اعشار",
];

const nationalCodeRules = [
  (v) => !!v || "کد ملی الزامی است",
  (v) => /^\d{10}$/.test(v) || "کد ملی باید ۱۰ رقم باشد",
  (v) => {
    if (!/^\d{10}$/.test(v)) return true;

    const check = +v[9];
    const sum =
      v
        .split("")
        .slice(0, 9)
        .reduce((acc, x, i) => acc + +x * (10 - i), 0) % 11;
    return (
      (sum < 2 && check === sum) ||
      (sum >= 2 && check + sum === 11) ||
      "کد ملی نامعتبر است"
    );
  },
];

const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const BuyAmountInWords = computed(() => {
  if (buyInfo.value.goldprice && buyInfo.value.goldprice != "") {
    const amountWithoutCommas = buyInfo.value.goldprice
      .toString()
      .replace(/,/g, "");
    const amountInRial = parseInt(amountWithoutCommas, 10);

    if (amountInRial < 1) {
      return "کمتر از یک تومان";
    }

    return numberToWords(Math.floor(amountInRial)) + " تومان";
  }
  return "";
});

const SellAmountInWords = computed(() => {
  if (sellInfo.value.goldPrice && sellInfo.value.goldPrice != "") {
    const amountWithoutCommas = sellInfo.value.goldPrice
      .toString()
      .replace(/,/g, "");
    const amountInRial = parseInt(amountWithoutCommas, 10);

    if (amountInRial < 1) {
      return "کمتر از یک تومان";
    }

    return numberToWords(Math.floor(amountInRial)) + " تومان";
  }
  return "";
});

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

const formatNumberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const removeCommas = (str) => {
  return str.replace(/,/g, "");
};

const buyGoldpriceConvert = (e) => {
  // buyInfo.value.goldprice = buyInfo.value.goldprice.replace(/[^0-9]/g, "");
  // buyInfo.value.goldWeight = (
  //   buyInfo.value.goldprice / goldPriceLive.value.buyPrice
  // ).toFixed(3);

  let cursorPosition;

  if (!e?.target?.selectionStart) {
    cursorPosition = e.toString().length;
  } else {
    cursorPosition = e.target.selectionStart;
  }

  const originalLength = buyInfo.value.goldprice.length;

  const rawValue = removeCommas(buyInfo.value.goldprice).replace(/[^0-9]/g, "");
  const numericValue = parseInt(rawValue || 0);

  //////////////////////////////////////
  let first = (numericValue / goldPriceLive.value.buyPrice).toFixed(5);

  // let second =  (
  //   numericValue / goldPriceLive.value.buyPrice
  // ).toFixed(3);

  let main = first.split("");
  let main2 = `${main[0]}${main[1]}${main[2]}${main[3]}${main[4]}`;
  ///////////////////////////////////////

  buyInfo.value.goldWeight = main2;

  // buyInfo.value.goldWeight = main2;

  // let newNum = +main2 * goldPriceLive.value.buyPrice

  const formattedValue = formatNumberWithCommas(numericValue);

  buyInfo.value.goldprice = formattedValue;

  // nextTick(() => {
  //   const newLength = formattedValue.length;
  //   const offset = newLength - originalLength;
  //   e.target.setSelectionRange(
  //     cursorPosition + offset,
  //     cursorPosition + offset
  //   );
  // });
};

const buyGoldweightConvert = () => {
  buyInfo.value.goldWeight = buyInfo.value.goldWeight.replace(/[^0-9.]/g, "");
  const parts = buyInfo.value.goldWeight.split(".");
  if (parts.length > 1) {
    buyInfo.value.goldWeight = parts[0] + "." + parts.slice(1).join("");
  }

  if (parts.length > 1 && parts[1].length > 2) {
    buyInfo.value.goldWeight = parts[0] + "." + parts[1].slice(0, 3);
  }

  buyInfo.value.goldprice = parseInt(
    buyInfo.value.goldWeight * goldPriceLive.value.buyPrice
  );

  const calculatedPrice = parseInt(
    buyInfo.value.goldWeight * goldPriceLive.value.buyPrice
  );
  buyInfo.value.goldprice = formatNumberWithCommas(calculatedPrice);
};

const sellGoldpriceConvert = (e) => {
  // sellInfo.value.goldPrice = sellInfo.value.goldPrice.replace(/[^0-9]/g, "");
  // sellInfo.value.goldWeight = (
  //   sellInfo.value.goldPrice / goldPriceLive.value.sellPrice
  // ).toFixed(3);

  const cursorPosition = e.target.selectionStart;
  const originalLength = sellInfo.value.goldPrice.length;

  const rawValue = removeCommas(sellInfo.value.goldPrice).replace(
    /[^0-9]/g,
    ""
  );
  const numericValue = parseInt(rawValue || 0);
  let first = (numericValue / goldPriceLive.value.buyPrice).toFixed(5);

  let secondFirst = first.split("");
  let mainWeight = `${secondFirst[0]}${secondFirst[1]}${secondFirst[2]}${secondFirst[3]}${secondFirst[4]}`;
  // sellInfo.value.goldWeight = (
  //   numericValue / goldPriceLive.value.sellPrice
  // ).toFixed(3);
  sellInfo.value.goldWeight = mainWeight;

  const formattedValue = formatNumberWithCommas(numericValue);
  sellInfo.value.goldPrice = formattedValue;

  nextTick(() => {
    const newLength = formattedValue.length;
    const offset = newLength - originalLength;
    e.target.setSelectionRange(
      cursorPosition + offset,
      cursorPosition + offset
    );
  });
};

const sellGoldweightConvert = () => {
  sellInfo.value.goldWeight = sellInfo.value.goldWeight.replace(/[^0-9.]/g, "");
  const parts = sellInfo.value.goldWeight.split(".");
  if (parts.length > 1) {
    sellInfo.value.goldWeight = parts[0] + "." + parts.slice(1).join("");
  }

  if (parts.length > 1 && parts[1].length > 2) {
    sellInfo.value.goldWeight = parts[0] + "." + parts[1].slice(0, 3);
  }

  sellInfo.value.goldPrice = parseInt(
    sellInfo.value.goldWeight * goldPriceLive.value.sellPrice
  );

  const calculatedPrice = parseInt(
    sellInfo.value.goldWeight * goldPriceLive.value.sellPrice
  );
  sellInfo.value.goldPrice = formatNumberWithCommas(calculatedPrice);
};

const transferGoldweight = () => {
  transfer.value.goldWeight = transfer.value.goldWeight.replace(/[^0-9.]/g, "");
  const parts = transfer.value.goldWeight.split(".");
  if (parts.length > 1) {
    parts[1] = parts[1].slice(0, 3);
    transfer.value.goldWeight = parts[0] + "." + parts[1];
  }
};

const useGoldweight = () => {
  useGold.value.goldWeight = useGold.value.goldWeight.replace(/[^0-9.]/g, "");
  const parts = useGold.value.goldWeight.split(".");
  if (parts.length > 1) {
    parts[1] = parts[1].slice(0, 3);
    useGold.value.goldWeight = parts[0] + "." + parts[1];
  }
};

const swapFields = () => {
  isSwapped.value = !isSwapped.value;
};

const validateWeight = [
  (v) => !!v || "مقدار ورودی نمی‌تواند خالی باشد",
  (v) => /^\d+(\.\d{1,3})?$/.test(v) || "فقط عدد مجاز است و حداکثر 4 رقم اعشار",
];

const CreateBuy = async () => {
  try {
    loading.value = true;
    payInfo.value.type = "buy";
    payInfo.value.totalPrice = buyInfo.value.goldprice;
    payInfo.value.goldWeight = buyInfo.value.goldWeight;
    payInfo.value.goldPrice = goldPriceLive.value.buyPrice;
    const response = await TradeService.createInvoice(payInfo.value);
    paymentInfo.value.invoiceId = response.transactionId;
    paymentInfo.value.balance = response.wallet.balance;
    buyModal.value = true;
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
    }, 5000);
  } finally {
    loading.value = false;
  }
};

const CompleteBuy = async (paymentMethod) => {
  try {
    if (paymentMethod == "wallet") {
      walletPayLoading.value = true;
      paymentInfo.value.isFromWallet = true;
    } else {
      directPayLoading.value = true;
      paymentInfo.value.isFromWallet = false;
    }
    // paymentInfo.value.amount = buyInfo.value.goldprice;
    const response = await TradeService.complateTransaction(paymentInfo.value);
    if (response.isFromWallet == true) {
      buyModal.value = false;
      doneText.value = response.msg;
      successModal.value = true;
      setTimeout(() => {
        successModal.value = false;
        router.replace("/");
      }, 5000);
    } else {
      invoice.value.paymentUrl = response.paymentUrl;
      invoice.value.invoiceId = response.invoiceId;
      window.location.href = invoice.value.paymentUrl;
    }
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
    }, 5000);
  } finally {
    walletPayLoading.value = false;
    directPayLoading.value = false;
    buyTransaction();
  }
};

const CreateSell = async () => {
  try {
    sellLoading.value = true;
    paySellInfo.value.type = "sell";
    paySellInfo.value.totalPrice = sellInfo.value.goldPrice;
    paySellInfo.value.goldWeight = sellInfo.value.goldWeight;
    paySellInfo.value.goldPrice = goldPriceLive.value.sellPrice;
    const response = await TradeService.createSellInvoice(paySellInfo.value);
    paymentSellInfo.value.invoiceId = response.transactionId;
    paymentSellInfo.value.balance = response.wallet.balance;
    paymentSellInfo.value.goldWeight = response.wallet.goldWeight;
    sellModal.value = true;
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
    }, 5000);
  } finally {
    sellLoading.value = false;
  }
};

const CompleteSell = async () => {
  try {
    CompleteSellLoading.value = true;
    // paymentSellInfo.value.amount = sellInfo.value.goldPrice;
    paymentSellInfo.value.fee = 1;
    const response = await TradeService.complateSellTransaction(
      paymentSellInfo.value
    );
    userStore.GetUser();
    sellModal.value = false;
    doneText.value = response.msg || "طلای شما با موفقیت به فروش رسید";
    successModal.value = true;
    setTimeout(() => {
      successModal.value = false;
    }, 5000);
    // successMsg.value = "طلای شما با موفقیت به فروش رسید";
    // alertSuccess.value = true;
    // userStore.GetUser();
    // setTimeout(() => {
    //   alertSuccess.value = false;
    // }, 5000);
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
    }, 5000);
  } finally {
    CompleteSellLoading.value = false;
    sellTransaction();
  }
};

const filterChange = (filterValue) => {
  filterTransaction.value.status = filterValue.value;
  sellTransaction();
  buyTransaction();
};

const sellTransaction = async () => {
  try {
    TransactionLoading.value = true;
    const response = await TradeService.GoldBoxSellTransactions(
      filterTransaction.value
    );
    SellTransactionItems.value = response;
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

const buyTransaction = async () => {
  try {
    TransactionLoading.value = true;
    const response = await TradeService.GoldBoxBuyTransactions(
      filterTransaction.value
    );
    BuyTransactionItems.value = response;
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

const VerifyTransaction = async (zarinpal) => {
  try {
    const response = await TradeService.VerifyTransaction(zarinpal);
    verifyDetail.value = response;
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

const validTransfer = computed(() => {
  return (
    weightRules.every((rule) => rule(transfer.value.goldWeight) === true) &&
    nationalCodeRules.every(
      (rule) => rule(transfer.value.nationalCode) === true
    )
  );
});

const createTransfer = async () => {
  try {
    createTransferLoading.value = true;
    const response = await TradeService.CreateTransfer(transfer.value);
    transferModal.value = true;
    TransferInvoice.value = response.data;
    TransferInvoice.value.id = response.data.id;
    TransferInvoice.value.invoiceId = response.data.invoiceId;
    TransferInvoice.value.date = response.data.date;
    TransferInvoice.value.time = response.data.time;
    TransferInvoice.value.sender.firstName = response.data.sender.firstName;
    TransferInvoice.value.sender.lastName = response.data.sender.lastName;
    TransferInvoice.value.sender.nationalCode =
      response.data.sender.nationalCode;
    TransferInvoice.value.sender.goldWeight =
      response.data.sender.wallet.goldWeight;
    TransferInvoice.value.reciever.firstName = response.data.reciever.firstName;
    TransferInvoice.value.reciever.lastName = response.data.reciever.lastName;
    TransferInvoice.value.reciever.nationalCode =
      response.data.reciever.nationalCode;
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
    }, 5000);
  } finally {
    createTransferLoading.value = false;
  }
};

const transferOtp = async () => {
  try {
    transferOtpLoading.value = true;
    const response = await TradeService.TransferOtp(TransferInvoice.value.id);
    transferModal.value = false;
    showOtp.value = true;
    startTransferTimer();
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
    }, 5000);
  } finally {
    transferOtpLoading.value = false;
  }
};

const VerifyTransferOtp = async () => {
  try {
    verifyTransferOtpLoading.value = true;
    const response = await TradeService.VerifyTransferOtp(
      otp.value,
      TransferInvoice.value.id
    );
    showOtp.value = false;
    transfer.value.nationalCode = null;
    transfer.value.goldWeight = null;
    userStore.GetUser();
    doneText.value = response.msg;
    successModal.value = true;
    setTimeout(() => {
      successModal.value = false;
    }, 5000);
    // successMsg.value = response.msg;
    // alertSuccess.value = true;
    // setTimeout(() => {
    //   alertSuccess.value = false;
    // }, 5000);
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
    }, 5000);
  } finally {
    verifyTransferOtpLoading.value = false;
  }
};

const startTransferTimer = () => {
  Transfertimer.value = 120;
  if (timerInterval) {
    clearInterval(timerInterval);
  }

  timerInterval = setInterval(() => {
    Transfertimer.value--;
    if (Transfertimer.value <= 0) {
      clearInterval(timerInterval);
      if (showOtp.value) {
        showOtp.value = false;
        transfer.value.nationalCode = null;
        transfer.value.goldWeight = null;
        errorMsg.value = "زمان تایید انتقال به پایان رسیده است";
        alertError.value = true;
        setTimeout(() => {
          alertError.value = false;
        }, 5000);
      }
    }
  }, 1000);
};

const startUsegoldTimer = () => {
  UseGoldtimer.value = 120;
  if (usegoldTimerInterval) {
    clearInterval(usegoldTimerInterval);
  }

  usegoldTimerInterval = setInterval(() => {
    UseGoldtimer.value--;
    if (UseGoldtimer.value <= 0) {
      clearInterval(usegoldTimerInterval);
      if (showUseGoldOtp.value) {
        showUseGoldOtp.value = false;
        useGold.value.branchId = null;
        useGold.value.sellerId = null;
        useGold.value.goldWeight = null;
        errorMsg.value = "زمان استفاده به پایان رسیده است";
        alertError.value = true;
        setTimeout(() => {
          alertError.value = false;
        }, 5000);
      }
    }
  }, 1000);
};

const BranchRules = [(v) => !!v || "یک مورد را انتخاب کنید!"];

const validUseGold = computed(() => {
  return (
    useGold.value.goldWeight &&
    !weightRules.some((rule) => rule(useGold.value.goldWeight) !== true) &&
    useGold.value.branchId &&
    !BranchRules.some((rule) => rule(useGold.value.branchId) !== true) &&
    (useGold.value.sellerId || true) &&
    !BranchRules.some((rule) => rule(useGold.value.sellerId) !== true)
  );
});

const GetBranches = async () => {
  try {
    branchLoading.value = true;
    const response = await TradeService.GetBranches();
    branches.value = response.data;
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
    }, 5000);
  } finally {
    branchLoading.value = false;
  }
};

const defineSellers = async (id) => {
  try {
    sellerLoading.value = true;
    const response = await TradeService.GetSellers(id);
    seller.value = response.data;
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
    }, 5000);
  } finally {
    sellerLoading.value = false;
  }
};

const createUseGold = async () => {
  try {
    useGoldCreateLoading.value = true;
    const response = await TradeService.CreateUseGold(useGold.value);
    useGoldInvoiceDetail.value = response.data;
    useGoldModal.value = true;
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
    }, 5000);
  } finally {
    useGoldCreateLoading.value = false;
  }
};

const useGoldOtp = async () => {
  try {
    useGoldOtpLoading.value = true;
    const response = await TradeService.UseGoldOtp(
      useGoldInvoiceDetail.value.id
    );
    useGoldModal.value = false;
    showUseGoldOtp.value = true;
    startUsegoldTimer();
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
    }, 5000);
  } finally {
    useGoldOtpLoading.value = false;
  }
};

const verifyUseGold = async () => {
  try {
    verifyUseGoldLoading.value = true;
    const response = await TradeService.VerifyUseGold(
      useGoldOtpInput.value,
      useGoldInvoiceDetail.value.id
    );
    showUseGoldOtp.value = false;
    useGold.value.goldWeight = null;
    useGold.value.sellerId = null;
    useGold.value.branchId = null;
    userStore.GetUser();
    doneText.value = response.msg;
    successModal.value = true;
    setTimeout(() => {
      successModal.value = false;
    }, 5000);
    // successMsg.value = response.msg;
    // alertSuccess.value = true;
    // setTimeout(() => {
    //   alertSuccess.value = false;
    // }, 5000);
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
    }, 5000);
  } finally {
    verifyUseGoldLoading.value = false;
  }
};

const allWalletInBuy = () => {
  buyInfo.value.goldprice = userStore.user?.wallet?.balance;
  buyGoldpriceConvert(buyInfo.value.goldprice);
};

const allWalletInSell = () => {
  sellInfo.value.goldWeight = userStore.user?.wallet?.goldWeight;
  sellGoldweightConvert();
};

onMounted(() => {
  GetGoldPrice();
  buyTransaction();
  sellTransaction();
  getCarts();
  GetBranches();
  userStore.GetUser();
  setInterval(() => {
    GetGoldPrice();
  }, 30000);

  walletUser.value = JSON.parse(localStorage.getItem("user"));

  const zarinpal = ref({
    authority: route.query.Authority,
    status: route.query.Status,
  });

  if (zarinpal.value.authority && zarinpal.value.status) {
    VerifyTransaction(zarinpal.value);
    if (zarinpal.value.status === "OK") {
      router.push({ name: "success", state: verifyDetail.value });
    } else {
      router.push({ name: "failed", state: verifyDetail.value });
    }
  }
});

watch(buyModal, (newVal) => {
  if (newVal) {
    timer.value = 30;
    startTimer();
  } else {
    stopTimer();
  }
});

watch(sellModal, (newVal) => {
  if (newVal) {
    timer.value = 30;
    startTimer();
  } else {
    stopTimer();
  }
});

const startTimer = () => {
  stopTimer();
  interval = setInterval(() => {
    if (timer.value > 0) {
      timer.value--;
    } else {
      stopTimer();
      buyModal.value = false;
      sellModal.value = false;
      paymentInfo.value.cartId = null;
    }
  }, 1000);
};

const stopTimer = () => {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
};

onUnmounted(() => {
  stopTimer();
});
</script>

<style scoped>
.goldbox-section {
  box-shadow: 0px 0px 9px 0px rgba(217, 198, 166, 0.4);
  border-radius: 16px;
  padding: 1rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.goldbox-section.buy {
  background-color: rgba(72, 189, 142, 0.1);
  border: 1px solid #00603a;
}

.goldbox-section.sell {
  background-color: rgba(189, 76, 72, 0.1);
  border: 1px solid #930606;
}

.tab-header {
  border-radius: 10px;
  box-shadow: 0px 0px 9px 0px rgba(217, 198, 166, 0.4);
}

.tab-header button {
  border-radius: 0 !important;
  font-size: 18px;
  letter-spacing: 0 !important;
}

.tab-header button.v-tab-item--selected {
  border-bottom: 2px solid #00603a !important;
}

.title {
  font-size: 36px;
  font-weight: 700;
  color: rgba(0, 96, 58, 1);
  text-align: center;
  margin-top: 0.2rem;
}

.subtitle {
  font-size: 24px;
  font-weight: 300;
  color: rgba(0, 96, 58, 1);
  margin: 0.8rem 0;
  text-align: center;
}

.change-btn {
  border-radius: 100% !important;
  transform: rotate(90deg);
}

.transition-field {
  transition: transform 0.3s ease-in-out, opacity 0.3s;
}

.live-price-box {
  margin: 0.5rem 0;
  background-color: #fff;
  border-radius: 10px;
  padding: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.wallet-box {
  margin: 0.5rem 0;
  background-color: rgba(72, 189, 142, 0.1);
  border-radius: 10px;
  border: 1px solid #00603a;
  padding: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.Treasury-box {
  margin: 0.5rem 0;
  background-color: rgba(72, 189, 142, 0.1);
  border-radius: 10px;
  border: 1px solid #00603a;
  padding: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.Treasury-box.sell {
  background-color: rgba(189, 76, 72, 0.1);
  border: 1px solid #930606;
}

.wallet-box.sell {
  background-color: rgba(189, 76, 72, 0.1);
  border: 1px solid #930606;
}

.live-tag {
  background-color: rgba(147, 6, 6, 1);
  color: #fff;
  box-shadow: 0px 2px 4px 0px rgba(154, 154, 154, 0.62);
  border-radius: 12px;
  font-size: 10px;
  padding: 3px 8px;
  position: absolute;
  top: -10px;
  left: -10px;
}

@keyframes fadeInOut {
  0%,
  80% {
    opacity: 1;
  }
  90% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.fade-badge {
  animation: fadeInOut 5s infinite ease-in-out;
}

.buyModal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
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

.wallet-badge {
  background-color: rgba(56, 120, 93, 1);
  color: #fff;
  border-radius: 8px;
  padding: 0.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
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

.trade-history {
  margin-top: 1rem;
  background-color: #fff;
  box-shadow: 4px 4px 12px 0px rgba(212, 205, 191, 0.4);
  backdrop-filter: blur(12px);
  border-radius: 16px;
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

.transaction-filter {
  max-width: 15rem;
}

.trade-modal {
  border-radius: 10px !important;
  padding: 2rem;
}

.trade-modal.buy p {
  font-size: 13px;
}

.trade-modal.buy .invoice-item {
  display: flex;
  justify-content: space-between;
  padding: 0.4rem 0.2rem;
  border-bottom: 1px solid rgba(0, 96, 58, 0.3);
}

.trade-modal.sell p {
  font-size: 13px;
}

.trade-modal.sell .invoice-item {
  display: flex;
  justify-content: space-between;
  padding: 0.4rem 0.2rem;
  border-bottom: 1px solid rgb(147, 6, 6, 0.3);
}

.price-in-word {
  font-size: 13px;
  color: #696969;
}

.goldbox-section.transfer {
  min-height: 20rem;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(175, 139, 74, 0.1);
  border: 1px solid #af8b4a;
  padding: 1rem;
}

.otp-input {
  direction: ltr;
}

.transfer-otp {
  font-size: 12px;
  color: #696969;
  margin-top: 0.5rem;
}

.goldbox-section.use {
  min-height: 20rem;
  justify-content: space-between;
  background-color: #fff;
  border: 1px solid #78909c;
  padding: 1rem;
}

.alert-gold {
  background-color: rgba(175, 139, 74, 0.1);
  color: #af8b4a;
}

.timer-color {
  font-weight: bold;
}

.modal-alert {
  padding: 0.5rem;
  font-size: 13px;
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
}

.allWallet-text.buy {
  background-color: rgba(0, 147, 88, 0.3);
}

.allWallet-text.sell {
  background-color: rgba(189, 76, 72, 0.1);
}
</style>
