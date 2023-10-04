import React, { useRef, useState } from "react";

const prices = {
  "8x10": {
    mat_price: 15.38,
    moulding_price: 4.0 * 9.95,
    glass_price: 13.08,
    drymount_price: 18.42,
    fitting_price: 15.0,
  },
  "9x12": {
    mat_price: 19.23,
    moulding_price: 4.5 * 9.95,
    glass_price: 16.36,
    drymount_price: 18.75,
    fitting_price: 18.0,
  },
  "11x14": {
    mat_price: 23.07,
    moulding_price: 5.2 * 9.95,
    glass_price: 19.64,
    drymount_price: 20.03,
    fitting_price: 20.0,
  },
  "14x18": {
    mat_price: 26.92,
    moulding_price: 6.3 * 9.95,
    glass_price: 22.92,
    drymount_price: 22.28,
    fitting_price: 23.0,
  },
  "16x20": {
    mat_price: 30.76,
    moulding_price: 7.0 * 9.95,
    glass_price: 26.19,
    drymount_price: 23.56,
    fitting_price: 25.0,
  },
  "18x24": {
    mat_price: 34.46,
    moulding_price: 8.0 * 9.95,
    glass_price: 28.84,
    drymount_price: 23.66,
    fitting_price: 26.0,
  },
  "20x24": {
    mat_price: 38.47,
    moulding_price: 8.3 * 9.95,
    glass_price: 30.69,
    drymount_price: 24.26,
    fitting_price: 27.0,
  },
  "22x28": {
    mat_price: 46.14,
    moulding_price: 9.3 * 9.95,
    glass_price: 37.52,
    drymount_price: 26.05,
    fitting_price: 29.0,
  },
  "24x30": {
    mat_price: 50.21,
    moulding_price: 10.0 * 9.95,
    glass_price: 41.6,
    drymount_price: 27.24,
    fitting_price: 30.0,
  },
  "24x36": {
    mat_price: 53.83,
    moulding_price: 12.0 * 12.95,
    glass_price: 52.04,
    drymount_price: 29.03,
    fitting_price: 32.0,
  },
  "32x40": {
    mat_price: 61.52,
    moulding_price: 14.0 * 12.95,
    glass_price: 69.36,
    drymount_price: 37.36,
    fitting_price: 37.0,
  },
};

function FramingCalculator() {

  const widthInput = useRef();
  const heightInput = useRef();
  const matInput = useRef();

  const [calculatedPrice, setCalculatedPrice] = useState({
    mat_price: 0.0,
    moulding_price: 0.0,
    glass_price: 0.0,
    drymount_price: 0.0,
    fitting_price: 0.0,
  });
  const [error, setError] = useState(" ");

  function handleCalculate() {
    let width = widthInput.current?.value
    let height = heightInput.current?.value
    let useMat = matInput.current?.checked

    let finalWidth = 0;
    let finalHeight = 0;

    if (!width || !height) {
      setError("Please provide width and height of your artwork!");
      return;
    }

    if (!useMat) {
      finalWidth = Number(width);
      finalHeight = Number(height);
    } else {
      finalWidth = Number(width) * 1.618;
      finalHeight = Number(height) * 1.618;
    }

    if (finalWidth > finalHeight) {
      let temp = finalHeight;
      finalHeight = finalWidth;
      finalWidth = temp;
    }

    if (finalWidth > 32 || finalHeight > 40) {
      setError(
        "This size exceeds what our estimator can calculate. Please call us at 817.292.7842 or stop by for a free consultation with one of our expert designers."
      );
      return;
    } else {
      setError(false);
      setCalculatedPrice(getPrice(finalWidth, finalHeight, useMat));
    }
  };

  function getPrice(cw, ch, mat) {
    let keys = Object.keys(prices);
    for (let i = 0; i < keys.length; i++) {
      let [w, h] = keys[i].split("x").map(Number);
      if (w >= cw && h >= ch) {
        !mat && (prices[keys[i]].mat_price = 0.0);
        return prices[keys[i]];
      }
    }
  }

  return (
    <div className="calculator">
      <div className="title">Framing Price Estimator</div>
      <div style={{ display: "flex", gap: "8px", marginBottom:'8px' }}>
        <div className="">
          <div> Width (in)</div>
          <input style={{width:'90%'}}
            type="number"
            className="text"
            ref={widthInput}
          />
        </div>
        <div>
          <div>Height (in)</div>
          <input style={{width:'90%'}}
            type="number"
            className="text"
            ref={heightInput}
          />
        </div>
      </div>
      <div>
        <input
          type="checkbox"
          ref={matInput}
          id="chkMat"
        />
        <label htmlFor="chkMat">Add a Matboard</label>
      </div>
      <div style={{textAlign:'center'}}>
      <input type="button" className="calculate-btn" value='Calculate' onClick={handleCalculate}/>
      </div>
      {error ? (
        <p style={{color:'red', textAlign:'justify'}}>{error}</p>
      ) : (
        <><div className="pricing">
          <div style={{marginTop:'16px', fontWeight:'bold', marginBottom:'6px'}}><div>Items</div><div>Price</div></div>
          <div><div>Matboard Price:</div><div>${calculatedPrice.mat_price.toFixed(2)}</div></div>
          <div> <div> Moulding Price</div><div>${calculatedPrice.moulding_price.toFixed(2)}</div></div>
          <div> <div> Glass Price: </div><div>${calculatedPrice.glass_price.toFixed(2)}</div></div>
          <div> <div> Vacuum Mount: </div><div>${calculatedPrice.drymount_price.toFixed(2)}</div></div>
          <div> <div> Fitting Price: </div><div>${calculatedPrice.fitting_price.toFixed(2)}</div></div>
          <div  style={{marginTop:'10px', fontWeight:'bold', fontSize:'18px'}}> <div> 
            Total Price:</div><div>
            ${(
              calculatedPrice.mat_price +
              calculatedPrice.moulding_price +
              calculatedPrice.glass_price +
              calculatedPrice.drymount_price +
              calculatedPrice.fitting_price
            ).toFixed(2)}
          </div></div>
        </div>
        <p style={{fontSize:'12px', color:'gray', textAlign:'justify'}}>Please note that prices are subject to change once we see the item in person and an online estimate is not a guaranteed price. Estimates are based on using our most basic, cost-effective in-stock moulding, standard matboard (if selected), glass with 99% UV protection, vacuum-mount, and our standard fitting package. Any changes to the moulding, glazing, mounting, or matting will affect the price. <br/> <br/> We would love the opportunity show you what we have to offer in person. Design consultations are complimentary and there are no high-pressure sales. No appointment is required. We look forward to seeing you soon!</p></>
      )}
    </div>
  );
}

export default FramingCalculator;
