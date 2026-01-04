import { useState } from "react";
import "./App.css";
import emptyImg from "./assets/images/illustration-empty.svg";
import calculator from "./assets/images/icon-calculator.svg";

function App() {
  const [amount, setAmount] = useState("");
  const [years, setYears] = useState("");
  const [rate, setRate] = useState("");
  const [result, setResult] = useState(null);
  const [type, setType] = useState("repayment");
  const [errors, setErrors] = useState({
    amount: false,
    years: false,
    rate: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      amount: amount ? "" : "This field is required",
      years: years ? "" : "This field is required",
      rate: rate ? "" : "This field is required",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      setResult(null);
      return;
    }

    const principal = Number(amount);
    const annualRate = Number(rate) / 100;
    const months = Number(years) * 12;

    if (!principal || !annualRate || !months) return;

    const monthlyRate = annualRate / 12;
    let monthlyPayment;
    let totalPayment;

    if (type === "repayment") {
      monthlyPayment =
        (principal * (monthlyRate * Math.pow(1 + monthlyRate, months))) /
        (Math.pow(1 + monthlyRate, months) - 1);

      totalPayment = monthlyPayment * months;
    } else {
      monthlyPayment = principal * monthlyRate;
      totalPayment = monthlyPayment * months;
    }

    setResult({
      monthly: monthlyPayment.toFixed(2),
      total: totalPayment.toFixed(2),
    });
  };

  const handleClear = () => {
    setAmount("");
    setYears("");
    setRate("");
    setResult(null);
    setErrors({ amount: "", years: "", rate: "" });
  };

  return (
    <div className="app">
      <div className="card">
        <form className="form" onSubmit={handleSubmit}>
          <div className="clear">
            <h3>Mortgage Calculator</h3>
            <button type="button" className="clear-btn" onClick={handleClear}>
              Clear all
            </button>
          </div>

          <div className="field">
            <label>Mortgage Amount</label>
            <div className={`input-box left ${errors.amount ? "error" : ""}`}>
              <span className="addon">£</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            {errors.amount && <p className="form-error">{errors.amount}</p>}
          </div>

          <div className="term-rate">
            <div className="field">
              <label>Mortgage Term</label>
              <div className={`input-box right ${errors.years ? "error" : ""}`}>
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                />
                <span className="addon">years</span>
              </div>
              {errors.years && <p className="form-error">{errors.years}</p>}
            </div>

            <div className="field">
              <label>Interest Rate</label>
              <div className={`input-box right ${errors.rate ? "error" : ""}`}>
                <input
                  type="number"
                  step="0.01"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
                <span className="addon">%</span>
              </div>
              {errors.rate && <p className="form-error">{errors.rate}</p>}
            </div>
          </div>

          <div className="mortgage-type">
            <label
              className={`type-option ${type === "repayment" ? "active" : ""}`}
            >
              <input
                type="radio"
                name="mortgageType"
                value="repayment"
                checked={type === "repayment"}
                onChange={(e) => setType(e.target.value)}
              />
              <span className="radio-custom"></span>
              Repayment
            </label>

            <label
              className={`type-option ${
                type === "interest-only" ? "active" : ""
              }`}
            >
              <input
                type="radio"
                name="mortgageType"
                value="interest-only"
                checked={type === "interest-only"}
                onChange={(e) => setType(e.target.value)}
              />
              <span className="radio-custom"></span>
              Interest Only
            </label>
          </div>

          <button className="calculate" type="submit">
            <img src={calculator} alt="Calculator svg" />
            Calculate Repayments
          </button>
        </form>

        <div className="result">
          {result ? (
            <>
              <div className="completed">
                <p className="your-results">Your results</p>
                <p className="results-text-comp">
                  Your results are shown below based on the information you
                  provided. to adjust the results, edit the form and click
                  "calculate repayments" again.
                </p>
                <div className="results-block">
                  <div className="monthly-repay">
                    <p className="results-text">Your monthly repayment</p>
                    <h1>£{result.monthly}</h1>
                  </div>

                  <div className="divider"></div>

                  <div className="total-repay">
                    <p className="results-text">
                      Total you'll repay over the term
                    </p>
                    <h3>£{result.total}</h3>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="empty">
              <img src={emptyImg} alt="Empty state" />
              <p className="results-header">Results shown here</p>
              <p className="results-text">
                Complete the form and click "calculate repayments" to see what
                your monthly repayments would be.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
