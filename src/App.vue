<template>
  <div id="app">
    <map-builder
      :driver="gMaps"
      :coordinates="coordinates"
      :center="center"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MapBuilder from './components/MapBuilder.vue';
import YMapsDriver from './drivers/YMapsDriver';
import GMapsDriver from './drivers/GMapsDriver';
import { IGeoPoint, IMapDriver } from './interfaces.d';
import { zeroKilometer } from './constants';

@Component({
  components: {
    MapBuilder,
  },
})
export default class App extends Vue {
  yaMaps: IMapDriver = new YMapsDriver();

  gMaps: IMapDriver = new GMapsDriver();

  coordinates: IGeoPoint[] = [
    {
      lattitude: 55.7522,
      longitude: 37.6156,
      name: 'Москва',
      id: 1,
    },
    {
      lattitude: 59.8944,
      longitude: 30.2642,
      name: 'Санқт-Петербург',
      id: 2,
    },
    {
      lattitude: 51.5406,
      longitude: 46.0086,
      name: 'Саратов',
      id: 3,
    },
    {
      lattitude: 51.8272,
      longitude: 107.6063,
      name: 'Улан-Удэ',
      id: 4,
    },
    {
      lattitude: 55.8697,
      longitude: 47.4787,
      name: 'Цивильск',
      id: 5,
    },
    {
      lattitude: 42.8731,
      longitude: 74.6003,
      name: 'Бишкек',
      id: 6,
    },
  ];

  center: IGeoPoint = zeroKilometer;
}
</script>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
</style>
