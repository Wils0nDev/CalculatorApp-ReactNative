import {useReducer, useRef, useState} from 'react';
import {calculatorReducer} from './calculatorReducer';

enum Operator {
  add,
  substract,
  multiply,
  divide,
}

export const useCalculator = () => {
  const [number, setNumber] = useState('0');
  const [prevNumber, setPrevNumber] = useState('0');

  //const [number, dispatch] = useReducer(calculatorReducer, initialState);

  const lasOperation = useRef<Operator>();

  const buildNumber = (numberString: string) => {
    if (number.includes('.') && numberString === '.') return;

    if (number.startsWith('0') || number.startsWith('-0')) {
      //Solo podemos tener un punto decimal
      if (numberString === '.') {
        return setNumber(number + numberString);
      }

      //Evaluar si es otro cero y no hay punto
      if (numberString === '0' && number.includes('.')) {
        //Solo podemos tener un 0 a la izquierda si en caso no hay punto
        return setNumber(number + numberString);
      }

      //Evaluar si es diferente de 0, no hay punto decimal y es el primer numero

      if (numberString !== '0' && !number.includes('.')) {
        return setNumber(numberString);
      }

      //Evitar 0000.000
      if (numberString === '0' && !number.includes('.')) {
        //Solo podemos tener un 0 a la izquierda si en caso no hay punto
        return;
      }

      return setNumber(number + numberString);
    }

    setNumber(number + numberString);
  };

  const clean = () => {
    setNumber('0');
    setPrevNumber('0');
  };

  const deleteUltimNumber = () => {
    const newNumber = number.slice(0, -1);

    if (newNumber === '') {
      return setNumber('0');
    }
    setNumber(newNumber);
  };

  const toggleSign = () => {
    if (number.includes('-')) {
      return setNumber(number.replace('-', ''));
    }
    setNumber('-' + number);
  };

  const setLastNumber = () => {
    if (number.endsWith('.')) {
      setPrevNumber(number.slice(0, -1));
    } else {
      setPrevNumber(number);
    }
    setNumber('0');
  };

  const divideOperation = () => {
    setLastNumber();
    lasOperation.current = Operator.divide;
  };

  const multiplyOperation = () => {
    setLastNumber();
    lasOperation.current = Operator.multiply;
  };

  const addOperation = () => {
    setLastNumber();
    lasOperation.current = Operator.add;
  };
  const substractOperation = () => {
    setLastNumber();
    lasOperation.current = Operator.substract;
  };

  const CalculateResult = () => {
    const num1 = Number(number); //transformamos a numero
    const num2 = Number(prevNumber);

    switch (lasOperation.current) {
      case Operator.add:
        setNumber(`${num1 + num2}`);
        setPrevNumber('0');
        break;

      case Operator.substract:
        setNumber(`${num2 - num1}`);
        setPrevNumber('0');
        break;

      case Operator.multiply:
        setNumber(`${num1 * num2}`);
        setPrevNumber('0');
        break;

      case Operator.divide:
        setNumber(`${num2 / num1}`);
        setPrevNumber('0');
        break;

      default:
        throw new Error('Operation not implemented');
    }
  };

  // const buildNumber = (numberString: string) => {
  //   const action = {
  //     type : 'build_number',
  //     payload : numberString
  //    }
  //    dispatch(action)
  // };

  // const operationCalculator = (operator:string) =>{
  //    const action = {
  //     type : 'operation_number',
  //     payload : operator
  //    }
  //    dispatch(action)
  // }

  // const resetUltimNumber = (operator:string) =>{
  //   if(operator === 'C') setNumber('0')
  // }

  return {
    //Properties
    number,
    //methods
    buildNumber,
    clean,
    toggleSign,
    deleteUltimNumber,
    divideOperation,
    multiplyOperation,
    addOperation,
    substractOperation,
    prevNumber,
    CalculateResult,
  };
};
