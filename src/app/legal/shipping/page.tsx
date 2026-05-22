import { PolicyPage } from "@/components/ui/policy-page";

export default function ShippingPage() {
  return (
    <PolicyPage title="Shipping Policy">
      <p>Shipping options are calculated during checkout and may be reviewed before fulfilment. Orders are not fulfilled solely from the client redirect after payment.</p>
      <p>Inventory is reduced and order processing begins after payment confirmation is received through the verified Stripe webhook.</p>
      <p>Tracking numbers can be added by administrators and included in shipment notification emails.</p>
    </PolicyPage>
  );
}
