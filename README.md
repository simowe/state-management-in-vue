# State management in Vue

Global application state is an easy solution to most front-end problems, but when it's used for everything it quickly grows in complexity and becomes unwieldy. We should make an effort to use more specialized tools for specific problems, and use global state as a last resort. This document will cover some alternative ways to solve common problems.

## Teleport

**Use case:** Far away components

**Examples:** Popups

[Official documentation](https://v3.vuejs.org/guide/teleport.html)

Teleport allows you to render a component as if it was a normal child component, but the actual HTML is rendered somewhere else.

```html
<template>
  <div v-if="popupIsVisible">
    <teleport to="body">
      <div class="popup">This is inside the popup!</div>
    </teleport>
  </div>
</template>
```

In the previous example the popup is rendered directly on the body, but the logic for when to show the popup is local to the component.

<br/>

To keep it clean, the teleport target should be an implementation detail of the popup component, and hidden from the other components.

```html
<!-- Popup.vue -->
<template>
  <teleport to="body">
    <div class="popup">
      <slot></slot>
    </div>
  </teleport>
</template>
```

And in another component

```html
<template>
  <Popup v-if="popupIsVisible"> This is inside the popup! </Popup>
</template>
```

Now you don't need to use complicated Vuex state to communicate with Popups. Just use the component like you would use any other.

<br/>
<br/>

## Provide/Inject

**Use case:** Deeply nested props

**Examples:** Broadcast configuration for complex components or entire pages

[Official documentation](https://v3.vuejs.org/guide/composition-api-provide-inject.html)

Provide/Inject allows parent components to broadcast props to everything below it in the component tree. This is a lot more flexible than global state, since parents can provide whatever they want to their children, regardless of what's going on in other parts of the application.

```js
import { inject, provide } from 'vue'

const ParentComponent = {
  components: { ChildComponent },
  setup() {
    provide('language', 'en-GB')
  }
}

const ChildComponent = {
  setup() {
    const language = inject('language')
    return { language }
  }
}
```

To avoid messing with keys directly, and to make it easier to reuse, the provide/inject logic should be put in a separate file.

```ts
import { inject, provide } from 'vue'
import { nanoid } from 'nanoid'

// Generate a random unique key.
// And store it privately in this file.
const key = nanoid()

// Used in parent component
export function provideTheme(theme: string) {
  provide(key, theme)
}

// Used in child components
export function injectTheme(): string | undefined {
  return inject(key)
}
```

<br/>

## Query parameters

**Use case:** Page state

**Examples:** Search results

Organazing page state with global application state can become fairly complicated. You need to keep track of individual page ids and use those ids to store and retrieve page data. A simpler and more appropriate solution in a lot of cases is to store state in the url using query parameters. The browser is then responsible for colocating the state with the page. It also means that the page can be bookmarked and shared, and the state will persist across page refreshes.

<br/>
<br/>

### Global state

**Use case:** Alternative to Vuex with static imports for better tooling

**Examples:** Application configuration

Because the Composition API allows you to create Vue logic independent of components, you can also create global state fairly simply. Just export the stateful objects and functions and use them directly in components.

```ts
import { computed, ref } from 'vue'
import { fetchMyUser } from './fetchMyUser'

export const loggedInUser = ref()
export const isLoggedIn = computed(() => loggedInUser.value !== undefined)

export async function login() {
  loggedInUser.value = await fetchMyUser()
}
```

and in a component

```js
import { loggedInUser, isLoggedIn, login } from './userLogin.js'

const Component = {
  setup() {
    login()
    return { loggedInUser, isLoggedIn }
  }
}
```

<br/>
<br/>

## SWR

**Use case:** API data

**Examples:** Login and user data

[Original SWR](https://swr.vercel.app/)

[Attensi SWR](https://www.npmjs.com/package/@attensi/swr)

SWR is a tool designed specifically for API data. It's originally a tool for React, but I thought it was
so great that I recreated the library for Vue. SWR makes the data globally available for the entire app, and it takes care of revalidation and rerendering to keep the data fresh.

SWR does mainly 3 things:

- Caching. Allows components to render immediately if data is already available.
- Revalidate. Check if the data has changed in the background and rerender with fresh data.
- Deduplication. Only fetch the data once, even if it's referenced in multiple components at the same time.

You use a key to represent the fetched data, and any component that uses the same key will refer to the same data.

```js
import { useSWR } from '@attensi/swr'
import { fetchMyUser } from './fetchMyUser'

const Component1 = {
  setup() {
    const key = 'myUser' // Used to globally identify the data
    const { data: user, error } = useSWR(key, fetchMyUser)
    return { user, error }
  }
}

const Component2 = {
  setup() {
    const key = 'myUser' // Both components use the same key, so the data is synced and fetched only once
    const { data: user, error } = useSWR(key, fetchMyUser)
    return { user, error }
  }
}
```

And in the template for one of the components

```html
<template>
  <div v-if="error">Didn't work</div>
  <div v-else-if="!user">Loading</div>
  <div v-else>{{ user.username }}</div>
</template>
```

To make it easy to reuse the data in multiple components, as well as keeping the components clean, `useSWR` should be put in a separate file.

```ts
import { useSWR } from '@attensi/swr'
import { nanoid } from 'nanoid'
import { fetchMyUser } from './fetchMyUser'

const key = nanoid() // Generate a unique key automatically

export function useMyUser() {
  const { data: user, error } = useSWR(key, fetchMyUser)
  return { user, error }
}
```

Now both components can just use the same function

```js
import { useMyUser } from './useMyUser'

const Component1 = {
  setup() {
    return useMyUser()
  }
}

const Component2 = {
  setup() {
    return useMyUser()
  }
}
```

With SWR there is no longer a need to put API data into global state, and the components don't need to worry about triggering the right events to fetch data. They just refer to the data directly, and SWR takes care of the rest.

```js
import { toRefs } from 'vue'
import { useProduct } from './useProduct'

const Component = {
  props: {
    productId: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const { productId } = toRefs(props)
    return useProduct(productId)
  }
}
```

In useProduct the productId ref is used as part of the key

```ts
import { useSWR } from '@attensi/swr'
import { nanoid } from 'nanoid'
import { Ref } from 'vue'
import { fetchProduct } from './fetchProduct'

const uniqueKey = nanoid() // Generate a unique key automatically

export function useProduct(productIdRef: Ref<number>) {
  const key = [uniqueKey, productIdRef] // Combine multiple values into a single key
  const { data: product, error } = useSWR(key, (_, productId) => {
    return fetchProduct(productId)
  })
  return { product, error }
}
```

<br/>
<br/>

## Summary

- Use Teleport to communicate with far away components like popups
- Use Provide/Inject to pass props to deeply nested children
- Use query parameters to store page state
- Use SWR for API data

Only if the problem is not covered by the above list should you consider using global state.
