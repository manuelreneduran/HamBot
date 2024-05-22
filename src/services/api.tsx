// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  TCreateEmbeddingRequest,
  TCreateMessageRequest,
  TMessageList,
  TQueryResponse,
} from "../utils/types";

const BASE_API_URL = import.meta.env.PROD
  ? import.meta.env.VITE_BASE_API_URL
  : "http://localhost:8080/api/";

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["Messages"],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  endpoints: (builder) => ({
    createEmbedding: builder.mutation<
      TQueryResponse<string>,
      TCreateEmbeddingRequest
    >({
      query: ({ userId, userInput }) => {
        return {
          url: "embeddings",
          method: "POST",
          body: { userId, userInput },
        };
      },
      invalidatesTags: ["Messages"],
    }),
    createMessage: builder.mutation<
      TQueryResponse<string>,
      TCreateMessageRequest
    >({
      query: ({ userId, text }) => {
        return {
          url: "messages",
          method: "POST",
          body: { userId, text },
        };
      },
      invalidatesTags: ["Messages"],
    }),
    getMessages: builder.query<TMessageList, string>({
      query: (userId) => {
        return {
          url: `messages`,
          method: "GET",
          params: { userId },
        };
      },
      providesTags: ["Messages"],
      transformResponse: (response: { messages: TMessageList }) =>
        response.messages,
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateEmbeddingMutation,
  useGetMessagesQuery,
  useCreateMessageMutation,
} = api;
