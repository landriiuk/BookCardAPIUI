Feature: Search functionality

    # @smoke
    # Scenario: User can search by name
    #     Given User visited website
    #     And And Logged in
    #     When User search for "Mrs. Everything"
    #     Then Book "Mrs. Everything" exists

    # Scenario: User can search by name
    #     Given User visited website
    #     And And Logged in
    #     When User search for Book
    #         | Book name       |
    #         | Mrs. Everything |

    #     Then Book "Mrs. Everything" exists

    Scenario Outline:  User can search by name
        Given User visited website
        And And Logged in
        When User search for "<Book name>" on "page Name" page
        Then Book "<Book name>" exists
        Examples:
            | Book name       | page Name |
            | Mrs. Everything | 1         |
            | magic for liars | 2         |