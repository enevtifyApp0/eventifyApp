import "@testing-library/jest-dom"; // استيراد jest-dom لاستخدام matchers مخصصة
import { describe, it, expect } from "vitest"; // استيراد expect من Vitest
import { render, screen } from "@testing-library/react"; // استيراد أدوات التقديم
import About from "../src/Components/About";
import React from "react";

describe("About", () => {
  // Test Case 1
  it("should render the About component", () => {
    render(<About />); // تقديم مكون About

    // Assertion: تحقق مما إذا كان هناك عنصر h1
    const aboutElement = screen.getByRole("heading", { level: 1 });
    expect(aboutElement).toBeInTheDocument();
  });

  // Test Case 2
  it("should display the developer information", () => {
    render(<About />);
    const developerInfo = screen.getByText(
      /This project is developed by: Fatima Khadem and Shooq Salim/i
    );
    expect(developerInfo).toBeInTheDocument();
  });
});
