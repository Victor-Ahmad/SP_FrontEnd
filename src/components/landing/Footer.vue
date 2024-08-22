<template>
  <footer class="footer-section py-8">
    <div class="container mx-auto text-center">
      <div class="social-icons">
        <a
          href="https://www.facebook.com/profile.php?id=61560892673549"
          target="_blank"
          class="social-icon"
        >
          <i class="fab fa-facebook-f"></i>
        </a>
        <a
          href="https://www.instagram.com/snelwoningruil"
          target="_blank"
          class="social-icon"
        >
          <i class="fab fa-instagram"></i>
        </a>
        <a
          href="https://www.linkedin.com/company/snelwoningruil"
          target="_blank"
          class="social-icon"
        >
          <i class="fab fa-linkedin-in"></i>
        </a>
      </div>
      <p class="footer-text mt-4">
        © 2024 Snelwoningruil. Alle rechten voorbehouden.
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.footer-section {
  background-color: #e4eee6; /* Dark background for the footer */
  color: #1c592f; /* Light text color for contrast */
  padding: 2rem 1rem;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.social-icon {
  font-size: 1.75rem;
  color: #1c592f;
  transition: color 0.3s ease;
}

.social-icon:hover {
  color: #1c592f; /* Brighter blue on hover */
}

@media (max-width: 768px) {
  .footer-section {
    padding: 1.5rem 1rem;
  }

  .footer-text {
    font-size: 1rem;
  }

  .social-icon {
    font-size: 1.5rem;
  }
}
</style>
