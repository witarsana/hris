export function getLocalUser(){
    const userStr = localStorage.getItem('user');
    //alert(userStr);
    if (!userStr || userStr=='undefined'){
        return null;       
    }    
    return JSON.parse(userStr);   
}
export function getLocalCompany(){
    const companyStr = localStorage.getItem('company');
    //alert(userStr);
    if (!companyStr || companyStr=='undefined'){
        return null;       
    }  
    //alert(companyStr);  
    return JSON.parse(companyStr);   
}