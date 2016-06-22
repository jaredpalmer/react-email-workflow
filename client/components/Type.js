import { Inline, curry } from 'jsxstyle'

export const Text1 = curry(Inline, {
  fontSize: '2.5rem'
})

export const Text2 = curry(Inline, {
  fontSize: '2rem'
})

export const Text3 = curry(Inline, {
  fontSize: '1.75rem'
})

export const Text4 = curry(Inline, {
  fontSize: '1.5rem'
})

export const Text5 = curry(Inline, {
  fontSize: '1.25rem'
})

export const Text6 = curry(Inline, {
  fontSize: '1rem'
})

export const SmallText = curry(Inline, {
  fontSize: '.85rem',
  fontWeight: 'bold'
})

export const H1 = curry(Text1, {
  fontWeight: 'bold'
})

export const H2 = curry(Text2, {
  fontWeight: 'bold'
})

export const H3 = curry(Text3, {
  fontWeight: 'bold'
})

export const H4 = curry(Text4, {
  fontWeight: 'bold'
})

export const H5 = curry(Text5, {
  fontWeight: 'bold'
})
