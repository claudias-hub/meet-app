Feature: Use the App When Offline

  Scenario: Show cached data when there's no internet connection
    Given I have used the app before and now I'm offline
    When I open the application
    Then I see previously cached events

  Scenario: Show error when user changes search settings (city, number of events)
    Given I have no internet connection
    When I try to change the city or number of events
    Then An error message appears explaining I need internet for that action