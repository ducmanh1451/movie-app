<template>
  <div class="movie-detail">
    <div class="movie-detail-img">
      <img :src="movie.image" alt="" />
    </div>
    <div class="movie-detail-content">
      <div class="movie-name">GODZILLA X KONG: ĐẾ CHẾ MỚI</div>
      <div class="movie-director movie-info">
        <label>Đạo diễn: </label>
        <span>Adam Wingard</span>
      </div>
      <div class="movie-actress movie-info">
        <label>Diễn viên: </label>
        <span
          >Rebecca Hall; Brian Tyree Henry; Dan Stevens; Kaylee Hottle; Alex Ferns; Fala
          Chen,...</span
        >
      </div>
      <div class="movie-genre movie-info">
        <label>Thể loại: </label>
        <span>Hành Động, Phiêu Lưu</span>
      </div>
      <div class="movie-release movie-info">
        <label>Khởi chiếu: </label>
        <span>29/03/2024</span>
      </div>
      <div class="movie-actress movie-info">
        <label>Thời lượng: </label>
        <span>115 phút</span>
      </div>
      <div class="movie-language movie-info">
        <label>Ngôn ngữ: </label>
        <span>Tiếng Anh - Phụ đề Tiếng Việt, Tiếng Hàn</span>
      </div>
    </div>
  </div>
  <div class="movie-trailer">
    <div class="div">
      <button class="button is-danger is-rounded">Trailer</button>
    </div>
    <div class="div">
      <div class="trailer">Trailer</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
defineProps(['movie'])
</script>

<style scoped>
.movie-detail {
  display: flex;
}
.movie-detail-img {
  width: 200px;
  height: 300px;
}
.movie-detail-img img {
  width: 100%;
  height: 100%;
}
.movie-detail-content {
  width: calc(100% - 176px);
  padding: 0px 0px 30px 30px;
}
.movie-name {
  font-size: 24px;
  border-bottom: 1px solid #d9d6c8;
  padding-bottom: 20px;
  color: #1a1919;
  font-weight: normal;
}
.movie-info label {
  font-size: 13px;
  font-family: Verdana, Arial, sans-serif;
  font-weight: 600;
  color: #1a1919;
}
.movie-info span {
  color: #1a1919;
}
.movie-info.movie-director {
  margin-top: 5px;
}
.movie-trailer .div {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}
.movie-trailer button {
  color: #fff;
}
.movie-trailer .trailer {
  width: 560px;
  height: 315px;
  background-color: yellowgreen;
}
</style>
