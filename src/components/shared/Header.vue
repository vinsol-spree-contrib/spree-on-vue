<template>
  <header class="primary-header">
    <div class="container relative">

        <div class="primary-header__basket absolute active">
          <a href="javascript:void(0);" class="absolute primary-header__basket-link">
            <img src="../../assets/images/basket.svg" alt="" class="absolute">
          </a>
        </div>

        <div class="brand absolute">
          <a href="#">
          </a>
        </div>
      
        <nav class="primary-header__nav">
          <ul class="primary-header__links list-inline text-uppercase text-center margin-0">
            <li class="primary-header__link with-sub-menu">
              <a href="javascript:void(0);" class="link">Link</a>
              <ul class="absolute primary-header__sub-menu padding-0 text-uppercase">
                <li><a href="javascript:void(0);" class="no-underline">Link</a></li>
                <li><a href="javascript:void(0);" class="no-underline">Link</a></li>
                <li><a href="javascript:void(0);" class="no-underline">Link</a></li>
              </ul>
            </li>
            <li class="primary-header__link">
              <a href="javascript:void(0);" class="link">Link</a>
            </li>
            <li class="primary-header__link">
              <a href="javascript:void(0);" class="link">Link</a>
            </li>
            <li class="primary-header__link">
              <a href="javascript:void(0);" class="link">Link</a>
            </li>
          </ul>
        </nav>
      </div>
  </header>
</template>

<script>
  export default {
    name: 'app-header'
  }
</script>
