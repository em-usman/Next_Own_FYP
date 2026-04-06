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
      {
        id: "accessories",
        label: "Accessories",
        icon: "extension-puzzle-outline",
        children: [
          { id: "earphones", label: "Earphones", icon: "ear-outline" },
          {
            id: "covers-cases",
            label: "Covers & Cases",
            icon: "phone-portrait-outline",
          },
          { id: "chargers", label: "Chargers", icon: "flash-outline" },
          {
            id: "other-accessories",
            label: "Other Accessories",
            icon: "apps-outline",
          },
          {
            id: "headphones",
            label: "Headphones",
            icon: "headset-outline",
          },
          {
            id: "power-banks",
            label: "Power Banks",
            icon: "battery-charging-outline",
          },
          {
            id: "charging-cables",
            label: "Charging Cables",
            icon: "git-compare-outline",
          },
          {
            id: "screen-protectors",
            label: "Screen Protectors",
            icon: "tablet-portrait-outline",
          },
          { id: "screens", label: "Screens", icon: "phone-landscape-outline" },
          {
            id: "mobile-stands",
            label: "Mobile Stands",
            icon: "easel-outline",
          },
          {
            id: "ring-lights",
            label: "Ring Lights",
            icon: "radio-button-on-outline",
          },
          {
            id: "converters",
            label: "Converters",
            icon: "swap-horizontal-outline",
          },
          {
            id: "selfie-sticks",
            label: "Selfie Sticks",
            icon: "camera-outline",
          },
          {
            id: "stylus-pens",
            label: "Stylus Pens",
            icon: "create-outline",
          },
          {
            id: "accessory-smart-watches",
            label: "Smart Watches",
            icon: "watch-outline",
          },
          {
            id: "external-memory",
            label: "External Memory",
            icon: "save-outline",
          },
          { id: "keyboards", label: "Keyboards", icon: "keypad-outline" },
          {
            id: "smartphone-lenses",
            label: "Smartphone Lenses",
            icon: "aperture-outline",
          },
          {
            id: "app-enabled-gadgets",
            label: "App Enabled Gadgets",
            icon: "phone-portrait-outline",
          },
        ],
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
      {
        id: "cars-accessories",
        label: "Cars Accessories",
        icon: "settings-outline",
        children: [
          { id: "interior", label: "Interior", icon: "home-outline" },
          { id: "exterior", label: "Exterior", icon: "water-outline" },
          {
            id: "tools-gadgets",
            label: "Tools & Gadgets",
            icon: "hammer-outline",
          },
          {
            id: "audio-multimedia",
            label: "Audio & Multimedia",
            icon: "volume-high-outline",
          },
          {
            id: "safety-security",
            label: "Safety & Security",
            icon: "shield-outline",
          },
          {
            id: "paints-primers-tools",
            label: "Paints, Primers & Tools",
            icon: "brush-outline",
          },
        ],
      },
      {
        id: "spare-parts",
        label: "Spare Parts",
        icon: "cog-outline",
        children: [
          { id: "spark-plugs", label: "Spark Plugs", icon: "flash-outline" },
          { id: "air-filters", label: "Air Filters", icon: "funnel-outline" },
          { id: "cabin-filters", label: "Cabin Filters", icon: "air-outline" },
          { id: "timing-belt", label: "Timing Belt", icon: "timer-outline" },
          { id: "water-pumps", label: "Water Pumps", icon: "water-outline" },
          { id: "fuel-filters", label: "Fuel Filters", icon: "water-outline" },
          { id: "oil-filters", label: "Oil Filters", icon: "filter-outline" },
          {
            id: "brake-pads",
            label: "Brake Pads",
            icon: "stop-circle-outline",
          },
          { id: "brake-discs", label: "Brake Discs", icon: "disc-outline" },
          {
            id: "brake-calipers",
            label: "Brake Calipers",
            icon: "hardware-chip-outline",
          },
          {
            id: "shock-absorbers",
            label: "Shock Absorbers",
            icon: "swap-vertical-outline",
          },
          { id: "springs", label: "Springs", icon: "resize-outline" },
          {
            id: "ball-joints",
            label: "Ball Joints",
            icon: "radio-button-on-outline",
          },
          { id: "struts", label: "Struts", icon: "arrow-forward-outline" },
          { id: "radiator", label: "Radiator", icon: "thermometer-outline" },
          {
            id: "coolant-hoses",
            label: "Coolant Hoses",
            icon: "git-compare-outline",
          },
          { id: "alternator", label: "Alternator", icon: "flash-outline" },
          { id: "starter-motor", label: "Starter Motor", icon: "play-outline" },
          { id: "batteries", label: "Batteries", icon: "battery-outline" },
          { id: "car-lights", label: "Car Lights", icon: "flashlight-outline" },
          {
            id: "windshield-glass",
            label: "Windshield & Glass",
            icon: "window-outline",
          },
          {
            id: "seat-upholstery",
            label: "Seat & Upholstery",
            icon: "bed-outline",
          },
          { id: "door-locks", label: "Door Locks", icon: "lock-outline" },
          {
            id: "door-handles",
            label: "Door Handles",
            icon: "hand-left-outline",
          },
          {
            id: "transmission-parts",
            label: "Transmission Parts",
            icon: "cog-outline",
          },
          {
            id: "engine-gaskets",
            label: "Engine Gaskets",
            icon: "layers-outline",
          },
          {
            id: "wiper-blades",
            label: "Wiper Blades",
            icon: "swap-horizontal-outline",
          },
          { id: "clutch-plate", label: "Clutch Plate", icon: "layers-outline" },
          { id: "fuel-pumps", label: "Fuel Pumps", icon: "water-outline" },
          {
            id: "fuel-injectors",
            label: "Fuel Injectors",
            icon: "water-outline",
          },
          {
            id: "exhaust-muffler",
            label: "Exhaust Muffler",
            icon: "swap-horizontal-outline",
          },
          {
            id: "catalytic-converter",
            label: "Catalytic Converter",
            icon: "beaker-outline",
          },
          { id: "door-panels", label: "Door Panels", icon: "layers-outline" },
          { id: "mirrors", label: "Mirrors", icon: "eye-outline" },
          {
            id: "other-spare-parts",
            label: "Other Parts",
            icon: "apps-outline",
          },
        ],
      },
      {
        id: "car-care",
        label: "Car Care",
        icon: "sparkles-outline",
        children: [
          { id: "covers", label: "Covers", icon: "layers-outline" },
          { id: "cleaners", label: "Cleaners", icon: "water-outline" },
          {
            id: "air-fresheners",
            label: "Air Fresheners",
            icon: "flower-outline",
          },
          {
            id: "microfiber-cloths",
            label: "Microfiber Cloths",
            icon: "document-outline",
          },
          {
            id: "pressure-washers",
            label: "Pressure Washers",
            icon: "water-outline",
          },
          { id: "polishes", label: "Polishes", icon: "sparkles-outline" },
          { id: "waxes", label: "Waxes", icon: "cube-outline" },
          { id: "shampoos", label: "Shampoos", icon: "water-outline" },
          {
            id: "compound-polishes",
            label: "Compound Polishes",
            icon: "beaker-outline",
          },
          {
            id: "pads-sponges-brushes",
            label: "Pads, Sponges & Brushes",
            icon: "brush-outline",
          },
          { id: "car-care-other", label: "Other", icon: "apps-outline" },
        ],
      },
      {
        id: "oil-lubricants",
        label: "Oil & Lubricants",
        icon: "water-outline",
        children: [
          { id: "engine-oil", label: "Engine Oil", icon: "water-outline" },
          { id: "gear-oil", label: "Gear Oil", icon: "water-outline" },
          { id: "coolants", label: "Coolants", icon: "thermometer-outline" },
          {
            id: "chain-lubes-cleaners",
            label: "Chain Lubes & Cleaners",
            icon: "link-outline",
          },
          {
            id: "multipurpose-grease",
            label: "Multipurpose Grease",
            icon: "cube-outline",
          },
          { id: "brake-oil", label: "Brake Oil", icon: "water-outline" },
          {
            id: "fluids-flushes",
            label: "Fluids & Flushes",
            icon: "beaker-outline",
          },
          {
            id: "oil-additives",
            label: "Oil Additives",
            icon: "add-circle-outline",
          },
          {
            id: "fuel-additives",
            label: "Fuel Additives",
            icon: "add-circle-outline",
          },
          { id: "solvents", label: "Solvents", icon: "flask-outline" },
          { id: "cvtf-oil", label: "CVTF Oil", icon: "water-outline" },
          { id: "adhesives", label: "Adhesives", icon: "link-outline" },
        ],
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
      {
        id: "health-beauty",
        label: "Health & Beauty",
        icon: "medkit-outline",
        children: [
          {
            id: "health-services",
            label: "Health Services",
            icon: "medkit-outline",
          },
          { id: "beauty-spa", label: "Beauty & Spa", icon: "sparkles-outline" },
          {
            id: "fitness-trainers",
            label: "Fitness Trainers",
            icon: "barbell-outline",
          },
        ],
      },
      {
        id: "drivers-taxi",
        label: "Drivers & Taxi",
        icon: "car-outline",
        children: [
          { id: "pick-drop", label: "Pick & Drop", icon: "navigate-outline" },
          { id: "drivers", label: "Drivers", icon: "person-outline" },
          { id: "carpool", label: "Carpool", icon: "people-outline" },
        ],
      },
      {
        id: "domestic-help",
        label: "Domestic Help",
        icon: "home-outline",
        children: [
          { id: "maids", label: "Maids", icon: "person-outline" },
          {
            id: "other-domestic-help",
            label: "Other Domestic Help",
            icon: "apps-outline",
          },
          { id: "cooks", label: "Cooks", icon: "restaurant-outline" },
          {
            id: "babysitters",
            label: "Babysitters",
            icon: "happy-outline",
          },
          {
            id: "nursing-staff",
            label: "Nursing Staff",
            icon: "medkit-outline",
          },
        ],
      },
      {
        id: "home-office-repair",
        label: "Home & Office Repair",
        icon: "hammer-outline",
        children: [
          {
            id: "other-repair-services",
            label: "Other Repair Services",
            icon: "apps-outline",
          },
          { id: "ac-services", label: "AC Services", icon: "snow-outline" },
          { id: "pest-control", label: "Pest Control", icon: "bug-outline" },
          { id: "carpenters", label: "Carpenters", icon: "hammer-outline" },
          { id: "painters", label: "Painters", icon: "color-fill-outline" },
          {
            id: "electricians",
            label: "Electricians",
            icon: "flash-outline",
          },
          {
            id: "deep-cleaning",
            label: "Deep Cleaning",
            icon: "sparkles-outline",
          },
          {
            id: "water-tank-cleaning",
            label: "Water Tank Cleaning",
            icon: "water-outline",
          },
          { id: "plumbers", label: "Plumbers", icon: "build-outline" },
          {
            id: "geyser-services",
            label: "Geyser Services",
            icon: "flame-outline",
          },
        ],
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
      {
        id: "kitchen-appliances",
        label: "Kitchen Appliances",
        icon: "restaurant-outline",
        children: [
          {
            id: "other-kitchen-appliances",
            label: "Other Kitchen Appliances",
            icon: "apps-outline",
          },
          { id: "stoves", label: "Stoves", icon: "flame-outline" },
          { id: "air-fryers", label: "Air Fryers", icon: "leaf-outline" },
          {
            id: "coffee-tea-machines",
            label: "Coffee & Tea Machines",
            icon: "cafe-outline",
          },
          { id: "juicers", label: "Juicers", icon: "nutrition-outline" },
          {
            id: "kitchen-appliance-accessories",
            label: "Kitchen Appliance Accessories",
            icon: "construct-outline",
          },
          { id: "choppers", label: "Choppers", icon: "cut-outline" },
          {
            id: "vegetable-slicers",
            label: "Vegetable Slicers",
            icon: "options-outline",
          },
          { id: "blenders", label: "Blenders", icon: "pulse-outline" },
          {
            id: "electric-kettles",
            label: "Electric Kettles",
            icon: "flask-outline",
          },
          { id: "hot-plates", label: "Hot Plates", icon: "grid-outline" },
          {
            id: "water-purifiers",
            label: "Water Purifiers",
            icon: "water-outline",
          },
          {
            id: "food-factory",
            label: "Food Factory",
            icon: "restaurant-outline",
          },
          { id: "mixers", label: "Mixers", icon: "shuffle-outline" },
          {
            id: "electric-cookers",
            label: "Electric Cookers",
            icon: "flame-outline",
          },
          {
            id: "meat-grinders",
            label: "Meat Grinders",
            icon: "hammer-outline",
          },
          { id: "hobs", label: "Hobs", icon: "grid-outline" },
          { id: "toasters", label: "Toasters", icon: "sunny-outline" },
          {
            id: "sandwich-makers",
            label: "Sandwich Makers",
            icon: "apps-outline",
          },
          {
            id: "roti-makers",
            label: "Roti Makers",
            icon: "ellipse-outline",
          },
          { id: "hoods", label: "Hoods", icon: "cloud-outline" },
          { id: "grills", label: "Grills", icon: "barcode-outline" },
          {
            id: "dishwashers",
            label: "Dishwashers",
            icon: "water-outline",
          },
          {
            id: "food-steamers",
            label: "Food Steamers",
            icon: "cloud-outline",
          },
          { id: "sinks", label: "Sinks", icon: "water-outline" },
        ],
      },
      {
        id: "refrigerators-freezers",
        label: "Refrigerators & Freezers",
        icon: "snow-outline",
        children: [
          {
            id: "refrigerators",
            label: "Refrigerators",
            icon: "snow-outline",
          },
          { id: "freezers", label: "Freezers", icon: "cube-outline" },
          {
            id: "refrigerators-freezers-accessories",
            label: "Refrigerators & Freezers Accessories",
            icon: "construct-outline",
          },
          { id: "mini", label: "Mini", icon: "square-outline" },
        ],
      },
      {
        id: "washing-machines-dryers",
        label: "Washing Machines & Dryers",
        icon: "water-outline",
        children: [
          {
            id: "washer-dryer",
            label: "Washer & Dryer",
            icon: "sync-outline",
          },
          { id: "washer", label: "Washer", icon: "water-outline" },
          { id: "spin-dryer", label: "Spin Dryer", icon: "refresh-outline" },
          {
            id: "washing-machine-dryer-accessories",
            label: "Washing Machine & Dryer Accessories",
            icon: "construct-outline",
          },
        ],
      },
      {
        id: "fans",
        label: "Fans",
        icon: "aperture-outline",
        children: [
          {
            id: "ceiling-fans",
            label: "Ceiling Fans",
            icon: "aperture-outline",
          },
          {
            id: "pedestal-fans",
            label: "Pedestal Fans",
            icon: "aperture-outline",
          },
          {
            id: "portable-fans",
            label: "Portable Fans",
            icon: "aperture-outline",
          },
          {
            id: "bracket-fans",
            label: "Bracket Fans",
            icon: "aperture-outline",
          },
          {
            id: "exhaust-fans",
            label: "Exhaust Fans",
            icon: "aperture-outline",
          },
          { id: "mist-fans", label: "Mist Fans", icon: "water-outline" },
        ],
      },
      {
        id: "ac-coolers",
        label: "AC & Coolers",
        icon: "snow-outline",
        children: [
          {
            id: "air-conditioners",
            label: "Air Conditioners",
            icon: "snow-outline",
          },
          {
            id: "air-coolers",
            label: "Air Coolers",
            icon: "snow-outline",
          },
          {
            id: "ac-cooler-accessories",
            label: "AC & Cooler Accessories",
            icon: "construct-outline",
          },
        ],
      },
      {
        id: "heaters-geysers",
        label: "Heaters & Geysers",
        icon: "flame-outline",
        children: [
          { id: "geysers", label: "Geysers", icon: "flame-outline" },
          { id: "heaters", label: "Heaters", icon: "flame-outline" },
          {
            id: "heating-rods",
            label: "Heating Rods",
            icon: "remove-outline",
          },
        ],
      },
      {
        id: "irons-steamers",
        label: "Irons & Steamers",
        icon: "shirt-outline",
        children: [
          { id: "irons", label: "Irons", icon: "shirt-outline" },
          { id: "steamers", label: "Steamers", icon: "cloud-outline" },
        ],
      },
      {
        id: "microwaves-ovens",
        label: "Microwaves & Ovens",
        icon: "radio-outline",
        children: [
          { id: "microwaves", label: "Microwaves", icon: "radio-outline" },
          { id: "ovens", label: "Ovens", icon: "flame-outline" },
        ],
      },
      {
        id: "televisions-accessories",
        label: "Televisions & Accessories",
        icon: "tv-outline",
        children: [
          {
            id: "televisions",
            label: "Televisions",
            icon: "tv-outline",
          },
          {
            id: "dish-antennas",
            label: "Dish Antennas",
            icon: "radio-outline",
          },
          { id: "iptv", label: "IPTV", icon: "play-outline" },
          {
            id: "projectors-projection-screens",
            label: "Projectors & Projection Screens",
            icon: "videocam-outline",
          },
          {
            id: "tv-remotes",
            label: "TV Remotes",
            icon: "game-controller-outline",
          },
          {
            id: "android-boxes",
            label: "Android Boxes",
            icon: "cube-outline",
          },
          {
            id: "other-tv-accessories",
            label: "Other TV Accessories",
            icon: "apps-outline",
          },
          {
            id: "wall-mounts",
            label: "Wall Mounts",
            icon: "construct-outline",
          },
          { id: "tv-cables", label: "TV Cables", icon: "git-compare-outline" },
        ],
      },
      {
        id: "video-audios",
        label: "Video-Audios",
        icon: "volume-high-outline",
        children: [
          { id: "speakers", label: "Speakers", icon: "volume-high-outline" },
          {
            id: "microphones",
            label: "Microphones",
            icon: "mic-outline",
          },
          {
            id: "other-video-audio",
            label: "Other Video - Audio",
            icon: "apps-outline",
          },
          {
            id: "amplifiers",
            label: "Amplifiers",
            icon: "pulse-outline",
          },
          {
            id: "home-theater-systems",
            label: "Home Theater Systems",
            icon: "tv-outline",
          },
          {
            id: "car-audio-video",
            label: "Car Audio/Video",
            icon: "car-outline",
          },
          {
            id: "cd-dvd-players",
            label: "CD/DVD Players",
            icon: "disc-outline",
          },
          { id: "sound-bars", label: "Sound Bars", icon: "remove-outline" },
          {
            id: "walkie-talkie",
            label: "Walkie Talkie",
            icon: "radio-outline",
          },
          { id: "radios", label: "Radios", icon: "radio-outline" },
          {
            id: "cassette-players-recorders",
            label: "Cassette Players & Recorders",
            icon: "save-outline",
          },
          { id: "cables", label: "Cables", icon: "git-compare-outline" },
          {
            id: "audio-mixers",
            label: "Audio Mixers",
            icon: "options-outline",
          },
          {
            id: "audio-interface",
            label: "Audio Interface",
            icon: "hardware-chip-outline",
          },
          {
            id: "mp3-players",
            label: "Mp 3 Players",
            icon: "musical-notes-outline",
          },
          {
            id: "turntables-accessories",
            label: "Turntables & Accessories",
            icon: "disc-outline",
          },
          {
            id: "digital-recorders",
            label: "Digital Recorders",
            icon: "recording-outline",
          },
        ],
      },
      {
        id: "computers-accessories",
        label: "Computers & Accessories",
        icon: "laptop-outline",
        children: [
          { id: "laptops", label: "Laptops", icon: "laptop-outline" },
          {
            id: "computer-components",
            label: "Computer Components",
            icon: "hardware-chip-outline",
          },
          {
            id: "computer-laptop-accessories",
            label: "Computer & Laptop Accessories",
            icon: "construct-outline",
          },
          {
            id: "networking",
            label: "Networking",
            icon: "git-network-outline",
          },
          {
            id: "gaming-pcs",
            label: "Gaming PCs",
            icon: "game-controller-outline",
          },
          {
            id: "printers-photocopiers",
            label: "Printers & Photocopiers",
            icon: "print-outline",
          },
          { id: "desktops", label: "Desktops", icon: "desktop-outline" },
          {
            id: "workstations",
            label: "Workstations",
            icon: "desktop-outline",
          },
          {
            id: "inks-toners",
            label: "Inks & Toners",
            icon: "color-fill-outline",
          },
          { id: "servers", label: "Servers", icon: "server-outline" },
          { id: "softwares", label: "Softwares", icon: "code-slash-outline" },
          {
            id: "3d-printers-accessories",
            label: "3D Printers & Accessories",
            icon: "cube-outline",
          },
          {
            id: "bags-cases",
            label: "Bags & Cases",
            icon: "briefcase-outline",
          },
        ],
      },
      {
        id: "cameras-accessories",
        label: "Cameras & Accessories",
        icon: "camera-outline",
        children: [
          {
            id: "digital-cameras",
            label: "Digital Cameras",
            icon: "camera-outline",
          },
          {
            id: "cctv-cameras",
            label: "CCTV Cameras",
            icon: "videocam-outline",
          },
          { id: "drones", label: "Drones", icon: "airplane-outline" },
          {
            id: "camera-lenses",
            label: "Camera Lenses",
            icon: "aperture-outline",
          },
          {
            id: "video-cameras",
            label: "Video Cameras",
            icon: "videocam-outline",
          },
          {
            id: "tripods-stands",
            label: "Tripods & Stands",
            icon: "triangle-outline",
          },
          {
            id: "other-cameras-accessories",
            label: "Other Cameras Accessories",
            icon: "apps-outline",
          },
          {
            id: "camera-lenses-accessories",
            label: "Camera & Lenses Accessories",
            icon: "construct-outline",
          },
          {
            id: "video-lights",
            label: "Video Lights",
            icon: "flashlight-outline",
          },
          {
            id: "gimbles-stablizers",
            label: "Gimbles & Stablizers",
            icon: "swap-vertical-outline",
          },
          {
            id: "professional-microphones",
            label: "Professional Microphones",
            icon: "mic-outline",
          },
          {
            id: "camera-batteries",
            label: "Camera Batteries",
            icon: "battery-outline",
          },
          { id: "flash-guns", label: "Flash Guns", icon: "flash-outline" },
          { id: "binoculars", label: "Binoculars", icon: "eye-outline" },
          {
            id: "binoculars-optics-accessories",
            label: "Binoculars & Optics Accessories",
            icon: "construct-outline",
          },
          {
            id: "camera-bags-cases",
            label: "Bags & Cases",
            icon: "briefcase-outline",
          },
        ],
      },
      {
        id: "games-entertainment",
        label: "Games & Entertainment",
        icon: "game-controller-outline",
        children: [
          {
            id: "gaming-consoles",
            label: "Gaming Consoles",
            icon: "game-controller-outline",
          },
          {
            id: "video-games",
            label: "Video Games",
            icon: "logo-game-controller-b",
          },
          {
            id: "gaming-accessories",
            label: "Gaming Accessories",
            icon: "construct-outline",
          },
          {
            id: "controllers",
            label: "Controllers",
            icon: "game-controller-outline",
          },
        ],
      },
      {
        id: "tools-diy-equipment",
        label: "Tools & DIY Equipment",
        icon: "hammer-outline",
        children: [
          { id: "electrical", label: "Electrical", icon: "flash-outline" },
          { id: "hand-tools", label: "Hand Tools", icon: "hammer-outline" },
          { id: "power-tools", label: "Power Tools", icon: "build-outline" },
          {
            id: "other-equipments",
            label: "Other Equipments",
            icon: "apps-outline",
          },
        ],
      },
      {
        id: "generators-ups-power-solutions",
        label: "Generators, UPS & Power Solutions",
        icon: "flash-outline",
        children: [
          {
            id: "solar-inverter",
            label: "Solar Inverter",
            icon: "sunny-outline",
          },
          {
            id: "generators",
            label: "Generators",
            icon: "flash-outline",
          },
          { id: "ups", label: "UPS", icon: "battery-half-outline" },
          { id: "batteries", label: "Batteries", icon: "battery-outline" },
          {
            id: "solar-accessories",
            label: "Solar Accessories",
            icon: "construct-outline",
          },
          {
            id: "solar-panels",
            label: "Solar Panels",
            icon: "sunny-outline",
          },
        ],
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
      {
        id: "bikes-motorcycles",
        label: "Bikes & Motorcycles",
        icon: "bicycle-outline",
        children: [
          { id: "standard", label: "Standard", icon: "bicycle-outline" },
          {
            id: "sports-heavy-bikes",
            label: "Sports & Heavy Bikes",
            icon: "speedometer-outline",
          },
          { id: "cafe-racers", label: "Cafe Racers", icon: "flash-outline" },
          {
            id: "electric-bikes",
            label: "Electric Bikes",
            icon: "flash-outline",
          },
          {
            id: "other-motorcycles",
            label: "Other Motorcycles",
            icon: "apps-outline",
          },
          { id: "cruisers", label: "Cruisers", icon: "bicycle-outline" },
          { id: "trail", label: "Trail", icon: "walk-outline" },
        ],
      },
      {
        id: "scooty-scooters",
        label: "Scooty & Scooters",
        icon: "bicycle-outline",
        children: [
          { id: "scooty-electric", label: "Electric", icon: "flash-outline" },
          { id: "scooty-petrol", label: "Petrol", icon: "flame-outline" },
        ],
      },
      {
        id: "bicycles",
        label: "Bicycles",
        icon: "bicycle-outline",
        children: [
          {
            id: "other-bicycles",
            label: "Other Bicycles",
            icon: "apps-outline",
          },
          { id: "road-bikes", label: "Road Bikes", icon: "bicycle-outline" },
          {
            id: "mountain-bikes",
            label: "Mountain Bikes",
            icon: "bicycle-outline",
          },
          { id: "bmx-bikes", label: "BMX Bikes", icon: "bicycle-outline" },
          {
            id: "hybrid-bikes",
            label: "Hybrid Bikes",
            icon: "bicycle-outline",
          },
          {
            id: "folding-bikes",
            label: "Folding Bikes",
            icon: "bicycle-outline",
          },
          {
            id: "electric-bicycles",
            label: "Electric Bicycles",
            icon: "flash-outline",
          },
        ],
      },
      {
        id: "bikes-accessories",
        label: "Bikes Accessories",
        icon: "construct-outline",
        children: [
          { id: "helmets", label: "Helmets", icon: "shield-outline" },
          {
            id: "other-bike-accessories",
            label: "Other Bike Accessories",
            icon: "apps-outline",
          },
          { id: "bike-covers", label: "Bike Covers", icon: "shirt-outline" },
          {
            id: "bicycle-air-pumps",
            label: "Bicycle Air Pumps",
            icon: "speedometer-outline",
          },
          {
            id: "bike-safety-security",
            label: "Safety & Security",
            icon: "shield-checkmark-outline",
          },
          {
            id: "bike-jackets",
            label: "Bike Jackets",
            icon: "shirt-outline",
          },
          { id: "safe-guards", label: "Safe Guards", icon: "shield-outline" },
          {
            id: "bike-gloves",
            label: "Bike Gloves",
            icon: "hand-left-outline",
          },
          { id: "tail-boxes", label: "Tail Boxes", icon: "cube-outline" },
          {
            id: "oils-lubricants",
            label: "Oils / Lubricants",
            icon: "water-outline",
          },
          {
            id: "mobile-chargers-bike",
            label: "Mobile chargers",
            icon: "battery-charging-outline",
          },
          {
            id: "bike-locks",
            label: "Bike Locks",
            icon: "lock-closed-outline",
          },
          {
            id: "bluetooth-headsets-bike",
            label: "Bluetooth Headsets",
            icon: "headset-outline",
          },
          {
            id: "sticker-emblems",
            label: "Sticker & Emblems",
            icon: "pricetag-outline",
          },
          { id: "bike-shoes", label: "Bike Shoes", icon: "footsteps-outline" },
        ],
      },
      {
        id: "spare-parts",
        label: "Spare Parts",
        icon: "cog-outline",
        children: [
          {
            id: "other-spare-parts-bike",
            label: "Other Spare Parts",
            icon: "apps-outline",
          },
          {
            id: "lighting-bike",
            label: "Lighting",
            icon: "flashlight-outline",
          },
          {
            id: "fuel-tanks",
            label: "Fuel Tanks",
            icon: "flame-outline",
          },
          {
            id: "tyres-tubes",
            label: "Tyres & Tubes",
            icon: "disc-outline",
          },
          { id: "silencer", label: "Silencer", icon: "volume-mute-outline" },
          { id: "exhausts", label: "Exhausts", icon: "cloud-outline" },
          {
            id: "carburetors",
            label: "Carburetors",
            icon: "settings-outline",
          },
          { id: "seats", label: "Seats", icon: "body-outline" },
          {
            id: "speedometers",
            label: "Speedometers",
            icon: "speedometer-outline",
          },
          {
            id: "bearings",
            label: "Bearings",
            icon: "radio-button-on-outline",
          },
          {
            id: "side-mirrors-bike",
            label: "Side Mirrors",
            icon: "eye-outline",
          },
          {
            id: "motorcycle-batteries",
            label: "Motorcycle Batteries",
            icon: "battery-outline",
          },
          {
            id: "handle-bars-grips",
            label: "Handle Bars & Grips",
            icon: "hand-left-outline",
          },
          {
            id: "chain-covers-sprockets",
            label: "Chain, Covers & Sprockets",
            icon: "git-network-outline",
          },
          { id: "horns", label: "Horns", icon: "volume-high-outline" },
          { id: "cylinders", label: "Cylinders", icon: "ellipse-outline" },
          {
            id: "steering-suspension",
            label: "Steering & Suspension",
            icon: "swap-vertical-outline",
          },
          {
            id: "body-frame",
            label: "Body & Frame",
            icon: "construct-outline",
          },
          { id: "switches", label: "Switches", icon: "toggle-outline" },
          { id: "plugs", label: "Plugs", icon: "flash-outline" },
          { id: "stands", label: "Stands", icon: "easel-outline" },
          {
            id: "air-filters-bike",
            label: "Air Filters",
            icon: "filter-outline",
          },
          { id: "brakes", label: "Brakes", icon: "stop-circle-outline" },
          { id: "clutches", label: "Clutches", icon: "layers-outline" },
          { id: "pistons", label: "Pistons", icon: "ellipse-outline" },
          { id: "levers", label: "Levers", icon: "move-outline" },
          {
            id: "transmission-bike",
            label: "Transmission",
            icon: "cog-outline",
          },
        ],
      },
      {
        id: "bike-care",
        label: "Bike Care",
        icon: "sparkles-outline",
        children: [
          {
            id: "cleaning-tools",
            label: "Cleaning Tools",
            icon: "brush-outline",
          },
        ],
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
      {
        id: "agriculture",
        label: "Agriculture",
        icon: "leaf-outline",
        children: [
          {
            id: "farm-machinery-equipments",
            label: "Farm, Machinery and Equipments",
            icon: "construct-outline",
          },
          { id: "plants-trees", label: "Plants & Trees", icon: "leaf-outline" },
          {
            id: "other-agriculture",
            label: "Other Agriculture",
            icon: "apps-outline",
          },
          {
            id: "pesticides-fertilizers",
            label: "Pesticides & Fertilizers",
            icon: "flask-outline",
          },
          { id: "seeds", label: "Seeds", icon: "ellipse-outline" },
          { id: "crops", label: "Crops", icon: "nutrition-outline" },
          { id: "silage", label: "Silage", icon: "cube-outline" },
        ],
      },
      {
        id: "business-for-sale",
        label: "Business for Sale",
        icon: "cash-outline",
        children: [
          {
            id: "other-businesses",
            label: "Other Businesses",
            icon: "apps-outline",
          },
          { id: "water-plants", label: "Water Plants", icon: "water-outline" },
          {
            id: "hotels-restaurants-business",
            label: "Hotels & Restaurants",
            icon: "restaurant-outline",
          },
          {
            id: "beauty-salons",
            label: "Beauty Salons",
            icon: "sparkles-outline",
          },
          {
            id: "mobile-shops",
            label: "Mobile Shops",
            icon: "phone-portrait-outline",
          },
          {
            id: "grocery-stores",
            label: "Grocery Stores",
            icon: "basket-outline",
          },
          { id: "pharmacies", label: "Pharmacies", icon: "medkit-outline" },
          {
            id: "snooker-clubs",
            label: "Snooker Clubs",
            icon: "ellipse-outline",
          },
          { id: "gyms-business", label: "Gyms", icon: "barbell-outline" },
          {
            id: "auto-part-shops",
            label: "Auto Part Shops",
            icon: "car-outline",
          },
          {
            id: "cosmetic-jewellery-shops",
            label: "Cosmetic & Jewellery Shops",
            icon: "diamond-outline",
          },
          { id: "franchises", label: "Franchises", icon: "git-branch-outline" },
          { id: "clinics-business", label: "Clinics", icon: "medkit-outline" },
          { id: "petrol-pumps", label: "Petrol Pumps", icon: "flame-outline" },
          {
            id: "gift-toy-shops",
            label: "Gift & Toy Shops",
            icon: "gift-outline",
          },
        ],
      },
      {
        id: "construction-heavy-machinery",
        label: "Construction & Heavy Machinery",
        icon: "hammer-outline",
        children: [
          {
            id: "construction-material",
            label: "Construction Material",
            icon: "cube-outline",
          },
          {
            id: "other-heavy-equipments",
            label: "Other Heavy Equipments",
            icon: "apps-outline",
          },
          { id: "pavers", label: "Pavers", icon: "grid-outline" },
          {
            id: "drill-machines-heavy",
            label: "Drill Machines",
            icon: "build-outline",
          },
          {
            id: "water-pumps-heavy",
            label: "Water Pumps",
            icon: "water-outline",
          },
          {
            id: "concrete-mixers",
            label: "Concrete Mixers",
            icon: "shuffle-outline",
          },
          { id: "compactors", label: "Compactors", icon: "contract-outline" },
          {
            id: "air-compressors-heavy",
            label: "Air Compressors",
            icon: "cloud-outline",
          },
          {
            id: "motor-graders",
            label: "Motor Graders",
            icon: "car-sport-outline",
          },
          { id: "cranes", label: "Cranes", icon: "move-outline" },
          {
            id: "construction-lifters",
            label: "Construction Lifters",
            icon: "arrow-up-outline",
          },
          {
            id: "excavators",
            label: "Excavators",
            icon: "construct-outline",
          },
          {
            id: "concrete-cutters",
            label: "Concrete Cutters",
            icon: "cut-outline",
          },
          {
            id: "concrete-grinders",
            label: "Concrete Grinders",
            icon: "disc-outline",
          },
          {
            id: "road-roller",
            label: "Road Roller",
            icon: "car-outline",
          },
          { id: "loaders", label: "Loaders", icon: "construct-outline" },
          { id: "bulldozers", label: "Bulldozers", icon: "car-outline" },
          { id: "dump-truck", label: "Dump Truck", icon: "bus-outline" },
        ],
      },
      {
        id: "trade-industrial-machinery",
        label: "Trade & Industrial Machinery",
        icon: "business-outline",
        children: [
          {
            id: "other-business-industrial-machines",
            label: "Other Business & Industrial Machines",
            icon: "apps-outline",
          },
          {
            id: "currency-counting-machines",
            label: "Currency Counting Machines",
            icon: "cash-outline",
          },
          {
            id: "industry-laser-machines",
            label: "Industry Laser Machines",
            icon: "flash-outline",
          },
          {
            id: "printing-machines-industrial",
            label: "Printing Machines",
            icon: "print-outline",
          },
          {
            id: "packaging-machines",
            label: "Packaging Machines",
            icon: "cube-outline",
          },
          {
            id: "lathe-machines",
            label: "Lathe Machines",
            icon: "settings-outline",
          },
          {
            id: "molding-machines",
            label: "Molding Machines",
            icon: "shapes-outline",
          },
          {
            id: "air-compressors-industrial",
            label: "Air Compressors",
            icon: "cloud-outline",
          },
          {
            id: "sewing-machines-industrial",
            label: "Sewing Machines",
            icon: "shirt-outline",
          },
          {
            id: "woodworking-machines",
            label: "Woodworking Machines",
            icon: "hammer-outline",
          },
          {
            id: "sealing-machines",
            label: "Sealing Machines",
            icon: "lock-closed-outline",
          },
          {
            id: "marking-machines",
            label: "Marking Machines",
            icon: "create-outline",
          },
          {
            id: "liquid-filling-machines",
            label: "Liquid Filling Machines",
            icon: "water-outline",
          },
          {
            id: "textile-machinery",
            label: "Textile Machinery",
            icon: "shirt-outline",
          },
          {
            id: "plastic-rubber-processing-machines",
            label: "Plastic & Rubber Processing Machines",
            icon: "disc-outline",
          },
          {
            id: "welding-equipments",
            label: "Welding Equipments",
            icon: "flash-outline",
          },
          {
            id: "knitting-machines",
            label: "Knitting Machines",
            icon: "git-merge-outline",
          },
          {
            id: "embroidery-machines",
            label: "Embroidery Machines",
            icon: "color-fill-outline",
          },
          {
            id: "paper-machines",
            label: "Paper Machines",
            icon: "document-outline",
          },
        ],
      },
      {
        id: "medical-pharma",
        label: "Medical & Pharma",
        icon: "medkit-outline",
        children: [
          {
            id: "other-medical-supplies",
            label: "Other Medical Supplies",
            icon: "apps-outline",
          },
          { id: "patient-beds", label: "Patient Beds", icon: "bed-outline" },
          {
            id: "oxygen-concentrators",
            label: "Oxygen Concentrators",
            icon: "leaf-outline",
          },
          {
            id: "ultrasound-machines",
            label: "Ultrasound Machines",
            icon: "pulse-outline",
          },
          { id: "wheelchairs", label: "Wheelchairs", icon: "walk-outline" },
          {
            id: "oxygen-cylinders",
            label: "Oxygen Cylinders",
            icon: "ellipse-outline",
          },
          { id: "nebulizers", label: "Nebulizers", icon: "cloud-outline" },
          {
            id: "blood-pressure-monitors",
            label: "Blood Pressure Monitors",
            icon: "heart-outline",
          },
          { id: "hearing-aids", label: "Hearing Aids", icon: "ear-outline" },
          { id: "breast-pumps", label: "Breast Pumps", icon: "water-outline" },
          { id: "walkers", label: "Walkers", icon: "walk-outline" },
          { id: "glucometers", label: "Glucometers", icon: "pulse-outline" },
          {
            id: "commode-chairs",
            label: "Commode Chairs",
            icon: "body-outline",
          },
          {
            id: "surgical-instruments",
            label: "Surgical Instruments",
            icon: "cut-outline",
          },
          {
            id: "x-ray-machines",
            label: "X-ray Machines",
            icon: "scan-outline",
          },
          { id: "microscopes", label: "Microscopes", icon: "eye-outline" },
          { id: "medicines", label: "Medicines", icon: "medkit-outline" },
          {
            id: "surgical-masks",
            label: "Surgical Masks",
            icon: "shield-outline",
          },
          { id: "sanitizers", label: "Sanitizers", icon: "flask-outline" },
          {
            id: "thermometers",
            label: "Thermometers",
            icon: "thermometer-outline",
          },
          {
            id: "pulse-oximeters",
            label: "Pulse Oximeters",
            icon: "pulse-outline",
          },
          {
            id: "surgical-gloves",
            label: "Surgical Gloves",
            icon: "hand-left-outline",
          },
          {
            id: "medical-scrubs",
            label: "Medical Scrubs",
            icon: "shirt-outline",
          },
          {
            id: "lighting-medical",
            label: "Lighting - Medical",
            icon: "flashlight-outline",
          },
          {
            id: "health-accessories",
            label: "Health Accessories",
            icon: "fitness-outline",
          },
          {
            id: "weighing-scales",
            label: "Weighing Scales",
            icon: "speedometer-outline",
          },
        ],
      },
      {
        id: "food-restaurants",
        label: "Food & Restaurants",
        icon: "restaurant-outline",
        children: [
          {
            id: "other-restaurant-equipments",
            label: "Other Restaurant Equipments",
            icon: "apps-outline",
          },
          {
            id: "food-display-counters",
            label: "Food Display Counters",
            icon: "albums-outline",
          },
          {
            id: "food-stalls",
            label: "Food Stalls",
            icon: "storefront-outline",
          },
          {
            id: "ovens-tandoor",
            label: "Ovens & Tandoor",
            icon: "flame-outline",
          },
          { id: "fryers", label: "Fryers", icon: "flame-outline" },
          {
            id: "ice-cream-machines",
            label: "Ice cream Machines",
            icon: "snow-outline",
          },
          {
            id: "tables-platforms",
            label: "Tables & Platforms",
            icon: "grid-outline",
          },
          { id: "chillers", label: "Chillers", icon: "snow-outline" },
          {
            id: "fruit-vegetable-machines",
            label: "Fruit & Vegetable Machines",
            icon: "nutrition-outline",
          },
          {
            id: "delivery-bags",
            label: "Delivery Bags",
            icon: "briefcase-outline",
          },
          {
            id: "baking-equipments",
            label: "Baking Equipments",
            icon: "pizza-outline",
          },
          {
            id: "crockery-cutlery",
            label: "Crockery & Cutlery",
            icon: "restaurant-outline",
          },
        ],
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
      {
        id: "sofa-chairs",
        label: "Sofa & Chairs",
        icon: "bed-outline",
        children: [
          { id: "sofas", label: "Sofas", icon: "bed-outline" },
          { id: "chairs", label: "Chairs", icon: "body-outline" },
          { id: "sofa-beds", label: "Sofa Beds", icon: "bed-outline" },
          {
            id: "sofa-covers",
            label: "Sofa Covers",
            icon: "shirt-outline",
          },
          { id: "cushions", label: "Cushions", icon: "ellipse-outline" },
          {
            id: "bean-bags",
            label: "Bean Bags",
            icon: "radio-button-on-outline",
          },
          { id: "recliners", label: "Recliners", icon: "body-outline" },
        ],
      },
      {
        id: "beds-wardrobes",
        label: "Beds & Wardrobes",
        icon: "bed-outline",
        children: [
          { id: "beds", label: "Beds", icon: "bed-outline" },
          { id: "wardrobes", label: "Wardrobes", icon: "albums-outline" },
          { id: "mattresses", label: "Mattresses", icon: "square-outline" },
          {
            id: "dressers-drawers",
            label: "Dressers & Drawers",
            icon: "file-tray-stacked-outline",
          },
          { id: "bed-sheets", label: "Bed Sheets", icon: "remove-outline" },
          {
            id: "bookcases-shelves",
            label: "Bookcases & Shelves",
            icon: "library-outline",
          },
          {
            id: "blankets-comforters",
            label: "Blankets & Comforters",
            icon: "cloud-outline",
          },
          {
            id: "pillows-cases",
            label: "Pillows & Cases",
            icon: "ellipse-outline",
          },
          {
            id: "mattress-covers",
            label: "Mattress Covers",
            icon: "copy-outline",
          },
          {
            id: "other-bedding-accessories",
            label: "Other Bedding Accessories",
            icon: "apps-outline",
          },
          {
            id: "bedside-tables",
            label: "Bedside Tables",
            icon: "grid-outline",
          },
          {
            id: "mattress-toppers-pads",
            label: "Mattress Toppers & Pads",
            icon: "layers-outline",
          },
        ],
      },
      {
        id: "tables-dining",
        label: "Tables & Dining",
        icon: "grid-outline",
        children: [
          {
            id: "dining-tables",
            label: "Dining Tables",
            icon: "grid-outline",
          },
          {
            id: "coffee-tables",
            label: "Coffee Tables",
            icon: "cafe-outline",
          },
          {
            id: "console-tables",
            label: "Console Tables",
            icon: "tablet-landscape-outline",
          },
          { id: "side-tables", label: "Side Tables", icon: "grid-outline" },
          {
            id: "dining-room-sets",
            label: "Dining Room Sets",
            icon: "apps-outline",
          },
          {
            id: "kids-tables-sets",
            label: "Kids Tables & Sets",
            icon: "happy-outline",
          },
          {
            id: "dining-chairs",
            label: "Dining Chairs",
            icon: "body-outline",
          },
          {
            id: "sideboards-buffets",
            label: "Sideboards & Buffets",
            icon: "file-tray-full-outline",
          },
          {
            id: "kitchen-islands",
            label: "Kitchen Islands",
            icon: "restaurant-outline",
          },
        ],
      },
      {
        id: "office-furniture",
        label: "Office Furniture",
        icon: "briefcase-outline",
        children: [
          {
            id: "office-tables",
            label: "Office Tables",
            icon: "grid-outline",
          },
          {
            id: "other-office-furniture",
            label: "Other Office Furniture",
            icon: "apps-outline",
          },
          {
            id: "office-chairs",
            label: "Office Chairs",
            icon: "body-outline",
          },
          {
            id: "shelves-racks",
            label: "Shelves & Racks",
            icon: "library-outline",
          },
          {
            id: "office-sofas",
            label: "Office Sofas",
            icon: "bed-outline",
          },
          {
            id: "office-cabinets",
            label: "Office Cabinets",
            icon: "file-tray-stacked-outline",
          },
        ],
      },
      {
        id: "home-decoration",
        label: "Home Decoration",
        icon: "color-palette-outline",
        children: [
          {
            id: "other-decor-items",
            label: "Other Decor Items",
            icon: "apps-outline",
          },
          { id: "wall-clocks", label: "Wall Clocks", icon: "time-outline" },
          {
            id: "wall-hangings",
            label: "Wall Hangings",
            icon: "image-outline",
          },
          { id: "lamps", label: "Lamps", icon: "bulb-outline" },
          {
            id: "other-decorations",
            label: "Other Decorations",
            icon: "apps-outline",
          },
          { id: "flooring", label: "Flooring", icon: "grid-outline" },
          { id: "candles", label: "Candles", icon: "flame-outline" },
          { id: "showpieces", label: "Showpieces", icon: "diamond-outline" },
          {
            id: "aromatherapy-home-fragrance",
            label: "Aromatherapy and Home Fragrance",
            icon: "leaf-outline",
          },
          {
            id: "artificial-flowers-plants",
            label: "Artificial Flowers & Plants",
            icon: "flower-outline",
          },
          { id: "vases", label: "Vases", icon: "flask-outline" },
          {
            id: "wall-lights",
            label: "Wall Lights",
            icon: "flashlight-outline",
          },
          {
            id: "picture-frames",
            label: "Picture Frames",
            icon: "images-outline",
          },
          { id: "handicrafts", label: "Handicrafts", icon: "hammer-outline" },
          {
            id: "chandeliers",
            label: "Chandeliers",
            icon: "bulb-outline",
          },
          {
            id: "tissue-boxes",
            label: "Tissue Boxes",
            icon: "cube-outline",
          },
          { id: "sculptures", label: "Sculptures", icon: "shapes-outline" },
          {
            id: "decorative-trays",
            label: "Decorative Trays",
            icon: "albums-outline",
          },
          {
            id: "indoor-fountains",
            label: "Indoor Fountains",
            icon: "water-outline",
          },
        ],
      },
      {
        id: "garden-outdoor",
        label: "Garden & Outdoor",
        icon: "leaf-outline",
        children: [
          { id: "plants-pots", label: "Plants & Pots", icon: "flower-outline" },
          {
            id: "artificial-grass",
            label: "Artificial Grass",
            icon: "leaf-outline",
          },
          {
            id: "outdoor-chairs",
            label: "Outdoor Chairs",
            icon: "body-outline",
          },
          {
            id: "tents-shades",
            label: "Tents & Shades",
            icon: "umbrella-outline",
          },
          {
            id: "other-outdoor-items",
            label: "Other Outdoor Items",
            icon: "apps-outline",
          },
          {
            id: "outdoor-activities",
            label: "Outdoor Activities",
            icon: "walk-outline",
          },
          {
            id: "outdoor-swings",
            label: "Outdoor Swings",
            icon: "swap-vertical-outline",
          },
          { id: "hardware", label: "Hardware", icon: "construct-outline" },
          { id: "benches", label: "Benches", icon: "remove-outline" },
          {
            id: "outdoor-umbrellas",
            label: "Outdoor Umbrellas",
            icon: "umbrella-outline",
          },
          {
            id: "outdoor-lights",
            label: "Outdoor Lights",
            icon: "flashlight-outline",
          },
          {
            id: "sprinklers-watering-systems",
            label: "Sprinklers & Watering Systems",
            icon: "water-outline",
          },
          {
            id: "outdoor-fountains",
            label: "Outdoor Fountains",
            icon: "water-outline",
          },
          {
            id: "outdoor-tables",
            label: "Outdoor Tables",
            icon: "grid-outline",
          },
        ],
      },
      {
        id: "kitchen-essentials",
        label: "Kitchen Essentials",
        icon: "restaurant-outline",
        children: [
          {
            id: "crockery-dinner-sets",
            label: "Crockery & Dinner Sets",
            icon: "restaurant-outline",
          },
          {
            id: "kitchen-utensils-tools",
            label: "Kitchen Utensils & Tools",
            icon: "hammer-outline",
          },
          {
            id: "cups-glasses-drink-sets",
            label: "Cups, Glasses, & Drink Sets",
            icon: "wine-outline",
          },
          {
            id: "baking-dishes-tools",
            label: "Baking Dishes & Tools",
            icon: "pizza-outline",
          },
          {
            id: "sponges-cleaners-liquids",
            label: "Sponges, Cleaners & Liquids",
            icon: "water-outline",
          },
          {
            id: "cookers-pots-pans",
            label: "Cookers, Pots, & Pans",
            icon: "flame-outline",
          },
          {
            id: "food-storage-dispensers",
            label: "Food Storage & Dispensers",
            icon: "cube-outline",
          },
          {
            id: "beverage-containers",
            label: "Beverage Containers",
            icon: "beer-outline",
          },
          { id: "cutlery", label: "Cutlery", icon: "restaurant-outline" },
          {
            id: "serving-dishes-utensils",
            label: "Serving Dishes & Utensils",
            icon: "albums-outline",
          },
        ],
      },
      {
        id: "bathroom-accessories",
        label: "Bathroom Accessories",
        icon: "water-outline",
        children: [
          {
            id: "other-bathroom-accessories",
            label: "Other Bathroom Accessories",
            icon: "apps-outline",
          },
          {
            id: "hand-showers-hoses-pipes",
            label: "Hand Showers, Hoses, & Pipes",
            icon: "water-outline",
          },
          { id: "toilets", label: "Toilets", icon: "ellipse-outline" },
          {
            id: "soap-dispensers",
            label: "Soap Dispensers",
            icon: "flask-outline",
          },
          {
            id: "bath-cabinets",
            label: "Bath Cabinets",
            icon: "file-tray-stacked-outline",
          },
          { id: "taps", label: "Taps", icon: "water-outline" },
          { id: "bath-towels", label: "Bath Towels", icon: "shirt-outline" },
          { id: "basins", label: "Basins", icon: "water-outline" },
          {
            id: "vanity-units",
            label: "Vanity Units",
            icon: "albums-outline",
          },
          { id: "bath-tubs", label: "Bath Tubs", icon: "water-outline" },
          {
            id: "traps-drains",
            label: "Traps & Drains",
            icon: "funnel-outline",
          },
          {
            id: "shower-cabins",
            label: "Shower Cabins",
            icon: "cube-outline",
          },
          { id: "bathrobes", label: "Bathrobes", icon: "shirt-outline" },
        ],
      },
      {
        id: "lighting",
        label: "Lighting",
        icon: "bulb-outline",
        children: [
          { id: "night-lights", label: "Night Lights", icon: "moon-outline" },
          {
            id: "outdoor-lighting",
            label: "Outdoor Lighting",
            icon: "flashlight-outline",
          },
          {
            id: "table-lamps",
            label: "Table Lamps",
            icon: "bulb-outline",
          },
          {
            id: "ceiling-lights",
            label: "Ceiling Lights",
            icon: "bulb-outline",
          },
          { id: "light-bulbs", label: "Light Bulbs", icon: "flash-outline" },
          {
            id: "led-strip-lighting",
            label: "LED Strip Lighting",
            icon: "remove-outline",
          },
          {
            id: "fairy-lights",
            label: "Fairy Lights",
            icon: "sparkles-outline",
          },
          {
            id: "wall-lights-sconces",
            label: "Wall Lights & Sconces",
            icon: "flashlight-outline",
          },
          {
            id: "floor-lamps",
            label: "Floor Lamps",
            icon: "triangle-outline",
          },
          { id: "lamp-shades", label: "Lamp Shades", icon: "ellipse-outline" },
          {
            id: "lighting-fixtures-components",
            label: "Lighting Fixtures & Components",
            icon: "construct-outline",
          },
          {
            id: "picture-display-lights",
            label: "Picture & Display Lights",
            icon: "images-outline",
          },
          {
            id: "seasonal-decorative",
            label: "Seasonal & Decorative",
            icon: "snow-outline",
          },
          {
            id: "bathroom-lighting",
            label: "Bathroom Lighting",
            icon: "water-outline",
          },
        ],
      },
      {
        id: "painting-mirrors",
        label: "Painting & Mirrors",
        icon: "images-outline",
        children: [
          {
            id: "paintings",
            label: "Paintings",
            icon: "color-palette-outline",
          },
          { id: "mirrors", label: "Mirrors", icon: "albums-outline" },
          { id: "frames", label: "Frames", icon: "images-outline" },
          {
            id: "mirror-lights",
            label: "Mirror Lights",
            icon: "flashlight-outline",
          },
          {
            id: "painting-accessories",
            label: "Painting Accessories",
            icon: "brush-outline",
          },
        ],
      },
      {
        id: "curtains-blinds",
        label: "Curtains & Blinds",
        icon: "remove-outline",
        children: [
          { id: "curtains", label: "Curtains", icon: "remove-outline" },
          { id: "blinds", label: "Blinds", icon: "grid-outline" },
          {
            id: "curtain-accessories",
            label: "Curtain Accessories",
            icon: "construct-outline",
          },
        ],
      },
      {
        id: "rugs-carpets",
        label: "Rugs & Carpets",
        icon: "square-outline",
        children: [
          { id: "carpets", label: "Carpets", icon: "square-outline" },
          { id: "rugs", label: "Rugs", icon: "square-outline" },
          {
            id: "prayer-mats",
            label: "Prayer Mats",
            icon: "square-outline",
          },
          { id: "mats", label: "Mats", icon: "square-outline" },
        ],
      },
      {
        id: "home-essentials",
        label: "Home Essentials",
        icon: "home-outline",
        children: [
          {
            id: "brooms-mops-sweepers",
            label: "Brooms, Mops & Sweepers",
            icon: "brush-outline",
          },
          {
            id: "brushes-sponges-wipers",
            label: "Brushes, Sponges & Wipers",
            icon: "water-outline",
          },
          {
            id: "cleaning-supplies",
            label: "Cleaning Supplies",
            icon: "sparkles-outline",
          },
          {
            id: "air-fresheners",
            label: "Air Fresheners",
            icon: "leaf-outline",
          },
          {
            id: "laundry-supplies",
            label: "Laundry Supplies",
            icon: "shirt-outline",
          },
        ],
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
      {
        id: "clothes",
        label: "Clothes",
        icon: "shirt-outline",
        children: [
          { id: "clothes-eastern", label: "Eastern", icon: "sparkles-outline" },
          { id: "clothes-western", label: "Western", icon: "shirt-outline" },
          {
            id: "clothes-kids",
            label: "Kids Clothes",
            icon: "happy-outline",
          },
          {
            id: "clothes-intimates",
            label: "Intimates",
            icon: "heart-outline",
          },
          {
            id: "clothes-hijabs-abayas",
            label: "Hijabs & Abayas",
            icon: "moon-outline",
          },
          {
            id: "clothes-sports",
            label: "Sports Clothes",
            icon: "barbell-outline",
          },
          {
            id: "clothes-costumes",
            label: "Costumes",
            icon: "color-wand-outline",
          },
          {
            id: "clothing-accessories",
            label: "Clothing Accessories",
            icon: "pricetag-outline",
          },
        ],
      },
      {
        id: "fashion-accessories",
        label: "Fashion Accessories",
        icon: "glasses-outline",
        children: [
          { id: "sunglasses", label: "Sunglasses", icon: "sunny-outline" },
          { id: "caps", label: "Caps", icon: "american-football-outline" },
          {
            id: "other-accessories",
            label: "Other Accessories",
            icon: "apps-outline",
          },
          { id: "socks", label: "Socks", icon: "footsteps-outline" },
          { id: "belts", label: "Belts", icon: "remove-outline" },
          { id: "gloves", label: "Gloves", icon: "hand-left-outline" },
          { id: "eyewear", label: "Eyewear", icon: "glasses-outline" },
          { id: "scarves", label: "Scarves", icon: "ribbon-outline" },
          { id: "cufflinks", label: "Cufflinks", icon: "ellipse-outline" },
          { id: "ties", label: "Ties", icon: "git-branch-outline" },
          { id: "key-holder", label: "Key Holder", icon: "key-outline" },
        ],
      },
      {
        id: "makeup",
        label: "Makeup",
        icon: "color-palette-outline",
        children: [
          { id: "makeup-face", label: "Face", icon: "happy-outline" },
          {
            id: "other-makeup-accessories",
            label: "Other Makeup Accessories",
            icon: "apps-outline",
          },
          { id: "makeup-nails", label: "Nails", icon: "color-fill-outline" },
          { id: "makeup-eyes", label: "Eyes", icon: "eye-outline" },
          { id: "makeup-lips", label: "Lips", icon: "ellipse-outline" },
          { id: "makeup-brushes", label: "Brushes", icon: "brush-outline" },
        ],
      },
      {
        id: "bath-body",
        label: "Bath & Body",
        icon: "water-outline",
        children: [
          {
            id: "lotions-moisturisers",
            label: "Lotions & Moisturisers",
            icon: "water-outline",
          },
          {
            id: "hair-removal",
            label: "Hair Removal",
            icon: "cut-outline",
          },
          {
            id: "soaps-shower-gels",
            label: "Soaps & Shower Gels",
            icon: "rose-outline",
          },
          {
            id: "bath-body-accessories",
            label: "Bath & Body Accessories",
            icon: "cube-outline",
          },
          { id: "scrubs", label: "Scrubs", icon: "sparkles-outline" },
          {
            id: "massage-oils",
            label: "Massage Oils",
            icon: "leaf-outline",
          },
          {
            id: "gifts-value-sets",
            label: "Gifts & Value Sets",
            icon: "gift-outline",
          },
        ],
      },
      {
        id: "skin-hair",
        label: "Skin & Hair",
        icon: "flower-outline",
        children: [
          { id: "hair-care", label: "Hair Care", icon: "cut-outline" },
          { id: "skin-care", label: "Skin Care", icon: "water-outline" },
          {
            id: "hair-accessories",
            label: "Hair Accessories",
            icon: "ribbon-outline",
          },
        ],
      },
      {
        id: "wedding",
        label: "Wedding",
        icon: "rose-outline",
        children: [
          { id: "bridals", label: "Bridals", icon: "sparkles-outline" },
          { id: "formals", label: "Formals", icon: "shirt-outline" },
          { id: "grooms", label: "Grooms", icon: "person-outline" },
        ],
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
      {
        id: "books-magazines",
        label: "Books & Magazines",
        icon: "book-outline",
        children: [
          { id: "books", label: "Books", icon: "book-outline" },
          {
            id: "stationery-items",
            label: "Stationery Items",
            icon: "create-outline",
          },
          {
            id: "calculators",
            label: "Calculators",
            icon: "calculator-outline",
          },
          {
            id: "magazines",
            label: "Magazines",
            icon: "newspaper-outline",
          },
          {
            id: "dictionaries",
            label: "Dictionaries",
            icon: "library-outline",
          },
        ],
      },
      {
        id: "arts-crafts",
        label: "Arts & Crafts",
        icon: "color-palette-outline",
        children: [
          {
            id: "party-supplies",
            label: "Party Supplies",
            icon: "sparkles-outline",
          },
          {
            id: "paper-products",
            label: "Paper Products",
            icon: "document-text-outline",
          },
          {
            id: "painting-supplies",
            label: "Painting Supplies",
            icon: "brush-outline",
          },
          {
            id: "gifts-wrapping",
            label: "Gifts & Wrapping",
            icon: "gift-outline",
          },
          {
            id: "craft-packaging-supplies",
            label: "Craft Packaging & Supplies",
            icon: "cube-outline",
          },
          {
            id: "art-pads-diaries-folios",
            label: "Art Pads, Diaries & Folios",
            icon: "albums-outline",
          },
          {
            id: "modeling-sculpting",
            label: "Modeling & Sculpting",
            icon: "hammer-outline",
          },
        ],
      },
      {
        id: "crafts-diy-supplies",
        label: "Crafts & DIY Supplies",
        icon: "construct-outline",
        children: [
          {
            id: "wool-knitting-crochet",
            label: "Wool, Knitting & Crochet",
            icon: "git-merge-outline",
          },
          {
            id: "other-craft-supplies",
            label: "Other Craft Supplies",
            icon: "apps-outline",
          },
          {
            id: "laces-ribbons-decorative-trims",
            label: "Laces, Ribbons & Decorative Trims",
            icon: "pricetag-outline",
          },
          {
            id: "quilt-making-supplies",
            label: "Quilt Making Supplies",
            icon: "grid-outline",
          },
          {
            id: "sewing-accessories",
            label: "Sewing Accessories",
            icon: "cut-outline",
          },
          {
            id: "embroidery-hand-stitching",
            label: "Embroidery & Hand Stitching",
            icon: "color-fill-outline",
          },
          {
            id: "sewing-craft-patterns",
            label: "Sewing & Craft Patterns",
            icon: "map-outline",
          },
        ],
      },
      {
        id: "camping-hiking",
        label: "Camping & Hiking",
        icon: "trail-sign-outline",
        children: [
          { id: "lighting", label: "Lighting", icon: "flashlight-outline" },
          {
            id: "trekking-poles",
            label: "Trekking Poles",
            icon: "walk-outline",
          },
          {
            id: "camp-kitchen",
            label: "Camp Kitchen",
            icon: "restaurant-outline",
          },
          {
            id: "sleeping-gear",
            label: "Sleeping Gear",
            icon: "bed-outline",
          },
          {
            id: "camping-hiking-tool-kits",
            label: "Camping & Hiking Tool Kits",
            icon: "hammer-outline",
          },
          { id: "tents", label: "Tents", icon: "umbrella-outline" },
          {
            id: "backpacks",
            label: "Backpacks",
            icon: "briefcase-outline",
          },
          {
            id: "navigation-electronics",
            label: "Navigation & Electronics",
            icon: "compass-outline",
          },
          {
            id: "shelters-canopies",
            label: "Shelters & Canopies",
            icon: "home-outline",
          },
          {
            id: "camp-furniture",
            label: "Camp Furniture",
            icon: "grid-outline",
          },
        ],
      },
      {
        id: "collectables",
        label: "Collectables",
        icon: "diamond-outline",
        children: [
          {
            id: "coins-notes",
            label: "Coins & Notes",
            icon: "cash-outline",
          },
          { id: "stamps", label: "Stamps", icon: "mail-outline" },
          { id: "stones", label: "Stones", icon: "ellipse-outline" },
        ],
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
      {
        id: "kids-clothing",
        label: "Kids Clothing",
        icon: "shirt-outline",
        children: [
          {
            id: "kids-clothes",
            label: "Kids Clothes",
            icon: "shirt-outline",
          },
          {
            id: "kids-shoes",
            label: "Kids Shoes",
            icon: "footsteps-outline",
          },
          {
            id: "kids-clothing-others",
            label: "Others",
            icon: "apps-outline",
          },
          {
            id: "kids-costumes",
            label: "Kids Costumes",
            icon: "sparkles-outline",
          },
          {
            id: "kids-uniforms",
            label: "Kids Uniforms",
            icon: "school-outline",
          },
        ],
      },
      {
        id: "baby-gear",
        label: "Baby Gear",
        icon: "happy-outline",
        children: [
          {
            id: "prams-walkers",
            label: "Prams & Walkers",
            icon: "walk-outline",
          },
          { id: "baby-cots", label: "Baby Cots", icon: "bed-outline" },
          {
            id: "baby-swings",
            label: "Baby Swings",
            icon: "swap-vertical-outline",
          },
          {
            id: "other-baby-gear",
            label: "Other Baby Gear",
            icon: "apps-outline",
          },
          {
            id: "high-chairs",
            label: "High Chairs",
            icon: "restaurant-outline",
          },
          {
            id: "baby-carriers",
            label: "Baby Carriers",
            icon: "briefcase-outline",
          },
          { id: "car-seats", label: "Car Seats", icon: "car-outline" },
          {
            id: "baby-bouncers",
            label: "Baby Bouncers",
            icon: "radio-button-on-outline",
          },
        ],
      },
      {
        id: "kids-vehicles",
        label: "Kids Vehicles",
        icon: "car-sport-outline",
        children: [
          { id: "kids-cars", label: "Kids Cars", icon: "car-outline" },
          {
            id: "kids-cycles",
            label: "Kids Cycles",
            icon: "bicycle-outline",
          },
          {
            id: "kids-bikes",
            label: "Kids Bikes",
            icon: "bicycle-outline",
          },
          {
            id: "kids-scooties",
            label: "Kids Scooties",
            icon: "rocket-outline",
          },
        ],
      },
    ],
  },
  {
    id: "animals",
    label: "Animals",
    icon: "paw-outline",
    subCategories: [
      {
        id: "pet-food-accessories",
        label: "Pet Food & Accessories",
        icon: "help-circle-outline",
        children: [
          {
            id: "cat-accessories",
            label: "Cat Accessories",
            icon: "paw-outline",
          },
          {
            id: "dog-accessories",
            label: "Dog Accessories",
            icon: "paw-outline",
          },
          {
            id: "beds-mats-houses",
            label: "Beds, Mats & Houses",
            icon: "home-outline",
          },
          { id: "dog-food", label: "Dog Food", icon: "nutrition-outline" },
          { id: "brooders", label: "Brooders", icon: "layers-outline" },
          { id: "medicines", label: "Medicines", icon: "medkit-outline" },
          {
            id: "pet-scratchers-furniture",
            label: "Pet Scratchers & Furniture",
            icon: "home-outline",
          },
          { id: "cat-toys", label: "Cat Toys", icon: "balloon-outline" },
          {
            id: "bowls-feeders",
            label: "Bowls & Feeders",
            icon: "water-outline",
          },
          {
            id: "carriers-travel",
            label: "Carriers & Travel",
            icon: "briefcase-outline",
          },
          {
            id: "clothing-shoes-accessories",
            label: "Clothing, Shoes & Accessories",
            icon: "shirt-outline",
          },
          { id: "fish-food", label: "Fish Food", icon: "nutrition-outline" },
          {
            id: "litter-cleanup-sanitation",
            label: "Litter, Clean up, & Sanitation",
            icon: "water-outline",
          },
          {
            id: "dental-healthcare",
            label: "Dental & Healthcare",
            icon: "medkit-outline",
          },
          { id: "dog-toys", label: "Dog Toys", icon: "balloon-outline" },
          {
            id: "training-aids",
            label: "Training Aids",
            icon: "school-outline",
          },
          {
            id: "technology",
            label: "Technology",
            icon: "phone-portrait-outline",
          },
          {
            id: "cages-crates-doors",
            label: "Cages, Crates & Doors",
            icon: "layers-outline",
          },
          { id: "hen-cages", label: "Hen Cages", icon: "layers-outline" },
          {
            id: "incubators",
            label: "Incubators",
            icon: "thermometer-outline",
          },
          { id: "aquariums", label: "Aquariums", icon: "water-outline" },
          {
            id: "birds-accessories",
            label: "Birds Accessories",
            icon: "paw-outline",
          },
          {
            id: "other-animal-food-accessories",
            label: "Other Animal Food & Accessories",
            icon: "apps-outline",
          },
          {
            id: "pet-grooming",
            label: "Pet Grooming",
            icon: "sparkles-outline",
          },
          { id: "birds-food", label: "Birds Food", icon: "nutrition-outline" },
          { id: "cat-food", label: "Cat Food", icon: "nutrition-outline" },
        ],
      },
      {
        id: "livestock",
        label: "Livestock",
        icon: "business-outline",
        children: [
          { id: "goats", label: "Goats", icon: "paw-outline" },
          { id: "cows", label: "Cows", icon: "paw-outline" },
          { id: "sheep", label: "Sheep", icon: "paw-outline" },
          { id: "bulls", label: "Bulls", icon: "paw-outline" },
          { id: "buffalos", label: "Buffalos", icon: "paw-outline" },
          { id: "camels", label: "Camels", icon: "paw-outline" },
          { id: "horses", label: "Horses", icon: "paw-outline" },
          { id: "donkeys", label: "Donkeys", icon: "paw-outline" },
          { id: "pigs", label: "Pigs", icon: "paw-outline" },
          { id: "poultry", label: "Poultry", icon: "paw-outline" },
          { id: "rabbits", label: "Rabbits", icon: "paw-outline" },
          { id: "alpacas", label: "Alpacas", icon: "paw-outline" },
          { id: "others", label: "Others", icon: "apps-outline" },
        ],
      },
      {
        id: "other-animals",
        label: "Other Animals",
        icon: "apps-outline",
      },
      {
        id: "other-birds",
        label: "Other Birds",
        icon: "leaf-outline",
      },
    ],
  },
];
