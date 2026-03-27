export type Condition = "New" | "Used" | "Refurbished";

export type Listing = {
  // Required fields (every listing must have these)
  id: string;
  title: string;
  price: string;
  location: string;
  timeAgo: string;
  image: any;

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
  images?: any[];
  details?: Record<string, string>;
};
