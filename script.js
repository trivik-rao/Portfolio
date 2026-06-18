/* @author Trivik Kemisoft */

// Live Trailhead profile handle derived from your custom profile link
const trailheadProfileName = "trivik"; 

async function fetchTrailheadStats() {
    try {
        // Fetching real-time profile metrics via community tracking scraper
        const response = await fetch(`https://api.salesforce-trailhead.com/v1/profile/${trailheadProfileName}`);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        
        // Dynamically overwrite fallback HTML metrics if properties are returned
        if (data.rank) document.getElementById('th-rank').innerText = data.rank;
        if (data.badges) document.getElementById('th-badges').innerText = data.badges;
        if (data.superbadges) document.getElementById('th-superbadges').innerText = data.superbadges;
    } catch (error) {
        console.error('Error fetching Trailhead stats, falling back to hardcoded HTML defaults:', error);
    }
}

// Global Lifecycle Listener
document.addEventListener('DOMContentLoaded', () => {
    // 1. Fire asynchronous profile data call
    fetchTrailheadStats();
    
    // 2. Initialize Responsive Navigation Elements
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        // Toggle Mobile Menu Open/Close UI view
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Swap navigation FontAwesome structures conditionally
            const icon = mobileMenu.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close menu panel globally upon clicking an individual link anchor
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenu.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
});