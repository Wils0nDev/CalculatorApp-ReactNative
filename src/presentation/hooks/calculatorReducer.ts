

interface Action {
    type:string,
    payload : any
}
export const calculatorReducer = (initialState: string = '0', action: Action) => {

    switch (action.type) {
        case "build_number" : 
        if (initialState.includes('.') && action.payload === '.') return initialState; 

        if (initialState.startsWith('0') || initialState.startsWith('-0')) {
            //Solo podemos tener un punto decimal
            if (action.payload === '.') {
                return initialState + action.payload;
            }
    
            //Evaluar si es otro cero y no hay punto
            if (action.payload === '0' && initialState.includes('.')) {
                //Solo podemos tener un 0 a la izquierda si en caso no hay punto
                return initialState + action.payload;
            }
    
            //Evaluar si es diferente de 0, no hay punto decimal y es el primer numero
    
            if (action.payload !== '0' && !initialState.includes('.')) {
                return action.payload;
            }
    
            //Evitar 0000.000
            if (action.payload === '0' && !initialState.includes('.')) {
                //Solo podemos tener un 0 a la izquierda si en caso no hay punto
                return action.payload;
            }
    
            return initialState + action.payload;
        }
    
        return initialState + action.payload;

        case "operation_number":
            if(action.payload === 'C'){
                return   "0"
            }
            if(action.payload === 'del'){

                const newNumber = initialState.slice(0,-1)

                if (newNumber === "") {
                    return "0";
                }
                return   newNumber
            }
            if(action.payload === '+'){
                
                return initialState + action.payload 
            }

            if(action.payload === '-'){
                

                return initialState + action.payload 
            }

            if(action.payload === '='){

                const numberString = (initialState + action.payload).trim()
                const numbersSum  =  numberString.trim().split("+").filter(n=> n !== "")
                const convertNumber = numbersSum.map(Number);
                let sum : number = 0;
                for (let i = 0; i < convertNumber.length; i++) {
                    sum += convertNumber[i];
                    
                }     

                return initialState + action.payload 
            }
            
            //return   initialState
        default:
            return initialState;
    }

}