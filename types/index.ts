export type Industry = "restaurant" | "salon" | "service" | "retail" | "other";
export type SubscriptionStatus = "incomplete" | "active" | "past_due" | "canceled";
export type FeedbackStatus = "new" | "read" | "followed_up";
export type Platform = "google" | "yelp" | "facebook";

export interface Business {
  id: string;
  owner_id: string;
  slug: string;
  name: string;
  industry: Industry;
  google_review_url: string | null;
  yelp_url: string | null;
  facebook_url: string | null;
  star_threshold: number;
  stripe_customer_id: string | null;
  subscription_status: SubscriptionStatus;
  created_at: string;
}

export interface BusinessPublic {
  id: string;
  slug: string;
  name: string;
  industry: Industry;
  google_review_url: string | null;
  yelp_url: string | null;
  facebook_url: string | null;
  star_threshold: number;
}

export interface Employee {
  id: string;
  business_id: string;
  slug: string;
  name: string;
  photo_url: string | null;
  role: string | null;
  active: boolean;
  created_at: string;
}

export interface Feedback {
  id: string;
  business_id: string;
  employee_id: string | null;
  rating: number;
  categories: string[];
  body: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  status: FeedbackStatus;
  owner_notes: string | null;
  created_at: string;
  employee?: Employee | null;
}

export interface ReviewClick {
  id: string;
  business_id: string;
  employee_id: string | null;
  rating: number;
  platform: Platform;
  created_at: string;
}

type Rel = {
  foreignKeyName: string;
  columns: string[];
  isOneToOne: boolean;
  referencedRelation: string;
  referencedColumns: string[];
};

export type Database = {
  public: {
    Tables: {
      businesses: {
        Row: Business;
        Insert: Omit<Business, "id" | "created_at">;
        Update: Partial<Omit<Business, "id" | "owner_id" | "created_at">>;
        Relationships: Rel[];
      };
      employees: {
        Row: Employee;
        Insert: Omit<Employee, "id" | "created_at">;
        Update: Partial<Omit<Employee, "id" | "business_id" | "created_at">>;
        Relationships: Rel[];
      };
      feedback: {
        Row: Omit<Feedback, "employee">;
        Insert: Omit<Feedback, "id" | "created_at" | "employee">;
        Update: Partial<Pick<Feedback, "status" | "owner_notes">>;
        Relationships: Rel[];
      };
      review_clicks: {
        Row: ReviewClick;
        Insert: Omit<ReviewClick, "id" | "created_at">;
        Update: Record<string, unknown>;
        Relationships: Rel[];
      };
    };
    Views: {
      businesses_public: {
        Row: BusinessPublic;
        Relationships: Rel[];
      };
    };
    Functions: Record<string, { Args: Record<string, unknown>; Returns: unknown }>;
    Enums: Record<string, string>;
    CompositeTypes: Record<string, Record<string, unknown>>;
  };
};
