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
      n((n.s = 5))
    );
  })([
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var o,
        r = n(2),
        i = (o = r) && o.__esModule ? o : { default: o };
      function a(e) {
        return this instanceof a
          ? e instanceof a
            ? e
            : (e instanceof HTMLElement
                ? (this._elem = e)
                : (this._elem = document.querySelector(e)),
              e || (this._elem = document.createElement("div")),
              this._elem.hasOwnProperty(a.id) ||
                (this._elem[a.id] = i.default.uid++),
              this)
          : new a(e);
      }
      (a.VERSION = "0.12.1"),
        (a.id = "bulma-" + new Date().getTime()),
        (a.cache = new i.default()),
        (a.plugins = {}),
        (a.create = function (e, t) {
          if (!e || !a.plugins.hasOwnProperty(e))
            throw new Error(
              "[BulmaJS] A plugin with the key '" +
                e +
                "' has not been registered."
            );
          return new a.plugins[e].handler(t);
        }),
        (a.registerPlugin = function (e, t) {
          var n =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
          if (!e) throw new Error("[BulmaJS] Key attribute is required.");
          (a.plugins[e] = { priority: n, handler: t }),
            (a.prototype[e] = function (t) {
              return new a.plugins[e].handler(t, this);
            });
        }),
        (a.parseDocument = function () {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : document,
            t = Object.keys(a.plugins).sort(function (e, t) {
              return a.plugins[e].priority < a.plugins[t].priority;
            });
          a.each(t, function (t) {
            a.plugins[t].handler.hasOwnProperty("parseDocument")
              ? a.plugins[t].handler.parseDocument(e)
              : console.error(
                  "[BulmaJS] Plugin " +
                    t +
                    " does not have a parseDocument method. Automatic document parsing is not possible for this plugin."
                );
          });
        }),
        (a.createElement = function (e, t) {
          t || (t = []), "string" == typeof t && (t = [t]);
          var n = document.createElement(e);
          return (
            a.each(t, function (e) {
              n.classList.add(e);
            }),
            n
          );
        }),
        (a.findOrCreateElement = function (e) {
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
            var i = a.createElement(n, o);
            return t.appendChild(i), i;
          }
          return r;
        }),
        (a.each = function (e, t) {
          var n = void 0;
          for (n = 0; n < e.length; n++) t(e[n], n);
        }),
        (a.ajax = function (e) {
          return new Promise(function (t, n) {
            var o = new XMLHttpRequest();
            o.open("GET", e, !0),
              (o.onload = function () {
                o.status >= 200 && o.status < 400
                  ? t(a._stripScripts(o.responseText))
                  : n();
              }),
              (o.onerror = function () {
                return n();
              }),
              o.send();
          });
        }),
        (a._stripScripts = function (e) {
          var t = document.createElement("div");
          t.innerHTML = e;
          for (var n = t.getElementsByTagName("script"), o = n.length; o--; )
            n[o].parentNode.removeChild(n[o]);
          return t.innerHTML.replace(/  +/g, " ");
        }),
        (a.getGlobalConfig = function (e) {
          var t =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : null;
          return window.hasOwnProperty("bulmaOptions") &&
            window.bulmaOptions.hasOwnProperty(e)
            ? window.bulmaOptions[e]
            : t;
        }),
        (a.prototype.data = function (e, t) {
          return t
            ? (a.cache.set(this._elem[a.id], e, t), this)
            : a.cache.get(this._elem[a.id], e);
        }),
        (a.prototype.destroyData = function () {
          return a.cache.destroy(this._elem[a.id]), this;
        }),
        (a.prototype.getElement = function () {
          return this._elem;
        }),
        document.addEventListener("DOMContentLoaded", function () {
          a.getGlobalConfig("autoParseDocument", !0) && a.parseDocument(),
            a.getGlobalConfig("onLoaded") && a.getGlobalConfig("onLoaded")();
        }),
        (t.default = a);
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
        i = u(n(3)),
        a = u(n(0));
      function u(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function l(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      var s = (function () {
        function e() {
          var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {},
            n = arguments[1];
          if (
            (l(this, e),
            (t.root = n instanceof a.default ? n._elem : n),
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
                (0, a.default)(this.root).destroyData();
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
      var a = (function () {
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
      t.default = a;
    },
    ,
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }), (t.Modal = void 0);
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
        r = a(n(0)),
        i = a(n(1));
      function a(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var u = (t.Modal = (function (e) {
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
          })(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n));
          return (
            (o.style = o.config.get("style")),
            (o.root = o.config.get("root")),
            o.root.classList.contains("modal") || o.root.classList.add("modal"),
            o.parent
              ? o.parent.appendChild(o.root)
              : o.root.parentNode
              ? (o.parent = o.root.parentNode)
              : ((o.parent = document.body), o.parent.appendChild(o.root)),
            (o.background = r.default.findOrCreateElement(
              ".modal-background",
              o.root
            )),
            (o.content =
              "card" === o.style
                ? r.default.findOrCreateElement(".modal-card", o.root)
                : r.default.findOrCreateElement(".modal-content", o.root)),
            (o.closable = o.config.get("closable")),
            (o.body = o.config.get("body")),
            (o.title = o.config.get("title")),
            o.config.get("bodyUrl")
              ? r.default.ajax(o.config.get("bodyUrl")).then(function (e) {
                  (o.body = e), o.buildModal();
                })
              : o.buildModal(),
            (0, r.default)(o.root).data("modal", o),
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
          o(t, null, [
            { key: "parseDocument", value: function () {} },
            {
              key: "defaultConfig",
              value: function () {
                return { style: "card", closable: !0 };
              },
            },
          ]),
          o(t, [
            {
              key: "buildModal",
              value: function () {
                "card" === this.style
                  ? this.createCardStructure()
                  : this.content.innerHTML ||
                    (this.content.innerHTML = this.body),
                  this.closable &&
                    (this.closeButton =
                      "card" === this.style
                        ? r.default.findOrCreateElement(
                            ".delete",
                            this.header,
                            "button"
                          )
                        : r.default.findOrCreateElement(
                            ".modal-close",
                            this.root,
                            "button"
                          )),
                  "card" === this.style && this.createButtons(),
                  this.setupEvents();
              },
            },
            {
              key: "createCardStructure",
              value: function () {
                (this.header = r.default.findOrCreateElement(
                  ".modal-card-head",
                  this.content,
                  "header"
                )),
                  (this.headerTitle = r.default.findOrCreateElement(
                    ".modal-card-title",
                    this.header,
                    "p"
                  )),
                  this.headerTitle.innerHTML ||
                    (this.headerTitle.innerHTML = this.title),
                  (this.cardBody = r.default.findOrCreateElement(
                    ".modal-card-body",
                    this.content,
                    "section"
                  )),
                  this.cardBody.innerHTML ||
                    (this.cardBody.innerHTML = this.body),
                  (this.footer = r.default.findOrCreateElement(
                    ".modal-card-foot",
                    this.content,
                    "footer"
                  ));
              },
            },
            {
              key: "setupEvents",
              value: function () {
                var e = this;
                this.closable &&
                  (this.closeButton.addEventListener(
                    "click",
                    this.close.bind(this)
                  ),
                  (this.keyupListenerBound = function (t) {
                    return e.keyupListener(t);
                  }),
                  document.addEventListener("keyup", this.keyupListenerBound),
                  this.background.addEventListener(
                    "click",
                    this.close.bind(this)
                  ));
              },
            },
            {
              key: "createButtons",
              value: function () {
                var e = this.config.get("buttons", []),
                  t = this;
                r.default.each(e, function (e) {
                  var n = r.default.createElement("button", e.classes);
                  (n.innerHTML = e.label),
                    n.addEventListener("click", function (t) {
                      e.onClick(t);
                    }),
                    t.footer.appendChild(n);
                });
              },
            },
            {
              key: "open",
              value: function () {
                this.root.classList.add("is-active"),
                  document.documentElement.classList.add("is-clipped"),
                  this.trigger("open");
              },
            },
            {
              key: "close",
              value: function () {
                this.root.classList.remove("is-active"),
                  document.documentElement.classList.remove("is-clipped"),
                  this.trigger("close");
              },
            },
            {
              key: "keyupListener",
              value: function (e) {
                if (this.root.classList.contains("is-active")) {
                  var t = e.key || e.keyCode;
                  ("Escape" !== t && "Esc" !== t && 27 !== t) || this.close();
                }
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
                  var a = r.get;
                  return void 0 !== a ? a.call(o) : void 0;
                })(
                  t.prototype.__proto__ || Object.getPrototypeOf(t.prototype),
                  "destroy",
                  this
                ).call(this),
                  this.root.remove(),
                  (this.parent = null),
                  (this.root = null),
                  (this.background = null),
                  (this.content = null),
                  "card" === this.style &&
                    ((this.header = null),
                    (this.headerTitle = null),
                    (this.cardBody = null),
                    (this.footer = null)),
                  this.closable &&
                    ((this.closeButton = null),
                    document.removeEventListener(
                      "keyup",
                      this.keyupListenerBound
                    )),
                  (this.config.gets = []),
                  this.trigger("destroyed");
              },
            },
          ]),
          t
        );
      })(i.default));
      r.default.registerPlugin("modal", u), (t.default = r.default);
    },
  ]).default;
});
