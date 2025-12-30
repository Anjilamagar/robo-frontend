import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { Trash2, ShoppingCart, ShoppingCartIcon } from "lucide-react";
// import userLogo from "@/assets/userLogo.png";

// const API = "http://localhost:5000/cart/getCart";

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const id=useParams()
  const token=localStorage.getItem("token")

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  /* ---------------- GET CART ---------------- */
  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/cart/getCart`, {
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      setCart(res.data.cart);
    } catch (error) {
      console.error("Fetch cart error", error);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UPDATE QUANTITY ---------------- */
  const updateQuantity = async (productId, type) => {
    try {
      const res = await axios.put(
        `${`http://localhost:5000/cart/getCart`}/update`,
        { productId, type },
        axiosConfig
      );
      setCart(res.data.cart);
    } catch (error) {
      console.error("Update quantity error", error);
    }
  };

  /* ---------------- REMOVE ITEM ---------------- */
  const removeItem = async (productId) => {
    try {
      const res = await axios.delete(`${`http://localhost:5000/cart/getCart`}/remove`, {
        ...axiosConfig,
        data: { productId },
      });
      setCart(res.data.cart);
    } catch (error) {
      console.error("Remove item error", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  /* ---------------- STATES ---------------- */
  if (loading) return <div className="pt-20 text-center">Loading...</div>;

  if (!cart || cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <ShoppingCartIcon className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <p className="text-gray-600 mt-2">
          Looks like you haven’t added anything yet
        </p>
        <Button
          onClick={() => navigate("/product")}
          className="mt-6 bg-pink-600"
        >
          Start Shopping
        </Button>
      </div>
    );
  }

  const shipping = cart.totalPrice > 0 ? 500 : 0;
  const total = cart.totalPrice + shipping;

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-7">Shopping Cart</h1>

        <div className="flex gap-7">
          {/* ITEMS */}
          <div className="flex-1 flex flex-col gap-5">
            {cart.items.map((item) => (
              <Card key={item.productId._id}>
                <div className="flex justify-between items-center p-5">
                  <div className="flex gap-4 items-center w-[300px]">
                    {/* <img
                      src={userLogo}
                      className="w-24 h-24 object-cover"
                      alt="product"
                    /> */}
                    <div>
                      <h3 className="font-semibold">
                        {item.productId.name}
                      </h3>
                      <p>Rs {item.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      onClick={() =>
                        updateQuantity(item.productId._id, "decrease")
                      }
                    >
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      variant="outline"
                      onClick={() =>
                        updateQuantity(item.productId._id, "increase")
                      }
                    >
                      +
                    </Button>
                  </div>

                  <p className="font-medium">
                    Rs {item.price * item.quantity}
                  </p>

                  <Button
                    variant="ghost"
                    className="text-red-500"
                    onClick={() => removeItem(item.productId._id)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Remove
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* SUMMARY */}
          <Card className="w-[400px] h-fit">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rs {cart.totalPrice}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Rs {shipping}</span>
              </div>

              <Separator />

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>Rs {total}</span>
              </div>

              <Button className="w-full bg-pink-600">
                Place Order
              </Button>

              <Button variant="outline" className="w-full">
                <Link to="/product">Continue Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
