import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="bg-surface rounded-xl shadow p-8 w-full max-w-lg">

        <h2 className="text-2xl font-bold text-primaryDark mb-6">
          Checkout
        </h2>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-3 rounded"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full border p-3 rounded"
          />
          <input
            type="text"
            placeholder="Shipping Address"
            className="w-full border p-3 rounded"
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full border p-3 rounded"
          />

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primaryLighter
                       text-white py-3 rounded-lg font-semibold"
          >
            Place Order
          </button>
        </form>

        <button
          onClick={() => navigate("/cart")}
          className="mt-4 text-primary text-sm"
        >
          ← Back to Cart
        </button>
      </div>
    </div>
  );
}
