"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

type CartItem = { productId: string; quantity: number };

function readCart(): CartItem[] {
  try {
    return JSON.parse(localStorage.getItem("cart") ?? "[]") as CartItem[];
  } catch {
    return [];
  }
}

export function AddToCart({ productId, disabled }: { productId: string; disabled?: boolean }) {
  const [added, setAdded] = useState(false);
  return (
    <Button
      disabled={disabled}
      className="gap-2"
      onClick={() => {
        const cart = readCart();
        const existing = cart.find((item) => item.productId === productId);
        if (existing) existing.quantity += 1;
        else cart.push({ productId, quantity: 1 });
        localStorage.setItem("cart", JSON.stringify(cart));
        window.dispatchEvent(new Event("cart-updated"));
        setAdded(true);
      }}
    >
      <ShoppingCart size={16} />
      {added ? "Added" : "Add to cart"}
    </Button>
  );
}
