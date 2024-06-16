export interface User {
  currentUser: {
    id: string;
    email: string;
  } | null;
}
