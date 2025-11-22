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

    // Create symphonic undulating lines
    const lines = [];
    const numLines = 6;

    for (let i = 0; i < numLines; i++) {
        const points = [];
        const numPoints = 30;
        for (let j = 0; j <= numPoints; j++) {
            points.push(new Two.Anchor(0, 0));
        }
        
        const line = two.makeCurve(points, true);
        line.stroke = i % 2 === 0 ? colors.deepCivicBlue : colors.heroicGold;
        line.linewidth = 1.5;
        line.noFill();
        line.opacity = 0.15;
        
        lines.push({ 
            curve: line, 
            phase: Math.random() * Math.PI * 2,
            speed: 0.002 + Math.random() * 0.002,
            amplitude: 30 + Math.random() * 40,
            yBase: (heroElement.offsetHeight / (numLines + 1)) * (i + 1)
        });
    }

    // Animate
    let time = 0;
    two.bind('update', function() {
        time += 1;
        
        lines.forEach((item, index) => {
            const curve = item.curve;
            const yBase = item.yBase;
            
            // Animate the curve points
            curve.vertices.forEach((vertex, i) => {
                const x = (i / (curve.vertices.length - 1)) * two.width;
                const wave = Math.sin(x * 0.005 + time * item.speed + item.phase);
                const wave2 = Math.cos(x * 0.01 - time * item.speed * 0.5);
                
                vertex.x = x;
                vertex.y = yBase + wave * item.amplitude + wave2 * 20;
            });
        });
    }).play();
}

