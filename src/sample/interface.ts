
export interface Item {
  id: number;
  name: string;
}

export interface State {
  items: Item[];

  specialItem: {
    item: Item
  };
}

export const initialState: State = {
  items: [],
  specialItem: { item: {id: 100, name: "Special" } }
};

