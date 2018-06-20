<template>
  <section class="newsletter split-section">
    <div class="container text-center">
      <div class="container__inner bg-yellow-light">
        <div class="row">
          <div class="col-md-6">
            <img src="../../assets/images/home-newsletter.png" alt="" class="max-full">
          </div>
          <div class="col-md-6 content">
            <h2 class="h2 split-section__heading text-uppercase">
                Signup to our newsletter
              <br>for the best offers and news,
              <br> straight to your inbox.
            </h2>
            <form class="newsletter__form mx-auto">
              <div class="form-group margin-0 relative">
                <input type="email" class="form-input" placeholder="Your Email Address">
                <button type="submit" class="absolute">
                  <img src="../../assets/images/arrow_right.png" alt="" class="absolute">
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'newsletter'
  }
</script>
