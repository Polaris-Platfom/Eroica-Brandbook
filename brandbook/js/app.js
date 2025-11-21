// Eroica Brand Book - Interactive Elements
// Using Two.js for dynamic pattern generation

const colors = {
    deepCivicBlue: '#003366',
    heroicGold: '#C5A059',
    white: '#FFFFFF',
    charcoal: '#2C2C2C',
    beige: '#F5F1E8'
};

// Initialize Two.js for hero canvas (subtle background animation)
function initHeroCanvas() {
    const heroElement = document.getElementById('hero-canvas');
    if (!heroElement) return;

    const two = new Two({
        fullscreen: false,
        width: heroElement.offsetWidth,
        height: heroElement.offsetHeight
    }).appendTo(heroElement);

    // Create subtle flowing lines
    const lines = [];
    const numLines = 8;

    for (let i = 0; i < numLines; i++) {
        const y = (heroElement.offsetHeight / (numLines + 1)) * (i + 1);
        const line = two.makeCurve(
            0, y,
            two.width * 0.25, y + Math.sin(i) * 50,
            two.width * 0.5, y - Math.cos(i) * 50,
            two.width * 0.75, y + Math.sin(i + 1) * 50,
            two.width, y,
            true
        );
        
        line.stroke = colors.deepCivicBlue;
        line.linewidth = 2;
        line.noFill();
        line.opacity = 0.3;
        
        lines.push({ curve: line, offset: i * 0.5 });
    }

    // Animate
    let frameCount = 0;
    two.bind('update', function() {
        frameCount += 0.01;
        
        lines.forEach((item, index) => {
            const curve = item.curve;
            const offset = item.offset;
            
            // Animate the curve points
            curve.vertices.forEach((vertex, i) => {
                if (i > 0 && i < curve.vertices.length - 1) {
                    vertex.y += Math.sin(frameCount + offset + i) * 0.5;
                }
            });
        });
    }).play();
}

