<template>
  <nav :class="navbarClasses">
    <div class="container flex justify-between items-center">
      <!-- Logo -->
      <a href="/" class="flex items-center">
        <img
          src="@/assets/images/logo.png"
          alt="Snelwoningruil Logo"
          class="h-10 md:h-12"
        />
      </a>

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
          <a
            href="#how-can-we-help"
            class="nav-link hover-color transition duration-300 ease-in-out"
            @click="closeMenu"
            >Hoe kunnen we helpen</a
          >
        </li>
        <li>
          <a
            href="#faq"
            class="nav-link hover-color transition duration-300 ease-in-out"
            @click="closeMenu"
            >FAQ</a
          >
        </li>
        <li>
          <a
            href="#contact-us"
            class="nav-link hover-color transition duration-300 ease-in-out"
            @click="closeMenu"
            >Contact</a
          >
        </li>
        <li>
          <router-link
            to="/register"
            class="nav-link hover-color cta-button transition duration-300 ease-in-out"
            @click="closeMenu"
            >Aanmelden</router-link
          >
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
  computed: {
    navbarClasses() {
      return this.menuOpen
        ? "w-full bg-white text-black p-4 fixed top-0 shadow-md z-50"
        : "w-full bg-white text-black p-4 fixed top-0 shadow-md z-50 transition-all duration-300 ease-in-out";
    },
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
/* Active Link Style */
.active {
  color: #1c592f;
  font-weight: bold;
}

/* Hover Link Style */
.hover-color:hover {
  color: #1c592f;
}

/* Navbar Styling */
.navbar {
  background-color: #ffffff;
  transition: background-color 0.3s ease-in-out;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
}

.nav-links li {
  margin: 0;
}

.nav-link {
  font-size: 1rem;
  color: #333;
  text-decoration: none;
  padding: 0.5rem 1rem;
  transition: color 0.3s ease, background-color 0.3s ease;
}

.cta-button {
  background-color: #1c592f;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-weight: 600;
  text-transform: uppercase;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.cta-button:hover {
  background-color: #10361c;
  transform: translateY(-2px);
  color: white;
}

.cta-button:active {
  transform: translateY(1px);
}

.mobile-menu-button {
  display: inline-block;
  background: none;
  border: none;
  cursor: pointer;
  color: #1c592f;
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
    width: 100%;
    margin: 0;
    text-align: center;
    border-radius: 0; /* Remove border-radius for full-width background */
    background-color: rgba(0, 0, 0, 0.8);
  }

  .nav-link:hover {
    background-color: rgba(59, 130, 246, 0.1);
    color: #1c592f;
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
