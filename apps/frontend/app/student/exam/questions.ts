export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface RoundConfig {
  title: string;
  description: string;
  timeLimit: number; // in minutes
  questions: Question[];
}

export const roundConfigs: Record<number, RoundConfig> = {
  1: {
    title: "General Knowledge",
    description: "Test your knowledge across various general topics.",
    timeLimit: 30,
    questions: [
      {
        id: 1,
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: "Paris"
      },
      {
        id: 2,
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Mars"
      },
      {
        id: 3,
        question: "What is the largest mammal on Earth?",
        options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correctAnswer: "Blue Whale"
      },
      {
        id: 4,
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correctAnswer: "Leonardo da Vinci"
      },
      {
        id: 5,
        question: "What is the chemical symbol for gold?",
        options: ["Ag", "Fe", "Au", "Cu"],
        correctAnswer: "Au"
      },
      {
        id: 6,
        question: "Which country is known as the Land of the Rising Sun?",
        options: ["China", "Korea", "Thailand", "Japan"],
        correctAnswer: "Japan"
      },
      {
        id: 7,
        question: "What is the largest organ in the human body?",
        options: ["Heart", "Brain", "Liver", "Skin"],
        correctAnswer: "Skin"
      },
      {
        id: 8,
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correctAnswer: "William Shakespeare"
      },
      {
        id: 9,
        question: "What is the square root of 144?",
        options: ["10", "12", "14", "16"],
        correctAnswer: "12"
      },
      {
        id: 10,
        question: "Which element is most abundant in Earth's atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        correctAnswer: "Nitrogen"
      }
    ]
  },
  2: {
    title: "Technical Skills",
    description: "Test your programming and technical knowledge.",
    timeLimit: 45,
    questions: [
      {
        id: 1,
        question: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "High Tech Modern Language",
          "Hyper Transfer Markup Language",
          "Home Tool Markup Language"
        ],
        correctAnswer: "Hyper Text Markup Language"
      },
      {
        id: 2,
        question: "Which of these is NOT a JavaScript data type?",
        options: ["String", "Boolean", "Integer", "Symbol"],
        correctAnswer: "Integer"
      },
      {
        id: 3,
        question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
        correctAnswer: "O(log n)"
      },
      {
        id: 4,
        question: "Which protocol is used for secure data transmission over the web?",
        options: ["HTTP", "FTP", "HTTPS", "SMTP"],
        correctAnswer: "HTTPS"
      },
      {
        id: 5,
        question: "What does CSS stand for?",
        options: [
          "Computer Style Sheets",
          "Creative Style System",
          "Cascading Style Sheets",
          "Colorful Style Sheets"
        ],
        correctAnswer: "Cascading Style Sheets"
      },
      {
        id: 6,
        question: "Which SQL command is used to update data in a database?",
        options: ["MODIFY", "SAVE", "UPDATE", "CHANGE"],
        correctAnswer: "UPDATE"
      },
      {
        id: 7,
        question: "What is the purpose of a constructor in OOP?",
        options: [
          "To destroy objects",
          "To initialize object properties",
          "To define class methods",
          "To handle exceptions"
        ],
        correctAnswer: "To initialize object properties"
      },
      {
        id: 8,
        question: "Which data structure uses LIFO?",
        options: ["Queue", "Stack", "Array", "Tree"],
        correctAnswer: "Stack"
      },
      {
        id: 9,
        question: "What is the main purpose of an API?",
        options: [
          "To create user interfaces",
          "To store data",
          "To enable communication between software applications",
          "To format text"
        ],
        correctAnswer: "To enable communication between software applications"
      },
      {
        id: 10,
        question: "Which of these is a valid way to declare a variable in JavaScript?",
        options: ["variable x;", "var x;", "v x;", "variable: x;"],
        correctAnswer: "var x;"
      }
    ]
  },
  3: {
    title: "Advanced Concepts",
    description: "Challenge yourself with advanced programming concepts and problem-solving.",
    timeLimit: 60,
    questions: [
      {
        id: 1,
        question: "What is the difference between process and thread?",
        options: [
          "Processes share memory, threads don't",
          "Threads share memory, processes don't",
          "There is no difference",
          "Threads are faster than processes"
        ],
        correctAnswer: "Threads share memory, processes don't"
      },
      {
        id: 2,
        question: "Which pattern is best for handling multiple similar events?",
        options: [
          "Factory Pattern",
          "Observer Pattern",
          "Singleton Pattern",
          "Builder Pattern"
        ],
        correctAnswer: "Observer Pattern"
      },
      {
        id: 3,
        question: "What is the purpose of virtual memory?",
        options: [
          "To increase RAM speed",
          "To extend physical memory using disk space",
          "To compress memory",
          "To encrypt memory"
        ],
        correctAnswer: "To extend physical memory using disk space"
      },
      {
        id: 4,
        question: "Which sorting algorithm has the best average case performance?",
        options: [
          "Bubble Sort",
          "Quick Sort",
          "Selection Sort",
          "Insertion Sort"
        ],
        correctAnswer: "Quick Sort"
      },
      {
        id: 5,
        question: "What is the main advantage of using microservices architecture?",
        options: [
          "Easier deployment",
          "Better scalability and flexibility",
          "Lower cost",
          "Simpler development"
        ],
        correctAnswer: "Better scalability and flexibility"
      },
      {
        id: 6,
        question: "What is a closure in programming?",
        options: [
          "A way to close applications",
          "A function that has access to variables in its outer scope",
          "A method to close database connections",
          "A type of loop"
        ],
        correctAnswer: "A function that has access to variables in its outer scope"
      },
      {
        id: 7,
        question: "What is the CAP theorem in distributed systems?",
        options: [
          "Consistency, Availability, Partition tolerance",
          "Capacity, Automation, Performance",
          "Control, Access, Protection",
          "Cache, API, Protocol"
        ],
        correctAnswer: "Consistency, Availability, Partition tolerance"
      },
      {
        id: 8,
        question: "Which protocol is used in blockchain for consensus?",
        options: [
          "HTTP",
          "TCP/IP",
          "Proof of Work",
          "REST"
        ],
        correctAnswer: "Proof of Work"
      },
      {
        id: 9,
        question: "What is the purpose of dependency injection?",
        options: [
          "To increase application speed",
          "To reduce code coupling",
          "To compress code",
          "To encrypt data"
        ],
        correctAnswer: "To reduce code coupling"
      },
      {
        id: 10,
        question: "What is the difference between REST and GraphQL?",
        options: [
          "REST is newer than GraphQL",
          "GraphQL allows clients to request specific data",
          "REST is more secure",
          "GraphQL is only for databases"
        ],
        correctAnswer: "GraphQL allows clients to request specific data"
      }
    ]
  }
};