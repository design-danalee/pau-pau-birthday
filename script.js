const story = document.getElementById("story");

const beginButton = document.getElementById("begin");
const resetButton = document.getElementById("reset");

const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");

const navigation = document.querySelector(".navigation");
const progress = document.querySelector(".progress");

const current = document.getElementById("current");
const total = document.getElementById("total");


let scenes = [];
let activeScene = 0;
let started = false;



document.body.classList.add("locked");




// Load JSON content

fetch("content/birthday.json")

.then(response => response.json())

.then(data => {


    data.forEach(sceneData => {


        const section = document.createElement("section");

        section.className = "scene";



        const poemLines = sceneData.text
            .map(line => `<div class="poem-line">${line}</div>`)
            .join("");



        section.innerHTML = `

            <div 
                class="background"
                style="background-image:url('${sceneData.photo}')">
            </div>


            <div class="overlay"></div>



            <div class="poem">

                <div class="poem-text">

                    ${poemLines}

                </div>


                ${
                    sceneData.final
                    ?
                    `
                    <button class="final-button">
                        Start Over
                    </button>
                    `
                    :
                    ""
                }


            </div>

        `;



        story.appendChild(section);


    });



    scenes = document.querySelectorAll(".scene");


    total.innerText = scenes.length;


    setupFinalButton();


});







// Begin experience

beginButton.addEventListener("click",()=>{


    const intro = document.getElementById("intro");


    intro.style.opacity = "0";



    setTimeout(()=>{

        intro.remove();

        document.body.classList.remove("locked");


    },1000);



    started = true;


    resetButton.classList.add("visible");

    navigation.classList.add("visible");

    progress.style.opacity = ".7";



    goToScene(0);



});







// Go to slide

function goToScene(index){


    if(index < 0 || index >= scenes.length){

        return;

    }



    activeScene = index;



    scenes[index].scrollIntoView({

        behavior:"smooth",

        block:"start"

    });



    current.innerText = index + 1;


    updateNavigation();


}







// Update arrows

function updateNavigation(){


    previousButton.disabled = activeScene === 0;


    nextButton.disabled = activeScene === scenes.length - 1;


}







// Button navigation

previousButton.addEventListener("click",()=>{


    goToScene(activeScene - 1);


});




nextButton.addEventListener("click",()=>{


    goToScene(activeScene + 1);


});







// Keyboard navigation

document.addEventListener("keydown",(event)=>{


    if(!started){

        return;

    }



    if(event.key === "ArrowDown"){


        event.preventDefault();


        goToScene(activeScene + 1);


    }



    if(event.key === "ArrowUp"){


        event.preventDefault();


        goToScene(activeScene - 1);


    }


});







// Detect manual scrolling

window.addEventListener("scroll",()=>{


    if(!started){

        return;

    }



    scenes.forEach((scene,index)=>{


        const rect = scene.getBoundingClientRect();



        if(
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
        ){


            activeScene = index;


            current.innerText = index + 1;


            updateNavigation();


        }


    });


});







// Reset

resetButton.addEventListener("click",()=>{


    location.reload();


});







// Final slide button

function setupFinalButton(){


    const finalButton = document.querySelector(".final-button");



    if(finalButton){


        finalButton.addEventListener("click",()=>{


            location.reload();


        });


    }


}
