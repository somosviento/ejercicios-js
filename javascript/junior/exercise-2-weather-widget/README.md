# Exercise 2: Weather Widget

## Objective
Build a simple weather widget using React that displays current weather information for a hardcoded city and allows users to toggle between Celsius and Fahrenheit.

## Requirements
1. Create a weather widget component that:
   - Shows the name of a hardcoded city (e.g., "New York", "London", "Tokyo")
   - Displays the current temperature
   - Shows a weather condition (e.g., "Sunny", "Cloudy", "Rainy")
   - Displays an appropriate weather icon
2. Implement a toggle button to switch between Celsius and Fahrenheit
3. Style the widget to look like a real weather app

## Getting Started
1. Navigate to this directory
2. Run `npm install` to install dependencies
3. Run `npm start` to start the development server
4. Open the code in your favorite editor

## Tips
- Use React's useState hook to manage the temperature unit state (Celsius/Fahrenheit)
- For this exercise, you can use hardcoded weather data (no need for a real API)
- Create a formula to convert between Celsius and Fahrenheit: 
  - °F = (°C × 9/5) + 32
  - °C = (°F - 32) × 5/9
- Break your application into components (e.g., WeatherCard, TemperatureToggle)

## Bonus Challenges
- Add more weather information (humidity, wind speed, etc.)
- Implement a dropdown to select different cities
- Add animations for weather conditions (e.g., falling rain, moving clouds)
- Use CSS to create a day/night theme based on the time of day

## Solution
Check the `/solution` folder for a reference implementation after you've completed your own version.
