<template>
  <div class="lock-overlay">
    <i class="fas fa-lock"></i>
    <p>Upload two or more images to unlock the rest</p>
  </div>
</template>

<script>
export default {
  name: "LockOverlay",
};
</script>

<style scoped>
.lock-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 8px;
  text-align: center;
}

.lock-overlay i {
  font-size: 24px;
  margin-bottom: 8px;
}

.lock-overlay p {
  font-size: 12px;
  margin: 0;
}
</style>
