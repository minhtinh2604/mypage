<template>
  <div class="container lp-container">
    <div class="mypage-wrapper">
      <!-- Profile -->
      <div class="mypage-profile" :lazy-background="cover_image">
        <div class="profile-content d-flex flex-col">
          <div class="profile-avatar">
            <div class="img-wrapper" :lazy-background="avatar_image">
            </div>
          </div>
          <div class="profile-info w-100">
            <div class="profile-title">{{page_name}}</div>
            <div class="profile-description">{{page_description}}</div>
            <div class="profile-links">
              <a v-if="facebook_url != null && facebook_url != ''" :href="facebook_url" target="_blank"><img class="link-icon" src="/img/facebook.svg"></a>
              <a v-if="instagram_url != null && instagram_url != ''" :href="instagram_url" target="_blank"><img class="link-icon" src="/img/instagram.svg"></a>
              <a v-if="tiktok_url != null && tiktok_url != ''" :href="tiktok_url" target="_blank"><img class="link-icon" src="/img/tiktok.svg"></a>
            </div>
          </div>
        </div>
      </div>
      <!-- Search -->
      <div class="search-wrapper mt-3">
        <div class="input-group">
            <input id="input-search" type="text" class="form-control rounded-pill rounded-end input-search" :placeholder="$t('search_placeholder')" aria-describedby="button-search" @keyup.enter="search_product" @keyup="input_search_change">
          <button 
            id="button-search" 
            class="btn btn-outline-secondary rounded-pill rounded-start px-3" 
            type="button" 
            @click="search_product"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg></button>
        </div>
      </div>

      <!-- Copy -->
      <!-- <button 
          id="btn-tooltip" 
          class="btn btn-sm btn-primary btn-copy mt-3"
          data-clipboard-text="Just because you can doesn't mean you should — clipboard.js"
          data-bs-toggle="tooltip" 
          data-bs-placement="top"
          data-bs-custom-class="custom-tooltip"
          data-bs-title="Copied!"
          data-bs-trigger="manual"
      >
          Copy to clipboard
      </button> -->

      <!-- Category -->
      <div class="list-category-wrapper position-relative">
        <div ref="categorySwiper" class="my-3 swiper list-category">
          <div class="swiper-wrapper">
            <div :class="'swiper-slide text-nowrap btn btn-sm btn-outline-secondary category active category-' + all_category_key" @click="change_category(all_category_key)">{{ $t('all') }}</div>
            <div
              v-for="category in category_not_empty_array" 
              :key="category.category_id" 
              :class="'swiper-slide text-nowrap btn btn-sm btn-outline-secondary category category-' + category.category_id"
              @click="change_category(category.category_id)"
            >
              {{category.category_name}}
            </div>
            <div v-if="number_product_not_in_existed_category > 0" :class="'swiper-slide text-nowrap btn btn-sm btn-outline-secondary category category-' + others_category_key" @click="change_category(others_category_key)">{{ $t('others_category') }}</div>
          </div>
        </div>
      </div>
      <!-- Product -->
      <div
        :key="current_category" 
        :class="'category category-' + current_category"
      >
        <div v-if="page_loaded == true && product_array_by_category.length > 0">
          <div class="product-wrapper">
            <div
              v-for="(product, product_index) in product_array_by_category"
              :key="product.product_id" 
              :class="(product_index  > number_items_show - 1) ? 'product-item product-item-' + product.product_id + ' d-none':'product-item product-item-' + product.product_id"
            >
              <a :href="product.affiliate_link" target="_blank">
                <div>
                  <img v-if="product.image_link != ''" v-lazy-load class="product-image" :data-src="product.image_link"/>
                  <img v-else v-lazy-load class="product-image" :data-src="product_placeholder"/>
                  <div class="product-name">
                    {{product.product_name}}
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div v-if="product_array_by_category.length > number_items_show" :class="'btn-load-more-product btn-load-more-product-category-' + current_category" @click="show_all('category-' + current_category)">{{ $t('show_all') }} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down " viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/></svg></div>
        </div>
      </div>

      <div v-if="show_spinner == true" class="text-center mt-2">
        <div class="spinner-border mypage-spinner-border" role="status">
            <span class="visually-hidden"></span>
        </div>
      </div>
      <div v-if="no_results == true" class="text-center not-found-product mt-3">
        {{ $t('no_results') }}
      </div>
    </div>
    <!-- Footer -->
    <div class="copyright">
      © 2022 - Rentracks
    </div>
  </div>
</template>

<script>
import  { Swiper } from 'swiper';
import 'swiper/swiper-bundle.min.css'
import utils from '@/utils/utils.js'

