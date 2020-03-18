import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeHeckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishKey = "pk_test_joipUkxRnPkFiJ86g5MEuKTF00RcCk4kpG";
    const onToken = token => {
        console.log(token);
        alert("Payment is complited");
    };

    return (
        <StripeCheckout
            label="Purchase Now"
            name="Crown clothing Ltd."
            shippingAddress
            billingAddress
            image="https://svgshare.com/i/CUz.svg"
            description={`Your total amount is $ ${price}`}
            amount={priceForStripe}
            panelLabel="Purchase"
            token={onToken}
            stripeKey={publishKey}
        />
    );
};

export default StripeHeckoutButton;
