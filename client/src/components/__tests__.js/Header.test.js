import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../Header";

afterEach(cleanup);
test("test that main text pops up", () => {
  render(<Header />);
  const title = screen.getByText(/Dashboard/i);
  expect(title).toBeInTheDocument();

  const signout = screen.getByText(/Sign Out/i);
  expect(signout).toBeInTheDocument();
});
