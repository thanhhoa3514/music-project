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
            if(data.code===200){

                const span=buttonLike.querySelector("span");
                span.innerHTML=`${data.like} likes`
                // console.log(data);
                buttonLike.classList.toggle("active")
            }
        })
    });
}

// End
const listButtonFavorite= document.querySelectorAll("[button-favorite]");
// console.log(buttonLike);
if(listButtonFavorite.length > 0) {
    listButtonFavorite.forEach((buttonFavorite)=>{
        buttonFavorite.addEventListener("click",()=>{
            const idSong=buttonFavorite.getAttribute("button-favorite");
            const isActive=buttonFavorite.classList.contains("active");
            const typeFavorite= isActive ? "unfavorite":"favorite";
            const link=`/songs/favorite/${typeFavorite}/${idSong}`
            fetch(link,{
                method: "PATCH",
                credentials: "include"
            }).then(response=>response.json()).then(data=>{
                if(data.code===200){
    
                    buttonFavorite.classList.toggle("active");
                }
            })
        });

    })
}
