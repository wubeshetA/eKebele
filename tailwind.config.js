module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust based on your project structure
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#6EE7B7', // Light Green for hover effects
          DEFAULT: '#10B981', // Main Green (for buttons, links)
          dark: '#065F46', // Dark Green for footer or text accents
        },
        secondary: {
          DEFAULT: '#F97316', // Orange for accent highlights
        },
        background: {
          light: '#F0FDF4', // Very light green background (main)
          DEFAULT: '#E6FFFA', // Slightly darker variant for sections
        },
        text: {
          light: '#6B7280', // Light gray for secondary text
          DEFAULT: '#111827', // Dark gray for main text
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Primary font (clean and modern)
        mono: ['Roboto Mono', 'monospace'], // Monospace for code or technical areas
      },
      fontSize: {
        base: '1rem', // 16px for body text
        lg: '1.125rem', // 18px for larger body text
        xl: '1.25rem', // 20px for heading
        '2xl': '1.5rem', // 24px for larger headings
        '3xl': '1.875rem', // 30px for titles
      },
      borderRadius: {
        'lg': '0.5rem', // Slightly rounded elements
        '2xl': '1rem', // Larger rounded corners for buttons, cards
      },
      boxShadow: {
        'md': '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for cards, buttons
        'lg': '0 10px 15px rgba(0, 0, 0, 0.1)', // Deeper shadow for larger elements
      },
    },
  },
  plugins: [],
};
