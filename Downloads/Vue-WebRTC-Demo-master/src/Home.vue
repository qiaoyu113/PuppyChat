<template>
    <div class="context">
      <!--顶部-->
      <div class="title">
        PuppyChat
      </div>
      <!-- banner-->
      <div class="banner">
        <img class="banner-img" src="/src/assets/banner.jpg" style="width:100%;height:500px;" />
        <img class="banner-img-pc" src="/src/assets/c1.jpg" />
        <div class="shadow">
          <h1>PuppyChat</h1>
          <p>24h with pets</p>
        </div>
      </div>
      <!--功能页-->
      <p class="title_port">Companion</p>
      <div class="portfolio">
          <div class="card">
              <img class="img" src="/src/assets/img1.jpg" alt="SAP Commerce Cloud">
              <div class="container">
                  <h2>Take Video</h2>
                  <p>say Hi</p>
                  <button @click="goToVideo">Start</button>
              </div>
          </div>
          <div class="card">
              <img class="img" src="/src/assets/youtube.jpg" alt="Google Maps Integration">
              <div class="container">
                  <h2>YouTube</h2>
                  <p>see Puppy</p>
                  <button @click="goToYoutube">Share</button>
              </div>
          </div>
          <!-- <div class="card">
              <img src="google-maps.jpg" alt="Google Maps Integration">
              <div class="container">
                  <h2>Google Maps Integration</h2>
                  <p>2019</p>
                  <button onclick="location.href='#'">View Case Study</button>
              </div>
          </div> -->
      </div>
    </div>
    <!-- 通知窗口 -->
    <!-- <Notice ref="noticeRef" @call="onCall" /> -->
    <!-- 登录窗口 -->
    <!-- <Login @login="onLogin" ref="loginRef" /> -->
    <!-- 设置窗口 -->
    <!-- <Settings /> -->
  </template>
  <script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { onMounted, ref } from 'vue';
  
  const router = useRouter();
  let userName = ref("");
  
  function goToVideo() {
      (window as any).socket.emit('update_roles', {
        "roomId": (window as any).roomId.value,
        "user": (window as any).userName
      });
      router.push('/video');
  }

  function goToYoutube() {
      router.push('/youtube');
  }

  </script>
  <style lang="less" scoped>
  /* 针对移动端的样式 */
  @media (max-width: 1023px) {
    .context {
      width: 100vw;
      // height: 100vh;
      box-sizing: border-box;
      // display: flex;
      overflow: hidden;
      .title{
        width:100%;
        height:70px;
        line-height:70px;
        text-align:center;
        font-size:18px;
        font-weight: 500;
      }
      .banner {
        position: relative;
        .banner-img-pc {
            display:none;
        }
        .shadow {
          position: absolute;
          width:100%;
          height:70px;
          top: 0;
          text-align: center;
          color: #fff;
          h1{
            padding-top:180px;
          }
        }
      }
      .title_port {
          width: 100%;
          padding:0 0 0 20px;
          box-sizing: border-box;
          font-weight: 600;
        }
      .portfolio {
        display: flex;
        overflow-x: auto;
        scrollbar-width: none; /* For Firefox */
        -ms-overflow-style: none;  /* For Internet Explorer and Edge */
        gap: 20px;
        padding: 10px 20px;
        .card {
          flex: 0 0 auto;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          transition: transform 0.3s ease-in-out;
          position: relative;
          .img {
            // position: absolute;
            width: 240px;
            border-radius: 8px;
          }
        }
        .card:hover {
            transform: translateY(-10px);
        }
  
        .card img {
            width: 100%;
            display: block; /* Remove extra space below the image */
        }
  
        .container {
            padding: 20px;
            text-align: left;
        }
  
        .container h2 {
            margin: 0;
        }
  
        .container p {
            color: #666;
            font-size: 14px;
            margin: 0;
        }
  
        button {
            width: 100%;
            background-color: hsl(0deg 20% 94%);
            color: black;
            border: none;
            padding: 10px 20px;
            cursor: pointer;
            border-radius: 5px;
            margin-top: 10px;
        }
  
        button:hover {
            background-color: #ea4c89;
        }
      }
    }
  }
  /* 针对桌面端的样式 */
  @media (min-width: 1024px) {
    .context {
      width: 100vw;
      // height: 100vh;
      box-sizing: border-box;
      // display: flex;
      overflow: hidden;
      scrollbar-width: none; /* For Firefox */
      -ms-overflow-style: none;  /* For Internet Explorer and Edge */
      .title{
        width:100%;
        height:70px;
        line-height:70px;
        text-align:center;
        font-size:18px;
        font-weight: 500;
      }
      .banner {
        width:100vw;
        height: 60vh;
        position: relative;
        overflow: hidden;
        .banner-img{
          display:none;
        }
        .banner-img-pc {
          width:100vw;
          // height: 60vh;
        }
        .shadow {
          position: absolute;
          width:100%;
          height:50px;
          top: 0;
          text-align: center;
          color: #fff;
          h1{
            font-size:50px;
            padding-top:180px;
          }
        }
      }
      .title_port {
          width: 100%;
          padding:0 0 0 20px;
          box-sizing: border-box;
          font-weight: 600;
        }
      .portfolio {
        display: flex;
        overflow-x: auto;
        scrollbar-width: none; /* For Firefox */
        -ms-overflow-style: none;  /* For Internet Explorer and Edge */
        gap: 20px;
        padding: 10px 20px;
        .card {
          flex: 0 0 auto;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          transition: transform 0.3s ease-in-out;
          position: relative;
          .img {
            // position: absolute;
            width: 240px;
            border-radius: 8px;
          }
        }
        .card:hover {
            transform: translateY(-10px);
        }
  
        .card img {
            width: 100%;
            display: block; /* Remove extra space below the image */
        }
  
        .container {
            padding: 20px;
            text-align: left;
        }
  
        .container h2 {
            margin: 0;
        }
  
        .container p {
            color: #666;
            font-size: 14px;
            margin: 0;
        }
  
        button {
            width: 100%;
            background-color: hsl(0deg 20% 94%);
            color: black;
            border: none;
            padding: 10px 20px;
            cursor: pointer;
            border-radius: 5px;
            margin-top: 10px;
        }
  
        button:hover {
            background-color: #ea4c89;
        }
      }
    }
  }
  </style>
  