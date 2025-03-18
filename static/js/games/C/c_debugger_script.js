const allCodeSnippets = [
    { question: "Fix the missing semicolon:", code: "#include <stdio.h>\nint main() {\n    printf(\"Hello World\")\n    return 0;\n}", answer: "#include <stdio.h>\nint main() {\n    printf(\"Hello World\");\n    return 0;\n}" },
    { question: "Fix the missing header file:", code: "int main() {\n    printf(\"Hello\");\n    return 0;\n}", answer: "#include <stdio.h>\nint main() {\n    printf(\"Hello\");\n    return 0;\n}" },
    { question: "Correct the incorrect variable declaration:", code: "int 3number = 10;", answer: "int number3 = 10;" },
    { question: "Fix the missing return statement:", code: "#include <stdio.h>\nint main() {\n    printf(\"Hello\");\n}", answer: "#include <stdio.h>\nint main() {\n    printf(\"Hello\");\n    return 0;\n}" },
    { question: "Correct the incorrect data type:", code: "flot num = 5.6;", answer: "float num = 5.6;" },
    { question: "Fix the missing closing bracket:", code: "#include <stdio.h>\nint main() {\n    printf(\"Hello\");", answer: "#include <stdio.h>\nint main() {\n    printf(\"Hello\");\n}" },
    { question: "Fix the logical error:", code: "int x = 5;\nif(x = 10) {\n    printf(\"Equal\");\n}", answer: "int x = 5;\nif(x == 10) {\n    printf(\"Equal\");\n}" },
    { question: "Fix the array declaration error:", code: "int arr(5) = {1,2,3,4,5};", answer: "int arr[5] = {1,2,3,4,5};" },
    { question: "Fix the missing & in scanf:", code: "int num;\nscanf(\"%d\", num);", answer: "int num;\nscanf(\"%d\", &num);" },
    { question: "Fix the missing colon in ternary operator:", code: "int result = (x > y) ? x y;", answer: "int result = (x > y) ? x : y;" },
    { question: "Fix the incorrect pointer declaration:", code: "int* ptr = NULL;", answer: "int *ptr = NULL;" },
    { question: "Correct the incorrect increment operator:", code: "int x = 5;\nx++2;", answer: "int x = 5;\nx += 2;" },
    { question: "Fix the function declaration error:", code: "void myFunction(int a, b);", answer: "void myFunction(int a, int b);" },
    { question: "Fix the missing double quotes in printf:", code: "printf(Hello);", answer: "printf(\"Hello\");" },
    { question: "Fix the logical error in loop:", code: "for(int i = 0; i < 5; i--)", answer: "for(int i = 0; i < 5; i++)" },
    { question: "Fix the syntax error in struct:", code: "struct Person {\n    char name[50]\n    int age;\n};", answer: "struct Person {\n    char name[50];\n    int age;\n};" },
    { question: "Fix the missing return type in function:", code: "main() {\n    printf(\"Hello\");\n}", answer: "int main() {\n    printf(\"Hello\");\n    return 0;\n}" },
    { question: "Fix the switch case syntax error:", code: "switch(x) {\n    case 1;\n    printf(\"One\");\n}", answer: "switch(x) {\n    case 1:\n    printf(\"One\");\n    break;\n}" },
    { question: "Fix the missing break statement:", code: "switch(x) {\n    case 1:\n    printf(\"One\");\n    case 2:\n    printf(\"Two\");\n}", answer: "switch(x) {\n    case 1:\n    printf(\"One\");\n    break;\n    case 2:\n    printf(\"Two\");\n    break;\n}" },
    { question: "Fix the incorrect if-else syntax:", code: "if x > 5 printf(\"Big\"); else printf(\"Small\");", answer: "if (x > 5) printf(\"Big\"); else printf(\"Small\");" },
    { question: "Fix the missing return value in function:", code: "int sum(int a, int b) {\n    return;\n}", answer: "int sum(int a, int b) {\n    return a + b;\n}" },
    { question: "Fix the missing header in file operations:", code: "FILE *fptr = fopen(\"file.txt\", \"r\");", answer: "#include <stdio.h>\nFILE *fptr = fopen(\"file.txt\", \"r\");" },
    { question: "Fix the incorrect format specifier:", code: "printf(\"%s\", 10);", answer: "printf(\"%d\", 10);" },
    { question: "Fix the missing void in function declaration:", code: "main() { printf(\"Hello\"); }", answer: "int main() { printf(\"Hello\"); return 0; }" }
];

// Shuffle the full question bank
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
shuffleArray(allCodeSnippets);

// Select 10 random questions
const codeSnippets = allCodeSnippets.slice(0, 10);

let score = 0;
let currentIndex = 0;

function loadQuestion() {
    document.getElementById("feedback").innerText = "";
    const current = codeSnippets[currentIndex];
    document.getElementById("question").innerText = current.question;
    document.getElementById("code-box").innerText = current.code;
    document.getElementById("user-input").value = "";
}

document.getElementById("submitAnswer").addEventListener("click", function () {
    const userAnswer = document.getElementById("user-input").value.trim();
    const correctAnswer = codeSnippets[currentIndex].answer.trim();

    if (userAnswer === correctAnswer) {
        score += 10;
        document.getElementById("feedback").innerText = "✅ Correct!";
        document.getElementById("feedback").className = "correct";
        document.getElementById("score").innerText = "Score: " + score;
    } else {
        document.getElementById("feedback").innerText = "❌ Incorrect!";
        document.getElementById("feedback").className = "incorrect";
        return;
    }

    currentIndex++;
    if (currentIndex < codeSnippets.length) {
        setTimeout(loadQuestion, 1000);
    } else {
        document.getElementById("feedback").innerText = "🎉 You fixed all the bugs!";
    }
});

loadQuestion();

