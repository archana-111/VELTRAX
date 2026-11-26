import type { Metadata } from "next";
import { BlackFridayPage } from "@/components/campaigns/BlackFridayPage";

export const metadata: Metadata = {
  title: {
    absolute: "Black Friday Offers — SupportPRO",
  },
  description:
    "SupportPRO Black Friday offers for server management, cloud, helpdesk, prepaid technician hours, and managed AWS.",
  robots: { index: false, follow: false },
};

export default function BlackFridayRoute() {
  return <BlackFridayPage />;
}
