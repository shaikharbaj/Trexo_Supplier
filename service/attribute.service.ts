import { store } from "@/redux/store";
import { fetchAttributeDropdownByCategoryThunk } from "@/redux/thunk/attribute.thunk";

//Function to fetch attribute dropdown as per category
export const fetchAttributeDropdownByCategory = async (categoryId: number) => {
  try {
    const { payload } = await store.dispatch(fetchAttributeDropdownByCategoryThunk(categoryId));
    return payload;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};
