var title = " react";

var fun = () => {
    return " hello react ";
};

var ele = ( 
    <div>
    <h2> this is { title }item </h2> 
    <p> this is p { 1 + 1 } </p> 
    <span> { fun() } </span> 
    </div>
);

ReactDOM.render(ele, document.getElementById("app"));