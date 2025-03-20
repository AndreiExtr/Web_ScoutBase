<template>
  <div class="alert-message" v-if="visible">
    <div class="alert-content">
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlertMessage',
  props: {
    message: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      visible: true
    }
  }
}
</script>

<style lang="scss">
.alert-message {
  position: fixed;
  top: 20px;
  left: 50%;
  background-color: rgba(0, 0, 0, 0.7);
  color: rgb(255, 255, 255);
  padding: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  z-index: 9999;

  .alert-content {
    display: flex;
    align-items: center;
  }
}
</style>
