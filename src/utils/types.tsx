/* NAVIGATION TYPES */
export enum EPaths {
  DASHBOARD = "/dashboard",
  LOGIN = "/login",
  REGISTER = "/register",
  RESET_PASSWORD = "/reset-password",
  LOGOUT = "/logout",
}

export enum EMenuItemSettings {
  LOGOUT = "Logout",
}

export enum ERoles {
  USER = "user",
  ADMIN = "admin",
}

export enum ETiers {
  FREE = "free",
  PRO = "pro",
}

/* API Response Types */

export type TQueryResponse<T> = {
  result: T;
};

export type TCreateChatHistoryRequest = {
  userId: string;
  userInput: string;
};

/* Auth Types */

export type TUser = {
  uid: string;
  authProvider: string;
  email: string;
};

export type TLoginFormInputs = {
  email: string;
  password: string;
};

export type TRegistrationFormInputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type TResetPasswordFormInputs = {
  email: string;
};

export type TMessageList = {
  [key: string]: TMessage[];
};

export type TMessage = {
  id: string;
  content: string;
  sender: "User" | "Agent";
  createdAt: string;
  read: boolean;
  reactions: {
    [key in TEmoji]: boolean;
  };
};

export type TEmoji = "like" | "love" | "haha" | "wow" | "sad" | "angry";
