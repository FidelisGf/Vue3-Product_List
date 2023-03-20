<template>
  <div class="
    zoom-on-hover"
    id="zoom-div"
    ref="el"
    :class="[{zoomed},  smAndDown ? 'sm-norm  ml-0' : '']"
    :style="stylesImage"
    @touchstart="touchzoom"
    @mousemove="move"
    @mouseenter="zoom"
    @mouseleave="unzoom"
    >
    <img
      class="normal"
      ref="normal"
      :src="imgNormal"
      :style="stylesImage"
      id="image"
    />
    <img class="zoom" ref="zooom"
      :src="imgZoom || imgNormal"
    />
  </div>

</template>

<script setup>
import { ref, computed, onMounted, onUpdated, onUnmounted} from 'vue'
import { useDisplay } from 'vuetify/lib/framework.mjs';

const {smAndDown, xlAndUp, mdAndUp, smAndUp} = useDisplay()
const zooom = ref(null)
const normal = ref(null)
const el = ref(null)
const emit = defineEmits(['loaded'])


function pageOffset(el) {
  var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    y: rect.top + scrollTop,
    x: rect.left + scrollLeft
  }
}

  const props = defineProps({
    imgNormal : String,
    imgZoom : String,
    scale : String,
    disabled : Boolean,
    max_height : String,
    min_height : String,
    max_height_md_lg : String,
    min_height_md_lg : String,
    max_height_xl : String,
    min_height_xl : String
  })

  const scaleFactor = ref(1)
  const resizeCheckInterval = ref(null)
  const zoomed = ref(false)
  const tmpWidthSkiny = ref(false)


  let stylesImage = computed({
        get: ()=> {
          if(xlAndUp.value == true && props.min_height_xl !== null && props.max_height_xl
          !== null){
            return mountStyle(props.min_height_xl, props.max_height_xl)
          }
          else if(mdAndUp.value == true && props.min_height_md_lg !== null
          && props.max_height_md_lg !== null){
            return mountStyle(props.min_height_md_lg, props.max_height_md_lg)
          }else{
            return mountStyle(props.min_height, props.max_height)
          }
        }

  })

  function touchzoom(event) {
      if (props.disabled) return
      move(event)
      zoomed.value = !zoomed.value
  }

  function zoom() {
      if (!props.disabled){
        console.log(document.getElementById("image").width)
        verifySkinyWidth()
        zoomed.value = true
      }
  }

  function verifySkinyWidth(){
      if(document.getElementById("image").width <= 170){
          document.getElementById("image").style.width = '200px'
          this.tmpWidthSkiny = true
      }
  }

  function unzoom() {
      if (!props.disabled){
        if(tmpWidthSkiny.value){
          document.getElementById("image").style.width = 'auto'
          document.getElementById("image").style.height = 'auto'
          this.tmpWidthSkiny = false
        }
        zoomed.value = false
      }
  }

  function mountStyle(min, max){
        return 'min-height: ' + min + ' !important; max-height: ' + max + ' !important;'
  }

  function move(event) {
      if (props.disabled || !zoomed.value) return
      var offset = pageOffset(el.value)
      var zoom = zooom.value
      var noormal = normal.value
      var relativeX = event.clientX - offset.x + window.pageXOffset
      var relativeY = event.clientY - offset.y + window.pageYOffset
      var normalFactorX = relativeX / noormal.offsetWidth
      var normalFactorY = relativeY / noormal.offsetHeight
      var x = normalFactorX * (zoom.offsetWidth * scaleFactor.value - noormal.offsetWidth)
      var y = normalFactorY * (zoom.offsetHeight * scaleFactor.value - noormal.offsetHeight)
      zoom.style.left = -x + "px"
      zoom.style.top = -y + "px"
  }

  function initEventLoaded() {
      var promises = [zooom.value, normal.value].map((image) => {
        return new Promise(function(resolve, reject) {
          image.addEventListener("load", resolve)
          image.addEventListener("error", reject)
        })
  })


  var component = this
    Promise.all(promises).then(function() {
      emit("loaded")
    })
  }


  function initEventResized() {
      var noormal = normal.value
      var previousWidth = noormal.offsetWidth
      var previousHeight = noormal.offsetHeight
      var component = this
      resizeCheckInterval.value = setInterval(function() {
        if ((previousWidth != noormal.offsetWidth)
         || (previousHeight != noormal.offsetHeight)) {
          previousWidth = noormal.offsetWidth
          previousHeight = noormal.offsetHeight
          component.$emit("resized", {
            width: noormal.width,
            height: noormal.height,
            fullWidth: noormal.naturalWidth,
            fullHeight: noormal.naturalHeight
          })
        }
      }, 1000)
  }


  onMounted(()=>{
    if (props.scale) {
      scaleFactor.value = parseInt(props.scale)
      zooom.value.style.transform = "scale(" + scaleFactor.value + ")"
    }
    initEventLoaded()
    initEventResized()
  })


  onUpdated(()=>{
    initEventLoaded()
  })

  onUnmounted(()=>{
    clearInterval(resizeCheckInterval.value)
  })

</script>

<style scoped>
  .zoom-on-hover {
      position: relative;
      display: inline-block;
  }
  .zoom-on-hover {
      position: relative;
      overflow: hidden;
  }
  .zoom-on-hover .normal {
      max-width: 99% ;
  }
  .zoom-on-hover .zoom {
    position: absolute;
    opacity: 0;
    transform-origin: top left;
    transition: 0.255s;
  }
  .zoom-on-hover.zoomed .zoom {
    opacity: 1;
  }
  .zoom-on-hover.zoomed .normal {
    opacity: 0;
  }
  .zoom {
    height: 100% !important;
  }
  .sm-norm{
    max-width: 98% !important;
  }

</style>
