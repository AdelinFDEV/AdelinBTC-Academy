import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

// References for Context Comparison (approximate values)
const BTC_MCAP = 1300000000000; // $1.3 Trillion
const ETH_MCAP = 400000000000;  // $400 Billion
const SOL_MCAP = 75000000000;   // $75 Billion

// Preset Coin Supplies
const COIN_PRESETS = [
  { name: 'Bitcoin', ticker: 'BTC', supply: 19715000, currentPrice: 65000 },
  { name: 'Ethereum', ticker: 'ETH', supply: 120400000, currentPrice: 3300 },
  { name: 'Solana', ticker: 'SOL', supply: 462000000, currentPrice: 160 },
  { name: 'XRP', ticker: 'XRP', supply: 55600000000, currentPrice: 0.5 },
  { name: 'Cardano', ticker: 'ADA', supply: 35600000000, currentPrice: 0.4 }
];

const Herramientas = () => {
  const [activeTab, setActiveTab] = useState('mcap'); // 'mcap' or 'position'

  // --- State for Market Cap Calculator ---
  const [mcapSupply, setMcapSupply] = useState('100000000'); // 100M default
  const [mcapTargetPrice, setMcapTargetPrice] = useState('1');
  const [mcapCurrentPrice, setMcapCurrentPrice] = useState('');
  const [selectedPreset, setSelectedPreset] = useState('');

  // --- State for Position Size Calculator ---
  const [posCapital, setPosCapital] = useState('1000');
  const [posRiskPercent, setPosRiskPercent] = useState('1');
  const [posEntry, setPosEntry] = useState('60000');
  const [posStop, setPosStop] = useState('58000');
  const [posDirection, setPosDirection] = useState('LONG'); // 'LONG' or 'SHORT'

  // Apply preset to Market Cap Calculator
  const handleApplyPreset = (coin) => {
    setMcapSupply(coin.supply.toString());
    setMcapCurrentPrice(coin.currentPrice.toString());
    setMcapTargetPrice((coin.currentPrice * 2).toString()); // suggest a 2x target
    setSelectedPreset(coin.ticker);
  };

  // Format big numbers nicely
  const formatCurrency = (value) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T (Trillones de USD)`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B (Billones de USD)`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M (Millones de USD)`;
    return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // --- Market Cap Calculations ---
  const supplyNum = parseFloat(mcapSupply) || 0;
  const targetPriceNum = parseFloat(mcapTargetPrice) || 0;
  const currentPriceNum = parseFloat(mcapCurrentPrice) || 0;

  const calculatedMcap = supplyNum * targetPriceNum;
  
  let roiMultiple = 0;
  let roiPercent = 0;
  if (currentPriceNum > 0 && targetPriceNum > 0) {
    roiMultiple = targetPriceNum / currentPriceNum;
    roiPercent = ((targetPriceNum - currentPriceNum) / currentPriceNum) * 100;
  }

  // --- Position Size Calculations ---
  const capNum = parseFloat(posCapital) || 0;
  const riskPercentNum = parseFloat(posRiskPercent) || 0;
  const entryNum = parseFloat(posEntry) || 0;
  const stopNum = parseFloat(posStop) || 0;

  const maxLossUsdt = capNum * (riskPercentNum / 100);
  
  let stopDistancePercent = 0;
  let isStopValid = true;
  let positionSizeUsdt = 0;
  let positionSizeCrypto = 0;
  let recommendedLeverage = 0;

  if (entryNum > 0 && stopNum > 0) {
    if (posDirection === 'LONG') {
      isStopValid = stopNum < entryNum;
      stopDistancePercent = ((entryNum - stopNum) / entryNum) * 100;
    } else {
      isStopValid = stopNum > entryNum;
      stopDistancePercent = ((stopNum - entryNum) / entryNum) * 100;
    }

    if (isStopValid && stopDistancePercent > 0) {
      positionSizeUsdt = maxLossUsdt / (stopDistancePercent / 100);
      positionSizeCrypto = positionSizeUsdt / entryNum;
      if (capNum > 0) {
        recommendedLeverage = positionSizeUsdt / capNum;
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#060608] text-gray-200 relative flex flex-col">
      {/* Background effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/[0.04] rounded-full blur-[150px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-600/[0.03] rounded-full blur-[120px] pointer-events-none -z-10"></div>

      {/* Navbar */}
      <div className="border-b border-white/[0.06] sticky top-0 bg-[#060608]/80 backdrop-blur-md z-50">
        <Navbar />
      </div>

      {/* Page Header */}
      <div className="max-w-6xl mx-auto px-5 pt-16 pb-6 text-center w-full">
        <span className="inline-flex items-center gap-2 text-orange-400/80 text-xs font-bold uppercase tracking-[0.2em] mb-4">
          <span className="w-8 h-px bg-gradient-to-r from-transparent to-orange-500/40"></span>
          Herramientas de Inversión
          <span className="w-8 h-px bg-gradient-to-l from-transparent to-orange-500/40"></span>
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-5 text-white">
          Calculadoras <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500">Cripto</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
          Usa nuestras herramientas gratuitas para proyectar capitalizaciones de mercado de tus monedas favoritas y gestionar tu riesgo de trading de forma matemática y profesional.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex justify-center mb-10 px-5">
        <div className="flex bg-white/[0.02] border border-white/[0.08] p-1 rounded-full backdrop-blur-md">
          <button
            onClick={() => setActiveTab('mcap')}
            className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
              activeTab === 'mcap'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-[0_4px_15px_rgba(255,153,0,0.3)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Market Cap Objetivo
          </button>
          <button
            onClick={() => setActiveTab('position')}
            className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
              activeTab === 'position'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-[0_4px_15px_rgba(255,153,0,0.3)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Gestión de Riesgo & Posición
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-5xl mx-auto w-full px-5 pb-24 flex-1">
        {activeTab === 'mcap' ? (
          /* ====================================================
             MARKET CAP CALCULATOR
             ==================================================== */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-[fadeIn_0.4s_ease-out]">
            
            {/* Left Side: Inputs */}
            <div className="lg:col-span-7 bg-white/[0.01] border border-white/[0.06] rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-orange-500/[0.02] rounded-full blur-[50px] pointer-events-none"></div>
              
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                Calcula el Market Cap Objetivo
              </h2>

              {/* Coin Presets */}
              <div className="mb-6">
                <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">
                  Autocompletar con Criptomoneda Popular:
                </label>
                <div className="flex flex-wrap gap-2">
                  {COIN_PRESETS.map((coin) => (
                    <button
                      key={coin.ticker}
                      onClick={() => handleApplyPreset(coin)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-300 ${
                        selectedPreset === coin.ticker
                          ? 'bg-orange-500/10 border-orange-500 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.2)]'
                          : 'bg-white/[0.02] border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                      }`}
                    >
                      {coin.name} ({coin.ticker})
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-5">
                {/* Circulating Supply Input */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="mcapSupply" className="text-gray-300 text-sm font-semibold">
                      Suministro Circulante (Coins)
                    </label>
                    {selectedPreset && (
                      <span className="text-[10px] text-orange-400/80 font-bold uppercase tracking-wider">
                        Preset de {selectedPreset} activo
                      </span>
                    )}
                  </div>
                  <input
                    type="number"
                    id="mcapSupply"
                    className="w-full bg-black/40 border border-white/10 text-white rounded-2xl px-4 py-3.5 focus:outline-none focus:border-orange-500/50 transition-all font-mono placeholder:text-gray-700"
                    placeholder="Suministro de la moneda, ej. 19715000"
                    value={mcapSupply}
                    onChange={(e) => {
                      setMcapSupply(e.target.value);
                      setSelectedPreset('');
                    }}
                  />
                  <p className="text-[11px] text-gray-500 mt-1">
                    Cantidad total de monedas en circulación actual.
                  </p>
                </div>

                {/* Target Price Input */}
                <div>
                  <label htmlFor="mcapTarget" className="block text-gray-300 text-sm font-semibold mb-2">
                    Precio Objetivo (USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 inset-y-0 flex items-center text-gray-500 font-bold font-mono">$</span>
                    <input
                      type="number"
                      id="mcapTarget"
                      step="any"
                      className="w-full bg-black/40 border border-white/10 text-white rounded-2xl pl-8 pr-4 py-3.5 focus:outline-none focus:border-orange-500/50 transition-all font-mono placeholder:text-gray-700"
                      placeholder="Precio que deseas que alcance, ej. 150000"
                      value={mcapTargetPrice}
                      onChange={(e) => setMcapTargetPrice(e.target.value)}
                    />
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1">
                    El precio hipotético que estás analizando.
                  </p>
                </div>

                {/* Current Price Input (Optional) */}
                <div>
                  <label htmlFor="mcapCurrent" className="block text-gray-300 text-sm font-semibold mb-2">
                    Precio Actual (USD - Opcional)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 inset-y-0 flex items-center text-gray-500 font-bold font-mono">$</span>
                    <input
                      type="number"
                      id="mcapCurrent"
                      step="any"
                      className="w-full bg-black/40 border border-white/10 text-white rounded-2xl pl-8 pr-4 py-3.5 focus:outline-none focus:border-orange-500/50 transition-all font-mono placeholder:text-gray-700"
                      placeholder="Precio de mercado actual, ej. 65000"
                      value={mcapCurrentPrice}
                      onChange={(e) => setMcapCurrentPrice(e.target.value)}
                    />
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1">
                    Rellena este campo para calcular el retorno (ROI) y el multiplicador de tu inversión.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side: Results Display */}
            <div className="lg:col-span-5 bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.06] rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl relative">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                Resultado del Análisis
              </h2>

              <div className="space-y-6">
                
                {/* Needed Market Cap Box */}
                <div className="bg-white/[0.02] border border-white/[0.04] rounded-2xl p-5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-orange-500 to-amber-500"></div>
                  <span className="block text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">
                    Capitalización de Mercado Necesaria:
                  </span>
                  <span className="text-2xl md:text-3xl font-black text-white font-mono break-words leading-tight block">
                    {formatCurrency(calculatedMcap)}
                  </span>
                </div>

                {/* Multiplier / ROI Box (Optional) */}
                {roiMultiple > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/[0.02] border border-white/[0.04] rounded-2xl p-4">
                      <span className="block text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-1">
                        Multiplicador de Ganancia:
                      </span>
                      <span className="text-xl font-black text-emerald-400 font-mono">
                        {roiMultiple.toFixed(2)}x
                      </span>
                    </div>
                    <div className="bg-white/[0.02] border border-white/[0.04] rounded-2xl p-4">
                      <span className="block text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-1">
                        Retorno de Inversión (ROI):
                      </span>
                      <span className="text-xl font-black text-emerald-400 font-mono">
                        {roiPercent >= 0 ? '+' : ''}{roiPercent.toLocaleString(undefined, { maximumFractionDigits: 1 })}%
                      </span>
                    </div>
                  </div>
                )}

                {/* Reality Check Comparison */}
                <div className="bg-white/[0.01] border border-white/[0.04] rounded-2xl p-5">
                  <span className="block text-gray-400 text-xs font-semibold mb-3 uppercase tracking-wider">
                    ¿Es Realista? Comparación de Mercado:
                  </span>
                  
                  <div className="space-y-3.5 text-xs leading-relaxed">
                    
                    {/* Compared to Bitcoin */}
                    <div className="flex items-center justify-between pb-2 border-b border-white/[0.03]">
                      <span className="text-gray-500">Equivale a Bitcoin:</span>
                      <span className={`font-mono font-bold ${calculatedMcap > BTC_MCAP ? 'text-red-400' : 'text-gray-300'}`}>
                        {(calculatedMcap / BTC_MCAP).toFixed(2)}x de BTC ($1.3T)
                      </span>
                    </div>

                    {/* Compared to Ethereum */}
                    <div className="flex items-center justify-between pb-2 border-b border-white/[0.03]">
                      <span className="text-gray-500">Equivale a Ethereum:</span>
                      <span className="font-mono text-gray-300 font-bold">
                        {(calculatedMcap / ETH_MCAP).toFixed(2)}x de ETH ($400B)
                      </span>
                    </div>

                    {/* Compared to Solana */}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Equivale a Solana:</span>
                      <span className="font-mono text-gray-300 font-bold">
                        {(calculatedMcap / SOL_MCAP).toFixed(2)}x de SOL ($75B)
                      </span>
                    </div>

                  </div>
                </div>

                {/* Warning Card if it exceeds Bitcoin */}
                {calculatedMcap > BTC_MCAP ? (
                  <div className="bg-red-500/10 border border-red-500/25 rounded-2xl p-4 flex gap-3 text-red-400 text-xs leading-relaxed">
                    <svg className="shrink-0 w-5 h-5 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                    </svg>
                    <div>
                      <strong className="block mb-0.5">Advertencia de Viabilidad:</strong>
                      El market cap requerido supera la capitalización actual de todo Bitcoin ({formatCurrency(BTC_MCAP)}). Para alcanzar este precio, se necesitaría un volumen de dinero masivo y una entrada de capital institucional sin precedentes históricos.
                    </div>
                  </div>
                ) : calculatedMcap > ETH_MCAP ? (
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex gap-3 text-amber-400 text-xs leading-relaxed">
                    <svg className="shrink-0 w-5 h-5 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <div>
                      <strong className="block mb-0.5">Atención de Tamaño:</strong>
                      Este objetivo requiere una capitalización mayor que la de Ethereum ({formatCurrency(ETH_MCAP)}). Esto colocaría a tu activo en el puesto #2 global de todo el mercado cripto.
                    </div>
                  </div>
                ) : calculatedMcap > 0 ? (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex gap-3 text-emerald-400 text-xs leading-relaxed">
                    <svg className="shrink-0 w-5 h-5 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <div>
                      <strong className="block mb-0.5">Objetivo Moderado:</strong>
                      El market cap necesario es menor que el de Ethereum. Dependiendo de los fundamentos del proyecto y el ciclo alcista general, este objetivo de precio se encuentra en rangos teóricamente viables.
                    </div>
                  </div>
                ) : null}

              </div>
            </div>

          </div>
        ) : (
          /* ====================================================
             POSITION SIZE CALCULATOR
             ==================================================== */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-[fadeIn_0.4s_ease-out]">
            
            {/* Left Side: Inputs */}
            <div className="lg:col-span-7 bg-white/[0.01] border border-white/[0.06] rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl relative">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-orange-500/[0.02] rounded-full blur-[50px] pointer-events-none"></div>

              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                Calcula la Gestión de tu Riesgo
              </h2>

              {/* Trade Direction Toggle */}
              <div className="mb-6">
                <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2.5">
                  Dirección de la Operación:
                </label>
                <div className="grid grid-cols-2 gap-3 p-1 bg-black/40 border border-white/5 rounded-2xl">
                  <button
                    onClick={() => {
                      setPosDirection('LONG');
                      // Auto-invert stop loss if logical to prevent instant error in UX
                      if (parseFloat(posStop) > parseFloat(posEntry)) {
                        setPosStop((parseFloat(posEntry) * 0.95).toString());
                      }
                    }}
                    className={`py-2.5 rounded-xl text-sm font-bold uppercase transition-all duration-300 ${
                      posDirection === 'LONG'
                        ? 'bg-emerald-600 text-white shadow-[0_4px_15px_rgba(16,185,129,0.3)]'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    LONG (Compra)
                  </button>
                  <button
                    onClick={() => {
                      setPosDirection('SHORT');
                      // Auto-invert stop loss if logical
                      if (parseFloat(posStop) < parseFloat(posEntry)) {
                        setPosStop((parseFloat(posEntry) * 1.05).toString());
                      }
                    }}
                    className={`py-2.5 rounded-xl text-sm font-bold uppercase transition-all duration-300 ${
                      posDirection === 'SHORT'
                        ? 'bg-red-600 text-white shadow-[0_4px_15px_rgba(239,68,68,0.3)]'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    SHORT (Venta)
                  </button>
                </div>
              </div>

              <div className="space-y-5">
                
                {/* Grid for Capital and Risk */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Capital Input */}
                  <div>
                    <label htmlFor="posCapital" className="block text-gray-300 text-sm font-semibold mb-2">
                      Capital de la Cuenta (USDT)
                    </label>
                    <input
                      type="number"
                      id="posCapital"
                      className="w-full bg-black/40 border border-white/10 text-white rounded-2xl px-4 py-3.5 focus:outline-none focus:border-orange-500/50 transition-all font-mono"
                      placeholder="Ej. 1000"
                      value={posCapital}
                      onChange={(e) => setPosCapital(e.target.value)}
                    />
                  </div>

                  {/* Risk % Input */}
                  <div>
                    <label htmlFor="posRisk" className="block text-gray-300 text-sm font-semibold mb-2">
                      Riesgo Asumido (%)
                    </label>
                    <input
                      type="number"
                      id="posRisk"
                      step="0.1"
                      className="w-full bg-black/40 border border-white/10 text-white rounded-2xl px-4 py-3.5 focus:outline-none focus:border-orange-500/50 transition-all font-mono"
                      placeholder="Ej. 1"
                      value={posRiskPercent}
                      onChange={(e) => setPosRiskPercent(e.target.value)}
                    />
                  </div>

                </div>

                {/* Grid for Entry and Stop Loss */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Entry Price */}
                  <div>
                    <label htmlFor="posEntry" className="block text-gray-300 text-sm font-semibold mb-2">
                      Precio de Entrada (USDT)
                    </label>
                    <input
                      type="number"
                      id="posEntry"
                      step="any"
                      className="w-full bg-black/40 border border-white/10 text-white rounded-2xl px-4 py-3.5 focus:outline-none focus:border-orange-500/50 transition-all font-mono"
                      placeholder="Ej. 60000"
                      value={posEntry}
                      onChange={(e) => setPosEntry(e.target.value)}
                    />
                  </div>

                  {/* Stop Loss Price */}
                  <div>
                    <label htmlFor="posStop" className="block text-gray-300 text-sm font-semibold mb-2">
                      Precio de Stop Loss (USDT)
                    </label>
                    <input
                      type="number"
                      id="posStop"
                      step="any"
                      className={`w-full bg-black/40 border text-white rounded-2xl px-4 py-3.5 focus:outline-none transition-all font-mono ${
                        isStopValid ? 'border-white/10 focus:border-orange-500/50' : 'border-red-500 focus:border-red-500'
                      }`}
                      placeholder="Ej. 58000"
                      value={posStop}
                      onChange={(e) => setPosStop(e.target.value)}
                    />
                  </div>

                </div>

                {/* Validation Warnings */}
                {!isStopValid && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-xs">
                    {posDirection === 'LONG' ? (
                      <span><strong>Error:</strong> En una operación en compra (LONG), el precio del Stop Loss debe ser <strong>inferior</strong> al precio de entrada.</span>
                    ) : (
                      <span><strong>Error:</strong> En una operación en venta (SHORT), el precio del Stop Loss debe ser <strong>superior</strong> al precio de entrada.</span>
                    )}
                  </div>
                )}

              </div>
            </div>

            {/* Right Side: Results Display */}
            <div className="lg:col-span-5 bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.06] rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl relative">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                Parámetros de Posición
              </h2>

              <div className="space-y-5">
                
                {/* Max Risk USDT */}
                <div className="bg-white/[0.02] border border-white/[0.04] rounded-2xl p-4.5">
                  <span className="block text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">
                    Pérdida Máxima Planificada (Riesgo):
                  </span>
                  <span className="text-xl font-black text-red-400 font-mono">
                    -${maxLossUsdt.toFixed(2)} USDT
                  </span>
                  <span className="block text-[10px] text-gray-500 mt-0.5">
                    ({posRiskPercent}% del capital total)
                  </span>
                </div>

                {/* Stop Loss Distance */}
                <div className="bg-white/[0.02] border border-white/[0.04] rounded-2xl p-4.5">
                  <span className="block text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">
                    Distancia al Stop Loss:
                  </span>
                  <span className="text-xl font-black text-orange-400 font-mono">
                    {isStopValid ? `${stopDistancePercent.toFixed(2)}%` : 'Inválida'}
                  </span>
                </div>

                {/* Recommended Position Size */}
                <div className="bg-white/[0.02] border border-white/[0.04] rounded-2xl p-5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-orange-500 to-amber-500"></div>
                  <span className="block text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">
                    Tamaño de Posición Recomendado:
                  </span>
                  <span className="text-2xl font-black text-white font-mono block leading-tight">
                    {isStopValid ? `${positionSizeUsdt.toLocaleString(undefined, { maximumFractionDigits: 2 })} USDT` : '0.00 USDT'}
                  </span>
                  <span className="block text-xs text-gray-400 font-mono mt-1">
                    Equivale a:{' '}
                    <strong className="text-white font-bold">
                      {isStopValid ? positionSizeCrypto.toLocaleString(undefined, { maximumFractionDigits: 6 }) : '0.00'}
                    </strong>{' '}
                    unidades del activo
                  </span>
                </div>

                {/* Leverage Card */}
                {isStopValid && positionSizeUsdt > 0 && (
                  <div className="bg-white/[0.01] border border-white/[0.04] rounded-2xl p-4.5 text-xs">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-500 font-semibold">Apalancamiento Requerido:</span>
                      <span className="font-mono text-gray-300 font-bold">
                        {recommendedLeverage.toFixed(2)}x
                      </span>
                    </div>
                    
                    {recommendedLeverage > 1 ? (
                      <p className="text-amber-400/90 leading-relaxed mt-2 bg-amber-500/5 p-3 rounded-xl border border-amber-500/10">
                        ⚠️ <strong>Nota sobre Apalancamiento:</strong> Esta posición excede tu capital disponible en cuenta. Necesitas operar con apalancamiento mínimo de <strong>{Math.ceil(recommendedLeverage)}x</strong> en mercado de futuros para abrir esta posición.
                      </p>
                    ) : (
                      <p className="text-emerald-400/95 leading-relaxed mt-2 bg-emerald-500/5 p-3 rounded-xl border border-emerald-500/10">
                        ✅ <strong>Operación Spot Viable:</strong> El tamaño de la posición es menor que tu capital disponible. Puedes operarlo en el mercado SPOT sin apalancamiento (1x).
                      </p>
                    )}
                  </div>
                )}

              </div>
            </div>

          </div>
        )}

        {/* Affiliate Links & Resources Card */}
        <div className="mt-16 bg-white/[0.02] border border-white/[0.08] rounded-3xl p-8 backdrop-blur-md shadow-2xl">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
              Herramientas de Trading Recomendadas
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              El análisis y la ejecución adecuados requieren plataformas líderes del sector. Hemos negociado ofertas exclusivas para los alumnos de la academia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* MEXC Card */}
            <div className="bg-white/[0.01] border border-white/[0.05] hover:border-blue-500/25 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-4">
                  Exchange de Confianza
                </span>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  MEXC Global
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  El exchange con mayor variedad de tokens y la tarifa más baja del mercado: <strong>0% comisiones</strong> tanto en SPOT como en Futuros. Al registrarte con nuestro enlace recibes un bono de 10 USDT de bienvenida.
                </p>
              </div>
              <a
                href="https://www.mexc.com/es-ES/register?inviteCode=mexc-1xydM"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm py-3 px-4 rounded-xl transition-colors shadow-lg shadow-blue-600/15"
              >
                Registrarme en MEXC (+10 USDT)
              </a>
            </div>

            {/* TradingView Card */}
            <div className="bg-white/[0.01] border border-white/[0.05] hover:border-emerald-500/25 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-4">
                  Análisis Técnico
                </span>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                  TradingView
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  La plataforma imprescindible para analizar gráficos en tiempo real. Utilizando nuestro enlace de invitación obtienes un <strong>descuento de $15 (un 50% de ahorro)</strong> en el momento que te actualices a un plan superior.
                </p>
              </div>
              <a
                href="https://es.tradingview.com/?aff_id=133080"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm py-3 px-4 rounded-xl transition-colors shadow-lg shadow-emerald-600/15"
              >
                Acceder a TradingView (15$ Dto.)
              </a>
            </div>

          </div>
        </div>

      </div>

      {/* Footer disclaimer copy from App.jsx */}
      <footer className="py-12 border-t border-white/[0.04] text-center bg-[#060608] mt-auto">
        <div className="max-w-4xl mx-auto px-5">
          <p className="text-gray-600 text-xs leading-relaxed">
            <strong className="text-gray-500">DESCARGO DE RESPONSABILIDAD:</strong> Las calculadoras e información mostradas tienen propósitos estrictamente educativos. No constituyen asesoría de inversión. El comercio de criptomonedas implica un riesgo significativo.
          </p>
          <p className="text-gray-700 text-xs mt-4">
            © {new Date().getFullYear()} AdelinBTC Academy. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Herramientas;
