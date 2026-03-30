"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown, ArrowUp, FileText, Medal, UsersRound, Wallet } from "lucide-react";
import React from "react";
import { getAllTreatments, getBlogDashboard, getContactDashboard, getImagesDashboard } from "../api";
import Link from "next/link";

interface CardData {
  title: string;
  value: string;
  icon: React.ElementType;
  iconBg: string;
  gradientFrom: string;
  growth: string;
  growthIcon: React.ElementType;
  growthColor: string;
  description: string;
};

const StatCard = async () => {
  const [
    treatments,
    blogs,
    contacts,
    images,
  ] = await Promise.all([
    getAllTreatments(),
    getBlogDashboard(),
    getContactDashboard(),
    getImagesDashboard(),
  ]);
  console.log( treatments,
    blogs,
    contacts,
    images);
  
const cardsDatas: CardData[] = [
  {
    title: "Total Treatments",
    value: treatments?.treatment?.length,
    icon: UsersRound,
    iconBg: "bg-cyan-600",
    gradientFrom: "from-cyan-600/10",
    growth: "/alltreatment",
    growthIcon: ArrowUp,
    growthColor: "text-green-600 dark:text-green-400",
    description: `${treatments?.treatment?.length} treatments displayed`,
  },
  {
    title: "Total Blogs",
    value: blogs?.length,
    icon: Medal,
    iconBg: "bg-purple-600",
    gradientFrom: "from-purple-600/10",
    growth: "blogs",
    growthIcon: ArrowDown,
    growthColor: "text-red-600 dark:text-red-400",
    description: `${blogs?.length} blogs displayed`,
  },
  {
    title: "Total Leads",
    value: contacts?.total,
    icon: Wallet,
    iconBg: "bg-green-600",
    gradientFrom: "from-green-600/10",
    growth: "/contactdetails",
    growthIcon: ArrowUp,
    growthColor: "text-green-600 dark:text-green-400",
    description: `${contacts?.total} leads displayed`,
  },
  {
    title: "Total Images Uploaded",
    value: images?.total,
    icon: FileText,
    iconBg: "bg-red-600",
    gradientFrom: "from-red-600/10",
    growth: "/allmedia",
    growthIcon: ArrowUp,
    growthColor: "text-green-600 dark:text-green-400",
    description: `${images?.total} images displayed`,
  },
];

  return (
    cardsDatas.map((card, index) => (
      <Link href={card.growth}>
      <Card
        key={index}
        className={`bg-gradient-to-r ${card.gradientFrom} to-white dark:to-slate-700 p-0 border border-gray-200 dark:border-neutral-700 rounded-md shadow-none`}
      >
        <CardContent className="px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300">{card.title}</p>
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mt-1">{card.value}</h3>
            </div>
            <div className={`w-12 h-12 ${card.iconBg} rounded-full flex items-center justify-center`}>
              <card.icon className="text-white" size={24} />
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm mt-4">
            {/* <span className={`flex items-center gap-1 ${card.growthColor}`}>
              <card.growthIcon fill="currentColor" stroke="none" width={14} height={14} />
              {card.growth}
            </span> */}
            <span className="text-neutral-500 dark:text-neutral-400 text-[13px]">{card.description}</span>
          </div>
        </CardContent>
      </Card>
      </Link>
    ))
  );
};

export default StatCard;
