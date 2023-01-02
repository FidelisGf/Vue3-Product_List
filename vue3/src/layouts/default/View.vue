<template>
  <v-main>
    <v-snackbar
      v-model="snack"
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

<script>
  import { useAppStore } from '@/store/app'
  const storeApp = useAppStore()
  export default{
    computed:{
      msg : function(){
          return storeApp.getMsg
      },
      snack : function(){
          return storeApp.getSnack
      },
      timeout : function(){
          return storeApp.getTime
      }
    },
    methods:{
        close(){
            storeApp.closeSnack()
        }
    }
  }

</script>
