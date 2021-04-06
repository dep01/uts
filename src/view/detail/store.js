import {store} from 'react-easy-state';

const wiki_url = 'https://id.wikipedia.org/wiki/';
export const state = store({
  title: '',
  url: '',
});
export async function initialized({item}) {
  state.title = item.title ?? '';
  state.url = wiki_url + state.title;
}
export function cleanUp() {
  state.title = '';
  state.url = '';
}
