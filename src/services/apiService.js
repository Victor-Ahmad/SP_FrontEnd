import axiosInstance from "@/plugins/axios";

const removeNullValues = (params) => {
  return Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v != null)
  );
};

export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post("/login", { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSwapHouses = async (formData, page) => {
  try {
    const url = `/get_swap_houses?page=${page}`;
    if (!formData) {
      formData = new FormData();
    }
    const response = await axiosInstance.post(url, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMyTriangleSwaps = async () => {
  try {
    const response = await axiosInstance.get("/top-perfect-swaps");
    return response.data;
  } catch (error) {
    throw error;
  }
};

//////////////////////////////////////////////////////////////////////////////////////////

//  Interested
export const getMyInterests = async () => {
  try {
    const response = await axiosInstance.get("/my_interests");
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const expressInterest = async (houseId) => {
  try {
    const response = await axiosInstance.post(`/interest/${houseId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const removeInterest = async (houseId) => {
  try {
    const response = await axiosInstance.delete(`/delete_interest`, {
      params: { house_id: houseId },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
//////////////////////////////////////////////////////////////////////////////////////////

// Not Interested
export const getMyDisinterests = async () => {
  try {
    const response = await axiosInstance.get("/my_disinterests");
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const disinterest = async (houseId) => {
  try {
    const response = await axiosInstance.post(`/disinterest/${houseId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeNotInterest = async (houseId) => {
  try {
    const response = await axiosInstance.delete(`/delete_not_interest`, {
      params: { house_id: houseId },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
//////////////////////////////////////////////////////////////////////////////////////////

// Favorite
export const getMyFavorites = async () => {
  try {
    const response = await axiosInstance.get("/my_favorites");
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const addToFavorites = async (houseId) => {
  try {
    const response = await axiosInstance.post(`/favorites/${houseId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const removeFavorite = async (houseId) => {
  try {
    const response = await axiosInstance.delete(`/delete_fav`, {
      params: { house_id: houseId },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
//////////////////////////////////////////////////////////////////////////////////////////

export const getProfileProgress = async () => {
  try {
    const response = await axiosInstance.get("/profile_progress");
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSwapWithMe = async () => {
  try {
    const response = await axiosInstance.get("/swap_with_me");
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getCompleteInterest = async () => {
  try {
    const response = await axiosInstance.get("/complete_interest");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const response = await axiosInstance.get("/get_profile");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateDescriptionAndImages = async (
  description,
  images,
  wishData
) => {
  const formData = new FormData();

  // Append description
  if (description) {
    formData.append("description", description);
  }

  // Append images
  images.forEach((image, index) => {
    const file = dataURLtoFile(image, `image${index}.png`);
    formData.append(`house[images][${index}]`, file);
  });

  // Append wish data
  if (wishData.house_type_id) {
    formData.append("wish[house_type_id]", wishData.house_type_id);
  }
  if (wishData.number_of_rooms) {
    formData.append("wish[number_of_rooms]", wishData.number_of_rooms);
  }
  if (wishData.price) {
    formData.append("wish[price]", wishData.price);
  }
  if (wishData.area) {
    formData.append("wish[area]", wishData.area);
  }
  if (wishData.floor_number) {
    formData.append("wish[floor_number]", wishData.floor_number);
  }

  // Append locations
  if (wishData.locations && wishData.locations.length > 0) {
    wishData.locations.forEach((location, index) => {
      if (location) {
        formData.append(`wish[locations][${index}]`, location);
      }
    });
  }

  // Append property_ids (house features)
  if (wishData.features && wishData.features.length > 0) {
    wishData.features.forEach((feature, index) => {
      if (feature) {
        formData.append(`wish[property_ids][${index}]`, feature);
      }
    });
  }

  try {
    const response = await axiosInstance.post(
      "update_description_images",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const updateDescriptionAndImages = async (description, images) => {
//   const formData = new FormData();
//   formData.append("description", description);
//   images.forEach((image, index) => {
//     const file = dataURLtoFile(image, `image${index}.png`);
//     formData.append(`house[images][${index}]`, file);
//   });

//   try {
//     const response = await axiosInstance.post(
//       "update_description_images",
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

const dataURLtoFile = (dataurl, filename) => {
  let arr = dataurl.split(",");
  let mime = arr[0].match(/:(.*?);/)[1];
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

export const getHouseById = async (houseId) => {
  try {
    const response = await axiosInstance.get(`/get_house_by_id/${houseId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getChats = async () => {
  try {
    const response = await axiosInstance.get(`/chats`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getChatMessages = async (chatId) => {
  try {
    const response = await axiosInstance.get(`/show_chats/${chatId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendMessage = async (message, receiverUserId) => {
  try {
    const response = await axiosInstance.post("/send_message", {
      message,
      chat_id: receiverUserId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (data) => {
  try {
    const form = new FormData();
    // Append nested wish data if it exists
    if (data.wishes) {
      data.wishes.forEach((wish, wishIndex) => {
        for (const key in wish) {
          if (key === "locations" && wish[key].length > 0) {
            wish[key].forEach((location, locationIndex) => {
              form.append(`wish[locations][${locationIndex}]`, location);
            });
          } else if (key === "features" && wish[key].length > 0) {
            wish[key].forEach((feature, featureIndex) => {
              form.append(`wish[property_ids][${featureIndex}]`, feature);
            });
          } else {
            form.append(`wish[${key}]`, wish[key]);
          }
        }
      });
    }
    console.log(data.one_to_one_swap_house["description"]); // Append nested house data if it exists
    if (data.one_to_one_swap_house) {
      for (const key in data.one_to_one_swap_house) {
        if (
          Array.isArray(data.one_to_one_swap_house[key]) &&
          data.one_to_one_swap_house[key].length > 0
        ) {
          if (key == "specific_properties") {
            data.one_to_one_swap_house[key].forEach((item, index) => {
              form.append(`house[property_ids][${index}]`, item);
            });
          } else {
            data.one_to_one_swap_house[key].forEach((item, index) => {
              form.append(`house[${key}]`, item);
            });
          }
        } else if (key == "description") {
          form.append(`house[${key}]`, data.one_to_one_swap_house[key]);
        } else if (data.one_to_one_swap_house[key]) {
          form.append(`house[${key}]`, data.one_to_one_swap_house[key]);
        }
      }
    }

    // Append other non-nested data
    const nonNestedFields = [
      "first_name",
      "last_name",
      "email",
      "phone_number",
      "agreed_privacy_policy",
      "agreed_terms_of_use",
    ];

    nonNestedFields.forEach((field) => {
      if (data[field] !== undefined) {
        form.append(field, data[field]);
      }
    });
    if (data.delete_images && data.delete_images.length > 0) {
      data.delete_images.forEach((item, index) => {
        form.append(`house[delete_images][${index}]`, item);
      });
    }
    for (let pair of form.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
    //   const form2 = new FormData();
    // form.append("wish[floor_number]", 5);
    // form.append("house[floor_number]", 3);
    if (data.images && data.images.length > 0) {
      data.images.forEach((file, index) => {
        form.append(`house[images][${index}]`, file);
      });
    }

    const response = await axiosInstance.post("/update_profile", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export const isChatExisting = async (userId) => {
  try {
    const response = await axiosInstance.get(`/is_chat_existing/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (formData) => {
  const form = new FormData();

  // Append nested wish data
  for (const key in formData.wish) {
    if (key === "locations") {
      formData.wish[key].forEach((location, index) => {
        form.append(`wish[locations][${index}]`, location);
      });
    } else if (key === "features") {
      formData.wish[key].forEach((feature, index) => {
        form.append(`wish[property_ids][${index}]`, feature);
      });
    } else {
      form.append(`wish[${key}]`, formData.wish[key]);
    }
  }

  // Append nested house data
  form.append("house[post_code]", formData.post_code);
  form.append("house[house_number]", formData.house_number);
  form.append("house[location]", formData.location_name);
  form.append("house[street]", formData.street);
  form.append("house[house_type]", formData.house_type);
  form.append("house[price]", formData.price);
  form.append("house[number_of_rooms]", formData.number_of_rooms);
  form.append("house[area]", formData.area);
  form.append("house[floor_number]", formData.floor);
  form.append("house[description]", formData.house_description);
  form.append("houaw[swap_reason]", formData.reason_for_swap);

  formData.features.forEach((feature, index) => {
    form.append(`house[property_ids][${index}]`, feature);
  });

  // Append other non-nested data
  form.append("first_name", formData.first_name);
  form.append("last_name", formData.last_name);
  form.append("email", formData.email);
  form.append("number", formData.phone_number); // Correcting the key from phone_number to number
  form.append("password", formData.password);
  form.append("password_confirmation", formData.password_confirmation);
  form.append("agreed_privacy_policy", formData.agreed_privacy_policy ? 1 : 0); // Ensure it's submitted as 1 or 0
  form.append("agreed_terms_of_use", formData.agreed_terms_of_use ? 1 : 0); // Ensure it's submitted as 1 or 0

  // Append gallery files if any
  formData.gallery.forEach((file, index) => {
    form.append(`house[images][${index}]`, file);
  });

  try {
    const response = await axiosInstance.post("/sign_up", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const validateEmailAndPhone = async (email, phoneNumber) => {
  try {
    const response = await axiosInstance.post("/validate_email_number", {
      email: email,
      number: phoneNumber,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error validating email and phone number:", error);
    throw error;
  }
};

export const getHouseTypes = async () => {
  try {
    const response = await axiosInstance.get("/get_houses_types");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getHouseFeatures = async () => {
  try {
    const response = await axiosInstance.get("/get_specific_properties");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTriangleSwapHouses = async () => {
  try {
    const response = await axiosInstance.get("/three_way_exchange");
    return response.data;
  } catch (error) {
    throw error;
  }
};
