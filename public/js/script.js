// Button like
const buttonLike= document.querySelector("[button-like]");
// console.log(buttonLike);
if(buttonLike){
    buttonLike.addEventListener("click",()=>{
        const idSong=buttonLike.getAttribute("button-like");
        const isActive=buttonLike.classList.contains("active");
        const typeLike= isActive ? "dislike":"like";
        const link=`/songs/like/${typeLike}/${idSong}`
        fetch(link,{
            method: "PATCH",
            credentials: "include"
        }).then(response=>response.json()).then(data=>{
            const span=buttonLike.querySelector("span");
            span.innerHTML=`${data.like} likes`
            // console.log(data);
            buttonLike.classList.toggle("active")
        })
    });
}
