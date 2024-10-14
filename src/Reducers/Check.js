function Check(state=false,action){
    switch (action.type) {
     case "reloadpage":
         return action.value;     
     default:
         return state;
    }
 }
 
 export default Check;