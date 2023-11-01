export interface UiUserDetails {
  firstName: string;
  lastName: string;
  email: string;
  avatar: {
    url: string;
    alt: string;
  } | null;
}
