import { create } from "zustand";

type EditedDiary = {
    id: number;
    title: string;
    content: string;
}

type State = {
    editedDiary: EditedDiary;
    updateEditedDiary: (payload: EditedDiary) => void;
    resetEditedDiary: () => void;
}

const useStore = create<State>((set) => ({
    editedDiary: { id: 0, title: "", content: "" }, // 初期状態
    updateEditedDiary: (payload) => set({ editedDiary: payload }), // 更新
    resetEditedDiary: () => set({ editedDiary: { id: 0, title: "", content: "" } }), // リセット
}))

export default useStore;