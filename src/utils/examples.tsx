import { TMessageList } from "./types";
import { format, subDays } from "date-fns";

// Function to generate formatted date string
const formatDate = (date: Date) => format(date, "MMMM do");

// Today's date
const today = formatDate(new Date());

// Yesterday's date
const yesterday = formatDate(subDays(new Date(), 1));

// Date from two days ago
const twoDaysAgo = formatDate(subDays(new Date(), 2));
// Example messages for the chat
export const exampleMessages: TMessageList = {
  [today]: [
    {
      id: "1",
      content: "Hello, how can I help you today?",
      sender: "Agent",
      createdAt: "2024-05-21T09:00:00Z",
      read: true,
      reactions: {
        like: 5,
        love: 2,
        haha: 0,
        wow: 0,
        sad: 0,
        angry: 0,
      },
    },
    {
      id: "2",
      content: "I need some assistance with my account.",
      sender: "User",
      createdAt: "2024-05-21T09:01:00Z",
      read: true,
      reactions: {
        like: 2,
        love: 0,
        haha: 0,
        wow: 0,
        sad: 1,
        angry: 0,
      },
    },
    {
      id: "3",
      content: "Sure, I'd be happy to help. What seems to be the issue?",
      sender: "Agent",
      createdAt: "2024-05-21T09:02:00Z",
      read: false,
      reactions: {
        like: 3,
        love: 1,
        haha: 0,
        wow: 0,
        sad: 0,
        angry: 0,
      },
    },
  ],
  [yesterday]: [
    {
      id: "4",
      content:
        "I'm unable to log into my account despite entering the correct password.",
      sender: "User",
      createdAt: "2024-05-21T09:03:00Z",
      read: true,
      reactions: {
        like: 1,
        love: 0,
        haha: 0,
        wow: 0,
        sad: 3,
        angry: 0,
      },
    },
    {
      id: "5",
      content:
        "Let me check that for you. Can you confirm if you've tried resetting your password?",
      sender: "Agent",
      createdAt: "2024-05-21T09:04:00Z",
      read: false,
      reactions: {
        like: 2,
        love: 0,
        haha: 0,
        wow: 0,
        sad: 0,
        angry: 0,
      },
    },
    {
      id: "6",
      content:
        "Yes, I have tried resetting my password, but I still can't log in.",
      sender: "User",
      createdAt: "2024-05-21T09:05:00Z",
      read: true,
      reactions: {
        like: 1,
        love: 0,
        haha: 0,
        wow: 0,
        sad: 2,
        angry: 1,
      },
    },
  ],
  [twoDaysAgo]: [
    {
      id: "7",
      content:
        "I understand your frustration. Let's try a different approach. I'll send you a verification code to your registered email.",
      sender: "Agent",
      createdAt: "2024-05-21T09:06:00Z",
      read: false,
      reactions: {
        like: 4,
        love: 1,
        haha: 0,
        wow: 0,
        sad: 0,
        angry: 0,
      },
    },
    {
      id: "8",
      content: "Okay, I received the verification code. What should I do next?",
      sender: "User",
      createdAt: "2024-05-21T09:07:00Z",
      read: true,
      reactions: {
        like: 2,
        love: 0,
        haha: 0,
        wow: 0,
        sad: 0,
        angry: 0,
      },
    },
    {
      id: "9",
      content:
        "Please enter the verification code on the login page, and you should be able to access your account.",
      sender: "Agent",
      createdAt: "2024-05-21T09:08:00Z",
      read: false,
      reactions: {
        like: 3,
        love: 1,
        haha: 0,
        wow: 0,
        sad: 0,
        angry: 0,
      },
    },
  ],
};
