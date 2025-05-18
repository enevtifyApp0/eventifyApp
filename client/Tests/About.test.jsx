import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import About from "../src/Components/About";
import React from "react";

describe("About", () => {
  // Test Case 1
  it("should render the About component", () => {
    render(<About />);

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