// Pattern Generators - Inspired by the 8 brand patterns
const patternGenerators = {
    // 1. Woven Civic Grid (Stylized)
    wovenGrid: function(two) {
        const gridSize = 50;
        const rows = Math.ceil(two.height / gridSize) + 1;
        const cols = Math.ceil(two.width / gridSize) + 1;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = col * gridSize;
                const y = row * gridSize;
                const isCheckerboard = (row + col) % 2 === 0;

                if (Math.random() > 0.8) continue; // Create negative space

                const cx = x + gridSize/2;
                const cy = y + gridSize/2;
                
                // Create stylized weave
                const curve = two.makeCurve(
                    x, cy,
                    cx, cy - (isCheckerboard ? 10 : -10),
                    x + gridSize, cy,
                    true
                );
                
                curve.noFill();
                curve.stroke = isCheckerboard ? colors.heroicGold : colors.deepCivicBlue;
                curve.linewidth = 2;
                curve.opacity = 0.5;
                
                if (Math.random() > 0.5) {
                    const vCurve = two.makeCurve(
                        cx, y,
                        cx + (isCheckerboard ? 10 : -10), cy,
                        cx, y + gridSize,
                        true
                    );
                    vCurve.noFill();
                    vCurve.stroke = isCheckerboard ? colors.deepCivicBlue : colors.heroicGold;
                    vCurve.linewidth = 2;
                    vCurve.opacity = 0.5;
                }
            }
        }
    },

    // 2. Democratic Bloom (Stylized)
    bloom: function(two) {
        const numBlooms = 15;
        
        for (let i = 0; i < numBlooms; i++) {
            const cx = Math.random() * two.width;
            const cy = Math.random() * two.height;
            const scale = 0.5 + Math.random();
            const numPetals = 8 + Math.floor(Math.random() * 4);
            
            const group = two.makeGroup();
            
            for (let j = 0; j < numPetals; j++) {
                const angle = (Math.PI * 2 * j) / numPetals;
                const length = 40 * scale;
                
                const petal = two.makeCurve(
                    0, 0,
                    Math.cos(angle - 0.2) * length * 0.5, Math.sin(angle - 0.2) * length * 0.5,
                    Math.cos(angle) * length, Math.sin(angle) * length,
                    Math.cos(angle + 0.2) * length * 0.5, Math.sin(angle + 0.2) * length * 0.5,
                    0, 0,
                    true
                );
                
                petal.fill = "none";
                petal.stroke = Math.random() > 0.5 ? colors.heroicGold : colors.deepCivicBlue;
                petal.linewidth = 1.5;
                petal.opacity = 0.6;
                group.add(petal);
            }
            
            group.translation.set(cx, cy);
            group.rotation = Math.random() * Math.PI;
        }
    },

    // 3. Flowing Harmony (Waves - Stylized)
    flowingWaves: function(two) {
        const numWaves = 20;
        
        for (let i = 0; i < numWaves; i++) {
            const yBase = (two.height / numWaves) * i;
            const points = [];
            const numPoints = 20;
            const amplitude = 20 + Math.random() * 30;
            const freq = 2 + Math.random() * 2;
            const phase = Math.random() * Math.PI * 2;
            
            for (let j = 0; j <= numPoints; j++) {
                const x = (two.width / numPoints) * j;
                const t = j / numPoints;
                const y = yBase + Math.sin(t * Math.PI * freq + phase) * amplitude * (1 - Math.abs(0.5 - t)); // Taper edges
                points.push(new Two.Anchor(x, y));
            }
            
            const wave = two.makeCurve(points, true);
            wave.noFill();
            wave.stroke = Math.random() > 0.6 ? colors.heroicGold : colors.deepCivicBlue;
            wave.linewidth = 1 + Math.random() * 2;
            wave.opacity = 0.4 + Math.random() * 0.4;
        }
    },

    // 4. Symphonic Rise (Diagonal - Stylized)
    symphonicRise: function(two) {
        const numLines = 25;
        
        for (let i = 0; i < numLines; i++) {
            const xStart = -100 + Math.random() * two.width;
            const points = [];
            const numPoints = 20;
            
            for (let j = 0; j <= numPoints; j++) {
                const t = j / numPoints;
                const x = xStart + t * 400 + Math.sin(t * 10) * 20;
                const y = two.height - t * two.height * 1.2 + Math.cos(t * 5) * 30;
                points.push(new Two.Anchor(x, y));
            }
            
            const line = two.makeCurve(points, true);
            line.noFill();
            line.stroke = Math.random() > 0.7 ? colors.heroicGold : colors.deepCivicBlue;
            line.linewidth = 1 + Math.random() * 3;
            line.opacity = 0.3 + Math.random() * 0.5;
        }
    },

    // 5. Interwoven Voices (Stylized)
    interwoven: function(two) {
        const numVoices = 12;
        
        for (let i = 0; i < numVoices; i++) {
            const points = [];
            const numPoints = 30;
            const isHorizontal = Math.random() > 0.5;
            
            if (isHorizontal) {
                const yBase = Math.random() * two.height;
                for (let j = 0; j <= numPoints; j++) {
                    const x = (two.width / numPoints) * j;
                    const y = yBase + Math.sin(j * 0.5) * 40 * Math.sin(j * 0.1);
                    points.push(new Two.Anchor(x, y));
                }
            } else {
                const xBase = Math.random() * two.width;
                for (let j = 0; j <= numPoints; j++) {
                    const y = (two.height / numPoints) * j;
                    const x = xBase + Math.sin(j * 0.5) * 40 * Math.sin(j * 0.1);
                    points.push(new Two.Anchor(x, y));
                }
            }
            
            const voice = two.makeCurve(points, true);
            voice.noFill();
            voice.stroke = Math.random() > 0.5 ? colors.deepCivicBlue : colors.heroicGold;
            voice.linewidth = 2;
            voice.opacity = 0.5;
        }
    },

    // 6. Spiral Participation (Stylized)
    spirals: function(two) {
        const numSpirals = 8;
        
        for (let i = 0; i < numSpirals; i++) {
            const cx = Math.random() * two.width;
            const cy = Math.random() * two.height;
            const maxR = 50 + Math.random() * 100;
            const points = [];
            const numPoints = 100;
            
            for (let j = 0; j <= numPoints; j++) {
                const t = j / numPoints;
                const angle = t * Math.PI * 8;
                const r = t * maxR;
                const x = cx + Math.cos(angle) * r;
                const y = cy + Math.sin(angle) * r;
                points.push(new Two.Anchor(x, y));
            }
            
            const spiral = two.makeCurve(points, true);
            spiral.noFill();
            spiral.stroke = colors.deepCivicBlue;
            spiral.linewidth = 1.5;
            spiral.opacity = 0.4;
            
            // Add gold accent
            if (Math.random() > 0.6) {
                const accent = two.makeCircle(cx, cy, 4);
                accent.fill = colors.heroicGold;
                accent.noStroke();
            }
        }
    },

    // 7. Collective Pulse (Stylized)
    pulse: function(two) {
        const numLines = 30;
        const cx = two.width / 2;
        
        for (let i = 0; i < numLines; i++) {
            const x = (two.width / numLines) * i;
            const points = [];
            const numPoints = 20;
            const distFromCenter = Math.abs(x - cx) / (two.width/2);
            const amplitude = 50 * (1 - distFromCenter); // More movement in center
            
            for (let j = 0; j <= numPoints; j++) {
                const y = (two.height / numPoints) * j;
                const waveX = x + Math.sin(j * 0.5 + i * 0.2) * amplitude;
                points.push(new Two.Anchor(waveX, y));
            }
            
            const line = two.makeCurve(points, true);
            line.noFill();
            line.stroke = Math.random() > 0.8 ? colors.heroicGold : colors.deepCivicBlue;
            line.linewidth = 1 + (1 - distFromCenter) * 2;
            line.opacity = 0.3 + (1 - distFromCenter) * 0.4;
        }
    },

    // 8. Heroic Momentum (Stylized)
    momentum: function(two) {
        const numShapes = 15;
        
        for (let i = 0; i < numShapes; i++) {
            const x = Math.random() * two.width;
            const y = Math.random() * two.height;
            const size = 50 + Math.random() * 100;
            
            const points = [
                new Two.Anchor(x, y + size),
                new Two.Anchor(x + size * 0.5, y + size * 0.5),
                new Two.Anchor(x + size, y),
                new Two.Anchor(x + size * 0.5, y - size * 0.2),
                new Two.Anchor(x, y)
            ];
            
            const shape = two.makeCurve(points, true);
            shape.noFill();
            shape.stroke = Math.random() > 0.7 ? colors.heroicGold : colors.deepCivicBlue;
            shape.linewidth = 2 + Math.random() * 4;
            shape.opacity = 0.4;
            shape.rotation = -Math.PI / 4;
        }
    },

    // 9. Radial Symphony (Stylized)
    radialSymphony: function(two) {
        const cx = two.width / 2;
        const cy = two.height / 2;
        const numRings = 20;
        
        for (let i = 0; i < numRings; i++) {
            const r = 20 + i * 15;
            const points = [];
            const numPoints = 60;
            const noise = 5 + Math.sin(i * 0.5) * 10;
            
            for (let j = 0; j <= numPoints; j++) {
                const angle = (Math.PI * 2 * j) / numPoints;
                const radius = r + Math.sin(angle * 5) * noise;
                const x = cx + Math.cos(angle) * radius;
                const y = cy + Math.sin(angle) * radius;
                points.push(new Two.Anchor(x, y));
            }
            
            const ring = two.makeCurve(points, true); // Closed curve
            ring.noFill();
            ring.stroke = i % 3 === 0 ? colors.heroicGold : colors.deepCivicBlue;
            ring.linewidth = 1;
            ring.opacity = 0.3 + (1 - i/numRings) * 0.4;
        }
    },

    // 10. Circular Flow (Stylized)
    circularFlow: function(two) {
        const numGroups = 5;
        
        for (let i = 0; i < numGroups; i++) {
            const cx = Math.random() * two.width;
            const cy = Math.random() * two.height;
            const r = 40 + Math.random() * 60;
            
            for (let j = 0; j < 5; j++) {
                const startAngle = Math.random() * Math.PI * 2;
                const endAngle = startAngle + Math.PI + Math.random();
                
                const arc = two.makeArcSegment(cx, cy, r - j*5, r - j*5, startAngle, endAngle);
                arc.noFill();
                arc.stroke = Math.random() > 0.5 ? colors.deepCivicBlue : colors.heroicGold;
                arc.linewidth = 2;
                arc.opacity = 0.6;
                arc.cap = 'round';
            }
        }
    }
};

