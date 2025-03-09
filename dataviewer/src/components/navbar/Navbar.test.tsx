import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Navbar from "./Navbar";

test("renders navbar with company logo", () => {
  render(<Navbar />);
  expect(screen.getByText(/GSynergy/i)).toBeInTheDocument();
});
