import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Auth from "../Auth";

afterEach(cleanup);

test("Should render login page", () => {
  render(<Auth />);
  const loginElement = screen.getByText("Login"); // check that Login shows up on the page
  expect(loginElement).toBeInTheDocument();

  const emailPlaceholder = screen.getByPlaceholderText("email"); // check that email is a placeholder
  expect(emailPlaceholder).toBeInTheDocument();

  const passwordPlaceholder = screen.getByPlaceholderText("password"); // check that password is a placeholder
  expect(passwordPlaceholder).toBeInTheDocument();
});

test("Should render signup page", () => {
  render(<Auth />);
  fireEvent.click(screen.getByText("Sign Up"));

  const loginElement = screen.getByText("Sign Up"); // check that Login shows up on the page
  expect(loginElement).toBeInTheDocument();

  const emailPlaceholder = screen.getByPlaceholderText("email"); // check that email is a placeholder
  expect(emailPlaceholder).toBeInTheDocument();

  const passwordPlaceholder = screen.getByPlaceholderText("password"); // check that password is a placeholder
  expect(passwordPlaceholder).toBeInTheDocument();

  const confirmPasswordPlaceholder =
    screen.getByPlaceholderText("confirm password"); // check that confirm password is placeholder
  expect(confirmPasswordPlaceholder).toBeInTheDocument();

  fireEvent.click(screen.getByText("Log In")); // can toggle between login and signup pages
  expect(loginElement).toBeInTheDocument()
  fireEvent.click(screen.getByText("Sign Up"))
  const signupElement = screen.getByText("Sign Up")
  expect(signupElement).toBeInTheDocument()
});

// simulate user input
test("Should take user input", () => {
  render(<Auth />);
  fireEvent.change(screen.getByPlaceholderText("email"), {
    target: { value: "testemail@gmail.com" },
  });
  const emailElement = screen.getByPlaceholderText("email");
  expect(emailElement).toHaveValue("testemail@gmail.com");

  fireEvent.change(screen.getByPlaceholderText("password"), {
    target: { value: "testpassword" },
  });
  const passwordElement = screen.getByPlaceholderText("password");
  expect(passwordElement).toHaveValue("testpassword");
});
