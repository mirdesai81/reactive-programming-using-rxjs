import {Observable} from "rxjs";
import {load,loadWithFetch} from "./loader";


/*

 let source = Observable.create(observer => {
 observer.next(1);
 observer.next(2);
 observer.error("Stop!");
 //throw new Error('Stop!');
 observer.next(3);
 observer.complete();
 });*/


/*let source = Observable.onErrorResumeNext(
 Observable.of(1),
 Observable.from([2,3,4]),
 Observable.throw(new Error('Stop!')),
 Observable.of(5)
 );*/


let source = Observable.merge(
    Observable.of(1),
    Observable.from([2,3,4]),
    Observable.throw(new Error('Stop!')),
    Observable.of(5)
).catch(e => {
    console.log(`Error Caught: ${e}`);
    return Observable.of(10);
});



source.subscribe(
    value => console.log(`value : ${value}`),
    error => console.log(`error : ${error}`),
    () => console.log("complete")
);


