let userscore=0;
let compscore=0;

let usescorepara=document.querySelector("#user-score");
let compscorepara=document.querySelector("#comp-score");


const choices=document.querySelectorAll(".choice");
const msg=document.querySelector("#msg");

choices.forEach((choice)=>{
    choice.addEventListener("click",()=>{
        const userchoice=choice.getAttribute("id");
        console.log("Choice was clicked",userchoice);
        playgame(userchoice);
    });
});


const getcompchoice=()=>{
    const options=["rock","paper","scissors"];
    const randidx=Math.floor(Math.random()*3);
    return options[randidx];
}

const draw=()=>{
    console.log("Its a Draw");
    msg.innerText="Game Was Draw";
    msg.style.backgroundColor="White";
}

const showwinner=(userwin,userchoice,compchoice)=>{
    if(userwin){
        userscore++;
        usescorepara.innerText=userscore;
        msg.innerText=`You win! Your ${userchoice} beats  Computer ${compchoice}`;
        msg.style.backgroundColor="green";
    }else{
        compscore++;
        compscorepara.innerText=compscore++;
        console.log("Computer wins");
        msg.innerText=`You win!  Computer ${compchoice} beats Your ${userchoice}`;
        msg.style.backgroundColor="red";
    }
}

const playgame=(userchoice)=>{
    console.log("user choice=", userchoice);
    const compchoice=getcompchoice();

    if(userchoice===compchoice){
        draw();
    }else{
        let userwin=true;
        if(userchoice==="rock"){
            userwin= compchoice==="paper"?false:true;
        }else if(userchoice==="paper"){
            userwin= compchoice==="scissors"?false:true;
        }else{
            userwin= compchoice==="rock"?false:true;
        }
        showwinner(userwin,userchoice,compchoice);
    }
}

document.getElementById("resetBtn").addEventListener("click", () => {
    userscore = 0;
    compscore = 0;
    usescorepara.innerText = userscore;
    compscorepara.innerText = compscore;
    msg.innerText = "Play your move";
    msg.style.backgroundColor = "#081b31";
});




