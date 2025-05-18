<template>
  <Panel header="Select your search options">
    <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit">
      <div>
        <FloatLabel variant="on">
          <Select name="searchEngine" id="searchEngine" :options="searchEngines" fluid />
          <label for="searchEngine">Search engine</label>
        </FloatLabel>
      </div>
      <div>
        <FloatLabel variant="on">
          <InputText name="searchTerms" id="searchTerms" type="text" fluid />
          <label for="searchTerms">Search terms</label>
        </FloatLabel>
        <Message v-if="$form.searchTerms?.invalid" severity="error" size="small" variant="simple">{{
          $form.searchTerms.error.message
        }}</Message>
        <div>
          <Button
            v-for="suggestion in textSuggestions"
            @click="$form.searchTerms.value = suggestion"
            :key="suggestion"
            :label="suggestion"
            severity="secondary"
            variant="text"
          />
        </div>
      </div>
      <div>
        <FloatLabel variant="on">
          <InputNumber name="resultsAmount" id="resultsAmount" fluid />
          <label for="resultsAmount">Number of results to consider</label>
        </FloatLabel>
        <Message
          v-if="$form.resultsAmount?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $form.resultsAmount.error?.message }}</Message
        >
      </div>
      <Button type="submit" severity="secondary" label="Submit" />
    </Form>
  </Panel>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Form } from '@primevue/forms'
import Button from 'primevue/button'
import Select from 'primevue/select'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Message from 'primevue/message'
import FloatLabel from 'primevue/floatlabel'
import Panel from 'primevue/panel'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'

const searchEngines = ['Google', 'Bing']
const textSuggestions = [
  'land registry searches',
  'property searches',
  'conveyancing solutions',
  'conveyancing software',
]

const initialValues = ref({
  searchEngine: searchEngines[0],
  searchTerms: 'land registry searches',
  resultsAmount: 100,
})

const resolver = zodResolver(
  z.object({
    searchEngine: z.enum(searchEngines, {
      errorMap: () => ({ message: 'A search engine is required' }),
    }),
    searchTerms: z.string().min(1, { message: 'Search terms are required' }),
    resultsAmount: z
      .number()
      .min(1, { message: 'Results amount must be at least 1' })
      .max(1000, { message: 'Results amount cannot be more than 1000' }),
  }),
)

const onFormSubmit = ({ valid }) => {
  if (valid) {
    // submit the form
  }
}
</script>
