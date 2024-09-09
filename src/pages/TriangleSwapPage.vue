<template>
  <div
    v-if="triangle && myHouse"
    class="flex flex-col items-center mb-10 space-y-8 shadow-lg py-8 lg:px-8 duration-300 rounded custom_hover bg-white no-underline cursor-pointer"
  >
    <!-- Desktop Only -->
    <div class="w-full px-2 md:w-10/12 lg:w-10/12 relative">
      <!-- Card Content -->
      <div class="flex flex-col items-center">
        <div
          class="w-full bg-white font-extra-large-custom font-bold rounded px-2 lg:px-8 py-1 md:py-4 text-center border border-[#1c592f]"
        >
          <div>{{ myHouse.first_name }} {{ myHouse.last_name }}</div>
          <div class="font-small-custom">{{ myHouse.my_house_location }}</div>
          <div class="flex justify-center mt-2 md:mt-4 ls:space-x-4">
            <button
              @click.stop="handleTriangleSwapClick"
              :class="[
                'w-4/12 px-1 md:px-2 py-1 rounded-full border duration-300 font-small-custom',
                isInterested ? 'text-interested-active' : 'text-interested',
              ]"
            >
              <i
                class="fas fa-thumbs-up mr-1 font-medium-custom md:font-small-custom"
              ></i>
              <span class="button-text font-medium-custom">{{
                $t("triangle.joinTriangleSwap")
              }}</span>
            </button>
            <button
              @click.stop="toggleNotInterested"
              :class="[
                'w-4/12 px-1 md:px-2 py-1 rounded-full border duration-300 mx-2 font-small-custom',
                isNotInterested ? 'bg-gray-custom text-white' : 'gray-custom',
              ]"
            >
              <i
                class="fas fa-thumbs-down mr-1 font-medium-custom md:font-small-custom"
              ></i>
              <span class="button-text font-medium-custom">{{
                $t("triangle.notInterested")
              }}</span>
            </button>
            <button
              @click.stop="joinGroupChat"
              class="w-4/12 px-1 md:px-2 py-1 rounded-full bg-chat-custom2 bg-white text-[#154aa8] duration-300 font-small-custom"
            >
              <i
                class="fas fa-comment mr-1 font-medium-custom md:font-small-custom"
              ></i>
              <span class="button-text font-medium-custom">{{
                $t("triangle.joinGroupChat")
              }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Arrows Row -->
      <div class="flex justify-between relative w-full my-4">
        <div class="flex justify-center w-full md:w-1/2 max-w-sm">
          <img
            :class="{
              'green-arrow': triangle.is_c_interested_in_a,
              'gray-arrow': !triangle.is_c_interested_in_a,
            }"
            src="@/assets/icons/arrow-fat.png"
            alt="Down Arrow"
            class="h-auto w-1/4 lg:h-20 lg:w-20"
            style="transform: rotate(180deg)"
          />
        </div>
        <div class="flex md:hidden justify-center w-1/3 max-w-sm"></div>
        <div class="flex justify-center w-full md:w-1/2 max-w-sm">
          <img
            :class="{
              'green-arrow': triangle.is_b_interested_in_c,
              'gray-arrow': !triangle.is_b_interested_in_c,
            }"
            src="@/assets/icons/arrow-fat.png"
            alt="Up Arrow"
            class="h-auto w-1/4 lg:h-20 lg:w-20"
          />
        </div>
      </div>

      <!-- House Cards Section -->
      <div class="flex flex-row justify-between items-center relative">
        <!-- First House Card -->
        <div class="flex flex-col w-full max-w-sm relative">
          <HouseCardTriangle :house="triangle.house_a" />
        </div>
        <div class="flex justify-center w-1/3 max-w-sm">
          <img
            :class="{
              'green-arrow': triangle.is_a_interested_in_b,
              'gray-arrow': !triangle.is_a_interested_in_b,
            }"
            src="@/assets/icons/arrow-fat.png"
            alt="Right Arrow"
            class="h-auto w-3/6 lg:h-20 lg:w-20"
            style="transform: rotate(90deg)"
          />
        </div>
        <!-- Second House Card -->
        <div class="flex flex-col w-full max-w-sm relative">
          <HouseCardTriangle :house="triangle.house_b" />
        </div>
      </div>

      <!-- Mobile Only: House Cards Side by Side -->
      <!-- <div
        class="flex lg:hidden lg:flex-row items-center justify-center w-full space-x-4"
      >
        <div class="flex flex-col w-1/2 max-w-xs h-auto">
          <HouseCardTriangle :house="triangle.house_a" />
        </div>

        <div class="flex flex-col w-1/2 max-w-xs h-auto">
          <HouseCardTriangle :house="triangle.house_b" />
        </div>
      </div> -->
    </div>
  </div>
  <div v-else class="flex items-center justify-center min-h-screen">
    <p>Loading...</p>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import Swal from "sweetalert2";
