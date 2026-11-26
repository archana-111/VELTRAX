"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ContactForm } from "@/components/forms/ContactForm";

const allowed = ["General", "Quote", "Tracking", "Careers", "Press"];

function Gate() {
  const topic = useSearchParams().get("topic") ?? "General";
  const initial = allowed.includes(topic) ? topic : "General";
  return <ContactForm initialTopic={initial} key={initial} />;
}

export function ContactFormGate() {
  return (
    <Suspense fallback={<p>Loading the demonstration form.</p>}>
      <Gate />
    </Suspense>
  );
}
