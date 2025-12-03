# Personal Dashboard

A responsive personal dashboard featuring weather, daily quotes, and task management.

## Features

- **Weather Widget**: Displays current weather conditions
- **Daily Quotes**: Random inspirational quotes with refresh button
- **Task Manager**: Add, complete, and delete personal tasks
- **Dark/Light Theme**: Toggle between themes with persistence
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Data Persistence**: Tasks and theme preferences saved locally

## Technologies Used

- HTML5
- CSS3 (Grid, Flexbox, Custom Properties)
- JavaScript (ES6+)
- fetch() API
- localStorage

## Live Demo

🔗 [View Live Dashboard](https://your-username.github.io/your-repo-name/)

## Setup

1. Clone the repository
2. Open `index.html` in a web browser (use Live Server for development)
3. Customize `data/weather.json` and `data/quotes.json` with your own data

## Project Structure

\```
project3-dashboard/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styles including themes
├── js/
│   └── app.js          # All JavaScript functionality
├── data/
│   ├── weather.json    # Weather data
│   └── quotes.json     # Quotes collection
└── README.md           # This file
\```

## Future Enhancements

- Real weather API integration
- Quote categories and filtering
- Task categories and priorities
- Export/import tasks feature
- Additional widgets

## Author

[Your Name]

## License

MIT License


</head>
<body>
    <h1>Welcome to my page!</h1>
    <p>
For me Project 3 felt solid, honestly - not stressful or overwhelming, just satisfying. It pulled together everything I’ve picked up this semester and let me use it all in one go. I’d already messed around with localStorage, forms, etc in Project 2, so most of it clicked right away. Using fetch() to grab my JSON files was new. But after seeing how .then() worked, it made sense. Same idea as loading data, just a different method. Using fetch() to load my weather.json and quotes.json files was new for me. In class, I heard the word “asynchronous” a few times, but honestly, it didn’t trip me up once I actually tried it. Since my files were local, they loaded right away. Still, I got how the .then() pattern worked which was basically, “wait for the file, then run this code.” That clicked for me, and I used fetch() without any problems for both weather and quotes.
Dealing with JSON was pretty easy. JSON feels almost exactly like a regular JavaScript object. My weather.json file just had straightforward key/value pairs such as temperature, humidity, condition, and even the little cloud icon I added. Quotes.json was my location, temperature, humidity, icon, and windspeed. 
The Daily Inspiration widget ended up being one of my favorite parts of this project. There’s just something satisfying about clicking “New Quote” and watching a fresh line appear right away, especially since I picked every single quote myself. It made the dashboard feel alive, more like it was responding to me instead of just sitting still. Setting it up was actually really fun. I used fetch() to grab the quotes from quotes.json, tossed them into an array, and then wrote a function to pull a random one every time I hit the button. Seeing the quote update in real time was a small thing, but it made the whole interface feel more personal and interactive. Building it gave me the sense that I wasn’t just making a changeless page, but I was creating something that actually engaged with the user.
I added a “Change Name” feature and a “Copy Quote” button. Updating the name made the page feel a lot more personal, especially when the greeting at the top changed along with it. The copy quote button was easy to create because the code just selects the quote text from the page and then uses a built-in clipboard function to copy it. When I picked which new features to include, I focused on ones that would really add something without making things too complicated. The Optional Enhancements guide helped me stay realistic on what I should add.I wanted to make sure the core features worked well before I layered in anything extra. The last thing I wanted was for a new feature to break something that was already solid.
I did use AI slightly during project 3, mainly when I hit a spot in the code I didn’t fully understand. For example, if I was confused why a .then() was in a certain place, I’d ask for a clearer explanation. Sometimes the labs were a lot of code and writing to handle, so it helped to get things broken down in simpler terms, so I wasn’t so overwhelmed. Whenever AI gave me a suggestion, I tested it right away and checked the browser to see if everything worked. It didn’t replace my understanding, but it helped me get the hang of asynchronous code, since I could ask follow-up questions on the spot. Looking back, I think I struck a good balance as I met all the main requirements, added a couple of small, personal enhancements to make the dashboard more engaging, and used AI as a tool to learn, not as a shortcut for writing code for me. I was able to learn a lot from this project and I am proud of my work. 
</p>
</body>
</html>