<template>
  <nav class="navbar fixed w-full top-0 z-50 bg-white shadow-md px-4">
    <div class="container mx-auto flex justify-between items-center py-4">
      <!-- Logo -->
      <router-link to="/" class="brand-logo">
        <img
          src="@/assets/images/logo.png"
          alt="Snelwoningruil Logo"
          class="h-10 md:h-12"
        />
      </router-link>

      <!-- Mobile Menu Button -->
      <button @click="toggleMenu" class="mobile-menu-button md:hidden text-2xl">
        <i :class="menuOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
      </button>

      <!-- Navigation Links -->
      <ul
        :class="[
          'nav-links',
          menuOpen ? 'block' : 'hidden',
          'md:flex md:space-x-6',
        ]"
      >
        <li>
          <a href="#about-us" class="nav-link" @click="closeMenu">Over ons</a>
        </li>
        <li><a href="#faq" class="nav-link" @click="closeMenu">FAQ</a></li>
        <li>
          <a href="#contact-us" class="nav-link" @click="closeMenu">Contact</a>
        </li>
        <li>
          <a href="#signup" class="nav-link" @click="closeMenu">Aanmelden</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      menuOpen: false, // State to track if the mobile menu is open
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    closeMenu() {
      this.menuOpen = false; // Close the menu after clicking a link
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: #ffffff;
  transition: background-color 0.3s ease-in-out;
}

.brand-logo img {
  height: 40px;
  transition: height 0.3s ease-in-out;
}

.nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-links li {
  margin: 0;
}

.nav-link {
  font-size: 1rem;
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #3b82f6;
}

.mobile-menu-button {
  display: inline-block;
  background: none;
  border: none;
  cursor: pointer;
}

/* Mobile dropdown styles */
@media (max-width: 768px) {
  .nav-links {
    display: none;
    flex-direction: column;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.8);
    position: absolute;
    top: 60px; /* Adjust for navbar height */
    left: 0;
    width: 100%;
    padding: 1rem 0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 999;
  }

  .nav-links.block {
    display: flex;
  }

  .nav-link {
    color: white;
    padding: 0.75rem 0;
    display: block;
  }

  .nav-link:hover {
    background-color: rgba(59, 130, 246, 0.1);
  }
}

/* Desktop styles */
@media (min-width: 768px) {
  .nav-links {
    display: flex;
  }

  .mobile-menu-button {
    display: none;
  }
}
</style>
