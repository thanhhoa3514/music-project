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
// End

// Search suggest
const boxSearchSuggest= document.querySelector(".user-actions");
if(boxSearchSuggest){
    const input=boxSearchSuggest.querySelector("input[name='keyword']");
    const boxSuggest= document.querySelector(".inner-suggest");
    input.addEventListener("keyup",()=>{
        const keyword=input.value;
        const link=`/search/suggest?keyword=${keyword}`;
        fetch(link).then(response=>response.json()).then(data=>{
            const songs=data.songs;
            if(songs.length>0){
                boxSuggest.classList.add(".show")
                const list=data.songs.map(item=>`
                    <li>
                        <a class="inner-item" href="songs/detail/${item.slug}"
                            <div class="inner-image">img src="${item.avatar}"</div>
                            <div class="inner-info">
                                <div class="inner-title">${item.title}</div>
                                <div class="inner-singer"><i class="fa-solid fa-microphone-lines"></i>${item.singerId.fullName}</div>
                            </div>
                    
                        </a>
    
                    
                    </li>`).join("");
                boxSearchSuggest.querySelector(".list-list").innerHTML=list;
            }else{
                boxSearchSuggest.classList.remove("show")
            }
        })
    })
}
// End search suggest