// Initialize Static Pattern Previews
function initPatternPreviews() {
    const previewMap = [
        { id: 'pattern-1', generator: 'wovenGrid' },
        { id: 'pattern-2', generator: 'bloom' },
        { id: 'pattern-3', generator: 'flowingWaves' },
        { id: 'pattern-4', generator: 'symphonicRise' },
        { id: 'pattern-5', generator: 'interwoven' },
        { id: 'pattern-6', generator: 'spirals' },
        { id: 'pattern-7', generator: 'pulse' },
        { id: 'pattern-8', generator: 'momentum' }
    ];

    previewMap.forEach(item => {
        const element = document.getElementById(item.id);
        if (!element) return;

        // Clear existing background image via JS and set base color
        element.style.backgroundImage = 'none';
        element.style.backgroundColor = '#F5F1E8'; // Beige to match brand

        const two = new Two({
            width: element.offsetWidth,
            height: element.offsetHeight,
            type: Two.Types.svg // Explicitly use SVG for crisp rendering
        }).appendTo(element);

        // Generate the pattern
        if (patternGenerators[item.generator]) {
            patternGenerators[item.generator](two);
        }
        
        two.update();
    });
}

// Initialize Two.js for pattern canvas (dynamic pattern generation)
let currentPatternIndex = 0;
const patternNames = Object.keys(patternGenerators);
let patternTwo = null; // Global reference for download

