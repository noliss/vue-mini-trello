<template lang="pug">
  #app
    nav.navigation
      router-link.navigation__link(to="/") Главная страница
    <router-view />
</template>

<style lang="scss" scoped>
  .navigation {
    text-align: center;
    padding: 10px;
    background: #262626;

    &__link {
      text-decoration: none;
      font-size: 18px;
      color: #ffffff;
    }
  }
</style>