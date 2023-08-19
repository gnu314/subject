const button = document.getElementById('button');

button.addEventListener('click',function(e){
    const target = e.target;
    const text = target.innerHTML;
    console.log(text);
})
