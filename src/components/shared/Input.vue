<template>
  <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight" :type="type" :placeholder="placeholder" :value="value" @input="$emit('input', $event.target.value)" />
</template>
<script>
  export default {
    name: 'app-input',
    props: ['type', 'placeholder', 'value']
  }
</script>
