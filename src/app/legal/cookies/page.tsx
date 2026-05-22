import { PolicyPage } from "@/components/ui/policy-page";

export default function CookiePage() {
  return (
    <PolicyPage title="Cookie Policy">
      <p>The site uses essential storage for the research access gate, cart persistence, authentication sessions, and checkout continuity.</p>
      <p>The research access confirmation may be stored in localStorage and a cookie so returning qualified users do not need to reconfirm every page view.</p>
      <p>Do not use this site if you cannot accept the essential storage required for account, cart, and compliance workflows.</p>
    </PolicyPage>
  );
}
