export interface User {
  id: number;
  email: string;
  last_login_at?: string | null;
}

export interface Client {
  id: number;
  user_id: number;
  username: string;
  first_name: string;
  last_name: string;
  address?: string | null;
  avatar?: string | null;
}

export interface Vendor {
  id: number;
  user_id: number;
  name: string;
  phone_number?: string | null;
}

export interface Staff {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  role: "admin" | "moderator" | "viewer";
}

export interface FullUser {
  id: number;
  email: string;
  last_login_at?: string | null;
  client: Client | null;
  vendor: Vendor | null;
  staff: Staff | null;
}
export interface MeResponse {
  user: User;
  client: Client | null;
  vendor: Vendor | null;
  staff: Staff | null;
}
