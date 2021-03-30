import { computed, defineComponent } from '@nuxtjs/composition-api';

import svgHatena from '~/assets/image/sns_hatenabookmark.svg?raw';
import svgTwitter from '~/assets/image/sns_twitter.svg?raw';

export default defineComponent({
  name: 'PostShare',
  props: {
    postTitle: {
      type: String,
      required: true,
    },
  },
  setup() {
    const postLink = computed(() => location.href);

    function copyToUrl(e: Event) {
      e.preventDefault();

      const input = document.createElement('input');
      input.value = location.href.split('#')[0];
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      input.remove();

      alert('記事のURLをコピーしました。');
    }

    return {
      postLink,
      copyToUrl,
    };
  },
  render() {
    return (
      <div class="c-sns-list">
        <a
          href={'https://twitter.com/intent/tweet?url=' + this.postLink + '&text=' + encodeURIComponent(this.postTitle)}
          domPropsInnerHTML={svgTwitter}
          class="c-sns-list__item"
          title="Share Twitter"
          target="_blank"
          rel="noopener"
          aria-label="Twitter"
        />
        <a
          href={'http://b.hatena.ne.jp/add?url=' + this.postLink}
          domPropsInnerHTML={svgHatena}
          class="c-sns-list__item"
          title="Share HatenaBookmark"
          target="_blank"
          rel="noopener"
          aria-label="Hatena Bookmark"
        />
        <a
          href="javascript:void(0)"
          onClick={(e: Event) => this.copyToUrl(e)}
          class="c-sns-list__item--copy"
          title="Copy URL"
          aria-label="Copy URL"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </div>
    );
  },
});