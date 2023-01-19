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
    border: 1px solid rgb(112, 112, 112);

  }
  .cores-selec:hover{
    transform: translate(1px, -0.10px);
    transition: 0.5s;
    cursor: pointer;

    box-shadow: 2px 1px 1px 0px #8a8a8a !important;
  }
  .cores-selec:active{
    border: 2px solid rgb(250, 247, 247);
    box-shadow: 1px 2px 1px 2px #414749 !important;
  }
  .app-bar{
    background: #232526;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #414345, #232526) !important;  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #414345, #232526) !important; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  }


  .slides{
      width: 100% !important;
  }
  .princip{
    background: #000000;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #434343, #000000);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #434343, #000000); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  }
  .princip-list{
    background-color: #e2edf6;
  }
  .cards:hover{
    transform: translate(1px, -2.0px);
    transition: 0.5s;
    box-shadow: 2px 5.2px 8px #8a8a8a !important;
  }
  .corpo-card{
    background: #16222A;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #4a4c4d, #16222A);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #151616, #131c22); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */




  }

  .bg-real{
    background: #000000 !important;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #434343, #000000) !important;  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #434343, #000000) !important; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */


  }
  .bg-footer{
    background : #e2f1ff !important
  }
  .filtros{
    background-color: #424242 !important;
    background-image: linear-gradient(180deg, #424242 0%, #414141 100%) !important;
    border-right-color: #2e2e2e !important;



  }
  .bg-bottom{
    background-color: #E6E6FA !important;
  }
  .auto{
      color: rgb(255, 255, 255) !important;
      font-weight: bold;
  }
  .encx-img{
    max-width: 320px !important;
    max-height: 320px !important;
    min-height: 200px;
    border: solid 0.0px rgb(245, 244, 244);
  }
  .img{
    min-width: 90% !important;
    max-width: 100% !important;
    height: 100% !important;

  }
  .mod-imagem{
    width: 22.5rem;
    height: 22.6rem;

    box-shadow: 0px 0px 0px 0px #414749 !important;

  }
  .btns{
    background: #C9CCD3;
    background-image: linear-gradient(-180deg, rgba(255,255,255,0.50) 0%, rgba(0,0,0,0.50) 100%);
    background-blend-mode: lighten;
  }
  .font-app{
    font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  .desc-detail{
    font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;
  }
  .dividers{
    background-color: #353535 !important;
    color : #757474 !important;
  }
  .div-img-cad-produto{
    height: 305px !important;

  }
  .div-img-cad-detail{
    height: 225px !important;

  }
  .img-card{
    background-color: #353535;
    background-image: linear-gradient(160deg, #353535 0%, #262626 100%);
    max-height: 100% !important;

  }



</style>
