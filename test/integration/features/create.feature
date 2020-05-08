Feature: Add an item
  As an api consumer, I want to ret
  Scenario: Successfully add an item to TODO list
    Given request "headers"
      | Content-Type  | application/json |
    When I make a "POST" to "http://localhost:8080/item/play"
    Then I receive a 200 with body
        | msg | string |
        | items           | array  |
  
  Scenario: Return an error when we would try to add an existing item
    Given request "headers"
      | Content-Type  | application/json |
    When I make a "POST" to "http://localhost:8080/item/meeting"
    Then I receive a 200 with body
        | msg | string |
        | items           | array  |
    Given request "headers"
      | Content-Type  | application/json |
    When I make a "POST" to "http://localhost:8080/item/meeting"
    Then I receive a 400 with body
        | msg | string |
        | items           | array  |