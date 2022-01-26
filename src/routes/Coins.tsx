import styled from "styled-components";
import {Link} from 'react-router-dom';
import {useState,useEffect} from 'react';
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";

interface ICoinsProps{
  toggleDark : () => void;
}

const Container = styled.div`
    padding : 0px 20px;
    max-width : 480px;
    margin : 0 auto;
`;

const Header = styled.div`
  height : 10vh;
  display : flex;
  justify-content : center;
  align-items : center;
`;

const Img = styled.img`
 width : 35px;
 height : 35px;
 margin-right : 10px;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
    background-color : white;
    color : ${(props) => props.theme.textColor};
    padding : 20px;
    border-radius:15px;
    margin-bottom : 10px;
    a {
      display : flex;
      align-items : center;
      padding : 20px;
      transition : color 0.2s ease-in;
    }
    &:hover {
      a{
        color : ${(props) => props.theme.accentColor}
      }
    }
`;


const Title = styled.h1`
    font-size : 48px;
    color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align : center;
  display : block;
`;

interface CoinInterface {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string
}

function Coins({toggleDark} : ICoinsProps){
    const {isLoading,data} = useQuery<CoinInterface[]>("allCoins", fetchCoins)
    return(
      <Container>
        <Helmet>
          <title>CoinList</title>
        </Helmet>
        <Header>
          <Title>CoinList</Title>
          <button onClick={toggleDark}>Toggle Dark Mode</button>
        </Header>
        {isLoading ? <Loader>Loading...</Loader>:
        <CoinList>
            {data?.slice(0,100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={{
                pathname : `/${coin.id}`,
                state : {name:coin.name}
              }}>
                  <Img src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}></Img>{coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>}
      </Container>
    );
}

export default Coins;
