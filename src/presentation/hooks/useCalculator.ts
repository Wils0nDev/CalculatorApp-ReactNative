import {useEffect, useReducer, useRef, useState} from 'react';
import {calculatorReducer} from './calculatorReducer';

enum Operator {
  add = '+',
  substract = '-',
  multiply = '*',
  divide = '/',
}

export const useCalculator = () => {
  const [formula, setFormula] = useState('');
  const [number, setNumber] = useState('0');
  const [prevNumber, setPrevNumber] = useState('0');

  const lasOperation = useRef<Operator>();

  useEffect(() => {
    if (lasOperation.current) {
      const firstFormulaPart = formula.split(' ').at(0);
      setFormula(`${firstFormulaPart} ${lasOperation.current} ${number}`);
    } else {
      setFormula(number);
    }
  }, [number]);

  useEffect(()=>{
    const subResult = CalculateSubResult();
    setPrevNumber(`${subResult}`)

  },[formula])

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
    lasOperation.current = undefined;
    setFormula('0');
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
    CalculateResult();
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
    const result = CalculateSubResult();
    setFormula(`${result}`);
    console.log(formula)
    lasOperation.current = undefined;
    setPrevNumber('0');
  };

  const CalculateSubResult = (): number => {

    const [firstValue, operation, SecondValue] = formula.split(' ');
    
    const num1 = Number(firstValue);
    const num2 = Number(SecondValue);

    if (isNaN(num2)) return num1;

    switch (operation) {
      case Operator.add:
        return num1 + num2;

      case Operator.substract:
        return num1 - num2;

      case Operator.multiply:
        return num1 * num2;

      case Operator.divide:
        return num1 / num2;

      default:
        throw new Error('Operation not implemented');
    }
  };

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
    formula,
  };
};
