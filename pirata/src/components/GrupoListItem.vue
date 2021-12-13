<template>
   
   <div class="form-check">
     <label>
     {{ grupo.tipo }} <i class="input-helper"></i
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