
    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', () => {
        // Photo upload functionality
        const profilePhoto = document.querySelector('.profile-photo');
        const profileImage = document.getElementById('profileImage');
        if (profilePhoto && profileImage) {
            profilePhoto.addEventListener('click', () => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';

                input.onchange = (e) => {
                    const file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            profileImage.src = e.target.result;
                        };
                        reader.readAsDataURL(file);
                    }
                };

                input.click();
            });
        }

        // Theme toggle functionality
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;

        let currentTheme = 'light';
        body.setAttribute('data-theme', currentTheme);

        function updateToggleIcon(theme) {
            if (themeToggle) {
                themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
            }
        }

        updateToggleIcon(currentTheme);

        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = body.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

                body.setAttribute('data-theme', newTheme);
                updateToggleIcon(newTheme);
            });
        }

        // Navbar scroll effect
        const navbar = document.getElementById('navbar');
        if (navbar) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        }

        // Neural Network Animation
        function createNeuralNetwork() {
            const container = document.getElementById('neuralNetwork');
            if (!container) return;
            const layers = [4, 6, 6, 3]; // nodes per layer
            const layerSpacing = 100;
            const nodeSpacing = 60;

            // Clear existing content
            container.innerHTML = '';

            layers.forEach((nodeCount, layerIndex) => {
                const startY = (400 - (nodeCount - 1) * nodeSpacing) / 2;

                for (let nodeIndex = 0; nodeIndex < nodeCount; nodeIndex++) {
                    const node = document.createElement('div');
                    node.className = 'neural-node';
                    node.style.left = `${layerIndex * layerSpacing + 50}px`;
                    node.style.top = `${startY + nodeIndex * nodeSpacing}px`;
                    node.style.animationDelay = `${(layerIndex * nodeCount + nodeIndex) * 0.1}s`;
                    container.appendChild(node);

                    // Create connections to next layer
                    if (layerIndex < layers.length - 1) {
                        const nextLayerNodes = layers[layerIndex + 1];
                        const nextStartY = (400 - (nextLayerNodes - 1) * nodeSpacing) / 2;

                        for (let nextNodeIndex = 0; nextNodeIndex < nextLayerNodes; nextNodeIndex++) {
                            const connection = document.createElement('div');
                            connection.className = 'neural-connection';

                            const x1 = layerIndex * layerSpacing + 70;
                            const y1 = startY + nodeIndex * nodeSpacing + 10;
                            const x2 = (layerIndex + 1) * layerSpacing + 50;
                            const y2 = nextStartY + nextNodeIndex * nodeSpacing + 10;

                            const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
                            const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

                            connection.style.left = `${x1}px`;
                            connection.style.top = `${y1}px`;
                            connection.style.width = `${length}px`;
                            connection.style.transform = `rotate(${angle}deg)`;
                            connection.style.animationDelay = `${Math.random() * 2}s`;

                            container.appendChild(connection);
                        }
                    }
                }
            });
        }

        // Initialize neural network
        createNeuralNetwork();

        // Chart functionality
        const chartButtons = document.querySelectorAll('.chart-btn');
        const chartDisplay = document.getElementById('chartDisplay');

        const chartData = {
            accuracy: `
📈 Model Accuracy Over Time
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Epoch 1:  ████████░░ 82.3%
Epoch 5:  ███████████░ 89.7%
Epoch 10: ████████████ 94.2%
Epoch 15: ████████████ 96.8%
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 Final Validation Accuracy: 96.8%
            `,
            loss: `
📉 Training Loss Curve
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Initial Loss: 2.847
████████████████████████████
██████████████████████░░░░░░
████████████████████░░░░░░░░
██████████████████░░░░░░░░░░
████████████████░░░░░░░░░░░░
██████████████░░░░░░░░░░░░░░
████████████░░░░░░░░░░░░░░░░
Final Loss: 0.143
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            `,
            performance: `
🔍 Model Performance Metrics
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Precision:    94.2% ████████████████████
Recall:       96.8% ████████████████████
F1-Score:     95.4% ████████████████████
AUC-ROC:      98.1% ████████████████████
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 Production Ready: ✅
⚡ Inference Time: 12ms
            `
        };

        if (chartButtons.length && chartDisplay) {
            chartButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    chartButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    const chartType = btn.getAttribute('data-chart');
                    chartDisplay.innerHTML = `<pre style="font-family: monospace; font-size: 0.9rem; line-height: 1.4; white-space: pre;">${chartData[chartType]}</pre>`;
                });
            });

            // Initialize first chart
            chartDisplay.innerHTML = `<pre style="font-family: monospace; font-size: 0.9rem; line-height: 1.4; white-space: pre;">${chartData.accuracy}</pre>`;
        }

        // Contact form handling
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();

                const formData = new FormData(e.target);
                const name = formData.get('name');
                const email = formData.get('email');
                const project = formData.get('project');
                const message = formData.get('message');

                alert(`Thanks ${name}! I'm excited about your ${project || 'ML'} project. I'll review your message and get back to you within 24 hours!`);
                e.target.reset();
            });
        }

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.project-card, .skill-category, .chart-container').forEach(el => {
            observer.observe(el);
        });
    });