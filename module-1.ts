import {Observable} from "rxjs";

//use required import only for production use to trim the size of all rxjs imports
//import {Observable} from "rxjs/Observable";
//import {Observer} from "rxjs/Observer";
//import "rxjs/add/operator/map";
//import "rxjs/add/operator/filter";


let numbers = [1,2,3,4];
//let source = Observable.from(numbers);

let source = Observable.create(observer => {
    /*for(let n of numbers) {
     observer.next(n);
     }*/
    let index = 0;

    let produceValue = () => {
        observer.next(numbers[index++]);

        if(index < numbers.length){
            setTimeout(produceValue,250);
        } else {
            observer.complete();
        }

    };
    produceValue();
    //observer.complete();
}).map(n => n * 2).filter(n => n > 4);

source.subscribe(
    value => console.log(`value: ${value}`),
    e => console.log(`error: ${e}`),
    () => console.log("complete")
);