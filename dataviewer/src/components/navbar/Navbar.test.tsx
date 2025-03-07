import React from "react";
import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";

test("renders navbar with company logo", () => {
  render(<Navbar />);
  expect(screen.getByText(/GSynergy/i)).toBeInTheDocument();
});
