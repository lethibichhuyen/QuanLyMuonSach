<template>
    <div class="return-book-container">
      <h1>Trả Sách</h1>
      <div v-if="loading">Đang xử lý...</div>
      <div v-else class="form-container">
        <input v-model="bookId" placeholder="Nhập mã sách" />
        <button @click="returnBook">Trả sách</button>
        <div v-if="message" class="message">{{ message }}</div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        bookId: '',
        loading: false,
        message: null,
      };
    },
    methods: {
      async returnBook() {
        this.loading = true;
        try {
          const response = await axios.post('http://localhost:5000/api/return', {
            bookId: this.bookId,
          });
          this.message = 'Trả sách thành công!';
        } catch (err) {
          this.message = 'Lỗi khi trả sách!';
        } finally {
          this.loading = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .return-book-container {
    text-align: center;
    padding: 20px;
  }
  
  .form-container {
    margin-top: 20px;
  }
  
  input {
    display: block;
    margin-bottom: 10px;
    padding: 10px;
    width: 250px;
    margin-left: auto;
    margin-right: auto;
  }
  
  button {
    background: #004d40;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
  }
  </style>
  