 const getResult =async (asyncFunction) => {
    try{
        const result = await asyncFunction;
        return [result,null]
    }catch(error){
            return[null,error]
    }
}
export {getResult}
//ejmplo de como se usa:
//const [result,error]= await getResult(fetch("https://api.dominio.com"))