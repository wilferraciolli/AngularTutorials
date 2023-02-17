interface Order {
  id: string;
  amount: number;
  currency: string;
}

interface Stripe {
  type: 'stripe'; // add common property to check types, this defines the only value this will ever accept
  card: string;
  cvc: string;
}

interface PayPal {
  type: 'paypal'; // add common property to check types, this defines the only value this will ever accept
  email: string;
}

type CheckoutCard = Order & Stripe;
type CheckoutPayPal = Order & PayPal;

const order: Order = {
  id: 'xj28s',
  amount: 100,
  currency: 'USD'
};

const orderCard: CheckoutCard = {
  ...order,
  type: 'stripe', // assign the only value available to this property
  card: '1000 2000 3000 4000',
  cvc: '123'
};

const orderPayPal: CheckoutPayPal = {
  ...order,
  type: 'paypal', // assign the only value available to this property
  email: 'abc@def.com'
};

// define the available types
type Payload = CheckoutCard | CheckoutPayPal;

function checkout(payload: Payload) {
  // factory create based on a common property
  if (payload.type === 'stripe') {
    console.log(payload.card, payload.cvc);
  }
  if (payload.type === 'paypal') {
    console.log(payload.email);
  }
}
