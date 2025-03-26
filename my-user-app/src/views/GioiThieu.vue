<template>
    <div class="about-container">
      <div class="content">
        <!-- Thư viện của chúng tôi -->
        <section class="section">
          <h2 class="title">📚 BOOKSTREAM</h2>
          <p class="section-description">
            Thư viện của chúng tôi cung cấp một kho sách đa dạng và phong phú với
            các thể loại sách từ học thuật, khoa học, văn học, và nhiều thể loại
            khác. Mỗi người dùng có thể dễ dàng mượn sách qua hệ thống trực tuyến
            mà không cần phải đến thư viện.
          </p>
          <img
            src="https://via.placeholder.com/800x400"
            alt="Thư viện"
            class="library-image"
          />
        </section>
  
        <!-- Mục tiêu -->
        <section class="section">
          <h2 class="title">🎯 Mục Tiêu</h2>
          <p class="section-description">
            Mục tiêu của hệ thống là giúp người dùng tìm kiếm, mượn và trả sách
            một cách dễ dàng và nhanh chóng. Chúng tôi cung cấp giao diện thân
            thiện với người dùng, hỗ trợ tìm kiếm sách theo tên, tác giả, và thể
            loại.
          </p>
        </section>
  
        <!-- Tiện ích nổi bật -->
        <section class="section">
          <h2 class="title">✨ Tiện Ích Nổi Bật</h2>
          <ul class="features-list">
            <li>📖 Quản lý danh sách sách mượn và trả.</li>
            <li>🔍 Tìm kiếm sách theo tên, tác giả, thể loại.</li>
            <li>📅 Theo dõi lịch sử mượn sách và hạn trả.</li>
            <li>⚡ Giao diện dễ sử dụng, thao tác nhanh chóng.</li>
            <li>🔒 Đảm bảo bảo mật thông tin người dùng.</li>
            <li>📲 Hệ thống mượn sách linh hoạt, hỗ trợ trên tất cả các thiết bị.</li>
          </ul>
        </section>
  
        <!-- Liên hệ -->
        <section class="section">
          <h2 class="title">💬 Liên Hệ</h2>
          <p class="section-description">
            Để biết thêm thông tin về thư viện và hệ thống quản lý mượn sách, vui
            lòng liên hệ với chúng tôi qua địa chỉ email:
            <a href="mailto:support@library.com" class="email-link">support@library.com</a>.
          </p>
        </section>
  
        <!-- Bản đồ -->
        <section class="section">
          <h2 class="title">🗺️ Bản Đồ Thư Viện</h2>
          <p class="section-description">
            Dưới đây là bản đồ của thư viện giúp bạn dễ dàng tìm kiếm các khu vực
            đọc sách và mượn sách.
          </p>
          <div class="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6967551856797!2d106.6923783142917!3d10.772016362305974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175289e6e4c055f%3A0x6a0f8b857f617a7c!2sSaigon%20Central%20Library!5e0!3m2!1sen!2s!4v1624244161502!5m2!1sen!2s"
              width="100%" height="400" style="border: 0;" allowfullscreen="" loading="lazy"></iframe>
          </div>
        </section>
  
        <!-- CTA Button -->
        <div class="cta-section">
          <p>
            <strong>Khám phá ngay thư viện của chúng tôi và mượn sách ngay hôm nay!</strong><RouterLink to="/sach" class="cta-button">HERE</RouterLink>
          </p>
          <!-- <RouterLink to="/sach" class="cta-button">HERE</RouterLink> -->
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  </script>
  
  <style scoped>
  /* Toàn bộ trang */
  .about-container {
    background-color: #f9f9f9;
    font-family: 'Arial', sans-serif;
    padding: 40px 12%;
    box-sizing: border-box;
    color: #333;
  }
  
  .content {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  /* Tiêu đề chính */
  .title {
    font-size: 40px;
    color: #2a3a42;
    font-weight: bold;
    margin-bottom: 25px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  /* Mô tả các section */
  .section-description {
    font-size: 18px;
    color: #4b4b4b;
    line-height: 1.8;
    margin-bottom: 20px;
    text-align: justify;
  }
  
  /* Các section */
  .section {
    margin-top: 50px;
    margin-bottom: 50px;
    padding: 30px;
    background: white;
    border-radius: 15px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
  }
  
  .section:hover {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
  
  /* Danh sách tiện ích */
  .features-list {
    list-style-type: none;
    padding: 0;
  }
  
  .features-list li {
    font-size: 20px;
    color: #333;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
  }
  
  .features-list li::before {
    content: "✔️";
    margin-right: 10px;
    font-size: 22px;
    color: #f39c12;
  }
  
  /* Hình ảnh thư viện */
  .library-image {
    width: 100%;
    height: auto;
    border-radius: 12px;
    margin-top: 20px;
    transition: transform 0.3s ease-in-out;
  }
  
  .library-image:hover {
    transform: scale(1.05);
  }
  
  /* Liên kết email */
  .email-link {
    color: #1e88e5;
    text-decoration: none;
    font-weight: 600;
  }
  
  .email-link:hover {
    text-decoration: underline;
  }
  
  /* Bản đồ */
  .map-container {
    margin-top: 30px;
  }
  
  iframe {
    border-radius: 12px;
  }
  
  /* CTA Button */
  .cta-section {
    margin-top: 50px;
    text-align: center;
  }
  
  .cta-button {
    background-color: #e6be3c;
    color: white;
    padding: 15px 30px;
    font-size: 20px;
    border-radius: 10px;
    text-decoration: none;
    transition: background-color 0.3s ease, transform 0.3s ease;
  }
  
  .cta-button:hover {
    background-color: #ca7514;
    transform: scale(1.05);
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .about-container {
      padding: 20px;
    }
  
    .cta-button {
      font-size: 18px;
      padding: 12px 25px;
    }
  }
  </style>
  