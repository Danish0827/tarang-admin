import {
  BookCheck,
  Boxes,
  CalendarDays,
  ChartPie,
  Component,
  House,
  Mail,
  MessageCircleMore,
  Server,
  Settings,
  ShieldCheck,
  StickyNote,
  Upload,
  UsersRound,
} from "lucide-react";

export const data = {
  navMain: [
    // {
    //   title: "Dashboard",
    //   url: "/dashboard",
    //   icon: House,
    //   // items: [
    //   //   {
    //   //     title: "All",
    //   //     url: "/dashboard",
    //   //     circleColor: "bg-primary",
    //   //   },       
    //   //   {
    //   //     title: "CRM",
    //   //     url: "/crm",
    //   //     circleColor: "bg-yellow-500",
    //   //   },
    //   //   {
    //   //     title: "eCommerce",
    //   //     url: "/ecommerce",
    //   //     circleColor: "bg-cyan-500",
    //   //   },
    //   //   {
    //   //     title: "Cryptocurrency",
    //   //     url: "/cryptocurrency",
    //   //     circleColor: "bg-red-500",
    //   //   },
    //   //   {
    //   //     title: "Investment",
    //   //     url: "/investment",
    //   //     circleColor: "bg-green-600",
    //   //   },
    //   //   {
    //   //     title: "LMS / Learning System",
    //   //     url: "/lms",
    //   //     circleColor: "bg-violet-600",
    //   //   },
    //   //   {
    //   //     title: "NFT & Gaming",
    //   //     url: "/nft",
    //   //     circleColor: "bg-primary",
    //   //   },
    //   //   {
    //   //     title: "Medical",
    //   //     url: "/medical",
    //   //     circleColor: "bg-red-600",
    //   //   },
    //   //   {
    //   //     title: "Analytics",
    //   //     url: "/analytics",
    //   //     circleColor: "bg-violet-600",
    //   //   },
    //   //   {
    //   //     title: "POS & Inventory",
    //   //     url: "/inventory",
    //   //     circleColor: "bg-yellow-500",
    //   //   },
    //   //   {
    //   //     title: "Finance & Banking",
    //   //     url: "/finance",
    //   //     circleColor: "bg-green-500",
    //   //   },
    //   //   {
    //   //     title: "Booking System",
    //   //     url: "/booking",
    //   //     circleColor: "bg-red-500",
    //   //   },
    //   //   {
    //   //     title: "Help Desk",
    //   //     url: "/help",
    //   //     circleColor: "bg-blue-500",
    //   //   },
    //   //   {
    //   //     title: "Podcast",
    //   //     url: "/podcast",
    //   //     circleColor: "bg-yellow-500",
    //   //   },
    //   //   {
    //   //     title: "Project Management",
    //   //     url: "/project-management",
    //   //     circleColor: "bg-blue-500",
    //   //   },
    //   //   {
    //   //     title: "Call Center",
    //   //     url: "/call-center",
    //   //     circleColor: "bg-red-500",
    //   //   },
    //   //   {
    //   //     title: "Sass",
    //   //     url: "/sass",
    //   //     circleColor: "bg-cyan-500",
    //   //   },
    //   //   {
    //   //     title: "Sales",
    //   //     url: "/sales",
    //   //     circleColor: "bg-yellow-500",
    //   //   },
    //   // ],
    // },
    {
      title: "Media",
      url: "#",
      icon: Upload,
      isActive: true,
      items: [
        {
          title: "Media",
          url: "/allmedia",
          circleColor: "bg-violet-500",
        },
        {
          title: "Upload",
          url: "/upload",
          circleColor: "bg-yellow-500",
        }
      ]
    },
     {
      title: "Treatments",
      url: "#",
      icon: ShieldCheck,
      isActive: true,
      items: [
        // {
        //   title: "Category",
        //   url: "/blogcategory",
        //   circleColor: "bg-yellow-500",
        // },
        {
          title: "All Treatments",
          url: "/alltreatment",
          circleColor: "bg-violet-500",
        },
        {
          title: "Treatments Post",
          url: "/addtreatment",
          circleColor: "bg-yellow-500",
        }
      ]
    },
    {
      title: "Blogs",
      url: "#",
      icon: Component,
      isActive: true,
      items: [
        {
          title: "Category",
          url: "/blogcategory",
          circleColor: "bg-primary",
        },
        {
          title: "All Blogs",
          url: "/blogs",
          circleColor: "bg-violet-500",
        },
        {
          title: "Blog Post",
          url: "/blogpost",
          circleColor: "bg-yellow-500",
        }
      ]
    },
    {
      title: "Contact Details",
      url: "#",
      icon: UsersRound,
      isActive: true,
      items: [
        {
          title: "Contact Form",
          url: "/contactdetails",
          circleColor: "bg-primary",
        },

      ],
    },
     {
      title: "Booking Details",
      url: "#",
      icon: BookCheck,
      isActive: true,
      items: [
        {
          title: "Availability",
          url: "/availability",
          circleColor: "bg-yellow-500",
        },
        {
          title: "Latest Bookings",
          url: "/booking",
          circleColor: "bg-green-600",
        },
        {
          title: "Booking History",
          url: "/history",
          circleColor: "bg-red-600",
        },        
      ],
    },
   


    // {
    //   label: "Pages",
    // },
    // {
    //   title: "Authentication",
    //   url: "#",
    //   icon: ShieldCheck,
    //   isActive: true,
    //   items: [
    //     {
    //       title: "Sign In",
    //       url: "/auth/login",
    //       circleColor: "bg-primary",
    //     },
    //     {
    //       title: "Sign Up",
    //       url: "/auth/register",
    //       circleColor: "bg-yellow-500",
    //     },
    //     {
    //       title: "Forgot Password",
    //       url: "/auth/forgot-password",
    //       circleColor: "bg-cyan-500",
    //     },
    //   ],
    // },
    // {
    //   title: "Users",
    //   url: "#",
    //   icon: UsersRound,
    //   isActive: true,
    //   items: [
    //     {
    //       title: "Users List",
    //       url: "/users-list",
    //       circleColor: "bg-primary",
    //     },
    //     {
    //       title: "Users Grid",
    //       url: "/users-grid",
    //       circleColor: "bg-yellow-500",
    //     },
    //     {
    //       title: "View Profile",
    //       url: "/view-profile",
    //       circleColor: "bg-red-600",
    //     },
    //   ],
    // },
  ],
};