// Pattern Generators - Inspired by the 8 brand patterns
const patternGenerators = {
    // 1. Woven Civic Grid
    wovenGrid: function(two) {
        const gridSize = 40;
        const rows = Math.ceil(two.height / gridSize);
        const cols = Math.ceil(two.width / gridSize);

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = col * gridSize;
                const y = row * gridSize;
                const isCheckerboard = (row + col) % 2 === 0;

                // Horizontal lines
                for (let i = 0; i < 4; i++) {
                    const rect = two.makeRectangle(
                        x + gridSize/2, 
                        y + i * 5 + 2.5, 
                        gridSize, 
                        3
                    );
                    rect.fill = isCheckerboard ? colors.heroicGold : colors.deepCivicBlue;
                    rect.noStroke();
                    rect.opacity = 0.6;
                }

                // Vertical lines
                for (let i = 0; i < 4; i++) {
                    const rect = two.makeRectangle(
                        x + i * 5 + 2.5, 
                        y + gridSize/2, 
                        3, 
                        gridSize
                    );
                    rect.fill = isCheckerboard ? colors.deepCivicBlue : colors.heroicGold;
                    rect.noStroke();
                    rect.opacity = 0.6;
                }
            }
        }
    },

    // 2. Democratic Bloom
    bloom: function(two) {
        const spacing = 80;
        const rows = Math.ceil(two.height / spacing);
        const cols = Math.ceil(two.width / spacing);

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const centerX = col * spacing + spacing/2;
                const centerY = row * spacing + spacing/2;

                // Create 8 petals
                for (let i = 0; i < 8; i++) {
                    const angle = (Math.PI * 2 * i) / 8;
                    const petalLength = 20;
                    const petalWidth = 8;
                    
                    const x = centerX + Math.cos(angle) * petalLength;
                    const y = centerY + Math.sin(angle) * petalLength;
                    
                    const ellipse = two.makeEllipse(x, y, petalWidth, petalLength);
                    ellipse.fill = colors.heroicGold;
                    ellipse.noStroke();
                    ellipse.rotation = angle;
                    ellipse.opacity = 0.7;
                }

                // Center circle
                const center = two.makeCircle(centerX, centerY, 6);
                center.fill = colors.deepCivicBlue;
                center.noStroke();
                center.opacity = 0.8;
            }
        }
    },

    // 3. Flowing Harmony (Waves)
    flowingWaves: function(two) {
        const waveHeight = 60;
        const numWaves = Math.ceil(two.height / waveHeight) + 2;

        for (let i = 0; i < numWaves; i++) {
            const y = i * waveHeight - waveHeight;
            const points = [];
            const numPoints = 50;

            for (let j = 0; j <= numPoints; j++) {
                const x = (j / numPoints) * two.width;
                const waveY = y + Math.sin((j / numPoints) * Math.PI * 3 + i * 0.5) * 15;
                points.push(new Two.Anchor(x, waveY));
            }

            const wave = two.makeCurve(points, false);
            wave.stroke = i % 2 === 0 ? colors.deepCivicBlue : colors.heroicGold;
            wave.linewidth = 8;
            wave.noFill();
            wave.opacity = 0.6;
            wave.cap = 'round';
        }
    },

    // 4. Symphonic Rise (Diagonal Waves)
    symphonicRise: function(two) {
        const spacing = 80;
        const numWaves = 15;

        for (let i = 0; i < numWaves; i++) {
            const points = [];
            const numPoints = 30;
            const offset = i * 30;

            for (let j = 0; j <= numPoints; j++) {
                const x = (j / numPoints) * (two.width + 200) - 100;
                const y = (j / numPoints) * two.height + offset - two.height * 0.5;
                const waveY = y + Math.sin((j / numPoints) * Math.PI * 2) * 20;
                points.push(new Two.Anchor(x, waveY));
            }

            const wave = two.makeCurve(points, false);
            wave.stroke = i % 2 === 0 ? colors.heroicGold : colors.deepCivicBlue;
            wave.linewidth = 12;
            wave.noFill();
            wave.opacity = 0.5;
            wave.cap = 'round';
        }
    },

    // 5. Interwoven Voices
    interwoven: function(two) {
        const spacing = 60;
        
        // Horizontal waves
        const rowsH = Math.ceil(two.height / spacing) + 1;
        for (let i = 0; i < rowsH; i++) {
            const y = i * spacing;
            const points = [];
            const numPoints = 40;

            for (let j = 0; j <= numPoints; j++) {
                const x = (j / numPoints) * two.width;
                const waveY = y + Math.sin((j / numPoints) * Math.PI * 4) * 10;
                points.push(new Two.Anchor(x, waveY));
            }

            const wave = two.makeCurve(points, false);
            wave.stroke = i % 3 === 0 ? colors.heroicGold : colors.deepCivicBlue;
            wave.linewidth = 6;
            wave.noFill();
            wave.opacity = 0.6;
        }

        // Vertical waves
        const colsV = Math.ceil(two.width / spacing) + 1;
        for (let i = 0; i < colsV; i++) {
            const x = i * spacing;
            const points = [];
            const numPoints = 40;

            for (let j = 0; j <= numPoints; j++) {
                const y = (j / numPoints) * two.height;
                const waveX = x + Math.sin((j / numPoints) * Math.PI * 4) * 10;
                points.push(new Two.Anchor(waveX, y));
            }

            const wave = two.makeCurve(points, false);
            wave.stroke = i % 3 === 0 ? colors.deepCivicBlue : colors.heroicGold;
            wave.linewidth = 6;
            wave.noFill();
            wave.opacity = 0.4;
        }
    },

    // 6. Spiral Participation
    spirals: function(two) {
        const spacing = 80;
        const rows = Math.ceil(two.height / spacing);
        const cols = Math.ceil(two.width / spacing);

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const centerX = col * spacing + spacing/2;
                const centerY = row * spacing + spacing/2;
                const points = [];
                const numPoints = 60;

                for (let i = 0; i <= numPoints; i++) {
                    const t = (i / numPoints) * Math.PI * 3;
                    const r = (i / numPoints) * 25;
                    const x = centerX + Math.cos(t) * r;
                    const y = centerY + Math.sin(t) * r;
                    points.push(new Two.Anchor(x, y));
                }

                const spiral = two.makeCurve(points, false);
                spiral.stroke = (row + col) % 2 === 0 ? colors.deepCivicBlue : colors.heroicGold;
                spiral.linewidth = 4;
                spiral.noFill();
                spiral.opacity = 0.6;
            }
        }
    },

    // 7. Collective Pulse (Vertical undulating lines)
    pulse: function(two) {
        const spacing = 60;
        const cols = Math.ceil(two.width / spacing) + 1;

        for (let i = 0; i < cols; i++) {
            const x = i * spacing;
            const points = [];
            const numPoints = 50;

            for (let j = 0; j <= numPoints; j++) {
                const y = (j / numPoints) * two.height;
                const waveX = x + Math.sin((j / numPoints) * Math.PI * 6 + i * 0.5) * 8;
                points.push(new Two.Anchor(waveX, y));
            }

            const line = two.makeCurve(points, false);
            line.stroke = i % 2 === 0 ? colors.deepCivicBlue : colors.heroicGold;
            line.linewidth = 6;
            line.noFill();
            line.opacity = 0.5 - (i % 5) * 0.05;
            line.cap = 'round';
        }
    },

    // 8. Heroic Momentum (Bold diagonal waves)
    momentum: function(two) {
        const numWaves = 10;
        
        for (let i = 0; i < numWaves; i++) {
            const points = [];
            const numPoints = 40;
            const yOffset = (i / numWaves) * two.height;

            for (let j = 0; j <= numPoints; j++) {
                const x = (j / numPoints) * two.width;
                const y = yOffset + Math.sin((j / numPoints) * Math.PI * 3) * 30;
                points.push(new Two.Anchor(x, y));
            }

            const wave = two.makeCurve(points, false);
            wave.stroke = i % 2 === 0 ? colors.deepCivicBlue : colors.heroicGold;
            wave.linewidth = 14;
            wave.noFill();
            wave.opacity = 0.6;
            wave.cap = 'round';
        }
    },

    // 9. Radial Symphony (Circular radiating patterns)
    radialSymphony: function(two) {
        const centerX = two.width / 2;
        const centerY = two.height / 2;
        const numRings = 12;
        const maxRadius = Math.min(two.width, two.height) * 0.5;

        for (let i = 0; i < numRings; i++) {
            const radius = (maxRadius / numRings) * (i + 1);
            const numPoints = 60;
            const points = [];

            for (let j = 0; j <= numPoints; j++) {
                const angle = (j / numPoints) * Math.PI * 2;
                const r = radius + Math.sin(angle * 3 + i) * 15;
                const x = centerX + Math.cos(angle) * r;
                const y = centerY + Math.sin(angle) * r;
                points.push(new Two.Anchor(x, y));
            }

            const ring = two.makeCurve(points, true);
            ring.stroke = i % 2 === 0 ? colors.deepCivicBlue : colors.heroicGold;
            ring.linewidth = 2;
            ring.noFill();
            ring.opacity = 0.4 - (i * 0.02);
        }

        // Add radiating lines
        const numLines = 16;
        for (let i = 0; i < numLines; i++) {
            const angle = (Math.PI * 2 * i) / numLines;
            const startR = maxRadius * 0.3;
            const endR = maxRadius * 0.9;
            
            const x1 = centerX + Math.cos(angle) * startR;
            const y1 = centerY + Math.sin(angle) * startR;
            const x2 = centerX + Math.cos(angle) * endR;
            const y2 = centerY + Math.sin(angle) * endR;

            const line = two.makeLine(x1, y1, x2, y2);
            line.stroke = colors.deepCivicBlue;
            line.linewidth = 1;
            line.opacity = 0.2;
        }
    },

    // 10. Circular Flow (Inspired by the symbol)
    circularFlow: function(two) {
        const spacing = 100;
        const rows = Math.ceil(two.height / spacing);
        const cols = Math.ceil(two.width / spacing);

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const centerX = col * spacing + spacing/2;
                const centerY = row * spacing + spacing/2;

                // Create flowing curves inside circle
                const outerCircle = two.makeCircle(centerX, centerY, 35);
                outerCircle.stroke = colors.deepCivicBlue;
                outerCircle.linewidth = 2;
                outerCircle.noFill();
                outerCircle.opacity = 0.5;

                // Inner spiral curves
                for (let s = 0; s < 3; s++) {
                    const points = [];
                    const numPoints = 30;
                    
                    for (let i = 0; i <= numPoints; i++) {
                        const t = (i / numPoints) * Math.PI * 2;
                        const r = 10 + (i / numPoints) * 20 + s * 5;
                        const x = centerX + Math.cos(t * 2 + s) * r;
                        const y = centerY + Math.sin(t * 2 + s) * r;
                        points.push(new Two.Anchor(x, y));
                    }

                    const curve = two.makeCurve(points, false);
                    curve.stroke = s % 2 === 0 ? colors.heroicGold : colors.deepCivicBlue;
                    curve.linewidth = 3;
                    curve.noFill();
                    curve.opacity = 0.6;
                }
            }
        }
    }
};

