<template>
  <div
    v-if="!isNotInterested && !isHiddenAfterInterest"
    class="flex flex-col items-center mb-10 space-y-8 shadow-lg py-8 lg:px-8 duration-300 rounded custom_hover bg-white no-underline cursor-pointer"
  >
    <!-- Desktop Only -->
    <div class="w-11/12 md:w-10/12 lg:w-10/12 relative">
      <!-- Card Content -->
      <div class="flex flex-col items-center">
        <div
          class="w-full bg-white text-lg font-bold rounded px-2 lg:px-8 py-4 text-center border border-[#1c592f]"
        >
          <div>{{ myHouse.first_name }} {{ myHouse.last_name }}</div>
          <div class="text-sm">{{ myHouse.my_house_location }}</div>
          <div
            class="flex justify-between items-center lg:justify-center mt-4 ls:space-x-4"
          >
            <button
              @click.stop="handleTriangleSwapClick"
              :class="[
                'w-4/12 px-4 py-2 rounded-full border duration-300',
                isInterested ? 'text-interested-active' : 'text-interested',
              ]"
            >
              <i class="fas fa-thumbs-up mr-1"></i>
              <span class="button-text">{{
                $t("triangle.joinTriangleSwap")
              }}</span>
            </button>
            <button
              @click.stop="toggleNotInterested"
              :class="[
                ' w-4/12 px-4 py-2 rounded-full border duration-300 mx-2',
                isNotInterested ? 'bg-gray-custom text-white' : 'gray-custom',
              ]"
            >
              <i class="fas fa-thumbs-down mr-1"></i>
              <span class="button-text">{{
                $t("triangle.notInterested")
              }}</span>
            </button>
            <button
              @click.stop="joinGroupChat"
              class="w-4/12 px-4 py-2 rounded-full bg-chat-custom2 bg-white text-[#154aa8] duration-300"
            >
              <i class="fas fa-comment mr-1"></i>
              <span class="button-text">{{
                $t("triangle.joinGroupChat")
              }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Arrows Row -->
      <div class="flex justify-between relative w-full my-4">
        <div class="flex justify-center w-1/2 max-w-sm">
          <img
            :class="{
              'green-arrow': triangle.is_b_interested_in_c,
              'gray-arrow': !triangle.is_b_interested_in_c,
            }"
            src="@/assets/icons/arrow-fat.png"
            alt="Up Arrow"
            class="h-20 w-20"
          />
        </div>
        <div class="flex justify-center w-1/2 max-w-sm">
          <img
            :class="{
              'green-arrow': triangle.is_c_interested_in_a,
              'gray-arrow': !triangle.is_c_interested_in_a,
            }"
            src="@/assets/icons/arrow-fat.png"
            alt="Down Arrow"
            class="h-20 w-20"
            style="transform: rotate(180deg)"
          />
        </div>
      </div>

      <!-- House Cards Section -->
      <div
        class="hidden md:flex md:flex-row lg:flex lg:flex-row items-stretch justify-between lg:items-center relative"
      >
        <!-- First House Card -->
        <div class="flex flex-col w-full lg:w-1/2 max-w-sm relative">
          <HouseCardTriangle :house="triangle.house_b" />
        </div>
        <div class="flex flex-col justify-center max-w-sm">
          <img
            :class="{
              'green-arrow': triangle.is_a_interested_in_b,
              'gray-arrow': !triangle.is_a_interested_in_b,
            }"
            src="@/assets/icons/arrow-fat.png"
            alt="Left Arrow"
            class="h-20 w-20"
            style="transform: rotate(-90deg)"
          />
        </div>
        <!-- Second House Card -->
        <div class="flex flex-col w-full lg:w-1/2 max-w-sm relative">
          <HouseCardTriangle :house="triangle.house_a" />
        </div>
      </div>

      <!-- Mobile Only: House Cards Side by Side -->
      <div
        class="flex lg:hidden lg:flex-row items-center justify-center w-full space-x-4"
      >
        <!-- First House Card -->
        <div class="flex flex-col w-1/2 max-w-xs h-auto">
          <HouseCardTriangle :house="triangle.house_a" />
        </div>

        <!-- Second House Card -->
        <div class="flex flex-col w-1/2 max-w-xs h-auto">
          <HouseCardTriangle :house="triangle.house_b" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue"; // Import ref from Vue
import Swal from "sweetalert2"; // Import Swal from sweetalert2
import HouseCardTriangle from "@/components/HouseCardTriangle.vue";
import { useRouter } from "vue-router";
import {
  expressInterest,
  removeInterest,
  disinterest,
  removeNotInterest,
  isGroupChatExisting,
} from "@/services/apiService"; // Import necessary services

