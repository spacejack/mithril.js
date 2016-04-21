"use strict"

var o = require("../../ospec/ospec")
var domMock = require("../../test-utils/domMock")
var vdom = require("../../render/render")

o.spec("onremove", function() {
	var $window, root, render
	o.beforeEach(function() {
		$window = domMock()
		root = $window.document.createElement("div")
		render = vdom($window).render
	})

	o("does not call onremove when creating", function() {
		var create = o.spy()
		var update = o.spy()
		var vnode = {tag: "div", attrs: {onremove: create}}
		var updated = {tag: "div", attrs: {onremove: update}}
		
		render(root, [vnode])
		render(root, [updated])
		
		o(create.callCount).equals(0)
	})
	o("does not call onremove when updating", function() {
		var create = o.spy()
		var update = o.spy()
		var vnode = {tag: "div", attrs: {onremove: create}}
		var updated = {tag: "div", attrs: {onremove: update}}
		
		render(root, [vnode])
		render(root, [updated])
		
		o(create.callCount).equals(0)
		o(update.callCount).equals(0)
	})
	o("calls onremove when removing element", function() {
		var remove = o.spy()
		var vnode = {tag: "div", attrs: {onremove: remove}}
		
		render(root, [vnode])
		render(root, [])
		
		o(remove.callCount).equals(1)
		o(remove.this).equals(vnode)
		o(remove.args[0]).equals(vnode)
	})
	o("calls onremove when removing text", function() {
		var remove = o.spy()
		var vnode = {tag: "#", attrs: {onremove: remove}, children: "a"}
		
		render(root, [vnode])
		render(root, [])
		
		o(remove.callCount).equals(1)
		o(remove.this).equals(vnode)
		o(remove.args[0]).equals(vnode)
	})
	o("calls onremove when removing fragment", function() {
		var remove = o.spy()
		var vnode = {tag: "[", attrs: {onremove: remove}, children: []}
		
		render(root, [vnode])
		render(root, [])
		
		o(remove.callCount).equals(1)
		o(remove.this).equals(vnode)
		o(remove.args[0]).equals(vnode)
	})
	o("calls onremove when removing html", function() {
		var remove = o.spy()
		var vnode = {tag: "<", attrs: {onremove: remove}, children: "a"}
		
		render(root, [vnode])
		render(root, [])
		
		o(remove.callCount).equals(1)
		o(remove.this).equals(vnode)
		o(remove.args[0]).equals(vnode)
	})
	o("does not set onremove as an event handler", function() {
		var remove = o.spy()
		var vnode = {tag: "div", attrs: {onremove: remove}, children: []}
		
		render(root, [vnode])
		
		o(vnode.dom.onremove).equals(undefined)
		o(vnode.dom.attributes["onremove"]).equals(undefined)
	})
	o("calls onremove on recycle", function() {
		var remove = o.spy()
		var vnodes = [{tag: "div", key: 1}]
		var temp = [{tag: "div", key: 2, attrs: {onremove: remove}}]
		var updated = [{tag: "div", key: 1}]
		
		render(root, vnodes)
		render(root, temp)
		render(root, updated)
		
		o(remove.callCount).equals(1)
	})
})