export default {
  name: 'Layout2Index',
  data: () => ({
    product_array_by_category: [],
    category_ids:[],
    others_category_key: 'others',
    all_category_key: 'all',
    number_items_show: 12,
    show_spinner: false,
    page_loaded: false,
    no_results: false,
    current_category: '',
    category_not_empty_array: [],
    number_product_not_in_existed_category: 0,
  }),
  computed: {
    page_name () {
      return this.$store.getters['my_page/getPageName']
    },
    page_description () {
      return this.$store.getters['my_page/getPageDescription']
    },
    avatar_image () {
      return this.$store.getters['my_page/getAvatar']
    },
    cover_image () {
      return this.$store.getters['my_page/getCover']
    },
    facebook_url () {
      return this.$store.getters['my_page/getFacebookUrl']
    },
    instagram_url () {
      return this.$store.getters['my_page/getInstagramUrl']
    },
    tiktok_url () {
      return this.$store.getters['my_page/getTiktokUrl']
    },
    product_array () {
      return this.$store.getters['my_page/getProductItems']
    },
    category_array (){
      return this.$store.getters['my_page/getCategories']
    },
    page_template () {
      return this.$store.getters['my_page/getPageTemplate']
    },
    product_placeholder (){
      return this.$store.getters['my_page/getProductPlaceholder']
    }
  },
  mounted(){
    this.current_category = this.all_category_key
    this.create_product_by_category_array(this.current_category)
    this.initCategorySwiper()

    // const ClipboardJS = require("clipboard")
    // const bootstrap = require('bootstrap')
    // const clipboard = new ClipboardJS('.btn-copy')
    // clipboard.on('success', function(e) {
    //     const exampleEl = document.getElementById('btn-tooltip')
    //     const myTooltipEl = bootstrap.Tooltip.getOrCreateInstance(exampleEl)
    //     exampleEl.addEventListener('show.bs.tooltip', () => {
    //         setTimeout(function () {
    //             myTooltipEl.hide()
    //           }, 1000);
    //     })
    //     myTooltipEl.show()
    //     e.clearSelection()
    // })
  },
  methods: {
    initCategorySwiper(){
      /* eslint-disable */
      const swiper = new Swiper(this.$refs.categorySwiper, {
        direction: 'horizontal',
        loop: false,
        slidesPerView: "auto",
        spaceBetween: 6,
        freeMode: true,
        observer: true, 
        observeParents: true
      })
      /* eslint-disable */
    },
    create_product_by_category_array(category_key){
      this.show_spinner = true
      for(let i = 0; i < this.category_array.length ; i++){
        this.category_ids.push(this.category_array[i].category_id)
      }
    
      switch(category_key) {
        case this.all_category_key:
          this.product_array_by_category = []
          for(let i = 0; i < this.product_array.length ; i++){
            const product = this.product_array[i]
            this.product_array_by_category.push(product) 
          }
          break;
        case this.others_category_key:
          this.product_array_by_category = []
          for(let i = 0; i < this.product_array.length ; i++){
            const product = this.product_array[i]
            if (!('category_id' in product) || product.category_id === '' || product.category_id === null || !(this.category_ids.includes(product.category_id))){
              this.product_array_by_category.push(product) 
            }
          }
          break;
        default:
          for(let i = 0; i < this.product_array.length ; i++){
            const product = this.product_array[i]
            if ('category_id' in product && product.category_id !== '' && product.category_id !== null && product.category_id === category_key){
              this.product_array_by_category.push(product) 
            }
          }
          break;
      }
      this.count_category_not_empty()
      this.show_spinner = false
      this.page_loaded = true
    },
    count_category_not_empty(){
      this.category_not_empty_array = []
      for(let i = 0; i < this.category_array.length ; i++){
        const category = this.category_array[i]
        let count = 0
        for(let j = 0; j < this.product_array.length ; j++){
          const product = this.product_array[j]
          if ('category_id' in product && product.category_id === category.category_id){
             count++
          }
          if (!('category_id' in product) || product.category_id === '' || product.category_id === null || !(this.category_ids.includes(product.category_id))){
            this.number_product_not_in_existed_category++
          }
        }
        if (count > 0){
          this.category_not_empty_array.push(category)
        }
      }
    },
    input_search_change(){
      const search_term = document.getElementById('input-search').value
      if (search_term.length === 0){ this.search_product() }
    },
    show_all(category_id) {
      const elements = document.querySelectorAll('.' + category_id + ' .product-item.d-none');
      for (const ele of elements) { ele.classList.remove('d-none'); }
      event.target.classList.add('d-none')
    },
    search_product(){
      this.show_spinner = true
      let search_term = document.getElementById('input-search').value
      search_term = utils.removeDiacritics(search_term).toLowerCase()

      switch(this.current_category) {
        case this.all_category_key:
          this.product_array_by_category = []
          for(let i = 0; i < this.product_array.length ; i++){
            const product = this.product_array[i]
            if (utils.removeDiacritics(product.product_name).toLowerCase().includes(search_term)){
                this.product_array_by_category.push(product)
            }
          }
          break;
        case this.others_category_key:
          this.product_array_by_category = []
          for(let i = 0; i < this.product_array.length ; i++){
            const product = this.product_array[i]
            if ((!('category_id' in product) || product.category_id === '' || product.category_id === null || !(this.category_ids.includes(product.category_id))) && utils.removeDiacritics(product.product_name).toLowerCase().includes(search_term)){
              this.product_array_by_category.push(product)
            }
          }
          break;
        default:
          this.product_array_by_category = []
          for(let i = 0; i < this.product_array.length ; i++){
            const product = this.product_array[i]
            if ('category_id' in product && product.category_id === this.current_category && utils.removeDiacritics(product.product_name).toLowerCase().includes(search_term)){
              this.product_array_by_category.push(product) 
            }
          }
          break;
      }
      let count_results = 0
      count_results += this.product_array_by_category.length
      if (count_results === 0){ this.no_results = true }else{ this.no_results = false }
      this.show_spinner = false 
    },
    change_category(category_key){
      this.current_category = category_key
      this.search_product()
      let elements = document.querySelectorAll('.list-category .category.active');
      for (const element of elements) {
        element.classList.remove('active')
      }
      elements = document.querySelectorAll('.list-category .category.category-' + category_key);
      for (const element of elements) {
        element.classList.add('active')
      }
    }
  }
}
</script>

<style type="text/css" scoped>
.mypage-wrapper{
  max-width: 800px;
}
</style>