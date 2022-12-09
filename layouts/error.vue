<template>
  <div class="container lp-container">
    <div class="mypage-wrapper">
      <div v-if="error.statusCode === 404" class="text-center page-not-found mt-1">
        {{ $t('not_found') }}
      </div>
    </div>
    <!-- Footer -->
    <div class="copyright">
      © 2022 - Rentracks
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
  layout: 'error',
  props: ['error'],
}
</script>