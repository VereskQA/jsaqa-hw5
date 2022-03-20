Feature: Booking tickets
    Scenario: Should successfully book a ticket successfully
        Given user is on "http://qamid.tmweb.ru/client/index.php" page
        When user choose day "Tomorrow"
        When user choose film "Фильм 3" and time "10:00"
        When user choose raw "3" and chair "1" and click it
        When user click on the book button
        When user click on the get booking code button
        Then user sees the code and text

    Scenario: Should successfully book two tickets for the second movie
        Given user is on "http://qamid.tmweb.ru/client/index.php" page
        When user choose day "Tomorrow"
        When user choose film "Фильм 3" and time "10:00"
        When user choose raw "3" and chair "2" and click it
        When user choose raw "3" and chair "3" and click it
        When user click on the book button
        When user click on the get booking code button
        Then user sees the code and text

    Scenario: Should not book one of the same ticket
        Given user is on "http://qamid.tmweb.ru/client/index.php" page
        When user choose day "Day After Tomorrow"
        When user choose film "Фильм 3" and time "10:00"
        When user choose raw "3" and chair "4" and click it
        When user click on the book button
        When user click on the get booking code button
        When user sees the code and text
        When user reopen page "http://qamid.tmweb.ru/client/index.php"
        When user choose day "Day After Tomorrow"
        When user choose film "Фильм 3" and time "10:00"
        When user choose raw "3" and chair "4" and click it
        Then button for booking is inactive