function initPatternCanvas() {
    const patternElement = document.getElementById('pattern-canvas');
    if (!patternElement) return;

    patternTwo = new Two({
        fullscreen: false,
        width: patternElement.offsetWidth,
        height: patternElement.offsetHeight
    }).appendTo(patternElement);

    function generatePattern() {
        patternTwo.clear();

        // Set background
        const bg = patternTwo.makeRectangle(patternTwo.width / 2, patternTwo.height / 2, patternTwo.width, patternTwo.height);
        bg.fill = colors.beige;
        bg.noStroke();

        // Generate current pattern
        const patternName = patternNames[currentPatternIndex];
        patternGenerators[patternName](patternTwo);

        // Cycle to next pattern
        currentPatternIndex = (currentPatternIndex + 1) % patternNames.length;

        patternTwo.update();
    }

    generatePattern();

    // Regenerate button
    const regenButton = document.getElementById('regen-pattern');
    if (regenButton) {
        regenButton.addEventListener('click', generatePattern);
    }

    // Download SVG button
    const downloadSvgButton = document.getElementById('download-svg');
    if (downloadSvgButton) {
        downloadSvgButton.addEventListener('click', function() {
            downloadPatternSVG();
        });
    }

    // Download PNG button
    const downloadPngButton = document.getElementById('download-png');
    if (downloadPngButton) {
        downloadPngButton.addEventListener('click', function() {
            downloadPatternPNG();
        });
    }

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            patternTwo.width = patternElement.offsetWidth;
            patternTwo.height = patternElement.offsetHeight;
            patternTwo.renderer.setSize(patternTwo.width, patternTwo.height);
            generatePattern();
        }, 250);
    });
}

// Download pattern as SVG
function downloadPatternSVG() {
    if (!patternTwo) return;
    
    const svgElement = patternTwo.renderer.domElement;
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = `eroica-pattern-${Date.now()}.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(svgUrl);
}

// Download pattern as high-resolution PNG (4K)
function downloadPatternPNG() {
    if (!patternTwo) return;
    
    // Create a high-res version
    const scale = 4; // 4x resolution for 4K quality
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    document.body.appendChild(tempDiv);
    
    const highResTwo = new Two({
        fullscreen: false,
        width: patternTwo.width * scale,
        height: patternTwo.height * scale,
        type: Two.Types.canvas
    }).appendTo(tempDiv);
    
    // Set background
    const bg = highResTwo.makeRectangle(
        highResTwo.width / 2, 
        highResTwo.height / 2, 
        highResTwo.width, 
        highResTwo.height
    );
    bg.fill = colors.beige;
    bg.noStroke();
    
    // Recreate current pattern at high resolution
    const currentPatternName = patternNames[(currentPatternIndex - 1 + patternNames.length) % patternNames.length];
    
    // Scale up the pattern
    const originalWidth = patternTwo.width;
    const originalHeight = patternTwo.height;
    patternTwo.width = highResTwo.width;
    patternTwo.height = highResTwo.height;
    
    patternGenerators[currentPatternName](highResTwo);
    
    // Restore original dimensions
    patternTwo.width = originalWidth;
    patternTwo.height = originalHeight;
    
    highResTwo.update();
    
    // Convert to PNG
    const canvas = highResTwo.renderer.domElement;
    canvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = `eroica-pattern-4k-${Date.now()}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(url);
        
        // Cleanup
        document.body.removeChild(tempDiv);
    }, 'image/png', 1.0);
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

