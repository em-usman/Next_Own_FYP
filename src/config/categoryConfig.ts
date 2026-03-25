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
];
