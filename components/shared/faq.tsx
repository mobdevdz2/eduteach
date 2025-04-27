import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqItems = [
  {
    question: "What is EduTeach?",
    answer:
      "EduTeach is an all-in-one platform for educators to create, manage, and deliver engaging learning experiences. It includes tools for lesson creation, classroom management, student assessment, and more.",
  },
  {
    question: "How much does EduTeach cost?",
    answer:
      "EduTeach offers a free plan for individual teachers with up to 30 students. Our Pro plan starts at $12 per month and includes advanced features. For schools and institutions, we offer custom pricing based on your specific needs.",
  },
  {
    question: "Do I need technical skills to use EduTeach?",
    answer:
      "Not at all! EduTeach is designed to be user-friendly and intuitive, even for educators with minimal technical experience. Our platform includes drag-and-drop interfaces, templates, and comprehensive tutorials to help you get started.",
  },
  {
    question: "Can I import my existing teaching materials?",
    answer:
      "Yes, EduTeach supports importing content from various formats including PDFs, Word documents, PowerPoint presentations, and Google Classroom. You can easily convert your existing materials into interactive lessons.",
  },
  {
    question: "Is EduTeach suitable for all grade levels?",
    answer:
      "EduTeach is designed to be flexible and adaptable for all educational levels, from elementary school to higher education. The platform includes age-appropriate templates and features for different grade levels.",
  },
  {
    question: "How secure is student data on EduTeach?",
    answer:
      "We take data security very seriously. EduTeach is FERPA compliant and employs industry-standard encryption and security measures to protect all user data. We never share or sell student information to third parties.",
  },
]

export function FAQ() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto mt-8">
      {faqItems.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
