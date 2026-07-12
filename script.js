const story = document.getElementById("story");

const beginButton = document.getElementById("begin");

const progress = document.querySelector(".progress");

const current = document.getElementById("current");


let scenes = [];

let activeScene = 0;

let started = false;



document.body.classList.add("locked");



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
                ${sceneData.text.join("<br><br>")}
                </p>

            </div>

        `;


        story.appendChild(section);


    });



    scenes = document.querySelectorAll(".scene");


    document.getElementById("total").innerText = scenes.length;



});






beginButton.addEventListener("click",()=>{


    const intro = document.getElementById("intro");


    intro.style.opacity="0";



    setTimeout(()=>{


        intro.remove();


        document.body.classList.remove("locked");


        started=true;


        progress.style.opacity=".7";


        goToScene(0);



    },1000);



});








function goToScene(index){


    if(index < 0 || index >= scenes.length){

        return;

    }



    activeScene=index;



    scenes[index].scrollIntoView({

        behavior:"smooth",

        block:"start"

    });



    current.innerText=index+1;



}








document.addEventListener("keydown",(event)=>{


    if(!started){

        return;

    }



    if(event.key==="ArrowDown"){


        event.preventDefault();


        goToScene(activeScene+1);


    }



    if(event.key==="ArrowUp"){


        event.preventDefault();


        goToScene(activeScene-1);


    }



});







window.addEventListener("scroll",()=>{


    if(!started){

        return;

    }



    scenes.forEach((scene,index)=>{


        const rect = scene.getBoundingClientRect();



        if(
            rect.top <= window.innerHeight/2 &&
            rect.bottom >= window.innerHeight/2
        ){


            activeScene=index;


            current.innerText=index+1;


        }



    });



});
