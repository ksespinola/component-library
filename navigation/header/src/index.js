import Vue from 'vue';
import Header from './Header.vue';

/* eslint-disable no-new */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */

new Vue({
  el: '#root',
  render: h => h(
    Header,
    {
      props: {
        project: {
          id: 1,
          name: 'Knight\'s Errant',
          returnLink: '#'
        }
      }
    }
  )
});
