!(function (e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define("Bulma", [], t)
    : "object" == typeof exports
    ? (exports.Bulma = t())
    : (e.Bulma = t());
})(window, function () {
  return (function (e) {
    var t = {};
    function n(o) {
      if (t[o]) return t[o].exports;
      var r = (t[o] = { i: o, l: !1, exports: {} });
      return e[o].call(r.exports, r, r.exports, n), (r.l = !0), r.exports;
    }
    return (
      (n.m = e),
      (n.c = t),
      (n.d = function (e, t, o) {
        n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: o });
      }),
      (n.r = function (e) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      }),
      (n.t = function (e, t) {
        if ((1 & t && (e = n(e)), 8 & t)) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var o = Object.create(null);
        if (
          (n.r(o),
          Object.defineProperty(o, "default", { enumerable: !0, value: e }),
          2 & t && "string" != typeof e)
        )
          for (var r in e)
            n.d(
              o,
              r,
              function (t) {
                return e[t];
              }.bind(null, r)
            );
        return o;
      }),
      (n.n = function (e) {
        var t =
          e && e.__esModule
            ? function () {
                return e.default;
              }
            : function () {
                return e;
              };
        return n.d(t, "a", t), t;
      }),
      (n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (n.p = ""),
      n((n.s = 8))
    );
  })([
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var o,
        r = n(2),
        i = (o = r) && o.__esModule ? o : { default: o };
      function s(e) {
        return this instanceof s
          ? e instanceof s
            ? e
            : (e instanceof HTMLElement
                ? (this._elem = e)
                : (this._elem = document.querySelector(e)),
              e || (this._elem = document.createElement("div")),
              this._elem.hasOwnProperty(s.id) ||
                (this._elem[s.id] = i.default.uid++),
              this)
          : new s(e);
      }
      (s.VERSION = "0.12.1"),
        (s.id = "bulma-" + new Date().getTime()),
        (s.cache = new i.default()),
        (s.plugins = {}),
        (s.create = function (e, t) {
          if (!e || !s.plugins.hasOwnProperty(e))
            throw new Error(
              "[BulmaJS] A plugin with the key '" +
                e +
                "' has not been registered."
            );
          return new s.plugins[e].handler(t);
        }),
        (s.registerPlugin = function (e, t) {
          var n =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
          if (!e) throw new Error("[BulmaJS] Key attribute is required.");
          (s.plugins[e] = { priority: n, handler: t }),
            (s.prototype[e] = function (t) {
              return new s.plugins[e].handler(t, this);
            });
        }),
        (s.parseDocument = function () {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : document,
            t = Object.keys(s.plugins).sort(function (e, t) {
              return s.plugins[e].priority < s.plugins[t].priority;
            });
          s.each(t, function (t) {
            s.plugins[t].handler.hasOwnProperty("parseDocument")
              ? s.plugins[t].handler.parseDocument(e)
              : console.error(
                  "[BulmaJS] Plugin " +
                    t +
                    " does not have a parseDocument method. Automatic document parsing is not possible for this plugin."
                );
          });
        }),
        (s.createElement = function (e, t) {
          t || (t = []), "string" == typeof t && (t = [t]);
          var n = document.createElement(e);
          return (
            s.each(t, function (e) {
              n.classList.add(e);
            }),
            n
          );
        }),
        (s.findOrCreateElement = function (e) {
          var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : document,
            n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : "div",
            o =
              arguments.length > 3 && void 0 !== arguments[3]
                ? arguments[3]
                : [],
            r = t.querySelector(e);
          if (!r) {
            0 === o.length &&
              (o = e.split(".").filter(function (e) {
                return e;
              }));
            var i = s.createElement(n, o);
            return t.appendChild(i), i;
          }
          return r;
        }),
        (s.each = function (e, t) {
          var n = void 0;
          for (n = 0; n < e.length; n++) t(e[n], n);
        }),
        (s.ajax = function (e) {
          return new Promise(function (t, n) {
            var o = new XMLHttpRequest();
            o.open("GET", e, !0),
              (o.onload = function () {
                o.status >= 200 && o.status < 400
                  ? t(s._stripScripts(o.responseText))
                  : n();
              }),
              (o.onerror = function () {
                return n();
              }),
              o.send();
          });
        }),
        (s._stripScripts = function (e) {
          var t = document.createElement("div");
          t.innerHTML = e;
          for (var n = t.getElementsByTagName("script"), o = n.length; o--; )
            n[o].parentNode.removeChild(n[o]);
          return t.innerHTML.replace(/  +/g, " ");
        }),
        (s.getGlobalConfig = function (e) {
          var t =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : null;
          return window.hasOwnProperty("bulmaOptions") &&
            window.bulmaOptions.hasOwnProperty(e)
            ? window.bulmaOptions[e]
            : t;
        }),
        (s.prototype.data = function (e, t) {
          return t
            ? (s.cache.set(this._elem[s.id], e, t), this)
            : s.cache.get(this._elem[s.id], e);
        }),
        (s.prototype.destroyData = function () {
          return s.cache.destroy(this._elem[s.id]), this;
        }),
        (s.prototype.getElement = function () {
          return this._elem;
        }),
        document.addEventListener("DOMContentLoaded", function () {
          s.getGlobalConfig("autoParseDocument", !0) && s.parseDocument(),
            s.getGlobalConfig("onLoaded") && s.getGlobalConfig("onLoaded")();
        }),
        (t.default = s);
    },
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var o =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var o in n)
                Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
            }
            return e;
          },
        r = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var o = t[n];
              (o.enumerable = o.enumerable || !1),
                (o.configurable = !0),
                "value" in o && (o.writable = !0),
                Object.defineProperty(e, o.key, o);
            }
          }
          return function (t, n, o) {
            return n && e(t.prototype, n), o && e(t, o), t;
          };
        })(),
        i = a(n(3)),
        s = a(n(0));
      function a(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function u(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      var l = (function () {
        function e() {
          var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {},
            n = arguments[1];
          if (
            (u(this, e),
            (t.root = n instanceof s.default ? n._elem : n),
            (this.config = new i.default(
              o({}, this.constructor.defaultConfig(), t)
            )),
            !n && !this.config.has("parent"))
          )
            throw new Error("A plugin requires a root and/or a parent.");
          (this.parent = this.config.get(
            "parent",
            t.root ? t.root.parentNode : null
          )),
            (this._events = {});
        }
        return (
          r(e, null, [
            {
              key: "defaultConfig",
              value: function () {
                return {};
              },
            },
          ]),
          r(e, [
            {
              key: "on",
              value: function (e, t) {
                this._events.hasOwnProperty(e) || (this._events[e] = []),
                  this._events[e].push(t);
              },
            },
            {
              key: "trigger",
              value: function (e) {
                var t =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : {};
                if (this._events.hasOwnProperty(e))
                  for (var n = 0; n < this._events[e].length; n++)
                    this._events[e][n](t);
              },
            },
            {
              key: "destroy",
              value: function () {
                (0, s.default)(this.root).destroyData();
              },
            },
          ]),
          e
        );
      })();
      t.default = l;
    },
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var o = (function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var o = t[n];
            (o.enumerable = o.enumerable || !1),
              (o.configurable = !0),
              "value" in o && (o.writable = !0),
              Object.defineProperty(e, o.key, o);
          }
        }
        return function (t, n, o) {
          return n && e(t.prototype, n), o && e(t, o), t;
        };
      })();
      var r = (function () {
        function e() {
          !(function (e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          })(this, e),
            (this._data = {});
        }
        return (
          o(e, [
            {
              key: "set",
              value: function (e, t, n) {
                this._data.hasOwnProperty(e) || (this._data[e] = {}),
                  (this._data[e][t] = n);
              },
            },
            {
              key: "get",
              value: function (e, t) {
                if (this._data.hasOwnProperty(e)) return this._data[e][t];
              },
            },
            {
              key: "destroy",
              value: function (e) {
                this._data.hasOwnProperty(e) && delete this._data[e];
              },
            },
          ]),
          e
        );
      })();
      (r.uid = 1), (t.default = r);
    },
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var o =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              },
        r = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var o = t[n];
              (o.enumerable = o.enumerable || !1),
                (o.configurable = !0),
                "value" in o && (o.writable = !0),
                Object.defineProperty(e, o.key, o);
            }
          }
          return function (t, n, o) {
            return n && e(t.prototype, n), o && e(t, o), t;
          };
        })();
      function i(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      var s = (function () {
        function e() {
          var t =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
          if ((i(this, e), "object" !== (void 0 === t ? "undefined" : o(t))))
            throw new TypeError("initialConfig must be of type object.");
          this._items = t;
        }
        return (
          r(e, [
            {
              key: "set",
              value: function (e, t) {
                if (!e || !t)
                  throw new Error(
                    "A key and value must be provided when setting a new option."
                  );
                this._items[e] = t;
              },
            },
            {
              key: "has",
              value: function (e) {
                if (!e) throw new Error("A key must be provided.");
                return this._items.hasOwnProperty(e) && this._items[e];
              },
            },
            {
              key: "get",
              value: function (e) {
                var t =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : null;
                return t && !this.has(e)
                  ? "function" == typeof t
                    ? t()
                    : t
                  : this._items[e];
              },
            },
          ]),
          e
        );
      })();
      t.default = s;
    },
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var o = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var o = t[n];
              (o.enumerable = o.enumerable || !1),
                (o.configurable = !0),
                "value" in o && (o.writable = !0),
                Object.defineProperty(e, o.key, o);
            }
          }
          return function (t, n, o) {
            return n && e(t.prototype, n), o && e(t, o), t;
          };
        })(),
        r = i(n(0));
      function i(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var s = (function (e) {
        function t(e, n, o) {
          !(function (e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          })(this, t),
            o._elem.classList.contains(e) || ((n.parent = o), (o = null));
          var i = (function (e, t) {
            if (!e)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return !t || ("object" != typeof t && "function" != typeof t)
              ? e
              : t;
          })(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, n, o));
          return (
            (i.name = e),
            (i.body = i.config.get("body")),
            (i.color = i.config.get("color")),
            (i.dismissInterval = i.config.get("dismissInterval")
              ? i.createDismissInterval(i.config.get("dismissInterval"))
              : null),
            (i.isDismissable = i.config.get("isDismissable")),
            (i.destroyOnDismiss = i.config.get("destroyOnDismiss")),
            i.parent instanceof r.default ||
              (i.parent = (0, r.default)(i.parent)),
            (i.root = i.config.get("root", i.createRootElement.bind(i))),
            (i.closeButton = i.config.get(
              "closeButton",
              i.createCloseButton()
            )),
            i.body && i.insertBody(),
            i.color && i.setColor(),
            i
          );
        }
        return (
          (function (e, t) {
            if ("function" != typeof t && null !== t)
              throw new TypeError(
                "Super expression must either be null or a function, not " +
                  typeof t
              );
            (e.prototype = Object.create(t && t.prototype, {
              constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0,
              },
            })),
              t &&
                (Object.setPrototypeOf
                  ? Object.setPrototypeOf(e, t)
                  : (e.__proto__ = t));
          })(t, e),
          o(t, null, [
            {
              key: "defaultConfig",
              value: function () {
                return {
                  isDismissable: !1,
                  destroyOnDismiss: !0,
                  element: null,
                };
              },
            },
          ]),
          o(t, [
            {
              key: "createRootElement",
              value: function () {
                var e = document.createElement("div");
                return (
                  e.classList.add(this.name, "is-hidden"),
                  e.setAttribute("data-bulma-attached", "attached"),
                  this.parent.getElement().appendChild(e),
                  e
                );
              },
            },
            {
              key: "show",
              value: function () {
                this.root.classList.remove("is-hidden");
              },
            },
            {
              key: "hide",
              value: function () {
                this.root.classList.add("is-hidden");
              },
            },
            {
              key: "insertBody",
              value: function () {
                this.root.innerHTML = this.body;
              },
            },
            {
              key: "createCloseButton",
              value: function () {
                var e = document.createElement("button");
                return (
                  e.setAttribute("type", "button"), e.classList.add("delete"), e
                );
              },
            },
            {
              key: "createDismissInterval",
              value: function (e) {
                var t = this;
                return setInterval(function () {
                  t.handleCloseEvent();
                }, e);
              },
            },
            {
              key: "prependCloseButton",
              value: function () {
                this.root.insertBefore(this.closeButton, this.root.firstChild);
              },
            },
            {
              key: "setupCloseEvent",
              value: function () {
                this.closeButton.addEventListener(
                  "click",
                  this.handleCloseEvent.bind(this)
                );
              },
            },
            {
              key: "handleCloseEvent",
              value: function () {
                this.trigger("dismissed"),
                  this.destroyOnDismiss ? this.destroy() : this.hide(),
                  this.trigger("close");
              },
            },
            {
              key: "setColor",
              value: function () {
                this.root.classList.add("is-" + this.color);
              },
            },
            {
              key: "destroy",
              value: function () {
                (function e(t, n, o) {
                  null === t && (t = Function.prototype);
                  var r = Object.getOwnPropertyDescriptor(t, n);
                  if (void 0 === r) {
                    var i = Object.getPrototypeOf(t);
                    return null === i ? void 0 : e(i, n, o);
                  }
                  if ("value" in r) return r.value;
                  var s = r.get;
                  return void 0 !== s ? s.call(o) : void 0;
                })(
                  t.prototype.__proto__ || Object.getPrototypeOf(t.prototype),
                  "destroy",
                  this
                ).call(this),
                  this.closeButton &&
                    this.closeButton.removeEventListener(
                      "click",
                      this.handleCloseEvent.bind(this)
                    ),
                  clearInterval(this.dismissInterval),
                  this.parent.getElement().removeChild(this.root),
                  (this.parent = null),
                  (this.root = null),
                  this.trigger("destroyed");
              },
            },
          ]),
          t
        );
      })(i(n(1)).default);
      t.default = s;
    },
    ,
    ,
    ,
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.Message = void 0);
      var o =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              },
        r = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var o = t[n];
              (o.enumerable = o.enumerable || !1),
                (o.configurable = !0),
                "value" in o && (o.writable = !0),
                Object.defineProperty(e, o.key, o);
            }
          }
          return function (t, n, o) {
            return n && e(t.prototype, n), o && e(t, o), t;
          };
        })(),
        i = a(n(0)),
        s = a(n(4));
      function a(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var u = (t.Message = (function (e) {
        function t(e, n) {
          !(function (e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          })(this, t);
          var o = (function (e, t) {
            if (!e)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return !t || ("object" != typeof t && "function" != typeof t)
              ? e
              : t;
          })(
            this,
            (t.__proto__ || Object.getPrototypeOf(t)).call(
              this,
              "message",
              e,
              n
            )
          );
          return (
            (o.size = o.config.get("size")),
            (o.title = o.config.get("title")),
            o.title && o.createMessageHeader(),
            o.isDismissable &&
              (o.config.get("closeButton") || o.prependCloseButton(),
              o.setupCloseEvent()),
            o.size && o.setSize(),
            (0, i.default)(o.root).data("message", o),
            o.trigger("init"),
            o
          );
        }
        return (
          (function (e, t) {
            if ("function" != typeof t && null !== t)
              throw new TypeError(
                "Super expression must either be null or a function, not " +
                  typeof t
              );
            (e.prototype = Object.create(t && t.prototype, {
              constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0,
              },
            })),
              t &&
                (Object.setPrototypeOf
                  ? Object.setPrototypeOf(e, t)
                  : (e.__proto__ = t));
          })(t, e),
          r(t, null, [
            {
              key: "parseDocument",
              value: function (e) {
                var t = void 0;
                (t =
                  "object" === o(e.classList) &&
                  e.classList.container(".message")
                    ? [e]
                    : e.querySelectorAll(".message")),
                  i.default.each(t, function (e) {
                    var t = e.querySelector(".delete");
                    (0, i.default)(e).message({
                      body: null,
                      closeButton: t,
                      isDismissable: !!t,
                      destroyOnDismiss: !0,
                      dismissInterval: e.hasAttribute("data-dismiss-interval")
                        ? e.getAttribute("data-dismiss-interval")
                        : null,
                    });
                  });
              },
            },
          ]),
          r(t, [
            {
              key: "createMessageHeader",
              value: function () {
                var e = document.createElement("div");
                e.classList.add("message-header"),
                  (e.innerHTML = "<p>" + this.title + "</p>"),
                  (this.title = e),
                  this.root.insertBefore(this.title, this.root.firstChild);
              },
            },
            {
              key: "setSize",
              value: function () {
                this.root.classList.add("is-" + this.size);
              },
            },
            {
              key: "insertBody",
              value: function () {
                var e = document.createElement("div");
                e.classList.add("message-body"),
                  (e.innerHTML = this.body),
                  this.root.appendChild(e);
              },
            },
            {
              key: "prependCloseButton",
              value: function () {
                this.title.appendChild(this.closeButton);
              },
            },
          ]),
          t
        );
      })(s.default));
      i.default.registerPlugin("message", u), (t.default = i.default);
    },
  ]).default;
});
