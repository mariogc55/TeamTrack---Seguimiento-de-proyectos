<template>
  <div class="ui-input">
    <input 
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
  placeholder: String
});
</script>

<style scoped>
.ui-input {
  width: 100%;
}

.ui-input input {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #333;
  background: #1f1f1f;
  color: #fff;
  font-size: 15px;
}

.ui-input input::placeholder {
  color: #aaa;
}

.ui-input input:focus {
  border-color: #800020;
  outline: none;
}
</style>
