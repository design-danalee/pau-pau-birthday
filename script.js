const story = document.getElementById("story");

const beginButton = document.getElementById("begin");

const progress = document.querySelector(".progress");

const current = document.getElementById("current");


document.body.classList.add("locked");



fetch("content/birthday.json")

.then(response => response.json())

.then(data => {


    data.forEach(sceneData => {


        const section = document.createElement("section");

        section.className="scene";


        section.innerHTML = `

        <div class="background"
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


    document.getElementById("total").innerText=data.length;


    setupNavigation();


});




beginButton.addEventListener("click",()=>{


    const intro=document.getElementById("intro");


    intro.style.opacity="0";

    intro.style.transition="opacity 1s";


    setTimeout(()=>{


        intro.remove();

        document.body.classList.remove("locked");

        progress.style.opacity="0.7";


        document.querySelector(".scene")
        .scrollIntoView();


    },1000);


});





function setupNavigation(){


const scenes=document.querySelectorAll(".scene");



window.addEventListener("scroll",()=>{


let active=0;


scenes.forEach((scene,index)=>{


const position=scene.getBoundingClientRect();


if(
position.top < window.innerHeight/2 &&
position.bottom > window.innerHeight/2
){

active=index;

}


});


current.innerText=active+1;



});





document.addEventListener("keydown",(event)=>{


let active=0;


scenes.forEach((scene,index)=>{


const position=scene.getBoundingClientRect();


if(
position.top < window.innerHeight/2 &&
position.bottom > window.innerHeight/2
){

active=index;

}

});



if(event.key==="ArrowDown"){

scenes[Math.min(active+1,scenes.length-1)]
.scrollIntoView();

}



if(event.key==="ArrowUp"){

scenes[Math.max(active-1,0)]
.scrollIntoView();

}


});


}