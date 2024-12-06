<template>
  <div class="container">
    <div class="banner">
      <h2>Oldies</h2>
    </div>
    <div class="content">
      <h2 v-if="!connectedAccountId">Get ready for take off</h2>
      <p v-if="!connectedAccountId">Oldies is the world's leading air travel platform: join our team of pilots to help people travel faster.</p>
      <h2 v-if="connectedAccountId">Add information to start accepting money</h2>
      <p v-if="connectedAccountId">Oldies partners with Stripe to help you receive payments while keeping your personal and bank details secure.</p>
      <div v-if="!accountCreatePending && !connectedAccountId">
        <button @click="createAccount">Sign up</button>
      </div>
      <div v-if="connectedAccountId && !accountLinkCreatePending && !connectedAccountUpdated">
        <button @click="createAccountLink">Add information</button>
      </div>
      <p v-if="error" class="error">Something went wrong!</p>
      <div v-if="connectedAccountId || accountCreatePending || accountLinkCreatePending" class="dev-callout">
        <p v-if="connectedAccountId">Your connected account ID is: <code class="bold">{{ connectedAccountId }}</code></p>
        <p v-if="accountCreatePending">Creating a connected account...</p>
        <p v-if="accountLinkCreatePending">Creating a new Account Link...</p>
      </div>
      <div class="info-callout">
        <p>
          This is a sample app for Stripe-hosted Connect onboarding. <a href="https://docs.stripe.com/connect/onboarding/quickstart?connect-onboarding-surface=hosted" target="_blank" rel="noopener noreferrer">View docs</a>
        </p>
      </div>
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
  methods: {
    createAccount() {
      this.accountCreatePending = true;
      this.error = false;
      fetch("/account", {
        method: "POST",
      }).then((response) =>
        response.json().then((json) => {
          this.accountCreatePending = false;
          this.connectedAccountId = json.account;
        })
      );
    },
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