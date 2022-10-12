import useOrders from "../hooks/useOrders.js";
import usePrototypes from "../hooks/usePrototypes.js";
import useActions from "../hooks/useActions.js";
import { useMemo } from "react";

export default function Orders() {
  const orders = useOrders();
  const prototypes = usePrototypes();
  const { remove, removeAll } = useActions();

  // 총 가격 표시하기.
  const totalPrice = useMemo(() => {
    return orders
      .map((order) => {
        const { id, quantity } = order;
        const prototype = prototypes.find((p) => p.id === id); // order에 들어온 id와 상품리스트의 id가 같은 것만 가져오기.
        return prototype.price * quantity;
      })
      .reduce((l, r) => l + r, 0);
  }, [orders, prototypes]);

  // 아이템이 없을때
  if (orders.length === 0) {
    return (
      <aside>
        <div className="empty">
          <div className="title">You don't have any orders</div>
          <div className="subtitle">Click on a + to add an order</div>
        </div>
      </aside>
    );
  }

  // 아이템이 있을때
  return (
    <aside>
      <div className="order">
        <div className="body">
          {orders.map((order) => {
            const { id } = order;
            const prototype = prototypes.find((p) => p.id === id);

            const click = () => {
              remove(id);
            };

            return (
              <div key={id} className="item">
                <div className="img">
                  <img src={prototype.thumbnail} alt={prototype.title} />
                </div>
                <div className="content">
                  <p className="title">
                    {prototype.title} x {order.quantity}
                  </p>
                </div>
                <div className="action">
                  <p className="price">$ {prototype.price * order.quantity}</p>
                  <button className="btn btn--link" onClick={click}>
                    <i className="icon icon--cross"></i>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="total">
          <hr />
          <div className="item">
            <div className="content">Total</div>
            <div className="action">
              <div className="price">$ {totalPrice}</div>
            </div>
            <button className="btn btn--link" onClick={removeAll}>
              <i className="icon icon--delete"></i>
            </button>
          </div>
          <button
            className="btn btn--secondary"
            style={{ width: "100%", marginTop: 10 }}
          >
            checkout
          </button>
        </div>
      </div>
    </aside>
  );
}
