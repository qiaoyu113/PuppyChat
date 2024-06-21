<template>
    <div class="video-chat-container">
    <!-- 弹窗 -->
    <!-- <div v-if="!iframeLoaded && !callEnded" class="modal">
      <div class="modal-content">
        <h1>Enter Room ID</h1>
        <input type="text" v-model="roomId" maxlength="3" placeholder="3 digits" style="margin-top:4vh;width:60vw;height: 40px;padding:10px 20px;border: 1px solid #333;" />
        <button @click="startCall"  style="margin-top:20vh;width: 50vw;height: 6vh;border-radius:7px;">Start</button>
      </div>
    </div> -->

    <!-- 视频聊天和挂断按钮 -->
    <div v-if="!callEnded">
      <button @click="endCall" class="hangup-button">Hang Up</button>
      <iframe
        ref="videoIframe"
        :src="iframeUrl"
        frameborder="0"
        width="100%"
        height="500px"
        allow="camera; microphone; fullscreen"
        id="videoIframe"
      ></iframe>
    </div>

    <!-- 聊天结束显示 -->
    <div v-if="callEnded" class="end-screen">
      <svg t="1718818864414" class="icon" viewBox="0 0 1422 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4061" width="200" height="200"><path d="M851.911111 398.990222c-184.234667-100.664889-299.918222-82.375111-347.050667 54.812445-111.104 52.081778-128.768 127.488-52.963555 226.218666-86.129778 106.837333-68.465778 178.062222 52.963555 213.617778 0 23.438222 0 70.712889 96.256 114.972445 96.256 44.288 302.449778-91.505778 658.773334 0 112.071111 0 214.328889-373.816889 133.262222-508.984889-54.044444-90.112-234.467556-123.676444-541.240889-100.636445z" fill="#FFC2C2" p-id="4062"></path><path d="M451.527111 815.331556c-15.644444-27.904 12.373333-65.308444 62.520889-83.541334 50.176-18.204444 111.672889-5.233778 127.317333 22.641778 15.616 27.904-20.536889 60.16-70.712889 78.392889-50.176 18.232889-103.509333 10.382222-119.125333-17.493333zM488.675556 577.706667c11.235556-29.866667 58.481778-44.771556 105.528888-33.308445 47.018667 11.434667 77.454222 53.134222 66.218667 82.972445-11.235556 29.866667-59.875556 36.551111-106.894222 25.088-47.047111-11.434667-76.060444-44.942222-64.853333-74.752zM722.204444 470.784c-12.942222 23.324444-56.234667 30.378667-96.654222 15.786667-40.391111-14.592-63.061333-52.224-50.062222-75.52 12.970667-23.324444 56.632889-23.466667 97.052444-8.874667 40.419556 14.592 62.663111 45.312 49.692445 68.608zM630.272 942.136889c-15.274667-28.074667 0.910222-60.899556 36.124444-73.301333 35.271111-12.373333 83.000889 6.058667 98.304 34.133333 15.303111 28.131556-7.68 55.239111-42.894222 67.640889-35.271111 12.373333-76.231111-0.369778-91.534222-28.444445z" fill="#FDFCFA" p-id="4063"></path><path d="M724.110222 662.954667c0 42.609778 22.328889 86.926222 51.882667 105.500444-5.831111 44.714667 20.792889 87.921778 62.008889 98.531556 36.693333 9.443556 73.216-10.040889 89.486222-44.885334 32.170667-18.033778 57.116444-70.4 60.103111-133.518222 3.328-71.253333-22.471111-132.152889-59.562667-146.432-12.259556-34.616889-39.082667-58.652444-70.172444-58.652444-42.666667 0-80.981333 31.772444-80.981333 87.608889 0 3.015111 0.113778 6.058667 0.312889 9.102222-30.122667 10.752-53.077333 39.537778-53.077334 82.773333zM270.791111 612.352c63.886222 131.783111 137.130667 167.253333 219.676445 106.410667 84.366222 14.051556 125.041778-22.670222 122.026666-110.136889 92.416-27.704889 111.303111-76.032 56.689778-145.066667 9.528889-13.596444 28.728889-41.016889-8.049778-105.045333-36.778667-64-209.237333-67.356444-374.755555-262.4C222.606222 51.484444 12.572444 227.640889 3.783111 338.375111c-5.888 73.813333 83.114667 165.148444 267.008 273.976889z" fill="#F9999A" p-id="4064"></path></svg>
      <p>With Puppy：{{ formattedTime }}</p>
      <button class="btn" @click="goBack">End</button>
    </div>

    <div class="room-link-wrapper">
        <div class="room-link">
            PuppyChat
        </div>
    </div>

    <div class="flower-area" v-if="callEnded">
        <div class="petal"></div>
        <div class="petal"></div>
        <div class="petal"></div>
        <div class="petal"></div>
        <div class="petal"></div>
        <!-- 可以根据需要增加更多花瓣 -->
    </div>

  </div>
</template>
  
