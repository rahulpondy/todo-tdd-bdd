Feature: Delete an item
    As an api consumer, I want to ret
    Scenario: Successfully delete an item to TODO list
        Given request "headers"
            | Content-Type | application/json |
        When I make a "POST" to "http://localhost:8080/item/study"
        Then I receive a 200 with body
            | msg   | string |
            | items | array  |
        Given request "headers"
            | Content-Type | application/json |
        When I make a "DELETE" to "http://localhost:8080/item/study"
        Then I receive a 200 with body
            | msg   | string |
            | items | array  |

    Scenario: Return an error when we would try to delete an non existing item
        Given request "headers"
            | Content-Type | application/json |
        When I make a "DELETE" to "http://localhost:8080/item/ABC"
        Then I receive a 400 with body
            | msg   | string |
            | items | array  |