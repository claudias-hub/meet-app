Feature: Filter Events By City

  Scenario: When user hasn't searched for a city, show upcoming events from all cities
    Given user hasn’t searched for any city
    When the user opens the app
    Then the user should see the list of all upcoming events.

  Scenario: User should see a list of suggestions when they search for a city
    Given the main page is open
    When user starts typing in the city textbox
    Then the user should receive a list of cities (suggestions) that match what they’ve typed

  Scenario: User can select a city from the suggested list
    Given user see a list of suggested cities
    When the user selects a city from the list
    Then The city is selected and user sees events for that city only