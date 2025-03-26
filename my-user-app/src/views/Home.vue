<template>
    <div class="home-container">
      <!-- Hình ảnh lấp đầy màn hình -->
      <div class="hero-image">
        <img src="E:\BICHHUYEN\QLMS\images\nen2.jpg" alt="Hero Image" class="full-screen-image" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Home',
  };
  </script>
  
  <style scoped>
  /* Toàn bộ trang */
  .home-container {
    margin-top: 50px;
    /* position: relative; */
    height: 100vh; /* Lấp đầy màn hình */
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  /* Hình ảnh */
  .hero-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  /* Ảnh lấp đầy màn hình */
  .full-screen-image {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Đảm bảo ảnh lấp đầy mà không bị méo */
  }
  </style>
  