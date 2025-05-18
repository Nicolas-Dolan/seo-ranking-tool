<template>
  <div>
    <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit">
      <div>
        <Select name="searchEngine" :options="searchEngines" placeholder="Select a search engine" />
      </div>
      <div>
        <InputText
          name="searchTerms"
          type="text"
          placeholder="Enter your search terms here"
          fluid
        />
        <Message v-if="$form.searchTerms?.invalid" severity="error" size="small" variant="simple">{{
          $form.searchTerms.error.message
        }}</Message>
      </div>
      <Button type="submit" severity="secondary" label="Submit" />
    </Form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Form } from '@primevue/forms'
import Button from 'primevue/button'
import Select from 'primevue/select'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'

const searchEngines = ['Google', 'Bing']

const initialValues = ref({
  searchEngine: searchEngines[0],
  searchTerms: 'land registry searches',
})

const resolver = zodResolver(
  z.object({
    searchEngine: z.enum(searchEngines, {
      errorMap: () => ({ message: 'A search engine is required.' }),
    }),
    searchTerms: z.string().min(1, { message: 'Search terms are required.' }),
  }),
)

const onFormSubmit = ({ valid }) => {
  if (valid) {
    // submit the form
  }
}
</script>