// Initialize Two.js for pattern canvas (dynamic pattern generation)
let currentPatternIndex = 0;
const patternNames = Object.keys(patternGenerators);

function initPatternCanvas() {
    const patternElement = document.getElementById('pattern-canvas');
    if (!patternElement) return;

    let two = new Two({
        fullscreen: false,
        width: patternElement.offsetWidth,
        height: patternElement.offsetHeight
    }).appendTo(patternElement);

    function generatePattern() {
        two.clear();

        // Set background
        const bg = two.makeRectangle(two.width / 2, two.height / 2, two.width, two.height);
        bg.fill = colors.beige;
        bg.noStroke();

        // Generate current pattern
        const patternName = patternNames[currentPatternIndex];
        patternGenerators[patternName](two);

        // Cycle to next pattern
        currentPatternIndex = (currentPatternIndex + 1) % patternNames.length;

        two.update();
    }

    generatePattern();

    // Regenerate button
    const regenButton = document.getElementById('regen-pattern');
    if (regenButton) {
        regenButton.addEventListener('click', generatePattern);
    }

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            two.width = patternElement.offsetWidth;
            two.height = patternElement.offsetHeight;
            two.renderer.setSize(two.width, two.height);
            generatePattern();
        }, 250);
    });
}

// Smooth scroll for navigation
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.brand-nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Fade-in animation on scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements that should animate in
    const animatedElements = document.querySelectorAll('.color-card, .app-card, .pattern-item, .arch-card-detailed, .variant-card, .subbrand-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Two.js canvases
    initHeroCanvas();
    initPatternCanvas();
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Initialize scroll animations
    initScrollAnimations();

    // Log welcome message
    console.log('%c⚡ Eroica Brand Book', 'font-size: 20px; font-weight: bold; color: #003366;');
    console.log('%cThe Democratic Symphony', 'font-size: 14px; color: #C5A059;');
    console.log('%c' + patternNames.length + ' dynamic patterns available', 'font-size: 12px; color: #666;');
});
