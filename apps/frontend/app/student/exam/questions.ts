export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface RoundConfig {
  title: string;
  description: string;
  timeLimit: number; 
  questions: Question[];
}

export const roundConfigs: Record<number, RoundConfig> = {
  1: {
    title: "Aptitude",
    description: "Test your general knowledge across various topics.",
    timeLimit: 45,
    questions: [
      {
        id: 1,
        question: "Ramesh invested ₹12,000 in a fund. At the end of the first year, he incurred a loss, but his balance was more than ₹6,000. This balance, when invested for another year, grew, and the percentage of growth in the second year was four times the percentage of loss in the first year. If the total gain of Ramesh from the initial investment over the two-year period is 40%, what was the percentage of loss in the first year?",
        options: ["8%", "12%", "10%", "15%"],
        correctAnswer: "10%"
      },
      {
        id: 2,
        question: "The number of ways of distributing 15 identical balloons, 6 identical pencils and 3 identical erasers among 3 children, such that each child gets at least four balloons and one pencil, is:",
        options: ["1000", "2600", "1500", "1368"],
        correctAnswer: "1000"
      },
      {
        id: 3,
        question: "Amit, Bhavesh, and Chirag jointly invest in a business and agree to share the overall profit in proportion to their investments. Amit’s share of investment is 60%. His share of profit decreases by ₹500 if the overall profit goes down from 20% to 17%. Chirag’s share of profit increases by ₹100 if the overall profit goes up from 17% to 19%. The amount, in INR, invested by Bhavesh is:",
        options: ["5111", "6111", "4500", "2111"],
        correctAnswer: "6111"
      },
      {
        id: 4,
        question: "From a container filled with milk, 8 liters of milk are drawn and replaced with water. Then, 8 liters are drawn again and replaced with water. If the volumes of milk and water in the container are now in the ratio 9:7, what is the capacity of the container, in liters?",
        options: ["32 liters", "36 liters", "48 liters", "54 liters"],
        correctAnswer: "32 liters"
      },
      {
        id: 5,
        question: "Two pipes, P and Q, are connected to an empty water tank. Pipe P fills the tank, while pipe Q drains it. If P is opened at 1 pm and Q is opened at 2 pm, the tank becomes full at 9 pm. However, if P is opened at 1 pm and Q is opened at 3 pm, the tank becomes full at 7 pm. If Q is not opened at all, how much time (in minutes) will it take to fill the tank?",
        options: ["210", "180", "150", "200"],
        correctAnswer: "200"
      },
      {
        id: 6,
        question: "Two trains, X and Y, are moving in opposite directions. Their speeds are in the ratio 4:3. The front end of train X crosses the rear end of train Y 50 seconds after the front ends of the trains have crossed each other. It takes another 75 seconds for the rear ends of the trains to cross each other. What is the ratio of the length of train X to that of train Y?",
        options: ["4:3", "2:3", "5:3", "3:2"],
        correctAnswer: "3:2"
      },
      {
        id: 7,
        question: "Arjun can paint a house in 50 days, while Bharat can paint it in 70 days. Arjun starts painting, and after 8 days, Bharat and Chitra join him. Together, they finish the painting in 12 more days. If they are paid a total of ₹18,000 for the job, what is Chitra’s share of the payment, in INR, proportionate to the work done by her?",
        options: ["₹7800", "₹7900", "₹7600", "₹7700"],
        correctAnswer: "₹7700"
      },
      {
        id: 8,
        question: "In a football tournament, a player has played a certain number of matches, and 15 more matches are to be played. If he scores one goal over these 15 matches, his overall average will be 0.18 goals per match. However, if he scores two goals, his overall average will be 0.22 goals per match. How many matches has he already played?",
        options: ["25", "15", "20", "10"],
        correctAnswer: "10"
      },
      {
        id: 9,
        question: "In a triangle △XYZ, points M and N lie on sides XY and XZ, respectively, such that XM:MY=3:2 and XN:NZ=2:3. If the area of △XMN is 10 sq cm, what is the area of △XYZ?",
        options: ["29 sq cm", "27 sq cm", "26 sq cm", "25 sq cm"],
        correctAnswer: "27 sq cm"
      },
      {
        id: 10,
        question: "A shopkeeper buys three types of rice at ₹850, ₹600, and ₹450 per kg, in the ratio 4:3:5, respectively. She mixes all the rice and sells one-fourth of the mixture at ₹750 per kg. To achieve an overall profit of 30%, what should be the selling price (in ₹ per kg) of the remaining mixture?",
        options: ["₹826", "₹626", "₹976", "₹858"],
        correctAnswer: "₹826"
      },
      {
        id: 11,
        question: "A man can row 1 km against the current in 15 minutes and with the current in 9 minutes. What is the speed of the man in still water (in km/hr)?",
        options: ["2 km/hr", "3.66 km/hr", "4.33 km/hr", "5.33 km/hr"],
        correctAnswer: "5.33 km/hr"
      },
      {
        id: 12,
        question: "A father is three times as old as his son Rahul. After 6 years, he will be two and a half times Rahul's age. After a further 6 years, how many times will he be Rahul’s age?",
        options: ["2 times", "2 and 1/5 times", "3 times", "2 and 2/3 times"],
        correctAnswer: "2 and 1/5 times"
      },
      {
        id: 13,
        question: "What was the day of the week on 28th May 2020?",
        options: ["Thursday", "Friday", "Saturday", "Sunday"],
        correctAnswer: "Thursday"
      },
      {
        id: 14,
        question: "If ₹15 is allowed as a true discount on a bill of ₹150 due at the end of a certain period, what will be the discount on the same sum if the time is doubled?",
        options: ["₹25", "₹26.18", "₹27", "₹22.50"],
        correctAnswer: "₹27"
      },
      {
        id: 15,
        question: "From a point P on level ground, the angle of elevation of the top of a tower is 45°. If the height of the tower is 120m, find the distance of point P from the foot of the tower.",
        options: ["84.85 m", "90.10 m", "120.00 m", "127.30 m"],
        correctAnswer: "120.00 m"
      },
      {
        id: 16,
        question: "Out of 9 consonants and 5 vowels, how many distinct words of 4 consonants and 3 vowels can be formed if repetition of letters is not allowed?",
        options: ["5040", "1260", "5040 x 1260", "126000"],
        correctAnswer: "5040 x 1260"
      },
      {
        id: 17,
        question: "The reflex angle between the hands of a clock at 7:36 is:",
        options: ["6°", "12°", "354°", "348°"],
        correctAnswer: "348°"
      },
      {
        id: 18,
        question: "Alfred buys an old scooter for Rs. 4700 and spends Rs. 800 on its repairs. If he sells the scooter for Rs. 5800, his gain percent is:",
        options: ["4 4/7%", "5 5/11%", "10%", "12%"],
        correctAnswer: "5 5/11%"
      },
      {
        id: 19,
        question: "A hollow iron pipe is 21 cm long and its external diameter is 8 cm. If the thickness of the pipe is 1 cm and iron weighs 8 g/cm³, then the weight of the pipe is:",
        options: ["3.6 kg", "3.696 kg", "36 kg", "36.9 kg"],
        correctAnswer: "3.696 kg"
      },
      {
        id: 20,
        question: "What will be the compound interest on a sum of Rs. 25,000 after 3 years at the rate of 12 p.c.p.a.?",
        options: ["₹9000.30", "₹9720", "₹10123.20", "₹10483.20"],
        correctAnswer: "₹10123.20"
      },
      {
        id: 21,
        question: "If the number 5893467x3 is divisible by 8, then what is the value of x?",
        options: ["8", "9", "1", "Cannot be determined"],
        correctAnswer: "Cannot be determined"
      },
      {
        id: 22,
        question: "At a game of billiards, A can give B 15 points in 60 and A can give C 20 points in 60. How many points can B give C in a game of 90?",
        options: ["30 points", "20 points", "10 points", "12 points"],
        correctAnswer: "10 points"
      },
      {
        id: 23,
        question: "In a lottery, there are 10 prizes and 25 blanks. A lottery is drawn at random. What is the probability of getting a prize?",
        options: ["1/10", "2/5", "2/7", "5/7"],
        correctAnswer: "2/7"
      },
      {
        id: 24,
        question: "If log 2 = 0.3010 and log 3 = 0.4771, the value of log5 512 is:",
        options: ["2.870", "2.967", "3.876", "3.912"],
        correctAnswer: "3.876"
      },
      {
        id: 25,
        question: "Two trains, one from Howrah to Patna and the other from Patna to Howrah, start simultaneously. After they meet, the trains reach their destinations after 9 hours and 16 hours respectively. The ratio of their speeds is:",
        options: ["2:3", "4:3", "6:7", "9:16"],
        correctAnswer: "4:3"
      },
      {
        id: 26,
        question: "A tap can fill a tank in 6 hours. After half the tank is filled, three more similar taps are opened. What is the total time taken to fill the tank completely?",
        options: ["3 hrs 15 min", "3 hrs 45 min", "4 hrs", "4 hrs 15 min"],
        correctAnswer: "3 hrs 45 min"
      },
      {
        id: 27,
        question: "The ratio between the length and the breadth of a rectangular park is 3:2. If a man cycling along the boundary of the park at the speed of 12 km/hr completes one round in 8 minutes, then the area of the park (in sq. m) is:",
        options: ["15360", "153600", "30720", "307200"],
        correctAnswer: "153600"
      },
      {
        id: 28,
        question: "Given that 10^0.48 = x, 10^0.70 = y and x^z = y^2, then the value of z is close to:",
        options: ["1.45", "1.88", "2.9", "3.7"],
        correctAnswer: "2.9"
      },
      {
        id: 29,
        question: "If A = x% of y and B = y% of x, then which of the following is true?",
        options: ["A is smaller than B", "A is greater than B", "Relationship between A and B cannot be determined", "None of these"],
        correctAnswer: "None of these"
      },
      {
        id: 30,
        question: "If a legislature decides to fund agricultural subsidy programs, national radio, and a small business loan program, what 2 other programs can they fund?",
        options: ["harbor improvements and school music program", "harbor improvements and international airport", "hurricane preparedness and international airport", "hurricane preparedness and school music program"],
        correctAnswer: "harbor improvements and international airport"
      },
      {
        id: 31,
        question: "Which word does NOT belong with the others?",
        options: ["wing", "fin", "beak", "rudder"],
        correctAnswer: "beak"
      },
      {
        id: 32,
        question: "Paw : Cat :: Hoof : ?",
        options: ["Lamb", "Horse", "Elephant", "Tiger"],
        correctAnswer: "Horse"
      },
      {
        id: 33,
        question: "Look at this series: F2, __, D8, C16, B32, ... What number should fill the blank?",
        options: ["A16", "G4", "E4", "E3"],
        correctAnswer: "E4"
      },
      {
        id: 34,
        question: "If A + B means A is the mother of B; A - B means A is the brother B; A % B means A is the father of B and A x B means A is the sister of B, which of the following shows that P is the maternal uncle of Q?",
        options: ["Q - N + M x P", "P + S x N - Q", "P - M + N x Q", "Q - S % P"],
        correctAnswer: "P - M + N x Q"
      },
      {
        id: 35,
        question: "Eileen is planning a special birthday dinner for her husband's 35th birthday. She wants the evening to be memorable, but her husband is a simple man who would rather be in jeans at a baseball game than in a suit at a fancy restaurant. Which restaurant below should Eileen choose?",
        options: ["Alfredo's offers fine Italian cuisine and an elegant Tuscan decor.", "Pancho's Mexican Buffet is an all-you-can-eat family style smorgasbord with the best tacos in town.", "The Parisian Bistro is a four-star French restaurant where guests are treated like royalty.", "Marty's serves delicious, hearty meals in a charming setting reminiscent of a baseball clubhouse in honor of the owner, Marty Lester, a former major league baseball all-star."],
        correctAnswer: "Marty's serves delicious, hearty meals in a charming setting reminiscent of a baseball clubhouse in honor of the owner, Marty Lester, a former major league baseball all-star."
    }
    ]
  },
  2: {
    title: "Data Structure and Algorithm",
    description: "Test your programming and technical knowledge.",
    timeLimit: 30,
    questions: [ {
      "id": 1,
      "question": "What is the worst-case time complexity of Quicksort?",
      "options": ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
      "correctAnswer": "O(n²)"
    },
    {
      "id": 2,
      "question": "Which data structure is used for implementing recursion?",
      "options": ["Stack", "Queue", "Array", "Linked List"],
      "correctAnswer": "Stack"
    },
    {
      "id": 3,
      "question": "Which traversal algorithm is used to print a tree in sorted order?",
      "options": ["Preorder", "Postorder", "Inorder", "Level-order"],
      "correctAnswer": "Inorder"
    },
    {
      "id": 4,
      "question": "Which of these sorting algorithms is not stable?",
      "options": ["Merge Sort", "Bubble Sort", "Quick Sort", "Insertion Sort"],
      "correctAnswer": "Quick Sort"
    },
    {
      "id": 5,
      "question": "What is the time complexity of searching for an element in a balanced binary search tree (BST)?",
      "options": ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
      "correctAnswer": "O(log n)"
    },
    {
      "id": 6,
      "question": "What is the space complexity of an adjacency matrix for a graph with n vertices?",
      "options": ["O(n)", "O(n²)", "O(n + e)", "O(e)"],
      "correctAnswer": "O(n²)"
    },
    {
      "id": 7,
      "question": "Which of the following is an application of a queue?",
      "options": ["Function call stack", "Job scheduling", "Binary tree traversal", "Depth-first search"],
      "correctAnswer": "Job scheduling"
    },
    {
      "id": 8,
      "question": "Which algorithm is used to find the shortest path in a graph?",
      "options": ["Kruskal’s Algorithm", "Dijkstra’s Algorithm", "Floyd-Warshall Algorithm", "DFS"],
      "correctAnswer": "Dijkstra’s Algorithm"
    },
    {
      "id": 9,
      "question": "What does the function strstr() in C/C++ do?",
      "options": ["Finds the length of a string", "Copies one string to another", "Searches for a substring", "Compares two strings"],
      "correctAnswer": "Searches for a substring"
    },
    {
      "id": 10,
      "question": "How many edges are there in a complete graph with n vertices?",
      "options": ["n²", "n(n - 1)/2", "n(n + 1)", "n - 1"],
      "correctAnswer": "n(n - 1)/2"
    },
    {
      "id": 11,
      "question": "Which traversal order of a tree produces a prefix expression?",
      "options": ["Inorder", "Postorder", "Preorder", "Level-order"],
      "correctAnswer": "Preorder"
    },
    {
      "id": 12,
      "question": "Which hash collision resolution technique uses linked lists?",
      "options": ["Linear Probing", "Quadratic Probing", "Chaining", "Double Hashing"],
      "correctAnswer": "Chaining"
    },
    {
      "id": 13,
      "question": "Which data structure is used to implement a stack?",
      "options": ["Array", "Linked List", "Both (a) and (b)", "Queue"],
      "correctAnswer": "Both (a) and (b)"
    },
    {
      "id": 14,
      "question": "Which data structure is used to implement a priority queue?",
      "options": ["Stack", "Heap", "Linked List", "Graph"],
      "correctAnswer": "Heap"
    },
 
    {
      "id": 15,
      "question": "What is the best-case time complexity of Quick Sort?",
      "options": ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
      "correctAnswer": "O(n log n)"
    },
    {
      "id": 16,
      "question": "Which data structure is the most suitable for implementing a circular buffer?",
      "options": ["Stack", "Queue", "Deque", "Circular Array"],
      "correctAnswer": "Circular Array"
    },
    {
      "id": 17,
      "question": "In a min-heap, the parent node is always:",
      "options": ["Greater than its children", "Less than its children", "Equal to its children", "None of the above"],
      "correctAnswer": "Less than its children"
    },
    {
      "id": 18,
      "question": "What is the amortized time complexity of operations in a dynamic array?",
      "options": ["O(1)", "O(n)", "O(log n)", "O(n²)"],
      "correctAnswer": "O(1)"
    },
    {
      "id": 19,
      "question": "What is the space complexity of a depth-first search (DFS) traversal in a graph?",
      "options": ["O(V + E)", "O(V)", "O(E)", "O(V²)"],
      "correctAnswer": "O(V + E)"
    },
    {
      "id": 20,
      "question": "How many nodes in a binary tree have no ancestors?",
      "options": ["0", "1", "2", "Depends on the tree"],
      "correctAnswer": "1"
    },
    {
      "id": 21,
      "question": "What is the key idea behind the 'Sliding Window' technique?",
      "options": ["Divide and conquer", "Recursive backtracking", "Iterative expansion and contraction of a subarray", "Dynamic programming"],
      "correctAnswer": "Iterative expansion and contraction of a subarray"
    },
    {
      "id": 22,
      "question": "What is the time complexity of the Floyd-Warshall algorithm for finding all-pairs shortest paths?",
      "options": ["O(V + E)", "O(V³)", "O(E log V)", "O(V²)"],
      "correctAnswer": "O(V³)"
    },
    {
      "id": 23,
      "question": "How many minimum spanning trees can a graph with n vertices and m edges have?",
      "options": ["Always 1", "Depends on the graph", "m^n", "(n - 1)!"],
      "correctAnswer": "Depends on the graph"
    },
    {
      "id": 24,
      "question": "Which data structure is best suited for LRU caching?",
      "options": ["Stack", "Queue", "Doubly Linked List with HashMap", "Binary Heap"],
      "correctAnswer": "Doubly Linked List with HashMap"
    },
    {
      "id": 25,
      "question": "Which algorithm is used to find strongly connected components in a graph?",
      "options": ["Kruskal’s Algorithm", "Floyd-Warshall Algorithm", "Tarjan’s Algorithm", "Dijkstra’s Algorithm"],
      "correctAnswer": "Tarjan’s Algorithm"
    },
 
    {
      "id": 26,
      "question": "Which of these is the fastest sorting algorithm in practice for large datasets?",
      "options": ["Bubble Sort", "Insertion Sort", "Merge Sort", "Quick Sort"],
      "correctAnswer": "Quick Sort"
    },
    {
      "id": 27,
      "question": "What is the space complexity of merge sort?",
      "options": ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
      "correctAnswer": "O(n)"
    },
    {
      "id": 28,
      "question": "Which of these algorithms is used for finding a minimum spanning tree?",
      "options": ["Kruskal's Algorithm", "Dijkstra's Algorithm", "Prim's Algorithm", "All of the above"],
      "correctAnswer": "All of the above"
    },
    {
      "id": 29,
      "question": "Which data structure is used in the implementation of a breadth-first search?",
      "options": ["Stack", "Queue", "Heap", "Array"],
      "correctAnswer": "Queue"
    },
    {
      "id": 30,
      "question": "Which of the following problems can be solved using dynamic programming?",
      "options": ["Fibonacci sequence", "Knapsack problem", "Longest Common Subsequence", "All of the above"],
      "correctAnswer": "All of the above"
    },
    {
      "id": 31,
      "question": "Which of the following sorting algorithms is not comparison-based?",
      "options": ["Bubble Sort", "Merge Sort", "Quick Sort", "Counting Sort"],
      "correctAnswer": "Counting Sort"
    },
    {
      "id": 32,
      "question": "Which is the correct order of complexities for the following searching algorithms: Linear Search, Binary Search, Hashing?",
      "options": ["O(n), O(log n), O(1)", "O(log n), O(n), O(1)", "O(n), O(1), O(log n)", "O(1), O(n), O(log n)"],
      "correctAnswer": "O(n), O(log n), O(1)"
    },
    {
      "id": 33,
      "question": "Which of these data structures is used to implement the disjoint set data structure?",
      "options": ["Array", "Stack", "Queue", "Tree"],
      "correctAnswer": "Tree"
    },
    {
      "id": 34,
      "question": "What is the primary disadvantage of the adjacency matrix for representing a graph?",
      "options": ["It takes up too much memory", "It does not allow quick access to neighbors", "It is slower for operations like BFS", "None of the above"],
      "correctAnswer": "It takes up too much memory"
    },
    {
      "id": 35,
      "question": "Which algorithm is used for finding the shortest path in a graph when negative weight edges are present?",
      "options": ["Kruskal's Algorithm", "Dijkstra's Algorithm", "Bellman-Ford Algorithm", "Floyd-Warshall Algorithm"],
      "correctAnswer": "Bellman-Ford Algorithm"
    },
    {
      "id": 36,
      "question": "What is the time complexity of the binary search algorithm?",
      "options": ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
      "correctAnswer": "O(log n)"
    },
    {
      "id": 37,
      "question": "Which of the following algorithms is used to find the connected components in an undirected graph?",
      "options": ["Kruskal's Algorithm", "DFS", "Dijkstra's Algorithm", "Bellman-Ford Algorithm"],
      "correctAnswer": "DFS"
    },
    {
      "id": 38,
      "question": "What is the best use case for a hash table?",
      "options": ["Searching for elements in a sorted array", "Fast lookup and insertion of elements", "Maintaining elements in sorted order", "Searching for elements in a tree"],
      "correctAnswer": "Fast lookup and insertion of elements"
    },
    {
      "id": 39,
      "question": "What does the 'Union-Find' data structure support?",
      "options": ["Quick lookup of connected components", "Efficiently finding the shortest path", "Both (a) and (b)", "None of the above"],
      "correctAnswer": "Quick lookup of connected components"
    },
    {
      "id": 40,
      "question": "What is the time complexity of the Floyd-Warshall algorithm?",
      "options": ["O(V + E)", "O(V³)", "O(E log V)", "O(V²)"],
      "correctAnswer": "O(V³)"
    },
    {
      "id": 41,
      "question": "Which sorting algorithm has the worst-case time complexity of O(n log n)?",
      "options": ["Quick Sort", "Merge Sort", "Bubble Sort", "Selection Sort"],
      "correctAnswer": "Merge Sort"
    },
    {
      "id": 42,
      "question": "Which data structure is the most efficient for checking whether an element is a member of a set?",
      "options": ["Array", "Linked List", "Hash Set", "Stack"],
      "correctAnswer": "Hash Set"
    },
    {
      "id": 43,
      "question": "What is the worst-case time complexity of insertion sort?",
      "options": ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
      "correctAnswer": "O(n²)"
    },
    {
      "id": 44,
      "question": "What is the time complexity of finding the maximum element in an unsorted array?",
      "options": ["O(log n)", "O(n)", "O(n log n)", "O(1)"],
      "correctAnswer": "O(n)"
    },
    {
      "id": 45,
      "question": "What is the average time complexity of quicksort?",
      "options": ["O(n log n)", "O(n²)", "O(log n)", "O(n)"],
      "correctAnswer": "O(n log n)"
    }]
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