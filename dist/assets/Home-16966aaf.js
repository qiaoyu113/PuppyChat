import{d as a,u as s,r as t,c as e,a as d,b as i,o,p,e as c,_ as l}from"./index-f48e1afa.js";const n=a=>(p("data-v-d3e57a1f"),a=a(),c(),a),u={class:"context"},r=i('<div class="title" data-v-d3e57a1f> PuppyChat </div><div class="banner" data-v-d3e57a1f><img class="banner-img" src="/puppychat/assets/banner-ae57b186.jpg" style="width:100%;height:500px;" data-v-d3e57a1f><img class="banner-img-pc" src="/puppychat/assets/c1-85b0fa55.jpg" data-v-d3e57a1f><div class="shadow" data-v-d3e57a1f><h1 data-v-d3e57a1f>PuppyChat</h1><p data-v-d3e57a1f>24h with pets</p></div></div><p class="title_port" data-v-d3e57a1f>Companion</p>',3),v=n((()=>d("img",{class:"img",src:"/puppychat/assets/img1-8ba7e103.jpg",alt:"SAP Commerce Cloud"},null,-1))),m=n((()=>d("h2",null,"Take Video",-1))),h=n((()=>d("p",null,"say Hi",-1))),f=n((()=>d("img",{class:"img",src:"/puppychat/assets/youtube-f510bdd3.jpg",alt:"Google Maps Integration"},null,-1))),g=n((()=>d("h2",null,"YouTube",-1))),b=n((()=>d("p",null,"see Puppy",-1))),y=l(a({__name:"Home",setup(a){const i=s();function p(){window.socket.emit("update_roles",{roomId:window.roomId.value,user:window.userName}),i.push("/video")}function c(){i.push("/youtube")}return t(""),(a,s)=>(o(),e("div",u,[r,d("div",{class:"portfolio"},[d("div",{class:"card"},[v,d("div",{class:"container"},[m,h,d("button",{onClick:p},"Start")])]),d("div",{class:"card"},[f,d("div",{class:"container"},[g,b,d("button",{onClick:c},"Share")])])])]))}}),[["__scopeId","data-v-d3e57a1f"]]);export{y as default};