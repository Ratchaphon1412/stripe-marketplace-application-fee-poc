<template>
  <div className="container">
    <div className="banner">
      <h2>Oldies</h2>
    </div>
    <div className="content">
      <h2>Add information to start accepting money</h2>
      <p>Oldies is the world's leading air travel platform: join our team of pilots to help people travel faster.</p>
      <p v-if="error" className="error">Something went wrong!</p>
    </div>
     <div v-if="connectedAccountId || accountLinkCreatePending" class="dev-callout">
      <p v-if="connectedAccountId">Your connected account ID is: <code class="bold">{{ connectedAccountId }}</code></p>
      <p v-if="accountLinkCreatePending">Creating a new Account Link...</p>
    </div>
    <div class="info-callout">
      <p>
        This is a sample app for Stripe-hosted Connect onboarding. <a href="https://docs.stripe.com/connect/onboarding/quickstart?connect-onboarding-surface=hosted" target="_blank" rel="noopener noreferrer">View docs</a>
      </p>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';

export default {
  mounted() {
    const route = useRoute();
    this.connectedAccountId = route.params.account;
    this.createAccountLink();
  },
  data() {
    return {
      accountLinkCreatePending: false,
      error: false,
      connectedAccountId: null,
    };
  },
  methods: {
    createAccountLink() {
      this.accountLinkCreatePending = true;
      this.error = false;
      fetch("/account_link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          account: this.connectedAccountId,
        }),
      }).then((response) =>
        response.json().then((json) => {
          this.accountLinkCreatePending = false;

          const { url, error } = json;
          if (url) {
            window.location.href = url;
          }

          if (error) {
            this.error = true
          }
        })
      );
    },
  },
};
</script>