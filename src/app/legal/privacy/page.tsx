import { PolicyPage } from "@/components/ui/policy-page";

export default function PrivacyPage() {
  return (
    <PolicyPage title="Privacy Policy">
      <p>We collect account, contact, order, shipping, payment reference, and support information needed to operate the ecommerce service and maintain procurement records.</p>
      <p>Payment card details are handled by Stripe Checkout. We store provider references, payment status, order totals, and webhook payload records needed for reconciliation and support.</p>
      <p>Transactional emails may be sent through Resend for order, payment, shipping, cancellation, refund, and contact-form workflows.</p>
    </PolicyPage>
  );
}
