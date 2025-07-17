Feature: Show/Hide Event Details

  Scenario: An event element is collapsed by default
    Given user is viewing the events list
    When The page loads
    Then All events are displayed in collapsed state (no details visible)

  Scenario: User can expand an event to see details
    Given user is viewing a collapsed event
    When user clicks on the "Details" button
    Then The event expands and shows detailed information

  Scenario: User can collapse an event to hide details
    Given user is viewing an expanded event with details
    When user clicks the collapse button
    Then The details are hidden and the event returns to collapsed state 