<template>
  <div class="content-list">
    <div class="rows">
      <FieldCard
        v-for="field in fields"
        :key="field.id"
        :fieldId="field.id"
        :fiel="field.fiel"
        :location="field.location"
        :status="field.status"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import FieldCard from '@/components/FieldCard.vue'
export default {
  name: 'FieldList',
  components: {
    FieldCard
  },
  computed: {
    ...mapGetters(['getFields']),
    fields () {
      return this.getFields
    }
  },
  methods: {
    ...mapMutations(['setSelectedField']), // Список площадок из Vuex
    selectField (field) {
      this.setSelectedField(field)
    }
  }
}
</script>

<style lang="scss">
.content-list{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 16px;
  gap: 16px;
  flex-grow: 1;
  margin-left: 200px;
  width: calc(100% - 200px);

  .rows {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;

    & > * {
      flex: 1 1 calc(25% - 12px); /* 4 плитки в ряд*/
      max-width: calc(25% - 12px);
    }

    @media (max-width: 1400px) {
      & > * {
        flex: 1 1 calc(33% - 8px); /* 3 плитки в ряд */
        max-width: calc(33% - 8px);
      }
    }

    @media (max-width: 1024px) {
      & > * {
        flex: 1 1 calc(50% - 8px); /* 2 плитки в ряд*/
        max-width: calc(50% - 8px);
      }
    }

    @media (max-width: 768px) {
      & > * {
        flex: 1 1 100%; /* 1 плитка в ряд*/
        max-width: 100%;
      }
    }
  }
}
</style>
