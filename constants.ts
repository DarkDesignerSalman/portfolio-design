
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

const PLACEHOLDER_IMG_NEW = "https://cdn.dribbble.com/userupload/43049376/file/original-ac05725106b3cc97fdb8a60930ca0795.png?resize=1504x1128&vertical=center";

const PLACEHOLDER_Logo_One = "https://cdn.dribbble.com/userupload/42757893/file/original-ffd415fd133fbc9c586ea81bb2415bdd.png?resize=752x&vertical=center";

const PLACEHOLDER_Logo_Two = "https://cdn.dribbble.com/userupload/43773046/file/original-e2208637334bc2ccd904b54d45b996ea.jpg?resize=752x&vertical=center";

const PLACEHOLDER_Logo_Three = "https://cdn.dribbble.com/userupload/45167052/file/c4e3c25cba7bf73ebc0829abf19fe484.jpg?resize=1504x1128&vertical=center";

const PLACEHOLDER_Logo_Four = "https://cdn.dribbble.com/userupload/44893718/file/c6d0f14669ab6145b2c67a9b4162f805.jpg?resize=1504x1128&vertical=center";

const PLACEHOLDER_Logo_Five = "https://cdn.dribbble.com/userupload/18259118/file/original-b0120e3a99726ef241d5788a533456a5.jpg?resize=1504x1128&vertical=center";

const PLACEHOLDER_Logo_6 = "https://cdn.dribbble.com/userupload/16030548/file/original-4397f8c74f446ef51f0429d69ed9faf1.jpg?resize=1504x1128&vertical=center";

const PLACEHOLDER_Logo_7 = "https://cdn.dribbble.com/userupload/15400785/file/original-da6f84206b70e0f9e718931e40ee2907.jpg?resize=1504x1128&vertical=center";

const PLACEHOLDER_Flyer_1 = "https://cdn.dribbble.com/userupload/41529132/file/original-692f9d5362b806dc01ec133af88c9d0c.jpg?resize=2048x1536&vertical=center";

//Flyer design image
const PLACEHOLDER_Flyer_2 = "https://cdn.dribbble.com/userupload/44300239/file/b31c10c90831b2cf0f36d915acb9f79f.jpg?resize=1024x768&vertical=center";

const PLACEHOLDER_Flyer_3 = "https://cdn.dribbble.com/userupload/45240555/file/da736445a93f762a680fbe96721956e2.jpg?resize=1504x1128&vertical=center";

const PLACEHOLDER_Flyer_4 = "https://cdn.dribbble.com/userupload/13329704/file/original-da09391d4bb24d4e101bcdeff6eba3fe.jpg?resize=1504x859&vertical=center";

const PLACEHOLDER_Flyer_5 = "https://cdn.dribbble.com/userupload/33383315/file/original-2c732c4f5a8a3669b7212e4667b7bbf2.jpg?resize=1200x800&vertical=center";

const PLACEHOLDER_Flyer_6 = "https://cdn.dribbble.com/userupload/3100571/file/original-3fe5d828fc3f85809f8428b995522ad0.jpg?resize=1504x1128&vertical=center";

//poster design image
const PLACEHOLDER_Poster_1 = "https://cdn.dribbble.com/userupload/45581330/file/c7b1c99a2e1cd850a2b7fa953f0f37ee.jpg?resize=2048x1536&vertical=center";

const PLACEHOLDER_Poster_2 = "https://cdn.dribbble.com/userupload/16420817/file/original-f279cddc72f141d01a7f406865677e8f.jpg?resize=1200x900&vertical=center";

const PLACEHOLDER_Poster_3 = "https://cdn.dribbble.com/userupload/45665358/file/5c31b31ea23fe92ab0fcd0c085ddab28.jpg?resize=2048x2048&vertical=center";

//Banner Design image
const PLACEHOLDER_Banner_1 = "https://cdn.dribbble.com/userupload/31648144/file/original-04bcbad88c90178c8e6ce25103cd42b8.jpg?resize=1504x1128&vertical=center";

