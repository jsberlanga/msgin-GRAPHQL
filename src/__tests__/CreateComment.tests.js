import React from "react";
import CreateComment from "../components/Comments/CreateComment";
import { CREATE_COMMENT_MOCK } from "../__mocks__";
import { render, fireEvent, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MockedProvider } from "@apollo/react-testing";

import fixActWarning from "../lib/integration/act";
fixActWarning();

test("createcomment should go into loading", async () => {
  const { getByTestId } = render(
    <MockedProvider mocks={CREATE_COMMENT_MOCK} addTypename={false}>
      <CreateComment messageId="123abc" />
    </MockedProvider>
  );
  expect(getByTestId("createcomment-submit")).toHaveValue("Send");
  fireEvent.change(getByTestId("createcomment-text"), {
    target: { value: "testcomment" },
  });
  expect(getByTestId("createcomment-preview")).toHaveTextContent("testcomment");
  fireEvent.click(getByTestId("createcomment-submit"));
  expect(getByTestId("createcomment-submit")).toHaveValue("Sending");
  await wait();
  expect(getByTestId("createcomment-submit")).toHaveValue("Send");
});
