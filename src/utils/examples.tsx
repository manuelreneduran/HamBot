import { formatTime } from "./date";
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
      createdAt: formatTime("2024-05-21T09:00:00Z"),
      read: true,
      reactions: {
        like: false,
        love: false,
        haha: false,
        wow: false,
        sad: false,
        angry: false,
      },
    },
    {
      id: "2",
      content: "I need some assistance with my account.",
      sender: "User",
      createdAt: formatTime("2024-05-21T09:01:00Z"),
      read: true,
      reactions: {
        like: false,
        love: false,
        haha: false,
        wow: false,
        sad: false,
        angry: false,
      },
    },
    {
      id: "3",
      content: "Sure, I'd be happy to help. What seems to be the issue?",
      sender: "Agent",
      createdAt: formatTime("2024-05-21T09:02:00Z"),
      read: false,
      reactions: {
        like: false,
        love: true,
        haha: false,
        wow: false,
        sad: false,
        angry: false,
      },
    },
  ],
  [yesterday]: [
    {
      id: "4",
      content:
        "I'm unable to log into my account despite entering the correct password.",
      sender: "User",
      createdAt: formatTime("2024-05-21T09:03:00Z"),
      read: true,
      reactions: {
        like: false,
        love: true,
        haha: false,
        wow: false,
        sad: false,
        angry: false,
      },
    },
    {
      id: "5",
      content:
        "Let me check that for you. Can you confirm if you've tried resetting your password?",
      sender: "Agent",
      createdAt: formatTime("2024-05-21T09:04:00Z"),
      read: false,
      reactions: {
        like: false,
        love: false,
        haha: false,
        wow: false,
        sad: false,
        angry: true,
      },
    },
    {
      id: "6",
      content:
        "Yes, I have tried resetting my password, but I still can't log in.",
      sender: "User",
      createdAt: formatTime("2024-05-21T09:05:00Z"),
      read: true,
      reactions: {
        like: false,
        love: false,
        haha: false,
        wow: true,
        sad: false,
        angry: false,
      },
    },
  ],
  [twoDaysAgo]: [
    {
      id: "7",
      content:
        "I understand your frustration. Let's try a different approach. I'll send you a verification code to your registered email.",
      sender: "Agent",
      createdAt: formatTime("2024-05-21T09:06:00Z"),
      read: false,
      reactions: {
        like: true,
        love: false,
        haha: false,
        wow: false,
        sad: false,
        angry: false,
      },
    },
    {
      id: "8",
      content: "Okay, I received the verification code. What should I do next?",
      sender: "User",
      createdAt: formatTime("2024-05-21T09:07:00Z"),
      read: true,
      reactions: {
        like: false,
        love: false,
        haha: false,
        wow: false,
        sad: false,
        angry: false,
      },
    },
    {
      id: "9",
      content:
        "Please enter the verification code on the login page, and you should be able to access your account.",
      sender: "Agent",
      createdAt: formatTime("2024-05-21T09:08:00Z"),
      read: false,
      reactions: {
        like: false,
        love: false,
        haha: false,
        wow: false,
        sad: false,
        angry: false,
      },
    },
  ],
};
