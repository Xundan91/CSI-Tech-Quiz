export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  image?: string; // Optional image URL

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
    timeLimit: 31,
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
    title: "Surprise Round",
    description: "Challenge yourself with advanced programming concepts and problem-solving.",
    timeLimit: 1,
    questions: [
      {
        id: 1,
        question: "The function maxReplace print space separated integers representing the input list after replacing all the elements of the input list with the sum of all the element of the input list. The function maxReplace accepts two arguments – size  an integer representing the size of the input list and inputList, a list of integers representing the input list respectively. The function maxReplace compiles unsuccessfully due to compilation errors. Your task is to fix the code so that it passes all the test cases.",
        options: [
          "inputList[i]=sum;",
          "inputList[i]=size; ",
          "size=inputList[i]",
          "sum+=inputList[i];"
        ],
        correctAnswer: "Threads share memory, processes don't",
        image: "https://csi-bucket-0001.s3.ap-south-1.amazonaws.com/question1.png"
      },
      {
        id: 2,
        question: `Ram is a 6 years old boy who loves to play with numeric lego. One day ram’s mom 
created a number using those lego and asked ram to tell the number of elements 
available between two specific numbers ‘alpha1’ and ‘alpha2’. After 15 years when 
ram started learning C, he now wants to write a C code to find the number of 
elements lies between ranges alpha1 and alpha2. If the number is arr and the 
starting and ending points are alpha1 and alpha2, find the numbers of elements lies 
in the range 
Input: 
Three space-separated integers 
1. First is the length of arr. 
2. Second is the starting point as alpha1 
3. The third is the endpoint as alpha2 
Output: 
Indexes of elements lie between this range. 
Example 
Input 
9 2 6 
1 2 3 4 5 6 7 8 9 
Output 
1 2 3 4 
Find the error in the given code –`,
        options: [
          "for(j=0; j<=length; j++)",
          "for(j=0;j<length;j++) ",
          `printf("%d ",j); `,
          "No Error"
        ],
        correctAnswer: "for(j=0; j<=length; j++)",
        image: "https://csi-bucket-0001.s3.ap-south-1.amazonaws.com/question2.png"
      },
      {
        id: 3,
        question: `Function/method employeeID accepts four arguments-len , an integer representing 
the length of input list. arr, start , end of range and a list of integers It returns an 
integer representing the sum of all id’s of the employees in that range for example   
len = 6,start=30,end=50, arr = [29 38 12 48 39 55] 
function /method will return 8 i.e 1+3+4. Function/method compiles successfully but 
fails to return the desired result for some/all cases due to incorrect implementation. 
Your task is to debug the code so that it passes all test cases. 
Example 
Input 
6 30 50 
29 38 12 48 39 55 
Output 
8 
Find error in the following code `,
        options: [
          "for (i = 0; i < len; i++)  ",
          "if (arr[i] > start || arr[i] < end)",
          "Both A and B",
          "if (flag == -1)"
        ],
        correctAnswer: "if (arr[i] > start || arr[i] < end)",
        image: "https://csi-bucket-0001.s3.ap-south-1.amazonaws.com/question3.png"
      },
      {
        id: 4,
        question: `Function/method nthFib accepts single argument-num , an integer representing 
number. for example  num=9 
function /method will return 34 function/method compiles successfully but fails to 
return the desired result for some/all cases due to incorrect implementation. Your 
task is to debug the code so that it passes all test cases. 
Example 
Input 
8 
Output 
21 
`,
        options: [
          "for (i = 0; i <= num; i++) ",
          "c = a + b",
          "return a + b",
          "Both A and C"
        ],
        correctAnswer: "Both A and C",
        image: "https://csi-bucket-0001.s3.ap-south-1.amazonaws.com/question4.png"
      },
      {
        id: 5,
        question: `The function mulTable(int num) is supposed to print the first twenty multiples of the 
multiplication table of the input number num     .  
The function compiles fine but fails to return the desired result for some cases. 
Your task is to fix the program so that it passes all the test cases. 
Test cases: 
TestCase 1: 
Input: 
6 
Expected return value: 
6  12  18  24  30  36  42  48  57  60 66 72 78 84 90 96 102 108 114 120 
No of Lines you will change in the following code to fix it:`,
        options: [
          "0",
          "1",
          "2",
          "3"
        ],
        correctAnswer: "2",
        image: "https://csi-bucket-0001.s3.ap-south-1.amazonaws.com/question5.png"
      },
      {
        "id": 6,
        "question": "A merchant can buy goods at the rate of Rs. 20 per good. The particular good is part of an overall collection and the value is linked to the number of items that are already on the market. So, the merchant sells the first good for Rs. 2, second one for Rs. 4, third for Rs. 6…and so on. If he wants to make an overall profit of at least 40%, what is the minimum number of goods he should sell?",
        "options": [
          "24",
          "18",
          "27",
          "32"
        ],
        "correctAnswer": "27",
      },
      {
        "id": 7,
        "question": "P is x% more than Q. Q is (x - 10)% less than R. If P > R, what is the range of values x can take?",
        "options": [
          "10%-28%",
          "10%-25%",
          "10%-37%",
          "10%-43%"
        ],
        "correctAnswer": "10%-37%",
      },
      {
        "id": 8,
        "question": "In a class, if 50% of the boys were girls, then there would be 50% more girls than boys. What percentage of the overall class is girls?",
        "options": [
          "50",
          "20",
          "33",
          "25"
        ],
        "correctAnswer": "20",
      },
      {
        "id": 9,
        "question": "Traders A and B buy two goods for Rs. 1000 and Rs. 2000 respectively. Trader A marks his goods up by x%, while trader B marks his goods up by 2x% and offers a discount of x%. If both make the same non-zero profit, find x.",
        "options": [
          "25",
          "12.5",
          "37.5",
          "40"
        ],
        "correctAnswer": "25",
      },
      {
        "id": 10,
        "question": "A merchant buys 80 articles, each at Rs. 40. He sells n of them at a profit of n% and the remaining at a profit of (100 – n)%. What is the minimum profit the merchant could have made on this trade?",
        "options": [
          "2160",
          "1420",
          "1580",
          "2210"
        ],
        "correctAnswer": "1580",
      },
      {
        "id": 11,
        "question": "You are working as an SDE in an MNC, tasked with designing a database for a software product. The data is not in a tabular/structured manner and requires high adaptability. Which database would you choose?",
        "options": [
          "MySQL",
          "PostgreSQL",
          "MongoDB",
          "SQLite"
        ],
        "correctAnswer": "MongoDB"
      },
      {
        "id": 12,
        "question": "Your team is building a real-time analytics platform to process and visualize streaming data from IoT devices. The system requires minimal latency and the ability to handle large-scale, time-series data efficiently. Which database would you recommend?",
        "options": [
          "Cassandra",
          "MySQL",
          "MongoDB",
          "InfluxDB"
        ],
        "correctAnswer": "InfluxDB"
      },
      {
        "id": 13,
        "question": "A large team of developers is working on a software project. They require a system to collaborate on code, maintain a history of changes, and handle branching/merging efficiently. Which tool would you choose?",
        "options": [
          "Git",
          "SVN",
          "Mercurial",
          "CVS"
        ],
        "correctAnswer": "Git"
      },
      {
        "id": 14,
        "question": "You need to deploy a containerized application with high availability and the ability to scale based on traffic. Which service would you use?",
        "options": [
          "AWS EC2",
          "Kubernetes",
          "Docker Swarm",
          "Azure App Service"
        ],
        "correctAnswer": "Kubernetes"
      },
      {
        "id": 15,
        "question": "Your web application is experiencing high traffic, and you want to distribute incoming requests across multiple servers to ensure availability and responsiveness. What solution would you implement?",
        "options": [
          "Load Balancer",
          "CDN",
          "WebSocket",
          "API Gateway"
        ],
        "correctAnswer": "Load Balancer"
      },
      {
        "id": 16,
        "question": "Your microservices architecture requires a messaging system for asynchronous communication between services. The system must ensure reliable message delivery. Which tool would you choose?",
        "options": [
          "RabbitMQ",
          "Apache Kafka",
          "Redis",
          "All of the above"
        ],
        "correctAnswer": "All of the above"
      },
      {
        "id": 17,
        "question": "To improve the deployment process, your team decides to automate builds, tests, and deployments. Which tool would you choose for setting up a CI/CD pipeline?",
        "options": [
          "Jenkins",
          "CircleCI",
          "GitHub Actions",
          "All of the above"
        ],
        "correctAnswer": "All of the above"
      },
      {
        "id": 18,
        "question": "Your application needs to serve dynamic data to a frontend client. The client may need different subsets of the data based on user preferences. Which API type would you use?",
        "options": [
          "REST API",
          "SOAP API",
          "GraphQL",
          "WebSocket"
        ],
        "correctAnswer": "GraphQL"
      },
      {
        "id": 19,
        "question": "Your web application experiences frequent access to static data, such as product details. To reduce database load and improve response times, you decide to implement caching. Which tool would you use?",
        "options": [
          "Memcached",
          "Redis",
          "Apache Ignite",
          "All of the above"
        ],
        "correctAnswer": "All of the above"
      },
      {
        "id": 20,
        "question": "Your production application needs real-time performance monitoring and error tracking. You need a tool that provides actionable insights and alerts. Which tool would you use?",
        "options": [
          "New Relic",
          "Datadog",
          "Sentry",
          "All of the above"
        ],
        "correctAnswer": "All of the above"
      },
      {
        "id": 21,
        "question": "You are blindfolded and 10 coins are placed in front of you on the table. You are told that there are 5 coins head up, and 5 coins tails up but not which ones are which. Can you make two piles of coins each with the same number of heads up? You can flip the coins any number of times.",
        "options": [
          "No",
          "Cannot be determined",
          "Yes"
        ],
        "correctAnswer": "Yes"
      },
      {
        "id": 22,
        "question": "You have got someone working for you for five days and a gold bar to pay him. You must give them a piece of gold at the end of every day. What are the fewest number of cuts to the bar of gold that will allow you to pay him 1/5th each day?",
        "options": [
          "2",
          "3",
          "5",
          "10"
        ],
        "correctAnswer": "2"
      },
      {
        "id": 23,
        "question": "There are 5 pirates who must decide how to distribute 100 gold coins among them. The pirates have seniority levels, with the senior-most being A and the junior-most being E. What is the maximum number of coins that pirate A might get?",
        "options": [
          "98",
          "99",
          "110",
          "112",
          "Cannot be determined"
        ],
        "correctAnswer": "98"
      },
      {
        "id": 24,
        "question": "A Lady bought an item of Rs 100 from the Shopkeeper. She paid him through a 500 Rs Note. The shopkeeper got change for the note from another shopkeeper and paid Rs 400 to the Lady. Later, the second shopkeeper realized the note was fake and took 500 Rs back from the first shopkeeper. How much money did the first shopkeeper lose in the end?",
        "options": [
          "100",
          "400",
          "500",
          "No Loss"
        ],
        "correctAnswer": "500"
      },
      {
        "id": 25,
        "question": "Two trains are on the same track and are coming toward each other. The speed of the first train is 50 km/h and the speed of the second train is 70 km/h. A bee starts flying between the trains when the distance between them is 100 km. The bee flies at 80 km/h. Calculate the total distance travelled by the bee.",
        "options": [
          "100 Km",
          "66.67 Km",
          "65 Km",
          "77 Km"
        ],
        "correctAnswer": "66.67 Km"
      },
      {
        "id": 26,
        "question": "Which of the following concurrency control protocols ensures both conflict serializability and deadlock-freedom?",
        "options": [
          "Two-Phase Locking (2PL)",
          "Timestamp-Ordering Protocol",
          "Multiversion Concurrency Control (MVCC)",
          "Strict Two-Phase Locking (S2PL)"
        ],
        "correctAnswer": "Timestamp-Ordering Protocol"
      },
      {
        "id": 27,
        "question": "Which of the following strategies does not reduce the cost of a relational database query?",
        "options": [
          "Using indexes on columns involved in WHERE clause conditions",
          "Reducing the size of intermediate relations",
          "Normalizing the database to higher normal forms",
          "Pushing selections as early as possible in query trees"
        ],
        "correctAnswer": "Normalizing the database to higher normal forms"
      },
      {
        "id": 28,
        "question": "Which scheduling algorithm can cause starvation?",
        "options": [
          "First-Come-First-Serve (FCFS)",
          "Shortest Job Next (SJN)",
          "Round-Robin (RR)",
          "Multilevel Queue Scheduling"
        ],
        "correctAnswer": "Shortest Job Next (SJN)"
      },
      {
        "id": 29,
        "question": "In a paged memory system with a 32-bit logical address, a page size of 4KB, and 4 levels of paging, how many bits are required to represent the page offset?",
        "options": [
          "10",
          "12",
          "20",
          "22"
        ],
        "correctAnswer": "12"
      },
      {
        "id": 30,
        "question": "Which of the following routing algorithms can handle negative edge weights?",
        "options": [
          "Bellman-Ford",
          "Dijkstra’s Algorithm",
          "AODV",
          "OSPF"
        ],
        "correctAnswer": "Bellman-Ford"
      }

    ]
  }
};