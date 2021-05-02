<template>
  <p>Please log in in to GitHub</p>
  <a :href="`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`">Log in</a>
</template>

<script>
import { CLIENT_ID } from '/src/data/config.json'
export default {
  name: 'PageHome',
  setup() {
    return { CLIENT_ID }
  }
}
</script>
