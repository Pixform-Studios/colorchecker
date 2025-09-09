class ColorComparator {
    constructor() {
        this.panelCount = 0;
        this.maxPanels = 6;
        this.init();
    }

    init() {
        const plusPanel = document.getElementById('plusPanel');
        plusPanel.addEventListener('click', () => this.addPanel());
    }

    addPanel() {
        if (this.panelCount >= this.maxPanels) {
            alert(`Maximum of ${this.maxPanels} panels allowed!`);
            return;
        }

        this.panelCount++;
        const panelId = `panel-${this.panelCount}`;
        
        const panelsContainer = document.getElementById('panelsContainer');
        const plusPanel = document.getElementById('plusPanel');
        
        // Create new panel
        const newPanel = this.createColorPanel(panelId);
        
        // Insert before the plus panel
        panelsContainer.insertBefore(newPanel, plusPanel);
        
        // Hide plus panel if we've reached the maximum
        if (this.panelCount >= this.maxPanels) {
            plusPanel.style.display = 'none';
        }
    }

    createColorPanel(panelId) {
        const panel = document.createElement('div');
        panel.className = 'panel color-panel';
        panel.id = panelId;
        
        panel.innerHTML = `
            <button class="delete-btn" onclick="colorComparator.deletePanel('${panelId}')">&times;</button>
            
            <div class="panel-header">
                <input type="text" class="panel-name" placeholder="Enter panel name..." 
                       value="Color Comparison ${this.panelCount}">
            </div>
            
            <div class="color-section">
                <div class="color-input-group">
                    <span class="color-label">Color A:</span>
                    <input type="text" class="hex-input" id="${panelId}-hexA" value="#FF6B6B" 
                           placeholder="#FFFFFF" maxlength="7">
                    <button class="eyedropper-btn" id="${panelId}-eyedropperA" title="Pick Color A">
                        <i class="fas fa-eye-dropper"></i>
                    </button>
                    <input type="color" class="hidden-color-input" id="${panelId}-colorA" value="#FF6B6B">
                </div>
                
                <div class="color-input-group">
                    <span class="color-label">Color B:</span>
                    <input type="text" class="hex-input" id="${panelId}-hexB" value="#4ECDC4" 
                           placeholder="#FFFFFF" maxlength="7">
                    <button class="eyedropper-btn" id="${panelId}-eyedropperB" title="Pick Color B">
                        <i class="fas fa-eye-dropper"></i>
                    </button>
                    <input type="color" class="hidden-color-input" id="${panelId}-colorB" value="#4ECDC4">
                </div>
            </div>
            
            <div class="closeness-score">
                <div class="closeness-label">Closeness Score</div>
                <div class="closeness-value" id="${panelId}-score">0</div>
            </div>
        `;
        
        // Add event listeners for this panel
        setTimeout(() => {
            this.setupPanelEvents(panelId);
            this.calculateCloseness(panelId);
        }, 0);
        
        return panel;
    }

    setupPanelEvents(panelId) {
        const colorPickerA = document.getElementById(`${panelId}-colorA`);
        const colorPickerB = document.getElementById(`${panelId}-colorB`);
        const hexInputA = document.getElementById(`${panelId}-hexA`);
        const hexInputB = document.getElementById(`${panelId}-hexB`);
        const eyedropperA = document.getElementById(`${panelId}-eyedropperA`);
        const eyedropperB = document.getElementById(`${panelId}-eyedropperB`);

        // Eyedropper button clicks trigger hidden color picker
        eyedropperA.addEventListener('click', () => {
            colorPickerA.click();
        });

        eyedropperB.addEventListener('click', () => {
            colorPickerB.click();
        });

        // Color picker to hex input (hidden color picker)
        colorPickerA.addEventListener('input', (e) => {
            hexInputA.value = e.target.value.toUpperCase();
            this.updateHexInputColor(hexInputA, e.target.value);
            this.calculateCloseness(panelId);
        });

        colorPickerB.addEventListener('input', (e) => {
            hexInputB.value = e.target.value.toUpperCase();
            this.updateHexInputColor(hexInputB, e.target.value);
            this.calculateCloseness(panelId);
        });

        // Hex input to color picker
        hexInputA.addEventListener('input', (e) => {
            const hex = this.validateHex(e.target.value);
            if (hex) {
                colorPickerA.value = hex;
                e.target.value = hex.toUpperCase();
                this.updateHexInputColor(e.target, hex);
                this.calculateCloseness(panelId);
            }
        });

        hexInputB.addEventListener('input', (e) => {
            const hex = this.validateHex(e.target.value);
            if (hex) {
                colorPickerB.value = hex;
                e.target.value = hex.toUpperCase();
                this.updateHexInputColor(e.target, hex);
                this.calculateCloseness(panelId);
            }
        });

        // Real-time calculation on any change
        [hexInputA, hexInputB].forEach(input => {
            input.addEventListener('blur', () => {
                const hex = this.validateHex(input.value);
                if (hex) {
                    this.updateHexInputColor(input, hex);
                }
                this.calculateCloseness(panelId);
            });
            input.addEventListener('keyup', () => {
                this.calculateCloseness(panelId);
            });
        });
        
        // Initialize colors for the default values
        this.updateHexInputColor(hexInputA, hexInputA.value);
        this.updateHexInputColor(hexInputB, hexInputB.value);
    }

    updateHexInputColor(hexInput, hexColor) {
        if (!hexColor || !this.validateHex(hexColor)) return;
        
        // Set background color
        hexInput.style.backgroundColor = hexColor;
        
        // Calculate text color for contrast
        const rgb = this.hexToRgb(hexColor);
        const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
        
        // Use white text on dark backgrounds, black text on light backgrounds
        hexInput.style.color = brightness > 128 ? '#000000' : '#ffffff';
    }

    validateHex(hex) {
        // Remove # if present
        hex = hex.replace('#', '');
        
        // Check if it's a valid hex color
        if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
            return '#' + hex.toUpperCase();
        } else if (/^[0-9A-Fa-f]{3}$/.test(hex)) {
            // Convert 3-digit hex to 6-digit
            return '#' + hex.split('').map(char => char + char).join('').toUpperCase();
        }
        
        return null;
    }

    hexToRgb(hex) {
        // Remove # if present
        hex = hex.replace('#', '');
        
        // Parse RGB components
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        
        return { r, g, b };
    }

    calculateCloseness(panelId) {
        const hexInputA = document.getElementById(`${panelId}-hexA`);
        const hexInputB = document.getElementById(`${panelId}-hexB`);
        const scoreElement = document.getElementById(`${panelId}-score`);

        const hexA = hexInputA.value;
        const hexB = hexInputB.value;

        // Validate both hex values
        if (!this.validateHex(hexA) || !this.validateHex(hexB)) {
            scoreElement.textContent = 'Invalid';
            return;
        }

        // Convert hex to RGB components
        const rgbA = this.hexToRgb(hexA);
        const rgbB = this.hexToRgb(hexB);

        // Calculate Euclidean distance: √((R₂-R₁)² + (G₂-G₁)² + (B₂-B₁)²)
        const rDiff = rgbB.r - rgbA.r;
        const gDiff = rgbB.g - rgbA.g;
        const bDiff = rgbB.b - rgbA.b;
        
        const euclideanDistance = Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
        
        // Round to 2 decimal places
        const roundedDistance = Math.round(euclideanDistance * 100) / 100;
        scoreElement.textContent = roundedDistance;

        // Add some visual feedback based on Euclidean distance
        // Max possible distance is √(255² + 255² + 255²) ≈ 441.67
        const scoreContainer = scoreElement.parentElement;
        if (euclideanDistance < 50) {
            scoreContainer.style.background = 'linear-gradient(135deg, #4CAF50, #8BC34A)';
        } else if (euclideanDistance < 150) {
            scoreContainer.style.background = 'linear-gradient(135deg, #FF9800, #FFC107)';
        } else {
            scoreContainer.style.background = 'linear-gradient(135deg, #ff6b6b, #ffa726)';
        }
    }

    deletePanel(panelId) {
        const panel = document.getElementById(panelId);
        if (panel) {
            panel.remove();
            this.panelCount--;
            
            // Show plus panel if we're below maximum
            const plusPanel = document.getElementById('plusPanel');
            if (this.panelCount < this.maxPanels) {
                plusPanel.style.display = 'flex';
            }
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.colorComparator = new ColorComparator();
});

// Add some fun interactions
document.addEventListener('DOMContentLoaded', () => {
    // Add sparkle effect on title click
    const title = document.querySelector('.main-title');
    title.addEventListener('click', () => {
        title.style.animation = 'none';
        setTimeout(() => {
            title.style.animation = 'bounce 2s infinite';
        }, 100);
    });

    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'n') {
            e.preventDefault();
            if (window.colorComparator) {
                window.colorComparator.addPanel();
            }
        }
    });
});
