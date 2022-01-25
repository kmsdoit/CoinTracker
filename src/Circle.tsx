import { useState } from 'react';
import styled from 'styled-components';


interface ContainerProps {
    bgColor : string;
    borderColor ?: string;
}

const Container = styled.div<ContainerProps>`
    width : 200px;
    height : 200px;
    background-color: ${(props) => props.bgColor}
    border-radius : 100px;
    border : 1px solid ${(props) => props.borderColor} 
`;


interface CircleProps {
    bgColor : string; // <-- required props
    borderColor ?: string; /* <-- optional props*/ 
    text ?: string;
}

function Circle({bgColor,borderColor,text = "default text"}: CircleProps){
    const [counter,setCounter] = useState(1);
    const [vaue,setValue] = useState<number|string>(0); //<-- 이렇게 선언한다면 string 또는 number 값이 들어올 수 있다
    setCounter(2);
    //setCounter("hello") <-- it is Error => 타입스크립트가 에러를 스스로 잡아줌
    return <Container bgColor={bgColor} borderColor = {borderColor ?? bgColor}>{text}</Container>
}

export default Circle;

interface playerShape{
    name : string,
    age : number
}

const sayHello = (playerObj:playerShape)=>`Hello ${playerObj.name} you are ${playerObj.age} years old`;

sayHello({name:"ms",age:12});