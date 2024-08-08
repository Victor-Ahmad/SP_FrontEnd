<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="container mx-auto flex justify-between items-center">
      <router-link to="/" class="brand-logo">Snelwoningruil</router-link>
      <ul class="nav-links flex space-x-6 hidden md:flex">
        <li v-for="link in links" :key="link.text">
          <a :href="link.href" class="nav-link" @click="smoothScroll">{{
            link.text
          }}</a>
        </li>
      </ul>
      <button @click="toggleMenu" class="md:hidden text-2xl">
        <i class="fas" :class="menuOpen ? 'fa-times' : 'fa-bars'"></i>
      </button>
      <ul
        v-if="menuOpen"
        class="mobile-nav-links absolute left-0 top-full w-full bg-white shadow-md flex flex-col items-center space-y-4 py-4"
      >
        <li v-for="link in links" :key="link.text">
          <a :href="link.href" class="nav-link" @click="smoothScroll">{{
            link.text
          }}</a>
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
      isScrolled: false,
      menuOpen: false,
      links: [
        { text: "Over ons", href: "#about" },
        { text: "FAQ", href: "#faq" },
        { text: "Contact", href: "#contact" },
        { text: "Aanmelden", href: "#signup" },
      ],
    };
  },
  methods: {
    smoothScroll(event) {
      event.preventDefault();
      const targetId = event.target.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // adjust offset for sticky navbar
          behavior: "smooth",
        });
        this.menuOpen = false; // Close the menu on link click
      }
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 1rem 0;
  transition: background 0.3s ease-in-out;
}
.navbar.scrolled {
  background: rgba(255, 255, 255, 0.9);
}
.brand-logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}
.nav-links {
  display: flex;
  align-items: center;
}
.nav-link {
  position: relative;
  font-size: 1rem;
  color: #333;
  transition: color 0.3s ease;
}
.nav-link::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  background: #3b82f6;
  bottom: -4px;
  left: 0;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}
.nav-link:hover::after {
  transform: scaleX(1);
}
.mobile-nav-links {
  display: none;
}
@media (max-width: 768px) {
  .mobile-nav-links {
    display: flex;
  }
}
</style>
