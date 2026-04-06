import type { ChipsFieldOptionsMap } from "@/config/chipsOptions/types";

const EMPLOYMENT_TYPE = [
  "Full Time",
  "Part Time",
  "Contract",
  "Temporary",
  "Internship",
];
const WORKPLACE_TYPE = ["On-site", "Remote", "Hybrid"];
const EXPERIENCE_LEVEL = ["Fresh", "1-2 Years", "3-5 Years", "5+ Years"];
const EDUCATION_LEVEL = [
  "Matric",
  "Intermediate",
  "Diploma",
  "Bachelors",
  "Masters",
  "PhD",
  "Not Required",
];
const SALARY_PERIOD = [
  "Hourly",
  "Daily",
  "Weekly",
  "Monthly",
  "Yearly",
  "Commission",
  "Negotiable",
];
const SHIFT_TIMING = ["Morning", "Evening", "Night", "Flexible", "Rotational"];
const GENDER_PREFERENCE = ["Male", "Female", "Any"];
const POSITIONS_AVAILABLE = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10+",
];

const COMMON_JOB_OPTIONS: ChipsFieldOptionsMap = {
  role_type: [
    "Entry Level",
    "Assistant",
    "Officer",
    "Executive",
    "Supervisor",
    "Manager",
    "Specialist",
    "Other",
  ],
  employment_type: EMPLOYMENT_TYPE,
  workplace_type: WORKPLACE_TYPE,
  experience_level: EXPERIENCE_LEVEL,
  education_level: EDUCATION_LEVEL,
  salary_period: SALARY_PERIOD,
  shift_timing: SHIFT_TIMING,
  gender_preference: GENDER_PREFERENCE,
  positions_available: POSITIONS_AVAILABLE,
  skills: [
    "Communication",
    "Computer Skills",
    "MS Office",
    "Customer Handling",
    "Sales",
    "Teamwork",
    "Problem Solving",
    "Time Management",
  ],
};

export const JOB_FIELD_OPTIONS_BY_SUBCATEGORY: Record<
  string,
  ChipsFieldOptionsMap
