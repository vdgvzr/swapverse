import { useLoaderData, useSearchParams } from "react-router-dom";
import { getCoinpaprikaApi, getOneInchApi } from "../../api/api";
import { Col, Row } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import SwapForm from "../../components/forms/SwapForm/SwapForm";
import { networks } from "../../api/networks";

function HomePage() {
  // Loader Data
  const { tokens } = useLoaderData();

  // State
  const [quoteParams, setQuoteParams] = useState({
    fromToken: "",
    toToken: "",
    amount: 0,
  });
  const [quote, setQuote] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  // Handle event functions
  function handleChainChange(chainId) {
    setSearchParams({ chainId: chainId });
    setQuote({});
  }
  function handleFromTokenChange(token) {
    setQuoteParams((prev) => ({ ...prev, fromToken: token }));
  }
  function handleToTokenChange(token) {
    setQuoteParams((prev) => ({ ...prev, toToken: token }));
  }
  function handleAmountChange(e) {
    setQuoteParams((prev) => ({ ...prev, amount: e.target.value }));
  }

  // Get quote
  const getQuote = useCallback(
    async (params) => {
      const chain = searchParams.get("chainId")
        ? searchParams.get("chainId")
        : 1;
      const [fromDecimals, fromAddress] = params.fromToken.split("-");
      const toAddress = params.toToken.split("-")[1];
      const fromUnit = params.amount * 10 ** fromDecimals;
      const quote = await getOneInchApi({
        url: `/${chain}/quote?fromTokenAddress=${fromAddress}&toTokenAddress=${toAddress}&amount=${fromUnit}`,
      });
      setQuote(quote);
    },
    [searchParams]
  );

  useEffect(() => {
    if (
      quoteParams.fromToken !== "" &&
      quoteParams.toToken !== "" &&
      quoteParams.amount !== 0
    ) {
      getQuote(quoteParams);
    }
  }, [getQuote, quoteParams]);

  return (
    <>
      <Row>
        <Col>
          <SwapForm
            networks={networks}
            tokens={tokens}
            handleChainChange={handleChainChange}
            handleFromTokenChange={handleFromTokenChange}
            handleAmountChange={handleAmountChange}
            handleToTokenChange={handleToTokenChange}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          {quoteParams.amount} {quote.fromToken?.symbol} ={" "}
          {quote.toTokenAmount && quote.fromTokenAmount
            ? quote.toTokenAmount / 10 ** quote.toToken.decimals
            : null}{" "}
          {quote.toToken?.symbol}
        </Col>
      </Row>
    </>
  );
}

async function loader({ request: { signal, url } }) {
  const searchParams = new URL(url).searchParams;
  const chain = searchParams.get("chainId") ? searchParams.get("chainId") : 1;

  const getCoins = await getCoinpaprikaApi({
    url: "coins",
    options: { signal },
  });

  const getTokens = await getOneInchApi({
    url: `/${chain}/tokens`,
    options: { signal },
  });

  const coins = getCoins
    .filter((coin) => coin.rank >= 1 && coin.rank <= 10)
    .map((coin) => coin.symbol);

  const tokens = Object.values(getTokens.tokens).filter((token) =>
    coins.includes(token.symbol)
  );

  return { tokens };
}

export const homeRoute = {
  loader,
  element: <HomePage />,
};
