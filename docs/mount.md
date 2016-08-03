# mount(root, component)

- [API](#api)
- [How it works](#how-it-works)
- [Differences from m.render](#differences-from-m-render)

---

### API

`m.mount(element, component)`

Argument    | Type                 | Required | Description
----------- | -------------------- | -------- | ---
`element`   | `Element`            | Yes      | A DOM element that will be the parent node to the subtree
`component` | `Component`          | Yes      | The [component](components.md) to be rendered
**returns** |                      |          | Returns nothing

[How to read signatures](signatures.md)

---

### How it works

Similar to [`m.render()`](render.md), the `m.mount()` method takes a component and mounts a corresponding DOM tree into `element`. If `element` already has a DOM tree mounted via a previous `m.mount()` call, the component is diffed against the previous vnode tree and the existing DOM tree is modified only where needed to reflect the changes. Unchanged DOM nodes are not touched at all.

It may seem wasteful to generate a vnode tree on every redraw, but as it turns out, creating and comparing Javascript data structures is surprisingly cheap compared to reading and modifying the DOM.

Touching the DOM can be extremely expensive for a couple of reasons. Alternating reads and writes can adversely affect performance by causing several browser repaints to occur in quick succession, whereas comparing virtual dom trees allows writes to be batched into a single repaint. Also, the performance characteristics of various DOM operations vary between implementations and can be difficult to learn and optimize for all browsers. For example, in some implementations, reading `childNodes.length` has a complexity of O(n); in some, reading `parentNode` causes a repaint, etc.

In contrast, traversing a javascript data structure has a much more predictable and sane performance profile, and in addition, a vnode tree is implemented in such a way that enables modern javascript engines to apply aggressive optimizations such as hidden classes for even better performance.

---

### Differences from m.render

A component rendered via `m.mount` automatically auto-redraws in response to view events, `m.redraw()` calls or `m.request()` calls. Vnodes rendered via `m.render()` do not. Note that calls to `m.prop()` do not trigger auto-redraws.

`m.mount()` is suitable for application developers integrating Mithril widgets into existing codebases where routing is handled by another library or framework, while still enjoying Mithril's auto-redrawing facilities.

`m.render()` is suitable for library authors who wish to manually control rendering (e.g. when hooking to a third party router, or using third party data-layer libraries like Redux).