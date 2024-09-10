import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "@/utils/axios";
import useAuth from "@/hooks/useAuth";
function PaymentForm({ actionType }: { actionType: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const { setUser } = useAuth();

  const handlePayment = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // const response = await stripe.createPaymentMethod({
    //   type: "card",
    //   card: cardElement as any,
    // });

    const { token, error } = await stripe.createToken(cardElement as any);

    // const { token, error } = await stripe.createToken('bank_account', {
    //   country: 'US', // Replace with the desired country
    //   currency: 'usd', // Replace with the desired currency
    //   account_holder_name: 'John Doe', // Replace with the account holder's name
    // });

    if (error) {
      // Handle errors
      console.error(error);
    } else {
      if (actionType === "subscription" && token) {
        const subscriptionResponse: any = await axios.post(
          // "/api/users/payment/",
          // "/api/orders/orderDetails/10/",
          "/api/payments/subscription/",
          {
            type: "card",
            token_id: token.id,
          }
        );
        // setUser(subscriptionResponse.data.user);
        console.log(subscriptionResponse.data);
      }
    }
  };

  const cardElementOptions = {
    hidePostalCode: true, // Hide the ZIP code field
  };

  return (
    <form onSubmit={handlePayment}>
      <CardElement options={cardElementOptions} />
      <button type="submit">Save card</button>
    </form>
  );
}

export default PaymentForm;
