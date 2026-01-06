// AlphaCloud Website Configuration
const config = {
    // Coming Soon Mode
    comingSoon: {
        enabled: true, // Set to true to activate Coming Soon page
        launchDate: '2026-01-19T18:00:00', // Launch date in ISO format
        
        // Multilingual Content
        content: {
            de: {
                title: 'AlphaCloud startet bald!',
                subtitle: 'Wir arbeiten an etwas Großartigem',
                countdown: {
                    days: 'Tage',
                    hours: 'Stunden',
                    minutes: 'Minuten',
                    seconds: 'Sekunden'
                }
            },
            en: {
                title: 'AlphaCloud Coming Soon!',
                subtitle: 'We\'re working on something amazing',
                countdown: {
                    days: 'Days',
                    hours: 'Hours',
                    minutes: 'Minutes',
                    seconds: 'Seconds'
                }
            }
        },
        
        // Roadmap Steps (Flugzeug bewegt sich basierend auf completed steps)
        roadmap: [
            {
                id: 1,
                title: "Foundation",
                titleDE: "Fundament",
                description: "Core bot structure and basic commands",
                descriptionDE: "Bot-Grundstruktur und Basis-Befehle",
                status: "completed",
                icon: "🏗️",
                subtasks: [
                    {
                        title: "Discord.js Integration",
                        titleDE: "Discord.js Integration",
                        status: "completed"
                    },
                    {
                        title: "Command Handler",
                        titleDE: "Befehlssystem",
                        status: "completed"
                    },
                    {
                        title: "Server Configuration",
                        titleDE: "Server-Konfiguration",
                        status: "completed"
                    },
                    {
                        title: "Logging System",
                        titleDE: "Logging-System",
                        status: "completed"
                    }
                ]
            },
            {
                id: 2,
                title: "Core Features",
                titleDE: "Kernfunktionen",
                description: "Essential bot functionality",
                descriptionDE: "Wesentliche Bot-Funktionen",
                status: "completed",
                icon: "⚙️",
                subtasks: [
                    {
                        title: "Ticket System",
                        titleDE: "Ticket-System",
                        status: "completed"
                    },
                    {
                        title: "Welcome & Leave",
                        titleDE: "Willkommen & Abschied",
                        status: "completed"
                    },
                    {
                        title: "Moderation Tools",
                        titleDE: "Moderations-Tools",
                        status: "completed"
                    },
                    {
                        title: "Team Management",
                        titleDE: "Team-Verwaltung",
                        status: "completed"
                    }
                ]
            },
            {
                id: 3,
                title: "AI Integration",
                titleDE: "KI-Integration",
                description: "Artificial Intelligence features",
                descriptionDE: "Künstliche Intelligenz Features",
                status: "in-progress",
                icon: "🤖",
                subtasks: [
                    {
                        title: "AI Chat Assistant",
                        titleDE: "KI-Chat-Assistent",
                        status: "in-progress"
                    },
                    {
                        title: "Smart Moderation",
                        titleDE: "Intelligente Moderation",
                        status: "in-progress"
                    },
                    {
                        title: "Auto-Response System",
                        titleDE: "Auto-Antwort-System",
                        status: "upcoming"
                    },
                    {
                        title: "Content Analysis",
                        titleDE: "Content-Analyse",
                        status: "upcoming"
                    }
                ]
            },
            {
                id: 4,
                title: "Panel Redesign",
                titleDE: "Panel-Überarbeitung",
                description: "New dashboard interface",
                descriptionDE: "Neue Dashboard-Oberfläche",
                status: "upcoming",
                icon: "🎨",
                subtasks: [
                    {
                        title: "Modern UI/UX",
                        titleDE: "Modernes UI/UX",
                        status: "upcoming"
                    },
                    {
                        title: "Real-time Stats",
                        titleDE: "Echtzeit-Statistiken",
                        status: "upcoming"
                    },
                    {
                        title: "Mobile Optimization",
                        titleDE: "Mobile-Optimierung",
                        status: "upcoming"
                    },
                    {
                        title: "Custom Themes",
                        titleDE: "Eigene Themes",
                        status: "upcoming"
                    }
                ]
            },
            {
                id: 5,
                title: "Advanced Features",
                titleDE: "Erweiterte Features",
                description: "New powerful capabilities",
                descriptionDE: "Neue leistungsstarke Funktionen",
                status: "upcoming",
                icon: "🚀",
                subtasks: [
                    {
                        title: "Custom Commands",
                        titleDE: "Eigene Befehle",
                        status: "upcoming"
                    },
                    {
                        title: "Advanced Analytics",
                        titleDE: "Erweiterte Analysen",
                        status: "upcoming"
                    },
                    {
                        title: "Multi-Language",
                        titleDE: "Mehrsprachigkeit",
                        status: "upcoming"
                    },
                    {
                        title: "API Webhooks",
                        titleDE: "API-Webhooks",
                        status: "upcoming"
                    }
                ]
            },
            {
                id: 6,
                title: "Custom Items",
                titleDE: "Individuelle Anpassungen",
                description: "Personalized features and configurations",
                descriptionDE: "Personalisierte Features und Konfigurationen",
                status: "upcoming",
                icon: "✨",
                subtasks: [
                    {
                        title: "Custom Embeds",
                        titleDE: "Eigene Embeds",
                        status: "upcoming"
                    },
                    {
                        title: "Role Automation",
                        titleDE: "Rollen-Automatisierung",
                        status: "upcoming"
                    },
                    {
                        title: "Event Scheduler",
                        titleDE: "Event-Planer",
                        status: "upcoming"
                    },
                    {
                        title: "Custom Integrations",
                        titleDE: "Eigene Integrationen",
                        status: "upcoming"
                    }
                ]
            }
        ],
        
        // Social Links
        social: {
            discord: 'https://discord.gg/PbsUptpm7Y',
            twitter: 'https://twitter.com',
            instagram: 'https://instagram.com',
            tiktok: 'https://tiktok.com'
        }
    }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
}

