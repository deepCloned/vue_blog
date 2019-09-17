<template>
  <section class="not-found">
    <div class="wrap">
      <h1>404</h1>
      <p class="desc">抱歉！您访问的页面不存在！</p>
      <router-link to="/" tag="p" class="return">返回首页</router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style lang="scss" scoped>
.not-found{
  width: 100%;
  .wrap{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 350px;
    >h1{
      font-size: 100px;
      color: #f50;
    }
    .desc{
      font-size: 14px;
      color: #666;
    }
    .return{
      margin-top: 4px;
      color: #333;
      &:hover{
        cursor: pointer;
        color: #f50;
      }
    }
  }
}
</style>
