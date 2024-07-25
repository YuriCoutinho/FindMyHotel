<template>
  <form @submit.prevent="submitForm" class="space-y-6">
    <div class="form-group">
      <label for="firstName" class="block text-sm font-medium text-gray-700">Nome:</label>
      <InputText
        id="firstName"
        v-model="firstName"
        class="w-full px-3 py-2 border border-gray-300 rounded-md"
        required
      />
    </div>
    <div class="form-group">
      <label for="lastName" class="block text-sm font-medium text-gray-700">Sobrenome:</label>
      <InputText
        id="lastName"
        v-model="lastName"
        class="w-full px-3 py-2 border border-gray-300 rounded-md"
        required
      />
    </div>
    <div class="form-group">
      <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
      <InputText
        id="email"
        v-model="email"
        class="w-full px-3 py-2 border border-gray-300 rounded-md"
        required
      />
    </div>
    <div class="form-group">
      <label for="number" class="block text-sm font-medium text-gray-700">Número do celular:</label>
      <InputMask
        id="number"
        v-model="phoneNumber"
        mask="(99) 99999-9999"
        class="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
    </div>
    <div class="form-group">
      <label for="documentNumber" class="block text-sm font-medium text-gray-700">CPF:</label>
      <InputMask
        id="documentNumber"
        v-model="documentNumber"
        mask="999.999.999-99"
        class="w-full px-3 py-2 border border-gray-300 rounded-md"
        required
      />
    </div>
    <div class="form-group">
      <label for="payment" class="block text-sm font-medium text-gray-700"
        >Cartão de Crédito:</label
      >
      <InputMask
        id="payment"
        v-model="payment"
        mask="9999 9999 9999 9999"
        class="w-full px-3 py-2 border border-gray-300 rounded-md"
        required
      />
    </div>
    <div class="form-group">
      <label for="cvv" class="block text-sm font-medium text-gray-700">CVV:</label>
      <InputMask
        id="cvv"
        v-model="cvv"
        mask="999"
        class="w-full px-3 py-2 border border-gray-300 rounded-md"
        required
      />
    </div>
    <Button
      label="Reservar"
      type="submit"
      class="w-full text-white font-medium py-2 rounded-md bg-emerald-500 hover:bg-emerald-700 active:bg-emerald-900"
    />
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import InputMask from 'primevue/inputmask'
import Button from 'primevue/button'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const phoneNumber = ref('')
const documentNumber = ref('')
const payment = ref('')
const cvv = ref('')

const emits = defineEmits(['reserve'])

const submitForm = () => {
  const reservationDetails = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    phoneNumber: phoneNumber.value,
    documentNumber: documentNumber.value,
    payment: payment.value,
    cvv: cvv.value
  }

  emits('reserve', reservationDetails)
}
</script>
