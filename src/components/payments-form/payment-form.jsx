import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Button, { BUTTON_TYPES_CLASSES } from "../button/button";
import { PaymentFormContainer, FormContainer } from "./payment-form.styles";

const PaymentForm = () => {

  const stripe = useStripe();
  const elements = useElements();

  const paymentHandler = async (e) => {
    e.preventDefault();


    if (!stripe || !elements) {
      return;
    }

    const response = await fetch('./netlify/functions/create-payment-intent.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({amount: 10000})
    }).then(res => res.json());

    console.log(response);


  }

  return (
    <PaymentFormContainer onSubmit={paymentHandler}>
      <FormContainer>
        <h2>Credit Card Payment:</h2>
        <CardElement />
        <Button buttonType={BUTTON_TYPES_CLASSES.inverted}> Pay Now</Button>
      </FormContainer>
    </PaymentFormContainer>
  );
};
export default PaymentForm;
