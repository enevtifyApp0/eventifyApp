import { it, expect, describe } from "vitest";

// هذا اختبار بسيط مرتبط بالحجوزات
describe("Booking Calculation", () => {
  it("should calculate total price correctly", () => {
    const ticketPrice = 5;
    const quantity = 2;
    const tax = 0.1;
    const total = ticketPrice * quantity * (1 + tax); // السعر × الكمية × الضريبة
    expect(total).toBe(11); // 5 × 2 = 10 + 10% = 11
  });

  it("should pass basic truthy check", () => {
    expect(1).toBeTruthy();
  });
});
