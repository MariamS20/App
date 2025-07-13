import { UserData } from "@/types";

const STORAGE_KEY = "dlms_user_data";

export const localStorageUtils = {
  saveUserData: (data: UserData): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  getUserData: (): UserData | null => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  },

  clearUserData: (): void => {
    localStorage.removeItem(STORAGE_KEY);
  },

  updateUserData: (updates: Partial<UserData>): void => {
    const currentData = localStorageUtils.getUserData();
    if (currentData) {
      const updatedData = { ...currentData, ...updates };
      localStorageUtils.saveUserData(updatedData);
    }
  },
};
