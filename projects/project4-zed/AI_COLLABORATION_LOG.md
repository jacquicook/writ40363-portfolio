# AI Collaboration Log – Project Zed

This file documents my collaboration with AI tools (ChatGPT + Claude) during the development of Playlist Pulse. The log includes key learning moments, challenges, and representative conversations.

---

## Tools Used
- **ChatGPT (GPT-5.1)** – primary development partner  
- **Claude** – secondary assistant for code explanation and debugging clarity  

---

## Learning Moments (What AI taught me)
1. **Event delegation** – how to attach one listener to a parent instead of each delete button.  
2. **State management patterns** – keeping a single source of truth (`songs` array) and re-rendering from it.  
3. **Efficient DOM rendering** – using `document.createDocumentFragment()` instead of repeatedly touching the DOM.  
4. **Cleaner component structure** – separating form handling, render functions, and stats logic.  
5. **CSS theming** – using CSS variables to build a Spotify-style design system.

---

## Challenges (Where AI misled me / things didn’t work)
- Early versions of AI-generated JavaScript had mismatched IDs that didn’t exist in my HTML.  
- Some AI suggestions were too advanced (e.g., full component architecture), and I had to simplify.  
- Claude initially generated a filtering function that didn’t reset properly; ChatGPT helped fix it.  
- AI sometimes assumed I wanted API integration, even though the assignment requires manual data.

---

## Process Evolution (How my prompting improved)
- I learned to ask AI for **small pieces of code**, not full files at once.  
- I used “*explain this like I'm new to JavaScript*” when something didn’t make sense.  
- I clarified my constraints: *no external APIs, vanilla JS, localStorage only*.  
- Toward the end, I used AI for code review and optimization instead of writing everything automatically.

---

## Significant Conversations

### **1. Debugging Session – delete button not working**
*(Paste the short convo with AI here — I can write this for you if needed.)*

### **2. “Teach Me a Concept” – event delegation**
*(Paste the explanation ChatGPT gave you.)*

### **3. Refactoring Session – improving CSS variables and file structure**
*(Paste the convo snippet.)*

### **4. Planning Session – deciding app idea + feature scope**
*(Your initial messages deciding playlists / genres.)*

### **5. Layout Fix – card spacing + responsive grid**
*(A short convo where AI helped fix a spacing issue.)*