> = {
  "other-jobs": {
    ...COMMON_JOB_OPTIONS,
    role_type: [
      "General Worker",
      "Office Work",
      "Field Work",
      "Skilled Worker",
      "Other",
    ],
  },
  "online-jobs": {
    ...COMMON_JOB_OPTIONS,
    role_type: [
      "Virtual Assistant",
      "Data Entry",
      "Freelancer",
      "Customer Support",
      "Other",
    ],
    skills: [
      "Typing",
      "Excel",
      "Communication",
      "Internet Research",
      "Email Handling",
      "Canva",
    ],
  },
  "sales-jobs": {
    ...COMMON_JOB_OPTIONS,
    role_type: [
      "Sales Executive",
      "Sales Officer",
      "Retail Sales",
      "Business Development",
      "Tele Sales",
    ],
    skills: [
      "Negotiation",
      "Lead Generation",
      "CRM",
      "Communication",
      "Target Oriented",
      "Closing",
    ],
  },
  "part-time-jobs": {
    ...COMMON_JOB_OPTIONS,
    role_type: [
      "Part Time Office",
      "Part Time Sales",
      "Part Time Delivery",
      "Part Time Tutor",
      "Other",
    ],
  },
  "restaurants-hospitality-jobs": {
    ...COMMON_JOB_OPTIONS,
    role_type: [
      "Cook",
      "Chef",
      "Waiter",
      "Kitchen Helper",
      "Barista",
      "Reception",
    ],
    skills: [
      "Food Handling",
      "Customer Service",
      "POS",
      "Kitchen Operations",
      "Hygiene",
    ],
  },
  "customer-service-jobs": {
    ...COMMON_JOB_OPTIONS,
    role_type: [
      "Call Center Agent",
      "Customer Care",
      "Support Executive",
      "Help Desk",
    ],
    skills: [
      "Communication",
      "Complaint Handling",
      "CRM",
      "Active Listening",
      "Email Support",
    ],
  },
  "domestic-staff-jobs": {
    ...COMMON_JOB_OPTIONS,
    role_type: ["Maid", "Cook", "Driver", "Guard", "Baby Sitter", "Care Taker"],
    skills: [
      "House Cleaning",
      "Cooking",
      "Driving",
      "Child Care",
      "Elder Care",
    ],
  },
  "marketing-jobs": {
    ...COMMON_JOB_OPTIONS,
    role_type: [
      "Digital Marketer",
      "SEO Specialist",
      "Social Media Manager",
      "Brand Executive",
    ],
    skills: [
      "SEO",
      "Meta Ads",
      "Google Ads",
      "Content Planning",
      "Analytics",
      "Copywriting",
    ],
  },
  "education-jobs": {
    ...COMMON_JOB_OPTIONS,
    role_type: ["Teacher", "Lecturer", "Tutor", "Coordinator", "Principal"],
    skills: [
      "Subject Knowledge",
      "Class Management",
      "Lesson Planning",
      "Presentation",
    ],
  },
  "medical-jobs": {
    ...COMMON_JOB_OPTIONS,
    role_type: [
      "Doctor",
      "Nurse",
      "Lab Technician",
      "Pharmacist",
      "Medical Assistant",
    ],
    skills: [
      "Patient Care",
      "Clinical Skills",
      "Record Keeping",
      "Emergency Response",
    ],
  },
  "delivery-riders-jobs": {
    ...COMMON_JOB_OPTIONS,
    role_type: ["Food Delivery Rider", "Courier Rider", "Parcel Rider"],
    skills: [
      "Route Navigation",
      "Time Management",
      "Customer Dealing",
      "Bike Handling",
    ],
  },
  "accounting-finance-jobs": {
    ...COMMON_JOB_OPTIONS,
    role_type: [
      "Accountant",
      "Finance Officer",
      "Bookkeeper",
      "Auditor",
      "Cashier",
    ],
    skills: [
      "QuickBooks",
      "Excel",
      "Tax Filing",
      "Bookkeeping",
      "Financial Reporting",
    ],
  },
  "it-networking-jobs": {
    ...COMMON_JOB_OPTIONS,
    role_type: [
      "IT Support",
      "Network Engineer",
      "System Admin",
      "Help Desk",
      "Software Developer",
    ],
    skills: [
      "Networking",
      "Linux",
      "Windows Server",
      "Troubleshooting",
      "Programming",
    ],
  },
  "graphic-design-jobs": {
    ...COMMON_JOB_OPTIONS,
    role_type: [
      "Graphic Designer",
      "UI Designer",
      "Motion Designer",
      "Brand Designer",
    ],
    skills: ["Photoshop", "Illustrator", "Figma", "Canva", "Branding"],
  },
  "hotels-tourism-jobs": {
    ...COMMON_JOB_OPTIONS,
    role_type: [
      "Front Desk",
      "Tour Guide",
      "Reservation Officer",
      "Guest Relations",
    ],
    skills: [
      "Hospitality",
      "Communication",
      "Booking Tools",
      "Customer Service",
    ],
  },
  "engineering-jobs": {
    ...COMMON_JOB_OPTIONS,
    role_type: [
      "Civil Engineer",
      "Electrical Engineer",
      "Mechanical Engineer",
      "Site Engineer",
    ],
    skills: [
      "AutoCAD",
      "Project Management",
      "Site Supervision",
      "Technical Reporting",
    ],
  },
  "security-jobs": {
    ...COMMON_JOB_OPTIONS,
    role_type: ["Security Guard", "Supervisor", "CCTV Operator"],
    skills: ["Vigilance", "CCTV Monitoring", "Reporting", "Emergency Handling"],
  },
  "manufacturing-jobs": {
    ...COMMON_JOB_OPTIONS,
    role_type: [
      "Machine Operator",
      "Production Worker",
      "Quality Checker",
      "Supervisor",
    ],
    skills: [
      "Machine Handling",
      "Quality Control",
      "Safety Compliance",
      "Production Planning",
    ],
  },
  "clerical-administration-jobs": {
    ...COMMON_JOB_OPTIONS,
    role_type: [
      "Office Assistant",
      "Admin Officer",
      "Data Entry Operator",
      "Clerk",
    ],
    skills: [
      "MS Office",
      "Documentation",
      "File Management",
      "Typing",
      "Coordination",
    ],
  },
  "content-writing-jobs": {
    ...COMMON_JOB_OPTIONS,
    role_type: [
      "Content Writer",
      "Copywriter",
      "Blog Writer",
      "Technical Writer",
    ],
    skills: ["SEO Writing", "Research", "Editing", "Grammar", "Storytelling"],
  },
  "human-resources-jobs": {
    ...COMMON_JOB_OPTIONS,
    role_type: ["HR Officer", "Recruiter", "HR Manager", "Payroll Officer"],
    skills: [
      "Recruitment",
      "Payroll",
      "HR Policies",
      "Interviewing",
      "Employee Relations",
    ],
  },
  "real-estate-jobs": {
    ...COMMON_JOB_OPTIONS,
    role_type: [
      "Property Consultant",
      "Sales Agent",
      "Leasing Agent",
      "Real Estate Manager",
    ],
    skills: [
      "Property Sales",
      "Negotiation",
      "Client Handling",
      "Lead Management",
    ],
  },
  "internships-jobs": {
    ...COMMON_JOB_OPTIONS,
    role_type: [
      "Marketing Intern",
      "HR Intern",
      "Finance Intern",
      "IT Intern",
      "Design Intern",
    ],
    experience_level: ["Fresh"],
    skills: [
      "Learning Attitude",
      "Communication",
      "Teamwork",
      "Basic Computer Skills",
    ],
  },
  "advertising-pr-jobs": {
    ...COMMON_JOB_OPTIONS,
    role_type: [
      "PR Executive",
      "Media Planner",
      "Brand Executive",
      "Campaign Manager",
    ],
    skills: [
      "Media Buying",
      "Brand Communication",
      "Public Relations",
      "Campaign Planning",
    ],
  },
  "architecture-interior-design-jobs": {
    ...COMMON_JOB_OPTIONS,
    role_type: ["Architect", "Interior Designer", "Draftsman", "3D Visualizer"],
    skills: [
      "AutoCAD",
      "SketchUp",
      "3ds Max",
      "Space Planning",
      "Site Measurement",
    ],
  },
};
