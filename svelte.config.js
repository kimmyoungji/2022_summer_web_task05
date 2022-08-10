//sevlte.config.js에 이거 추가해주어야지, build 폴더가 생성된다.
// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter({
			fallback: 'index.html',
			tralingSlash: 'always'
		}),
		alias: {
			'@src': 'src'
		}
	}
};

export default config;