export type SubCategory = {
  id: string;
  label: string;
  icon: string;
  children?: SubCategory[];
};

export type CategoryData = {
  id: string;
  label: string;
  icon: string;
  subCategories: SubCategory[];
};

export const CATEGORIES: CategoryData[] = [
  {
    id: "mobiles",
    label: "Mobiles",
    icon: "phone-portrait-outline",
    subCategories: [
      {
        id: "mobile-phones",
        label: "Mobile Phones",
        icon: "phone-portrait-outline",
      },
      {
        id: "tablets",
        label: "Tablets",
        icon: "tablet-portrait-outline",
      },
      {
        id: "smart-watches",
        label: "Smart Watches",
        icon: "watch-outline",
      },
      {
        id: "landline-phones",
        label: "Landline Phones",
        icon: "call-outline",
      },
    ],
  },
  {
    id: "vehicles",
    label: "Vehicles",
    icon: "car-outline",
    subCategories: [
      {
        id: "cars",
        label: "Cars",
        icon: "car-outline",
      },
      {
        id: "buses-vans-trucks",
        label: "Buses, Vans & Trucks",
        icon: "bus-outline",
      },
      {
        id: "rickshaw-chingchi",
        label: "Rickshaw & Chingchi",
        icon: "car-sport-outline",
      },
      {
        id: "tractors-trailers",
        label: "Tractors & Trailers",
        icon: "construct-outline",
      },
      {
        id: "cars-on-installments",
        label: "Cars on Installments",
        icon: "cash-outline",
      },
      {
        id: "other-vehicles",
        label: "Other Vehicles",
        icon: "apps-outline",
      },
      {
        id: "boats",
        label: "Boats",
        icon: "boat-outline",
      },
    ],
  },
  {
    id: "property-for-sale",
    label: "Property for Sale",
    icon: "home-outline",
    subCategories: [
      {
        id: "land-plots",
        label: "Land & Plots",
        icon: "map-outline",
      },
      {
        id: "houses",
        label: "Houses",
        icon: "home-outline",
      },
      {
        id: "apartments-flats",
        label: "Apartments & Flats",
        icon: "business-outline",
      },
      {
        id: "shops-offices-commercial-space",
        label: "Shops - Offices - Commercial Space",
        icon: "storefront-outline",
      },
      {
        id: "portions-floors",
        label: "Portions & Floors",
        icon: "layers-outline",
      },
    ],
  },
  {
    id: "property-for-rent",
    label: "Property for Rent",
    icon: "key-outline",
    subCategories: [
      {
        id: "rent-houses",
        label: "Houses",
        icon: "home-outline",
      },
      {
        id: "rent-apartments-flats",
        label: "Apartments & Flats",
        icon: "business-outline",
      },
      {
        id: "rent-portions-floors",
        label: "Portions & Floors",
        icon: "layers-outline",
      },
      {
        id: "rent-rooms",
        label: "Rooms",
        icon: "bed-outline",
      },
      {
        id: "rent-shops-offices-commercial-space",
        label: "Shops - Offices - Commercial Space",
        icon: "storefront-outline",
      },
      {
        id: "rent-land-plots",
        label: "Land & Plots",
        icon: "map-outline",
      },
      {
        id: "rent-roommates-paying-guests",
        label: "Roommates & Paying Guests",
        icon: "people-outline",
      },
      {
        id: "rent-vacation-rentals-guest-houses",
        label: "Vacation Rentals - Guest Houses",
        icon: "airplane-outline",
      },
    ],
  },
  {
    id: "animals",
    label: "Animals",
    icon: "paw-outline",
    subCategories: [
      { id: "hens", label: "Hens", icon: "logo-twitter" },
      { id: "cats", label: "Cats", icon: "paw-outline" },
      { id: "parrots", label: "Parrots", icon: "leaf-outline" },
      { id: "dogs", label: "Dogs", icon: "paw-outline" },
      { id: "pigeons", label: "Pigeons", icon: "navigate-outline" },
      { id: "rabbits", label: "Rabbits", icon: "ellipse-outline" },
      { id: "finches", label: "Finches", icon: "leaf-outline" },
      { id: "fish", label: "Fish", icon: "fish-outline" },
      { id: "fertile-eggs", label: "Fertile Eggs", icon: "egg-outline" },
      { id: "other-birds", label: "Other Birds", icon: "airplane-outline" },
      { id: "ducks", label: "Ducks", icon: "water-outline" },
      {
        id: "other-animals",
        label: "Other Animals",
        icon: "apps-outline",
      },
      { id: "doves", label: "Doves", icon: "paper-plane-outline" },
      { id: "peacocks", label: "Peacocks", icon: "color-palette-outline" },
      { id: "horses", label: "Horses", icon: "walk-outline" },
    ],
  },
  {
    id: "services",
    label: "Services",
    icon: "briefcase-outline",
    subCategories: [
      { id: "other-services", label: "Other Services", icon: "apps-outline" },
      { id: "car-rental", label: "Car Rental", icon: "car-outline" },
      {
        id: "tuition-academic",
        label: "Tuition & Academic",
        icon: "school-outline",
      },
      {
        id: "web-development",
        label: "Web Development",
        icon: "code-slash-outline",
      },
      {
        id: "electronics-computer-repair",
        label: "Electronics & Computer Repair",
        icon: "hardware-chip-outline",
      },
      { id: "travel-visa", label: "Travel & Visa", icon: "airplane-outline" },
      {
        id: "farms-fresh-food",
        label: "Farms & Fresh Food",
        icon: "leaf-outline",
      },
      {
        id: "construction-services",
        label: "Construction Services",
        icon: "construct-outline",
      },
      {
        id: "event-services",
        label: "Event Services",
        icon: "sparkles-outline",
      },
      {
        id: "movers-packers",
        label: "Movers and Packers",
        icon: "cube-outline",
      },
      {
        id: "architecture-interior-design",
        label: "Architecture & Interior Design",
        icon: "color-wand-outline",
      },
      {
        id: "video-photography",
        label: "Video & Photography",
        icon: "videocam-outline",
      },
      {
        id: "camera-installation",
        label: "Camera Installation",
        icon: "camera-outline",
      },
      {
        id: "renting-services",
        label: "Renting Services",
        icon: "key-outline",
      },
      { id: "car-services", label: "Car Services", icon: "build-outline" },
      {
        id: "catering-restaurent",
        label: "Catering & Restaurent",
        icon: "restaurant-outline",
      },
      {
        id: "tailor-services",
        label: "Tailor Services",
        icon: "shirt-outline",
      },
      {
        id: "insurance-services",
        label: "Insurance Services",
        icon: "shield-checkmark-outline",
      },
    ],
  },
  {
    id: "electronics-home-appliances",
    label: "Electronics and Home Appliances",
    icon: "tv-outline",
    subCategories: [
      {
        id: "other-home-appliances",
        label: "Other Home Appliances",
        icon: "apps-outline",
      },
      {
        id: "sewing-machines",
        label: "Sewing Machines",
        icon: "shirt-outline",
      },
      {
        id: "water-dispensers",
        label: "Water Dispensers",
        icon: "water-outline",
      },
      {
        id: "air-purifiers",
        label: "Air Purifiers",
        icon: "leaf-outline",
      },
    ],
  },
  {
    id: "bike",
    label: "Bike",
    icon: "bicycle-outline",
    subCategories: [
      {
        id: "atv-quads",
        label: "ATV & Quads",
        icon: "bicycle-outline",
      },
    ],
  },
  {
    id: "business-industries-agriculture",
    label: "Business, Industries & Agriculture",
    icon: "business-outline",
    subCategories: [
      {
        id: "other-business-industry",
        label: "Other Business & Industry",
        icon: "briefcase-outline",
      },
    ],
  },
  {
    id: "jobs",
    label: "Jobs",
    icon: "briefcase-outline",
    subCategories: [
      { id: "other-jobs", label: "Other Jobs", icon: "apps-outline" },
      { id: "online-jobs", label: "Online Jobs", icon: "laptop-outline" },
      { id: "sales-jobs", label: "Sales Jobs", icon: "trending-up-outline" },
      { id: "part-time-jobs", label: "Part Time Jobs", icon: "time-outline" },
      {
        id: "restaurants-hospitality-jobs",
        label: "Restaurants & Hospitality Jobs",
        icon: "restaurant-outline",
      },
      {
        id: "customer-service-jobs",
        label: "Customer Service Jobs",
        icon: "call-outline",
      },
      {
        id: "domestic-staff-jobs",
        label: "Domestic Staff Jobs",
        icon: "home-outline",
      },
      {
        id: "marketing-jobs",
        label: "Marketing Jobs",
        icon: "megaphone-outline",
      },
      { id: "education-jobs", label: "Education Jobs", icon: "school-outline" },
      { id: "medical-jobs", label: "Medical Jobs", icon: "medkit-outline" },
      {
        id: "delivery-riders-jobs",
        label: "Delivery Riders Jobs",
        icon: "bicycle-outline",
      },
      {
        id: "accounting-finance-jobs",
        label: "Accounting & Finance Jobs",
        icon: "calculator-outline",
      },
      {
        id: "it-networking-jobs",
        label: "IT & Networking Jobs",
        icon: "desktop-outline",
      },
      {
        id: "graphic-design-jobs",
        label: "Graphic Design Jobs",
        icon: "color-palette-outline",
      },
      {
        id: "hotels-tourism-jobs",
        label: "Hotels & Tourism Jobs",
        icon: "airplane-outline",
      },
      {
        id: "engineering-jobs",
        label: "Engineering Jobs",
        icon: "construct-outline",
      },
      {
        id: "security-jobs",
        label: "Security Jobs",
        icon: "shield-checkmark-outline",
      },
      {
        id: "manufacturing-jobs",
        label: "Manufacturing",
        icon: "build-outline",
      },
      {
        id: "clerical-administration-jobs",
        label: "Clerical & Administration Jobs",
        icon: "document-text-outline",
      },
      {
        id: "content-writing-jobs",
        label: "Content Writing Jobs",
        icon: "create-outline",
      },
      {
        id: "human-resources-jobs",
        label: "Human Resources Jobs",
        icon: "people-outline",
      },
      {
        id: "real-estate-jobs",
        label: "Real Estate Jobs",
        icon: "business-outline",
      },
      {
        id: "internships-jobs",
        label: "Internships Jobs",
        icon: "school-outline",
      },
      {
        id: "advertising-pr-jobs",
        label: "Advertising & PR Jobs",
        icon: "radio-outline",
      },
      {
        id: "architecture-interior-design-jobs",
        label: "Architecture & Interior Design Jobs",
        icon: "color-wand-outline",
      },
    ],
  },
  {
    id: "furniture-home-decor",
    label: "Furniture & Home Decor",
    icon: "home-outline",
    subCategories: [
      {
        id: "other-household-items",
        label: "Other Household Items",
        icon: "apps-outline",
      },
      {
        id: "home-diy-renovation",
        label: "Home DIY & Renovation",
        icon: "build-outline",
      },
    ],
  },
  {
    id: "fashion-beauty",
    label: "Fashion & Beauty",
    icon: "shirt-outline",
    subCategories: [
      {
        id: "watches",
        label: "Watches",
        icon: "watch-outline",
      },
      {
        id: "footwear",
        label: "Footwear",
        icon: "footsteps-outline",
      },
      {
        id: "jewellery",
        label: "Jewellery",
        icon: "diamond-outline",
      },
      {
        id: "bags",
        label: "Bags",
        icon: "briefcase-outline",
      },
      {
        id: "fragrance",
        label: "Fragrance",
        icon: "flower-outline",
      },
      {
        id: "other-fashion",
        label: "Other Fashion",
        icon: "apps-outline",
      },
      {
        id: "diy-jewellery",
        label: "DIY Jewellery",
        icon: "construct-outline",
      },
    ],
  },
  {
    id: "books-sports-hobbies",
    label: "Books, Sports & Hobbies",
    icon: "book-outline",
    subCategories: [
      {
        id: "gym-fitness",
        label: "Gym & Fitness",
        icon: "barbell-outline",
      },
      {
        id: "sports-equipment",
        label: "Sports Equipment",
        icon: "football-outline",
      },
      {
        id: "other-hobbies",
        label: "Other Hobbies",
        icon: "apps-outline",
      },
      {
        id: "calendars",
        label: "Calendars",
        icon: "calendar-outline",
      },
    ],
  },
  {
    id: "kids",
    label: "Kids",
    icon: "heart-outline",
    subCategories: [
      {
        id: "toys",
        label: "Toys",
        icon: "balloon-outline",
      },
      {
        id: "swing-slides",
        label: "Swing & Slides",
        icon: "golf-outline",
      },
      {
        id: "kids-accessories",
        label: "Kids Accessories",
        icon: "bag-outline",
      },
      {
        id: "kids-furniture",
        label: "Kids Furniture",
        icon: "home-outline",
      },
      {
        id: "bath-diapers",
        label: "Bath & Diapers",
        icon: "water-outline",
      },
    ],
  },
];
