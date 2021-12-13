<template>
  <li :class="{ completed: grupo.completed === true }">
    <div class="form-check">
      <label class="form-check-label">
        <input class="checkbox" v-model="checked" type="checkbox" />
        {{ grupo.title }} <i class="input-helper"></i
      ></label>
    </div>
  </li>
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
  methods: {
    
  },
  mounted(){
    this.checked = this.grupo.completed
  },
  watch: {
    checked(newValue) {
      this.$emit('toggleComplete', {id: this.grupo['.key'], completed: newValue})
    }
  }
};
</script>