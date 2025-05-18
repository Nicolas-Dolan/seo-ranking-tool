<template>
  <Panel header="Select your search options">
    <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit" class="form">
      <div class="form__row form-group">
        <div class="form-group__item">
          <FloatLabel variant="on">
            <Select name="searchEngine" id="searchEngine" :options="searchEngines" fluid />
            <label for="searchEngine">Search engine</label>
          </FloatLabel>
        </div>

        <div class="form-group__item">
          <FloatLabel variant="on">
            <InputNumber name="resultsAmount" id="resultsAmount" :min="1" :max="1000" fluid />
            <label for="resultsAmount">Results to consider</label>
          </FloatLabel>
          <Message
            v-if="$form.resultsAmount?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.resultsAmount.error?.message }}</Message
          >
        </div>
      </div>

      <div class="form__row">
        <FloatLabel variant="on">
          <InputText name="rankedURL" id="rankedURL" type="text" fluid />
          <label for="rankedURL">Ranked URL</label>
        </FloatLabel>
        <Message v-if="$form.rankedURL?.invalid" severity="error" size="small" variant="simple">{{
          $form.rankedURL.error.message
        }}</Message>
      </div>

      <div class="form__row">
        <FloatLabel variant="on">
          <InputText name="searchTerms" id="searchTerms" type="text" fluid />
          <label for="searchTerms">Search terms</label>
        </FloatLabel>
        <Message v-if="$form.searchTerms?.invalid" severity="error" size="small" variant="simple">{{
          $form.searchTerms.error.message
        }}</Message>

        <div class="text-suggestions">
          <Button
            v-for="suggestion in textSuggestions"
            @click="$form.searchTerms.value = suggestion"
            :key="suggestion"
            :label="suggestion"
            severity="secondary"
            size="small"
          />
        </div>
      </div>

      <div class="form__actions">
        <Button type="submit" label="Submit" />
      </div>
    </Form>
  </Panel>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { SearchEngine } from '@/utils/types'
import { validateURL } from '@/utils/methods'
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
import { useMockApi } from '@/composables/mockApi'

const searchEngines: SearchEngine[] = ['Google', 'Bing', 'Yahoo', 'DuckDuckGo']
const textSuggestions = ['land registry searches', 'property searches', 'conveyancing software']

const initialValues = ref({
  searchEngine: searchEngines[0],
  rankedURL: 'https://www.infotrack.co.uk',
  searchTerms: 'land registry searches',
  resultsAmount: 100,
})

const resolver = zodResolver(
  z.object({
    searchEngine: z.enum(searchEngines, {
      errorMap: () => ({ message: 'A search engine is required' }),
    }),
    rankedURL: z.string().min(1, { message: 'Ranked URL is required' }).refine(validateURL, {
      message: 'URL must be a valid format: eg, https://www.example.co.uk',
    }),
    searchTerms: z.string().min(1, { message: 'Search terms are required' }),
    resultsAmount: z
      .number()
      .min(1, { message: 'Results amount must be at least 1' })
      .max(1000, { message: 'Results amount cannot be more than 1000' }),
  }),
)
const { getCurrentURLMatches } = useMockApi()

const onFormSubmit = ({ valid, values }) => {
  if (valid) {
    getCurrentURLMatches(values)
  }
}
</script>
<style scoped lang="scss">
.form {
  &__row {
    margin-bottom: 1rem;
  }
  .form-group {
    display: flex;
    gap: 1rem;
    justify-content: space-between;

    &__item {
      flex: 1;
    }
  }
  .text-suggestions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
  &__actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
  }
}
</style>

<style lang="scss">
.form {
  .p-inputtext {
    height: 42px;
  }
}
</style>
