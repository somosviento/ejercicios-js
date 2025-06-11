export const blogPosts = [
  {
    id: 1,
    title: "Getting Started with React",
    excerpt: "Learn the basics of React and how to create your first component.",
    content: `
      # Getting Started with React
      
      React is a JavaScript library for building user interfaces. It's declarative, efficient, and flexible.
      
      ## Creating Your First Component
      
      Here's a simple React component:
      
      \`\`\`jsx
      function Welcome(props) {
        return <h1>Hello, {props.name}</h1>;
      }
      \`\`\`
      
      ## Setting Up Your Environment
      
      To get started with React, you need Node.js and npm installed. Then you can create a new React app using:
      
      \`\`\`bash
      npx create-react-app my-app
      cd my-app
      npm start
      \`\`\`
      
      This will set up a new React project with all the necessary configurations.
      
      ## Understanding JSX
      
      JSX is a syntax extension for JavaScript that looks similar to HTML. It allows you to write HTML-like code in your JavaScript files.
      
      \`\`\`jsx
      const element = <h1>Hello, world!</h1>;
      \`\`\`
      
      JSX is compiled to regular JavaScript function calls that create React elements.
    `,
    author: "Jane Smith",
    date: "2023-06-15",
    category: "React",
    tags: ["React", "JavaScript", "Web Development"],
    imageUrl: "https://via.placeholder.com/800x400?text=React+Basics",
    featured: true
  },
  {
    id: 2,
    title: "Advanced CSS Techniques",
    excerpt: "Explore advanced CSS techniques like Grid, Flexbox, and CSS Variables.",
    content: `
      # Advanced CSS Techniques
      
      Modern CSS offers powerful features that make complex layouts easier to implement.
      
      ## CSS Grid
      
      CSS Grid Layout is a two-dimensional layout system designed for the web. It lets you lay out items in rows and columns.
      
      \`\`\`css
      .container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 20px;
      }
      \`\`\`
      
      ## Flexbox
      
      Flexbox is a one-dimensional layout method for laying out items in rows or columns.
      
      \`\`\`css
      .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      \`\`\`
      
      ## CSS Variables
      
      CSS Variables (Custom Properties) allow you to store specific values to be reused throughout your document.
      
      \`\`\`css
      :root {
        --main-color: #4CAF50;
        --text-color: #333;
      }
      
      .button {
        background-color: var(--main-color);
        color: white;
      }
      \`\`\`
    `,
    author: "Alex Johnson",
    date: "2023-05-28",
    category: "CSS",
    tags: ["CSS", "Web Design", "Frontend"],
    imageUrl: "https://via.placeholder.com/800x400?text=Advanced+CSS",
    featured: false
  },
  {
    id: 3,
    title: "JavaScript ES6 Features",
    excerpt: "Discover the powerful features introduced in ES6 that make your code cleaner and more efficient.",
    content: `
      # JavaScript ES6 Features
      
      ES6 (ECMAScript 2015) introduced many features that make JavaScript more powerful and expressive.
      
      ## Arrow Functions
      
      Arrow functions provide a shorter syntax for writing function expressions.
      
      \`\`\`javascript
      // Traditional function
      function add(a, b) {
        return a + b;
      }
      
      // Arrow function
      const add = (a, b) => a + b;
      \`\`\`
      
      ## Template Literals
      
      Template literals allow embedded expressions and multi-line strings.
      
      \`\`\`javascript
      const name = 'World';
      const greeting = \`Hello, ${name}!
      Welcome to ES6.\`;
      \`\`\`
      
      ## Destructuring Assignment
      
      Destructuring allows you to extract data from arrays or objects into distinct variables.
      
      \`\`\`javascript
      // Array destructuring
      const [first, second] = [1, 2];
      
      // Object destructuring
      const { name, age } = { name: 'John', age: 30 };
      \`\`\`
      
      ## Spread and Rest Operators
      
      The spread operator allows an iterable to be expanded in places where zero or more arguments or elements are expected.
      
      \`\`\`javascript
      const arr1 = [1, 2, 3];
      const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]
      
      // Rest parameter
      function sum(...numbers) {
        return numbers.reduce((total, num) => total + num, 0);
      }
      \`\`\`
    `,
    author: "Michael Brown",
    date: "2023-06-02",
    category: "JavaScript",
    tags: ["JavaScript", "ES6", "Programming"],
    imageUrl: "https://via.placeholder.com/800x400?text=ES6+Features",
    featured: true
  },
  {
    id: 4,
    title: "Introduction to Redux",
    excerpt: "Learn how to manage state in your React applications using Redux.",
    content: `
      # Introduction to Redux
      
      Redux is a predictable state container for JavaScript apps, commonly used with React.
      
      ## Core Concepts
      
      Redux has three fundamental principles:
      
      1. **Single source of truth**: The state of your whole application is stored in an object tree within a single store.
      2. **State is read-only**: The only way to change the state is to emit an action.
      3. **Changes are made with pure functions**: Reducers are pure functions that take the previous state and an action, and return the next state.
      
      ## Basic Example
      
      \`\`\`javascript
      // Action Types
      const INCREMENT = 'INCREMENT';
      const DECREMENT = 'DECREMENT';
      
      // Action Creators
      function increment() {
        return { type: INCREMENT };
      }
      
      function decrement() {
        return { type: DECREMENT };
      }
      
      // Reducer
      function counter(state = 0, action) {
        switch (action.type) {
          case INCREMENT:
            return state + 1;
          case DECREMENT:
            return state - 1;
          default:
            return state;
        }
      }
      
      // Store
      import { createStore } from 'redux';
      const store = createStore(counter);
      
      // Dispatch Actions
      store.dispatch(increment()); // State becomes 1
      store.dispatch(increment()); // State becomes 2
      store.dispatch(decrement()); // State becomes 1
      \`\`\`
    `,
    author: "Sarah Wilson",
    date: "2023-05-20",
    category: "React",
    tags: ["React", "Redux", "State Management"],
    imageUrl: "https://via.placeholder.com/800x400?text=Redux+Intro",
    featured: false
  },
  {
    id: 5,
    title: "Building Responsive Websites",
    excerpt: "Learn techniques for creating websites that work well on all devices.",
    content: `
      # Building Responsive Websites
      
      Responsive web design ensures that your website looks good on all devices, from desktop computers to smartphones.
      
      ## Media Queries
      
      Media queries allow you to apply different styles based on the device characteristics.
      
      \`\`\`css
      /* Mobile styles */
      @media (max-width: 767px) {
        .container {
          width: 100%;
        }
      }
      
      /* Tablet styles */
      @media (min-width: 768px) and (max-width: 1023px) {
        .container {
          width: 750px;
        }
      }
      
      /* Desktop styles */
      @media (min-width: 1024px) {
        .container {
          width: 980px;
        }
      }
      \`\`\`
      
      ## Fluid Layouts
      
      Use percentage-based widths instead of fixed pixel values for a more flexible layout.
      
      \`\`\`css
      .container {
        width: 90%;
        max-width: 1200px;
        margin: 0 auto;
      }
      
      .column {
        float: left;
        width: 33.33%;
        padding: 15px;
      }
      
      @media (max-width: 767px) {
        .column {
          width: 100%;
        }
      }
      \`\`\`
      
      ## Responsive Images
      
      Make images scale with their container using max-width.
      
      \`\`\`css
      img {
        max-width: 100%;
        height: auto;
      }
      \`\`\`
    `,
    author: "David Lee",
    date: "2023-06-10",
    category: "Web Design",
    tags: ["Responsive Design", "CSS", "Web Development"],
    imageUrl: "https://via.placeholder.com/800x400?text=Responsive+Design",
    featured: false
  },
  {
    id: 6,
    title: "Node.js Fundamentals",
    excerpt: "Get started with server-side JavaScript using Node.js.",
    content: `
      # Node.js Fundamentals
      
      Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine, allowing you to run JavaScript on the server.
      
      ## Setting Up a Basic Server
      
      \`\`\`javascript
      const http = require('http');
      
      const server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World\\n');
      });
      
      server.listen(3000, '127.0.0.1', () => {
        console.log('Server running at http://127.0.0.1:3000/');
      });
      \`\`\`
      
      ## Working with Files
      
      Node.js provides a built-in module called 'fs' for interacting with the file system.
      
      \`\`\`javascript
      const fs = require('fs');
      
      // Reading a file
      fs.readFile('example.txt', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(data);
      });
      
      // Writing to a file
      fs.writeFile('example.txt', 'Hello, Node.js!', (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('File written successfully');
      });
      \`\`\`
      
      ## NPM (Node Package Manager)
      
      NPM is the package manager for Node.js, allowing you to install and manage dependencies.
      
      \`\`\`bash
      # Initialize a new project
      npm init
      
      # Install a package
      npm install express
      
      # Install a development dependency
      npm install --save-dev nodemon
      \`\`\`
    `,
    author: "Emily Chen",
    date: "2023-05-15",
    category: "Node.js",
    tags: ["Node.js", "JavaScript", "Backend"],
    imageUrl: "https://via.placeholder.com/800x400?text=Node.js+Basics",
    featured: false
  }
];

export const categories = [
  { id: "React", name: "React", count: 2 },
  { id: "CSS", name: "CSS", count: 1 },
  { id: "JavaScript", name: "JavaScript", count: 1 },
  { id: "Web Design", name: "Web Design", count: 1 },
  { id: "Node.js", name: "Node.js", count: 1 }
];

export const tags = [
  "React", "JavaScript", "Web Development", "CSS", "Web Design", 
  "Frontend", "ES6", "Programming", "Redux", "State Management",
  "Responsive Design", "Node.js", "Backend"
];

export const featuredPosts = blogPosts.filter(post => post.featured);
export const recentPosts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