export default {
  name: "TriangleSwapCard",
  components: {
    HouseCardTriangle,
  },
  props: {
    triangle: {
      type: Object,
      required: true,
    },
    myHouse: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const isInterested = ref(props.triangle.is_c_interested_in_a);
    const isNotInterested = ref(props.triangle.is_not_interested);
    const isHiddenAfterInterest = ref(false); // New state to hide card after interest
    const showConfirmationPopup = ref(false);

    const redirectToDetails = () => {
      router.push({
        name: "TriangleSwapDetails",
        query: { triangle: JSON.stringify(props.triangle) },
      });
    };

    const handleTriangleSwapClick = async (event) => {
      event.stopPropagation();
      if (props.triangle.is_c_interested_in_a) {
        Swal.fire({
          title: "Are you sure?",
          text: "Do you want to proceed?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const response = await removeInterest(
              props.triangle.house_a.id
            ).then(() => {
              isHiddenAfterInterest.value = true;
            });
          }
        });
      } else {
        isInterested.value = !isInterested.value;
        if (isInterested.value) {
          try {
            const response = await expressInterest(props.triangle.house_a.id);
            if (response.success) {
              console.log("Interest expressed successfully:", response);
              Swal.fire({
                icon: "success",
                title: "You have successfully joined the triangle swap",
                text: "Check this card in the swaps page",
                showConfirmButton: true,
              }).then(() => {
                isHiddenAfterInterest.value = true; // Hide the card after expressing interest
              });
            } else {
              console.error("Error expressing interest:", response.message);
            }
          } catch (error) {
            console.error("Error expressing interest:", error);
          }
        } else {
          try {
            const response = await removeInterest(props.triangle.house_a.id);
            console.log("Interest removed successfully:", response);
          } catch (error) {
            console.error("Error removing interest:", error);
          }
        }
      }
    };

    const toggleNotInterested = (event) => {
      event.stopPropagation();
      handleNotInterested();
    };

    const handleNotInterested = async () => {
      if (isNotInterested.value) {
        isNotInterested.value = false;
        try {
          const response = await removeNotInterest(props.triangle.house_a.id);
          console.log("Not interested removed successfully:", response);
        } catch (error) {
          console.error("Error removing not interested:", error);
        }
      } else {
        Swal.fire({
          title: "Are you sure?",
          text: "This card will be hidden, you can check the hidden cards using the filter",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        }).then(async (result) => {
          if (result.isConfirmed) {
            isNotInterested.value = true;
            isInterested.value = false;
            try {
              const response = await disinterest(props.triangle.house_a.id);
              this.$router.push({ path: "/home" });
              console.log("Not interested successfully:", response);
            } catch (error) {
              console.error("Error expressing disinterest:", error);
            }
          }
        });
      }
    };

    return {
      redirectToDetails,
      handleTriangleSwapClick, // Bind new function
      toggleNotInterested,
      isInterested, // Track interest state
      isNotInterested, // Track not interested state
      isHiddenAfterInterest, // Track card visibility after interest
    };
  },
  methods: {
    async joinGroupChat(event) {
      event.stopPropagation();
      try {
        const response = await isGroupChatExisting(
          this.triangle.house_b.user.id,
          this.triangle.house_a.user.id
        );

        let chatId;
        if (response.success) {
          if (response.result && response.result.chat) {
            chatId = response.result?.chat?.id;
          } else {
            chatId = response.result.id;
          }

          if (chatId) {
            if (window.innerWidth <= 768) {
              this.$router.push({
                name: "MessageInterfacePage",
                params: { chatId: chatId },
                query: { otherPersonHouseId: this.house.id },
              });
            } else {
              this.$router.push({
                path: "/chatPage",
                query: { chatId },
              });
            }
          } else {
            console.error("Chat ID not found in the response:", response);
          }
        } else {
          console.error("Failed to check chat existence:", response.message);
        }
      } catch (error) {
        console.error("Failed to start chat:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Custom styles for alignment and spacing */
.flex-row {
  display: flex;
  flex-direction: row;
}

.items-center {
  align-items: center;
}

.space-y-8 > * + * {
  margin-top: 2rem; /* Adjust for vertical spacing between rows */
}

.space-x-4 > * + * {
  margin-left: 1rem; /* Adjust for horizontal spacing between items */
}

.custom_hover:hover {
  box-shadow: 0 0 10px #1c592f;
}

.cursor-pointer {
  cursor: pointer;
}

/* Arrow color classes */
.green-arrow {
  filter: invert(37%) sepia(67%) saturate(2060%) hue-rotate(98deg)
    brightness(92%) contrast(85%);
}

.gray-arrow {
  filter: grayscale(100%) brightness(60%);
}

/* Button styles */
.btn {
  padding: 8px 16px;
  border-radius: 4px;
  color: white;
  font-weight: bold;
}

.bg-red-custom {
  background-color: #8a8a8a;
}

.text-interested-active {
  border: 1px solid #1c592f;
  color: white;
  background-color: #1c592f;
}

.text-interested {
  border: 1px solid #1c592f;
  color: #1c592f;
}

.bg-chat-custom2 {
  /* background-color: #154aa8; */
  border: 1px solid #154aa8;
  /* color: #fff; */
}
.gray-custom {
  border: 1px solid #8a8a8a;
  color: #8a8a8a;
}
.gray-custom:hover {
  box-shadow: 0 0 5px #8a8a8a;
}
.bg-chat-custom2:hover {
  box-shadow: 0 0 5px #154aa8;
}

.text-interested-active:hover {
  box-shadow: 0 0 5px #1c592f;
}

/* Hide button text on mobile */
@media (max-width: 640px) {
  .button-text {
    display: none;
  }
}
</style>
