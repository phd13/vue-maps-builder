<template>
  <div class="maps-builder">
    <div id="map" ref="map"></div>
    <div class="maps-builder__cities">
      <h3 class="maps-builder__title">Города:</h3>
      <ul class="maps-builder__cities-list">
        <span
          v-for="place in coordinates"
          :key="place.id"
        >
          <li>{{ place.name }}</li>
          <button @click="driver.addPoint(place)">Добавить</button>
        </span>
      </ul>
      <button 
        @click="driver.removePoints()"
      >Удалить все</button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Ref,
} from 'vue-property-decorator';
import { IMapDriver, IGeoPoint } from '../interfaces.d';

@Component
export default class MapBuilder extends Vue {
  @Prop({ required: true }) readonly driver!: IMapDriver;

  @Prop({ required: true }) readonly coordinates!: IGeoPoint[];

  @Prop({ required: true }) readonly center!: IGeoPoint;

  mounted() {
    this.driver.create(this.$refs.map as HTMLElement, this.center);
  }
}
</script>

<style scoped lang="stylus">
.maps-builder

  &__title,
  &__cities-list
    margin 0 0 20px 0

  &__cities
    padding 20px
    display flex
    flex-direction column
    align-items flex-start

  &__cities-list
    display inline-block
    text-align left 
    list-style-type none
    padding 0

 #map
  width 100%
  height 560px
</style>
