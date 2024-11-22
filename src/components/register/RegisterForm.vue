<script setup>
import BaseInput from '../BaseInput.vue'

const props = defineProps({
  values: Object,
  errors: Object
})
</script>

<template>
  <div class="space-y-6">
    <!-- Name Fields -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <BaseInput
        label="First Name"
        v-model="values.firstName"
        :error="errors.firstName"
        placeholder="Enter your first name"
      />
      <BaseInput
        label="Last Name"
        v-model="values.lastName"
        :error="errors.lastName"
        placeholder="Enter your last name"
      />
    </div>

    <!-- Contact Information -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <BaseInput
        label="Email Address"
        type="email"
        v-model="values.email"
        :error="errors.email"
        placeholder="you@example.com"
      />
      <BaseInput
        label="Phone Number"
        type="tel"
        v-model="values.phone"
        :error="errors.phone"
        placeholder="Enter your phone number"
      />
    </div>

    <!-- Security -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <BaseInput
        label="Password"
        type="password"
        v-model="values.password"
        :error="errors.password"
        placeholder="Create a strong password"
      />
      <BaseInput
        label="Date of Birth"
        type="date"
        v-model="values.dateOfBirth"
        :error="errors.dateOfBirth"
      />
    </div>

    <!-- Additional Information -->
    <div class="grid grid-cols-1 gap-6">
      <BaseInput
        label="National ID"
        v-model="values.nationalIdentificationNumber"
        :error="errors.nationalIdentificationNumber"
        placeholder="Enter your National ID number"
      />
      <BaseInput
        label="Address"
        v-model="values.address"
        :error="errors.address"
        placeholder="Enter your address"
      />
      <BaseInput
        label="District"
        v-model="values.districts"
        :error="errors.districts"
        placeholder="Enter your district"
      />
    </div>
  </div>
</template>