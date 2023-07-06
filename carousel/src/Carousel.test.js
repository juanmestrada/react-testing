import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

// smoke test
it("renders without crashing", function() {
  render(<Carousel photos={TEST_IMAGES} title="images for testing"/>);
});

// snapshot test
it("matches snapshot", function() {
  const {asFragment} = render(<Carousel photos={TEST_IMAGES} title="images for testing"/>);
  expect(asFragment()).toMatchSnapshot();
});

// right arrow test
it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();

  // move forward in the carousel
  fireEvent.click(rightArrow);

  // expect right arrow to be hidden
  expect(container.querySelector(".bi-arrow-right-circle")).not.toBeInTheDocument();
});

// left arrow test
it("works when you click the left arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  // expect left arrow to be hidden
  expect(container.querySelector(".bi-arrow-left-circle")).not.toBeInTheDocument();

  // move foward in carousel
  fireEvent.click(container.querySelector(".bi-arrow-right-circle"));
  
  // move backwards in the carousel
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  // expect first image to show, not the second
  expect(container.querySelector('img[alt="testing image 1"]')).toBeInTheDocument();
  expect(container.querySelector('img[alt="testing image 2"]')).not.toBeInTheDocument();
});
