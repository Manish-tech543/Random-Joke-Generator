# 😂 Random Joke Generator

A fun and interactive web application that fetches and displays random jokes from an external API. Built with vanilla HTML, CSS, and JavaScript.

## 🌟 Features

✅ **Fetch Random Jokes** - Get jokes from the JokeAPI with one click
✅ **Multiple Categories** - Choose from General, Programming, or Knock-Knock jokes
✅ **Copy to Clipboard** - Easily copy jokes to share with friends
✅ **Share on Twitter** - Share jokes directly to your Twitter account
✅ **Joke History** - View your last 10 jokes fetched
✅ **Persistent Storage** - History saves in browser using localStorage
✅ **Responsive Design** - Works perfectly on mobile, tablet, and desktop
✅ **Beautiful UI** - Modern gradient design with smooth animations

## 🚀 How to Use / Run the Application

### **Step 1: Open the Website**
- Simply open `index.html` in your web browser
- Or access it from: https://manish-tech543.github.io/Random-Joke-Generator/

### **Step 2: Generate a Joke**
1. Click the **"Get Joke 🎉"** button to fetch a random joke
2. The joke will appear in the box above
3. Your joke will be automatically added to the "Recent Jokes" history

### **Step 3: Select a Category** (Optional)
Before clicking "Get Joke", you can select a specific joke category:
- 🎲 **Random (All Categories)** - Mix of any jokes
- 🎯 **General** - General humor jokes
- 💻 **Programming** - Tech/coding jokes (perfect for developers!)
- 🚪 **Knock-Knock** - Classic knock-knock jokes

### **Step 4: Use Additional Features**
Once you have a joke:
- 📋 **Copy to Clipboard** - Copy the joke text to paste anywhere
- 🐦 **Share on Twitter** - Tweet the joke to your followers
- 🗑️ **Clear History** - Delete all saved jokes from history

## 🔍 What You Can Search / Generate

This joke generator pulls from the **JokeAPI** which contains:

### **Joke Categories**
1. **General** - Clean, funny jokes about everyday topics
2. **Programming** - Developer and tech-related humor
3. **Knock-Knock** - Classic knock-knock joke format
4. **Any/Random** - All jokes mixed together

### **Example Jokes You Might Get**

**Programming Joke:**
```
Why do developers prefer dark mode?
Because light attracts bugs!
```

**General Joke:**
```
Why don't scientists trust atoms?
Because they make up everything!
```

**Knock-Knock Joke:**
```
Knock knock.
Who's there?
Interrupt cow.
Interrupt cow wh—
MOOOO!
```

## 📁 Project Structure

```
Random-Joke-Generator/
├── index.html          # Main HTML file with structure
├── styles.css          # All styling and animations
├── script.js           # JavaScript logic and API integration
├── README.md          # This file
└── .github/
    └── workflows/     # GitHub Actions (optional)
```

## 🔧 Technologies Used

- **HTML5** - Semantic markup and structure
- **CSS3** - Gradient backgrounds, animations, responsive design
- **Vanilla JavaScript** - No frameworks, pure JS
- **JokeAPI** - External API for joke data (https://jokeapi.dev/)
- **LocalStorage** - Browser storage for history persistence

## 📡 API Used

### **JokeAPI**
- **Website:** https://jokeapi.dev/
- **Documentation:** https://jokeapi.dev/
- **Rate Limit:** 300 requests per minute
- **No Authentication Required** - Free to use!

### **API Endpoints Used:**
```
# Random joke from any category
GET https://jokeapi.dev/joke/Any?type=single,twopart

# Specific category jokes
GET https://jokeapi.dev/joke/{category}?type=single,twopart

Categories:
- General
- Programming
- Knock-Knock
- Any (all jokes)
```

## 🎯 How It Works

### **Step-by-Step Flow:**

1. **User clicks "Get Joke"** → Button enters loading state
2. **JavaScript fetches from API** → Sends request to JokeAPI
3. **API returns joke data** → Contains joke text, type, category
4. **Display joke** → Show setup/punchline or single joke
5. **Add to history** → Save to array and localStorage
6. **Show notification** → Toast confirms joke loaded
7. **User actions** → Copy, share, or generate another joke

### **Data Flow:**
```
User Click → Fetch API → Parse Response → Display Joke → Save History → Show Toast
```

## 💾 Local Storage

Joke history is saved in your browser's localStorage:
- Stores up to 10 most recent jokes
- Persists even after closing the browser
- Can be cleared with "Clear History" button
- Each entry includes: joke text, timestamp, category

## 🎨 Features Explained

### **Category Selection**
- Use the dropdown to filter jokes by category
- Selecting a category automatically fetches a joke from that category
- "Random" shows any joke from all categories

### **Copy to Clipboard**
- Copies the current joke to your clipboard
- Works with both single and two-part jokes
- Shows confirmation toast

### **Share on Twitter**
- Opens a Twitter compose window
- Pre-fills with your joke text
- Add your own commentary before tweeting

### **History System**
- Shows last 10 jokes you've generated
- Displays timestamp when fetched
- Shows which category it came from
- Click "Clear History" to reset

## 🌐 Browser Compatibility

✅ Chrome 60+
✅ Firefox 55+
✅ Safari 12+
✅ Edge 79+
✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🚨 Troubleshooting

### **Issue: "Failed to load joke. Try again!"**
- **Cause:** Network issue or API down
- **Solution:** Check internet connection, wait a moment, try again

### **Issue: Copy button doesn't work**
- **Cause:** Browser permissions issue
- **Solution:** Allow clipboard access when prompted

### **Issue: History not saving**
- **Cause:** LocalStorage disabled or full
- **Solution:** Enable localStorage or clear browser cache

### **Issue: Twitter share opens blank**
- **Cause:** Pop-up blocker active
- **Solution:** Allow pop-ups from this website

## 📊 API Response Example

```json
{
  "error": false,
  "category": "Programming",
  "type": "twopart",
  "setup": "Why do programmers prefer dark mode?",
  "delivery": "Because light attracts bugs!",
  "flags": {
    "nsfw": false,
    "religious": false,
    "political": false,
    "racist": false,
    "sexist": false,
    "explicit": false
  },
  "id": 0,
  "safe": true,
  "lang": "en"
}
```

## 🎓 Learning Outcomes

By exploring this project, you'll learn:
- ✅ How to fetch data from external APIs using `fetch()` API
- ✅ How to handle JSON responses
- ✅ How to use localStorage for persistent data
- ✅ DOM manipulation and dynamic content rendering
- ✅ Event listeners and async/await in JavaScript
- ✅ Error handling and loading states
- ✅ Responsive CSS Grid and Flexbox layouts
- ✅ CSS animations and transitions
- ✅ URL encoding and special character handling

## 🔗 External Resources

- [JokeAPI Documentation](https://jokeapi.dev/)
- [MDN Fetch API Guide](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN localStorage Guide](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [CSS Animations Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)

## 💡 Future Enhancements

- [ ] Dark mode toggle
- [ ] Favorite jokes list
- [ ] Export history as PDF
- [ ] Joke search by keyword
- [ ] Rate jokes (thumbs up/down)
- [ ] Multiple language support
- [ ] Desktop app (Electron)
- [ ] Browser extension

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

Created by **Manish** | AIML Student | Full-Stack Developer

---

**Made with ❤️ and lots of laughs! 😂**

**Got a bug or suggestion? Feel free to open an issue or submit a pull request!**
