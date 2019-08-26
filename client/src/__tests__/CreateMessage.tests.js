import React from "react";
import CreateMessage from "../components/Messages/CreateMessage";
import MessageList from "../components/Messages/MessageList/MessageList";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter, Route } from "react-router";
import { MockedProvider } from "@apollo/react-testing";
import { CREATE_MESSAGE_MOCK, GET_MESSAGES_MOCK } from "../__mocks__";

const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

// Awesome help from:
// 1. https://spectrum.chat/testing-library/help/hi-guys-what-is-right-way-to-test-component-like-this~1ae07934-ad6c-4f97-8513-f250d39b1f17
// 2. https://github.com/apollographql/react-apollo/issues/617

test("createmessage should create new message", async () => {
  const { getByTestId } = render(
    <MockedProvider mocks={CREATE_MESSAGE_MOCK} addTypename={false}>
      <MemoryRouter initialEntries={["/add", "/messages"]}>
        <Route path="/add" component={CreateMessage} />
        <Route path="/messages" component={MessageList} />
      </MemoryRouter>
    </MockedProvider>
  );
  fireEvent.change(getByTestId("message-title"), {
    target: { value: "testtitle" },
  });
  fireEvent.change(getByTestId("message-body"), {
    target: { value: "testbody" },
  });
  fireEvent.click(getByTestId("message-submit"));
  expect(getByTestId("loading")).toBeTruthy();

  await waitForElement(() => getByTestId("messagelist"));
  expect(getByTestId("message-title")).toHaveTextContent("testtitle");
  expect(getByTestId("message-body")).toHaveTextContent("testbody");
});
