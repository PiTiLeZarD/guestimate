import create from "zustand";
import { combine, devtools, persist } from "zustand/middleware";
import { RepeatingTransaction } from "./utils";

export type StorePropsType = {
    startingPoint: number;
    repeatingTransactions: RepeatingTransaction[];
};

export type StoreActionsPropsType = {
    setStartingPoint: (sp: number) => void;
    setRepeatingTransactions: (transactions: RepeatingTransaction[]) => void;
};

const InitialState: StorePropsType = {
    startingPoint: 0,
    repeatingTransactions: [],
};

const StoreActions = (set: Function, get: Function): StoreActionsPropsType => ({
    setStartingPoint: (startingPoint) => set({ startingPoint }),
    setRepeatingTransactions: (repeatingTransactions) => set({ repeatingTransactions }),
});

export type useStorePropsType = StorePropsType & StoreActionsPropsType;

const store = persist(combine(InitialState, StoreActions), {
    name: "guestimate",
});

export const useStore =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
        ? create<useStorePropsType, [["zustand/devtools", never], ["zustand/persist", useStorePropsType]]>(
              /** @ts-ignore */
              devtools(store)
          )
        : /** @ts-ignore */
          create<useStorePropsType, [["zustand/persist", useStorePropsType]]>(store);
