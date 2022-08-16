
const audioElement=document.querySelector("audio")

const button=document.querySelector("button")


function toggleBtn(){
    button.disabled=!button.disabled
}

function tellMe(joke){

    VoiceRSS.speech({

        key: '3d53228533fc4200a24a2f10783959a3',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
})

}


async function getJokeFromApi(){

    let joke='';

    await axios.get('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit').then(res=>{

            switch(res.data.type){

                case "single":
                    joke = res.data.joke
                    break;
                
                case "twopart":
                    joke = `${res.data.setup}...${res.data.delivery}`
                    break;
                
            }

            tellMe(joke)

            toggleBtn()

        }
    )


}


button.addEventListener('click' ,getJokeFromApi)

audioElement.addEventListener('ended',toggleBtn)