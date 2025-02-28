let boxes = document.querySelectorAll(".box");
let resetbu = document.querySelector("#reset");
let newb = document.querySelector("#new");
let msgc = document.querySelector(".msgcontainer");
let msg = document.querySelector("#msg");

let turnO = true;

const winpattern = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("Box was clicked");
        if (turnO) {
            box.textContent = "O";
            box.style.color = "blue";
            turnO = false;
        } else {
            box.textContent = "X";
            box.style.color = "black";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
};

const showWinner = (winner) => {
    msg.innerText = `U are the Winner ${winner}`;
    msg.style.color = "#2F4485";
    msg.style.fontSize = "5vmin";
    msg.style.fontWeight = "bold";
    msgc.classList.remove("hide");
    disableBoxes();
};

const showDraw = () => {
    msg.innerText = "It's a Draw!";
    msg.style.color = "red";
    msg.style.fontSize = "5vmin";
    msg.style.fontWeight = "bold";
    msgc.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    let isDraw = true;
    for (let pattern of winpattern) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        
        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            console.log("Winner", pos1);
            showWinner(pos1);
            return;
        }
    }
    boxes.forEach(box => {
        if (box.innerText === "") {
            isDraw = false;
        }
    });
    
    if (isDraw) {
        showDraw();
    }
};

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgc.classList.add("hide");
};

newb.addEventListener("click", resetGame);
resetbu.addEventListener("click", resetGame);
