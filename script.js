const story = document.getElementById("story");

const beginButton = document.getElementById("begin");

const resetButton = document.getElementById("reset");

const progress = document.querySelector(".progress");

const current = document.getElementById("current");


let scenes = [];

let activeScene = 0;

let started = false;



// Lock scrolling until Begin is clicked

document.body.classList.add("locked");





// Load story content

fetch("content/birthday.json")

.then(response => response.json())

.then(data => {


    data.forEach(sceneData => {


        const section = document.createElement("section");

        section.className = "scene";



        section.innerHTML = `


            <div 
            class="background"
            style="background-image:url('${sceneData.photo}')">
            </div>



            <div class="overlay"></div>




            <div class="poem">


                <p>
                    ${sceneData.text.join("<br>")}
                </p>



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


    document.getElementById("total").innerText = scenes.length;



    setupFinalButton();


});







// Begin experience

beginButton.addEventListener("click", () => {

    startExperience();

});





function startExperience(){


    const intro = document.getElementById("intro");



    if(intro){


        intro.style.opacity = "0";



        setTimeout(()=>{


            intro.remove();


        },1000);


    }




    document.body.classList.remove("locked");


    started = true;



    resetButton.classList.add("visible");


    progress.style.opacity = ".7";



    goToScene(0);


}







// Reset experience

function resetExperience(){


    window.scrollTo({

        top:0,

        behavior:"instant"

    });



    location.reload();


}






resetButton.addEvent
