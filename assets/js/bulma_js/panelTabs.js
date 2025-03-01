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
    function n(r) {
      if (t[r]) return t[r].exports;
      var o = (t[r] = { i: r, l: !1, exports: {} });
      return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
    }
    return (
      (n.m = e),
      (n.c = t),
      (n.d = function (e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
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
        var r = Object.create(null);
        if (
          (n.r(r),
          Object.defineProperty(r, "default", { enumerable: !0, value: e }),
          2 & t && "string" != typeof e)
        )
          for (var o in e)
            n.d(
              r,
              o,
              function (t) {
                return e[t];
              }.bind(null, o)
            );
        return r;
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
      n((n.s = 13))
    );
  })([
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var r,
        o = n(2),
        i = (r = o) && r.__esModule ? r : { default: r };
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
            r =
              arguments.length > 3 && void 0 !== arguments[3]
                ? arguments[3]
                : [],
            o = t.querySelector(e);
          if (!o) {
            0 === r.length &&
              (r = e.split(".").filter(function (e) {
                return e;
              }));
            var i = a.createElement(n, r);
            return t.appendChild(i), i;
          }
          return o;
        }),
        (a.each = function (e, t) {
          var n = void 0;
          for (n = 0; n < e.length; n++) t(e[n], n);
        }),
        (a.ajax = function (e) {
          return new Promise(function (t, n) {
            var r = new XMLHttpRequest();
            r.open("GET", e, !0),
              (r.onload = function () {
                r.status >= 200 && r.status < 400
                  ? t(a._stripScripts(r.responseText))
                  : n();
              }),
              (r.onerror = function () {
                return n();
              }),
              r.send();
          });
        }),
        (a._stripScripts = function (e) {
          var t = document.createElement("div");
          t.innerHTML = e;
          for (var n = t.getElementsByTagName("script"), r = n.length; r--; )
            n[r].parentNode.removeChild(n[r]);
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
      var r =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
          },
        o = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                "value" in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function (t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t;
          };
        })(),
        i = u(n(3)),
        a = u(n(0));
      function u(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function s(e, t) {
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
            (s(this, e),
            (t.root = n instanceof a.default ? n._elem : n),
            (this.config = new i.default(
              r({}, this.constructor.defaultConfig(), t)
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
          o(e, null, [
            {
              key: "defaultConfig",
              value: function () {
                return {};
              },
            },
          ]),
          o(e, [
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
      t.default = l;
    },
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var r = (function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              "value" in r && (r.writable = !0),
              Object.defineProperty(e, r.key, r);
          }
        }
        return function (t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t;
        };
      })();
      var o = (function () {
        function e() {
          !(function (e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          })(this, e),
            (this._data = {});
        }
        return (
          r(e, [
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
      (o.uid = 1), (t.default = o);
    },
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var r =
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
        o = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                "value" in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function (t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t;
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
          if ((i(this, e), "object" !== (void 0 === t ? "undefined" : r(t))))
            throw new TypeError("initialConfig must be of type object.");
          this._items = t;
        }
        return (
          o(e, [
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
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.PanelTabs = void 0);
      var r =
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
        o = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                "value" in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function (t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t;
          };
        })(),
        i = u(n(0)),
        a = u(n(1));
      function u(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var s = (t.PanelTabs = (function (e) {
        function t(e, n) {
          !(function (e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          })(this, t);
          var r = (function (e, t) {
            if (!e)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return !t || ("object" != typeof t && "function" != typeof t)
              ? e
              : t;
          })(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n));
          return (
            (r.root = r.config.get("root")),
            r.root.setAttribute("data-bulma-attached", "attached"),
            (r.nav = r.findNav()),
            (r.navItems = r.findNavItems()),
            (r.contentItems = r.findContentItems()),
            r.setupNavEvents(),
            r.on("init", r.showActiveTab.bind(r)),
            (0, i.default)(r.root).data("panelTabs", r),
            r.trigger("init"),
            r
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
              key: "parseDocument",
              value: function (e) {
                var t = void 0;
                (t =
                  "object" === r(e.classList) && e.classList.contains("panel")
                    ? [e]
                    : e.querySelectorAll(".panel")),
                  i.default.each(t, function (e) {
                    null !== e.querySelector(".panel-tabs") &&
                      (0, i.default)(e).panelTabs();
                  });
              },
            },
            {
              key: "defaultConfig",
              value: function () {
                return {};
              },
            },
          ]),
          o(t, [
            {
              key: "findNav",
              value: function () {
                return this.root.querySelector(".panel-tabs");
              },
            },
            {
              key: "findNavItems",
              value: function () {
                return this.nav.querySelectorAll("a");
              },
            },
            {
              key: "findContentItems",
              value: function () {
                return this.root.querySelectorAll(
                  ".panel-block[data-category]"
                );
              },
            },
            {
              key: "setupNavEvents",
              value: function () {
                var e = this;
                i.default.each(this.navItems, function (t) {
                  t.addEventListener("click", function () {
                    e.setActive(t.getAttribute("data-target"));
                  });
                });
              },
            },
            {
              key: "setActive",
              value: function (e) {
                this.navItems.forEach(function (t) {
                  t.getAttribute("data-target") === e
                    ? t.classList.add("is-active")
                    : t.classList.remove("is-active");
                }),
                  this.contentItems.forEach(function (t) {
                    t.getAttribute("data-category") === e || null === e
                      ? t.classList.remove("is-hidden")
                      : t.classList.add("is-hidden");
                  });
              },
            },
            {
              key: "showActiveTab",
              value: function () {
                var e = this,
                  t = !1;
                i.default.each(this.navItems, function (n) {
                  n.classList.contains("is-active") &&
                    (e.setActive(n.getAttribute("data-target")), (t = !0));
                }),
                  t ||
                    this.setActive(
                      this.navItems[0].getAttribute("data-target")
                    );
              },
            },
          ]),
          t
        );
      })(a.default));
      i.default.registerPlugin("panelTabs", s), (t.default = i.default);
    },
  ]).default;
});
