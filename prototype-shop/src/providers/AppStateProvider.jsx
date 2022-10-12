import { useState } from "react";
import prod_list from "../data/product_list";
import AppStateContext from "../contexts/AppStateContext";
import { useCallback } from "react";

const AppStateProvider = ({ children }) => {
  const [prototypes, setPrototypes] = useState(prod_list);
  const [orders, setOrders] = useState([]);

  // 오더 추가할때.
  const addToOrder = useCallback((id) => {
    setOrders((orders) => {
      const finded = orders.find((order) => order.id === id); // order.id 에 id가 있는가.

      //order에 클릭한 아이템의 id가 없을때. order에 추가해줌.
      if (finded === undefined) {
        return [...orders, { id, quantity: 1 }];
      } else {
        return orders.map((order) => {
          // order에 클릭한 아이템의 id가 있을때 quantity의 갯수를 올려줌.
          if (order.id === id) {
            return {
              id,
              quantity: order.quantity + 1,
            };
          } else {
            return order;
          }
        });
      }
    });
  }, []);
  const remove = useCallback((id) => {
    setOrders((orders) => {
      // 삭제클릭된 아이템의 id만을 빼고 나머지 order에 넣어주기.
      return orders.filter((order) => order.id !== id);
    });
  }, []);
  const removeAll = useCallback(() => {
    // order의 값 비워주기
    setOrders([]);
  }, []);

  return (
    <AppStateContext.Provider
      value={{ orders, prototypes, addToOrder, remove, removeAll }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;