// Email Template Logic
function initEmailTemplate() {
    const emailCodeTextarea = document.getElementById('email-code');
    const copyBtn = document.getElementById('copy-email-btn');

    if (emailCodeTextarea && copyBtn) {
        // Try to fetch the template content
        fetch('email-template.html')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.text();
            })
            .then(html => {
                emailCodeTextarea.value = html;
            })
            .catch(err => {
                console.warn('Failed to load email template automatically (likely due to CORS on local file system):', err);
                emailCodeTextarea.value = '<!-- Content could not be loaded automatically due to browser security restrictions (CORS). -->\n<!-- Please open "email-template.html" directly to view the source code. -->';
            });

        copyBtn.addEventListener('click', function() {
            emailCodeTextarea.select();
            document.execCommand('copy');
            
            const originalText = this.innerText;
            this.innerText = 'Copied!';
            this.style.background = '#C5A059'; // Heroic Gold
            this.style.color = '#003366';
            
            setTimeout(() => {
                this.innerText = originalText;
                this.style.background = '';
                this.style.color = '';
            }, 2000);
        });
    }
}

// Dynamic Logo Animation
function initDynamicLogo() {
    const suffixElement = document.getElementById('logo-suffix');
    if (!suffixElement) return;

    const subBrands = [
        { text: 'PLATFORM', color: colors.deepCivicBlue },
        { text: 'LABS', color: colors.labsBlue || '#2E5BFF' }, // Fallback if colors.labsBlue isn't defined
        { text: 'FOUNDATION', color: colors.foundationCrimson || '#B22222' }, // Fallback
        { text: '', color: 'transparent' } // Empty state (just Eroica)
    ];

    let currentIndex = 0;

    function updateLogo() {
        // Fade out
        suffixElement.style.opacity = '0';
        suffixElement.style.transform = 'translateX(-20px)';

        setTimeout(() => {
            // Update content
            const brand = subBrands[currentIndex];
            suffixElement.textContent = brand.text;
            suffixElement.style.color = brand.color;

            // Fade in
            if (brand.text !== '') {
                suffixElement.style.opacity = '1';
                suffixElement.style.transform = 'translateX(0)';
            }
            
            // Move to next index
            currentIndex = (currentIndex + 1) % subBrands.length;

        }, 800); // Wait for fade out
    }

    // Initial delay then start loop
    setTimeout(() => {
        updateLogo();
        setInterval(updateLogo, 4000); // Change every 4 seconds
    }, 1000);
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Two.js canvases
    initHeroCanvas();
    initPatternCanvas();
    initPatternPreviews();
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize Email Template
    initEmailTemplate();

    // Initialize Dynamic Logo
    initDynamicLogo();

    // Log welcome message
    console.log('%c⚡ Eroica Brand Book', 'font-size: 20px; font-weight: bold; color: #003366;');
    console.log('%cThe Democratic Symphony', 'font-size: 14px; color: #C5A059;');
    console.log('%c' + patternNames.length + ' dynamic patterns available', 'font-size: 12px; color: #666;');
});

// --- Download Helpers ---

window.downloadAsset = function(url, filename) {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

window.downloadAssetAsPng = function(url, filename) {
    const img = new Image();
    img.onload = function() {
        const canvas = document.createElement('canvas');
        // Set high resolution
        const scale = 4; 
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext('2d');
        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob(function(blob) {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }, 'image/png');
    };
    // Prevent caching issues with fetch if needed, though local relative path usually fine
    img.src = url; 
};

window.downloadWordmark = function(format) {
    // Create SVG string for wordmark
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" width="300" height="100">
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="'Didot', 'Bodoni MT', 'Playfair Display', serif" font-size="60" font-weight="bold" fill="#000000">Eroica</text>
    </svg>`;
    
    if (format === 'svg') {
        const blob = new Blob([svgString], {type: 'image/svg+xml'});
        const url = URL.createObjectURL(blob);
        window.downloadAsset(url, 'eroica-wordmark.svg');
        URL.revokeObjectURL(url);
    } else if (format === 'png') {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const scale = 4;
            canvas.width = 300 * scale;
            canvas.height = 100 * scale;
            const ctx = canvas.getContext('2d');
            ctx.scale(scale, scale);
            ctx.drawImage(img, 0, 0);
            
            canvas.toBlob(function(blob) {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'eroica-wordmark.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }, 'image/png');
        };
        img.src = 'data:image/svg+xml;base64,' + btoa(svgString);
    }
};
