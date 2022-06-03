import "./OrderSummary.css";
import * as React from "react";
import Button from "@mui/material/Button";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LibraryBooksRoundedIcon from "@mui/icons-material/LibraryBooksRounded";
import { promoCodeList } from "../data/promoCodeData";

const OrderSummary = (props) => {
  const { cartAmount, itemsInCart, onDisableCartSection, onEnableCartSection } =
    props;
  const [openPanel, setOpenPanel] = React.useState(false);
  const [finalPrice, setFinalPrice] = React.useState(cartAmount);
  const [appliedPromo, setAppliedPromo] = React.useState("");
  const [discountValue, setDiscountValue] = React.useState(0);
  const [disablePromoToggle, setDisablePromoToggle] = React.useState(true);
  const [replay, setReplay] = React.useState(false);

  const getDiscountedPrice = (id) => {
    let selectedPromoCode = promoCodeList.find((ele) => ele.promoId === id);

    if (cartAmount > selectedPromoCode.minValue) {
      let discount = (
        (selectedPromoCode.promoValue / 100) *
        cartAmount
      ).toFixed(2);
      setDiscountValue(discount);

      let priceAfterDiscount = (cartAmount - discount).toFixed(2);

      setAppliedPromo(selectedPromoCode.promoName);
      setFinalPrice(priceAfterDiscount);
      onDisableCartSection();
    } else {
      setAppliedPromo(
        ` ${selectedPromoCode.promoName} is not applicable for this order value.`
      );
      setFinalPrice(cartAmount);
    }
  };

  const addPromoCode = (id) => {
    setOpenPanel(false);
    getDiscountedPrice(id);
    setDisablePromoToggle(false);
    setReplay(true);
  };

  const removePromoCode = () => {
    setFinalPrice(cartAmount);
    setDiscountValue(0);
    setAppliedPromo("");
    onEnableCartSection();
    setDisablePromoToggle(true);
    setReplay(false);
  };

  const togglePromoPanel = () => {
    openPanel ? setOpenPanel(false) : setOpenPanel(true);
  };

  const onReplayClick = () => {
    setFinalPrice(cartAmount);
    setDiscountValue(0);
    setAppliedPromo("");
    onEnableCartSection();
    setDisablePromoToggle(true);
    setReplay(false);
  };

  return (
    <div className="order-summary-container">
      <div>
        <h2>
          <LibraryBooksRoundedIcon /> Order Summary
        </h2>
        <div className="order-summary-wrapper">
          <h4>ITEMS: {itemsInCart}</h4>
          <h4>PRICE: ${cartAmount}</h4>
        </div>
        {disablePromoToggle && (
          <div className="order-summary-promo" onClick={togglePromoPanel}>
            <LocalOfferIcon /> Use available Promo Codes
          </div>
        )}

        {openPanel && (
          <div>
            {promoCodeList.map((promo) => (
              <div key={promo.promoId}>
                <Button
                  className="order-summary-promo-button"
                  onClick={() => addPromoCode(promo.promoId)}
                  style={{ border: "1px dashed black" }}
                >
                  {promo.promoName}
                </Button>
                <p style={{ fontSize: "12px" }}>{promo.promoDescription}</p>
              </div>
            ))}
          </div>
        )}

        <div>
          <h4 className="order-summary-promo-code">
            PROMO:
            <span className="order-summary-promo-value"> {appliedPromo}</span>
            {discountValue !== 0 ? (
              <span>
                (-${discountValue})
                <span
                  className="order-summary-remove-promo"
                  onClick={removePromoCode}
                >
                  REMOVE
                </span>
              </span>
            ) : (
              replay && (
                <span
                  className="order-summary-remove-promo"
                  onClick={onReplayClick}
                >
                  BACK
                </span>
              )
            )}
          </h4>

          <h4>
            TOTAL: {""}${appliedPromo === "" ? cartAmount : finalPrice}
          </h4>
        </div>
      </div>

      <Button variant="contained">Checkout</Button>
    </div>
  );
};

export default OrderSummary;
