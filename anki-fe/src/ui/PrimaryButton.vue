<template>
  <button class="primaryButton">
    <slot></slot>
  </button>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.primaryButton {
  cursor: pointer;
  user-select: none;
  padding: 10px;
  border: 1px solid var(--gray-600);
  border-radius: 5px;
  width: max-content;
  background-color: var(--body-color);
  font-size: 18px;
  color: var(--gray-800);

  &:hover {
    transition: 0.3s;
    background-color: var(--gray-600);
    color: white;
  }
}
</style>
