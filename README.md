# Closest Colors! 🎨

A fun and vibrant web application for comparing the numerical closeness between two hex color codes.

## Features

- 🎯 **Interactive Color Comparison**: Compare two colors using eyedropper tools and hex inputs
- 📊 **Closeness Score**: Real-time calculation showing the numerical difference between colors
- 🎨 **Multiple Panels**: Add up to 6 comparison panels in a perfect 2x3 grid layout
- 🌈 **Color-Coded Inputs**: Hex input boxes display in their actual colors with smart contrast text
- ✨ **Playful Design**: Vibrant gradients and animations for an engaging experience
- 📱 **Responsive**: 2x3 grid on desktop, adapts to 2x3, then 1x6 on smaller screens
- ⌨️ **Keyboard Shortcuts**: Ctrl+N to add new panels quickly

## How to Use

### Starting the Application

1. Open a terminal in the project directory
2. Start a local server:
   ```bash
   python -m http.server 8000
   ```
3. Open your browser and go to `http://localhost:8000`

### Using the Interface

1. **Adding Panels**: Click the "+" button to add a new comparison panel (maximum 6 panels)

2. **Naming Panels**: Each panel has a customizable name field at the top

3. **Selecting Colors**: 
   - Type hex codes directly into the text inputs (e.g., #FF6B6B)
   - Click the eyedropper button (👁️‍🗨️) next to each input to open a color picker
   - The hex input box displays in the selected color with contrasting text
   - Both methods sync with each other automatically

4. **Understanding the Closeness Score**:
   - The score shows the Euclidean distance between two colors in RGB space
   - Lower scores mean the colors are more perceptually similar
   - Formula: `distance = √((R₂-R₁)² + (G₂-G₁)² + (B₂-B₁)²)`
   - Color-coded backgrounds:
     - 🟢 Green: Very close colors (< 50)
     - 🟡 Yellow: Moderately close (50 - 150)
     - 🔴 Red: Very different colors (> 150)
   - Maximum possible distance: ~441.67 (black to white)

5. **Removing Panels**: Click the "×" button in the top-right corner of any panel

### How the Calculation Works

The distance is calculated using the **Euclidean distance formula** in RGB color space:
**`distance = √((R₂-R₁)² + (G₂-G₁)² + (B₂-B₁)²)`**

1. Converting each hex color code to RGB components
2. Calculating the difference for each component (Red, Green, Blue)
3. Finding the Euclidean distance in 3D RGB space
4. Rounding to 2 decimal places for readability

**Example:**
- Color A: #FF6B6B = RGB(255, 107, 107)
- Color B: #4ECDC4 = RGB(78, 205, 196)
- Distance: √((78-255)² + (205-107)² + (196-107)²) = √(31329 + 9604 + 7921) = √48854 ≈ 221.03

## Technical Details

- **Frontend**: Pure HTML, CSS, and JavaScript (no frameworks required)
- **Styling**: CSS Grid for responsive layout, Google Fonts + Font Awesome icons
- **Color Handling**: Eyedropper buttons trigger hidden HTML5 color pickers
- **Layout**: Fixed 2x3 grid that perfectly fits the viewport without scrolling
- **Color Science**: Uses Euclidean distance in RGB space for accurate color comparison
- **Browser Support**: Modern browsers with HTML5 color input support

## Files Structure

- `index.html` - Main HTML structure
- `styles.css` - All styling and animations
- `script.js` - JavaScript functionality and logic
- `README.md` - This documentation

## Browser Compatibility

The application works best in modern browsers that support:
- HTML5 color input type
- CSS Grid
- ES6 JavaScript features

Tested on Chrome, Firefox, Safari, and Edge.

## Fun Easter Eggs

- Click the main title to restart its bounce animation
- Use Ctrl+N keyboard shortcut to quickly add new panels
- Hover effects on all interactive elements
- Color-coded closeness scores for quick visual feedback

Enjoy comparing colors! 🌈
