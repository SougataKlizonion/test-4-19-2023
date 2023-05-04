import Add from "../constant";
import Remove from "../constant";

export const add= (data)=>{

    return{
        type:Add,
        data:data
    }
}
export const remove= (data)=>{

    return{
        type:Remove,
        data:data
    }
}