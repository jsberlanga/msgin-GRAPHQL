import React from "react";
import App from "../components/App";
import { render, waitForElement, getByTestId } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MockedProvider, wait } from "@apollo/react-testing";
import { BrowserRouter } from "react-router-dom";
import { NOT_ME_MOCK, ME_MOCK } from "../__mocks__";

import fixActWarning from "../lib/integration/act";
fixActWarning();

describe("<App />", () => {
  test("authenticated app should render", async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <MockedProvider mocks={ME_MOCK} addTypename={false}>
          <App />
        </MockedProvider>
      </BrowserRouter>
    );
    await waitForElement(() => getByTestId("authenticated-app"));
    expect(getByTestId("authenticated-header")).toBeTruthy();
    expect(getByTestId("authenticated-header")).toHaveTextContent("Signout");
    expect(getByTestId("welcome")).toHaveTextContent("Welcome testname");
  });
  test("unauthenticated app should render", async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <MockedProvider mocks={NOT_ME_MOCK} addTypename={false}>
          <App />
        </MockedProvider>
      </BrowserRouter>
    );
    await waitForElement(() => getByTestId("unauthenticated-app"));
    expect(getByTestId("unauthenticated-header")).toBeTruthy();
    expect(getByTestId("unauthenticated-header")).toHaveTextContent(
      "Register" && "Login"
    );
  });
});
