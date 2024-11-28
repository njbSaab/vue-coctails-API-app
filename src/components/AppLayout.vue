<template>
    <div class="root">
      <div :style="{ backgroundImage: `url('${imgUrl}')` }" class="img-container"></div>
      <div class="main flex-1 px-4">
          <el-button class="btn-accent bg-accent mt-4 absolute right-12 top-2" style="display: block; margin-left: auto;" type="default">Get random cocktail</el-button>
        <slot />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AppLayout',
    props: {
      imgUrl: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  @use "@/assets/styles/main.scss" as *;
  
  .root {
    display: flex;
    min-height: 100dvh;
  
    .img-container {
      width: 50%;
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
  </style>