import HouseCardTriangle from "@/components/HouseCardTriangle.vue";
import {
  getHousesByIds,
  expressInterest,
  removeInterest,
  disinterest,
  removeNotInterest,
  isGroupChatExisting,
} from "@/services/apiService";

export default {
  name: "TriangleSwapPage",
  components: {
    HouseCardTriangle,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const triangle = ref(null);
    const myHouse = ref(null);
    const isInterested = ref(false);
    const isNotInterested = ref(false);
    const isHiddenAfterInterest = ref(false);

    onMounted(async () => {
      const houseAId = route.params.house_a;
      const houseBId = route.params.house_b;

      try {
        const response = await getHousesByIds(houseAId, houseBId);
        if (response.success) {
          triangle.value = {
            house_a: response.result.house_a,
            house_b: response.result.house_b,
            is_c_interested_in_a: response.result.is_c_interested_in_a,
            is_b_interested_in_c: response.result.is_b_interested_in_c,
            is_a_interested_in_b: response.result.is_a_interested_in_b,
          };
          myHouse.value = response.result.my_house;

          isInterested.value = triangle.value.is_c_interested_in_a;
          isNotInterested.value = triangle.value.is_not_interested;
        } else {
          console.error("Failed to load house details.");
        }
      } catch (error) {
        console.error("Failed to fetch house details:", error);
      }
    });

    const handleTriangleSwapClick = async (event) => {
      event.stopPropagation();
      if (isInterested.value) {
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
            const response = await removeInterest(triangle.value.house_a.id);
            if (response.success) {
              isInterested.value = false;
              triangle.value.is_c_interested_in_a = false;
            }
          }
        });
      } else {
        isInterested.value = !isInterested.value;
        if (isInterested.value) {
          try {
            const response = await expressInterest(triangle.value.house_a.id);
            if (response.success) {
              triangle.value.is_c_interested_in_a = true;
              Swal.fire({
                icon: "success",
                title: "You have successfully joined the triangle swap",
                text: "Check this card in the swaps page",
                showConfirmButton: true,
              });
            } else {
              console.error("Error expressing interest:", response.message);
            }
          } catch (error) {
            console.error("Error expressing interest:", error);
          }
        } else {
          try {
            const response = await removeInterest(triangle.value.house_a.id);
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
          const response = await removeNotInterest(triangle.value.house_a.id);
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
              const response = await disinterest(triangle.value.house_a.id);
              router.push({ path: "/home" });
              console.log("Not interested successfully:", response);
            } catch (error) {
              console.error("Error expressing disinterest:", error);
            }
          }
        });
      }
    };

    const joinGroupChat = async (event) => {
      event.stopPropagation();
      try {
        const response = await isGroupChatExisting(
          triangle.value.house_b.user.id,
          triangle.value.house_a.user.id
        );

        let chatId;
        if (response.success) {
          chatId = response.result?.chat?.id || response.result.id;

          if (chatId) {
            const routeName =
              window.innerWidth <= 768 ? "MessageInterfacePage" : "chatPage";
            const routeParams = window.innerWidth <= 768 ? { chatId } : {};
            const routeQuery =
              window.innerWidth <= 768
                ? { otherPersonHouseId: myHouse.value.id }
                : { chatId };

            router.push({
              name: routeName,
              params: routeParams,
              query: routeQuery,
            });
          } else {
            console.error("Chat ID not found in the response:", response);
          }
        } else {
          console.error("Failed to check chat existence:", response.message);
        }
      } catch (error) {
        console.error("Failed to start chat:", error);
      }
    };

    return {
      triangle,
      myHouse,
      isInterested,
      isNotInterested,
      isHiddenAfterInterest,
      handleTriangleSwapClick,
      toggleNotInterested,
      joinGroupChat,
    };
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
  filter: grayscale(100%);
  opacity: 0.3;
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
    /* display: none; */
    font-size: 6px !important;
  }
}
</style>
