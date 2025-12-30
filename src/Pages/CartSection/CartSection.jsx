import React, { useState, useMemo } from 'react';

export default function CartSection() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Industrial Robot Arm',
      subtitle: '6-axis robotic arm with precision control',
      price: 125000,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=300&h=300&fit=crop',
      selected: true
    },
    {
      id: 2,
      name: 'Autonomous Mobile Robot',
      subtitle: 'AI-powered navigation with obstacle avoidance',
      price: 2000,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1563207153-f403bf289096?w=300&h=300&fit=crop',
      selected: true
    },
    {
      id: 3,
      name: 'Robotic Gripper System',
      subtitle: 'Advanced end-effector with force feedback',
      price: 35000,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=300&fit=crop',
      selected: false
    },
    {
      id: 4,
      name: 'Humanoid Robot Kit',
      subtitle: 'Programmable bipedal robot with 20 servos',
      price: 65000,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1546776310-eef45dd6d63c?w=300&h=300&fit=crop',
      selected: true
    }
  ]);

  const toggleItemSelection = (id) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const toggleSelectAll = () => {
    const allSelected = cartItems.every(item => item.selected);
    setCartItems(items =>
      items.map(item => ({ ...item, selected: !allSelected }))
    );
  };

  const updateQuantity = (id, delta) => {
    setCartItems(items =>
      items.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const removeSelected = () => {
    setCartItems(items => items.filter(item => !item.selected));
  };

  const clearAll = () => {
    setCartItems([]);
  };

  const totals = useMemo(() => {
    // Only calculate for selected items
    const selectedItems = cartItems.filter(item => item.selected);
    
    const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalDiscount = subtotal * 0.10;
    const itemFinalTotal = subtotal - totalDiscount;
    
    // Shipping logic: Rs 150 if under Rs 10000, FREE if over Rs 10000
    const shipping = itemFinalTotal > 0 ? (itemFinalTotal < 10000 ? 150 : 0) : 0;
    
    const finalTotal = itemFinalTotal + shipping;
    const totalItems = cartItems.length;
    const selectedCount = selectedItems.length;

    return {
      subtotal,
      totalDiscount,
      itemFinalTotal,
      shipping,
      finalTotal,
      totalItems,
      selectedCount
    };
  }, [cartItems]);

  const selectedItems = cartItems.filter(item => item.selected);
  const allSelected = cartItems.length > 0 && cartItems.every(item => item.selected);
  const someSelected = cartItems.some(item => item.selected);

  const TrashIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );

  const PlusIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );

  const MinusIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );

  const ArrowRightIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );

  const ArrowLeftIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );

  const DeliveryIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
      <path d="M5 17H3v-4M2 8h11v9M19 17h2v-4M16 5h4v4" />
      <rect x="2" y="3" width="13" height="5" rx="1" />
    </svg>
  );

  const CheckIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );

  const DiscountIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M9 9l6 6" />
      <path d="M15 9l-6 6" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 font-medium">
              {selectedItems.length} of {cartItems.length} items selected
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleSelectAll}
                className="w-5 h-5 cursor-pointer rounded border-2 border-blue-500 appearance-none outline-none transition-all duration-150 checked:bg-blue-500"
              />
              {allSelected && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none text-white">
                  <CheckIcon />
                </div>
              )}
            </div>
            <span className="text-gray-900 font-medium cursor-pointer" onClick={toggleSelectAll}>
              Select All ({cartItems.length})
            </span>
          </div>

          <div className="flex gap-4">
            <button
              disabled={!someSelected}
              onClick={removeSelected}
              className={`px-4 py-2 rounded-md font-medium text-sm flex items-center gap-2 transition-all duration-150 ${
                someSelected
                  ? 'bg-red-100 text-red-600 hover:bg-red-200 cursor-pointer'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <TrashIcon />
              Remove Selected
            </button>

            <button 
              onClick={clearAll}
              className="px-4 py-2 bg-red-100 text-red-600 rounded-md font-medium text-sm flex items-center gap-2 hover:bg-red-200 transition-all duration-150 cursor-pointer"
            >
              <TrashIcon />
              Clear All
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {cartItems.map(item => {
                const itemSubtotal = item.price * item.quantity;
                const itemDiscount = itemSubtotal * 0.10;
                const itemFinal = itemSubtotal - itemDiscount;

                return (
                  <div 
                    key={item.id} 
                    className={`bg-white rounded-lg p-6 shadow-md border border-gray-200 transition-all duration-150 ${
                      item.selected ? 'opacity-100' : 'opacity-70'
                    }`}
                  >
                    <div className="flex gap-6">
                      <div className="flex items-center">
                        <div className="relative mr-4">
                          <input
                            type="checkbox"
                            checked={item.selected}
                            onChange={() => toggleItemSelection(item.id)}
                            className={`w-5 h-5 cursor-pointer rounded border-2 appearance-none outline-none transition-all duration-150 ${
                              item.selected ? 'border-blue-500 bg-blue-500' : 'border-gray-300 bg-white'
                            }`}
                          />
                          {item.selected && (
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none text-white">
                              <CheckIcon />
                            </div>
                          )}
                        </div>
                        <div className="w-24 h-24 rounded-md overflow-hidden border border-gray-200">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">{item.name}</h3>
                            <p className="text-sm text-gray-600 mb-4">{item.subtitle}</p>
                          </div>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 bg-transparent p-2 rounded-md hover:bg-red-50 transition-all duration-150"
                          >
                            <TrashIcon />
                          </button>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-4 bg-gray-50 rounded-md p-1">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-2 bg-white rounded border border-gray-200 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-150 flex items-center justify-center"
                            >
                              <MinusIcon />
                            </button>
                            <span className="w-8 text-center font-semibold text-gray-900">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-2 bg-white rounded border border-gray-200 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-150 flex items-center justify-center"
                            >
                              <PlusIcon />
                            </button>
                          </div>

                          <div className="text-right">
                            <div className="flex items-center justify-end gap-2 mb-1">
                              <span className="text-gray-400 line-through">Rs {itemSubtotal.toLocaleString('en-IN')}</span>
                              <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full flex items-center gap-1">
                                <DiscountIcon />
                                10% OFF
                              </span>
                            </div>
                            <p className={`text-2xl font-bold ${item.selected ? 'text-gray-900' : 'text-gray-400'} mb-1`}>
                              Rs {itemFinal.toLocaleString('en-IN')}
                            </p>
                            <p className={`text-sm ${item.selected ? 'text-gray-600' : 'text-gray-300'}`}>
                              Rs {Math.round(item.price * 0.9).toLocaleString('en-IN')} each
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">Order Summary</h2>

                {selectedItems.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-2">No items selected</p>
                    <p className="text-sm text-gray-400">Select items to see order summary</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center text-gray-600">
                        <span>Subtotal ({totals.selectedCount} selected)</span>
                        <span className="font-semibold text-gray-900">Rs {totals.subtotal.toLocaleString('en-IN')}</span>
                      </div>

                      <div className="flex justify-between items-center text-gray-600">
                        <div className="flex items-center gap-2">
                          <span>Item Discounts (10%)</span>
                          <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">SAVINGS</span>
                        </div>
                        <span className="font-semibold text-green-600">-Rs {totals.totalDiscount.toLocaleString('en-IN')}</span>
                      </div>

                      <div className="flex justify-between items-center text-gray-600 border-t border-gray-200 pt-4">
                        <span className="font-medium">After Discounts</span>
                        <span className="font-semibold text-gray-900">Rs {totals.itemFinalTotal.toLocaleString('en-IN')}</span>
                      </div>

                      <div className="flex justify-between items-center text-gray-600">
                        <div className="flex flex-col">
                          <span>Shipping</span>
                          {totals.itemFinalTotal > 0 && totals.itemFinalTotal < 10000 && (
                            <span className="text-xs text-blue-600 mt-1">
                              Add Rs {(10000 - totals.itemFinalTotal).toLocaleString('en-IN')} for free shipping
                            </span>
                          )}
                        </div>
                        <span className={`font-semibold ${totals.shipping === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                          {totals.shipping === 0 ? 'FREE' : `Rs ${totals.shipping.toLocaleString('en-IN')}`}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mb-8 py-6 border-t-2 border-b-2 border-gray-200">
                      <span className="text-xl font-bold text-gray-900">Total</span>
                      <span className="text-3xl font-bold text-blue-600">Rs {totals.finalTotal.toLocaleString('en-IN')}</span>
                    </div>
                  </>
                )}

                <button
                  disabled={selectedItems.length === 0}
                  className={`w-full py-4 rounded-md font-semibold text-lg flex items-center justify-center gap-3 transition-all duration-300 mb-6 ${
                    selectedItems.length > 0 
                      ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg cursor-pointer' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Proceed to Checkout
                  <ArrowRightIcon />
                </button>

                <button className="w-full py-3 bg-transparent text-blue-600 rounded-md font-medium border border-blue-600 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2">
                  <ArrowLeftIcon />
                  Continue Shopping
                </button>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <DeliveryIcon />
                  <span className="font-semibold text-gray-900">Estimated Delivery</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">3-5 business days</p>
                {selectedItems.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      You saved <span className="font-semibold text-green-600">Rs {totals.totalDiscount.toLocaleString('en-IN')}</span> on this order!
                    </p>
                    {totals.itemFinalTotal >= 10000 && (
                      <p className="text-xs text-green-600 mt-2 font-semibold">
                        🎉 You got FREE shipping!
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}