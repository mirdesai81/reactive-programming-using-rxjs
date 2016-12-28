import {Observable} from "rxjs";


let output = document.getElementById("output");
let button = document.getElementById("button");
let click = Observable.fromEvent(button,"click");




function load(url : string) {
    return Observable.create(observer => {
        let xhr = new XMLHttpRequest();

        xhr.addEventListener("load", () => {
            let data = JSON.parse(xhr.responseText);
            observer.next(data);
            observer.complete();
        });

        xhr.open("GET",url);
        xhr.send();
    });
}

function fetchMovies(movies) {
    movies.forEach(m => {
        let div = document.createElement("div");
        div.innerText = m.title;
        output.appendChild(div);
    })
}


/*click.map(e => load('movies.json')).subscribe(o => console.log(o));*/

click.flatMap(e => load('movies.json')).subscribe(
    fetchMovies,
    e => console.log(`error: ${e}`),
    () => console.log("complete")
);