/* PSEUDOCODE:
When "Start Quiz" button is pressed:
    1. Hide intro div and display quiz div, inserting question and possible answers
    2. Start timer
When correct answer is pressed, display "Correct answer" message and insert a different question and answers. Repeat a determined number of times.
When incorrect answer is pressed, deduct 10 seconds from time and display another question. 
When all answers are complete or timer reaches zero, hide quiz div and display quiz-over div.
When initials are submitted, hide quiz-over div and display high-scores div. If "Go back" button is pressed, hide quiz over div and display intro div.
If Clear high scores button is pressed, all initials are removed.
If "View High Scores" is clicked, intro div is hidden and high-scores div is displayed. */