var words=new Array(12);
var new_words=new Array(12);

var random_indexes=new Array(3);
var select_count=0;
var selected_words=[]

//attach event listeners to all crosses
for(let i=0;i<12;i++)
{
    document.getElementById(`cross-${i}`).addEventListener("click",(e)=>remove_word(e,i))

}

function fetch_words(){

fetch("https://dummyjson.com/products/categories")
.then((response)=>response.json())
.then((data)=>
{
    for(let i=0;i<12;i++)
    {
        words[i]=data[i].replace("-"," ")
        document.getElementById(`word-${i}`).children[1].innerText=`${i}. ${words[i]}`

    }
    console.log(words)

})

}

const shuffle = (array) => { 
    return array.sort(() => Math.random() - 0.5); 
}; 

function jumble_and_guess(){

    //jumble words
    new_words=words;
    shuffle(new_words)

    for(let i=0;i<12;i++)
    {
        document.getElementById(`word-${i}`).children[1].innerText=`${new_words[i]}`

    }
    
    //guess words at these indexes
    for(let i=0;i<3;i++)
    {
       random_indexes[i]= Math.floor(Math.random() * 10+1);
       document.getElementById(`index-${i}`).innerText=`${random_indexes[i]}th Word`

    }


    document.getElementById("random_area").classList.remove("hidden")
    document.getElementById("random_area").classList.add("show")

    //change the button text
    document.getElementById("button").innerText="Submit"

    //attach event listeners to all words
    for(let i=0;i<12;i++)
    {
        document.getElementById(`word-${i}`).addEventListener("click",(e)=>add_word(e,i))

    }

}

function add_word(e,i){

    if(select_count === 3){
    alert("Capacity full! Remove selected words to add a new word");
    return;
    }

    selected_words.push(new_words[i])

    document.getElementById(`index-${selected_words.length-1}`).innerText=new_words[i]

    console.log("hello")
    console.log(e.target)
    document.getElementById(`word-${i}`).classList.add("yellow_border")

    document.getElementById(`word-${i}`).setAttribute("data-selected",selected_words.length-1)

    document.getElementById(`cross-${i}`).classList.remove("hidden")
    document.getElementById(`cross-${i}`).classList.add("show")

    console.log(selected_words)
    select_count++;

    //remove listener
    e.target.removeEventListener("click",add_word)
}

function remove_word(e,i){
    e.stopPropagation()
    console.log(e.target)
    let index=document.getElementById(`word-${i}`).getAttribute("data-selected")
    console.log(index)

    selected_words.splice(index,1)
    document.getElementById(`word-${i}`).setAttribute("data-selected",-1)
    console.log(selected_words)

    select_count--;

    for(let i=0;i<3;i++){

        if(i<selected_words.length)
        document.getElementById(`index-${i}`).innerText=`${selected_words[i]}`
        else
        document.getElementById(`index-${i}`).innerText=`${random_indexes[i]}th Word`

    }

    document.getElementById(`word-${i}`).classList.remove("yellow_border")

    document.getElementById(`cross-${i}`).classList.add("hidden")
    document.getElementById(`cross-${i}`).classList.remove("show")



    // add listener
    e.target.parentElement.addEventListener("click",add_word)


}



