<template>
  <ul role="list">
    <li v-for="i in listData.length" :key="i">
      <input
        :ref="setListIemsRef"
        v-model="listData[i - 1]"
        type="text"
        @keydown.enter="enterHandler(i - 1)"
        @input="inputHandler($event, i - 1)"
      />
    </li>
  </ul>
</template>

<script>
import { nextTick, onBeforeUpdate, reactive, watch } from 'vue'
export default {
  name: 'Editor',
  setup(props, { emit }) {
    let listData = reactive(props.modelValue?.length ?[...props.modelValue] : [''])
    watch(listData, (newList) => {
      console.log(newList)
      // add next empty entry
      if (
        newList.length > 0 &&
        newList[newList.length - 1].length !== 0
      ) {
        newList.push('');
      }
      // remove empty entries at the end
      if (
        newList.length > 1 &&
        newList[newList.length - 1].length === 0 &&
        newList[newList.length - 2].length === 0
      ) {
        newList.splice(newList.length - 1, 1);
      }
      emit(
        'update:modelValue',
        newList[newList.length - 1].length === 0
          ? newList.slice(0, -1)
          : [...newList]
      )
    })

    let listItems = []
    onBeforeUpdate(() => {
      listItems = []
    })
    const setListIemsRef = el => {
      if (el) {
        listItems.push(el)
      }
    }

    const enterHandler = (index) => {
      // set focus to next input
      if (index < listData.length - 1) {
        listItems[index + 1].focus();
      }
      // create new input if no next input
      else if (
        listData.length &&
        listData[listData.length - 1].length > 0
      ) {
        listData.push('');
        nextTick(() => {
          listItems[listItems.length - 1].focus();
        });
      }
    }
    const inputHandler = (event, index) => {
      if (listData[index].match(/^\s+/)) {
        listData[index] = listData[index].replace(/^\s/, '');
        nextTick(() => {
          event.target.setSelectionRange(0, 0); // prevent that cursor jumps to the end
        });
      }
    }

    return {
      listData,
      listItems,
      setListIemsRef,
      enterHandler,
      inputHandler
    }
  }
};
</script>

<style scoped>
ul {
  padding-left: 0;
  list-style: none;
}

input {
  width: 100%;
  max-width: 40ch;
}
</style>
