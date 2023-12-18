import { create } from "zustand";
import { ApiCall, ApiCallType } from "../utilities";

export interface INotification {
  id: number;
  message: string;
  type: NotificationType;
}

export enum NotificationType {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
}

export interface INotificationsStore {
  notifications: INotification[];
  addNotification: (notification: INotification) => void;
  removeNotification: (id: number) => void;
}

export const useNotificationsStore = create<INotificationsStore>((set) => ({
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [...state.notifications, notification],
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));

export interface ILoggedInUserStore {
  loggedInUser: any;
  setLoggedInUser: (user: any) => void;
  token: string;
  setToken: (token: string) => void;
  type: string;
  setType: (type: string) => void;
}

export const useLoggedInUserStore = create<ILoggedInUserStore>((set) => ({
  loggedInUser: {},
  setLoggedInUser: (user) => {
    const c = ApiCall({ type: ApiCallType.GET, url: `/users/${user}` });
    set({ loggedInUser: c });
  },
  token: localStorage.getItem("token") || "",
  setToken: (token) => {
    set({ token: token });
    localStorage.setItem("token", token);
  },
  type: "",
  setType: (type) => set({ type: type }),
}));

export interface IDataStore {
  data: any;
  setData: (data: any) => void;
}

export const useDataStore = create<IDataStore>((set) => ({
  data: {},
  setData: (data) => set({ data: data }),
}));
