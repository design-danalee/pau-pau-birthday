document.addEventListener("DOMContentLoaded", () => {

    const story = document.getElementById("story");

    const intro = document.getElementById("intro");

    const beginButton = document.getElementById("begin");

    const resetButton = document.getElementById("reset");

    const previousButton = document.getElementById("previous");

    const nextButton = document.getElementById("next");

    const navigation = document.querySelector(".navigation");

    const progress = document.querySelector(".progress");

    const current = document.getElementById("current");

    const total = document.getElementById("total");


    let scenes = [];

    let currentScene = 0;

    let started = false;



    document.body.classList.add("locked");





    fetch("content/birthday.json")

        .then(response => {

            if (!response.ok) {

                throw new Error("Could not load birthday.json");

            }

            return response.json();

        })

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

                        <div class="poem-text">

                            ${sceneData.text
                                .map(line => `<div class="poem-line">${line}</div>`)
                                .join("")}

                        </div>


                        ${
                            sceneData.final
                            ?
                            `<button class="final-button">
                                Start Over
                             </button>`
                            :
                            ""
                        }

                    </div>

                `;


                story.appendChild(section);


            });



            scenes = document.querySelectorAll(".scene");


            total.textContent = scenes.length;


            validateImages();


            setupFinalButton();


        })


        .catch(error => {

            console.error(error);

        });








    beginButton.addEventListener("click", () => {


        intro.style.opacity = "0";


        setTimeout(() => {

            intro.remove();

            document.body.classList.remove("locked");


        },1000);



        started = true;


        resetButton.classList.add("visible");

        navigation.classList.add("visible");

        progress.style.opacity = "1";


        goToScene(0);


    });







    function goToScene(index){


        if(!scenes[index]) {

            return;

        }


        currentScene = index;


        scenes[index].scrollIntoView({

            behavior:"smooth"

        });


        current.textContent = index + 1;


        updateButtons();


    }







    function updateButtons(){


        previousButton.disabled = currentScene === 0;


        nextButton.disabled = currentScene === scenes.length - 1;


    }








    previousButton.addEventListener("click",()=>{


        goToScene(currentScene - 1);


    });






    nextButton.addEventListener("click",()=>{


        goToScene(currentScene + 1);


    });







    document.addEventListener("keydown",(event)=>{


        if(!started){

            return;

        }



        if(event.key === "ArrowDown"){

            event.preventDefault();

            goToScene(currentScene + 1);

        }



        if(event.key === "ArrowUp"){

            event.preventDefault();

            goToScene(currentScene - 1);

        }


    });







    resetButton.addEventListener("click",()=>{


        location.reload();


    });







    function setupFinalButton(){


        const button = document.querySelector(".final-button");


        if(button){


            button.addEventListener("click",()=>{


                location.reload();


            });


        }


    }







    function validateImages(){


        document.querySelectorAll(".background").forEach(background=>{


            const image = background.style.backgroundImage
                .replace('url("','')
                .replace('")','');


            const test = new Image();


            test.onload = () => {

                console.log("Loaded:", image);

            };


            test.onerror = () => {

                console.error("FAILED IMAGE:", image);

            };


            test.src = image;


        });


    }



});
