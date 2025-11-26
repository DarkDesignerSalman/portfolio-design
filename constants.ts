
import { Product, NewsArticle, PortfolioItem, UserProfile } from './types';

export const USER_PROFILE: UserProfile = {
  name: "MD Salman Islam",
  title: "Software Engineer",
  company: "Dynamic Megasoft Limited",
  experienceYearsWeb: 4,
  experienceYearsGraphic: 7,
  university: "IUBAT - International University of Business Agriculture and Technology",
  skills: ["HTML", "CSS", "Sass", "TypeScript", "JavaScript", "ReactJS", "Bootstrap", "NextJS", "AngularJS", "Git", "GitHub", "Tailwind CSS"],
  graphicSkills: ["Adobe Illustrator", "Adobe Photoshop", "Figma", "Logo Design", "Flyer", "Poster", "Banner", "YouTube Thumbnail", "Facebook Post Design"],
  phone: "+8801681412690",
  email: "salmanislam501@gmail.com",
  social: {
    facebook: "https://www.facebook.com/salman.islam.855944/",
    linkedin: "https://www.linkedin.com/in/salmanislam/",
    behance: "https://www.behance.net/salmanislam2019#",
    dribbble: "https://dribbble.com/Salman99",
    github: "https://github.com/DarkDesignerSalman"
  }
};

const generateId = () => Math.random().toString(36).substr(2, 9);

// Shared Categories
export const PRODUCT_CATEGORIES = ['Electric', 'Home Accessories', 'Toy', 'Baby', 'Boys'];
export const NEWS_CATEGORIES = ['Technology', 'Design', 'Business', 'Development', 'General'];
export const GRAPHIC_SUB_CATEGORIES = ['Logo', 'Flyer', 'Poster', 'Banner', 'YouTube Thumbnail', 'Facebook Post Design'];
export const WEB_SUB_CATEGORIES = ['UI/UX', 'Dashboard', 'ERP', 'E-commerce', 'Blog', 'Delivery'];

const PLACEHOLDER_IMG = "https://www.logoai.com/uploads/output/2025/04/19/0c61fa6a79a7055a4dfd9b288e882c41.jpg";
const PLACEHOLDER_IMG_new = "https://cdn.dribbble.com/userupload/43049376/file/original-ac05725106b3cc97fdb8a60930ca0795.png?resize=1504x1128&vertical=centerhttps://www.logoai.com/uploads/output/2025/04/19/0c61fa6a79a7055a4dfd9b288e882c41.jpg";

// Generate Mock Products
export const INITIAL_PRODUCTS: Product[] = Array.from({ length: 10 }).map((_, i) => {
  const category = PRODUCT_CATEGORIES[i % PRODUCT_CATEGORIES.length];

  return {
    id: generateId(),
    title: `${category} Premium Item ${i + 1}`,
    price: Math.floor(Math.random() * 5000) + 500,
    image: `https://placehold.co/400x400/1e293b/ffffff?text=${category}+Item+${i + 1}`,
    rating: (Math.random() * 2 + 3).toFixed(1) as unknown as number,
    sold: Math.floor(Math.random() * 500),
    description: `This is a high-quality ${category} item designed for durability and style. It features premium materials and comes with a 1-year warranty. Perfect for daily use or as a gift.`,
    category: category
  };
});

// Mock News
export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: generateId(),
    title: "Tech Industry Booms in Bangladesh",
    summary: "The software sector in Dhaka is seeing unprecedented growth as more global companies invest. Exports have risen by 40% in the last fiscal year.",
    image: "https://placehold.co/600x400/1e293b/ffffff?text=Tech+News",
    date: "2023-10-27",
    category: "Technology"
  },
  {
    id: generateId(),
    title: "New Graphics Trends for 2024",
    summary: "Minimalism continues to dominate, but 3D elements are making a strong comeback in web design. Designers are focusing on accessibility and dark mode aesthetics.",
    image: "https://placehold.co/600x400/1e293b/ffffff?text=Design+Trends",
    date: "2023-10-26",
    category: "Design"
  },
  {
    id: generateId(),
    title: "Startups to Watch in Dhaka",
    summary: "A list of promising startups emerging from the capital's vibrant ecosystem, focusing on Fintech, EdTech, and HealthTech solutions.",
    image: "https://placehold.co/600x400/1e293b/ffffff?text=Startup+News",
    date: "2023-10-25",
    category: "Business"
  },
  {
    id: generateId(),
    title: "React vs Angular: The Eternal Debate",
    summary: "Developers weigh in on the pros and cons of the two most popular frontend frameworks. React's ecosystem vs Angular's structure remains the key topic.",
    image: "https://placehold.co/600x400/1e293b/ffffff?text=Dev+Debate",
    date: "2023-10-24",
    category: "Development"
  }
];

// Mock Portfolio
export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  // First item uses the specific URL requested by the user
  {
    id: generateId(),
    title: "Modern Logo Design Concept",
    category: 'graphic',
    subCategory: 'Logo',
    image: PLACEHOLDER_IMG,
    description: "A professional logo design concept focusing on modern minimalism and brand identity."
  },
  {
    id: generateId(),
    title: "Modern Logo Design Concept",
    category: 'graphic',
    subCategory: 'Logo',
    image: PLACEHOLDER_IMG_new,
    description: "A professional logo design concept focusing on modern minimalism and brand identity."
  },
  {
    id: generateId(),
    title: "Corporate Brand Identity",
    category: 'graphic',
    subCategory: 'Logo',
    image: PLACEHOLDER_IMG,
    description: "Complete branding package including logo, business card, and letterhead design."
  },
  {
    id: generateId(),
    title: "E-commerce Dashboard UI",
    category: 'web',
    subCategory: 'Dashboard',
    image: PLACEHOLDER_IMG,
    description: "A clean and modern dashboard interface for managing online store orders and inventory."
  },
  {
    id: generateId(),
    title: "E-commerce Dashboard UI",
    category: 'web',
    subCategory: 'Dashboard',
    image: PLACEHOLDER_IMG,
    description: "A clean and modern dashboard interface for managing online store orders and inventory."
  },
  // Additional items with placeholders
  ...Array.from({ length: 5 }).map((_, i) => ({
    id: generateId(),
    title: `Graphic Project ${i + 3}`,
    category: 'graphic' as const,
    subCategory: GRAPHIC_SUB_CATEGORIES[i % GRAPHIC_SUB_CATEGORIES.length],
    image: `https://placehold.co/600x400/1e293b/ffffff?text=Graphic+Design+${i + 1}`,
    description: "A creative graphic design solution focusing on brand identity and visual communication."
  })),
  ...Array.from({ length: 5 }).map((_, i) => ({
    id: generateId(),
    title: `Web Project ${i + 2}`,
    category: 'web' as const,
    subCategory: WEB_SUB_CATEGORIES[i % WEB_SUB_CATEGORIES.length],
    image: `https://placehold.co/600x400/1e293b/ffffff?text=Web+Project+${i + 1}`,
    description: "A fully responsive web application built with React and Tailwind CSS."
  }))
];
