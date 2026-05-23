export type Condition = "New" | "Used" | "Refurbished";
export type ListingStatus = "active" | "deactivated" | "sold";

export type Listing = {
  // Required fields (every listing must have these)
  id: string;
  title: string;
  price: string;
  location: string;
  timeAgo: string;
  image: any;

  // Structured location (new posts)
  province?: string;
  district?: string;
  city?: string;
  address?: string;

  // Optional fields (not every listing needs these)
  isFeatured?: boolean;
  description?: string;
  brand?: string;
  model?: string;
  color?: string;
  condition?: Condition;
  category?: string;
  sellerName?: string;
  sellerPhone?: string;
  hidePhone?: boolean;
  status?: ListingStatus;
  images?: any[];
  details?: Record<string, string>;
  sellerId?: string;
};
