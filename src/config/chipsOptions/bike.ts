import type { ChipsFieldOptionsMap } from "@/config/chipsOptions/types";

export const BIKE_FIELD_OPTIONS_BY_SUBCATEGORY: Record<
  string,
  ChipsFieldOptionsMap
> = {
  "atv-quads": {
    make: [
      "Yamaha",
      "Chinese Bikes",
      "NPTC",
      "Others",
      "KING",
      "Honda",
      "Kawasaki",
      "Suzuki",
      "Can-Am",
      "Polaris",
    ],
    engine_type: ["2 Stroke", "4 Stroke"],
    engine_capacity: [
      "< 50cc",
      "70cc",
      "100cc - 149cc",
      "150cc - 199cc",
      "200cc - 249cc",
      "250cc - 299cc",
      "300cc - 499cc",
      "500cc - 699cc",
      "700cc - 999cc",
      "1000cc",
      "Above 1000cc",
    ],
    registration_city: [
      "Islamabad",
      "Karachi",
      "Lahore",
      "Rawalpindi",
      "Faisalabad",
      "Multan",
      "Peshawar",
      "Quetta",
      "Hyderabad",
      "Gujranwala",
      "Other",
    ],
    condition: ["New", "Used"],
  },
};
