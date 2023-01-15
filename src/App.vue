<template>
  <PlannerSettings></PlannerSettings>

  <div v-for="month in Object.keys(months).length" :key="month" class="page">
    <h3>{{ months[month][0].toFormat("MMMM y") }}</h3>

    <table>
      <thead>
      <tr style="height: 1cm">
        <th></th>
        <th class="column-header" v-for="col in store.columns" :key="col">
          <div v-if="store.getColumnDefinition(col).imageData" class="image-container">
            <div
              class="image"
              :style="{ 'background-image': `url(${store.getColumnDefinition(col).imageData})` }">
            </div>
          </div>

          {{ store.getColumnDefinition(col).name }}
        </th>
      </tr>
      </thead>

      <tbody>
      <tr
        v-for="day in months[month]"
        :key="day.toString()"
        :class="[day.weekday === 6 || day.weekday === 7 ? 'weekend' : '']"
      >
        <td>
          <div>
            <div>{{ day.toFormat("ccc") }}</div>
            <div>{{ day.toFormat("d") }}</div>
          </div>
        </td>
        <td v-for="col in store.columns" :key="col"></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity';
import { watch } from '@vue/runtime-core';
import { DateTime, Settings } from 'luxon';
import { useBaseStore } from './store';
import PlannerSettings from './PlannerSettings.vue';

const store = useBaseStore();
const locale = ref('de');
const year = ref(2023);
const months = ref<{ [key: number]: Array<DateTime> }>({});

watch(
  locale,
  () => {
    Settings.defaultLocale = locale.value;
  },
  {immediate: true}
);

watch(
  year,
  (_year) => {
    months.value = {};

    for (let month = 1; month <= 12; month++) {
      const mdt = DateTime.fromObject({
        year: _year,
        month: month,
        day: 1,
      });

      months.value[month] = [];

      for (let day = 1; day <= mdt.daysInMonth; day++) {
        months.value[month].push(
          DateTime.fromObject({
            year: _year,
            month: month,
            day: day,
          })
        );
      }
    }
  },
  {immediate: true}
);
</script>

<style scoped>
.column-header {
  padding: 10px;
}

.image-container {
  display: block;
  width: 100%;
  max-width: 80px;
  margin: -10px auto 0;
  padding-bottom: 10px;
}

.image {
  width: 100%;
  padding-top: 100%;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
  border-radius: 100%;
}
</style>
