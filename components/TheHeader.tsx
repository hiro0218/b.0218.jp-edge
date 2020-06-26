import { defineComponent, computed, onMounted } from '@vue/composition-api';
import CONSTANT from '~/constant';
import svgLogo from '~/assets/image/logo.svg?raw';

export default defineComponent({
  name: 'TheHeader',
  setup() {
    const siteName = computed(() => CONSTANT.SITE_NAME);
    let ticking = false;
    let lastKnownScrollY = 0;

    onMounted(() => {
      const elHeader = document.querySelector('.js-header');
      const headerheight = elHeader.offsetHeight;

      document.addEventListener(
        'scroll',
        () => {
          handleScroll(elHeader, headerheight);
        },
        !document.documentMode ? { passive: false } : false,
      );
    });

    function handleScroll(elHeader, headerheight) {
      if (!ticking) {
        requestAnimationFrame(() => {
          ticking = false;
          const currentScrollY = window.pageYOffset;

          // ヘッダーの高さを超えた場合
          if (currentScrollY >= headerheight) {
            if (currentScrollY <= lastKnownScrollY) {
              elHeader.classList.remove('is-unpin');
            } else {
              elHeader.classList.add('is-unpin');
            }
          } else {
            elHeader.classList.remove('is-unpin');
          }

          // 今回のスクロール位置を残す
          lastKnownScrollY = currentScrollY;
        });
      }

      ticking = true;
    }

    return {
      svgLogo,
      siteName,
    };
  },
  render() {
    return (
      <header class="pj-header js-header">
        <div class="o-container pj-header-container">
          <nuxt-link title={this.siteName} to="/" class="pj-header__logo" domPropsInnerHTML={svgLogo} />
          <a
            href="https://www.google.com/search?q=site:b.0218.jp"
            target="_blank"
            rel="noopener"
            title="site:b.0218.jp - Google 検索"
            class="pj-header-search"
          >
            <div class="pj-header-search__icon" domPropsInnerHTML={this.$icon.search} />
          </a>
        </div>
      </header>
    );
  },
});