!(function (t, e) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define("Bulma", [], e)
    : "object" == typeof exports
    ? (exports.Bulma = e())
    : (t.Bulma = e());
})(window, function () {
  return (function (t) {
    var e = {};
    function n(r) {
      if (e[r]) return e[r].exports;
      var o = (e[r] = { i: r, l: !1, exports: {} });
      return t[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
    }
    return (
      (n.m = t),
      (n.c = e),
      (n.d = function (t, e, r) {
        n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r });
      }),
      (n.r = function (t) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(t, "__esModule", { value: !0 });
      }),
      (n.t = function (t, e) {
        if ((1 & e && (t = n(t)), 8 & e)) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var r = Object.create(null);
        if (
          (n.r(r),
          Object.defineProperty(r, "default", { enumerable: !0, value: t }),
          2 & e && "string" != typeof t)
        )
          for (var o in t)
            n.d(
              r,
              o,
              function (e) {
                return t[e];
              }.bind(null, o)
            );
        return r;
      }),
      (n.n = function (t) {
        var e =
          t && t.__esModule
            ? function () {
                return t.default;
              }
            : function () {
                return t;
              };
        return n.d(e, "a", e), e;
      }),
      (n.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }),
      (n.p = ""),
      n((n.s = 7))
    );
  })([
    function (t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var r,
        o = n(2),
        i = (r = o) && r.__esModule ? r : { default: r };
      function a(t) {
        return this instanceof a
          ? t instanceof a
            ? t
            : (t instanceof HTMLElement
                ? (this._elem = t)
                : (this._elem = document.querySelector(t)),
              t || (this._elem = document.createElement("div")),
              this._elem.hasOwnProperty(a.id) ||
                (this._elem[a.id] = i.default.uid++),
              this)
          : new a(t);
      }
      (a.VERSION = "0.12.1"),
        (a.id = "bulma-" + new Date().getTime()),
        (a.cache = new i.default()),
        (a.plugins = {}),
        (a.create = function (t, e) {
          if (!t || !a.plugins.hasOwnProperty(t))
            throw new Error(
              "[BulmaJS] A plugin with the key '" +
                t +
                "' has not been registered."
            );
          return new a.plugins[t].handler(e);
        }),
        (a.registerPlugin = function (t, e) {
          var n =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
          if (!t) throw new Error("[BulmaJS] Key attribute is required.");
          (a.plugins[t] = { priority: n, handler: e }),
            (a.prototype[t] = function (e) {
              return new a.plugins[t].handler(e, this);
            });
        }),
        (a.parseDocument = function () {
          var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : document,
            e = Object.keys(a.plugins).sort(function (t, e) {
              return a.plugins[t].priority < a.plugins[e].priority;
            });
          a.each(e, function (e) {
            a.plugins[e].handler.hasOwnProperty("parseDocument")
              ? a.plugins[e].handler.parseDocument(t)
              : console.error(
                  "[BulmaJS] Plugin " +
                    e +
                    " does not have a parseDocument method. Automatic document parsing is not possible for this plugin."
                );
          });
        }),
        (a.createElement = function (t, e) {
          e || (e = []), "string" == typeof e && (e = [e]);
          var n = document.createElement(t);
          return (
            a.each(e, function (t) {
              n.classList.add(t);
            }),
            n
          );
        }),
        (a.findOrCreateElement = function (t) {
          var e =
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
            o = e.querySelector(t);
          if (!o) {
            0 === r.length &&
              (r = t.split(".").filter(function (t) {
                return t;
              }));
            var i = a.createElement(n, r);
            return e.appendChild(i), i;
          }
          return o;
        }),
        (a.each = function (t, e) {
          var n = void 0;
          for (n = 0; n < t.length; n++) e(t[n], n);
        }),
        (a.ajax = function (t) {
          return new Promise(function (e, n) {
            var r = new XMLHttpRequest();
            r.open("GET", t, !0),
              (r.onload = function () {
                r.status >= 200 && r.status < 400
                  ? e(a._stripScripts(r.responseText))
                  : n();
              }),
              (r.onerror = function () {
                return n();
              }),
              r.send();
          });
        }),
        (a._stripScripts = function (t) {
          var e = document.createElement("div");
          e.innerHTML = t;
          for (var n = e.getElementsByTagName("script"), r = n.length; r--; )
            n[r].parentNode.removeChild(n[r]);
          return e.innerHTML.replace(/  +/g, " ");
        }),
        (a.getGlobalConfig = function (t) {
          var e =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : null;
          return window.hasOwnProperty("bulmaOptions") &&
            window.bulmaOptions.hasOwnProperty(t)
            ? window.bulmaOptions[t]
            : e;
        }),
        (a.prototype.data = function (t, e) {
          return e
            ? (a.cache.set(this._elem[a.id], t, e), this)
            : a.cache.get(this._elem[a.id], t);
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
        (e.default = a);
    },
    function (t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var r =
          Object.assign ||
          function (t) {
            for (var e = 1; e < arguments.length; e++) {
              var n = arguments[e];
              for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
            }
            return t;
          },
        o = (function () {
          function t(t, e) {
            for (var n = 0; n < e.length; n++) {
              var r = e[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                "value" in r && (r.writable = !0),
                Object.defineProperty(t, r.key, r);
            }
          }
          return function (e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e;
          };
        })(),
        i = s(n(3)),
        a = s(n(0));
      function s(t) {
        return t && t.__esModule ? t : { default: t };
      }
      function l(t, e) {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function");
      }
      var u = (function () {
        function t() {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {},
            n = arguments[1];
          if (
            (l(this, t),
            (e.root = n instanceof a.default ? n._elem : n),
            (this.config = new i.default(
              r({}, this.constructor.defaultConfig(), e)
            )),
            !n && !this.config.has("parent"))
          )
            throw new Error("A plugin requires a root and/or a parent.");
          (this.parent = this.config.get(
            "parent",
            e.root ? e.root.parentNode : null
          )),
            (this._events = {});
        }
        return (
          o(t, null, [
            {
              key: "defaultConfig",
              value: function () {
                return {};
              },
            },
          ]),
          o(t, [
            {
              key: "on",
              value: function (t, e) {
                this._events.hasOwnProperty(t) || (this._events[t] = []),
                  this._events[t].push(e);
              },
            },
            {
              key: "trigger",
              value: function (t) {
                var e =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : {};
                if (this._events.hasOwnProperty(t))
                  for (var n = 0; n < this._events[t].length; n++)
                    this._events[t][n](e);
              },
            },
            {
              key: "destroy",
              value: function () {
                (0, a.default)(this.root).destroyData();
              },
            },
          ]),
          t
        );
      })();
      e.default = u;
    },
    function (t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var r = (function () {
        function t(t, e) {
          for (var n = 0; n < e.length; n++) {
            var r = e[n];
            (r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              "value" in r && (r.writable = !0),
              Object.defineProperty(t, r.key, r);
          }
        }
        return function (e, n, r) {
          return n && t(e.prototype, n), r && t(e, r), e;
        };
      })();
      var o = (function () {
        function t() {
          !(function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, t),
            (this._data = {});
        }
        return (
          r(t, [
            {
              key: "set",
              value: function (t, e, n) {
                this._data.hasOwnProperty(t) || (this._data[t] = {}),
                  (this._data[t][e] = n);
              },
            },
            {
              key: "get",
              value: function (t, e) {
                if (this._data.hasOwnProperty(t)) return this._data[t][e];
              },
            },
            {
              key: "destroy",
              value: function (t) {
                this._data.hasOwnProperty(t) && delete this._data[t];
              },
            },
          ]),
          t
        );
      })();
      (o.uid = 1), (e.default = o);
    },
    function (t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var r =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              },
        o = (function () {
          function t(t, e) {
            for (var n = 0; n < e.length; n++) {
              var r = e[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                "value" in r && (r.writable = !0),
                Object.defineProperty(t, r.key, r);
            }
          }
          return function (e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e;
          };
        })();
      function i(t, e) {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function");
      }
      var a = (function () {
        function t() {
          var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
          if ((i(this, t), "object" !== (void 0 === e ? "undefined" : r(e))))
            throw new TypeError("initialConfig must be of type object.");
          this._items = e;
        }
        return (
          o(t, [
            {
              key: "set",
              value: function (t, e) {
                if (!t || !e)
                  throw new Error(
                    "A key and value must be provided when setting a new option."
                  );
                this._items[t] = e;
              },
            },
            {
              key: "has",
              value: function (t) {
                if (!t) throw new Error("A key must be provided.");
                return this._items.hasOwnProperty(t) && this._items[t];
              },
            },
            {
              key: "get",
              value: function (t) {
                var e =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : null;
                return e && !this.has(t)
                  ? "function" == typeof e
                    ? e()
                    : e
                  : this._items[t];
              },
            },
          ]),
          t
        );
      })();
      e.default = a;
    },
    ,
    ,
    ,
    function (t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.Navbar = void 0);
      var r =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              },
        o = (function () {
          function t(t, e) {
            for (var n = 0; n < e.length; n++) {
              var r = e[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                "value" in r && (r.writable = !0),
                Object.defineProperty(t, r.key, r);
            }
          }
          return function (e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e;
          };
        })(),
        i = s(n(0)),
        a = s(n(1));
      function s(t) {
        return t && t.__esModule ? t : { default: t };
      }
      var l = (e.Navbar = (function (t) {
        function e(t, n) {
          !(function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, e);
          var o = (function (t, e) {
            if (!t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return !e || ("object" != typeof e && "function" != typeof e)
              ? t
              : e;
          })(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n));
          return (
            null === o.parent && (o.parent = o.config.get("root").parentNode),
            (o.root = o.config.get("root")),
            o.root.setAttribute("data-bulma-attached", "attached"),
            (o.triggerElement = o.root.querySelector(".navbar-burger")),
            (o.target = o.root.querySelector(".navbar-menu")),
            (o.sticky =
              "object" ===
                ("undefined" == typeof window ? "undefined" : r(window)) &&
              !!o.config.get("sticky")),
            (o.stickyOffset = parseInt(o.config.get("stickyOffset"))),
            (o.hideOnScroll = !!o.config.get("hideOnScroll")),
            (o.tolerance = parseInt(o.config.get("tolerance"))),
            (o.shadow = !!o.config.get("shadow")),
            (o.hideOffset = parseInt(
              o.config.get(
                "hideOffset",
                Math.max(o.root.scrollHeight, o.stickyOffset)
              )
            )),
            (o.lastScrollY = 0),
            (o.dropdowns = o.root.querySelectorAll(
              ".navbar-item.has-dropdown:not(.is-hoverable)"
            )),
            (o.handleScroll = o.handleScroll.bind(o)),
            (0, i.default)(o.root).data("navbar", o),
            o.registerEvents(),
            o
          );
        }
        return (
          (function (t, e) {
            if ("function" != typeof e && null !== e)
              throw new TypeError(
                "Super expression must either be null or a function, not " +
                  typeof e
              );
            (t.prototype = Object.create(e && e.prototype, {
              constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0,
              },
            })),
              e &&
                (Object.setPrototypeOf
                  ? Object.setPrototypeOf(t, e)
                  : (t.__proto__ = e));
          })(e, t),
          o(e, null, [
            {
              key: "parseDocument",
              value: function (t) {
                var e = void 0;
                (e =
                  "object" === r(t.classList) && t.classList.contains("navbar")
                    ? [t]
                    : t.querySelectorAll(".navbar")),
                  i.default.each(e, function (t) {
                    (0, i.default)(t).navbar({
                      sticky: !!t.hasAttribute("data-sticky"),
                      stickyOffset: t.hasAttribute("data-sticky-offset")
                        ? t.getAttribute("data-sticky-offset")
                        : 0,
                      hideOnScroll: !!t.hasAttribute("data-hide-on-scroll"),
                      tolerance: t.hasAttribute("data-tolerance")
                        ? t.getAttribute("data-tolerance")
                        : 0,
                      hideOffset: t.hasAttribute("data-hide-offset")
                        ? t.getAttribute("data-hide-offset")
                        : null,
                      shadow: !!t.hasAttribute("data-sticky-shadow"),
                    });
                  });
              },
            },
            {
              key: "defaultconfig",
              value: function () {
                return {
                  sticky: !1,
                  stickyOffset: 0,
                  hideOnScroll: !1,
                  tolerance: 0,
                  hideOffset: null,
                  shadow: !1,
                };
              },
            },
          ]),
          o(e, [
            {
              key: "registerEvents",
              value: function () {
                var t = this;
                this.triggerElement &&
                  this.triggerElement.addEventListener(
                    "click",
                    this.handleTriggerClick.bind(this)
                  ),
                  this.sticky && this.enableSticky(),
                  i.default.each(this.dropdowns, function (e) {
                    e.addEventListener("click", t.handleDropdownTrigger);
                  });
              },
            },
            {
              key: "handleTriggerClick",
              value: function () {
                this.target.classList.contains("is-active")
                  ? (this.target.classList.remove("is-active"),
                    this.triggerElement.classList.remove("is-active"))
                  : (this.target.classList.add("is-active"),
                    this.triggerElement.classList.add("is-active"));
              },
            },
            {
              key: "handleScroll",
              value: function () {
                this.toggleSticky(window.pageYOffset);
              },
            },
            {
              key: "handleDropdownTrigger",
              value: function () {
                this.classList.contains("is-active")
                  ? this.classList.remove("is-active")
                  : this.classList.add("is-active");
              },
            },
            {
              key: "enableSticky",
              value: function () {
                window.addEventListener("scroll", this.handleScroll),
                  this.root.setAttribute("data-sticky", ""),
                  (this.sticky = !0);
              },
            },
            {
              key: "disableSticky",
              value: function () {
                window.removeEventListener("scroll", this.handleScroll),
                  this.root.removeAttribute("data-sticky"),
                  (this.sticky = !1);
              },
            },
            {
              key: "enableHideOnScroll",
              value: function () {
                this.sticky || this.enableSticky(),
                  this.root.setAttribute("data-hide-on-scroll", ""),
                  (this.hideOnScroll = !0);
              },
            },
            {
              key: "disableHideOnScroll",
              value: function () {
                this.root.removeAttribute("data-hide-on-scroll"),
                  (this.hideOnScroll = !1),
                  this.root.classList.remove("is-hidden-scroll");
              },
            },
            {
              key: "toggleSticky",
              value: function (t) {
                if (
                  (t > this.stickyOffset
                    ? (this.root.classList.add("is-fixed-top"),
                      document.body.classList.add("has-navbar-fixed-top"),
                      this.shadow && this.root.classList.add("has-shadow"))
                    : (this.root.classList.remove("is-fixed-top"),
                      document.body.classList.remove("has-navbar-fixed-top"),
                      this.shadow && this.root.classList.remove("has-shadow")),
                  this.hideOnScroll)
                ) {
                  var e = this.calculateScrollDirection(t, this.lastScrollY),
                    n = this.difference(t, this.lastScrollY) >= this.tolerance;
                  if ("down" === e) {
                    var r = t > this.hideOffset;
                    n && r && this.root.classList.add("is-hidden-scroll");
                  } else {
                    var o = t < this.hideOffset;
                    (n || o) && this.root.classList.remove("is-hidden-scroll");
                  }
                  this.lastScrollY = t;
                }
              },
            },
            {
              key: "difference",
              value: function (t, e) {
                return t > e ? t - e : e - t;
              },
            },
            {
              key: "calculateScrollDirection",
              value: function (t, e) {
                return t >= e ? "down" : "up";
              },
            },
          ]),
          e
        );
      })(a.default));
      i.default.registerPlugin("navbar", l), (e.default = i.default);
    },
  ]).default;
});
