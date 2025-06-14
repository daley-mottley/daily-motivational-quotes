
export interface Quote {
  id: string;
  text: string;
  author: string;
  category: string;
  backgroundGradient: string;
}

export const motivationalQuotes: Quote[] = [
  {
    id: "1",
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "success",
    backgroundGradient: "from-orange-400 via-pink-500 to-purple-600"
  },
  {
    id: "2", 
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
    category: "leadership",
    backgroundGradient: "from-blue-400 via-cyan-500 to-teal-600"
  },
  {
    id: "3",
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    category: "dreams",
    backgroundGradient: "from-purple-400 via-pink-500 to-red-500"
  },
  {
    id: "4",
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
    category: "resilience", 
    backgroundGradient: "from-green-400 via-emerald-500 to-teal-600"
  },
  {
    id: "5",
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    category: "courage",
    backgroundGradient: "from-indigo-400 via-purple-500 to-pink-500"
  },
  {
    id: "6",
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins",
    category: "motivation",
    backgroundGradient: "from-yellow-400 via-orange-500 to-red-500"
  },
  {
    id: "7",
    text: "Life is what happens to you while you're busy making other plans.",
    author: "John Lennon",
    category: "life",
    backgroundGradient: "from-cyan-400 via-blue-500 to-purple-600"
  },
  {
    id: "8",
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
    category: "action",
    backgroundGradient: "from-pink-400 via-rose-500 to-red-600"
  }
];

export const categories = [
  { id: "all", name: "All Quotes", icon: "list" },
  { id: "success", name: "Success", icon: "check" },
  { id: "leadership", name: "Leadership", icon: "book" },
  { id: "dreams", name: "Dreams", icon: "book-open" },
  { id: "resilience", name: "Resilience", icon: "plus" },
  { id: "courage", name: "Courage", icon: "pen" },
  { id: "motivation", name: "Motivation", icon: "arrow-up" },
  { id: "life", name: "Life", icon: "clock" },
  { id: "action", name: "Action", icon: "arrow-down" }
] as const;
