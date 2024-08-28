import { render, screen } from "@testing-library/react";
import Login from "./Login";

test("renders the phone verification prompt", () => {
  render(<Login />);
  const verifyText = screen.getByText(/verify your phone number/i);
  expect(verifyText).toBeInTheDocument();
});
