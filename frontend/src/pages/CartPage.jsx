// import React, { useEffect, useState } from 'react';
// import API from '../api/api';
// import { Link, useNavigate } from 'react-router-dom';

// export default function CartPage(){
//   const [cart, setCart] = useState({ items: [] });
//   const nav = useNavigate();

//   const load = async () => {
//     try {
//       const res = await API.get('/cart');
//       setCart(res.data);
//     } catch (err) {
//       setCart({ items: [] });
//     }
//   };

//   useEffect(()=>{ load(); }, []);

//   const updateQty = async (productId, qty) => {
//     await API.put('/cart/update', { productId, quantity: qty });
//     load();
//   };

//   const remove = async (productId) => {
//     await API.delete(`/cart/remove/${productId}`);
//     load();
//   };

//   const checkout = () => {
//     nav('/checkout');
//   };

//   const total = cart.items.reduce((s,i)=>s + i.price * i.quantity, 0);

//   return (
//     <div>
//       <h2>Your Cart</h2>
//       {cart.items.length === 0 && <div>Your cart is empty <Link to="/">Shop now</Link></div>}
//       {cart.items.map(i => (
//         <div key={i.product} className="cart-item">
//           <Link to={`/product/${i.product}`}>{i.name}</Link>
//           <div>₹{i.price}</div>
//           <input type="number" min="1" value={i.quantity} onChange={e=>updateQty(i.product, e.target.value)} />
//           <button onClick={()=>remove(i.product)}>Remove</button>
//         </div>
//       ))}
//       <h3>Total: ₹{total}</h3>
//       <button onClick={checkout} disabled={cart.items.length===0}>Proceed to Checkout</button>
//     </div>
//   );
// }
import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { Link, useNavigate } from 'react-router-dom';

export default function CartPage() {
  const [cart, setCart] = useState({ items: [] });
  const nav = useNavigate();

  const load = async () => {
    try {
      const res = await API.get('/cart');
      setCart(res.data);
    } catch (err) {
      setCart({ items: [] });
    }
  };

  useEffect(() => {
    load();
  }, []);

  const updateQty = async (productId, qty) => {
    if (qty < 1) return;
    await API.put('/cart/update', { productId, quantity: qty });
    load();
  };

  const remove = async (productId) => {
    await API.delete(`/cart/remove/${productId}`);
    load();
  };

  const checkout = () => {
    nav('/checkout');
  };

  const total = cart.items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold">🛒 Your Shopping Cart</h2>

      {cart.items.length === 0 ? (
        <div className="alert alert-info text-center shadow-sm">
          Your cart is empty.{" "}
          <Link to="/" className="fw-bold text-decoration-none">
            Shop now
          </Link>
        </div>
      ) : (
        <div className="row">
          {/* Cart Items */}
          <div className="col-lg-8">
            <div className="list-group shadow-sm rounded">
              {cart.items.map((i) => (
                <div
                  key={i.product}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <Link
                      to={`/product/${i.product}`}
                      className="fw-semibold text-decoration-none text-dark"
                    >
                      {i.name}
                    </Link>
                    <div className="text-muted small">₹{i.price}</div>
                  </div>

                  <div className="d-flex align-items-center">
                    <input
                      type="number"
                      min="1"
                      value={i.quantity}
                      onChange={(e) => updateQty(i.product, e.target.value)}
                      className="form-control form-control-sm me-2"
                      style={{ width: "70px" }}
                    />
                    <button
                      onClick={() => remove(i.product)}
                      className="btn btn-outline-danger btn-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-lg-4 mt-4 mt-lg-0">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title fw-bold">Order Summary</h5>
                <hr />
                <div className="d-flex justify-content-between mb-2">
                  <span>Total</span>
                  <span className="fw-bold">₹{total}</span>
                </div>
                <button
                  onClick={checkout}
                  disabled={cart.items.length === 0}
                  className="btn btn-success w-100 mt-3"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
