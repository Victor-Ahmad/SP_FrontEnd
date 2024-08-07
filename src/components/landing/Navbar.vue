<template>
  <nav class="bg-white shadow-md py-4 fixed w-full z-50">
    <div class="container mx-auto flex justify-between items-center">
      <router-link to="/" class="text-2xl font-bold"
        >Snelwoningruil</router-link
      >
      <ul class="flex space-x-6">
        <li v-for="link in links" :key="link.text">
          <router-link :to="link.href" class="nav-link hover:text-blue-500">
            {{ link.text }}
          </router-link>
        </li>
        <li>
          <router-link to="/register" class="nav-link hover:text-blue-500">
            Sign Up
          </router-link>
        </li>
        <li>
          <router-link to="/login" class="nav-link hover:text-blue-500">
            Login
          </router-link>
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
      links: [
        { text: "About Us", href: "/about" },
        { text: "FAQ", href: "/faq" },
        { text: "Contact", href: "/contact" },
      ],
    };
  },
};
</script>

<style scoped>
.nav-link {
  position: relative;
  display: inline-block;
  overflow: hidden;
  transition: color 0.3s;
}
.nav-link::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  background: #3b82f6;
  bottom: 0;
  left: -100%;
  transition: left 0.3s;
}
.nav-link:hover::after {
  left: 0;
}
</style>
