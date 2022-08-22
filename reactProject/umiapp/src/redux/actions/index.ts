

export type typeAny = string | number | boolean;

export const changeCount = (payload:typeAny)=>{
    return {
        type:"changeCount",
        payload
    }
}