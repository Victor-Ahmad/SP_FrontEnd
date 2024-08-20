<template>
  <div class="cta-container my-12 text-center">
    <button @click="handleJoinClick" class="cta-button">Join Us Now</button>
  </div>
</template>

<script>
export default {
  name: "CallToActionButton",
  props: {
    buttonText: {
      type: String,
      default: "Click Here",
    },
    onClick: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    handleJoinClick() {
      alert("Thank you for joining us!");
    },
  },
};
</script>

<style scoped>
.cta-button {
  width: 25%;
  background-color: #1c592f;
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.25rem;
  font-weight: 600;
  text-transform: uppercase;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  border: none;
}

.cta-button:hover {
  background-color: #10361c;
  transform: translateY(-3px);
}

.cta-button:active {
  transform: translateY(1px);
}
@media (max-width: 640px) {
  .cta-button {
    width: 75%; /* Adjust the width for smaller screens */
    font-size: 1rem; /* Reduce the font size */
    padding: 0.75rem 1.5rem; /* Adjust padding */
  }
}
</style>
