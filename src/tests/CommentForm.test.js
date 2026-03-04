// tests/CommentForm.test.js
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import CommentForm from '../components/CommentForm.vue'

describe('CommentForm', () => {
  it('renders the textarea', () => {
    const wrapper = mount(CommentForm)
    const textarea = wrapper.find('textarea.comment-input')
    expect(textarea.exists()).toBe(true)
    expect(textarea.element.value).toBe('')
  })

  it('updates value when user types', async () => {
    const wrapper = mount(CommentForm)
    const textarea = wrapper.find('textarea.comment-input')

    await textarea.setValue('Test comment')
    expect(textarea.element.value).toBe('Test comment')
  })

  it('emits add-comment event when submitted', async () => {
    const wrapper = mount(CommentForm)
    await wrapper.find('select.user-input').setValue('John Doe')
    await wrapper.find('textarea.comment-input').setValue('Hello!')
    await wrapper.find('button.submit-btn').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('add-comment')
    const payload = wrapper.emitted('add-comment')[0][0]
    expect(payload.text).toEqual('Hello!')
    expect(payload.user).toEqual('John Doe')
  })
})