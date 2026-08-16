var Jx = Object.defineProperty
var eR = (t, r, l) => (r in t ? Jx(t, r, { enumerable: !0, configurable: !0, writable: !0, value: l }) : (t[r] = l))
var ti = (t, r, l) => eR(t, typeof r != 'symbol' ? r + '' : r, l)
function tR(t, r) {
  for (var l = 0; l < r.length; l++) {
    const o = r[l]
    if (typeof o != 'string' && !Array.isArray(o)) {
      for (const s in o)
        if (s !== 'default' && !(s in t)) {
          const u = Object.getOwnPropertyDescriptor(o, s)
          u && Object.defineProperty(t, s, u.get ? u : { enumerable: !0, get: () => o[s] })
        }
    }
  }
  return Object.freeze(Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }))
}
;(function () {
  const r = document.createElement('link').relList
  if (r && r.supports && r.supports('modulepreload')) return
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) o(s)
  new MutationObserver(s => {
    for (const u of s)
      if (u.type === 'childList')
        for (const f of u.addedNodes) f.tagName === 'LINK' && f.rel === 'modulepreload' && o(f)
  }).observe(document, { childList: !0, subtree: !0 })
  function l(s) {
    const u = {}
    return (
      s.integrity && (u.integrity = s.integrity),
      s.referrerPolicy && (u.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === 'use-credentials'
        ? (u.credentials = 'include')
        : s.crossOrigin === 'anonymous'
          ? (u.credentials = 'omit')
          : (u.credentials = 'same-origin'),
      u
    )
  }
  function o(s) {
    if (s.ep) return
    s.ep = !0
    const u = l(s)
    fetch(s.href, u)
  }
})()
function Hb(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, 'default') ? t.default : t
}
var Ed = { exports: {} },
  ni = {}
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var qy
function nR() {
  if (qy) return ni
  qy = 1
  var t = Symbol.for('react.transitional.element'),
    r = Symbol.for('react.fragment')
  function l(o, s, u) {
    var f = null
    if ((u !== void 0 && (f = '' + u), s.key !== void 0 && (f = '' + s.key), 'key' in s)) {
      u = {}
      for (var p in s) p !== 'key' && (u[p] = s[p])
    } else u = s
    return ((s = u.ref), { $$typeof: t, type: o, key: f, ref: s !== void 0 ? s : null, props: u })
  }
  return ((ni.Fragment = r), (ni.jsx = l), (ni.jsxs = l), ni)
}
var Iy
function rR() {
  return (Iy || ((Iy = 1), (Ed.exports = nR())), Ed.exports)
}
var q = rR(),
  Td = { exports: {} },
  ri = {},
  Cd = { exports: {} },
  wd = {}
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Fy
function aR() {
  return (
    Fy ||
      ((Fy = 1),
      (function (t) {
        function r(N, H) {
          var W = N.length
          N.push(H)
          e: for (; 0 < W;) {
            var ue = (W - 1) >>> 1,
              D = N[ue]
            if (0 < s(D, H)) ((N[ue] = H), (N[W] = D), (W = ue))
            else break e
          }
        }
        function l(N) {
          return N.length === 0 ? null : N[0]
        }
        function o(N) {
          if (N.length === 0) return null
          var H = N[0],
            W = N.pop()
          if (W !== H) {
            N[0] = W
            e: for (var ue = 0, D = N.length, I = D >>> 1; ue < I;) {
              var ee = 2 * (ue + 1) - 1,
                te = N[ee],
                ie = ee + 1,
                pe = N[ie]
              if (0 > s(te, W))
                ie < D && 0 > s(pe, te)
                  ? ((N[ue] = pe), (N[ie] = W), (ue = ie))
                  : ((N[ue] = te), (N[ee] = W), (ue = ee))
              else if (ie < D && 0 > s(pe, W)) ((N[ue] = pe), (N[ie] = W), (ue = ie))
              else break e
            }
          }
          return H
        }
        function s(N, H) {
          var W = N.sortIndex - H.sortIndex
          return W !== 0 ? W : N.id - H.id
        }
        if (((t.unstable_now = void 0), typeof performance == 'object' && typeof performance.now == 'function')) {
          var u = performance
          t.unstable_now = function () {
            return u.now()
          }
        } else {
          var f = Date,
            p = f.now()
          t.unstable_now = function () {
            return f.now() - p
          }
        }
        var h = [],
          m = [],
          g = 1,
          b = null,
          C = 3,
          v = !1,
          w = !1,
          R = !1,
          T = !1,
          A = typeof setTimeout == 'function' ? setTimeout : null,
          O = typeof clearTimeout == 'function' ? clearTimeout : null,
          M = typeof setImmediate < 'u' ? setImmediate : null
        function z(N) {
          for (var H = l(m); H !== null;) {
            if (H.callback === null) o(m)
            else if (H.startTime <= N) (o(m), (H.sortIndex = H.expirationTime), r(h, H))
            else break
            H = l(m)
          }
        }
        function _(N) {
          if (((R = !1), z(N), !w))
            if (l(h) !== null) ((w = !0), k || ((k = !0), x()))
            else {
              var H = l(m)
              H !== null && U(_, H.startTime - N)
            }
        }
        var k = !1,
          V = -1,
          Q = 5,
          oe = -1
        function ce() {
          return T ? !0 : !(t.unstable_now() - oe < Q)
        }
        function Z() {
          if (((T = !1), k)) {
            var N = t.unstable_now()
            oe = N
            var H = !0
            try {
              e: {
                ;((w = !1), R && ((R = !1), O(V), (V = -1)), (v = !0))
                var W = C
                try {
                  t: {
                    for (z(N), b = l(h); b !== null && !(b.expirationTime > N && ce());) {
                      var ue = b.callback
                      if (typeof ue == 'function') {
                        ;((b.callback = null), (C = b.priorityLevel))
                        var D = ue(b.expirationTime <= N)
                        if (((N = t.unstable_now()), typeof D == 'function')) {
                          ;((b.callback = D), z(N), (H = !0))
                          break t
                        }
                        ;(b === l(h) && o(h), z(N))
                      } else o(h)
                      b = l(h)
                    }
                    if (b !== null) H = !0
                    else {
                      var I = l(m)
                      ;(I !== null && U(_, I.startTime - N), (H = !1))
                    }
                  }
                  break e
                } finally {
                  ;((b = null), (C = W), (v = !1))
                }
                H = void 0
              }
            } finally {
              H ? x() : (k = !1)
            }
          }
        }
        var x
        if (typeof M == 'function')
          x = function () {
            M(Z)
          }
        else if (typeof MessageChannel < 'u') {
          var G = new MessageChannel(),
            L = G.port2
          ;((G.port1.onmessage = Z),
            (x = function () {
              L.postMessage(null)
            }))
        } else
          x = function () {
            A(Z, 0)
          }
        function U(N, H) {
          V = A(function () {
            N(t.unstable_now())
          }, H)
        }
        ;((t.unstable_IdlePriority = 5),
          (t.unstable_ImmediatePriority = 1),
          (t.unstable_LowPriority = 4),
          (t.unstable_NormalPriority = 3),
          (t.unstable_Profiling = null),
          (t.unstable_UserBlockingPriority = 2),
          (t.unstable_cancelCallback = function (N) {
            N.callback = null
          }),
          (t.unstable_forceFrameRate = function (N) {
            0 > N || 125 < N
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
                )
              : (Q = 0 < N ? Math.floor(1e3 / N) : 5)
          }),
          (t.unstable_getCurrentPriorityLevel = function () {
            return C
          }),
          (t.unstable_next = function (N) {
            switch (C) {
              case 1:
              case 2:
              case 3:
                var H = 3
                break
              default:
                H = C
            }
            var W = C
            C = H
            try {
              return N()
            } finally {
              C = W
            }
          }),
          (t.unstable_requestPaint = function () {
            T = !0
          }),
          (t.unstable_runWithPriority = function (N, H) {
            switch (N) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break
              default:
                N = 3
            }
            var W = C
            C = N
            try {
              return H()
            } finally {
              C = W
            }
          }),
          (t.unstable_scheduleCallback = function (N, H, W) {
            var ue = t.unstable_now()
            switch (
              (typeof W == 'object' && W !== null
                ? ((W = W.delay), (W = typeof W == 'number' && 0 < W ? ue + W : ue))
                : (W = ue),
              N)
            ) {
              case 1:
                var D = -1
                break
              case 2:
                D = 250
                break
              case 5:
                D = 1073741823
                break
              case 4:
                D = 1e4
                break
              default:
                D = 5e3
            }
            return (
              (D = W + D),
              (N = { id: g++, callback: H, priorityLevel: N, startTime: W, expirationTime: D, sortIndex: -1 }),
              W > ue
                ? ((N.sortIndex = W),
                  r(m, N),
                  l(h) === null && N === l(m) && (R ? (O(V), (V = -1)) : (R = !0), U(_, W - ue)))
                : ((N.sortIndex = D), r(h, N), w || v || ((w = !0), k || ((k = !0), x()))),
              N
            )
          }),
          (t.unstable_shouldYield = ce),
          (t.unstable_wrapCallback = function (N) {
            var H = C
            return function () {
              var W = C
              C = H
              try {
                return N.apply(this, arguments)
              } finally {
                C = W
              }
            }
          }))
      })(wd)),
    wd
  )
}
var Yy
function lR() {
  return (Yy || ((Yy = 1), (Cd.exports = aR())), Cd.exports)
}
var Ad = { exports: {} },
  _e = {}
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Vy
function oR() {
  if (Vy) return _e
  Vy = 1
  var t = Symbol.for('react.transitional.element'),
    r = Symbol.for('react.portal'),
    l = Symbol.for('react.fragment'),
    o = Symbol.for('react.strict_mode'),
    s = Symbol.for('react.profiler'),
    u = Symbol.for('react.consumer'),
    f = Symbol.for('react.context'),
    p = Symbol.for('react.forward_ref'),
    h = Symbol.for('react.suspense'),
    m = Symbol.for('react.memo'),
    g = Symbol.for('react.lazy'),
    b = Symbol.iterator
  function C(D) {
    return D === null || typeof D != 'object'
      ? null
      : ((D = (b && D[b]) || D['@@iterator']), typeof D == 'function' ? D : null)
  }
  var v = {
      isMounted: function () {
        return !1
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    w = Object.assign,
    R = {}
  function T(D, I, ee) {
    ;((this.props = D), (this.context = I), (this.refs = R), (this.updater = ee || v))
  }
  ;((T.prototype.isReactComponent = {}),
    (T.prototype.setState = function (D, I) {
      if (typeof D != 'object' && typeof D != 'function' && D != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        )
      this.updater.enqueueSetState(this, D, I, 'setState')
    }),
    (T.prototype.forceUpdate = function (D) {
      this.updater.enqueueForceUpdate(this, D, 'forceUpdate')
    }))
  function A() {}
  A.prototype = T.prototype
  function O(D, I, ee) {
    ;((this.props = D), (this.context = I), (this.refs = R), (this.updater = ee || v))
  }
  var M = (O.prototype = new A())
  ;((M.constructor = O), w(M, T.prototype), (M.isPureReactComponent = !0))
  var z = Array.isArray,
    _ = { H: null, A: null, T: null, S: null, V: null },
    k = Object.prototype.hasOwnProperty
  function V(D, I, ee, te, ie, pe) {
    return ((ee = pe.ref), { $$typeof: t, type: D, key: I, ref: ee !== void 0 ? ee : null, props: pe })
  }
  function Q(D, I) {
    return V(D.type, I, void 0, void 0, void 0, D.props)
  }
  function oe(D) {
    return typeof D == 'object' && D !== null && D.$$typeof === t
  }
  function ce(D) {
    var I = { '=': '=0', ':': '=2' }
    return (
      '$' +
      D.replace(/[=:]/g, function (ee) {
        return I[ee]
      })
    )
  }
  var Z = /\/+/g
  function x(D, I) {
    return typeof D == 'object' && D !== null && D.key != null ? ce('' + D.key) : I.toString(36)
  }
  function G() {}
  function L(D) {
    switch (D.status) {
      case 'fulfilled':
        return D.value
      case 'rejected':
        throw D.reason
      default:
        switch (
          (typeof D.status == 'string'
            ? D.then(G, G)
            : ((D.status = 'pending'),
              D.then(
                function (I) {
                  D.status === 'pending' && ((D.status = 'fulfilled'), (D.value = I))
                },
                function (I) {
                  D.status === 'pending' && ((D.status = 'rejected'), (D.reason = I))
                }
              )),
          D.status)
        ) {
          case 'fulfilled':
            return D.value
          case 'rejected':
            throw D.reason
        }
    }
    throw D
  }
  function U(D, I, ee, te, ie) {
    var pe = typeof D
    ;(pe === 'undefined' || pe === 'boolean') && (D = null)
    var le = !1
    if (D === null) le = !0
    else
      switch (pe) {
        case 'bigint':
        case 'string':
        case 'number':
          le = !0
          break
        case 'object':
          switch (D.$$typeof) {
            case t:
            case r:
              le = !0
              break
            case g:
              return ((le = D._init), U(le(D._payload), I, ee, te, ie))
          }
      }
    if (le)
      return (
        (ie = ie(D)),
        (le = te === '' ? '.' + x(D, 0) : te),
        z(ie)
          ? ((ee = ''),
            le != null && (ee = le.replace(Z, '$&/') + '/'),
            U(ie, I, ee, '', function (Se) {
              return Se
            }))
          : ie != null &&
            (oe(ie) &&
              (ie = Q(
                ie,
                ee + (ie.key == null || (D && D.key === ie.key) ? '' : ('' + ie.key).replace(Z, '$&/') + '/') + le
              )),
            I.push(ie)),
        1
      )
    le = 0
    var me = te === '' ? '.' : te + ':'
    if (z(D)) for (var fe = 0; fe < D.length; fe++) ((te = D[fe]), (pe = me + x(te, fe)), (le += U(te, I, ee, pe, ie)))
    else if (((fe = C(D)), typeof fe == 'function'))
      for (D = fe.call(D), fe = 0; !(te = D.next()).done;)
        ((te = te.value), (pe = me + x(te, fe++)), (le += U(te, I, ee, pe, ie)))
    else if (pe === 'object') {
      if (typeof D.then == 'function') return U(L(D), I, ee, te, ie)
      throw (
        (I = String(D)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (I === '[object Object]' ? 'object with keys {' + Object.keys(D).join(', ') + '}' : I) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      )
    }
    return le
  }
  function N(D, I, ee) {
    if (D == null) return D
    var te = [],
      ie = 0
    return (
      U(D, te, '', '', function (pe) {
        return I.call(ee, pe, ie++)
      }),
      te
    )
  }
  function H(D) {
    if (D._status === -1) {
      var I = D._result
      ;((I = I()),
        I.then(
          function (ee) {
            ;(D._status === 0 || D._status === -1) && ((D._status = 1), (D._result = ee))
          },
          function (ee) {
            ;(D._status === 0 || D._status === -1) && ((D._status = 2), (D._result = ee))
          }
        ),
        D._status === -1 && ((D._status = 0), (D._result = I)))
    }
    if (D._status === 1) return D._result.default
    throw D._result
  }
  var W =
    typeof reportError == 'function'
      ? reportError
      : function (D) {
          if (typeof window == 'object' && typeof window.ErrorEvent == 'function') {
            var I = new window.ErrorEvent('error', {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof D == 'object' && D !== null && typeof D.message == 'string' ? String(D.message) : String(D),
              error: D,
            })
            if (!window.dispatchEvent(I)) return
          } else if (typeof process == 'object' && typeof process.emit == 'function') {
            process.emit('uncaughtException', D)
            return
          }
          console.error(D)
        }
  function ue() {}
  return (
    (_e.Children = {
      map: N,
      forEach: function (D, I, ee) {
        N(
          D,
          function () {
            I.apply(this, arguments)
          },
          ee
        )
      },
      count: function (D) {
        var I = 0
        return (
          N(D, function () {
            I++
          }),
          I
        )
      },
      toArray: function (D) {
        return (
          N(D, function (I) {
            return I
          }) || []
        )
      },
      only: function (D) {
        if (!oe(D)) throw Error('React.Children.only expected to receive a single React element child.')
        return D
      },
    }),
    (_e.Component = T),
    (_e.Fragment = l),
    (_e.Profiler = s),
    (_e.PureComponent = O),
    (_e.StrictMode = o),
    (_e.Suspense = h),
    (_e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = _),
    (_e.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (D) {
        return _.H.useMemoCache(D)
      },
    }),
    (_e.cache = function (D) {
      return function () {
        return D.apply(null, arguments)
      }
    }),
    (_e.cloneElement = function (D, I, ee) {
      if (D == null) throw Error('The argument must be a React element, but you passed ' + D + '.')
      var te = w({}, D.props),
        ie = D.key,
        pe = void 0
      if (I != null)
        for (le in (I.ref !== void 0 && (pe = void 0), I.key !== void 0 && (ie = '' + I.key), I))
          !k.call(I, le) ||
            le === 'key' ||
            le === '__self' ||
            le === '__source' ||
            (le === 'ref' && I.ref === void 0) ||
            (te[le] = I[le])
      var le = arguments.length - 2
      if (le === 1) te.children = ee
      else if (1 < le) {
        for (var me = Array(le), fe = 0; fe < le; fe++) me[fe] = arguments[fe + 2]
        te.children = me
      }
      return V(D.type, ie, void 0, void 0, pe, te)
    }),
    (_e.createContext = function (D) {
      return (
        (D = { $$typeof: f, _currentValue: D, _currentValue2: D, _threadCount: 0, Provider: null, Consumer: null }),
        (D.Provider = D),
        (D.Consumer = { $$typeof: u, _context: D }),
        D
      )
    }),
    (_e.createElement = function (D, I, ee) {
      var te,
        ie = {},
        pe = null
      if (I != null)
        for (te in (I.key !== void 0 && (pe = '' + I.key), I))
          k.call(I, te) && te !== 'key' && te !== '__self' && te !== '__source' && (ie[te] = I[te])
      var le = arguments.length - 2
      if (le === 1) ie.children = ee
      else if (1 < le) {
        for (var me = Array(le), fe = 0; fe < le; fe++) me[fe] = arguments[fe + 2]
        ie.children = me
      }
      if (D && D.defaultProps) for (te in ((le = D.defaultProps), le)) ie[te] === void 0 && (ie[te] = le[te])
      return V(D, pe, void 0, void 0, null, ie)
    }),
    (_e.createRef = function () {
      return { current: null }
    }),
    (_e.forwardRef = function (D) {
      return { $$typeof: p, render: D }
    }),
    (_e.isValidElement = oe),
    (_e.lazy = function (D) {
      return { $$typeof: g, _payload: { _status: -1, _result: D }, _init: H }
    }),
    (_e.memo = function (D, I) {
      return { $$typeof: m, type: D, compare: I === void 0 ? null : I }
    }),
    (_e.startTransition = function (D) {
      var I = _.T,
        ee = {}
      _.T = ee
      try {
        var te = D(),
          ie = _.S
        ;(ie !== null && ie(ee, te),
          typeof te == 'object' && te !== null && typeof te.then == 'function' && te.then(ue, W))
      } catch (pe) {
        W(pe)
      } finally {
        _.T = I
      }
    }),
    (_e.unstable_useCacheRefresh = function () {
      return _.H.useCacheRefresh()
    }),
    (_e.use = function (D) {
      return _.H.use(D)
    }),
    (_e.useActionState = function (D, I, ee) {
      return _.H.useActionState(D, I, ee)
    }),
    (_e.useCallback = function (D, I) {
      return _.H.useCallback(D, I)
    }),
    (_e.useContext = function (D) {
      return _.H.useContext(D)
    }),
    (_e.useDebugValue = function () {}),
    (_e.useDeferredValue = function (D, I) {
      return _.H.useDeferredValue(D, I)
    }),
    (_e.useEffect = function (D, I, ee) {
      var te = _.H
      if (typeof ee == 'function') throw Error('useEffect CRUD overload is not enabled in this build of React.')
      return te.useEffect(D, I)
    }),
    (_e.useId = function () {
      return _.H.useId()
    }),
    (_e.useImperativeHandle = function (D, I, ee) {
      return _.H.useImperativeHandle(D, I, ee)
    }),
    (_e.useInsertionEffect = function (D, I) {
      return _.H.useInsertionEffect(D, I)
    }),
    (_e.useLayoutEffect = function (D, I) {
      return _.H.useLayoutEffect(D, I)
    }),
    (_e.useMemo = function (D, I) {
      return _.H.useMemo(D, I)
    }),
    (_e.useOptimistic = function (D, I) {
      return _.H.useOptimistic(D, I)
    }),
    (_e.useReducer = function (D, I, ee) {
      return _.H.useReducer(D, I, ee)
    }),
    (_e.useRef = function (D) {
      return _.H.useRef(D)
    }),
    (_e.useState = function (D) {
      return _.H.useState(D)
    }),
    (_e.useSyncExternalStore = function (D, I, ee) {
      return _.H.useSyncExternalStore(D, I, ee)
    }),
    (_e.useTransition = function () {
      return _.H.useTransition()
    }),
    (_e.version = '19.1.1'),
    _e
  )
}
var Gy
function bp() {
  return (Gy || ((Gy = 1), (Ad.exports = oR())), Ad.exports)
}
var Od = { exports: {} },
  Zt = {}
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ky
function iR() {
  if (Ky) return Zt
  Ky = 1
  var t = bp()
  function r(h) {
    var m = 'https://react.dev/errors/' + h
    if (1 < arguments.length) {
      m += '?args[]=' + encodeURIComponent(arguments[1])
      for (var g = 2; g < arguments.length; g++) m += '&args[]=' + encodeURIComponent(arguments[g])
    }
    return (
      'Minified React error #' +
      h +
      '; visit ' +
      m +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    )
  }
  function l() {}
  var o = {
      d: {
        f: l,
        r: function () {
          throw Error(r(522))
        },
        D: l,
        C: l,
        L: l,
        m: l,
        X: l,
        S: l,
        M: l,
      },
      p: 0,
      findDOMNode: null,
    },
    s = Symbol.for('react.portal')
  function u(h, m, g) {
    var b = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null
    return { $$typeof: s, key: b == null ? null : '' + b, children: h, containerInfo: m, implementation: g }
  }
  var f = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE
  function p(h, m) {
    if (h === 'font') return ''
    if (typeof m == 'string') return m === 'use-credentials' ? m : ''
  }
  return (
    (Zt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o),
    (Zt.createPortal = function (h, m) {
      var g = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null
      if (!m || (m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11)) throw Error(r(299))
      return u(h, m, null, g)
    }),
    (Zt.flushSync = function (h) {
      var m = f.T,
        g = o.p
      try {
        if (((f.T = null), (o.p = 2), h)) return h()
      } finally {
        ;((f.T = m), (o.p = g), o.d.f())
      }
    }),
    (Zt.preconnect = function (h, m) {
      typeof h == 'string' &&
        (m
          ? ((m = m.crossOrigin), (m = typeof m == 'string' ? (m === 'use-credentials' ? m : '') : void 0))
          : (m = null),
        o.d.C(h, m))
    }),
    (Zt.prefetchDNS = function (h) {
      typeof h == 'string' && o.d.D(h)
    }),
    (Zt.preinit = function (h, m) {
      if (typeof h == 'string' && m && typeof m.as == 'string') {
        var g = m.as,
          b = p(g, m.crossOrigin),
          C = typeof m.integrity == 'string' ? m.integrity : void 0,
          v = typeof m.fetchPriority == 'string' ? m.fetchPriority : void 0
        g === 'style'
          ? o.d.S(h, typeof m.precedence == 'string' ? m.precedence : void 0, {
              crossOrigin: b,
              integrity: C,
              fetchPriority: v,
            })
          : g === 'script' &&
            o.d.X(h, {
              crossOrigin: b,
              integrity: C,
              fetchPriority: v,
              nonce: typeof m.nonce == 'string' ? m.nonce : void 0,
            })
      }
    }),
    (Zt.preinitModule = function (h, m) {
      if (typeof h == 'string')
        if (typeof m == 'object' && m !== null) {
          if (m.as == null || m.as === 'script') {
            var g = p(m.as, m.crossOrigin)
            o.d.M(h, {
              crossOrigin: g,
              integrity: typeof m.integrity == 'string' ? m.integrity : void 0,
              nonce: typeof m.nonce == 'string' ? m.nonce : void 0,
            })
          }
        } else m == null && o.d.M(h)
    }),
    (Zt.preload = function (h, m) {
      if (typeof h == 'string' && typeof m == 'object' && m !== null && typeof m.as == 'string') {
        var g = m.as,
          b = p(g, m.crossOrigin)
        o.d.L(h, g, {
          crossOrigin: b,
          integrity: typeof m.integrity == 'string' ? m.integrity : void 0,
          nonce: typeof m.nonce == 'string' ? m.nonce : void 0,
          type: typeof m.type == 'string' ? m.type : void 0,
          fetchPriority: typeof m.fetchPriority == 'string' ? m.fetchPriority : void 0,
          referrerPolicy: typeof m.referrerPolicy == 'string' ? m.referrerPolicy : void 0,
          imageSrcSet: typeof m.imageSrcSet == 'string' ? m.imageSrcSet : void 0,
          imageSizes: typeof m.imageSizes == 'string' ? m.imageSizes : void 0,
          media: typeof m.media == 'string' ? m.media : void 0,
        })
      }
    }),
    (Zt.preloadModule = function (h, m) {
      if (typeof h == 'string')
        if (m) {
          var g = p(m.as, m.crossOrigin)
          o.d.m(h, {
            as: typeof m.as == 'string' && m.as !== 'script' ? m.as : void 0,
            crossOrigin: g,
            integrity: typeof m.integrity == 'string' ? m.integrity : void 0,
          })
        } else o.d.m(h)
    }),
    (Zt.requestFormReset = function (h) {
      o.d.r(h)
    }),
    (Zt.unstable_batchedUpdates = function (h, m) {
      return h(m)
    }),
    (Zt.useFormState = function (h, m, g) {
      return f.H.useFormState(h, m, g)
    }),
    (Zt.useFormStatus = function () {
      return f.H.useHostTransitionStatus()
    }),
    (Zt.version = '19.1.1'),
    Zt
  )
}
var Xy
function Pb() {
  if (Xy) return Od.exports
  Xy = 1
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t)
      } catch (r) {
        console.error(r)
      }
  }
  return (t(), (Od.exports = iR()), Od.exports)
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Qy
function sR() {
  if (Qy) return ri
  Qy = 1
  var t = lR(),
    r = bp(),
    l = Pb()
  function o(e) {
    var n = 'https://react.dev/errors/' + e
    if (1 < arguments.length) {
      n += '?args[]=' + encodeURIComponent(arguments[1])
      for (var a = 2; a < arguments.length; a++) n += '&args[]=' + encodeURIComponent(arguments[a])
    }
    return (
      'Minified React error #' +
      e +
      '; visit ' +
      n +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    )
  }
  function s(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11))
  }
  function u(e) {
    var n = e,
      a = e
    if (e.alternate) for (; n.return;) n = n.return
    else {
      e = n
      do ((n = e), (n.flags & 4098) !== 0 && (a = n.return), (e = n.return))
      while (e)
    }
    return n.tag === 3 ? a : null
  }
  function f(e) {
    if (e.tag === 13) {
      var n = e.memoizedState
      if ((n === null && ((e = e.alternate), e !== null && (n = e.memoizedState)), n !== null)) return n.dehydrated
    }
    return null
  }
  function p(e) {
    if (u(e) !== e) throw Error(o(188))
  }
  function h(e) {
    var n = e.alternate
    if (!n) {
      if (((n = u(e)), n === null)) throw Error(o(188))
      return n !== e ? null : e
    }
    for (var a = e, i = n; ;) {
      var c = a.return
      if (c === null) break
      var d = c.alternate
      if (d === null) {
        if (((i = c.return), i !== null)) {
          a = i
          continue
        }
        break
      }
      if (c.child === d.child) {
        for (d = c.child; d;) {
          if (d === a) return (p(c), e)
          if (d === i) return (p(c), n)
          d = d.sibling
        }
        throw Error(o(188))
      }
      if (a.return !== i.return) ((a = c), (i = d))
      else {
        for (var y = !1, E = c.child; E;) {
          if (E === a) {
            ;((y = !0), (a = c), (i = d))
            break
          }
          if (E === i) {
            ;((y = !0), (i = c), (a = d))
            break
          }
          E = E.sibling
        }
        if (!y) {
          for (E = d.child; E;) {
            if (E === a) {
              ;((y = !0), (a = d), (i = c))
              break
            }
            if (E === i) {
              ;((y = !0), (i = d), (a = c))
              break
            }
            E = E.sibling
          }
          if (!y) throw Error(o(189))
        }
      }
      if (a.alternate !== i) throw Error(o(190))
    }
    if (a.tag !== 3) throw Error(o(188))
    return a.stateNode.current === a ? e : n
  }
  function m(e) {
    var n = e.tag
    if (n === 5 || n === 26 || n === 27 || n === 6) return e
    for (e = e.child; e !== null;) {
      if (((n = m(e)), n !== null)) return n
      e = e.sibling
    }
    return null
  }
  var g = Object.assign,
    b = Symbol.for('react.element'),
    C = Symbol.for('react.transitional.element'),
    v = Symbol.for('react.portal'),
    w = Symbol.for('react.fragment'),
    R = Symbol.for('react.strict_mode'),
    T = Symbol.for('react.profiler'),
    A = Symbol.for('react.provider'),
    O = Symbol.for('react.consumer'),
    M = Symbol.for('react.context'),
    z = Symbol.for('react.forward_ref'),
    _ = Symbol.for('react.suspense'),
    k = Symbol.for('react.suspense_list'),
    V = Symbol.for('react.memo'),
    Q = Symbol.for('react.lazy'),
    oe = Symbol.for('react.activity'),
    ce = Symbol.for('react.memo_cache_sentinel'),
    Z = Symbol.iterator
  function x(e) {
    return e === null || typeof e != 'object'
      ? null
      : ((e = (Z && e[Z]) || e['@@iterator']), typeof e == 'function' ? e : null)
  }
  var G = Symbol.for('react.client.reference')
  function L(e) {
    if (e == null) return null
    if (typeof e == 'function') return e.$$typeof === G ? null : e.displayName || e.name || null
    if (typeof e == 'string') return e
    switch (e) {
      case w:
        return 'Fragment'
      case T:
        return 'Profiler'
      case R:
        return 'StrictMode'
      case _:
        return 'Suspense'
      case k:
        return 'SuspenseList'
      case oe:
        return 'Activity'
    }
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case v:
          return 'Portal'
        case M:
          return (e.displayName || 'Context') + '.Provider'
        case O:
          return (e._context.displayName || 'Context') + '.Consumer'
        case z:
          var n = e.render
          return (
            (e = e.displayName),
            e || ((e = n.displayName || n.name || ''), (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
            e
          )
        case V:
          return ((n = e.displayName || null), n !== null ? n : L(e.type) || 'Memo')
        case Q:
          ;((n = e._payload), (e = e._init))
          try {
            return L(e(n))
          } catch {}
      }
    return null
  }
  var U = Array.isArray,
    N = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    H = l.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    W = { pending: !1, data: null, method: null, action: null },
    ue = [],
    D = -1
  function I(e) {
    return { current: e }
  }
  function ee(e) {
    0 > D || ((e.current = ue[D]), (ue[D] = null), D--)
  }
  function te(e, n) {
    ;(D++, (ue[D] = e.current), (e.current = n))
  }
  var ie = I(null),
    pe = I(null),
    le = I(null),
    me = I(null)
  function fe(e, n) {
    switch ((te(le, n), te(pe, e), te(ie, null), n.nodeType)) {
      case 9:
      case 11:
        e = (e = n.documentElement) && (e = e.namespaceURI) ? gy(e) : 0
        break
      default:
        if (((e = n.tagName), (n = n.namespaceURI))) ((n = gy(n)), (e = yy(n, e)))
        else
          switch (e) {
            case 'svg':
              e = 1
              break
            case 'math':
              e = 2
              break
            default:
              e = 0
          }
    }
    ;(ee(ie), te(ie, e))
  }
  function Se() {
    ;(ee(ie), ee(pe), ee(le))
  }
  function Me(e) {
    e.memoizedState !== null && te(me, e)
    var n = ie.current,
      a = yy(n, e.type)
    n !== a && (te(pe, e), te(ie, a))
  }
  function Ye(e) {
    ;(pe.current === e && (ee(ie), ee(pe)), me.current === e && (ee(me), (Qo._currentValue = W)))
  }
  var Ne = Object.prototype.hasOwnProperty,
    ze = t.unstable_scheduleCallback,
    Ee = t.unstable_cancelCallback,
    Ve = t.unstable_shouldYield,
    ge = t.unstable_requestPaint,
    Te = t.unstable_now,
    gt = t.unstable_getCurrentPriorityLevel,
    He = t.unstable_ImmediatePriority,
    un = t.unstable_UserBlockingPriority,
    cn = t.unstable_NormalPriority,
    nn = t.unstable_LowPriority,
    qt = t.unstable_IdlePriority,
    ya = t.log,
    ur = t.unstable_setDisableYieldValue,
    Nt = null,
    je = null
  function ct(e) {
    if ((typeof ya == 'function' && ur(e), je && typeof je.setStrictMode == 'function'))
      try {
        je.setStrictMode(Nt, e)
      } catch {}
  }
  var xt = Math.clz32 ? Math.clz32 : kt,
    De = Math.log,
    It = Math.LN2
  function kt(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((De(e) / It) | 0)) | 0)
  }
  var Gn = 256,
    it = 4194304
  function cr(e) {
    var n = e & 42
    if (n !== 0) return n
    switch (e & -e) {
      case 1:
        return 1
      case 2:
        return 2
      case 4:
        return 4
      case 8:
        return 8
      case 16:
        return 16
      case 32:
        return 32
      case 64:
        return 64
      case 128:
        return 128
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194048
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560
      case 67108864:
        return 67108864
      case 134217728:
        return 134217728
      case 268435456:
        return 268435456
      case 536870912:
        return 536870912
      case 1073741824:
        return 0
      default:
        return e
    }
  }
  function Hr(e, n, a) {
    var i = e.pendingLanes
    if (i === 0) return 0
    var c = 0,
      d = e.suspendedLanes,
      y = e.pingedLanes
    e = e.warmLanes
    var E = i & 134217727
    return (
      E !== 0
        ? ((i = E & ~d),
          i !== 0 ? (c = cr(i)) : ((y &= E), y !== 0 ? (c = cr(y)) : a || ((a = E & ~e), a !== 0 && (c = cr(a)))))
        : ((E = i & ~d), E !== 0 ? (c = cr(E)) : y !== 0 ? (c = cr(y)) : a || ((a = i & ~e), a !== 0 && (c = cr(a)))),
      c === 0
        ? 0
        : n !== 0 &&
            n !== c &&
            (n & d) === 0 &&
            ((d = c & -c), (a = n & -n), d >= a || (d === 32 && (a & 4194048) !== 0))
          ? n
          : c
    )
  }
  function ba(e, n) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & n) === 0
  }
  function Ii(e, n) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return n + 250
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return n + 5e3
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1
      default:
        return -1
    }
  }
  function Fi() {
    var e = Gn
    return ((Gn <<= 1), (Gn & 4194048) === 0 && (Gn = 256), e)
  }
  function Yi() {
    var e = it
    return ((it <<= 1), (it & 62914560) === 0 && (it = 4194304), e)
  }
  function lo(e) {
    for (var n = [], a = 0; 31 > a; a++) n.push(e)
    return n
  }
  function va(e, n) {
    ;((e.pendingLanes |= n), n !== 268435456 && ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)))
  }
  function mc(e, n, a, i, c, d) {
    var y = e.pendingLanes
    ;((e.pendingLanes = a),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.warmLanes = 0),
      (e.expiredLanes &= a),
      (e.entangledLanes &= a),
      (e.errorRecoveryDisabledLanes &= a),
      (e.shellSuspendCounter = 0))
    var E = e.entanglements,
      B = e.expirationTimes,
      Y = e.hiddenUpdates
    for (a = y & ~a; 0 < a;) {
      var ne = 31 - xt(a),
        ae = 1 << ne
      ;((E[ne] = 0), (B[ne] = -1))
      var K = Y[ne]
      if (K !== null)
        for (Y[ne] = null, ne = 0; ne < K.length; ne++) {
          var X = K[ne]
          X !== null && (X.lane &= -536870913)
        }
      a &= ~ae
    }
    ;(i !== 0 && Vi(e, i, 0), d !== 0 && c === 0 && e.tag !== 0 && (e.suspendedLanes |= d & ~(y & ~n)))
  }
  function Vi(e, n, a) {
    ;((e.pendingLanes |= n), (e.suspendedLanes &= ~n))
    var i = 31 - xt(n)
    ;((e.entangledLanes |= n), (e.entanglements[i] = e.entanglements[i] | 1073741824 | (a & 4194090)))
  }
  function fr(e, n) {
    var a = (e.entangledLanes |= n)
    for (e = e.entanglements; a;) {
      var i = 31 - xt(a),
        c = 1 << i
      ;((c & n) | (e[i] & n) && (e[i] |= n), (a &= ~c))
    }
  }
  function Xa(e) {
    switch (e) {
      case 2:
        e = 1
        break
      case 8:
        e = 4
        break
      case 32:
        e = 16
        break
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128
        break
      case 268435456:
        e = 134217728
        break
      default:
        e = 0
    }
    return e
  }
  function Pr(e) {
    return ((e &= -e), 2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2)
  }
  function Sa() {
    var e = H.p
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : ky(e.type))
  }
  function Qa(e, n) {
    var a = H.p
    try {
      return ((H.p = e), n())
    } finally {
      H.p = a
    }
  }
  var Kn = Math.random().toString(36).slice(2),
    Dt = '__reactFiber$' + Kn,
    Lt = '__reactProps$' + Kn,
    qr = '__reactContainer$' + Kn,
    Xn = '__reactEvents$' + Kn,
    oo = '__reactListeners$' + Kn,
    dr = '__reactHandles$' + Kn,
    Gi = '__reactResources$' + Kn,
    xa = '__reactMarker$' + Kn
  function Za(e) {
    ;(delete e[Dt], delete e[Lt], delete e[Xn], delete e[oo], delete e[dr])
  }
  function Ir(e) {
    var n = e[Dt]
    if (n) return n
    for (var a = e.parentNode; a;) {
      if ((n = a[qr] || a[Dt])) {
        if (((a = n.alternate), n.child !== null || (a !== null && a.child !== null)))
          for (e = xy(e); e !== null;) {
            if ((a = e[Dt])) return a
            e = xy(e)
          }
        return n
      }
      ;((e = a), (a = e.parentNode))
    }
    return null
  }
  function pr(e) {
    if ((e = e[Dt] || e[qr])) {
      var n = e.tag
      if (n === 5 || n === 6 || n === 13 || n === 26 || n === 27 || n === 3) return e
    }
    return null
  }
  function Fr(e) {
    var n = e.tag
    if (n === 5 || n === 26 || n === 27 || n === 6) return e.stateNode
    throw Error(o(33))
  }
  function hr(e) {
    var n = e[Gi]
    return (n || (n = e[Gi] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), n)
  }
  function Rt(e) {
    e[xa] = !0
  }
  var se = new Set(),
    be = {}
  function we(e, n) {
    ;(Ge(e, n), Ge(e + 'Capture', n))
  }
  function Ge(e, n) {
    for (be[e] = n, e = 0; e < n.length; e++) se.add(n[e])
  }
  var Ft = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
    ),
    Ra = {},
    mr = {}
  function io(e) {
    return Ne.call(mr, e) ? !0 : Ne.call(Ra, e) ? !1 : Ft.test(e) ? (mr[e] = !0) : ((Ra[e] = !0), !1)
  }
  function Ea(e, n, a) {
    if (io(n))
      if (a === null) e.removeAttribute(n)
      else {
        switch (typeof a) {
          case 'undefined':
          case 'function':
          case 'symbol':
            e.removeAttribute(n)
            return
          case 'boolean':
            var i = n.toLowerCase().slice(0, 5)
            if (i !== 'data-' && i !== 'aria-') {
              e.removeAttribute(n)
              return
            }
        }
        e.setAttribute(n, '' + a)
      }
  }
  function Yr(e, n, a) {
    if (a === null) e.removeAttribute(n)
    else {
      switch (typeof a) {
        case 'undefined':
        case 'function':
        case 'symbol':
        case 'boolean':
          e.removeAttribute(n)
          return
      }
      e.setAttribute(n, '' + a)
    }
  }
  function gr(e, n, a, i) {
    if (i === null) e.removeAttribute(a)
    else {
      switch (typeof i) {
        case 'undefined':
        case 'function':
        case 'symbol':
        case 'boolean':
          e.removeAttribute(a)
          return
      }
      e.setAttributeNS(n, a, '' + i)
    }
  }
  var gc, uh
  function Wa(e) {
    if (gc === void 0)
      try {
        throw Error()
      } catch (a) {
        var n = a.stack.trim().match(/\n( *(at )?)/)
        ;((gc = (n && n[1]) || ''),
          (uh =
            -1 <
            a.stack.indexOf(`
    at`)
              ? ' (<anonymous>)'
              : -1 < a.stack.indexOf('@')
                ? '@unknown:0:0'
                : ''))
      }
    return (
      `
` +
      gc +
      e +
      uh
    )
  }
  var yc = !1
  function bc(e, n) {
    if (!e || yc) return ''
    yc = !0
    var a = Error.prepareStackTrace
    Error.prepareStackTrace = void 0
    try {
      var i = {
        DetermineComponentFrameRoot: function () {
          try {
            if (n) {
              var ae = function () {
                throw Error()
              }
              if (
                (Object.defineProperty(ae.prototype, 'props', {
                  set: function () {
                    throw Error()
                  },
                }),
                typeof Reflect == 'object' && Reflect.construct)
              ) {
                try {
                  Reflect.construct(ae, [])
                } catch (X) {
                  var K = X
                }
                Reflect.construct(e, [], ae)
              } else {
                try {
                  ae.call()
                } catch (X) {
                  K = X
                }
                e.call(ae.prototype)
              }
            } else {
              try {
                throw Error()
              } catch (X) {
                K = X
              }
              ;(ae = e()) && typeof ae.catch == 'function' && ae.catch(function () {})
            }
          } catch (X) {
            if (X && K && typeof X.stack == 'string') return [X.stack, K.stack]
          }
          return [null, null]
        },
      }
      i.DetermineComponentFrameRoot.displayName = 'DetermineComponentFrameRoot'
      var c = Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot, 'name')
      c &&
        c.configurable &&
        Object.defineProperty(i.DetermineComponentFrameRoot, 'name', { value: 'DetermineComponentFrameRoot' })
      var d = i.DetermineComponentFrameRoot(),
        y = d[0],
        E = d[1]
      if (y && E) {
        var B = y.split(`
`),
          Y = E.split(`
`)
        for (c = i = 0; i < B.length && !B[i].includes('DetermineComponentFrameRoot');) i++
        for (; c < Y.length && !Y[c].includes('DetermineComponentFrameRoot');) c++
        if (i === B.length || c === Y.length)
          for (i = B.length - 1, c = Y.length - 1; 1 <= i && 0 <= c && B[i] !== Y[c];) c--
        for (; 1 <= i && 0 <= c; i--, c--)
          if (B[i] !== Y[c]) {
            if (i !== 1 || c !== 1)
              do
                if ((i--, c--, 0 > c || B[i] !== Y[c])) {
                  var ne =
                    `
` + B[i].replace(' at new ', ' at ')
                  return (
                    e.displayName && ne.includes('<anonymous>') && (ne = ne.replace('<anonymous>', e.displayName)),
                    ne
                  )
                }
              while (1 <= i && 0 <= c)
            break
          }
      }
    } finally {
      ;((yc = !1), (Error.prepareStackTrace = a))
    }
    return (a = e ? e.displayName || e.name : '') ? Wa(a) : ''
  }
  function G1(e) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Wa(e.type)
      case 16:
        return Wa('Lazy')
      case 13:
        return Wa('Suspense')
      case 19:
        return Wa('SuspenseList')
      case 0:
      case 15:
        return bc(e.type, !1)
      case 11:
        return bc(e.type.render, !1)
      case 1:
        return bc(e.type, !0)
      case 31:
        return Wa('Activity')
      default:
        return ''
    }
  }
  function ch(e) {
    try {
      var n = ''
      do ((n += G1(e)), (e = e.return))
      while (e)
      return n
    } catch (a) {
      return (
        `
Error generating stack: ` +
        a.message +
        `
` +
        a.stack
      )
    }
  }
  function An(e) {
    switch (typeof e) {
      case 'bigint':
      case 'boolean':
      case 'number':
      case 'string':
      case 'undefined':
        return e
      case 'object':
        return e
      default:
        return ''
    }
  }
  function fh(e) {
    var n = e.type
    return (e = e.nodeName) && e.toLowerCase() === 'input' && (n === 'checkbox' || n === 'radio')
  }
  function K1(e) {
    var n = fh(e) ? 'checked' : 'value',
      a = Object.getOwnPropertyDescriptor(e.constructor.prototype, n),
      i = '' + e[n]
    if (!e.hasOwnProperty(n) && typeof a < 'u' && typeof a.get == 'function' && typeof a.set == 'function') {
      var c = a.get,
        d = a.set
      return (
        Object.defineProperty(e, n, {
          configurable: !0,
          get: function () {
            return c.call(this)
          },
          set: function (y) {
            ;((i = '' + y), d.call(this, y))
          },
        }),
        Object.defineProperty(e, n, { enumerable: a.enumerable }),
        {
          getValue: function () {
            return i
          },
          setValue: function (y) {
            i = '' + y
          },
          stopTracking: function () {
            ;((e._valueTracker = null), delete e[n])
          },
        }
      )
    }
  }
  function Ki(e) {
    e._valueTracker || (e._valueTracker = K1(e))
  }
  function dh(e) {
    if (!e) return !1
    var n = e._valueTracker
    if (!n) return !0
    var a = n.getValue(),
      i = ''
    return (e && (i = fh(e) ? (e.checked ? 'true' : 'false') : e.value), (e = i), e !== a ? (n.setValue(e), !0) : !1)
  }
  function Xi(e) {
    if (((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u')) return null
    try {
      return e.activeElement || e.body
    } catch {
      return e.body
    }
  }
  var X1 = /[\n"\\]/g
  function On(e) {
    return e.replace(X1, function (n) {
      return '\\' + n.charCodeAt(0).toString(16) + ' '
    })
  }
  function vc(e, n, a, i, c, d, y, E) {
    ;((e.name = ''),
      y != null && typeof y != 'function' && typeof y != 'symbol' && typeof y != 'boolean'
        ? (e.type = y)
        : e.removeAttribute('type'),
      n != null
        ? y === 'number'
          ? ((n === 0 && e.value === '') || e.value != n) && (e.value = '' + An(n))
          : e.value !== '' + An(n) && (e.value = '' + An(n))
        : (y !== 'submit' && y !== 'reset') || e.removeAttribute('value'),
      n != null ? Sc(e, y, An(n)) : a != null ? Sc(e, y, An(a)) : i != null && e.removeAttribute('value'),
      c == null && d != null && (e.defaultChecked = !!d),
      c != null && (e.checked = c && typeof c != 'function' && typeof c != 'symbol'),
      E != null && typeof E != 'function' && typeof E != 'symbol' && typeof E != 'boolean'
        ? (e.name = '' + An(E))
        : e.removeAttribute('name'))
  }
  function ph(e, n, a, i, c, d, y, E) {
    if (
      (d != null && typeof d != 'function' && typeof d != 'symbol' && typeof d != 'boolean' && (e.type = d),
      n != null || a != null)
    ) {
      if (!((d !== 'submit' && d !== 'reset') || n != null)) return
      ;((a = a != null ? '' + An(a) : ''),
        (n = n != null ? '' + An(n) : a),
        E || n === e.value || (e.value = n),
        (e.defaultValue = n))
    }
    ;((i = i ?? c),
      (i = typeof i != 'function' && typeof i != 'symbol' && !!i),
      (e.checked = E ? e.checked : !!i),
      (e.defaultChecked = !!i),
      y != null && typeof y != 'function' && typeof y != 'symbol' && typeof y != 'boolean' && (e.name = y))
  }
  function Sc(e, n, a) {
    ;(n === 'number' && Xi(e.ownerDocument) === e) || e.defaultValue === '' + a || (e.defaultValue = '' + a)
  }
  function Ja(e, n, a, i) {
    if (((e = e.options), n)) {
      n = {}
      for (var c = 0; c < a.length; c++) n['$' + a[c]] = !0
      for (a = 0; a < e.length; a++)
        ((c = n.hasOwnProperty('$' + e[a].value)),
          e[a].selected !== c && (e[a].selected = c),
          c && i && (e[a].defaultSelected = !0))
    } else {
      for (a = '' + An(a), n = null, c = 0; c < e.length; c++) {
        if (e[c].value === a) {
          ;((e[c].selected = !0), i && (e[c].defaultSelected = !0))
          return
        }
        n !== null || e[c].disabled || (n = e[c])
      }
      n !== null && (n.selected = !0)
    }
  }
  function hh(e, n, a) {
    if (n != null && ((n = '' + An(n)), n !== e.value && (e.value = n), a == null)) {
      e.defaultValue !== n && (e.defaultValue = n)
      return
    }
    e.defaultValue = a != null ? '' + An(a) : ''
  }
  function mh(e, n, a, i) {
    if (n == null) {
      if (i != null) {
        if (a != null) throw Error(o(92))
        if (U(i)) {
          if (1 < i.length) throw Error(o(93))
          i = i[0]
        }
        a = i
      }
      ;(a == null && (a = ''), (n = a))
    }
    ;((a = An(n)), (e.defaultValue = a), (i = e.textContent), i === a && i !== '' && i !== null && (e.value = i))
  }
  function el(e, n) {
    if (n) {
      var a = e.firstChild
      if (a && a === e.lastChild && a.nodeType === 3) {
        a.nodeValue = n
        return
      }
    }
    e.textContent = n
  }
  var Q1 = new Set(
    'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
      ' '
    )
  )
  function gh(e, n, a) {
    var i = n.indexOf('--') === 0
    a == null || typeof a == 'boolean' || a === ''
      ? i
        ? e.setProperty(n, '')
        : n === 'float'
          ? (e.cssFloat = '')
          : (e[n] = '')
      : i
        ? e.setProperty(n, a)
        : typeof a != 'number' || a === 0 || Q1.has(n)
          ? n === 'float'
            ? (e.cssFloat = a)
            : (e[n] = ('' + a).trim())
          : (e[n] = a + 'px')
  }
  function yh(e, n, a) {
    if (n != null && typeof n != 'object') throw Error(o(62))
    if (((e = e.style), a != null)) {
      for (var i in a)
        !a.hasOwnProperty(i) ||
          (n != null && n.hasOwnProperty(i)) ||
          (i.indexOf('--') === 0 ? e.setProperty(i, '') : i === 'float' ? (e.cssFloat = '') : (e[i] = ''))
      for (var c in n) ((i = n[c]), n.hasOwnProperty(c) && a[c] !== i && gh(e, c, i))
    } else for (var d in n) n.hasOwnProperty(d) && gh(e, d, n[d])
  }
  function xc(e) {
    if (e.indexOf('-') === -1) return !1
    switch (e) {
      case 'annotation-xml':
      case 'color-profile':
      case 'font-face':
      case 'font-face-src':
      case 'font-face-uri':
      case 'font-face-format':
      case 'font-face-name':
      case 'missing-glyph':
        return !1
      default:
        return !0
    }
  }
  var Z1 = new Map([
      ['acceptCharset', 'accept-charset'],
      ['htmlFor', 'for'],
      ['httpEquiv', 'http-equiv'],
      ['crossOrigin', 'crossorigin'],
      ['accentHeight', 'accent-height'],
      ['alignmentBaseline', 'alignment-baseline'],
      ['arabicForm', 'arabic-form'],
      ['baselineShift', 'baseline-shift'],
      ['capHeight', 'cap-height'],
      ['clipPath', 'clip-path'],
      ['clipRule', 'clip-rule'],
      ['colorInterpolation', 'color-interpolation'],
      ['colorInterpolationFilters', 'color-interpolation-filters'],
      ['colorProfile', 'color-profile'],
      ['colorRendering', 'color-rendering'],
      ['dominantBaseline', 'dominant-baseline'],
      ['enableBackground', 'enable-background'],
      ['fillOpacity', 'fill-opacity'],
      ['fillRule', 'fill-rule'],
      ['floodColor', 'flood-color'],
      ['floodOpacity', 'flood-opacity'],
      ['fontFamily', 'font-family'],
      ['fontSize', 'font-size'],
      ['fontSizeAdjust', 'font-size-adjust'],
      ['fontStretch', 'font-stretch'],
      ['fontStyle', 'font-style'],
      ['fontVariant', 'font-variant'],
      ['fontWeight', 'font-weight'],
      ['glyphName', 'glyph-name'],
      ['glyphOrientationHorizontal', 'glyph-orientation-horizontal'],
      ['glyphOrientationVertical', 'glyph-orientation-vertical'],
      ['horizAdvX', 'horiz-adv-x'],
      ['horizOriginX', 'horiz-origin-x'],
      ['imageRendering', 'image-rendering'],
      ['letterSpacing', 'letter-spacing'],
      ['lightingColor', 'lighting-color'],
      ['markerEnd', 'marker-end'],
      ['markerMid', 'marker-mid'],
      ['markerStart', 'marker-start'],
      ['overlinePosition', 'overline-position'],
      ['overlineThickness', 'overline-thickness'],
      ['paintOrder', 'paint-order'],
      ['panose-1', 'panose-1'],
      ['pointerEvents', 'pointer-events'],
      ['renderingIntent', 'rendering-intent'],
      ['shapeRendering', 'shape-rendering'],
      ['stopColor', 'stop-color'],
      ['stopOpacity', 'stop-opacity'],
      ['strikethroughPosition', 'strikethrough-position'],
      ['strikethroughThickness', 'strikethrough-thickness'],
      ['strokeDasharray', 'stroke-dasharray'],
      ['strokeDashoffset', 'stroke-dashoffset'],
      ['strokeLinecap', 'stroke-linecap'],
      ['strokeLinejoin', 'stroke-linejoin'],
      ['strokeMiterlimit', 'stroke-miterlimit'],
      ['strokeOpacity', 'stroke-opacity'],
      ['strokeWidth', 'stroke-width'],
      ['textAnchor', 'text-anchor'],
      ['textDecoration', 'text-decoration'],
      ['textRendering', 'text-rendering'],
      ['transformOrigin', 'transform-origin'],
      ['underlinePosition', 'underline-position'],
      ['underlineThickness', 'underline-thickness'],
      ['unicodeBidi', 'unicode-bidi'],
      ['unicodeRange', 'unicode-range'],
      ['unitsPerEm', 'units-per-em'],
      ['vAlphabetic', 'v-alphabetic'],
      ['vHanging', 'v-hanging'],
      ['vIdeographic', 'v-ideographic'],
      ['vMathematical', 'v-mathematical'],
      ['vectorEffect', 'vector-effect'],
      ['vertAdvY', 'vert-adv-y'],
      ['vertOriginX', 'vert-origin-x'],
      ['vertOriginY', 'vert-origin-y'],
      ['wordSpacing', 'word-spacing'],
      ['writingMode', 'writing-mode'],
      ['xmlnsXlink', 'xmlns:xlink'],
      ['xHeight', 'x-height'],
    ]),
    W1 =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i
  function Qi(e) {
    return W1.test('' + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e
  }
  var Rc = null
  function Ec(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    )
  }
  var tl = null,
    nl = null
  function bh(e) {
    var n = pr(e)
    if (n && (e = n.stateNode)) {
      var a = e[Lt] || null
      e: switch (((e = n.stateNode), n.type)) {
        case 'input':
          if (
            (vc(e, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name),
            (n = a.name),
            a.type === 'radio' && n != null)
          ) {
            for (a = e; a.parentNode;) a = a.parentNode
            for (a = a.querySelectorAll('input[name="' + On('' + n) + '"][type="radio"]'), n = 0; n < a.length; n++) {
              var i = a[n]
              if (i !== e && i.form === e.form) {
                var c = i[Lt] || null
                if (!c) throw Error(o(90))
                vc(i, c.value, c.defaultValue, c.defaultValue, c.checked, c.defaultChecked, c.type, c.name)
              }
            }
            for (n = 0; n < a.length; n++) ((i = a[n]), i.form === e.form && dh(i))
          }
          break e
        case 'textarea':
          hh(e, a.value, a.defaultValue)
          break e
        case 'select':
          ;((n = a.value), n != null && Ja(e, !!a.multiple, n, !1))
      }
    }
  }
  var Tc = !1
  function vh(e, n, a) {
    if (Tc) return e(n, a)
    Tc = !0
    try {
      var i = e(n)
      return i
    } finally {
      if (((Tc = !1), (tl !== null || nl !== null) && (Us(), tl && ((n = tl), (e = nl), (nl = tl = null), bh(n), e))))
        for (n = 0; n < e.length; n++) bh(e[n])
    }
  }
  function so(e, n) {
    var a = e.stateNode
    if (a === null) return null
    var i = a[Lt] || null
    if (i === null) return null
    a = i[n]
    e: switch (n) {
      case 'onClick':
      case 'onClickCapture':
      case 'onDoubleClick':
      case 'onDoubleClickCapture':
      case 'onMouseDown':
      case 'onMouseDownCapture':
      case 'onMouseMove':
      case 'onMouseMoveCapture':
      case 'onMouseUp':
      case 'onMouseUpCapture':
      case 'onMouseEnter':
        ;((i = !i.disabled) ||
          ((e = e.type), (i = !(e === 'button' || e === 'input' || e === 'select' || e === 'textarea'))),
          (e = !i))
        break e
      default:
        e = !1
    }
    if (e) return null
    if (a && typeof a != 'function') throw Error(o(231, n, typeof a))
    return a
  }
  var yr = !(typeof window > 'u' || typeof window.document > 'u' || typeof window.document.createElement > 'u'),
    Cc = !1
  if (yr)
    try {
      var uo = {}
      ;(Object.defineProperty(uo, 'passive', {
        get: function () {
          Cc = !0
        },
      }),
        window.addEventListener('test', uo, uo),
        window.removeEventListener('test', uo, uo))
    } catch {
      Cc = !1
    }
  var Vr = null,
    wc = null,
    Zi = null
  function Sh() {
    if (Zi) return Zi
    var e,
      n = wc,
      a = n.length,
      i,
      c = 'value' in Vr ? Vr.value : Vr.textContent,
      d = c.length
    for (e = 0; e < a && n[e] === c[e]; e++);
    var y = a - e
    for (i = 1; i <= y && n[a - i] === c[d - i]; i++);
    return (Zi = c.slice(e, 1 < i ? 1 - i : void 0))
  }
  function Wi(e) {
    var n = e.keyCode
    return (
      'charCode' in e ? ((e = e.charCode), e === 0 && n === 13 && (e = 13)) : (e = n),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    )
  }
  function Ji() {
    return !0
  }
  function xh() {
    return !1
  }
  function fn(e) {
    function n(a, i, c, d, y) {
      ;((this._reactName = a),
        (this._targetInst = c),
        (this.type = i),
        (this.nativeEvent = d),
        (this.target = y),
        (this.currentTarget = null))
      for (var E in e) e.hasOwnProperty(E) && ((a = e[E]), (this[E] = a ? a(d) : d[E]))
      return (
        (this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1) ? Ji : xh),
        (this.isPropagationStopped = xh),
        this
      )
    }
    return (
      g(n.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0
          var a = this.nativeEvent
          a &&
            (a.preventDefault ? a.preventDefault() : typeof a.returnValue != 'unknown' && (a.returnValue = !1),
            (this.isDefaultPrevented = Ji))
        },
        stopPropagation: function () {
          var a = this.nativeEvent
          a &&
            (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != 'unknown' && (a.cancelBubble = !0),
            (this.isPropagationStopped = Ji))
        },
        persist: function () {},
        isPersistent: Ji,
      }),
      n
    )
  }
  var Ta = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now()
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    es = fn(Ta),
    co = g({}, Ta, { view: 0, detail: 0 }),
    J1 = fn(co),
    Ac,
    Oc,
    fo,
    ts = g({}, co, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: _c,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget
      },
      movementX: function (e) {
        return 'movementX' in e
          ? e.movementX
          : (e !== fo &&
              (fo && e.type === 'mousemove'
                ? ((Ac = e.screenX - fo.screenX), (Oc = e.screenY - fo.screenY))
                : (Oc = Ac = 0),
              (fo = e)),
            Ac)
      },
      movementY: function (e) {
        return 'movementY' in e ? e.movementY : Oc
      },
    }),
    Rh = fn(ts),
    eS = g({}, ts, { dataTransfer: 0 }),
    tS = fn(eS),
    nS = g({}, co, { relatedTarget: 0 }),
    Mc = fn(nS),
    rS = g({}, Ta, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    aS = fn(rS),
    lS = g({}, Ta, {
      clipboardData: function (e) {
        return 'clipboardData' in e ? e.clipboardData : window.clipboardData
      },
    }),
    oS = fn(lS),
    iS = g({}, Ta, { data: 0 }),
    Eh = fn(iS),
    sS = {
      Esc: 'Escape',
      Spacebar: ' ',
      Left: 'ArrowLeft',
      Up: 'ArrowUp',
      Right: 'ArrowRight',
      Down: 'ArrowDown',
      Del: 'Delete',
      Win: 'OS',
      Menu: 'ContextMenu',
      Apps: 'ContextMenu',
      Scroll: 'ScrollLock',
      MozPrintableKey: 'Unidentified',
    },
    uS = {
      8: 'Backspace',
      9: 'Tab',
      12: 'Clear',
      13: 'Enter',
      16: 'Shift',
      17: 'Control',
      18: 'Alt',
      19: 'Pause',
      20: 'CapsLock',
      27: 'Escape',
      32: ' ',
      33: 'PageUp',
      34: 'PageDown',
      35: 'End',
      36: 'Home',
      37: 'ArrowLeft',
      38: 'ArrowUp',
      39: 'ArrowRight',
      40: 'ArrowDown',
      45: 'Insert',
      46: 'Delete',
      112: 'F1',
      113: 'F2',
      114: 'F3',
      115: 'F4',
      116: 'F5',
      117: 'F6',
      118: 'F7',
      119: 'F8',
      120: 'F9',
      121: 'F10',
      122: 'F11',
      123: 'F12',
      144: 'NumLock',
      145: 'ScrollLock',
      224: 'Meta',
    },
    cS = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' }
  function fS(e) {
    var n = this.nativeEvent
    return n.getModifierState ? n.getModifierState(e) : (e = cS[e]) ? !!n[e] : !1
  }
  function _c() {
    return fS
  }
  var dS = g({}, co, {
      key: function (e) {
        if (e.key) {
          var n = sS[e.key] || e.key
          if (n !== 'Unidentified') return n
        }
        return e.type === 'keypress'
          ? ((e = Wi(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
          : e.type === 'keydown' || e.type === 'keyup'
            ? uS[e.keyCode] || 'Unidentified'
            : ''
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: _c,
      charCode: function (e) {
        return e.type === 'keypress' ? Wi(e) : 0
      },
      keyCode: function (e) {
        return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0
      },
      which: function (e) {
        return e.type === 'keypress' ? Wi(e) : e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0
      },
    }),
    pS = fn(dS),
    hS = g({}, ts, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    Th = fn(hS),
    mS = g({}, co, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: _c,
    }),
    gS = fn(mS),
    yS = g({}, Ta, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    bS = fn(yS),
    vS = g({}, ts, {
      deltaX: function (e) {
        return 'deltaX' in e ? e.deltaX : 'wheelDeltaX' in e ? -e.wheelDeltaX : 0
      },
      deltaY: function (e) {
        return 'deltaY' in e ? e.deltaY : 'wheelDeltaY' in e ? -e.wheelDeltaY : 'wheelDelta' in e ? -e.wheelDelta : 0
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    SS = fn(vS),
    xS = g({}, Ta, { newState: 0, oldState: 0 }),
    RS = fn(xS),
    ES = [9, 13, 27, 32],
    Nc = yr && 'CompositionEvent' in window,
    po = null
  yr && 'documentMode' in document && (po = document.documentMode)
  var TS = yr && 'TextEvent' in window && !po,
    Ch = yr && (!Nc || (po && 8 < po && 11 >= po)),
    wh = ' ',
    Ah = !1
  function Oh(e, n) {
    switch (e) {
      case 'keyup':
        return ES.indexOf(n.keyCode) !== -1
      case 'keydown':
        return n.keyCode !== 229
      case 'keypress':
      case 'mousedown':
      case 'focusout':
        return !0
      default:
        return !1
    }
  }
  function Mh(e) {
    return ((e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null)
  }
  var rl = !1
  function CS(e, n) {
    switch (e) {
      case 'compositionend':
        return Mh(n)
      case 'keypress':
        return n.which !== 32 ? null : ((Ah = !0), wh)
      case 'textInput':
        return ((e = n.data), e === wh && Ah ? null : e)
      default:
        return null
    }
  }
  function wS(e, n) {
    if (rl)
      return e === 'compositionend' || (!Nc && Oh(e, n)) ? ((e = Sh()), (Zi = wc = Vr = null), (rl = !1), e) : null
    switch (e) {
      case 'paste':
        return null
      case 'keypress':
        if (!(n.ctrlKey || n.altKey || n.metaKey) || (n.ctrlKey && n.altKey)) {
          if (n.char && 1 < n.char.length) return n.char
          if (n.which) return String.fromCharCode(n.which)
        }
        return null
      case 'compositionend':
        return Ch && n.locale !== 'ko' ? null : n.data
      default:
        return null
    }
  }
  var AS = {
    color: !0,
    date: !0,
    datetime: !0,
    'datetime-local': !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  }
  function _h(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase()
    return n === 'input' ? !!AS[e.type] : n === 'textarea'
  }
  function Nh(e, n, a, i) {
    ;(tl ? (nl ? nl.push(i) : (nl = [i])) : (tl = i),
      (n = Ps(n, 'onChange')),
      0 < n.length && ((a = new es('onChange', 'change', null, a, i)), e.push({ event: a, listeners: n })))
  }
  var ho = null,
    mo = null
  function OS(e) {
    fy(e, 0)
  }
  function ns(e) {
    var n = Fr(e)
    if (dh(n)) return e
  }
  function Dh(e, n) {
    if (e === 'change') return n
  }
  var Bh = !1
  if (yr) {
    var Dc
    if (yr) {
      var Bc = 'oninput' in document
      if (!Bc) {
        var zh = document.createElement('div')
        ;(zh.setAttribute('oninput', 'return;'), (Bc = typeof zh.oninput == 'function'))
      }
      Dc = Bc
    } else Dc = !1
    Bh = Dc && (!document.documentMode || 9 < document.documentMode)
  }
  function Uh() {
    ho && (ho.detachEvent('onpropertychange', kh), (mo = ho = null))
  }
  function kh(e) {
    if (e.propertyName === 'value' && ns(mo)) {
      var n = []
      ;(Nh(n, mo, e, Ec(e)), vh(OS, n))
    }
  }
  function MS(e, n, a) {
    e === 'focusin' ? (Uh(), (ho = n), (mo = a), ho.attachEvent('onpropertychange', kh)) : e === 'focusout' && Uh()
  }
  function _S(e) {
    if (e === 'selectionchange' || e === 'keyup' || e === 'keydown') return ns(mo)
  }
  function NS(e, n) {
    if (e === 'click') return ns(n)
  }
  function DS(e, n) {
    if (e === 'input' || e === 'change') return ns(n)
  }
  function BS(e, n) {
    return (e === n && (e !== 0 || 1 / e === 1 / n)) || (e !== e && n !== n)
  }
  var yn = typeof Object.is == 'function' ? Object.is : BS
  function go(e, n) {
    if (yn(e, n)) return !0
    if (typeof e != 'object' || e === null || typeof n != 'object' || n === null) return !1
    var a = Object.keys(e),
      i = Object.keys(n)
    if (a.length !== i.length) return !1
    for (i = 0; i < a.length; i++) {
      var c = a[i]
      if (!Ne.call(n, c) || !yn(e[c], n[c])) return !1
    }
    return !0
  }
  function Lh(e) {
    for (; e && e.firstChild;) e = e.firstChild
    return e
  }
  function jh(e, n) {
    var a = Lh(e)
    e = 0
    for (var i; a;) {
      if (a.nodeType === 3) {
        if (((i = e + a.textContent.length), e <= n && i >= n)) return { node: a, offset: n - e }
        e = i
      }
      e: {
        for (; a;) {
          if (a.nextSibling) {
            a = a.nextSibling
            break e
          }
          a = a.parentNode
        }
        a = void 0
      }
      a = Lh(a)
    }
  }
  function $h(e, n) {
    return e && n
      ? e === n
        ? !0
        : e && e.nodeType === 3
          ? !1
          : n && n.nodeType === 3
            ? $h(e, n.parentNode)
            : 'contains' in e
              ? e.contains(n)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(n) & 16)
                : !1
      : !1
  }
  function Hh(e) {
    e =
      e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window
    for (var n = Xi(e.document); n instanceof e.HTMLIFrameElement;) {
      try {
        var a = typeof n.contentWindow.location.href == 'string'
      } catch {
        a = !1
      }
      if (a) e = n.contentWindow
      else break
      n = Xi(e.document)
    }
    return n
  }
  function zc(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase()
    return (
      n &&
      ((n === 'input' &&
        (e.type === 'text' || e.type === 'search' || e.type === 'tel' || e.type === 'url' || e.type === 'password')) ||
        n === 'textarea' ||
        e.contentEditable === 'true')
    )
  }
  var zS = yr && 'documentMode' in document && 11 >= document.documentMode,
    al = null,
    Uc = null,
    yo = null,
    kc = !1
  function Ph(e, n, a) {
    var i = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument
    kc ||
      al == null ||
      al !== Xi(i) ||
      ((i = al),
      'selectionStart' in i && zc(i)
        ? (i = { start: i.selectionStart, end: i.selectionEnd })
        : ((i = ((i.ownerDocument && i.ownerDocument.defaultView) || window).getSelection()),
          (i = {
            anchorNode: i.anchorNode,
            anchorOffset: i.anchorOffset,
            focusNode: i.focusNode,
            focusOffset: i.focusOffset,
          })),
      (yo && go(yo, i)) ||
        ((yo = i),
        (i = Ps(Uc, 'onSelect')),
        0 < i.length &&
          ((n = new es('onSelect', 'select', null, n, a)), e.push({ event: n, listeners: i }), (n.target = al))))
  }
  function Ca(e, n) {
    var a = {}
    return ((a[e.toLowerCase()] = n.toLowerCase()), (a['Webkit' + e] = 'webkit' + n), (a['Moz' + e] = 'moz' + n), a)
  }
  var ll = {
      animationend: Ca('Animation', 'AnimationEnd'),
      animationiteration: Ca('Animation', 'AnimationIteration'),
      animationstart: Ca('Animation', 'AnimationStart'),
      transitionrun: Ca('Transition', 'TransitionRun'),
      transitionstart: Ca('Transition', 'TransitionStart'),
      transitioncancel: Ca('Transition', 'TransitionCancel'),
      transitionend: Ca('Transition', 'TransitionEnd'),
    },
    Lc = {},
    qh = {}
  yr &&
    ((qh = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete ll.animationend.animation, delete ll.animationiteration.animation, delete ll.animationstart.animation),
    'TransitionEvent' in window || delete ll.transitionend.transition)
  function wa(e) {
    if (Lc[e]) return Lc[e]
    if (!ll[e]) return e
    var n = ll[e],
      a
    for (a in n) if (n.hasOwnProperty(a) && a in qh) return (Lc[e] = n[a])
    return e
  }
  var Ih = wa('animationend'),
    Fh = wa('animationiteration'),
    Yh = wa('animationstart'),
    US = wa('transitionrun'),
    kS = wa('transitionstart'),
    LS = wa('transitioncancel'),
    Vh = wa('transitionend'),
    Gh = new Map(),
    jc =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      )
  jc.push('scrollEnd')
  function Hn(e, n) {
    ;(Gh.set(e, n), we(n, [e]))
  }
  var Kh = new WeakMap()
  function Mn(e, n) {
    if (typeof e == 'object' && e !== null) {
      var a = Kh.get(e)
      return a !== void 0 ? a : ((n = { value: e, source: n, stack: ch(n) }), Kh.set(e, n), n)
    }
    return { value: e, source: n, stack: ch(n) }
  }
  var _n = [],
    ol = 0,
    $c = 0
  function rs() {
    for (var e = ol, n = ($c = ol = 0); n < e;) {
      var a = _n[n]
      _n[n++] = null
      var i = _n[n]
      _n[n++] = null
      var c = _n[n]
      _n[n++] = null
      var d = _n[n]
      if (((_n[n++] = null), i !== null && c !== null)) {
        var y = i.pending
        ;(y === null ? (c.next = c) : ((c.next = y.next), (y.next = c)), (i.pending = c))
      }
      d !== 0 && Xh(a, c, d)
    }
  }
  function as(e, n, a, i) {
    ;((_n[ol++] = e),
      (_n[ol++] = n),
      (_n[ol++] = a),
      (_n[ol++] = i),
      ($c |= i),
      (e.lanes |= i),
      (e = e.alternate),
      e !== null && (e.lanes |= i))
  }
  function Hc(e, n, a, i) {
    return (as(e, n, a, i), ls(e))
  }
  function il(e, n) {
    return (as(e, null, null, n), ls(e))
  }
  function Xh(e, n, a) {
    e.lanes |= a
    var i = e.alternate
    i !== null && (i.lanes |= a)
    for (var c = !1, d = e.return; d !== null;)
      ((d.childLanes |= a),
        (i = d.alternate),
        i !== null && (i.childLanes |= a),
        d.tag === 22 && ((e = d.stateNode), e === null || e._visibility & 1 || (c = !0)),
        (e = d),
        (d = d.return))
    return e.tag === 3
      ? ((d = e.stateNode),
        c &&
          n !== null &&
          ((c = 31 - xt(a)),
          (e = d.hiddenUpdates),
          (i = e[c]),
          i === null ? (e[c] = [n]) : i.push(n),
          (n.lane = a | 536870912)),
        d)
      : null
  }
  function ls(e) {
    if (50 < qo) throw ((qo = 0), (Gf = null), Error(o(185)))
    for (var n = e.return; n !== null;) ((e = n), (n = e.return))
    return e.tag === 3 ? e.stateNode : null
  }
  var sl = {}
  function jS(e, n, a, i) {
    ;((this.tag = e),
      (this.key = a),
      (this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = n),
      (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
      (this.mode = i),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null))
  }
  function bn(e, n, a, i) {
    return new jS(e, n, a, i)
  }
  function Pc(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent))
  }
  function br(e, n) {
    var a = e.alternate
    return (
      a === null
        ? ((a = bn(e.tag, n, e.key, e.mode)),
          (a.elementType = e.elementType),
          (a.type = e.type),
          (a.stateNode = e.stateNode),
          (a.alternate = e),
          (e.alternate = a))
        : ((a.pendingProps = n), (a.type = e.type), (a.flags = 0), (a.subtreeFlags = 0), (a.deletions = null)),
      (a.flags = e.flags & 65011712),
      (a.childLanes = e.childLanes),
      (a.lanes = e.lanes),
      (a.child = e.child),
      (a.memoizedProps = e.memoizedProps),
      (a.memoizedState = e.memoizedState),
      (a.updateQueue = e.updateQueue),
      (n = e.dependencies),
      (a.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }),
      (a.sibling = e.sibling),
      (a.index = e.index),
      (a.ref = e.ref),
      (a.refCleanup = e.refCleanup),
      a
    )
  }
  function Qh(e, n) {
    e.flags &= 65011714
    var a = e.alternate
    return (
      a === null
        ? ((e.childLanes = 0),
          (e.lanes = n),
          (e.child = null),
          (e.subtreeFlags = 0),
          (e.memoizedProps = null),
          (e.memoizedState = null),
          (e.updateQueue = null),
          (e.dependencies = null),
          (e.stateNode = null))
        : ((e.childLanes = a.childLanes),
          (e.lanes = a.lanes),
          (e.child = a.child),
          (e.subtreeFlags = 0),
          (e.deletions = null),
          (e.memoizedProps = a.memoizedProps),
          (e.memoizedState = a.memoizedState),
          (e.updateQueue = a.updateQueue),
          (e.type = a.type),
          (n = a.dependencies),
          (e.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext })),
      e
    )
  }
  function os(e, n, a, i, c, d) {
    var y = 0
    if (((i = e), typeof e == 'function')) Pc(e) && (y = 1)
    else if (typeof e == 'string') y = Hx(e, a, ie.current) ? 26 : e === 'html' || e === 'head' || e === 'body' ? 27 : 5
    else
      e: switch (e) {
        case oe:
          return ((e = bn(31, a, n, c)), (e.elementType = oe), (e.lanes = d), e)
        case w:
          return Aa(a.children, c, d, n)
        case R:
          ;((y = 8), (c |= 24))
          break
        case T:
          return ((e = bn(12, a, n, c | 2)), (e.elementType = T), (e.lanes = d), e)
        case _:
          return ((e = bn(13, a, n, c)), (e.elementType = _), (e.lanes = d), e)
        case k:
          return ((e = bn(19, a, n, c)), (e.elementType = k), (e.lanes = d), e)
        default:
          if (typeof e == 'object' && e !== null)
            switch (e.$$typeof) {
              case A:
              case M:
                y = 10
                break e
              case O:
                y = 9
                break e
              case z:
                y = 11
                break e
              case V:
                y = 14
                break e
              case Q:
                ;((y = 16), (i = null))
                break e
            }
          ;((y = 29), (a = Error(o(130, e === null ? 'null' : typeof e, ''))), (i = null))
      }
    return ((n = bn(y, a, n, c)), (n.elementType = e), (n.type = i), (n.lanes = d), n)
  }
  function Aa(e, n, a, i) {
    return ((e = bn(7, e, i, n)), (e.lanes = a), e)
  }
  function qc(e, n, a) {
    return ((e = bn(6, e, null, n)), (e.lanes = a), e)
  }
  function Ic(e, n, a) {
    return (
      (n = bn(4, e.children !== null ? e.children : [], e.key, n)),
      (n.lanes = a),
      (n.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }),
      n
    )
  }
  var ul = [],
    cl = 0,
    is = null,
    ss = 0,
    Nn = [],
    Dn = 0,
    Oa = null,
    vr = 1,
    Sr = ''
  function Ma(e, n) {
    ;((ul[cl++] = ss), (ul[cl++] = is), (is = e), (ss = n))
  }
  function Zh(e, n, a) {
    ;((Nn[Dn++] = vr), (Nn[Dn++] = Sr), (Nn[Dn++] = Oa), (Oa = e))
    var i = vr
    e = Sr
    var c = 32 - xt(i) - 1
    ;((i &= ~(1 << c)), (a += 1))
    var d = 32 - xt(n) + c
    if (30 < d) {
      var y = c - (c % 5)
      ;((d = (i & ((1 << y) - 1)).toString(32)),
        (i >>= y),
        (c -= y),
        (vr = (1 << (32 - xt(n) + c)) | (a << c) | i),
        (Sr = d + e))
    } else ((vr = (1 << d) | (a << c) | i), (Sr = e))
  }
  function Fc(e) {
    e.return !== null && (Ma(e, 1), Zh(e, 1, 0))
  }
  function Yc(e) {
    for (; e === is;) ((is = ul[--cl]), (ul[cl] = null), (ss = ul[--cl]), (ul[cl] = null))
    for (; e === Oa;)
      ((Oa = Nn[--Dn]), (Nn[Dn] = null), (Sr = Nn[--Dn]), (Nn[Dn] = null), (vr = Nn[--Dn]), (Nn[Dn] = null))
  }
  var rn = null,
    bt = null,
    qe = !1,
    _a = null,
    Qn = !1,
    Vc = Error(o(519))
  function Na(e) {
    var n = Error(o(418, ''))
    throw (So(Mn(n, e)), Vc)
  }
  function Wh(e) {
    var n = e.stateNode,
      a = e.type,
      i = e.memoizedProps
    switch (((n[Dt] = e), (n[Lt] = i), a)) {
      case 'dialog':
        ;(Le('cancel', n), Le('close', n))
        break
      case 'iframe':
      case 'object':
      case 'embed':
        Le('load', n)
        break
      case 'video':
      case 'audio':
        for (a = 0; a < Fo.length; a++) Le(Fo[a], n)
        break
      case 'source':
        Le('error', n)
        break
      case 'img':
      case 'image':
      case 'link':
        ;(Le('error', n), Le('load', n))
        break
      case 'details':
        Le('toggle', n)
        break
      case 'input':
        ;(Le('invalid', n), ph(n, i.value, i.defaultValue, i.checked, i.defaultChecked, i.type, i.name, !0), Ki(n))
        break
      case 'select':
        Le('invalid', n)
        break
      case 'textarea':
        ;(Le('invalid', n), mh(n, i.value, i.defaultValue, i.children), Ki(n))
    }
    ;((a = i.children),
      (typeof a != 'string' && typeof a != 'number' && typeof a != 'bigint') ||
      n.textContent === '' + a ||
      i.suppressHydrationWarning === !0 ||
      my(n.textContent, a)
        ? (i.popover != null && (Le('beforetoggle', n), Le('toggle', n)),
          i.onScroll != null && Le('scroll', n),
          i.onScrollEnd != null && Le('scrollend', n),
          i.onClick != null && (n.onclick = qs),
          (n = !0))
        : (n = !1),
      n || Na(e))
  }
  function Jh(e) {
    for (rn = e.return; rn;)
      switch (rn.tag) {
        case 5:
        case 13:
          Qn = !1
          return
        case 27:
        case 3:
          Qn = !0
          return
        default:
          rn = rn.return
      }
  }
  function bo(e) {
    if (e !== rn) return !1
    if (!qe) return (Jh(e), (qe = !0), !1)
    var n = e.tag,
      a
    if (
      ((a = n !== 3 && n !== 27) &&
        ((a = n === 5) && ((a = e.type), (a = !(a !== 'form' && a !== 'button') || ud(e.type, e.memoizedProps))),
        (a = !a)),
      a && bt && Na(e),
      Jh(e),
      n === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(o(317))
      e: {
        for (e = e.nextSibling, n = 0; e;) {
          if (e.nodeType === 8)
            if (((a = e.data), a === '/$')) {
              if (n === 0) {
                bt = qn(e.nextSibling)
                break e
              }
              n--
            } else (a !== '$' && a !== '$!' && a !== '$?') || n++
          e = e.nextSibling
        }
        bt = null
      }
    } else
      n === 27
        ? ((n = bt), sa(e.type) ? ((e = pd), (pd = null), (bt = e)) : (bt = n))
        : (bt = rn ? qn(e.stateNode.nextSibling) : null)
    return !0
  }
  function vo() {
    ;((bt = rn = null), (qe = !1))
  }
  function em() {
    var e = _a
    return (e !== null && (hn === null ? (hn = e) : hn.push.apply(hn, e), (_a = null)), e)
  }
  function So(e) {
    _a === null ? (_a = [e]) : _a.push(e)
  }
  var Gc = I(null),
    Da = null,
    xr = null
  function Gr(e, n, a) {
    ;(te(Gc, n._currentValue), (n._currentValue = a))
  }
  function Rr(e) {
    ;((e._currentValue = Gc.current), ee(Gc))
  }
  function Kc(e, n, a) {
    for (; e !== null;) {
      var i = e.alternate
      if (
        ((e.childLanes & n) !== n
          ? ((e.childLanes |= n), i !== null && (i.childLanes |= n))
          : i !== null && (i.childLanes & n) !== n && (i.childLanes |= n),
        e === a)
      )
        break
      e = e.return
    }
  }
  function Xc(e, n, a, i) {
    var c = e.child
    for (c !== null && (c.return = e); c !== null;) {
      var d = c.dependencies
      if (d !== null) {
        var y = c.child
        d = d.firstContext
        e: for (; d !== null;) {
          var E = d
          d = c
          for (var B = 0; B < n.length; B++)
            if (E.context === n[B]) {
              ;((d.lanes |= a), (E = d.alternate), E !== null && (E.lanes |= a), Kc(d.return, a, e), i || (y = null))
              break e
            }
          d = E.next
        }
      } else if (c.tag === 18) {
        if (((y = c.return), y === null)) throw Error(o(341))
        ;((y.lanes |= a), (d = y.alternate), d !== null && (d.lanes |= a), Kc(y, a, e), (y = null))
      } else y = c.child
      if (y !== null) y.return = c
      else
        for (y = c; y !== null;) {
          if (y === e) {
            y = null
            break
          }
          if (((c = y.sibling), c !== null)) {
            ;((c.return = y.return), (y = c))
            break
          }
          y = y.return
        }
      c = y
    }
  }
  function xo(e, n, a, i) {
    e = null
    for (var c = n, d = !1; c !== null;) {
      if (!d) {
        if ((c.flags & 524288) !== 0) d = !0
        else if ((c.flags & 262144) !== 0) break
      }
      if (c.tag === 10) {
        var y = c.alternate
        if (y === null) throw Error(o(387))
        if (((y = y.memoizedProps), y !== null)) {
          var E = c.type
          yn(c.pendingProps.value, y.value) || (e !== null ? e.push(E) : (e = [E]))
        }
      } else if (c === me.current) {
        if (((y = c.alternate), y === null)) throw Error(o(387))
        y.memoizedState.memoizedState !== c.memoizedState.memoizedState && (e !== null ? e.push(Qo) : (e = [Qo]))
      }
      c = c.return
    }
    ;(e !== null && Xc(n, e, a, i), (n.flags |= 262144))
  }
  function us(e) {
    for (e = e.firstContext; e !== null;) {
      if (!yn(e.context._currentValue, e.memoizedValue)) return !0
      e = e.next
    }
    return !1
  }
  function Ba(e) {
    ;((Da = e), (xr = null), (e = e.dependencies), e !== null && (e.firstContext = null))
  }
  function Qt(e) {
    return tm(Da, e)
  }
  function cs(e, n) {
    return (Da === null && Ba(e), tm(e, n))
  }
  function tm(e, n) {
    var a = n._currentValue
    if (((n = { context: n, memoizedValue: a, next: null }), xr === null)) {
      if (e === null) throw Error(o(308))
      ;((xr = n), (e.dependencies = { lanes: 0, firstContext: n }), (e.flags |= 524288))
    } else xr = xr.next = n
    return a
  }
  var $S =
      typeof AbortController < 'u'
        ? AbortController
        : function () {
            var e = [],
              n = (this.signal = {
                aborted: !1,
                addEventListener: function (a, i) {
                  e.push(i)
                },
              })
            this.abort = function () {
              ;((n.aborted = !0),
                e.forEach(function (a) {
                  return a()
                }))
            }
          },
    HS = t.unstable_scheduleCallback,
    PS = t.unstable_NormalPriority,
    Bt = { $$typeof: M, Consumer: null, Provider: null, _currentValue: null, _currentValue2: null, _threadCount: 0 }
  function Qc() {
    return { controller: new $S(), data: new Map(), refCount: 0 }
  }
  function Ro(e) {
    ;(e.refCount--,
      e.refCount === 0 &&
        HS(PS, function () {
          e.controller.abort()
        }))
  }
  var Eo = null,
    Zc = 0,
    fl = 0,
    dl = null
  function qS(e, n) {
    if (Eo === null) {
      var a = (Eo = [])
      ;((Zc = 0),
        (fl = ed()),
        (dl = {
          status: 'pending',
          value: void 0,
          then: function (i) {
            a.push(i)
          },
        }))
    }
    return (Zc++, n.then(nm, nm), n)
  }
  function nm() {
    if (--Zc === 0 && Eo !== null) {
      dl !== null && (dl.status = 'fulfilled')
      var e = Eo
      ;((Eo = null), (fl = 0), (dl = null))
      for (var n = 0; n < e.length; n++) (0, e[n])()
    }
  }
  function IS(e, n) {
    var a = [],
      i = {
        status: 'pending',
        value: null,
        reason: null,
        then: function (c) {
          a.push(c)
        },
      }
    return (
      e.then(
        function () {
          ;((i.status = 'fulfilled'), (i.value = n))
          for (var c = 0; c < a.length; c++) (0, a[c])(n)
        },
        function (c) {
          for (i.status = 'rejected', i.reason = c, c = 0; c < a.length; c++) (0, a[c])(void 0)
        }
      ),
      i
    )
  }
  var rm = N.S
  N.S = function (e, n) {
    ;(typeof n == 'object' && n !== null && typeof n.then == 'function' && qS(e, n), rm !== null && rm(e, n))
  }
  var za = I(null)
  function Wc() {
    var e = za.current
    return e !== null ? e : ft.pooledCache
  }
  function fs(e, n) {
    n === null ? te(za, za.current) : te(za, n.pool)
  }
  function am() {
    var e = Wc()
    return e === null ? null : { parent: Bt._currentValue, pool: e }
  }
  var To = Error(o(460)),
    lm = Error(o(474)),
    ds = Error(o(542)),
    Jc = { then: function () {} }
  function om(e) {
    return ((e = e.status), e === 'fulfilled' || e === 'rejected')
  }
  function ps() {}
  function im(e, n, a) {
    switch (((a = e[a]), a === void 0 ? e.push(n) : a !== n && (n.then(ps, ps), (n = a)), n.status)) {
      case 'fulfilled':
        return n.value
      case 'rejected':
        throw ((e = n.reason), um(e), e)
      default:
        if (typeof n.status == 'string') n.then(ps, ps)
        else {
          if (((e = ft), e !== null && 100 < e.shellSuspendCounter)) throw Error(o(482))
          ;((e = n),
            (e.status = 'pending'),
            e.then(
              function (i) {
                if (n.status === 'pending') {
                  var c = n
                  ;((c.status = 'fulfilled'), (c.value = i))
                }
              },
              function (i) {
                if (n.status === 'pending') {
                  var c = n
                  ;((c.status = 'rejected'), (c.reason = i))
                }
              }
            ))
        }
        switch (n.status) {
          case 'fulfilled':
            return n.value
          case 'rejected':
            throw ((e = n.reason), um(e), e)
        }
        throw ((Co = n), To)
    }
  }
  var Co = null
  function sm() {
    if (Co === null) throw Error(o(459))
    var e = Co
    return ((Co = null), e)
  }
  function um(e) {
    if (e === To || e === ds) throw Error(o(483))
  }
  var Kr = !1
  function ef(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    }
  }
  function tf(e, n) {
    ;((e = e.updateQueue),
      n.updateQueue === e &&
        (n.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          callbacks: null,
        }))
  }
  function Xr(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null }
  }
  function Qr(e, n, a) {
    var i = e.updateQueue
    if (i === null) return null
    if (((i = i.shared), (Xe & 2) !== 0)) {
      var c = i.pending
      return (
        c === null ? (n.next = n) : ((n.next = c.next), (c.next = n)),
        (i.pending = n),
        (n = ls(e)),
        Xh(e, null, a),
        n
      )
    }
    return (as(e, i, n, a), ls(e))
  }
  function wo(e, n, a) {
    if (((n = n.updateQueue), n !== null && ((n = n.shared), (a & 4194048) !== 0))) {
      var i = n.lanes
      ;((i &= e.pendingLanes), (a |= i), (n.lanes = a), fr(e, a))
    }
  }
  function nf(e, n) {
    var a = e.updateQueue,
      i = e.alternate
    if (i !== null && ((i = i.updateQueue), a === i)) {
      var c = null,
        d = null
      if (((a = a.firstBaseUpdate), a !== null)) {
        do {
          var y = { lane: a.lane, tag: a.tag, payload: a.payload, callback: null, next: null }
          ;(d === null ? (c = d = y) : (d = d.next = y), (a = a.next))
        } while (a !== null)
        d === null ? (c = d = n) : (d = d.next = n)
      } else c = d = n
      ;((a = {
        baseState: i.baseState,
        firstBaseUpdate: c,
        lastBaseUpdate: d,
        shared: i.shared,
        callbacks: i.callbacks,
      }),
        (e.updateQueue = a))
      return
    }
    ;((e = a.lastBaseUpdate), e === null ? (a.firstBaseUpdate = n) : (e.next = n), (a.lastBaseUpdate = n))
  }
  var rf = !1
  function Ao() {
    if (rf) {
      var e = dl
      if (e !== null) throw e
    }
  }
  function Oo(e, n, a, i) {
    rf = !1
    var c = e.updateQueue
    Kr = !1
    var d = c.firstBaseUpdate,
      y = c.lastBaseUpdate,
      E = c.shared.pending
    if (E !== null) {
      c.shared.pending = null
      var B = E,
        Y = B.next
      ;((B.next = null), y === null ? (d = Y) : (y.next = Y), (y = B))
      var ne = e.alternate
      ne !== null &&
        ((ne = ne.updateQueue),
        (E = ne.lastBaseUpdate),
        E !== y && (E === null ? (ne.firstBaseUpdate = Y) : (E.next = Y), (ne.lastBaseUpdate = B)))
    }
    if (d !== null) {
      var ae = c.baseState
      ;((y = 0), (ne = Y = B = null), (E = d))
      do {
        var K = E.lane & -536870913,
          X = K !== E.lane
        if (X ? ($e & K) === K : (i & K) === K) {
          ;(K !== 0 && K === fl && (rf = !0),
            ne !== null && (ne = ne.next = { lane: 0, tag: E.tag, payload: E.payload, callback: null, next: null }))
          e: {
            var Ce = e,
              xe = E
            K = n
            var at = a
            switch (xe.tag) {
              case 1:
                if (((Ce = xe.payload), typeof Ce == 'function')) {
                  ae = Ce.call(at, ae, K)
                  break e
                }
                ae = Ce
                break e
              case 3:
                Ce.flags = (Ce.flags & -65537) | 128
              case 0:
                if (((Ce = xe.payload), (K = typeof Ce == 'function' ? Ce.call(at, ae, K) : Ce), K == null)) break e
                ae = g({}, ae, K)
                break e
              case 2:
                Kr = !0
            }
          }
          ;((K = E.callback),
            K !== null &&
              ((e.flags |= 64),
              X && (e.flags |= 8192),
              (X = c.callbacks),
              X === null ? (c.callbacks = [K]) : X.push(K)))
        } else
          ((X = { lane: K, tag: E.tag, payload: E.payload, callback: E.callback, next: null }),
            ne === null ? ((Y = ne = X), (B = ae)) : (ne = ne.next = X),
            (y |= K))
        if (((E = E.next), E === null)) {
          if (((E = c.shared.pending), E === null)) break
          ;((X = E), (E = X.next), (X.next = null), (c.lastBaseUpdate = X), (c.shared.pending = null))
        }
      } while (!0)
      ;(ne === null && (B = ae),
        (c.baseState = B),
        (c.firstBaseUpdate = Y),
        (c.lastBaseUpdate = ne),
        d === null && (c.shared.lanes = 0),
        (aa |= y),
        (e.lanes = y),
        (e.memoizedState = ae))
    }
  }
  function cm(e, n) {
    if (typeof e != 'function') throw Error(o(191, e))
    e.call(n)
  }
  function fm(e, n) {
    var a = e.callbacks
    if (a !== null) for (e.callbacks = null, e = 0; e < a.length; e++) cm(a[e], n)
  }
  var pl = I(null),
    hs = I(0)
  function dm(e, n) {
    ;((e = Mr), te(hs, e), te(pl, n), (Mr = e | n.baseLanes))
  }
  function af() {
    ;(te(hs, Mr), te(pl, pl.current))
  }
  function lf() {
    ;((Mr = hs.current), ee(pl), ee(hs))
  }
  var Zr = 0,
    Be = null,
    nt = null,
    wt = null,
    ms = !1,
    hl = !1,
    Ua = !1,
    gs = 0,
    Mo = 0,
    ml = null,
    FS = 0
  function Et() {
    throw Error(o(321))
  }
  function of(e, n) {
    if (n === null) return !1
    for (var a = 0; a < n.length && a < e.length; a++) if (!yn(e[a], n[a])) return !1
    return !0
  }
  function sf(e, n, a, i, c, d) {
    return (
      (Zr = d),
      (Be = n),
      (n.memoizedState = null),
      (n.updateQueue = null),
      (n.lanes = 0),
      (N.H = e === null || e.memoizedState === null ? Xm : Qm),
      (Ua = !1),
      (d = a(i, c)),
      (Ua = !1),
      hl && (d = hm(n, a, i, c)),
      pm(e),
      d
    )
  }
  function pm(e) {
    N.H = Rs
    var n = nt !== null && nt.next !== null
    if (((Zr = 0), (wt = nt = Be = null), (ms = !1), (Mo = 0), (ml = null), n)) throw Error(o(300))
    e === null || jt || ((e = e.dependencies), e !== null && us(e) && (jt = !0))
  }
  function hm(e, n, a, i) {
    Be = e
    var c = 0
    do {
      if ((hl && (ml = null), (Mo = 0), (hl = !1), 25 <= c)) throw Error(o(301))
      if (((c += 1), (wt = nt = null), e.updateQueue != null)) {
        var d = e.updateQueue
        ;((d.lastEffect = null), (d.events = null), (d.stores = null), d.memoCache != null && (d.memoCache.index = 0))
      }
      ;((N.H = ZS), (d = n(a, i)))
    } while (hl)
    return d
  }
  function YS() {
    var e = N.H,
      n = e.useState()[0]
    return (
      (n = typeof n.then == 'function' ? _o(n) : n),
      (e = e.useState()[0]),
      (nt !== null ? nt.memoizedState : null) !== e && (Be.flags |= 1024),
      n
    )
  }
  function uf() {
    var e = gs !== 0
    return ((gs = 0), e)
  }
  function cf(e, n, a) {
    ;((n.updateQueue = e.updateQueue), (n.flags &= -2053), (e.lanes &= ~a))
  }
  function ff(e) {
    if (ms) {
      for (e = e.memoizedState; e !== null;) {
        var n = e.queue
        ;(n !== null && (n.pending = null), (e = e.next))
      }
      ms = !1
    }
    ;((Zr = 0), (wt = nt = Be = null), (hl = !1), (Mo = gs = 0), (ml = null))
  }
  function dn() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null }
    return (wt === null ? (Be.memoizedState = wt = e) : (wt = wt.next = e), wt)
  }
  function At() {
    if (nt === null) {
      var e = Be.alternate
      e = e !== null ? e.memoizedState : null
    } else e = nt.next
    var n = wt === null ? Be.memoizedState : wt.next
    if (n !== null) ((wt = n), (nt = e))
    else {
      if (e === null) throw Be.alternate === null ? Error(o(467)) : Error(o(310))
      ;((nt = e),
        (e = {
          memoizedState: nt.memoizedState,
          baseState: nt.baseState,
          baseQueue: nt.baseQueue,
          queue: nt.queue,
          next: null,
        }),
        wt === null ? (Be.memoizedState = wt = e) : (wt = wt.next = e))
    }
    return wt
  }
  function df() {
    return { lastEffect: null, events: null, stores: null, memoCache: null }
  }
  function _o(e) {
    var n = Mo
    return (
      (Mo += 1),
      ml === null && (ml = []),
      (e = im(ml, e, n)),
      (n = Be),
      (wt === null ? n.memoizedState : wt.next) === null &&
        ((n = n.alternate), (N.H = n === null || n.memoizedState === null ? Xm : Qm)),
      e
    )
  }
  function ys(e) {
    if (e !== null && typeof e == 'object') {
      if (typeof e.then == 'function') return _o(e)
      if (e.$$typeof === M) return Qt(e)
    }
    throw Error(o(438, String(e)))
  }
  function pf(e) {
    var n = null,
      a = Be.updateQueue
    if ((a !== null && (n = a.memoCache), n == null)) {
      var i = Be.alternate
      i !== null &&
        ((i = i.updateQueue),
        i !== null &&
          ((i = i.memoCache),
          i != null &&
            (n = {
              data: i.data.map(function (c) {
                return c.slice()
              }),
              index: 0,
            })))
    }
    if (
      (n == null && (n = { data: [], index: 0 }),
      a === null && ((a = df()), (Be.updateQueue = a)),
      (a.memoCache = n),
      (a = n.data[n.index]),
      a === void 0)
    )
      for (a = n.data[n.index] = Array(e), i = 0; i < e; i++) a[i] = ce
    return (n.index++, a)
  }
  function Er(e, n) {
    return typeof n == 'function' ? n(e) : n
  }
  function bs(e) {
    var n = At()
    return hf(n, nt, e)
  }
  function hf(e, n, a) {
    var i = e.queue
    if (i === null) throw Error(o(311))
    i.lastRenderedReducer = a
    var c = e.baseQueue,
      d = i.pending
    if (d !== null) {
      if (c !== null) {
        var y = c.next
        ;((c.next = d.next), (d.next = y))
      }
      ;((n.baseQueue = c = d), (i.pending = null))
    }
    if (((d = e.baseState), c === null)) e.memoizedState = d
    else {
      n = c.next
      var E = (y = null),
        B = null,
        Y = n,
        ne = !1
      do {
        var ae = Y.lane & -536870913
        if (ae !== Y.lane ? ($e & ae) === ae : (Zr & ae) === ae) {
          var K = Y.revertLane
          if (K === 0)
            (B !== null &&
              (B = B.next =
                {
                  lane: 0,
                  revertLane: 0,
                  action: Y.action,
                  hasEagerState: Y.hasEagerState,
                  eagerState: Y.eagerState,
                  next: null,
                }),
              ae === fl && (ne = !0))
          else if ((Zr & K) === K) {
            ;((Y = Y.next), K === fl && (ne = !0))
            continue
          } else
            ((ae = {
              lane: 0,
              revertLane: Y.revertLane,
              action: Y.action,
              hasEagerState: Y.hasEagerState,
              eagerState: Y.eagerState,
              next: null,
            }),
              B === null ? ((E = B = ae), (y = d)) : (B = B.next = ae),
              (Be.lanes |= K),
              (aa |= K))
          ;((ae = Y.action), Ua && a(d, ae), (d = Y.hasEagerState ? Y.eagerState : a(d, ae)))
        } else
          ((K = {
            lane: ae,
            revertLane: Y.revertLane,
            action: Y.action,
            hasEagerState: Y.hasEagerState,
            eagerState: Y.eagerState,
            next: null,
          }),
            B === null ? ((E = B = K), (y = d)) : (B = B.next = K),
            (Be.lanes |= ae),
            (aa |= ae))
        Y = Y.next
      } while (Y !== null && Y !== n)
      if ((B === null ? (y = d) : (B.next = E), !yn(d, e.memoizedState) && ((jt = !0), ne && ((a = dl), a !== null))))
        throw a
      ;((e.memoizedState = d), (e.baseState = y), (e.baseQueue = B), (i.lastRenderedState = d))
    }
    return (c === null && (i.lanes = 0), [e.memoizedState, i.dispatch])
  }
  function mf(e) {
    var n = At(),
      a = n.queue
    if (a === null) throw Error(o(311))
    a.lastRenderedReducer = e
    var i = a.dispatch,
      c = a.pending,
      d = n.memoizedState
    if (c !== null) {
      a.pending = null
      var y = (c = c.next)
      do ((d = e(d, y.action)), (y = y.next))
      while (y !== c)
      ;(yn(d, n.memoizedState) || (jt = !0),
        (n.memoizedState = d),
        n.baseQueue === null && (n.baseState = d),
        (a.lastRenderedState = d))
    }
    return [d, i]
  }
  function mm(e, n, a) {
    var i = Be,
      c = At(),
      d = qe
    if (d) {
      if (a === void 0) throw Error(o(407))
      a = a()
    } else a = n()
    var y = !yn((nt || c).memoizedState, a)
    ;(y && ((c.memoizedState = a), (jt = !0)), (c = c.queue))
    var E = bm.bind(null, i, c, e)
    if ((No(2048, 8, E, [e]), c.getSnapshot !== n || y || (wt !== null && wt.memoizedState.tag & 1))) {
      if (((i.flags |= 2048), gl(9, vs(), ym.bind(null, i, c, a, n), null), ft === null)) throw Error(o(349))
      d || (Zr & 124) !== 0 || gm(i, n, a)
    }
    return a
  }
  function gm(e, n, a) {
    ;((e.flags |= 16384),
      (e = { getSnapshot: n, value: a }),
      (n = Be.updateQueue),
      n === null
        ? ((n = df()), (Be.updateQueue = n), (n.stores = [e]))
        : ((a = n.stores), a === null ? (n.stores = [e]) : a.push(e)))
  }
  function ym(e, n, a, i) {
    ;((n.value = a), (n.getSnapshot = i), vm(n) && Sm(e))
  }
  function bm(e, n, a) {
    return a(function () {
      vm(n) && Sm(e)
    })
  }
  function vm(e) {
    var n = e.getSnapshot
    e = e.value
    try {
      var a = n()
      return !yn(e, a)
    } catch {
      return !0
    }
  }
  function Sm(e) {
    var n = il(e, 2)
    n !== null && En(n, e, 2)
  }
  function gf(e) {
    var n = dn()
    if (typeof e == 'function') {
      var a = e
      if (((e = a()), Ua)) {
        ct(!0)
        try {
          a()
        } finally {
          ct(!1)
        }
      }
    }
    return (
      (n.memoizedState = n.baseState = e),
      (n.queue = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Er, lastRenderedState: e }),
      n
    )
  }
  function xm(e, n, a, i) {
    return ((e.baseState = a), hf(e, nt, typeof i == 'function' ? i : Er))
  }
  function VS(e, n, a, i, c) {
    if (xs(e)) throw Error(o(485))
    if (((e = n.action), e !== null)) {
      var d = {
        payload: c,
        action: e,
        next: null,
        isTransition: !0,
        status: 'pending',
        value: null,
        reason: null,
        listeners: [],
        then: function (y) {
          d.listeners.push(y)
        },
      }
      ;(N.T !== null ? a(!0) : (d.isTransition = !1),
        i(d),
        (a = n.pending),
        a === null ? ((d.next = n.pending = d), Rm(n, d)) : ((d.next = a.next), (n.pending = a.next = d)))
    }
  }
  function Rm(e, n) {
    var a = n.action,
      i = n.payload,
      c = e.state
    if (n.isTransition) {
      var d = N.T,
        y = {}
      N.T = y
      try {
        var E = a(c, i),
          B = N.S
        ;(B !== null && B(y, E), Em(e, n, E))
      } catch (Y) {
        yf(e, n, Y)
      } finally {
        N.T = d
      }
    } else
      try {
        ;((d = a(c, i)), Em(e, n, d))
      } catch (Y) {
        yf(e, n, Y)
      }
  }
  function Em(e, n, a) {
    a !== null && typeof a == 'object' && typeof a.then == 'function'
      ? a.then(
          function (i) {
            Tm(e, n, i)
          },
          function (i) {
            return yf(e, n, i)
          }
        )
      : Tm(e, n, a)
  }
  function Tm(e, n, a) {
    ;((n.status = 'fulfilled'),
      (n.value = a),
      Cm(n),
      (e.state = a),
      (n = e.pending),
      n !== null && ((a = n.next), a === n ? (e.pending = null) : ((a = a.next), (n.next = a), Rm(e, a))))
  }
  function yf(e, n, a) {
    var i = e.pending
    if (((e.pending = null), i !== null)) {
      i = i.next
      do ((n.status = 'rejected'), (n.reason = a), Cm(n), (n = n.next))
      while (n !== i)
    }
    e.action = null
  }
  function Cm(e) {
    e = e.listeners
    for (var n = 0; n < e.length; n++) (0, e[n])()
  }
  function wm(e, n) {
    return n
  }
  function Am(e, n) {
    if (qe) {
      var a = ft.formState
      if (a !== null) {
        e: {
          var i = Be
          if (qe) {
            if (bt) {
              t: {
                for (var c = bt, d = Qn; c.nodeType !== 8;) {
                  if (!d) {
                    c = null
                    break t
                  }
                  if (((c = qn(c.nextSibling)), c === null)) {
                    c = null
                    break t
                  }
                }
                ;((d = c.data), (c = d === 'F!' || d === 'F' ? c : null))
              }
              if (c) {
                ;((bt = qn(c.nextSibling)), (i = c.data === 'F!'))
                break e
              }
            }
            Na(i)
          }
          i = !1
        }
        i && (n = a[0])
      }
    }
    return (
      (a = dn()),
      (a.memoizedState = a.baseState = n),
      (i = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: wm, lastRenderedState: n }),
      (a.queue = i),
      (a = Vm.bind(null, Be, i)),
      (i.dispatch = a),
      (i = gf(!1)),
      (d = Rf.bind(null, Be, !1, i.queue)),
      (i = dn()),
      (c = { state: n, dispatch: null, action: e, pending: null }),
      (i.queue = c),
      (a = VS.bind(null, Be, c, d, a)),
      (c.dispatch = a),
      (i.memoizedState = e),
      [n, a, !1]
    )
  }
  function Om(e) {
    var n = At()
    return Mm(n, nt, e)
  }
  function Mm(e, n, a) {
    if (((n = hf(e, n, wm)[0]), (e = bs(Er)[0]), typeof n == 'object' && n !== null && typeof n.then == 'function'))
      try {
        var i = _o(n)
      } catch (y) {
        throw y === To ? ds : y
      }
    else i = n
    n = At()
    var c = n.queue,
      d = c.dispatch
    return (a !== n.memoizedState && ((Be.flags |= 2048), gl(9, vs(), GS.bind(null, c, a), null)), [i, d, e])
  }
  function GS(e, n) {
    e.action = n
  }
  function _m(e) {
    var n = At(),
      a = nt
    if (a !== null) return Mm(n, a, e)
    ;(At(), (n = n.memoizedState), (a = At()))
    var i = a.queue.dispatch
    return ((a.memoizedState = e), [n, i, !1])
  }
  function gl(e, n, a, i) {
    return (
      (e = { tag: e, create: a, deps: i, inst: n, next: null }),
      (n = Be.updateQueue),
      n === null && ((n = df()), (Be.updateQueue = n)),
      (a = n.lastEffect),
      a === null ? (n.lastEffect = e.next = e) : ((i = a.next), (a.next = e), (e.next = i), (n.lastEffect = e)),
      e
    )
  }
  function vs() {
    return { destroy: void 0, resource: void 0 }
  }
  function Nm() {
    return At().memoizedState
  }
  function Ss(e, n, a, i) {
    var c = dn()
    ;((i = i === void 0 ? null : i), (Be.flags |= e), (c.memoizedState = gl(1 | n, vs(), a, i)))
  }
  function No(e, n, a, i) {
    var c = At()
    i = i === void 0 ? null : i
    var d = c.memoizedState.inst
    nt !== null && i !== null && of(i, nt.memoizedState.deps)
      ? (c.memoizedState = gl(n, d, a, i))
      : ((Be.flags |= e), (c.memoizedState = gl(1 | n, d, a, i)))
  }
  function Dm(e, n) {
    Ss(8390656, 8, e, n)
  }
  function Bm(e, n) {
    No(2048, 8, e, n)
  }
  function zm(e, n) {
    return No(4, 2, e, n)
  }
  function Um(e, n) {
    return No(4, 4, e, n)
  }
  function km(e, n) {
    if (typeof n == 'function') {
      e = e()
      var a = n(e)
      return function () {
        typeof a == 'function' ? a() : n(null)
      }
    }
    if (n != null)
      return (
        (e = e()),
        (n.current = e),
        function () {
          n.current = null
        }
      )
  }
  function Lm(e, n, a) {
    ;((a = a != null ? a.concat([e]) : null), No(4, 4, km.bind(null, n, e), a))
  }
  function bf() {}
  function jm(e, n) {
    var a = At()
    n = n === void 0 ? null : n
    var i = a.memoizedState
    return n !== null && of(n, i[1]) ? i[0] : ((a.memoizedState = [e, n]), e)
  }
  function $m(e, n) {
    var a = At()
    n = n === void 0 ? null : n
    var i = a.memoizedState
    if (n !== null && of(n, i[1])) return i[0]
    if (((i = e()), Ua)) {
      ct(!0)
      try {
        e()
      } finally {
        ct(!1)
      }
    }
    return ((a.memoizedState = [i, n]), i)
  }
  function vf(e, n, a) {
    return a === void 0 || (Zr & 1073741824) !== 0
      ? (e.memoizedState = n)
      : ((e.memoizedState = a), (e = qg()), (Be.lanes |= e), (aa |= e), a)
  }
  function Hm(e, n, a, i) {
    return yn(a, n)
      ? a
      : pl.current !== null
        ? ((e = vf(e, a, i)), yn(e, n) || (jt = !0), e)
        : (Zr & 42) === 0
          ? ((jt = !0), (e.memoizedState = a))
          : ((e = qg()), (Be.lanes |= e), (aa |= e), n)
  }
  function Pm(e, n, a, i, c) {
    var d = H.p
    H.p = d !== 0 && 8 > d ? d : 8
    var y = N.T,
      E = {}
    ;((N.T = E), Rf(e, !1, n, a))
    try {
      var B = c(),
        Y = N.S
      if ((Y !== null && Y(E, B), B !== null && typeof B == 'object' && typeof B.then == 'function')) {
        var ne = IS(B, i)
        Do(e, n, ne, Rn(e))
      } else Do(e, n, i, Rn(e))
    } catch (ae) {
      Do(e, n, { then: function () {}, status: 'rejected', reason: ae }, Rn())
    } finally {
      ;((H.p = d), (N.T = y))
    }
  }
  function KS() {}
  function Sf(e, n, a, i) {
    if (e.tag !== 5) throw Error(o(476))
    var c = qm(e).queue
    Pm(
      e,
      c,
      n,
      W,
      a === null
        ? KS
        : function () {
            return (Im(e), a(i))
          }
    )
  }
  function qm(e) {
    var n = e.memoizedState
    if (n !== null) return n
    n = {
      memoizedState: W,
      baseState: W,
      baseQueue: null,
      queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Er, lastRenderedState: W },
      next: null,
    }
    var a = {}
    return (
      (n.next = {
        memoizedState: a,
        baseState: a,
        baseQueue: null,
        queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Er, lastRenderedState: a },
        next: null,
      }),
      (e.memoizedState = n),
      (e = e.alternate),
      e !== null && (e.memoizedState = n),
      n
    )
  }
  function Im(e) {
    var n = qm(e).next.queue
    Do(e, n, {}, Rn())
  }
  function xf() {
    return Qt(Qo)
  }
  function Fm() {
    return At().memoizedState
  }
  function Ym() {
    return At().memoizedState
  }
  function XS(e) {
    for (var n = e.return; n !== null;) {
      switch (n.tag) {
        case 24:
        case 3:
          var a = Rn()
          e = Xr(a)
          var i = Qr(n, e, a)
          ;(i !== null && (En(i, n, a), wo(i, n, a)), (n = { cache: Qc() }), (e.payload = n))
          return
      }
      n = n.return
    }
  }
  function QS(e, n, a) {
    var i = Rn()
    ;((a = { lane: i, revertLane: 0, action: a, hasEagerState: !1, eagerState: null, next: null }),
      xs(e) ? Gm(n, a) : ((a = Hc(e, n, a, i)), a !== null && (En(a, e, i), Km(a, n, i))))
  }
  function Vm(e, n, a) {
    var i = Rn()
    Do(e, n, a, i)
  }
  function Do(e, n, a, i) {
    var c = { lane: i, revertLane: 0, action: a, hasEagerState: !1, eagerState: null, next: null }
    if (xs(e)) Gm(n, c)
    else {
      var d = e.alternate
      if (e.lanes === 0 && (d === null || d.lanes === 0) && ((d = n.lastRenderedReducer), d !== null))
        try {
          var y = n.lastRenderedState,
            E = d(y, a)
          if (((c.hasEagerState = !0), (c.eagerState = E), yn(E, y))) return (as(e, n, c, 0), ft === null && rs(), !1)
        } catch {
        } finally {
        }
      if (((a = Hc(e, n, c, i)), a !== null)) return (En(a, e, i), Km(a, n, i), !0)
    }
    return !1
  }
  function Rf(e, n, a, i) {
    if (((i = { lane: 2, revertLane: ed(), action: i, hasEagerState: !1, eagerState: null, next: null }), xs(e))) {
      if (n) throw Error(o(479))
    } else ((n = Hc(e, a, i, 2)), n !== null && En(n, e, 2))
  }
  function xs(e) {
    var n = e.alternate
    return e === Be || (n !== null && n === Be)
  }
  function Gm(e, n) {
    hl = ms = !0
    var a = e.pending
    ;(a === null ? (n.next = n) : ((n.next = a.next), (a.next = n)), (e.pending = n))
  }
  function Km(e, n, a) {
    if ((a & 4194048) !== 0) {
      var i = n.lanes
      ;((i &= e.pendingLanes), (a |= i), (n.lanes = a), fr(e, a))
    }
  }
  var Rs = {
      readContext: Qt,
      use: ys,
      useCallback: Et,
      useContext: Et,
      useEffect: Et,
      useImperativeHandle: Et,
      useLayoutEffect: Et,
      useInsertionEffect: Et,
      useMemo: Et,
      useReducer: Et,
      useRef: Et,
      useState: Et,
      useDebugValue: Et,
      useDeferredValue: Et,
      useTransition: Et,
      useSyncExternalStore: Et,
      useId: Et,
      useHostTransitionStatus: Et,
      useFormState: Et,
      useActionState: Et,
      useOptimistic: Et,
      useMemoCache: Et,
      useCacheRefresh: Et,
    },
    Xm = {
      readContext: Qt,
      use: ys,
      useCallback: function (e, n) {
        return ((dn().memoizedState = [e, n === void 0 ? null : n]), e)
      },
      useContext: Qt,
      useEffect: Dm,
      useImperativeHandle: function (e, n, a) {
        ;((a = a != null ? a.concat([e]) : null), Ss(4194308, 4, km.bind(null, n, e), a))
      },
      useLayoutEffect: function (e, n) {
        return Ss(4194308, 4, e, n)
      },
      useInsertionEffect: function (e, n) {
        Ss(4, 2, e, n)
      },
      useMemo: function (e, n) {
        var a = dn()
        n = n === void 0 ? null : n
        var i = e()
        if (Ua) {
          ct(!0)
          try {
            e()
          } finally {
            ct(!1)
          }
        }
        return ((a.memoizedState = [i, n]), i)
      },
      useReducer: function (e, n, a) {
        var i = dn()
        if (a !== void 0) {
          var c = a(n)
          if (Ua) {
            ct(!0)
            try {
              a(n)
            } finally {
              ct(!1)
            }
          }
        } else c = n
        return (
          (i.memoizedState = i.baseState = c),
          (e = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: c }),
          (i.queue = e),
          (e = e.dispatch = QS.bind(null, Be, e)),
          [i.memoizedState, e]
        )
      },
      useRef: function (e) {
        var n = dn()
        return ((e = { current: e }), (n.memoizedState = e))
      },
      useState: function (e) {
        e = gf(e)
        var n = e.queue,
          a = Vm.bind(null, Be, n)
        return ((n.dispatch = a), [e.memoizedState, a])
      },
      useDebugValue: bf,
      useDeferredValue: function (e, n) {
        var a = dn()
        return vf(a, e, n)
      },
      useTransition: function () {
        var e = gf(!1)
        return ((e = Pm.bind(null, Be, e.queue, !0, !1)), (dn().memoizedState = e), [!1, e])
      },
      useSyncExternalStore: function (e, n, a) {
        var i = Be,
          c = dn()
        if (qe) {
          if (a === void 0) throw Error(o(407))
          a = a()
        } else {
          if (((a = n()), ft === null)) throw Error(o(349))
          ;($e & 124) !== 0 || gm(i, n, a)
        }
        c.memoizedState = a
        var d = { value: a, getSnapshot: n }
        return (
          (c.queue = d),
          Dm(bm.bind(null, i, d, e), [e]),
          (i.flags |= 2048),
          gl(9, vs(), ym.bind(null, i, d, a, n), null),
          a
        )
      },
      useId: function () {
        var e = dn(),
          n = ft.identifierPrefix
        if (qe) {
          var a = Sr,
            i = vr
          ;((a = (i & ~(1 << (32 - xt(i) - 1))).toString(32) + a),
            (n = '«' + n + 'R' + a),
            (a = gs++),
            0 < a && (n += 'H' + a.toString(32)),
            (n += '»'))
        } else ((a = FS++), (n = '«' + n + 'r' + a.toString(32) + '»'))
        return (e.memoizedState = n)
      },
      useHostTransitionStatus: xf,
      useFormState: Am,
      useActionState: Am,
      useOptimistic: function (e) {
        var n = dn()
        n.memoizedState = n.baseState = e
        var a = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: null, lastRenderedState: null }
        return ((n.queue = a), (n = Rf.bind(null, Be, !0, a)), (a.dispatch = n), [e, n])
      },
      useMemoCache: pf,
      useCacheRefresh: function () {
        return (dn().memoizedState = XS.bind(null, Be))
      },
    },
    Qm = {
      readContext: Qt,
      use: ys,
      useCallback: jm,
      useContext: Qt,
      useEffect: Bm,
      useImperativeHandle: Lm,
      useInsertionEffect: zm,
      useLayoutEffect: Um,
      useMemo: $m,
      useReducer: bs,
      useRef: Nm,
      useState: function () {
        return bs(Er)
      },
      useDebugValue: bf,
      useDeferredValue: function (e, n) {
        var a = At()
        return Hm(a, nt.memoizedState, e, n)
      },
      useTransition: function () {
        var e = bs(Er)[0],
          n = At().memoizedState
        return [typeof e == 'boolean' ? e : _o(e), n]
      },
      useSyncExternalStore: mm,
      useId: Fm,
      useHostTransitionStatus: xf,
      useFormState: Om,
      useActionState: Om,
      useOptimistic: function (e, n) {
        var a = At()
        return xm(a, nt, e, n)
      },
      useMemoCache: pf,
      useCacheRefresh: Ym,
    },
    ZS = {
      readContext: Qt,
      use: ys,
      useCallback: jm,
      useContext: Qt,
      useEffect: Bm,
      useImperativeHandle: Lm,
      useInsertionEffect: zm,
      useLayoutEffect: Um,
      useMemo: $m,
      useReducer: mf,
      useRef: Nm,
      useState: function () {
        return mf(Er)
      },
      useDebugValue: bf,
      useDeferredValue: function (e, n) {
        var a = At()
        return nt === null ? vf(a, e, n) : Hm(a, nt.memoizedState, e, n)
      },
      useTransition: function () {
        var e = mf(Er)[0],
          n = At().memoizedState
        return [typeof e == 'boolean' ? e : _o(e), n]
      },
      useSyncExternalStore: mm,
      useId: Fm,
      useHostTransitionStatus: xf,
      useFormState: _m,
      useActionState: _m,
      useOptimistic: function (e, n) {
        var a = At()
        return nt !== null ? xm(a, nt, e, n) : ((a.baseState = e), [e, a.queue.dispatch])
      },
      useMemoCache: pf,
      useCacheRefresh: Ym,
    },
    yl = null,
    Bo = 0
  function Es(e) {
    var n = Bo
    return ((Bo += 1), yl === null && (yl = []), im(yl, e, n))
  }
  function zo(e, n) {
    ;((n = n.props.ref), (e.ref = n !== void 0 ? n : null))
  }
  function Ts(e, n) {
    throw n.$$typeof === b
      ? Error(o(525))
      : ((e = Object.prototype.toString.call(n)),
        Error(o(31, e === '[object Object]' ? 'object with keys {' + Object.keys(n).join(', ') + '}' : e)))
  }
  function Zm(e) {
    var n = e._init
    return n(e._payload)
  }
  function Wm(e) {
    function n(P, j) {
      if (e) {
        var F = P.deletions
        F === null ? ((P.deletions = [j]), (P.flags |= 16)) : F.push(j)
      }
    }
    function a(P, j) {
      if (!e) return null
      for (; j !== null;) (n(P, j), (j = j.sibling))
      return null
    }
    function i(P) {
      for (var j = new Map(); P !== null;) (P.key !== null ? j.set(P.key, P) : j.set(P.index, P), (P = P.sibling))
      return j
    }
    function c(P, j) {
      return ((P = br(P, j)), (P.index = 0), (P.sibling = null), P)
    }
    function d(P, j, F) {
      return (
        (P.index = F),
        e
          ? ((F = P.alternate),
            F !== null ? ((F = F.index), F < j ? ((P.flags |= 67108866), j) : F) : ((P.flags |= 67108866), j))
          : ((P.flags |= 1048576), j)
      )
    }
    function y(P) {
      return (e && P.alternate === null && (P.flags |= 67108866), P)
    }
    function E(P, j, F, re) {
      return j === null || j.tag !== 6
        ? ((j = qc(F, P.mode, re)), (j.return = P), j)
        : ((j = c(j, F)), (j.return = P), j)
    }
    function B(P, j, F, re) {
      var he = F.type
      return he === w
        ? ne(P, j, F.props.children, re, F.key)
        : j !== null &&
            (j.elementType === he || (typeof he == 'object' && he !== null && he.$$typeof === Q && Zm(he) === j.type))
          ? ((j = c(j, F.props)), zo(j, F), (j.return = P), j)
          : ((j = os(F.type, F.key, F.props, null, P.mode, re)), zo(j, F), (j.return = P), j)
    }
    function Y(P, j, F, re) {
      return j === null ||
        j.tag !== 4 ||
        j.stateNode.containerInfo !== F.containerInfo ||
        j.stateNode.implementation !== F.implementation
        ? ((j = Ic(F, P.mode, re)), (j.return = P), j)
        : ((j = c(j, F.children || [])), (j.return = P), j)
    }
    function ne(P, j, F, re, he) {
      return j === null || j.tag !== 7
        ? ((j = Aa(F, P.mode, re, he)), (j.return = P), j)
        : ((j = c(j, F)), (j.return = P), j)
    }
    function ae(P, j, F) {
      if ((typeof j == 'string' && j !== '') || typeof j == 'number' || typeof j == 'bigint')
        return ((j = qc('' + j, P.mode, F)), (j.return = P), j)
      if (typeof j == 'object' && j !== null) {
        switch (j.$$typeof) {
          case C:
            return ((F = os(j.type, j.key, j.props, null, P.mode, F)), zo(F, j), (F.return = P), F)
          case v:
            return ((j = Ic(j, P.mode, F)), (j.return = P), j)
          case Q:
            var re = j._init
            return ((j = re(j._payload)), ae(P, j, F))
        }
        if (U(j) || x(j)) return ((j = Aa(j, P.mode, F, null)), (j.return = P), j)
        if (typeof j.then == 'function') return ae(P, Es(j), F)
        if (j.$$typeof === M) return ae(P, cs(P, j), F)
        Ts(P, j)
      }
      return null
    }
    function K(P, j, F, re) {
      var he = j !== null ? j.key : null
      if ((typeof F == 'string' && F !== '') || typeof F == 'number' || typeof F == 'bigint')
        return he !== null ? null : E(P, j, '' + F, re)
      if (typeof F == 'object' && F !== null) {
        switch (F.$$typeof) {
          case C:
            return F.key === he ? B(P, j, F, re) : null
          case v:
            return F.key === he ? Y(P, j, F, re) : null
          case Q:
            return ((he = F._init), (F = he(F._payload)), K(P, j, F, re))
        }
        if (U(F) || x(F)) return he !== null ? null : ne(P, j, F, re, null)
        if (typeof F.then == 'function') return K(P, j, Es(F), re)
        if (F.$$typeof === M) return K(P, j, cs(P, F), re)
        Ts(P, F)
      }
      return null
    }
    function X(P, j, F, re, he) {
      if ((typeof re == 'string' && re !== '') || typeof re == 'number' || typeof re == 'bigint')
        return ((P = P.get(F) || null), E(j, P, '' + re, he))
      if (typeof re == 'object' && re !== null) {
        switch (re.$$typeof) {
          case C:
            return ((P = P.get(re.key === null ? F : re.key) || null), B(j, P, re, he))
          case v:
            return ((P = P.get(re.key === null ? F : re.key) || null), Y(j, P, re, he))
          case Q:
            var Ue = re._init
            return ((re = Ue(re._payload)), X(P, j, F, re, he))
        }
        if (U(re) || x(re)) return ((P = P.get(F) || null), ne(j, P, re, he, null))
        if (typeof re.then == 'function') return X(P, j, F, Es(re), he)
        if (re.$$typeof === M) return X(P, j, F, cs(j, re), he)
        Ts(j, re)
      }
      return null
    }
    function Ce(P, j, F, re) {
      for (var he = null, Ue = null, ve = j, Re = (j = 0), Ht = null; ve !== null && Re < F.length; Re++) {
        ve.index > Re ? ((Ht = ve), (ve = null)) : (Ht = ve.sibling)
        var Pe = K(P, ve, F[Re], re)
        if (Pe === null) {
          ve === null && (ve = Ht)
          break
        }
        ;(e && ve && Pe.alternate === null && n(P, ve),
          (j = d(Pe, j, Re)),
          Ue === null ? (he = Pe) : (Ue.sibling = Pe),
          (Ue = Pe),
          (ve = Ht))
      }
      if (Re === F.length) return (a(P, ve), qe && Ma(P, Re), he)
      if (ve === null) {
        for (; Re < F.length; Re++)
          ((ve = ae(P, F[Re], re)),
            ve !== null && ((j = d(ve, j, Re)), Ue === null ? (he = ve) : (Ue.sibling = ve), (Ue = ve)))
        return (qe && Ma(P, Re), he)
      }
      for (ve = i(ve); Re < F.length; Re++)
        ((Ht = X(ve, P, Re, F[Re], re)),
          Ht !== null &&
            (e && Ht.alternate !== null && ve.delete(Ht.key === null ? Re : Ht.key),
            (j = d(Ht, j, Re)),
            Ue === null ? (he = Ht) : (Ue.sibling = Ht),
            (Ue = Ht)))
      return (
        e &&
          ve.forEach(function (pa) {
            return n(P, pa)
          }),
        qe && Ma(P, Re),
        he
      )
    }
    function xe(P, j, F, re) {
      if (F == null) throw Error(o(151))
      for (
        var he = null, Ue = null, ve = j, Re = (j = 0), Ht = null, Pe = F.next();
        ve !== null && !Pe.done;
        Re++, Pe = F.next()
      ) {
        ve.index > Re ? ((Ht = ve), (ve = null)) : (Ht = ve.sibling)
        var pa = K(P, ve, Pe.value, re)
        if (pa === null) {
          ve === null && (ve = Ht)
          break
        }
        ;(e && ve && pa.alternate === null && n(P, ve),
          (j = d(pa, j, Re)),
          Ue === null ? (he = pa) : (Ue.sibling = pa),
          (Ue = pa),
          (ve = Ht))
      }
      if (Pe.done) return (a(P, ve), qe && Ma(P, Re), he)
      if (ve === null) {
        for (; !Pe.done; Re++, Pe = F.next())
          ((Pe = ae(P, Pe.value, re)),
            Pe !== null && ((j = d(Pe, j, Re)), Ue === null ? (he = Pe) : (Ue.sibling = Pe), (Ue = Pe)))
        return (qe && Ma(P, Re), he)
      }
      for (ve = i(ve); !Pe.done; Re++, Pe = F.next())
        ((Pe = X(ve, P, Re, Pe.value, re)),
          Pe !== null &&
            (e && Pe.alternate !== null && ve.delete(Pe.key === null ? Re : Pe.key),
            (j = d(Pe, j, Re)),
            Ue === null ? (he = Pe) : (Ue.sibling = Pe),
            (Ue = Pe)))
      return (
        e &&
          ve.forEach(function (Wx) {
            return n(P, Wx)
          }),
        qe && Ma(P, Re),
        he
      )
    }
    function at(P, j, F, re) {
      if (
        (typeof F == 'object' && F !== null && F.type === w && F.key === null && (F = F.props.children),
        typeof F == 'object' && F !== null)
      ) {
        switch (F.$$typeof) {
          case C:
            e: {
              for (var he = F.key; j !== null;) {
                if (j.key === he) {
                  if (((he = F.type), he === w)) {
                    if (j.tag === 7) {
                      ;(a(P, j.sibling), (re = c(j, F.props.children)), (re.return = P), (P = re))
                      break e
                    }
                  } else if (
                    j.elementType === he ||
                    (typeof he == 'object' && he !== null && he.$$typeof === Q && Zm(he) === j.type)
                  ) {
                    ;(a(P, j.sibling), (re = c(j, F.props)), zo(re, F), (re.return = P), (P = re))
                    break e
                  }
                  a(P, j)
                  break
                } else n(P, j)
                j = j.sibling
              }
              F.type === w
                ? ((re = Aa(F.props.children, P.mode, re, F.key)), (re.return = P), (P = re))
                : ((re = os(F.type, F.key, F.props, null, P.mode, re)), zo(re, F), (re.return = P), (P = re))
            }
            return y(P)
          case v:
            e: {
              for (he = F.key; j !== null;) {
                if (j.key === he)
                  if (
                    j.tag === 4 &&
                    j.stateNode.containerInfo === F.containerInfo &&
                    j.stateNode.implementation === F.implementation
                  ) {
                    ;(a(P, j.sibling), (re = c(j, F.children || [])), (re.return = P), (P = re))
                    break e
                  } else {
                    a(P, j)
                    break
                  }
                else n(P, j)
                j = j.sibling
              }
              ;((re = Ic(F, P.mode, re)), (re.return = P), (P = re))
            }
            return y(P)
          case Q:
            return ((he = F._init), (F = he(F._payload)), at(P, j, F, re))
        }
        if (U(F)) return Ce(P, j, F, re)
        if (x(F)) {
          if (((he = x(F)), typeof he != 'function')) throw Error(o(150))
          return ((F = he.call(F)), xe(P, j, F, re))
        }
        if (typeof F.then == 'function') return at(P, j, Es(F), re)
        if (F.$$typeof === M) return at(P, j, cs(P, F), re)
        Ts(P, F)
      }
      return (typeof F == 'string' && F !== '') || typeof F == 'number' || typeof F == 'bigint'
        ? ((F = '' + F),
          j !== null && j.tag === 6
            ? (a(P, j.sibling), (re = c(j, F)), (re.return = P), (P = re))
            : (a(P, j), (re = qc(F, P.mode, re)), (re.return = P), (P = re)),
          y(P))
        : a(P, j)
    }
    return function (P, j, F, re) {
      try {
        Bo = 0
        var he = at(P, j, F, re)
        return ((yl = null), he)
      } catch (ve) {
        if (ve === To || ve === ds) throw ve
        var Ue = bn(29, ve, null, P.mode)
        return ((Ue.lanes = re), (Ue.return = P), Ue)
      } finally {
      }
    }
  }
  var bl = Wm(!0),
    Jm = Wm(!1),
    Bn = I(null),
    Zn = null
  function Wr(e) {
    var n = e.alternate
    ;(te(zt, zt.current & 1),
      te(Bn, e),
      Zn === null && (n === null || pl.current !== null || n.memoizedState !== null) && (Zn = e))
  }
  function eg(e) {
    if (e.tag === 22) {
      if ((te(zt, zt.current), te(Bn, e), Zn === null)) {
        var n = e.alternate
        n !== null && n.memoizedState !== null && (Zn = e)
      }
    } else Jr()
  }
  function Jr() {
    ;(te(zt, zt.current), te(Bn, Bn.current))
  }
  function Tr(e) {
    ;(ee(Bn), Zn === e && (Zn = null), ee(zt))
  }
  var zt = I(0)
  function Cs(e) {
    for (var n = e; n !== null;) {
      if (n.tag === 13) {
        var a = n.memoizedState
        if (a !== null && ((a = a.dehydrated), a === null || a.data === '$?' || dd(a))) return n
      } else if (n.tag === 19 && n.memoizedProps.revealOrder !== void 0) {
        if ((n.flags & 128) !== 0) return n
      } else if (n.child !== null) {
        ;((n.child.return = n), (n = n.child))
        continue
      }
      if (n === e) break
      for (; n.sibling === null;) {
        if (n.return === null || n.return === e) return null
        n = n.return
      }
      ;((n.sibling.return = n.return), (n = n.sibling))
    }
    return null
  }
  function Ef(e, n, a, i) {
    ;((n = e.memoizedState),
      (a = a(i, n)),
      (a = a == null ? n : g({}, n, a)),
      (e.memoizedState = a),
      e.lanes === 0 && (e.updateQueue.baseState = a))
  }
  var Tf = {
    enqueueSetState: function (e, n, a) {
      e = e._reactInternals
      var i = Rn(),
        c = Xr(i)
      ;((c.payload = n), a != null && (c.callback = a), (n = Qr(e, c, i)), n !== null && (En(n, e, i), wo(n, e, i)))
    },
    enqueueReplaceState: function (e, n, a) {
      e = e._reactInternals
      var i = Rn(),
        c = Xr(i)
      ;((c.tag = 1),
        (c.payload = n),
        a != null && (c.callback = a),
        (n = Qr(e, c, i)),
        n !== null && (En(n, e, i), wo(n, e, i)))
    },
    enqueueForceUpdate: function (e, n) {
      e = e._reactInternals
      var a = Rn(),
        i = Xr(a)
      ;((i.tag = 2), n != null && (i.callback = n), (n = Qr(e, i, a)), n !== null && (En(n, e, a), wo(n, e, a)))
    },
  }
  function tg(e, n, a, i, c, d, y) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == 'function'
        ? e.shouldComponentUpdate(i, d, y)
        : n.prototype && n.prototype.isPureReactComponent
          ? !go(a, i) || !go(c, d)
          : !0
    )
  }
  function ng(e, n, a, i) {
    ;((e = n.state),
      typeof n.componentWillReceiveProps == 'function' && n.componentWillReceiveProps(a, i),
      typeof n.UNSAFE_componentWillReceiveProps == 'function' && n.UNSAFE_componentWillReceiveProps(a, i),
      n.state !== e && Tf.enqueueReplaceState(n, n.state, null))
  }
  function ka(e, n) {
    var a = n
    if ('ref' in n) {
      a = {}
      for (var i in n) i !== 'ref' && (a[i] = n[i])
    }
    if ((e = e.defaultProps)) {
      a === n && (a = g({}, a))
      for (var c in e) a[c] === void 0 && (a[c] = e[c])
    }
    return a
  }
  var ws =
    typeof reportError == 'function'
      ? reportError
      : function (e) {
          if (typeof window == 'object' && typeof window.ErrorEvent == 'function') {
            var n = new window.ErrorEvent('error', {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof e == 'object' && e !== null && typeof e.message == 'string' ? String(e.message) : String(e),
              error: e,
            })
            if (!window.dispatchEvent(n)) return
          } else if (typeof process == 'object' && typeof process.emit == 'function') {
            process.emit('uncaughtException', e)
            return
          }
          console.error(e)
        }
  function rg(e) {
    ws(e)
  }
  function ag(e) {
    console.error(e)
  }
  function lg(e) {
    ws(e)
  }
  function As(e, n) {
    try {
      var a = e.onUncaughtError
      a(n.value, { componentStack: n.stack })
    } catch (i) {
      setTimeout(function () {
        throw i
      })
    }
  }
  function og(e, n, a) {
    try {
      var i = e.onCaughtError
      i(a.value, { componentStack: a.stack, errorBoundary: n.tag === 1 ? n.stateNode : null })
    } catch (c) {
      setTimeout(function () {
        throw c
      })
    }
  }
  function Cf(e, n, a) {
    return (
      (a = Xr(a)),
      (a.tag = 3),
      (a.payload = { element: null }),
      (a.callback = function () {
        As(e, n)
      }),
      a
    )
  }
  function ig(e) {
    return ((e = Xr(e)), (e.tag = 3), e)
  }
  function sg(e, n, a, i) {
    var c = a.type.getDerivedStateFromError
    if (typeof c == 'function') {
      var d = i.value
      ;((e.payload = function () {
        return c(d)
      }),
        (e.callback = function () {
          og(n, a, i)
        }))
    }
    var y = a.stateNode
    y !== null &&
      typeof y.componentDidCatch == 'function' &&
      (e.callback = function () {
        ;(og(n, a, i), typeof c != 'function' && (la === null ? (la = new Set([this])) : la.add(this)))
        var E = i.stack
        this.componentDidCatch(i.value, { componentStack: E !== null ? E : '' })
      })
  }
  function WS(e, n, a, i, c) {
    if (((a.flags |= 32768), i !== null && typeof i == 'object' && typeof i.then == 'function')) {
      if (((n = a.alternate), n !== null && xo(n, a, c, !0), (a = Bn.current), a !== null)) {
        switch (a.tag) {
          case 13:
            return (
              Zn === null ? Xf() : a.alternate === null && vt === 0 && (vt = 3),
              (a.flags &= -257),
              (a.flags |= 65536),
              (a.lanes = c),
              i === Jc
                ? (a.flags |= 16384)
                : ((n = a.updateQueue), n === null ? (a.updateQueue = new Set([i])) : n.add(i), Zf(e, i, c)),
              !1
            )
          case 22:
            return (
              (a.flags |= 65536),
              i === Jc
                ? (a.flags |= 16384)
                : ((n = a.updateQueue),
                  n === null
                    ? ((n = { transitions: null, markerInstances: null, retryQueue: new Set([i]) }),
                      (a.updateQueue = n))
                    : ((a = n.retryQueue), a === null ? (n.retryQueue = new Set([i])) : a.add(i)),
                  Zf(e, i, c)),
              !1
            )
        }
        throw Error(o(435, a.tag))
      }
      return (Zf(e, i, c), Xf(), !1)
    }
    if (qe)
      return (
        (n = Bn.current),
        n !== null
          ? ((n.flags & 65536) === 0 && (n.flags |= 256),
            (n.flags |= 65536),
            (n.lanes = c),
            i !== Vc && ((e = Error(o(422), { cause: i })), So(Mn(e, a))))
          : (i !== Vc && ((n = Error(o(423), { cause: i })), So(Mn(n, a))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (c &= -c),
            (e.lanes |= c),
            (i = Mn(i, a)),
            (c = Cf(e.stateNode, i, c)),
            nf(e, c),
            vt !== 4 && (vt = 2)),
        !1
      )
    var d = Error(o(520), { cause: i })
    if (((d = Mn(d, a)), Po === null ? (Po = [d]) : Po.push(d), vt !== 4 && (vt = 2), n === null)) return !0
    ;((i = Mn(i, a)), (a = n))
    do {
      switch (a.tag) {
        case 3:
          return ((a.flags |= 65536), (e = c & -c), (a.lanes |= e), (e = Cf(a.stateNode, i, e)), nf(a, e), !1)
        case 1:
          if (
            ((n = a.type),
            (d = a.stateNode),
            (a.flags & 128) === 0 &&
              (typeof n.getDerivedStateFromError == 'function' ||
                (d !== null && typeof d.componentDidCatch == 'function' && (la === null || !la.has(d)))))
          )
            return ((a.flags |= 65536), (c &= -c), (a.lanes |= c), (c = ig(c)), sg(c, e, a, i), nf(a, c), !1)
      }
      a = a.return
    } while (a !== null)
    return !1
  }
  var ug = Error(o(461)),
    jt = !1
  function Yt(e, n, a, i) {
    n.child = e === null ? Jm(n, null, a, i) : bl(n, e.child, a, i)
  }
  function cg(e, n, a, i, c) {
    a = a.render
    var d = n.ref
    if ('ref' in i) {
      var y = {}
      for (var E in i) E !== 'ref' && (y[E] = i[E])
    } else y = i
    return (
      Ba(n),
      (i = sf(e, n, a, y, d, c)),
      (E = uf()),
      e !== null && !jt ? (cf(e, n, c), Cr(e, n, c)) : (qe && E && Fc(n), (n.flags |= 1), Yt(e, n, i, c), n.child)
    )
  }
  function fg(e, n, a, i, c) {
    if (e === null) {
      var d = a.type
      return typeof d == 'function' && !Pc(d) && d.defaultProps === void 0 && a.compare === null
        ? ((n.tag = 15), (n.type = d), dg(e, n, d, i, c))
        : ((e = os(a.type, null, i, n, n.mode, c)), (e.ref = n.ref), (e.return = n), (n.child = e))
    }
    if (((d = e.child), !Bf(e, c))) {
      var y = d.memoizedProps
      if (((a = a.compare), (a = a !== null ? a : go), a(y, i) && e.ref === n.ref)) return Cr(e, n, c)
    }
    return ((n.flags |= 1), (e = br(d, i)), (e.ref = n.ref), (e.return = n), (n.child = e))
  }
  function dg(e, n, a, i, c) {
    if (e !== null) {
      var d = e.memoizedProps
      if (go(d, i) && e.ref === n.ref)
        if (((jt = !1), (n.pendingProps = i = d), Bf(e, c))) (e.flags & 131072) !== 0 && (jt = !0)
        else return ((n.lanes = e.lanes), Cr(e, n, c))
    }
    return wf(e, n, a, i, c)
  }
  function pg(e, n, a) {
    var i = n.pendingProps,
      c = i.children,
      d = e !== null ? e.memoizedState : null
    if (i.mode === 'hidden') {
      if ((n.flags & 128) !== 0) {
        if (((i = d !== null ? d.baseLanes | a : a), e !== null)) {
          for (c = n.child = e.child, d = 0; c !== null;) ((d = d | c.lanes | c.childLanes), (c = c.sibling))
          n.childLanes = d & ~i
        } else ((n.childLanes = 0), (n.child = null))
        return hg(e, n, i, a)
      }
      if ((a & 536870912) !== 0)
        ((n.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && fs(n, d !== null ? d.cachePool : null),
          d !== null ? dm(n, d) : af(),
          eg(n))
      else return ((n.lanes = n.childLanes = 536870912), hg(e, n, d !== null ? d.baseLanes | a : a, a))
    } else
      d !== null
        ? (fs(n, d.cachePool), dm(n, d), Jr(), (n.memoizedState = null))
        : (e !== null && fs(n, null), af(), Jr())
    return (Yt(e, n, c, a), n.child)
  }
  function hg(e, n, a, i) {
    var c = Wc()
    return (
      (c = c === null ? null : { parent: Bt._currentValue, pool: c }),
      (n.memoizedState = { baseLanes: a, cachePool: c }),
      e !== null && fs(n, null),
      af(),
      eg(n),
      e !== null && xo(e, n, i, !0),
      null
    )
  }
  function Os(e, n) {
    var a = n.ref
    if (a === null) e !== null && e.ref !== null && (n.flags |= 4194816)
    else {
      if (typeof a != 'function' && typeof a != 'object') throw Error(o(284))
      ;(e === null || e.ref !== a) && (n.flags |= 4194816)
    }
  }
  function wf(e, n, a, i, c) {
    return (
      Ba(n),
      (a = sf(e, n, a, i, void 0, c)),
      (i = uf()),
      e !== null && !jt ? (cf(e, n, c), Cr(e, n, c)) : (qe && i && Fc(n), (n.flags |= 1), Yt(e, n, a, c), n.child)
    )
  }
  function mg(e, n, a, i, c, d) {
    return (
      Ba(n),
      (n.updateQueue = null),
      (a = hm(n, i, a, c)),
      pm(e),
      (i = uf()),
      e !== null && !jt ? (cf(e, n, d), Cr(e, n, d)) : (qe && i && Fc(n), (n.flags |= 1), Yt(e, n, a, d), n.child)
    )
  }
  function gg(e, n, a, i, c) {
    if ((Ba(n), n.stateNode === null)) {
      var d = sl,
        y = a.contextType
      ;(typeof y == 'object' && y !== null && (d = Qt(y)),
        (d = new a(i, d)),
        (n.memoizedState = d.state !== null && d.state !== void 0 ? d.state : null),
        (d.updater = Tf),
        (n.stateNode = d),
        (d._reactInternals = n),
        (d = n.stateNode),
        (d.props = i),
        (d.state = n.memoizedState),
        (d.refs = {}),
        ef(n),
        (y = a.contextType),
        (d.context = typeof y == 'object' && y !== null ? Qt(y) : sl),
        (d.state = n.memoizedState),
        (y = a.getDerivedStateFromProps),
        typeof y == 'function' && (Ef(n, a, y, i), (d.state = n.memoizedState)),
        typeof a.getDerivedStateFromProps == 'function' ||
          typeof d.getSnapshotBeforeUpdate == 'function' ||
          (typeof d.UNSAFE_componentWillMount != 'function' && typeof d.componentWillMount != 'function') ||
          ((y = d.state),
          typeof d.componentWillMount == 'function' && d.componentWillMount(),
          typeof d.UNSAFE_componentWillMount == 'function' && d.UNSAFE_componentWillMount(),
          y !== d.state && Tf.enqueueReplaceState(d, d.state, null),
          Oo(n, i, d, c),
          Ao(),
          (d.state = n.memoizedState)),
        typeof d.componentDidMount == 'function' && (n.flags |= 4194308),
        (i = !0))
    } else if (e === null) {
      d = n.stateNode
      var E = n.memoizedProps,
        B = ka(a, E)
      d.props = B
      var Y = d.context,
        ne = a.contextType
      ;((y = sl), typeof ne == 'object' && ne !== null && (y = Qt(ne)))
      var ae = a.getDerivedStateFromProps
      ;((ne = typeof ae == 'function' || typeof d.getSnapshotBeforeUpdate == 'function'),
        (E = n.pendingProps !== E),
        ne ||
          (typeof d.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof d.componentWillReceiveProps != 'function') ||
          ((E || Y !== y) && ng(n, d, i, y)),
        (Kr = !1))
      var K = n.memoizedState
      ;((d.state = K),
        Oo(n, i, d, c),
        Ao(),
        (Y = n.memoizedState),
        E || K !== Y || Kr
          ? (typeof ae == 'function' && (Ef(n, a, ae, i), (Y = n.memoizedState)),
            (B = Kr || tg(n, a, B, i, K, Y, y))
              ? (ne ||
                  (typeof d.UNSAFE_componentWillMount != 'function' && typeof d.componentWillMount != 'function') ||
                  (typeof d.componentWillMount == 'function' && d.componentWillMount(),
                  typeof d.UNSAFE_componentWillMount == 'function' && d.UNSAFE_componentWillMount()),
                typeof d.componentDidMount == 'function' && (n.flags |= 4194308))
              : (typeof d.componentDidMount == 'function' && (n.flags |= 4194308),
                (n.memoizedProps = i),
                (n.memoizedState = Y)),
            (d.props = i),
            (d.state = Y),
            (d.context = y),
            (i = B))
          : (typeof d.componentDidMount == 'function' && (n.flags |= 4194308), (i = !1)))
    } else {
      ;((d = n.stateNode),
        tf(e, n),
        (y = n.memoizedProps),
        (ne = ka(a, y)),
        (d.props = ne),
        (ae = n.pendingProps),
        (K = d.context),
        (Y = a.contextType),
        (B = sl),
        typeof Y == 'object' && Y !== null && (B = Qt(Y)),
        (E = a.getDerivedStateFromProps),
        (Y = typeof E == 'function' || typeof d.getSnapshotBeforeUpdate == 'function') ||
          (typeof d.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof d.componentWillReceiveProps != 'function') ||
          ((y !== ae || K !== B) && ng(n, d, i, B)),
        (Kr = !1),
        (K = n.memoizedState),
        (d.state = K),
        Oo(n, i, d, c),
        Ao())
      var X = n.memoizedState
      y !== ae || K !== X || Kr || (e !== null && e.dependencies !== null && us(e.dependencies))
        ? (typeof E == 'function' && (Ef(n, a, E, i), (X = n.memoizedState)),
          (ne = Kr || tg(n, a, ne, i, K, X, B) || (e !== null && e.dependencies !== null && us(e.dependencies)))
            ? (Y ||
                (typeof d.UNSAFE_componentWillUpdate != 'function' && typeof d.componentWillUpdate != 'function') ||
                (typeof d.componentWillUpdate == 'function' && d.componentWillUpdate(i, X, B),
                typeof d.UNSAFE_componentWillUpdate == 'function' && d.UNSAFE_componentWillUpdate(i, X, B)),
              typeof d.componentDidUpdate == 'function' && (n.flags |= 4),
              typeof d.getSnapshotBeforeUpdate == 'function' && (n.flags |= 1024))
            : (typeof d.componentDidUpdate != 'function' ||
                (y === e.memoizedProps && K === e.memoizedState) ||
                (n.flags |= 4),
              typeof d.getSnapshotBeforeUpdate != 'function' ||
                (y === e.memoizedProps && K === e.memoizedState) ||
                (n.flags |= 1024),
              (n.memoizedProps = i),
              (n.memoizedState = X)),
          (d.props = i),
          (d.state = X),
          (d.context = B),
          (i = ne))
        : (typeof d.componentDidUpdate != 'function' ||
            (y === e.memoizedProps && K === e.memoizedState) ||
            (n.flags |= 4),
          typeof d.getSnapshotBeforeUpdate != 'function' ||
            (y === e.memoizedProps && K === e.memoizedState) ||
            (n.flags |= 1024),
          (i = !1))
    }
    return (
      (d = i),
      Os(e, n),
      (i = (n.flags & 128) !== 0),
      d || i
        ? ((d = n.stateNode),
          (a = i && typeof a.getDerivedStateFromError != 'function' ? null : d.render()),
          (n.flags |= 1),
          e !== null && i ? ((n.child = bl(n, e.child, null, c)), (n.child = bl(n, null, a, c))) : Yt(e, n, a, c),
          (n.memoizedState = d.state),
          (e = n.child))
        : (e = Cr(e, n, c)),
      e
    )
  }
  function yg(e, n, a, i) {
    return (vo(), (n.flags |= 256), Yt(e, n, a, i), n.child)
  }
  var Af = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null }
  function Of(e) {
    return { baseLanes: e, cachePool: am() }
  }
  function Mf(e, n, a) {
    return ((e = e !== null ? e.childLanes & ~a : 0), n && (e |= zn), e)
  }
  function bg(e, n, a) {
    var i = n.pendingProps,
      c = !1,
      d = (n.flags & 128) !== 0,
      y
    if (
      ((y = d) || (y = e !== null && e.memoizedState === null ? !1 : (zt.current & 2) !== 0),
      y && ((c = !0), (n.flags &= -129)),
      (y = (n.flags & 32) !== 0),
      (n.flags &= -33),
      e === null)
    ) {
      if (qe) {
        if ((c ? Wr(n) : Jr(), qe)) {
          var E = bt,
            B
          if ((B = E)) {
            e: {
              for (B = E, E = Qn; B.nodeType !== 8;) {
                if (!E) {
                  E = null
                  break e
                }
                if (((B = qn(B.nextSibling)), B === null)) {
                  E = null
                  break e
                }
              }
              E = B
            }
            E !== null
              ? ((n.memoizedState = {
                  dehydrated: E,
                  treeContext: Oa !== null ? { id: vr, overflow: Sr } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (B = bn(18, null, null, 0)),
                (B.stateNode = E),
                (B.return = n),
                (n.child = B),
                (rn = n),
                (bt = null),
                (B = !0))
              : (B = !1)
          }
          B || Na(n)
        }
        if (((E = n.memoizedState), E !== null && ((E = E.dehydrated), E !== null)))
          return (dd(E) ? (n.lanes = 32) : (n.lanes = 536870912), null)
        Tr(n)
      }
      return (
        (E = i.children),
        (i = i.fallback),
        c
          ? (Jr(),
            (c = n.mode),
            (E = Ms({ mode: 'hidden', children: E }, c)),
            (i = Aa(i, c, a, null)),
            (E.return = n),
            (i.return = n),
            (E.sibling = i),
            (n.child = E),
            (c = n.child),
            (c.memoizedState = Of(a)),
            (c.childLanes = Mf(e, y, a)),
            (n.memoizedState = Af),
            i)
          : (Wr(n), _f(n, E))
      )
    }
    if (((B = e.memoizedState), B !== null && ((E = B.dehydrated), E !== null))) {
      if (d)
        n.flags & 256
          ? (Wr(n), (n.flags &= -257), (n = Nf(e, n, a)))
          : n.memoizedState !== null
            ? (Jr(), (n.child = e.child), (n.flags |= 128), (n = null))
            : (Jr(),
              (c = i.fallback),
              (E = n.mode),
              (i = Ms({ mode: 'visible', children: i.children }, E)),
              (c = Aa(c, E, a, null)),
              (c.flags |= 2),
              (i.return = n),
              (c.return = n),
              (i.sibling = c),
              (n.child = i),
              bl(n, e.child, null, a),
              (i = n.child),
              (i.memoizedState = Of(a)),
              (i.childLanes = Mf(e, y, a)),
              (n.memoizedState = Af),
              (n = c))
      else if ((Wr(n), dd(E))) {
        if (((y = E.nextSibling && E.nextSibling.dataset), y)) var Y = y.dgst
        ;((y = Y),
          (i = Error(o(419))),
          (i.stack = ''),
          (i.digest = y),
          So({ value: i, source: null, stack: null }),
          (n = Nf(e, n, a)))
      } else if ((jt || xo(e, n, a, !1), (y = (a & e.childLanes) !== 0), jt || y)) {
        if (
          ((y = ft),
          y !== null &&
            ((i = a & -a),
            (i = (i & 42) !== 0 ? 1 : Xa(i)),
            (i = (i & (y.suspendedLanes | a)) !== 0 ? 0 : i),
            i !== 0 && i !== B.retryLane))
        )
          throw ((B.retryLane = i), il(e, i), En(y, e, i), ug)
        ;(E.data === '$?' || Xf(), (n = Nf(e, n, a)))
      } else
        E.data === '$?'
          ? ((n.flags |= 192), (n.child = e.child), (n = null))
          : ((e = B.treeContext),
            (bt = qn(E.nextSibling)),
            (rn = n),
            (qe = !0),
            (_a = null),
            (Qn = !1),
            e !== null && ((Nn[Dn++] = vr), (Nn[Dn++] = Sr), (Nn[Dn++] = Oa), (vr = e.id), (Sr = e.overflow), (Oa = n)),
            (n = _f(n, i.children)),
            (n.flags |= 4096))
      return n
    }
    return c
      ? (Jr(),
        (c = i.fallback),
        (E = n.mode),
        (B = e.child),
        (Y = B.sibling),
        (i = br(B, { mode: 'hidden', children: i.children })),
        (i.subtreeFlags = B.subtreeFlags & 65011712),
        Y !== null ? (c = br(Y, c)) : ((c = Aa(c, E, a, null)), (c.flags |= 2)),
        (c.return = n),
        (i.return = n),
        (i.sibling = c),
        (n.child = i),
        (i = c),
        (c = n.child),
        (E = e.child.memoizedState),
        E === null
          ? (E = Of(a))
          : ((B = E.cachePool),
            B !== null ? ((Y = Bt._currentValue), (B = B.parent !== Y ? { parent: Y, pool: Y } : B)) : (B = am()),
            (E = { baseLanes: E.baseLanes | a, cachePool: B })),
        (c.memoizedState = E),
        (c.childLanes = Mf(e, y, a)),
        (n.memoizedState = Af),
        i)
      : (Wr(n),
        (a = e.child),
        (e = a.sibling),
        (a = br(a, { mode: 'visible', children: i.children })),
        (a.return = n),
        (a.sibling = null),
        e !== null && ((y = n.deletions), y === null ? ((n.deletions = [e]), (n.flags |= 16)) : y.push(e)),
        (n.child = a),
        (n.memoizedState = null),
        a)
  }
  function _f(e, n) {
    return ((n = Ms({ mode: 'visible', children: n }, e.mode)), (n.return = e), (e.child = n))
  }
  function Ms(e, n) {
    return (
      (e = bn(22, e, null, n)),
      (e.lanes = 0),
      (e.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }),
      e
    )
  }
  function Nf(e, n, a) {
    return (bl(n, e.child, null, a), (e = _f(n, n.pendingProps.children)), (e.flags |= 2), (n.memoizedState = null), e)
  }
  function vg(e, n, a) {
    e.lanes |= n
    var i = e.alternate
    ;(i !== null && (i.lanes |= n), Kc(e.return, n, a))
  }
  function Df(e, n, a, i, c) {
    var d = e.memoizedState
    d === null
      ? (e.memoizedState = { isBackwards: n, rendering: null, renderingStartTime: 0, last: i, tail: a, tailMode: c })
      : ((d.isBackwards = n),
        (d.rendering = null),
        (d.renderingStartTime = 0),
        (d.last = i),
        (d.tail = a),
        (d.tailMode = c))
  }
  function Sg(e, n, a) {
    var i = n.pendingProps,
      c = i.revealOrder,
      d = i.tail
    if ((Yt(e, n, i.children, a), (i = zt.current), (i & 2) !== 0)) ((i = (i & 1) | 2), (n.flags |= 128))
    else {
      if (e !== null && (e.flags & 128) !== 0)
        e: for (e = n.child; e !== null;) {
          if (e.tag === 13) e.memoizedState !== null && vg(e, a, n)
          else if (e.tag === 19) vg(e, a, n)
          else if (e.child !== null) {
            ;((e.child.return = e), (e = e.child))
            continue
          }
          if (e === n) break e
          for (; e.sibling === null;) {
            if (e.return === null || e.return === n) break e
            e = e.return
          }
          ;((e.sibling.return = e.return), (e = e.sibling))
        }
      i &= 1
    }
    switch ((te(zt, i), c)) {
      case 'forwards':
        for (a = n.child, c = null; a !== null;)
          ((e = a.alternate), e !== null && Cs(e) === null && (c = a), (a = a.sibling))
        ;((a = c),
          a === null ? ((c = n.child), (n.child = null)) : ((c = a.sibling), (a.sibling = null)),
          Df(n, !1, c, a, d))
        break
      case 'backwards':
        for (a = null, c = n.child, n.child = null; c !== null;) {
          if (((e = c.alternate), e !== null && Cs(e) === null)) {
            n.child = c
            break
          }
          ;((e = c.sibling), (c.sibling = a), (a = c), (c = e))
        }
        Df(n, !0, a, null, d)
        break
      case 'together':
        Df(n, !1, null, null, void 0)
        break
      default:
        n.memoizedState = null
    }
    return n.child
  }
  function Cr(e, n, a) {
    if ((e !== null && (n.dependencies = e.dependencies), (aa |= n.lanes), (a & n.childLanes) === 0))
      if (e !== null) {
        if ((xo(e, n, a, !1), (a & n.childLanes) === 0)) return null
      } else return null
    if (e !== null && n.child !== e.child) throw Error(o(153))
    if (n.child !== null) {
      for (e = n.child, a = br(e, e.pendingProps), n.child = a, a.return = n; e.sibling !== null;)
        ((e = e.sibling), (a = a.sibling = br(e, e.pendingProps)), (a.return = n))
      a.sibling = null
    }
    return n.child
  }
  function Bf(e, n) {
    return (e.lanes & n) !== 0 ? !0 : ((e = e.dependencies), !!(e !== null && us(e)))
  }
  function JS(e, n, a) {
    switch (n.tag) {
      case 3:
        ;(fe(n, n.stateNode.containerInfo), Gr(n, Bt, e.memoizedState.cache), vo())
        break
      case 27:
      case 5:
        Me(n)
        break
      case 4:
        fe(n, n.stateNode.containerInfo)
        break
      case 10:
        Gr(n, n.type, n.memoizedProps.value)
        break
      case 13:
        var i = n.memoizedState
        if (i !== null)
          return i.dehydrated !== null
            ? (Wr(n), (n.flags |= 128), null)
            : (a & n.child.childLanes) !== 0
              ? bg(e, n, a)
              : (Wr(n), (e = Cr(e, n, a)), e !== null ? e.sibling : null)
        Wr(n)
        break
      case 19:
        var c = (e.flags & 128) !== 0
        if (((i = (a & n.childLanes) !== 0), i || (xo(e, n, a, !1), (i = (a & n.childLanes) !== 0)), c)) {
          if (i) return Sg(e, n, a)
          n.flags |= 128
        }
        if (
          ((c = n.memoizedState),
          c !== null && ((c.rendering = null), (c.tail = null), (c.lastEffect = null)),
          te(zt, zt.current),
          i)
        )
          break
        return null
      case 22:
      case 23:
        return ((n.lanes = 0), pg(e, n, a))
      case 24:
        Gr(n, Bt, e.memoizedState.cache)
    }
    return Cr(e, n, a)
  }
  function xg(e, n, a) {
    if (e !== null)
      if (e.memoizedProps !== n.pendingProps) jt = !0
      else {
        if (!Bf(e, a) && (n.flags & 128) === 0) return ((jt = !1), JS(e, n, a))
        jt = (e.flags & 131072) !== 0
      }
    else ((jt = !1), qe && (n.flags & 1048576) !== 0 && Zh(n, ss, n.index))
    switch (((n.lanes = 0), n.tag)) {
      case 16:
        e: {
          e = n.pendingProps
          var i = n.elementType,
            c = i._init
          if (((i = c(i._payload)), (n.type = i), typeof i == 'function'))
            Pc(i)
              ? ((e = ka(i, e)), (n.tag = 1), (n = gg(null, n, i, e, a)))
              : ((n.tag = 0), (n = wf(null, n, i, e, a)))
          else {
            if (i != null) {
              if (((c = i.$$typeof), c === z)) {
                ;((n.tag = 11), (n = cg(null, n, i, e, a)))
                break e
              } else if (c === V) {
                ;((n.tag = 14), (n = fg(null, n, i, e, a)))
                break e
              }
            }
            throw ((n = L(i) || i), Error(o(306, n, '')))
          }
        }
        return n
      case 0:
        return wf(e, n, n.type, n.pendingProps, a)
      case 1:
        return ((i = n.type), (c = ka(i, n.pendingProps)), gg(e, n, i, c, a))
      case 3:
        e: {
          if ((fe(n, n.stateNode.containerInfo), e === null)) throw Error(o(387))
          i = n.pendingProps
          var d = n.memoizedState
          ;((c = d.element), tf(e, n), Oo(n, i, null, a))
          var y = n.memoizedState
          if (((i = y.cache), Gr(n, Bt, i), i !== d.cache && Xc(n, [Bt], a, !0), Ao(), (i = y.element), d.isDehydrated))
            if (
              ((d = { element: i, isDehydrated: !1, cache: y.cache }),
              (n.updateQueue.baseState = d),
              (n.memoizedState = d),
              n.flags & 256)
            ) {
              n = yg(e, n, i, a)
              break e
            } else if (i !== c) {
              ;((c = Mn(Error(o(424)), n)), So(c), (n = yg(e, n, i, a)))
              break e
            } else {
              switch (((e = n.stateNode.containerInfo), e.nodeType)) {
                case 9:
                  e = e.body
                  break
                default:
                  e = e.nodeName === 'HTML' ? e.ownerDocument.body : e
              }
              for (bt = qn(e.firstChild), rn = n, qe = !0, _a = null, Qn = !0, a = Jm(n, null, i, a), n.child = a; a;)
                ((a.flags = (a.flags & -3) | 4096), (a = a.sibling))
            }
          else {
            if ((vo(), i === c)) {
              n = Cr(e, n, a)
              break e
            }
            Yt(e, n, i, a)
          }
          n = n.child
        }
        return n
      case 26:
        return (
          Os(e, n),
          e === null
            ? (a = Cy(n.type, null, n.pendingProps, null))
              ? (n.memoizedState = a)
              : qe ||
                ((a = n.type),
                (e = n.pendingProps),
                (i = Is(le.current).createElement(a)),
                (i[Dt] = n),
                (i[Lt] = e),
                Gt(i, a, e),
                Rt(i),
                (n.stateNode = i))
            : (n.memoizedState = Cy(n.type, e.memoizedProps, n.pendingProps, e.memoizedState)),
          null
        )
      case 27:
        return (
          Me(n),
          e === null &&
            qe &&
            ((i = n.stateNode = Ry(n.type, n.pendingProps, le.current)),
            (rn = n),
            (Qn = !0),
            (c = bt),
            sa(n.type) ? ((pd = c), (bt = qn(i.firstChild))) : (bt = c)),
          Yt(e, n, n.pendingProps.children, a),
          Os(e, n),
          e === null && (n.flags |= 4194304),
          n.child
        )
      case 5:
        return (
          e === null &&
            qe &&
            ((c = i = bt) &&
              ((i = Ax(i, n.type, n.pendingProps, Qn)),
              i !== null ? ((n.stateNode = i), (rn = n), (bt = qn(i.firstChild)), (Qn = !1), (c = !0)) : (c = !1)),
            c || Na(n)),
          Me(n),
          (c = n.type),
          (d = n.pendingProps),
          (y = e !== null ? e.memoizedProps : null),
          (i = d.children),
          ud(c, d) ? (i = null) : y !== null && ud(c, y) && (n.flags |= 32),
          n.memoizedState !== null && ((c = sf(e, n, YS, null, null, a)), (Qo._currentValue = c)),
          Os(e, n),
          Yt(e, n, i, a),
          n.child
        )
      case 6:
        return (
          e === null &&
            qe &&
            ((e = a = bt) &&
              ((a = Ox(a, n.pendingProps, Qn)),
              a !== null ? ((n.stateNode = a), (rn = n), (bt = null), (e = !0)) : (e = !1)),
            e || Na(n)),
          null
        )
      case 13:
        return bg(e, n, a)
      case 4:
        return (
          fe(n, n.stateNode.containerInfo),
          (i = n.pendingProps),
          e === null ? (n.child = bl(n, null, i, a)) : Yt(e, n, i, a),
          n.child
        )
      case 11:
        return cg(e, n, n.type, n.pendingProps, a)
      case 7:
        return (Yt(e, n, n.pendingProps, a), n.child)
      case 8:
        return (Yt(e, n, n.pendingProps.children, a), n.child)
      case 12:
        return (Yt(e, n, n.pendingProps.children, a), n.child)
      case 10:
        return ((i = n.pendingProps), Gr(n, n.type, i.value), Yt(e, n, i.children, a), n.child)
      case 9:
        return (
          (c = n.type._context),
          (i = n.pendingProps.children),
          Ba(n),
          (c = Qt(c)),
          (i = i(c)),
          (n.flags |= 1),
          Yt(e, n, i, a),
          n.child
        )
      case 14:
        return fg(e, n, n.type, n.pendingProps, a)
      case 15:
        return dg(e, n, n.type, n.pendingProps, a)
      case 19:
        return Sg(e, n, a)
      case 31:
        return (
          (i = n.pendingProps),
          (a = n.mode),
          (i = { mode: i.mode, children: i.children }),
          e === null
            ? ((a = Ms(i, a)), (a.ref = n.ref), (n.child = a), (a.return = n), (n = a))
            : ((a = br(e.child, i)), (a.ref = n.ref), (n.child = a), (a.return = n), (n = a)),
          n
        )
      case 22:
        return pg(e, n, a)
      case 24:
        return (
          Ba(n),
          (i = Qt(Bt)),
          e === null
            ? ((c = Wc()),
              c === null &&
                ((c = ft),
                (d = Qc()),
                (c.pooledCache = d),
                d.refCount++,
                d !== null && (c.pooledCacheLanes |= a),
                (c = d)),
              (n.memoizedState = { parent: i, cache: c }),
              ef(n),
              Gr(n, Bt, c))
            : ((e.lanes & a) !== 0 && (tf(e, n), Oo(n, null, null, a), Ao()),
              (c = e.memoizedState),
              (d = n.memoizedState),
              c.parent !== i
                ? ((c = { parent: i, cache: i }),
                  (n.memoizedState = c),
                  n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = c),
                  Gr(n, Bt, i))
                : ((i = d.cache), Gr(n, Bt, i), i !== c.cache && Xc(n, [Bt], a, !0))),
          Yt(e, n, n.pendingProps.children, a),
          n.child
        )
      case 29:
        throw n.pendingProps
    }
    throw Error(o(156, n.tag))
  }
  function wr(e) {
    e.flags |= 4
  }
  function Rg(e, n) {
    if (n.type !== 'stylesheet' || (n.state.loading & 4) !== 0) e.flags &= -16777217
    else if (((e.flags |= 16777216), !_y(n))) {
      if (
        ((n = Bn.current),
        n !== null &&
          (($e & 4194048) === $e ? Zn !== null : (($e & 62914560) !== $e && ($e & 536870912) === 0) || n !== Zn))
      )
        throw ((Co = Jc), lm)
      e.flags |= 8192
    }
  }
  function _s(e, n) {
    ;(n !== null && (e.flags |= 4),
      e.flags & 16384 && ((n = e.tag !== 22 ? Yi() : 536870912), (e.lanes |= n), (Rl |= n)))
  }
  function Uo(e, n) {
    if (!qe)
      switch (e.tailMode) {
        case 'hidden':
          n = e.tail
          for (var a = null; n !== null;) (n.alternate !== null && (a = n), (n = n.sibling))
          a === null ? (e.tail = null) : (a.sibling = null)
          break
        case 'collapsed':
          a = e.tail
          for (var i = null; a !== null;) (a.alternate !== null && (i = a), (a = a.sibling))
          i === null ? (n || e.tail === null ? (e.tail = null) : (e.tail.sibling = null)) : (i.sibling = null)
      }
  }
  function yt(e) {
    var n = e.alternate !== null && e.alternate.child === e.child,
      a = 0,
      i = 0
    if (n)
      for (var c = e.child; c !== null;)
        ((a |= c.lanes | c.childLanes),
          (i |= c.subtreeFlags & 65011712),
          (i |= c.flags & 65011712),
          (c.return = e),
          (c = c.sibling))
    else
      for (c = e.child; c !== null;)
        ((a |= c.lanes | c.childLanes), (i |= c.subtreeFlags), (i |= c.flags), (c.return = e), (c = c.sibling))
    return ((e.subtreeFlags |= i), (e.childLanes = a), n)
  }
  function ex(e, n, a) {
    var i = n.pendingProps
    switch ((Yc(n), n.tag)) {
      case 31:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (yt(n), null)
      case 1:
        return (yt(n), null)
      case 3:
        return (
          (a = n.stateNode),
          (i = null),
          e !== null && (i = e.memoizedState.cache),
          n.memoizedState.cache !== i && (n.flags |= 2048),
          Rr(Bt),
          Se(),
          a.pendingContext && ((a.context = a.pendingContext), (a.pendingContext = null)),
          (e === null || e.child === null) &&
            (bo(n)
              ? wr(n)
              : e === null || (e.memoizedState.isDehydrated && (n.flags & 256) === 0) || ((n.flags |= 1024), em())),
          yt(n),
          null
        )
      case 26:
        return (
          (a = n.memoizedState),
          e === null
            ? (wr(n), a !== null ? (yt(n), Rg(n, a)) : (yt(n), (n.flags &= -16777217)))
            : a
              ? a !== e.memoizedState
                ? (wr(n), yt(n), Rg(n, a))
                : (yt(n), (n.flags &= -16777217))
              : (e.memoizedProps !== i && wr(n), yt(n), (n.flags &= -16777217)),
          null
        )
      case 27:
        ;(Ye(n), (a = le.current))
        var c = n.type
        if (e !== null && n.stateNode != null) e.memoizedProps !== i && wr(n)
        else {
          if (!i) {
            if (n.stateNode === null) throw Error(o(166))
            return (yt(n), null)
          }
          ;((e = ie.current), bo(n) ? Wh(n) : ((e = Ry(c, i, a)), (n.stateNode = e), wr(n)))
        }
        return (yt(n), null)
      case 5:
        if ((Ye(n), (a = n.type), e !== null && n.stateNode != null)) e.memoizedProps !== i && wr(n)
        else {
          if (!i) {
            if (n.stateNode === null) throw Error(o(166))
            return (yt(n), null)
          }
          if (((e = ie.current), bo(n))) Wh(n)
          else {
            switch (((c = Is(le.current)), e)) {
              case 1:
                e = c.createElementNS('http://www.w3.org/2000/svg', a)
                break
              case 2:
                e = c.createElementNS('http://www.w3.org/1998/Math/MathML', a)
                break
              default:
                switch (a) {
                  case 'svg':
                    e = c.createElementNS('http://www.w3.org/2000/svg', a)
                    break
                  case 'math':
                    e = c.createElementNS('http://www.w3.org/1998/Math/MathML', a)
                    break
                  case 'script':
                    ;((e = c.createElement('div')),
                      (e.innerHTML = '<script><\/script>'),
                      (e = e.removeChild(e.firstChild)))
                    break
                  case 'select':
                    ;((e =
                      typeof i.is == 'string' ? c.createElement('select', { is: i.is }) : c.createElement('select')),
                      i.multiple ? (e.multiple = !0) : i.size && (e.size = i.size))
                    break
                  default:
                    e = typeof i.is == 'string' ? c.createElement(a, { is: i.is }) : c.createElement(a)
                }
            }
            ;((e[Dt] = n), (e[Lt] = i))
            e: for (c = n.child; c !== null;) {
              if (c.tag === 5 || c.tag === 6) e.appendChild(c.stateNode)
              else if (c.tag !== 4 && c.tag !== 27 && c.child !== null) {
                ;((c.child.return = c), (c = c.child))
                continue
              }
              if (c === n) break e
              for (; c.sibling === null;) {
                if (c.return === null || c.return === n) break e
                c = c.return
              }
              ;((c.sibling.return = c.return), (c = c.sibling))
            }
            n.stateNode = e
            e: switch ((Gt(e, a, i), a)) {
              case 'button':
              case 'input':
              case 'select':
              case 'textarea':
                e = !!i.autoFocus
                break e
              case 'img':
                e = !0
                break e
              default:
                e = !1
            }
            e && wr(n)
          }
        }
        return (yt(n), (n.flags &= -16777217), null)
      case 6:
        if (e && n.stateNode != null) e.memoizedProps !== i && wr(n)
        else {
          if (typeof i != 'string' && n.stateNode === null) throw Error(o(166))
          if (((e = le.current), bo(n))) {
            if (((e = n.stateNode), (a = n.memoizedProps), (i = null), (c = rn), c !== null))
              switch (c.tag) {
                case 27:
                case 5:
                  i = c.memoizedProps
              }
            ;((e[Dt] = n),
              (e = !!(e.nodeValue === a || (i !== null && i.suppressHydrationWarning === !0) || my(e.nodeValue, a))),
              e || Na(n))
          } else ((e = Is(e).createTextNode(i)), (e[Dt] = n), (n.stateNode = e))
        }
        return (yt(n), null)
      case 13:
        if (((i = n.memoizedState), e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))) {
          if (((c = bo(n)), i !== null && i.dehydrated !== null)) {
            if (e === null) {
              if (!c) throw Error(o(318))
              if (((c = n.memoizedState), (c = c !== null ? c.dehydrated : null), !c)) throw Error(o(317))
              c[Dt] = n
            } else (vo(), (n.flags & 128) === 0 && (n.memoizedState = null), (n.flags |= 4))
            ;(yt(n), (c = !1))
          } else ((c = em()), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = c), (c = !0))
          if (!c) return n.flags & 256 ? (Tr(n), n) : (Tr(n), null)
        }
        if ((Tr(n), (n.flags & 128) !== 0)) return ((n.lanes = a), n)
        if (((a = i !== null), (e = e !== null && e.memoizedState !== null), a)) {
          ;((i = n.child),
            (c = null),
            i.alternate !== null &&
              i.alternate.memoizedState !== null &&
              i.alternate.memoizedState.cachePool !== null &&
              (c = i.alternate.memoizedState.cachePool.pool))
          var d = null
          ;(i.memoizedState !== null && i.memoizedState.cachePool !== null && (d = i.memoizedState.cachePool.pool),
            d !== c && (i.flags |= 2048))
        }
        return (a !== e && a && (n.child.flags |= 8192), _s(n, n.updateQueue), yt(n), null)
      case 4:
        return (Se(), e === null && ad(n.stateNode.containerInfo), yt(n), null)
      case 10:
        return (Rr(n.type), yt(n), null)
      case 19:
        if ((ee(zt), (c = n.memoizedState), c === null)) return (yt(n), null)
        if (((i = (n.flags & 128) !== 0), (d = c.rendering), d === null))
          if (i) Uo(c, !1)
          else {
            if (vt !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = n.child; e !== null;) {
                if (((d = Cs(e)), d !== null)) {
                  for (
                    n.flags |= 128,
                      Uo(c, !1),
                      e = d.updateQueue,
                      n.updateQueue = e,
                      _s(n, e),
                      n.subtreeFlags = 0,
                      e = a,
                      a = n.child;
                    a !== null;
                  )
                    (Qh(a, e), (a = a.sibling))
                  return (te(zt, (zt.current & 1) | 2), n.child)
                }
                e = e.sibling
              }
            c.tail !== null && Te() > Bs && ((n.flags |= 128), (i = !0), Uo(c, !1), (n.lanes = 4194304))
          }
        else {
          if (!i)
            if (((e = Cs(d)), e !== null)) {
              if (
                ((n.flags |= 128),
                (i = !0),
                (e = e.updateQueue),
                (n.updateQueue = e),
                _s(n, e),
                Uo(c, !0),
                c.tail === null && c.tailMode === 'hidden' && !d.alternate && !qe)
              )
                return (yt(n), null)
            } else
              2 * Te() - c.renderingStartTime > Bs &&
                a !== 536870912 &&
                ((n.flags |= 128), (i = !0), Uo(c, !1), (n.lanes = 4194304))
          c.isBackwards
            ? ((d.sibling = n.child), (n.child = d))
            : ((e = c.last), e !== null ? (e.sibling = d) : (n.child = d), (c.last = d))
        }
        return c.tail !== null
          ? ((n = c.tail),
            (c.rendering = n),
            (c.tail = n.sibling),
            (c.renderingStartTime = Te()),
            (n.sibling = null),
            (e = zt.current),
            te(zt, i ? (e & 1) | 2 : e & 1),
            n)
          : (yt(n), null)
      case 22:
      case 23:
        return (
          Tr(n),
          lf(),
          (i = n.memoizedState !== null),
          e !== null ? (e.memoizedState !== null) !== i && (n.flags |= 8192) : i && (n.flags |= 8192),
          i
            ? (a & 536870912) !== 0 && (n.flags & 128) === 0 && (yt(n), n.subtreeFlags & 6 && (n.flags |= 8192))
            : yt(n),
          (a = n.updateQueue),
          a !== null && _s(n, a.retryQueue),
          (a = null),
          e !== null &&
            e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (a = e.memoizedState.cachePool.pool),
          (i = null),
          n.memoizedState !== null && n.memoizedState.cachePool !== null && (i = n.memoizedState.cachePool.pool),
          i !== a && (n.flags |= 2048),
          e !== null && ee(za),
          null
        )
      case 24:
        return (
          (a = null),
          e !== null && (a = e.memoizedState.cache),
          n.memoizedState.cache !== a && (n.flags |= 2048),
          Rr(Bt),
          yt(n),
          null
        )
      case 25:
        return null
      case 30:
        return null
    }
    throw Error(o(156, n.tag))
  }
  function tx(e, n) {
    switch ((Yc(n), n.tag)) {
      case 1:
        return ((e = n.flags), e & 65536 ? ((n.flags = (e & -65537) | 128), n) : null)
      case 3:
        return (
          Rr(Bt),
          Se(),
          (e = n.flags),
          (e & 65536) !== 0 && (e & 128) === 0 ? ((n.flags = (e & -65537) | 128), n) : null
        )
      case 26:
      case 27:
      case 5:
        return (Ye(n), null)
      case 13:
        if ((Tr(n), (e = n.memoizedState), e !== null && e.dehydrated !== null)) {
          if (n.alternate === null) throw Error(o(340))
          vo()
        }
        return ((e = n.flags), e & 65536 ? ((n.flags = (e & -65537) | 128), n) : null)
      case 19:
        return (ee(zt), null)
      case 4:
        return (Se(), null)
      case 10:
        return (Rr(n.type), null)
      case 22:
      case 23:
        return (
          Tr(n),
          lf(),
          e !== null && ee(za),
          (e = n.flags),
          e & 65536 ? ((n.flags = (e & -65537) | 128), n) : null
        )
      case 24:
        return (Rr(Bt), null)
      case 25:
        return null
      default:
        return null
    }
  }
  function Eg(e, n) {
    switch ((Yc(n), n.tag)) {
      case 3:
        ;(Rr(Bt), Se())
        break
      case 26:
      case 27:
      case 5:
        Ye(n)
        break
      case 4:
        Se()
        break
      case 13:
        Tr(n)
        break
      case 19:
        ee(zt)
        break
      case 10:
        Rr(n.type)
        break
      case 22:
      case 23:
        ;(Tr(n), lf(), e !== null && ee(za))
        break
      case 24:
        Rr(Bt)
    }
  }
  function ko(e, n) {
    try {
      var a = n.updateQueue,
        i = a !== null ? a.lastEffect : null
      if (i !== null) {
        var c = i.next
        a = c
        do {
          if ((a.tag & e) === e) {
            i = void 0
            var d = a.create,
              y = a.inst
            ;((i = d()), (y.destroy = i))
          }
          a = a.next
        } while (a !== c)
      }
    } catch (E) {
      st(n, n.return, E)
    }
  }
  function ea(e, n, a) {
    try {
      var i = n.updateQueue,
        c = i !== null ? i.lastEffect : null
      if (c !== null) {
        var d = c.next
        i = d
        do {
          if ((i.tag & e) === e) {
            var y = i.inst,
              E = y.destroy
            if (E !== void 0) {
              ;((y.destroy = void 0), (c = n))
              var B = a,
                Y = E
              try {
                Y()
              } catch (ne) {
                st(c, B, ne)
              }
            }
          }
          i = i.next
        } while (i !== d)
      }
    } catch (ne) {
      st(n, n.return, ne)
    }
  }
  function Tg(e) {
    var n = e.updateQueue
    if (n !== null) {
      var a = e.stateNode
      try {
        fm(n, a)
      } catch (i) {
        st(e, e.return, i)
      }
    }
  }
  function Cg(e, n, a) {
    ;((a.props = ka(e.type, e.memoizedProps)), (a.state = e.memoizedState))
    try {
      a.componentWillUnmount()
    } catch (i) {
      st(e, n, i)
    }
  }
  function Lo(e, n) {
    try {
      var a = e.ref
      if (a !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var i = e.stateNode
            break
          case 30:
            i = e.stateNode
            break
          default:
            i = e.stateNode
        }
        typeof a == 'function' ? (e.refCleanup = a(i)) : (a.current = i)
      }
    } catch (c) {
      st(e, n, c)
    }
  }
  function Wn(e, n) {
    var a = e.ref,
      i = e.refCleanup
    if (a !== null)
      if (typeof i == 'function')
        try {
          i()
        } catch (c) {
          st(e, n, c)
        } finally {
          ;((e.refCleanup = null), (e = e.alternate), e != null && (e.refCleanup = null))
        }
      else if (typeof a == 'function')
        try {
          a(null)
        } catch (c) {
          st(e, n, c)
        }
      else a.current = null
  }
  function wg(e) {
    var n = e.type,
      a = e.memoizedProps,
      i = e.stateNode
    try {
      e: switch (n) {
        case 'button':
        case 'input':
        case 'select':
        case 'textarea':
          a.autoFocus && i.focus()
          break e
        case 'img':
          a.src ? (i.src = a.src) : a.srcSet && (i.srcset = a.srcSet)
      }
    } catch (c) {
      st(e, e.return, c)
    }
  }
  function zf(e, n, a) {
    try {
      var i = e.stateNode
      ;(Rx(i, e.type, a, n), (i[Lt] = n))
    } catch (c) {
      st(e, e.return, c)
    }
  }
  function Ag(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || (e.tag === 27 && sa(e.type)) || e.tag === 4
  }
  function Uf(e) {
    e: for (;;) {
      for (; e.sibling === null;) {
        if (e.return === null || Ag(e.return)) return null
        e = e.return
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
        if ((e.tag === 27 && sa(e.type)) || e.flags & 2 || e.child === null || e.tag === 4) continue e
        ;((e.child.return = e), (e = e.child))
      }
      if (!(e.flags & 2)) return e.stateNode
    }
  }
  function kf(e, n, a) {
    var i = e.tag
    if (i === 5 || i === 6)
      ((e = e.stateNode),
        n
          ? (a.nodeType === 9 ? a.body : a.nodeName === 'HTML' ? a.ownerDocument.body : a).insertBefore(e, n)
          : ((n = a.nodeType === 9 ? a.body : a.nodeName === 'HTML' ? a.ownerDocument.body : a),
            n.appendChild(e),
            (a = a._reactRootContainer),
            a != null || n.onclick !== null || (n.onclick = qs)))
    else if (i !== 4 && (i === 27 && sa(e.type) && ((a = e.stateNode), (n = null)), (e = e.child), e !== null))
      for (kf(e, n, a), e = e.sibling; e !== null;) (kf(e, n, a), (e = e.sibling))
  }
  function Ns(e, n, a) {
    var i = e.tag
    if (i === 5 || i === 6) ((e = e.stateNode), n ? a.insertBefore(e, n) : a.appendChild(e))
    else if (i !== 4 && (i === 27 && sa(e.type) && (a = e.stateNode), (e = e.child), e !== null))
      for (Ns(e, n, a), e = e.sibling; e !== null;) (Ns(e, n, a), (e = e.sibling))
  }
  function Og(e) {
    var n = e.stateNode,
      a = e.memoizedProps
    try {
      for (var i = e.type, c = n.attributes; c.length;) n.removeAttributeNode(c[0])
      ;(Gt(n, i, a), (n[Dt] = e), (n[Lt] = a))
    } catch (d) {
      st(e, e.return, d)
    }
  }
  var Ar = !1,
    Tt = !1,
    Lf = !1,
    Mg = typeof WeakSet == 'function' ? WeakSet : Set,
    $t = null
  function nx(e, n) {
    if (((e = e.containerInfo), (id = Xs), (e = Hh(e)), zc(e))) {
      if ('selectionStart' in e) var a = { start: e.selectionStart, end: e.selectionEnd }
      else
        e: {
          a = ((a = e.ownerDocument) && a.defaultView) || window
          var i = a.getSelection && a.getSelection()
          if (i && i.rangeCount !== 0) {
            a = i.anchorNode
            var c = i.anchorOffset,
              d = i.focusNode
            i = i.focusOffset
            try {
              ;(a.nodeType, d.nodeType)
            } catch {
              a = null
              break e
            }
            var y = 0,
              E = -1,
              B = -1,
              Y = 0,
              ne = 0,
              ae = e,
              K = null
            t: for (;;) {
              for (
                var X;
                ae !== a || (c !== 0 && ae.nodeType !== 3) || (E = y + c),
                  ae !== d || (i !== 0 && ae.nodeType !== 3) || (B = y + i),
                  ae.nodeType === 3 && (y += ae.nodeValue.length),
                  (X = ae.firstChild) !== null;
              )
                ((K = ae), (ae = X))
              for (;;) {
                if (ae === e) break t
                if ((K === a && ++Y === c && (E = y), K === d && ++ne === i && (B = y), (X = ae.nextSibling) !== null))
                  break
                ;((ae = K), (K = ae.parentNode))
              }
              ae = X
            }
            a = E === -1 || B === -1 ? null : { start: E, end: B }
          } else a = null
        }
      a = a || { start: 0, end: 0 }
    } else a = null
    for (sd = { focusedElem: e, selectionRange: a }, Xs = !1, $t = n; $t !== null;)
      if (((n = $t), (e = n.child), (n.subtreeFlags & 1024) !== 0 && e !== null)) ((e.return = n), ($t = e))
      else
        for (; $t !== null;) {
          switch (((n = $t), (d = n.alternate), (e = n.flags), n.tag)) {
            case 0:
              break
            case 11:
            case 15:
              break
            case 1:
              if ((e & 1024) !== 0 && d !== null) {
                ;((e = void 0), (a = n), (c = d.memoizedProps), (d = d.memoizedState), (i = a.stateNode))
                try {
                  var Ce = ka(a.type, c, a.elementType === a.type)
                  ;((e = i.getSnapshotBeforeUpdate(Ce, d)), (i.__reactInternalSnapshotBeforeUpdate = e))
                } catch (xe) {
                  st(a, a.return, xe)
                }
              }
              break
            case 3:
              if ((e & 1024) !== 0) {
                if (((e = n.stateNode.containerInfo), (a = e.nodeType), a === 9)) fd(e)
                else if (a === 1)
                  switch (e.nodeName) {
                    case 'HEAD':
                    case 'HTML':
                    case 'BODY':
                      fd(e)
                      break
                    default:
                      e.textContent = ''
                  }
              }
              break
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break
            default:
              if ((e & 1024) !== 0) throw Error(o(163))
          }
          if (((e = n.sibling), e !== null)) {
            ;((e.return = n.return), ($t = e))
            break
          }
          $t = n.return
        }
  }
  function _g(e, n, a) {
    var i = a.flags
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        ;(ta(e, a), i & 4 && ko(5, a))
        break
      case 1:
        if ((ta(e, a), i & 4))
          if (((e = a.stateNode), n === null))
            try {
              e.componentDidMount()
            } catch (y) {
              st(a, a.return, y)
            }
          else {
            var c = ka(a.type, n.memoizedProps)
            n = n.memoizedState
            try {
              e.componentDidUpdate(c, n, e.__reactInternalSnapshotBeforeUpdate)
            } catch (y) {
              st(a, a.return, y)
            }
          }
        ;(i & 64 && Tg(a), i & 512 && Lo(a, a.return))
        break
      case 3:
        if ((ta(e, a), i & 64 && ((e = a.updateQueue), e !== null))) {
          if (((n = null), a.child !== null))
            switch (a.child.tag) {
              case 27:
              case 5:
                n = a.child.stateNode
                break
              case 1:
                n = a.child.stateNode
            }
          try {
            fm(e, n)
          } catch (y) {
            st(a, a.return, y)
          }
        }
        break
      case 27:
        n === null && i & 4 && Og(a)
      case 26:
      case 5:
        ;(ta(e, a), n === null && i & 4 && wg(a), i & 512 && Lo(a, a.return))
        break
      case 12:
        ta(e, a)
        break
      case 13:
        ;(ta(e, a),
          i & 4 && Bg(e, a),
          i & 64 &&
            ((e = a.memoizedState),
            e !== null && ((e = e.dehydrated), e !== null && ((a = fx.bind(null, a)), Mx(e, a)))))
        break
      case 22:
        if (((i = a.memoizedState !== null || Ar), !i)) {
          ;((n = (n !== null && n.memoizedState !== null) || Tt), (c = Ar))
          var d = Tt
          ;((Ar = i), (Tt = n) && !d ? na(e, a, (a.subtreeFlags & 8772) !== 0) : ta(e, a), (Ar = c), (Tt = d))
        }
        break
      case 30:
        break
      default:
        ta(e, a)
    }
  }
  function Ng(e) {
    var n = e.alternate
    ;(n !== null && ((e.alternate = null), Ng(n)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((n = e.stateNode), n !== null && Za(n)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null))
  }
  var pt = null,
    pn = !1
  function Or(e, n, a) {
    for (a = a.child; a !== null;) (Dg(e, n, a), (a = a.sibling))
  }
  function Dg(e, n, a) {
    if (je && typeof je.onCommitFiberUnmount == 'function')
      try {
        je.onCommitFiberUnmount(Nt, a)
      } catch {}
    switch (a.tag) {
      case 26:
        ;(Tt || Wn(a, n),
          Or(e, n, a),
          a.memoizedState ? a.memoizedState.count-- : a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a)))
        break
      case 27:
        Tt || Wn(a, n)
        var i = pt,
          c = pn
        ;(sa(a.type) && ((pt = a.stateNode), (pn = !1)), Or(e, n, a), Vo(a.stateNode), (pt = i), (pn = c))
        break
      case 5:
        Tt || Wn(a, n)
      case 6:
        if (((i = pt), (c = pn), (pt = null), Or(e, n, a), (pt = i), (pn = c), pt !== null))
          if (pn)
            try {
              ;(pt.nodeType === 9 ? pt.body : pt.nodeName === 'HTML' ? pt.ownerDocument.body : pt).removeChild(
                a.stateNode
              )
            } catch (d) {
              st(a, n, d)
            }
          else
            try {
              pt.removeChild(a.stateNode)
            } catch (d) {
              st(a, n, d)
            }
        break
      case 18:
        pt !== null &&
          (pn
            ? ((e = pt),
              Sy(e.nodeType === 9 ? e.body : e.nodeName === 'HTML' ? e.ownerDocument.body : e, a.stateNode),
              ei(e))
            : Sy(pt, a.stateNode))
        break
      case 4:
        ;((i = pt), (c = pn), (pt = a.stateNode.containerInfo), (pn = !0), Or(e, n, a), (pt = i), (pn = c))
        break
      case 0:
      case 11:
      case 14:
      case 15:
        ;(Tt || ea(2, a, n), Tt || ea(4, a, n), Or(e, n, a))
        break
      case 1:
        ;(Tt || (Wn(a, n), (i = a.stateNode), typeof i.componentWillUnmount == 'function' && Cg(a, n, i)), Or(e, n, a))
        break
      case 21:
        Or(e, n, a)
        break
      case 22:
        ;((Tt = (i = Tt) || a.memoizedState !== null), Or(e, n, a), (Tt = i))
        break
      default:
        Or(e, n, a)
    }
  }
  function Bg(e, n) {
    if (
      n.memoizedState === null &&
      ((e = n.alternate), e !== null && ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        ei(e)
      } catch (a) {
        st(n, n.return, a)
      }
  }
  function rx(e) {
    switch (e.tag) {
      case 13:
      case 19:
        var n = e.stateNode
        return (n === null && (n = e.stateNode = new Mg()), n)
      case 22:
        return ((e = e.stateNode), (n = e._retryCache), n === null && (n = e._retryCache = new Mg()), n)
      default:
        throw Error(o(435, e.tag))
    }
  }
  function jf(e, n) {
    var a = rx(e)
    n.forEach(function (i) {
      var c = dx.bind(null, e, i)
      a.has(i) || (a.add(i), i.then(c, c))
    })
  }
  function vn(e, n) {
    var a = n.deletions
    if (a !== null)
      for (var i = 0; i < a.length; i++) {
        var c = a[i],
          d = e,
          y = n,
          E = y
        e: for (; E !== null;) {
          switch (E.tag) {
            case 27:
              if (sa(E.type)) {
                ;((pt = E.stateNode), (pn = !1))
                break e
              }
              break
            case 5:
              ;((pt = E.stateNode), (pn = !1))
              break e
            case 3:
            case 4:
              ;((pt = E.stateNode.containerInfo), (pn = !0))
              break e
          }
          E = E.return
        }
        if (pt === null) throw Error(o(160))
        ;(Dg(d, y, c), (pt = null), (pn = !1), (d = c.alternate), d !== null && (d.return = null), (c.return = null))
      }
    if (n.subtreeFlags & 13878) for (n = n.child; n !== null;) (zg(n, e), (n = n.sibling))
  }
  var Pn = null
  function zg(e, n) {
    var a = e.alternate,
      i = e.flags
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ;(vn(n, e), Sn(e), i & 4 && (ea(3, e, e.return), ko(3, e), ea(5, e, e.return)))
        break
      case 1:
        ;(vn(n, e),
          Sn(e),
          i & 512 && (Tt || a === null || Wn(a, a.return)),
          i & 64 &&
            Ar &&
            ((e = e.updateQueue),
            e !== null &&
              ((i = e.callbacks),
              i !== null &&
                ((a = e.shared.hiddenCallbacks), (e.shared.hiddenCallbacks = a === null ? i : a.concat(i))))))
        break
      case 26:
        var c = Pn
        if ((vn(n, e), Sn(e), i & 512 && (Tt || a === null || Wn(a, a.return)), i & 4)) {
          var d = a !== null ? a.memoizedState : null
          if (((i = e.memoizedState), a === null))
            if (i === null)
              if (e.stateNode === null) {
                e: {
                  ;((i = e.type), (a = e.memoizedProps), (c = c.ownerDocument || c))
                  t: switch (i) {
                    case 'title':
                      ;((d = c.getElementsByTagName('title')[0]),
                        (!d ||
                          d[xa] ||
                          d[Dt] ||
                          d.namespaceURI === 'http://www.w3.org/2000/svg' ||
                          d.hasAttribute('itemprop')) &&
                          ((d = c.createElement(i)), c.head.insertBefore(d, c.querySelector('head > title'))),
                        Gt(d, i, a),
                        (d[Dt] = e),
                        Rt(d),
                        (i = d))
                      break e
                    case 'link':
                      var y = Oy('link', 'href', c).get(i + (a.href || ''))
                      if (y) {
                        for (var E = 0; E < y.length; E++)
                          if (
                            ((d = y[E]),
                            d.getAttribute('href') === (a.href == null || a.href === '' ? null : a.href) &&
                              d.getAttribute('rel') === (a.rel == null ? null : a.rel) &&
                              d.getAttribute('title') === (a.title == null ? null : a.title) &&
                              d.getAttribute('crossorigin') === (a.crossOrigin == null ? null : a.crossOrigin))
                          ) {
                            y.splice(E, 1)
                            break t
                          }
                      }
                      ;((d = c.createElement(i)), Gt(d, i, a), c.head.appendChild(d))
                      break
                    case 'meta':
                      if ((y = Oy('meta', 'content', c).get(i + (a.content || '')))) {
                        for (E = 0; E < y.length; E++)
                          if (
                            ((d = y[E]),
                            d.getAttribute('content') === (a.content == null ? null : '' + a.content) &&
                              d.getAttribute('name') === (a.name == null ? null : a.name) &&
                              d.getAttribute('property') === (a.property == null ? null : a.property) &&
                              d.getAttribute('http-equiv') === (a.httpEquiv == null ? null : a.httpEquiv) &&
                              d.getAttribute('charset') === (a.charSet == null ? null : a.charSet))
                          ) {
                            y.splice(E, 1)
                            break t
                          }
                      }
                      ;((d = c.createElement(i)), Gt(d, i, a), c.head.appendChild(d))
                      break
                    default:
                      throw Error(o(468, i))
                  }
                  ;((d[Dt] = e), Rt(d), (i = d))
                }
                e.stateNode = i
              } else My(c, e.type, e.stateNode)
            else e.stateNode = Ay(c, i, e.memoizedProps)
          else
            d !== i
              ? (d === null ? a.stateNode !== null && ((a = a.stateNode), a.parentNode.removeChild(a)) : d.count--,
                i === null ? My(c, e.type, e.stateNode) : Ay(c, i, e.memoizedProps))
              : i === null && e.stateNode !== null && zf(e, e.memoizedProps, a.memoizedProps)
        }
        break
      case 27:
        ;(vn(n, e),
          Sn(e),
          i & 512 && (Tt || a === null || Wn(a, a.return)),
          a !== null && i & 4 && zf(e, e.memoizedProps, a.memoizedProps))
        break
      case 5:
        if ((vn(n, e), Sn(e), i & 512 && (Tt || a === null || Wn(a, a.return)), e.flags & 32)) {
          c = e.stateNode
          try {
            el(c, '')
          } catch (X) {
            st(e, e.return, X)
          }
        }
        ;(i & 4 && e.stateNode != null && ((c = e.memoizedProps), zf(e, c, a !== null ? a.memoizedProps : c)),
          i & 1024 && (Lf = !0))
        break
      case 6:
        if ((vn(n, e), Sn(e), i & 4)) {
          if (e.stateNode === null) throw Error(o(162))
          ;((i = e.memoizedProps), (a = e.stateNode))
          try {
            a.nodeValue = i
          } catch (X) {
            st(e, e.return, X)
          }
        }
        break
      case 3:
        if (
          ((Vs = null),
          (c = Pn),
          (Pn = Fs(n.containerInfo)),
          vn(n, e),
          (Pn = c),
          Sn(e),
          i & 4 && a !== null && a.memoizedState.isDehydrated)
        )
          try {
            ei(n.containerInfo)
          } catch (X) {
            st(e, e.return, X)
          }
        Lf && ((Lf = !1), Ug(e))
        break
      case 4:
        ;((i = Pn), (Pn = Fs(e.stateNode.containerInfo)), vn(n, e), Sn(e), (Pn = i))
        break
      case 12:
        ;(vn(n, e), Sn(e))
        break
      case 13:
        ;(vn(n, e),
          Sn(e),
          e.child.flags & 8192 && (e.memoizedState !== null) != (a !== null && a.memoizedState !== null) && (Ff = Te()),
          i & 4 && ((i = e.updateQueue), i !== null && ((e.updateQueue = null), jf(e, i))))
        break
      case 22:
        c = e.memoizedState !== null
        var B = a !== null && a.memoizedState !== null,
          Y = Ar,
          ne = Tt
        if (((Ar = Y || c), (Tt = ne || B), vn(n, e), (Tt = ne), (Ar = Y), Sn(e), i & 8192))
          e: for (
            n = e.stateNode,
              n._visibility = c ? n._visibility & -2 : n._visibility | 1,
              c && (a === null || B || Ar || Tt || La(e)),
              a = null,
              n = e;
            ;
          ) {
            if (n.tag === 5 || n.tag === 26) {
              if (a === null) {
                B = a = n
                try {
                  if (((d = B.stateNode), c))
                    ((y = d.style),
                      typeof y.setProperty == 'function'
                        ? y.setProperty('display', 'none', 'important')
                        : (y.display = 'none'))
                  else {
                    E = B.stateNode
                    var ae = B.memoizedProps.style,
                      K = ae != null && ae.hasOwnProperty('display') ? ae.display : null
                    E.style.display = K == null || typeof K == 'boolean' ? '' : ('' + K).trim()
                  }
                } catch (X) {
                  st(B, B.return, X)
                }
              }
            } else if (n.tag === 6) {
              if (a === null) {
                B = n
                try {
                  B.stateNode.nodeValue = c ? '' : B.memoizedProps
                } catch (X) {
                  st(B, B.return, X)
                }
              }
            } else if (((n.tag !== 22 && n.tag !== 23) || n.memoizedState === null || n === e) && n.child !== null) {
              ;((n.child.return = n), (n = n.child))
              continue
            }
            if (n === e) break e
            for (; n.sibling === null;) {
              if (n.return === null || n.return === e) break e
              ;(a === n && (a = null), (n = n.return))
            }
            ;(a === n && (a = null), (n.sibling.return = n.return), (n = n.sibling))
          }
        i & 4 &&
          ((i = e.updateQueue), i !== null && ((a = i.retryQueue), a !== null && ((i.retryQueue = null), jf(e, a))))
        break
      case 19:
        ;(vn(n, e), Sn(e), i & 4 && ((i = e.updateQueue), i !== null && ((e.updateQueue = null), jf(e, i))))
        break
      case 30:
        break
      case 21:
        break
      default:
        ;(vn(n, e), Sn(e))
    }
  }
  function Sn(e) {
    var n = e.flags
    if (n & 2) {
      try {
        for (var a, i = e.return; i !== null;) {
          if (Ag(i)) {
            a = i
            break
          }
          i = i.return
        }
        if (a == null) throw Error(o(160))
        switch (a.tag) {
          case 27:
            var c = a.stateNode,
              d = Uf(e)
            Ns(e, d, c)
            break
          case 5:
            var y = a.stateNode
            a.flags & 32 && (el(y, ''), (a.flags &= -33))
            var E = Uf(e)
            Ns(e, E, y)
            break
          case 3:
          case 4:
            var B = a.stateNode.containerInfo,
              Y = Uf(e)
            kf(e, Y, B)
            break
          default:
            throw Error(o(161))
        }
      } catch (ne) {
        st(e, e.return, ne)
      }
      e.flags &= -3
    }
    n & 4096 && (e.flags &= -4097)
  }
  function Ug(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null;) {
        var n = e
        ;(Ug(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), (e = e.sibling))
      }
  }
  function ta(e, n) {
    if (n.subtreeFlags & 8772) for (n = n.child; n !== null;) (_g(e, n.alternate, n), (n = n.sibling))
  }
  function La(e) {
    for (e = e.child; e !== null;) {
      var n = e
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ;(ea(4, n, n.return), La(n))
          break
        case 1:
          Wn(n, n.return)
          var a = n.stateNode
          ;(typeof a.componentWillUnmount == 'function' && Cg(n, n.return, a), La(n))
          break
        case 27:
          Vo(n.stateNode)
        case 26:
        case 5:
          ;(Wn(n, n.return), La(n))
          break
        case 22:
          n.memoizedState === null && La(n)
          break
        case 30:
          La(n)
          break
        default:
          La(n)
      }
      e = e.sibling
    }
  }
  function na(e, n, a) {
    for (a = a && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null;) {
      var i = n.alternate,
        c = e,
        d = n,
        y = d.flags
      switch (d.tag) {
        case 0:
        case 11:
        case 15:
          ;(na(c, d, a), ko(4, d))
          break
        case 1:
          if ((na(c, d, a), (i = d), (c = i.stateNode), typeof c.componentDidMount == 'function'))
            try {
              c.componentDidMount()
            } catch (Y) {
              st(i, i.return, Y)
            }
          if (((i = d), (c = i.updateQueue), c !== null)) {
            var E = i.stateNode
            try {
              var B = c.shared.hiddenCallbacks
              if (B !== null) for (c.shared.hiddenCallbacks = null, c = 0; c < B.length; c++) cm(B[c], E)
            } catch (Y) {
              st(i, i.return, Y)
            }
          }
          ;(a && y & 64 && Tg(d), Lo(d, d.return))
          break
        case 27:
          Og(d)
        case 26:
        case 5:
          ;(na(c, d, a), a && i === null && y & 4 && wg(d), Lo(d, d.return))
          break
        case 12:
          na(c, d, a)
          break
        case 13:
          ;(na(c, d, a), a && y & 4 && Bg(c, d))
          break
        case 22:
          ;(d.memoizedState === null && na(c, d, a), Lo(d, d.return))
          break
        case 30:
          break
        default:
          na(c, d, a)
      }
      n = n.sibling
    }
  }
  function $f(e, n) {
    var a = null
    ;(e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (a = e.memoizedState.cachePool.pool),
      (e = null),
      n.memoizedState !== null && n.memoizedState.cachePool !== null && (e = n.memoizedState.cachePool.pool),
      e !== a && (e != null && e.refCount++, a != null && Ro(a)))
  }
  function Hf(e, n) {
    ;((e = null),
      n.alternate !== null && (e = n.alternate.memoizedState.cache),
      (n = n.memoizedState.cache),
      n !== e && (n.refCount++, e != null && Ro(e)))
  }
  function Jn(e, n, a, i) {
    if (n.subtreeFlags & 10256) for (n = n.child; n !== null;) (kg(e, n, a, i), (n = n.sibling))
  }
  function kg(e, n, a, i) {
    var c = n.flags
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        ;(Jn(e, n, a, i), c & 2048 && ko(9, n))
        break
      case 1:
        Jn(e, n, a, i)
        break
      case 3:
        ;(Jn(e, n, a, i),
          c & 2048 &&
            ((e = null),
            n.alternate !== null && (e = n.alternate.memoizedState.cache),
            (n = n.memoizedState.cache),
            n !== e && (n.refCount++, e != null && Ro(e))))
        break
      case 12:
        if (c & 2048) {
          ;(Jn(e, n, a, i), (e = n.stateNode))
          try {
            var d = n.memoizedProps,
              y = d.id,
              E = d.onPostCommit
            typeof E == 'function' && E(y, n.alternate === null ? 'mount' : 'update', e.passiveEffectDuration, -0)
          } catch (B) {
            st(n, n.return, B)
          }
        } else Jn(e, n, a, i)
        break
      case 13:
        Jn(e, n, a, i)
        break
      case 23:
        break
      case 22:
        ;((d = n.stateNode),
          (y = n.alternate),
          n.memoizedState !== null
            ? d._visibility & 2
              ? Jn(e, n, a, i)
              : jo(e, n)
            : d._visibility & 2
              ? Jn(e, n, a, i)
              : ((d._visibility |= 2), vl(e, n, a, i, (n.subtreeFlags & 10256) !== 0)),
          c & 2048 && $f(y, n))
        break
      case 24:
        ;(Jn(e, n, a, i), c & 2048 && Hf(n.alternate, n))
        break
      default:
        Jn(e, n, a, i)
    }
  }
  function vl(e, n, a, i, c) {
    for (c = c && (n.subtreeFlags & 10256) !== 0, n = n.child; n !== null;) {
      var d = e,
        y = n,
        E = a,
        B = i,
        Y = y.flags
      switch (y.tag) {
        case 0:
        case 11:
        case 15:
          ;(vl(d, y, E, B, c), ko(8, y))
          break
        case 23:
          break
        case 22:
          var ne = y.stateNode
          ;(y.memoizedState !== null
            ? ne._visibility & 2
              ? vl(d, y, E, B, c)
              : jo(d, y)
            : ((ne._visibility |= 2), vl(d, y, E, B, c)),
            c && Y & 2048 && $f(y.alternate, y))
          break
        case 24:
          ;(vl(d, y, E, B, c), c && Y & 2048 && Hf(y.alternate, y))
          break
        default:
          vl(d, y, E, B, c)
      }
      n = n.sibling
    }
  }
  function jo(e, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null;) {
        var a = e,
          i = n,
          c = i.flags
        switch (i.tag) {
          case 22:
            ;(jo(a, i), c & 2048 && $f(i.alternate, i))
            break
          case 24:
            ;(jo(a, i), c & 2048 && Hf(i.alternate, i))
            break
          default:
            jo(a, i)
        }
        n = n.sibling
      }
  }
  var $o = 8192
  function Sl(e) {
    if (e.subtreeFlags & $o) for (e = e.child; e !== null;) (Lg(e), (e = e.sibling))
  }
  function Lg(e) {
    switch (e.tag) {
      case 26:
        ;(Sl(e), e.flags & $o && e.memoizedState !== null && qx(Pn, e.memoizedState, e.memoizedProps))
        break
      case 5:
        Sl(e)
        break
      case 3:
      case 4:
        var n = Pn
        ;((Pn = Fs(e.stateNode.containerInfo)), Sl(e), (Pn = n))
        break
      case 22:
        e.memoizedState === null &&
          ((n = e.alternate),
          n !== null && n.memoizedState !== null ? ((n = $o), ($o = 16777216), Sl(e), ($o = n)) : Sl(e))
        break
      default:
        Sl(e)
    }
  }
  function jg(e) {
    var n = e.alternate
    if (n !== null && ((e = n.child), e !== null)) {
      n.child = null
      do ((n = e.sibling), (e.sibling = null), (e = n))
      while (e !== null)
    }
  }
  function Ho(e) {
    var n = e.deletions
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var a = 0; a < n.length; a++) {
          var i = n[a]
          ;(($t = i), Hg(i, e))
        }
      jg(e)
    }
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) ($g(e), (e = e.sibling))
  }
  function $g(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        ;(Ho(e), e.flags & 2048 && ea(9, e, e.return))
        break
      case 3:
        Ho(e)
        break
      case 12:
        Ho(e)
        break
      case 22:
        var n = e.stateNode
        e.memoizedState !== null && n._visibility & 2 && (e.return === null || e.return.tag !== 13)
          ? ((n._visibility &= -3), Ds(e))
          : Ho(e)
        break
      default:
        Ho(e)
    }
  }
  function Ds(e) {
    var n = e.deletions
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var a = 0; a < n.length; a++) {
          var i = n[a]
          ;(($t = i), Hg(i, e))
        }
      jg(e)
    }
    for (e = e.child; e !== null;) {
      switch (((n = e), n.tag)) {
        case 0:
        case 11:
        case 15:
          ;(ea(8, n, n.return), Ds(n))
          break
        case 22:
          ;((a = n.stateNode), a._visibility & 2 && ((a._visibility &= -3), Ds(n)))
          break
        default:
          Ds(n)
      }
      e = e.sibling
    }
  }
  function Hg(e, n) {
    for (; $t !== null;) {
      var a = $t
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          ea(8, a, n)
          break
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var i = a.memoizedState.cachePool.pool
            i != null && i.refCount++
          }
          break
        case 24:
          Ro(a.memoizedState.cache)
      }
      if (((i = a.child), i !== null)) ((i.return = a), ($t = i))
      else
        e: for (a = e; $t !== null;) {
          i = $t
          var c = i.sibling,
            d = i.return
          if ((Ng(i), i === a)) {
            $t = null
            break e
          }
          if (c !== null) {
            ;((c.return = d), ($t = c))
            break e
          }
          $t = d
        }
    }
  }
  var ax = {
      getCacheForType: function (e) {
        var n = Qt(Bt),
          a = n.data.get(e)
        return (a === void 0 && ((a = e()), n.data.set(e, a)), a)
      },
    },
    lx = typeof WeakMap == 'function' ? WeakMap : Map,
    Xe = 0,
    ft = null,
    ke = null,
    $e = 0,
    Qe = 0,
    xn = null,
    ra = !1,
    xl = !1,
    Pf = !1,
    Mr = 0,
    vt = 0,
    aa = 0,
    ja = 0,
    qf = 0,
    zn = 0,
    Rl = 0,
    Po = null,
    hn = null,
    If = !1,
    Ff = 0,
    Bs = 1 / 0,
    zs = null,
    la = null,
    Vt = 0,
    oa = null,
    El = null,
    Tl = 0,
    Yf = 0,
    Vf = null,
    Pg = null,
    qo = 0,
    Gf = null
  function Rn() {
    if ((Xe & 2) !== 0 && $e !== 0) return $e & -$e
    if (N.T !== null) {
      var e = fl
      return e !== 0 ? e : ed()
    }
    return Sa()
  }
  function qg() {
    zn === 0 && (zn = ($e & 536870912) === 0 || qe ? Fi() : 536870912)
    var e = Bn.current
    return (e !== null && (e.flags |= 32), zn)
  }
  function En(e, n, a) {
    ;(((e === ft && (Qe === 2 || Qe === 9)) || e.cancelPendingCommit !== null) && (Cl(e, 0), ia(e, $e, zn, !1)),
      va(e, a),
      ((Xe & 2) === 0 || e !== ft) && (e === ft && ((Xe & 2) === 0 && (ja |= a), vt === 4 && ia(e, $e, zn, !1)), er(e)))
  }
  function Ig(e, n, a) {
    if ((Xe & 6) !== 0) throw Error(o(327))
    var i = (!a && (n & 124) === 0 && (n & e.expiredLanes) === 0) || ba(e, n),
      c = i ? sx(e, n) : Qf(e, n, !0),
      d = i
    do {
      if (c === 0) {
        xl && !i && ia(e, n, 0, !1)
        break
      } else {
        if (((a = e.current.alternate), d && !ox(a))) {
          ;((c = Qf(e, n, !1)), (d = !1))
          continue
        }
        if (c === 2) {
          if (((d = n), e.errorRecoveryDisabledLanes & d)) var y = 0
          else ((y = e.pendingLanes & -536870913), (y = y !== 0 ? y : y & 536870912 ? 536870912 : 0))
          if (y !== 0) {
            n = y
            e: {
              var E = e
              c = Po
              var B = E.current.memoizedState.isDehydrated
              if ((B && (Cl(E, y).flags |= 256), (y = Qf(E, y, !1)), y !== 2)) {
                if (Pf && !B) {
                  ;((E.errorRecoveryDisabledLanes |= d), (ja |= d), (c = 4))
                  break e
                }
                ;((d = hn), (hn = c), d !== null && (hn === null ? (hn = d) : hn.push.apply(hn, d)))
              }
              c = y
            }
            if (((d = !1), c !== 2)) continue
          }
        }
        if (c === 1) {
          ;(Cl(e, 0), ia(e, n, 0, !0))
          break
        }
        e: {
          switch (((i = e), (d = c), d)) {
            case 0:
            case 1:
              throw Error(o(345))
            case 4:
              if ((n & 4194048) !== n) break
            case 6:
              ia(i, n, zn, !ra)
              break e
            case 2:
              hn = null
              break
            case 3:
            case 5:
              break
            default:
              throw Error(o(329))
          }
          if ((n & 62914560) === n && ((c = Ff + 300 - Te()), 10 < c)) {
            if ((ia(i, n, zn, !ra), Hr(i, 0, !0) !== 0)) break e
            i.timeoutHandle = by(Fg.bind(null, i, a, hn, zs, If, n, zn, ja, Rl, ra, d, 2, -0, 0), c)
            break e
          }
          Fg(i, a, hn, zs, If, n, zn, ja, Rl, ra, d, 0, -0, 0)
        }
      }
      break
    } while (!0)
    er(e)
  }
  function Fg(e, n, a, i, c, d, y, E, B, Y, ne, ae, K, X) {
    if (
      ((e.timeoutHandle = -1),
      (ae = n.subtreeFlags),
      (ae & 8192 || (ae & 16785408) === 16785408) &&
        ((Xo = { stylesheets: null, count: 0, unsuspend: Px }), Lg(n), (ae = Ix()), ae !== null))
    ) {
      ;((e.cancelPendingCommit = ae(Zg.bind(null, e, n, d, a, i, c, y, E, B, ne, 1, K, X))), ia(e, d, y, !Y))
      return
    }
    Zg(e, n, d, a, i, c, y, E, B)
  }
  function ox(e) {
    for (var n = e; ;) {
      var a = n.tag
      if (
        (a === 0 || a === 11 || a === 15) &&
        n.flags & 16384 &&
        ((a = n.updateQueue), a !== null && ((a = a.stores), a !== null))
      )
        for (var i = 0; i < a.length; i++) {
          var c = a[i],
            d = c.getSnapshot
          c = c.value
          try {
            if (!yn(d(), c)) return !1
          } catch {
            return !1
          }
        }
      if (((a = n.child), n.subtreeFlags & 16384 && a !== null)) ((a.return = n), (n = a))
      else {
        if (n === e) break
        for (; n.sibling === null;) {
          if (n.return === null || n.return === e) return !0
          n = n.return
        }
        ;((n.sibling.return = n.return), (n = n.sibling))
      }
    }
    return !0
  }
  function ia(e, n, a, i) {
    ;((n &= ~qf),
      (n &= ~ja),
      (e.suspendedLanes |= n),
      (e.pingedLanes &= ~n),
      i && (e.warmLanes |= n),
      (i = e.expirationTimes))
    for (var c = n; 0 < c;) {
      var d = 31 - xt(c),
        y = 1 << d
      ;((i[d] = -1), (c &= ~y))
    }
    a !== 0 && Vi(e, a, n)
  }
  function Us() {
    return (Xe & 6) === 0 ? (Io(0), !1) : !0
  }
  function Kf() {
    if (ke !== null) {
      if (Qe === 0) var e = ke.return
      else ((e = ke), (xr = Da = null), ff(e), (yl = null), (Bo = 0), (e = ke))
      for (; e !== null;) (Eg(e.alternate, e), (e = e.return))
      ke = null
    }
  }
  function Cl(e, n) {
    var a = e.timeoutHandle
    ;(a !== -1 && ((e.timeoutHandle = -1), Tx(a)),
      (a = e.cancelPendingCommit),
      a !== null && ((e.cancelPendingCommit = null), a()),
      Kf(),
      (ft = e),
      (ke = a = br(e.current, null)),
      ($e = n),
      (Qe = 0),
      (xn = null),
      (ra = !1),
      (xl = ba(e, n)),
      (Pf = !1),
      (Rl = zn = qf = ja = aa = vt = 0),
      (hn = Po = null),
      (If = !1),
      (n & 8) !== 0 && (n |= n & 32))
    var i = e.entangledLanes
    if (i !== 0)
      for (e = e.entanglements, i &= n; 0 < i;) {
        var c = 31 - xt(i),
          d = 1 << c
        ;((n |= e[c]), (i &= ~d))
      }
    return ((Mr = n), rs(), a)
  }
  function Yg(e, n) {
    ;((Be = null),
      (N.H = Rs),
      n === To || n === ds
        ? ((n = sm()), (Qe = 3))
        : n === lm
          ? ((n = sm()), (Qe = 4))
          : (Qe = n === ug ? 8 : n !== null && typeof n == 'object' && typeof n.then == 'function' ? 6 : 1),
      (xn = n),
      ke === null && ((vt = 1), As(e, Mn(n, e.current))))
  }
  function Vg() {
    var e = N.H
    return ((N.H = Rs), e === null ? Rs : e)
  }
  function Gg() {
    var e = N.A
    return ((N.A = ax), e)
  }
  function Xf() {
    ;((vt = 4),
      ra || (($e & 4194048) !== $e && Bn.current !== null) || (xl = !0),
      ((aa & 134217727) === 0 && (ja & 134217727) === 0) || ft === null || ia(ft, $e, zn, !1))
  }
  function Qf(e, n, a) {
    var i = Xe
    Xe |= 2
    var c = Vg(),
      d = Gg()
    ;((ft !== e || $e !== n) && ((zs = null), Cl(e, n)), (n = !1))
    var y = vt
    e: do
      try {
        if (Qe !== 0 && ke !== null) {
          var E = ke,
            B = xn
          switch (Qe) {
            case 8:
              ;(Kf(), (y = 6))
              break e
            case 3:
            case 2:
            case 9:
            case 6:
              Bn.current === null && (n = !0)
              var Y = Qe
              if (((Qe = 0), (xn = null), wl(e, E, B, Y), a && xl)) {
                y = 0
                break e
              }
              break
            default:
              ;((Y = Qe), (Qe = 0), (xn = null), wl(e, E, B, Y))
          }
        }
        ;(ix(), (y = vt))
        break
      } catch (ne) {
        Yg(e, ne)
      }
    while (!0)
    return (
      n && e.shellSuspendCounter++,
      (xr = Da = null),
      (Xe = i),
      (N.H = c),
      (N.A = d),
      ke === null && ((ft = null), ($e = 0), rs()),
      y
    )
  }
  function ix() {
    for (; ke !== null;) Kg(ke)
  }
  function sx(e, n) {
    var a = Xe
    Xe |= 2
    var i = Vg(),
      c = Gg()
    ft !== e || $e !== n ? ((zs = null), (Bs = Te() + 500), Cl(e, n)) : (xl = ba(e, n))
    e: do
      try {
        if (Qe !== 0 && ke !== null) {
          n = ke
          var d = xn
          t: switch (Qe) {
            case 1:
              ;((Qe = 0), (xn = null), wl(e, n, d, 1))
              break
            case 2:
            case 9:
              if (om(d)) {
                ;((Qe = 0), (xn = null), Xg(n))
                break
              }
              ;((n = function () {
                ;((Qe !== 2 && Qe !== 9) || ft !== e || (Qe = 7), er(e))
              }),
                d.then(n, n))
              break e
            case 3:
              Qe = 7
              break e
            case 4:
              Qe = 5
              break e
            case 7:
              om(d) ? ((Qe = 0), (xn = null), Xg(n)) : ((Qe = 0), (xn = null), wl(e, n, d, 7))
              break
            case 5:
              var y = null
              switch (ke.tag) {
                case 26:
                  y = ke.memoizedState
                case 5:
                case 27:
                  var E = ke
                  if (!y || _y(y)) {
                    ;((Qe = 0), (xn = null))
                    var B = E.sibling
                    if (B !== null) ke = B
                    else {
                      var Y = E.return
                      Y !== null ? ((ke = Y), ks(Y)) : (ke = null)
                    }
                    break t
                  }
              }
              ;((Qe = 0), (xn = null), wl(e, n, d, 5))
              break
            case 6:
              ;((Qe = 0), (xn = null), wl(e, n, d, 6))
              break
            case 8:
              ;(Kf(), (vt = 6))
              break e
            default:
              throw Error(o(462))
          }
        }
        ux()
        break
      } catch (ne) {
        Yg(e, ne)
      }
    while (!0)
    return ((xr = Da = null), (N.H = i), (N.A = c), (Xe = a), ke !== null ? 0 : ((ft = null), ($e = 0), rs(), vt))
  }
  function ux() {
    for (; ke !== null && !Ve();) Kg(ke)
  }
  function Kg(e) {
    var n = xg(e.alternate, e, Mr)
    ;((e.memoizedProps = e.pendingProps), n === null ? ks(e) : (ke = n))
  }
  function Xg(e) {
    var n = e,
      a = n.alternate
    switch (n.tag) {
      case 15:
      case 0:
        n = mg(a, n, n.pendingProps, n.type, void 0, $e)
        break
      case 11:
        n = mg(a, n, n.pendingProps, n.type.render, n.ref, $e)
        break
      case 5:
        ff(n)
      default:
        ;(Eg(a, n), (n = ke = Qh(n, Mr)), (n = xg(a, n, Mr)))
    }
    ;((e.memoizedProps = e.pendingProps), n === null ? ks(e) : (ke = n))
  }
  function wl(e, n, a, i) {
    ;((xr = Da = null), ff(n), (yl = null), (Bo = 0))
    var c = n.return
    try {
      if (WS(e, c, n, a, $e)) {
        ;((vt = 1), As(e, Mn(a, e.current)), (ke = null))
        return
      }
    } catch (d) {
      if (c !== null) throw ((ke = c), d)
      ;((vt = 1), As(e, Mn(a, e.current)), (ke = null))
      return
    }
    n.flags & 32768
      ? (qe || i === 1
          ? (e = !0)
          : xl || ($e & 536870912) !== 0
            ? (e = !1)
            : ((ra = e = !0),
              (i === 2 || i === 9 || i === 3 || i === 6) &&
                ((i = Bn.current), i !== null && i.tag === 13 && (i.flags |= 16384))),
        Qg(n, e))
      : ks(n)
  }
  function ks(e) {
    var n = e
    do {
      if ((n.flags & 32768) !== 0) {
        Qg(n, ra)
        return
      }
      e = n.return
      var a = ex(n.alternate, n, Mr)
      if (a !== null) {
        ke = a
        return
      }
      if (((n = n.sibling), n !== null)) {
        ke = n
        return
      }
      ke = n = e
    } while (n !== null)
    vt === 0 && (vt = 5)
  }
  function Qg(e, n) {
    do {
      var a = tx(e.alternate, e)
      if (a !== null) {
        ;((a.flags &= 32767), (ke = a))
        return
      }
      if (
        ((a = e.return),
        a !== null && ((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
        !n && ((e = e.sibling), e !== null))
      ) {
        ke = e
        return
      }
      ke = e = a
    } while (e !== null)
    ;((vt = 6), (ke = null))
  }
  function Zg(e, n, a, i, c, d, y, E, B) {
    e.cancelPendingCommit = null
    do Ls()
    while (Vt !== 0)
    if ((Xe & 6) !== 0) throw Error(o(327))
    if (n !== null) {
      if (n === e.current) throw Error(o(177))
      if (
        ((d = n.lanes | n.childLanes),
        (d |= $c),
        mc(e, a, d, y, E, B),
        e === ft && ((ke = ft = null), ($e = 0)),
        (El = n),
        (oa = e),
        (Tl = a),
        (Yf = d),
        (Vf = c),
        (Pg = i),
        (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            px(cn, function () {
              return (ny(), null)
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (i = (n.flags & 13878) !== 0),
        (n.subtreeFlags & 13878) !== 0 || i)
      ) {
        ;((i = N.T), (N.T = null), (c = H.p), (H.p = 2), (y = Xe), (Xe |= 4))
        try {
          nx(e, n, a)
        } finally {
          ;((Xe = y), (H.p = c), (N.T = i))
        }
      }
      ;((Vt = 1), Wg(), Jg(), ey())
    }
  }
  function Wg() {
    if (Vt === 1) {
      Vt = 0
      var e = oa,
        n = El,
        a = (n.flags & 13878) !== 0
      if ((n.subtreeFlags & 13878) !== 0 || a) {
        ;((a = N.T), (N.T = null))
        var i = H.p
        H.p = 2
        var c = Xe
        Xe |= 4
        try {
          zg(n, e)
          var d = sd,
            y = Hh(e.containerInfo),
            E = d.focusedElem,
            B = d.selectionRange
          if (y !== E && E && E.ownerDocument && $h(E.ownerDocument.documentElement, E)) {
            if (B !== null && zc(E)) {
              var Y = B.start,
                ne = B.end
              if ((ne === void 0 && (ne = Y), 'selectionStart' in E))
                ((E.selectionStart = Y), (E.selectionEnd = Math.min(ne, E.value.length)))
              else {
                var ae = E.ownerDocument || document,
                  K = (ae && ae.defaultView) || window
                if (K.getSelection) {
                  var X = K.getSelection(),
                    Ce = E.textContent.length,
                    xe = Math.min(B.start, Ce),
                    at = B.end === void 0 ? xe : Math.min(B.end, Ce)
                  !X.extend && xe > at && ((y = at), (at = xe), (xe = y))
                  var P = jh(E, xe),
                    j = jh(E, at)
                  if (
                    P &&
                    j &&
                    (X.rangeCount !== 1 ||
                      X.anchorNode !== P.node ||
                      X.anchorOffset !== P.offset ||
                      X.focusNode !== j.node ||
                      X.focusOffset !== j.offset)
                  ) {
                    var F = ae.createRange()
                    ;(F.setStart(P.node, P.offset),
                      X.removeAllRanges(),
                      xe > at
                        ? (X.addRange(F), X.extend(j.node, j.offset))
                        : (F.setEnd(j.node, j.offset), X.addRange(F)))
                  }
                }
              }
            }
            for (ae = [], X = E; (X = X.parentNode);)
              X.nodeType === 1 && ae.push({ element: X, left: X.scrollLeft, top: X.scrollTop })
            for (typeof E.focus == 'function' && E.focus(), E = 0; E < ae.length; E++) {
              var re = ae[E]
              ;((re.element.scrollLeft = re.left), (re.element.scrollTop = re.top))
            }
          }
          ;((Xs = !!id), (sd = id = null))
        } finally {
          ;((Xe = c), (H.p = i), (N.T = a))
        }
      }
      ;((e.current = n), (Vt = 2))
    }
  }
  function Jg() {
    if (Vt === 2) {
      Vt = 0
      var e = oa,
        n = El,
        a = (n.flags & 8772) !== 0
      if ((n.subtreeFlags & 8772) !== 0 || a) {
        ;((a = N.T), (N.T = null))
        var i = H.p
        H.p = 2
        var c = Xe
        Xe |= 4
        try {
          _g(e, n.alternate, n)
        } finally {
          ;((Xe = c), (H.p = i), (N.T = a))
        }
      }
      Vt = 3
    }
  }
  function ey() {
    if (Vt === 4 || Vt === 3) {
      ;((Vt = 0), ge())
      var e = oa,
        n = El,
        a = Tl,
        i = Pg
      ;(n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0
        ? (Vt = 5)
        : ((Vt = 0), (El = oa = null), ty(e, e.pendingLanes))
      var c = e.pendingLanes
      if ((c === 0 && (la = null), Pr(a), (n = n.stateNode), je && typeof je.onCommitFiberRoot == 'function'))
        try {
          je.onCommitFiberRoot(Nt, n, void 0, (n.current.flags & 128) === 128)
        } catch {}
      if (i !== null) {
        ;((n = N.T), (c = H.p), (H.p = 2), (N.T = null))
        try {
          for (var d = e.onRecoverableError, y = 0; y < i.length; y++) {
            var E = i[y]
            d(E.value, { componentStack: E.stack })
          }
        } finally {
          ;((N.T = n), (H.p = c))
        }
      }
      ;((Tl & 3) !== 0 && Ls(),
        er(e),
        (c = e.pendingLanes),
        (a & 4194090) !== 0 && (c & 42) !== 0 ? (e === Gf ? qo++ : ((qo = 0), (Gf = e))) : (qo = 0),
        Io(0))
    }
  }
  function ty(e, n) {
    ;(e.pooledCacheLanes &= n) === 0 && ((n = e.pooledCache), n != null && ((e.pooledCache = null), Ro(n)))
  }
  function Ls(e) {
    return (Wg(), Jg(), ey(), ny())
  }
  function ny() {
    if (Vt !== 5) return !1
    var e = oa,
      n = Yf
    Yf = 0
    var a = Pr(Tl),
      i = N.T,
      c = H.p
    try {
      ;((H.p = 32 > a ? 32 : a), (N.T = null), (a = Vf), (Vf = null))
      var d = oa,
        y = Tl
      if (((Vt = 0), (El = oa = null), (Tl = 0), (Xe & 6) !== 0)) throw Error(o(331))
      var E = Xe
      if (
        ((Xe |= 4),
        $g(d.current),
        kg(d, d.current, y, a),
        (Xe = E),
        Io(0, !1),
        je && typeof je.onPostCommitFiberRoot == 'function')
      )
        try {
          je.onPostCommitFiberRoot(Nt, d)
        } catch {}
      return !0
    } finally {
      ;((H.p = c), (N.T = i), ty(e, n))
    }
  }
  function ry(e, n, a) {
    ;((n = Mn(a, n)), (n = Cf(e.stateNode, n, 2)), (e = Qr(e, n, 2)), e !== null && (va(e, 2), er(e)))
  }
  function st(e, n, a) {
    if (e.tag === 3) ry(e, e, a)
    else
      for (; n !== null;) {
        if (n.tag === 3) {
          ry(n, e, a)
          break
        } else if (n.tag === 1) {
          var i = n.stateNode
          if (
            typeof n.type.getDerivedStateFromError == 'function' ||
            (typeof i.componentDidCatch == 'function' && (la === null || !la.has(i)))
          ) {
            ;((e = Mn(a, e)), (a = ig(2)), (i = Qr(n, a, 2)), i !== null && (sg(a, i, n, e), va(i, 2), er(i)))
            break
          }
        }
        n = n.return
      }
  }
  function Zf(e, n, a) {
    var i = e.pingCache
    if (i === null) {
      i = e.pingCache = new lx()
      var c = new Set()
      i.set(n, c)
    } else ((c = i.get(n)), c === void 0 && ((c = new Set()), i.set(n, c)))
    c.has(a) || ((Pf = !0), c.add(a), (e = cx.bind(null, e, n, a)), n.then(e, e))
  }
  function cx(e, n, a) {
    var i = e.pingCache
    ;(i !== null && i.delete(n),
      (e.pingedLanes |= e.suspendedLanes & a),
      (e.warmLanes &= ~a),
      ft === e &&
        ($e & a) === a &&
        (vt === 4 || (vt === 3 && ($e & 62914560) === $e && 300 > Te() - Ff) ? (Xe & 2) === 0 && Cl(e, 0) : (qf |= a),
        Rl === $e && (Rl = 0)),
      er(e))
  }
  function ay(e, n) {
    ;(n === 0 && (n = Yi()), (e = il(e, n)), e !== null && (va(e, n), er(e)))
  }
  function fx(e) {
    var n = e.memoizedState,
      a = 0
    ;(n !== null && (a = n.retryLane), ay(e, a))
  }
  function dx(e, n) {
    var a = 0
    switch (e.tag) {
      case 13:
        var i = e.stateNode,
          c = e.memoizedState
        c !== null && (a = c.retryLane)
        break
      case 19:
        i = e.stateNode
        break
      case 22:
        i = e.stateNode._retryCache
        break
      default:
        throw Error(o(314))
    }
    ;(i !== null && i.delete(n), ay(e, a))
  }
  function px(e, n) {
    return ze(e, n)
  }
  var js = null,
    Al = null,
    Wf = !1,
    $s = !1,
    Jf = !1,
    $a = 0
  function er(e) {
    ;(e !== Al && e.next === null && (Al === null ? (js = Al = e) : (Al = Al.next = e)),
      ($s = !0),
      Wf || ((Wf = !0), mx()))
  }
  function Io(e, n) {
    if (!Jf && $s) {
      Jf = !0
      do
        for (var a = !1, i = js; i !== null;) {
          if (e !== 0) {
            var c = i.pendingLanes
            if (c === 0) var d = 0
            else {
              var y = i.suspendedLanes,
                E = i.pingedLanes
              ;((d = (1 << (31 - xt(42 | e) + 1)) - 1),
                (d &= c & ~(y & ~E)),
                (d = d & 201326741 ? (d & 201326741) | 1 : d ? d | 2 : 0))
            }
            d !== 0 && ((a = !0), sy(i, d))
          } else
            ((d = $e),
              (d = Hr(i, i === ft ? d : 0, i.cancelPendingCommit !== null || i.timeoutHandle !== -1)),
              (d & 3) === 0 || ba(i, d) || ((a = !0), sy(i, d)))
          i = i.next
        }
      while (a)
      Jf = !1
    }
  }
  function hx() {
    ly()
  }
  function ly() {
    $s = Wf = !1
    var e = 0
    $a !== 0 && (Ex() && (e = $a), ($a = 0))
    for (var n = Te(), a = null, i = js; i !== null;) {
      var c = i.next,
        d = oy(i, n)
      ;(d === 0
        ? ((i.next = null), a === null ? (js = c) : (a.next = c), c === null && (Al = a))
        : ((a = i), (e !== 0 || (d & 3) !== 0) && ($s = !0)),
        (i = c))
    }
    Io(e)
  }
  function oy(e, n) {
    for (var a = e.suspendedLanes, i = e.pingedLanes, c = e.expirationTimes, d = e.pendingLanes & -62914561; 0 < d;) {
      var y = 31 - xt(d),
        E = 1 << y,
        B = c[y]
      ;(B === -1 ? ((E & a) === 0 || (E & i) !== 0) && (c[y] = Ii(E, n)) : B <= n && (e.expiredLanes |= E), (d &= ~E))
    }
    if (
      ((n = ft),
      (a = $e),
      (a = Hr(e, e === n ? a : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      (i = e.callbackNode),
      a === 0 || (e === n && (Qe === 2 || Qe === 9)) || e.cancelPendingCommit !== null)
    )
      return (i !== null && i !== null && Ee(i), (e.callbackNode = null), (e.callbackPriority = 0))
    if ((a & 3) === 0 || ba(e, a)) {
      if (((n = a & -a), n === e.callbackPriority)) return n
      switch ((i !== null && Ee(i), Pr(a))) {
        case 2:
        case 8:
          a = un
          break
        case 32:
          a = cn
          break
        case 268435456:
          a = qt
          break
        default:
          a = cn
      }
      return ((i = iy.bind(null, e)), (a = ze(a, i)), (e.callbackPriority = n), (e.callbackNode = a), n)
    }
    return (i !== null && i !== null && Ee(i), (e.callbackPriority = 2), (e.callbackNode = null), 2)
  }
  function iy(e, n) {
    if (Vt !== 0 && Vt !== 5) return ((e.callbackNode = null), (e.callbackPriority = 0), null)
    var a = e.callbackNode
    if (Ls() && e.callbackNode !== a) return null
    var i = $e
    return (
      (i = Hr(e, e === ft ? i : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      i === 0
        ? null
        : (Ig(e, i, n), oy(e, Te()), e.callbackNode != null && e.callbackNode === a ? iy.bind(null, e) : null)
    )
  }
  function sy(e, n) {
    if (Ls()) return null
    Ig(e, n, !0)
  }
  function mx() {
    Cx(function () {
      ;(Xe & 6) !== 0 ? ze(He, hx) : ly()
    })
  }
  function ed() {
    return ($a === 0 && ($a = Fi()), $a)
  }
  function uy(e) {
    return e == null || typeof e == 'symbol' || typeof e == 'boolean' ? null : typeof e == 'function' ? e : Qi('' + e)
  }
  function cy(e, n) {
    var a = n.ownerDocument.createElement('input')
    return (
      (a.name = n.name),
      (a.value = n.value),
      e.id && a.setAttribute('form', e.id),
      n.parentNode.insertBefore(a, n),
      (e = new FormData(e)),
      a.parentNode.removeChild(a),
      e
    )
  }
  function gx(e, n, a, i, c) {
    if (n === 'submit' && a && a.stateNode === c) {
      var d = uy((c[Lt] || null).action),
        y = i.submitter
      y &&
        ((n = (n = y[Lt] || null) ? uy(n.formAction) : y.getAttribute('formAction')),
        n !== null && ((d = n), (y = null)))
      var E = new es('action', 'action', null, i, c)
      e.push({
        event: E,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (i.defaultPrevented) {
                if ($a !== 0) {
                  var B = y ? cy(c, y) : new FormData(c)
                  Sf(a, { pending: !0, data: B, method: c.method, action: d }, null, B)
                }
              } else
                typeof d == 'function' &&
                  (E.preventDefault(),
                  (B = y ? cy(c, y) : new FormData(c)),
                  Sf(a, { pending: !0, data: B, method: c.method, action: d }, d, B))
            },
            currentTarget: c,
          },
        ],
      })
    }
  }
  for (var td = 0; td < jc.length; td++) {
    var nd = jc[td],
      yx = nd.toLowerCase(),
      bx = nd[0].toUpperCase() + nd.slice(1)
    Hn(yx, 'on' + bx)
  }
  ;(Hn(Ih, 'onAnimationEnd'),
    Hn(Fh, 'onAnimationIteration'),
    Hn(Yh, 'onAnimationStart'),
    Hn('dblclick', 'onDoubleClick'),
    Hn('focusin', 'onFocus'),
    Hn('focusout', 'onBlur'),
    Hn(US, 'onTransitionRun'),
    Hn(kS, 'onTransitionStart'),
    Hn(LS, 'onTransitionCancel'),
    Hn(Vh, 'onTransitionEnd'),
    Ge('onMouseEnter', ['mouseout', 'mouseover']),
    Ge('onMouseLeave', ['mouseout', 'mouseover']),
    Ge('onPointerEnter', ['pointerout', 'pointerover']),
    Ge('onPointerLeave', ['pointerout', 'pointerover']),
    we('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' ')),
    we('onSelect', 'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(' ')),
    we('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    we('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' ')),
    we('onCompositionStart', 'compositionstart focusout keydown keypress keyup mousedown'.split(' ')),
    we('onCompositionUpdate', 'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')))
  var Fo =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    vx = new Set('beforetoggle cancel close invalid load scroll scrollend toggle'.split(' ').concat(Fo))
  function fy(e, n) {
    n = (n & 4) !== 0
    for (var a = 0; a < e.length; a++) {
      var i = e[a],
        c = i.event
      i = i.listeners
      e: {
        var d = void 0
        if (n)
          for (var y = i.length - 1; 0 <= y; y--) {
            var E = i[y],
              B = E.instance,
              Y = E.currentTarget
            if (((E = E.listener), B !== d && c.isPropagationStopped())) break e
            ;((d = E), (c.currentTarget = Y))
            try {
              d(c)
            } catch (ne) {
              ws(ne)
            }
            ;((c.currentTarget = null), (d = B))
          }
        else
          for (y = 0; y < i.length; y++) {
            if (
              ((E = i[y]),
              (B = E.instance),
              (Y = E.currentTarget),
              (E = E.listener),
              B !== d && c.isPropagationStopped())
            )
              break e
            ;((d = E), (c.currentTarget = Y))
            try {
              d(c)
            } catch (ne) {
              ws(ne)
            }
            ;((c.currentTarget = null), (d = B))
          }
      }
    }
  }
  function Le(e, n) {
    var a = n[Xn]
    a === void 0 && (a = n[Xn] = new Set())
    var i = e + '__bubble'
    a.has(i) || (dy(n, e, 2, !1), a.add(i))
  }
  function rd(e, n, a) {
    var i = 0
    ;(n && (i |= 4), dy(a, e, i, n))
  }
  var Hs = '_reactListening' + Math.random().toString(36).slice(2)
  function ad(e) {
    if (!e[Hs]) {
      ;((e[Hs] = !0),
        se.forEach(function (a) {
          a !== 'selectionchange' && (vx.has(a) || rd(a, !1, e), rd(a, !0, e))
        }))
      var n = e.nodeType === 9 ? e : e.ownerDocument
      n === null || n[Hs] || ((n[Hs] = !0), rd('selectionchange', !1, n))
    }
  }
  function dy(e, n, a, i) {
    switch (ky(n)) {
      case 2:
        var c = Vx
        break
      case 8:
        c = Gx
        break
      default:
        c = bd
    }
    ;((a = c.bind(null, n, a, e)),
      (c = void 0),
      !Cc || (n !== 'touchstart' && n !== 'touchmove' && n !== 'wheel') || (c = !0),
      i
        ? c !== void 0
          ? e.addEventListener(n, a, { capture: !0, passive: c })
          : e.addEventListener(n, a, !0)
        : c !== void 0
          ? e.addEventListener(n, a, { passive: c })
          : e.addEventListener(n, a, !1))
  }
  function ld(e, n, a, i, c) {
    var d = i
    if ((n & 1) === 0 && (n & 2) === 0 && i !== null)
      e: for (;;) {
        if (i === null) return
        var y = i.tag
        if (y === 3 || y === 4) {
          var E = i.stateNode.containerInfo
          if (E === c) break
          if (y === 4)
            for (y = i.return; y !== null;) {
              var B = y.tag
              if ((B === 3 || B === 4) && y.stateNode.containerInfo === c) return
              y = y.return
            }
          for (; E !== null;) {
            if (((y = Ir(E)), y === null)) return
            if (((B = y.tag), B === 5 || B === 6 || B === 26 || B === 27)) {
              i = d = y
              continue e
            }
            E = E.parentNode
          }
        }
        i = i.return
      }
    vh(function () {
      var Y = d,
        ne = Ec(a),
        ae = []
      e: {
        var K = Gh.get(e)
        if (K !== void 0) {
          var X = es,
            Ce = e
          switch (e) {
            case 'keypress':
              if (Wi(a) === 0) break e
            case 'keydown':
            case 'keyup':
              X = pS
              break
            case 'focusin':
              ;((Ce = 'focus'), (X = Mc))
              break
            case 'focusout':
              ;((Ce = 'blur'), (X = Mc))
              break
            case 'beforeblur':
            case 'afterblur':
              X = Mc
              break
            case 'click':
              if (a.button === 2) break e
            case 'auxclick':
            case 'dblclick':
            case 'mousedown':
            case 'mousemove':
            case 'mouseup':
            case 'mouseout':
            case 'mouseover':
            case 'contextmenu':
              X = Rh
              break
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              X = tS
              break
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              X = gS
              break
            case Ih:
            case Fh:
            case Yh:
              X = aS
              break
            case Vh:
              X = bS
              break
            case 'scroll':
            case 'scrollend':
              X = J1
              break
            case 'wheel':
              X = SS
              break
            case 'copy':
            case 'cut':
            case 'paste':
              X = oS
              break
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              X = Th
              break
            case 'toggle':
            case 'beforetoggle':
              X = RS
          }
          var xe = (n & 4) !== 0,
            at = !xe && (e === 'scroll' || e === 'scrollend'),
            P = xe ? (K !== null ? K + 'Capture' : null) : K
          xe = []
          for (var j = Y, F; j !== null;) {
            var re = j
            if (
              ((F = re.stateNode),
              (re = re.tag),
              (re !== 5 && re !== 26 && re !== 27) ||
                F === null ||
                P === null ||
                ((re = so(j, P)), re != null && xe.push(Yo(j, re, F))),
              at)
            )
              break
            j = j.return
          }
          0 < xe.length && ((K = new X(K, Ce, null, a, ne)), ae.push({ event: K, listeners: xe }))
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (
            ((K = e === 'mouseover' || e === 'pointerover'),
            (X = e === 'mouseout' || e === 'pointerout'),
            K && a !== Rc && (Ce = a.relatedTarget || a.fromElement) && (Ir(Ce) || Ce[qr]))
          )
            break e
          if (
            (X || K) &&
            ((K = ne.window === ne ? ne : (K = ne.ownerDocument) ? K.defaultView || K.parentWindow : window),
            X
              ? ((Ce = a.relatedTarget || a.toElement),
                (X = Y),
                (Ce = Ce ? Ir(Ce) : null),
                Ce !== null &&
                  ((at = u(Ce)), (xe = Ce.tag), Ce !== at || (xe !== 5 && xe !== 27 && xe !== 6)) &&
                  (Ce = null))
              : ((X = null), (Ce = Y)),
            X !== Ce)
          ) {
            if (
              ((xe = Rh),
              (re = 'onMouseLeave'),
              (P = 'onMouseEnter'),
              (j = 'mouse'),
              (e === 'pointerout' || e === 'pointerover') &&
                ((xe = Th), (re = 'onPointerLeave'), (P = 'onPointerEnter'), (j = 'pointer')),
              (at = X == null ? K : Fr(X)),
              (F = Ce == null ? K : Fr(Ce)),
              (K = new xe(re, j + 'leave', X, a, ne)),
              (K.target = at),
              (K.relatedTarget = F),
              (re = null),
              Ir(ne) === Y &&
                ((xe = new xe(P, j + 'enter', Ce, a, ne)), (xe.target = F), (xe.relatedTarget = at), (re = xe)),
              (at = re),
              X && Ce)
            )
              t: {
                for (xe = X, P = Ce, j = 0, F = xe; F; F = Ol(F)) j++
                for (F = 0, re = P; re; re = Ol(re)) F++
                for (; 0 < j - F;) ((xe = Ol(xe)), j--)
                for (; 0 < F - j;) ((P = Ol(P)), F--)
                for (; j--;) {
                  if (xe === P || (P !== null && xe === P.alternate)) break t
                  ;((xe = Ol(xe)), (P = Ol(P)))
                }
                xe = null
              }
            else xe = null
            ;(X !== null && py(ae, K, X, xe, !1), Ce !== null && at !== null && py(ae, at, Ce, xe, !0))
          }
        }
        e: {
          if (
            ((K = Y ? Fr(Y) : window),
            (X = K.nodeName && K.nodeName.toLowerCase()),
            X === 'select' || (X === 'input' && K.type === 'file'))
          )
            var he = Dh
          else if (_h(K))
            if (Bh) he = DS
            else {
              he = _S
              var Ue = MS
            }
          else
            ((X = K.nodeName),
              !X || X.toLowerCase() !== 'input' || (K.type !== 'checkbox' && K.type !== 'radio')
                ? Y && xc(Y.elementType) && (he = Dh)
                : (he = NS))
          if (he && (he = he(e, Y))) {
            Nh(ae, he, a, ne)
            break e
          }
          ;(Ue && Ue(e, K, Y),
            e === 'focusout' && Y && K.type === 'number' && Y.memoizedProps.value != null && Sc(K, 'number', K.value))
        }
        switch (((Ue = Y ? Fr(Y) : window), e)) {
          case 'focusin':
            ;(_h(Ue) || Ue.contentEditable === 'true') && ((al = Ue), (Uc = Y), (yo = null))
            break
          case 'focusout':
            yo = Uc = al = null
            break
          case 'mousedown':
            kc = !0
            break
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ;((kc = !1), Ph(ae, a, ne))
            break
          case 'selectionchange':
            if (zS) break
          case 'keydown':
          case 'keyup':
            Ph(ae, a, ne)
        }
        var ve
        if (Nc)
          e: {
            switch (e) {
              case 'compositionstart':
                var Re = 'onCompositionStart'
                break e
              case 'compositionend':
                Re = 'onCompositionEnd'
                break e
              case 'compositionupdate':
                Re = 'onCompositionUpdate'
                break e
            }
            Re = void 0
          }
        else
          rl
            ? Oh(e, a) && (Re = 'onCompositionEnd')
            : e === 'keydown' && a.keyCode === 229 && (Re = 'onCompositionStart')
        ;(Re &&
          (Ch &&
            a.locale !== 'ko' &&
            (rl || Re !== 'onCompositionStart'
              ? Re === 'onCompositionEnd' && rl && (ve = Sh())
              : ((Vr = ne), (wc = 'value' in Vr ? Vr.value : Vr.textContent), (rl = !0))),
          (Ue = Ps(Y, Re)),
          0 < Ue.length &&
            ((Re = new Eh(Re, e, null, a, ne)),
            ae.push({ event: Re, listeners: Ue }),
            ve ? (Re.data = ve) : ((ve = Mh(a)), ve !== null && (Re.data = ve)))),
          (ve = TS ? CS(e, a) : wS(e, a)) &&
            ((Re = Ps(Y, 'onBeforeInput')),
            0 < Re.length &&
              ((Ue = new Eh('onBeforeInput', 'beforeinput', null, a, ne)),
              ae.push({ event: Ue, listeners: Re }),
              (Ue.data = ve))),
          gx(ae, e, Y, a, ne))
      }
      fy(ae, n)
    })
  }
  function Yo(e, n, a) {
    return { instance: e, listener: n, currentTarget: a }
  }
  function Ps(e, n) {
    for (var a = n + 'Capture', i = []; e !== null;) {
      var c = e,
        d = c.stateNode
      if (
        ((c = c.tag),
        (c !== 5 && c !== 26 && c !== 27) ||
          d === null ||
          ((c = so(e, a)), c != null && i.unshift(Yo(e, c, d)), (c = so(e, n)), c != null && i.push(Yo(e, c, d))),
        e.tag === 3)
      )
        return i
      e = e.return
    }
    return []
  }
  function Ol(e) {
    if (e === null) return null
    do e = e.return
    while (e && e.tag !== 5 && e.tag !== 27)
    return e || null
  }
  function py(e, n, a, i, c) {
    for (var d = n._reactName, y = []; a !== null && a !== i;) {
      var E = a,
        B = E.alternate,
        Y = E.stateNode
      if (((E = E.tag), B !== null && B === i)) break
      ;((E !== 5 && E !== 26 && E !== 27) ||
        Y === null ||
        ((B = Y),
        c
          ? ((Y = so(a, d)), Y != null && y.unshift(Yo(a, Y, B)))
          : c || ((Y = so(a, d)), Y != null && y.push(Yo(a, Y, B)))),
        (a = a.return))
    }
    y.length !== 0 && e.push({ event: n, listeners: y })
  }
  var Sx = /\r\n?/g,
    xx = /\u0000|\uFFFD/g
  function hy(e) {
    return (typeof e == 'string' ? e : '' + e)
      .replace(
        Sx,
        `
`
      )
      .replace(xx, '')
  }
  function my(e, n) {
    return ((n = hy(n)), hy(e) === n)
  }
  function qs() {}
  function rt(e, n, a, i, c, d) {
    switch (a) {
      case 'children':
        typeof i == 'string'
          ? n === 'body' || (n === 'textarea' && i === '') || el(e, i)
          : (typeof i == 'number' || typeof i == 'bigint') && n !== 'body' && el(e, '' + i)
        break
      case 'className':
        Yr(e, 'class', i)
        break
      case 'tabIndex':
        Yr(e, 'tabindex', i)
        break
      case 'dir':
      case 'role':
      case 'viewBox':
      case 'width':
      case 'height':
        Yr(e, a, i)
        break
      case 'style':
        yh(e, i, d)
        break
      case 'data':
        if (n !== 'object') {
          Yr(e, 'data', i)
          break
        }
      case 'src':
      case 'href':
        if (i === '' && (n !== 'a' || a !== 'href')) {
          e.removeAttribute(a)
          break
        }
        if (i == null || typeof i == 'function' || typeof i == 'symbol' || typeof i == 'boolean') {
          e.removeAttribute(a)
          break
        }
        ;((i = Qi('' + i)), e.setAttribute(a, i))
        break
      case 'action':
      case 'formAction':
        if (typeof i == 'function') {
          e.setAttribute(
            a,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          )
          break
        } else
          typeof d == 'function' &&
            (a === 'formAction'
              ? (n !== 'input' && rt(e, n, 'name', c.name, c, null),
                rt(e, n, 'formEncType', c.formEncType, c, null),
                rt(e, n, 'formMethod', c.formMethod, c, null),
                rt(e, n, 'formTarget', c.formTarget, c, null))
              : (rt(e, n, 'encType', c.encType, c, null),
                rt(e, n, 'method', c.method, c, null),
                rt(e, n, 'target', c.target, c, null)))
        if (i == null || typeof i == 'symbol' || typeof i == 'boolean') {
          e.removeAttribute(a)
          break
        }
        ;((i = Qi('' + i)), e.setAttribute(a, i))
        break
      case 'onClick':
        i != null && (e.onclick = qs)
        break
      case 'onScroll':
        i != null && Le('scroll', e)
        break
      case 'onScrollEnd':
        i != null && Le('scrollend', e)
        break
      case 'dangerouslySetInnerHTML':
        if (i != null) {
          if (typeof i != 'object' || !('__html' in i)) throw Error(o(61))
          if (((a = i.__html), a != null)) {
            if (c.children != null) throw Error(o(60))
            e.innerHTML = a
          }
        }
        break
      case 'multiple':
        e.multiple = i && typeof i != 'function' && typeof i != 'symbol'
        break
      case 'muted':
        e.muted = i && typeof i != 'function' && typeof i != 'symbol'
        break
      case 'suppressContentEditableWarning':
      case 'suppressHydrationWarning':
      case 'defaultValue':
      case 'defaultChecked':
      case 'innerHTML':
      case 'ref':
        break
      case 'autoFocus':
        break
      case 'xlinkHref':
        if (i == null || typeof i == 'function' || typeof i == 'boolean' || typeof i == 'symbol') {
          e.removeAttribute('xlink:href')
          break
        }
        ;((a = Qi('' + i)), e.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', a))
        break
      case 'contentEditable':
      case 'spellCheck':
      case 'draggable':
      case 'value':
      case 'autoReverse':
      case 'externalResourcesRequired':
      case 'focusable':
      case 'preserveAlpha':
        i != null && typeof i != 'function' && typeof i != 'symbol' ? e.setAttribute(a, '' + i) : e.removeAttribute(a)
        break
      case 'inert':
      case 'allowFullScreen':
      case 'async':
      case 'autoPlay':
      case 'controls':
      case 'default':
      case 'defer':
      case 'disabled':
      case 'disablePictureInPicture':
      case 'disableRemotePlayback':
      case 'formNoValidate':
      case 'hidden':
      case 'loop':
      case 'noModule':
      case 'noValidate':
      case 'open':
      case 'playsInline':
      case 'readOnly':
      case 'required':
      case 'reversed':
      case 'scoped':
      case 'seamless':
      case 'itemScope':
        i && typeof i != 'function' && typeof i != 'symbol' ? e.setAttribute(a, '') : e.removeAttribute(a)
        break
      case 'capture':
      case 'download':
        i === !0
          ? e.setAttribute(a, '')
          : i !== !1 && i != null && typeof i != 'function' && typeof i != 'symbol'
            ? e.setAttribute(a, i)
            : e.removeAttribute(a)
        break
      case 'cols':
      case 'rows':
      case 'size':
      case 'span':
        i != null && typeof i != 'function' && typeof i != 'symbol' && !isNaN(i) && 1 <= i
          ? e.setAttribute(a, i)
          : e.removeAttribute(a)
        break
      case 'rowSpan':
      case 'start':
        i == null || typeof i == 'function' || typeof i == 'symbol' || isNaN(i)
          ? e.removeAttribute(a)
          : e.setAttribute(a, i)
        break
      case 'popover':
        ;(Le('beforetoggle', e), Le('toggle', e), Ea(e, 'popover', i))
        break
      case 'xlinkActuate':
        gr(e, 'http://www.w3.org/1999/xlink', 'xlink:actuate', i)
        break
      case 'xlinkArcrole':
        gr(e, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', i)
        break
      case 'xlinkRole':
        gr(e, 'http://www.w3.org/1999/xlink', 'xlink:role', i)
        break
      case 'xlinkShow':
        gr(e, 'http://www.w3.org/1999/xlink', 'xlink:show', i)
        break
      case 'xlinkTitle':
        gr(e, 'http://www.w3.org/1999/xlink', 'xlink:title', i)
        break
      case 'xlinkType':
        gr(e, 'http://www.w3.org/1999/xlink', 'xlink:type', i)
        break
      case 'xmlBase':
        gr(e, 'http://www.w3.org/XML/1998/namespace', 'xml:base', i)
        break
      case 'xmlLang':
        gr(e, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', i)
        break
      case 'xmlSpace':
        gr(e, 'http://www.w3.org/XML/1998/namespace', 'xml:space', i)
        break
      case 'is':
        Ea(e, 'is', i)
        break
      case 'innerText':
      case 'textContent':
        break
      default:
        ;(!(2 < a.length) || (a[0] !== 'o' && a[0] !== 'O') || (a[1] !== 'n' && a[1] !== 'N')) &&
          ((a = Z1.get(a) || a), Ea(e, a, i))
    }
  }
  function od(e, n, a, i, c, d) {
    switch (a) {
      case 'style':
        yh(e, i, d)
        break
      case 'dangerouslySetInnerHTML':
        if (i != null) {
          if (typeof i != 'object' || !('__html' in i)) throw Error(o(61))
          if (((a = i.__html), a != null)) {
            if (c.children != null) throw Error(o(60))
            e.innerHTML = a
          }
        }
        break
      case 'children':
        typeof i == 'string' ? el(e, i) : (typeof i == 'number' || typeof i == 'bigint') && el(e, '' + i)
        break
      case 'onScroll':
        i != null && Le('scroll', e)
        break
      case 'onScrollEnd':
        i != null && Le('scrollend', e)
        break
      case 'onClick':
        i != null && (e.onclick = qs)
        break
      case 'suppressContentEditableWarning':
      case 'suppressHydrationWarning':
      case 'innerHTML':
      case 'ref':
        break
      case 'innerText':
      case 'textContent':
        break
      default:
        if (!be.hasOwnProperty(a))
          e: {
            if (
              a[0] === 'o' &&
              a[1] === 'n' &&
              ((c = a.endsWith('Capture')),
              (n = a.slice(2, c ? a.length - 7 : void 0)),
              (d = e[Lt] || null),
              (d = d != null ? d[a] : null),
              typeof d == 'function' && e.removeEventListener(n, d, c),
              typeof i == 'function')
            ) {
              ;(typeof d != 'function' &&
                d !== null &&
                (a in e ? (e[a] = null) : e.hasAttribute(a) && e.removeAttribute(a)),
                e.addEventListener(n, i, c))
              break e
            }
            a in e ? (e[a] = i) : i === !0 ? e.setAttribute(a, '') : Ea(e, a, i)
          }
    }
  }
  function Gt(e, n, a) {
    switch (n) {
      case 'div':
      case 'span':
      case 'svg':
      case 'path':
      case 'a':
      case 'g':
      case 'p':
      case 'li':
        break
      case 'img':
        ;(Le('error', e), Le('load', e))
        var i = !1,
          c = !1,
          d
        for (d in a)
          if (a.hasOwnProperty(d)) {
            var y = a[d]
            if (y != null)
              switch (d) {
                case 'src':
                  i = !0
                  break
                case 'srcSet':
                  c = !0
                  break
                case 'children':
                case 'dangerouslySetInnerHTML':
                  throw Error(o(137, n))
                default:
                  rt(e, n, d, y, a, null)
              }
          }
        ;(c && rt(e, n, 'srcSet', a.srcSet, a, null), i && rt(e, n, 'src', a.src, a, null))
        return
      case 'input':
        Le('invalid', e)
        var E = (d = y = c = null),
          B = null,
          Y = null
        for (i in a)
          if (a.hasOwnProperty(i)) {
            var ne = a[i]
            if (ne != null)
              switch (i) {
                case 'name':
                  c = ne
                  break
                case 'type':
                  y = ne
                  break
                case 'checked':
                  B = ne
                  break
                case 'defaultChecked':
                  Y = ne
                  break
                case 'value':
                  d = ne
                  break
                case 'defaultValue':
                  E = ne
                  break
                case 'children':
                case 'dangerouslySetInnerHTML':
                  if (ne != null) throw Error(o(137, n))
                  break
                default:
                  rt(e, n, i, ne, a, null)
              }
          }
        ;(ph(e, d, E, B, Y, y, c, !1), Ki(e))
        return
      case 'select':
        ;(Le('invalid', e), (i = y = d = null))
        for (c in a)
          if (a.hasOwnProperty(c) && ((E = a[c]), E != null))
            switch (c) {
              case 'value':
                d = E
                break
              case 'defaultValue':
                y = E
                break
              case 'multiple':
                i = E
              default:
                rt(e, n, c, E, a, null)
            }
        ;((n = d), (a = y), (e.multiple = !!i), n != null ? Ja(e, !!i, n, !1) : a != null && Ja(e, !!i, a, !0))
        return
      case 'textarea':
        ;(Le('invalid', e), (d = c = i = null))
        for (y in a)
          if (a.hasOwnProperty(y) && ((E = a[y]), E != null))
            switch (y) {
              case 'value':
                i = E
                break
              case 'defaultValue':
                c = E
                break
              case 'children':
                d = E
                break
              case 'dangerouslySetInnerHTML':
                if (E != null) throw Error(o(91))
                break
              default:
                rt(e, n, y, E, a, null)
            }
        ;(mh(e, i, c, d), Ki(e))
        return
      case 'option':
        for (B in a)
          if (a.hasOwnProperty(B) && ((i = a[B]), i != null))
            switch (B) {
              case 'selected':
                e.selected = i && typeof i != 'function' && typeof i != 'symbol'
                break
              default:
                rt(e, n, B, i, a, null)
            }
        return
      case 'dialog':
        ;(Le('beforetoggle', e), Le('toggle', e), Le('cancel', e), Le('close', e))
        break
      case 'iframe':
      case 'object':
        Le('load', e)
        break
      case 'video':
      case 'audio':
        for (i = 0; i < Fo.length; i++) Le(Fo[i], e)
        break
      case 'image':
        ;(Le('error', e), Le('load', e))
        break
      case 'details':
        Le('toggle', e)
        break
      case 'embed':
      case 'source':
      case 'link':
        ;(Le('error', e), Le('load', e))
      case 'area':
      case 'base':
      case 'br':
      case 'col':
      case 'hr':
      case 'keygen':
      case 'meta':
      case 'param':
      case 'track':
      case 'wbr':
      case 'menuitem':
        for (Y in a)
          if (a.hasOwnProperty(Y) && ((i = a[Y]), i != null))
            switch (Y) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                throw Error(o(137, n))
              default:
                rt(e, n, Y, i, a, null)
            }
        return
      default:
        if (xc(n)) {
          for (ne in a) a.hasOwnProperty(ne) && ((i = a[ne]), i !== void 0 && od(e, n, ne, i, a, void 0))
          return
        }
    }
    for (E in a) a.hasOwnProperty(E) && ((i = a[E]), i != null && rt(e, n, E, i, a, null))
  }
  function Rx(e, n, a, i) {
    switch (n) {
      case 'div':
      case 'span':
      case 'svg':
      case 'path':
      case 'a':
      case 'g':
      case 'p':
      case 'li':
        break
      case 'input':
        var c = null,
          d = null,
          y = null,
          E = null,
          B = null,
          Y = null,
          ne = null
        for (X in a) {
          var ae = a[X]
          if (a.hasOwnProperty(X) && ae != null)
            switch (X) {
              case 'checked':
                break
              case 'value':
                break
              case 'defaultValue':
                B = ae
              default:
                i.hasOwnProperty(X) || rt(e, n, X, null, i, ae)
            }
        }
        for (var K in i) {
          var X = i[K]
          if (((ae = a[K]), i.hasOwnProperty(K) && (X != null || ae != null)))
            switch (K) {
              case 'type':
                d = X
                break
              case 'name':
                c = X
                break
              case 'checked':
                Y = X
                break
              case 'defaultChecked':
                ne = X
                break
              case 'value':
                y = X
                break
              case 'defaultValue':
                E = X
                break
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (X != null) throw Error(o(137, n))
                break
              default:
                X !== ae && rt(e, n, K, X, i, ae)
            }
        }
        vc(e, y, E, B, Y, ne, d, c)
        return
      case 'select':
        X = y = E = K = null
        for (d in a)
          if (((B = a[d]), a.hasOwnProperty(d) && B != null))
            switch (d) {
              case 'value':
                break
              case 'multiple':
                X = B
              default:
                i.hasOwnProperty(d) || rt(e, n, d, null, i, B)
            }
        for (c in i)
          if (((d = i[c]), (B = a[c]), i.hasOwnProperty(c) && (d != null || B != null)))
            switch (c) {
              case 'value':
                K = d
                break
              case 'defaultValue':
                E = d
                break
              case 'multiple':
                y = d
              default:
                d !== B && rt(e, n, c, d, i, B)
            }
        ;((n = E),
          (a = y),
          (i = X),
          K != null ? Ja(e, !!a, K, !1) : !!i != !!a && (n != null ? Ja(e, !!a, n, !0) : Ja(e, !!a, a ? [] : '', !1)))
        return
      case 'textarea':
        X = K = null
        for (E in a)
          if (((c = a[E]), a.hasOwnProperty(E) && c != null && !i.hasOwnProperty(E)))
            switch (E) {
              case 'value':
                break
              case 'children':
                break
              default:
                rt(e, n, E, null, i, c)
            }
        for (y in i)
          if (((c = i[y]), (d = a[y]), i.hasOwnProperty(y) && (c != null || d != null)))
            switch (y) {
              case 'value':
                K = c
                break
              case 'defaultValue':
                X = c
                break
              case 'children':
                break
              case 'dangerouslySetInnerHTML':
                if (c != null) throw Error(o(91))
                break
              default:
                c !== d && rt(e, n, y, c, i, d)
            }
        hh(e, K, X)
        return
      case 'option':
        for (var Ce in a)
          if (((K = a[Ce]), a.hasOwnProperty(Ce) && K != null && !i.hasOwnProperty(Ce)))
            switch (Ce) {
              case 'selected':
                e.selected = !1
                break
              default:
                rt(e, n, Ce, null, i, K)
            }
        for (B in i)
          if (((K = i[B]), (X = a[B]), i.hasOwnProperty(B) && K !== X && (K != null || X != null)))
            switch (B) {
              case 'selected':
                e.selected = K && typeof K != 'function' && typeof K != 'symbol'
                break
              default:
                rt(e, n, B, K, i, X)
            }
        return
      case 'img':
      case 'link':
      case 'area':
      case 'base':
      case 'br':
      case 'col':
      case 'embed':
      case 'hr':
      case 'keygen':
      case 'meta':
      case 'param':
      case 'source':
      case 'track':
      case 'wbr':
      case 'menuitem':
        for (var xe in a)
          ((K = a[xe]), a.hasOwnProperty(xe) && K != null && !i.hasOwnProperty(xe) && rt(e, n, xe, null, i, K))
        for (Y in i)
          if (((K = i[Y]), (X = a[Y]), i.hasOwnProperty(Y) && K !== X && (K != null || X != null)))
            switch (Y) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (K != null) throw Error(o(137, n))
                break
              default:
                rt(e, n, Y, K, i, X)
            }
        return
      default:
        if (xc(n)) {
          for (var at in a)
            ((K = a[at]), a.hasOwnProperty(at) && K !== void 0 && !i.hasOwnProperty(at) && od(e, n, at, void 0, i, K))
          for (ne in i)
            ((K = i[ne]),
              (X = a[ne]),
              !i.hasOwnProperty(ne) || K === X || (K === void 0 && X === void 0) || od(e, n, ne, K, i, X))
          return
        }
    }
    for (var P in a) ((K = a[P]), a.hasOwnProperty(P) && K != null && !i.hasOwnProperty(P) && rt(e, n, P, null, i, K))
    for (ae in i)
      ((K = i[ae]), (X = a[ae]), !i.hasOwnProperty(ae) || K === X || (K == null && X == null) || rt(e, n, ae, K, i, X))
  }
  var id = null,
    sd = null
  function Is(e) {
    return e.nodeType === 9 ? e : e.ownerDocument
  }
  function gy(e) {
    switch (e) {
      case 'http://www.w3.org/2000/svg':
        return 1
      case 'http://www.w3.org/1998/Math/MathML':
        return 2
      default:
        return 0
    }
  }
  function yy(e, n) {
    if (e === 0)
      switch (n) {
        case 'svg':
          return 1
        case 'math':
          return 2
        default:
          return 0
      }
    return e === 1 && n === 'foreignObject' ? 0 : e
  }
  function ud(e, n) {
    return (
      e === 'textarea' ||
      e === 'noscript' ||
      typeof n.children == 'string' ||
      typeof n.children == 'number' ||
      typeof n.children == 'bigint' ||
      (typeof n.dangerouslySetInnerHTML == 'object' &&
        n.dangerouslySetInnerHTML !== null &&
        n.dangerouslySetInnerHTML.__html != null)
    )
  }
  var cd = null
  function Ex() {
    var e = window.event
    return e && e.type === 'popstate' ? (e === cd ? !1 : ((cd = e), !0)) : ((cd = null), !1)
  }
  var by = typeof setTimeout == 'function' ? setTimeout : void 0,
    Tx = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    vy = typeof Promise == 'function' ? Promise : void 0,
    Cx =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof vy < 'u'
          ? function (e) {
              return vy.resolve(null).then(e).catch(wx)
            }
          : by
  function wx(e) {
    setTimeout(function () {
      throw e
    })
  }
  function sa(e) {
    return e === 'head'
  }
  function Sy(e, n) {
    var a = n,
      i = 0,
      c = 0
    do {
      var d = a.nextSibling
      if ((e.removeChild(a), d && d.nodeType === 8))
        if (((a = d.data), a === '/$')) {
          if (0 < i && 8 > i) {
            a = i
            var y = e.ownerDocument
            if ((a & 1 && Vo(y.documentElement), a & 2 && Vo(y.body), a & 4))
              for (a = y.head, Vo(a), y = a.firstChild; y;) {
                var E = y.nextSibling,
                  B = y.nodeName
                ;(y[xa] ||
                  B === 'SCRIPT' ||
                  B === 'STYLE' ||
                  (B === 'LINK' && y.rel.toLowerCase() === 'stylesheet') ||
                  a.removeChild(y),
                  (y = E))
              }
          }
          if (c === 0) {
            ;(e.removeChild(d), ei(n))
            return
          }
          c--
        } else a === '$' || a === '$?' || a === '$!' ? c++ : (i = a.charCodeAt(0) - 48)
      else i = 0
      a = d
    } while (a)
    ei(n)
  }
  function fd(e) {
    var n = e.firstChild
    for (n && n.nodeType === 10 && (n = n.nextSibling); n;) {
      var a = n
      switch (((n = n.nextSibling), a.nodeName)) {
        case 'HTML':
        case 'HEAD':
        case 'BODY':
          ;(fd(a), Za(a))
          continue
        case 'SCRIPT':
        case 'STYLE':
          continue
        case 'LINK':
          if (a.rel.toLowerCase() === 'stylesheet') continue
      }
      e.removeChild(a)
    }
  }
  function Ax(e, n, a, i) {
    for (; e.nodeType === 1;) {
      var c = a
      if (e.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!i && (e.nodeName !== 'INPUT' || e.type !== 'hidden')) break
      } else if (i) {
        if (!e[xa])
          switch (n) {
            case 'meta':
              if (!e.hasAttribute('itemprop')) break
              return e
            case 'link':
              if (((d = e.getAttribute('rel')), d === 'stylesheet' && e.hasAttribute('data-precedence'))) break
              if (
                d !== c.rel ||
                e.getAttribute('href') !== (c.href == null || c.href === '' ? null : c.href) ||
                e.getAttribute('crossorigin') !== (c.crossOrigin == null ? null : c.crossOrigin) ||
                e.getAttribute('title') !== (c.title == null ? null : c.title)
              )
                break
              return e
            case 'style':
              if (e.hasAttribute('data-precedence')) break
              return e
            case 'script':
              if (
                ((d = e.getAttribute('src')),
                (d !== (c.src == null ? null : c.src) ||
                  e.getAttribute('type') !== (c.type == null ? null : c.type) ||
                  e.getAttribute('crossorigin') !== (c.crossOrigin == null ? null : c.crossOrigin)) &&
                  d &&
                  e.hasAttribute('async') &&
                  !e.hasAttribute('itemprop'))
              )
                break
              return e
            default:
              return e
          }
      } else if (n === 'input' && e.type === 'hidden') {
        var d = c.name == null ? null : '' + c.name
        if (c.type === 'hidden' && e.getAttribute('name') === d) return e
      } else return e
      if (((e = qn(e.nextSibling)), e === null)) break
    }
    return null
  }
  function Ox(e, n, a) {
    if (n === '') return null
    for (; e.nodeType !== 3;)
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !a) ||
        ((e = qn(e.nextSibling)), e === null)
      )
        return null
    return e
  }
  function dd(e) {
    return e.data === '$!' || (e.data === '$?' && e.ownerDocument.readyState === 'complete')
  }
  function Mx(e, n) {
    var a = e.ownerDocument
    if (e.data !== '$?' || a.readyState === 'complete') n()
    else {
      var i = function () {
        ;(n(), a.removeEventListener('DOMContentLoaded', i))
      }
      ;(a.addEventListener('DOMContentLoaded', i), (e._reactRetry = i))
    }
  }
  function qn(e) {
    for (; e != null; e = e.nextSibling) {
      var n = e.nodeType
      if (n === 1 || n === 3) break
      if (n === 8) {
        if (((n = e.data), n === '$' || n === '$!' || n === '$?' || n === 'F!' || n === 'F')) break
        if (n === '/$') return null
      }
    }
    return e
  }
  var pd = null
  function xy(e) {
    e = e.previousSibling
    for (var n = 0; e;) {
      if (e.nodeType === 8) {
        var a = e.data
        if (a === '$' || a === '$!' || a === '$?') {
          if (n === 0) return e
          n--
        } else a === '/$' && n++
      }
      e = e.previousSibling
    }
    return null
  }
  function Ry(e, n, a) {
    switch (((n = Is(a)), e)) {
      case 'html':
        if (((e = n.documentElement), !e)) throw Error(o(452))
        return e
      case 'head':
        if (((e = n.head), !e)) throw Error(o(453))
        return e
      case 'body':
        if (((e = n.body), !e)) throw Error(o(454))
        return e
      default:
        throw Error(o(451))
    }
  }
  function Vo(e) {
    for (var n = e.attributes; n.length;) e.removeAttributeNode(n[0])
    Za(e)
  }
  var Un = new Map(),
    Ey = new Set()
  function Fs(e) {
    return typeof e.getRootNode == 'function' ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument
  }
  var _r = H.d
  H.d = { f: _x, r: Nx, D: Dx, C: Bx, L: zx, m: Ux, X: Lx, S: kx, M: jx }
  function _x() {
    var e = _r.f(),
      n = Us()
    return e || n
  }
  function Nx(e) {
    var n = pr(e)
    n !== null && n.tag === 5 && n.type === 'form' ? Im(n) : _r.r(e)
  }
  var Ml = typeof document > 'u' ? null : document
  function Ty(e, n, a) {
    var i = Ml
    if (i && typeof n == 'string' && n) {
      var c = On(n)
      ;((c = 'link[rel="' + e + '"][href="' + c + '"]'),
        typeof a == 'string' && (c += '[crossorigin="' + a + '"]'),
        Ey.has(c) ||
          (Ey.add(c),
          (e = { rel: e, crossOrigin: a, href: n }),
          i.querySelector(c) === null &&
            ((n = i.createElement('link')), Gt(n, 'link', e), Rt(n), i.head.appendChild(n))))
    }
  }
  function Dx(e) {
    ;(_r.D(e), Ty('dns-prefetch', e, null))
  }
  function Bx(e, n) {
    ;(_r.C(e, n), Ty('preconnect', e, n))
  }
  function zx(e, n, a) {
    _r.L(e, n, a)
    var i = Ml
    if (i && e && n) {
      var c = 'link[rel="preload"][as="' + On(n) + '"]'
      n === 'image' && a && a.imageSrcSet
        ? ((c += '[imagesrcset="' + On(a.imageSrcSet) + '"]'),
          typeof a.imageSizes == 'string' && (c += '[imagesizes="' + On(a.imageSizes) + '"]'))
        : (c += '[href="' + On(e) + '"]')
      var d = c
      switch (n) {
        case 'style':
          d = _l(e)
          break
        case 'script':
          d = Nl(e)
      }
      Un.has(d) ||
        ((e = g({ rel: 'preload', href: n === 'image' && a && a.imageSrcSet ? void 0 : e, as: n }, a)),
        Un.set(d, e),
        i.querySelector(c) !== null ||
          (n === 'style' && i.querySelector(Go(d))) ||
          (n === 'script' && i.querySelector(Ko(d))) ||
          ((n = i.createElement('link')), Gt(n, 'link', e), Rt(n), i.head.appendChild(n)))
    }
  }
  function Ux(e, n) {
    _r.m(e, n)
    var a = Ml
    if (a && e) {
      var i = n && typeof n.as == 'string' ? n.as : 'script',
        c = 'link[rel="modulepreload"][as="' + On(i) + '"][href="' + On(e) + '"]',
        d = c
      switch (i) {
        case 'audioworklet':
        case 'paintworklet':
        case 'serviceworker':
        case 'sharedworker':
        case 'worker':
        case 'script':
          d = Nl(e)
      }
      if (!Un.has(d) && ((e = g({ rel: 'modulepreload', href: e }, n)), Un.set(d, e), a.querySelector(c) === null)) {
        switch (i) {
          case 'audioworklet':
          case 'paintworklet':
          case 'serviceworker':
          case 'sharedworker':
          case 'worker':
          case 'script':
            if (a.querySelector(Ko(d))) return
        }
        ;((i = a.createElement('link')), Gt(i, 'link', e), Rt(i), a.head.appendChild(i))
      }
    }
  }
  function kx(e, n, a) {
    _r.S(e, n, a)
    var i = Ml
    if (i && e) {
      var c = hr(i).hoistableStyles,
        d = _l(e)
      n = n || 'default'
      var y = c.get(d)
      if (!y) {
        var E = { loading: 0, preload: null }
        if ((y = i.querySelector(Go(d)))) E.loading = 5
        else {
          ;((e = g({ rel: 'stylesheet', href: e, 'data-precedence': n }, a)), (a = Un.get(d)) && hd(e, a))
          var B = (y = i.createElement('link'))
          ;(Rt(B),
            Gt(B, 'link', e),
            (B._p = new Promise(function (Y, ne) {
              ;((B.onload = Y), (B.onerror = ne))
            })),
            B.addEventListener('load', function () {
              E.loading |= 1
            }),
            B.addEventListener('error', function () {
              E.loading |= 2
            }),
            (E.loading |= 4),
            Ys(y, n, i))
        }
        ;((y = { type: 'stylesheet', instance: y, count: 1, state: E }), c.set(d, y))
      }
    }
  }
  function Lx(e, n) {
    _r.X(e, n)
    var a = Ml
    if (a && e) {
      var i = hr(a).hoistableScripts,
        c = Nl(e),
        d = i.get(c)
      d ||
        ((d = a.querySelector(Ko(c))),
        d ||
          ((e = g({ src: e, async: !0 }, n)),
          (n = Un.get(c)) && md(e, n),
          (d = a.createElement('script')),
          Rt(d),
          Gt(d, 'link', e),
          a.head.appendChild(d)),
        (d = { type: 'script', instance: d, count: 1, state: null }),
        i.set(c, d))
    }
  }
  function jx(e, n) {
    _r.M(e, n)
    var a = Ml
    if (a && e) {
      var i = hr(a).hoistableScripts,
        c = Nl(e),
        d = i.get(c)
      d ||
        ((d = a.querySelector(Ko(c))),
        d ||
          ((e = g({ src: e, async: !0, type: 'module' }, n)),
          (n = Un.get(c)) && md(e, n),
          (d = a.createElement('script')),
          Rt(d),
          Gt(d, 'link', e),
          a.head.appendChild(d)),
        (d = { type: 'script', instance: d, count: 1, state: null }),
        i.set(c, d))
    }
  }
  function Cy(e, n, a, i) {
    var c = (c = le.current) ? Fs(c) : null
    if (!c) throw Error(o(446))
    switch (e) {
      case 'meta':
      case 'title':
        return null
      case 'style':
        return typeof a.precedence == 'string' && typeof a.href == 'string'
          ? ((n = _l(a.href)),
            (a = hr(c).hoistableStyles),
            (i = a.get(n)),
            i || ((i = { type: 'style', instance: null, count: 0, state: null }), a.set(n, i)),
            i)
          : { type: 'void', instance: null, count: 0, state: null }
      case 'link':
        if (a.rel === 'stylesheet' && typeof a.href == 'string' && typeof a.precedence == 'string') {
          e = _l(a.href)
          var d = hr(c).hoistableStyles,
            y = d.get(e)
          if (
            (y ||
              ((c = c.ownerDocument || c),
              (y = { type: 'stylesheet', instance: null, count: 0, state: { loading: 0, preload: null } }),
              d.set(e, y),
              (d = c.querySelector(Go(e))) && !d._p && ((y.instance = d), (y.state.loading = 5)),
              Un.has(e) ||
                ((a = {
                  rel: 'preload',
                  as: 'style',
                  href: a.href,
                  crossOrigin: a.crossOrigin,
                  integrity: a.integrity,
                  media: a.media,
                  hrefLang: a.hrefLang,
                  referrerPolicy: a.referrerPolicy,
                }),
                Un.set(e, a),
                d || $x(c, e, a, y.state))),
            n && i === null)
          )
            throw Error(o(528, ''))
          return y
        }
        if (n && i !== null) throw Error(o(529, ''))
        return null
      case 'script':
        return (
          (n = a.async),
          (a = a.src),
          typeof a == 'string' && n && typeof n != 'function' && typeof n != 'symbol'
            ? ((n = Nl(a)),
              (a = hr(c).hoistableScripts),
              (i = a.get(n)),
              i || ((i = { type: 'script', instance: null, count: 0, state: null }), a.set(n, i)),
              i)
            : { type: 'void', instance: null, count: 0, state: null }
        )
      default:
        throw Error(o(444, e))
    }
  }
  function _l(e) {
    return 'href="' + On(e) + '"'
  }
  function Go(e) {
    return 'link[rel="stylesheet"][' + e + ']'
  }
  function wy(e) {
    return g({}, e, { 'data-precedence': e.precedence, precedence: null })
  }
  function $x(e, n, a, i) {
    e.querySelector('link[rel="preload"][as="style"][' + n + ']')
      ? (i.loading = 1)
      : ((n = e.createElement('link')),
        (i.preload = n),
        n.addEventListener('load', function () {
          return (i.loading |= 1)
        }),
        n.addEventListener('error', function () {
          return (i.loading |= 2)
        }),
        Gt(n, 'link', a),
        Rt(n),
        e.head.appendChild(n))
  }
  function Nl(e) {
    return '[src="' + On(e) + '"]'
  }
  function Ko(e) {
    return 'script[async]' + e
  }
  function Ay(e, n, a) {
    if ((n.count++, n.instance === null))
      switch (n.type) {
        case 'style':
          var i = e.querySelector('style[data-href~="' + On(a.href) + '"]')
          if (i) return ((n.instance = i), Rt(i), i)
          var c = g({}, a, { 'data-href': a.href, 'data-precedence': a.precedence, href: null, precedence: null })
          return (
            (i = (e.ownerDocument || e).createElement('style')),
            Rt(i),
            Gt(i, 'style', c),
            Ys(i, a.precedence, e),
            (n.instance = i)
          )
        case 'stylesheet':
          c = _l(a.href)
          var d = e.querySelector(Go(c))
          if (d) return ((n.state.loading |= 4), (n.instance = d), Rt(d), d)
          ;((i = wy(a)), (c = Un.get(c)) && hd(i, c), (d = (e.ownerDocument || e).createElement('link')), Rt(d))
          var y = d
          return (
            (y._p = new Promise(function (E, B) {
              ;((y.onload = E), (y.onerror = B))
            })),
            Gt(d, 'link', i),
            (n.state.loading |= 4),
            Ys(d, a.precedence, e),
            (n.instance = d)
          )
        case 'script':
          return (
            (d = Nl(a.src)),
            (c = e.querySelector(Ko(d)))
              ? ((n.instance = c), Rt(c), c)
              : ((i = a),
                (c = Un.get(d)) && ((i = g({}, a)), md(i, c)),
                (e = e.ownerDocument || e),
                (c = e.createElement('script')),
                Rt(c),
                Gt(c, 'link', i),
                e.head.appendChild(c),
                (n.instance = c))
          )
        case 'void':
          return null
        default:
          throw Error(o(443, n.type))
      }
    else
      n.type === 'stylesheet' &&
        (n.state.loading & 4) === 0 &&
        ((i = n.instance), (n.state.loading |= 4), Ys(i, a.precedence, e))
    return n.instance
  }
  function Ys(e, n, a) {
    for (
      var i = a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
        c = i.length ? i[i.length - 1] : null,
        d = c,
        y = 0;
      y < i.length;
      y++
    ) {
      var E = i[y]
      if (E.dataset.precedence === n) d = E
      else if (d !== c) break
    }
    d
      ? d.parentNode.insertBefore(e, d.nextSibling)
      : ((n = a.nodeType === 9 ? a.head : a), n.insertBefore(e, n.firstChild))
  }
  function hd(e, n) {
    ;(e.crossOrigin == null && (e.crossOrigin = n.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy),
      e.title == null && (e.title = n.title))
  }
  function md(e, n) {
    ;(e.crossOrigin == null && (e.crossOrigin = n.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy),
      e.integrity == null && (e.integrity = n.integrity))
  }
  var Vs = null
  function Oy(e, n, a) {
    if (Vs === null) {
      var i = new Map(),
        c = (Vs = new Map())
      c.set(a, i)
    } else ((c = Vs), (i = c.get(a)), i || ((i = new Map()), c.set(a, i)))
    if (i.has(e)) return i
    for (i.set(e, null), a = a.getElementsByTagName(e), c = 0; c < a.length; c++) {
      var d = a[c]
      if (
        !(d[xa] || d[Dt] || (e === 'link' && d.getAttribute('rel') === 'stylesheet')) &&
        d.namespaceURI !== 'http://www.w3.org/2000/svg'
      ) {
        var y = d.getAttribute(n) || ''
        y = e + y
        var E = i.get(y)
        E ? E.push(d) : i.set(y, [d])
      }
    }
    return i
  }
  function My(e, n, a) {
    ;((e = e.ownerDocument || e), e.head.insertBefore(a, n === 'title' ? e.querySelector('head > title') : null))
  }
  function Hx(e, n, a) {
    if (a === 1 || n.itemProp != null) return !1
    switch (e) {
      case 'meta':
      case 'title':
        return !0
      case 'style':
        if (typeof n.precedence != 'string' || typeof n.href != 'string' || n.href === '') break
        return !0
      case 'link':
        if (typeof n.rel != 'string' || typeof n.href != 'string' || n.href === '' || n.onLoad || n.onError) break
        switch (n.rel) {
          case 'stylesheet':
            return ((e = n.disabled), typeof n.precedence == 'string' && e == null)
          default:
            return !0
        }
      case 'script':
        if (
          n.async &&
          typeof n.async != 'function' &&
          typeof n.async != 'symbol' &&
          !n.onLoad &&
          !n.onError &&
          n.src &&
          typeof n.src == 'string'
        )
          return !0
    }
    return !1
  }
  function _y(e) {
    return !(e.type === 'stylesheet' && (e.state.loading & 3) === 0)
  }
  var Xo = null
  function Px() {}
  function qx(e, n, a) {
    if (Xo === null) throw Error(o(475))
    var i = Xo
    if (
      n.type === 'stylesheet' &&
      (typeof a.media != 'string' || matchMedia(a.media).matches !== !1) &&
      (n.state.loading & 4) === 0
    ) {
      if (n.instance === null) {
        var c = _l(a.href),
          d = e.querySelector(Go(c))
        if (d) {
          ;((e = d._p),
            e !== null &&
              typeof e == 'object' &&
              typeof e.then == 'function' &&
              (i.count++, (i = Gs.bind(i)), e.then(i, i)),
            (n.state.loading |= 4),
            (n.instance = d),
            Rt(d))
          return
        }
        ;((d = e.ownerDocument || e), (a = wy(a)), (c = Un.get(c)) && hd(a, c), (d = d.createElement('link')), Rt(d))
        var y = d
        ;((y._p = new Promise(function (E, B) {
          ;((y.onload = E), (y.onerror = B))
        })),
          Gt(d, 'link', a),
          (n.instance = d))
      }
      ;(i.stylesheets === null && (i.stylesheets = new Map()),
        i.stylesheets.set(n, e),
        (e = n.state.preload) &&
          (n.state.loading & 3) === 0 &&
          (i.count++, (n = Gs.bind(i)), e.addEventListener('load', n), e.addEventListener('error', n)))
    }
  }
  function Ix() {
    if (Xo === null) throw Error(o(475))
    var e = Xo
    return (
      e.stylesheets && e.count === 0 && gd(e, e.stylesheets),
      0 < e.count
        ? function (n) {
            var a = setTimeout(function () {
              if ((e.stylesheets && gd(e, e.stylesheets), e.unsuspend)) {
                var i = e.unsuspend
                ;((e.unsuspend = null), i())
              }
            }, 6e4)
            return (
              (e.unsuspend = n),
              function () {
                ;((e.unsuspend = null), clearTimeout(a))
              }
            )
          }
        : null
    )
  }
  function Gs() {
    if ((this.count--, this.count === 0)) {
      if (this.stylesheets) gd(this, this.stylesheets)
      else if (this.unsuspend) {
        var e = this.unsuspend
        ;((this.unsuspend = null), e())
      }
    }
  }
  var Ks = null
  function gd(e, n) {
    ;((e.stylesheets = null),
      e.unsuspend !== null && (e.count++, (Ks = new Map()), n.forEach(Fx, e), (Ks = null), Gs.call(e)))
  }
  function Fx(e, n) {
    if (!(n.state.loading & 4)) {
      var a = Ks.get(e)
      if (a) var i = a.get(null)
      else {
        ;((a = new Map()), Ks.set(e, a))
        for (var c = e.querySelectorAll('link[data-precedence],style[data-precedence]'), d = 0; d < c.length; d++) {
          var y = c[d]
          ;(y.nodeName === 'LINK' || y.getAttribute('media') !== 'not all') && (a.set(y.dataset.precedence, y), (i = y))
        }
        i && a.set(null, i)
      }
      ;((c = n.instance),
        (y = c.getAttribute('data-precedence')),
        (d = a.get(y) || i),
        d === i && a.set(null, c),
        a.set(y, c),
        this.count++,
        (i = Gs.bind(this)),
        c.addEventListener('load', i),
        c.addEventListener('error', i),
        d
          ? d.parentNode.insertBefore(c, d.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e), e.insertBefore(c, e.firstChild)),
        (n.state.loading |= 4))
    }
  }
  var Qo = { $$typeof: M, Provider: null, Consumer: null, _currentValue: W, _currentValue2: W, _threadCount: 0 }
  function Yx(e, n, a, i, c, d, y, E) {
    ;((this.tag = 1),
      (this.containerInfo = e),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null),
      (this.callbackPriority = 0),
      (this.expirationTimes = lo(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = lo(0)),
      (this.hiddenUpdates = lo(null)),
      (this.identifierPrefix = i),
      (this.onUncaughtError = c),
      (this.onCaughtError = d),
      (this.onRecoverableError = y),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = E),
      (this.incompleteTransitions = new Map()))
  }
  function Ny(e, n, a, i, c, d, y, E, B, Y, ne, ae) {
    return (
      (e = new Yx(e, n, a, y, E, B, Y, ae)),
      (n = 1),
      d === !0 && (n |= 24),
      (d = bn(3, null, null, n)),
      (e.current = d),
      (d.stateNode = e),
      (n = Qc()),
      n.refCount++,
      (e.pooledCache = n),
      n.refCount++,
      (d.memoizedState = { element: i, isDehydrated: a, cache: n }),
      ef(d),
      e
    )
  }
  function Dy(e) {
    return e ? ((e = sl), e) : sl
  }
  function By(e, n, a, i, c, d) {
    ;((c = Dy(c)),
      i.context === null ? (i.context = c) : (i.pendingContext = c),
      (i = Xr(n)),
      (i.payload = { element: a }),
      (d = d === void 0 ? null : d),
      d !== null && (i.callback = d),
      (a = Qr(e, i, n)),
      a !== null && (En(a, e, n), wo(a, e, n)))
  }
  function zy(e, n) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var a = e.retryLane
      e.retryLane = a !== 0 && a < n ? a : n
    }
  }
  function yd(e, n) {
    ;(zy(e, n), (e = e.alternate) && zy(e, n))
  }
  function Uy(e) {
    if (e.tag === 13) {
      var n = il(e, 67108864)
      ;(n !== null && En(n, e, 67108864), yd(e, 67108864))
    }
  }
  var Xs = !0
  function Vx(e, n, a, i) {
    var c = N.T
    N.T = null
    var d = H.p
    try {
      ;((H.p = 2), bd(e, n, a, i))
    } finally {
      ;((H.p = d), (N.T = c))
    }
  }
  function Gx(e, n, a, i) {
    var c = N.T
    N.T = null
    var d = H.p
    try {
      ;((H.p = 8), bd(e, n, a, i))
    } finally {
      ;((H.p = d), (N.T = c))
    }
  }
  function bd(e, n, a, i) {
    if (Xs) {
      var c = vd(i)
      if (c === null) (ld(e, n, i, Qs, a), Ly(e, i))
      else if (Xx(c, e, n, a, i)) i.stopPropagation()
      else if ((Ly(e, i), n & 4 && -1 < Kx.indexOf(e))) {
        for (; c !== null;) {
          var d = pr(c)
          if (d !== null)
            switch (d.tag) {
              case 3:
                if (((d = d.stateNode), d.current.memoizedState.isDehydrated)) {
                  var y = cr(d.pendingLanes)
                  if (y !== 0) {
                    var E = d
                    for (E.pendingLanes |= 2, E.entangledLanes |= 2; y;) {
                      var B = 1 << (31 - xt(y))
                      ;((E.entanglements[1] |= B), (y &= ~B))
                    }
                    ;(er(d), (Xe & 6) === 0 && ((Bs = Te() + 500), Io(0)))
                  }
                }
                break
              case 13:
                ;((E = il(d, 2)), E !== null && En(E, d, 2), Us(), yd(d, 2))
            }
          if (((d = vd(i)), d === null && ld(e, n, i, Qs, a), d === c)) break
          c = d
        }
        c !== null && i.stopPropagation()
      } else ld(e, n, i, null, a)
    }
  }
  function vd(e) {
    return ((e = Ec(e)), Sd(e))
  }
  var Qs = null
  function Sd(e) {
    if (((Qs = null), (e = Ir(e)), e !== null)) {
      var n = u(e)
      if (n === null) e = null
      else {
        var a = n.tag
        if (a === 13) {
          if (((e = f(n)), e !== null)) return e
          e = null
        } else if (a === 3) {
          if (n.stateNode.current.memoizedState.isDehydrated) return n.tag === 3 ? n.stateNode.containerInfo : null
          e = null
        } else n !== e && (e = null)
      }
    }
    return ((Qs = e), null)
  }
  function ky(e) {
    switch (e) {
      case 'beforetoggle':
      case 'cancel':
      case 'click':
      case 'close':
      case 'contextmenu':
      case 'copy':
      case 'cut':
      case 'auxclick':
      case 'dblclick':
      case 'dragend':
      case 'dragstart':
      case 'drop':
      case 'focusin':
      case 'focusout':
      case 'input':
      case 'invalid':
      case 'keydown':
      case 'keypress':
      case 'keyup':
      case 'mousedown':
      case 'mouseup':
      case 'paste':
      case 'pause':
      case 'play':
      case 'pointercancel':
      case 'pointerdown':
      case 'pointerup':
      case 'ratechange':
      case 'reset':
      case 'resize':
      case 'seeked':
      case 'submit':
      case 'toggle':
      case 'touchcancel':
      case 'touchend':
      case 'touchstart':
      case 'volumechange':
      case 'change':
      case 'selectionchange':
      case 'textInput':
      case 'compositionstart':
      case 'compositionend':
      case 'compositionupdate':
      case 'beforeblur':
      case 'afterblur':
      case 'beforeinput':
      case 'blur':
      case 'fullscreenchange':
      case 'focus':
      case 'hashchange':
      case 'popstate':
      case 'select':
      case 'selectstart':
        return 2
      case 'drag':
      case 'dragenter':
      case 'dragexit':
      case 'dragleave':
      case 'dragover':
      case 'mousemove':
      case 'mouseout':
      case 'mouseover':
      case 'pointermove':
      case 'pointerout':
      case 'pointerover':
      case 'scroll':
      case 'touchmove':
      case 'wheel':
      case 'mouseenter':
      case 'mouseleave':
      case 'pointerenter':
      case 'pointerleave':
        return 8
      case 'message':
        switch (gt()) {
          case He:
            return 2
          case un:
            return 8
          case cn:
          case nn:
            return 32
          case qt:
            return 268435456
          default:
            return 32
        }
      default:
        return 32
    }
  }
  var xd = !1,
    ua = null,
    ca = null,
    fa = null,
    Zo = new Map(),
    Wo = new Map(),
    da = [],
    Kx =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' '
      )
  function Ly(e, n) {
    switch (e) {
      case 'focusin':
      case 'focusout':
        ua = null
        break
      case 'dragenter':
      case 'dragleave':
        ca = null
        break
      case 'mouseover':
      case 'mouseout':
        fa = null
        break
      case 'pointerover':
      case 'pointerout':
        Zo.delete(n.pointerId)
        break
      case 'gotpointercapture':
      case 'lostpointercapture':
        Wo.delete(n.pointerId)
    }
  }
  function Jo(e, n, a, i, c, d) {
    return e === null || e.nativeEvent !== d
      ? ((e = { blockedOn: n, domEventName: a, eventSystemFlags: i, nativeEvent: d, targetContainers: [c] }),
        n !== null && ((n = pr(n)), n !== null && Uy(n)),
        e)
      : ((e.eventSystemFlags |= i), (n = e.targetContainers), c !== null && n.indexOf(c) === -1 && n.push(c), e)
  }
  function Xx(e, n, a, i, c) {
    switch (n) {
      case 'focusin':
        return ((ua = Jo(ua, e, n, a, i, c)), !0)
      case 'dragenter':
        return ((ca = Jo(ca, e, n, a, i, c)), !0)
      case 'mouseover':
        return ((fa = Jo(fa, e, n, a, i, c)), !0)
      case 'pointerover':
        var d = c.pointerId
        return (Zo.set(d, Jo(Zo.get(d) || null, e, n, a, i, c)), !0)
      case 'gotpointercapture':
        return ((d = c.pointerId), Wo.set(d, Jo(Wo.get(d) || null, e, n, a, i, c)), !0)
    }
    return !1
  }
  function jy(e) {
    var n = Ir(e.target)
    if (n !== null) {
      var a = u(n)
      if (a !== null) {
        if (((n = a.tag), n === 13)) {
          if (((n = f(a)), n !== null)) {
            ;((e.blockedOn = n),
              Qa(e.priority, function () {
                if (a.tag === 13) {
                  var i = Rn()
                  i = Xa(i)
                  var c = il(a, i)
                  ;(c !== null && En(c, a, i), yd(a, i))
                }
              }))
            return
          }
        } else if (n === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null
          return
        }
      }
    }
    e.blockedOn = null
  }
  function Zs(e) {
    if (e.blockedOn !== null) return !1
    for (var n = e.targetContainers; 0 < n.length;) {
      var a = vd(e.nativeEvent)
      if (a === null) {
        a = e.nativeEvent
        var i = new a.constructor(a.type, a)
        ;((Rc = i), a.target.dispatchEvent(i), (Rc = null))
      } else return ((n = pr(a)), n !== null && Uy(n), (e.blockedOn = a), !1)
      n.shift()
    }
    return !0
  }
  function $y(e, n, a) {
    Zs(e) && a.delete(n)
  }
  function Qx() {
    ;((xd = !1),
      ua !== null && Zs(ua) && (ua = null),
      ca !== null && Zs(ca) && (ca = null),
      fa !== null && Zs(fa) && (fa = null),
      Zo.forEach($y),
      Wo.forEach($y))
  }
  function Ws(e, n) {
    e.blockedOn === n &&
      ((e.blockedOn = null), xd || ((xd = !0), t.unstable_scheduleCallback(t.unstable_NormalPriority, Qx)))
  }
  var Js = null
  function Hy(e) {
    Js !== e &&
      ((Js = e),
      t.unstable_scheduleCallback(t.unstable_NormalPriority, function () {
        Js === e && (Js = null)
        for (var n = 0; n < e.length; n += 3) {
          var a = e[n],
            i = e[n + 1],
            c = e[n + 2]
          if (typeof i != 'function') {
            if (Sd(i || a) === null) continue
            break
          }
          var d = pr(a)
          d !== null && (e.splice(n, 3), (n -= 3), Sf(d, { pending: !0, data: c, method: a.method, action: i }, i, c))
        }
      }))
  }
  function ei(e) {
    function n(B) {
      return Ws(B, e)
    }
    ;(ua !== null && Ws(ua, e), ca !== null && Ws(ca, e), fa !== null && Ws(fa, e), Zo.forEach(n), Wo.forEach(n))
    for (var a = 0; a < da.length; a++) {
      var i = da[a]
      i.blockedOn === e && (i.blockedOn = null)
    }
    for (; 0 < da.length && ((a = da[0]), a.blockedOn === null);) (jy(a), a.blockedOn === null && da.shift())
    if (((a = (e.ownerDocument || e).$$reactFormReplay), a != null))
      for (i = 0; i < a.length; i += 3) {
        var c = a[i],
          d = a[i + 1],
          y = c[Lt] || null
        if (typeof d == 'function') y || Hy(a)
        else if (y) {
          var E = null
          if (d && d.hasAttribute('formAction')) {
            if (((c = d), (y = d[Lt] || null))) E = y.formAction
            else if (Sd(c) !== null) continue
          } else E = y.action
          ;(typeof E == 'function' ? (a[i + 1] = E) : (a.splice(i, 3), (i -= 3)), Hy(a))
        }
      }
  }
  function Rd(e) {
    this._internalRoot = e
  }
  ;((eu.prototype.render = Rd.prototype.render =
    function (e) {
      var n = this._internalRoot
      if (n === null) throw Error(o(409))
      var a = n.current,
        i = Rn()
      By(a, i, e, n, null, null)
    }),
    (eu.prototype.unmount = Rd.prototype.unmount =
      function () {
        var e = this._internalRoot
        if (e !== null) {
          this._internalRoot = null
          var n = e.containerInfo
          ;(By(e.current, 2, null, e, null, null), Us(), (n[qr] = null))
        }
      }))
  function eu(e) {
    this._internalRoot = e
  }
  eu.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var n = Sa()
      e = { blockedOn: null, target: e, priority: n }
      for (var a = 0; a < da.length && n !== 0 && n < da[a].priority; a++);
      ;(da.splice(a, 0, e), a === 0 && jy(e))
    }
  }
  var Py = r.version
  if (Py !== '19.1.1') throw Error(o(527, Py, '19.1.1'))
  H.findDOMNode = function (e) {
    var n = e._reactInternals
    if (n === void 0)
      throw typeof e.render == 'function' ? Error(o(188)) : ((e = Object.keys(e).join(',')), Error(o(268, e)))
    return ((e = h(n)), (e = e !== null ? m(e) : null), (e = e === null ? null : e.stateNode), e)
  }
  var Zx = {
    bundleType: 0,
    version: '19.1.1',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: N,
    reconcilerVersion: '19.1.1',
  }
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var tu = __REACT_DEVTOOLS_GLOBAL_HOOK__
    if (!tu.isDisabled && tu.supportsFiber)
      try {
        ;((Nt = tu.inject(Zx)), (je = tu))
      } catch {}
  }
  return (
    (ri.createRoot = function (e, n) {
      if (!s(e)) throw Error(o(299))
      var a = !1,
        i = '',
        c = rg,
        d = ag,
        y = lg,
        E = null
      return (
        n != null &&
          (n.unstable_strictMode === !0 && (a = !0),
          n.identifierPrefix !== void 0 && (i = n.identifierPrefix),
          n.onUncaughtError !== void 0 && (c = n.onUncaughtError),
          n.onCaughtError !== void 0 && (d = n.onCaughtError),
          n.onRecoverableError !== void 0 && (y = n.onRecoverableError),
          n.unstable_transitionCallbacks !== void 0 && (E = n.unstable_transitionCallbacks)),
        (n = Ny(e, 1, !1, null, null, a, i, c, d, y, E, null)),
        (e[qr] = n.current),
        ad(e),
        new Rd(n)
      )
    }),
    (ri.hydrateRoot = function (e, n, a) {
      if (!s(e)) throw Error(o(299))
      var i = !1,
        c = '',
        d = rg,
        y = ag,
        E = lg,
        B = null,
        Y = null
      return (
        a != null &&
          (a.unstable_strictMode === !0 && (i = !0),
          a.identifierPrefix !== void 0 && (c = a.identifierPrefix),
          a.onUncaughtError !== void 0 && (d = a.onUncaughtError),
          a.onCaughtError !== void 0 && (y = a.onCaughtError),
          a.onRecoverableError !== void 0 && (E = a.onRecoverableError),
          a.unstable_transitionCallbacks !== void 0 && (B = a.unstable_transitionCallbacks),
          a.formState !== void 0 && (Y = a.formState)),
        (n = Ny(e, 1, !0, n, a ?? null, i, c, d, y, E, B, Y)),
        (n.context = Dy(null)),
        (a = n.current),
        (i = Rn()),
        (i = Xa(i)),
        (c = Xr(i)),
        (c.callback = null),
        Qr(a, c, i),
        (a = i),
        (n.current.lanes = a),
        va(n, a),
        er(n),
        (e[qr] = n.current),
        ad(e),
        new eu(n)
      )
    }),
    (ri.version = '19.1.1'),
    ri
  )
}
var Zy
function uR() {
  if (Zy) return Td.exports
  Zy = 1
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t)
      } catch (r) {
        console.error(r)
      }
  }
  return (t(), (Td.exports = sR()), Td.exports)
}
var cR = uR()
const fR = Hb(cR)
var S = bp()
const vp = Hb(S),
  Eu = tR({ __proto__: null, default: vp }, [S])
/**
 * react-router v7.18.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ var Sp = /^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i,
  qb = /^[\\/]{2}/
function dR(t, r) {
  return r + t.replace(/\\/g, '/')
}
var Wy = 'popstate'
function Jy(t) {
  return (
    typeof t == 'object' && t != null && 'pathname' in t && 'search' in t && 'hash' in t && 'state' in t && 'key' in t
  )
}
function pR(t = {}) {
  function r(o, s) {
    var m
    let u = (m = s.state) == null ? void 0 : m.masked,
      { pathname: f, search: p, hash: h } = u || o.location
    return Kd(
      '',
      { pathname: f, search: p, hash: h },
      (s.state && s.state.usr) || null,
      (s.state && s.state.key) || 'default',
      u ? { pathname: o.location.pathname, search: o.location.search, hash: o.location.hash } : void 0
    )
  }
  function l(o, s) {
    return typeof s == 'string' ? s : bi(s)
  }
  return mR(r, l, null, t)
}
function mt(t, r) {
  if (t === !1 || t === null || typeof t > 'u') throw new Error(r)
}
function ir(t, r) {
  if (!t) {
    typeof console < 'u' && console.warn(r)
    try {
      throw new Error(r)
    } catch {}
  }
}
function hR() {
  return Math.random().toString(36).substring(2, 10)
}
function e0(t, r) {
  return {
    usr: t.state,
    key: t.key,
    idx: r,
    masked: t.mask ? { pathname: t.pathname, search: t.search, hash: t.hash } : void 0,
  }
}
function Kd(t, r, l = null, o, s) {
  return {
    pathname: typeof t == 'string' ? t : t.pathname,
    search: '',
    hash: '',
    ...(typeof r == 'string' ? Ql(r) : r),
    state: l,
    key: (r && r.key) || o || hR(),
    mask: s,
  }
}
function bi({ pathname: t = '/', search: r = '', hash: l = '' }) {
  return (
    r && r !== '?' && (t += r.charAt(0) === '?' ? r : '?' + r),
    l && l !== '#' && (t += l.charAt(0) === '#' ? l : '#' + l),
    t
  )
}
function Ql(t) {
  let r = {}
  if (t) {
    let l = t.indexOf('#')
    l >= 0 && ((r.hash = t.substring(l)), (t = t.substring(0, l)))
    let o = t.indexOf('?')
    ;(o >= 0 && ((r.search = t.substring(o)), (t = t.substring(0, o))), t && (r.pathname = t))
  }
  return r
}
function mR(t, r, l, o = {}) {
  let { window: s = document.defaultView, v5Compat: u = !1 } = o,
    f = s.history,
    p = 'POP',
    h = null,
    m = g()
  m == null && ((m = 0), f.replaceState({ ...f.state, idx: m }, ''))
  function g() {
    return (f.state || { idx: null }).idx
  }
  function b() {
    p = 'POP'
    let T = g(),
      A = T == null ? null : T - m
    ;((m = T), h && h({ action: p, location: R.location, delta: A }))
  }
  function C(T, A) {
    p = 'PUSH'
    let O = Jy(T) ? T : Kd(R.location, T, A)
    m = g() + 1
    let M = e0(O, m),
      z = R.createHref(O.mask || O)
    try {
      f.pushState(M, '', z)
    } catch (_) {
      if (_ instanceof DOMException && _.name === 'DataCloneError') throw _
      s.location.assign(z)
    }
    u && h && h({ action: p, location: R.location, delta: 1 })
  }
  function v(T, A) {
    p = 'REPLACE'
    let O = Jy(T) ? T : Kd(R.location, T, A)
    m = g()
    let M = e0(O, m),
      z = R.createHref(O.mask || O)
    ;(f.replaceState(M, '', z), u && h && h({ action: p, location: R.location, delta: 0 }))
  }
  function w(T) {
    return gR(s, T)
  }
  let R = {
    get action() {
      return p
    },
    get location() {
      return t(s, f)
    },
    listen(T) {
      if (h) throw new Error('A history only accepts one active listener')
      return (
        s.addEventListener(Wy, b),
        (h = T),
        () => {
          ;(s.removeEventListener(Wy, b), (h = null))
        }
      )
    },
    createHref(T) {
      return r(s, T)
    },
    createURL: w,
    encodeLocation(T) {
      let A = w(T)
      return { pathname: A.pathname, search: A.search, hash: A.hash }
    },
    push: C,
    replace: v,
    go(T) {
      return f.go(T)
    },
  }
  return R
}
function gR(t, r, l = !1) {
  let o = 'http://localhost'
  ;(t && (o = t.location.origin !== 'null' ? t.location.origin : t.location.href),
    mt(o, 'No window.location.(origin|href) available to create URL'))
  let s = typeof r == 'string' ? r : bi(r)
  return ((s = s.replace(/ $/, '%20')), !l && qb.test(s) && (s = o + s), new URL(s, o))
}
function Ib(t, r, l = '/') {
  return yR(t, r, l, !1)
}
function yR(t, r, l, o, s) {
  let u = typeof r == 'string' ? Ql(r) : r,
    f = kr(u.pathname || '/', l)
  if (f == null) return null
  let p = bR(t),
    h = null,
    m = Kb(f)
  for (let g = 0; h == null && g < p.length; ++g) h = OR(p[g], m, o)
  return h
}
function bR(t) {
  let r = Fb(t)
  return (vR(r), r)
}
function Fb(t, r = [], l = [], o = '', s = !1) {
  let u = (f, p, h = s, m) => {
    let g = {
      relativePath: m === void 0 ? f.path || '' : m,
      caseSensitive: f.caseSensitive === !0,
      childrenIndex: p,
      route: f,
    }
    if (g.relativePath.startsWith('/')) {
      if (!g.relativePath.startsWith(o) && h) return
      ;(mt(
        g.relativePath.startsWith(o),
        `Absolute route path "${g.relativePath}" nested under path "${o}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
        (g.relativePath = g.relativePath.slice(o.length)))
    }
    let b = Fn([o, g.relativePath]),
      C = l.concat(g)
    ;(f.children &&
      f.children.length > 0 &&
      (mt(
        f.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${b}".`
      ),
      Fb(f.children, r, C, b, h)),
      !(f.path == null && !f.index) &&
        r.push({
          path: b,
          score: wR(b, f.index),
          routesMeta: C.map((v, w) => {
            let [R, T] = Gb(v.relativePath, v.caseSensitive, w === C.length - 1)
            return { ...v, matcher: R, compiledParams: T }
          }),
        }))
  }
  return (
    t.forEach((f, p) => {
      var h
      if (f.path === '' || !((h = f.path) != null && h.includes('?'))) u(f, p)
      else for (let m of Yb(f.path)) u(f, p, !0, m)
    }),
    r
  )
}
function Yb(t) {
  let r = t.split('/')
  if (r.length === 0) return []
  let [l, ...o] = r,
    s = l.endsWith('?'),
    u = l.replace(/\?$/, '')
  if (o.length === 0) return s ? [u, ''] : [u]
  let f = Yb(o.join('/')),
    p = []
  return (
    p.push(...f.map(h => (h === '' ? u : [u, h].join('/')))),
    s && p.push(...f),
    p.map(h => (t.startsWith('/') && h === '' ? '/' : h))
  )
}
function vR(t) {
  t.sort((r, l) =>
    r.score !== l.score
      ? l.score - r.score
      : AR(
          r.routesMeta.map(o => o.childrenIndex),
          l.routesMeta.map(o => o.childrenIndex)
        )
  )
}
var SR = /^:[\w-]+$/,
  xR = 3,
  RR = 2,
  ER = 1,
  TR = 10,
  CR = -2,
  t0 = t => t === '*'
function wR(t, r) {
  let l = t.split('/'),
    o = l.length
  return (
    l.some(t0) && (o += CR),
    r && (o += RR),
    l.filter(s => !t0(s)).reduce((s, u) => s + (SR.test(u) ? xR : u === '' ? ER : TR), o)
  )
}
function AR(t, r) {
  return t.length === r.length && t.slice(0, -1).every((o, s) => o === r[s]) ? t[t.length - 1] - r[r.length - 1] : 0
}
function OR(t, r, l = !1) {
  let { routesMeta: o } = t,
    s = {},
    u = '/',
    f = []
  for (let p = 0; p < o.length; ++p) {
    let h = o[p],
      m = p === o.length - 1,
      g = u === '/' ? r : r.slice(u.length) || '/',
      b = { path: h.relativePath, caseSensitive: h.caseSensitive, end: m },
      C = h.matcher && h.compiledParams ? Vb(b, g, h.matcher, h.compiledParams) : vi(b, g),
      v = h.route
    if (
      (!C &&
        m &&
        l &&
        !o[o.length - 1].route.index &&
        (C = vi({ path: h.relativePath, caseSensitive: h.caseSensitive, end: !1 }, g)),
      !C)
    )
      return null
    ;(Object.assign(s, C.params),
      f.push({ params: s, pathname: Fn([u, C.pathname]), pathnameBase: NR(Fn([u, C.pathnameBase])), route: v }),
      C.pathnameBase !== '/' && (u = Fn([u, C.pathnameBase])))
  }
  return f
}
function vi(t, r) {
  typeof t == 'string' && (t = { path: t, caseSensitive: !1, end: !0 })
  let [l, o] = Gb(t.path, t.caseSensitive, t.end)
  return Vb(t, r, l, o)
}
function Vb(t, r, l, o) {
  let s = r.match(l)
  if (!s) return null
  let u = s[0],
    f = u.replace(/(.)\/+$/, '$1'),
    p = s.slice(1)
  return {
    params: o.reduce((m, { paramName: g, isOptional: b }, C) => {
      if (g === '*') {
        let w = p[C] || ''
        f = u.slice(0, u.length - w.length).replace(/(.)\/+$/, '$1')
      }
      const v = p[C]
      return (b && !v ? (m[g] = void 0) : (m[g] = (v || '').replace(/%2F/g, '/')), m)
    }, {}),
    pathname: u,
    pathnameBase: f,
    pattern: t,
  }
}
function Gb(t, r = !1, l = !0) {
  ir(
    t === '*' || !t.endsWith('*') || t.endsWith('/*'),
    `Route path "${t}" will be treated as if it were "${t.replace(/\*$/, '/*')}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${t.replace(/\*$/, '/*')}".`
  )
  let o = [],
    s =
      '^' +
      t
        .replace(/\/*\*?$/, '')
        .replace(/^\/*/, '/')
        .replace(/[\\.*+^${}|()[\]]/g, '\\$&')
        .replace(/\/:([\w-]+)(\?)?/g, (f, p, h, m, g) => {
          if ((o.push({ paramName: p, isOptional: h != null }), h)) {
            let b = g.charAt(m + f.length)
            return b && b !== '/' ? '/([^\\/]*)' : '(?:/([^\\/]*))?'
          }
          return '/([^\\/]+)'
        })
        .replace(/\/([\w-]+)\?(\/|$)/g, '(/$1)?$2')
  return (
    t.endsWith('*')
      ? (o.push({ paramName: '*' }), (s += t === '*' || t === '/*' ? '(.*)$' : '(?:\\/(.+)|\\/*)$'))
      : l
        ? (s += '\\/*$')
        : t !== '' && t !== '/' && (s += '(?:(?=\\/|$))'),
    [new RegExp(s, r ? void 0 : 'i'), o]
  )
}
function Kb(t) {
  try {
    return t
      .split('/')
      .map(r => decodeURIComponent(r).replace(/\//g, '%2F'))
      .join('/')
  } catch (r) {
    return (
      ir(
        !1,
        `The URL path "${t}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${r}).`
      ),
      t
    )
  }
}
function kr(t, r) {
  if (r === '/') return t
  if (!t.toLowerCase().startsWith(r.toLowerCase())) return null
  let l = r.endsWith('/') ? r.length - 1 : r.length,
    o = t.charAt(l)
  return o && o !== '/' ? null : t.slice(l) || '/'
}
function MR(t, r = '/') {
  let { pathname: l, search: o = '', hash: s = '' } = typeof t == 'string' ? Ql(t) : t,
    u
  return (
    l ? ((l = Qb(l)), l.startsWith('/') ? (u = n0(l.substring(1), '/')) : (u = n0(l, r))) : (u = r),
    { pathname: u, search: DR(o), hash: BR(s) }
  )
}
function n0(t, r) {
  let l = Tu(r).split('/')
  return (
    t.split('/').forEach(s => {
      s === '..' ? l.length > 1 && l.pop() : s !== '.' && l.push(s)
    }),
    l.length > 1 ? l.join('/') : '/'
  )
}
function Md(t, r, l, o) {
  return `Cannot include a '${t}' character in a manually specified \`to.${r}\` field [${JSON.stringify(o)}].  Please separate it out to the \`to.${l}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`
}
function _R(t) {
  return t.filter((r, l) => l === 0 || (r.route.path && r.route.path.length > 0))
}
function Xb(t) {
  let r = _R(t)
  return r.map((l, o) => (o === r.length - 1 ? l.pathname : l.pathnameBase))
}
function xp(t, r, l, o = !1) {
  let s
  typeof t == 'string'
    ? (s = Ql(t))
    : ((s = { ...t }),
      mt(!s.pathname || !s.pathname.includes('?'), Md('?', 'pathname', 'search', s)),
      mt(!s.pathname || !s.pathname.includes('#'), Md('#', 'pathname', 'hash', s)),
      mt(!s.search || !s.search.includes('#'), Md('#', 'search', 'hash', s)))
  let u = t === '' || s.pathname === '',
    f = u ? '/' : s.pathname,
    p
  if (f == null) p = l
  else {
    let b = r.length - 1
    if (!o && f.startsWith('..')) {
      let C = f.split('/')
      for (; C[0] === '..';) (C.shift(), (b -= 1))
      s.pathname = C.join('/')
    }
    p = b >= 0 ? r[b] : '/'
  }
  let h = MR(s, p),
    m = f && f !== '/' && f.endsWith('/'),
    g = (u || f === '.') && l.endsWith('/')
  return (!h.pathname.endsWith('/') && (m || g) && (h.pathname += '/'), h)
}
var Qb = t => t.replace(/[\\/]{2,}/g, '/'),
  Fn = t => Qb(t.join('/')),
  Tu = t => t.replace(/\/+$/, ''),
  NR = t => Tu(t).replace(/^\/*/, '/'),
  DR = t => (!t || t === '?' ? '' : t.startsWith('?') ? t : '?' + t),
  BR = t => (!t || t === '#' ? '' : t.startsWith('#') ? t : '#' + t),
  zR = class {
    constructor(t, r, l, o = !1) {
      ;((this.status = t),
        (this.statusText = r || ''),
        (this.internal = o),
        l instanceof Error ? ((this.data = l.toString()), (this.error = l)) : (this.data = l))
    }
  }
function UR(t) {
  return (
    t != null &&
    typeof t.status == 'number' &&
    typeof t.statusText == 'string' &&
    typeof t.internal == 'boolean' &&
    'data' in t
  )
}
function kR(t) {
  let r = t.map(l => l.route.path).filter(Boolean)
  return Fn(r) || '/'
}
var Zb = typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u'
function Wb(t, r) {
  let l = t
  if (typeof l != 'string' || !Sp.test(l)) return { absoluteURL: void 0, isExternal: !1, to: l }
  let o = l,
    s = !1
  if (Zb)
    try {
      let u = new URL(window.location.href),
        f = qb.test(l) ? new URL(dR(l, u.protocol)) : new URL(l),
        p = kr(f.pathname, r)
      f.origin === u.origin && p != null ? (l = p + f.search + f.hash) : (s = !0)
    } catch {
      ir(
        !1,
        `<Link to="${l}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      )
    }
  return { absoluteURL: o, isExternal: s, to: l }
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0')
var Jb = ['POST', 'PUT', 'PATCH', 'DELETE']
new Set(Jb)
var LR = ['GET', ...Jb]
new Set(LR)
var jR = [
  'about:',
  'blob:',
  'chrome:',
  'chrome-untrusted:',
  'content:',
  'data:',
  'devtools:',
  'file:',
  'filesystem:',
  'javascript:',
]
function $R(t) {
  try {
    return jR.includes(new URL(t).protocol)
  } catch {
    return !1
  }
}
var Zl = S.createContext(null)
Zl.displayName = 'DataRouter'
var Lu = S.createContext(null)
Lu.displayName = 'DataRouterState'
var ev = S.createContext(!1)
function HR() {
  return S.useContext(ev)
}
var tv = S.createContext({ isTransitioning: !1 })
tv.displayName = 'ViewTransition'
var PR = S.createContext(new Map())
PR.displayName = 'Fetchers'
var qR = S.createContext(null)
qR.displayName = 'Await'
var jn = S.createContext(null)
jn.displayName = 'Navigation'
var _i = S.createContext(null)
_i.displayName = 'Location'
var $r = S.createContext({ outlet: null, matches: [], isDataRoute: !1 })
$r.displayName = 'Route'
var Rp = S.createContext(null)
Rp.displayName = 'RouteError'
var nv = 'REACT_ROUTER_ERROR',
  IR = 'REDIRECT',
  FR = 'ROUTE_ERROR_RESPONSE'
function YR(t) {
  if (t.startsWith(`${nv}:${IR}:{`))
    try {
      let r = JSON.parse(t.slice(28))
      if (
        typeof r == 'object' &&
        r &&
        typeof r.status == 'number' &&
        typeof r.statusText == 'string' &&
        typeof r.location == 'string' &&
        typeof r.reloadDocument == 'boolean' &&
        typeof r.replace == 'boolean'
      )
        return r
    } catch {}
}
function VR(t) {
  if (t.startsWith(`${nv}:${FR}:{`))
    try {
      let r = JSON.parse(t.slice(40))
      if (typeof r == 'object' && r && typeof r.status == 'number' && typeof r.statusText == 'string')
        return new zR(r.status, r.statusText, r.data)
    } catch {}
}
function GR(t, { relative: r } = {}) {
  mt(Wl(), 'useHref() may be used only in the context of a <Router> component.')
  let { basename: l, navigator: o } = S.useContext(jn),
    { hash: s, pathname: u, search: f } = Ni(t, { relative: r }),
    p = u
  return (l !== '/' && (p = u === '/' ? l : Fn([l, u])), o.createHref({ pathname: p, search: f, hash: s }))
}
function Wl() {
  return S.useContext(_i) != null
}
function sr() {
  return (mt(Wl(), 'useLocation() may be used only in the context of a <Router> component.'), S.useContext(_i).location)
}
function KR(t) {
  mt(Wl(), 'useMatch() may be used only in the context of a <Router> component.')
  let { pathname: r } = sr()
  return S.useMemo(() => vi(t, Kb(r)), [r, t])
}
var rv = 'You should call navigate() in a React.useEffect(), not when your component is first rendered.'
function av(t) {
  S.useContext(jn).static || S.useLayoutEffect(t)
}
function ju() {
  let { isDataRoute: t } = S.useContext($r)
  return t ? iE() : XR()
}
function XR() {
  mt(Wl(), 'useNavigate() may be used only in the context of a <Router> component.')
  let t = S.useContext(Zl),
    { basename: r, navigator: l } = S.useContext(jn),
    { matches: o } = S.useContext($r),
    { pathname: s } = sr(),
    u = JSON.stringify(Xb(o)),
    f = S.useRef(!1)
  return (
    av(() => {
      f.current = !0
    }),
    S.useCallback(
      (h, m = {}) => {
        if ((ir(f.current, rv), !f.current)) return
        if (typeof h == 'number') {
          l.go(h)
          return
        }
        let g = xp(h, JSON.parse(u), s, m.relative === 'path')
        ;(t == null && r !== '/' && (g.pathname = g.pathname === '/' ? r : Fn([r, g.pathname])),
          (m.replace ? l.replace : l.push)(g, m.state, m))
      },
      [r, l, u, s, t]
    )
  )
}
S.createContext(null)
function Ni(t, { relative: r } = {}) {
  let { matches: l } = S.useContext($r),
    { pathname: o } = sr(),
    s = JSON.stringify(Xb(l))
  return S.useMemo(() => xp(t, JSON.parse(s), o, r === 'path'), [t, s, o, r])
}
function QR(t, r) {
  return lv(t, r)
}
function lv(t, r, l) {
  var T
  mt(Wl(), 'useRoutes() may be used only in the context of a <Router> component.')
  let { navigator: o } = S.useContext(jn),
    { matches: s } = S.useContext($r),
    u = s[s.length - 1],
    f = u ? u.params : {},
    p = u ? u.pathname : '/',
    h = u ? u.pathnameBase : '/',
    m = u && u.route
  {
    let A = (m && m.path) || ''
    iv(
      p,
      !m || A.endsWith('*') || A.endsWith('*?'),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${p}" (under <Route path="${A}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${A}"> to <Route path="${A === '/' ? '*' : `${A}/*`}">.`
    )
  }
  let g = sr(),
    b
  if (r) {
    let A = typeof r == 'string' ? Ql(r) : r
    ;(mt(
      h === '/' || ((T = A.pathname) == null ? void 0 : T.startsWith(h)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${h}" but pathname "${A.pathname}" was given in the \`location\` prop.`
    ),
      (b = A))
  } else b = g
  let C = b.pathname || '/',
    v = C
  if (h !== '/') {
    let A = h.replace(/^\//, '').split('/')
    v = '/' + C.replace(/^\//, '').split('/').slice(A.length).join('/')
  }
  let w =
    l && l.state.matches.length
      ? l.state.matches.map(A => Object.assign(A, { route: l.manifest[A.route.id] || A.route }))
      : Ib(t, { pathname: v })
  ;(ir(m || w != null, `No routes matched location "${b.pathname}${b.search}${b.hash}" `),
    ir(
      w == null ||
        w[w.length - 1].route.element !== void 0 ||
        w[w.length - 1].route.Component !== void 0 ||
        w[w.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${b.pathname}${b.search}${b.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    ))
  let R = tE(
    w &&
      w.map(A =>
        Object.assign({}, A, {
          params: Object.assign({}, f, A.params),
          pathname: Fn([
            h,
            o.encodeLocation
              ? o.encodeLocation(A.pathname.replace(/%/g, '%25').replace(/\?/g, '%3F').replace(/#/g, '%23')).pathname
              : A.pathname,
          ]),
          pathnameBase:
            A.pathnameBase === '/'
              ? h
              : Fn([
                  h,
                  o.encodeLocation
                    ? o.encodeLocation(A.pathnameBase.replace(/%/g, '%25').replace(/\?/g, '%3F').replace(/#/g, '%23'))
                        .pathname
                    : A.pathnameBase,
                ]),
        })
      ),
    s,
    l
  )
  return r && R
    ? S.createElement(
        _i.Provider,
        {
          value: {
            location: { pathname: '/', search: '', hash: '', state: null, key: 'default', mask: void 0, ...b },
            navigationType: 'POP',
          },
        },
        R
      )
    : R
}
function ZR() {
  let t = oE(),
    r = UR(t) ? `${t.status} ${t.statusText}` : t instanceof Error ? t.message : JSON.stringify(t),
    l = t instanceof Error ? t.stack : null,
    o = 'rgba(200,200,200, 0.5)',
    s = { padding: '0.5rem', backgroundColor: o },
    u = { padding: '2px 4px', backgroundColor: o },
    f = null
  return (
    console.error('Error handled by React Router default ErrorBoundary:', t),
    (f = S.createElement(
      S.Fragment,
      null,
      S.createElement('p', null, '💿 Hey developer 👋'),
      S.createElement(
        'p',
        null,
        'You can provide a way better UX than this when your app throws errors by providing your own ',
        S.createElement('code', { style: u }, 'ErrorBoundary'),
        ' or',
        ' ',
        S.createElement('code', { style: u }, 'errorElement'),
        ' prop on your route.'
      )
    )),
    S.createElement(
      S.Fragment,
      null,
      S.createElement('h2', null, 'Unexpected Application Error!'),
      S.createElement('h3', { style: { fontStyle: 'italic' } }, r),
      l ? S.createElement('pre', { style: s }, l) : null,
      f
    )
  )
}
var WR = S.createElement(ZR, null),
  ov = class extends S.Component {
    constructor(t) {
      ;(super(t), (this.state = { location: t.location, revalidation: t.revalidation, error: t.error }))
    }
    static getDerivedStateFromError(t) {
      return { error: t }
    }
    static getDerivedStateFromProps(t, r) {
      return r.location !== t.location || (r.revalidation !== 'idle' && t.revalidation === 'idle')
        ? { error: t.error, location: t.location, revalidation: t.revalidation }
        : {
            error: t.error !== void 0 ? t.error : r.error,
            location: r.location,
            revalidation: t.revalidation || r.revalidation,
          }
    }
    componentDidCatch(t, r) {
      this.props.onError
        ? this.props.onError(t, r)
        : console.error('React Router caught the following error during render', t)
    }
    render() {
      let t = this.state.error
      if (this.context && typeof t == 'object' && t && 'digest' in t && typeof t.digest == 'string') {
        const l = VR(t.digest)
        l && (t = l)
      }
      let r =
        t !== void 0
          ? S.createElement(
              $r.Provider,
              { value: this.props.routeContext },
              S.createElement(Rp.Provider, { value: t, children: this.props.component })
            )
          : this.props.children
      return this.context ? S.createElement(JR, { error: t }, r) : r
    }
  }
ov.contextType = ev
var _d = new WeakMap()
function JR({ children: t, error: r }) {
  let { basename: l } = S.useContext(jn)
  if (typeof r == 'object' && r && 'digest' in r && typeof r.digest == 'string') {
    let o = YR(r.digest)
    if (o) {
      let s = _d.get(r)
      if (s) throw s
      let u = Wb(o.location, l),
        f = u.absoluteURL || u.to
      if ($R(f)) throw new Error('Invalid redirect location')
      if (Zb && !_d.get(r))
        if (u.isExternal || o.reloadDocument) window.location.href = f
        else {
          const p = Promise.resolve().then(() => window.__reactRouterDataRouter.navigate(u.to, { replace: o.replace }))
          throw (_d.set(r, p), p)
        }
      return S.createElement('meta', { httpEquiv: 'refresh', content: `0;url=${f}` })
    }
  }
  return t
}
function eE({ routeContext: t, match: r, children: l }) {
  let o = S.useContext(Zl)
  return (
    o &&
      o.static &&
      o.staticContext &&
      (r.route.errorElement || r.route.ErrorBoundary) &&
      (o.staticContext._deepestRenderedBoundaryId = r.route.id),
    S.createElement($r.Provider, { value: t }, l)
  )
}
function tE(t, r = [], l) {
  let o = l == null ? void 0 : l.state
  if (t == null) {
    if (!o) return null
    if (o.errors) t = o.matches
    else if (r.length === 0 && !o.initialized && o.matches.length > 0) t = o.matches
    else return null
  }
  let s = t,
    u = o == null ? void 0 : o.errors
  if (u != null) {
    let g = s.findIndex(b => b.route.id && (u == null ? void 0 : u[b.route.id]) !== void 0)
    ;(mt(g >= 0, `Could not find a matching route for errors on route IDs: ${Object.keys(u).join(',')}`),
      (s = s.slice(0, Math.min(s.length, g + 1))))
  }
  let f = !1,
    p = -1
  if (l && o) {
    f = o.renderFallback
    for (let g = 0; g < s.length; g++) {
      let b = s[g]
      if (((b.route.HydrateFallback || b.route.hydrateFallbackElement) && (p = g), b.route.id)) {
        let { loaderData: C, errors: v } = o,
          w = b.route.loader && !C.hasOwnProperty(b.route.id) && (!v || v[b.route.id] === void 0)
        if (b.route.lazy || w) {
          ;(l.isStatic && (f = !0), p >= 0 ? (s = s.slice(0, p + 1)) : (s = [s[0]]))
          break
        }
      }
    }
  }
  let h = l == null ? void 0 : l.onError,
    m =
      o && h
        ? (g, b) => {
            var C, v
            h(g, {
              location: o.location,
              params: ((v = (C = o.matches) == null ? void 0 : C[0]) == null ? void 0 : v.params) ?? {},
              pattern: kR(o.matches),
              errorInfo: b,
            })
          }
        : void 0
  return s.reduceRight((g, b, C) => {
    let v,
      w = !1,
      R = null,
      T = null
    o &&
      ((v = u && b.route.id ? u[b.route.id] : void 0),
      (R = b.route.errorElement || WR),
      f &&
        (p < 0 && C === 0
          ? (iv('route-fallback', !1, 'No `HydrateFallback` element provided to render during initial hydration'),
            (w = !0),
            (T = null))
          : p === C && ((w = !0), (T = b.route.hydrateFallbackElement || null))))
    let A = r.concat(s.slice(0, C + 1)),
      O = () => {
        let M
        return (
          v
            ? (M = R)
            : w
              ? (M = T)
              : b.route.Component
                ? (M = S.createElement(b.route.Component, null))
                : b.route.element
                  ? (M = b.route.element)
                  : (M = g),
          S.createElement(eE, {
            match: b,
            routeContext: { outlet: g, matches: A, isDataRoute: o != null },
            children: M,
          })
        )
      }
    return o && (b.route.ErrorBoundary || b.route.errorElement || C === 0)
      ? S.createElement(ov, {
          location: o.location,
          revalidation: o.revalidation,
          component: R,
          error: v,
          children: O(),
          routeContext: { outlet: null, matches: A, isDataRoute: !0 },
          onError: m,
        })
      : O()
  }, null)
}
function Ep(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`
}
function nE(t) {
  let r = S.useContext(Zl)
  return (mt(r, Ep(t)), r)
}
function rE(t) {
  let r = S.useContext(Lu)
  return (mt(r, Ep(t)), r)
}
function aE(t) {
  let r = S.useContext($r)
  return (mt(r, Ep(t)), r)
}
function Tp(t) {
  let r = aE(t),
    l = r.matches[r.matches.length - 1]
  return (mt(l.route.id, `${t} can only be used on routes that contain a unique "id"`), l.route.id)
}
function lE() {
  return Tp('useRouteId')
}
function oE() {
  var o
  let t = S.useContext(Rp),
    r = rE('useRouteError'),
    l = Tp('useRouteError')
  return t !== void 0 ? t : (o = r.errors) == null ? void 0 : o[l]
}
function iE() {
  let { router: t } = nE('useNavigate'),
    r = Tp('useNavigate'),
    l = S.useRef(!1)
  return (
    av(() => {
      l.current = !0
    }),
    S.useCallback(
      async (s, u = {}) => {
        ;(ir(l.current, rv),
          l.current && (typeof s == 'number' ? await t.navigate(s) : await t.navigate(s, { fromRouteId: r, ...u })))
      },
      [t, r]
    )
  )
}
var r0 = {}
function iv(t, r, l) {
  !r && !r0[t] && ((r0[t] = !0), ir(!1, l))
}
S.memo(sE)
function sE({ routes: t, manifest: r, future: l, state: o, isStatic: s, onError: u }) {
  return lv(t, void 0, { manifest: r, state: o, isStatic: s, onError: u })
}
function jl(t) {
  mt(
    !1,
    'A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.'
  )
}
function uE({
  basename: t = '/',
  children: r = null,
  location: l,
  navigationType: o = 'POP',
  navigator: s,
  static: u = !1,
  useTransitions: f,
}) {
  mt(!Wl(), 'You cannot render a <Router> inside another <Router>. You should never have more than one in your app.')
  let p = t.replace(/^\/*/, '/'),
    h = S.useMemo(() => ({ basename: p, navigator: s, static: u, useTransitions: f, future: {} }), [p, s, u, f])
  typeof l == 'string' && (l = Ql(l))
  let { pathname: m = '/', search: g = '', hash: b = '', state: C = null, key: v = 'default', mask: w } = l,
    R = S.useMemo(() => {
      let T = kr(m, p)
      return T == null
        ? null
        : { location: { pathname: T, search: g, hash: b, state: C, key: v, mask: w }, navigationType: o }
    }, [p, m, g, b, C, v, o, w])
  return (
    ir(
      R != null,
      `<Router basename="${p}"> is not able to match the URL "${m}${g}${b}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    R == null
      ? null
      : S.createElement(jn.Provider, { value: h }, S.createElement(_i.Provider, { children: r, value: R }))
  )
}
function cE({ children: t, location: r }) {
  return QR(Xd(t), r)
}
function Xd(t, r = []) {
  let l = []
  return (
    S.Children.forEach(t, (o, s) => {
      if (!S.isValidElement(o)) return
      let u = [...r, s]
      if (o.type === S.Fragment) {
        l.push.apply(l, Xd(o.props.children, u))
        return
      }
      ;(mt(
        o.type === jl,
        `[${typeof o.type == 'string' ? o.type : o.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
      ),
        mt(!o.props.index || !o.props.children, 'An index route cannot have child routes.'))
      let f = {
        id: o.props.id || u.join('-'),
        caseSensitive: o.props.caseSensitive,
        element: o.props.element,
        Component: o.props.Component,
        index: o.props.index,
        path: o.props.path,
        middleware: o.props.middleware,
        loader: o.props.loader,
        action: o.props.action,
        hydrateFallbackElement: o.props.hydrateFallbackElement,
        HydrateFallback: o.props.HydrateFallback,
        errorElement: o.props.errorElement,
        ErrorBoundary: o.props.ErrorBoundary,
        hasErrorBoundary:
          o.props.hasErrorBoundary === !0 || o.props.ErrorBoundary != null || o.props.errorElement != null,
        shouldRevalidate: o.props.shouldRevalidate,
        handle: o.props.handle,
        lazy: o.props.lazy,
      }
      ;(o.props.children && (f.children = Xd(o.props.children, u)), l.push(f))
    }),
    l
  )
}
var du = 'get',
  pu = 'application/x-www-form-urlencoded'
function $u(t) {
  return typeof HTMLElement < 'u' && t instanceof HTMLElement
}
function fE(t) {
  return $u(t) && t.tagName.toLowerCase() === 'button'
}
function dE(t) {
  return $u(t) && t.tagName.toLowerCase() === 'form'
}
function pE(t) {
  return $u(t) && t.tagName.toLowerCase() === 'input'
}
function hE(t) {
  return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey)
}
function mE(t, r) {
  return t.button === 0 && (!r || r === '_self') && !hE(t)
}
var nu = null
function gE() {
  if (nu === null)
    try {
      ;(new FormData(document.createElement('form'), 0), (nu = !1))
    } catch {
      nu = !0
    }
  return nu
}
var yE = new Set(['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain'])
function Nd(t) {
  return t != null && !yE.has(t)
    ? (ir(!1, `"${t}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${pu}"`), null)
    : t
}
function bE(t, r) {
  let l, o, s, u, f
  if (dE(t)) {
    let p = t.getAttribute('action')
    ;((o = p ? kr(p, r) : null),
      (l = t.getAttribute('method') || du),
      (s = Nd(t.getAttribute('enctype')) || pu),
      (u = new FormData(t)))
  } else if (fE(t) || (pE(t) && (t.type === 'submit' || t.type === 'image'))) {
    let p = t.form
    if (p == null) throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>')
    let h = t.getAttribute('formaction') || p.getAttribute('action')
    if (
      ((o = h ? kr(h, r) : null),
      (l = t.getAttribute('formmethod') || p.getAttribute('method') || du),
      (s = Nd(t.getAttribute('formenctype')) || Nd(p.getAttribute('enctype')) || pu),
      (u = new FormData(p, t)),
      !gE())
    ) {
      let { name: m, type: g, value: b } = t
      if (g === 'image') {
        let C = m ? `${m}.` : ''
        ;(u.append(`${C}x`, '0'), u.append(`${C}y`, '0'))
      } else m && u.append(m, b)
    }
  } else {
    if ($u(t)) throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">')
    ;((l = du), (o = null), (s = pu), (f = t))
  }
  return (
    u && s === 'text/plain' && ((f = u), (u = void 0)),
    { action: o, method: l.toLowerCase(), encType: s, formData: u, body: f }
  )
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0')
function Cp(t, r) {
  if (t === !1 || t === null || typeof t > 'u') throw new Error(r)
}
function sv(t, r, l, o) {
  let s = typeof t == 'string' ? new URL(t, typeof window > 'u' ? 'server://singlefetch/' : window.location.origin) : t
  return (
    l
      ? s.pathname.endsWith('/')
        ? (s.pathname = `${s.pathname}_.${o}`)
        : (s.pathname = `${s.pathname}.${o}`)
      : s.pathname === '/'
        ? (s.pathname = `_root.${o}`)
        : r && kr(s.pathname, r) === '/'
          ? (s.pathname = `${Tu(r)}/_root.${o}`)
          : (s.pathname = `${Tu(s.pathname)}.${o}`),
    s
  )
}
async function vE(t, r) {
  if (t.id in r) return r[t.id]
  try {
    let l = await import(t.module)
    return ((r[t.id] = l), l)
  } catch (l) {
    return (
      console.error(`Error loading route module \`${t.module}\`, reloading page...`),
      console.error(l),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    )
  }
}
function SE(t) {
  return t == null
    ? !1
    : t.href == null
      ? t.rel === 'preload' && typeof t.imageSrcSet == 'string' && typeof t.imageSizes == 'string'
      : typeof t.rel == 'string' && typeof t.href == 'string'
}
async function xE(t, r, l) {
  let o = await Promise.all(
    t.map(async s => {
      let u = r.routes[s.route.id]
      if (u) {
        let f = await vE(u, l)
        return f.links ? f.links() : []
      }
      return []
    })
  )
  return CE(
    o
      .flat(1)
      .filter(SE)
      .filter(s => s.rel === 'stylesheet' || s.rel === 'preload')
      .map(s => (s.rel === 'stylesheet' ? { ...s, rel: 'prefetch', as: 'style' } : { ...s, rel: 'prefetch' }))
  )
}
function a0(t, r, l, o, s, u) {
  let f = (h, m) => (l[m] ? h.route.id !== l[m].route.id : !0),
    p = (h, m) => {
      var g
      return (
        l[m].pathname !== h.pathname ||
        (((g = l[m].route.path) == null ? void 0 : g.endsWith('*')) && l[m].params['*'] !== h.params['*'])
      )
    }
  return u === 'assets'
    ? r.filter((h, m) => f(h, m) || p(h, m))
    : u === 'data'
      ? r.filter((h, m) => {
          var b
          let g = o.routes[h.route.id]
          if (!g || !g.hasLoader) return !1
          if (f(h, m) || p(h, m)) return !0
          if (h.route.shouldRevalidate) {
            let C = h.route.shouldRevalidate({
              currentUrl: new URL(s.pathname + s.search + s.hash, window.origin),
              currentParams: ((b = l[0]) == null ? void 0 : b.params) || {},
              nextUrl: new URL(t, window.origin),
              nextParams: h.params,
              defaultShouldRevalidate: !0,
            })
            if (typeof C == 'boolean') return C
          }
          return !0
        })
      : []
}
function RE(t, r, { includeHydrateFallback: l } = {}) {
  return EE(
    t
      .map(o => {
        let s = r.routes[o.route.id]
        if (!s) return []
        let u = [s.module]
        return (
          s.clientActionModule && (u = u.concat(s.clientActionModule)),
          s.clientLoaderModule && (u = u.concat(s.clientLoaderModule)),
          l && s.hydrateFallbackModule && (u = u.concat(s.hydrateFallbackModule)),
          s.imports && (u = u.concat(s.imports)),
          u
        )
      })
      .flat(1)
  )
}
function EE(t) {
  return [...new Set(t)]
}
function TE(t) {
  let r = {},
    l = Object.keys(t).sort()
  for (let o of l) r[o] = t[o]
  return r
}
function CE(t, r) {
  let l = new Set()
  return (
    new Set(r),
    t.reduce((o, s) => {
      let u = JSON.stringify(TE(s))
      return (l.has(u) || (l.add(u), o.push({ key: u, link: s })), o)
    }, [])
  )
}
function wp() {
  let t = S.useContext(Zl)
  return (Cp(t, 'You must render this element inside a <DataRouterContext.Provider> element'), t)
}
function wE() {
  let t = S.useContext(Lu)
  return (Cp(t, 'You must render this element inside a <DataRouterStateContext.Provider> element'), t)
}
var Ap = S.createContext(void 0)
Ap.displayName = 'FrameworkContext'
function Hu() {
  let t = S.useContext(Ap)
  return (Cp(t, 'You must render this element inside a <HydratedRouter> element'), t)
}
function AE(t, r) {
  let l = S.useContext(Ap),
    [o, s] = S.useState(!1),
    [u, f] = S.useState(!1),
    { onFocus: p, onBlur: h, onMouseEnter: m, onMouseLeave: g, onTouchStart: b } = r,
    C = S.useRef(null)
  ;(S.useEffect(() => {
    if ((t === 'render' && f(!0), t === 'viewport')) {
      let R = A => {
          A.forEach(O => {
            f(O.isIntersecting)
          })
        },
        T = new IntersectionObserver(R, { threshold: 0.5 })
      return (
        C.current && T.observe(C.current),
        () => {
          T.disconnect()
        }
      )
    }
  }, [t]),
    S.useEffect(() => {
      if (o) {
        let R = setTimeout(() => {
          f(!0)
        }, 100)
        return () => {
          clearTimeout(R)
        }
      }
    }, [o]))
  let v = () => {
      s(!0)
    },
    w = () => {
      ;(s(!1), f(!1))
    }
  return l
    ? t !== 'intent'
      ? [u, C, {}]
      : [
          u,
          C,
          {
            onFocus: ai(p, v),
            onBlur: ai(h, w),
            onMouseEnter: ai(m, v),
            onMouseLeave: ai(g, w),
            onTouchStart: ai(b, v),
          },
        ]
    : [!1, C, {}]
}
function ai(t, r) {
  return l => {
    ;(t && t(l), l.defaultPrevented || r(l))
  }
}
function OE({ page: t, ...r }) {
  let l = HR(),
    { nonce: o } = Hu(),
    { router: s } = wp(),
    u = S.useMemo(() => Ib(s.routes, t, s.basename), [s.routes, t, s.basename])
  return u
    ? (r.nonce == null && o && (r = { ...r, nonce: o }),
      l ? S.createElement(_E, { page: t, matches: u, ...r }) : S.createElement(NE, { page: t, matches: u, ...r }))
    : null
}
function ME(t) {
  let { manifest: r, routeModules: l } = Hu(),
    [o, s] = S.useState([])
  return (
    S.useEffect(() => {
      let u = !1
      return (
        xE(t, r, l).then(f => {
          u || s(f)
        }),
        () => {
          u = !0
        }
      )
    }, [t, r, l]),
    o
  )
}
function _E({ page: t, matches: r, ...l }) {
  let o = sr(),
    { future: s } = Hu(),
    { basename: u } = wp(),
    f = S.useMemo(() => {
      if (t === o.pathname + o.search + o.hash) return []
      let p = sv(t, u, s.v8_trailingSlashAwareDataRequests, 'rsc'),
        h = !1,
        m = []
      for (let g of r) typeof g.route.shouldRevalidate == 'function' ? (h = !0) : m.push(g.route.id)
      return (h && m.length > 0 && p.searchParams.set('_routes', m.join(',')), [p.pathname + p.search])
    }, [u, s.v8_trailingSlashAwareDataRequests, t, o, r])
  return S.createElement(
    S.Fragment,
    null,
    f.map(p => S.createElement('link', { key: p, rel: 'prefetch', as: 'fetch', href: p, ...l }))
  )
}
function NE({ page: t, matches: r, ...l }) {
  let o = sr(),
    { future: s, manifest: u, routeModules: f } = Hu(),
    { basename: p } = wp(),
    { loaderData: h, matches: m } = wE(),
    g = S.useMemo(() => a0(t, r, m, u, o, 'data'), [t, r, m, u, o]),
    b = S.useMemo(() => a0(t, r, m, u, o, 'assets'), [t, r, m, u, o]),
    C = S.useMemo(() => {
      if (t === o.pathname + o.search + o.hash) return []
      let R = new Set(),
        T = !1
      if (
        (r.forEach(O => {
          var z
          let M = u.routes[O.route.id]
          !M ||
            !M.hasLoader ||
            ((!g.some(_ => _.route.id === O.route.id) &&
              O.route.id in h &&
              (z = f[O.route.id]) != null &&
              z.shouldRevalidate) ||
            M.hasClientLoader
              ? (T = !0)
              : R.add(O.route.id))
        }),
        R.size === 0)
      )
        return []
      let A = sv(t, p, s.v8_trailingSlashAwareDataRequests, 'data')
      return (
        T &&
          R.size > 0 &&
          A.searchParams.set(
            '_routes',
            r
              .filter(O => R.has(O.route.id))
              .map(O => O.route.id)
              .join(',')
          ),
        [A.pathname + A.search]
      )
    }, [p, s.v8_trailingSlashAwareDataRequests, h, o, u, g, r, t, f]),
    v = S.useMemo(() => RE(b, u), [b, u]),
    w = ME(b)
  return S.createElement(
    S.Fragment,
    null,
    C.map(R => S.createElement('link', { key: R, rel: 'prefetch', as: 'fetch', href: R, ...l })),
    v.map(R => S.createElement('link', { key: R, rel: 'modulepreload', href: R, ...l })),
    w.map(({ key: R, link: T }) =>
      S.createElement('link', { key: R, nonce: l.nonce, ...T, crossOrigin: T.crossOrigin ?? l.crossOrigin })
    )
  )
}
function DE(...t) {
  return r => {
    t.forEach(l => {
      typeof l == 'function' ? l(r) : l != null && (l.current = r)
    })
  }
}
var BE = typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u'
try {
  BE && (window.__reactRouterVersion = '7.18.2')
} catch {}
function zE({ basename: t, children: r, useTransitions: l, window: o }) {
  let s = S.useRef()
  s.current == null && (s.current = pR({ window: o, v5Compat: !0 }))
  let u = s.current,
    [f, p] = S.useState({ action: u.action, location: u.location }),
    h = S.useCallback(
      m => {
        l === !1 ? p(m) : S.startTransition(() => p(m))
      },
      [l]
    )
  return (
    S.useLayoutEffect(() => u.listen(h), [u, h]),
    S.createElement(uE, {
      basename: t,
      children: r,
      location: f.location,
      navigationType: f.action,
      navigator: u,
      useTransitions: l,
    })
  )
}
var Hl = S.forwardRef(function (
  {
    onClick: r,
    discover: l = 'render',
    prefetch: o = 'none',
    relative: s,
    reloadDocument: u,
    replace: f,
    mask: p,
    state: h,
    target: m,
    to: g,
    preventScrollReset: b,
    viewTransition: C,
    defaultShouldRevalidate: v,
    ...w
  },
  R
) {
  let { basename: T, navigator: A, useTransitions: O } = S.useContext(jn),
    M = typeof g == 'string' && Sp.test(g),
    z = Wb(g, T)
  g = z.to
  let _ = GR(g, { relative: s }),
    k = sr(),
    V = null
  if (p) {
    let U = xp(p, [], k.mask ? k.mask.pathname : '/', !0)
    ;(T !== '/' && (U.pathname = U.pathname === '/' ? T : Fn([T, U.pathname])), (V = A.createHref(U)))
  }
  let [Q, oe, ce] = AE(o, w),
    Z = jE(g, {
      replace: f,
      mask: p,
      state: h,
      target: m,
      preventScrollReset: b,
      relative: s,
      viewTransition: C,
      defaultShouldRevalidate: v,
      useTransitions: O,
    })
  function x(U) {
    ;(r && r(U), U.defaultPrevented || Z(U))
  }
  let G = !(z.isExternal || u),
    L = S.createElement('a', {
      ...w,
      ...ce,
      href: (G ? V : void 0) || z.absoluteURL || _,
      onClick: G ? x : r,
      ref: DE(R, oe),
      target: m,
      'data-discover': !M && l === 'render' ? 'true' : void 0,
    })
  return Q && !M ? S.createElement(S.Fragment, null, L, S.createElement(OE, { page: _ })) : L
})
Hl.displayName = 'Link'
var UE = S.forwardRef(function (
  {
    'aria-current': r = 'page',
    caseSensitive: l = !1,
    className: o = '',
    end: s = !1,
    style: u,
    to: f,
    viewTransition: p,
    children: h,
    ...m
  },
  g
) {
  let b = Ni(f, { relative: m.relative }),
    C = sr(),
    v = S.useContext(Lu),
    { navigator: w, basename: R } = S.useContext(jn),
    T = v != null && IE(b) && p === !0,
    A = w.encodeLocation ? w.encodeLocation(b).pathname : b.pathname,
    O = C.pathname,
    M = v && v.navigation && v.navigation.location ? v.navigation.location.pathname : null
  ;(l || ((O = O.toLowerCase()), (M = M ? M.toLowerCase() : null), (A = A.toLowerCase())),
    M && R && (M = kr(M, R) || M))
  const z = A !== '/' && A.endsWith('/') ? A.length - 1 : A.length
  let _ = O === A || (!s && O.startsWith(A) && O.charAt(z) === '/'),
    k = M != null && (M === A || (!s && M.startsWith(A) && M.charAt(A.length) === '/')),
    V = { isActive: _, isPending: k, isTransitioning: T },
    Q = _ ? r : void 0,
    oe
  typeof o == 'function'
    ? (oe = o(V))
    : (oe = [o, _ ? 'active' : null, k ? 'pending' : null, T ? 'transitioning' : null].filter(Boolean).join(' '))
  let ce = typeof u == 'function' ? u(V) : u
  return S.createElement(
    Hl,
    { ...m, 'aria-current': Q, className: oe, ref: g, style: ce, to: f, viewTransition: p },
    typeof h == 'function' ? h(V) : h
  )
})
UE.displayName = 'NavLink'
var kE = S.forwardRef(
  (
    {
      discover: t = 'render',
      fetcherKey: r,
      navigate: l,
      reloadDocument: o,
      replace: s,
      state: u,
      method: f = du,
      action: p,
      onSubmit: h,
      relative: m,
      preventScrollReset: g,
      viewTransition: b,
      defaultShouldRevalidate: C,
      ...v
    },
    w
  ) => {
    let { useTransitions: R } = S.useContext(jn),
      T = PE(),
      A = qE(p, { relative: m }),
      O = f.toLowerCase() === 'get' ? 'get' : 'post',
      M = typeof p == 'string' && Sp.test(p),
      z = _ => {
        if ((h && h(_), _.defaultPrevented)) return
        _.preventDefault()
        let k = _.nativeEvent.submitter,
          V = (k == null ? void 0 : k.getAttribute('formmethod')) || f,
          Q = () =>
            T(k || _.currentTarget, {
              fetcherKey: r,
              method: V,
              navigate: l,
              replace: s,
              state: u,
              relative: m,
              preventScrollReset: g,
              viewTransition: b,
              defaultShouldRevalidate: C,
            })
        R && l !== !1 ? S.startTransition(() => Q()) : Q()
      }
    return S.createElement('form', {
      ref: w,
      method: O,
      action: A,
      onSubmit: o ? h : z,
      ...v,
      'data-discover': !M && t === 'render' ? 'true' : void 0,
    })
  }
)
kE.displayName = 'Form'
function LE(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`
}
function uv(t) {
  let r = S.useContext(Zl)
  return (mt(r, LE(t)), r)
}
function jE(
  t,
  {
    target: r,
    replace: l,
    mask: o,
    state: s,
    preventScrollReset: u,
    relative: f,
    viewTransition: p,
    defaultShouldRevalidate: h,
    useTransitions: m,
  } = {}
) {
  let g = ju(),
    b = sr(),
    C = Ni(t, { relative: f })
  return S.useCallback(
    v => {
      if (mE(v, r)) {
        v.preventDefault()
        let w = l !== void 0 ? l : bi(b) === bi(C),
          R = () =>
            g(t, {
              replace: w,
              mask: o,
              state: s,
              preventScrollReset: u,
              relative: f,
              viewTransition: p,
              defaultShouldRevalidate: h,
            })
        m ? S.startTransition(() => R()) : R()
      }
    },
    [b, g, C, l, o, s, r, t, u, f, p, h, m]
  )
}
var $E = 0,
  HE = () => `__${String(++$E)}__`
function PE() {
  let { router: t } = uv('useSubmit'),
    { basename: r } = S.useContext(jn),
    l = lE(),
    o = t.fetch,
    s = t.navigate
  return S.useCallback(
    async (u, f = {}) => {
      let { action: p, method: h, encType: m, formData: g, body: b } = bE(u, r)
      if (f.navigate === !1) {
        let C = f.fetcherKey || HE()
        await o(C, l, f.action || p, {
          defaultShouldRevalidate: f.defaultShouldRevalidate,
          preventScrollReset: f.preventScrollReset,
          formData: g,
          body: b,
          formMethod: f.method || h,
          formEncType: f.encType || m,
          flushSync: f.flushSync,
        })
      } else
        await s(f.action || p, {
          defaultShouldRevalidate: f.defaultShouldRevalidate,
          preventScrollReset: f.preventScrollReset,
          formData: g,
          body: b,
          formMethod: f.method || h,
          formEncType: f.encType || m,
          replace: f.replace,
          state: f.state,
          fromRouteId: l,
          flushSync: f.flushSync,
          viewTransition: f.viewTransition,
        })
    },
    [o, s, r, l]
  )
}
function qE(t, { relative: r } = {}) {
  let { basename: l } = S.useContext(jn),
    o = S.useContext($r)
  mt(o, 'useFormAction must be used inside a RouteContext')
  let [s] = o.matches.slice(-1),
    u = { ...Ni(t || '.', { relative: r }) },
    f = sr()
  if (t == null) {
    u.search = f.search
    let p = new URLSearchParams(u.search),
      h = p.getAll('index')
    if (h.some(g => g === '')) {
      ;(p.delete('index'), h.filter(b => b).forEach(b => p.append('index', b)))
      let g = p.toString()
      u.search = g ? `?${g}` : ''
    }
  }
  return (
    (!t || t === '.') && s.route.index && (u.search = u.search ? u.search.replace(/^\?/, '?index&') : '?index'),
    l !== '/' && (u.pathname = u.pathname === '/' ? l : Fn([l, u.pathname])),
    bi(u)
  )
}
function IE(t, { relative: r } = {}) {
  let l = S.useContext(tv)
  mt(
    l != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  )
  let { basename: o } = uv('useViewTransitionState'),
    s = Ni(t, { relative: r })
  if (!l.isTransitioning) return !1
  let u = kr(l.currentLocation.pathname, o) || l.currentLocation.pathname,
    f = kr(l.nextLocation.pathname, o) || l.nextLocation.pathname
  return vi(s.pathname, f) != null || vi(s.pathname, u) != null
}
var FE = Pb()
const Si = { black: '#000', white: '#fff' },
  Dl = { 300: '#e57373', 400: '#ef5350', 500: '#f44336', 700: '#d32f2f', 800: '#c62828' },
  Bl = { 50: '#f3e5f5', 200: '#ce93d8', 300: '#ba68c8', 400: '#ab47bc', 500: '#9c27b0', 700: '#7b1fa2' },
  zl = { 50: '#e3f2fd', 200: '#90caf9', 400: '#42a5f5', 700: '#1976d2', 800: '#1565c0' },
  Ul = { 300: '#4fc3f7', 400: '#29b6f6', 500: '#03a9f4', 700: '#0288d1', 900: '#01579b' },
  kl = { 300: '#81c784', 400: '#66bb6a', 500: '#4caf50', 700: '#388e3c', 800: '#2e7d32', 900: '#1b5e20' },
  li = { 300: '#ffb74d', 400: '#ffa726', 500: '#ff9800', 700: '#f57c00', 900: '#e65100' },
  YE = {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
    A100: '#f5f5f5',
    A200: '#eeeeee',
    A400: '#bdbdbd',
    A700: '#616161',
  }
function Lr(t, ...r) {
  const l = new URL(`https://mui.com/production-error/?code=${t}`)
  return (
    r.forEach(o => l.searchParams.append('args[]', o)),
    `Minified MUI error #${t}; visit ${l} for the full message.`
  )
}
const Pu = '$$material'
function Qd() {
  return (
    (Qd = Object.assign
      ? Object.assign.bind()
      : function (t) {
          for (var r = 1; r < arguments.length; r++) {
            var l = arguments[r]
            for (var o in l) ({}).hasOwnProperty.call(l, o) && (t[o] = l[o])
          }
          return t
        }),
    Qd.apply(null, arguments)
  )
}
function VE(t) {
  if (t.sheet) return t.sheet
  for (var r = 0; r < document.styleSheets.length; r++)
    if (document.styleSheets[r].ownerNode === t) return document.styleSheets[r]
}
function GE(t) {
  var r = document.createElement('style')
  return (
    r.setAttribute('data-emotion', t.key),
    t.nonce !== void 0 && r.setAttribute('nonce', t.nonce),
    r.appendChild(document.createTextNode('')),
    r.setAttribute('data-s', ''),
    r
  )
}
var KE = (function () {
    function t(l) {
      var o = this
      ;((this._insertTag = function (s) {
        var u
        ;(o.tags.length === 0
          ? o.insertionPoint
            ? (u = o.insertionPoint.nextSibling)
            : o.prepend
              ? (u = o.container.firstChild)
              : (u = o.before)
          : (u = o.tags[o.tags.length - 1].nextSibling),
          o.container.insertBefore(s, u),
          o.tags.push(s))
      }),
        (this.isSpeedy = l.speedy === void 0 ? !0 : l.speedy),
        (this.tags = []),
        (this.ctr = 0),
        (this.nonce = l.nonce),
        (this.key = l.key),
        (this.container = l.container),
        (this.prepend = l.prepend),
        (this.insertionPoint = l.insertionPoint),
        (this.before = null))
    }
    var r = t.prototype
    return (
      (r.hydrate = function (o) {
        o.forEach(this._insertTag)
      }),
      (r.insert = function (o) {
        this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(GE(this))
        var s = this.tags[this.tags.length - 1]
        if (this.isSpeedy) {
          var u = VE(s)
          try {
            u.insertRule(o, u.cssRules.length)
          } catch {}
        } else s.appendChild(document.createTextNode(o))
        this.ctr++
      }),
      (r.flush = function () {
        ;(this.tags.forEach(function (o) {
          var s
          return (s = o.parentNode) == null ? void 0 : s.removeChild(o)
        }),
          (this.tags = []),
          (this.ctr = 0))
      }),
      t
    )
  })(),
  Jt = '-ms-',
  Cu = '-moz-',
  Ie = '-webkit-',
  cv = 'comm',
  Op = 'rule',
  Mp = 'decl',
  XE = '@import',
  fv = '@keyframes',
  QE = '@layer',
  ZE = Math.abs,
  qu = String.fromCharCode,
  WE = Object.assign
function JE(t, r) {
  return Kt(t, 0) ^ 45 ? (((((((r << 2) ^ Kt(t, 0)) << 2) ^ Kt(t, 1)) << 2) ^ Kt(t, 2)) << 2) ^ Kt(t, 3) : 0
}
function dv(t) {
  return t.trim()
}
function eT(t, r) {
  return (t = r.exec(t)) ? t[0] : t
}
function Fe(t, r, l) {
  return t.replace(r, l)
}
function Zd(t, r) {
  return t.indexOf(r)
}
function Kt(t, r) {
  return t.charCodeAt(r) | 0
}
function xi(t, r, l) {
  return t.slice(r, l)
}
function rr(t) {
  return t.length
}
function _p(t) {
  return t.length
}
function ru(t, r) {
  return (r.push(t), t)
}
function tT(t, r) {
  return t.map(r).join('')
}
var Iu = 1,
  Fl = 1,
  pv = 0,
  gn = 0,
  _t = 0,
  Jl = ''
function Fu(t, r, l, o, s, u, f) {
  return { value: t, root: r, parent: l, type: o, props: s, children: u, line: Iu, column: Fl, length: f, return: '' }
}
function oi(t, r) {
  return WE(Fu('', null, null, '', null, null, 0), t, { length: -t.length }, r)
}
function nT() {
  return _t
}
function rT() {
  return ((_t = gn > 0 ? Kt(Jl, --gn) : 0), Fl--, _t === 10 && ((Fl = 1), Iu--), _t)
}
function Cn() {
  return ((_t = gn < pv ? Kt(Jl, gn++) : 0), Fl++, _t === 10 && ((Fl = 1), Iu++), _t)
}
function or() {
  return Kt(Jl, gn)
}
function hu() {
  return gn
}
function Di(t, r) {
  return xi(Jl, t, r)
}
function Ri(t) {
  switch (t) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4
    case 58:
      return 3
    case 34:
    case 39:
    case 40:
    case 91:
      return 2
    case 41:
    case 93:
      return 1
  }
  return 0
}
function hv(t) {
  return ((Iu = Fl = 1), (pv = rr((Jl = t))), (gn = 0), [])
}
function mv(t) {
  return ((Jl = ''), t)
}
function mu(t) {
  return dv(Di(gn - 1, Wd(t === 91 ? t + 2 : t === 40 ? t + 1 : t)))
}
function aT(t) {
  for (; (_t = or()) && _t < 33;) Cn()
  return Ri(t) > 2 || Ri(_t) > 3 ? '' : ' '
}
function lT(t, r) {
  for (; --r && Cn() && !(_t < 48 || _t > 102 || (_t > 57 && _t < 65) || (_t > 70 && _t < 97)););
  return Di(t, hu() + (r < 6 && or() == 32 && Cn() == 32))
}
function Wd(t) {
  for (; Cn();)
    switch (_t) {
      case t:
        return gn
      case 34:
      case 39:
        t !== 34 && t !== 39 && Wd(_t)
        break
      case 40:
        t === 41 && Wd(t)
        break
      case 92:
        Cn()
        break
    }
  return gn
}
function oT(t, r) {
  for (; Cn() && t + _t !== 57;) if (t + _t === 84 && or() === 47) break
  return '/*' + Di(r, gn - 1) + '*' + qu(t === 47 ? t : Cn())
}
function iT(t) {
  for (; !Ri(or());) Cn()
  return Di(t, gn)
}
function sT(t) {
  return mv(gu('', null, null, null, [''], (t = hv(t)), 0, [0], t))
}
function gu(t, r, l, o, s, u, f, p, h) {
  for (var m = 0, g = 0, b = f, C = 0, v = 0, w = 0, R = 1, T = 1, A = 1, O = 0, M = '', z = s, _ = u, k = o, V = M; T;)
    switch (((w = O), (O = Cn()))) {
      case 40:
        if (w != 108 && Kt(V, b - 1) == 58) {
          Zd((V += Fe(mu(O), '&', '&\f')), '&\f') != -1 && (A = -1)
          break
        }
      case 34:
      case 39:
      case 91:
        V += mu(O)
        break
      case 9:
      case 10:
      case 13:
      case 32:
        V += aT(w)
        break
      case 92:
        V += lT(hu() - 1, 7)
        continue
      case 47:
        switch (or()) {
          case 42:
          case 47:
            ru(uT(oT(Cn(), hu()), r, l), h)
            break
          default:
            V += '/'
        }
        break
      case 123 * R:
        p[m++] = rr(V) * A
      case 125 * R:
      case 59:
      case 0:
        switch (O) {
          case 0:
          case 125:
            T = 0
          case 59 + g:
            ;(A == -1 && (V = Fe(V, /\f/g, '')),
              v > 0 && rr(V) - b && ru(v > 32 ? o0(V + ';', o, l, b - 1) : o0(Fe(V, ' ', '') + ';', o, l, b - 2), h))
            break
          case 59:
            V += ';'
          default:
            if ((ru((k = l0(V, r, l, m, g, s, p, M, (z = []), (_ = []), b)), u), O === 123))
              if (g === 0) gu(V, r, k, k, z, u, b, p, _)
              else
                switch (C === 99 && Kt(V, 3) === 110 ? 100 : C) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    gu(t, k, k, o && ru(l0(t, k, k, 0, 0, s, p, M, s, (z = []), b), _), s, _, b, p, o ? z : _)
                    break
                  default:
                    gu(V, k, k, k, [''], _, 0, p, _)
                }
        }
        ;((m = g = v = 0), (R = A = 1), (M = V = ''), (b = f))
        break
      case 58:
        ;((b = 1 + rr(V)), (v = w))
      default:
        if (R < 1) {
          if (O == 123) --R
          else if (O == 125 && R++ == 0 && rT() == 125) continue
        }
        switch (((V += qu(O)), O * R)) {
          case 38:
            A = g > 0 ? 1 : ((V += '\f'), -1)
            break
          case 44:
            ;((p[m++] = (rr(V) - 1) * A), (A = 1))
            break
          case 64:
            ;(or() === 45 && (V += mu(Cn())), (C = or()), (g = b = rr((M = V += iT(hu())))), O++)
            break
          case 45:
            w === 45 && rr(V) == 2 && (R = 0)
        }
    }
  return u
}
function l0(t, r, l, o, s, u, f, p, h, m, g) {
  for (var b = s - 1, C = s === 0 ? u : [''], v = _p(C), w = 0, R = 0, T = 0; w < o; ++w)
    for (var A = 0, O = xi(t, b + 1, (b = ZE((R = f[w])))), M = t; A < v; ++A)
      (M = dv(R > 0 ? C[A] + ' ' + O : Fe(O, /&\f/g, C[A]))) && (h[T++] = M)
  return Fu(t, r, l, s === 0 ? Op : p, h, m, g)
}
function uT(t, r, l) {
  return Fu(t, r, l, cv, qu(nT()), xi(t, 2, -2), 0)
}
function o0(t, r, l, o) {
  return Fu(t, r, l, Mp, xi(t, 0, o), xi(t, o + 1, -1), o)
}
function Pl(t, r) {
  for (var l = '', o = _p(t), s = 0; s < o; s++) l += r(t[s], s, t, r) || ''
  return l
}
function cT(t, r, l, o) {
  switch (t.type) {
    case QE:
      if (t.children.length) break
    case XE:
    case Mp:
      return (t.return = t.return || t.value)
    case cv:
      return ''
    case fv:
      return (t.return = t.value + '{' + Pl(t.children, o) + '}')
    case Op:
      t.value = t.props.join(',')
  }
  return rr((l = Pl(t.children, o))) ? (t.return = t.value + '{' + l + '}') : ''
}
function fT(t) {
  var r = _p(t)
  return function (l, o, s, u) {
    for (var f = '', p = 0; p < r; p++) f += t[p](l, o, s, u) || ''
    return f
  }
}
function dT(t) {
  return function (r) {
    r.root || ((r = r.return) && t(r))
  }
}
function gv(t) {
  var r = Object.create(null)
  return function (l) {
    return (r[l] === void 0 && (r[l] = t(l)), r[l])
  }
}
var pT = function (r, l, o) {
    for (var s = 0, u = 0; (s = u), (u = or()), s === 38 && u === 12 && (l[o] = 1), !Ri(u);) Cn()
    return Di(r, gn)
  },
  hT = function (r, l) {
    var o = -1,
      s = 44
    do
      switch (Ri(s)) {
        case 0:
          ;(s === 38 && or() === 12 && (l[o] = 1), (r[o] += pT(gn - 1, l, o)))
          break
        case 2:
          r[o] += mu(s)
          break
        case 4:
          if (s === 44) {
            ;((r[++o] = or() === 58 ? '&\f' : ''), (l[o] = r[o].length))
            break
          }
        default:
          r[o] += qu(s)
      }
    while ((s = Cn()))
    return r
  },
  mT = function (r, l) {
    return mv(hT(hv(r), l))
  },
  i0 = new WeakMap(),
  gT = function (r) {
    if (!(r.type !== 'rule' || !r.parent || r.length < 1)) {
      for (var l = r.value, o = r.parent, s = r.column === o.column && r.line === o.line; o.type !== 'rule';)
        if (((o = o.parent), !o)) return
      if (!(r.props.length === 1 && l.charCodeAt(0) !== 58 && !i0.get(o)) && !s) {
        i0.set(r, !0)
        for (var u = [], f = mT(l, u), p = o.props, h = 0, m = 0; h < f.length; h++)
          for (var g = 0; g < p.length; g++, m++) r.props[m] = u[h] ? f[h].replace(/&\f/g, p[g]) : p[g] + ' ' + f[h]
      }
    }
  },
  yT = function (r) {
    if (r.type === 'decl') {
      var l = r.value
      l.charCodeAt(0) === 108 && l.charCodeAt(2) === 98 && ((r.return = ''), (r.value = ''))
    }
  }
function yv(t, r) {
  switch (JE(t, r)) {
    case 5103:
      return Ie + 'print-' + t + t
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return Ie + t + t
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return Ie + t + Cu + t + Jt + t + t
    case 6828:
    case 4268:
      return Ie + t + Jt + t + t
    case 6165:
      return Ie + t + Jt + 'flex-' + t + t
    case 5187:
      return Ie + t + Fe(t, /(\w+).+(:[^]+)/, Ie + 'box-$1$2' + Jt + 'flex-$1$2') + t
    case 5443:
      return Ie + t + Jt + 'flex-item-' + Fe(t, /flex-|-self/, '') + t
    case 4675:
      return Ie + t + Jt + 'flex-line-pack' + Fe(t, /align-content|flex-|-self/, '') + t
    case 5548:
      return Ie + t + Jt + Fe(t, 'shrink', 'negative') + t
    case 5292:
      return Ie + t + Jt + Fe(t, 'basis', 'preferred-size') + t
    case 6060:
      return Ie + 'box-' + Fe(t, '-grow', '') + Ie + t + Jt + Fe(t, 'grow', 'positive') + t
    case 4554:
      return Ie + Fe(t, /([^-])(transform)/g, '$1' + Ie + '$2') + t
    case 6187:
      return Fe(Fe(Fe(t, /(zoom-|grab)/, Ie + '$1'), /(image-set)/, Ie + '$1'), t, '') + t
    case 5495:
    case 3959:
      return Fe(t, /(image-set\([^]*)/, Ie + '$1$`$1')
    case 4968:
      return (
        Fe(Fe(t, /(.+:)(flex-)?(.*)/, Ie + 'box-pack:$3' + Jt + 'flex-pack:$3'), /s.+-b[^;]+/, 'justify') + Ie + t + t
      )
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return Fe(t, /(.+)-inline(.+)/, Ie + '$1$2') + t
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (rr(t) - 1 - r > 6)
        switch (Kt(t, r + 1)) {
          case 109:
            if (Kt(t, r + 4) !== 45) break
          case 102:
            return Fe(t, /(.+:)(.+)-([^]+)/, '$1' + Ie + '$2-$3$1' + Cu + (Kt(t, r + 3) == 108 ? '$3' : '$2-$3')) + t
          case 115:
            return ~Zd(t, 'stretch') ? yv(Fe(t, 'stretch', 'fill-available'), r) + t : t
        }
      break
    case 4949:
      if (Kt(t, r + 1) !== 115) break
    case 6444:
      switch (Kt(t, rr(t) - 3 - (~Zd(t, '!important') && 10))) {
        case 107:
          return Fe(t, ':', ':' + Ie) + t
        case 101:
          return (
            Fe(
              t,
              /(.+:)([^;!]+)(;|!.+)?/,
              '$1' + Ie + (Kt(t, 14) === 45 ? 'inline-' : '') + 'box$3$1' + Ie + '$2$3$1' + Jt + '$2box$3'
            ) + t
          )
      }
      break
    case 5936:
      switch (Kt(t, r + 11)) {
        case 114:
          return Ie + t + Jt + Fe(t, /[svh]\w+-[tblr]{2}/, 'tb') + t
        case 108:
          return Ie + t + Jt + Fe(t, /[svh]\w+-[tblr]{2}/, 'tb-rl') + t
        case 45:
          return Ie + t + Jt + Fe(t, /[svh]\w+-[tblr]{2}/, 'lr') + t
      }
      return Ie + t + Jt + t + t
  }
  return t
}
var bT = function (r, l, o, s) {
    if (r.length > -1 && !r.return)
      switch (r.type) {
        case Mp:
          r.return = yv(r.value, r.length)
          break
        case fv:
          return Pl([oi(r, { value: Fe(r.value, '@', '@' + Ie) })], s)
        case Op:
          if (r.length)
            return tT(r.props, function (u) {
              switch (eT(u, /(::plac\w+|:read-\w+)/)) {
                case ':read-only':
                case ':read-write':
                  return Pl([oi(r, { props: [Fe(u, /:(read-\w+)/, ':' + Cu + '$1')] })], s)
                case '::placeholder':
                  return Pl(
                    [
                      oi(r, { props: [Fe(u, /:(plac\w+)/, ':' + Ie + 'input-$1')] }),
                      oi(r, { props: [Fe(u, /:(plac\w+)/, ':' + Cu + '$1')] }),
                      oi(r, { props: [Fe(u, /:(plac\w+)/, Jt + 'input-$1')] }),
                    ],
                    s
                  )
              }
              return ''
            })
      }
  },
  vT = [bT],
  ST = function (r) {
    var l = r.key
    if (l === 'css') {
      var o = document.querySelectorAll('style[data-emotion]:not([data-s])')
      Array.prototype.forEach.call(o, function (R) {
        var T = R.getAttribute('data-emotion')
        T.indexOf(' ') !== -1 && (document.head.appendChild(R), R.setAttribute('data-s', ''))
      })
    }
    var s = r.stylisPlugins || vT,
      u = {},
      f,
      p = []
    ;((f = r.container || document.head),
      Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="' + l + ' "]'), function (R) {
        for (var T = R.getAttribute('data-emotion').split(' '), A = 1; A < T.length; A++) u[T[A]] = !0
        p.push(R)
      }))
    var h,
      m = [gT, yT]
    {
      var g,
        b = [
          cT,
          dT(function (R) {
            g.insert(R)
          }),
        ],
        C = fT(m.concat(s, b)),
        v = function (T) {
          return Pl(sT(T), C)
        }
      h = function (T, A, O, M) {
        ;((g = O), v(T ? T + '{' + A.styles + '}' : A.styles), M && (w.inserted[A.name] = !0))
      }
    }
    var w = {
      key: l,
      sheet: new KE({
        key: l,
        container: f,
        nonce: r.nonce,
        speedy: r.speedy,
        prepend: r.prepend,
        insertionPoint: r.insertionPoint,
      }),
      nonce: r.nonce,
      inserted: u,
      registered: {},
      insert: h,
    }
    return (w.sheet.hydrate(p), w)
  },
  Dd = { exports: {} },
  Ke = {}
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var s0
function xT() {
  if (s0) return Ke
  s0 = 1
  var t = typeof Symbol == 'function' && Symbol.for,
    r = t ? Symbol.for('react.element') : 60103,
    l = t ? Symbol.for('react.portal') : 60106,
    o = t ? Symbol.for('react.fragment') : 60107,
    s = t ? Symbol.for('react.strict_mode') : 60108,
    u = t ? Symbol.for('react.profiler') : 60114,
    f = t ? Symbol.for('react.provider') : 60109,
    p = t ? Symbol.for('react.context') : 60110,
    h = t ? Symbol.for('react.async_mode') : 60111,
    m = t ? Symbol.for('react.concurrent_mode') : 60111,
    g = t ? Symbol.for('react.forward_ref') : 60112,
    b = t ? Symbol.for('react.suspense') : 60113,
    C = t ? Symbol.for('react.suspense_list') : 60120,
    v = t ? Symbol.for('react.memo') : 60115,
    w = t ? Symbol.for('react.lazy') : 60116,
    R = t ? Symbol.for('react.block') : 60121,
    T = t ? Symbol.for('react.fundamental') : 60117,
    A = t ? Symbol.for('react.responder') : 60118,
    O = t ? Symbol.for('react.scope') : 60119
  function M(_) {
    if (typeof _ == 'object' && _ !== null) {
      var k = _.$$typeof
      switch (k) {
        case r:
          switch (((_ = _.type), _)) {
            case h:
            case m:
            case o:
            case u:
            case s:
            case b:
              return _
            default:
              switch (((_ = _ && _.$$typeof), _)) {
                case p:
                case g:
                case w:
                case v:
                case f:
                  return _
                default:
                  return k
              }
          }
        case l:
          return k
      }
    }
  }
  function z(_) {
    return M(_) === m
  }
  return (
    (Ke.AsyncMode = h),
    (Ke.ConcurrentMode = m),
    (Ke.ContextConsumer = p),
    (Ke.ContextProvider = f),
    (Ke.Element = r),
    (Ke.ForwardRef = g),
    (Ke.Fragment = o),
    (Ke.Lazy = w),
    (Ke.Memo = v),
    (Ke.Portal = l),
    (Ke.Profiler = u),
    (Ke.StrictMode = s),
    (Ke.Suspense = b),
    (Ke.isAsyncMode = function (_) {
      return z(_) || M(_) === h
    }),
    (Ke.isConcurrentMode = z),
    (Ke.isContextConsumer = function (_) {
      return M(_) === p
    }),
    (Ke.isContextProvider = function (_) {
      return M(_) === f
    }),
    (Ke.isElement = function (_) {
      return typeof _ == 'object' && _ !== null && _.$$typeof === r
    }),
    (Ke.isForwardRef = function (_) {
      return M(_) === g
    }),
    (Ke.isFragment = function (_) {
      return M(_) === o
    }),
    (Ke.isLazy = function (_) {
      return M(_) === w
    }),
    (Ke.isMemo = function (_) {
      return M(_) === v
    }),
    (Ke.isPortal = function (_) {
      return M(_) === l
    }),
    (Ke.isProfiler = function (_) {
      return M(_) === u
    }),
    (Ke.isStrictMode = function (_) {
      return M(_) === s
    }),
    (Ke.isSuspense = function (_) {
      return M(_) === b
    }),
    (Ke.isValidElementType = function (_) {
      return (
        typeof _ == 'string' ||
        typeof _ == 'function' ||
        _ === o ||
        _ === m ||
        _ === u ||
        _ === s ||
        _ === b ||
        _ === C ||
        (typeof _ == 'object' &&
          _ !== null &&
          (_.$$typeof === w ||
            _.$$typeof === v ||
            _.$$typeof === f ||
            _.$$typeof === p ||
            _.$$typeof === g ||
            _.$$typeof === T ||
            _.$$typeof === A ||
            _.$$typeof === O ||
            _.$$typeof === R))
      )
    }),
    (Ke.typeOf = M),
    Ke
  )
}
var u0
function RT() {
  return (u0 || ((u0 = 1), (Dd.exports = xT())), Dd.exports)
}
var Bd, c0
function ET() {
  if (c0) return Bd
  c0 = 1
  var t = RT(),
    r = {
      childContextTypes: !0,
      contextType: !0,
      contextTypes: !0,
      defaultProps: !0,
      displayName: !0,
      getDefaultProps: !0,
      getDerivedStateFromError: !0,
      getDerivedStateFromProps: !0,
      mixins: !0,
      propTypes: !0,
      type: !0,
    },
    l = { name: !0, length: !0, prototype: !0, caller: !0, callee: !0, arguments: !0, arity: !0 },
    o = { $$typeof: !0, render: !0, defaultProps: !0, displayName: !0, propTypes: !0 },
    s = { $$typeof: !0, compare: !0, defaultProps: !0, displayName: !0, propTypes: !0, type: !0 },
    u = {}
  ;((u[t.ForwardRef] = o), (u[t.Memo] = s))
  function f(w) {
    return t.isMemo(w) ? s : u[w.$$typeof] || r
  }
  var p = Object.defineProperty,
    h = Object.getOwnPropertyNames,
    m = Object.getOwnPropertySymbols,
    g = Object.getOwnPropertyDescriptor,
    b = Object.getPrototypeOf,
    C = Object.prototype
  function v(w, R, T) {
    if (typeof R != 'string') {
      if (C) {
        var A = b(R)
        A && A !== C && v(w, A, T)
      }
      var O = h(R)
      m && (O = O.concat(m(R)))
      for (var M = f(w), z = f(R), _ = 0; _ < O.length; ++_) {
        var k = O[_]
        if (!l[k] && !(T && T[k]) && !(z && z[k]) && !(M && M[k])) {
          var V = g(R, k)
          try {
            p(w, k, V)
          } catch {}
        }
      }
    }
    return w
  }
  return ((Bd = v), Bd)
}
ET()
var TT = !0
function bv(t, r, l) {
  var o = ''
  return (
    l.split(' ').forEach(function (s) {
      t[s] !== void 0 ? r.push(t[s] + ';') : s && (o += s + ' ')
    }),
    o
  )
}
var Np = function (r, l, o) {
    var s = r.key + '-' + l.name
    ;(o === !1 || TT === !1) && r.registered[s] === void 0 && (r.registered[s] = l.styles)
  },
  Dp = function (r, l, o) {
    Np(r, l, o)
    var s = r.key + '-' + l.name
    if (r.inserted[l.name] === void 0) {
      var u = l
      do (r.insert(l === u ? '.' + s : '', u, r.sheet, !0), (u = u.next))
      while (u !== void 0)
    }
  }
function CT(t) {
  for (var r = 0, l, o = 0, s = t.length; s >= 4; ++o, s -= 4)
    ((l =
      (t.charCodeAt(o) & 255) |
      ((t.charCodeAt(++o) & 255) << 8) |
      ((t.charCodeAt(++o) & 255) << 16) |
      ((t.charCodeAt(++o) & 255) << 24)),
      (l = (l & 65535) * 1540483477 + (((l >>> 16) * 59797) << 16)),
      (l ^= l >>> 24),
      (r =
        ((l & 65535) * 1540483477 + (((l >>> 16) * 59797) << 16)) ^
        ((r & 65535) * 1540483477 + (((r >>> 16) * 59797) << 16))))
  switch (s) {
    case 3:
      r ^= (t.charCodeAt(o + 2) & 255) << 16
    case 2:
      r ^= (t.charCodeAt(o + 1) & 255) << 8
    case 1:
      ;((r ^= t.charCodeAt(o) & 255), (r = (r & 65535) * 1540483477 + (((r >>> 16) * 59797) << 16)))
  }
  return (
    (r ^= r >>> 13),
    (r = (r & 65535) * 1540483477 + (((r >>> 16) * 59797) << 16)),
    ((r ^ (r >>> 15)) >>> 0).toString(36)
  )
}
var wT = {
    animationIterationCount: 1,
    aspectRatio: 1,
    borderImageOutset: 1,
    borderImageSlice: 1,
    borderImageWidth: 1,
    boxFlex: 1,
    boxFlexGroup: 1,
    boxOrdinalGroup: 1,
    columnCount: 1,
    columns: 1,
    flex: 1,
    flexGrow: 1,
    flexPositive: 1,
    flexShrink: 1,
    flexNegative: 1,
    flexOrder: 1,
    gridRow: 1,
    gridRowEnd: 1,
    gridRowSpan: 1,
    gridRowStart: 1,
    gridColumn: 1,
    gridColumnEnd: 1,
    gridColumnSpan: 1,
    gridColumnStart: 1,
    msGridRow: 1,
    msGridRowSpan: 1,
    msGridColumn: 1,
    msGridColumnSpan: 1,
    fontWeight: 1,
    lineHeight: 1,
    opacity: 1,
    order: 1,
    orphans: 1,
    scale: 1,
    tabSize: 1,
    widows: 1,
    zIndex: 1,
    zoom: 1,
    WebkitLineClamp: 1,
    fillOpacity: 1,
    floodOpacity: 1,
    stopOpacity: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1,
    strokeMiterlimit: 1,
    strokeOpacity: 1,
    strokeWidth: 1,
  },
  AT = /[A-Z]|^ms/g,
  OT = /_EMO_([^_]+?)_([^]*?)_EMO_/g,
  vv = function (r) {
    return r.charCodeAt(1) === 45
  },
  f0 = function (r) {
    return r != null && typeof r != 'boolean'
  },
  zd = gv(function (t) {
    return vv(t) ? t : t.replace(AT, '-$&').toLowerCase()
  }),
  d0 = function (r, l) {
    switch (r) {
      case 'animation':
      case 'animationName':
        if (typeof l == 'string')
          return l.replace(OT, function (o, s, u) {
            return ((ar = { name: s, styles: u, next: ar }), s)
          })
    }
    return wT[r] !== 1 && !vv(r) && typeof l == 'number' && l !== 0 ? l + 'px' : l
  }
function Ei(t, r, l) {
  if (l == null) return ''
  var o = l
  if (o.__emotion_styles !== void 0) return o
  switch (typeof l) {
    case 'boolean':
      return ''
    case 'object': {
      var s = l
      if (s.anim === 1) return ((ar = { name: s.name, styles: s.styles, next: ar }), s.name)
      var u = l
      if (u.styles !== void 0) {
        var f = u.next
        if (f !== void 0) for (; f !== void 0;) ((ar = { name: f.name, styles: f.styles, next: ar }), (f = f.next))
        var p = u.styles + ';'
        return p
      }
      return MT(t, r, l)
    }
    case 'function': {
      if (t !== void 0) {
        var h = ar,
          m = l(t)
        return ((ar = h), Ei(t, r, m))
      }
      break
    }
  }
  var g = l
  if (r == null) return g
  var b = r[g]
  return b !== void 0 ? b : g
}
function MT(t, r, l) {
  var o = ''
  if (Array.isArray(l)) for (var s = 0; s < l.length; s++) o += Ei(t, r, l[s]) + ';'
  else
    for (var u in l) {
      var f = l[u]
      if (typeof f != 'object') {
        var p = f
        r != null && r[p] !== void 0 ? (o += u + '{' + r[p] + '}') : f0(p) && (o += zd(u) + ':' + d0(u, p) + ';')
      } else if (Array.isArray(f) && typeof f[0] == 'string' && (r == null || r[f[0]] === void 0))
        for (var h = 0; h < f.length; h++) f0(f[h]) && (o += zd(u) + ':' + d0(u, f[h]) + ';')
      else {
        var m = Ei(t, r, f)
        switch (u) {
          case 'animation':
          case 'animationName': {
            o += zd(u) + ':' + m + ';'
            break
          }
          default:
            o += u + '{' + m + '}'
        }
      }
    }
  return o
}
var p0 = /label:\s*([^\s;{]+)\s*(;|$)/g,
  ar
function Bi(t, r, l) {
  if (t.length === 1 && typeof t[0] == 'object' && t[0] !== null && t[0].styles !== void 0) return t[0]
  var o = !0,
    s = ''
  ar = void 0
  var u = t[0]
  if (u == null || u.raw === void 0) ((o = !1), (s += Ei(l, r, u)))
  else {
    var f = u
    s += f[0]
  }
  for (var p = 1; p < t.length; p++)
    if (((s += Ei(l, r, t[p])), o)) {
      var h = u
      s += h[p]
    }
  p0.lastIndex = 0
  for (var m = '', g; (g = p0.exec(s)) !== null;) m += '-' + g[1]
  var b = CT(s) + m
  return { name: b, styles: s, next: ar }
}
var _T = function (r) {
    return r()
  },
  Sv = Eu.useInsertionEffect ? Eu.useInsertionEffect : !1,
  xv = Sv || _T,
  h0 = Sv || S.useLayoutEffect,
  Rv = S.createContext(typeof HTMLElement < 'u' ? ST({ key: 'css' }) : null)
Rv.Provider
var Bp = function (r) {
    return S.forwardRef(function (l, o) {
      var s = S.useContext(Rv)
      return r(l, s, o)
    })
  },
  Yu = S.createContext({}),
  zp = {}.hasOwnProperty,
  Jd = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__',
  NT = function (r, l) {
    var o = {}
    for (var s in l) zp.call(l, s) && (o[s] = l[s])
    return ((o[Jd] = r), o)
  },
  DT = function (r) {
    var l = r.cache,
      o = r.serialized,
      s = r.isStringTag
    return (
      Np(l, o, s),
      xv(function () {
        return Dp(l, o, s)
      }),
      null
    )
  },
  BT = Bp(function (t, r, l) {
    var o = t.css
    typeof o == 'string' && r.registered[o] !== void 0 && (o = r.registered[o])
    var s = t[Jd],
      u = [o],
      f = ''
    typeof t.className == 'string'
      ? (f = bv(r.registered, u, t.className))
      : t.className != null && (f = t.className + ' ')
    var p = Bi(u, void 0, S.useContext(Yu))
    f += r.key + '-' + p.name
    var h = {}
    for (var m in t) zp.call(t, m) && m !== 'css' && m !== Jd && (h[m] = t[m])
    return (
      (h.className = f),
      l && (h.ref = l),
      S.createElement(
        S.Fragment,
        null,
        S.createElement(DT, { cache: r, serialized: p, isStringTag: typeof s == 'string' }),
        S.createElement(s, h)
      )
    )
  }),
  zT = BT,
  m0 = function (r, l) {
    var o = arguments
    if (l == null || !zp.call(l, 'css')) return S.createElement.apply(void 0, o)
    var s = o.length,
      u = new Array(s)
    ;((u[0] = zT), (u[1] = NT(r, l)))
    for (var f = 2; f < s; f++) u[f] = o[f]
    return S.createElement.apply(null, u)
  }
;(function (t) {
  var r
  r || (r = t.JSX || (t.JSX = {}))
})(m0 || (m0 = {}))
var UT = Bp(function (t, r) {
  var l = t.styles,
    o = Bi([l], void 0, S.useContext(Yu)),
    s = S.useRef()
  return (
    h0(
      function () {
        var u = r.key + '-global',
          f = new r.sheet.constructor({
            key: u,
            nonce: r.sheet.nonce,
            container: r.sheet.container,
            speedy: r.sheet.isSpeedy,
          }),
          p = !1,
          h = document.querySelector('style[data-emotion="' + u + ' ' + o.name + '"]')
        return (
          r.sheet.tags.length && (f.before = r.sheet.tags[0]),
          h !== null && ((p = !0), h.setAttribute('data-emotion', u), f.hydrate([h])),
          (s.current = [f, p]),
          function () {
            f.flush()
          }
        )
      },
      [r]
    ),
    h0(
      function () {
        var u = s.current,
          f = u[0],
          p = u[1]
        if (p) {
          u[1] = !1
          return
        }
        if ((o.next !== void 0 && Dp(r, o.next, !0), f.tags.length)) {
          var h = f.tags[f.tags.length - 1].nextElementSibling
          ;((f.before = h), f.flush())
        }
        r.insert('', o, f, !1)
      },
      [r, o.name]
    ),
    null
  )
})
function Ti() {
  for (var t = arguments.length, r = new Array(t), l = 0; l < t; l++) r[l] = arguments[l]
  return Bi(r)
}
function zi() {
  var t = Ti.apply(void 0, arguments),
    r = 'animation-' + t.name
  return {
    name: r,
    styles: '@keyframes ' + r + '{' + t.styles + '}',
    anim: 1,
    toString: function () {
      return '_EMO_' + this.name + '_' + this.styles + '_EMO_'
    },
  }
}
var kT =
    /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|popover|popoverTarget|popoverTargetAction|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,
  LT = gv(function (t) {
    return kT.test(t) || (t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && t.charCodeAt(2) < 91)
  }),
  jT = LT,
  $T = function (r) {
    return r !== 'theme'
  },
  g0 = function (r) {
    return typeof r == 'string' && r.charCodeAt(0) > 96 ? jT : $T
  },
  y0 = function (r, l, o) {
    var s
    if (l) {
      var u = l.shouldForwardProp
      s =
        r.__emotion_forwardProp && u
          ? function (f) {
              return r.__emotion_forwardProp(f) && u(f)
            }
          : u
    }
    return (typeof s != 'function' && o && (s = r.__emotion_forwardProp), s)
  },
  HT = function (r) {
    var l = r.cache,
      o = r.serialized,
      s = r.isStringTag
    return (
      Np(l, o, s),
      xv(function () {
        return Dp(l, o, s)
      }),
      null
    )
  },
  PT = function t(r, l) {
    var o = r.__emotion_real === r,
      s = (o && r.__emotion_base) || r,
      u,
      f
    l !== void 0 && ((u = l.label), (f = l.target))
    var p = y0(r, l, o),
      h = p || g0(s),
      m = !h('as')
    return function () {
      var g = arguments,
        b = o && r.__emotion_styles !== void 0 ? r.__emotion_styles.slice(0) : []
      if ((u !== void 0 && b.push('label:' + u + ';'), g[0] == null || g[0].raw === void 0)) b.push.apply(b, g)
      else {
        var C = g[0]
        b.push(C[0])
        for (var v = g.length, w = 1; w < v; w++) b.push(g[w], C[w])
      }
      var R = Bp(function (T, A, O) {
        var M = (m && T.as) || s,
          z = '',
          _ = [],
          k = T
        if (T.theme == null) {
          k = {}
          for (var V in T) k[V] = T[V]
          k.theme = S.useContext(Yu)
        }
        typeof T.className == 'string'
          ? (z = bv(A.registered, _, T.className))
          : T.className != null && (z = T.className + ' ')
        var Q = Bi(b.concat(_), A.registered, k)
        ;((z += A.key + '-' + Q.name), f !== void 0 && (z += ' ' + f))
        var oe = m && p === void 0 ? g0(M) : h,
          ce = {}
        for (var Z in T) (m && Z === 'as') || (oe(Z) && (ce[Z] = T[Z]))
        return (
          (ce.className = z),
          O && (ce.ref = O),
          S.createElement(
            S.Fragment,
            null,
            S.createElement(HT, { cache: A, serialized: Q, isStringTag: typeof M == 'string' }),
            S.createElement(M, ce)
          )
        )
      })
      return (
        (R.displayName =
          u !== void 0 ? u : 'Styled(' + (typeof s == 'string' ? s : s.displayName || s.name || 'Component') + ')'),
        (R.defaultProps = r.defaultProps),
        (R.__emotion_real = R),
        (R.__emotion_base = s),
        (R.__emotion_styles = b),
        (R.__emotion_forwardProp = p),
        Object.defineProperty(R, 'toString', {
          value: function () {
            return '.' + f
          },
        }),
        (R.withComponent = function (T, A) {
          var O = t(T, Qd({}, l, A, { shouldForwardProp: y0(R, A, !0) }))
          return O.apply(void 0, b)
        }),
        R
      )
    }
  },
  qT = [
    'a',
    'abbr',
    'address',
    'area',
    'article',
    'aside',
    'audio',
    'b',
    'base',
    'bdi',
    'bdo',
    'big',
    'blockquote',
    'body',
    'br',
    'button',
    'canvas',
    'caption',
    'cite',
    'code',
    'col',
    'colgroup',
    'data',
    'datalist',
    'dd',
    'del',
    'details',
    'dfn',
    'dialog',
    'div',
    'dl',
    'dt',
    'em',
    'embed',
    'fieldset',
    'figcaption',
    'figure',
    'footer',
    'form',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'head',
    'header',
    'hgroup',
    'hr',
    'html',
    'i',
    'iframe',
    'img',
    'input',
    'ins',
    'kbd',
    'keygen',
    'label',
    'legend',
    'li',
    'link',
    'main',
    'map',
    'mark',
    'marquee',
    'menu',
    'menuitem',
    'meta',
    'meter',
    'nav',
    'noscript',
    'object',
    'ol',
    'optgroup',
    'option',
    'output',
    'p',
    'param',
    'picture',
    'pre',
    'progress',
    'q',
    'rp',
    'rt',
    'ruby',
    's',
    'samp',
    'script',
    'section',
    'select',
    'small',
    'source',
    'span',
    'strong',
    'style',
    'sub',
    'summary',
    'sup',
    'table',
    'tbody',
    'td',
    'textarea',
    'tfoot',
    'th',
    'thead',
    'time',
    'title',
    'tr',
    'track',
    'u',
    'ul',
    'var',
    'video',
    'wbr',
    'circle',
    'clipPath',
    'defs',
    'ellipse',
    'foreignObject',
    'g',
    'image',
    'line',
    'linearGradient',
    'mask',
    'path',
    'pattern',
    'polygon',
    'polyline',
    'radialGradient',
    'rect',
    'stop',
    'svg',
    'text',
    'tspan',
  ],
  ep = PT.bind(null)
qT.forEach(function (t) {
  ep[t] = ep(t)
})
function IT(t) {
  return t == null || Object.keys(t).length === 0
}
function FT(t) {
  const { styles: r, defaultTheme: l = {} } = t,
    o = typeof r == 'function' ? s => r(IT(s) ? l : s) : r
  return q.jsx(UT, { styles: o })
}
function Ev(t, r) {
  return ep(t, r)
}
function YT(t, r) {
  Array.isArray(t.__emotion_styles) && (t.__emotion_styles = r(t.__emotion_styles))
}
const b0 = []
function ma(t) {
  return ((b0[0] = t), Bi(b0))
}
var Ud = { exports: {} },
  lt = {}
/**
 * @license React
 * react-is.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var v0
function VT() {
  if (v0) return lt
  v0 = 1
  var t = Symbol.for('react.transitional.element'),
    r = Symbol.for('react.portal'),
    l = Symbol.for('react.fragment'),
    o = Symbol.for('react.strict_mode'),
    s = Symbol.for('react.profiler'),
    u = Symbol.for('react.consumer'),
    f = Symbol.for('react.context'),
    p = Symbol.for('react.forward_ref'),
    h = Symbol.for('react.suspense'),
    m = Symbol.for('react.suspense_list'),
    g = Symbol.for('react.memo'),
    b = Symbol.for('react.lazy'),
    C = Symbol.for('react.view_transition'),
    v = Symbol.for('react.client.reference')
  function w(R) {
    if (typeof R == 'object' && R !== null) {
      var T = R.$$typeof
      switch (T) {
        case t:
          switch (((R = R.type), R)) {
            case l:
            case s:
            case o:
            case h:
            case m:
            case C:
              return R
            default:
              switch (((R = R && R.$$typeof), R)) {
                case f:
                case p:
                case b:
                case g:
                  return R
                case u:
                  return R
                default:
                  return T
              }
          }
        case r:
          return T
      }
    }
  }
  return (
    (lt.ContextConsumer = u),
    (lt.ContextProvider = f),
    (lt.Element = t),
    (lt.ForwardRef = p),
    (lt.Fragment = l),
    (lt.Lazy = b),
    (lt.Memo = g),
    (lt.Portal = r),
    (lt.Profiler = s),
    (lt.StrictMode = o),
    (lt.Suspense = h),
    (lt.SuspenseList = m),
    (lt.isContextConsumer = function (R) {
      return w(R) === u
    }),
    (lt.isContextProvider = function (R) {
      return w(R) === f
    }),
    (lt.isElement = function (R) {
      return typeof R == 'object' && R !== null && R.$$typeof === t
    }),
    (lt.isForwardRef = function (R) {
      return w(R) === p
    }),
    (lt.isFragment = function (R) {
      return w(R) === l
    }),
    (lt.isLazy = function (R) {
      return w(R) === b
    }),
    (lt.isMemo = function (R) {
      return w(R) === g
    }),
    (lt.isPortal = function (R) {
      return w(R) === r
    }),
    (lt.isProfiler = function (R) {
      return w(R) === s
    }),
    (lt.isStrictMode = function (R) {
      return w(R) === o
    }),
    (lt.isSuspense = function (R) {
      return w(R) === h
    }),
    (lt.isSuspenseList = function (R) {
      return w(R) === m
    }),
    (lt.isValidElementType = function (R) {
      return (
        typeof R == 'string' ||
        typeof R == 'function' ||
        R === l ||
        R === s ||
        R === o ||
        R === h ||
        R === m ||
        (typeof R == 'object' &&
          R !== null &&
          (R.$$typeof === b ||
            R.$$typeof === g ||
            R.$$typeof === f ||
            R.$$typeof === u ||
            R.$$typeof === p ||
            R.$$typeof === v ||
            R.getModuleId !== void 0))
      )
    }),
    (lt.typeOf = w),
    lt
  )
}
var S0
function GT() {
  return (S0 || ((S0 = 1), (Ud.exports = VT())), Ud.exports)
}
var Tv = GT()
function Br(t) {
  if (typeof t != 'object' || t === null) return !1
  const r = Object.getPrototypeOf(t)
  return (
    (r === null || r === Object.prototype || Object.getPrototypeOf(r) === null) &&
    !(Symbol.toStringTag in t) &&
    !(Symbol.iterator in t)
  )
}
function Cv(t) {
  if (S.isValidElement(t) || Tv.isValidElementType(t) || !Br(t)) return t
  const r = {}
  return (
    Object.keys(t).forEach(l => {
      r[l] = Cv(t[l])
    }),
    r
  )
}
function ln(t, r, l = { clone: !0 }) {
  const o = l.clone ? { ...t } : t
  return (
    Br(t) &&
      Br(r) &&
      Object.keys(r).forEach(s => {
        S.isValidElement(r[s]) || Tv.isValidElementType(r[s])
          ? (o[s] = r[s])
          : Br(r[s]) && Object.prototype.hasOwnProperty.call(t, s) && Br(t[s])
            ? (o[s] = ln(t[s], r[s], l))
            : l.clone
              ? (o[s] = Br(r[s]) ? Cv(r[s]) : r[s])
              : (o[s] = r[s])
      }),
    o
  )
}
const KT = t => {
  const r = Object.keys(t).map(l => ({ key: l, val: t[l] })) || []
  return (r.sort((l, o) => l.val - o.val), r.reduce((l, o) => ({ ...l, [o.key]: o.val }), {}))
}
function wv(t) {
  const { values: r = { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 }, unit: l = 'px', step: o = 5, ...s } = t,
    u = KT(r),
    f = Object.keys(u)
  function p(v) {
    return `@media (min-width:${typeof r[v] == 'number' ? r[v] : v}${l})`
  }
  function h(v) {
    return `@media (max-width:${(typeof r[v] == 'number' ? r[v] : v) - o / 100}${l})`
  }
  function m(v, w) {
    const R = f.indexOf(w)
    return `@media (min-width:${typeof r[v] == 'number' ? r[v] : v}${l}) and (max-width:${(R !== -1 && typeof r[f[R]] == 'number' ? r[f[R]] : w) - o / 100}${l})`
  }
  function g(v) {
    return f.indexOf(v) + 1 < f.length ? m(v, f[f.indexOf(v) + 1]) : p(v)
  }
  function b(v) {
    const w = f.indexOf(v)
    return w === 0
      ? p(f[1])
      : w === f.length - 1
        ? h(f[w])
        : m(v, f[f.indexOf(v) + 1]).replace('@media', '@media not all and')
  }
  const C = []
  for (let v = 0; v < f.length; v += 1) C.push(p(f[v]))
  return { keys: f, values: u, up: p, down: h, between: m, only: g, not: b, unit: l, internal_mediaKeys: C, ...s }
}
const x0 = /min-width:\s*([0-9.]+)/
function R0(t, r) {
  if (!t.containerQueries || !XT(r)) return r
  const l = []
  for (const s in r) s.startsWith('@container') && l.push(s)
  l.sort((s, u) => {
    var f, p
    return +(((f = s.match(x0)) == null ? void 0 : f[1]) || 0) - +(((p = u.match(x0)) == null ? void 0 : p[1]) || 0)
  })
  const o = r
  for (let s = 0; s < l.length; s += 1) {
    const u = l[s],
      f = o[u]
    ;(delete o[u], (o[u] = f))
  }
  return o
}
function XT(t) {
  for (const r in t) if (r.startsWith('@container')) return !0
  return !1
}
function Av(t, r) {
  return r === '@' || (r.startsWith('@') && (t.some(l => r.startsWith(`@${l}`)) || !!r.match(/^@\d/)))
}
function QT(t, r) {
  const l = r.match(/^@([^/]+)?\/?(.+)?$/)
  if (!l) return null
  const [, o, s] = l,
    u = Number.isNaN(+o) ? o || 0 : +o
  return t.containerQueries(s).up(u)
}
function ZT(t) {
  const r = (u, f) => u.replace('@media', f ? `@container ${f}` : '@container')
  function l(u, f) {
    ;((u.up = (...p) => r(t.breakpoints.up(...p), f)),
      (u.down = (...p) => r(t.breakpoints.down(...p), f)),
      (u.between = (...p) => r(t.breakpoints.between(...p), f)),
      (u.only = (...p) => r(t.breakpoints.only(...p), f)),
      (u.not = (...p) => {
        const h = r(t.breakpoints.not(...p), f)
        return h.includes('not all and')
          ? h
              .replace('not all and ', '')
              .replace('min-width:', 'width<')
              .replace('max-width:', 'width>')
              .replace('and', 'or')
          : h
      }))
  }
  const o = {},
    s = u => (l(o, u), o)
  return (l(s), { ...t, containerQueries: s })
}
const WT = { borderRadius: 4 }
function Ov(t) {
  if (t == null) return !0
  for (const r in t) return !1
  return !0
}
function ql(t, r) {
  const l = Array.isArray(r),
    o = Array.isArray(t)
  return rC(r) ? r : aC(t) ? Yl(r) : l && o ? tC(t, r) : l !== o ? Yl(r) : lC(t, r)
}
function JT(t) {
  let r = 0
  const l = t.length,
    o = new Array(l)
  for (r = 0; r < l; r += 1) o[r] = Yl(t[r])
  return o
}
function eC(t) {
  const r = {}
  for (const l in t) l === '__proto__' || l === 'constructor' || l === 'prototype' || (r[l] = Yl(t[l]))
  return r
}
function tC(t, r) {
  const l = t.length
  for (let o = 0; o < r.length; o += 1) t[l + o] = Yl(r[o])
  return t
}
function nC(t) {
  return typeof t == 'object' && t !== null && !(t instanceof RegExp) && !(t instanceof Date)
}
function rC(t) {
  return typeof t != 'object' || t === null
}
function aC(t) {
  return typeof t != 'object' || t === null || t instanceof RegExp || t instanceof Date
}
function Yl(t) {
  return nC(t) ? (Array.isArray(t) ? JT(t) : eC(t)) : t
}
function lC(t, r) {
  for (const l in r)
    l === '__proto__' ||
      l === 'constructor' ||
      l === 'prototype' ||
      (l in t ? (t[l] = ql(t[l], r[l])) : (t[l] = Yl(r[l])))
  return t
}
const oC = {},
  Vu = { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  wu = wv({ values: Vu }),
  iC = {
    containerQueries: t => ({
      up: r => {
        let l = typeof r == 'number' ? r : Vu[r] || r
        return (
          typeof l == 'number' && (l = `${l}px`),
          t ? `@container ${t} (min-width:${l})` : `@container (min-width:${l})`
        )
      },
    }),
  }
function eo(t, r, l) {
  const o = {}
  return Gu(o, t.theme, r, (s, u, f) => {
    const p = l(u, f)
    s ? (o[s] = p) : ql(o, p)
  })
}
function Gu(t, r, l, o) {
  if ((r ?? (r = oC), Array.isArray(l))) {
    const s = r.breakpoints ?? wu
    for (let u = 0; u < l.length; u += 1) kd(t, s.up(s.keys[u]), l[u], void 0, o)
    return t
  }
  if (typeof l == 'object') {
    const s = r.breakpoints ?? wu,
      u = s.values ?? Vu
    for (const f in l)
      if (Av(s.keys, f)) {
        const p = QT(r.containerQueries ? r : iC, f)
        p && kd(t, p, l[f], f, o)
      } else if (f in u) {
        const p = s.up(f)
        kd(t, p, l[f], f, o)
      } else {
        const p = f
        t[p] = l[p]
      }
    return t
  }
  return (o(void 0, l), t)
}
function kd(t, r, l, o, s) {
  ;(t[r] ?? (t[r] = {}), s(r, l, o))
}
function sC(t = wu) {
  const { internal_mediaKeys: r } = t,
    l = {}
  for (let o = 0; o < r.length; o += 1) l[r[o]] = {}
  return l
}
function E0(t, r) {
  const l = t.internal_mediaKeys
  for (let o = 0; o < l.length; o += 1) {
    const s = l[o]
    Ov(r[s]) && delete r[s]
  }
  return r
}
function uC(t, r) {
  if (Array.isArray(r)) return !0
  if (typeof r == 'object' && r !== null) {
    for (let o = 0; o < t.keys.length; o += 1) if (t.keys[o] in r) return !0
    const l = Object.keys(r)
    for (let o = 0; o < l.length; o += 1) if (Av(t.keys, l[o])) return !0
  }
  return !1
}
function Oe(t) {
  if (typeof t != 'string') throw new Error(Lr(7))
  return t.charAt(0).toUpperCase() + t.slice(1)
}
function Mv(t, r, l, o) {
  let s
  return (
    typeof t == 'function'
      ? (s = t(l))
      : Array.isArray(t)
        ? (s = t[l] || l)
        : typeof l == 'string'
          ? (s = lr(t, l, !0, o) || l)
          : (s = l),
    r && (s = r(s, l, t)),
    s
  )
}
function lr(t, r, l = !0, o = void 0) {
  if (!t || !r) return null
  const s = r.split('.')
  if (t.vars && l) {
    const u = T0(t.vars, s, o)
    if (u != null) return u
  }
  return T0(t, s, o)
}
function T0(t, r, l = void 0) {
  let o,
    s = t,
    u = 0
  for (; u < r.length;) {
    if (s == null) return s
    ;((o = s), (s = s[r[u]]), (u += 1))
  }
  if (l && s === void 0) {
    const f = r[r.length - 1],
      p = `${l}${f === 'default' ? '' : Oe(f)}`
    return o == null ? void 0 : o[p]
  }
  return s
}
function Ct(t) {
  const { prop: r, cssProperty: l = t.prop, themeKey: o, transform: s } = t,
    u = f => {
      if (f[r] == null) return null
      const p = f[r],
        h = f.theme,
        m = lr(h, o) || {}
      return eo(f, p, b => {
        const C = Mv(m, s, b, r)
        return l === !1 ? C : { [l]: C }
      })
    }
  return ((u.propTypes = {}), (u.filterProps = [r]), u)
}
const cC = { internal_cache: {} },
  Au = { m: 'margin', p: 'padding' },
  C0 = { t: 'Top', r: 'Right', b: 'Bottom', l: 'Left', x: ['Left', 'Right'], y: ['Top', 'Bottom'] },
  w0 = { marginX: 'mx', marginY: 'my', paddingX: 'px', paddingY: 'py' },
  Ci = {}
for (const t in Au) Ci[t] = [Au[t]]
for (const t in Au)
  for (const r in C0) {
    const l = Au[t],
      o = C0[r],
      s = Array.isArray(o) ? o.map(u => l + u) : [l + o]
    Ci[t + r] = s
  }
for (const t in w0) Ci[t] = Ci[w0[t]]
const Up = new Set([
    'm',
    'mt',
    'mr',
    'mb',
    'ml',
    'mx',
    'my',
    'margin',
    'marginTop',
    'marginRight',
    'marginBottom',
    'marginLeft',
    'marginX',
    'marginY',
    'marginInline',
    'marginInlineStart',
    'marginInlineEnd',
    'marginBlock',
    'marginBlockStart',
    'marginBlockEnd',
  ]),
  kp = new Set([
    'p',
    'pt',
    'pr',
    'pb',
    'pl',
    'px',
    'py',
    'padding',
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',
    'paddingX',
    'paddingY',
    'paddingInline',
    'paddingInlineStart',
    'paddingInlineEnd',
    'paddingBlock',
    'paddingBlockStart',
    'paddingBlockEnd',
  ])
;[...Up, ...kp]
function Ui(t, r, l, o) {
  const s = lr(t, r, !0) ?? l
  return typeof s == 'number' || typeof s == 'string'
    ? u =>
        typeof u == 'string'
          ? u
          : typeof s == 'string'
            ? s.startsWith('var(') && u === 0
              ? 0
              : s.startsWith('var(') && u === 1
                ? s
                : `calc(${u} * ${s})`
            : s * u
    : Array.isArray(s)
      ? u => {
          if (typeof u == 'string') return u
          const f = Math.abs(u),
            p = s[f]
          return u >= 0
            ? p
            : typeof p == 'number'
              ? -p
              : typeof p == 'string' && p.startsWith('var(')
                ? `calc(-1 * ${p})`
                : `-${p}`
        }
      : typeof s == 'function'
        ? s
        : () => {}
}
function Lp(t) {
  return Ui(t, 'spacing', 8)
}
function ki(t, r) {
  return typeof r == 'string' || r == null ? r : t(r)
}
const A0 = ['']
function _v(t, r) {
  var u
  const l = t.theme ?? cC,
    o = ((u = l == null ? void 0 : l.internal_cache) == null ? void 0 : u.unarySpacing) ?? Lp(l),
    s = {}
  for (const f in t) {
    if (!r.has(f)) continue
    const p = Ci[f] ?? ((A0[0] = f), A0),
      h = t[f]
    Gu(s, t.theme, h, (m, g) => {
      const b = m ? s[m] : s
      for (let C = 0; C < p.length; C += 1) b[p[C]] = ki(o, g)
    })
  }
  return s
}
function jp(t) {
  return _v(t, Up)
}
jp.propTypes = {}
jp.filterProps = Up
const Ot = jp
function $p(t) {
  return _v(t, kp)
}
$p.propTypes = {}
$p.filterProps = kp
const Mt = $p
function Nv(t = 8, r = Lp({ spacing: t })) {
  if (t.mui) return t
  const l = (...o) =>
    (o.length === 0 ? [1] : o)
      .map(u => {
        const f = r(u)
        return typeof f == 'number' ? `${f}px` : f
      })
      .join(' ')
  return ((l.mui = !0), l)
}
function Ku(...t) {
  const r = t.reduce(
      (o, s) => (
        s.filterProps.forEach(u => {
          o[u] = s
        }),
        o
      ),
      {}
    ),
    l = o => {
      const s = {}
      for (const u in o) r[u] && ql(s, r[u](o))
      return s
    }
  return ((l.propTypes = {}), (l.filterProps = t.reduce((o, s) => o.concat(s.filterProps), [])), l)
}
function kn(t) {
  return typeof t != 'number' ? t : `${t}px solid`
}
function $n(t, r) {
  return Ct({ prop: t, themeKey: 'borders', transform: r })
}
const fC = $n('border', kn),
  dC = $n('borderTop', kn),
  pC = $n('borderRight', kn),
  hC = $n('borderBottom', kn),
  mC = $n('borderLeft', kn),
  gC = $n('borderColor'),
  yC = $n('borderTopColor'),
  bC = $n('borderRightColor'),
  vC = $n('borderBottomColor'),
  SC = $n('borderLeftColor'),
  xC = $n('outline', kn),
  RC = $n('outlineColor'),
  Xu = t => {
    if (t.borderRadius !== void 0 && t.borderRadius !== null) {
      const r = Ui(t.theme, 'shape.borderRadius', 4),
        l = o => ({ borderRadius: ki(r, o) })
      return eo(t, t.borderRadius, l)
    }
    return null
  }
Xu.propTypes = {}
Xu.filterProps = ['borderRadius']
Ku(fC, dC, pC, hC, mC, gC, yC, bC, vC, SC, Xu, xC, RC)
const Qu = t => {
  if (t.gap !== void 0 && t.gap !== null) {
    const r = Ui(t.theme, 'spacing', 8),
      l = o => ({ gap: ki(r, o) })
    return eo(t, t.gap, l)
  }
  return null
}
Qu.propTypes = {}
Qu.filterProps = ['gap']
const Zu = t => {
  if (t.columnGap !== void 0 && t.columnGap !== null) {
    const r = Ui(t.theme, 'spacing', 8),
      l = o => ({ columnGap: ki(r, o) })
    return eo(t, t.columnGap, l)
  }
  return null
}
Zu.propTypes = {}
Zu.filterProps = ['columnGap']
const Wu = t => {
  if (t.rowGap !== void 0 && t.rowGap !== null) {
    const r = Ui(t.theme, 'spacing', 8),
      l = o => ({ rowGap: ki(r, o) })
    return eo(t, t.rowGap, l)
  }
  return null
}
Wu.propTypes = {}
Wu.filterProps = ['rowGap']
const EC = Ct({ prop: 'gridColumn' }),
  TC = Ct({ prop: 'gridRow' }),
  CC = Ct({ prop: 'gridAutoFlow' }),
  wC = Ct({ prop: 'gridAutoColumns' }),
  AC = Ct({ prop: 'gridAutoRows' }),
  OC = Ct({ prop: 'gridTemplateColumns' }),
  MC = Ct({ prop: 'gridTemplateRows' }),
  _C = Ct({ prop: 'gridTemplateAreas' }),
  NC = Ct({ prop: 'gridArea' })
Ku(Qu, Zu, Wu, EC, TC, CC, wC, AC, OC, MC, _C, NC)
function Il(t, r) {
  return r === 'grey' ? r : t
}
const DC = Ct({ prop: 'color', themeKey: 'palette', transform: Il }),
  BC = Ct({ prop: 'bgcolor', cssProperty: 'backgroundColor', themeKey: 'palette', transform: Il }),
  zC = Ct({ prop: 'backgroundColor', themeKey: 'palette', transform: Il })
Ku(DC, BC, zC)
const UC = Vu
function Tn(t) {
  return t <= 1 && t !== 0 ? `${t * 100}%` : t
}
const kC = Ct({ prop: 'width', transform: Tn }),
  Hp = t => {
    if (t.maxWidth !== void 0 && t.maxWidth !== null) {
      const r = l => {
        var s, u, f, p, h
        const o =
          ((f = (u = (s = t.theme) == null ? void 0 : s.breakpoints) == null ? void 0 : u.values) == null
            ? void 0
            : f[l]) || UC[l]
        return o
          ? ((h = (p = t.theme) == null ? void 0 : p.breakpoints) == null ? void 0 : h.unit) !== 'px'
            ? { maxWidth: `${o}${t.theme.breakpoints.unit}` }
            : { maxWidth: o }
          : { maxWidth: Tn(l) }
      }
      return eo(t, t.maxWidth, r)
    }
    return null
  }
Hp.filterProps = ['maxWidth']
const LC = Ct({ prop: 'minWidth', transform: Tn }),
  jC = Ct({ prop: 'height', transform: Tn }),
  $C = Ct({ prop: 'maxHeight', transform: Tn }),
  HC = Ct({ prop: 'minHeight', transform: Tn })
Ct({ prop: 'size', cssProperty: 'width', transform: Tn })
Ct({ prop: 'size', cssProperty: 'height', transform: Tn })
const PC = Ct({ prop: 'boxSizing' })
Ku(kC, Hp, LC, jC, $C, HC, PC)
const Ju = {
    border: { themeKey: 'borders', transform: kn },
    borderTop: { themeKey: 'borders', transform: kn },
    borderRight: { themeKey: 'borders', transform: kn },
    borderBottom: { themeKey: 'borders', transform: kn },
    borderLeft: { themeKey: 'borders', transform: kn },
    borderColor: { themeKey: 'palette' },
    borderTopColor: { themeKey: 'palette' },
    borderRightColor: { themeKey: 'palette' },
    borderBottomColor: { themeKey: 'palette' },
    borderLeftColor: { themeKey: 'palette' },
    outline: { themeKey: 'borders', transform: kn },
    outlineColor: { themeKey: 'palette' },
    borderRadius: { themeKey: 'shape.borderRadius', style: Xu },
    color: { themeKey: 'palette', transform: Il },
    bgcolor: { themeKey: 'palette', cssProperty: 'backgroundColor', transform: Il },
    backgroundColor: { themeKey: 'palette', transform: Il },
    p: { style: Mt },
    pt: { style: Mt },
    pr: { style: Mt },
    pb: { style: Mt },
    pl: { style: Mt },
    px: { style: Mt },
    py: { style: Mt },
    padding: { style: Mt },
    paddingTop: { style: Mt },
    paddingRight: { style: Mt },
    paddingBottom: { style: Mt },
    paddingLeft: { style: Mt },
    paddingX: { style: Mt },
    paddingY: { style: Mt },
    paddingInline: { style: Mt },
    paddingInlineStart: { style: Mt },
    paddingInlineEnd: { style: Mt },
    paddingBlock: { style: Mt },
    paddingBlockStart: { style: Mt },
    paddingBlockEnd: { style: Mt },
    m: { style: Ot },
    mt: { style: Ot },
    mr: { style: Ot },
    mb: { style: Ot },
    ml: { style: Ot },
    mx: { style: Ot },
    my: { style: Ot },
    margin: { style: Ot },
    marginTop: { style: Ot },
    marginRight: { style: Ot },
    marginBottom: { style: Ot },
    marginLeft: { style: Ot },
    marginX: { style: Ot },
    marginY: { style: Ot },
    marginInline: { style: Ot },
    marginInlineStart: { style: Ot },
    marginInlineEnd: { style: Ot },
    marginBlock: { style: Ot },
    marginBlockStart: { style: Ot },
    marginBlockEnd: { style: Ot },
    displayPrint: { cssProperty: !1, transform: t => ({ '@media print': { display: t } }) },
    display: {},
    overflow: {},
    textOverflow: {},
    visibility: {},
    whiteSpace: {},
    flexBasis: {},
    flexDirection: {},
    flexWrap: {},
    justifyContent: {},
    alignItems: {},
    alignContent: {},
    order: {},
    flex: {},
    flexGrow: {},
    flexShrink: {},
    alignSelf: {},
    justifyItems: {},
    justifySelf: {},
    gap: { style: Qu },
    rowGap: { style: Wu },
    columnGap: { style: Zu },
    gridColumn: {},
    gridRow: {},
    gridAutoFlow: {},
    gridAutoColumns: {},
    gridAutoRows: {},
    gridTemplateColumns: {},
    gridTemplateRows: {},
    gridTemplateAreas: {},
    gridArea: {},
    position: {},
    zIndex: { themeKey: 'zIndex' },
    top: {},
    right: {},
    bottom: {},
    left: {},
    boxShadow: { themeKey: 'shadows' },
    width: { transform: Tn },
    maxWidth: { style: Hp },
    minWidth: { transform: Tn },
    height: { transform: Tn },
    maxHeight: { transform: Tn },
    minHeight: { transform: Tn },
    boxSizing: {},
    font: { themeKey: 'font' },
    fontFamily: { themeKey: 'typography' },
    fontSize: { themeKey: 'typography' },
    fontStyle: { themeKey: 'typography' },
    fontWeight: { themeKey: 'typography' },
    letterSpacing: {},
    textTransform: {},
    lineHeight: {},
    textAlign: {},
    typography: { cssProperty: !1, themeKey: 'typography' },
  },
  qC = {}
function IC() {
  function t(r) {
    if (!r.sx) return null
    const { sx: l, theme: o = qC, nested: s } = r,
      u = o.unstable_sxConfig ?? Ju,
      f = { sx: null, theme: o, nested: !0 }
    function p(h) {
      let m = h
      if (typeof h == 'function') m = h(o)
      else if (typeof h != 'object') return h
      if (!m) return null
      const g = o.breakpoints ?? wu,
        b = sC(g)
      for (const C in m) {
        const v = FC(m[C], o)
        if (v != null) {
          if (typeof v != 'object') {
            O0(b, C, v, o, u)
            continue
          }
          if (u[C]) {
            O0(b, C, v, o, u)
            continue
          }
          uC(g, v)
            ? Gu(b, r.theme, v, (w, R) => {
                b[w][C] = R
              })
            : ((f.sx = v), (b[C] = t(f)))
        }
      }
      return !s && o.modularCssLayers ? { '@layer sx': R0(o, E0(g, b)) } : R0(o, E0(g, b))
    }
    return Array.isArray(l) ? l.map(p) : p(l)
  }
  return ((t.filterProps = ['sx']), t)
}
const Vl = IC()
function O0(t, r, l, o, s) {
  const u = s[r]
  if (!u) {
    t[r] = l
    return
  }
  if (l == null) return
  const { themeKey: f } = u
  if (f === 'typography' && l === 'inherit') {
    t[r] = l
    return
  }
  const { style: p } = u
  if (p) {
    ql(t, p({ [r]: l, theme: o }))
    return
  }
  const { cssProperty: h = r, transform: m } = u,
    g = lr(o, f)
  Gu(t, o, l, (b, C) => {
    const v = Mv(g, m, C, r)
    h === !1 ? ql(b ? t[b] : t, v) : b ? (t[b][h] = v) : (t[h] = v)
  })
}
function FC(t, r) {
  return typeof t == 'function' ? t(r) : t
}
function YC(t, r) {
  var o
  const l = this
  if (l.vars) {
    if (!((o = l.colorSchemes) != null && o[t]) || typeof l.getColorSchemeSelector != 'function') return {}
    let s = l.getColorSchemeSelector(t)
    return s === '&'
      ? r
      : ((s.includes('data-') || s.includes('.')) && (s = `*:where(${s.replace(/\s*&$/, '')}) &`), { [s]: r })
  }
  return l.palette.mode === t ? r : {}
}
function ec(t = {}, ...r) {
  const { breakpoints: l = {}, palette: o = {}, spacing: s, shape: u = {}, ...f } = t,
    p = wv(l),
    h = Nv(s)
  let m = ln(
    {
      breakpoints: p,
      direction: 'ltr',
      components: {},
      palette: { mode: 'light', ...o },
      spacing: h,
      shape: { ...WT, ...u },
    },
    f
  )
  return (
    (m = ZT(m)),
    (m.applyStyles = YC),
    (m = r.reduce((g, b) => ln(g, b), m)),
    (m.unstable_sxConfig = { ...Ju, ...(f == null ? void 0 : f.unstable_sxConfig) }),
    (m.unstable_sx = function (b) {
      return Vl({ sx: b, theme: this })
    }),
    (m.internal_cache = {}),
    m
  )
}
function VC(t) {
  return Object.keys(t).length === 0
}
function GC(t = null) {
  const r = S.useContext(Yu)
  return !r || VC(r) ? t : r
}
const KC = ec()
function tc(t = KC) {
  return GC(t)
}
function Ld(t) {
  const r = ma(t)
  return t !== r && r.styles ? (r.styles.match(/^@layer\s+[^{]*$/) || (r.styles = `@layer global{${r.styles}}`), r) : t
}
function XC({ styles: t, themeId: r, defaultTheme: l = {} }) {
  const o = tc(l),
    s = (r && o[r]) || o
  let u = typeof t == 'function' ? t(s) : t
  return (
    s.modularCssLayers && (Array.isArray(u) ? (u = u.map(f => Ld(typeof f == 'function' ? f(s) : f))) : (u = Ld(u))),
    q.jsx(FT, { styles: u })
  )
}
const M0 = t => t,
  QC = () => {
    let t = M0
    return {
      configure(r) {
        t = r
      },
      generate(r) {
        return t(r)
      },
      reset() {
        t = M0
      },
    }
  },
  Dv = QC()
function Bv(t) {
  var r,
    l,
    o = ''
  if (typeof t == 'string' || typeof t == 'number') o += t
  else if (typeof t == 'object')
    if (Array.isArray(t)) {
      var s = t.length
      for (r = 0; r < s; r++) t[r] && (l = Bv(t[r])) && (o && (o += ' '), (o += l))
    } else for (l in t) t[l] && (o && (o += ' '), (o += l))
  return o
}
function Ae() {
  for (var t, r, l = 0, o = '', s = arguments.length; l < s; l++)
    (t = arguments[l]) && (r = Bv(t)) && (o && (o += ' '), (o += r))
  return o
}
function ZC(t = {}) {
  const { themeId: r, defaultTheme: l, defaultClassName: o = 'MuiBox-root', generateClassName: s } = t,
    u = Ev('div', { shouldForwardProp: p => p !== 'theme' && p !== 'sx' && p !== 'as' })(Vl)
  return S.forwardRef(function (h, m) {
    const g = tc(l),
      { className: b, component: C = 'div', ...v } = h
    return q.jsx(u, { as: C, ref: m, className: Ae(b, s ? s(o) : o), theme: (r && g[r]) || g, ...v })
  })
}
const WC = {
  active: 'active',
  checked: 'checked',
  completed: 'completed',
  disabled: 'disabled',
  error: 'error',
  expanded: 'expanded',
  focused: 'focused',
  focusVisible: 'focusVisible',
  open: 'open',
  readOnly: 'readOnly',
  required: 'required',
  selected: 'selected',
}
function Je(t, r, l = 'Mui') {
  const o = WC[r]
  return o ? `${l}-${o}` : `${Dv.generate(t)}-${r}`
}
function et(t, r, l = 'Mui') {
  const o = {}
  return (
    r.forEach(s => {
      o[s] = Je(t, s, l)
    }),
    o
  )
}
function zv(t) {
  const { variants: r, ...l } = t,
    o = { variants: r, style: ma(l), isProcessed: !0 }
  return (
    o.style === l ||
      (r &&
        r.forEach(s => {
          typeof s.style != 'function' && (s.style = ma(s.style))
        })),
    o
  )
}
const JC = ec()
function jd(t) {
  return t !== 'ownerState' && t !== 'theme' && t !== 'sx' && t !== 'as'
}
function Fa(t, r) {
  return (
    r &&
      t &&
      typeof t == 'object' &&
      t.styles &&
      !t.styles.startsWith('@layer') &&
      (t.styles = `@layer ${r}{${String(t.styles)}}`),
    t
  )
}
function e2(t) {
  return t ? (r, l) => l[t] : null
}
function t2(t, r, l) {
  t.theme = Ov(t.theme) ? l : t.theme[r] || t.theme
}
function yu(t, r, l) {
  const o = typeof r == 'function' ? r(t) : r
  if (Array.isArray(o)) return o.flatMap(s => yu(t, s, l))
  if (Array.isArray(o == null ? void 0 : o.variants)) {
    let s
    if (o.isProcessed) s = l ? Fa(o.style, l) : o.style
    else {
      const { variants: u, ...f } = o
      s = l ? Fa(ma(f), l) : f
    }
    return Uv(t, o.variants, [s], l)
  }
  return o != null && o.isProcessed ? (l ? Fa(ma(o.style), l) : o.style) : l ? Fa(ma(o), l) : o
}
function Uv(t, r, l = [], o = void 0) {
  var u
  let s
  e: for (let f = 0; f < r.length; f += 1) {
    const p = r[f]
    if (typeof p.props == 'function') {
      if ((s ?? (s = { ...t, ...t.ownerState, ownerState: t.ownerState }), !p.props(s))) continue
    } else
      for (const h in p.props)
        if (t[h] !== p.props[h] && ((u = t.ownerState) == null ? void 0 : u[h]) !== p.props[h]) continue e
    typeof p.style == 'function'
      ? (s ?? (s = { ...t, ...t.ownerState, ownerState: t.ownerState }), l.push(o ? Fa(ma(p.style(s)), o) : p.style(s)))
      : l.push(o ? Fa(ma(p.style), o) : p.style)
  }
  return l
}
function kv(t = {}) {
  const { themeId: r, defaultTheme: l = JC, rootShouldForwardProp: o = jd, slotShouldForwardProp: s = jd } = t
  function u(p) {
    t2(p, r, l)
  }
  return (p, h = {}) => {
    YT(p, k => k.filter(V => V !== Vl))
    const { name: m, slot: g, skipVariantsResolver: b, skipSx: C, overridesResolver: v = e2(a2(g)), ...w } = h,
      R = (m && m.startsWith('Mui')) || g ? 'components' : 'custom',
      T = b !== void 0 ? b : (g && g !== 'Root' && g !== 'root') || !1,
      A = C || !1
    let O = jd
    g === 'Root' || g === 'root' ? (O = o) : g ? (O = s) : r2(p) && (O = void 0)
    const M = Ev(p, { shouldForwardProp: O, label: n2(), ...w }),
      z = k => {
        if (k.__emotion_real === k) return k
        if (typeof k == 'function')
          return function (Q) {
            return yu(Q, k, Q.theme.modularCssLayers ? R : void 0)
          }
        if (Br(k)) {
          const V = zv(k)
          return function (oe) {
            return V.variants
              ? yu(oe, V, oe.theme.modularCssLayers ? R : void 0)
              : oe.theme.modularCssLayers
                ? Fa(V.style, R)
                : V.style
          }
        }
        return k
      },
      _ = (...k) => {
        const V = [],
          Q = k.map(z),
          oe = []
        if (
          (V.push(u),
          m &&
            v &&
            oe.push(function (G) {
              var H, W
              const U = (W = (H = G.theme.components) == null ? void 0 : H[m]) == null ? void 0 : W.styleOverrides
              if (!U) return null
              const N = {}
              for (const ue in U) N[ue] = yu(G, U[ue], G.theme.modularCssLayers ? 'theme' : void 0)
              return v(G, N)
            }),
          m &&
            !T &&
            oe.push(function (G) {
              var N, H
              const L = G.theme,
                U = (H = (N = L == null ? void 0 : L.components) == null ? void 0 : N[m]) == null ? void 0 : H.variants
              return U ? Uv(G, U, [], G.theme.modularCssLayers ? 'theme' : void 0) : null
            }),
          A || oe.push(Vl),
          Array.isArray(Q[0]))
        ) {
          const x = Q.shift(),
            G = new Array(V.length).fill(''),
            L = new Array(oe.length).fill('')
          let U
          ;((U = [...G, ...x, ...L]), (U.raw = [...G, ...x.raw, ...L]), V.unshift(U))
        }
        const ce = [...V, ...Q, ...oe],
          Z = M(...ce)
        return (p.muiName && (Z.muiName = p.muiName), Z)
      }
    return (M.withConfig && (_.withConfig = M.withConfig), _)
  }
}
function n2(t, r) {
  return void 0
}
function r2(t) {
  return typeof t == 'string' && t.charCodeAt(0) > 96
}
function a2(t) {
  return t && t.charAt(0).toLowerCase() + t.slice(1)
}
const l2 = kv()
function wi(t, r, l = !1) {
  const o = { ...r }
  for (const s in t)
    if (Object.prototype.hasOwnProperty.call(t, s)) {
      const u = s
      if (u === 'components' || u === 'slots') o[u] = { ...t[u], ...o[u] }
      else if (u === 'componentsProps' || u === 'slotProps') {
        const f = t[u],
          p = r[u]
        if (!p) o[u] = f || {}
        else if (!f) o[u] = p
        else {
          o[u] = { ...p }
          for (const h in f)
            if (Object.prototype.hasOwnProperty.call(f, h)) {
              const m = h
              o[u][m] = wi(f[m], p[m], l)
            }
        }
      } else
        u === 'className' && l && r.className !== void 0
          ? (o.className = Ae(t == null ? void 0 : t.className, r == null ? void 0 : r.className))
          : u === 'style' && l && r.style
            ? (o.style = { ...(t == null ? void 0 : t.style), ...(r == null ? void 0 : r.style) })
            : o[u] === void 0 && (o[u] = t[u])
    }
  return o
}
function o2(t) {
  const { theme: r, name: l, props: o } = t
  return !r || !r.components || !r.components[l] || !r.components[l].defaultProps
    ? o
    : wi(r.components[l].defaultProps, o)
}
function i2(t) {
  const { props: r, name: l, defaultTheme: o, themeId: s } = t
  let u = tc(o)
  return (s && (u = u[s] || u), o2({ theme: u, name: l, props: r }))
}
const on = typeof window < 'u' ? S.useLayoutEffect : S.useEffect
function s2(t, r = Number.MIN_SAFE_INTEGER, l = Number.MAX_SAFE_INTEGER) {
  return Math.max(r, Math.min(t, l))
}
function Pp(t, r = 0, l = 1) {
  return s2(t, r, l)
}
function u2(t) {
  t = t.slice(1)
  const r = new RegExp(`.{1,${t.length >= 6 ? 2 : 1}}`, 'g')
  let l = t.match(r)
  return (
    l && l[0].length === 1 && (l = l.map(o => o + o)),
    l
      ? `rgb${l.length === 4 ? 'a' : ''}(${l.map((o, s) => (s < 3 ? parseInt(o, 16) : Math.round((parseInt(o, 16) / 255) * 1e3) / 1e3)).join(', ')})`
      : ''
  )
}
function ga(t) {
  if (t.type) return t
  if (t.charAt(0) === '#') return ga(u2(t))
  const r = t.indexOf('('),
    l = t.substring(0, r)
  if (!['rgb', 'rgba', 'hsl', 'hsla', 'color'].includes(l)) throw new Error(Lr(9, t))
  let o = t.substring(r + 1, t.length - 1),
    s
  if (l === 'color') {
    if (
      ((o = o.split(' ')),
      (s = o.shift()),
      o.length === 4 && o[3].charAt(0) === '/' && (o[3] = o[3].slice(1)),
      !['srgb', 'display-p3', 'a98-rgb', 'prophoto-rgb', 'rec-2020'].includes(s))
    )
      throw new Error(Lr(10, s))
  } else o = o.split(',')
  return ((o = o.map(u => parseFloat(u))), { type: l, values: o, colorSpace: s })
}
const c2 = t => {
    const r = ga(t)
    return r.values
      .slice(0, 3)
      .map((l, o) => (r.type.includes('hsl') && o !== 0 ? `${l}%` : l))
      .join(' ')
  },
  ci = (t, r) => {
    try {
      return c2(t)
    } catch {
      return t
    }
  }
function nc(t) {
  const { type: r, colorSpace: l } = t
  let { values: o } = t
  return (
    r.includes('rgb')
      ? (o = o.map((s, u) => (u < 3 ? parseInt(s, 10) : s)))
      : r.includes('hsl') && ((o[1] = `${o[1]}%`), (o[2] = `${o[2]}%`)),
    r.includes('color') ? (o = `${l} ${o.join(' ')}`) : (o = `${o.join(', ')}`),
    `${r}(${o})`
  )
}
function Lv(t) {
  t = ga(t)
  const { values: r } = t,
    l = r[0],
    o = r[1] / 100,
    s = r[2] / 100,
    u = o * Math.min(s, 1 - s),
    f = (m, g = (m + l / 30) % 12) => s - u * Math.max(Math.min(g - 3, 9 - g, 1), -1)
  let p = 'rgb'
  const h = [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)]
  return (t.type === 'hsla' && ((p += 'a'), h.push(r[3])), nc({ type: p, values: h }))
}
function tp(t) {
  t = ga(t)
  let r = t.type === 'hsl' || t.type === 'hsla' ? ga(Lv(t)).values : t.values
  return (
    (r = r.map(l => (t.type !== 'color' && (l /= 255), l <= 0.03928 ? l / 12.92 : ((l + 0.055) / 1.055) ** 2.4))),
    Number((0.2126 * r[0] + 0.7152 * r[1] + 0.0722 * r[2]).toFixed(3))
  )
}
function f2(t, r) {
  const l = tp(t),
    o = tp(r)
  return (Math.max(l, o) + 0.05) / (Math.min(l, o) + 0.05)
}
function Ai(t, r) {
  return (
    (t = ga(t)),
    (r = Pp(r)),
    (t.type === 'rgb' || t.type === 'hsl') && (t.type += 'a'),
    t.type === 'color' ? (t.values[3] = `/${r}`) : (t.values[3] = r),
    nc(t)
  )
}
function Ha(t, r, l) {
  try {
    return Ai(t, r)
  } catch {
    return t
  }
}
function rc(t, r) {
  if (((t = ga(t)), (r = Pp(r)), t.type.includes('hsl'))) t.values[2] *= 1 - r
  else if (t.type.includes('rgb') || t.type.includes('color')) for (let l = 0; l < 3; l += 1) t.values[l] *= 1 - r
  return nc(t)
}
function Ze(t, r, l) {
  try {
    return rc(t, r)
  } catch {
    return t
  }
}
function ac(t, r) {
  if (((t = ga(t)), (r = Pp(r)), t.type.includes('hsl'))) t.values[2] += (100 - t.values[2]) * r
  else if (t.type.includes('rgb')) for (let l = 0; l < 3; l += 1) t.values[l] += (255 - t.values[l]) * r
  else if (t.type.includes('color')) for (let l = 0; l < 3; l += 1) t.values[l] += (1 - t.values[l]) * r
  return nc(t)
}
function We(t, r, l) {
  try {
    return ac(t, r)
  } catch {
    return t
  }
}
function d2(t, r = 0.15) {
  return tp(t) > 0.5 ? rc(t, r) : ac(t, r)
}
function au(t, r, l) {
  try {
    return d2(t, r)
  } catch {
    return t
  }
}
const p2 = S.createContext(),
  h2 = () => S.useContext(p2) ?? !1,
  m2 = S.createContext(void 0)
function g2(t) {
  const { theme: r, name: l, props: o } = t
  if (!r || !r.components || !r.components[l]) return o
  const s = r.components[l]
  return s.defaultProps
    ? wi(s.defaultProps, o, r.components.mergeClassNameAndStyle)
    : !s.styleOverrides && !s.variants
      ? wi(s, o, r.components.mergeClassNameAndStyle)
      : o
}
function y2({ props: t, name: r }) {
  const l = S.useContext(m2)
  return g2({ props: t, name: r, theme: { components: l } })
}
let _0 = 0
function b2(t) {
  const [r, l] = S.useState(t),
    o = t || r
  return (
    S.useEffect(() => {
      r == null && ((_0 += 1), l(`mui-${_0}`))
    }, [r]),
    o
  )
}
const v2 = { ...Eu },
  N0 = v2.useId
function Oi(t) {
  if (N0 !== void 0) {
    const r = N0()
    return t ?? r
  }
  return b2(t)
}
const D0 = { theme: void 0 }
function S2(t) {
  let r, l
  return function (s) {
    let u = r
    return ((u === void 0 || s.theme !== l) && ((D0.theme = s.theme), (u = zv(t(D0))), (r = u), (l = s.theme)), u)
  }
}
function x2(t = '') {
  function r(...o) {
    if (!o.length) return ''
    const s = o[0]
    return typeof s == 'string' &&
      !s.match(
        /(#|\(|\)|(-?(\d*\.)?\d+)(px|em|%|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc))|^(-?(\d*\.)?\d+)$|(\d+ \d+ \d+)/
      )
      ? `, var(--${t ? `${t}-` : ''}${s}${r(...o.slice(1))})`
      : `, ${s}`
  }
  return (o, ...s) => `var(--${t ? `${t}-` : ''}${o}${r(...s)})`
}
const B0 = (t, r, l, o = []) => {
    let s = t
    r.forEach((u, f) => {
      f === r.length - 1
        ? Array.isArray(s)
          ? (s[Number(u)] = l)
          : s && typeof s == 'object' && (s[u] = l)
        : s && typeof s == 'object' && (s[u] || (s[u] = o.includes(u) ? [] : {}), (s = s[u]))
    })
  },
  R2 = (t, r, l) => {
    function o(s, u = [], f = []) {
      Object.entries(s).forEach(([p, h]) => {
        ;(!l || (l && !l([...u, p]))) &&
          h != null &&
          (typeof h == 'object' && Object.keys(h).length > 0
            ? o(h, [...u, p], Array.isArray(h) ? [...f, p] : f)
            : r([...u, p], h, f))
      })
    }
    o(t)
  },
  E2 = (t, r) =>
    typeof r == 'number'
      ? ['lineHeight', 'fontWeight', 'opacity', 'zIndex'].some(o => t.includes(o)) ||
        t[t.length - 1].toLowerCase().includes('opacity')
        ? r
        : `${r}px`
      : r
function $d(t, r) {
  const { prefix: l, shouldSkipGeneratingVar: o } = r || {},
    s = {},
    u = {},
    f = {}
  return (
    R2(
      t,
      (p, h, m) => {
        if ((typeof h == 'string' || typeof h == 'number') && (!o || !o(p, h))) {
          const g = `--${l ? `${l}-` : ''}${p.join('-')}`,
            b = E2(p, h)
          ;(Object.assign(s, { [g]: b }), B0(u, p, `var(${g})`, m), B0(f, p, `var(${g}, ${b})`, m))
        }
      },
      p => p[0] === 'vars'
    ),
    { css: s, vars: u, varsWithDefaults: f }
  )
}
function T2(t, r = {}) {
  const { getSelector: l = A, disableCssColorScheme: o, colorSchemeSelector: s, enableContrastVars: u } = r,
    { colorSchemes: f = {}, components: p, defaultColorScheme: h = 'light', ...m } = t,
    { vars: g, css: b, varsWithDefaults: C } = $d(m, r)
  let v = C
  const w = {},
    { [h]: R, ...T } = f
  if (
    (Object.entries(T || {}).forEach(([z, _]) => {
      const { vars: k, css: V, varsWithDefaults: Q } = $d(_, r)
      ;((v = ln(v, Q)), (w[z] = { css: V, vars: k }))
    }),
    R)
  ) {
    const { css: z, vars: _, varsWithDefaults: k } = $d(R, r)
    ;((v = ln(v, k)), (w[h] = { css: z, vars: _ }))
  }
  function A(z, _) {
    var V, Q
    let k = s
    if (
      (s === 'class' && (k = '.%s'),
      s === 'data' && (k = '[data-%s]'),
      s != null && s.startsWith('data-') && !s.includes('%s') && (k = `[${s}="%s"]`),
      z)
    ) {
      if (k === 'media')
        return t.defaultColorScheme === z
          ? ':root'
          : {
              [`@media (prefers-color-scheme: ${((Q = (V = f[z]) == null ? void 0 : V.palette) == null ? void 0 : Q.mode) || z})`]:
                { ':root': _ },
            }
      if (k) return t.defaultColorScheme === z ? `:root, ${k.replace('%s', String(z))}` : k.replace('%s', String(z))
    }
    return ':root'
  }
  return {
    vars: v,
    generateThemeVars: () => {
      let z = { ...g }
      return (
        Object.entries(w).forEach(([, { vars: _ }]) => {
          z = ln(z, _)
        }),
        z
      )
    },
    generateStyleSheets: () => {
      var oe, ce
      const z = [],
        _ = t.defaultColorScheme || 'light'
      function k(Z, x) {
        Object.keys(x).length && z.push(typeof Z == 'string' ? { [Z]: { ...x } } : Z)
      }
      k(l(void 0, { ...b }), b)
      const { [_]: V, ...Q } = w
      if (V) {
        const { css: Z } = V,
          x = (ce = (oe = f[_]) == null ? void 0 : oe.palette) == null ? void 0 : ce.mode,
          G = !o && x ? { colorScheme: x, ...Z } : { ...Z }
        k(l(_, { ...G }), G)
      }
      return (
        Object.entries(Q).forEach(([Z, { css: x }]) => {
          var U, N
          const G = (N = (U = f[Z]) == null ? void 0 : U.palette) == null ? void 0 : N.mode,
            L = !o && G ? { colorScheme: G, ...x } : { ...x }
          k(l(Z, { ...L }), L)
        }),
        u &&
          z.push({
            ':root': {
              '--__l-threshold': '0.7',
              '--__l': 'clamp(0, (l / var(--__l-threshold) - 1) * -infinity, 1)',
              '--__a': 'clamp(0.87, (l / var(--__l-threshold) - 1) * -infinity, 1)',
            },
          }),
        z
      )
    },
  }
}
function C2(t) {
  return function (l) {
    return t === 'media'
      ? `@media (prefers-color-scheme: ${l})`
      : t
        ? t.startsWith('data-') && !t.includes('%s')
          ? `[${t}="${l}"] &`
          : t === 'class'
            ? `.${l} &`
            : t === 'data'
              ? `[data-${l}] &`
              : `${t.replace('%s', l)} &`
        : '&'
  }
}
function tt(t, r, l = void 0) {
  const o = {}
  for (const s in t) {
    const u = t[s]
    let f = '',
      p = !0
    for (let h = 0; h < u.length; h += 1) {
      const m = u[h]
      m && ((f += (p === !0 ? '' : ' ') + r(m)), (p = !1), l && l[m] && (f += ' ' + l[m]))
    }
    o[s] = f
  }
  return o
}
const w2 = ec(),
  A2 = l2('div', {
    name: 'MuiContainer',
    slot: 'Root',
    overridesResolver: (t, r) => {
      const { ownerState: l } = t
      return [r.root, r[`maxWidth${Oe(String(l.maxWidth))}`], l.fixed && r.fixed, l.disableGutters && r.disableGutters]
    },
  }),
  O2 = t => i2({ props: t, name: 'MuiContainer', defaultTheme: w2 }),
  M2 = (t, r) => {
    const l = h => Je(r, h),
      { classes: o, fixed: s, disableGutters: u, maxWidth: f } = t,
      p = { root: ['root', f && `maxWidth${Oe(String(f))}`, s && 'fixed', u && 'disableGutters'] }
    return tt(p, l, o)
  }
function _2(t = {}) {
  const { createStyledComponent: r = A2, useThemeProps: l = O2, componentName: o = 'MuiContainer' } = t,
    s = r(
      ({ theme: f, ownerState: p }) => ({
        width: '100%',
        marginLeft: 'auto',
        boxSizing: 'border-box',
        marginRight: 'auto',
        ...(!p.disableGutters && {
          paddingLeft: f.spacing(2),
          paddingRight: f.spacing(2),
          [f.breakpoints.up('sm')]: { paddingLeft: f.spacing(3), paddingRight: f.spacing(3) },
        }),
      }),
      ({ theme: f, ownerState: p }) =>
        p.fixed &&
        Object.keys(f.breakpoints.values).reduce((h, m) => {
          const g = m,
            b = f.breakpoints.values[g]
          return (b !== 0 && (h[f.breakpoints.up(g)] = { maxWidth: `${b}${f.breakpoints.unit}` }), h)
        }, {}),
      ({ theme: f, ownerState: p }) => ({
        ...(p.maxWidth === 'xs' && { [f.breakpoints.up('xs')]: { maxWidth: Math.max(f.breakpoints.values.xs, 444) } }),
        ...(p.maxWidth &&
          p.maxWidth !== 'xs' && {
            [f.breakpoints.up(p.maxWidth)]: { maxWidth: `${f.breakpoints.values[p.maxWidth]}${f.breakpoints.unit}` },
          }),
      })
    )
  return S.forwardRef(function (p, h) {
    const m = l(p),
      {
        className: g,
        component: b = 'div',
        disableGutters: C = !1,
        fixed: v = !1,
        maxWidth: w = 'lg',
        classes: R,
        ...T
      } = m,
      A = { ...m, component: b, disableGutters: C, fixed: v, maxWidth: w },
      O = M2(A, o)
    return q.jsx(s, { as: b, ownerState: A, className: Ae(O.root, g), ref: h, ...T })
  })
}
function Hd(t, r) {
  var l, o, s
  return (
    S.isValidElement(t) &&
    r.indexOf(
      t.type.muiName ??
        ((s = (o = (l = t.type) == null ? void 0 : l._payload) == null ? void 0 : o.value) == null ? void 0 : s.muiName)
    ) !== -1
  )
}
function jv() {
  return {
    text: { primary: 'rgba(0, 0, 0, 0.87)', secondary: 'rgba(0, 0, 0, 0.6)', disabled: 'rgba(0, 0, 0, 0.38)' },
    divider: 'rgba(0, 0, 0, 0.12)',
    background: { paper: Si.white, default: Si.white },
    action: {
      active: 'rgba(0, 0, 0, 0.54)',
      hover: 'rgba(0, 0, 0, 0.04)',
      hoverOpacity: 0.04,
      selected: 'rgba(0, 0, 0, 0.08)',
      selectedOpacity: 0.08,
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
      disabledOpacity: 0.38,
      focus: 'rgba(0, 0, 0, 0.12)',
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
    },
  }
}
const $v = jv()
function Hv() {
  return {
    text: {
      primary: Si.white,
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
      icon: 'rgba(255, 255, 255, 0.5)',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
    background: { paper: '#121212', default: '#121212' },
    action: {
      active: Si.white,
      hover: 'rgba(255, 255, 255, 0.08)',
      hoverOpacity: 0.08,
      selected: 'rgba(255, 255, 255, 0.16)',
      selectedOpacity: 0.16,
      disabled: 'rgba(255, 255, 255, 0.3)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
      disabledOpacity: 0.38,
      focus: 'rgba(255, 255, 255, 0.12)',
      focusOpacity: 0.12,
      activatedOpacity: 0.24,
    },
  }
}
const np = Hv()
function z0(t, r, l, o) {
  const s = o.light || o,
    u = o.dark || o * 1.5
  t[r] ||
    (t.hasOwnProperty(l)
      ? (t[r] = t[l])
      : r === 'light'
        ? (t.light = ac(t.main, s))
        : r === 'dark' && (t.dark = rc(t.main, u)))
}
function U0(t, r, l, o, s) {
  const u = s.light || s,
    f = s.dark || s * 1.5
  r[l] ||
    (r.hasOwnProperty(o)
      ? (r[l] = r[o])
      : l === 'light'
        ? (r.light = `color-mix(in ${t}, ${r.main}, #fff ${(u * 100).toFixed(0)}%)`)
        : l === 'dark' && (r.dark = `color-mix(in ${t}, ${r.main}, #000 ${(f * 100).toFixed(0)}%)`))
}
function N2(t = 'light') {
  return t === 'dark'
    ? { main: zl[200], light: zl[50], dark: zl[400] }
    : { main: zl[700], light: zl[400], dark: zl[800] }
}
function D2(t = 'light') {
  return t === 'dark'
    ? { main: Bl[200], light: Bl[50], dark: Bl[400] }
    : { main: Bl[500], light: Bl[300], dark: Bl[700] }
}
function B2(t = 'light') {
  return t === 'dark'
    ? { main: Dl[500], light: Dl[300], dark: Dl[700] }
    : { main: Dl[700], light: Dl[400], dark: Dl[800] }
}
function z2(t = 'light') {
  return t === 'dark'
    ? { main: Ul[400], light: Ul[300], dark: Ul[700] }
    : { main: Ul[700], light: Ul[500], dark: Ul[900] }
}
function U2(t = 'light') {
  return t === 'dark'
    ? { main: kl[400], light: kl[300], dark: kl[700] }
    : { main: kl[800], light: kl[500], dark: kl[900] }
}
function k2(t = 'light') {
  return t === 'dark'
    ? { main: li[400], light: li[300], dark: li[700] }
    : { main: '#ed6c02', light: li[500], dark: li[900] }
}
function L2(t) {
  return `oklch(from ${t} var(--__l) 0 h / var(--__a))`
}
function qp(t) {
  const { mode: r = 'light', contrastThreshold: l = 3, tonalOffset: o = 0.2, colorSpace: s, ...u } = t,
    f = t.primary || N2(r),
    p = t.secondary || D2(r),
    h = t.error || B2(r),
    m = t.info || z2(r),
    g = t.success || U2(r),
    b = t.warning || k2(r)
  function C(T) {
    return s ? L2(T) : f2(T, np.text.primary) >= l ? np.text.primary : $v.text.primary
  }
  const v = ({ color: T, name: A, mainShade: O = 500, lightShade: M = 300, darkShade: z = 700 }) => {
    if (((T = { ...T }), !T.main && T[O] && (T.main = T[O]), !T.hasOwnProperty('main')))
      throw new Error(Lr(11, A ? ` (${A})` : '', O))
    if (typeof T.main != 'string') throw new Error(Lr(12, A ? ` (${A})` : '', JSON.stringify(T.main)))
    return (
      s ? (U0(s, T, 'light', M, o), U0(s, T, 'dark', z, o)) : (z0(T, 'light', M, o), z0(T, 'dark', z, o)),
      T.contrastText || (T.contrastText = C(T.main)),
      T
    )
  }
  let w
  return (
    r === 'light' ? (w = jv()) : r === 'dark' && (w = Hv()),
    ln(
      {
        common: { ...Si },
        mode: r,
        primary: v({ color: f, name: 'primary' }),
        secondary: v({ color: p, name: 'secondary', mainShade: 'A400', lightShade: 'A200', darkShade: 'A700' }),
        error: v({ color: h, name: 'error' }),
        warning: v({ color: b, name: 'warning' }),
        info: v({ color: m, name: 'info' }),
        success: v({ color: g, name: 'success' }),
        grey: YE,
        contrastThreshold: l,
        getContrastText: C,
        augmentColor: v,
        tonalOffset: o,
        ...w,
      },
      u
    )
  )
}
function j2(t) {
  const r = {}
  return (
    Object.entries(t).forEach(o => {
      const [s, u] = o
      typeof u == 'object' &&
        (r[s] =
          `${u.fontStyle ? `${u.fontStyle} ` : ''}${u.fontVariant ? `${u.fontVariant} ` : ''}${u.fontWeight ? `${u.fontWeight} ` : ''}${u.fontStretch ? `${u.fontStretch} ` : ''}${u.fontSize || ''}${u.lineHeight ? `/${u.lineHeight} ` : ''}${u.fontFamily || ''}`)
    }),
    r
  )
}
function $2(t, r) {
  return {
    toolbar: {
      minHeight: 56,
      [t.up('xs')]: { '@media (orientation: landscape)': { minHeight: 48 } },
      [t.up('sm')]: { minHeight: 64 },
    },
    ...r,
  }
}
function H2(t) {
  return Math.round(t * 1e5) / 1e5
}
const k0 = { textTransform: 'uppercase' },
  L0 = '"Roboto", "Helvetica", "Arial", sans-serif'
function P2(t, r) {
  const {
      fontFamily: l = L0,
      fontSize: o = 14,
      fontWeightLight: s = 300,
      fontWeightRegular: u = 400,
      fontWeightMedium: f = 500,
      fontWeightBold: p = 700,
      htmlFontSize: h = 16,
      allVariants: m,
      pxToRem: g,
      ...b
    } = typeof r == 'function' ? r(t) : r,
    C = o / 14,
    v = g || (T => `${(T / h) * C}rem`),
    w = (T, A, O, M, z) => ({
      fontFamily: l,
      fontWeight: T,
      fontSize: v(A),
      lineHeight: O,
      ...(l === L0 ? { letterSpacing: `${H2(M / A)}em` } : {}),
      ...z,
      ...m,
    }),
    R = {
      h1: w(s, 96, 1.167, -1.5),
      h2: w(s, 60, 1.2, -0.5),
      h3: w(u, 48, 1.167, 0),
      h4: w(u, 34, 1.235, 0.25),
      h5: w(u, 24, 1.334, 0),
      h6: w(f, 20, 1.6, 0.15),
      subtitle1: w(u, 16, 1.75, 0.15),
      subtitle2: w(f, 14, 1.57, 0.1),
      body1: w(u, 16, 1.5, 0.15),
      body2: w(u, 14, 1.43, 0.15),
      button: w(f, 14, 1.75, 0.4, k0),
      caption: w(u, 12, 1.66, 0.4),
      overline: w(u, 12, 2.66, 1, k0),
      inherit: {
        fontFamily: 'inherit',
        fontWeight: 'inherit',
        fontSize: 'inherit',
        lineHeight: 'inherit',
        letterSpacing: 'inherit',
      },
    }
  return ln(
    {
      htmlFontSize: h,
      pxToRem: v,
      fontFamily: l,
      fontSize: o,
      fontWeightLight: s,
      fontWeightRegular: u,
      fontWeightMedium: f,
      fontWeightBold: p,
      ...R,
    },
    b,
    { clone: !1 }
  )
}
const q2 = 0.2,
  I2 = 0.14,
  F2 = 0.12
function ht(...t) {
  return [
    `${t[0]}px ${t[1]}px ${t[2]}px ${t[3]}px rgba(0,0,0,${q2})`,
    `${t[4]}px ${t[5]}px ${t[6]}px ${t[7]}px rgba(0,0,0,${I2})`,
    `${t[8]}px ${t[9]}px ${t[10]}px ${t[11]}px rgba(0,0,0,${F2})`,
  ].join(',')
}
const Y2 = [
    'none',
    ht(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0),
    ht(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0),
    ht(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0),
    ht(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0),
    ht(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0),
    ht(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0),
    ht(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1),
    ht(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2),
    ht(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2),
    ht(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3),
    ht(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3),
    ht(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4),
    ht(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4),
    ht(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4),
    ht(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5),
    ht(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5),
    ht(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5),
    ht(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6),
    ht(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6),
    ht(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7),
    ht(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7),
    ht(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7),
    ht(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8),
    ht(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8),
  ],
  V2 = ['all'],
  G2 = {},
  K2 = {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
  X2 = { shortest: 150, shorter: 200, short: 250, standard: 300, complex: 375, enteringScreen: 225, leavingScreen: 195 }
function j0(t) {
  return `${Math.round(t)}ms`
}
function Q2(t) {
  if (!t) return 0
  const r = t / 36
  return Math.min(Math.round((4 + 15 * r ** 0.25 + r / 5) * 10), 3e3)
}
function Z2(t) {
  const r = { ...t }
  delete r.reducedMotion
  const l = { ...K2, ...r.easing },
    o = { ...X2, ...r.duration },
    s = (f = V2, p = G2) => {
      const { duration: h = o.standard, easing: m = l.easeInOut, delay: g = 0, ...b } = p
      return (Array.isArray(f) ? f : [f])
        .map(C => `${C} ${typeof h == 'string' ? h : j0(h)} ${m} ${typeof g == 'string' ? g : j0(g)}`)
        .join(',')
    },
    u = r.create ?? s
  return { getAutoHeightDuration: Q2, create: u, ...r, easing: l, duration: o }
}
const W2 = {}
function J2(t = W2) {
  return { reducedMotion: 'never', ...t }
}
const ew = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500,
}
function tw(t) {
  return (
    Br(t) || typeof t > 'u' || typeof t == 'string' || typeof t == 'boolean' || typeof t == 'number' || Array.isArray(t)
  )
}
function Pv(t = {}) {
  const r = { ...t }
  function l(o) {
    const s = Object.entries(o)
    for (let u = 0; u < s.length; u++) {
      const [f, p] = s[u]
      !tw(p) || f.startsWith('unstable_') || f.startsWith('internal_')
        ? delete o[f]
        : Br(p) && ((o[f] = { ...p }), l(o[f]))
    }
  }
  return (
    l(r),
    `import { unstable_createBreakpoints as createBreakpoints, createTransitions } from '@mui/material/styles';

const theme = ${JSON.stringify(r, null, 2)};

theme.breakpoints = createBreakpoints(theme.breakpoints || {});
theme.motion = { reducedMotion: 'never', ...theme.motion };
theme.transitions = createTransitions(theme.transitions || {});

export default theme;`
  )
}
function $0(t) {
  return typeof t == 'number' ? `${(t * 100).toFixed(0)}%` : `calc((${t}) * 100%)`
}
const nw = t => {
  if (!Number.isNaN(+t)) return +t
  const r = t.match(/\d*\.?\d+/g)
  if (!r) return 0
  let l = 0
  for (let o = 0; o < r.length; o += 1) l += +r[o]
  return l
}
function rw(t) {
  Object.assign(t, {
    alpha(r, l) {
      const o = this || t
      return o.colorSpace
        ? `oklch(from ${r} l c h / ${typeof l == 'string' ? `calc(${l})` : l})`
        : o.vars
          ? `rgba(${r.replace(/var\(--([^,\s)]+)(?:,[^)]+)?\)+/g, 'var(--$1Channel)')} / ${typeof l == 'string' ? `calc(${l})` : l})`
          : Ai(r, nw(l))
    },
    lighten(r, l) {
      const o = this || t
      return o.colorSpace ? `color-mix(in ${o.colorSpace}, ${r}, #fff ${$0(l)})` : ac(r, l)
    },
    darken(r, l) {
      const o = this || t
      return o.colorSpace ? `color-mix(in ${o.colorSpace}, ${r}, #000 ${$0(l)})` : rc(r, l)
    },
  })
}
function rp(t = {}, ...r) {
  const {
    breakpoints: l,
    mixins: o = {},
    spacing: s,
    palette: u = {},
    motion: f = {},
    transitions: p = {},
    typography: h = {},
    shape: m,
    colorSpace: g,
    ...b
  } = t
  if (t.vars && t.generateThemeVars === void 0) throw new Error(Lr(22))
  const C = qp({ ...u, colorSpace: g }),
    v = ec(t)
  let w = ln(v, {
    mixins: $2(v.breakpoints, o),
    palette: C,
    shadows: Y2.slice(),
    typography: P2(C, h),
    motion: J2(f),
    transitions: Z2(p),
    zIndex: { ...ew },
  })
  return (
    (w = ln(w, b)),
    (w = r.reduce((R, T) => ln(R, T), w)),
    delete w.transitions.reducedMotion,
    (w.unstable_sxConfig = { ...Ju, ...(b == null ? void 0 : b.unstable_sxConfig) }),
    (w.unstable_sx = function (T) {
      return Vl({ sx: T, theme: this })
    }),
    (w.toRuntimeSource = Pv),
    rw(w),
    w
  )
}
function ap(t) {
  let r
  return (t < 1 ? (r = 5.11916 * t ** 2) : (r = 4.5 * Math.log(t + 1) + 2), Math.round(r * 10) / 1e3)
}
const aw = [...Array(25)].map((t, r) => {
  if (r === 0) return 'none'
  const l = ap(r)
  return `linear-gradient(rgba(255 255 255 / ${l}), rgba(255 255 255 / ${l}))`
})
function qv(t) {
  return {
    inputPlaceholder: t === 'dark' ? 0.5 : 0.42,
    inputUnderline: t === 'dark' ? 0.7 : 0.42,
    switchTrackDisabled: t === 'dark' ? 0.2 : 0.12,
    switchTrack: t === 'dark' ? 0.3 : 0.38,
  }
}
function Iv(t) {
  return t === 'dark' ? aw : []
}
function lw(t) {
  const { palette: r = { mode: 'light' }, opacity: l, overlays: o, colorSpace: s, ...u } = t,
    f = qp({ ...r, colorSpace: s })
  return { palette: f, opacity: { ...qv(f.mode), ...l }, overlays: o || Iv(f.mode), ...u }
}
function ow(t) {
  var r
  return (
    t[0] === 'motion' ||
    !!t[0].match(
      /(cssVarPrefix|colorSchemeSelector|modularCssLayers|rootSelector|typography|mixins|breakpoints|direction|transitions)/
    ) ||
    !!t[0].match(/sxConfig$/) ||
    (t[0] === 'palette' && !!((r = t[1]) != null && r.match(/(mode|contrastThreshold|tonalOffset)/)))
  )
}
const iw = t => [
    ...[...Array(25)].map((r, l) => `--${t ? `${t}-` : ''}overlays-${l}`),
    `--${t ? `${t}-` : ''}palette-AppBar-darkBg`,
    `--${t ? `${t}-` : ''}palette-AppBar-darkColor`,
  ],
  sw = t => (r, l) => {
    const o = t.rootSelector || ':root',
      s = t.colorSchemeSelector
    let u = s
    if (
      (s === 'class' && (u = '.%s'),
      s === 'data' && (u = '[data-%s]'),
      s != null && s.startsWith('data-') && !s.includes('%s') && (u = `[${s}="%s"]`),
      t.defaultColorScheme === r)
    ) {
      if (r === 'dark') {
        const f = {}
        return (
          iw(t.cssVarPrefix).forEach(p => {
            ;((f[p] = l[p]), delete l[p])
          }),
          u === 'media'
            ? { [o]: l, '@media (prefers-color-scheme: dark)': { [o]: f } }
            : u
              ? { [u.replace('%s', r)]: f, [`${o}, ${u.replace('%s', r)}`]: l }
              : { [o]: { ...l, ...f } }
        )
      }
      if (u && u !== 'media') return `${o}, ${u.replace('%s', String(r))}`
    } else if (r) {
      if (u === 'media') return { [`@media (prefers-color-scheme: ${String(r)})`]: { [o]: l } }
      if (u) return u.replace('%s', String(r))
    }
    return o
  }
function uw(t, r) {
  r.forEach(l => {
    t[l] || (t[l] = {})
  })
}
function J(t, r, l) {
  !t[r] && l && (t[r] = l)
}
function fi(t) {
  return typeof t != 'string' || !t.startsWith('hsl') ? t : Lv(t)
}
function Nr(t, r) {
  ;`${r}Channel` in t || (t[`${r}Channel`] = ci(fi(t[r])))
}
function cw(t) {
  return typeof t == 'number'
    ? `${t}px`
    : typeof t == 'string' || typeof t == 'function' || Array.isArray(t)
      ? t
      : '8px'
}
const tr = t => {
    try {
      return t()
    } catch {}
  },
  fw = (t = 'mui') => x2(t)
function Pd(t, r, l, o, s) {
  if (!l) return
  l = l === !0 ? {} : l
  const u = s === 'dark' ? 'dark' : 'light'
  if (!o) {
    r[s] = lw({ ...l, palette: { mode: u, ...(l == null ? void 0 : l.palette) }, colorSpace: t })
    return
  }
  const { palette: f, ...p } = rp({ ...o, palette: { mode: u, ...(l == null ? void 0 : l.palette) }, colorSpace: t })
  return (
    (r[s] = {
      ...l,
      palette: f,
      opacity: { ...qv(u), ...(l == null ? void 0 : l.opacity) },
      overlays: (l == null ? void 0 : l.overlays) || Iv(u),
    }),
    p
  )
}
function dw(t = {}, ...r) {
  const {
      colorSchemes: l = { light: !0 },
      defaultColorScheme: o,
      disableCssColorScheme: s = !1,
      cssVarPrefix: u = 'mui',
      nativeColor: f = !1,
      shouldSkipGeneratingVar: p = ow,
      colorSchemeSelector: h = l.light && l.dark ? 'media' : void 0,
      rootSelector: m = ':root',
      ...g
    } = t,
    b = Object.keys(l)[0],
    C = o || (l.light && b !== 'light' ? 'light' : b),
    v = fw(u),
    { [C]: w, light: R, dark: T, ...A } = l,
    O = { ...A }
  let M = w
  if ((((C === 'dark' && !('dark' in l)) || (C === 'light' && !('light' in l))) && (M = !0), !M))
    throw new Error(Lr(21, C))
  let z
  f && (z = 'oklch')
  const _ = Pd(z, O, M, g, C)
  ;(R && !O.light && Pd(z, O, R, void 0, 'light'), T && !O.dark && Pd(z, O, T, void 0, 'dark'))
  let k = {
    defaultColorScheme: C,
    ..._,
    cssVarPrefix: u,
    colorSchemeSelector: h,
    rootSelector: m,
    getCssVar: v,
    colorSchemes: O,
    font: { ...j2(_.typography), ..._.font },
    spacing: cw(g.spacing),
  }
  ;(Object.keys(k.colorSchemes).forEach(Z => {
    const x = k.colorSchemes[Z].palette,
      G = U => {
        const N = U.split('-'),
          H = N[1],
          W = N[2]
        return v(U, x[H][W])
      }
    ;(x.mode === 'light' && (J(x.common, 'background', '#fff'), J(x.common, 'onBackground', '#000')),
      x.mode === 'dark' && (J(x.common, 'background', '#000'), J(x.common, 'onBackground', '#fff')))
    function L(U, N, H) {
      if (z) {
        let W
        return (
          U === Ha && (W = `transparent ${((1 - H) * 100).toFixed(0)}%`),
          U === Ze && (W = `#000 ${(H * 100).toFixed(0)}%`),
          U === We && (W = `#fff ${(H * 100).toFixed(0)}%`),
          `color-mix(in ${z}, ${N}, ${W})`
        )
      }
      return U(N, H)
    }
    if (
      (uw(x, [
        'Alert',
        'AppBar',
        'Avatar',
        'Button',
        'Chip',
        'FilledInput',
        'LinearProgress',
        'Skeleton',
        'Slider',
        'SnackbarContent',
        'SpeedDialAction',
        'StepConnector',
        'StepContent',
        'Switch',
        'TableCell',
        'Tooltip',
      ]),
      x.mode === 'light')
    ) {
      ;(J(x.Alert, 'errorColor', L(Ze, f ? v('palette-error-light') : x.error.light, 0.6)),
        J(x.Alert, 'infoColor', L(Ze, f ? v('palette-info-light') : x.info.light, 0.6)),
        J(x.Alert, 'successColor', L(Ze, f ? v('palette-success-light') : x.success.light, 0.6)),
        J(x.Alert, 'warningColor', L(Ze, f ? v('palette-warning-light') : x.warning.light, 0.6)),
        J(x.Alert, 'errorFilledBg', G('palette-error-main')),
        J(x.Alert, 'infoFilledBg', G('palette-info-main')),
        J(x.Alert, 'successFilledBg', G('palette-success-main')),
        J(x.Alert, 'warningFilledBg', G('palette-warning-main')),
        J(
          x.Alert,
          'errorFilledColor',
          tr(() => x.getContrastText(x.error.main))
        ),
        J(
          x.Alert,
          'infoFilledColor',
          tr(() => x.getContrastText(x.info.main))
        ),
        J(
          x.Alert,
          'successFilledColor',
          tr(() => x.getContrastText(x.success.main))
        ),
        J(
          x.Alert,
          'warningFilledColor',
          tr(() => x.getContrastText(x.warning.main))
        ),
        J(x.Alert, 'errorStandardBg', L(We, f ? v('palette-error-light') : x.error.light, 0.9)),
        J(x.Alert, 'infoStandardBg', L(We, f ? v('palette-info-light') : x.info.light, 0.9)),
        J(x.Alert, 'successStandardBg', L(We, f ? v('palette-success-light') : x.success.light, 0.9)),
        J(x.Alert, 'warningStandardBg', L(We, f ? v('palette-warning-light') : x.warning.light, 0.9)),
        J(x.Alert, 'errorIconColor', G('palette-error-main')),
        J(x.Alert, 'infoIconColor', G('palette-info-main')),
        J(x.Alert, 'successIconColor', G('palette-success-main')),
        J(x.Alert, 'warningIconColor', G('palette-warning-main')),
        J(x.AppBar, 'defaultBg', G('palette-grey-100')),
        J(x.Avatar, 'defaultBg', G('palette-grey-400')),
        J(x.Button, 'inheritContainedBg', G('palette-grey-300')),
        J(x.Button, 'inheritContainedHoverBg', G('palette-grey-A100')),
        J(x.Chip, 'defaultBorder', G('palette-grey-400')),
        J(x.Chip, 'defaultAvatarColor', G('palette-grey-700')),
        J(x.Chip, 'defaultIconColor', G('palette-grey-700')),
        J(x.FilledInput, 'bg', 'rgba(0, 0, 0, 0.06)'),
        J(x.FilledInput, 'hoverBg', 'rgba(0, 0, 0, 0.09)'),
        J(x.FilledInput, 'disabledBg', 'rgba(0, 0, 0, 0.12)'),
        J(x.LinearProgress, 'primaryBg', L(We, f ? v('palette-primary-main') : x.primary.main, 0.62)),
        J(x.LinearProgress, 'secondaryBg', L(We, f ? v('palette-secondary-main') : x.secondary.main, 0.62)),
        J(x.LinearProgress, 'errorBg', L(We, f ? v('palette-error-main') : x.error.main, 0.62)),
        J(x.LinearProgress, 'infoBg', L(We, f ? v('palette-info-main') : x.info.main, 0.62)),
        J(x.LinearProgress, 'successBg', L(We, f ? v('palette-success-main') : x.success.main, 0.62)),
        J(x.LinearProgress, 'warningBg', L(We, f ? v('palette-warning-light') : x.warning.main, 0.62)),
        J(
          x.Skeleton,
          'bg',
          z
            ? L(Ha, f ? v('palette-text-primary') : x.text.primary, 0.11)
            : `rgba(${G('palette-text-primaryChannel')} / 0.11)`
        ),
        J(x.Slider, 'primaryTrack', L(We, f ? v('palette-primary-main') : x.primary.main, 0.62)),
        J(x.Slider, 'secondaryTrack', L(We, f ? v('palette-secondary-main') : x.secondary.main, 0.62)),
        J(x.Slider, 'errorTrack', L(We, f ? v('palette-error-main') : x.error.main, 0.62)),
        J(x.Slider, 'infoTrack', L(We, f ? v('palette-info-main') : x.info.main, 0.62)),
        J(x.Slider, 'successTrack', L(We, f ? v('palette-success-main') : x.success.main, 0.62)),
        J(x.Slider, 'warningTrack', L(We, f ? v('palette-warning-main') : x.warning.main, 0.62)))
      const U = z
        ? L(Ze, f ? v('palette-background-default') : x.background.default, 0.6825)
        : au(x.background.default, 0.8)
      ;(J(x.SnackbarContent, 'bg', U),
        J(
          x.SnackbarContent,
          'color',
          tr(() => (z ? np.text.primary : x.getContrastText(U)))
        ),
        J(x.SpeedDialAction, 'fabHoverBg', au(x.background.paper, 0.15)),
        J(x.StepConnector, 'border', G('palette-grey-400')),
        J(x.StepContent, 'border', G('palette-grey-400')),
        J(x.Switch, 'defaultColor', G('palette-common-white')),
        J(x.Switch, 'defaultDisabledColor', G('palette-grey-100')),
        J(x.Switch, 'primaryDisabledColor', L(We, f ? v('palette-primary-main') : x.primary.main, 0.62)),
        J(x.Switch, 'secondaryDisabledColor', L(We, f ? v('palette-secondary-main') : x.secondary.main, 0.62)),
        J(x.Switch, 'errorDisabledColor', L(We, f ? v('palette-error-main') : x.error.main, 0.62)),
        J(x.Switch, 'infoDisabledColor', L(We, f ? v('palette-info-main') : x.info.main, 0.62)),
        J(x.Switch, 'successDisabledColor', L(We, f ? v('palette-success-main') : x.success.main, 0.62)),
        J(x.Switch, 'warningDisabledColor', L(We, f ? v('palette-warning-main') : x.warning.main, 0.62)),
        J(x.TableCell, 'border', L(We, Ha(f ? v('palette-divider') : x.divider, 1), 0.88)),
        J(x.Tooltip, 'bg', L(Ha, f ? v('palette-grey-700') : x.grey[700], 0.92)))
    }
    if (x.mode === 'dark') {
      ;(J(x.Alert, 'errorColor', L(We, f ? v('palette-error-light') : x.error.light, 0.6)),
        J(x.Alert, 'infoColor', L(We, f ? v('palette-info-light') : x.info.light, 0.6)),
        J(x.Alert, 'successColor', L(We, f ? v('palette-success-light') : x.success.light, 0.6)),
        J(x.Alert, 'warningColor', L(We, f ? v('palette-warning-light') : x.warning.light, 0.6)),
        J(x.Alert, 'errorFilledBg', G('palette-error-dark')),
        J(x.Alert, 'infoFilledBg', G('palette-info-dark')),
        J(x.Alert, 'successFilledBg', G('palette-success-dark')),
        J(x.Alert, 'warningFilledBg', G('palette-warning-dark')),
        J(
          x.Alert,
          'errorFilledColor',
          tr(() => x.getContrastText(x.error.dark))
        ),
        J(
          x.Alert,
          'infoFilledColor',
          tr(() => x.getContrastText(x.info.dark))
        ),
        J(
          x.Alert,
          'successFilledColor',
          tr(() => x.getContrastText(x.success.dark))
        ),
        J(
          x.Alert,
          'warningFilledColor',
          tr(() => x.getContrastText(x.warning.dark))
        ),
        J(x.Alert, 'errorStandardBg', L(Ze, f ? v('palette-error-light') : x.error.light, 0.9)),
        J(x.Alert, 'infoStandardBg', L(Ze, f ? v('palette-info-light') : x.info.light, 0.9)),
        J(x.Alert, 'successStandardBg', L(Ze, f ? v('palette-success-light') : x.success.light, 0.9)),
        J(x.Alert, 'warningStandardBg', L(Ze, f ? v('palette-warning-light') : x.warning.light, 0.9)),
        J(x.Alert, 'errorIconColor', G('palette-error-main')),
        J(x.Alert, 'infoIconColor', G('palette-info-main')),
        J(x.Alert, 'successIconColor', G('palette-success-main')),
        J(x.Alert, 'warningIconColor', G('palette-warning-main')),
        J(x.AppBar, 'defaultBg', G('palette-grey-900')),
        J(x.AppBar, 'darkBg', G('palette-background-paper')),
        J(x.AppBar, 'darkColor', G('palette-text-primary')),
        J(x.Avatar, 'defaultBg', G('palette-grey-600')),
        J(x.Button, 'inheritContainedBg', G('palette-grey-800')),
        J(x.Button, 'inheritContainedHoverBg', G('palette-grey-700')),
        J(x.Chip, 'defaultBorder', G('palette-grey-700')),
        J(x.Chip, 'defaultAvatarColor', G('palette-grey-300')),
        J(x.Chip, 'defaultIconColor', G('palette-grey-300')),
        J(x.FilledInput, 'bg', 'rgba(255, 255, 255, 0.09)'),
        J(x.FilledInput, 'hoverBg', 'rgba(255, 255, 255, 0.13)'),
        J(x.FilledInput, 'disabledBg', 'rgba(255, 255, 255, 0.12)'),
        J(x.LinearProgress, 'primaryBg', L(Ze, f ? v('palette-primary-main') : x.primary.main, 0.5)),
        J(x.LinearProgress, 'secondaryBg', L(Ze, f ? v('palette-secondary-main') : x.secondary.main, 0.5)),
        J(x.LinearProgress, 'errorBg', L(Ze, f ? v('palette-error-main') : x.error.main, 0.5)),
        J(x.LinearProgress, 'infoBg', L(Ze, f ? v('palette-info-main') : x.info.main, 0.5)),
        J(x.LinearProgress, 'successBg', L(Ze, f ? v('palette-success-main') : x.success.main, 0.5)),
        J(x.LinearProgress, 'warningBg', L(Ze, f ? v('palette-warning-main') : x.warning.main, 0.5)),
        J(
          x.Skeleton,
          'bg',
          z
            ? L(Ha, f ? v('palette-text-primary') : x.text.primary, 0.13)
            : `rgba(${G('palette-text-primaryChannel')} / 0.13)`
        ),
        J(x.Slider, 'primaryTrack', L(Ze, f ? v('palette-primary-main') : x.primary.main, 0.5)),
        J(x.Slider, 'secondaryTrack', L(Ze, f ? v('palette-secondary-main') : x.secondary.main, 0.5)),
        J(x.Slider, 'errorTrack', L(Ze, f ? v('palette-error-main') : x.error.main, 0.5)),
        J(x.Slider, 'infoTrack', L(Ze, f ? v('palette-info-main') : x.info.main, 0.5)),
        J(x.Slider, 'successTrack', L(Ze, f ? v('palette-success-main') : x.success.main, 0.5)),
        J(x.Slider, 'warningTrack', L(Ze, f ? v('palette-warning-light') : x.warning.main, 0.5)))
      const U = z
        ? L(We, f ? v('palette-background-default') : x.background.default, 0.985)
        : au(x.background.default, 0.98)
      ;(J(x.SnackbarContent, 'bg', U),
        J(
          x.SnackbarContent,
          'color',
          tr(() => (z ? $v.text.primary : x.getContrastText(U)))
        ),
        J(x.SpeedDialAction, 'fabHoverBg', au(x.background.paper, 0.15)),
        J(x.StepConnector, 'border', G('palette-grey-600')),
        J(x.StepContent, 'border', G('palette-grey-600')),
        J(x.Switch, 'defaultColor', G('palette-grey-300')),
        J(x.Switch, 'defaultDisabledColor', G('palette-grey-600')),
        J(x.Switch, 'primaryDisabledColor', L(Ze, f ? v('palette-primary-main') : x.primary.main, 0.55)),
        J(x.Switch, 'secondaryDisabledColor', L(Ze, f ? v('palette-secondary-main') : x.secondary.main, 0.55)),
        J(x.Switch, 'errorDisabledColor', L(Ze, f ? v('palette-error-main') : x.error.main, 0.55)),
        J(x.Switch, 'infoDisabledColor', L(Ze, f ? v('palette-info-main') : x.info.main, 0.55)),
        J(x.Switch, 'successDisabledColor', L(Ze, f ? v('palette-success-main') : x.success.main, 0.55)),
        J(x.Switch, 'warningDisabledColor', L(Ze, f ? v('palette-warning-light') : x.warning.main, 0.55)),
        J(x.TableCell, 'border', L(Ze, Ha(f ? v('palette-divider') : x.divider, 1), 0.68)),
        J(x.Tooltip, 'bg', L(Ha, f ? v('palette-grey-700') : x.grey[700], 0.92)))
    }
    ;(f ||
      (Nr(x.background, 'default'),
      Nr(x.background, 'paper'),
      Nr(x.common, 'background'),
      Nr(x.common, 'onBackground'),
      Nr(x, 'divider')),
      Object.keys(x).forEach(U => {
        const N = x[U]
        U !== 'tonalOffset' &&
          !f &&
          N &&
          typeof N == 'object' &&
          (N.main && J(x[U], 'mainChannel', ci(fi(N.main))),
          N.light && J(x[U], 'lightChannel', ci(fi(N.light))),
          N.dark && J(x[U], 'darkChannel', ci(fi(N.dark))),
          N.contrastText && J(x[U], 'contrastTextChannel', ci(fi(N.contrastText))),
          U === 'text' && (Nr(x[U], 'primary'), Nr(x[U], 'secondary')),
          U === 'action' && (N.active && Nr(x[U], 'active'), N.selected && Nr(x[U], 'selected')))
      }))
  }),
    (k = r.reduce((Z, x) => ln(Z, x), k)))
  const V = {
      prefix: u,
      disableCssColorScheme: s,
      shouldSkipGeneratingVar: p,
      getSelector: sw(k),
      enableContrastVars: f,
    },
    { vars: Q, generateThemeVars: oe, generateStyleSheets: ce } = T2(k, V)
  return (
    (k.vars = Q),
    Object.entries(k.colorSchemes[k.defaultColorScheme]).forEach(([Z, x]) => {
      k[Z] = x
    }),
    (k.generateThemeVars = oe),
    (k.generateStyleSheets = ce),
    (k.generateSpacing = function () {
      return Nv(g.spacing, Lp(this))
    }),
    (k.getColorSchemeSelector = C2(h)),
    (k.spacing = k.generateSpacing()),
    (k.shouldSkipGeneratingVar = p),
    (k.unstable_sxConfig = { ...Ju, ...(g == null ? void 0 : g.unstable_sxConfig) }),
    (k.unstable_sx = function (x) {
      return Vl({ sx: x, theme: this })
    }),
    (k.internal_cache = {}),
    (k.toRuntimeSource = Pv),
    k
  )
}
function H0(t, r, l) {
  t.colorSchemes &&
    l &&
    (t.colorSchemes[r] = { ...(l !== !0 && l), palette: qp({ ...(l === !0 ? {} : l.palette), mode: r }) })
}
function Fv(t = {}, ...r) {
  const {
      palette: l,
      cssVariables: o = !1,
      colorSchemes: s = l ? void 0 : { light: !0 },
      defaultColorScheme: u = l == null ? void 0 : l.mode,
      ...f
    } = t,
    p = u || 'light',
    h = s == null ? void 0 : s[p],
    m = { ...s, ...(l ? { [p]: { ...(typeof h != 'boolean' && h), palette: l } } : void 0) }
  if (o === !1) {
    if (!('colorSchemes' in t)) return rp(t, ...r)
    let g = l
    'palette' in t || (m[p] && (m[p] !== !0 ? (g = m[p].palette) : p === 'dark' && (g = { mode: 'dark' })))
    const b = rp({ ...t, palette: g }, ...r)
    return (
      (b.defaultColorScheme = p),
      (b.colorSchemes = m),
      b.palette.mode === 'light' &&
        ((b.colorSchemes.light = { ...(m.light !== !0 && m.light), palette: b.palette }), H0(b, 'dark', m.dark)),
      b.palette.mode === 'dark' &&
        ((b.colorSchemes.dark = { ...(m.dark !== !0 && m.dark), palette: b.palette }), H0(b, 'light', m.light)),
      b
    )
  }
  return (
    !l && !('light' in m) && p === 'light' && (m.light = !0),
    dw({ ...f, colorSchemes: m, defaultColorScheme: p, ...(typeof o != 'boolean' && o) }, ...r)
  )
}
function Ou(t) {
  return typeof t == 'string'
}
function Yv(t, r = 166) {
  let l
  function o(...s) {
    const u = () => {
      t.apply(this, s)
    }
    ;(clearTimeout(l), (l = setTimeout(u, r)))
  }
  return (
    (o.clear = () => {
      clearTimeout(l)
    }),
    o
  )
}
function sn(...t) {
  const r = S.useRef(void 0),
    l = S.useCallback(o => {
      const s = t.map(u => {
        if (u == null) return null
        if (typeof u == 'function') {
          const f = u,
            p = f(o)
          return typeof p == 'function'
            ? p
            : () => {
                f(null)
              }
        }
        return (
          (u.current = o),
          () => {
            u.current = null
          }
        )
      })
      return () => {
        s.forEach(u => (u == null ? void 0 : u()))
      }
    }, t)
  return S.useMemo(
    () =>
      t.every(o => o == null)
        ? null
        : o => {
            ;(r.current && (r.current(), (r.current = void 0)), o != null && (r.current = l(o)))
          },
    t
  )
}
function Pt(t) {
  const r = S.useRef(t)
  return (
    on(() => {
      r.current = t
    }),
    S.useRef((...l) => (0, r.current)(...l)).current
  )
}
function tn(t) {
  return (t && t.ownerDocument) || document
}
function jr(t) {
  return tn(t).defaultView || window
}
function lu(t) {
  return parseInt(t, 10) || 0
}
const pw = {
  shadow: {
    visibility: 'hidden',
    position: 'absolute',
    overflow: 'hidden',
    height: 0,
    top: 0,
    left: 0,
    transform: 'translateZ(0)',
  },
}
function hw(t) {
  for (const r in t) return !1
  return !0
}
function P0(t) {
  return hw(t) || (t.outerHeightStyle === 0 && !t.overflowing)
}
const mw = S.forwardRef(function (r, l) {
    const { onChange: o, maxRows: s, minRows: u = 1, style: f, value: p, ...h } = r,
      { current: m } = S.useRef(p != null),
      g = S.useRef(null),
      b = sn(l, g),
      C = S.useRef(null),
      v = S.useRef(null),
      w = S.useCallback(() => {
        const M = g.current,
          z = v.current
        if (!M || !z) return
        const k = jr(M).getComputedStyle(M)
        if (k.width === '0px') return { outerHeightStyle: 0, overflowing: !1 }
        ;((z.style.width = k.width),
          (z.value = M.value || r.placeholder || 'x'),
          z.value.slice(-1) ===
            `
` && (z.value += ' '))
        const V = k.boxSizing,
          Q = lu(k.paddingBottom) + lu(k.paddingTop),
          oe = lu(k.borderBottomWidth) + lu(k.borderTopWidth),
          ce = z.scrollHeight
        z.value = 'x'
        const Z = z.scrollHeight
        let x = ce
        ;(u && (x = Math.max(Number(u) * Z, x)), s && (x = Math.min(Number(s) * Z, x)), (x = Math.max(x, Z)))
        const G = x + (V === 'border-box' ? Q + oe : 0),
          L = Math.abs(x - ce) <= 1
        return { outerHeightStyle: G, overflowing: L }
      }, [s, u, r.placeholder]),
      R = Pt(() => {
        const M = g.current,
          z = w()
        if (!M || !z || P0(z)) return !1
        const _ = z.outerHeightStyle
        return C.current != null && C.current !== _
      }),
      T = S.useCallback(() => {
        const M = g.current,
          z = w()
        if (!M || !z || P0(z)) return
        const _ = z.outerHeightStyle
        ;(C.current !== _ && ((C.current = _), (M.style.height = `${_}px`)),
          (M.style.overflow = z.overflowing ? 'hidden' : ''))
      }, [w]),
      A = S.useRef(-1)
    ;(on(() => {
      const M = Yv(T),
        z = g == null ? void 0 : g.current
      if (!z) return
      const _ = jr(z)
      _.addEventListener('resize', M)
      let k
      return (
        typeof ResizeObserver < 'u' &&
          ((k = new ResizeObserver(() => {
            R() &&
              (k.unobserve(z),
              cancelAnimationFrame(A.current),
              T(),
              (A.current = requestAnimationFrame(() => {
                k.observe(z)
              })))
          })),
          k.observe(z)),
        () => {
          ;(M.clear(), cancelAnimationFrame(A.current), _.removeEventListener('resize', M), k && k.disconnect())
        }
      )
    }, [w, T, R]),
      on(() => {
        T()
      }))
    const O = M => {
      m || T()
      const z = M.target,
        _ = z.value.length,
        k = z.value.endsWith(`
`),
        V = z.selectionStart === _
      ;(k && V && z.setSelectionRange(_, _), o && o(M))
    }
    return q.jsxs(S.Fragment, {
      children: [
        q.jsx('textarea', { value: p, onChange: O, ref: b, rows: u, style: f, ...h }),
        q.jsx('textarea', {
          'aria-hidden': !0,
          className: r.className,
          readOnly: !0,
          ref: v,
          tabIndex: -1,
          style: { ...pw.shadow, ...f, paddingTop: 0, paddingBottom: 0 },
        }),
      ],
    })
  }),
  Ip = S.createContext(void 0)
function to({ props: t, states: r }) {
  const l = S.useContext(Ip),
    o = {}
  return (
    r.forEach(s => {
      const u = t[s]
      o[s] = u === void 0 && l ? l[s] : u
    }),
    [o, l]
  )
}
const Fp = Fv()
function Li() {
  const t = tc(Fp)
  return t[Pu] || t
}
function gw(t) {
  return q.jsx(XC, { ...t, defaultTheme: Fp, themeId: Pu })
}
function Vv(t) {
  return t !== 'ownerState' && t !== 'theme' && t !== 'sx' && t !== 'as'
}
const Yn = t => Vv(t) && t !== 'classes',
  ye = kv({ themeId: Pu, defaultTheme: Fp, rootShouldForwardProp: Yn })
function yw(t) {
  return function (l) {
    return q.jsx(gw, { styles: typeof t == 'function' ? o => t({ theme: o, ...l }) : t })
  }
}
const ut = S2
function ot(t) {
  return y2(t)
}
function zr(t) {
  var l
  let r = t.activeElement
  for (; ((l = r == null ? void 0 : r.shadowRoot) == null ? void 0 : l.activeElement) != null;)
    r = r.shadowRoot.activeElement
  return r
}
function q0(t) {
  return t != null && !(Array.isArray(t) && t.length === 0)
}
function Mu(t, r = !1) {
  return t && ((q0(t.value) && t.value !== '') || (r && q0(t.defaultValue) && t.defaultValue !== ''))
}
function bw(t) {
  return t.startAdornment
}
function vw(t) {
  return Je('MuiInputBase', t)
}
const Gl = et('MuiInputBase', [
    'root',
    'formControl',
    'focused',
    'disabled',
    'adornedStart',
    'adornedEnd',
    'error',
    'sizeSmall',
    'multiline',
    'colorSecondary',
    'fullWidth',
    'hiddenLabel',
    'readOnly',
    'input',
    'inputTypeSearch',
  ]),
  Sw = { transition: 'none' }
function xw(t, r) {
  return t === 'always' ? r : t === 'system' ? { '@media (prefers-reduced-motion: reduce)': r } : null
}
const Yp = t => t.scrollTop,
  Gv = {},
  Rw = ['all'],
  Ew = {}
function Ln(t, r) {
  return l => {
    if (r) {
      const o = t.current
      l === void 0 ? r(o) : r(o, l)
    }
  }
}
function Kv(t, r, l, o, s, u) {
  const f = t === 'exited' && !r ? o : l[t] || l.exited
  return s || u ? { ...f, ...s, ...u } : f
}
function _u(t, r) {
  const { timeout: l, easing: o, style: s = Gv } = t
  return {
    duration: s.transitionDuration ?? (typeof l == 'number' ? l : l[r.mode] || 0),
    easing: s.transitionTimingFunction ?? (typeof o == 'object' ? o[r.mode] : o),
    delay: s.transitionDelay,
  }
}
function Vp(t, r) {
  var o
  const l = r ?? Sw
  return xw((o = t.motion) == null ? void 0 : o.reducedMotion, l)
}
function Ut(t, r = Rw, l = Ew) {
  var f, p
  const o = (p = (f = t.transitions) == null ? void 0 : f.create) == null ? void 0 : p.call(f, r, l),
    s = Vp(t)
  if (o === void 0) return s ?? Gv
  const u = { transition: o }
  return s ? { ...u, ...s } : u
}
var I0
const lp = 'mui-auto-fill',
  Nu = 'mui-auto-fill-cancel',
  lc = (t, r) => {
    const { ownerState: l } = t
    return [
      r.root,
      l.formControl && r.formControl,
      l.startAdornment && r.adornedStart,
      l.endAdornment && r.adornedEnd,
      l.error && r.error,
      l.size === 'small' && r.sizeSmall,
      l.multiline && r.multiline,
      l.color && r[`color${Oe(l.color)}`],
      l.fullWidth && r.fullWidth,
      l.hiddenLabel && r.hiddenLabel,
    ]
  },
  oc = (t, r) => {
    const { ownerState: l } = t
    return [r.input, l.type === 'search' && r.inputTypeSearch]
  },
  Tw = t => {
    const {
        classes: r,
        color: l,
        disabled: o,
        error: s,
        endAdornment: u,
        focused: f,
        formControl: p,
        fullWidth: h,
        hiddenLabel: m,
        multiline: g,
        readOnly: b,
        size: C,
        startAdornment: v,
        type: w,
      } = t,
      R = {
        root: [
          'root',
          `color${Oe(l)}`,
          o && 'disabled',
          s && 'error',
          h && 'fullWidth',
          f && 'focused',
          p && 'formControl',
          C && C !== 'medium' && `size${Oe(C)}`,
          g && 'multiline',
          v && 'adornedStart',
          u && 'adornedEnd',
          m && 'hiddenLabel',
          b && 'readOnly',
        ],
        input: ['input', o && 'disabled', w === 'search' && 'inputTypeSearch', b && 'readOnly'],
      }
    return tt(R, vw, r)
  },
  ic = ye('div', { name: 'MuiInputBase', slot: 'Root', overridesResolver: lc })(
    ut(({ theme: t }) => ({
      ...t.typography.body1,
      color: (t.vars || t).palette.text.primary,
      lineHeight: '1.4375em',
      boxSizing: 'border-box',
      position: 'relative',
      cursor: 'text',
      display: 'inline-flex',
      alignItems: 'center',
      [`&.${Gl.disabled}`]: { color: (t.vars || t).palette.text.disabled, cursor: 'default' },
      variants: [
        { props: ({ ownerState: r }) => r.multiline, style: { padding: '4px 0 5px' } },
        { props: ({ ownerState: r, size: l }) => r.multiline && l === 'small', style: { paddingTop: 1 } },
        { props: ({ ownerState: r }) => r.fullWidth, style: { width: '100%' } },
      ],
    }))
  ),
  sc = ye('input', { name: 'MuiInputBase', slot: 'Input', overridesResolver: oc })(
    ut(({ theme: t }) => {
      const r = t.palette.mode === 'light',
        l = {
          color: 'currentColor',
          ...(t.vars ? { opacity: t.vars.opacity.inputPlaceholder } : { opacity: r ? 0.42 : 0.5 }),
          ...Ut(t, 'opacity', { duration: t.transitions.duration.shorter }),
        },
        o = { opacity: '0 !important' },
        s = t.vars ? { opacity: t.vars.opacity.inputPlaceholder } : { opacity: r ? 0.42 : 0.5 }
      return {
        font: 'inherit',
        letterSpacing: 'inherit',
        color: 'currentColor',
        padding: '4px 0 5px',
        border: 0,
        boxSizing: 'content-box',
        background: 'none',
        height: '1.4375em',
        margin: 0,
        WebkitTapHighlightColor: 'transparent',
        display: 'block',
        minWidth: 0,
        width: '100%',
        '&::-webkit-input-placeholder': l,
        '&::-moz-placeholder': l,
        '&::-ms-input-placeholder': l,
        '&:focus': { outline: 0 },
        '&:invalid': { boxShadow: 'none' },
        '&::-webkit-search-decoration': { WebkitAppearance: 'none' },
        [`label[data-shrink=false] + .${Gl.formControl} &`]: {
          '&::-webkit-input-placeholder': o,
          '&::-moz-placeholder': o,
          '&::-ms-input-placeholder': o,
          '&:focus::-webkit-input-placeholder': s,
          '&:focus::-moz-placeholder': s,
          '&:focus::-ms-input-placeholder': s,
        },
        [`&.${Gl.disabled}`]: { opacity: 1, WebkitTextFillColor: (t.vars || t).palette.text.disabled },
        variants: [
          {
            props: ({ ownerState: u }) => !u.disableInjectingGlobalStyles,
            style: {
              animationName: Nu,
              animationDuration: '10ms',
              '&:-webkit-autofill': { animationDuration: '5000s', animationName: lp },
            },
          },
          { props: { size: 'small' }, style: { paddingTop: 1 } },
          {
            props: ({ ownerState: u }) => u.multiline,
            style: { height: 'auto', resize: 'none', padding: 0, paddingTop: 0 },
          },
          { props: { type: 'search' }, style: { MozAppearance: 'textfield' } },
        ],
      }
    })
  ),
  F0 = yw({
    [`@keyframes ${lp}`]: { from: { animationName: lp } },
    [`@keyframes ${Nu}`]: { from: { animationName: Nu } },
  }),
  Gp = S.forwardRef(function (r, l) {
    const o = ot({ props: r, name: 'MuiInputBase' }),
      {
        'aria-describedby': s,
        'aria-label': u,
        autoComplete: f,
        autoFocus: p,
        className: h,
        color: m,
        defaultValue: g,
        disabled: b,
        disableInjectingGlobalStyles: C,
        endAdornment: v,
        error: w,
        fullWidth: R = !1,
        id: T,
        inputComponent: A = 'input',
        inputProps: O = {},
        inputRef: M,
        margin: z,
        maxRows: _,
        minRows: k,
        multiline: V = !1,
        name: Q,
        onBlur: oe,
        onChange: ce,
        onClick: Z,
        onFocus: x,
        onKeyDown: G,
        onKeyUp: L,
        placeholder: U,
        readOnly: N,
        renderSuffix: H,
        rows: W,
        size: ue,
        slotProps: D = {},
        slots: I = {},
        startAdornment: ee,
        type: te = 'text',
        value: ie,
        ...pe
      } = o,
      le = O.value != null ? O.value : ie,
      { current: me } = S.useRef(le != null),
      fe = S.useRef(),
      Se = S.useCallback(De => {}, []),
      Me = sn(fe, M, O.ref, Se),
      [Ye, Ne] = S.useState(!1),
      [ze, Ee] = to({ props: o, states: ['color', 'disabled', 'error', 'hiddenLabel', 'size', 'required', 'filled'] })
    ;((ze.focused = Ee ? Ee.focused : Ye),
      S.useEffect(() => {
        !Ee && b && Ye && (Ne(!1), oe && oe())
      }, [Ee, b, Ye, oe]))
    const Ve = Ee && Ee.onFilled,
      ge = Ee && Ee.onEmpty,
      Te = S.useCallback(
        De => {
          Mu(De) ? Ve && Ve() : ge && ge()
        },
        [Ve, ge]
      )
    ;(on(() => {
      me && Te({ value: le })
    }, [le, Te, me]),
      on(() => {
        if (!p) return
        const De = fe.current
        if (!De) return
        const It = tn(De),
          kt = zr(It),
          Gn = kt == null || kt === It.body || kt === It.documentElement
        De === kt ? (Ee && Ee.onFocus ? Ee.onFocus() : Ne(!0)) : Gn && De.focus()
      }, [p]))
    const gt = De => {
        ;(x && x(De), O.onFocus && O.onFocus(De), Ee && Ee.onFocus ? Ee.onFocus(De) : Ne(!0))
      },
      He = De => {
        ;(oe && oe(De), O.onBlur && O.onBlur(De), Ee && Ee.onBlur ? Ee.onBlur(De) : Ne(!1))
      },
      un = (De, ...It) => {
        if (!me) {
          const kt = De.target || fe.current
          if (kt == null) throw new Error(Lr(1))
          Te({ value: kt.value })
        }
        ;(O.onChange && O.onChange(De, ...It), ce && ce(De, ...It))
      }
    S.useEffect(() => {
      Te(fe.current)
    }, [])
    const cn = De => {
      ;(fe.current && De.currentTarget === De.target && fe.current.focus(), Z && Z(De))
    }
    let nn = A,
      qt = O
    V &&
      nn === 'input' &&
      (W
        ? (qt = { type: void 0, minRows: W, maxRows: W, ...qt })
        : (qt = { type: void 0, maxRows: _, minRows: k, ...qt }),
      (nn = mw))
    const ya = De => {
      Te(De.animationName === Nu ? fe.current : { value: 'x' })
    }
    S.useEffect(() => {
      Ee && Ee.setAdornedStart(!!ee)
    }, [Ee, ee])
    const ur = {
        ...o,
        color: ze.color || 'primary',
        disabled: ze.disabled,
        endAdornment: v,
        error: ze.error,
        focused: ze.focused,
        formControl: Ee,
        fullWidth: R,
        hiddenLabel: ze.hiddenLabel,
        multiline: V,
        size: ze.size,
        startAdornment: ee,
        type: te,
      },
      Nt = Tw(ur),
      je = I.root || ic,
      ct = D.root || {},
      xt = I.input || sc
    return (
      (qt = { ...qt, ...D.input }),
      q.jsxs(S.Fragment, {
        children: [
          !C && typeof F0 == 'function' && (I0 || (I0 = q.jsx(F0, {}))),
          q.jsxs(je, {
            ...ct,
            ref: l,
            onClick: cn,
            ...pe,
            ...(!Ou(je) && { ownerState: { ...ur, ...ct.ownerState } }),
            className: Ae(Nt.root, ct.className, h, N && 'MuiInputBase-readOnly'),
            children: [
              ee,
              q.jsx(Ip.Provider, {
                value: null,
                children: q.jsx(xt, {
                  'aria-invalid': ze.error,
                  'aria-describedby': s,
                  'aria-label': u,
                  autoComplete: f,
                  autoFocus: p,
                  defaultValue: g,
                  disabled: ze.disabled,
                  id: T,
                  onAnimationStart: ya,
                  name: Q,
                  placeholder: U,
                  readOnly: N,
                  required: ze.required,
                  rows: W,
                  value: le,
                  onKeyDown: G,
                  onKeyUp: L,
                  type: te,
                  ...qt,
                  ...(!Ou(xt) && { as: nn, ownerState: { ...ur, ...qt.ownerState } }),
                  ref: Me,
                  className: Ae(Nt.input, qt.className, N && 'MuiInputBase-readOnly'),
                  onBlur: He,
                  onChange: un,
                  onFocus: gt,
                }),
              }),
              v,
              H ? H({ ...ze, startAdornment: ee }) : null,
            ],
          }),
        ],
      })
    )
  })
function Cw(t) {
  return Je('MuiFilledInput', t)
}
const Pa = {
  ...Gl,
  ...et('MuiFilledInput', [
    'root',
    'underline',
    'input',
    'adornedStart',
    'adornedEnd',
    'sizeSmall',
    'multiline',
    'hiddenLabel',
  ]),
}
function ww(t) {
  return Je('MuiFormHelperText', t)
}
const Y0 = et('MuiFormHelperText', [
  'root',
  'error',
  'disabled',
  'sizeSmall',
  'sizeMedium',
  'contained',
  'focused',
  'filled',
  'required',
])
function Aw(t) {
  return Je('MuiFormLabel', t)
}
const di = et('MuiFormLabel', [
  'root',
  'colorSecondary',
  'focused',
  'disabled',
  'error',
  'filled',
  'required',
  'asterisk',
])
function Ow(t) {
  return Je('MuiInput', t)
}
const ii = { ...Gl, ...et('MuiInput', ['root', 'underline', 'input']) }
function Mw(t) {
  return Je('MuiNativeSelect', t)
}
const Kp = et('MuiNativeSelect', [
  'root',
  'select',
  'multiple',
  'filled',
  'outlined',
  'standard',
  'disabled',
  'icon',
  'iconOpen',
  'iconFilled',
  'iconOutlined',
  'iconStandard',
  'nativeInput',
  'error',
])
function _w(t) {
  return Je('MuiOutlinedInput', t)
}
const nr = { ...Gl, ...et('MuiOutlinedInput', ['root', 'notchedOutline', 'input']) }
function V0(...t) {
  return t.reduce(
    (r, l) =>
      l == null
        ? r
        : function (...s) {
            ;(r.apply(this, s), l.apply(this, s))
          },
    () => {}
  )
}
function Nw(t) {
  return Je('MuiSvgIcon', t)
}
et('MuiSvgIcon', [
  'root',
  'colorPrimary',
  'colorSecondary',
  'colorAction',
  'colorError',
  'colorDisabled',
  'fontSizeInherit',
  'fontSizeSmall',
  'fontSizeMedium',
  'fontSizeLarge',
])
const Dw = t => {
    const { color: r, fontSize: l, classes: o } = t,
      s = { root: ['root', r !== 'inherit' && `color${Oe(r)}`, `fontSize${Oe(l)}`] }
    return tt(s, Nw, o)
  },
  Bw = ye('svg', {
    name: 'MuiSvgIcon',
    slot: 'Root',
    overridesResolver: (t, r) => {
      const { ownerState: l } = t
      return [r.root, l.color !== 'inherit' && r[`color${Oe(l.color)}`], r[`fontSize${Oe(l.fontSize)}`]]
    },
  })(
    ut(({ theme: t }) => {
      var r, l, o, s, u, f, p, h, m, g, b, C
      return {
        userSelect: 'none',
        width: '1em',
        height: '1em',
        display: 'inline-block',
        flexShrink: 0,
        ...Ut(t, 'fill', {
          duration: (l = (r = (t.vars ?? t).transitions) == null ? void 0 : r.duration) == null ? void 0 : l.shorter,
        }),
        variants: [
          { props: v => !v.hasSvgAsChild, style: { fill: 'currentColor' } },
          { props: { fontSize: 'inherit' }, style: { fontSize: 'inherit' } },
          {
            props: { fontSize: 'small' },
            style: {
              fontSize:
                ((s = (o = t.typography) == null ? void 0 : o.pxToRem) == null ? void 0 : s.call(o, 20)) || '1.25rem',
            },
          },
          {
            props: { fontSize: 'medium' },
            style: {
              fontSize:
                ((f = (u = t.typography) == null ? void 0 : u.pxToRem) == null ? void 0 : f.call(u, 24)) || '1.5rem',
            },
          },
          {
            props: { fontSize: 'large' },
            style: {
              fontSize:
                ((h = (p = t.typography) == null ? void 0 : p.pxToRem) == null ? void 0 : h.call(p, 35)) || '2.1875rem',
            },
          },
          ...Object.entries((t.vars ?? t).palette)
            .filter(([, v]) => v && v.main)
            .map(([v]) => {
              var w, R
              return {
                props: { color: v },
                style: { color: (R = (w = (t.vars ?? t).palette) == null ? void 0 : w[v]) == null ? void 0 : R.main },
              }
            }),
          {
            props: { color: 'action' },
            style: { color: (g = (m = (t.vars ?? t).palette) == null ? void 0 : m.action) == null ? void 0 : g.active },
          },
          {
            props: { color: 'disabled' },
            style: {
              color: (C = (b = (t.vars ?? t).palette) == null ? void 0 : b.action) == null ? void 0 : C.disabled,
            },
          },
          { props: { color: 'inherit' }, style: { color: void 0 } },
        ],
      }
    })
  ),
  op = S.forwardRef(function (r, l) {
    const o = ot({ props: r, name: 'MuiSvgIcon' }),
      {
        children: s,
        className: u,
        color: f = 'inherit',
        component: p = 'svg',
        fontSize: h = 'medium',
        htmlColor: m,
        inheritViewBox: g = !1,
        titleAccess: b,
        viewBox: C = '0 0 24 24',
        ...v
      } = o,
      w = S.isValidElement(s) && s.type === 'svg',
      R = {
        ...o,
        color: f,
        component: p,
        fontSize: h,
        instanceFontSize: r.fontSize,
        inheritViewBox: g,
        viewBox: C,
        hasSvgAsChild: w,
      },
      T = {}
    g || (T.viewBox = C)
    const A = Dw(R)
    return q.jsxs(Bw, {
      as: p,
      className: Ae(A.root, u),
      focusable: 'false',
      color: m,
      'aria-hidden': b ? void 0 : !0,
      role: b ? 'img' : void 0,
      ref: l,
      ...T,
      ...v,
      ...(w && s.props),
      ownerState: R,
      children: [w ? s.props.children : s, b ? q.jsx('title', { children: b }) : null],
    })
  })
op.muiName = 'SvgIcon'
function no(t, r) {
  function l(o, s) {
    return q.jsx(op, { 'data-testid': void 0, ref: s, ...o, children: t })
  }
  return ((l.muiName = op.muiName), S.memo(S.forwardRef(l)))
}
function ip(t, r) {
  typeof t == 'function' ? t(r) : t && (t.current = r)
}
function G0(t) {
  const { controlled: r, default: l, name: o, state: s = 'value' } = t,
    { current: u } = S.useRef(r !== void 0),
    [f, p] = S.useState(l),
    h = u ? r : f,
    m = S.useCallback(g => {
      u || p(g)
    }, [])
  return [h, m]
}
function Xv(t, r) {
  const l = t.charCodeAt(2)
  return t[0] === 'o' && t[1] === 'n' && l >= 65 && l <= 90 && typeof r == 'function'
}
function zw(t, r) {
  if (!t) return r
  function l(f, p) {
    const h = {}
    return (
      Object.keys(p).forEach(m => {
        Xv(m, p[m]) &&
          typeof f[m] == 'function' &&
          (h[m] = (...g) => {
            ;(f[m](...g), p[m](...g))
          })
      }),
      h
    )
  }
  if (typeof t == 'function' || typeof r == 'function')
    return f => {
      const p = typeof r == 'function' ? r(f) : r,
        h = typeof t == 'function' ? t({ ...f, ...p }) : t,
        m = Ae(f == null ? void 0 : f.className, p == null ? void 0 : p.className, h == null ? void 0 : h.className),
        g = l(h, p)
      return {
        ...p,
        ...h,
        ...g,
        ...(!!m && { className: m }),
        ...((p == null ? void 0 : p.style) && (h == null ? void 0 : h.style) && { style: { ...p.style, ...h.style } }),
        ...((p == null ? void 0 : p.sx) &&
          (h == null ? void 0 : h.sx) && {
            sx: [...(Array.isArray(p.sx) ? p.sx : [p.sx]), ...(Array.isArray(h.sx) ? h.sx : [h.sx])],
          }),
      }
    }
  const o = r,
    s = l(t, o),
    u = Ae(o == null ? void 0 : o.className, t == null ? void 0 : t.className)
  return {
    ...r,
    ...t,
    ...s,
    ...(!!u && { className: u }),
    ...((o == null ? void 0 : o.style) && (t == null ? void 0 : t.style) && { style: { ...o.style, ...t.style } }),
    ...((o == null ? void 0 : o.sx) &&
      (t == null ? void 0 : t.sx) && {
        sx: [...(Array.isArray(o.sx) ? o.sx : [o.sx]), ...(Array.isArray(t.sx) ? t.sx : [t.sx])],
      }),
  }
}
const K0 = {}
function Xp(t, r) {
  const l = S.useRef(K0)
  return (l.current === K0 && (l.current = t(r)), l)
}
function Uw(t) {
  const r = Xp(() => kw(t)).current
  return ((r.next = t), on(r.effect), r)
}
function kw(t) {
  const r = {
    current: t,
    next: t,
    effect: () => {
      r.current = r.next
    },
  }
  return r
}
const X0 = vp.createContext(null)
function Lw(t) {
  if (t == null) return { appear: void 0, enter: void 0, exit: void 0 }
  if (typeof t == 'number') return { appear: t, enter: t, exit: t }
  const r = t.enter,
    l = t.exit
  return { appear: t.appear !== void 0 ? t.appear : r, enter: r, exit: l }
}
function jw(t) {
  if (t.autoTimeout != null) return t.autoTimeout
  const r = Lw(t.timeout)
  return t.currentStatus === 'entering'
    ? t.isAppearing
      ? (r.appear ?? r.enter ?? null)
      : (r.enter ?? null)
    : (r.exit ?? null)
}
function Qv(t) {
  const {
      in: r = !1,
      appear: l = !1,
      enter: o = !0,
      exit: s = !0,
      mountOnEnter: u = !1,
      unmountOnExit: f = !1,
      timeout: p,
      addEndListener: h,
      reduceMotion: m = !1,
      getAutoTimeout: g,
      nodeRef: b,
      onEnter: C,
      onEntering: v,
      onEntered: w,
      onExit: R,
      onExiting: T,
      onExited: A,
      children: O,
      ...M
    } = t,
    z = S.useContext(X0),
    _ = z && !z.isMounting ? o : l,
    [k, V] = S.useState(() => (r ? (_ ? 'exited' : 'entered') : u || f ? 'unmounted' : 'exited')),
    Q = S.useRef(k)
  ;((Q.current = k), r && k === 'unmounted' && ((Q.current = 'exited'), V('exited')))
  const oe = S.useRef(r && _),
    ce = S.useRef(!1),
    Z = S.useRef(null),
    x = S.useRef(k),
    G = S.useRef(!1),
    L = S.useRef(m),
    U = Uw({
      timeout: p,
      addEndListener: h,
      reduceMotion: m,
      getAutoTimeout: g,
      onEnter: C,
      onEntering: v,
      onEntered: w,
      onExit: R,
      onExiting: T,
      onExited: A,
      enter: o,
      exit: s,
      mountOnEnter: u,
      unmountOnExit: f,
      nodeRef: b,
      parentGroup: z,
    }),
    N = S.useCallback(() => {
      Z.current !== null && (Z.current.cancel(), (Z.current = null))
    }, []),
    H = S.useCallback(ee => {
      let te = !0
      const ie = () => {
        te && ((te = !1), (Z.current = null), ee())
      }
      return (
        (ie.cancel = () => {
          te = !1
        }),
        (Z.current = ie),
        ie
      )
    }, []),
    W = S.useCallback(
      (ee, te) => {
        var ge, Te
        let ie
        const pe = () => {
            ie !== void 0 && (clearTimeout(ie), (ie = void 0))
          },
          le = H(() => {
            ;(pe(), (Q.current = ee), V(ee))
          }),
          me = le.cancel
        le.cancel = () => {
          ;(pe(), me())
        }
        const fe = U.current.nodeRef.current,
          Se = U.current.addEndListener,
          Me = U.current.getAutoTimeout !== void 0,
          Ye = (Te = (ge = U.current).getAutoTimeout) == null ? void 0 : Te.call(ge),
          Ne = jw({ currentStatus: te, isAppearing: G.current, timeout: U.current.timeout, autoTimeout: Ye }),
          ze = L.current,
          Ee = Ne ?? (ze && Me ? 0 : null),
          Ve = gt => {
            ie = setTimeout(le, gt)
          }
        if (!fe) {
          Ve(0)
          return
        }
        if (Se) {
          ;(Ee != null && Ve(ze ? 0 : Ee), Se.length >= 2 ? Se(fe, le) : Se(le))
          return
        }
        Ve(ze ? 0 : (Ne ?? 0))
      },
      [H, U]
    ),
    ue = S.useCallback(
      ee => {
        var pe
        const te = U.current,
          ie = te.parentGroup ? te.parentGroup.isMounting : ee
        if (((G.current = ie), !ee && !te.enter)) {
          ;((Q.current = 'entered'), V('entered'))
          return
        }
        ;((L.current = te.reduceMotion),
          (pe = te.onEnter) == null || pe.call(te, ie),
          (Q.current = 'entering'),
          V('entering'))
      },
      [U]
    ),
    D = S.useCallback(() => {
      var te
      const ee = U.current
      if (!ee.exit) {
        ;((Q.current = 'exited'), V('exited'))
        return
      }
      ;((L.current = ee.reduceMotion), (te = ee.onExit) == null || te.call(ee), (Q.current = 'exiting'), V('exiting'))
    }, [U]),
    I = S.useCallback(
      (ee, te) => {
        if ((N(), te === 'entering')) {
          const ie = U.current
          if (ie.mountOnEnter || ie.unmountOnExit) {
            const pe = ie.nodeRef.current
            pe && Yp(pe)
          }
          ue(ee)
        } else D()
      },
      [N, ue, D, U]
    )
  return (
    on(
      () => (
        (ce.current = !0),
        oe.current && ((oe.current = !1), I(!0, 'entering')),
        () => {
          ;((ce.current = !1), N())
        }
      ),
      [N, I]
    ),
    on(() => {
      if (!ce.current) return
      const ee = Q.current
      r
        ? ee !== 'entering' && ee !== 'entered' && I(!1, 'entering')
        : ee === 'entering' || ee === 'entered'
          ? I(!1, 'exiting')
          : ee === 'exited' && f && ((Q.current = 'unmounted'), V('unmounted'))
    }, [r, k, f, I]),
    on(() => {
      var ie, pe, le, me
      if (k === 'unmounted' || x.current === 'unmounted') {
        x.current = k
        return
      }
      if (x.current === k) return
      x.current = k
      const te = U.current
      k === 'entering'
        ? ((ie = te.onEntering) == null || ie.call(te, G.current), W('entered', 'entering'))
        : k === 'exiting'
          ? ((pe = te.onExiting) == null || pe.call(te), W('exited', 'exiting'))
          : k === 'entered'
            ? (le = te.onEntered) == null || le.call(te, G.current)
            : k === 'exited' && ((me = te.onExited) == null || me.call(te))
    }, [U, W, k]),
    k === 'unmounted' ? null : q.jsx(X0.Provider, { value: null, children: O(k, M) })
  )
}
const Zv = '(prefers-reduced-motion: reduce)',
  $w = 0,
  Hw = '0ms',
  Pw = () => {},
  Q0 = () => !1,
  qw = () => !0,
  Iw = () => Pw
function Fw(t) {
  const [r, l] = S.useState(() => ({ enabled: t, matches: t ? null : !1 }))
  let o = r.matches
  return (
    r.enabled !== t && ((o = null), t || (o = !1)),
    on(() => {
      const s = p => {
        l(h => (h.enabled === t && h.matches === p ? h : { enabled: t, matches: p }))
      }
      if (!t) {
        r.enabled && s(!1)
        return
      }
      if (typeof window > 'u' || typeof window.matchMedia != 'function') {
        s(!1)
        return
      }
      const u = window.matchMedia(Zv),
        f = () => {
          s(u.matches)
        }
      return (
        f(),
        u.addEventListener('change', f),
        () => {
          u.removeEventListener('change', f)
        }
      )
    }, [t, r.enabled]),
    o
  )
}
const Yw = { ...Eu },
  Wv = Yw.useSyncExternalStore
function Vw(t) {
  const r = t ? qw : Q0,
    [l, o] = S.useMemo(() => {
      if (!t || typeof window > 'u' || typeof window.matchMedia != 'function') return [Q0, Iw]
      const s = window.matchMedia(Zv)
      return [
        () => s.matches,
        u => (
          s.addEventListener('change', u),
          () => {
            s.removeEventListener('change', u)
          }
        ),
      ]
    }, [t])
  return Wv(o, l, r)
}
const Gw = Wv !== void 0 ? Vw : Fw
function Qp(t, r) {
  const l = Gw(!r && t === 'system'),
    o = !r && (t === 'always' || (t === 'system' && l !== !1))
  return S.useMemo(
    () => ({
      shouldReduceMotion: o,
      getTransitionTiming(s) {
        return o ? { duration: $w, delay: Hw } : s
      },
    }),
    [o]
  )
}
function Jv(t, r, l) {
  return t === void 0 || Ou(t) ? r : { ...r, ownerState: { ...r.ownerState, ...l } }
}
function e1(t, r, l) {
  return typeof t == 'function' ? t(r, l) : t
}
function t1(t) {
  if (t === void 0) return {}
  const r = {}
  for (const l of Object.keys(t)) Xv(l, t[l]) && (r[l] = t[l])
  return r
}
function Z0(t) {
  if (t === void 0) return {}
  const r = {}
  return (
    Object.keys(t)
      .filter(l => !(l.match(/^on[A-Z]/) && typeof t[l] == 'function'))
      .forEach(l => {
        r[l] = t[l]
      }),
    r
  )
}
function n1(t) {
  const { getSlotProps: r, additionalProps: l, externalSlotProps: o, externalForwardedProps: s, className: u } = t
  if (!r) {
    const v = Ae(
        l == null ? void 0 : l.className,
        u,
        s == null ? void 0 : s.className,
        o == null ? void 0 : o.className
      ),
      w = { ...(l == null ? void 0 : l.style), ...(s == null ? void 0 : s.style), ...(o == null ? void 0 : o.style) },
      R = { ...l, ...s, ...o }
    return (
      v.length > 0 && (R.className = v),
      Object.keys(w).length > 0 && (R.style = w),
      { props: R, internalRef: void 0 }
    )
  }
  const f = t1({ ...s, ...o }),
    p = Z0(o),
    h = Z0(s),
    m = r(f),
    g = Ae(
      m == null ? void 0 : m.className,
      l == null ? void 0 : l.className,
      u,
      s == null ? void 0 : s.className,
      o == null ? void 0 : o.className
    ),
    b = {
      ...(m == null ? void 0 : m.style),
      ...(l == null ? void 0 : l.style),
      ...(s == null ? void 0 : s.style),
      ...(o == null ? void 0 : o.style),
    },
    C = { ...m, ...l, ...h, ...p }
  return (
    g.length > 0 && (C.className = g),
    Object.keys(b).length > 0 && (C.style = b),
    { props: C, internalRef: m.ref }
  )
}
function St(t, r) {
  const {
      className: l,
      elementType: o,
      ownerState: s,
      externalForwardedProps: u,
      internalForwardedProps: f,
      shouldForwardComponentProp: p = !1,
      ...h
    } = r,
    { component: m, slots: g = { [t]: void 0 }, slotProps: b = { [t]: void 0 }, ...C } = u,
    v = g[t] || o,
    w = e1(b[t], s),
    {
      props: { component: R, ...T },
      internalRef: A,
    } = n1({ className: l, ...h, externalForwardedProps: t === 'root' ? C : void 0, externalSlotProps: w }),
    O = sn(A, w == null ? void 0 : w.ref, r.ref),
    M = t === 'root' ? R || m : R,
    z = Jv(
      v,
      {
        ...(t === 'root' && !m && !g[t] && f),
        ...(t !== 'root' && !g[t] && f),
        ...T,
        ...(M && !p && { as: M }),
        ...(M && p && { component: M }),
        ref: O,
      },
      s
    )
  return [v, z]
}
function Kw(t) {
  return Je('MuiPaper', t)
}
et('MuiPaper', [
  'root',
  'rounded',
  'outlined',
  'elevation',
  'elevation0',
  'elevation1',
  'elevation2',
  'elevation3',
  'elevation4',
  'elevation5',
  'elevation6',
  'elevation7',
  'elevation8',
  'elevation9',
  'elevation10',
  'elevation11',
  'elevation12',
  'elevation13',
  'elevation14',
  'elevation15',
  'elevation16',
  'elevation17',
  'elevation18',
  'elevation19',
  'elevation20',
  'elevation21',
  'elevation22',
  'elevation23',
  'elevation24',
])
const Xw = t => {
    const { square: r, elevation: l, variant: o, classes: s } = t,
      u = { root: ['root', o, !r && 'rounded', o === 'elevation' && `elevation${l}`] }
    return tt(u, Kw, s)
  },
  Qw = ye('div', {
    name: 'MuiPaper',
    slot: 'Root',
    overridesResolver: (t, r) => {
      const { ownerState: l } = t
      return [r.root, r[l.variant], !l.square && r.rounded, l.variant === 'elevation' && r[`elevation${l.elevation}`]]
    },
  })(
    ut(({ theme: t }) => ({
      backgroundColor: (t.vars || t).palette.background.paper,
      color: (t.vars || t).palette.text.primary,
      ...Ut(t, 'box-shadow'),
      variants: [
        { props: ({ ownerState: r }) => !r.square, style: { borderRadius: t.shape.borderRadius } },
        { props: { variant: 'outlined' }, style: { border: `1px solid ${(t.vars || t).palette.divider}` } },
        {
          props: { variant: 'elevation' },
          style: { boxShadow: 'var(--Paper-shadow)', backgroundImage: 'var(--Paper-overlay)' },
        },
      ],
    }))
  ),
  uc = S.forwardRef(function (r, l) {
    var v
    const o = ot({ props: r, name: 'MuiPaper' }),
      s = Li(),
      { className: u, component: f = 'div', elevation: p = 1, square: h = !1, variant: m = 'elevation', ...g } = o,
      b = { ...o, component: f, elevation: p, square: h, variant: m },
      C = Xw(b)
    return q.jsx(Qw, {
      as: f,
      ownerState: b,
      className: Ae(C.root, u),
      ref: l,
      ...g,
      style: {
        ...(m === 'elevation' && {
          '--Paper-shadow': (s.vars || s).shadows[p],
          ...(s.vars && { '--Paper-overlay': (v = s.vars.overlays) == null ? void 0 : v[p] }),
          ...(!s.vars &&
            s.palette.mode === 'dark' && {
              '--Paper-overlay': `linear-gradient(${Ai('#fff', ap(p))}, ${Ai('#fff', ap(p))})`,
            }),
        }),
        ...g.style,
      },
    })
  })
function Du(t) {
  try {
    return t.matches(':focus-visible')
  } catch {}
  return !1
}
function Zw(t) {
  const { focusableWhenDisabled: r, disabled: l, composite: o = !1, tabIndex: s = 0, isNativeButton: u } = t,
    f = o && r !== !1,
    p = o && r === !1
  return S.useMemo(() => {
    const m = {
      onKeyDown(g) {
        l && r && g.key !== 'Tab' && g.preventDefault()
      },
    }
    return (
      o || ((m.tabIndex = s), !u && l && (m.tabIndex = r ? s : -1)),
      ((u && (r || f)) || (!u && l)) && (m['aria-disabled'] = l),
      u && (!r || p) && (m.disabled = l),
      m
    )
  }, [o, l, r, f, p, u, s])
}
const Ww = {}
function Jw(t) {
  const {
      nativeButton: r,
      disabled: l,
      type: o,
      hasFormAction: s = !1,
      tabIndex: u = 0,
      focusableWhenDisabled: f,
      stopEventPropagation: p = !1,
      onBeforeKeyDown: h,
      onBeforeKeyUp: m,
    } = t,
    g = S.useRef(null),
    b = f === !0,
    C = Zw({ focusableWhenDisabled: b, disabled: l, isNativeButton: r, tabIndex: u }),
    v = S.useCallback(() => {
      const T = g.current
      return T == null ? r : T.tagName === 'BUTTON' ? !0 : !!(T.tagName === 'A' && T.href)
    }, [r]),
    w = S.useMemo(() => {
      const T = b ? {} : { tabIndex: l ? -1 : u }
      return (
        r
          ? ((T.type = o === void 0 && !s ? 'button' : o), b || (T.disabled = l))
          : ((T.role = 'button'), !b && l && (T['aria-disabled'] = l)),
        b ? { ...T, ...C } : T
      )
    }, [l, b, C, s, r, u, o])
  return {
    getButtonProps: S.useCallback(
      (T = Ww) => {
        const { onClick: A, onKeyDown: O, onKeyUp: M, ...z } = T
        return {
          ...w,
          ...z,
          onClick: Q => {
            if ((p && Q.stopPropagation(), l)) {
              Q.preventDefault()
              return
            }
            A == null || A(Q)
          },
          onKeyDown: Q => {
            if (
              (b && C.onKeyDown(Q),
              !l && (h == null || h(Q), O == null || O(Q), !(Q.target !== Q.currentTarget || v())))
            ) {
              if (Q.key === ' ') {
                Q.preventDefault()
                return
              }
              Q.key === 'Enter' && (Q.preventDefault(), Q.currentTarget.click())
            }
          },
          onKeyUp: Q => {
            l ||
              (m == null || m(Q),
              M == null || M(Q),
              Q.target === Q.currentTarget && !v() && Q.key === ' ' && !Q.defaultPrevented && Q.currentTarget.click())
          },
        }
      },
      [w, l, b, C, v, h, m, p]
    ),
    rootRef: g,
  }
}
class Bu {
  constructor() {
    ti(this, 'mountEffect', () => {
      this.shouldMount && !this.didMount && this.ref.current !== null && ((this.didMount = !0), this.mounted.resolve())
    })
    ;((this.ref = { current: null }),
      (this.mounted = null),
      (this.didMount = !1),
      (this.shouldMount = !1),
      (this.setShouldMount = null))
  }
  static create() {
    return new Bu()
  }
  static use() {
    const r = Xp(Bu.create).current,
      [l, o] = S.useState(!1)
    return ((r.shouldMount = l), (r.setShouldMount = o), S.useEffect(r.mountEffect, [l]), r)
  }
  mount() {
    return (
      this.mounted || ((this.mounted = tA()), (this.shouldMount = !0), this.setShouldMount(this.shouldMount)),
      this.mounted
    )
  }
  start(...r) {
    this.mount().then(() => {
      var l
      return (l = this.ref.current) == null ? void 0 : l.start(...r)
    })
  }
  stop(...r) {
    this.mount().then(() => {
      var l
      return (l = this.ref.current) == null ? void 0 : l.stop(...r)
    })
  }
  pulsate(...r) {
    this.mount().then(() => {
      var l
      return (l = this.ref.current) == null ? void 0 : l.pulsate(...r)
    })
  }
}
function eA() {
  return Bu.use()
}
function tA() {
  let t, r
  const l = new Promise((o, s) => {
    ;((t = o), (r = s))
  })
  return ((l.resolve = t), (l.reject = r), l)
}
const nA = []
function r1(t) {
  S.useEffect(t, nA)
}
class Zp {
  constructor() {
    ti(this, 'currentId', null)
    ti(this, 'clear', () => {
      this.currentId !== null && (clearTimeout(this.currentId), (this.currentId = null))
    })
    ti(this, 'disposeEffect', () => this.clear)
  }
  static create() {
    return new Zp()
  }
  start(r, l) {
    ;(this.clear(),
      (this.currentId = setTimeout(() => {
        ;((this.currentId = null), l())
      }, r)))
  }
}
function pi() {
  const t = Xp(Zp.create).current
  return (r1(t.disposeEffect), t)
}
function rA(t) {
  const {
      className: r,
      classes: l,
      pulsate: o = !1,
      rippleX: s,
      rippleY: u,
      rippleSize: f,
      in: p,
      onExited: h,
      timeout: m,
    } = t,
    [g, b] = S.useState(!1),
    C = pi(),
    v = S.useRef(!1),
    w = S.useRef(h)
  w.current = h
  const R = h != null,
    T = Ae(r, l.ripple, l.rippleVisible, o && l.ripplePulsate),
    A = { width: f, height: f, top: -(f / 2) + u, left: -(f / 2) + s },
    O = Ae(l.child, g && l.childLeaving, o && l.childPulsate)
  return (
    !p && !g && b(!0),
    S.useEffect(() => {
      !p && R
        ? v.current ||
          ((v.current = !0),
          C.start(m, () => {
            var M
            ;((v.current = !1), (M = w.current) == null || M.call(w))
          }))
        : ((v.current = !1), C.clear())
    }, [C, R, p, m]),
    q.jsx('span', { className: T, style: A, children: q.jsx('span', { className: O }) })
  )
}
const an = et('MuiTouchRipple', [
    'root',
    'ripple',
    'rippleVisible',
    'ripplePulsate',
    'child',
    'childLeaving',
    'childPulsate',
  ]),
  sp = 550,
  aA = 80,
  ou = {},
  W0 = [],
  lA = () => {}
function qd(t, r) {
  const l = new Set(r),
    o = new Map()
  let s = []
  for (const f of t) l.has(f) ? s.length > 0 && (o.set(f, s), (s = [])) : s.push(f)
  const u = []
  for (const f of r) {
    const p = o.get(f)
    ;(p && u.push(...p), u.push(f))
  }
  return (u.push(...s), u)
}
function oA({ event: t, element: r, center: l }) {
  const o = r ? r.getBoundingClientRect() : { width: 0, height: 0, left: 0, top: 0 }
  let s, u
  if (l || t === void 0 || (t.clientX === 0 && t.clientY === 0) || (!t.clientX && !t.touches))
    ((s = Math.round(o.width / 2)), (u = Math.round(o.height / 2)))
  else {
    const { clientX: p, clientY: h } = t.touches && t.touches.length > 0 ? t.touches[0] : t
    ;((s = Math.round(p - o.left)), (u = Math.round(h - o.top)))
  }
  let f
  if (l) ((f = Math.sqrt((2 * o.width ** 2 + o.height ** 2) / 3)), f % 2 === 0 && (f += 1))
  else {
    const p = Math.max(Math.abs((r ? r.clientWidth : 0) - s), s) * 2 + 2,
      h = Math.max(Math.abs((r ? r.clientHeight : 0) - u), u) * 2 + 2
    f = Math.sqrt(p ** 2 + h ** 2)
  }
  return { rippleX: s, rippleY: u, rippleSize: f }
}
const iA = zi`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`,
  sA = zi`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`,
  uA = zi`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`
function cA(t) {
  if (t.motion.reducedMotion === 'always') return null
  const r = Ti`
    &.${an.rippleVisible} {
      animation-name: ${iA};
      animation-duration: ${sp}ms;
      animation-timing-function: ${t.transitions.easing.easeInOut};
    }

    &.${an.ripplePulsate} {
      animation-duration: ${t.transitions.duration.shorter}ms;
    }

    & .${an.childLeaving} {
      animation-name: ${sA};
      animation-duration: ${sp}ms;
      animation-timing-function: ${t.transitions.easing.easeInOut};
    }

    & .${an.childPulsate} {
      animation-name: ${uA};
      animation-duration: 2500ms;
      animation-timing-function: ${t.transitions.easing.easeInOut};
      animation-iteration-count: infinite;
      animation-delay: 200ms;
    }
  `
  return t.motion.reducedMotion === 'system'
    ? Ti`
      @media (prefers-reduced-motion: no-preference) {
        ${r}
      }
    `
    : r
}
const fA = ye('span', { name: 'MuiTouchRipple', slot: 'Root' })({
    overflow: 'hidden',
    pointerEvents: 'none',
    position: 'absolute',
    zIndex: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: 'inherit',
  }),
  dA = ye(rA, { name: 'MuiTouchRipple', slot: 'Ripple' })`
  opacity: 0;
  position: absolute;

  &.${an.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
  }

  /*
   * Order matters: 'child', 'childLeaving' and 'childPulsate' apply to the same
   * element with equal specificity, so the later rule wins. 'child' must come
   * before 'childLeaving' so the leaving 'opacity: 0' takes precedence. A focus
   * (pulsate) ripple keeps 'pulsateKeyframe' (no opacity animation) on exit, so
   * it relies on this static 'opacity: 0' to disappear on blur instead of
   * lingering until removal.
   */
  & .${an.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${an.childLeaving} {
    opacity: 0;
  }

  & .${an.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
  }

  ${({ theme: t }) => cA(t)}
`,
  pA = S.forwardRef(function (r, l) {
    const o = ot({ props: r, name: 'MuiTouchRipple' }),
      s = Li(),
      u = Qp(s.motion.reducedMotion, !1),
      { center: f = !1, classes: p = ou, className: h, ...m } = o,
      [g, b] = S.useState({ items: W0, order: W0 }),
      C = g.items,
      v = S.useRef(0),
      w = S.useRef(null),
      R = S.useRef(!1)
    ;(r1(
      () => (
        (R.current = !0),
        () => {
          R.current = !1
        }
      )
    ),
      S.useEffect(() => {
        w.current && (w.current(), (w.current = null))
      }, [C]))
    const T = S.useRef(!1),
      A = pi(),
      O = S.useRef(null),
      M = S.useRef(null),
      z = Pt(Z => {
        R.current &&
          b(x => {
            const G = x.items.filter(U => U.key !== Z),
              L = qd(
                x.order.filter(U => U !== Z),
                G.filter(U => !U.exiting).map(U => U.key)
              )
            return { items: G, order: L }
          })
      }),
      _ = Pt(Z => {
        const { pulsate: x, rippleX: G, rippleY: L, rippleSize: U, cb: N } = Z,
          H = v.current
        ;((v.current += 1),
          b(W => {
            const ue = [...W.items, { key: H, pulsate: x, rippleX: G, rippleY: L, rippleSize: U, exiting: !1 }]
            return {
              items: ue,
              order: qd(
                W.order,
                ue.filter(D => !D.exiting).map(D => D.key)
              ),
            }
          }),
          (w.current = N))
      }),
      k = Pt((Z = ou, x = ou, G = lA) => {
        const { pulsate: L = !1, center: U = f || x.pulsate, fakeElement: N = !1 } = x
        if ((Z == null ? void 0 : Z.type) === 'mousedown' && T.current) {
          T.current = !1
          return
        }
        ;(Z == null ? void 0 : Z.type) === 'touchstart' && (T.current = !0)
        const H = N ? null : M.current,
          { rippleX: W, rippleY: ue, rippleSize: D } = oA({ event: Z, element: H, center: U })
        Z != null && Z.touches
          ? O.current === null &&
            ((O.current = () => {
              _({ pulsate: L, rippleX: W, rippleY: ue, rippleSize: D, cb: G })
            }),
            A.start(aA, () => {
              O.current && (O.current(), (O.current = null))
            }))
          : _({ pulsate: L, rippleX: W, rippleY: ue, rippleSize: D, cb: G })
      }),
      V = Pt(() => {
        k(ou, { pulsate: !0 })
      }),
      Q = Pt((Z, x) => {
        if ((A.clear(), (Z == null ? void 0 : Z.type) === 'touchend' && O.current)) {
          ;(O.current(),
            (O.current = null),
            A.start(0, () => {
              Q(Z, x)
            }))
          return
        }
        ;((O.current = null),
          b(G => {
            const L = G.items.findIndex(N => !N.exiting)
            if (L === -1) return G
            const U = G.items.slice()
            return (
              (U[L] = { ...U[L], exiting: !0 }),
              {
                items: U,
                order: qd(
                  G.order,
                  U.filter(N => !N.exiting).map(N => N.key)
                ),
              }
            )
          }),
          (w.current = x))
      })
    S.useImperativeHandle(l, () => ({ pulsate: V, start: k, stop: Q }), [V, k, Q])
    const oe = new Map(C.map(Z => [Z.key, Z])),
      ce = g.order.map(Z => oe.get(Z)).filter(Boolean)
    return q.jsx(fA, {
      className: Ae(an.root, p.root, h),
      ref: M,
      ...m,
      children: ce.map(Z =>
        q.jsx(
          dA,
          {
            classes: {
              ripple: Ae(p.ripple, an.ripple),
              rippleVisible: Ae(p.rippleVisible, an.rippleVisible),
              ripplePulsate: Ae(p.ripplePulsate, an.ripplePulsate),
              child: Ae(p.child, an.child),
              childLeaving: Ae(p.childLeaving, an.childLeaving),
              childPulsate: Ae(p.childPulsate, an.childPulsate),
            },
            timeout: u.shouldReduceMotion ? 0 : sp,
            pulsate: Z.pulsate,
            rippleX: Z.rippleX,
            rippleY: Z.rippleY,
            rippleSize: Z.rippleSize,
            in: !Z.exiting,
            onExited: () => z(Z.key),
          },
          Z.key
        )
      ),
    })
  })
function hA(t) {
  return Je('MuiButtonBase', t)
}
const mA = et('MuiButtonBase', ['root', 'disabled', 'focusVisible']),
  gA = t => {
    const { disabled: r, focusVisible: l, focusVisibleClassName: o, suppressFocusVisible: s, classes: u } = t,
      p = tt({ root: ['root', r && 'disabled', l && !s && 'focusVisible'] }, hA, u)
    return (l && !s && o && (p.root += ` ${o}`), p)
  },
  yA = ye('button', { name: 'MuiButtonBase', slot: 'Root' })({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    boxSizing: 'border-box',
    WebkitTapHighlightColor: 'transparent',
    backgroundColor: 'transparent',
    outline: 0,
    border: 0,
    margin: 0,
    borderRadius: 0,
    padding: 0,
    cursor: 'pointer',
    userSelect: 'none',
    verticalAlign: 'middle',
    MozAppearance: 'none',
    WebkitAppearance: 'none',
    textDecoration: 'none',
    color: 'inherit',
    '&::-moz-focus-inner': { borderStyle: 'none' },
    [`&.${mA.disabled}`]: { pointerEvents: 'none', cursor: 'default' },
    '@media print': { colorAdjust: 'exact' },
  }),
  a1 = S.forwardRef(function (r, l) {
    const o = ot({ props: r, name: 'MuiButtonBase' }),
      {
        action: s,
        centerRipple: u = !1,
        children: f,
        className: p,
        component: h = 'button',
        disabled: m = !1,
        disableRipple: g = !1,
        disableTouchRipple: b = !1,
        focusRipple: C = !1,
        focusVisibleClassName: v,
        focusableWhenDisabled: w,
        suppressFocusVisible: R = !1,
        internalNativeButton: T,
        LinkComponent: A = 'a',
        nativeButton: O,
        onBlur: M,
        onClick: z,
        onContextMenu: _,
        onDragLeave: k,
        onFocus: V,
        onFocusVisible: Q,
        onKeyDown: oe,
        onKeyUp: ce,
        onMouseDown: Z,
        onMouseLeave: x,
        onMouseUp: G,
        onTouchEnd: L,
        onTouchMove: U,
        onTouchStart: N,
        tabIndex: H = 0,
        TouchRippleProps: W,
        touchRippleRef: ue,
        type: D,
        ...I
      } = o,
      ee = !!(I.href || I.to),
      te = !!I.formAction
    let ie = h
    ie === 'button' && ee && (ie = A)
    const le = O ?? (typeof ie == 'string' ? ie === 'button' : (T ?? !1)),
      me = eA(),
      fe = sn(me.ref, ue),
      [Se, Me] = S.useState(!1)
    ;(m || R) && Se && Me(!1)
    const Ye = Pt(it => {
        C &&
          !it.repeat &&
          Se &&
          it.key === ' ' &&
          me.stop(it, () => {
            me.start(it)
          })
      }),
      Ne = Pt(it => {
        C &&
          it.key === ' ' &&
          Se &&
          !it.defaultPrevented &&
          me.stop(it, () => {
            me.pulsate(it)
          })
      }),
      { getButtonProps: ze, rootRef: Ee } = Jw({
        nativeButton: le,
        disabled: m,
        type: D,
        hasFormAction: te,
        tabIndex: H,
        onBeforeKeyDown: Ye,
        onBeforeKeyUp: Ne,
      }),
      { onClick: Ve, onKeyDown: ge, onKeyUp: Te, ...gt } = ze({ onClick: z, onKeyDown: oe, onKeyUp: ce })
    S.useImperativeHandle(
      s,
      () => ({
        focusVisible: () => {
          ;(Me(!0), Ee.current.focus())
        },
      }),
      [Ee]
    )
    const He = me.shouldMount && !g && !m
    S.useEffect(() => {
      Se && C && !g && me.pulsate()
    }, [g, C, Se, me])
    const un = Dr(me, 'start', Z, b),
      cn = Dr(me, 'stop', _, b),
      nn = Dr(me, 'stop', k, b),
      qt = Dr(me, 'stop', G, b),
      ya = Dr(
        me,
        'stop',
        it => {
          ;(Se && it.preventDefault(), x && x(it))
        },
        b
      ),
      ur = Dr(me, 'start', N, b),
      Nt = Dr(me, 'stop', L, b),
      je = Dr(me, 'stop', U, b),
      ct = Dr(
        me,
        'stop',
        it => {
          ;(Du(it.target) || Me(!1), M && M(it))
        },
        !1
      ),
      xt = Pt(it => {
        ;(Ee.current || (Ee.current = it.currentTarget), !R && Du(it.target) && (Me(!0), Q && Q(it)), V && V(it))
      }),
      De = {}
    ee && ((De.tabIndex = m ? -1 : H), m && (De['aria-disabled'] = m), (De.type = D))
    const It = sn(l, Ee),
      kt = {
        ...o,
        centerRipple: u,
        component: h,
        disabled: m,
        disableRipple: g,
        disableTouchRipple: b,
        focusRipple: C,
        suppressFocusVisible: R,
        tabIndex: H,
        focusVisible: Se,
      },
      Gn = gA(kt)
    return q.jsxs(yA, {
      as: ie,
      className: Ae(Gn.root, p),
      ownerState: kt,
      onBlur: ct,
      onClick: Ve,
      onContextMenu: cn,
      onFocus: xt,
      onKeyDown: ge,
      onKeyUp: Te,
      onMouseDown: un,
      onMouseLeave: ya,
      onMouseUp: qt,
      onDragLeave: nn,
      onTouchEnd: Nt,
      onTouchMove: je,
      onTouchStart: ur,
      ref: It,
      ...(ee ? De : gt),
      ...I,
      children: [f, He ? q.jsx(pA, { ref: fe, center: u, ...W }) : null],
    })
  })
function Dr(t, r, l, o = !1) {
  return Pt(s => (l && l(s), o || t[r](s), !0))
}
function bA(t) {
  return typeof t.main == 'string'
}
function vA(t, r = []) {
  if (!bA(t)) return !1
  for (const l of r) if (!t.hasOwnProperty(l) || typeof t[l] != 'string') return !1
  return !0
}
function wn(t = []) {
  return ([, r]) => r && vA(r, t)
}
function SA(t) {
  return Je('MuiAlert', t)
}
const J0 = et('MuiAlert', [
  'root',
  'action',
  'icon',
  'message',
  'filled',
  'colorSuccess',
  'colorInfo',
  'colorWarning',
  'colorError',
  'outlined',
  'standard',
])
function xA(t) {
  return Je('MuiCircularProgress', t)
}
et('MuiCircularProgress', [
  'root',
  'determinate',
  'indeterminate',
  'colorPrimary',
  'colorSecondary',
  'svg',
  'track',
  'circle',
  'circleDisableShrink',
])
const In = 44,
  up = zi`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`,
  cp = zi`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: -126px;
  }
`,
  RA =
    typeof up != 'string'
      ? Ti`
        animation: ${up} 1.4s linear infinite;
      `
      : null,
  EA =
    typeof cp != 'string'
      ? Ti`
        animation: ${cp} 1.4s ease-in-out infinite;
      `
      : null,
  TA = t => {
    const { classes: r, variant: l, color: o, disableShrink: s } = t,
      u = {
        root: ['root', l, `color${Oe(o)}`],
        svg: ['svg'],
        track: ['track'],
        circle: ['circle', s && 'circleDisableShrink'],
      }
    return tt(u, xA, r)
  },
  CA = ye('span', {
    name: 'MuiCircularProgress',
    slot: 'Root',
    overridesResolver: (t, r) => {
      const { ownerState: l } = t
      return [r.root, r[l.variant], r[`color${Oe(l.color)}`]]
    },
  })(
    ut(({ theme: t }) => {
      const r = Vp(t, { animation: 'none' })
      return {
        display: 'inline-block',
        variants: [
          { props: { variant: 'determinate' }, style: { ...Ut(t, 'transform') } },
          { props: { variant: 'indeterminate' }, style: RA || { animation: `${up} 1.4s linear infinite` } },
          ...(r ? [{ props: { variant: 'indeterminate' }, style: r }] : []),
          ...Object.entries(t.palette)
            .filter(wn())
            .map(([l]) => ({ props: { color: l }, style: { color: (t.vars || t).palette[l].main } })),
        ],
      }
    })
  ),
  wA = ye('svg', { name: 'MuiCircularProgress', slot: 'Svg' })({ display: 'block' }),
  AA = ye('circle', {
    name: 'MuiCircularProgress',
    slot: 'Circle',
    overridesResolver: (t, r) => {
      const { ownerState: l } = t
      return [r.circle, l.disableShrink && r.circleDisableShrink]
    },
  })(
    ut(({ theme: t }) => {
      const r = Vp(t, { animation: 'none' })
      return {
        stroke: 'currentColor',
        variants: [
          { props: { variant: 'determinate' }, style: { ...Ut(t, 'stroke-dashoffset') } },
          { props: { variant: 'indeterminate' }, style: { strokeDasharray: '80px, 200px', strokeDashoffset: 0 } },
          {
            props: ({ ownerState: l }) => l.variant === 'indeterminate' && !l.disableShrink,
            style: EA || { animation: `${cp} 1.4s ease-in-out infinite` },
          },
          ...(r ? [{ props: ({ ownerState: l }) => l.variant === 'indeterminate' && !l.disableShrink, style: r }] : []),
        ],
      }
    })
  ),
  OA = ye('circle', { name: 'MuiCircularProgress', slot: 'Track' })(
    ut(({ theme: t }) => ({ stroke: 'currentColor', opacity: (t.vars || t).palette.action.activatedOpacity }))
  ),
  l1 = S.forwardRef(function (r, l) {
    const o = ot({ props: r, name: 'MuiCircularProgress' }),
      {
        className: s,
        color: u = 'primary',
        disableShrink: f = !1,
        enableTrackSlot: p = !1,
        min: h,
        max: m,
        size: g = 40,
        style: b,
        thickness: C = 3.6,
        value: v = o.min ?? 0,
        variant: w = 'indeterminate',
        ...R
      } = o,
      T = h ?? 0,
      A = m ?? 100,
      O = { ...o, color: u, disableShrink: f, size: g, thickness: C, value: v, variant: w, enableTrackSlot: p },
      M = TA(O),
      z = {},
      _ = {},
      k = {}
    if (w === 'determinate') {
      const V = 2 * Math.PI * ((In - C) / 2),
        Q = A - T
      ;((z.strokeDasharray = V.toFixed(3)),
        (z.strokeDashoffset = Q > 0 ? `${(((A - v) / Q) * V).toFixed(3)}px` : `${V.toFixed(3)}px`),
        (_.transform = 'rotate(-90deg)'),
        (k['aria-valuenow'] = v),
        (k['aria-valuemin'] = T),
        (k['aria-valuemax'] = A))
    }
    return q.jsx(CA, {
      className: Ae(M.root, s),
      style: { width: g, height: g, ..._, ...b },
      ownerState: O,
      ref: l,
      role: 'progressbar',
      ...k,
      ...R,
      children: q.jsxs(wA, {
        className: M.svg,
        ownerState: O,
        viewBox: `${In / 2} ${In / 2} ${In} ${In}`,
        children: [
          p
            ? q.jsx(OA, {
                className: M.track,
                ownerState: O,
                cx: In,
                cy: In,
                r: (In - C) / 2,
                fill: 'none',
                strokeWidth: C,
                'aria-hidden': 'true',
              })
            : null,
          q.jsx(AA, {
            className: M.circle,
            style: z,
            ownerState: O,
            cx: In,
            cy: In,
            r: (In - C) / 2,
            fill: 'none',
            strokeWidth: C,
          }),
        ],
      }),
    })
  })
function MA(t) {
  return Je('MuiIconButton', t)
}
const eb = et('MuiIconButton', [
    'root',
    'disabled',
    'colorInherit',
    'colorPrimary',
    'colorSecondary',
    'colorError',
    'colorInfo',
    'colorSuccess',
    'colorWarning',
    'edgeStart',
    'edgeEnd',
    'sizeSmall',
    'sizeMedium',
    'sizeLarge',
    'loading',
    'loadingIndicator',
    'loadingWrapper',
  ]),
  _A = t => {
    const { classes: r, disabled: l, color: o, edge: s, size: u, loading: f } = t,
      p = {
        root: [
          'root',
          f && 'loading',
          l && 'disabled',
          o !== 'default' && `color${Oe(o)}`,
          s && `edge${Oe(s)}`,
          `size${Oe(u)}`,
        ],
        loadingIndicator: ['loadingIndicator'],
        loadingWrapper: ['loadingWrapper'],
      }
    return tt(p, MA, r)
  },
  NA = ye(a1, {
    name: 'MuiIconButton',
    slot: 'Root',
    overridesResolver: (t, r) => {
      const { ownerState: l } = t
      return [
        r.root,
        l.loading && r.loading,
        l.color !== 'default' && r[`color${Oe(l.color)}`],
        l.edge && r[`edge${Oe(l.edge)}`],
        r[`size${Oe(l.size)}`],
      ]
    },
  })(
    ut(({ theme: t }) => ({
      textAlign: 'center',
      flex: '0 0 auto',
      fontSize: t.typography.pxToRem(24),
      padding: 8,
      borderRadius: '50%',
      color: (t.vars || t).palette.action.active,
      ...Ut(t, 'background-color', { duration: t.transitions.duration.shortest }),
      variants: [
        {
          props: r => !r.disableRipple,
          style: {
            '--IconButton-hoverBg': t.alpha(
              (t.vars || t).palette.action.active,
              (t.vars || t).palette.action.hoverOpacity
            ),
            '&:hover': {
              backgroundColor: 'var(--IconButton-hoverBg)',
              '@media (hover: none)': { backgroundColor: 'transparent' },
            },
          },
        },
        { props: { edge: 'start' }, style: { marginLeft: -12 } },
        { props: { edge: 'start', size: 'small' }, style: { marginLeft: -3 } },
        { props: { edge: 'end' }, style: { marginRight: -12 } },
        { props: { edge: 'end', size: 'small' }, style: { marginRight: -3 } },
      ],
    })),
    ut(({ theme: t }) => ({
      variants: [
        { props: { color: 'inherit' }, style: { color: 'inherit' } },
        ...Object.entries(t.palette)
          .filter(wn())
          .map(([r]) => ({
            props: { color: r },
            style: {
              color: (t.vars || t).palette[r].main,
              '--IconButton-hoverBg': t.alpha((t.vars || t).palette[r].main, (t.vars || t).palette.action.hoverOpacity),
            },
          })),
        { props: { size: 'small' }, style: { padding: 5, fontSize: t.typography.pxToRem(18) } },
        { props: { size: 'large' }, style: { padding: 12, fontSize: t.typography.pxToRem(28) } },
      ],
      [`&.${eb.disabled}`]: { backgroundColor: 'transparent', color: (t.vars || t).palette.action.disabled },
      [`&.${eb.loading}`]: { color: 'transparent' },
    }))
  ),
  DA = ye('span', { name: 'MuiIconButton', slot: 'LoadingIndicator' })(({ theme: t }) => ({
    display: 'none',
    position: 'absolute',
    visibility: 'visible',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: (t.vars || t).palette.action.disabled,
    variants: [{ props: { loading: !0 }, style: { display: 'flex' } }],
  })),
  BA = S.forwardRef(function (r, l) {
    const o = ot({ props: r, name: 'MuiIconButton' }),
      {
        edge: s = !1,
        children: u,
        className: f,
        color: p = 'default',
        disabled: h = !1,
        disableFocusRipple: m = !1,
        size: g = 'medium',
        id: b,
        loading: C = null,
        loadingIndicator: v,
        ...w
      } = o,
      R = Oi(b),
      T = v ?? q.jsx(l1, { 'aria-labelledby': R, color: 'inherit', size: 16 }),
      A = { ...o, edge: s, color: p, disabled: h, disableFocusRipple: m, loading: C, loadingIndicator: T, size: g },
      O = _A(A)
    return q.jsxs(NA, {
      id: C ? R : b,
      className: Ae(O.root, f),
      centerRipple: !0,
      internalNativeButton: !0,
      focusRipple: !m,
      disabled: h || C,
      ref: l,
      ...w,
      ownerState: A,
      children: [
        typeof C == 'boolean' &&
          q.jsx('span', {
            className: O.loadingWrapper,
            style: { display: 'contents' },
            children: q.jsx(DA, { className: O.loadingIndicator, ownerState: A, children: C && T }),
          }),
        u,
      ],
    })
  }),
  zA = no(
    q.jsx('path', {
      d: 'M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z',
    })
  ),
  UA = no(q.jsx('path', { d: 'M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z' })),
  kA = no(
    q.jsx('path', {
      d: 'M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z',
    })
  ),
  LA = no(
    q.jsx('path', {
      d: 'M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z',
    })
  ),
  jA = no(
    q.jsx('path', {
      d: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
    })
  ),
  $A = t => {
    const { variant: r, color: l, severity: o, classes: s } = t,
      u = { root: ['root', `color${Oe(l || o)}`, `${r}`], icon: ['icon'], message: ['message'], action: ['action'] }
    return tt(u, SA, s)
  },
  HA = ye(uc, {
    name: 'MuiAlert',
    slot: 'Root',
    overridesResolver: (t, r) => {
      const { ownerState: l } = t
      return [r.root, r[l.variant]]
    },
  })(
    ut(({ theme: t }) => {
      const r = t.palette.mode === 'light' ? t.darken : t.lighten,
        l = t.palette.mode === 'light' ? t.lighten : t.darken
      return {
        ...t.typography.body2,
        backgroundColor: 'transparent',
        display: 'flex',
        padding: '6px 16px',
        variants: [
          ...Object.entries(t.palette)
            .filter(wn(['light']))
            .map(([o]) => ({
              props: { colorSeverity: o, variant: 'standard' },
              style: {
                color: t.vars ? t.vars.palette.Alert[`${o}Color`] : r(t.palette[o].light, 0.6),
                backgroundColor: t.vars ? t.vars.palette.Alert[`${o}StandardBg`] : l(t.palette[o].light, 0.9),
                [`& .${J0.icon}`]: t.vars
                  ? { color: t.vars.palette.Alert[`${o}IconColor`] }
                  : { color: t.palette[o].main },
              },
            })),
          ...Object.entries(t.palette)
            .filter(wn(['light']))
            .map(([o]) => ({
              props: { colorSeverity: o, variant: 'outlined' },
              style: {
                color: t.vars ? t.vars.palette.Alert[`${o}Color`] : r(t.palette[o].light, 0.6),
                border: `1px solid ${(t.vars || t).palette[o].light}`,
                [`& .${J0.icon}`]: t.vars
                  ? { color: t.vars.palette.Alert[`${o}IconColor`] }
                  : { color: t.palette[o].main },
              },
            })),
          ...Object.entries(t.palette)
            .filter(wn(['dark']))
            .map(([o]) => ({
              props: { colorSeverity: o, variant: 'filled' },
              style: {
                fontWeight: t.typography.fontWeightMedium,
                ...(t.vars
                  ? {
                      color: t.vars.palette.Alert[`${o}FilledColor`],
                      backgroundColor: t.vars.palette.Alert[`${o}FilledBg`],
                    }
                  : {
                      backgroundColor: t.palette.mode === 'dark' ? t.palette[o].dark : t.palette[o].main,
                      color: t.palette.getContrastText(t.palette[o].main),
                    }),
              },
            })),
        ],
      }
    })
  ),
  PA = ye('div', { name: 'MuiAlert', slot: 'Icon' })({
    marginRight: 12,
    padding: '7px 0',
    display: 'flex',
    fontSize: 22,
    opacity: 0.9,
  }),
  qA = ye('div', { name: 'MuiAlert', slot: 'Message' })({ padding: '8px 0', minWidth: 0, overflow: 'auto' }),
  IA = ye('div', { name: 'MuiAlert', slot: 'Action' })({
    display: 'flex',
    alignItems: 'flex-start',
    padding: '4px 0 0 16px',
    marginLeft: 'auto',
    marginRight: -8,
  }),
  tb = {
    success: q.jsx(zA, { fontSize: 'inherit' }),
    warning: q.jsx(UA, { fontSize: 'inherit' }),
    error: q.jsx(kA, { fontSize: 'inherit' }),
    info: q.jsx(LA, { fontSize: 'inherit' }),
  },
  FA = S.forwardRef(function (r, l) {
    const o = ot({ props: r, name: 'MuiAlert' }),
      {
        action: s,
        children: u,
        className: f,
        closeText: p = 'Close',
        color: h,
        icon: m,
        iconMapping: g = tb,
        onClose: b,
        role: C = 'alert',
        severity: v = 'success',
        slotProps: w = {},
        slots: R = {},
        variant: T = 'standard',
        ...A
      } = o,
      O = { ...o, color: h, severity: v, variant: T, colorSeverity: h || v },
      M = $A(O),
      z = { slots: R, slotProps: w },
      [_, k] = St('root', {
        ref: l,
        shouldForwardComponentProp: !0,
        className: Ae(M.root, f),
        elementType: HA,
        externalForwardedProps: { ...z, ...A },
        ownerState: O,
        additionalProps: { role: C, elevation: 0 },
      }),
      [V, Q] = St('icon', { className: M.icon, elementType: PA, externalForwardedProps: z, ownerState: O }),
      [oe, ce] = St('message', { className: M.message, elementType: qA, externalForwardedProps: z, ownerState: O }),
      [Z, x] = St('action', { className: M.action, elementType: IA, externalForwardedProps: z, ownerState: O }),
      [G, L] = St('closeButton', { elementType: BA, externalForwardedProps: z, ownerState: O }),
      [U, N] = St('closeIcon', { elementType: jA, externalForwardedProps: z, ownerState: O })
    return q.jsxs(_, {
      ...k,
      children: [
        m !== !1 ? q.jsx(V, { ...Q, children: m || g[v] || tb[v] }) : null,
        q.jsx(oe, { ...ce, children: u }),
        s != null ? q.jsx(Z, { ...x, children: s }) : null,
        s == null && b
          ? q.jsx(Z, {
              ...x,
              children: q.jsx(G, {
                size: 'small',
                'aria-label': p,
                title: p,
                color: 'inherit',
                onClick: b,
                ...L,
                children: q.jsx(U, { fontSize: 'small', ...N }),
              }),
            })
          : null,
      ],
    })
  })
function YA(t) {
  return Je('MuiTypography', t)
}
et('MuiTypography', [
  'root',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'subtitle1',
  'subtitle2',
  'body1',
  'body2',
  'inherit',
  'button',
  'caption',
  'overline',
  'alignLeft',
  'alignRight',
  'alignCenter',
  'alignJustify',
  'noWrap',
  'gutterBottom',
])
const VA = t => {
    const { align: r, gutterBottom: l, noWrap: o, variant: s, classes: u } = t,
      f = { root: ['root', s, t.align !== 'inherit' && `align${Oe(r)}`, l && 'gutterBottom', o && 'noWrap'] }
    return tt(f, YA, u)
  },
  GA = ye('span', {
    name: 'MuiTypography',
    slot: 'Root',
    overridesResolver: (t, r) => {
      const { ownerState: l } = t
      return [
        r.root,
        l.variant && r[l.variant],
        l.align !== 'inherit' && r[`align${Oe(l.align)}`],
        l.noWrap && r.noWrap,
        l.gutterBottom && r.gutterBottom,
      ]
    },
  })(
    ut(({ theme: t }) => {
      var r
      return {
        margin: 0,
        variants: [
          {
            props: { variant: 'inherit' },
            style: { font: 'inherit', lineHeight: 'inherit', letterSpacing: 'inherit' },
          },
          ...Object.entries(t.typography)
            .filter(([l, o]) => l !== 'inherit' && o && typeof o == 'object')
            .map(([l, o]) => ({ props: { variant: l }, style: o })),
          ...Object.entries(t.palette)
            .filter(wn())
            .map(([l]) => ({ props: { color: l }, style: { color: (t.vars || t).palette[l].main } })),
          ...Object.entries(((r = t.palette) == null ? void 0 : r.text) || {})
            .filter(([, l]) => typeof l == 'string')
            .map(([l]) => ({ props: { color: `text${Oe(l)}` }, style: { color: (t.vars || t).palette.text[l] } })),
          { props: ({ ownerState: l }) => l.align !== 'inherit', style: { textAlign: 'var(--Typography-textAlign)' } },
          {
            props: ({ ownerState: l }) => l.noWrap,
            style: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
          },
          { props: ({ ownerState: l }) => l.gutterBottom, style: { marginBottom: '0.35em' } },
        ],
      }
    })
  ),
  nb = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    subtitle1: 'h6',
    subtitle2: 'h6',
    body1: 'p',
    body2: 'p',
    inherit: 'p',
  },
  Ur = S.forwardRef(function (r, l) {
    const o = ot({ props: r, name: 'MuiTypography' }),
      {
        color: s,
        align: u = 'inherit',
        className: f,
        component: p,
        gutterBottom: h = !1,
        noWrap: m = !1,
        variant: g = 'body1',
        variantMapping: b = nb,
        ...C
      } = o,
      v = {
        ...o,
        align: u,
        color: s,
        className: f,
        component: p,
        gutterBottom: h,
        noWrap: m,
        variant: g,
        variantMapping: b,
      },
      w = p || b[g] || nb[g] || 'span',
      R = VA(v)
    return q.jsx(GA, {
      as: w,
      ref: l,
      className: Ae(R.root, f),
      ...C,
      ownerState: v,
      style: { ...(u !== 'inherit' && { '--Typography-textAlign': u }), ...C.style },
    })
  })
function KA(t) {
  return Je('MuiAppBar', t)
}
et('MuiAppBar', [
  'root',
  'positionFixed',
  'positionAbsolute',
  'positionSticky',
  'positionStatic',
  'positionRelative',
  'colorDefault',
  'colorPrimary',
  'colorSecondary',
  'colorInherit',
  'colorTransparent',
  'colorError',
  'colorInfo',
  'colorSuccess',
  'colorWarning',
])
const XA = t => {
    const { color: r, position: l, classes: o } = t,
      s = { root: ['root', `color${Oe(r)}`, `position${Oe(l)}`] }
    return tt(s, KA, o)
  },
  rb = (t, r) => (t ? `${t.replace(')', '')}, ${r})` : r),
  QA = ye(uc, {
    name: 'MuiAppBar',
    slot: 'Root',
    overridesResolver: (t, r) => {
      const { ownerState: l } = t
      return [r.root, r[`position${Oe(l.position)}`], r[`color${Oe(l.color)}`]]
    },
  })(
    ut(({ theme: t }) => ({
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      boxSizing: 'border-box',
      flexShrink: 0,
      variants: [
        {
          props: { position: 'fixed' },
          style: {
            position: 'fixed',
            zIndex: (t.vars || t).zIndex.appBar,
            top: 0,
            left: 'auto',
            right: 0,
            '@media print': { position: 'absolute' },
          },
        },
        {
          props: { position: 'absolute' },
          style: { position: 'absolute', zIndex: (t.vars || t).zIndex.appBar, top: 0, left: 'auto', right: 0 },
        },
        {
          props: { position: 'sticky' },
          style: { position: 'sticky', zIndex: (t.vars || t).zIndex.appBar, top: 0, left: 'auto', right: 0 },
        },
        { props: { position: 'static' }, style: { position: 'static' } },
        { props: { position: 'relative' }, style: { position: 'relative' } },
        { props: { color: 'inherit' }, style: { '--AppBar-color': 'inherit', color: 'var(--AppBar-color)' } },
        {
          props: { color: 'default' },
          style: {
            '--AppBar-background': t.vars ? t.vars.palette.AppBar.defaultBg : t.palette.grey[100],
            '--AppBar-color': t.vars ? t.vars.palette.text.primary : t.palette.getContrastText(t.palette.grey[100]),
            ...t.applyStyles('dark', {
              '--AppBar-background': t.vars ? t.vars.palette.AppBar.defaultBg : t.palette.grey[900],
              '--AppBar-color': t.vars ? t.vars.palette.text.primary : t.palette.getContrastText(t.palette.grey[900]),
            }),
          },
        },
        ...Object.entries(t.palette)
          .filter(wn(['contrastText']))
          .map(([r]) => ({
            props: { color: r },
            style: {
              '--AppBar-background': (t.vars ?? t).palette[r].main,
              '--AppBar-color': (t.vars ?? t).palette[r].contrastText,
            },
          })),
        {
          props: r => r.enableColorOnDark === !0 && !['inherit', 'transparent'].includes(r.color),
          style: { backgroundColor: 'var(--AppBar-background)', color: 'var(--AppBar-color)' },
        },
        {
          props: r => r.enableColorOnDark === !1 && !['inherit', 'transparent'].includes(r.color),
          style: {
            backgroundColor: 'var(--AppBar-background)',
            color: 'var(--AppBar-color)',
            ...t.applyStyles('dark', {
              backgroundColor: t.vars ? rb(t.vars.palette.AppBar.darkBg, 'var(--AppBar-background)') : null,
              color: t.vars ? rb(t.vars.palette.AppBar.darkColor, 'var(--AppBar-color)') : null,
            }),
          },
        },
        {
          props: { color: 'transparent' },
          style: {
            '--AppBar-background': 'transparent',
            '--AppBar-color': 'inherit',
            backgroundColor: 'var(--AppBar-background)',
            color: 'var(--AppBar-color)',
            ...t.applyStyles('dark', { backgroundImage: 'none' }),
          },
        },
      ],
    }))
  ),
  ZA = S.forwardRef(function (r, l) {
    const o = ot({ props: r, name: 'MuiAppBar' }),
      { className: s, color: u = 'primary', enableColorOnDark: f = !1, position: p = 'fixed', ...h } = o,
      m = { ...o, color: u, position: p, enableColorOnDark: f },
      g = XA(m)
    return q.jsx(QA, {
      square: !0,
      component: 'header',
      ownerState: m,
      elevation: 4,
      className: Ae(g.root, s, p === 'fixed' && 'mui-fixed'),
      ref: l,
      ...h,
    })
  })
function bu(t, r) {
  var o
  if (!t || !r) return !1
  if (t.contains(r)) return !0
  const l = (o = r.getRootNode) == null ? void 0 : o.call(r)
  if (l && l instanceof ShadowRoot) {
    let s = r
    for (; s;) {
      if (t === s) return !0
      s = s.parentNode ?? s.host ?? null
    }
  }
  return !1
}
function WA(t) {
  var b
  const { elementType: r, externalSlotProps: l, ownerState: o, skipResolvingSlotProps: s = !1, ...u } = t,
    f = s ? {} : e1(l, o),
    { props: p, internalRef: h } = n1({ ...u, externalSlotProps: f }),
    m = sn(h, f == null ? void 0 : f.ref, (b = t.additionalProps) == null ? void 0 : b.ref)
  return Jv(r, { ...p, ref: m }, o)
}
function ji(t) {
  var r
  return parseInt(S.version, 10) >= 19
    ? ((r = t == null ? void 0 : t.props) == null ? void 0 : r.ref) || null
    : (t == null ? void 0 : t.ref) || null
}
function JA(t) {
  return typeof t == 'function' ? t() : t
}
const eO = S.forwardRef(function (r, l) {
    const { children: o, container: s, disablePortal: u = !1 } = r,
      [f, p] = S.useState(null),
      h = sn(S.isValidElement(o) ? ji(o) : null, l)
    if (
      (on(() => {
        u || p(JA(s) || document.body)
      }, [s, u]),
      on(() => {
        if (f && !u)
          return (
            ip(l, f),
            () => {
              ip(l, null)
            }
          )
      }, [l, f, u]),
      u)
    ) {
      if (S.isValidElement(o)) {
        const m = { ref: h }
        return S.cloneElement(o, m)
      }
      return o
    }
    return f && FE.createPortal(o, f)
  }),
  tO = no(q.jsx('path', { d: 'M7 10l5 5 5-5z' })),
  nO = { entering: { opacity: 1 }, entered: { opacity: 1 }, exiting: { opacity: 0 }, exited: { opacity: 0 } },
  rO = { opacity: 0, visibility: 'hidden' },
  aO = S.forwardRef(function (r, l) {
    const o = Li(),
      s = { enter: o.transitions.duration.enteringScreen, exit: o.transitions.duration.leavingScreen },
      {
        addEndListener: u,
        appear: f = !0,
        children: p,
        disablePrefersReducedMotion: h = !1,
        easing: m,
        in: g,
        onEnter: b,
        onEntered: C,
        onEntering: v,
        onExit: w,
        onExited: R,
        onExiting: T,
        style: A,
        timeout: O = s,
        ...M
      } = r,
      z = Qp(o.motion.reducedMotion, h),
      _ = S.useRef(null),
      k = sn(_, ji(p), l),
      V = Ln(_, v),
      Q = Ln(_, (L, U) => {
        z.shouldReduceMotion || Yp(L)
        const N = _u({ style: A, timeout: O, easing: m }, { mode: 'enter' }),
          H = z.getTransitionTiming({ duration: N.duration, delay: N.delay })
        ;((L.style.transition = o.transitions.create('opacity', {
          duration: H.duration,
          easing: N.easing,
          delay: H.delay,
        })),
          b && b(L, U))
      }),
      oe = Ln(_, C),
      ce = Ln(_, T),
      Z = Ln(_, L => {
        const U = _u({ style: A, timeout: O, easing: m }, { mode: 'exit' }),
          N = z.getTransitionTiming({ duration: U.duration, delay: U.delay })
        ;((L.style.transition = o.transitions.create('opacity', {
          duration: N.duration,
          easing: U.easing,
          delay: N.delay,
        })),
          w && w(L))
      }),
      x = Ln(_, L => {
        ;((L.style.transition = ''), R && R(L))
      }),
      G = u
        ? L => {
            u(_.current, L)
          }
        : void 0
    return q.jsx(Qv, {
      appear: f,
      in: g,
      nodeRef: _,
      onEnter: Q,
      onEntered: oe,
      onEntering: V,
      onExit: Z,
      onExited: x,
      onExiting: ce,
      addEndListener: G,
      reduceMotion: z.shouldReduceMotion,
      timeout: O,
      ...M,
      children: (L, { ownerState: U, ...N }) => {
        const H = Kv(L, g, nO, rO, A, p.props.style)
        return S.cloneElement(p, { style: H, ref: k, ...N })
      },
    })
  })
function lO(t) {
  return Je('MuiBackdrop', t)
}
et('MuiBackdrop', ['root', 'invisible'])
const oO = t => {
    const { classes: r, invisible: l } = t
    return tt({ root: ['root', l && 'invisible'] }, lO, r)
  },
  iO = ye('div', {
    name: 'MuiBackdrop',
    slot: 'Root',
    overridesResolver: (t, r) => {
      const { ownerState: l } = t
      return [r.root, l.invisible && r.invisible]
    },
  })({
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    WebkitTapHighlightColor: 'transparent',
    variants: [{ props: { invisible: !0 }, style: { backgroundColor: 'transparent' } }],
  }),
  sO = S.forwardRef(function (r, l) {
    const o = ot({ props: r, name: 'MuiBackdrop' }),
      {
        children: s,
        className: u,
        component: f = 'div',
        invisible: p = !1,
        open: h,
        slotProps: m = {},
        slots: g = {},
        transitionDuration: b,
        ...C
      } = o,
      v = { ...o, component: f, invisible: p },
      w = oO(v),
      R = { component: f, slots: g, slotProps: m },
      [T, A] = St('root', { elementType: iO, externalForwardedProps: R, className: Ae(w.root, u), ownerState: v }),
      [O, M] = St('transition', { elementType: aO, externalForwardedProps: R, ownerState: v })
    return q.jsx(O, { in: h, timeout: b, ...C, ...M, children: q.jsx(T, { ...A, ref: l, children: s }) })
  }),
  uO = et('MuiBox', ['root']),
  cO = Fv(),
  fO = ZC({ themeId: Pu, defaultTheme: cO, defaultClassName: uO.root, generateClassName: Dv.generate })
function dO(t) {
  return Je('MuiButton', t)
}
const qa = et('MuiButton', [
    'root',
    'text',
    'outlined',
    'contained',
    'disableElevation',
    'focusVisible',
    'disabled',
    'colorInherit',
    'colorPrimary',
    'colorSecondary',
    'colorSuccess',
    'colorError',
    'colorInfo',
    'colorWarning',
    'sizeMedium',
    'sizeSmall',
    'sizeLarge',
    'fullWidth',
    'startIcon',
    'endIcon',
    'icon',
    'loading',
    'loadingWrapper',
    'loadingIconPlaceholder',
    'loadingIndicator',
    'loadingPositionCenter',
    'loadingPositionStart',
    'loadingPositionEnd',
  ]),
  pO = S.createContext({}),
  hO = S.createContext(void 0),
  mO = t => {
    const {
        color: r,
        disableElevation: l,
        fullWidth: o,
        size: s,
        variant: u,
        loading: f,
        loadingPosition: p,
        classes: h,
      } = t,
      m = {
        root: [
          'root',
          f && 'loading',
          u,
          `size${Oe(s)}`,
          `color${Oe(r)}`,
          l && 'disableElevation',
          o && 'fullWidth',
          f && `loadingPosition${Oe(p)}`,
        ],
        startIcon: ['icon', 'startIcon'],
        endIcon: ['icon', 'endIcon'],
        loadingIndicator: ['loadingIndicator'],
        loadingWrapper: ['loadingWrapper'],
      },
      g = tt(m, dO, h)
    return { ...h, ...g }
  },
  o1 = [
    { props: { size: 'small' }, style: { '& > *:nth-of-type(1)': { fontSize: 18 } } },
    { props: { size: 'medium' }, style: { '& > *:nth-of-type(1)': { fontSize: 20 } } },
    { props: { size: 'large' }, style: { '& > *:nth-of-type(1)': { fontSize: 22 } } },
  ],
  gO = ye(a1, {
    shouldForwardProp: t => Yn(t) || t === 'classes',
    name: 'MuiButton',
    slot: 'Root',
    overridesResolver: (t, r) => {
      const { ownerState: l } = t
      return [
        r.root,
        r[l.variant],
        r[`size${Oe(l.size)}`],
        l.color === 'inherit' && r.colorInherit,
        l.disableElevation && r.disableElevation,
        l.fullWidth && r.fullWidth,
        l.loading && r.loading,
      ]
    },
  })(
    ut(({ theme: t }) => {
      const r = t.palette.mode === 'light' ? t.palette.grey[300] : t.palette.grey[800],
        l = t.palette.mode === 'light' ? t.palette.grey.A100 : t.palette.grey[700]
      return {
        ...t.typography.button,
        minWidth: 64,
        padding: '6px 16px',
        border: 0,
        borderRadius: (t.vars || t).shape.borderRadius,
        ...Ut(t, ['background-color', 'box-shadow', 'border-color', 'color'], {
          duration: t.transitions.duration.short,
        }),
        '&:hover': { textDecoration: 'none' },
        [`&.${qa.disabled}`]: { color: (t.vars || t).palette.action.disabled },
        variants: [
          {
            props: { variant: 'contained' },
            style: {
              color: 'var(--variant-containedColor)',
              backgroundColor: 'var(--variant-containedBg)',
              boxShadow: (t.vars || t).shadows[2],
              '&:hover': {
                boxShadow: (t.vars || t).shadows[4],
                '@media (hover: none)': { boxShadow: (t.vars || t).shadows[2] },
              },
              '&:active': { boxShadow: (t.vars || t).shadows[8] },
              [`&.${qa.focusVisible}`]: { boxShadow: (t.vars || t).shadows[6] },
              [`&.${qa.disabled}`]: {
                color: (t.vars || t).palette.action.disabled,
                boxShadow: (t.vars || t).shadows[0],
                backgroundColor: (t.vars || t).palette.action.disabledBackground,
              },
            },
          },
          {
            props: { variant: 'outlined' },
            style: {
              padding: '5px 15px',
              border: '1px solid currentColor',
              borderColor: 'var(--variant-outlinedBorder, currentColor)',
              backgroundColor: 'var(--variant-outlinedBg)',
              color: 'var(--variant-outlinedColor)',
              [`&.${qa.disabled}`]: { border: `1px solid ${(t.vars || t).palette.action.disabledBackground}` },
            },
          },
          {
            props: { variant: 'text' },
            style: { padding: '6px 8px', color: 'var(--variant-textColor)', backgroundColor: 'var(--variant-textBg)' },
          },
          ...Object.entries(t.palette)
            .filter(wn())
            .map(([o]) => ({
              props: { color: o },
              style: {
                '--variant-textColor': (t.vars || t).palette[o].main,
                '--variant-outlinedColor': (t.vars || t).palette[o].main,
                '--variant-outlinedBorder': t.alpha((t.vars || t).palette[o].main, 0.5),
                '--variant-containedColor': (t.vars || t).palette[o].contrastText,
                '--variant-containedBg': (t.vars || t).palette[o].main,
                '@media (hover: hover)': {
                  '&:hover': {
                    '--variant-containedBg': (t.vars || t).palette[o].dark,
                    '--variant-textBg': t.alpha(
                      (t.vars || t).palette[o].main,
                      (t.vars || t).palette.action.hoverOpacity
                    ),
                    '--variant-outlinedBorder': (t.vars || t).palette[o].main,
                    '--variant-outlinedBg': t.alpha(
                      (t.vars || t).palette[o].main,
                      (t.vars || t).palette.action.hoverOpacity
                    ),
                  },
                },
              },
            })),
          {
            props: { color: 'inherit' },
            style: {
              color: 'inherit',
              borderColor: 'currentColor',
              '--variant-containedBg': t.vars ? t.vars.palette.Button.inheritContainedBg : r,
              '@media (hover: hover)': {
                '&:hover': {
                  '--variant-containedBg': t.vars ? t.vars.palette.Button.inheritContainedHoverBg : l,
                  '--variant-textBg': t.alpha(
                    (t.vars || t).palette.text.primary,
                    (t.vars || t).palette.action.hoverOpacity
                  ),
                  '--variant-outlinedBg': t.alpha(
                    (t.vars || t).palette.text.primary,
                    (t.vars || t).palette.action.hoverOpacity
                  ),
                },
              },
            },
          },
          {
            props: { size: 'small', variant: 'text' },
            style: { padding: '4px 5px', fontSize: t.typography.pxToRem(13) },
          },
          {
            props: { size: 'large', variant: 'text' },
            style: { padding: '8px 11px', fontSize: t.typography.pxToRem(15) },
          },
          {
            props: { size: 'small', variant: 'outlined' },
            style: { padding: '3px 9px', fontSize: t.typography.pxToRem(13) },
          },
          {
            props: { size: 'large', variant: 'outlined' },
            style: { padding: '7px 21px', fontSize: t.typography.pxToRem(15) },
          },
          {
            props: { size: 'small', variant: 'contained' },
            style: { padding: '4px 10px', fontSize: t.typography.pxToRem(13) },
          },
          {
            props: { size: 'large', variant: 'contained' },
            style: { padding: '8px 22px', fontSize: t.typography.pxToRem(15) },
          },
          {
            props: { disableElevation: !0 },
            style: {
              boxShadow: 'none',
              '&:hover': { boxShadow: 'none' },
              [`&.${qa.focusVisible}`]: { boxShadow: 'none' },
              '&:active': { boxShadow: 'none' },
              [`&.${qa.disabled}`]: { boxShadow: 'none' },
            },
          },
          { props: { fullWidth: !0 }, style: { width: '100%' } },
          {
            props: { loadingPosition: 'center' },
            style: {
              ...Ut(t, ['background-color', 'box-shadow', 'border-color'], { duration: t.transitions.duration.short }),
              [`&.${qa.loading}`]: { color: 'transparent' },
            },
          },
        ],
      }
    })
  ),
  yO = ye('span', {
    name: 'MuiButton',
    slot: 'StartIcon',
    overridesResolver: (t, r) => {
      const { ownerState: l } = t
      return [r.startIcon, l.loading && r.startIconLoadingStart]
    },
  })(({ theme: t }) => ({
    display: 'inherit',
    alignItems: 'center',
    marginRight: 8,
    marginLeft: -4,
    '&::before': { content: '"\\200b"', width: 0, overflow: 'hidden' },
    variants: [
      { props: { size: 'small' }, style: { marginLeft: -2 } },
      {
        props: { loadingPosition: 'start', loading: !0 },
        style: { ...Ut(t, ['opacity'], { duration: t.transitions.duration.short }), opacity: 0 },
      },
      { props: { loadingPosition: 'start', loading: !0, fullWidth: !0 }, style: { marginRight: -8 } },
      ...o1,
    ],
  })),
  bO = ye('span', {
    name: 'MuiButton',
    slot: 'EndIcon',
    overridesResolver: (t, r) => {
      const { ownerState: l } = t
      return [r.endIcon, l.loading && r.endIconLoadingEnd]
    },
  })(({ theme: t }) => ({
    display: 'inherit',
    marginRight: -4,
    marginLeft: 8,
    variants: [
      { props: { size: 'small' }, style: { marginRight: -2 } },
      {
        props: { loadingPosition: 'end', loading: !0 },
        style: { ...Ut(t, ['opacity'], { duration: t.transitions.duration.short }), opacity: 0 },
      },
      { props: { loadingPosition: 'end', loading: !0, fullWidth: !0 }, style: { marginLeft: -8 } },
      ...o1,
    ],
  })),
  vO = ye('span', { name: 'MuiButton', slot: 'LoadingIndicator' })(({ theme: t }) => ({
    display: 'none',
    position: 'absolute',
    visibility: 'visible',
    variants: [
      { props: { loading: !0 }, style: { display: 'flex' } },
      { props: { loadingPosition: 'start' }, style: { left: 14 } },
      { props: { loadingPosition: 'start', size: 'small' }, style: { left: 10 } },
      { props: { variant: 'text', loadingPosition: 'start' }, style: { left: 6 } },
      {
        props: { loadingPosition: 'center' },
        style: { left: '50%', transform: 'translate(-50%)', color: (t.vars || t).palette.action.disabled },
      },
      { props: { loadingPosition: 'end' }, style: { right: 14 } },
      { props: { loadingPosition: 'end', size: 'small' }, style: { right: 10 } },
      { props: { variant: 'text', loadingPosition: 'end' }, style: { right: 6 } },
      { props: { loadingPosition: 'start', fullWidth: !0 }, style: { position: 'relative', left: -10 } },
      { props: { loadingPosition: 'end', fullWidth: !0 }, style: { position: 'relative', right: -10 } },
    ],
  })),
  ab = ye('span', { name: 'MuiButton', slot: 'LoadingIconPlaceholder' })({
    display: 'inline-block',
    width: '1em',
    height: '1em',
  }),
  ha = S.forwardRef(function (r, l) {
    const o = S.useContext(pO),
      s = S.useContext(hO),
      u = wi(o, r),
      f = ot({ props: u, name: 'MuiButton' }),
      {
        children: p,
        color: h = 'primary',
        component: m = 'button',
        className: g,
        disabled: b = !1,
        disableElevation: C = !1,
        disableFocusRipple: v = !1,
        endIcon: w,
        focusVisibleClassName: R,
        fullWidth: T = !1,
        id: A,
        loading: O = null,
        loadingIndicator: M,
        loadingPosition: z = 'center',
        size: _ = 'medium',
        startIcon: k,
        type: V,
        variant: Q = 'text',
        ...oe
      } = f,
      ce = Oi(A),
      Z = M ?? q.jsx(l1, { 'aria-labelledby': ce, color: 'inherit', size: 16 }),
      x = {
        ...f,
        color: h,
        component: m,
        disabled: b,
        disableElevation: C,
        disableFocusRipple: v,
        fullWidth: T,
        loading: O,
        loadingIndicator: Z,
        loadingPosition: z,
        size: _,
        type: V,
        variant: Q,
      },
      G = mO(x),
      L =
        (k || (O && z === 'start')) &&
        q.jsx(yO, {
          className: G.startIcon,
          ownerState: x,
          children: k || q.jsx(ab, { className: G.loadingIconPlaceholder, ownerState: x }),
        }),
      U =
        (w || (O && z === 'end')) &&
        q.jsx(bO, {
          className: G.endIcon,
          ownerState: x,
          children: w || q.jsx(ab, { className: G.loadingIconPlaceholder, ownerState: x }),
        }),
      N = s || '',
      H =
        typeof O == 'boolean'
          ? q.jsx('span', {
              className: G.loadingWrapper,
              style: { display: 'contents' },
              children: O && q.jsx(vO, { className: G.loadingIndicator, ownerState: x, children: Z }),
            })
          : null,
      { root: W, ...ue } = G
    return q.jsxs(gO, {
      ownerState: x,
      className: Ae(o.className, G.root, g, N),
      component: m,
      disabled: b || O,
      focusRipple: !v,
      focusVisibleClassName: Ae(G.focusVisible, R),
      ref: l,
      internalNativeButton: !0,
      type: V,
      id: O ? ce : A,
      ...oe,
      classes: ue,
      children: [L, z !== 'end' && H, p, z === 'end' && H, U],
    })
  }),
  SO = _2({
    createStyledComponent: ye('div', {
      name: 'MuiContainer',
      slot: 'Root',
      overridesResolver: (t, r) => {
        const { ownerState: l } = t
        return [
          r.root,
          r[`maxWidth${Oe(String(l.maxWidth))}`],
          l.fixed && r.fixed,
          l.disableGutters && r.disableGutters,
        ]
      },
    }),
    useThemeProps: t => ot({ props: t, name: 'MuiContainer' }),
  })
function i1(t = window) {
  const r = t.document.documentElement.clientWidth
  return t.innerWidth - r
}
function xO(t) {
  const r = tn(t)
  return r.body === t ? jr(t).innerWidth > r.documentElement.clientWidth : t.scrollHeight > t.clientHeight
}
function hi(t, r) {
  r ? t.setAttribute('aria-hidden', 'true') : t.removeAttribute('aria-hidden')
}
function lb(t) {
  return parseFloat(jr(t).getComputedStyle(t).paddingRight) || 0
}
function RO(t) {
  const l = [
      'TEMPLATE',
      'SCRIPT',
      'STYLE',
      'LINK',
      'MAP',
      'META',
      'NOSCRIPT',
      'PICTURE',
      'COL',
      'COLGROUP',
      'PARAM',
      'SLOT',
      'SOURCE',
      'TRACK',
    ].includes(t.tagName),
    o = t.tagName === 'INPUT' && t.getAttribute('type') === 'hidden'
  return l || o
}
function ob(t, r, l, o, s) {
  const u = [r, l, ...o]
  ;[].forEach.call(t.children, f => {
    const p = !u.includes(f),
      h = !RO(f)
    p && h && hi(f, s)
  })
}
function Id(t, r) {
  let l = -1
  return (t.some((o, s) => (r(o) ? ((l = s), !0) : !1)), l)
}
function EO(t, r) {
  const l = [],
    o = t.container
  if (!r.disableScrollLock) {
    if (xO(o)) {
      const f = i1(jr(o))
      ;(l.push({ value: o.style.paddingRight, property: 'padding-right', el: o }),
        (o.style.paddingRight = `${lb(o) + f}px`))
      const p = tn(o).querySelectorAll('.mui-fixed')
      ;[].forEach.call(p, h => {
        ;(l.push({ value: h.style.paddingRight, property: 'padding-right', el: h }),
          (h.style.paddingRight = `${lb(h) + f}px`))
      })
    }
    let u
    if (o.parentNode instanceof DocumentFragment) u = tn(o).body
    else {
      const f = o.parentElement,
        p = jr(o)
      u = (f == null ? void 0 : f.nodeName) === 'HTML' && p.getComputedStyle(f).overflowY === 'scroll' ? f : o
    }
    ;(l.push(
      { value: u.style.overflow, property: 'overflow', el: u },
      { value: u.style.overflowX, property: 'overflow-x', el: u },
      { value: u.style.overflowY, property: 'overflow-y', el: u }
    ),
      (u.style.overflow = 'hidden'))
  }
  return () => {
    l.forEach(({ value: u, el: f, property: p }) => {
      u ? f.style.setProperty(p, u) : f.style.removeProperty(p)
    })
  }
}
function TO(t) {
  const r = []
  return (
    [].forEach.call(t.children, l => {
      l.getAttribute('aria-hidden') === 'true' && r.push(l)
    }),
    r
  )
}
class CO {
  constructor() {
    ;((this.modals = []), (this.containers = []))
  }
  add(r, l) {
    let o = this.modals.indexOf(r)
    if (o !== -1) return o
    ;((o = this.modals.length), this.modals.push(r), r.modalRef && hi(r.modalRef, !1))
    const s = TO(l)
    ob(l, r.mount, r.modalRef, s, !0)
    const u = Id(this.containers, f => f.container === l)
    return u !== -1
      ? (this.containers[u].modals.push(r), o)
      : (this.containers.push({ modals: [r], container: l, restore: null, hiddenSiblings: s }), o)
  }
  mount(r, l) {
    const o = Id(this.containers, u => u.modals.includes(r)),
      s = this.containers[o]
    s.restore || (s.restore = EO(s, l))
  }
  remove(r, l = !0) {
    const o = this.modals.indexOf(r)
    if (o === -1) return o
    const s = Id(this.containers, f => f.modals.includes(r)),
      u = this.containers[s]
    if ((u.modals.splice(u.modals.indexOf(r), 1), this.modals.splice(o, 1), u.modals.length === 0))
      (u.restore && u.restore(),
        r.modalRef && hi(r.modalRef, l),
        ob(u.container, r.mount, r.modalRef, u.hiddenSiblings, !1),
        this.containers.splice(s, 1))
    else {
      const f = u.modals[u.modals.length - 1]
      f.modalRef && hi(f.modalRef, !1)
    }
    return o
  }
  isTopModal(r) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === r
  }
}
const ib = 'data-mui-focusable'
function sb(t) {
  return t ? (t.hasAttribute(ib) ? t : t.querySelector(`[${ib}]`)) : null
}
const wO = [
  'input',
  'select',
  'textarea',
  'a[href]',
  'button',
  '[tabindex]',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
].join(',')
function s1(t) {
  const r = parseInt(t.getAttribute('tabindex') || '', 10)
  return Number.isNaN(r)
    ? t.contentEditable === 'true' ||
      ((t.nodeName === 'AUDIO' || t.nodeName === 'VIDEO' || t.nodeName === 'DETAILS') &&
        t.getAttribute('tabindex') === null)
      ? 0
      : t.tabIndex
    : r
}
function AO(t) {
  if (t.tagName !== 'INPUT' || t.type !== 'radio' || !t.name) return !1
  const r = o => t.ownerDocument.querySelector(`input[type="radio"]${o}`)
  let l = r(`[name="${t.name}"]:checked`)
  return (l || (l = r(`[name="${t.name}"]`)), l !== t)
}
function OO(t) {
  return !(t.disabled || (t.tagName === 'INPUT' && t.type === 'hidden') || AO(t))
}
function MO(t) {
  const r = [],
    l = []
  return (
    Array.from(t.querySelectorAll(wO)).forEach((o, s) => {
      const u = s1(o)
      u === -1 || !OO(o) || (u === 0 ? r.push(o) : l.push({ documentOrder: s, tabIndex: u, node: o }))
    }),
    l
      .sort((o, s) => (o.tabIndex === s.tabIndex ? o.documentOrder - s.documentOrder : o.tabIndex - s.tabIndex))
      .map(o => o.node)
      .concat(r)
  )
}
function _O() {
  return !0
}
function NO(t) {
  const {
      children: r,
      disableAutoFocus: l = !1,
      disableEnforceFocus: o = !1,
      disableRestoreFocus: s = !1,
      getTabbable: u = MO,
      isEnabled: f = _O,
      open: p,
    } = t,
    h = S.useRef(!1),
    m = S.useRef(null),
    g = S.useRef(null),
    b = S.useRef(null),
    C = S.useRef(null),
    v = S.useRef(!1),
    w = S.useRef(null),
    R = sn(ji(r), w),
    T = S.useRef(null)
  ;(S.useEffect(() => {
    !p || !w.current || (v.current = !l)
  }, [l, p]),
    S.useEffect(() => {
      if (((h.current = !1), !p || !w.current)) return
      const M = tn(w.current),
        z = zr(M),
        _ = sb(w.current) ?? w.current
      return (
        bu(w.current, z) || (_.hasAttribute('tabIndex') || _.setAttribute('tabIndex', '-1'), v.current && _.focus()),
        () => {
          !s && b.current && ((h.current = !0), b.current.focus(), (b.current = null))
        }
      )
    }, [p]),
    S.useEffect(() => {
      if (!p || !w.current) return
      const M = tn(w.current),
        z = V => {
          if (((T.current = V), o || !f() || V.key !== 'Tab')) return
          const Q = w.current,
            oe = zr(M)
          if (Q === null) return
          const ce = sb(Q)
          if (oe === Q || oe === ce) {
            const x = u(Q)
            if (x.length === 0) return
            ;(V.preventDefault(), V.shiftKey ? x[x.length - 1].focus() : x[0].focus())
            return
          }
          if (bu(Q, oe)) {
            const x = u(Q),
              G = x.indexOf(oe)
            if (G === -1 || !x.some(N => s1(N) > 0)) return
            V.preventDefault()
            let U = 0
            ;(V.shiftKey ? (U = G <= 0 ? x.length - 1 : G - 1) : (U = G === x.length - 1 ? 0 : G + 1), x[U].focus())
          }
        },
        _ = () => {
          var ce, Z
          const V = w.current
          if (V === null) return
          const Q = zr(M)
          if (!M.hasFocus() || !f() || h.current) {
            h.current = !1
            return
          }
          if (bu(V, Q) || (o && Q !== m.current && Q !== g.current)) return
          if (Q !== C.current) C.current = null
          else if (C.current !== null) return
          if (!v.current) return
          let oe = []
          if (((Q === m.current || Q === g.current) && (oe = u(w.current)), oe.length > 0)) {
            const x = !!(
                (ce = T.current) != null &&
                ce.shiftKey &&
                ((Z = T.current) == null ? void 0 : Z.key) === 'Tab'
              ),
              G = oe[0],
              L = oe[oe.length - 1]
            typeof G != 'string' && typeof L != 'string' && (x ? L.focus() : G.focus())
          } else V.focus()
        }
      ;(M.addEventListener('focusin', _), M.addEventListener('keydown', z, !0))
      const k = setInterval(() => {
        const V = zr(M)
        V && V.tagName === 'BODY' && _()
      }, 50)
      return () => {
        ;(clearInterval(k), M.removeEventListener('focusin', _), M.removeEventListener('keydown', z, !0))
      }
    }, [l, o, s, f, p, u]))
  const A = M => {
      ;(b.current === null && (b.current = M.relatedTarget), (v.current = !0), (C.current = M.target))
      const z = r.props.onFocus
      z && z(M)
    },
    O = M => {
      ;(b.current === null && (b.current = M.relatedTarget), (v.current = !0))
    }
  return q.jsxs(S.Fragment, {
    children: [
      q.jsx('div', { tabIndex: p ? 0 : -1, onFocus: O, ref: m, 'data-testid': 'sentinelStart' }),
      S.cloneElement(r, { ref: R, onFocus: A }),
      q.jsx('div', { tabIndex: p ? 0 : -1, onFocus: O, ref: g, 'data-testid': 'sentinelEnd' }),
    ],
  })
}
function DO(t) {
  return typeof t == 'function' ? t() : t
}
function BO(t) {
  return t ? t.props.hasOwnProperty('in') : !1
}
const ub = () => {},
  iu = new CO()
function zO(t) {
  const {
      container: r,
      disableScrollLock: l = !1,
      closeAfterTransition: o = !1,
      onTransitionEnter: s,
      onTransitionExited: u,
      children: f,
      onClose: p,
      open: h,
      rootRef: m,
    } = t,
    g = S.useRef({}),
    b = S.useRef(null),
    C = S.useRef(null),
    v = sn(C, m),
    [w, R] = S.useState(!h),
    T = BO(f)
  let A = !0
  ;(t['aria-hidden'] === 'false' || t['aria-hidden'] === !1) && (A = !1)
  const O = () => tn(b.current),
    M = () => ((g.current.modalRef = C.current), (g.current.mount = b.current), g.current),
    z = () => {
      ;(iu.mount(M(), { disableScrollLock: l }), C.current && (C.current.scrollTop = 0))
    },
    _ = Pt(() => {
      const L = DO(r) || O().body
      ;(iu.add(M(), L), C.current && z())
    }),
    k = () => iu.isTopModal(M()),
    V = Pt(L => {
      ;((b.current = L), L && (h && k() ? z() : C.current && hi(C.current, A)))
    }),
    Q = S.useCallback(() => {
      iu.remove(M(), A)
    }, [A])
  ;(S.useEffect(
    () => () => {
      Q()
    },
    [Q]
  ),
    S.useEffect(() => {
      h ? _() : (!T || !o) && Q()
    }, [h, Q, T, o, _]))
  const oe = L => U => {
      var N
      ;((N = L.onKeyDown) == null || N.call(L, U),
        !(U.key !== 'Escape' || U.which === 229 || !k()) && (U.stopPropagation(), p && p(U, 'escapeKeyDown')))
    },
    ce = L => U => {
      var N
      ;((N = L.onClick) == null || N.call(L, U), U.target === U.currentTarget && p && p(U, 'backdropClick'))
    }
  return {
    getRootProps: (L = {}) => {
      const U = t1(t)
      ;(delete U.onTransitionEnter, delete U.onTransitionExited)
      const N = { ...U, ...L }
      return { role: 'presentation', ...N, onKeyDown: oe(N), ref: v }
    },
    getBackdropProps: (L = {}) => {
      const U = L
      return { 'aria-hidden': !0, ...U, onClick: ce(U), open: h }
    },
    getTransitionProps: () => {
      const L = () => {
          ;(R(!1), s && s())
        },
        U = () => {
          ;(R(!0), u && u(), o && Q())
        }
      return {
        onEnter: V0(L, (f == null ? void 0 : f.props.onEnter) ?? ub),
        onExited: V0(U, (f == null ? void 0 : f.props.onExited) ?? ub),
      }
    },
    rootRef: v,
    portalRef: V,
    isTopModal: k,
    exited: w,
    hasTransition: T,
  }
}
function UO(t) {
  return Je('MuiModal', t)
}
et('MuiModal', ['root', 'hidden', 'backdrop'])
const kO = t => {
    const { open: r, exited: l, classes: o } = t
    return tt({ root: ['root', !r && l && 'hidden'], backdrop: ['backdrop'] }, UO, o)
  },
  LO = ye('div', {
    name: 'MuiModal',
    slot: 'Root',
    overridesResolver: (t, r) => {
      const { ownerState: l } = t
      return [r.root, !l.open && l.exited && r.hidden]
    },
  })(
    ut(({ theme: t }) => ({
      position: 'fixed',
      zIndex: (t.vars || t).zIndex.modal,
      right: 0,
      bottom: 0,
      top: 0,
      left: 0,
      variants: [{ props: ({ ownerState: r }) => !r.open && r.exited, style: { visibility: 'hidden' } }],
    }))
  ),
  jO = ye(sO, { name: 'MuiModal', slot: 'Backdrop' })({ zIndex: -1 }),
  $O = S.forwardRef(function (r, l) {
    const o = ot({ name: 'MuiModal', props: r }),
      {
        classes: s,
        className: u,
        closeAfterTransition: f = !1,
        children: p,
        container: h,
        component: m,
        disableAutoFocus: g = !1,
        disableEnforceFocus: b = !1,
        disablePortal: C = !1,
        disableRestoreFocus: v = !1,
        disableScrollLock: w = !1,
        hideBackdrop: R = !1,
        keepMounted: T = !1,
        onClose: A,
        onTransitionEnter: O,
        onTransitionExited: M,
        open: z,
        slotProps: _ = {},
        slots: k = {},
        theme: V,
        ...Q
      } = o,
      oe = {
        ...o,
        closeAfterTransition: f,
        disableAutoFocus: g,
        disableEnforceFocus: b,
        disablePortal: C,
        disableRestoreFocus: v,
        disableScrollLock: w,
        hideBackdrop: R,
        keepMounted: T,
      },
      {
        getRootProps: ce,
        getBackdropProps: Z,
        getTransitionProps: x,
        portalRef: G,
        isTopModal: L,
        exited: U,
        hasTransition: N,
      } = zO({ ...oe, rootRef: l }),
      H = { ...oe, exited: U },
      W = kO(H),
      ue = {}
    if ((p.props.tabIndex === void 0 && (ue.tabIndex = '-1'), N)) {
      const { onEnter: pe, onExited: le } = x()
      ;((ue.onEnter = pe), (ue.onExited = le))
    }
    const D = { slots: k, slotProps: _ },
      [I, ee] = St('root', {
        ref: l,
        elementType: LO,
        externalForwardedProps: { ...D, ...Q, component: m },
        getSlotProps: ce,
        ownerState: H,
        className: Ae(u, W == null ? void 0 : W.root, !H.open && H.exited && (W == null ? void 0 : W.hidden)),
      }),
      [te, ie] = St('backdrop', {
        elementType: jO,
        externalForwardedProps: D,
        shouldForwardComponentProp: !0,
        getSlotProps: pe =>
          Z({
            ...pe,
            onClick: le => {
              pe != null && pe.onClick && pe.onClick(le)
            },
          }),
        className: W == null ? void 0 : W.backdrop,
        ownerState: H,
      })
    return !T && !z && (!N || U)
      ? null
      : q.jsx(eO, {
          ref: G,
          container: h,
          disablePortal: C,
          children: q.jsxs(I, {
            ...ee,
            children: [
              R ? null : q.jsx(te, { ...ie }),
              q.jsx(NO, {
                disableEnforceFocus: b,
                disableAutoFocus: g,
                disableRestoreFocus: v,
                isEnabled: L,
                open: z,
                children: S.cloneElement(p, ue),
              }),
            ],
          }),
        })
  }),
  HO = t => {
    const {
        classes: r,
        disableUnderline: l,
        startAdornment: o,
        endAdornment: s,
        size: u,
        hiddenLabel: f,
        multiline: p,
      } = t,
      h = {
        root: [
          'root',
          !l && 'underline',
          o && 'adornedStart',
          s && 'adornedEnd',
          u === 'small' && `size${Oe(u)}`,
          f && 'hiddenLabel',
          p && 'multiline',
        ],
        input: ['input'],
      },
      m = tt(h, Cw, r)
    return { ...r, ...m }
  },
  PO = ye(ic, {
    shouldForwardProp: t => Yn(t) || t === 'classes',
    name: 'MuiFilledInput',
    slot: 'Root',
    overridesResolver: (t, r) => {
      const { ownerState: l } = t
      return [...lc(t, r), !l.disableUnderline && r.underline]
    },
  })(
    ut(({ theme: t }) => {
      const r = t.palette.mode === 'light',
        l = r ? 'rgba(0, 0, 0, 0.42)' : 'rgba(255, 255, 255, 0.7)',
        o = r ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.09)',
        s = r ? 'rgba(0, 0, 0, 0.09)' : 'rgba(255, 255, 255, 0.13)',
        u = r ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)'
      return {
        position: 'relative',
        backgroundColor: t.vars ? t.vars.palette.FilledInput.bg : o,
        borderTopLeftRadius: (t.vars || t).shape.borderRadius,
        borderTopRightRadius: (t.vars || t).shape.borderRadius,
        ...Ut(t, 'background-color', {
          duration: t.transitions.duration.shorter,
          easing: t.transitions.easing.easeOut,
        }),
        '&:hover': {
          backgroundColor: t.vars ? t.vars.palette.FilledInput.hoverBg : s,
          '@media (hover: none)': { backgroundColor: t.vars ? t.vars.palette.FilledInput.bg : o },
        },
        [`&.${Pa.focused}`]: { backgroundColor: t.vars ? t.vars.palette.FilledInput.bg : o },
        [`&.${Pa.disabled}`]: { backgroundColor: t.vars ? t.vars.palette.FilledInput.disabledBg : u },
        variants: [
          {
            props: ({ ownerState: f }) => !f.disableUnderline,
            style: {
              '&::after': {
                left: 0,
                bottom: 0,
                content: '""',
                position: 'absolute',
                right: 0,
                transform: 'scaleX(0)',
                ...Ut(t, 'transform', {
                  duration: t.transitions.duration.shorter,
                  easing: t.transitions.easing.easeOut,
                }),
                pointerEvents: 'none',
              },
              [`&.${Pa.focused}:after`]: { transform: 'scaleX(1) translateX(0)' },
              [`&.${Pa.error}`]: { '&::before, &::after': { borderBottomColor: (t.vars || t).palette.error.main } },
              '&::before': {
                borderBottom: `1px solid ${t.vars ? t.alpha(t.vars.palette.common.onBackground, t.vars.opacity.inputUnderline) : l}`,
                left: 0,
                bottom: 0,
                content: '""',
                position: 'absolute',
                right: 0,
                ...Ut(t, 'border-bottom-color', { duration: t.transitions.duration.shorter }),
                pointerEvents: 'none',
              },
              [`&:hover:not(.${Pa.disabled}, .${Pa.error}):before`]: {
                borderBottom: `1px solid ${(t.vars || t).palette.text.primary}`,
              },
              [`&.${Pa.disabled}:before`]: { borderBottomStyle: 'dotted' },
            },
          },
          ...Object.entries(t.palette)
            .filter(wn())
            .map(([f]) => {
              var p
              return {
                props: { disableUnderline: !1, color: f },
                style: {
                  '&::after': { borderBottom: `2px solid ${(p = (t.vars || t).palette[f]) == null ? void 0 : p.main}` },
                },
              }
            }),
          { props: ({ ownerState: f }) => f.startAdornment, style: { paddingLeft: 12 } },
          { props: ({ ownerState: f }) => f.endAdornment, style: { paddingRight: 12 } },
          { props: ({ ownerState: f }) => f.multiline, style: { padding: '25px 12px 8px' } },
          {
            props: ({ ownerState: f, size: p }) => f.multiline && p === 'small',
            style: { paddingTop: 21, paddingBottom: 4 },
          },
          { props: ({ ownerState: f }) => f.multiline && f.hiddenLabel, style: { paddingTop: 16, paddingBottom: 17 } },
          {
            props: ({ ownerState: f }) => f.multiline && f.hiddenLabel && f.size === 'small',
            style: { paddingTop: 8, paddingBottom: 9 },
          },
        ],
      }
    })
  ),
  qO = ye(sc, { name: 'MuiFilledInput', slot: 'Input', overridesResolver: oc })(
    ut(({ theme: t }) => ({
      paddingTop: 25,
      paddingRight: 12,
      paddingBottom: 8,
      paddingLeft: 12,
      '&:-webkit-autofill': {
        ...(!t.vars && {
          WebkitBoxShadow: t.palette.mode === 'light' ? null : '0 0 0 100px #266798 inset',
          WebkitTextFillColor: t.palette.mode === 'light' ? null : '#fff',
          caretColor: t.palette.mode === 'light' ? null : '#fff',
        }),
        borderTopLeftRadius: 'inherit',
        borderTopRightRadius: 'inherit',
        ...(t.vars &&
          t.applyStyles('dark', {
            WebkitBoxShadow: '0 0 0 100px #266798 inset',
            WebkitTextFillColor: '#fff',
            caretColor: '#fff',
          })),
      },
      variants: [
        { props: { size: 'small' }, style: { paddingTop: 21, paddingBottom: 4 } },
        { props: ({ ownerState: r }) => r.hiddenLabel, style: { paddingTop: 16, paddingBottom: 17 } },
        { props: ({ ownerState: r }) => r.startAdornment, style: { paddingLeft: 0 } },
        { props: ({ ownerState: r }) => r.endAdornment, style: { paddingRight: 0 } },
        {
          props: ({ ownerState: r }) => r.hiddenLabel && r.size === 'small',
          style: { paddingTop: 8, paddingBottom: 9 },
        },
        {
          props: ({ ownerState: r }) => r.multiline,
          style: { paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0 },
        },
      ],
    }))
  ),
  Wp = S.forwardRef(function (r, l) {
    const o = ot({ props: r, name: 'MuiFilledInput' }),
      {
        disableUnderline: s = !1,
        fullWidth: u = !1,
        hiddenLabel: f,
        inputComponent: p = 'input',
        multiline: h = !1,
        notched: m,
        slotProps: g,
        slots: b = {},
        type: C = 'text',
        ...v
      } = o,
      w = { ...o, disableUnderline: s, fullWidth: u, inputComponent: p, multiline: h, type: C },
      R = HO(o),
      T = { root: { ownerState: w }, input: { ownerState: w } },
      A = g ? ln(T, g) : T,
      O = b.root ?? PO,
      M = b.input ?? qO
    return q.jsx(Gp, {
      slots: { root: O, input: M },
      slotProps: A,
      fullWidth: u,
      inputComponent: p,
      multiline: h,
      ref: l,
      type: C,
      ...v,
      classes: R,
    })
  })
Wp.muiName = 'Input'
function IO(t) {
  return Je('MuiFormControl', t)
}
et('MuiFormControl', ['root', 'marginNone', 'marginNormal', 'marginDense', 'fullWidth', 'disabled'])
const FO = t => {
    const { classes: r, margin: l, fullWidth: o } = t,
      s = { root: ['root', l !== 'none' && `margin${Oe(l)}`, o && 'fullWidth'] }
    return tt(s, IO, r)
  },
  YO = ye('div', {
    name: 'MuiFormControl',
    slot: 'Root',
    overridesResolver: (t, r) => {
      const { ownerState: l } = t
      return [r.root, r[`margin${Oe(l.margin)}`], l.fullWidth && r.fullWidth]
    },
  })({
    display: 'inline-flex',
    flexDirection: 'column',
    position: 'relative',
    minWidth: 0,
    padding: 0,
    margin: 0,
    border: 0,
    verticalAlign: 'top',
    variants: [
      { props: { margin: 'normal' }, style: { marginTop: 16, marginBottom: 8 } },
      { props: { margin: 'dense' }, style: { marginTop: 8, marginBottom: 4 } },
      { props: { fullWidth: !0 }, style: { width: '100%' } },
    ],
  }),
  VO = S.forwardRef(function (r, l) {
    const o = ot({ props: r, name: 'MuiFormControl' }),
      {
        children: s,
        className: u,
        color: f = 'primary',
        component: p = 'div',
        disabled: h = !1,
        error: m = !1,
        focused: g,
        fullWidth: b = !1,
        hiddenLabel: C = !1,
        margin: v = 'none',
        required: w = !1,
        size: R = 'medium',
        variant: T = 'outlined',
        ...A
      } = o,
      O = {
        ...o,
        color: f,
        component: p,
        disabled: h,
        error: m,
        fullWidth: b,
        hiddenLabel: C,
        margin: v,
        required: w,
        size: R,
        variant: T,
      },
      M = FO(O),
      [z, _] = S.useState(() => {
        let U = !1
        return (
          s &&
            S.Children.forEach(s, N => {
              if (!Hd(N, ['Input', 'Select'])) return
              const H = Hd(N, ['Select']) ? N.props.input : N
              H && bw(H.props) && (U = !0)
            }),
          U
        )
      }),
      [k, V] = S.useState(() => {
        let U = !1
        return (
          s &&
            S.Children.forEach(s, N => {
              Hd(N, ['Input', 'Select']) && (Mu(N.props, !0) || Mu(N.props.inputProps, !0)) && (U = !0)
            }),
          U
        )
      }),
      [Q, oe] = S.useState(!1)
    h && Q && oe(!1)
    const ce = g !== void 0 && !h ? g : Q
    let Z
    S.useRef(!1)
    const x = S.useCallback(() => {
        V(!0)
      }, []),
      G = S.useCallback(() => {
        V(!1)
      }, []),
      L = S.useMemo(
        () => ({
          adornedStart: z,
          setAdornedStart: _,
          color: f,
          disabled: h,
          error: m,
          filled: k,
          focused: ce,
          fullWidth: b,
          hiddenLabel: C,
          size: R,
          onBlur: () => {
            oe(!1)
          },
          onFocus: () => {
            oe(!0)
          },
          onEmpty: G,
          onFilled: x,
          registerEffect: Z,
          required: w,
          variant: T,
        }),
        [z, f, h, m, k, ce, b, C, Z, G, x, w, R, T]
      )
    return q.jsx(Ip.Provider, {
      value: L,
      children: q.jsx(YO, { as: p, ownerState: O, className: Ae(M.root, u), ref: l, ...A, children: s }),
    })
  })
var cb
const GO = t => {
    const { classes: r, contained: l, size: o, disabled: s, error: u, filled: f, focused: p, required: h } = t,
      m = {
        root: [
          'root',
          s && 'disabled',
          u && 'error',
          o && `size${Oe(o)}`,
          l && 'contained',
          p && 'focused',
          f && 'filled',
          h && 'required',
        ],
      }
    return tt(m, ww, r)
  },
  KO = ye('p', {
    name: 'MuiFormHelperText',
    slot: 'Root',
    overridesResolver: (t, r) => {
      const { ownerState: l } = t
      return [r.root, l.size && r[`size${Oe(l.size)}`], l.contained && r.contained, l.filled && r.filled]
    },
  })(
    ut(({ theme: t }) => ({
      color: (t.vars || t).palette.text.secondary,
      ...t.typography.caption,
      textAlign: 'left',
      marginTop: 3,
      marginRight: 0,
      marginBottom: 0,
      marginLeft: 0,
      [`&.${Y0.disabled}`]: { color: (t.vars || t).palette.text.disabled },
      [`&.${Y0.error}`]: { color: (t.vars || t).palette.error.main },
      variants: [
        { props: { size: 'small' }, style: { marginTop: 4 } },
        { props: ({ ownerState: r }) => r.contained, style: { marginLeft: 14, marginRight: 14 } },
      ],
    }))
  ),
  XO = S.forwardRef(function (r, l) {
    const o = ot({ props: r, name: 'MuiFormHelperText' }),
      {
        children: s,
        className: u,
        component: f = 'p',
        disabled: p,
        error: h,
        filled: m,
        focused: g,
        margin: b,
        required: C,
        variant: v,
        ...w
      } = o,
      [R] = to({ props: o, states: ['variant', 'size', 'disabled', 'error', 'filled', 'focused', 'required'] }),
      T = {
        ...o,
        component: f,
        contained: R.variant === 'filled' || R.variant === 'outlined',
        variant: R.variant,
        size: R.size,
        disabled: R.disabled,
        error: R.error,
        filled: R.filled,
        focused: R.focused,
        required: R.required,
      }
    delete T.ownerState
    const A = GO(T)
    return q.jsx(KO, {
      as: f,
      className: Ae(A.root, u),
      ref: l,
      ...w,
      ownerState: T,
      children:
        s === ' ' ? cb || (cb = q.jsx('span', { className: 'notranslate', 'aria-hidden': !0, children: '​' })) : s,
    })
  }),
  QO = t => {
    const { classes: r, color: l, focused: o, disabled: s, error: u, filled: f, required: p } = t,
      h = {
        root: ['root', `color${Oe(l)}`, s && 'disabled', u && 'error', f && 'filled', o && 'focused', p && 'required'],
        asterisk: ['asterisk', u && 'error'],
      }
    return tt(h, Aw, r)
  },
  ZO = ye('label', {
    name: 'MuiFormLabel',
    slot: 'Root',
    overridesResolver: (t, r) => {
      const { ownerState: l } = t
      return [r.root, l.color === 'secondary' && r.colorSecondary, l.filled && r.filled]
    },
  })(
    ut(({ theme: t }) => ({
      color: (t.vars || t).palette.text.secondary,
      ...t.typography.body1,
      lineHeight: '1.4375em',
      padding: 0,
      position: 'relative',
      variants: [
        ...Object.entries(t.palette)
          .filter(wn())
          .map(([r]) => ({
            props: { color: r },
            style: { [`&.${di.focused}`]: { color: (t.vars || t).palette[r].main } },
          })),
        {
          props: {},
          style: {
            [`&.${di.disabled}`]: { color: (t.vars || t).palette.text.disabled },
            [`&.${di.error}`]: { color: (t.vars || t).palette.error.main },
          },
        },
      ],
    }))
  ),
  WO = ye('span', { name: 'MuiFormLabel', slot: 'Asterisk' })(
    ut(({ theme: t }) => ({ [`&.${di.error}`]: { color: (t.vars || t).palette.error.main } }))
  ),
  JO = S.forwardRef(function (r, l) {
    const o = ot({ props: r, name: 'MuiFormLabel' }),
      {
        children: s,
        className: u,
        color: f,
        component: p = 'label',
        disabled: h,
        error: m,
        filled: g,
        focused: b,
        required: C,
        ...v
      } = o,
      [w] = to({ props: o, states: ['color', 'required', 'focused', 'disabled', 'error', 'filled'] }),
      R = {
        ...o,
        color: w.color || 'primary',
        component: p,
        disabled: w.disabled,
        error: w.error,
        filled: w.filled,
        focused: w.focused,
        required: w.required,
      },
      T = QO(R)
    return q.jsxs(ZO, {
      as: p,
      ownerState: R,
      className: Ae(T.root, u),
      ref: l,
      ...v,
      children: [
        s,
        w.required && q.jsxs(WO, { ownerState: R, 'aria-hidden': !0, className: T.asterisk, children: [' ', '*'] }),
      ],
    })
  })
function mi(t) {
  return `scale(${t}, ${t ** 2})`
}
const eM = {
    entering: { opacity: 1, transform: mi(1) },
    entered: { opacity: 1, transform: 'none' },
    exiting: { opacity: 0, transform: mi(0.75) },
    exited: { opacity: 0, transform: mi(0.75) },
  },
  tM = { opacity: 0, transform: mi(0.75), visibility: 'hidden' },
  fp = S.forwardRef(function (r, l) {
    const {
        addEndListener: o,
        appear: s = !0,
        children: u,
        disablePrefersReducedMotion: f = !1,
        easing: p,
        in: h,
        onEnter: m,
        onEntered: g,
        onEntering: b,
        onExit: C,
        onExited: v,
        onExiting: w,
        style: R,
        timeout: T = 'auto',
        ...A
      } = r,
      O = S.useRef(null),
      M = Li(),
      z = Qp(M.motion.reducedMotion, f),
      _ = S.useRef(null),
      k = sn(_, ji(u), l),
      V = Ln(_, b),
      Q = Ln(_, (L, U) => {
        z.shouldReduceMotion || Yp(L)
        const { duration: N, delay: H, easing: W } = _u({ style: R, timeout: T, easing: p }, { mode: 'enter' })
        let ue
        T === 'auto' && !z.shouldReduceMotion
          ? ((ue = M.transitions.getAutoHeightDuration(L.clientHeight)), (O.current = ue))
          : ((ue = N), (O.current = null))
        const D = z.getTransitionTiming({ duration: ue, delay: H })
        ;((L.style.transition = [
          M.transitions.create('opacity', { duration: D.duration, delay: D.delay }),
          M.transitions.create('transform', {
            duration: typeof D.duration == 'string' ? D.duration : D.duration * 0.666,
            delay: D.delay,
            easing: W,
          }),
        ].join(',')),
          m && m(L, U))
      }),
      oe = Ln(_, g),
      ce = Ln(_, w),
      Z = Ln(_, L => {
        const { duration: U, delay: N, easing: H } = _u({ style: R, timeout: T, easing: p }, { mode: 'exit' })
        let W
        T === 'auto' && !z.shouldReduceMotion
          ? ((W = M.transitions.getAutoHeightDuration(L.clientHeight)), (O.current = W))
          : ((W = U), (O.current = null))
        const ue = z.getTransitionTiming({ duration: W, delay: N })
        ;((L.style.transition = [
          M.transitions.create('opacity', { duration: ue.duration, delay: ue.delay }),
          M.transitions.create('transform', {
            duration: typeof ue.duration == 'string' ? ue.duration : ue.duration * 0.666,
            delay: ue.delay || (typeof ue.duration == 'string' ? ue.duration : ue.duration * 0.333),
            easing: H,
          }),
        ].join(',')),
          (L.style.opacity = 0),
          (L.style.transform = mi(0.75)),
          C && C(L))
      }),
      x = Ln(_, L => {
        ;((L.style.transition = ''), v && v(L))
      }),
      G = o
        ? L => {
            o(_.current, L)
          }
        : void 0
    return q.jsx(Qv, {
      appear: s,
      in: h,
      nodeRef: _,
      onEnter: Q,
      onEntered: oe,
      onEntering: V,
      onExit: Z,
      onExited: x,
      onExiting: ce,
      addEndListener: G,
      getAutoTimeout: T === 'auto' ? () => O.current : void 0,
      reduceMotion: z.shouldReduceMotion,
      timeout: T === 'auto' ? null : T,
      ...A,
      children: (L, { ownerState: U, ...N }) => {
        const H = Kv(L, h, eM, tM, R, u.props.style)
        return S.cloneElement(u, { style: H, ref: k, ...N })
      },
    })
  })
fp && (fp.muiSupportAuto = !0)
function nM(t) {
  return Je('MuiInputLabel', t)
}
const rM = et('MuiInputLabel', [
    'root',
    'focused',
    'disabled',
    'error',
    'required',
    'asterisk',
    'formControl',
    'sizeSmall',
    'shrink',
    'animated',
    'standard',
    'filled',
    'outlined',
  ]),
  aM = t => {
    const { classes: r, disableUnderline: l } = t,
      s = tt({ root: ['root', !l && 'underline'], input: ['input'] }, Ow, r)
    return { ...r, ...s }
  },
  lM = ye(ic, {
    shouldForwardProp: t => Yn(t) || t === 'classes',
    name: 'MuiInput',
    slot: 'Root',
    overridesResolver: (t, r) => {
      const { ownerState: l } = t
      return [...lc(t, r), !l.disableUnderline && r.underline]
    },
  })(
    ut(({ theme: t }) => {
      let l = t.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.42)' : 'rgba(255, 255, 255, 0.7)'
      return (
        t.vars && (l = t.alpha(t.vars.palette.common.onBackground, t.vars.opacity.inputUnderline)),
        {
          position: 'relative',
          variants: [
            {
              props: ({ ownerState: o }) => o.formControl,
              style: { [`label + &, .${rM.root} + &`]: { marginTop: 16 } },
            },
            {
              props: ({ ownerState: o }) => !o.disableUnderline,
              style: {
                '&::after': {
                  left: 0,
                  bottom: 0,
                  content: '""',
                  position: 'absolute',
                  right: 0,
                  transform: 'scaleX(0)',
                  ...Ut(t, 'transform', {
                    duration: t.transitions.duration.shorter,
                    easing: t.transitions.easing.easeOut,
                  }),
                  pointerEvents: 'none',
                },
                [`&.${ii.focused}:after`]: { transform: 'scaleX(1) translateX(0)' },
                [`&.${ii.error}`]: { '&::before, &::after': { borderBottomColor: (t.vars || t).palette.error.main } },
                '&::before': {
                  borderBottom: `1px solid ${l}`,
                  left: 0,
                  bottom: 0,
                  content: '""',
                  position: 'absolute',
                  right: 0,
                  ...Ut(t, 'border-bottom-color', { duration: t.transitions.duration.shorter }),
                  pointerEvents: 'none',
                },
                [`&:hover:not(.${ii.disabled}, .${ii.error}):before`]: {
                  borderBottom: `2px solid ${(t.vars || t).palette.text.primary}`,
                  '@media (hover: none)': { borderBottom: `1px solid ${l}` },
                },
                [`&.${ii.disabled}:before`]: { borderBottomStyle: 'dotted' },
              },
            },
            ...Object.entries(t.palette)
              .filter(wn())
              .map(([o]) => ({
                props: { color: o, disableUnderline: !1 },
                style: { '&::after': { borderBottom: `2px solid ${(t.vars || t).palette[o].main}` } },
              })),
          ],
        }
      )
    })
  ),
  oM = ye(sc, { name: 'MuiInput', slot: 'Input', overridesResolver: oc })({}),
  Jp = S.forwardRef(function (r, l) {
    const o = ot({ props: r, name: 'MuiInput' }),
      {
        disableUnderline: s = !1,
        fullWidth: u = !1,
        inputComponent: f = 'input',
        multiline: p = !1,
        notched: h,
        slotProps: m,
        slots: g = {},
        type: b = 'text',
        ...C
      } = o,
      v = aM(o),
      R = { root: { ownerState: { disableUnderline: s } } },
      T = m ? ln(m, R) : R,
      A = g.root ?? lM,
      O = g.input ?? oM
    return q.jsx(Gp, {
      slots: { root: A, input: O },
      slotProps: T,
      fullWidth: u,
      inputComponent: f,
      multiline: p,
      ref: l,
      type: b,
      ...C,
      classes: v,
    })
  })
Jp.muiName = 'Input'
const iM = t => {
    const { classes: r, formControl: l, size: o, shrink: s, disableAnimation: u, variant: f, required: p } = t,
      h = {
        root: ['root', l && 'formControl', !u && 'animated', s && 'shrink', o && o !== 'medium' && `size${Oe(o)}`, f],
        asterisk: [p && 'asterisk'],
      },
      m = tt(h, nM, r)
    return { ...r, ...m }
  },
  sM = ye(JO, {
    shouldForwardProp: t => Yn(t) || t === 'classes',
    name: 'MuiInputLabel',
    slot: 'Root',
    overridesResolver: (t, r) => {
      const { ownerState: l } = t
      return [
        { [`& .${di.asterisk}`]: r.asterisk },
        r.root,
        l.formControl && r.formControl,
        l.size === 'small' && r.sizeSmall,
        l.shrink && r.shrink,
        !l.disableAnimation && r.animated,
        l.focused && r.focused,
        r[l.variant],
      ]
    },
  })(
    ut(({ theme: t }) => ({
      display: 'block',
      transformOrigin: 'top left',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '100%',
      variants: [
        {
          props: ({ ownerState: r }) => r.formControl,
          style: { position: 'absolute', left: 0, top: 0, transform: 'translate(0, 20px) scale(1)' },
        },
        { props: { size: 'small' }, style: { transform: 'translate(0, 17px) scale(1)' } },
        {
          props: ({ ownerState: r }) => r.shrink,
          style: { transform: 'translate(0, -1.5px) scale(0.75)', transformOrigin: 'top left', maxWidth: '133%' },
        },
        {
          props: ({ ownerState: r }) => !r.disableAnimation,
          style: {
            ...Ut(t, ['color', 'transform', 'max-width'], {
              duration: t.transitions.duration.shorter,
              easing: t.transitions.easing.easeOut,
            }),
          },
        },
        {
          props: { variant: 'filled' },
          style: {
            zIndex: 1,
            pointerEvents: 'none',
            transform: 'translate(12px, 16px) scale(1)',
            maxWidth: 'calc(100% - 24px)',
          },
        },
        { props: { variant: 'filled', size: 'small' }, style: { transform: 'translate(12px, 13px) scale(1)' } },
        {
          props: ({ variant: r, ownerState: l }) => r === 'filled' && l.shrink,
          style: {
            userSelect: 'none',
            pointerEvents: 'auto',
            transform: 'translate(12px, 7px) scale(0.75)',
            maxWidth: 'calc(133% - 24px)',
          },
        },
        {
          props: ({ variant: r, ownerState: l, size: o }) => r === 'filled' && l.shrink && o === 'small',
          style: { transform: 'translate(12px, 4px) scale(0.75)' },
        },
        {
          props: { variant: 'outlined' },
          style: {
            zIndex: 1,
            pointerEvents: 'none',
            transform: 'translate(14px, 16px) scale(1)',
            maxWidth: 'calc(100% - 24px)',
          },
        },
        { props: { variant: 'outlined', size: 'small' }, style: { transform: 'translate(14px, 9px) scale(1)' } },
        {
          props: ({ variant: r, ownerState: l }) => r === 'outlined' && l.shrink,
          style: {
            userSelect: 'none',
            pointerEvents: 'auto',
            maxWidth: 'calc(133% - 32px)',
            transform: 'translate(14px, -9px) scale(0.75)',
          },
        },
      ],
    }))
  ),
  uM = S.forwardRef(function (r, l) {
    const o = ot({ name: 'MuiInputLabel', props: r }),
      { disableAnimation: s = !1, margin: u, shrink: f, variant: p, className: h, ...m } = o,
      [g, b] = to({ props: o, states: ['size', 'variant', 'required', 'focused'] })
    let C = f
    typeof C > 'u' && b && (C = b.filled || b.focused || b.adornedStart)
    const v = {
        ...o,
        disableAnimation: s,
        formControl: b,
        shrink: C,
        size: g.size,
        variant: g.variant,
        required: g.required,
        focused: g.focused,
      },
      w = iM(v)
    return q.jsx(sM, { 'data-shrink': C, ref: l, className: Ae(w.root, h), ...m, ownerState: v, classes: w })
  })
function cM(t) {
  return Je('MuiLink', t)
}
const fM = et('MuiLink', ['root', 'underlineNone', 'underlineHover', 'underlineAlways', 'button', 'focusVisible']),
  dM = ({ theme: t, ownerState: r }) => {
    const l = r.color
    if ('colorSpace' in t && t.colorSpace) {
      const u = lr(t, `palette.${l}.main`) || lr(t, `palette.${l}`) || r.color
      return t.alpha(u, 0.4)
    }
    const o = lr(t, `palette.${l}.main`, !1) || lr(t, `palette.${l}`, !1) || r.color,
      s = lr(t, `palette.${l}.mainChannel`) || lr(t, `palette.${l}Channel`)
    return 'vars' in t && s ? `rgba(${s} / 0.4)` : Ai(o, 0.4)
  },
  fb = {
    primary: !0,
    secondary: !0,
    error: !0,
    info: !0,
    success: !0,
    warning: !0,
    textPrimary: !0,
    textSecondary: !0,
    textDisabled: !0,
  },
  pM = t => {
    const { classes: r, component: l, focusVisible: o, underline: s } = t,
      u = { root: ['root', `underline${Oe(s)}`, l === 'button' && 'button', o && 'focusVisible'] }
    return tt(u, cM, r)
  },
  hM = ye(Ur, {
    name: 'MuiLink',
    slot: 'Root',
    overridesResolver: (t, r) => {
      const { ownerState: l } = t
      return [r.root, r[`underline${Oe(l.underline)}`], l.component === 'button' && r.button]
    },
  })(
    ut(({ theme: t }) => ({
      variants: [
        { props: { underline: 'none' }, style: { textDecoration: 'none' } },
        {
          props: { underline: 'hover' },
          style: { textDecoration: 'none', '&:hover': { textDecoration: 'underline' } },
        },
        {
          props: { underline: 'always' },
          style: { textDecoration: 'underline', '&:hover': { textDecorationColor: 'inherit' } },
        },
        {
          props: ({ underline: r, ownerState: l }) => r === 'always' && l.color !== 'inherit',
          style: { textDecorationColor: 'var(--Link-underlineColor)' },
        },
        {
          props: ({ underline: r, ownerState: l }) => r === 'always' && l.color === 'inherit',
          style: t.colorSpace ? { textDecorationColor: t.alpha('currentColor', 0.4) } : null,
        },
        ...Object.entries(t.palette)
          .filter(wn())
          .map(([r]) => ({
            props: { underline: 'always', color: r },
            style: { '--Link-underlineColor': t.alpha((t.vars || t).palette[r].main, 0.4) },
          })),
        {
          props: { underline: 'always', color: 'textPrimary' },
          style: { '--Link-underlineColor': t.alpha((t.vars || t).palette.text.primary, 0.4) },
        },
        {
          props: { underline: 'always', color: 'textSecondary' },
          style: { '--Link-underlineColor': t.alpha((t.vars || t).palette.text.secondary, 0.4) },
        },
        {
          props: { underline: 'always', color: 'textDisabled' },
          style: { '--Link-underlineColor': (t.vars || t).palette.text.disabled },
        },
        {
          props: { component: 'button' },
          style: {
            position: 'relative',
            WebkitTapHighlightColor: 'transparent',
            backgroundColor: 'transparent',
            outline: 0,
            border: 0,
            margin: 0,
            borderRadius: 0,
            padding: 0,
            cursor: 'pointer',
            userSelect: 'none',
            verticalAlign: 'middle',
            MozAppearance: 'none',
            WebkitAppearance: 'none',
            '&::-moz-focus-inner': { borderStyle: 'none' },
            [`&.${fM.focusVisible}`]: { outline: 'auto' },
          },
        },
      ],
    }))
  ),
  mM = S.forwardRef(function (r, l) {
    const o = ot({ props: r, name: 'MuiLink' }),
      s = Li(),
      {
        className: u,
        color: f = 'primary',
        component: p = 'a',
        onBlur: h,
        onFocus: m,
        TypographyClasses: g,
        underline: b = 'always',
        variant: C = 'inherit',
        sx: v,
        ...w
      } = o,
      [R, T] = S.useState(!1),
      A = _ => {
        ;(Du(_.target) || T(!1), h && h(_))
      },
      O = _ => {
        ;(Du(_.target) && T(!0), m && m(_))
      },
      M = { ...o, color: f, component: p, focusVisible: R, underline: b, variant: C },
      z = pM(M)
    return q.jsx(hM, {
      color: f,
      className: Ae(z.root, u),
      classes: g,
      component: p,
      onBlur: A,
      onFocus: O,
      ref: l,
      ownerState: M,
      variant: C,
      ...w,
      sx: [...(fb[f] === void 0 ? [{ color: f }] : []), ...(Array.isArray(v) ? v : [v])],
      style: {
        ...w.style,
        ...(b === 'always' &&
          f !== 'inherit' &&
          !fb[f] && { '--Link-underlineColor': dM({ theme: s, ownerState: M }) }),
      },
    })
  }),
  gM = S.createContext({})
function yM(t) {
  return Je('MuiList', t)
}
et('MuiList', ['root', 'padding', 'dense', 'subheader'])
const bM = t => {
    const { classes: r, disablePadding: l, dense: o, subheader: s } = t
    return tt({ root: ['root', !l && 'padding', o && 'dense', s && 'subheader'] }, yM, r)
  },
  vM = ye('ul', {
    name: 'MuiList',
    slot: 'Root',
    overridesResolver: (t, r) => {
      const { ownerState: l } = t
      return [r.root, !l.disablePadding && r.padding, l.dense && r.dense, l.subheader && r.subheader]
    },
  })({
    listStyle: 'none',
    margin: 0,
    padding: 0,
    position: 'relative',
    variants: [
      { props: ({ ownerState: t }) => !t.disablePadding, style: { paddingTop: 8, paddingBottom: 8 } },
      { props: ({ ownerState: t }) => t.subheader, style: { paddingTop: 0, isolation: 'isolate' } },
    ],
  }),
  SM = S.forwardRef(function (r, l) {
    const o = ot({ props: r, name: 'MuiList' }),
      { children: s, className: u, component: f = 'ul', dense: p = !1, disablePadding: h = !1, subheader: m, ...g } = o,
      b = S.useMemo(() => ({ dense: p }), [p]),
      C = { ...o, component: f, dense: p, disablePadding: h },
      v = bM(C)
    return q.jsx(gM.Provider, {
      value: b,
      children: q.jsxs(vM, { as: f, className: Ae(v.root, u), ref: l, ownerState: C, ...g, children: [m, s] }),
    })
  }),
  xM = S.createContext(void 0),
  RM = Object.is
function EM(t, r) {
  if (t === r) return !0
  if (!(t instanceof Object) || !(r instanceof Object)) return !1
  let l = 0,
    o = 0
  for (const s in t) if (((l += 1), !RM(t[s], r[s]) || !(s in r))) return !1
  for (const s in r) o += 1
  return l === o
}
const TM = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'Home', 'End']
function CM(t) {
  const {
      activeItemId: r,
      getDefaultActiveItemId: l,
      orientation: o,
      isRtl: s = !1,
      isItemFocusable: u = gi,
      wrap: f = !0,
    } = t,
    [p, h] = S.useState(r),
    [m, g] = S.useState(r)
  let b = p
  r !== m && (g(r), r !== void 0 && r !== p && ((b = r), h(r)))
  const C = S.useRef(null),
    v = S.useRef(new Map()),
    [w, R] = S.useState(0),
    T = S.useMemo(() => dp(v.current), [w]),
    A = db(b, T, u, l),
    O = S.useRef(A)
  O.current = A
  const M = S.useCallback(() => {
      const x = dp(v.current),
        G = db(O.current, x, u, l)
      return f1(x, G)
    }, [l, u]),
    z = S.useCallback(() => v.current, []),
    _ = Pt(x => {
      const G = v.current.get(x.id)
      EM(G ?? null, x) || (v.current.set(x.id, x), R(L => L + 1))
    }),
    k = Pt(x => {
      v.current.delete(x) && R(G => G + 1)
    }),
    V = Pt(x => {
      h(x)
    }),
    Q = S.useCallback(x => O.current === x, []),
    oe = S.useCallback(
      (x, G, L, U) => {
        var W
        const N = su(v.current),
          H = u1(N, x, G, L, U ?? u)
        return H ? ((W = H.element) == null || W.focus(), h(H.id), H) : null
      },
      [u]
    ),
    ce = S.useCallback(
      x => ({
        onFocus: U => {
          const N = su(v.current),
            H = p1(N, U.target)
          H !== -1 && h(N[H].id)
        },
        onKeyDown: U => {
          if (U.altKey || U.shiftKey || U.ctrlKey || U.metaKey || !TM.includes(U.key)) return
          let N = o === 'horizontal' ? 'ArrowLeft' : 'ArrowUp',
            H = o === 'horizontal' ? 'ArrowRight' : 'ArrowDown'
          o === 'horizontal' && s && ((N = 'ArrowRight'), (H = 'ArrowLeft'))
          const W = su(v.current),
            ue = zr(tn(C.current)),
            D = ue === C.current
          let I = pb(W, ue, O.current),
            ee = 'next'
          switch (U.key) {
            case N:
              ;((ee = 'previous'), U.preventDefault(), D && (I = W.length))
              break
            case H:
              ;(U.preventDefault(), D && (I = -1))
              break
            case 'Home':
              ;(U.preventDefault(), (I = -1))
              break
            case 'End':
              ;(U.preventDefault(), (ee = 'previous'), (I = W.length))
              break
            default:
              return
          }
          oe(I, ee, f)
        },
        ref: MM(x, U => {
          C.current = U
        }),
      }),
      [oe, s, o, f]
    ),
    Z = S.useCallback(
      x => {
        var H
        const G = su(v.current),
          L = zr(tn(C.current)),
          N = L === C.current ? -1 : pb(G, L, O.current)
        return ((H = oe(N, 'next', !0, x)) == null ? void 0 : H.id) ?? null
      },
      [oe]
    )
  return S.useMemo(
    () => ({
      activeItemId: A,
      focusNext: Z,
      getActiveItem: M,
      getContainerProps: ce,
      getItemMap: z,
      isItemActive: Q,
      registerItem: _,
      setActiveItemId: V,
      unregisterItem: k,
    }),
    [A, Z, M, ce, z, Q, _, V, k]
  )
}
function db(t, r, l, o) {
  return t != null ? wM(t, r, l) : AM(r, l, o)
}
function wM(t, r, l) {
  var s
  const o = d1(r, t)
  return o === -1 ? c1(r, l) : l(r[o]) ? r[o].id : (((s = u1(r, o, 'next', !1, l)) == null ? void 0 : s.id) ?? null)
}
function AM(t, r, l) {
  const o = l == null ? void 0 : l(t)
  if (o != null) {
    const s = f1(t, o)
    if (s && r(s)) return s.id
  }
  return c1(t, r)
}
function pb(t, r, l) {
  if (r) {
    const o = p1(t, r)
    if (o !== -1) return o
  }
  return d1(t, l)
}
function u1(t, r, l, o, s) {
  const u = t.length - 1
  if (u === -1) return null
  let f = !1,
    p = hb(r, u, l, o)
  const h = p
  for (; p !== -1;) {
    if (p === h) {
      if (f) return null
      f = !0
    }
    const m = t[p]
    if (!m || !s(m)) p = hb(p, u, l, o)
    else return m
  }
  return null
}
function c1(t, r) {
  var l
  return ((l = t.find(o => r(o))) == null ? void 0 : l.id) ?? null
}
function f1(t, r) {
  return r == null ? null : (t.find(l => l.id === r) ?? null)
}
function d1(t, r) {
  return r == null ? -1 : t.findIndex(l => l.id === r)
}
function p1(t, r) {
  return r
    ? t.findIndex(l => {
        var o
        return l.element === r || ((o = l.element) == null ? void 0 : o.contains(r))
      })
    : -1
}
function dp(t) {
  const r = Array.from(t.values())
  if (r.every(s => s.element == null)) return r
  const l = r.filter(pp).sort((s, u) => OM(s.element, u.element)),
    o = r.filter(s => !pp(s))
  return [...l, ...o]
}
function su(t) {
  return dp(t).filter(pp)
}
function hb(t, r, l, o = !0) {
  return l === 'next' ? (t === r ? (o ? 0 : -1) : t + 1) : t === 0 ? (o ? r : -1) : t - 1
}
function gi(t) {
  return t.element
    ? t.focusableWhenDisabled
      ? !0
      : !t.disabled &&
        !t.element.hasAttribute('disabled') &&
        t.element.getAttribute('aria-disabled') !== 'true' &&
        t.element.hasAttribute('tabindex')
    : !1
}
function pp(t) {
  return t.element != null && t.element.isConnected
}
function OM(t, r) {
  if (t === r) return 0
  const l = t.compareDocumentPosition(r)
  return l & Node.DOCUMENT_POSITION_FOLLOWING || l & Node.DOCUMENT_POSITION_CONTAINED_BY
    ? -1
    : l & Node.DOCUMENT_POSITION_PRECEDING || l & Node.DOCUMENT_POSITION_CONTAINS
      ? 1
      : 0
}
function MM(...t) {
  return r => {
    t.forEach(l => {
      ip(l ?? null, r)
    })
  }
}
function _M(t, r) {
  if (r == null) {
    t.focus()
    return
  }
  try {
    t.focus({ focusVisible: r === 'keyboard' })
  } catch {
    t.focus()
  }
}
function NM(t) {
  return t
    ? t.type === 'mousedown' || t.type === 'pointerdown' || t.type === 'touchstart'
      ? 'pointer'
      : t.type === 'keydown' || (t.type === 'click' && t.detail === 0)
        ? 'keyboard'
        : null
    : null
}
function DM(t) {
  return t == null || (typeof t == 'string' && !t.trim())
}
function vu(t, r) {
  return typeof r == 'object' && r !== null ? t === r : String(t) === String(r)
}
const h1 = S.createContext(null)
function BM() {
  return S.useContext(h1)
}
const zM = h1.Provider,
  UM = S.createContext(void 0)
function kM(t) {
  const r = (t == null ? void 0 : t.element) ?? t
  if (!r) return ''
  if ((t == null ? void 0 : t.textValue) !== void 0) return t.textValue
  let l = r.innerText
  return (l === void 0 && (l = r.textContent), l ?? '')
}
function m1(t, r) {
  if (r === void 0) return !0
  let l = kM(t)
  return (
    (l = l.trim().toLowerCase()),
    l.length === 0 ? !1 : r.repeating ? l[0] === r.keys[0] : l.startsWith(r.keys.join(''))
  )
}
function LM(t, r) {
  return m1(t, r) ? gi(t) : !1
}
function jM(t, r) {
  _M(t, r)
}
const $M = S.forwardRef(function (r, l) {
  const {
      actions: o,
      autoFocus: s = !1,
      autoFocusItem: u = !1,
      children: f,
      className: p,
      disabledItemsFocusable: h = !1,
      disableListWrap: m = !1,
      onKeyDown: g,
      variant: b = 'selectedMenu',
      ...C
    } = r,
    v = S.useRef(null),
    w = S.useRef(!1),
    [R, T] = S.useState(!1),
    A = BM(),
    O = S.useRef({ keys: [], repeating: !0, previousKeyMatched: !0, lastTime: null }),
    M = S.useCallback(
      U => {
        var N, H, W
        return b === 'selectedMenu'
          ? (((N = U.find(ue => ue.selected && gi(ue))) == null ? void 0 : N.id) ??
              ((H = U.find(ue => gi(ue))) == null ? void 0 : H.id) ??
              null)
          : (((W = U.find(ue => gi(ue))) == null ? void 0 : W.id) ?? null)
      },
      [b]
    ),
    z = CM({ activeItemId: void 0, getDefaultActiveItemId: M, orientation: 'vertical', wrap: !m }),
    { activeItemId: _, focusNext: k, getActiveItem: V, getContainerProps: Q, getItemMap: oe } = z,
    ce = Pt((U = !1) => {
      if (!v.current || (!U && w.current)) return null
      if (u) {
        const N = V()
        if (N != null && N.element) {
          const H = Array.from(oe().values()).some(ue => ue.selected),
            W = b === 'menu' && H && !N.selected && A == null
          return (T(W), jM(N.element, A), (w.current = !0), N.element)
        }
        return s ? (T(!1), v.current.focus(), v.current) : null
      }
      return s ? (T(!1), v.current.focus(), (w.current = !0), v.current) : (T(!1), null)
    })
  ;(on(() => {
    if (!s && !u) {
      ;((w.current = !1), T(!1))
      return
    }
    ce()
  }, [_, u, s, ce]),
    S.useImperativeHandle(
      o,
      () => ({
        adjustStyleForScrollbar: (U, { direction: N }) => {
          const H = !v.current.style.width
          if (U.clientHeight < v.current.clientHeight && H) {
            const W = `${i1(jr(U))}px`
            ;((v.current.style[N === 'rtl' ? 'paddingLeft' : 'paddingRight'] = W),
              (v.current.style.width = `calc(100% + ${W})`))
          }
          return v.current
        },
        focusInitialTarget: () => {
          if (!v.current) return null
          const U = zr(tn(v.current))
          return U && bu(v.current, U) ? U : ce(!0)
        },
      }),
      [ce]
    ))
  const Z = Q(),
    x = sn(v, Z.ref, l),
    G = S.useMemo(() => ({ itemsFocusableWhenDisabled: h, suppressInitialFocusVisible: R, variant: b }), [h, R, b]),
    L = Pt(U => {
      if ((R && T(!1), (U.ctrlKey || U.metaKey || U.altKey) && g)) {
        g(U)
        return
      }
      if ((Z.onKeyDown(U), U.key.length === 1)) {
        const H = O.current,
          W = U.key.toLowerCase(),
          ue = performance.now()
        ;(H.keys.length > 0 &&
          (ue - H.lastTime > 500
            ? ((H.keys = []), (H.repeating = !0), (H.previousKeyMatched = !0))
            : H.repeating && W !== H.keys[0] && (H.repeating = !1)),
          (H.lastTime = ue),
          H.keys.push(W))
        const D = zr(tn(v.current)),
          I = D && !H.repeating && m1(D, H)
        H.previousKeyMatched && (I || k(ee => LM(ee, H)) != null) ? U.preventDefault() : (H.previousKeyMatched = !1)
      }
      g && g(U)
    })
  return q.jsx(SM, {
    role: 'menu',
    ref: x,
    className: p,
    onKeyDown: L,
    onFocus: Z.onFocus,
    tabIndex: -1,
    ...C,
    children: q.jsx(UM.Provider, { value: G, children: q.jsx(xM.Provider, { value: z, children: f }) }),
  })
})
function HM(t) {
  return Je('MuiPopover', t)
}
et('MuiPopover', ['root', 'paper'])
function mb(t, r) {
  let l = 0
  return (typeof r == 'number' ? (l = r) : r === 'center' ? (l = t.height / 2) : r === 'bottom' && (l = t.height), l)
}
function gb(t, r) {
  let l = 0
  return (typeof r == 'number' ? (l = r) : r === 'center' ? (l = t.width / 2) : r === 'right' && (l = t.width), l)
}
function yb(t) {
  return [t.horizontal, t.vertical].map(r => (typeof r == 'number' ? `${r}px` : r)).join(' ')
}
function uu(t) {
  return typeof t == 'function' ? t() : t
}
const PM = t => {
    const { classes: r } = t
    return tt({ root: ['root'], paper: ['paper'] }, HM, r)
  },
  qM = ye($O, { name: 'MuiPopover', slot: 'Root' })({}),
  g1 = ye(uc, { name: 'MuiPopover', slot: 'Paper' })({
    position: 'absolute',
    overflowY: 'auto',
    overflowX: 'hidden',
    minWidth: 16,
    minHeight: 16,
    maxWidth: 'calc(100% - 32px)',
    maxHeight: 'calc(100% - 32px)',
    outline: 0,
  }),
  IM = S.forwardRef(function (r, l) {
    const o = ot({ props: r, name: 'MuiPopover' }),
      {
        action: s,
        anchorEl: u,
        anchorOrigin: f = { vertical: 'top', horizontal: 'left' },
        anchorPosition: p,
        anchorReference: h = 'anchorEl',
        children: m,
        className: g,
        container: b,
        disableAutoFocus: C = !1,
        elevation: v = 8,
        marginThreshold: w = 16,
        open: R,
        slots: T = {},
        slotProps: A = {},
        transformOrigin: O = { vertical: 'top', horizontal: 'left' },
        transitionDuration: M = 'auto',
        disableScrollLock: z = !1,
        ..._
      } = o,
      k = S.useRef(),
      V = {
        ...o,
        anchorOrigin: f,
        anchorReference: h,
        elevation: v,
        marginThreshold: w,
        transformOrigin: O,
        transitionDuration: M,
      },
      Q = PM(V),
      oe = S.useCallback(() => {
        if (h === 'anchorPosition') return p
        const fe = uu(u),
          Me = (fe && fe.nodeType === 1 ? fe : tn(k.current).body).getBoundingClientRect()
        return { top: Me.top + mb(Me, f.vertical), left: Me.left + gb(Me, f.horizontal) }
      }, [u, f.horizontal, f.vertical, p, h]),
      ce = S.useCallback(
        fe => ({ vertical: mb(fe, O.vertical), horizontal: gb(fe, O.horizontal) }),
        [O.horizontal, O.vertical]
      ),
      Z = S.useCallback(
        fe => {
          const Se = { width: fe.offsetWidth, height: fe.offsetHeight },
            Me = ce(Se)
          if (h === 'none') return { top: null, left: null, transformOrigin: yb(Me) }
          const Ye = oe()
          let Ne = Ye.top - Me.vertical,
            ze = Ye.left - Me.horizontal
          const Ee = Ne + Se.height,
            Ve = ze + Se.width,
            ge = jr(uu(u)),
            Te = ge.innerHeight - w,
            gt = ge.innerWidth - w
          if (w != null && Ne < w) {
            const He = Ne - w
            ;((Ne -= He), (Me.vertical += He))
          } else if (w != null && Ee > Te) {
            const He = Ee - Te
            ;((Ne -= He), (Me.vertical += He))
          }
          if (w != null && ze < w) {
            const He = ze - w
            ;((ze -= He), (Me.horizontal += He))
          } else if (Ve > gt) {
            const He = Ve - gt
            ;((ze -= He), (Me.horizontal += He))
          }
          return { top: `${Math.round(Ne)}px`, left: `${Math.round(ze)}px`, transformOrigin: yb(Me) }
        },
        [u, h, oe, ce, w]
      ),
      [x, G] = S.useState(R),
      L = S.useCallback(() => {
        const fe = k.current
        if (!fe) return
        const Se = Z(fe)
        ;(Se.top != null && fe.style.setProperty('top', Se.top),
          Se.left != null && (fe.style.left = Se.left),
          (fe.style.transformOrigin = Se.transformOrigin),
          G(!0))
      }, [Z])
    S.useEffect(
      () => (z && window.addEventListener('scroll', L), () => window.removeEventListener('scroll', L)),
      [u, z, L]
    )
    const U = () => {
        L()
      },
      N = () => {
        G(!1)
      }
    ;(S.useEffect(() => {
      R && L()
    }),
      S.useImperativeHandle(
        s,
        () =>
          R
            ? {
                updatePosition: () => {
                  L()
                },
              }
            : null,
        [R, L]
      ),
      S.useEffect(() => {
        if (!R) return
        const fe = Yv(() => {
            L()
          }),
          Se = jr(uu(u))
        return (
          Se.addEventListener('resize', fe),
          () => {
            ;(fe.clear(), Se.removeEventListener('resize', fe))
          }
        )
      }, [u, R, L]))
    let H = M
    const W = { slots: T, slotProps: A },
      [ue, D] = St('transition', {
        elementType: fp,
        externalForwardedProps: W,
        ownerState: V,
        getSlotProps: fe => ({
          ...fe,
          onEntering: (Se, Me) => {
            var Ye
            ;((Ye = fe.onEntering) == null || Ye.call(fe, Se, Me), U())
          },
          onExited: Se => {
            var Me
            ;((Me = fe.onExited) == null || Me.call(fe, Se), N())
          },
        }),
        additionalProps: { appear: !0, in: R },
      })
    M === 'auto' && !ue.muiSupportAuto && (H = void 0)
    const I = b || (u ? tn(uu(u)).body : void 0),
      [ee, { slots: te, slotProps: ie, ...pe }] = St('root', {
        ref: l,
        elementType: qM,
        externalForwardedProps: { ...W, ..._ },
        shouldForwardComponentProp: !0,
        additionalProps: {
          slots: { backdrop: T.backdrop },
          slotProps: { backdrop: zw(typeof A.backdrop == 'function' ? A.backdrop(V) : A.backdrop, { invisible: !0 }) },
          container: I,
          open: R,
        },
        ownerState: V,
        className: Ae(Q.root, g),
      }),
      [le, me] = St('paper', {
        ref: k,
        className: Q.paper,
        elementType: g1,
        externalForwardedProps: W,
        shouldForwardComponentProp: !0,
        additionalProps: { elevation: v, style: x ? void 0 : { opacity: 0 } },
        ownerState: V,
      })
    return q.jsx(ee, {
      ...pe,
      ...(!Ou(ee) && { slots: te, slotProps: ie, disableAutoFocus: C, disableScrollLock: z }),
      children: q.jsx(ue, { ...D, timeout: H, children: q.jsx(le, { ...me, children: m }) }),
    })
  })
function FM(t) {
  return Je('MuiMenu', t)
}
et('MuiMenu', ['root', 'paper', 'list'])
const YM = { vertical: 'top', horizontal: 'right' },
  VM = { vertical: 'top', horizontal: 'left' },
  GM = t => {
    const { classes: r } = t
    return tt({ root: ['root'], paper: ['paper'], list: ['list'] }, FM, r)
  },
  KM = ye(IM, { shouldForwardProp: t => Yn(t) || t === 'classes', name: 'MuiMenu', slot: 'Root' })({}),
  XM = ye(g1, { name: 'MuiMenu', slot: 'Paper' })({ maxHeight: 'calc(100% - 96px)', WebkitOverflowScrolling: 'touch' }),
  QM = ye($M, { name: 'MuiMenu', slot: 'List' })({ outline: 0 }),
  ZM = S.forwardRef(function (r, l) {
    const o = ot({ props: r, name: 'MuiMenu' }),
      {
        autoFocus: s = !0,
        children: u,
        className: f,
        disableAutoFocusItem: p = !1,
        onClose: h,
        open: m,
        PopoverClasses: g,
        transitionDuration: b = 'auto',
        variant: C = 'selectedMenu',
        slots: v = {},
        slotProps: w = {},
        ...R
      } = o,
      T = h2(),
      A = { ...o, autoFocus: s, disableAutoFocusItem: p, transitionDuration: b, variant: C },
      O = GM(A),
      M = s && m,
      z = M && !p,
      _ = S.useRef(null),
      k = (U, N) => {
        var H, W
        _.current &&
          (_.current.adjustStyleForScrollbar(U, { direction: T ? 'rtl' : 'ltr' }),
          M && ((W = (H = _.current).focusInitialTarget) == null || W.call(H)))
      },
      V = U => {
        U.key === 'Tab' && (U.preventDefault(), h && h(U, 'tabKeyDown'))
      },
      Q = { slots: v, slotProps: w },
      oe = WA({ elementType: v.root, externalSlotProps: w.root, ownerState: A, className: [O.root, f] }),
      [ce, Z] = St('paper', {
        className: O.paper,
        elementType: XM,
        externalForwardedProps: Q,
        shouldForwardComponentProp: !0,
        ownerState: A,
      }),
      [x, G] = St('list', {
        className: O.list,
        elementType: QM,
        shouldForwardComponentProp: !0,
        externalForwardedProps: Q,
        getSlotProps: U => ({
          ...U,
          onKeyDown: N => {
            var H
            ;(V(N), (H = U.onKeyDown) == null || H.call(U, N))
          },
        }),
        ownerState: A,
      }),
      L = typeof w.transition == 'function' ? w.transition(A) : w.transition
    return q.jsx(KM, {
      disableAutoFocus: s,
      onClose: h,
      anchorOrigin: { vertical: 'bottom', horizontal: T ? 'right' : 'left' },
      transformOrigin: T ? YM : VM,
      slots: { root: v.root, paper: ce, backdrop: v.backdrop, transition: v.transition },
      slotProps: {
        root: oe,
        paper: Z,
        backdrop: typeof w.backdrop == 'function' ? w.backdrop(A) : w.backdrop,
        transition: {
          ...L,
          onEntering: (...U) => {
            var N
            ;(k(...U), (N = L == null ? void 0 : L.onEntering) == null || N.call(L, ...U))
          },
        },
      },
      open: m,
      ref: l,
      transitionDuration: b,
      ownerState: A,
      ...R,
      classes: g,
      children: q.jsx(x, { actions: _, autoFocus: M, autoFocusItem: z, variant: C, ...G, children: u }),
    })
  }),
  WM = t => {
    const { classes: r, variant: l, disabled: o, multiple: s, open: u, error: f } = t,
      p = {
        select: ['select', l, o && 'disabled', s && 'multiple', f && 'error'],
        icon: ['icon', `icon${Oe(l)}`, u && 'iconOpen', o && 'disabled'],
      }
    return tt(p, Mw, r)
  },
  y1 = ye('select', { name: 'MuiNativeSelect' })(({ theme: t }) => ({
    MozAppearance: 'none',
    WebkitAppearance: 'none',
    userSelect: 'none',
    borderRadius: 0,
    cursor: 'pointer',
    '&:focus': { borderRadius: 0 },
    [`&.${Kp.disabled}`]: { cursor: 'default' },
    '&[multiple]': { height: 'auto' },
    '&:not([multiple]) option, &:not([multiple]) optgroup': { backgroundColor: (t.vars || t).palette.background.paper },
    variants: [
      {
        props: ({ ownerState: r }) => r.variant !== 'filled' && r.variant !== 'outlined',
        style: { '&&&': { paddingRight: 24, minWidth: 16 } },
      },
      { props: { variant: 'filled' }, style: { '&&&': { paddingRight: 32 } } },
      {
        props: { variant: 'outlined' },
        style: {
          borderRadius: (t.vars || t).shape.borderRadius,
          '&:focus': { borderRadius: (t.vars || t).shape.borderRadius },
          '&&&': { paddingRight: 32 },
        },
      },
    ],
  })),
  JM = ye(y1, {
    name: 'MuiNativeSelect',
    slot: 'Select',
    shouldForwardProp: Yn,
    overridesResolver: (t, r) => {
      const { ownerState: l } = t
      return [r.select, r[l.variant], l.error && r.error, { [`&.${Kp.multiple}`]: r.multiple }]
    },
  })({}),
  b1 = ye('svg', { name: 'MuiNativeSelect' })(({ theme: t }) => ({
    position: 'absolute',
    right: 0,
    top: 'calc(50% - .5em)',
    pointerEvents: 'none',
    color: (t.vars || t).palette.action.active,
    [`&.${Kp.disabled}`]: { color: (t.vars || t).palette.action.disabled },
    variants: [
      { props: ({ ownerState: r }) => r.open, style: { transform: 'rotate(180deg)' } },
      { props: { variant: 'filled' }, style: { right: 7 } },
      { props: { variant: 'outlined' }, style: { right: 7 } },
    ],
  })),
  e5 = ye(b1, {
    name: 'MuiNativeSelect',
    slot: 'Icon',
    overridesResolver: (t, r) => {
      const { ownerState: l } = t
      return [r.icon, l.variant && r[`icon${Oe(l.variant)}`], l.open && r.iconOpen]
    },
  })({}),
  t5 = S.forwardRef(function (r, l) {
    const { className: o, disabled: s, error: u, IconComponent: f, inputRef: p, variant: h = 'standard', ...m } = r,
      g = { ...r, disabled: s, variant: h, error: u },
      b = WM(g)
    return q.jsxs(S.Fragment, {
      children: [
        q.jsx(JM, { ownerState: g, className: Ae(b.select, o), disabled: s, ref: p || l, ...m }),
        r.multiple ? null : q.jsx(e5, { as: f, ownerState: g, className: b.icon }),
      ],
    })
  })
var bb
const n5 = ye('fieldset', { name: 'MuiNotchedOutlined', shouldForwardProp: Yn })({
    textAlign: 'left',
    position: 'absolute',
    bottom: 0,
    right: 0,
    top: -5,
    left: 0,
    margin: 0,
    padding: '0 8px',
    pointerEvents: 'none',
    borderRadius: 'inherit',
    borderStyle: 'solid',
    borderWidth: 1,
    overflow: 'hidden',
    minWidth: '0%',
  }),
  r5 = ye('legend', { name: 'MuiNotchedOutlined', shouldForwardProp: Yn })(
    ut(({ theme: t }) => ({
      float: 'unset',
      width: 'auto',
      overflow: 'hidden',
      variants: [
        {
          props: ({ ownerState: r }) => !r.withLabel,
          style: {
            padding: 0,
            lineHeight: '11px',
            ...Ut(t, 'width', { duration: 150, easing: t.transitions.easing.easeOut }),
          },
        },
        {
          props: ({ ownerState: r }) => r.withLabel,
          style: {
            display: 'block',
            padding: 0,
            height: 11,
            fontSize: '0.75em',
            visibility: 'hidden',
            maxWidth: 0.01,
            ...Ut(t, 'max-width', { duration: 50, easing: t.transitions.easing.easeOut }),
            whiteSpace: 'nowrap',
            '& > span': { paddingLeft: 5, paddingRight: 5, display: 'inline-block', opacity: 0, visibility: 'visible' },
          },
        },
        {
          props: ({ ownerState: r }) => r.withLabel && r.notched,
          style: {
            maxWidth: '100%',
            ...Ut(t, 'max-width', { duration: 100, easing: t.transitions.easing.easeOut, delay: 50 }),
          },
        },
      ],
    }))
  )
function a5(t) {
  const { children: r, classes: l, className: o, label: s, notched: u, ...f } = t,
    p = s != null && s !== '',
    h = { ...t, notched: u, withLabel: p }
  return q.jsx(n5, {
    'aria-hidden': !0,
    className: o,
    ownerState: h,
    ...f,
    children: q.jsx(r5, {
      ownerState: h,
      children: p
        ? q.jsx('span', { children: s })
        : bb || (bb = q.jsx('span', { className: 'notranslate', 'aria-hidden': !0, children: '​' })),
    }),
  })
}
const l5 = t => {
    const { classes: r } = t,
      o = tt({ root: ['root'], notchedOutline: ['notchedOutline'], input: ['input'] }, _w, r)
    return { ...r, ...o }
  },
  o5 = ye(ic, {
    shouldForwardProp: t => Yn(t) || t === 'classes',
    name: 'MuiOutlinedInput',
    slot: 'Root',
    overridesResolver: lc,
  })(
    ut(({ theme: t }) => {
      const r = t.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'
      return {
        position: 'relative',
        borderRadius: (t.vars || t).shape.borderRadius,
        [`&:hover .${nr.notchedOutline}`]: { borderColor: (t.vars || t).palette.text.primary },
        '@media (hover: none)': {
          [`&:hover .${nr.notchedOutline}`]: {
            borderColor: t.vars ? t.alpha(t.vars.palette.common.onBackground, 0.23) : r,
          },
        },
        [`&.${nr.focused} .${nr.notchedOutline}`]: { borderWidth: 2 },
        variants: [
          ...Object.entries(t.palette)
            .filter(wn())
            .map(([l]) => ({
              props: { color: l },
              style: { [`&.${nr.focused} .${nr.notchedOutline}`]: { borderColor: (t.vars || t).palette[l].main } },
            })),
          {
            props: {},
            style: {
              [`&.${nr.error} .${nr.notchedOutline}`]: { borderColor: (t.vars || t).palette.error.main },
              [`&.${nr.disabled} .${nr.notchedOutline}`]: { borderColor: (t.vars || t).palette.action.disabled },
            },
          },
          { props: ({ ownerState: l }) => l.startAdornment, style: { paddingLeft: 14 } },
          { props: ({ ownerState: l }) => l.endAdornment, style: { paddingRight: 14 } },
          { props: ({ ownerState: l }) => l.multiline, style: { padding: '16.5px 14px' } },
          { props: ({ ownerState: l, size: o }) => l.multiline && o === 'small', style: { padding: '8.5px 14px' } },
        ],
      }
    })
  ),
  i5 = ye(a5, { name: 'MuiOutlinedInput', slot: 'NotchedOutline' })(
    ut(({ theme: t }) => {
      const r = t.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'
      return { borderColor: t.vars ? t.alpha(t.vars.palette.common.onBackground, 0.23) : r }
    })
  ),
  s5 = ye(sc, { name: 'MuiOutlinedInput', slot: 'Input', overridesResolver: oc })(
    ut(({ theme: t }) => ({
      padding: '16.5px 14px',
      '&:-webkit-autofill': {
        ...(!t.vars && {
          WebkitBoxShadow: t.palette.mode === 'light' ? null : '0 0 0 100px #266798 inset',
          WebkitTextFillColor: t.palette.mode === 'light' ? null : '#fff',
          caretColor: t.palette.mode === 'light' ? null : '#fff',
        }),
        borderRadius: 'inherit',
        ...(t.vars &&
          t.applyStyles('dark', {
            WebkitBoxShadow: '0 0 0 100px #266798 inset',
            WebkitTextFillColor: '#fff',
            caretColor: '#fff',
          })),
      },
      variants: [
        { props: { size: 'small' }, style: { padding: '8.5px 14px' } },
        { props: ({ ownerState: r }) => r.multiline, style: { padding: 0 } },
        { props: ({ ownerState: r }) => r.startAdornment, style: { paddingLeft: 0 } },
        { props: ({ ownerState: r }) => r.endAdornment, style: { paddingRight: 0 } },
      ],
    }))
  ),
  eh = S.forwardRef(function (r, l) {
    const o = ot({ props: r, name: 'MuiOutlinedInput' }),
      {
        fullWidth: s = !1,
        inputComponent: u = 'input',
        label: f,
        multiline: p = !1,
        notched: h,
        slots: m = {},
        slotProps: g = {},
        type: b = 'text',
        ...C
      } = o,
      v = l5(o),
      [w, R] = to({ props: o, states: ['color', 'disabled', 'error', 'focused', 'hiddenLabel', 'size', 'required'] }),
      T = {
        ...o,
        color: w.color || 'primary',
        disabled: w.disabled,
        error: w.error,
        focused: w.focused,
        formControl: R,
        fullWidth: s,
        hiddenLabel: w.hiddenLabel,
        multiline: p,
        size: w.size,
        type: b,
      },
      A = m.root ?? o5,
      O = m.input ?? s5,
      [M, z] = St('notchedOutline', {
        elementType: i5,
        className: v.notchedOutline,
        shouldForwardComponentProp: !0,
        ownerState: T,
        externalForwardedProps: { slots: m, slotProps: g },
        additionalProps: {
          label: f != null && f !== '' && w.required ? q.jsxs(S.Fragment, { children: [f, ' ', '*'] }) : f,
        },
      })
    return q.jsx(Gp, {
      slots: { root: A, input: O },
      slotProps: g,
      renderSuffix: _ =>
        q.jsx(M, { ...z, notched: typeof h < 'u' ? h : !!(_.startAdornment || _.filled || _.focused) }),
      fullWidth: s,
      inputComponent: u,
      multiline: p,
      ref: l,
      type: b,
      ...C,
      classes: { ...v, notchedOutline: null },
    })
  })
eh.muiName = 'Input'
function v1(t) {
  return Je('MuiSelect', t)
}
const si = et('MuiSelect', [
  'root',
  'select',
  'multiple',
  'filled',
  'outlined',
  'standard',
  'disabled',
  'focused',
  'icon',
  'iconOpen',
  'nativeInput',
  'error',
])
function u5(t) {
  return Object.prototype.hasOwnProperty.call(t.props, 'value')
}
function S1(t) {
  if (typeof t == 'string' || typeof t == 'number') return String(t)
  let r = ''
  return (
    S.Children.forEach(t, l => {
      typeof l == 'string' || typeof l == 'number'
        ? (r += String(l))
        : S.isValidElement(l) && (r += S1(l.props.children))
    }),
    r
  )
}
function c5(t, r, l = 0) {
  if (t.length === 0) return -1
  const o = ((l % t.length) + t.length) % t.length
  for (let s = 0; s < t.length; s += 1) {
    const u = (o + s) % t.length
    if (t[u].label.startsWith(r)) return u
  }
  return -1
}
function f5(t, r) {
  return !t.some(l => l.label[0] === r && l.label[1] === r)
}
function d5(t, r) {
  const l = []
  let o = -1
  for (let s = 0; s < t.length; s += 1) {
    const u = t[s]
    if (!S.isValidElement(u) || !u5(u) || u.props.disabled) continue
    const f = S1(u.props.children).trim().toLowerCase()
    f !== '' &&
      (o === -1 && vu(r, u.props.value) && (o = l.length), l.push({ child: u, label: f, value: u.props.value }))
  }
  return { options: l, selectedIndex: o }
}
var vb
const cu = 2,
  p5 = 400,
  Sb = 200,
  h5 = 750,
  Ia = ' ',
  m5 = 'ArrowUp',
  g5 = 'ArrowDown',
  y5 = 'Enter'
function xb(t, r) {
  var s
  if (!r) return !1
  if (t.composedPath().includes(r) || ((s = t.target) != null && s.nodeType && r.contains(t.target))) return !0
  const o = r.getBoundingClientRect()
  return o.width === 0 && o.height === 0
    ? !1
    : t.clientX >= o.left - cu && t.clientX <= o.right + cu && t.clientY >= o.top - cu && t.clientY <= o.bottom + cu
}
const b5 = ye(y1, {
    name: 'MuiSelect',
    slot: 'Select',
    overridesResolver: (t, r) => {
      const { ownerState: l } = t
      return [
        { [`&.${si.select}`]: r.select },
        { [`&.${si.select}`]: r[l.variant] },
        { [`&.${si.error}`]: r.error },
        { [`&.${si.multiple}`]: r.multiple },
      ]
    },
  })({
    [`&.${si.select}`]: {
      height: 'auto',
      minHeight: '1.4375em',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
  }),
  v5 = ye(b1, {
    name: 'MuiSelect',
    slot: 'Icon',
    overridesResolver: (t, r) => {
      const { ownerState: l } = t
      return [r.icon, l.open && r.iconOpen]
    },
  })({}),
  S5 = ye('input', { shouldForwardProp: t => Vv(t) && t !== 'classes', name: 'MuiSelect', slot: 'NativeInput' })({
    bottom: 0,
    left: 0,
    position: 'absolute',
    opacity: 0,
    pointerEvents: 'none',
    width: '100%',
    boxSizing: 'border-box',
  }),
  x5 = t => {
    const { classes: r, variant: l, disabled: o, multiple: s, open: u, error: f } = t
    return tt(
      {
        select: ['select', l, o && 'disabled', s && 'multiple', f && 'error'],
        icon: ['icon', u && 'iconOpen', o && 'disabled'],
        nativeInput: ['nativeInput'],
      },
      v1,
      r
    )
  },
  R5 = S.forwardRef(function (r, l) {
    var pr, Fr, hr, Rt
    const {
        'aria-describedby': o,
        'aria-label': s,
        autoFocus: u,
        autoWidth: f,
        children: p,
        className: h,
        defaultOpen: m,
        defaultValue: g,
        disabled: b,
        displayEmpty: C,
        error: v = !1,
        IconComponent: w,
        inputRef: R,
        labelId: T,
        MenuProps: A = {},
        multiple: O,
        name: M,
        onBlur: z,
        onChange: _,
        onClose: k,
        onFocus: V,
        onKeyDown: Q,
        onMouseDown: oe,
        onOpen: ce,
        open: Z,
        readOnly: x,
        renderValue: G,
        required: L,
        SelectDisplayProps: U = {},
        tabIndex: N,
        type: H,
        value: W,
        variant: ue = 'standard',
        ...D
      } = r,
      [I, ee] = G0({ controlled: W, default: g, name: 'Select' }),
      [te, ie] = G0({ controlled: Z, default: m, name: 'Select' }),
      pe = S.useRef(null),
      le = S.useRef(null),
      me = S.useRef(null),
      fe = S.useRef(!1),
      Se = S.useRef(!1),
      Me = S.useRef(null),
      Ye = S.useRef(!1),
      Ne = S.useRef({ allowSelectedMouseUp: !1, allowUnselectedMouseUp: !1 }),
      ze = S.useRef({ buffer: '', previousSearchIndex: null, matchedIndex: null }),
      Ee = pi(),
      Ve = pi(),
      ge = pi(),
      [Te, gt] = S.useState(null),
      { current: He } = S.useRef(Z != null),
      [un, cn] = S.useState(),
      [nn, qt] = S.useState(null),
      ya = sn(l, R),
      ur = S.useCallback(se => {
        ;((le.current = se), se && gt(se))
      }, []),
      Nt = Te == null ? void 0 : Te.parentNode
    S.useImperativeHandle(
      ya,
      () => ({
        focus: () => {
          le.current.focus()
        },
        node: pe.current,
        value: I,
      }),
      [I]
    )
    const je = Te !== null && te,
      ct = S.useCallback(() => {
        ;(ge.clear(),
          (ze.current.buffer = ''),
          (ze.current.previousSearchIndex = null),
          (ze.current.matchedIndex = null))
      }, [ge])
    on(() => {
      ;((fe.current = je), je && ct())
    }, [je, ct])
    const xt = S.useCallback(() => {
        ;(Ee.clear(), Ve.clear())
      }, [Ee, Ve]),
      De = S.useCallback(() => {
        ;(xt(), (Ye.current = !1), (Ne.current = { allowSelectedMouseUp: !1, allowUnselectedMouseUp: !1 }))
      }, [xt]),
      It = S.useCallback(() => {
        Me.current && (Me.current(), (Me.current = null))
      }, [])
    ;(S.useEffect(() => {
      je || (De(), It())
    }, [je, De, It]),
      S.useEffect(
        () => () => {
          ;(De(), It(), ct())
        },
        [De, It, ct]
      ),
      S.useEffect(() => {
        if (!je || !Nt || f || typeof ResizeObserver > 'u') return
        const se = new ResizeObserver(() => {
          cn(Nt.clientWidth)
        })
        return (
          se.observe(Nt),
          () => {
            se.disconnect()
          }
        )
      }, [je, Nt, f]),
      S.useEffect(() => {
        m && te && Te && !He && (cn(f ? null : Nt.clientWidth), le.current.focus())
      }, [Te, f]),
      S.useEffect(() => {
        u && le.current.focus()
      }, [u]),
      S.useEffect(() => {
        if (!T) return
        const se = tn(le.current).getElementById(T)
        if (se) {
          const be = () => {
            getSelection().isCollapsed && le.current.focus()
          }
          return (
            se.addEventListener('click', be),
            () => {
              se.removeEventListener('click', be)
            }
          )
        }
      }, [T]))
    const kt = Pt((se, be) => {
        ;(se || (De(), It()),
          se ? (ct(), qt(NM(be)), ce && ce(be)) : (qt(null), k && k(be)),
          He || ((fe.current = se), cn(f ? null : Nt.clientWidth), ie(se)))
      }),
      Gn = () => {
        ;(De(),
          Se.current
            ? Ve.start(Sb, () => {
                ;((Ne.current.allowUnselectedMouseUp = !0),
                  Ee.start(Sb, () => {
                    Ne.current.allowSelectedMouseUp = !0
                  }))
              })
            : Ee.start(p5, () => {
                ;((Ne.current.allowSelectedMouseUp = !0), (Ne.current.allowUnselectedMouseUp = !0))
              }))
      },
      it = se => {
        if ((oe == null || oe(se), se.button !== 0 || (se.preventDefault(), !le.current))) return
        le.current.focus()
        const be = tn(se.currentTarget)
        ;(Gn(), It())
        const we = Ge => {
          ;((Me.current = null),
            le.current && (xb(Ge, le.current) || xb(Ge, me.current) || (!fe.current && He) || kt(!1, Ge)))
        }
        ;(be.addEventListener('mouseup', we, { capture: !0, once: !0 }),
          (Me.current = () => {
            be.removeEventListener('mouseup', we, !0)
          }),
          kt(!0, se))
      },
      cr = se => {
        kt(!1, se)
      },
      Hr = S.Children.toArray(p),
      ba = se => {
        const be = Hr.find(we => we.props.value === se.target.value)
        be !== void 0 && (ee(be.props.value), _ && _(se, be))
      },
      Ii = (se, be, we) => {
        if ((ee(we), _)) {
          const Ge = se.nativeEvent || se,
            Ft = new Ge.constructor(Ge.type, Ge)
          ;(Object.defineProperty(Ft, 'target', { writable: !0, value: { value: we, name: M } }), _(Ft, be))
        }
      },
      Fi = se => be => {
        Ye.current = !1
        let we
        if (be.currentTarget.hasAttribute('tabindex')) {
          if (O) {
            we = Array.isArray(I) ? I.slice() : []
            const Ge = I.indexOf(se.props.value)
            Ge === -1 ? we.push(se.props.value) : we.splice(Ge, 1)
          } else we = se.props.value
          ;(se.props.onClick && se.props.onClick(be), I !== we && Ii(be, se, we), O || kt(!1, be))
        }
      },
      Yi = (se, be) => we => {
        var Ra, mr
        if (((mr = (Ra = se.props).onMouseUp) == null || mr.call(Ra, we), Ye.current)) {
          Ye.current = !1
          return
        }
        const Ge = !Ne.current.allowSelectedMouseUp && be,
          Ft = !Ne.current.allowUnselectedMouseUp && !be
        Ge || Ft || we.currentTarget.click()
      },
      lo = se => {
        var Ea
        const be = ze.current,
          we = be.buffer !== ''
        if (
          je ||
          O ||
          b ||
          se.defaultPrevented ||
          ((Ea = se.nativeEvent) != null && Ea.isComposing) ||
          se.key.length !== 1 ||
          se.ctrlKey ||
          se.metaKey ||
          se.altKey ||
          (se.key === Ia && !we)
        )
          return !1
        se.key === Ia && se.preventDefault()
        const Ge = be.buffer === '',
          { options: Ft, selectedIndex: Ra } = d5(Hr, I)
        if (Ft.length === 0) return (se.key !== Ia && ct(), !0)
        Ge && (be.previousSearchIndex = Ra)
        const mr = se.key.toLowerCase()
        ;(be.buffer === mr && f5(Ft, mr) && ((be.buffer = ''), (be.previousSearchIndex = be.matchedIndex)),
          (be.buffer += mr),
          ge.start(h5, ct))
        const io = c5(Ft, be.buffer, (be.previousSearchIndex ?? -1) + 1)
        if (io !== -1) {
          const Yr = Ft[io]
          return ((be.matchedIndex = io), vu(I, Yr.value) || Ii(se, Yr.child, Yr.value), !0)
        }
        return (se.key !== Ia && ct(), !0)
      },
      va = se => {
        if (!x) {
          const be = lo(se),
            we = se.key === Ia || se.key === m5 || se.key === g5 || se.key === y5
          ;(!be && we && (se.preventDefault(), kt(!0, se)), Q == null || Q(se))
        }
      },
      mc = se => {
        ;(ct(),
          !je && z && (Object.defineProperty(se, 'target', { writable: !0, value: { value: I, name: M } }), z(se)))
      },
      Vi = se => be => {
        var we, Ge
        ;((Ge = (we = se == null ? void 0 : se.props) == null ? void 0 : we.onKeyDown) == null || Ge.call(we, be),
          be.key === Ia &&
            be.target === be.currentTarget &&
            !be.defaultPrevented &&
            (be.preventDefault(), be.repeat || be.currentTarget.click()))
      }
    delete D['aria-invalid']
    let fr, Xa
    const Pr = []
    let Sa = !1,
      Qa = !1
    ;(Mu({ value: I }) || C) && (G ? (fr = G(I)) : (Sa = !0))
    const Kn = Hr.map(se => {
      if (!S.isValidElement(se)) return null
      let be
      if (O) {
        if (!Array.isArray(I)) throw new Error(Lr(2))
        ;((be = I.some(we => vu(we, se.props.value))), be && Sa && Pr.push(se.props.children))
      } else ((be = vu(I, se.props.value)), be && Sa && (Xa = se.props.children))
      return (
        be && (Qa = !0),
        S.cloneElement(se, {
          'aria-selected': be ? 'true' : 'false',
          onMouseDown: we => {
            var Ge, Ft
            ;((Ye.current = !0), (Ft = (Ge = se.props).onMouseDown) == null || Ft.call(Ge, we))
          },
          onPointerDown: we => {
            var Ge, Ft
            ;((Ye.current = !0), (Ft = (Ge = se.props).onPointerDown) == null || Ft.call(Ge, we))
          },
          onClick: Fi(se),
          onMouseUp: Yi(se, be),
          onKeyUp: we => {
            ;(we.key === Ia && we.preventDefault(), se.props.onKeyUp && se.props.onKeyUp(we))
          },
          onKeyDown: Vi(se),
          role: 'option',
          selected: be,
          value: void 0,
          'data-value': se.props.value,
        })
      )
    })
    ;(on(() => {
      ;((Se.current = Qa), !je && !O && !Qa && ct())
    }, [Qa, O, je, ct]),
      Sa &&
        (O
          ? Pr.length === 0
            ? (fr = null)
            : (fr = Pr.reduce((se, be, we) => (se.push(be), we < Pr.length - 1 && se.push(', '), se), []))
          : (fr = Xa)))
    let Dt = un
    !f && He && Te && (Dt = Nt.clientWidth)
    let Lt
    typeof N < 'u' ? (Lt = N) : (Lt = b ? null : 0)
    const qr = U.id || (M ? `mui-component-select-${M}` : void 0),
      Xn = { ...r, variant: ue, value: I, open: je, error: v },
      oo = x5(Xn),
      dr =
        typeof ((pr = A.slotProps) == null ? void 0 : pr.paper) == 'function'
          ? A.slotProps.paper(Xn)
          : (Fr = A.slotProps) == null
            ? void 0
            : Fr.paper,
      Gi = sn(dr == null ? void 0 : dr.ref, me),
      xa =
        typeof ((hr = A.slotProps) == null ? void 0 : hr.list) == 'function'
          ? A.slotProps.list(Xn)
          : (Rt = A.slotProps) == null
            ? void 0
            : Rt.list,
      Za = Oi(),
      Ir = Oi()
    return q.jsxs(S.Fragment, {
      children: [
        q.jsx(b5, {
          as: 'div',
          ref: ur,
          tabIndex: Lt,
          role: 'combobox',
          'aria-controls': je ? Za : void 0,
          'aria-disabled': b ? 'true' : void 0,
          'aria-expanded': je ? 'true' : 'false',
          'aria-haspopup': 'listbox',
          'aria-readonly': x ? 'true' : void 0,
          'aria-label': s,
          'aria-labelledby': T,
          'aria-describedby': o,
          'aria-required': L ? 'true' : void 0,
          'aria-invalid': v ? 'true' : void 0,
          onKeyDown: va,
          onMouseDown: b || x ? null : it,
          onBlur: mc,
          onFocus: V,
          ...U,
          ownerState: Xn,
          className: Ae(U.className, oo.select, h),
          id: qr,
          children: DM(fr)
            ? vb || (vb = q.jsx('span', { className: 'notranslate', 'aria-hidden': !0, children: '​' }))
            : fr,
        }),
        q.jsx(S5, {
          'aria-invalid': v,
          value: Array.isArray(I) ? I.join(',') : I,
          name: M,
          ref: pe,
          'aria-hidden': !0,
          onChange: ba,
          tabIndex: -1,
          disabled: b,
          readOnly: x,
          className: oo.nativeInput,
          autoFocus: u,
          required: L,
          ...D,
          id: D.id ?? Ir,
          ownerState: Xn,
        }),
        q.jsx(v5, { as: w, className: oo.icon, ownerState: Xn }),
        q.jsx(zM, {
          value: nn,
          children: q.jsx(ZM, {
            id: `menu-${M || ''}`,
            anchorEl: Nt,
            open: je,
            onClose: cr,
            anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
            transformOrigin: { vertical: 'top', horizontal: 'center' },
            ...A,
            slotProps: {
              ...A.slotProps,
              list: {
                'aria-labelledby': T,
                role: 'listbox',
                'aria-multiselectable': O ? 'true' : void 0,
                disableListWrap: !0,
                id: Za,
                ...xa,
              },
              paper: { ...dr, ref: Gi, style: { minWidth: Dt, ...(dr == null ? void 0 : dr.style) } },
            },
            children: Kn,
          }),
        }),
      ],
    })
  }),
  E5 = t => {
    const { classes: r } = t,
      o = tt({ root: ['root'] }, v1, r)
    return { ...r, ...o }
  },
  th = { name: 'MuiSelect', slot: 'Root', shouldForwardProp: t => Yn(t) && t !== 'variant' },
  T5 = ye(Jp, th)(''),
  C5 = ye(eh, th)(''),
  w5 = ye(Wp, th)(''),
  x1 = S.forwardRef(function (r, l) {
    const o = ot({ name: 'MuiSelect', props: r }),
      {
        autoWidth: s = !1,
        children: u,
        classes: f = {},
        className: p,
        defaultOpen: h = !1,
        displayEmpty: m = !1,
        IconComponent: g = tO,
        id: b,
        input: C,
        inputProps: v,
        label: w,
        labelId: R,
        MenuProps: T,
        multiple: A = !1,
        native: O = !1,
        onClose: M,
        onOpen: z,
        open: _,
        renderValue: k,
        SelectDisplayProps: V,
        variant: Q = 'outlined',
        ...oe
      } = o,
      ce = O ? t5 : R5,
      [Z] = to({ props: o, states: ['variant', 'error'] }),
      x = Z.variant || Q,
      G = { ...o, variant: x, classes: f },
      L = E5(G),
      { root: U, ...N } = L,
      H =
        C ||
        {
          standard: q.jsx(T5, { ownerState: G }),
          outlined: q.jsx(C5, { label: w, ownerState: G }),
          filled: q.jsx(w5, { ownerState: G }),
        }[x],
      W = sn(l, ji(H))
    return q.jsx(S.Fragment, {
      children: S.cloneElement(H, {
        inputComponent: ce,
        inputProps: {
          children: u,
          error: Z.error,
          IconComponent: g,
          variant: x,
          type: void 0,
          multiple: A,
          ...(O
            ? { id: b }
            : {
                autoWidth: s,
                defaultOpen: h,
                displayEmpty: m,
                labelId: R,
                MenuProps: T,
                onClose: M,
                onOpen: z,
                open: _,
                renderValue: k,
                SelectDisplayProps: { id: b, ...V },
              }),
          ...v,
          classes: v ? ln(N, v.classes) : N,
          ...(C ? C.props.inputProps : {}),
        },
        ...(((A && O) || m) && x === 'outlined' ? { notched: !0 } : {}),
        ref: W,
        className: Ae(H.props.className, p, L.root),
        ...(!C && { variant: x }),
        ...oe,
      }),
    })
  })
x1.muiName = 'Select'
function A5(t) {
  return Je('MuiToolbar', t)
}
et('MuiToolbar', ['root', 'gutters', 'regular', 'dense'])
const O5 = t => {
    const { classes: r, disableGutters: l, variant: o } = t
    return tt({ root: ['root', !l && 'gutters', o] }, A5, r)
  },
  M5 = ye('div', {
    name: 'MuiToolbar',
    slot: 'Root',
    overridesResolver: (t, r) => {
      const { ownerState: l } = t
      return [r.root, !l.disableGutters && r.gutters, r[l.variant]]
    },
  })(
    ut(({ theme: t }) => ({
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      variants: [
        {
          props: ({ ownerState: r }) => !r.disableGutters,
          style: {
            paddingLeft: t.spacing(2),
            paddingRight: t.spacing(2),
            [t.breakpoints.up('sm')]: { paddingLeft: t.spacing(3), paddingRight: t.spacing(3) },
          },
        },
        { props: { variant: 'dense' }, style: { minHeight: 48 } },
        { props: { variant: 'regular' }, style: t.mixins.toolbar },
      ],
    }))
  ),
  _5 = S.forwardRef(function (r, l) {
    const o = ot({ props: r, name: 'MuiToolbar' }),
      { className: s, component: u = 'div', disableGutters: f = !1, variant: p = 'regular', ...h } = o,
      m = { ...o, component: u, disableGutters: f, variant: p },
      g = O5(m)
    return q.jsx(M5, { as: u, className: Ae(g.root, s), ref: l, ownerState: m, ...h })
  })
function N5(t) {
  return Je('MuiTextField', t)
}
et('MuiTextField', ['root'])
const D5 = { standard: Jp, filled: Wp, outlined: eh },
  B5 = t => {
    const { classes: r } = t
    return tt({ root: ['root'] }, N5, r)
  },
  z5 = ye(VO, { name: 'MuiTextField', slot: 'Root' })({}),
  yi = S.forwardRef(function (r, l) {
    const o = ot({ props: r, name: 'MuiTextField' }),
      {
        autoComplete: s,
        autoFocus: u = !1,
        children: f,
        className: p,
        color: h = 'primary',
        defaultValue: m,
        disabled: g = !1,
        error: b = !1,
        fullWidth: C = !1,
        helperText: v,
        id: w,
        inputRef: R,
        label: T,
        maxRows: A,
        minRows: O,
        multiline: M = !1,
        name: z,
        onBlur: _,
        onChange: k,
        onFocus: V,
        placeholder: Q,
        required: oe = !1,
        rows: ce,
        select: Z = !1,
        slots: x = {},
        slotProps: G = {},
        type: L,
        value: U,
        variant: N = 'outlined',
        ...H
      } = o,
      W = {
        ...o,
        autoFocus: u,
        color: h,
        disabled: g,
        error: b,
        fullWidth: C,
        multiline: M,
        required: oe,
        select: Z,
        variant: N,
      },
      ue = B5(W),
      D = Oi(w),
      I = v && D ? `${D}-helper-text` : void 0,
      ee = T && D ? `${D}-label` : void 0,
      te = D5[N],
      ie = { slots: x, slotProps: G },
      [pe, le] = St('select', { elementType: x1, externalForwardedProps: ie, ownerState: W }),
      me = Z && le.native,
      fe = {},
      Se = ie.slotProps.inputLabel
    ;(N === 'outlined' && (Se && typeof Se.shrink < 'u' && (fe.notched = Se.shrink), (fe.label = T)),
      Z && (me || (fe.id = void 0), (fe['aria-describedby'] = void 0)))
    const [Me, Ye] = St('root', {
        elementType: z5,
        shouldForwardComponentProp: !0,
        externalForwardedProps: { ...ie, ...H },
        ownerState: W,
        className: Ae(ue.root, p),
        ref: l,
        additionalProps: { disabled: g, error: b, fullWidth: C, required: oe, color: h, variant: N },
      }),
      [Ne, ze] = St('input', { elementType: te, externalForwardedProps: ie, additionalProps: fe, ownerState: W }),
      [Ee, Ve] = St('inputLabel', { elementType: uM, externalForwardedProps: ie, ownerState: W }),
      [ge, Te] = St('htmlInput', { elementType: 'input', externalForwardedProps: ie, ownerState: W }),
      [gt, He] = St('formHelperText', { elementType: XO, externalForwardedProps: ie, ownerState: W }),
      un = q.jsx(Ne, {
        'aria-describedby': I,
        autoComplete: s,
        autoFocus: u,
        defaultValue: m,
        fullWidth: C,
        multiline: M,
        name: z,
        rows: ce,
        maxRows: A,
        minRows: O,
        type: L,
        value: U,
        id: D,
        inputRef: R,
        onBlur: _,
        onChange: k,
        onFocus: V,
        placeholder: Q,
        inputProps: Te,
        slots: { input: x.htmlInput ? ge : void 0 },
        ...ze,
      })
    return q.jsxs(Me, {
      ...Ye,
      children: [
        T != null &&
          T !== '' &&
          q.jsx(Ee, {
            htmlFor: Z && !me ? void 0 : D,
            id: ee,
            ...(Z && !me && { component: 'div' }),
            ...Ve,
            children: T,
          }),
        Z ? q.jsx(pe, { 'aria-describedby': I, id: D, labelId: ee, value: U, input: un, ...le, children: f }) : un,
        v && q.jsx(gt, { id: I, ...He, children: v }),
      ],
    })
  }),
  U5 = ({ blog: t, updateLikes: r, loggedInUser: l, removeBlogListing: o }) => {
    if (!t) return null
    const s = async h => {
        ;(h.preventDefault(), r(t))
      },
      u = async h => {
        ;(h.preventDefault(), window.confirm(`Remove blog ${t.title} by ${t.author}`) && o(t))
      },
      f = l && l.username === t.user.username,
      p = l
    return q.jsxs(uc, {
      className: 'blog',
      sx: { mt: 1, p: 2 },
      children: [
        q.jsx(Ur, { className: 'blog-title', variant: 'h5', sx: { fontWeight: 'heavy' }, children: t.title }),
        q.jsxs(Ur, { className: 'blog-author', variant: 'subtitle1', children: ['by ', t.author] }),
        q.jsx(mM, { href: t.url, className: 'blog-url', children: t.url }),
        q.jsxs(Ur, { className: 'blog-user', variant: 'body2', children: ['Added by ', t.user.name] }),
        q.jsxs(fO, {
          sx: { display: 'flex', flexDirection: 'row', gap: 1 },
          children: [
            q.jsxs(Ur, {
              className: 'blog-likes',
              variant: 'body1',
              children: [
                t.likes,
                ' likes',
                p &&
                  q.jsx(ha, {
                    variant: 'outlined',
                    className: 'like-button',
                    onClick: s,
                    sx: { ml: 1 },
                    children: 'Like',
                  }),
              ],
            }),
            f &&
              q.jsx(ha, {
                variant: 'outlined',
                color: 'error',
                className: 'remove-blog-button',
                onClick: u,
                sx: { mb: 1 },
                children: 'Delete',
              }),
          ],
        }),
      ],
    })
  },
  k5 = ({ blogs: t }) =>
    q.jsxs('div', {
      children: [
        q.jsx(Ur, { variant: 'h5', sx: { pt: 2 }, children: 'Behold the favourite Blogs' }),
        q.jsx('ul', {
          children: t.map(r =>
            q.jsx('li', { children: q.jsxs(Hl, { to: `/blogs/${r.id}`, children: [r.title, ' by ', r.author] }) }, r.id)
          ),
        }),
      ],
    }),
  L5 = ({ addNewBlog: t }) => {
    const [r, l] = S.useState(''),
      [o, s] = S.useState(''),
      [u, f] = S.useState(''),
      p = ju(),
      h = async m => {
        ;(m.preventDefault(), t({ title: r, author: o, url: u }), p('/'), l(''), s(''), f(''))
      }
    return q.jsxs('div', {
      children: [
        q.jsx(Ur, { variant: 'h4', sx: { py: 2 }, children: 'Add New Blog Listing' }),
        q.jsxs('form', {
          onSubmit: h,
          className: 'form-container',
          children: [
            q.jsx(yi, {
              id: 'title',
              className: 'new-blog-input',
              type: 'text',
              value: r,
              label: 'title',
              onChange: m => l(m.target.value),
            }),
            q.jsx(yi, {
              id: 'author',
              className: 'new-blog-input',
              type: 'text',
              value: o,
              label: 'author',
              onChange: m => s(m.target.value),
            }),
            q.jsx(yi, {
              id: 'url',
              className: 'new-blog-input',
              type: 'url',
              value: u,
              label: 'url',
              onChange: m => f(m.target.value),
            }),
            q.jsx(ha, { type: 'submit', variant: 'contained', style: { marginTop: 10 }, children: 'Create' }),
          ],
        }),
      ],
    })
  }
function R1(t, r) {
  return function () {
    return t.apply(r, arguments)
  }
}
const { toString: j5 } = Object.prototype,
  { getPrototypeOf: Kl } = Object,
  { iterator: $i, toStringTag: E1 } = Symbol,
  zu = (
    ({ hasOwnProperty: t }) =>
    (r, l) =>
      t.call(r, l)
  )(Object.prototype),
  Mi = (t, r) => {
    let l = t
    const o = []
    for (; l != null && l !== Object.prototype;) {
      if (o.indexOf(l) !== -1) return !1
      if ((o.push(l), zu(l, r))) return !0
      l = Kl(l)
    }
    return !1
  },
  $5 = (t, r) => (t != null && Mi(t, r) ? t[r] : void 0),
  nh = (t => r => {
    const l = j5.call(r)
    return t[l] || (t[l] = l.slice(8, -1).toLowerCase())
  })(Object.create(null)),
  Vn = t => ((t = t.toLowerCase()), r => nh(r) === t),
  cc = t => r => typeof r === t,
  { isArray: Ga } = Array,
  Xl = cc('undefined')
function ro(t) {
  return (
    t !== null &&
    !Xl(t) &&
    t.constructor !== null &&
    !Xl(t.constructor) &&
    mn(t.constructor.isBuffer) &&
    t.constructor.isBuffer(t)
  )
}
const T1 = Vn('ArrayBuffer')
function H5(t) {
  let r
  return (
    typeof ArrayBuffer < 'u' && ArrayBuffer.isView ? (r = ArrayBuffer.isView(t)) : (r = t && t.buffer && T1(t.buffer)),
    r
  )
}
const P5 = cc('string'),
  mn = cc('function'),
  C1 = cc('number'),
  ao = t => t !== null && typeof t == 'object',
  q5 = t => t === !0 || t === !1,
  Su = t => {
    if (!ao(t)) return !1
    const r = Kl(t)
    return (r === null || r === Object.prototype || Kl(r) === null) && !Mi(t, E1) && !Mi(t, $i)
  },
  I5 = t => {
    if (!ao(t) || ro(t)) return !1
    try {
      return Object.keys(t).length === 0 && Object.getPrototypeOf(t) === Object.prototype
    } catch {
      return !1
    }
  },
  F5 = Vn('Date'),
  Y5 = Vn('File'),
  V5 = t => !!(t && typeof t.uri < 'u'),
  G5 = t => t && typeof t.getParts < 'u',
  K5 = Vn('Blob'),
  X5 = Vn('FileList'),
  Q5 = t => ao(t) && mn(t.pipe)
function Z5() {
  return typeof globalThis < 'u'
    ? globalThis
    : typeof self < 'u'
      ? self
      : typeof window < 'u'
        ? window
        : typeof global < 'u'
          ? global
          : {}
}
const Rb = Z5(),
  Eb = typeof Rb.FormData < 'u' ? Rb.FormData : void 0,
  W5 = t => {
    if (!t) return !1
    if (Eb && t instanceof Eb) return !0
    const r = Kl(t)
    if (!r || r === Object.prototype || !mn(t.append)) return !1
    const l = nh(t)
    return l === 'formdata' || (l === 'object' && mn(t.toString) && t.toString() === '[object FormData]')
  },
  J5 = Vn('URLSearchParams'),
  [e_, t_, n_, r_] = ['ReadableStream', 'Request', 'Response', 'Headers'].map(Vn),
  a_ = t => (t.trim ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ''))
function Hi(t, r, { allOwnKeys: l = !1 } = {}) {
  if (t === null || typeof t > 'u') return
  let o, s
  if ((typeof t != 'object' && (t = [t]), Ga(t))) for (o = 0, s = t.length; o < s; o++) r.call(null, t[o], o, t)
  else {
    if (ro(t)) return
    const u = l ? Object.getOwnPropertyNames(t) : Object.keys(t),
      f = u.length
    let p
    for (o = 0; o < f; o++) ((p = u[o]), r.call(null, t[p], p, t))
  }
}
function w1(t, r) {
  if (ro(t)) return null
  r = r.toLowerCase()
  const l = Object.keys(t)
  let o = l.length,
    s
  for (; o-- > 0;) if (((s = l[o]), r === s.toLowerCase())) return s
  return null
}
const Ya = typeof globalThis < 'u' ? globalThis : typeof self < 'u' ? self : typeof window < 'u' ? window : global,
  A1 = t => !Xl(t) && t !== Ya
function hp(...t) {
  const { caseless: r, skipUndefined: l } = (A1(this) && this) || {},
    o = {},
    s = (u, f) => {
      if (f === '__proto__' || f === 'constructor' || f === 'prototype') return
      const p = (r && typeof f == 'string' && w1(o, f)) || f,
        h = zu(o, p) ? o[p] : void 0
      Su(h) && Su(u)
        ? (o[p] = hp(h, u))
        : Su(u)
          ? (o[p] = hp({}, u))
          : Ga(u)
            ? (o[p] = u.slice())
            : (!l || !Xl(u)) && (o[p] = u)
    }
  for (let u = 0, f = t.length; u < f; u++) {
    const p = t[u]
    if (!p || ro(p) || (Hi(p, s), typeof p != 'object' || Ga(p))) continue
    const h = Object.getOwnPropertySymbols(p)
    for (let m = 0; m < h.length; m++) {
      const g = h[m]
      g_.call(p, g) && s(p[g], g)
    }
  }
  return o
}
const l_ = (t, r, l, { allOwnKeys: o } = {}) => (
    Hi(
      r,
      (s, u) => {
        l && mn(s)
          ? Object.defineProperty(t, u, {
              __proto__: null,
              value: R1(s, l),
              writable: !0,
              enumerable: !0,
              configurable: !0,
            })
          : Object.defineProperty(t, u, { __proto__: null, value: s, writable: !0, enumerable: !0, configurable: !0 })
      },
      { allOwnKeys: o }
    ),
    t
  ),
  o_ = t => (t.charCodeAt(0) === 65279 && (t = t.slice(1)), t),
  i_ = (t, r, l, o) => {
    ;((t.prototype = Object.create(r.prototype, o)),
      Object.defineProperty(t.prototype, 'constructor', {
        __proto__: null,
        value: t,
        writable: !0,
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(t, 'super', { __proto__: null, value: r.prototype }),
      l && Object.assign(t.prototype, l))
  },
  s_ = (t, r, l, o) => {
    let s, u, f
    const p = {}
    if (((r = r || {}), t == null)) return r
    do {
      for (s = Object.getOwnPropertyNames(t), u = s.length; u-- > 0;)
        ((f = s[u]), (!o || o(f, t, r)) && !p[f] && ((r[f] = t[f]), (p[f] = !0)))
      t = l !== !1 && Kl(t)
    } while (t && (!l || l(t, r)) && t !== Object.prototype)
    return r
  },
  u_ = (t, r, l) => {
    ;((t = String(t)), (l === void 0 || l > t.length) && (l = t.length), (l -= r.length))
    const o = t.indexOf(r, l)
    return o !== -1 && o === l
  },
  c_ = t => {
    if (!t) return null
    if (Ga(t)) return t
    let r = t.length
    if (!C1(r)) return null
    const l = new Array(r)
    for (; r-- > 0;) l[r] = t[r]
    return l
  },
  f_ = (
    t => r =>
      t && r instanceof t
  )(typeof Uint8Array < 'u' && Kl(Uint8Array)),
  d_ = (t, r) => {
    const o = (t && t[$i]).call(t)
    let s
    for (; (s = o.next()) && !s.done;) {
      const u = s.value
      r.call(t, u[0], u[1])
    }
  },
  p_ = (t, r) => {
    let l
    const o = []
    for (; (l = t.exec(r)) !== null;) o.push(l)
    return o
  },
  h_ = Vn('HTMLFormElement'),
  m_ = t =>
    t.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (l, o, s) {
      return o.toUpperCase() + s
    }),
  { propertyIsEnumerable: g_ } = Object.prototype,
  y_ = Vn('RegExp'),
  O1 = (t, r) => {
    const l = Object.getOwnPropertyDescriptors(t),
      o = {}
    ;(Hi(l, (s, u) => {
      let f
      ;(f = r(s, u, t)) !== !1 && (o[u] = f || s)
    }),
      Object.defineProperties(t, o))
  },
  b_ = t => {
    O1(t, (r, l) => {
      if (mn(t) && ['arguments', 'caller', 'callee'].includes(l)) return !1
      const o = t[l]
      if (mn(o)) {
        if (((r.enumerable = !1), 'writable' in r)) {
          r.writable = !1
          return
        }
        r.set ||
          (r.set = () => {
            throw Error("Can not rewrite read-only method '" + l + "'")
          })
      }
    })
  },
  v_ = (t, r) => {
    const l = {},
      o = s => {
        s.forEach(u => {
          l[u] = !0
        })
      }
    return (Ga(t) ? o(t) : o(String(t).split(r)), l)
  },
  S_ = () => {},
  x_ = (t, r) => (t != null && Number.isFinite((t = +t)) ? t : r)
function R_(t) {
  return !!(t && mn(t.append) && t[E1] === 'FormData' && t[$i])
}
const E_ = t => {
    const r = new WeakSet(),
      l = o => {
        if (ao(o)) {
          if (r.has(o)) return
          if (ro(o)) return o
          if (!('toJSON' in o)) {
            r.add(o)
            const s = Ga(o) ? [] : {}
            return (
              Hi(o, (u, f) => {
                const p = l(u)
                !Xl(p) && (s[f] = p)
              }),
              r.delete(o),
              s
            )
          }
        }
        return o
      }
    return l(t)
  },
  T_ = Vn('AsyncFunction'),
  C_ = t => t && (ao(t) || mn(t)) && mn(t.then) && mn(t.catch),
  M1 = ((t, r) =>
    t
      ? setImmediate
      : r
        ? ((l, o) => (
            Ya.addEventListener(
              'message',
              ({ source: s, data: u }) => {
                s === Ya && u === l && o.length && o.shift()()
              },
              !1
            ),
            s => {
              ;(o.push(s), Ya.postMessage(l, '*'))
            }
          ))(`axios@${Math.random()}`, [])
        : l => setTimeout(l))(typeof setImmediate == 'function', mn(Ya.postMessage)),
  w_ = typeof queueMicrotask < 'u' ? queueMicrotask.bind(Ya) : (typeof process < 'u' && process.nextTick) || M1,
  _1 = t => t != null && mn(t[$i]),
  A_ = t => t != null && Mi(t, $i) && _1(t),
  $ = {
    isArray: Ga,
    isArrayBuffer: T1,
    isBuffer: ro,
    isFormData: W5,
    isArrayBufferView: H5,
    isString: P5,
    isNumber: C1,
    isBoolean: q5,
    isObject: ao,
    isPlainObject: Su,
    isEmptyObject: I5,
    isReadableStream: e_,
    isRequest: t_,
    isResponse: n_,
    isHeaders: r_,
    isUndefined: Xl,
    isDate: F5,
    isFile: Y5,
    isReactNativeBlob: V5,
    isReactNative: G5,
    isBlob: K5,
    isRegExp: y_,
    isFunction: mn,
    isStream: Q5,
    isURLSearchParams: J5,
    isTypedArray: f_,
    isFileList: X5,
    forEach: Hi,
    merge: hp,
    extend: l_,
    trim: a_,
    stripBOM: o_,
    inherits: i_,
    toFlatObject: s_,
    kindOf: nh,
    kindOfTest: Vn,
    endsWith: u_,
    toArray: c_,
    forEachEntry: d_,
    matchAll: p_,
    isHTMLForm: h_,
    hasOwnProperty: zu,
    hasOwnProp: zu,
    hasOwnInPrototypeChain: Mi,
    getSafeProp: $5,
    reduceDescriptors: O1,
    freezeMethods: b_,
    toObjectSet: v_,
    toCamelCase: m_,
    noop: S_,
    toFiniteNumber: x_,
    findKey: w1,
    global: Ya,
    isContextDefined: A1,
    isSpecCompliantForm: R_,
    toJSONObject: E_,
    isAsyncFn: T_,
    isThenable: C_,
    setImmediate: M1,
    asap: w_,
    isIterable: _1,
    isSafeIterable: A_,
  },
  O_ = $.toObjectSet([
    'age',
    'authorization',
    'content-length',
    'content-type',
    'etag',
    'expires',
    'from',
    'host',
    'if-modified-since',
    'if-unmodified-since',
    'last-modified',
    'location',
    'max-forwards',
    'proxy-authorization',
    'referer',
    'retry-after',
    'user-agent',
  ]),
  M_ = t => {
    const r = {}
    let l, o, s
    return (
      t &&
        t
          .split(
            `
`
          )
          .forEach(function (f) {
            ;((s = f.indexOf(':')),
              (l = f.substring(0, s).trim().toLowerCase()),
              (o = f.substring(s + 1).trim()),
              !(!l || (r[l] && O_[l])) &&
                (l === 'set-cookie' ? (r[l] ? r[l].push(o) : (r[l] = [o])) : (r[l] = r[l] ? r[l] + ', ' + o : o)))
          }),
      r
    )
  }
function __(t) {
  let r = 0,
    l = t.length
  for (; r < l;) {
    const o = t.charCodeAt(r)
    if (o !== 9 && o !== 32) break
    r += 1
  }
  for (; l > r;) {
    const o = t.charCodeAt(l - 1)
    if (o !== 9 && o !== 32) break
    l -= 1
  }
  return r === 0 && l === t.length ? t : t.slice(r, l)
}
const N_ = new RegExp('[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+', 'g'),
  D_ = new RegExp('[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+', 'g')
function rh(t, r) {
  return $.isArray(t) ? t.map(l => rh(l, r)) : __(String(t).replace(r, ''))
}
const B_ = t => rh(t, N_),
  z_ = t => rh(t, D_)
function N1(t) {
  const r = Object.create(null)
  return (
    $.forEach(t.toJSON(), (l, o) => {
      r[o] = z_(l)
    }),
    r
  )
}
const Tb = Symbol('internals')
function ui(t) {
  return t && String(t).trim().toLowerCase()
}
function xu(t) {
  return t === !1 || t == null ? t : $.isArray(t) ? t.map(xu) : B_(String(t))
}
function U_(t) {
  const r = Object.create(null),
    l = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g
  let o
  for (; (o = l.exec(t));) r[o[1]] = o[2]
  return r
}
const k_ = t => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t.trim())
function Fd(t, r, l, o, s) {
  if ($.isFunction(o)) return o.call(this, r, l)
  if ((s && (r = l), !!$.isString(r))) {
    if ($.isString(o)) return r.indexOf(o) !== -1
    if ($.isRegExp(o)) return o.test(r)
  }
}
function L_(t) {
  return t
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (r, l, o) => l.toUpperCase() + o)
}
function j_(t, r) {
  const l = $.toCamelCase(' ' + r)
  ;['get', 'set', 'has'].forEach(o => {
    Object.defineProperty(t, o + l, {
      __proto__: null,
      value: function (s, u, f) {
        return this[o].call(this, r, s, u, f)
      },
      configurable: !0,
    })
  })
}
let en = class {
  constructor(r) {
    r && this.set(r)
  }
  set(r, l, o) {
    const s = this
    function u(p, h, m) {
      const g = ui(h)
      if (!g) return
      const b = $.findKey(s, g)
      ;(!b || s[b] === void 0 || m === !0 || (m === void 0 && s[b] !== !1)) && (s[b || h] = xu(p))
    }
    const f = (p, h) => $.forEach(p, (m, g) => u(m, g, h))
    if ($.isPlainObject(r) || r instanceof this.constructor) f(r, l)
    else if ($.isString(r) && (r = r.trim()) && !k_(r)) f(M_(r), l)
    else if ($.isObject(r) && $.isSafeIterable(r)) {
      let p = Object.create(null),
        h,
        m
      for (const g of r) {
        if (!$.isArray(g)) throw new TypeError('Object iterator must return a key-value pair')
        ;((m = g[0]),
          $.hasOwnProp(p, m) ? ((h = p[m]), (p[m] = $.isArray(h) ? [...h, g[1]] : [h, g[1]])) : (p[m] = g[1]))
      }
      f(p, l)
    } else r != null && u(l, r, o)
    return this
  }
  get(r, l) {
    if (((r = ui(r)), r)) {
      const o = $.findKey(this, r)
      if (o) {
        const s = this[o]
        if (!l) return s
        if (l === !0) return U_(s)
        if ($.isFunction(l)) return l.call(this, s, o)
        if ($.isRegExp(l)) return l.exec(s)
        throw new TypeError('parser must be boolean|regexp|function')
      }
    }
  }
  has(r, l) {
    if (((r = ui(r)), r)) {
      const o = $.findKey(this, r)
      return !!(o && this[o] !== void 0 && (!l || Fd(this, this[o], o, l)))
    }
    return !1
  }
  delete(r, l) {
    const o = this
    let s = !1
    function u(f) {
      if (((f = ui(f)), f)) {
        const p = $.findKey(o, f)
        p && (!l || Fd(o, o[p], p, l)) && (delete o[p], (s = !0))
      }
    }
    return ($.isArray(r) ? r.forEach(u) : u(r), s)
  }
  clear(r) {
    const l = Object.keys(this)
    let o = l.length,
      s = !1
    for (; o--;) {
      const u = l[o]
      ;(!r || Fd(this, this[u], u, r, !0)) && (delete this[u], (s = !0))
    }
    return s
  }
  normalize(r) {
    const l = this,
      o = {}
    return (
      $.forEach(this, (s, u) => {
        const f = $.findKey(o, u)
        if (f) {
          ;((l[f] = xu(s)), delete l[u])
          return
        }
        const p = r ? L_(u) : String(u).trim()
        ;(p !== u && delete l[u], (l[p] = xu(s)), (o[p] = !0))
      }),
      this
    )
  }
  concat(...r) {
    return this.constructor.concat(this, ...r)
  }
  toJSON(r) {
    const l = Object.create(null)
    return (
      $.forEach(this, (o, s) => {
        o != null && o !== !1 && (l[s] = r && $.isArray(o) ? o.join(', ') : o)
      }),
      l
    )
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]()
  }
  toString() {
    return Object.entries(this.toJSON()).map(([r, l]) => r + ': ' + l).join(`
`)
  }
  getSetCookie() {
    return this.get('set-cookie') || []
  }
  get [Symbol.toStringTag]() {
    return 'AxiosHeaders'
  }
  static from(r) {
    return r instanceof this ? r : new this(r)
  }
  static concat(r, ...l) {
    const o = new this(r)
    return (l.forEach(s => o.set(s)), o)
  }
  static accessor(r) {
    const o = (this[Tb] = this[Tb] = { accessors: {} }).accessors,
      s = this.prototype
    function u(f) {
      const p = ui(f)
      o[p] || (j_(s, f), (o[p] = !0))
    }
    return ($.isArray(r) ? r.forEach(u) : u(r), this)
  }
}
en.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent', 'Authorization'])
$.reduceDescriptors(en.prototype, ({ value: t }, r) => {
  let l = r[0].toUpperCase() + r.slice(1)
  return {
    get: () => t,
    set(o) {
      this[l] = o
    },
  }
})
$.freezeMethods(en)
const $_ = '[REDACTED ****]'
function H_(t) {
  if ($.hasOwnProp(t, 'toJSON')) return !0
  let r = Object.getPrototypeOf(t)
  for (; r && r !== Object.prototype;) {
    if ($.hasOwnProp(r, 'toJSON')) return !0
    r = Object.getPrototypeOf(r)
  }
  return !1
}
function P_(t, r) {
  const l = new Set(r.map(u => String(u).toLowerCase())),
    o = [],
    s = u => {
      if (u === null || typeof u != 'object' || $.isBuffer(u)) return u
      if (o.indexOf(u) !== -1) return
      ;(u instanceof en && (u = u.toJSON()), o.push(u))
      let f
      if ($.isArray(u))
        ((f = []),
          u.forEach((p, h) => {
            const m = s(p)
            $.isUndefined(m) || (f[h] = m)
          }))
      else {
        if (!$.isPlainObject(u) && H_(u)) return (o.pop(), u)
        f = Object.create(null)
        for (const [p, h] of Object.entries(u)) {
          const m = l.has(p.toLowerCase()) ? $_ : s(h)
          $.isUndefined(m) || (f[p] = m)
        }
      }
      return (o.pop(), f)
    }
  return s(t)
}
let de = class D1 extends Error {
  static from(r, l, o, s, u, f) {
    const p = new D1(r.message, l || r.code, o, s, u)
    return (
      Object.defineProperty(p, 'cause', { __proto__: null, value: r, writable: !0, enumerable: !1, configurable: !0 }),
      (p.name = r.name),
      r.status != null && p.status == null && (p.status = r.status),
      f && Object.assign(p, f),
      p
    )
  }
  constructor(r, l, o, s, u) {
    ;(super(r),
      Object.defineProperty(this, 'message', {
        __proto__: null,
        value: r,
        enumerable: !0,
        writable: !0,
        configurable: !0,
      }),
      (this.name = 'AxiosError'),
      (this.isAxiosError = !0),
      l && (this.code = l),
      o && (this.config = o),
      s && (this.request = s),
      u && ((this.response = u), (this.status = u.status)))
  }
  toJSON() {
    const r = this.config,
      l = r && $.hasOwnProp(r, 'redact') ? r.redact : void 0,
      o = $.isArray(l) && l.length > 0 ? P_(r, l) : $.toJSONObject(r)
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: o,
      code: this.code,
      status: this.status,
    }
  }
}
de.ERR_BAD_OPTION_VALUE = 'ERR_BAD_OPTION_VALUE'
de.ERR_BAD_OPTION = 'ERR_BAD_OPTION'
de.ECONNABORTED = 'ECONNABORTED'
de.ETIMEDOUT = 'ETIMEDOUT'
de.ECONNREFUSED = 'ECONNREFUSED'
de.ERR_NETWORK = 'ERR_NETWORK'
de.ERR_FR_TOO_MANY_REDIRECTS = 'ERR_FR_TOO_MANY_REDIRECTS'
de.ERR_DEPRECATED = 'ERR_DEPRECATED'
de.ERR_BAD_RESPONSE = 'ERR_BAD_RESPONSE'
de.ERR_BAD_REQUEST = 'ERR_BAD_REQUEST'
de.ERR_CANCELED = 'ERR_CANCELED'
de.ERR_NOT_SUPPORT = 'ERR_NOT_SUPPORT'
de.ERR_INVALID_URL = 'ERR_INVALID_URL'
de.ERR_FORM_DATA_DEPTH_EXCEEDED = 'ERR_FORM_DATA_DEPTH_EXCEEDED'
const q_ = null,
  B1 = 100
function mp(t) {
  return $.isPlainObject(t) || $.isArray(t)
}
function z1(t) {
  return $.endsWith(t, '[]') ? t.slice(0, -2) : t
}
function Yd(t, r, l) {
  return t
    ? t
        .concat(r)
        .map(function (s, u) {
          return ((s = z1(s)), !l && u ? '[' + s + ']' : s)
        })
        .join(l ? '.' : '')
    : r
}
function I_(t) {
  return $.isArray(t) && !t.some(mp)
}
const F_ = $.toFlatObject($, {}, null, function (r) {
  return /^is[A-Z]/.test(r)
})
function fc(t, r, l) {
  if (!$.isObject(t)) throw new TypeError('target must be an object')
  ;((r = r || new FormData()),
    (l = $.toFlatObject(l, { metaTokens: !0, dots: !1, indexes: !1 }, !1, function (O, M) {
      return !$.isUndefined(M[O])
    })))
  const o = l.metaTokens,
    s = l.visitor || w,
    u = l.dots,
    f = l.indexes,
    p = l.Blob || (typeof Blob < 'u' && Blob),
    h = l.maxDepth === void 0 ? B1 : l.maxDepth,
    m = p && $.isSpecCompliantForm(r),
    g = []
  if (!$.isFunction(s)) throw new TypeError('visitor must be a function')
  function b(A) {
    if (A === null) return ''
    if ($.isDate(A)) return A.toISOString()
    if ($.isBoolean(A)) return A.toString()
    if (!m && $.isBlob(A)) throw new de('Blob is not supported. Use a Buffer instead.')
    if ($.isArrayBuffer(A) || $.isTypedArray(A)) {
      if (m && typeof p == 'function') return new p([A])
      if (typeof Buffer < 'u') return Buffer.from(A)
      throw new de('Blob is not supported. Use a Buffer instead.', de.ERR_NOT_SUPPORT)
    }
    return A
  }
  function C(A) {
    if (A > h)
      throw new de('Object is too deeply nested (' + A + ' levels). Max depth: ' + h, de.ERR_FORM_DATA_DEPTH_EXCEEDED)
  }
  function v(A, O) {
    if (h === 1 / 0) return JSON.stringify(A)
    const M = []
    return JSON.stringify(A, function (_, k) {
      if (!$.isObject(k)) return k
      for (; M.length && M[M.length - 1] !== this;) M.pop()
      return (M.push(k), C(O + M.length - 1), k)
    })
  }
  function w(A, O, M) {
    let z = A
    if ($.isReactNative(r) && $.isReactNativeBlob(A)) return (r.append(Yd(M, O, u), b(A)), !1)
    if (A && !M && typeof A == 'object') {
      if ($.endsWith(O, '{}')) ((O = o ? O : O.slice(0, -2)), (A = v(A, 1)))
      else if (($.isArray(A) && I_(A)) || (($.isFileList(A) || $.endsWith(O, '[]')) && (z = $.toArray(A))))
        return (
          (O = z1(O)),
          z.forEach(function (k, V) {
            !($.isUndefined(k) || k === null) && r.append(f === !0 ? Yd([O], V, u) : f === null ? O : O + '[]', b(k))
          }),
          !1
        )
    }
    return mp(A) ? !0 : (r.append(Yd(M, O, u), b(A)), !1)
  }
  const R = Object.assign(F_, { defaultVisitor: w, convertValue: b, isVisitable: mp })
  function T(A, O, M = 0) {
    if (!$.isUndefined(A)) {
      if ((C(M), g.indexOf(A) !== -1)) throw new Error('Circular reference detected in ' + O.join('.'))
      ;(g.push(A),
        $.forEach(A, function (_, k) {
          ;(!($.isUndefined(_) || _ === null) && s.call(r, _, $.isString(k) ? k.trim() : k, O, R)) === !0 &&
            T(_, O ? O.concat(k) : [k], M + 1)
        }),
        g.pop())
    }
  }
  if (!$.isObject(t)) throw new TypeError('data must be an object')
  return (T(t), r)
}
function Cb(t) {
  const r = { '!': '%21', "'": '%27', '(': '%28', ')': '%29', '~': '%7E', '%20': '+' }
  return encodeURIComponent(t).replace(/[!'()~]|%20/g, function (o) {
    return r[o]
  })
}
function ah(t, r) {
  ;((this._pairs = []), t && fc(t, this, r))
}
const U1 = ah.prototype
U1.append = function (r, l) {
  this._pairs.push([r, l])
}
U1.toString = function (r) {
  const l = r ? o => r.call(this, o, Cb) : Cb
  return this._pairs
    .map(function (s) {
      return l(s[0]) + '=' + l(s[1])
    }, '')
    .join('&')
}
function Y_(t) {
  return encodeURIComponent(t).replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+')
}
function k1(t, r, l) {
  if (!r) return t
  t = t || ''
  const o = $.isFunction(l) ? { serialize: l } : l,
    s = $.getSafeProp(o, 'encode') || Y_,
    u = $.getSafeProp(o, 'serialize')
  let f
  if ((u ? (f = u(r, o)) : (f = $.isURLSearchParams(r) ? r.toString() : new ah(r, o).toString(s)), f)) {
    const p = t.indexOf('#')
    ;(p !== -1 && (t = t.slice(0, p)), (t += (t.indexOf('?') === -1 ? '?' : '&') + f))
  }
  return t
}
class wb {
  constructor() {
    this.handlers = []
  }
  use(r, l, o) {
    return (
      this.handlers.push({
        fulfilled: r,
        rejected: l,
        synchronous: o ? o.synchronous : !1,
        runWhen: o ? o.runWhen : null,
      }),
      this.handlers.length - 1
    )
  }
  eject(r) {
    this.handlers[r] && (this.handlers[r] = null)
  }
  clear() {
    this.handlers && (this.handlers = [])
  }
  forEach(r) {
    $.forEach(this.handlers, function (o) {
      o !== null && r(o)
    })
  }
}
const lh = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
    legacyInterceptorReqResOrdering: !0,
    advertiseZstdAcceptEncoding: !1,
    validateStatusUndefinedResolves: !0,
  },
  V_ = typeof URLSearchParams < 'u' ? URLSearchParams : ah,
  G_ = typeof FormData < 'u' ? FormData : null,
  K_ = typeof Blob < 'u' ? Blob : null,
  X_ = {
    isBrowser: !0,
    classes: { URLSearchParams: V_, FormData: G_, Blob: K_ },
    protocols: ['http', 'https', 'file', 'blob', 'url', 'data'],
  },
  oh = typeof window < 'u' && typeof document < 'u',
  gp = (typeof navigator == 'object' && navigator) || void 0,
  Q_ = oh && (!gp || ['ReactNative', 'NativeScript', 'NS'].indexOf(gp.product) < 0),
  Z_ = typeof WorkerGlobalScope < 'u' && self instanceof WorkerGlobalScope && typeof self.importScripts == 'function',
  W_ = (oh && window.location.href) || 'http://localhost',
  J_ = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        hasBrowserEnv: oh,
        hasStandardBrowserEnv: Q_,
        hasStandardBrowserWebWorkerEnv: Z_,
        navigator: gp,
        origin: W_,
      },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  ),
  Xt = { ...J_, ...X_ }
function e3(t, r) {
  return fc(t, new Xt.classes.URLSearchParams(), {
    visitor: function (l, o, s, u) {
      return Xt.isNode && $.isBuffer(l)
        ? (this.append(o, l.toString('base64')), !1)
        : u.defaultVisitor.apply(this, arguments)
    },
    ...r,
  })
}
const Ab = B1
function L1(t) {
  if (t > Ab)
    throw new de(
      'FormData field is too deeply nested (' + t + ' levels). Max depth: ' + Ab,
      de.ERR_FORM_DATA_DEPTH_EXCEEDED
    )
}
function t3(t) {
  const r = [],
    l = /\w+|\[(\w*)]/g
  let o
  for (; (o = l.exec(t)) !== null;) (L1(r.length), r.push(o[0] === '[]' ? '' : o[1] || o[0]))
  return r
}
function n3(t) {
  const r = {},
    l = Object.keys(t)
  let o
  const s = l.length
  let u
  for (o = 0; o < s; o++) ((u = l[o]), (r[u] = t[u]))
  return r
}
function j1(t) {
  function r(l, o, s, u) {
    L1(u)
    let f = l[u++]
    if (f === '__proto__') return !0
    const p = Number.isFinite(+f),
      h = u >= l.length
    return (
      (f = !f && $.isArray(s) ? s.length : f),
      h
        ? ($.hasOwnProp(s, f) ? (s[f] = $.isArray(s[f]) ? s[f].concat(o) : [s[f], o]) : (s[f] = o), !p)
        : ((!$.hasOwnProp(s, f) || !$.isObject(s[f])) && (s[f] = []),
          r(l, o, s[f], u) && $.isArray(s[f]) && (s[f] = n3(s[f])),
          !p)
    )
  }
  if ($.isFormData(t) && $.isFunction(t.entries)) {
    const l = {}
    return (
      $.forEachEntry(t, (o, s) => {
        r(t3(o), s, l, 0)
      }),
      l
    )
  }
  return null
}
const Ll = (t, r) => (t != null && $.hasOwnProp(t, r) ? t[r] : void 0)
function r3(t, r, l) {
  if ($.isString(t))
    try {
      return ((r || JSON.parse)(t), $.trim(t))
    } catch (o) {
      if (o.name !== 'SyntaxError') throw o
    }
  return (l || JSON.stringify)(t)
}
const Pi = {
  transitional: lh,
  adapter: ['xhr', 'http', 'fetch'],
  transformRequest: [
    function (r, l) {
      const o = l.getContentType() || '',
        s = o.indexOf('application/json') > -1,
        u = $.isObject(r)
      if ((u && $.isHTMLForm(r) && (r = new FormData(r)), $.isFormData(r))) return s ? JSON.stringify(j1(r)) : r
      if ($.isArrayBuffer(r) || $.isBuffer(r) || $.isStream(r) || $.isFile(r) || $.isBlob(r) || $.isReadableStream(r))
        return r
      if ($.isArrayBufferView(r)) return r.buffer
      if ($.isURLSearchParams(r))
        return (l.setContentType('application/x-www-form-urlencoded;charset=utf-8', !1), r.toString())
      let p
      if (u) {
        const h = Ll(this, 'formSerializer')
        if (o.indexOf('application/x-www-form-urlencoded') > -1) return e3(r, h).toString()
        if ((p = $.isFileList(r)) || o.indexOf('multipart/form-data') > -1) {
          const m = Ll(this, 'env'),
            g = m && m.FormData
          return fc(p ? { 'files[]': r } : r, g && new g(), h)
        }
      }
      return u || s ? (l.setContentType('application/json', !1), r3(r)) : r
    },
  ],
  transformResponse: [
    function (r) {
      const l = Ll(this, 'transitional') || Pi.transitional,
        o = l && l.forcedJSONParsing,
        s = Ll(this, 'responseType'),
        u = s === 'json'
      if ($.isResponse(r) || $.isReadableStream(r)) return r
      if (r && $.isString(r) && ((o && !s) || u)) {
        const p = !(l && l.silentJSONParsing) && u
        try {
          return JSON.parse(r, Ll(this, 'parseReviver'))
        } catch (h) {
          if (p) throw h.name === 'SyntaxError' ? de.from(h, de.ERR_BAD_RESPONSE, this, null, Ll(this, 'response')) : h
        }
      }
      return r
    },
  ],
  timeout: 0,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: Xt.classes.FormData, Blob: Xt.classes.Blob },
  validateStatus: function (r) {
    return r >= 200 && r < 300
  },
  headers: { common: { Accept: 'application/json, text/plain, */*', 'Content-Type': void 0 } },
}
$.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'query'], t => {
  Pi.headers[t] = {}
})
function Vd(t, r) {
  const l = this || Pi,
    o = r || l,
    s = en.from(o.headers)
  let u = o.data
  return (
    $.forEach(t, function (p) {
      u = p.call(l, u, s.normalize(), r ? r.status : void 0)
    }),
    s.normalize(),
    u
  )
}
function $1(t) {
  return !!(t && t.__CANCEL__)
}
let qi = class extends de {
  constructor(r, l, o) {
    ;(super(r ?? 'canceled', de.ERR_CANCELED, l, o), (this.name = 'CanceledError'), (this.__CANCEL__ = !0))
  }
}
function H1(t, r, l) {
  const o = l.config.validateStatus
  !l.status || !o || o(l.status)
    ? t(l)
    : r(
        new de(
          'Request failed with status code ' + l.status,
          l.status >= 400 && l.status < 500 ? de.ERR_BAD_REQUEST : de.ERR_BAD_RESPONSE,
          l.config,
          l.request,
          l
        )
      )
}
function a3(t) {
  const r = /^([-+\w]{1,25}):(?:\/\/)?/.exec(t)
  return (r && r[1]) || ''
}
function l3(t, r) {
  t = t || 10
  const l = new Array(t),
    o = new Array(t)
  let s = 0,
    u = 0,
    f
  return (
    (r = r !== void 0 ? r : 1e3),
    function (h) {
      const m = Date.now(),
        g = o[u]
      ;(f || (f = m), (l[s] = h), (o[s] = m))
      let b = u,
        C = 0
      for (; b !== s;) ((C += l[b++]), (b = b % t))
      if (((s = (s + 1) % t), s === u && (u = (u + 1) % t), m - f < r)) return
      const v = g && m - g
      return v ? Math.round((C * 1e3) / v) : void 0
    }
  )
}
function o3(t, r) {
  let l = 0,
    o = 1e3 / r,
    s,
    u
  const f = (m, g = Date.now()) => {
    ;((l = g), (s = null), u && (clearTimeout(u), (u = null)), t(...m))
  }
  return [
    (...m) => {
      const g = Date.now(),
        b = g - l
      b >= o
        ? f(m, g)
        : ((s = m),
          u ||
            (u = setTimeout(() => {
              ;((u = null), f(s))
            }, o - b)))
    },
    () => s && f(s),
  ]
}
const Uu = (t, r, l = 3) => {
    let o = 0
    const s = l3(50, 250)
    return o3(u => {
      if (!u || typeof u.loaded != 'number') return
      const f = u.loaded,
        p = u.lengthComputable ? u.total : void 0,
        h = p != null ? Math.min(f, p) : f,
        m = Math.max(0, h - o),
        g = s(m)
      o = Math.max(o, h)
      const b = {
        loaded: h,
        total: p,
        progress: p ? h / p : void 0,
        bytes: m,
        rate: g || void 0,
        estimated: g && p ? (p - h) / g : void 0,
        event: u,
        lengthComputable: p != null,
        [r ? 'download' : 'upload']: !0,
      }
      t(b)
    }, l)
  },
  Ob = (t, r) => {
    const l = t != null
    return [o => r[0]({ lengthComputable: l, total: t, loaded: o }), r[1]]
  },
  Mb =
    t =>
    (...r) =>
      $.asap(() => t(...r)),
  i3 = Xt.hasStandardBrowserEnv
    ? ((t, r) => l => (
        (l = new URL(l, Xt.origin)),
        t.protocol === l.protocol && t.host === l.host && (r || t.port === l.port)
      ))(new URL(Xt.origin), Xt.navigator && /(msie|trident)/i.test(Xt.navigator.userAgent))
    : () => !0,
  s3 = Xt.hasStandardBrowserEnv
    ? {
        write(t, r, l, o, s, u, f) {
          if (typeof document > 'u') return
          const p = [`${t}=${encodeURIComponent(r)}`]
          ;($.isNumber(l) && p.push(`expires=${new Date(l).toUTCString()}`),
            $.isString(o) && p.push(`path=${o}`),
            $.isString(s) && p.push(`domain=${s}`),
            u === !0 && p.push('secure'),
            $.isString(f) && p.push(`SameSite=${f}`),
            (document.cookie = p.join('; ')))
        },
        read(t) {
          if (typeof document > 'u') return null
          const r = document.cookie.split(';')
          for (let l = 0; l < r.length; l++) {
            const o = r[l].replace(/^\s+/, ''),
              s = o.indexOf('=')
            if (s !== -1 && o.slice(0, s) === t)
              try {
                return decodeURIComponent(o.slice(s + 1))
              } catch {
                return o.slice(s + 1)
              }
          }
          return null
        },
        remove(t) {
          this.write(t, '', Date.now() - 864e5, '/')
        },
      }
    : {
        write() {},
        read() {
          return null
        },
        remove() {},
      }
function u3(t) {
  return typeof t != 'string' ? !1 : /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t)
}
function c3(t, r) {
  return r ? t.replace(/\/?\/$/, '') + '/' + r.replace(/^\/+/, '') : t
}
const f3 = /^https?:(?!\/\/)/i,
  d3 = /[\t\n\r]/g
function p3(t) {
  let r = 0
  for (; r < t.length && t.charCodeAt(r) <= 32;) r++
  return t.slice(r)
}
function h3(t) {
  return p3(t).replace(d3, '')
}
function _b(t, r) {
  if (typeof t == 'string' && f3.test(h3(t)))
    throw new de('Invalid URL: missing "//" after protocol', de.ERR_INVALID_URL, r)
}
function P1(t, r, l, o) {
  _b(r, o)
  let s = !u3(r)
  return t && (s || l === !1) ? (_b(t, o), c3(t, r)) : r
}
const Nb = t => (t instanceof en ? { ...t } : t)
function Ka(t, r) {
  ;((t = t || {}), (r = r || {}))
  const l = Object.create(null)
  Object.defineProperty(l, 'hasOwnProperty', {
    __proto__: null,
    value: Object.prototype.hasOwnProperty,
    enumerable: !1,
    writable: !0,
    configurable: !0,
  })
  function o(g, b, C, v) {
    return $.isPlainObject(g) && $.isPlainObject(b)
      ? $.merge.call({ caseless: v }, g, b)
      : $.isPlainObject(b)
        ? $.merge({}, b)
        : $.isArray(b)
          ? b.slice()
          : b
  }
  function s(g, b, C, v) {
    if ($.isUndefined(b)) {
      if (!$.isUndefined(g)) return o(void 0, g, C, v)
    } else return o(g, b, C, v)
  }
  function u(g, b) {
    if (!$.isUndefined(b)) return o(void 0, b)
  }
  function f(g, b) {
    if ($.isUndefined(b)) {
      if (!$.isUndefined(g)) return o(void 0, g)
    } else return o(void 0, b)
  }
  function p(g) {
    const b = $.hasOwnProp(r, 'transitional') ? r.transitional : void 0
    if (!$.isUndefined(b))
      if ($.isPlainObject(b)) {
        if ($.hasOwnProp(b, g)) return b[g]
      } else return
    const C = $.hasOwnProp(t, 'transitional') ? t.transitional : void 0
    if ($.isPlainObject(C) && $.hasOwnProp(C, g)) return C[g]
  }
  function h(g, b, C) {
    if ($.hasOwnProp(r, C)) return o(g, b)
    if ($.hasOwnProp(t, C)) return o(void 0, g)
  }
  const m = {
    url: u,
    method: u,
    data: u,
    baseURL: f,
    transformRequest: f,
    transformResponse: f,
    paramsSerializer: f,
    timeout: f,
    timeoutMessage: f,
    withCredentials: f,
    withXSRFToken: f,
    adapter: f,
    responseType: f,
    xsrfCookieName: f,
    xsrfHeaderName: f,
    onUploadProgress: f,
    onDownloadProgress: f,
    decompress: f,
    maxContentLength: f,
    maxBodyLength: f,
    beforeRedirect: f,
    transport: f,
    httpAgent: f,
    httpsAgent: f,
    cancelToken: f,
    socketPath: f,
    allowedSocketPaths: f,
    responseEncoding: f,
    validateStatus: h,
    headers: (g, b, C) => s(Nb(g), Nb(b), C, !0),
  }
  return (
    $.forEach(Object.keys({ ...t, ...r }), function (b) {
      if (b === '__proto__' || b === 'constructor' || b === 'prototype') return
      const C = $.hasOwnProp(m, b) ? m[b] : s,
        v = $.hasOwnProp(t, b) ? t[b] : void 0,
        w = $.hasOwnProp(r, b) ? r[b] : void 0,
        R = C(v, w, b)
      ;($.isUndefined(R) && C !== h) || (l[b] = R)
    }),
    $.hasOwnProp(r, 'validateStatus') &&
      $.isUndefined(r.validateStatus) &&
      p('validateStatusUndefinedResolves') === !1 &&
      ($.hasOwnProp(t, 'validateStatus') ? (l.validateStatus = o(void 0, t.validateStatus)) : delete l.validateStatus),
    l
  )
}
const m3 = ['content-type', 'content-length']
function g3(t, r, l) {
  if (l !== 'content-only') {
    t.set(r)
    return
  }
  Object.entries(r || {}).forEach(([o, s]) => {
    m3.includes(o.toLowerCase()) && t.set(o, s)
  })
}
const y3 = t => encodeURIComponent(t).replace(/%([0-9A-F]{2})/gi, (r, l) => String.fromCharCode(parseInt(l, 16)))
function q1(t) {
  const r = Ka({}, t),
    l = C => ($.hasOwnProp(r, C) ? r[C] : void 0),
    o = l('data')
  let s = l('withXSRFToken')
  const u = l('xsrfHeaderName'),
    f = l('xsrfCookieName')
  let p = l('headers')
  const h = l('auth'),
    m = l('baseURL'),
    g = l('allowAbsoluteUrls'),
    b = l('url')
  if (((r.headers = p = en.from(p)), (r.url = k1(P1(m, b, g, r), l('params'), l('paramsSerializer'))), h)) {
    const C = $.getSafeProp(h, 'username') || '',
      v = $.getSafeProp(h, 'password') || ''
    try {
      p.set('Authorization', 'Basic ' + btoa(C + ':' + (v ? y3(v) : '')))
    } catch (w) {
      throw de.from(w, de.ERR_BAD_OPTION_VALUE, t)
    }
  }
  if (
    ($.isFormData(o) &&
      (Xt.hasStandardBrowserEnv || Xt.hasStandardBrowserWebWorkerEnv || $.isReactNative(o)
        ? p.setContentType(void 0)
        : $.isFunction(o.getHeaders) && g3(p, o.getHeaders(), l('formDataHeaderPolicy'))),
    Xt.hasStandardBrowserEnv && ($.isFunction(s) && (s = s(r)), s === !0 || (s == null && i3(r.url))))
  ) {
    const v = u && f && s3.read(f)
    v && p.set(u, v)
  }
  return r
}
const b3 = typeof XMLHttpRequest < 'u',
  v3 =
    b3 &&
    function (t) {
      return new Promise(function (l, o) {
        const s = q1(t)
        let u = s.data
        const f = en.from(s.headers).normalize()
        let { responseType: p, onUploadProgress: h, onDownloadProgress: m } = s,
          g,
          b,
          C,
          v,
          w
        function R() {
          ;(v && v(),
            w && w(),
            s.cancelToken && s.cancelToken.unsubscribe(g),
            s.signal && s.signal.removeEventListener('abort', g))
        }
        let T = new XMLHttpRequest()
        ;(T.open(s.method.toUpperCase(), s.url, !0), (T.timeout = s.timeout))
        function A() {
          if (!T) return
          const M = en.from('getAllResponseHeaders' in T && T.getAllResponseHeaders()),
            _ = {
              data: !p || p === 'text' || p === 'json' ? T.responseText : T.response,
              status: T.status,
              statusText: T.statusText,
              headers: M,
              config: t,
              request: T,
            }
          ;(H1(
            function (V) {
              ;(l(V), R())
            },
            function (V) {
              ;(o(V), R())
            },
            _
          ),
            (T = null))
        }
        ;('onloadend' in T
          ? (T.onloadend = A)
          : (T.onreadystatechange = function () {
              !T ||
                T.readyState !== 4 ||
                (T.status === 0 && !(T.responseURL && T.responseURL.startsWith('file:'))) ||
                setTimeout(A)
            }),
          (T.onabort = function () {
            T && (o(new de('Request aborted', de.ECONNABORTED, t, T)), R(), (T = null))
          }),
          (T.onerror = function (z) {
            const _ = z && z.message ? z.message : 'Network Error',
              k = new de(_, de.ERR_NETWORK, t, T)
            ;((k.event = z || null), o(k), R(), (T = null))
          }),
          (T.ontimeout = function () {
            let z = s.timeout ? 'timeout of ' + s.timeout + 'ms exceeded' : 'timeout exceeded'
            const _ = s.transitional || lh
            ;(s.timeoutErrorMessage && (z = s.timeoutErrorMessage),
              o(new de(z, _.clarifyTimeoutError ? de.ETIMEDOUT : de.ECONNABORTED, t, T)),
              R(),
              (T = null))
          }),
          u === void 0 && f.setContentType(null),
          'setRequestHeader' in T &&
            $.forEach(N1(f), function (z, _) {
              T.setRequestHeader(_, z)
            }),
          $.isUndefined(s.withCredentials) || (T.withCredentials = !!s.withCredentials),
          p && p !== 'json' && (T.responseType = s.responseType),
          m && (([C, w] = Uu(m, !0)), T.addEventListener('progress', C)),
          h &&
            T.upload &&
            (([b, v] = Uu(h)), T.upload.addEventListener('progress', b), T.upload.addEventListener('loadend', v)),
          (s.cancelToken || s.signal) &&
            ((g = M => {
              T && (o(!M || M.type ? new qi(null, t, T) : M), T.abort(), R(), (T = null))
            }),
            s.cancelToken && s.cancelToken.subscribe(g),
            s.signal && (s.signal.aborted ? g() : s.signal.addEventListener('abort', g))))
        const O = a3(s.url)
        if (O && !Xt.protocols.includes(O)) {
          ;(o(new de('Unsupported protocol ' + O + ':', de.ERR_BAD_REQUEST, t)), R())
          return
        }
        T.send(u || null)
      })
    },
  S3 = (t, r) => {
    if (((t = t ? t.filter(Boolean) : []), !r && !t.length)) return
    const l = new AbortController()
    let o = !1
    const s = function (h) {
      if (!o) {
        ;((o = !0), f())
        const m = h instanceof Error ? h : this.reason
        l.abort(m instanceof de ? m : new qi(m instanceof Error ? m.message : m))
      }
    }
    let u =
      r &&
      setTimeout(() => {
        ;((u = null), s(new de(`timeout of ${r}ms exceeded`, de.ETIMEDOUT)))
      }, r)
    const f = () => {
      t &&
        (u && clearTimeout(u),
        (u = null),
        t.forEach(h => {
          h.unsubscribe ? h.unsubscribe(s) : h.removeEventListener('abort', s)
        }),
        (t = null))
    }
    t.forEach(h => h.addEventListener('abort', s, { once: !0 }))
    const { signal: p } = l
    return ((p.unsubscribe = () => $.asap(f)), p)
  },
  x3 = function* (t, r) {
    let l = t.byteLength
    if (l < r) {
      yield t
      return
    }
    let o = 0,
      s
    for (; o < l;) ((s = o + r), yield t.slice(o, s), (o = s))
  },
  R3 = async function* (t, r) {
    for await (const l of E3(t)) yield* x3(l, r)
  },
  E3 = async function* (t) {
    if (t[Symbol.asyncIterator]) {
      yield* t
      return
    }
    const r = t.getReader()
    try {
      for (;;) {
        const { done: l, value: o } = await r.read()
        if (l) break
        yield o
      }
    } finally {
      await r.cancel()
    }
  },
  Db = (t, r, l, o) => {
    const s = R3(t, r)
    let u = 0,
      f,
      p = h => {
        f || ((f = !0), o && o(h))
      }
    return new ReadableStream(
      {
        async pull(h) {
          try {
            const { done: m, value: g } = await s.next()
            if (m) {
              ;(p(), h.close())
              return
            }
            let b = g.byteLength
            if (l) {
              let C = (u += b)
              l(C)
            }
            h.enqueue(new Uint8Array(g))
          } catch (m) {
            throw (p(m), m)
          }
        },
        cancel(h) {
          return (p(h), s.return())
        },
      },
      { highWaterMark: 2 }
    )
  },
  ku = t => (t >= 48 && t <= 57) || (t >= 65 && t <= 70) || (t >= 97 && t <= 102),
  T3 = (t, r, l) => r + 2 < l && ku(t.charCodeAt(r + 1)) && ku(t.charCodeAt(r + 2))
function C3(t) {
  if (!t || typeof t != 'string' || !t.startsWith('data:')) return 0
  const r = t.indexOf(',')
  if (r < 0) return 0
  const l = t.slice(5, r),
    o = t.slice(r + 1)
  if (/;base64/i.test(l)) {
    let f = o.length
    const p = o.length
    for (let v = 0; v < p; v++)
      if (o.charCodeAt(v) === 37 && v + 2 < p) {
        const w = o.charCodeAt(v + 1),
          R = o.charCodeAt(v + 2)
        ku(w) && ku(R) && ((f -= 2), (v += 2))
      }
    let h = 0,
      m = p - 1
    const g = v =>
      v >= 2 &&
      o.charCodeAt(v - 2) === 37 &&
      o.charCodeAt(v - 1) === 51 &&
      (o.charCodeAt(v) === 68 || o.charCodeAt(v) === 100)
    ;(m >= 0 && (o.charCodeAt(m) === 61 ? (h++, m--) : g(m) && (h++, (m -= 3))),
      h === 1 && m >= 0 && (o.charCodeAt(m) === 61 || g(m)) && h++)
    const C = Math.floor(f / 4) * 3 - (h || 0)
    return C > 0 ? C : 0
  }
  let u = 0
  for (let f = 0, p = o.length; f < p; f++) {
    const h = o.charCodeAt(f)
    if (h === 37 && T3(o, f, p)) ((u += 1), (f += 2))
    else if (h < 128) u += 1
    else if (h < 2048) u += 2
    else if (h >= 55296 && h <= 56319 && f + 1 < p) {
      const m = o.charCodeAt(f + 1)
      m >= 56320 && m <= 57343 ? ((u += 4), f++) : (u += 3)
    } else u += 3
  }
  return u
}
const ih = '1.18.1',
  Bb = 64 * 1024,
  { isFunction: fu } = $,
  w3 = t => encodeURIComponent(t).replace(/%([0-9A-F]{2})/gi, (r, l) => String.fromCharCode(parseInt(l, 16))),
  zb = t => {
    if (!$.isString(t)) return t
    try {
      return decodeURIComponent(t)
    } catch {
      return t
    }
  },
  Ub = (t, ...r) => {
    try {
      return !!t(...r)
    } catch {
      return !1
    }
  },
  A3 = t => {
    const r = t.indexOf('://')
    let l = t
    return (r !== -1 && (l = l.slice(r + 3)), l.includes('@') || l.includes(':'))
  },
  O3 = t => {
    const r = $.global !== void 0 && $.global !== null ? $.global : globalThis,
      { ReadableStream: l, TextEncoder: o } = r
    t = $.merge.call({ skipUndefined: !0 }, { Request: r.Request, Response: r.Response }, t)
    const { fetch: s, Request: u, Response: f } = t,
      p = s ? fu(s) : typeof fetch == 'function',
      h = fu(u),
      m = fu(f)
    if (!p) return !1
    const g = p && fu(l),
      b =
        p &&
        (typeof o == 'function'
          ? (
              A => O =>
                A.encode(O)
            )(new o())
          : async A => new Uint8Array(await new u(A).arrayBuffer())),
      C =
        h &&
        g &&
        Ub(() => {
          let A = !1
          const O = new u(Xt.origin, {
              body: new l(),
              method: 'POST',
              get duplex() {
                return ((A = !0), 'half')
              },
            }),
            M = O.headers.has('Content-Type')
          return (O.body != null && O.body.cancel(), A && !M)
        }),
      v = m && g && Ub(() => $.isReadableStream(new f('').body)),
      w = { stream: v && (A => A.body) }
    p &&
      ['text', 'arrayBuffer', 'blob', 'formData', 'stream'].forEach(A => {
        !w[A] &&
          (w[A] = (O, M) => {
            let z = O && O[A]
            if (z) return z.call(O)
            throw new de(`Response type '${A}' is not supported`, de.ERR_NOT_SUPPORT, M)
          })
      })
    const R = async A => {
        if (A == null) return 0
        if ($.isBlob(A)) return A.size
        if ($.isSpecCompliantForm(A))
          return (await new u(Xt.origin, { method: 'POST', body: A }).arrayBuffer()).byteLength
        if ($.isArrayBufferView(A) || $.isArrayBuffer(A)) return A.byteLength
        if (($.isURLSearchParams(A) && (A = A + ''), $.isString(A))) return (await b(A)).byteLength
      },
      T = async (A, O) => {
        const M = $.toFiniteNumber(A.getContentLength())
        return M ?? R(O)
      }
    return async A => {
      let {
        url: O,
        method: M,
        data: z,
        signal: _,
        cancelToken: k,
        timeout: V,
        onDownloadProgress: Q,
        onUploadProgress: oe,
        responseType: ce,
        headers: Z,
        withCredentials: x = 'same-origin',
        fetchOptions: G,
        maxContentLength: L,
        maxBodyLength: U,
      } = q1(A)
      const N = $.isNumber(L) && L > -1,
        H = $.isNumber(U) && U > -1,
        W = le => ($.hasOwnProp(A, le) ? A[le] : void 0)
      let ue = s || fetch
      ce = ce ? (ce + '').toLowerCase() : 'text'
      let D = S3([_, k && k.toAbortSignal()], V),
        I = null
      const ee =
        D &&
        D.unsubscribe &&
        (() => {
          D.unsubscribe()
        })
      let te,
        ie = null
      const pe = () => new de('Request body larger than maxBodyLength limit', de.ERR_BAD_REQUEST, A, I)
      try {
        let le
        const me = W('auth')
        if (me) {
          const ge = $.getSafeProp(me, 'username') || '',
            Te = $.getSafeProp(me, 'password') || ''
          le = { username: ge, password: Te }
        }
        if (A3(O)) {
          const ge = new URL(O, Xt.origin)
          if (!le && (ge.username || ge.password)) {
            const Te = zb(ge.username),
              gt = zb(ge.password)
            le = { username: Te, password: gt }
          }
          ;(ge.username || ge.password) && ((ge.username = ''), (ge.password = ''), (O = ge.href))
        }
        if (
          (le &&
            (Z.delete('authorization'),
            Z.set('Authorization', 'Basic ' + btoa(w3((le.username || '') + ':' + (le.password || ''))))),
          N && typeof O == 'string' && O.startsWith('data:') && C3(O) > L)
        )
          throw new de('maxContentLength size of ' + L + ' exceeded', de.ERR_BAD_RESPONSE, A, I)
        if (H && M !== 'get' && M !== 'head') {
          const ge = await R(z)
          if (typeof ge == 'number' && isFinite(ge) && ((te = ge), ge > U)) throw pe()
        }
        const fe = H && ($.isReadableStream(z) || $.isStream(z)),
          Se = (ge, Te, gt) =>
            Db(
              ge,
              Bb,
              He => {
                if (H && He > U) throw (ie = pe())
                Te && Te(He)
              },
              gt
            )
        if (C && M !== 'get' && M !== 'head' && (oe || fe)) {
          if (((te = te ?? (await T(Z, z))), te !== 0 || fe)) {
            let ge = new u(O, { method: 'POST', body: z, duplex: 'half' }),
              Te
            if (($.isFormData(z) && (Te = ge.headers.get('content-type')) && Z.setContentType(Te), ge.body)) {
              const [gt, He] = (oe && Ob(te, Uu(Mb(oe)))) || []
              z = Se(ge.body, gt, He)
            }
          }
        } else if (fe && !h && g && M !== 'get' && M !== 'head') z = Se(z)
        else if (fe && h && !C && M !== 'get' && M !== 'head')
          throw new de(
            'Stream request bodies are not supported by the current fetch implementation',
            de.ERR_NOT_SUPPORT,
            A,
            I
          )
        $.isString(x) || (x = x ? 'include' : 'omit')
        const Me = h && 'credentials' in u.prototype
        if ($.isFormData(z)) {
          const ge = Z.getContentType()
          ge && /^multipart\/form-data/i.test(ge) && !/boundary=/i.test(ge) && Z.delete('content-type')
        }
        Z.set('User-Agent', 'axios/' + ih, !1)
        const Ye = {
          ...G,
          signal: D,
          method: M.toUpperCase(),
          headers: N1(Z.normalize()),
          body: z,
          duplex: 'half',
          credentials: Me ? x : void 0,
        }
        I = h && new u(O, Ye)
        let Ne = await (h ? ue(I, G) : ue(O, Ye))
        const ze = en.from(Ne.headers)
        if (N) {
          const ge = $.toFiniteNumber(ze.getContentLength())
          if (ge != null && ge > L)
            throw new de('maxContentLength size of ' + L + ' exceeded', de.ERR_BAD_RESPONSE, A, I)
        }
        const Ee = v && (ce === 'stream' || ce === 'response')
        if (v && Ne.body && (Q || N || (Ee && ee))) {
          const ge = {}
          ;['status', 'statusText', 'headers'].forEach(nn => {
            ge[nn] = Ne[nn]
          })
          const Te = $.toFiniteNumber(ze.getContentLength()),
            [gt, He] = (Q && Ob(Te, Uu(Mb(Q), !0))) || []
          let un = 0
          const cn = nn => {
            if (N && ((un = nn), un > L))
              throw new de('maxContentLength size of ' + L + ' exceeded', de.ERR_BAD_RESPONSE, A, I)
            gt && gt(nn)
          }
          Ne = new f(
            Db(Ne.body, Bb, cn, () => {
              ;(He && He(), ee && ee())
            }),
            ge
          )
        }
        ce = ce || 'text'
        let Ve = await w[$.findKey(w, ce) || 'text'](Ne, A)
        if (N && !v && !Ee) {
          let ge
          if (
            (Ve != null &&
              (typeof Ve.byteLength == 'number'
                ? (ge = Ve.byteLength)
                : typeof Ve.size == 'number'
                  ? (ge = Ve.size)
                  : typeof Ve == 'string' && (ge = typeof o == 'function' ? new o().encode(Ve).byteLength : Ve.length)),
            typeof ge == 'number' && ge > L)
          )
            throw new de('maxContentLength size of ' + L + ' exceeded', de.ERR_BAD_RESPONSE, A, I)
        }
        return (
          !Ee && ee && ee(),
          await new Promise((ge, Te) => {
            H1(ge, Te, {
              data: Ve,
              headers: en.from(Ne.headers),
              status: Ne.status,
              statusText: Ne.statusText,
              config: A,
              request: I,
            })
          })
        )
      } catch (le) {
        if ((ee && ee(), D && D.aborted && D.reason instanceof de)) {
          const me = D.reason
          throw (
            (me.config = A),
            I && (me.request = I),
            le !== me &&
              Object.defineProperty(me, 'cause', {
                __proto__: null,
                value: le,
                writable: !0,
                enumerable: !1,
                configurable: !0,
              }),
            me
          )
        }
        if (ie) throw (I && !ie.request && (ie.request = I), ie)
        if (le instanceof de) throw (I && !le.request && (le.request = I), le)
        if (le && le.name === 'TypeError' && /Load failed|fetch/i.test(le.message)) {
          const me = new de('Network Error', de.ERR_NETWORK, A, I, le && le.response)
          throw (
            Object.defineProperty(me, 'cause', {
              __proto__: null,
              value: le.cause || le,
              writable: !0,
              enumerable: !1,
              configurable: !0,
            }),
            me
          )
        }
        throw de.from(le, le && le.code, A, I, le && le.response)
      }
    }
  },
  M3 = new Map(),
  I1 = t => {
    let r = (t && t.env) || {}
    const { fetch: l, Request: o, Response: s } = r,
      u = [o, s, l]
    let f = u.length,
      p = f,
      h,
      m,
      g = M3
    for (; p--;) ((h = u[p]), (m = g.get(h)), m === void 0 && g.set(h, (m = p ? new Map() : O3(r))), (g = m))
    return m
  }
I1()
const sh = { http: q_, xhr: v3, fetch: { get: I1 } }
$.forEach(sh, (t, r) => {
  if (t) {
    try {
      Object.defineProperty(t, 'name', { __proto__: null, value: r })
    } catch {}
    Object.defineProperty(t, 'adapterName', { __proto__: null, value: r })
  }
})
const kb = t => `- ${t}`,
  _3 = t => $.isFunction(t) || t === null || t === !1
function N3(t, r) {
  t = $.isArray(t) ? t : [t]
  const { length: l } = t
  let o, s
  const u = {}
  for (let f = 0; f < l; f++) {
    o = t[f]
    let p
    if (((s = o), !_3(o) && ((s = sh[(p = String(o)).toLowerCase()]), s === void 0)))
      throw new de(`Unknown adapter '${p}'`)
    if (s && ($.isFunction(s) || (s = s.get(r)))) break
    u[p || '#' + f] = s
  }
  if (!s) {
    const f = Object.entries(u).map(
      ([h, m]) => `adapter ${h} ` + (m === !1 ? 'is not supported by the environment' : 'is not available in the build')
    )
    let p = l
      ? f.length > 1
        ? `since :
` +
          f.map(kb).join(`
`)
        : ' ' + kb(f[0])
      : 'as no adapter specified'
    throw new de('There is no suitable adapter to dispatch the request ' + p, de.ERR_NOT_SUPPORT)
  }
  return s
}
const F1 = { getAdapter: N3, adapters: sh }
function Gd(t) {
  if ((t.cancelToken && t.cancelToken.throwIfRequested(), t.signal && t.signal.aborted)) throw new qi(null, t)
}
function Lb(t) {
  return (
    Gd(t),
    (t.headers = en.from(t.headers)),
    (t.data = Vd.call(t, t.transformRequest)),
    ['post', 'put', 'patch'].indexOf(t.method) !== -1 &&
      t.headers.setContentType('application/x-www-form-urlencoded', !1),
    F1.getAdapter(
      t.adapter || Pi.adapter,
      t
    )(t).then(
      function (o) {
        ;(Gd(t), (t.response = o))
        try {
          o.data = Vd.call(t, t.transformResponse, o)
        } finally {
          delete t.response
        }
        return ((o.headers = en.from(o.headers)), o)
      },
      function (o) {
        if (!$1(o) && (Gd(t), o && o.response)) {
          t.response = o.response
          try {
            o.response.data = Vd.call(t, t.transformResponse, o.response)
          } finally {
            delete t.response
          }
          o.response.headers = en.from(o.response.headers)
        }
        return Promise.reject(o)
      }
    )
  )
}
const dc = {}
;['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((t, r) => {
  dc[t] = function (o) {
    return typeof o === t || 'a' + (r < 1 ? 'n ' : ' ') + t
  }
})
const jb = {}
dc.transitional = function (r, l, o) {
  function s(u, f) {
    return '[Axios v' + ih + "] Transitional option '" + u + "'" + f + (o ? '. ' + o : '')
  }
  return (u, f, p) => {
    if (r === !1) throw new de(s(f, ' has been removed' + (l ? ' in ' + l : '')), de.ERR_DEPRECATED)
    return (
      l &&
        !jb[f] &&
        ((jb[f] = !0),
        console.warn(s(f, ' has been deprecated since v' + l + ' and will be removed in the near future'))),
      r ? r(u, f, p) : !0
    )
  }
}
dc.spelling = function (r) {
  return (l, o) => (console.warn(`${o} is likely a misspelling of ${r}`), !0)
}
function D3(t, r, l) {
  if (typeof t != 'object' || t === null) throw new de('options must be an object', de.ERR_BAD_OPTION_VALUE)
  const o = Object.keys(t)
  let s = o.length
  for (; s-- > 0;) {
    const u = o[s],
      f = Object.prototype.hasOwnProperty.call(r, u) ? r[u] : void 0
    if (f) {
      const p = t[u],
        h = p === void 0 || f(p, u, t)
      if (h !== !0) throw new de('option ' + u + ' must be ' + h, de.ERR_BAD_OPTION_VALUE)
      continue
    }
    if (l !== !0) throw new de('Unknown option ' + u, de.ERR_BAD_OPTION)
  }
}
const Ru = { assertOptions: D3, validators: dc },
  Wt = Ru.validators
let Va = class {
  constructor(r) {
    ;((this.defaults = r || {}), (this.interceptors = { request: new wb(), response: new wb() }))
  }
  async request(r, l) {
    try {
      return await this._request(r, l)
    } catch (o) {
      if (o instanceof Error) {
        let s = {}
        Error.captureStackTrace ? Error.captureStackTrace(s) : (s = new Error())
        const u = (() => {
          if (!s.stack) return ''
          const f = s.stack.indexOf(`
`)
          return f === -1 ? '' : s.stack.slice(f + 1)
        })()
        try {
          if (!o.stack) o.stack = u
          else if (u) {
            const f = u.indexOf(`
`),
              p =
                f === -1
                  ? -1
                  : u.indexOf(
                      `
`,
                      f + 1
                    ),
              h = p === -1 ? '' : u.slice(p + 1)
            String(o.stack).endsWith(h) ||
              (o.stack +=
                `
` + u)
          }
        } catch {}
      }
      throw o
    }
  }
  _request(r, l) {
    ;(typeof r == 'string' ? ((l = l || {}), (l.url = r)) : (l = r || {}), (l = Ka(this.defaults, l)))
    const { transitional: o, paramsSerializer: s, headers: u } = l
    ;(o !== void 0 &&
      Ru.assertOptions(
        o,
        {
          silentJSONParsing: Wt.transitional(Wt.boolean),
          forcedJSONParsing: Wt.transitional(Wt.boolean),
          clarifyTimeoutError: Wt.transitional(Wt.boolean),
          legacyInterceptorReqResOrdering: Wt.transitional(Wt.boolean),
          advertiseZstdAcceptEncoding: Wt.transitional(Wt.boolean),
          validateStatusUndefinedResolves: Wt.transitional(Wt.boolean),
        },
        !1
      ),
      s != null &&
        ($.isFunction(s)
          ? (l.paramsSerializer = { serialize: s })
          : Ru.assertOptions(s, { encode: Wt.function, serialize: Wt.function }, !0)),
      l.allowAbsoluteUrls !== void 0 ||
        (this.defaults.allowAbsoluteUrls !== void 0
          ? (l.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)
          : (l.allowAbsoluteUrls = !0)),
      Ru.assertOptions(l, { baseUrl: Wt.spelling('baseURL'), withXsrfToken: Wt.spelling('withXSRFToken') }, !0),
      (l.method = (l.method || this.defaults.method || 'get').toLowerCase()))
    let f = u && $.merge(u.common, u[l.method])
    ;(u &&
      $.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'query', 'common'], w => {
        delete u[w]
      }),
      (l.headers = en.concat(f, u)))
    const p = []
    let h = !0
    this.interceptors.request.forEach(function (R) {
      if (typeof R.runWhen == 'function' && R.runWhen(l) === !1) return
      h = h && R.synchronous
      const T = l.transitional || lh
      T && T.legacyInterceptorReqResOrdering ? p.unshift(R.fulfilled, R.rejected) : p.push(R.fulfilled, R.rejected)
    })
    const m = []
    this.interceptors.response.forEach(function (R) {
      m.push(R.fulfilled, R.rejected)
    })
    let g,
      b = 0,
      C
    if (!h) {
      const w = [Lb.bind(this), void 0]
      for (w.unshift(...p), w.push(...m), C = w.length, g = Promise.resolve(l); b < C;) g = g.then(w[b++], w[b++])
      return g
    }
    C = p.length
    let v = l
    for (; b < C;) {
      const w = p[b++],
        R = p[b++]
      try {
        v = w(v)
      } catch (T) {
        R.call(this, T)
        break
      }
    }
    try {
      g = Lb.call(this, v)
    } catch (w) {
      return Promise.reject(w)
    }
    for (b = 0, C = m.length; b < C;) g = g.then(m[b++], m[b++])
    return g
  }
  getUri(r) {
    r = Ka(this.defaults, r)
    const l = P1(r.baseURL, r.url, r.allowAbsoluteUrls, r)
    return k1(l, r.params, r.paramsSerializer)
  }
}
$.forEach(['delete', 'get', 'head', 'options'], function (r) {
  Va.prototype[r] = function (l, o) {
    return this.request(Ka(o || {}, { method: r, url: l, data: o && $.hasOwnProp(o, 'data') ? o.data : void 0 }))
  }
})
$.forEach(['post', 'put', 'patch', 'query'], function (r) {
  function l(o) {
    return function (u, f, p) {
      return this.request(
        Ka(p || {}, { method: r, headers: o ? { 'Content-Type': 'multipart/form-data' } : {}, url: u, data: f })
      )
    }
  }
  ;((Va.prototype[r] = l()), r !== 'query' && (Va.prototype[r + 'Form'] = l(!0)))
})
let B3 = class Y1 {
  constructor(r) {
    if (typeof r != 'function') throw new TypeError('executor must be a function.')
    let l
    this.promise = new Promise(function (u) {
      l = u
    })
    const o = this
    ;(this.promise.then(s => {
      if (!o._listeners) return
      let u = o._listeners.length
      for (; u-- > 0;) o._listeners[u](s)
      o._listeners = null
    }),
      (this.promise.then = s => {
        let u
        const f = new Promise(p => {
          ;(o.subscribe(p), (u = p))
        }).then(s)
        return (
          (f.cancel = function () {
            o.unsubscribe(u)
          }),
          f
        )
      }),
      r(function (u, f, p) {
        o.reason || ((o.reason = new qi(u, f, p)), l(o.reason))
      }))
  }
  throwIfRequested() {
    if (this.reason) throw this.reason
  }
  subscribe(r) {
    if (this.reason) {
      r(this.reason)
      return
    }
    this._listeners ? this._listeners.push(r) : (this._listeners = [r])
  }
  unsubscribe(r) {
    if (!this._listeners) return
    const l = this._listeners.indexOf(r)
    l !== -1 && this._listeners.splice(l, 1)
  }
  toAbortSignal() {
    const r = new AbortController(),
      l = o => {
        r.abort(o)
      }
    return (this.subscribe(l), (r.signal.unsubscribe = () => this.unsubscribe(l)), r.signal)
  }
  static source() {
    let r
    return {
      token: new Y1(function (s) {
        r = s
      }),
      cancel: r,
    }
  }
}
function z3(t) {
  return function (l) {
    return t.apply(null, l)
  }
}
function U3(t) {
  return $.isObject(t) && t.isAxiosError === !0
}
const yp = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
  WebServerIsDown: 521,
  ConnectionTimedOut: 522,
  OriginIsUnreachable: 523,
  TimeoutOccurred: 524,
  SslHandshakeFailed: 525,
  InvalidSslCertificate: 526,
}
Object.entries(yp).forEach(([t, r]) => {
  yp[r] = t
})
function V1(t) {
  const r = new Va(t),
    l = R1(Va.prototype.request, r)
  return (
    $.extend(l, Va.prototype, r, { allOwnKeys: !0 }),
    $.extend(l, r, null, { allOwnKeys: !0 }),
    (l.create = function (s) {
      return V1(Ka(t, s))
    }),
    l
  )
}
const dt = V1(Pi)
dt.Axios = Va
dt.CanceledError = qi
dt.CancelToken = B3
dt.isCancel = $1
dt.VERSION = ih
dt.toFormData = fc
dt.AxiosError = de
dt.Cancel = dt.CanceledError
dt.all = function (r) {
  return Promise.all(r)
}
dt.spread = z3
dt.isAxiosError = U3
dt.mergeConfig = Ka
dt.AxiosHeaders = en
dt.formToJSON = t => j1($.isHTMLForm(t) ? new FormData(t) : t)
dt.getAdapter = F1.getAdapter
dt.HttpStatusCode = yp
dt.default = dt
const {
    Axios: Z3,
    AxiosError: W3,
    CanceledError: J3,
    isCancel: e4,
    CancelToken: t4,
    VERSION: n4,
    all: r4,
    Cancel: a4,
    isAxiosError: l4,
    spread: o4,
    toFormData: i4,
    AxiosHeaders: s4,
    HttpStatusCode: u4,
    formToJSON: c4,
    getAdapter: f4,
    mergeConfig: d4,
    create: p4,
  } = dt,
  k3 = '/api/login',
  L3 = async t => (await dt.post(k3, t)).data,
  pc = '/api/blogs'
let hc = null
const j3 = t => {
    hc = `Bearer ${t}`
  },
  $3 = async t => {
    const r = { headers: { Authorization: hc } },
      l = `${pc}/${t.id}`
    return (await dt.put(l, t, r)).data
  },
  H3 = async t => {
    const r = { headers: { Authorization: hc } }
    return (await dt.post(pc, t, r)).data
  },
  P3 = async t => {
    const r = { headers: { Authorization: hc } }
    return (await dt.delete(`${pc}/${t}`, r)).data
  },
  q3 = async () => (await dt.get(pc)).data,
  $l = { getAll: q3, setToken: j3, createBlogListing: H3, updateBlogListing: $3, removeBlog: P3 },
  I3 = ({ onLoginSuccess: t, showMsg: r }) => {
    const [l, o] = S.useState(''),
      [s, u] = S.useState(''),
      f = ju(),
      p = async h => {
        h.preventDefault()
        try {
          const m = await L3({ username: l, password: s })
          ;(window.localStorage.setItem('loggedBlogListUser', JSON.stringify(m)),
            $l.setToken(m.token),
            t(m),
            f('/'),
            o(''),
            u(''),
            r({ msg: `Hello ${m.name} thankyou for using our humble application!`, msgType: 'success' }))
        } catch (m) {
          ;(r({ msg: `Login failed due to ${m.response.data.error}`, msgType: 'error' }),
            console.log('Incorrect Credentials', m))
        }
      }
    return q.jsxs('div', {
      children: [
        q.jsx(Ur, { variant: 'h4', sx: { py: 2 }, children: 'Log in to the application' }),
        q.jsxs('form', {
          onSubmit: p,
          className: 'form-container',
          children: [
            q.jsx(yi, {
              id: 'username',
              label: 'username',
              variant: 'standard',
              type: 'text',
              value: l,
              onChange: h => o(h.target.value),
            }),
            q.jsx(yi, {
              id: 'password',
              type: 'password',
              label: 'password',
              variant: 'standard',
              value: s,
              onChange: h => u(h.target.value),
            }),
            q.jsx(ha, { variant: 'contained', type: 'submit', children: 'login' }),
          ],
        }),
      ],
    })
  },
  F3 = ({ message: t }) => (t === null ? null : q.jsx(FA, { severity: t.msgType, sx: { mt: 1 }, children: t.msg }))
class $b extends vp.Component {
  constructor(r) {
    ;(super(r), (this.state = { hasError: !1, error: null }), (this.timer = null))
  }
  static getDerivedStateFromError(r) {
    return { hasError: !0, error: r }
  }
  componentDidCatch(r, l) {
    console.error('ErrorBoundary caught an error', r, l)
  }
  componentDidUpdate(r, l) {
    this.state.hasError &&
      !l.hasError &&
      (this.timer = setTimeout(() => {
        this.setState({ hasError: !1, error: null })
      }, 1e4))
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer)
  }
  render() {
    return this.state.hasError
      ? q.jsxs('div', {
          children: [
            q.jsx('h2', { children: 'Something went wrong.' }),
            q.jsx('p', {
              children: 'Please make a bug report here [github project link] and include the below error details.',
            }),
            q.jsx('p', { children: this.state.error.message }),
          ],
        })
      : this.props.children
  }
}
const Y3 = q.jsx('div', { children: q.jsx('h2', { children: '404 - Page not found' }) }),
  V3 = () => {
    const [t, r] = S.useState([]),
      [l, o] = S.useState(null),
      [s, u] = S.useState({ msg: null, msgType: null })
    ;(S.useEffect(() => {
      $l.getAll().then(R => r(R.sort((T, A) => A.likes - T.likes)))
    }, []),
      S.useEffect(() => {
        const R = window.localStorage.getItem('loggedBlogListUser')
        if (R) {
          const T = JSON.parse(R)
          ;(o(T), $l.setToken(T.token))
        }
      }, []))
    const f = ju(),
      p = KR('/blogs/:id'),
      h = p ? t.find(R => R.id === p.params.id) : null,
      m = async R => {
        try {
          const T = await $l.createBlogListing({ ...R })
          ;(T && r(t.concat(T).sort((A, O) => O.likes - A.likes)),
            v({ msg: `Blog ${T.title} added succesfully.`, msgType: 'success' }))
        } catch (T) {
          T.response.data.error
            ? T.response.data.error === 'token expired'
              ? (o(null),
                window.localStorage.removeItem('loggedBlogListUser'),
                v({
                  msg: 'Your session expired and you have been logged out. Please login in again to continue.',
                  msgType: 'error',
                }))
              : v({ msg: T.response.data.error, msgType: 'error' })
            : v({ msg: 'An unknown error occurred, please check your entry and try again.' })
        }
      },
      g = async R => {
        const T = await $l.updateBlogListing({ id: R.id, likes: R.likes + 1 })
        r(A => A.map(O => (O.id === T.id ? { ...O, likes: T.likes } : O)).sort((O, M) => M.likes - O.likes))
      },
      b = async R => {
        try {
          ;(await $l.removeBlog(R.id),
            r(T => T.filter(A => A.id !== R.id)),
            f('/'),
            v({ msg: `Blog ${R.title} by ${R.author} removed.`, msgType: 'success' }))
        } catch (T) {
          T.response.data.error
            ? T.response.data.error === 'token expired'
              ? (window.localStorage.removeItem('loggedBlogListUser'),
                v({
                  msg: 'Your session expired and you have been logged out. Please login in again to continue.',
                  msgType: 'warning',
                }))
              : v({ msg: T.response.data.error, msgType: 'error' })
            : v({ msg: 'An unknown error occurred, please check your entry and try again.' })
        }
      },
      C = R => {
        ;(R && R.preventDefault(),
          o(null),
          localStorage.removeItem('loggedBlogListUser'),
          f('/'),
          u({ msg: 'You have been logged out', msgType: 'message' }),
          setTimeout(() => u({ msg: null, msgType: null }), 5e3))
      },
      v = R => {
        ;(u(R), setTimeout(() => u({ msg: null, msgType: null }), 7e3))
      },
      w = { '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }
    return q.jsxs(SO, {
      children: [
        q.jsx(ZA, {
          position: 'static',
          children: q.jsxs(_5, {
            children: [
              q.jsx(Ur, { variant: 'h6', sx: { flexGrow: 1 }, children: 'Blog App' }),
              q.jsx(ha, { color: 'inherit', component: Hl, to: '/', sx: w, children: 'Blogs' }),
              l &&
                q.jsx(ha, {
                  color: 'inherit',
                  variant: 'text',
                  component: Hl,
                  to: '/newblog',
                  sx: w,
                  children: 'New Blog',
                }),
              !l &&
                q.jsx(ha, { color: 'inherit', variant: 'text', component: Hl, to: '/login', sx: w, children: 'Login' }),
              l && q.jsx(ha, { color: 'inherit', variant: 'text', onClick: C, sx: w, children: 'Logout' }),
            ],
          }),
        }),
        q.jsx($b, { children: s.msg && q.jsx(F3, { message: s }) }),
        q.jsx($b, {
          children: q.jsxs(cE, {
            children: [
              q.jsx(jl, { path: '/', element: q.jsx(k5, { blogs: t, user: l, updateBlogLikes: g, removeBlog: b }) }),
              q.jsx(jl, {
                path: '/blogs/:id',
                element: q.jsx(U5, { blog: h, updateLikes: g, loggedInUser: l, removeBlogListing: b }),
              }),
              q.jsx(jl, { path: '/newblog', element: l && q.jsx(L5, { addNewBlog: m }) }),
              q.jsx(jl, { path: '/login', element: q.jsx(I3, { onLoginSuccess: o, showMsg: v }) }),
              q.jsx(jl, { path: '*', element: q.jsx(Y3, {}) }),
            ],
          }),
        }),
      ],
    })
  }
fR.createRoot(document.getElementById('root')).render(q.jsx(zE, { children: q.jsx(V3, {}) }))
