<template>
   
   <div class="form-check">
     <h1>chavi no me jodas</h1>
     <label class="form-check-label">
     {{ grupo.ti }} <i class="input-helper"></i
     ></label>
    </div> 
</template>

<script>
export default {
  name: "GrupoListItem",
  props: ["grupo"],
  data() {
    return {
      checked: false
    }
  },
  mounted() {
    console.info(this.grupo);
  },
};
</script>