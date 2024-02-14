function getInf(){
    let url = '/T14act1pet';

    fetch(url)
    .then(res => res.json())
    .then(obj => {
        document.getElementById('container').innerHTML = `<p>Hola ${obj.nombre} ${obj.apellidos}</p>`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

window.onload = function() {
    document.getElementById("getName").addEventListener("click", getInf);
}
