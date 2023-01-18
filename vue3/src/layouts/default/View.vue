<template>
  <v-main>
    <v-snackbar
      v-model="snac"
      :timeout="timeout"
      color="black"
    >
      {{ msg }}
      <template v-slot:actions>
        <v-btn
          color="red-darken-2"
          variant="text"
          @click="close"
          icon
        >
        <v-icon>
          mdi-close
        </v-icon>

        </v-btn>
      </template>
    </v-snackbar>
    <suspense>
      <router-view />
    </suspense>
  </v-main>

</template>

<script setup>
  import { useAppStore } from '@/store/app'
  import {ref, computed, } from 'vue'
  const storeApp = useAppStore()
  const tmp = ref(null)
  let snac = computed({
      get: ()=> storeApp.getSnack,
      set: () => {
        storeApp.closeSnack()
      }
  })

  const msg = computed({
      get: ()=> storeApp.getMsg
  })
  const timeout = ref(2000)

  function close(){
      storeApp.closeSnack()
  }
</script>
<style lang="scss">
   .imagem{
    transition: transform 0.25s;
    position: relative;
    box-shadow: rgba(141, 141, 141, 0.397) 0px 10px 14px;
  }
  .zoom{
   background-color: transparent;
   width: 100%;
   height: 100%;
   float: right;
  }

  .cores{

    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  }
  .imagem:hover{
    transform: scale(1.05);
  }

  .mod-img{
    overflow: hidden;
  }
  .cores:hover{
    transform: translate(0px, -0.9px);

    transition: 0.1s;
    box-shadow: rgba(226, 222, 222, 0.397) 0px 0px 15px;
  }
  .cores-selec{
    box-shadow: rgba(20, 20, 37, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  }
  .cores-selec:hover{
    transform: translate(1px, -0.10px);
    transition: 0.3s;
    cursor: pointer;
    box-shadow: 1px 2px 1px 2px #c9c9c9 !important;
  }
  .cores-selec:active{
    border: 2px solid rgb(66, 65, 65);
    box-shadow: 1px 2px 1px 2px #414749 !important;
  }
  .app-bar{
    background-color: #e5e9ef !important;
    background-image: linear-gradient(90deg, #ecf9fa 0%, #e4f7fa 100%) !important;
  }


  .slides{
      width: 100% !important;
  }
  .princip{
    background-color: #dee9f3;
    background-image: linear-gradient(160deg, #dee9f3 0%, #f0f8ff 100%);

  }
  .princip-list{
    background-color: #e2edf6;
  }
  .cards:hover{
    transform: translate(1px, -2.0px);
    transition: 0.5s;
    box-shadow: 2px 5.2px 8px #1b1b1b !important;
  }
  .corpo-card{
    background-color: #e6e6fa !important;
    background-image: linear-gradient(90deg, #e6e6fa 0%, #dbdbf3 100%) !important;


  }
  .img-card{
    background: white !important;
  }
  .bg-real{
    background-color: #b0c4de !important;
    background-image: linear-gradient(160deg, #f0f8ff 0%, #e1ebee 37%, #f0f8ff 100%) !important;


  }
  .bg-footer{
    background : #e2f1ff !important
  }
  .bg-bottom{
    background-color: #E6E6FA !important;
  }
  .auto{
      color: black;
      font-weight: bold;
  }
  .encx-img{
    max-width: 320px !important;
    max-height: 320px !important;
    min-height: 200px;
    border: solid 0.0px rgb(245, 244, 244);
  }
  .img{
    min-width: 20vh;
    max-height: 20vh;
    width: 44rem;
    max-height: 80vh;

  }



</style>
