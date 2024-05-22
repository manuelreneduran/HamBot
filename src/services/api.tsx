// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  TCreateChatHistoryRequest,
  TMessageList,
  TQueryResponse,
} from "../utils/types";

const BASE_API_URL = import.meta.env.PROD
  ? import.meta.env.VITE_BASE_API_URL
  : "http://localhost:8080/api/";

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["Chat"],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  endpoints: (builder) => ({
    createChatHistory: builder.mutation<
      TQueryResponse<string>,
      TCreateChatHistoryRequest
    >({
      query: ({ userId, userInput }) => {
        return {
          url: "chat",
          method: "POST",
          body: { userId, userInput },
        };
      },
      invalidatesTags: ["Chat"],
    }),
    getChatHistory: builder.query<TMessageList, string>({
      query: (userId) => {
        return {
          url: `chat`,
          method: "GET",
          params: { userId },
        };
      },
      providesTags: ["Chat"],
      transformResponse: (response: { chatHistory: TMessageList }) =>
        response.chatHistory,
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useCreateChatHistoryMutation, useGetChatHistoryQuery } = api;
