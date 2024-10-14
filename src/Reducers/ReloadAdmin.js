function ReloadAdmin(state=false,action){
    switch (action.type) {
     case "reloadAdmin":
         return action.value;
     default:
         return state;
    }
 }
 
 export default ReloadAdmin;