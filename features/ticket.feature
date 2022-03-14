Feature: Booking tickets
    Scenario: Should successfully book a ticket successfully
        Given user is on "http://qamid.tmweb.ru/client/index.php" page
        When user choose day ".page-nav > a:nth-child(5)"
        When user choose time "a.movie-seances__time"
        When user choose place ".buying-scheme__wrapper > div:nth-child(3) > span:nth-child(3)"
        When user click on the book button "button.acceptin-button"
        When user click on the get booking code button "button.acceptin-button"
        Then user sees the code and text "Покажите QR-код нашему контроллеру для подтверждения бронирования."

    Scenario: Should successfully book two tickets for the second movie
        Given user is on "http://qamid.tmweb.ru/client/index.php" page
        When user choose day ".page-nav > a:nth-child(6)"
        When user choose time "a.movie-seances__time"
        When user choose place ".buying-scheme__wrapper > div:nth-child(5) > span:nth-child(3)"
        When user choose place ".buying-scheme__wrapper > div:nth-child(5) > span:nth-child(4)"
        When user click on the book button "button.acceptin-button"
        When user click on the get booking code button "button.acceptin-button"
        Then user sees the code and text "Покажите QR-код нашему контроллеру для подтверждения бронирования."

    Scenario: Should not book one of the same ticket
        Given user is on "http://qamid.tmweb.ru/client/index.php" page
        When user choose day ".page-nav > a:nth-child(7)"
        When user choose time "a.movie-seances__time"
        When user choose place ".buying-scheme__wrapper > div:nth-child(7) > span:nth-child(3)"
        When user click on the book button "button.acceptin-button"
        When user click on the get booking code button "button.acceptin-button"
        When user sees the code and text "Покажите QR-код нашему контроллеру для подтверждения бронирования."
        When user reopen page "http://qamid.tmweb.ru/client/index.php"
        When user choose day ".page-nav > a:nth-child(7)"
        When user choose time "a.movie-seances__time"
        When user choose place ".buying-scheme__wrapper > div:nth-child(7) > span:nth-child(3)"
        Then button for booking is inactive "true"