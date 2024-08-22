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
          'md:flex md:space-x-8',
        ]"
      >
        <li v-for="(link, index) in navLinks" :key="index">
          <a
            :href="link.href"
            class="nav-link hover-color transition duration-300 ease-in-out"
            @click.prevent="scrollToSection(link.section)"
          >
            {{ link.text }}
          </a>
        </li>
        <li>
          <router-link
            to="/register"
            class="nav-link cta-button transition duration-300 ease-in-out"
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
      scrolled: false, // Track if the user has scrolled down
      navLinks: [
        {
          text: "Advertenties",
          section: "landing-swaps",
          href: "#landing-swaps",
        },
        {
          text: "Hoe werkt het?",
          section: "how-it-works",
          href: "#how-it-works",
        },
        { text: "Over Ons", section: "about-us", href: "#about-us" },
        { text: "Tips", section: "tips", href: "#tips" },
        { text: "FAQ", section: "faq", href: "#faq" },
        { text: "Contact", section: "contact-us", href: "#contact-us" },
      ],
    };
  },
  computed: {
    navbarClasses() {
      return this.menuOpen || this.scrolled
        ? "navbar w-full bg-white text-black p-4 fixed top-0 shadow-md z-50 transition-all duration-300 ease-in-out"
        : "navbar w-full bg-transparent text-white p-4 fixed top-0 z-50 transition-all duration-300 ease-in-out";
    },
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    closeMenu() {
      this.menuOpen = false; // Close the menu after clicking a link
    },
    scrollToSection(sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        const navbarHeight = document.querySelector("nav").offsetHeight;
        const sectionPosition = section.offsetTop - navbarHeight;

        window.scrollTo({
          top: sectionPosition,
          behavior: "smooth",
        });

        this.closeMenu();
      }
    },
    handleScroll() {
      this.scrolled = window.scrollY > 50;
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
/* Base Navbar Styling */
.navbar {
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
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
  text-decoration: none;
  padding: 0.5rem 1rem;
  transition: color 0.3s ease;
  color: inherit;
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
}

.navbar.bg-transparent .nav-link,
.navbar.bg-transparent .cta-button {
  color: white;
}

.navbar.bg-transparent .mobile-menu-button i {
  color: white;
}

.navbar.bg-white .nav-link,
.navbar.bg-white .cta-button {
  color: #333;
}

.navbar.bg-white .mobile-menu-button i {
  color: #1c592f;
}

/* Mobile dropdown styles */
@media (max-width: 768px) {
  .nav-links {
    display: none;
    flex-direction: column;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.9);
    position: absolute;
    top: 60px; /* Adjust for navbar height */
    left: 0;
    width: 100%;
    padding: 1.5rem 0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 999;
  }

  .nav-links.block {
    display: flex;
  }

  .nav-link {
    padding: 1rem 0;
    display: block;
    width: 100%;
    margin: 0;
    text-align: center;
    color: white !important;
    font-size: 0.8rem;
    background-color: transparent; /* No background on items */
  }

  .nav-link:hover {
    color: #1c592f; /* Change text color to green on hover */
  }

  .cta-button {
    margin-top: 1rem;
    background-color: transparent; /* Remove background */
    color: white; /* Set text color to white */
    padding: 1rem 0; /* Match padding with other nav links */
    width: 100%;
  }

  .cta-button:hover {
    color: #1c592f; /* Change text color to green on hover */
    background-color: transparent; /* No background on hover */
    transform: none; /* Remove transform effect */
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
