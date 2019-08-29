import React from "react";
import { render, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MockedProvider } from "@apollo/react-testing";
import MessageList from "../components/Messages/MessageList/MessageList";
import { BrowserRouter } from "react-router-dom";
import { GET_MESSAGES_MOCK } from "../__mocks__";

import fixActWarning from "../lib/integration/act";
fixActWarning();

test("should render messagelist", async () => {
  const { getByTestId, getAllByTestId } = render(
    <BrowserRouter>
      <MockedProvider mocks={GET_MESSAGES_MOCK} addTypename={false}>
        <MessageList />
      </MockedProvider>
    </BrowserRouter>
  );

  expect(getByTestId("loading")).toBeTruthy();
  await waitForElement(() => getByTestId("messagelist"));
  expect(getAllByTestId("message")).toBeTruthy();
  expect(getAllByTestId("message-title")[0]).toHaveTextContent("Title 1");
  expect(getAllByTestId("message-body")[1]).toHaveTextContent("Body 2");
  expect(getAllByTestId("message-comments")).toHaveLength(1);
});
