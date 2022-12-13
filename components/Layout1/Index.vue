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
              <a v-if="facebook_url != null && facebook_url != ''" :href="facebook_url" target="_blank"><img class="link-icon" src="/img/facebook.svg" alt="" aria-label="Facebook"></a>
              <a v-if="instagram_url != null && instagram_url != ''" :href="instagram_url" target="_blank"><img class="link-icon" src="/img/instagram.svg" alt="" aria-label="Instagram"></a>
              <a v-if="tiktok_url != null && tiktok_url != ''" :href="tiktok_url" target="_blank"><img class="link-icon" src="/img/tiktok.svg" alt="" aria-label="Tiktok"></a>
            </div>
          </div>
        </div>
      </div>
      <!-- Search -->
      <div class="search-wrapper mt-3">
        <div class="input-group">
          <input id="input-search" name="input-search" type="text" class="form-control rounded-pill rounded-end input-search" :placeholder="$t('search_placeholder')" aria-describedby="button-search" @keyup.enter="search_product" @keyup="input_search_change">
          <button 
            id="button-search" name="button-search"
            class="btn btn-outline-secondary rounded-pill rounded-start px-3" type="button"
            @click="search_product"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg></button>
        </div>
      </div>
      <!-- Category - Product -->
      <div
        v-for="category in category_array" 
        :key="category.category_id" 
        :class="'category category-' + category.category_id"
      >
        <div v-if="page_loaded == true &&  product_array_by_category[category.category_id].length > 0" class="mt-4">
          <h4 class="category-title">{{category.category_name}}</h4>
          <div class="product-wrapper">
            <div
              v-for="(product, product_index) in product_array_by_category[category.category_id]"
              :key="product.product_id" 
              :class="(product_index  > number_items_show - 1) ? 'product-item product-item-' + product.product_id + ' d-none':'product-item product-item-' + product.product_id"
            >
              <a :href="product.affiliate_link" target="_blank">
                <div>
                  <img v-if="product.image_link != ''" v-lazy-load class="product-image" :data-src="product.image_link" alt=""/>
                  <img v-else  v-lazy-load class="product-image" :data-src="product_placeholder" alt=""/>
                  <div class="product-name">
                    {{product.product_name}}
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div v-if="product_array_by_category[category.category_id].length > number_items_show" :class="'btn-load-more-product btn-load-more-product-category-' + category.category_id" @click="show_all('category-' + category.category_id)">{{ $t('show_all') }} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/></svg></div>
        </div>
      </div>
      <!-- Others -->
      <div
        v-if="page_loaded == true &&  others_category_key in product_array_by_category && product_array_by_category[others_category_key].length > 0"
        :class="'category category-' + others_category_key"
      >
        <div class="mt-4">
          <h4 class="category-title">{{ $t('others_category') }}</h4>
          <div class="product-wrapper">
            <div
              v-for="(product, product_index) in product_array_by_category[others_category_key]"
              :key="product.product_id" 
              :class="(product_index  > number_items_show - 1) ? 'product-item product-item-' + product.product_id + ' d-none':'product-item product-item-' + product.product_id"
            >
              <a :href="product.affiliate_link" target="_blank">
                <div>
                  <img v-if="product.image_link != ''" v-lazy-load class="product-image" :data-src="product.image_link" alt=""/>
                  <img v-else v-lazy-load class="product-image" :data-src="product_placeholder" alt=""/>
                  <div class="product-name">
                    {{product.product_name}}
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div v-if="others_category_key in product_array_by_category && product_array_by_category[others_category_key].length > number_items_show" :class="'btn-load-more-product btn-load-more-product-category-' + others_category_key" @click="show_all('category-' + others_category_key)">{{ $t('show_all') }} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/></svg></div>
        </div>
      </div>
      <div v-if="show_spinner == true" class="text-center mt-2">
        <div class="spinner-border mypage-spinner-border" role="status">
            <span class="visually-hidden"></span>
        </div>
      </div>
      <div v-if="no_results == true" class="text-center not-found-product mt-1">
        {{ $t('no_results') }}
      </div>
    </div>
    <!-- Footer -->
    <div class="copyright">
      © {{ (new Date()).getFullYear() }} - Rentracks
    </div>
  </div>
</template>

<script>
import utils from '@/utils/utils.js'
export default {
  name: 'Layout1Index',
  data: () => ({
    product_array_by_category: [],
    category_ids:[],
    others_category_key: 'others',
    number_items_show: 12,
    no_results: false,
    show_spinner: false,
    page_loaded: false,
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
    this.create_product_by_category_array()
  },
  methods: {
    create_product_by_category_array(){
      this.show_spinner = true
      for(let i = 0; i < this.category_array.length ; i++){
        this.category_ids.push(this.category_array[i].category_id)
      }
      for(let i = 0; i < this.category_array.length ; i++){
        const cat_id = this.category_array[i].category_id
        this.product_array_by_category[cat_id] = []
        for(let j = 0; j < this.product_array.length ; j++){
          const product = this.product_array[j]
          if ('category_id' in product && product.category_id === cat_id){ 
            this.product_array_by_category[cat_id].push(product) 
          }
        }
      }
      this.product_array_by_category[this.others_category_key] = []
      for(let i = 0; i < this.product_array.length ; i++){
        const product = this.product_array[i]
        if (!('category_id' in product) || product.category_id === '' || product.category_id === null || !(this.category_ids.includes(product.category_id))){
          this.product_array_by_category[this.others_category_key].push(product) 
        }
      }
      this.show_spinner = false
      this.page_loaded = true
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
        
        for(let i = 0; i < this.category_array.length ; i++){
            const cat_id = this.category_array[i].category_id
            this.product_array_by_category[cat_id] = []
            for(let j = 0; j < this.product_array.length ; j++){
                const product = this.product_array[j]
                if ('category_id' in product && product.category_id === cat_id && utils.removeDiacritics(product.product_name).toLowerCase().includes(search_term)){
                    this.product_array_by_category[cat_id].push(product)
                }
            }
        }
        this.product_array_by_category[this.others_category_key] = []
        for(let i = 0; i < this.product_array.length ; i++){
            const product = this.product_array[i]
            if ((!('category_id' in product) || product.category_id === '' || product.category_id === null || !(this.category_ids.includes(product.category_id))) && utils.removeDiacritics(product.product_name).toLowerCase().includes(search_term)){
                this.product_array_by_category[this.others_category_key].push(product) 
            }
        }
        let count_results = 0
        for(let i = 0; i < this.category_array.length ; i++){
            const cat_id = this.category_array[i].category_id
            count_results += this.product_array_by_category[cat_id].length
        }
        count_results += this.product_array_by_category[this.others_category_key].length
        if (count_results === 0){ this.no_results = true }else{ this.no_results = false }
        this.show_spinner = false 
    }
  }
}
</script>

<style type="text/css" scoped>
.mypage-wrapper{
  max-width: 450px;
}
</style>