const PLACEHOLDER_Banner_2 = "https://cdn.dribbble.com/userupload/45272537/file/f14a18cfffc75c90edb888aa21587700.jpg?resize=2048x1536&vertical=center";

const PLACEHOLDER_Banner_3 = "https://cdn.dribbble.com/userupload/11055280/file/original-ffc69cba9f7205a7175ea2f83bc7c1e6.jpg?resize=1504x1128&vertical=center";

//YouTube Thumbnail Image
const PLACEHOLDER_YouTube_Thumbnail_1 = "https://cdn.dribbble.com/userupload/45828095/file/45cb4ad6d515a776574d474237b9c0f0.jpg?resize=752x564&vertical=center";

const PLACEHOLDER_YouTube_Thumbnail_2 = "https://cdn.dribbble.com/userupload/45828022/file/fcac2338da004a99afb36ef642ac42bb.jpg?resize=752x564&vertical=center";

const PLACEHOLDER_YouTube_Thumbnail_3 = "https://cdn.dribbble.com/userupload/45617861/file/6aea30a1e2d0e8e3cbac0cde468456f4.png?resize=1504x1152&vertical=center";


//Facebook_Post_Design image
const PLACEHOLDER_Facebook_Post_Design_1 = "https://cdn.dribbble.com/userupload/18415065/file/original-7d24edbb018d22dfa9249f5287591fe7.jpg?resize=1504x1128&vertical=center";

const PLACEHOLDER_Facebook_Post_Design_2 = "https://cdn.dribbble.com/userupload/43240610/file/original-214348d60564a6425e55ae7c497e0538.jpg?resize=2048x1602&vertical=center";

const PLACEHOLDER_Facebook_Post_Design_3 = "https://cdn.dribbble.com/userupload/45129495/file/370c4ffd7ecb6e5189a35a0c8361ff6c.jpg?resize=1200x926&vertical=center";

//web ui_ux design image
const PLACEHOLDER_Ui_Ux_1 = "https://cdn.dribbble.com/userupload/37425846/file/original-9d3e95aad4bab078d83e8806003cfdc8.png?resize=2048x1536&vertical=center";

const PLACEHOLDER_Ui_Ux_2 = "https://cdn.dribbble.com/userupload/42825309/file/original-9d4ec93f3216e5b017cbe5e53393d17e.png?resize=2048x1536&vertical=center";

const PLACEHOLDER_Ui_Ux_3 = "https://cdn.dribbble.com/userupload/44496340/file/6ec0c0a2a849c943fbbd5784edb9f495.jpeg?resize=2048x1536&vertical=center";

//Dashbooard Design image
const PLACEHOLDER_Dashboard_1 = "https://cdn.dribbble.com/userupload/9379139/file/original-5ad641c19a17f3f1fe032bc132889eee.jpg?resize=2048x1536&vertical=center";

const PLACEHOLDER_Dashboard_2 = "https://cdn.dribbble.com/userupload/44846558/file/8d281cde4a3f9ba12f3f5ed6ff6a90d2.png?resize=2048x1536&vertical=center";

const PLACEHOLDER_Dashboard_3 = "https://cdn.dribbble.com/userupload/44792757/file/c48190f46eeac035fe17e3aee97d0b7f.png?resize=2048x1536&vertical=center";

//erp design imagee
const PLACEHOLDER_Erp_1 = "https://cdn.dribbble.com/userupload/44303139/file/c55c1797276176a57b7d7756a110d5fa.png?resize=2048x1536&vertical=center";

const PLACEHOLDER_Erp_2 = "https://cdn.dribbble.com/userupload/41541809/file/original-19f1da6ec036918589c5d1707ee5b63f.png?resize=2048x1536&vertical=center";

const PLACEHOLDER_Erp_3 = "https://cdn.dribbble.com/userupload/37369745/file/original-5b1790b6af6d90c752bb12a2243feaaa.png?resize=1504x1128&vertical=center";

