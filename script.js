// API Configuration
const JOKE_API_URL = 'https://jokeapi.dev/joke/';

// DOM Elements
const getJokeBtn = document.getElementById('getJokeBtn');
const copyBtn = document.getElementById('copyBtn');
const shareBtn = document.getElementById('shareBtn');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const jokeContent = document.getElementById('jokeContent');
const jokeType = document.getElementById('jokeType');
const categorySelect = document.getElementById('categorySelect');
const historyList = document.getElementById('historyList');
const toast = document.getElementById('toast');

// State
let currentJoke = null;
let jokeHistory = [];

// Load history from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
    loadHistoryFromStorage();
});

// Event Listeners
getJokeBtn.addEventListener('click', fetchJoke);
copyBtn.addEventListener('click', copyToClipboard);
shareBtn.addEventListener('click', shareOnTwitter);
clearHistoryBtn.addEventListener('click', clearHistory);
categorySelect.addEventListener('change', fetchJoke);

/**
 * Fetch a random joke from the API
 */
async function fetchJoke() {
    const category = categorySelect.value;
    
    // Show loading state
    getJokeBtn.disabled = true;
    getJokeBtn.innerHTML = '<span class="spinner"></span> Loading...';
    
    try {
        // Build API URL based on category
        let url;
        if (category === 'random') {
            url = `${JOKE_API_URL}Any`; // Any category
        } else {
            url = `${JOKE_API_URL}${category}`;
        }
        
        // Add parameters to get a random joke
        url += '?type=single,twopart';
        
        console.log('Fetching from:', url);
        
        // Fetch the joke
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Check if the request was successful
        if (data.error) {
            throw new Error('Failed to fetch joke');
        }
        
        // Store the current joke
        currentJoke = data;
        
        // Display the joke
        displayJoke(data);
        
        // Add to history
        addToHistory(data);
        
        // Show success message
        showToast('Joke loaded! 😂');
        
    } catch (error) {
        console.error('Error fetching joke:', error);
        displayError(error.message);
        showToast('Failed to load joke. Try again!', 'error');
    } finally {
        // Reset button state
        getJokeBtn.disabled = false;
        getJokeBtn.innerHTML = 'Get Joke 🎉';
    }
}

/**
 * Display the joke on the screen
 */
function displayJoke(joke) {
    let jokeHTML = '';
    let typeText = '';
    
    if (joke.type === 'single') {
        // Single line joke
        typeText = 'Single Joke';
        jokeHTML = `<p class="single-joke">${escapeHtml(joke.joke)}</p>`;
    } else if (joke.type === 'twopart') {
        // Setup and punchline
        typeText = 'Setup & Punchline';
        jokeHTML = `
            <p class="joke-setup">📝 ${escapeHtml(joke.setup)}</p>
            <p class="joke-punchline">😂 ${escapeHtml(joke.delivery)}</p>
        `;
    }
    
    // Update joke type and content
    jokeType.textContent = typeText;
    jokeContent.innerHTML = jokeHTML;
    
    // Remove error styling if present
    document.querySelector('.joke-box').classList.remove('error');
}

/**
 * Display error message
 */
function displayError(message) {
    jokeType.textContent = 'Error';
    jokeContent.innerHTML = `<p>❌ ${escapeHtml(message)}</p>`;
    document.querySelector('.joke-box').classList.add('error');
}

/**
 * Copy joke to clipboard
 */
function copyToClipboard() {
    if (!currentJoke) {
        showToast('No joke to copy!', 'error');
        return;
    }
    
    let jokeText = '';
    
    if (currentJoke.type === 'single') {
        jokeText = currentJoke.joke;
    } else if (currentJoke.type === 'twopart') {
        jokeText = `${currentJoke.setup}\n\n${currentJoke.delivery}`;
    }
    
    // Copy to clipboard
    navigator.clipboard.writeText(jokeText).then(() => {
        showToast('Joke copied to clipboard! 📋');
    }).catch(err => {
        console.error('Failed to copy:', err);
        showToast('Failed to copy', 'error');
    });
}

/**
 * Share joke on Twitter
 */
function shareOnTwitter() {
    if (!currentJoke) {
        showToast('No joke to share!', 'error');
        return;
    }
    
    let jokeText = '';
    
    if (currentJoke.type === 'single') {
        jokeText = currentJoke.joke;
    } else if (currentJoke.type === 'twopart') {
        jokeText = `${currentJoke.setup} ${currentJoke.delivery}`;
    }
    
    // Create Twitter share URL
    const twitterText = encodeURIComponent(`${jokeText}\n\n😂 Shared via Random Joke Generator`);
    const twitterURL = `https://twitter.com/intent/tweet?text=${twitterText}`;
    
    // Open Twitter share dialog
    window.open(twitterURL, '_blank', 'width=600,height=400');
    
    showToast('Opening Twitter... 🐦');
}

/**
 * Add joke to history
 */
function addToHistory(joke) {
    let jokeText = '';
    
    if (joke.type === 'single') {
        jokeText = joke.joke;
    } else if (joke.type === 'twopart') {
        jokeText = `${joke.setup} ${joke.delivery}`;
    }
    
    // Add to beginning of array
    jokeHistory.unshift({
        text: jokeText,
        timestamp: new Date().toLocaleTimeString(),
        category: categorySelect.value
    });
    
    // Keep only last 10 jokes
    if (jokeHistory.length > 10) {
        jokeHistory.pop();
    }
    
    // Update display and storage
    displayHistory();
    saveHistoryToStorage();
}

/**
 * Display history
 */
function displayHistory() {
    if (jokeHistory.length === 0) {
        historyList.innerHTML = '<p class="empty-history">No jokes yet. Generate one to see it here!</p>';
        return;
    }
    
    historyList.innerHTML = jokeHistory.map((item, index) => `
        <div class="history-item">
            <small style="color: #999;">⏱️ ${item.timestamp} • 🏷️ ${item.category}</small>
            <p>${escapeHtml(item.text.substring(0, 100))}${item.text.length > 100 ? '...' : ''}</p>
        </div>
    `).join('');
}

/**
 * Clear history
 */
function clearHistory() {
    if (confirm('Are you sure you want to clear all history?')) {
        jokeHistory = [];
        displayHistory();
        saveHistoryToStorage();
        showToast('History cleared! 🗑️');
    }
}

/**
 * Save history to localStorage
 */
function saveHistoryToStorage() {
    try {
        localStorage.setItem('jokeHistory', JSON.stringify(jokeHistory));
    } catch (error) {
        console.error('Failed to save history:', error);
    }
}

/**
 * Load history from localStorage
 */
function loadHistoryFromStorage() {
    try {
        const stored = localStorage.getItem('jokeHistory');
        if (stored) {
            jokeHistory = JSON.parse(stored);
            displayHistory();
        }
    } catch (error) {
        console.error('Failed to load history:', error);
    }
}

/**
 * Show toast notification
 */
function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.classList.add('show');
    
    if (type === 'error') {
        toast.style.background = '#f44336';
    } else {
        toast.style.background = '#4CAF50';
    }
    
    // Hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

console.log('🎉 Random Joke Generator loaded successfully!');