<script lang="ts" setup>
  import { ref, onUnmounted, computed, onMounted } from 'vue';
  import { Socket } from "socket.io-client";

  const iframeUrl = ref('');
  const iframeLoaded = ref(false);
  const callStarted = ref(false);
  const callEnded = ref(false);
  const startTime = ref<Date | null>(null);
  const endTime = ref<Date | null>(null);
  const videoIframe = ref<null | HTMLIFrameElement>(null);

  //   系统消息监听
  const sys = (socket: Socket) => {
    socket.on('endCalls', (data) => {
        console.log('Received endCalls:', data);
        if(data.user != (window as any).userName && data.roomId == (window as any).roomId.value) {
          callEnded.value = true;
          iframeLoaded.value = false;
          endTime.value = new Date();
        }
    });
  }
  
  onMounted(() => {
    if ((window as any).roomId.value) {
      iframeUrl.value = `https://v3demo.mediasoup.org/?roomId=${(window as any).roomId.value}`;
      iframeLoaded.value = true;
      callStarted.value = true;
      startTime.value = new Date();
      sys((window as any).socket);
      // websocket.send(JSON.stringify({ action: 'startCall', roomId: roomId.value }));
    } else {
      alert('Please enter a valid 3-digit Room ID.');
    }
  });
  
  const endCall = () => {
    callEnded.value = true;
    iframeLoaded.value = false;
    endTime.value = new Date();
    (window as any).socket.emit('endCalls', {
      "roomId": (window as any).roomId.value,
      "user": (window as any).userName
    });
  };
  
  const goBack = () => {
    window.history.back();
  };
  
  const formattedTime = computed(() => {
    console.log('startTime.value:::::::::::::::::::::::',startTime.value);
    if (!startTime.value || !endTime.value) return '00:00';
    const elapsed = endTime.value.getTime() - startTime.value.getTime();
    const minutes = Math.floor(elapsed / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  });
  
  onUnmounted(() => {
    if (iframeLoaded.value && videoIframe.value) {
      // Ensure all media tracks are stopped when component unmounts
      const stream = (videoIframe.value.contentWindow as any)?.stream;
      if (stream) {
        stream.getTracks().forEach((track: any) => track.stop());
      }
    }
  });

  </script>
  
  <style lang="less" scoped>
  .video-chat-container {
    position: relative;
    width: 100%;
    height: 100vh;
    background: #273c56;
  }
  
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    // background: white;
    padding: 20px;
    border-radius: 10px;
    color: #fff;
  }
  
  .modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  input[type="text"] {
    margin-bottom: 10px;
  }

  input:focus {
    outline: none;
    box-shadow: none;
    }

  input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus, 
    input:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 30px white inset !important;
    }
  
  .hangup-button, .modal button {
    padding: 10px 20px;
    font-size: 16px;
    color: white;
    background-color: #ea4c89;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .hangup-button {
    position: absolute;
    bottom: 3vh;
    left: 5vh;
    right: 5vh;
  }
  
  #videoIframe {
    width: 100%;
    height: 90vh;
  }
  
  .room-link-wrapper {
    pointer-events: none;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
  }
  
  .room-link {
    width: 32vw;
    background-color: rgba(36, 59, 85, 1);
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
    box-shadow: 0 3px 12px 2px rgba(17, 17, 17, 0.4);
    height: 33px;
    text-align: center;
    line-height: 33px;
    color: #fff;
  }
  .end-screen {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    /* background: white; */
    /* padding: 20px; */
    border-radius: 10px;
    text-align: center;
    width: 100%;
    height: 50vh;
    text-align: center;
        svg{
            width:100px;
            height:  100px;
        }
        p {
            color:#fff;
            font-size:24px;
        }
        .btn {
            width: 50vw;
            height:6vh;
            margin-top:20vh;
        }
    }

    input[type="text"], button {
    margin-top: 10px;
    }

    .hangup-button, .modal button, .end-screen button {
        padding: 10px 20px;
        font-size: 16px;
        color: white;
        background-color: #ea4c89;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .timer {
    position: absolute;
    top: 5vh;
    left: 5vh;
    color: white;
    font-size: 1.5em;
    }

    .flower-area {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
}

.petal {
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: pink; /* 花瓣颜色 */
    opacity: 0.8;
    top: -50px; /* 起始位置，确保从屏幕外开始 */
    border-radius: 50%; /* 圆形花瓣，可调整形状 */
    animation: fall 5s linear infinite; /* 持续时间、类型、无限循环 */
}

/* 为每个花瓣生成不同的位置和延迟 */
.petal:nth-child(1) { left: 10%; animation-delay: 0s; }
.petal:nth-child(2) { left: 30%; animation-delay: 2.5s; }
.petal:nth-child(3) { left: 50%; animation-delay: 0.7s; }
.petal:nth-child(4) { left: 70%; animation-delay: 2.3s; }
.petal:nth-child(5) { left: 90%; animation-delay: 3.4s; }

@keyframes fall {
    0% { transform: translateY(0) rotate(0deg); }
    100% { transform: translateY(100vh) rotate(360deg); } /* 完整旋转 */
}

  </style>
  