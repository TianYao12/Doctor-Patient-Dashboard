import { render, screen, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom'
import Auth from "../Auth";

afterEach(cleanup);

test("Should render authentication page", () => {
  render(<Auth />);
  
  expect(screen.getByText("Login")).toBeInTheDocument(); // check that Login shows up on the page
  expect(screen.getByPlaceholderText("email")).toBeInTheDocument(); // checks that email is a placeholder
  expect(screen.getByPlaceholderText("password")).toBeInTheDocument(); // checks that password is a placeholder


});
