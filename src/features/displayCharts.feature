Feature: Display Charts Visualizing Event Details

  Scenario: Show a chart with the number of upcoming events in each city
    Given There are events loaded from different cities
    When I navigate to the data visualization section
    Then I see a scatterplot chart showing how many events are in each city