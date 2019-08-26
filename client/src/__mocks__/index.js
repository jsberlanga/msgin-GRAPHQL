import { GET_MESSAGES_QUERY } from "../components/Messages/MessageList/MessageList";
import { ME_QUERY } from "../context/UserContext";

export const GET_MESSAGES_MOCK = [
  {
    request: {
      query: GET_MESSAGES_QUERY,
      variables: {
        skip: 0,
        first: 4,
      },
    },
    result: {
      data: {
        getMessages: [
          {
            id: "1",
            title: "Title 1",
            body: "Body 1",
            createdAt: new Date(),
            author: { id: 1, name: "Author 1" },
            comments: [{ id: 1 }],
          },
          {
            id: "2",
            title: "Title 2",
            body: "Body 2",
            createdAt: new Date(),
            author: { id: 1, name: "Author 1" },
            comments: [],
          },
        ],
      },
    },
  },
];

export const ME_MOCK = [
  {
    request: {
      query: ME_QUERY,
    },
    result: {
      data: {
        me: {
          id: 1,
          name: "testname",
          email: "testemail",
          messages: [],
          comments: [],
        },
      },
    },
  },
];

export const NOT_ME_MOCK = [
  {
    request: {
      query: ME_QUERY,
    },
    result: {
      data: {
        me: null,
      },
    },
  },
];
