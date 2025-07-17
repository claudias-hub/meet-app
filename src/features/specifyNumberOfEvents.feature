Feature: Specify Number of Events

  Scenario: When user hasn't specified a number, 32 events are shown by default
    Given I open the application for the first time
    When I don't specify how many events I want to see
    Then 32 events are displayed automatically

  Scenario: User can change the number of events displayed
    Given I am viewing the events list
    When I change the number in the "Number of events" field
    Then The list updates to show exactly that number of events