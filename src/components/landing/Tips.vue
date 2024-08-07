<template>
  <section id="tips" class="py-12 bg-white" data-aos="fade-up">
    <div class="container mx-auto">
      <h2 class="text-4xl font-bold mb-6">Tips for a Successful Exchange</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ul class="list-disc pl-6 space-y-4 text-lg">
          <li>
            <strong>Add Photos:</strong> Make sure to add clear and bright
            photos of your home. Listings with photos have a higher success
            rate.
          </li>
          <li>
            <strong>Home Description:</strong> These details help the site’s
            system find options that truly match you.
          </li>
          <li>
            <strong>Communicate Clearly:</strong> Discuss all your wishes and
            needs with your exchange partner. Clear communication helps avoid
            misunderstandings.
          </li>
          <li>
            <strong>Realistic Expectations:</strong> Everyone is looking for
            their ideal home. It’s natural that houses are allocated based on
            income situation and household size. Look forTo create a highly
            engaging and visually appealing landing page, we'll integrate
            several modern design elements and features inspired by top landing
            page examples and trends. Here are the enhanced components and new
            features based on the research: ### Key Enhancements and Features:
            1. **Bold Headlines and Subheadlines**: Catch attention with clear,
            concise, and bold headlines. 2. **Visual Hierarchy and Ample White
            Space**: Guide the user's eye through the content effectively. 3.
            **High-Quality Imagery and Custom Graphics**: Enhance visual appeal
            with professional images and custom graphics. 4. **Animated Visuals
            and Micro-Interactions**: Engage users with smooth animations and
            interactive elements. 5. **Clear and Strong CTAs**: Use visually
            appealing buttons with compelling text. 6. **Social Proof and
            Testimonials**: Build trust with customer quotes, reviews, and
            ratings. 7. **Live Chat Support**: Provide immediate assistance to
            visitors with live chat. ### Implementation: #### 1. Enhanced Navbar
            Component:
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "Navbar",
  data() {
    return {
      links: [
        { text: "About Us", href: "#about" },
        { text: "FAQ", href: "#faq" },
        { text: "Contact", href: "#contact" },
        { text: "Sign Up", href: "#signup" },
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
