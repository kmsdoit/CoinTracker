import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import styled from "styled-components";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

const Overview = styled.div`
    display : flex;
    background-color : rgba(0,0,0,0.5);
    padding : 10px 20px;
    border-radius : 10px;
    height : 60px;
    margin-bottom : 10px;
    flex-direction : column;
    justify-content : center;
`;

const OverviewItem = styled.div`
    display : flex;
    flex-direction : column;

    span:first-child{
      font-size : 10px;
      font-weight : 400;
      text-transform : uppercase;
      margin-bottom : 5px;
    }
`;

interface PriceProps{
  coinId :string; 
}


function Price({coinId} : PriceProps){
  const {isLoading,data} = useQuery<IHistorical[]>(["ohlcv",coinId], () => fetchCoinHistory(coinId),{refetchInterval : 10000}); 
  return<div>
    {isLoading ? "PriceLoading..." : 
    <>
      <Overview>
          <OverviewItem>
              OPEN PRICE: {data?.slice(-1).reverse().map((price) => price.open.toFixed(2))}
          </OverviewItem>
      </Overview>
      <Overview>
          <OverviewItem>HIGH PRICE:{data?.slice(-1).reverse().map((price) => price.high.toFixed(2))}</OverviewItem>
      </Overview>
      <Overview>
          <OverviewItem>LOW PRICE:{data?.slice(-1).reverse().map((price) => price.low.toFixed(2))}</OverviewItem>
      </Overview>
      <Overview>
          <OverviewItem>CLOSE PRICE:{data?.slice(-1).reverse().map((price) => price.close.toFixed(2))}</OverviewItem>
      </Overview>
      <Overview>
          <OverviewItem>VOLUME PRICE:{data?.slice(-1).reverse().map((price) => price.volume.toFixed(2))}</OverviewItem>
      </Overview>
      </>
    }
  </div>;
}

export default Price;
