import React, { useEffect, useRef } from "react";

const TradingViewWidget: React.FC = () => {
    const widgetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (widgetRef.current && widgetRef.current.childElementCount === 0) {
            // Añade el script de TradingView solo una vez
            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
            script.async = true;
            script.innerHTML = JSON.stringify({
                symbols: [
                    { proName: "FOREXCOM:SPXUSD", title: "S&P 500 Index" },
                    { proName: "FOREXCOM:NSXUSD", title: "US 100 Cash CFD" },
                    { proName: "FX_IDC:EURUSD", title: "EUR to USD" },
                    { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
                    { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
                ],
                showSymbolLogo: true,
                isTransparent: false,
                displayMode: "adaptive",
                colorTheme: "dark",
                locale: "en",
            });
            widgetRef.current.appendChild(script);
        }
    }, []); // Dependencias vacías aseguran que se ejecute solo una vez

    return (
        <div className="tradingview-widget-container">
            <div ref={widgetRef} className="tradingview-widget-container__widget"></div>
          
        </div>
    );
};

export default TradingViewWidget;
