import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("App", () => {
  it("renders headline", () => {
    render(<App title="Yu-Gi-Oh! Memory Card" />);

    screen.debug();

    // check if App components renders headline
  });
});

describe("Game renders", () => {
  it("renders the game button", () => {
    render(<App />);
    const startButton = screen.getByRole("button", { name: /start game/i });
    expect(startButton).toBeInTheDocument();
  });
});

describe("score display", () => {
  it("renders score display", async () => {
    // mock the API fetch first
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            data: Array(12).fill({
              name: "Test Card",
              card_images: [{ image_url_small: "test.jpg" }],
            }),
          }),
      })
    );
    const user = userEvent.setup();
    render(<App />);

    const startButton = screen.getByRole("button", { name: /start game/i });

    await user.click(startButton);

    //wait for score to appear
    await screen.findByText(/Current Score/i);

    //now test for the score
    const scoreElement = screen.getByText(/Current Score/i);

    expect(scoreElement).toBeInTheDocument();
  });
});

describe("API Fetching", () => {
  it("shows loading state when fetching", () => {
    render(<App />);
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            data: Array(12).fill({
              name: "Test Card",
              card_images: [{ image_url_small: "test.jpg" }],
            }),
          }),
      })
    );
  });

  // it ("Displays error message on API failure". () => {

  // });

  // it ("successfully loads cards from API", () => {

  // })
});
