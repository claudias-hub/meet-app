Feature: Add an App Shortcut to the Home Screen

  Scenario: User can install the meet app as a shortcut on their device home screen
    Given I am using the application in my mobile browser
    When The browser offers "Add to Home Screen" option and I accept it
    Then The app installs as an icon on my home screen