//E-commerce design image
const PLACEHOLDER_Ecommerce_1 = "https://cdn.dribbble.com/userupload/45448021/file/93891ae98717a82a1f7ff5515c60e5ac.png?resize=2048x1638&vertical=center";




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
    title: "Corporate Brand Identity",
    category: 'graphic',
    subCategory: 'Logo',
    image: PLACEHOLDER_IMG_NEW,
    description: "Complete branding package including logo, business card, and letterhead design."
  },
  {
    id: generateId(),
    title: "Corporate Brand Identity",
    category: 'graphic',
    subCategory: 'Logo',
    image: PLACEHOLDER_Logo_One,
    description: "Complete branding package including logo, business card, and letterhead design."
  },
  {
    id: generateId(),
    title: "Corporate Brand Identity",
    category: 'graphic',
    subCategory: 'Logo',
    image: PLACEHOLDER_Logo_Two,
    description: "Complete branding package including logo, business card, and letterhead design."
  },
  {
    id: generateId(),
    title: "Corporate Brand Identity",
    category: 'graphic',
    subCategory: 'Logo',
    image: PLACEHOLDER_Logo_Three,
    description: "Complete branding package including logo, business card, and letterhead design."
  },
  {
    id: generateId(),
    title: "Corporate Brand Identity",
    category: 'graphic',
    subCategory: 'Logo',
    image: PLACEHOLDER_Logo_Four,
    description: "Complete branding package including logo, business card, and letterhead design."
  },
  {
    id: generateId(),
    title: "Corporate Brand Identity",
    category: 'graphic',
    subCategory: 'Logo',
    image: PLACEHOLDER_Logo_Five,
    description: "Complete branding package including logo, business card, and letterhead design."
  },
  {
    id: generateId(),
    title: "Corporate Brand Identity",
    category: 'graphic',
    subCategory: 'Logo',
    image: PLACEHOLDER_Logo_6,
    description: "Complete branding package including logo, business card, and letterhead design."
  },
  {
    id: generateId(),
    title: "Corporate Brand Identity",
    category: 'graphic',
    subCategory: 'Logo',
    image: PLACEHOLDER_Logo_7,
    description: "Complete branding package including logo, business card, and letterhead design."
  },


  //Flyer design image
  {
    id: generateId(),
    title: "Corporate Brand Identity",
    category: 'graphic',
    subCategory: 'Flyer',
    image: PLACEHOLDER_Flyer_1,
    description: "Complete branding package including logo, business card, and letterhead design."
  },

  {
    id: generateId(),
    title: "Corporate Brand Identity",
    category: 'graphic',
    subCategory: 'Flyer',
    image: PLACEHOLDER_Flyer_2,
    description: "Complete branding package including logo, business card, and letterhead design."
  },
  {
    id: generateId(),
    title: "Corporate Brand Identity",
    category: 'graphic',
    subCategory: 'Flyer',
    image: PLACEHOLDER_Flyer_3,
    description: "Complete branding package including logo, business card, and letterhead design."
  },
  {
    id: generateId(),
    title: "Corporate Brand Identity",
    category: 'graphic',
    subCategory: 'Flyer',
    image: PLACEHOLDER_Flyer_4,
    description: "Complete branding package including logo, business card, and letterhead design."
  },
  {
    id: generateId(),
    title: "Corporate Brand Identity",
    category: 'graphic',
    subCategory: 'Flyer',
    image: PLACEHOLDER_Flyer_5,
    description: "Complete branding package including logo, business card, and letterhead design."
  },
  {
    id: generateId(),
    title: "Corporate Brand Identity",
    category: 'graphic',
    subCategory: 'Flyer',
    image: PLACEHOLDER_Flyer_6,
    description: "Complete branding package including logo, business card, and letterhead design."
  },

  //Poster design Image
  {
    id: generateId(),
    title: "Corporate Brand Identity",
    category: 'graphic',
    subCategory: 'Poster',
    image: PLACEHOLDER_Poster_1,
    description: "Complete branding package including logo, business card, and letterhead design."
  },
  {
    id: generateId(),
    title: "Corporate Brand Identity",
    category: 'graphic',
    subCategory: 'Poster',
    image: PLACEHOLDER_Poster_2,
    description: "Complete branding package including logo, business card, and letterhead design."
  },
  {
    id: generateId(),
    title: "Corporate Brand Identity",
    category: 'graphic',
    subCategory: 'Poster',
    image: PLACEHOLDER_Poster_3,
    description: "Complete branding package including logo, business card, and letterhead design."
  },

  //Banner design Image
  {
    id: generateId(),
    title: "Corporate Brand Identity",
    category: 'graphic',
    subCategory: 'Banner',
    image: PLACEHOLDER_Banner_1,
    description: "Complete branding package including logo, business card, and letterhead design."
  },
  {
    id: generateId(),
    title: "Corporate Brand Identity",
    category: 'graphic',
    subCategory: 'Banner',
    image: PLACEHOLDER_Banner_2,
    description: "Complete branding package including logo, business card, and letterhead design."
  },
  {
    id: generateId(),
    title: "Corporate Brand Identity",
    category: 'graphic',
    subCategory: 'Banner',
    image: PLACEHOLDER_Banner_3,
    description: "Complete branding package including logo, business card, and letterhead design."
  },

  //YouTube_Thumbnail image
  {
    id: generateId(),
    title: "Corporate Brand Identity",
    category: 'graphic',
    subCategory: 'YouTube Thumbnail',
    image: PLACEHOLDER_YouTube_Thumbnail_1,
    description: "Complete branding package including logo, business card, and letterhead design."
  },
  {
    id: generateId(),
    title: "Corporate Brand Identity",
    category: 'graphic',
    subCategory: 'YouTube Thumbnail',
    image: PLACEHOLDER_YouTube_Thumbnail_2,
    description: "Complete branding package including logo, business card, and letterhead design."
  },
  {
    id: generateId(),
    title: "Corporate Brand Identity",
    category: 'graphic',
    subCategory: 'YouTube Thumbnail',
    image: PLACEHOLDER_YouTube_Thumbnail_3,
    description: "Complete branding package including logo, business card, and letterhead design."
  },

  //Facebook Post Design Image
  {
    id: generateId(),
    title: "Social Media Post Design For Warelyt",
    category: 'graphic',
    subCategory: 'Facebook Post Design',
    image: PLACEHOLDER_Facebook_Post_Design_1,
    description: "Social Media Post Design For Warelyt Social Media Post Design For Warelyt Warelyt is a cutting-edge platform designed to efficiently warehouse every AI request to a database. It allows users to query logs for analyzing usage and costs, evaluate models, and generate datasets. The platform is lightweight, easy to install (with just 2 lines of code), and emphasizes user ownership of their data.Need an original identity for your startup? Say Hello"
  },
  {
    id: generateId(),
    title: "Social Media Post Design for corporate marketing",
    category: 'graphic',
    subCategory: 'Facebook Post Design',
    image: PLACEHOLDER_Facebook_Post_Design_2,
    description: "Presenting a modern and sleek Social Media Post Design for corporate marketing and business promotions. This web banner and digital marketing template is perfect for creative agencies, businesses, and online marketing campaigns"
  },
  {
    id: generateId(),
    title: "Trendy T-Shirt Social Media Post Design",
    category: 'graphic',
    subCategory: 'Facebook Post Design',
    image: PLACEHOLDER_Facebook_Post_Design_3,
    description: "Presenting a modern and sleek Social Media Post Design for corporate marketing and business promotions. This web banner and digital marketing template is perfect for creative agencies, businesses, and online marketing campaigns"
  },

  //Ui_Ux design image
  {
    id: generateId(),
    title: "Livest - Smart Real Estate Investment Made Simple",
    category: 'web',
    subCategory: 'UI/UX',
    image: PLACEHOLDER_Ui_Ux_1,
    description: "Presenting the Livest Website UIUX Design, a modern, clean, and trust-driven platform that simplifies real estate investing for individuals looking to build long-term wealth."
  },
  {
    id: generateId(),
    title: "Food Delivery Mobile App UI/UX Design",
    category: 'web',
    subCategory: 'UI/UX',
    image: PLACEHOLDER_Ui_Ux_2,
    description: "The main page of the food delivery app displays the delivery address, product categories, restaurants, and items with the best prices. The product screen features a photo, description, and suggested add-ons. On the cart screen, users can choose delivery time, view items, and make a payment"
  },
  {
    id: generateId(),
    title: "LevelsUp - Online Course Education Mobile App UI UX Design",
    category: 'web',
    subCategory: 'UI/UX',
    image: PLACEHOLDER_Ui_Ux_3,
    description: "LevelsUp is a personalized micro-learning experience built for a generation that’s always moving but never stops growing. With bite-sized lessons, gamified streaks, and smart reminders, LevelsUp keeps you engaged, consistent, and motivated"
  },

  //Dashboard design image
  {
    id: generateId(),
    title: "Educational Dashboard Design",
    category: 'web',
    subCategory: 'Dashboard',
    image: PLACEHOLDER_Dashboard_1,
    description: "Explore our meticulously crafted Educational Dashboard design for a holistic learning experience. Monitor your engagement, achievements, statistics, daily schedule, assignments, and more in one intuitive interface."
  },
  {
    id: generateId(),
    title: "Trading Dashboard Design Assets Profile",
    category: 'web',
    subCategory: 'Dashboard',
    image: PLACEHOLDER_Dashboard_2,
    description: "TradoX is a modern crypto asset management dashboard created to help users monitor their portfolio, track live prices, and manage trades seamlessly. The design provides wallet balance, portfolio allocation, and detailed asset insights in one streamlined interface."
  },
  {
    id: generateId(),
    title: "Trading Dashboard Design Assets Profile",
    category: 'web',
    subCategory: 'Dashboard',
    image: PLACEHOLDER_Dashboard_3,
    description: "TradoX is a modern crypto asset management dashboard created to help users monitor their portfolio, track live prices, and manage trades seamlessly. The design provides wallet balance, portfolio allocation, and detailed asset insights in one streamlined interface."
  },

  //Erp design image
  {
    id: generateId(),
    title: "E-Land SaaS Landing Page",
    category: 'web',
    subCategory: 'ERP',
    image: PLACEHOLDER_Erp_1,
    description: "This project was all about crafting a sleek, modern, and intuitive experience that simplifies e-commerce store management. Our goal? To design a dashboard that’s as powerful as it is user-friendly—helping e-commerce order track, analyze, and optimize product data with ease."
  },
  {
    id: generateId(),
    title: "Wisdom - ERP Dashboard",
    category: 'web',
    subCategory: 'ERP',
    image: PLACEHOLDER_Erp_2,
    description: "Wisdom ERP streamlines intricate business operations, seamlessly integrating payroll, budgeting, logistics, and procurement into a single, intuitive platform. With a sleek interface, real-time data insights, and structured workflows, it transforms complexity into simplicity. Built for efficiency and clarity, it empowers teams to make smarter, faster decisions with confidence."
  },
  {
    id: generateId(),
    title: "Dashboard Design for an ERP Software",
    category: 'web',
    subCategory: 'ERP',
    image: PLACEHOLDER_Erp_3,
    description: "The challenge was to create something more usable, accessible & aesthetically pleasing for the users. This is what I came up with. Working on the whole project now and will be sharing more work around this project soon. "
  },

  //Ecommerce design image
  {
    id: generateId(),
    title: "Prodtech — Premium Workspace eCommerce Design",
    category: 'web',
    subCategory: 'E-commerce',
    image: PLACEHOLDER_Ecommerce_1,
    description: "Introducing Prodtech, a premium eCommerce website design crafted for modern professionals who value comfort, focus, and performance. The main objective of this project was to increase conversion by creating a seamless online experience that reflects the product’s craftsmanship and ergonomics."
  },


];
