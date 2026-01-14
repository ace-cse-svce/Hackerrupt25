"use client";
import { useEffect, useRef, useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { supabase } from "@/lib/supabaseClient"
import MainShell from "@/components/layout/MainShell";

export default function FAQPage() {
  return (
    <MainShell enableScrollNav={false}>
      <section className=" pb-20">
        <FAQSection />
      </section>
    </MainShell>
  );
}


const FAQSection = () => {
  const faqs = [
    {
      question: "What is Hackerrupt '26?",
      answer:
        "Hackerrupt '26 is a premier hackathon event where developers, designers, and innovators come together to build amazing solutions in 24 hours. It's a platform to showcase your skills, learn new technologies, and network with like-minded individuals.",
    },
    {
      question: "Who can participate in  Hackerrupt '26?",
      answer:
        "Hackerrupt '26 is open to all students, professionals, and tech enthusiasts. Whether you're a beginner or an expert, everyone is welcome to participate and contribute their unique skills to create innovative solutions.",
    },
    {
      question: "How many members can be in a team?",
      answer:
        "Teams can have a minimum of 3 members and a maximum of 4 members. You can form teams with your friends or join other participants during the team formation session at the event.",
    },
    {
      question: "What is the format of  Hackerrupt '26?",
      answer:
        "Hackerrupt '26 is a 24-hour hackathon where teams work on building solutions for various problem statements. The event includes mentorship sessions, workshops, networking opportunities, and ends with project presentations and awards.",
    },
    {
      question: "What are the prizes for the winners?",
      answer:
        "Winners will receive exciting prizes including cash rewards, certificates, internship opportunities, and exclusive swag. Special recognition will be given to the most innovative solutions and best use of specific technologies.",
    },
    {
      question: "What do I need to bring to the hackathon?",
      answer:
        "Bring your laptop, chargers, any hardware you might need, and your enthusiasm! We'll provide food, drinks, internet, and a great venue. Don't forget to bring a valid ID for registration.",
    },
    {
      question: "What is the prize pool?",
      answer:
        "Hackerrupt '26 offers a grand prize pool worth over ₹50,000, along with exclusive goodies, internship opportunities, and certificates for top-performing teams.",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="font-pixel text-3xl md:text-5xl mb-12 text-center text-green-400 ">FAQ</h2>

        <div className="bg-black/40 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-gray-700 rounded-lg px-6 hover:border-green-400 transition-colors duration-300"
              >
                <AccordionTrigger className="text-left text-base md:text-lg font-medium text-white hover:text-green-300 py-4 no-underline hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 pb-4 leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}
