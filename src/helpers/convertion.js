export function convertToMoney(value){
    let val = (value/1).toFixed(2).replace('.', ',');
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

export function appendLeadingZeroes(n){
    if(n <= 9){
        return "0" + n;
    }
    return n
}

export function convertDateDMY(date){
    
    let newDate = new Date(date);
    return appendLeadingZeroes(newDate.getDate()) + "/" + appendLeadingZeroes((newDate.getMonth() + 1)) + "/" + newDate.getFullYear();
}

export function convertDateYMD(date){
    //alert(date);
    let newDate = new Date(date);
    return appendLeadingZeroes(newDate.getFullYear()) + "/" + appendLeadingZeroes((newDate.getMonth() + 1)) + "/" + newDate.getDate();
}