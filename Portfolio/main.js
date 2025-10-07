// Main JavaScript functionality for Mahmoud Khalil's CV Website
// Professional interactive CV with modern animations and data visualizations

class CVWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeAnimations();
        this.setupInteractiveElements();
        this.initializeCharts();
        this.setupScrollEffects();
    }

    setupEventListeners() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Mobile menu toggle
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (mobileMenuToggle && mobileMenu) {
            mobileMenuToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
            });
        }

        // Contact form handling
        const contactForm = document.querySelector('#contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleContactForm.bind(this));
        }

        // Window resize handler
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    initializeAnimations() {
        // Initialize Typed.js for hero text
        if (document.querySelector('.typed-text')) {
            new Typed('.typed-text', {
                strings: [
                    'International Finance Expert',
                    'Strategic Financial Advisor', 
                    'Community Engagement Specialist',
                    'Results-Driven Professional'
                ],
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 2000,
                loop: true,
                showCursor: true,
                cursorChar: '|'
            });
        }

        // Initialize Splitting.js for text animations
        if (typeof Splitting !== 'undefined') {
            Splitting();
        }

        // Animate elements on scroll
        this.setupScrollAnimations();
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    setupInteractiveElements() {
        // Skills cards hover effects
        document.querySelectorAll('.skill-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                anime({
                    targets: card,
                    scale: 1.05,
                    rotateY: 5,
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            });

            card.addEventListener('mouseleave', () => {
                anime({
                    targets: card,
                    scale: 1,
                    rotateY: 0,
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            });
        });

        // Timeline items interaction
        document.querySelectorAll('.timeline-item').forEach(item => {
            item.addEventListener('click', () => {
                this.expandTimelineItem(item);
            });
        });

        // Portfolio filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterPortfolio(e.target.dataset.filter);
            });
        });
    }

    initializeCharts() {
        // Skills radar chart
        this.createSkillsRadarChart();
        
        // Achievement metrics chart
        this.createAchievementChart();
        
        // Career progression chart
        this.createCareerChart();
    }

    createSkillsRadarChart() {
        const chartElement = document.getElementById('skills-radar');
        if (!chartElement || typeof echarts === 'undefined') return;

        const chart = echarts.init(chartElement);
        
        const option = {
            title: {
                text: 'Professional Skills Overview',
                textStyle: {
                    color: '#2c3e50',
                    fontSize: 18,
                    fontWeight: 'bold'
                }
            },
            radar: {
                indicator: [
                    { name: 'Financial Analysis', max: 100 },
                    { name: 'Stakeholder Engagement', max: 100 },
                    { name: 'Project Management', max: 100 },
                    { name: 'Digital Tools', max: 100 },
                    { name: 'Communication', max: 100 },
                    { name: 'Strategic Planning', max: 100 }
                ],
                shape: 'polygon',
                splitNumber: 4,
                axisName: {
                    color: '#2c3e50',
                    fontSize: 12
                },
                splitLine: {
                    lineStyle: {
                        color: '#c9a96e',
                        opacity: 0.3
                    }
                },
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: ['rgba(201, 169, 110, 0.1)', 'rgba(26, 35, 50, 0.1)']
                    }
                }
            },
            series: [{
                name: 'Skills',
                type: 'radar',
                data: [{
                    value: [95, 90, 85, 80, 95, 88],
                    name: 'Current Level',
                    areaStyle: {
                        color: 'rgba(201, 169, 110, 0.3)'
                    },
                    lineStyle: {
                        color: '#c9a96e',
                        width: 3
                    },
                    itemStyle: {
                        color: '#1a2332'
                    }
                }],
                animationDuration: 2000,
                animationEasing: 'cubicOut'
            }]
        };

        chart.setOption(option);
        
        // Responsive chart
        window.addEventListener('resize', () => {
            chart.resize();
        });
    }

    createAchievementChart() {
        const chartElement = document.getElementById('achievement-chart');
        if (!chartElement || typeof echarts === 'undefined') return;

        const chart = echarts.init(chartElement);
        
        const option = {
            title: {
                text: 'Key Achievements by Impact',
                textStyle: {
                    color: '#2c3e50',
                    fontSize: 18,
                    fontWeight: 'bold'
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['Client Satisfaction', 'Process Improvement', 'Revenue Growth', 'Team Leadership', 'Project Delivery'],
                axisLabel: {
                    color: '#2c3e50',
                    fontSize: 11
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    color: '#2c3e50',
                    formatter: '{value}%'
                }
            },
            series: [{
                data: [98, 85, 75, 90, 95],
                type: 'bar',
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#c9a96e' },
                        { offset: 1, color: '#1a2332' }
                    ])
                },
                animationDuration: 2000,
                animationDelay: (idx) => idx * 200
            }]
        };

        chart.setOption(option);
        
        window.addEventListener('resize', () => {
            chart.resize();
        });
    }

    createCareerChart() {
        const chartElement = document.getElementById('career-chart');
        if (!chartElement || typeof echarts === 'undefined') return;

        const chart = echarts.init(chartElement);
        
        const option = {
            title: {
                text: 'Career Progression Timeline',
                textStyle: {
                    color: '#2c3e50',
                    fontSize: 18,
                    fontWeight: 'bold'
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                data: ['2022', '2023', '2024', '2025'],
                axisLabel: {
                    color: '#2c3e50'
                }
            },
            yAxis: {
                type: 'value',
                name: 'Responsibility Level',
                axisLabel: {
                    color: '#2c3e50'
                }
            },
            series: [{
                data: [3, 5, 7, 9],
                type: 'line',
                smooth: true,
                lineStyle: {
                    color: '#c9a96e',
                    width: 4
                },
                itemStyle: {
                    color: '#1a2332',
                    borderColor: '#c9a96e',
                    borderWidth: 3
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(201, 169, 110, 0.4)' },
                        { offset: 1, color: 'rgba(201, 169, 110, 0.1)' }
                    ])
                },
                animationDuration: 2500
            }]
        };

        chart.setOption(option);
        
        window.addEventListener('resize', () => {
            chart.resize();
        });
    }

    expandTimelineItem(item) {
        const isExpanded = item.classList.contains('expanded');
        
        // Close all other expanded items
        document.querySelectorAll('.timeline-item.expanded').forEach(expandedItem => {
            if (expandedItem !== item) {
                expandedItem.classList.remove('expanded');
                const details = expandedItem.querySelector('.timeline-details');
                if (details) {
                    anime({
                        targets: details,
                        height: 0,
                        opacity: 0,
                        duration: 300,
                        easing: 'easeOutCubic'
                    });
                }
            }
        });

        const details = item.querySelector('.timeline-details');
        if (!details) return;

        if (isExpanded) {
            item.classList.remove('expanded');
            anime({
                targets: details,
                height: 0,
                opacity: 0,
                duration: 300,
                easing: 'easeOutCubic'
            });
        } else {
            item.classList.add('expanded');
            anime({
                targets: details,
                height: 'auto',
                opacity: 1,
                duration: 400,
                easing: 'easeOutCubic'
            });
        }
    }

    filterPortfolio(filter) {
        const items = document.querySelectorAll('.portfolio-item');
        const buttons = document.querySelectorAll('.filter-btn');
        
        // Update active button
        buttons.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        items.forEach(item => {
            const category = item.dataset.category;
            const shouldShow = filter === 'all' || category === filter;
            
            if (shouldShow) {
                item.style.display = 'block';
                anime({
                    targets: item,
                    opacity: [0, 1],
                    scale: [0.8, 1],
                    duration: 400,
                    easing: 'easeOutCubic'
                });
            } else {
                anime({
                    targets: item,
                    opacity: 0,
                    scale: 0.8,
                    duration: 300,
                    easing: 'easeOutCubic',
                    complete: () => {
                        item.style.display = 'none';
                    }
                });
            }
        });
    }

    handleContactForm(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual endpoint)
        setTimeout(() => {
            this.showNotification('Message sent successfully!', 'success');
            form.reset();
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
        }, 1500);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        anime({
            targets: notification,
            translateY: [-50, 0],
            opacity: [0, 1],
            duration: 400,
            easing: 'easeOutCubic'
        });
        
        setTimeout(() => {
            anime({
                targets: notification,
                translateY: [0, -50],
                opacity: [1, 0],
                duration: 400,
                easing: 'easeOutCubic',
                complete: () => {
                    notification.remove();
                }
            });
        }, 3000);
    }

    setupScrollEffects() {
        // Parallax effect for hero background
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroBackground = document.querySelector('.hero-background');
            
            if (heroBackground) {
                const speed = scrolled * 0.5;
                heroBackground.style.transform = `translateY(${speed}px)`;
            }
        });
    }

    handleResize() {
        // Handle responsive chart resizing
        if (typeof echarts !== 'undefined') {
            echarts.getInstanceByDom(document.getElementById('skills-radar'))?.resize();
            echarts.getInstanceByDom(document.getElementById('achievement-chart'))?.resize();
            echarts.getInstanceByDom(document.getElementById('career-chart'))?.resize();
        }
    }
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CVWebsite();
});

// Utility functions for enhanced interactivity
const Utils = {
    // Smooth scroll to element
    scrollTo(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    },

    // Format numbers with commas
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    // Animate counter numbers
    animateCounter(element, target, duration = 2000) {
        anime({
            targets: { value: 0 },
            value: target,
            duration: duration,
            easing: 'easeOutCubic',
            update: function(anim) {
                element.textContent = Math.round(anim.animatables[0].target.value);
            }
        });
    },

    // Lazy load images
    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
};

// Additional interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Initialize lazy loading
    Utils.lazyLoadImages();
    
    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});