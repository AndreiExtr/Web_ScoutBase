<template>
  <div class="gamer-card">
    <div class="gamer-card__item1">
      <img alt="" src="@/assets/img/avatar.png">
      <p><span>Семенов</span> <br> Алексей Иванович</p>
    </div>
    <div class="gamer-card__item2">
      <p>возраст <br> <span>26</span></p>
      <p>позиция <br> <span>ЦАП</span></p>
      <p>матчи <br> <span>3</span></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GamerCard'
}
</script>

<style lang="scss">
.gamer-card{
  height: 200px;
  padding: 16px;
  background-color: #1A1A1A;
  box-shadow: 10px 10px 32px rgba(0, 0, 0, 0.315);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  gap: 16px;

  &:hover{
    box-shadow: 10px 10px 32px rgba(0, 255, 98, 0.089);
  }

  &__item1{
    flex: 1;
    background-color: #2b2b2b;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 12px;
    gap: 16px;

    img{
      width: 70px;
      height: 70px;
    }

    p{
      color: white;
      font-size: 14px;
      text-align: left;

      span{
        font-weight: 700;
        font-size: 18px;
      }
    }
  }

  &__item2{
    height: 60px;
    background-color: #2b2b2b;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 12px;
    gap: 32px;

    p{
      text-align: left;
      font-size: 14px;
      color: white;

      span{
        font-size: 16px;
        font-weight: 700;
      }
    }
  }
}
</style>
