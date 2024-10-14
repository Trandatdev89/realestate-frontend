function Reload(state=false,action){
   switch (action.type) {
    case "reload":
        return action.value;
    case "reloadpage":
        return action.value;     
    default:
        return state;
   }
}

export default Reload;