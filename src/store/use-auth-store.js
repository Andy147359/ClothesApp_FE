import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
    persist(
        (set) => ({
            // Khởi tạo trạng thái ban đầu
            // Chưa có thông tin USER và trạng thái đăng nhập là FALSE
            user: null,
            isLoggedIn: false,

            // Lưu thông tin người dùng vào localStorage
            // Thay đổi trạng thái đăng nhập -> TRUE
            login: (user) =>
                set({
                    user,
                    isLoggedIn: true,
                }),


            // Xóa thông tin người dùng khỏi localStorage
            // Thay đổi trạng thái đăng nhập -> FALSE
            logout: () =>
                set({
                    user: null,
                    isLoggedIn: false,
                }),
        }),
        {
            name: "auth-storage"
        }
    )
);

export default useAuthStore;
