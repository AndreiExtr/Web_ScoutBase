<template>
  <div class="content-fields">
    <div class="title">
      <h1>Выберите площадку для матча</h1>
      <!-- Поиск по городу -->
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Поиск по городу"
        class="city-search"
      />
      <div class="custom-select" @click="toggleDropdown">
        <div class="selected-option">{{ selectedStatus }}</div>
        <ul class="dropdown-list" :class="{ show: isDropdown }">
          <li
            v-for="stas in statuts"
            :key="stas"
            @click.stop="selectStatus(stas)"
          >
            {{ stas }}
          </li>
        </ul>
      </div>
    </div>
    <div class="rows">
      <FieldCard
        v-for="field in paginatedFields"
        :key="field.id"
        :fieldId="field.id"
        :fiel="field.fiel"
        :location="field.location"
        :status="field.status"
      />
    </div>
    <PaginationUI
      v-if="totalPagesFields > 1"
      :total-pages="totalPagesFields"
      :current-page="pageFieldList"
      @update:currentPage="changePage"
      style="margin-top: auto;"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import FieldCard from '@/components/FieldCard.vue'
import PaginationUI from '@/components/PaginationUI.vue'
export default {
  name: 'FieldList',
  components: {
    FieldCard,
    PaginationUI
  },
  data () {
    return {
      searchQuery: '',
      selectedStatus: 'все',
      statuts: ['все', 'занято', 'свободно'],
      isDropdown: false,
      pageFieldList: 1,
      persPage: 16 // Количество карточек на странице
    }
  },
  computed: {
    ...mapGetters(['getFields']),
    fields () {
      return this.getFields
    },
    filteredFields () {
      return this.fields.filter(field => {
        const matchesStatus = this.selectedStatus === 'все' || field.status === this.selectedStatus

        const matchesCity = field.location?.toLowerCase().includes(this.searchQuery.toLowerCase())

        return matchesStatus && matchesCity
      })
    },
    totalPagesFields () {
      return Math.ceil(this.filteredFields.length / this.persPage)
    },
    paginatedFields () {
      const start = (this.pageFieldList - 1) * this.persPage
      return this.filteredFields.slice(start, start + this.persPage)
    }
  },
  methods: {
    ...mapMutations(['setSelectedField']), // Список площадок из Vuex
    toggleDropdown () {
      this.isDropdown = !this.isDropdown
    },
    selectField (field) {
      this.setSelectedField(field)
    },
    changePage (page) {
      this.pageFieldList = page
      sessionStorage.setItem('pageFieldList', page)
    },
    selectStatus (status) {
      this.selectedStatus = status
      this.isDropdown = false
      this.pageFieldList = 1 // сброс на первую страницу
    }
  },
  mounted () {
    const savedPage = sessionStorage.getItem('pageFieldList')
    if (savedPage !== null) {
      this.pageFieldList = parseInt(savedPage)
    }
  }
}
</script>

<style lang="scss">
.content-fields{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  padding: 16px;
  gap: 16px;
  margin-left: 200px;
  width: calc(100% - 200px);

  .title{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: 100%;

    h1{
      text-align: left;
      width: 100%;
      font-size: 20px;
      font-weight: 700;
      color: #fff;
    }

    .city-search {
      height: 32px;
      padding: 6px 12px;
      border-radius: 6px;
      border: 1px solid #444;
      background: #2e2e2e;
      color: white;
      margin-right: 24px;
      outline: none;
    }

    .custom-select {
      position: relative;
      height: 32px;
      width: 200px;
      border: 1px solid #444;
      background: #2e2e2e;
      color: #fff;
      border-radius: 8px;
      font-size: 14px;
      cursor: pointer;

      &:focus {
        border-color: #13e66e;
      }

      &:hover{
        border: 1px solid #13e66e;
      }

      .selected-option {
        padding: 6px 12px;
        text-align: left;
      }

      .dropdown-list {
        position: absolute;
        width: 100%;
        background-color: #1F1F1F;
        border: 1px solid #3a4149;
        border-radius: 8px;
        margin-top: 4px;
        list-style: none;
        padding: 0;
        z-index: 10;
        display: none;
        max-height: 250px;
        overflow-y: auto;

        &.show {
          display: block;
        }

        li {
          padding: 12px;
          cursor: pointer;
          background-color: transparent;
          border: none;
          text-align: left;

          &:hover {
            background-color: #3a4149;
          }
        }
      }
    }
  }

  .rows {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 16px;

    & > * {
      flex: 1 1 calc(25% - 12px); /* 4 плитки в ряд*/
      max-width: calc(25% - 12px);
    }

    @media (max-width: 1400px) {
      & > * {
        flex: 1 1 calc(33% - 8px); /* 3 плитки в ряд */
      }
    }

    @media (max-width: 1260px) {
      & > * {
        flex: 1 1 calc(50% - 8px); /* 2 плитки в ряд*/
        max-width: calc(50% - 8px);
      }
    }

    @media (max-width: 900px) {
      & > * {
        flex: 1 1 100%; /* 1 плитка в ряд*/
        max-width: 100%;
      }
    }
  }
}
</style>
