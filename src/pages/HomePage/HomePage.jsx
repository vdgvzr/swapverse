import { getCoinpaprikaApi, getOneInchApi } from "../../api/api";
import { Button, Col, Row } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import SwapForm from "../../components/forms/SwapForm/SwapForm";
import { networks } from "../../api/networks";

function HomePage() {
  // State
  const [tokens, setTokens] = useState([]);
  const [quote, setQuote] = useState({});
  const [chain, setChain] = useState(1);
  const [quoteParams, setQuoteParams] = useState({
    fromToken: "",
    toToken: "",
    amount: 0,
  });
  const [error, setError] = useState("");

  // Handle event functions
  function handleChainChange(chainId) {
    setChain(chainId);
    setQuote({});
    getTokens();
    setQuoteParams({
      fromToken: "",
      toToken: "",
      amount: 0,
    });
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

  const getTokens = useCallback(async () => {
    const getCoins = await getCoinpaprikaApi({
      url: "coins",
    });
    const getTokens = await getOneInchApi({
      url: `/${chain}/tokens`,
    });

    const coins = getCoins
      .filter((coin) => coin.rank >= 1 && coin.rank <= 10)
      .map((coin) => coin.symbol);

    const tokens = Object.values(getTokens.tokens).filter((token) =>
      coins.includes(token.symbol)
    );

    setTokens(tokens);
  }, [chain]);

  // Get quote
  const getQuote = useCallback(
    async (params) => {
      const [fromDecimals, fromAddress] = params.fromToken.split("-");
      const toAddress = params.toToken.split("-")[1];
      const fromUnit = parseInt(params.amount * 10 ** fromDecimals);
      if (fromUnit > 0) {
        try {
          setError("");
          const quote = await getOneInchApi({
            url: `/${chain}/quote?fromTokenAddress=${fromAddress}&toTokenAddress=${toAddress}&amount=${fromUnit}`,
          });
          setQuote(quote);
        } catch (error) {
          setError(error.response.data.description);
        }
      } else {
        setError("");
      }
    },
    [chain]
  );

  useEffect(() => {
    getTokens();
  }, [getTokens]);

  useEffect(() => {
    if (
      quoteParams.fromToken !== "" &&
      quoteParams.toToken !== "" &&
      quoteParams.amount !== 0
    ) {
      getQuote(quoteParams);
    }
  }, [getQuote, quoteParams]);

  const exchangeRate =
    quote.toTokenAmount && quote.fromTokenAmount
      ? quote.toTokenAmount / 10 ** quote.toToken.decimals
      : null;

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
        <Col lg={12}>
          {exchangeRate !== null && !error ? (
            <>
              <p>
                <span>{quoteParams.amount}</span>{" "}
                <span>{quote.fromToken?.symbol}</span> ={" "}
                <span>{exchangeRate}</span> <span>{quote.toToken?.symbol}</span>
              </p>
              <p>Gas Fee: {quote.estimatedGas}</p>
            </>
          ) : null}
        </Col>
        <Col lg={12}>{error !== "" ? error : null}</Col>
        <Col lg={12}>
          <Button
            disabled={!exchangeRate || error === "insufficient liquidity"}
          >
            Swap
          </Button>
        </Col>
      </Row>
    </>
  );
}

export const homeRoute = {
  element: <HomePage />,
};
