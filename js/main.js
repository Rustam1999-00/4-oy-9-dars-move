

var elForm = document.querySelector('.js-form');
var elInput = document.querySelector('.js-input');
var elList = document.querySelector('.js-list');

var elPrivbtn = document.querySelector('.privbtn');
var elNextbtn = document.querySelector('.nextbtn');
var elDark = document.querySelector('.darkbtn');
var elBody = document.querySelector('body');

var key = '1368017a'

let active = 1;

elDark.addEventListener('click',function(){
    elBody.classList.toggle('dark')
})

var renderApi = (arrey, node) => {

    node.innerHTML = ' '

    arrey.forEach((api) => {

        let elItem = document.createElement('li');
        let elImg = document.createElement('img');
        let elTitle = document.createElement('h2');
        let elTitle2 = document.createElement('h2');

        elItem.setAttribute('class', 'col-3 lg-col-3  list-group mt-5  p-0 bg-dark border');
        elImg.setAttribute('width', '100%')
        elImg.src = api.Poster

        elTitle.setAttribute('class', 'text-center text-light mt-4')
        elTitle.textContent = api.Title

        
        elTitle2.setAttribute('class', 'text-center text-light mt-4')
        elTitle2.textContent = `Year = ${api.Year}`


        elItem.appendChild(elImg)
        elItem.appendChild(elTitle);
        elItem.appendChild(elTitle2);


        node.appendChild(elItem)

    })
}
elForm.addEventListener('submit', (evt) =>{
    evt.preventDefault()
if (elInput.value !== ''){
    fetchs()
console.log(active +=1);
}
})

function fetchs() {
    if (active == 1) {
        elPrivbtn.setAttribute('disabled', 'true')
    } else {
        elPrivbtn.removeAttribute('disabled')
    }

    fetch(
        `http://www.omdbapi.com/?apikey=${key}&s=${elInput.value}&page=${active}`
    )
        .then((render) => render.json())
        .then((data) => {
            if (data.Search) {
                console.log(data.Search );
                renderApi (data.Search,elList)
            }
            else{
                elList.innerHTML = `<li><h2 class='text-center'>Films Not fond </h2></li>`
            }

            if(active == Math.ceil(data.totalResults / 10)){
                elNextbtn.setAttribute('disabled', 'true')
            }
            else{
                elNextbtn.removeAttribute('disabled')
            }
        })
}
elPrivbtn.addEventListener('click',()=>{
    active--;
    fetchs()
});
elNextbtn.addEventListener('click',()=>{
    active++;
    fetchs()
})



