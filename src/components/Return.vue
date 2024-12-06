<template>
  <div class="container">
    <div class="banner">
      <h2>Matt's Mats</h2>
    </div>
    <div class="content">
      <h2>Details submitted</h2>
      <p>That's everything we need for now</p>
    </div>
    <div class="info-callout">
      <p> This is a sample app for Stripe-hosted Connect onboarding. <a href="https://docs.stripe.com/connect/onboarding/quickstart?connect-onboarding-surface=hosted" target="_blank" rel="noopener noreferrer">View docs</a></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      accountCreatePending: false,
      accountLinkCreatePending: false,
      error: false,
      connectedAccountId: null,
    };
  },
};
</script>