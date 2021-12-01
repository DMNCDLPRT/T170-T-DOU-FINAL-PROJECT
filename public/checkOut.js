// https://checkout.razorpay.com/v1/checkout.js
// © Razorpay 2021

!function() {
    "use strict";
    !function() {
        var m = window
          , a = m.document
          , l = m.Boolean
          , s = m.Array
          , c = m.Object
          , o = m.String
          , u = m.Number
          , d = m.Date
          , f = m.Math
          , p = m.setTimeout
          , e = m.setInterval
          , t = m.clearTimeout
          , h = m.parseInt
          , i = m.encodeURIComponent
          , r = m.decodeURIComponent
          , _ = m.btoa
          , v = m.unescape
          , y = m.TypeError
          , g = m.navigator
          , b = m.location
          , n = m.XMLHttpRequest
          , k = m.NodeList
          , S = m.FormData;
        function E(t) {
            return function(n, e) {
                return arguments.length < 2 ? function(e) {
                    return t.call(null, e, n)
                }
                : t.call(null, n, e)
            }
        }
        function w(i) {
            return function(n, t, e) {
                return arguments.length < 3 ? function(e) {
                    return i.call(null, e, n, t)
                }
                : i.call(null, n, t, e)
            }
        }
        function D() {
            for (var e = arguments.length, n = new s(e), t = 0; t < e; t++)
                n[t] = arguments[t];
            return function(e) {
                return function() {
                    var t = arguments;
                    return n.every(function(e, n) {
                        return !!e(t[n]) || (function() {
                            console.error.apply(console, arguments)
                        }("wrong " + n + "th argtype", t[n]),
                        void m.dispatchEvent(J("rzp_error", {
                            detail: new Error("wrong " + n + "th argtype " + t[n])
                        })))
                    }) ? e.apply(null, t) : t[0]
                }
            }
        }
        function R(e) {
            return null === e
        }
        function C(e) {
            return K(e) && 1 === e.nodeType
        }
        function P(e) {
            var n = U();
            return function(e) {
                return U() - n
            }
        }
        var A = E(function(e, n) {
            return typeof e === n
        })
          , I = A("boolean")
          , M = A("number")
          , N = A("string")
          , B = A("function")
          , T = A("object")
          , L = s.isArray
          , x = A("undefined")
          , K = function(e) {
            return !R(e) && T(e)
        }
          , O = function(e) {
            return !z(c.keys(e))
        }
          , F = E(function(e, n) {
            return e && e[n]
        })
          , z = F("length")
          , H = F("prototype")
          , G = E(function(e, n) {
            return e instanceof n
        })
          , U = d.now
          , j = f.random
          , $ = f.floor;
        function Y(e, n) {
            return {
                error: (n = n,
                e = {
                    description: o(e = e)
                },
                n && (e.field = n),
                e)
            }
        }
        function Z(e) {
            throw new Error(e)
        }
        var W = function(e) {
            return /data:image\/[^;]+;base64/.test(e)
        };
        function V(e) {
            var n = function i(r, a) {
                var o = {};
                if (!K(r))
                    return o;
                var u = null == a;
                return c.keys(r).forEach(function(e) {
                    var n, t = r[e], e = u ? e : a + "[" + e + "]";
                    "object" == typeof t ? (n = i(t, e),
                    c.keys(n).forEach(function(e) {
                        o[e] = n[e]
                    })) : o[e] = t
                }),
                o
            }(e);
            return c.keys(n).map(function(e) {
                return i(e) + "=" + i(n[e])
            }).join("&")
        }
        function q(e, n) {
            return (n = K(n) ? V(n) : n) && (e += 0 < e.indexOf("?") ? "&" : "?",
            e += n),
            e
        }
        function J(e, n) {
            n = n || {
                bubbles: !1,
                cancelable: !1,
                detail: void 0
            };
            var t = a.createEvent("CustomEvent");
            return t.initCustomEvent(e, n.bubbles, n.cancelable, n.detail),
            t
        }
        function X(e) {
            try {
                return JSON.parse(e)
            } catch (e) {}
        }
        function Q(e) {
            return X(Ee(e))
        }
        function ee(e, t) {
            void 0 === t && (t = "");
            var i = {};
            return ke(e, function(e, n) {
                n = t ? t + "." + n : n;
                K(e) ? we(i, ee(e, n)) : i[n] = e
            }),
            i
        }
        var ne = H(s)
          , te = E(function(e, n) {
            return e && ne.forEach.call(e, n),
            e
        })
          , ie = function(t) {
            return E(function(e, n) {
                return ne[t].call(e, n)
            })
        }
          , re = ie("every")
          , ae = ie("map")
          , oe = E(function(e, n) {
            var e = e
              , e = ae(n)(e);
            return de(pe, [])(e)
        })
          , ue = ie("filter")
          , ce = ie("indexOf")
          , me = E(function(e, n) {
            return 0 <= ce(e, n)
        })
          , le = E(function(e, n) {
            for (var t = z(e), i = 0; i < t; i++)
                if (n(e[i], i, e))
                    return i;
            return -1
        })
          , se = E(function(e, n) {
            n = le(e, n);
            if (0 <= n)
                return e[n]
        })
          , de = w(function(e, n, t) {
            return ne.reduce.call(e, n, t)
        })
          , fe = E(function(e, n) {
            var t = z(n)
              , i = s(t + z(e));
            return te(n, function(e, n) {
                return i[n] = e
            }),
            te(e, function(e, n) {
                return i[n + t] = e
            }),
            i
        })
          , pe = E(function(e, n) {
            return fe(n, e)
        })
          , he = function(e) {
            return c.keys(e || {})
        }
          , _e = E(function(e, n) {
            return n in e
        })
          , ve = E(function(e, n) {
            return e && e.hasOwnProperty(n)
        })
          , ye = w(function(e, n, t) {
            return e[n] = t,
            e
        })
          , ge = w(function(e, n, t) {
            return t && (e[n] = t),
            e
        })
          , be = E(function(e, n) {
            return delete e[n],
            e
        })
          , ke = E(function(n, t) {
            return he(n).forEach(function(e) {
                return t(n[e], e, n)
            }),
            n
        })
          , Se = E(function(t, i) {
            return de(he(t), function(e, n) {
                return ye(e, n, i(t[n], n, t))
            }, {})
        })
          , Ee = JSON.stringify
          , we = E(function(t, e) {
            return ke(e, function(e, n) {
                return t[n] = e
            }),
            t
        })
          , De = function(e) {
            var n = {};
            return ke(e, function(t, e) {
                var i = (e = e.replace(/\[([^[\]]+)\]/g, ".$1")).split(".")
                  , r = n;
                i.forEach(function(e, n) {
                    n < i.length - 1 ? (r[e] || (r[e] = {}),
                    r = r[e]) : r[e] = t
                })
            }),
            n
        }
          , Re = function(e, n, t) {
            void 0 === t && (t = void 0);
            for (var i, r = n.split("."), a = e, o = 0; o < r.length; o++)
                try {
                    var u = a[r[o]];
                    if ((N(i = u) || M(i) || I(i) || R(i) || x(i)) && !N(u))
                        return !(o === r.length - 1) || void 0 === u ? t : u;
                    a = u
                } catch (e) {
                    return t
                }
            return a
        }
          , Ce = m.Element
          , Pe = function(e) {
            return a.createElement(e || "div")
        }
          , Ae = function(e) {
            return e.parentNode
        }
          , Ie = D(C)
          , Me = D(C, C)
          , Ne = D(C, N)
          , Be = D(C, N, function() {
            return !0
        })
          , A = D(C, K)
          , Te = (ie = Me(function(e, n) {
            return n.appendChild(e)
        }),
        E(ie))
          , Le = (Me = Me(function(e, n) {
            return Te(e)(n),
            e
        }),
        E(Me))
          , xe = Ie(function(e) {
            var n = Ae(e);
            return n && n.removeChild(e),
            e
        });
        Ie(F("selectionStart")),
        Ie(F("selectionEnd")),
        Me = function(e, n) {
            return e.selectionStart = e.selectionEnd = n,
            e
        }
        ,
        Me = D(C, M)(Me),
        E(Me);
        var Ke = Ie(function(e) {
            return e.submit(),
            e
        })
          , Oe = w(Be(function(e, n, t) {
            return e.setAttribute(n, t),
            e
        }))
          , Fe = w(Be(function(e, n, t) {
            return e.style[n] = t,
            e
        }))
          , ze = (Be = A(function(i, e) {
            return ke(function(e, n) {
                var t = i;
                return Oe(n, e)(t)
            })(e),
            i
        }),
        E(Be))
          , He = (A = A(function(i, e) {
            return ke(function(e, n) {
                var t = i;
                return Fe(n, e)(t)
            })(e),
            i
        }),
        E(A))
          , Ge = (A = Ne(function(e, n) {
            return e.innerHTML = n,
            e
        }),
        E(A))
          , A = (A = Ne(function(e, n) {
            return Fe("display", n)(e)
        }),
        E(A));
        A("none"),
        A("block"),
        A("inline-block");
        function Ue(n, i, r, a) {
            return G(n, Ce) ? console.error("use el |> _El.on(e, cb)") : function(t) {
                var e = i;
                return N(r) ? e = function(e) {
                    for (var n = e.target; !Ze(n, r) && n !== t; )
                        n = Ae(n);
                    n !== t && (e.delegateTarget = n,
                    i(e))
                }
                : a = r,
                a = !!a,
                t.addEventListener(n, e, a),
                function() {
                    return t.removeEventListener(n, e, a)
                }
            }
        }
        var je = F("offsetWidth")
          , $e = F("offsetHeight")
          , F = H(Ce)
          , Ye = F.matches || F.matchesSelector || F.webkitMatchesSelector || F.mozMatchesSelector || F.msMatchesSelector || F.oMatchesSelector
          , Ze = (F = Ne(function(e, n) {
            return Ye.call(e, n)
        }),
        E(F))
          , We = a.documentElement
          , Ve = a.body
          , qe = m.innerHeight
          , Je = m.pageYOffset
          , Xe = m.scrollBy
          , Qe = m.scrollTo
          , en = m.requestAnimationFrame
          , nn = a.querySelector.bind(a)
          , tn = a.querySelectorAll.bind(a);
        a.getElementById.bind(a),
        m.getComputedStyle.bind(m);
        function rn(e) {
            return N(e) ? nn(e) : e
        }
        var an;
        function on(e) {
            if (!e.target && m !== m.parent)
                return m.Razorpay.sendMessage({
                    event: "redirect",
                    data: e
                });
            un(e.url, e.content, e.method, e.target)
        }
        function un(e, n, t, i) {
            t && "get" === t.toLowerCase() ? (e = q(e, n),
            i ? m.open(e, i) : m.location = e) : (t = {
                action: e,
                method: t
            },
            i && (t.target = i),
            i = Pe("form"),
            i = ze(t)(i),
            i = Ge(cn(n))(i),
            i = Te(We)(i),
            i = Ke(i),
            xe(i))
        }
        function cn(e, t) {
            if (K(e)) {
                var i = "";
                return ke(e, function(e, n) {
                    i += cn(e, n = t ? t + "[" + n + "]" : n)
                }),
                i
            }
            var n = Pe("input");
            return n.type = "hidden",
            n.value = e,
            n.name = t,
            n.outerHTML
        }
        function mn(e) {
            !function(u) {
                if (!m.requestAnimationFrame)
                    return Xe(0, u);
                an && t(an);
                an = p(function() {
                    var i = Je
                      , r = f.min(i + u, $e(Ve) - qe);
                    u = r - i;
                    var a = 0
                      , o = m.performance.now();
                    en(function e(n) {
                        if (1 <= (a += (n - o) / 300))
                            return Qe(0, r);
                        var t = f.sin(ln * a / 2);
                        Qe(0, i + f.round(u * t)),
                        o = n,
                        en(e)
                    })
                }, 100)
            }(e - Je)
        }
        var ln = f.PI;
        c.entries || (c.entries = function(e) {
            for (var n = c.keys(e), t = n.length, i = new s(t); t--; )
                i[t] = [n[t], e[n[t]]];
            return i
        }
        ),
        c.values || (c.values = function(e) {
            for (var n = c.keys(e), t = n.length, i = new s(t); t--; )
                i[t] = e[n[t]];
            return i
        }
        ),
        "function" != typeof c.assign && c.defineProperty(c, "assign", {
            value: function(e, n) {
                if (null == e)
                    throw new y("Cannot convert undefined or null to object");
                for (var t = c(e), i = 1; i < arguments.length; i++) {
                    var r = arguments[i];
                    if (null != r)
                        for (var a in r)
                            c.prototype.hasOwnProperty.call(r, a) && (t[a] = r[a])
                }
                return t
            },
            writable: !0,
            configurable: !0
        }),
        window.NodeList && !k.prototype.forEach && (k.prototype.forEach = s.prototype.forEach);
        var sn, dn, fn, pn = n, hn = Y("Network error"), _n = 0;
        function vn(e, n) {
            return n ? q(e, V({
                keyless_header: n
            })) : e
        }
        function yn(e) {
            if (!G(this, yn))
                return new yn(e);
            this.options = function(e) {
                N(e) && (e = {
                    url: e
                });
                var n = e
                  , t = n.method
                  , i = n.headers
                  , r = n.callback
                  , n = n.data;
                i || (e.headers = {});
                t || (e.method = "get");
                r || (e.callback = function(e) {
                    return e
                }
                );
                K(n) && !G(n, S) && (n = V(n));
                return e.data = n,
                e
            }(e),
            this.defer()
        }
        Ne = {
            setReq: function(e, n) {
                return this.abort(),
                this.type = e,
                this.req = n,
                this
            },
            till: function(n, t) {
                var i = this;
                return void 0 === t && (t = 0),
                this.setReq("timeout", p(function() {
                    i.call(function(e) {
                        e.error && 0 < t ? i.till(n, t - 1) : n(e) ? i.till(n, t) : i.options.callback(e)
                    })
                }, 3e3))
            },
            abort: function() {
                var e = this.req
                  , n = this.type;
                e && ("ajax" === n ? this.req.abort() : "jsonp" === n ? m.Razorpay[this.req] = function(e) {
                    return e
                }
                : t(this.req),
                this.req = null)
            },
            defer: function() {
                var e = this;
                this.req = p(function() {
                    return e.call()
                })
            },
            call: function(n) {
                void 0 === n && (n = this.options.callback);
                var e = this.options
                  , t = e.url
                  , i = e.method
                  , r = e.data
                  , e = e.headers
                  , t = vn(t, fn)
                  , a = new pn;
                this.setReq("ajax", a),
                a.open(i, t, !0),
                a.onreadystatechange = function() {
                    var e;
                    4 === a.readyState && a.status && ((e = X(a.responseText)) || ((e = Y("Parsing error")).xhr = {
                        status: a.status,
                        text: a.responseText
                    }),
                    e.error && m.dispatchEvent(J("rzp_network_error", {
                        detail: {
                            method: i,
                            url: t,
                            baseUrl: t.split("?")[0],
                            status: a.status,
                            xhrErrored: !1,
                            response: e
                        }
                    })),
                    e.status_code = a.status,
                    n(e))
                }
                ,
                a.onerror = function() {
                    var e = hn;
                    e.xhr = {
                        status: 0
                    },
                    m.dispatchEvent(J("rzp_network_error", {
                        detail: {
                            method: i,
                            url: t,
                            baseUrl: t.split("?")[0],
                            status: 0,
                            xhrErrored: !0,
                            response: e
                        }
                    })),
                    n(e)
                }
                ,
                e = e,
                e = ge("X-Razorpay-SessionId", sn)(e),
                e = ge("X-Razorpay-TrackId", dn)(e),
                ke(function(e, n) {
                    return a.setRequestHeader(n, e)
                })(e),
                a.send(r)
            }
        };
        (Ne.constructor = yn).prototype = Ne,
        yn.post = function(e) {
            return e.method = "post",
            e.headers || (e.headers = {}),
            e.headers["Content-type"] || (e.headers["Content-type"] = "application/x-www-form-urlencoded"),
            yn(e)
        }
        ,
        yn.patch = function(e) {
            return e.method = "PATCH",
            e.headers || (e.headers = {}),
            e.headers["Content-type"] || (e.headers["Content-type"] = "application/x-www-form-urlencoded"),
            yn(e)
        }
        ,
        yn.setSessionId = function(e) {
            sn = e
        }
        ,
        yn.setTrackId = function(e) {
            dn = e
        }
        ,
        yn.setKeylessHeader = function(e) {
            fn = e
        }
        ,
        yn.jsonp = function(o) {
            o.data || (o.data = {});
            var u = _n++
              , c = 0
              , e = new yn(o);
            return o = e.options,
            e.call = function(n) {
                void 0 === n && (n = o.callback);
                function e() {
                    i || this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || (i = !0,
                    this.onload = this.onreadystatechange = null,
                    xe(this))
                }
                var t = "jsonp" + u + "_" + ++c
                  , i = !1
                  , r = m.Razorpay[t] = function(e) {
                    be(e, "http_status_code"),
                    n(e),
                    be(m.Razorpay, t)
                }
                ;
                this.setReq("jsonp", r);
                var a = q(o.url, o.data);
                a = q(a = vn(a, fn), V({
                    callback: "Razorpay." + t
                })),
                r = Pe("script"),
                r = we({
                    src: a,
                    async: !0,
                    onerror: function(e) {
                        return n(hn)
                    },
                    onload: e,
                    onreadystatechange: e
                })(r),
                Te(We)(r)
            }
            ,
            e
        }
        ;
        var gn = function(e) {
            return console.warn("Promise error:", e)
        }
          , bn = function(e) {
            return G(e, kn)
        };
        function kn(e) {
            if (!bn(this))
                throw "new Promise";
            if ("function" != typeof e)
                throw new y("not a function");
            this._state = 0,
            this._handled = !1,
            this._value = void 0,
            this._deferreds = [],
            Cn(e, this)
        }
        function Sn(t, i) {
            for (; 3 === t._state; )
                t = t._value;
            0 !== t._state ? (t._handled = !0,
            p(function() {
                var e, n = 1 === t._state ? i.onFulfilled : i.onRejected;
                if (null !== n) {
                    try {
                        e = n(t._value)
                    } catch (e) {
                        return void wn(i.promise, e)
                    }
                    En(i.promise, e)
                } else
                    (1 === t._state ? En : wn)(i.promise, t._value)
            })) : t._deferreds.push(i)
        }
        function En(n, e) {
            try {
                if (e === n)
                    throw new y("promise resolved by itself");
                if (K(e) || B(e)) {
                    var t = e.then;
                    if (bn(e))
                        return n._state = 3,
                        n._value = e,
                        void Dn(n);
                    if (B(t))
                        return void Cn(t.bind(e), n)
                }
                n._state = 1,
                n._value = e,
                Dn(n)
            } catch (e) {
                wn(n, e)
            }
        }
        function wn(e, n) {
            e._state = 2,
            e._value = n,
            Dn(e)
        }
        function Dn(n) {
            2 === n._state && 0 === n._deferreds.length && p(function() {
                n._handled || gn(n._value)
            }),
            (n._deferreds || []).forEach(function(e) {
                return Sn(n, e)
            }),
            n._deferreds = null
        }
        function Rn(e, n, t) {
            this.onFulfilled = B(e) ? e : null,
            this.onRejected = B(n) ? n : null,
            this.promise = t
        }
        function Cn(e, n) {
            var t = !1;
            try {
                e(function(e) {
                    t || (t = !0,
                    En(n, e))
                }, function(e) {
                    t || (t = !0,
                    wn(n, e))
                })
            } catch (e) {
                if (t)
                    return;
                t = !0,
                wn(n, e)
            }
        }
        F = kn.prototype,
        we({
            catch: function(e) {
                return this.then(null, e)
            },
            then: function(e, n) {
                var t = new kn(function(e) {
                    return e
                }
                );
                return Sn(this, new Rn(e,n,t)),
                t
            },
            finally: function(n) {
                return this.then(function(e) {
                    return kn.resolve(n()).then(function() {
                        return e
                    })
                }, function(e) {
                    return kn.resolve(n()).then(function() {
                        return kn.reject(e)
                    })
                })
            }
        })(F),
        kn.all = function(o) {
            return new kn(function(i, r) {
                if (!o || void 0 === o.length)
                    throw new y("Promise.all accepts an array");
                if (0 === o.length)
                    return i([]);
                var a = o.length;
                o.forEach(function n(e, t) {
                    try {
                        if ((K(e) || B(e)) && B(e.then))
                            return e.then(function(e) {
                                return n(e, t)
                            }, r);
                        o[t] = e,
                        0 == --a && i(o)
                    } catch (e) {
                        r(e)
                    }
                })
            }
            )
        }
        ,
        kn.resolve = function(n) {
            return bn(n) ? n : new kn(function(e) {
                return e(n)
            }
            )
        }
        ,
        kn.reject = function(t) {
            return new kn(function(e, n) {
                return n(t)
            }
            )
        }
        ,
        kn.race = function(e) {
            return new kn(function(n, t) {
                return e.forEach(function(e) {
                    return e.then(n, t)
                })
            }
            )
        }
        ;
        var k = m.Promise
          , Pn = k && B(H(k).then) && k || kn;
        function An() {
            return (An = Object.assign || function(e) {
                for (var n = 1; n < arguments.length; n++) {
                    var t, i = arguments[n];
                    for (t in i)
                        Object.prototype.hasOwnProperty.call(i, t) && (e[t] = i[t])
                }
                return e
            }
            ).apply(this, arguments)
        }
        function In(e, n) {
            (null == n || n > e.length) && (n = e.length);
            for (var t = 0, i = new Array(n); t < n; t++)
                i[t] = e[t];
            return i
        }
        function Mn(e, n) {
            var t = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
            if (t)
                return (t = t.call(e)).next.bind(t);
            if (Array.isArray(e) || (t = function(e, n) {
                if (e) {
                    if ("string" == typeof e)
                        return In(e, n);
                    var t = Object.prototype.toString.call(e).slice(8, -1);
                    return "Map" === (t = "Object" === t && e.constructor ? e.constructor.name : t) || "Set" === t ? Array.from(e) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? In(e, n) : void 0
                }
            }(e)) || n && e && "number" == typeof e.length) {
                t && (e = t);
                var i = 0;
                return function() {
                    return i >= e.length ? {
                        done: !0
                    } : {
                        done: !1,
                        value: e[i++]
                    }
                }
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }
        B(Pn.prototype.finally) || (Pn.prototype.finally = kn.prototype.finally);
        var Nn = "metric"
          , Bn = Object.freeze({
            __proto__: null,
            BEHAV: "behav",
            RENDER: "render",
            METRIC: Nn,
            DEBUG: "debug",
            INTEGRATION: "integration"
        })
          , Tn = {
            _storage: {},
            setItem: function(e, n) {
                this._storage[e] = n
            },
            getItem: function(e) {
                return this._storage[e] || null
            },
            removeItem: function(e) {
                delete this._storage[e]
            }
        };
        var Ln = function() {
            var e = U();
            try {
                m.localStorage.setItem("_storage", e);
                var n = m.localStorage.getItem("_storage");
                return m.localStorage.removeItem("_storage"),
                e !== h(n) ? Tn : m.localStorage
            } catch (e) {
                return Tn
            }
        }()
          , xn = "rzp_checkout_exp"
          , n = function() {
            function i(e) {
                var o = this;
                void 0 === e && (e = {}),
                this.getExperiment = function(e) {
                    return e ? o.experiments[e] : null
                }
                ,
                this.getAllActiveExperimentsName = function() {
                    return c.keys(o.experiments)
                }
                ,
                this.clearOldExperiments = function() {
                    var t = i.getExperimentsFromStorage()
                      , e = o.getAllActiveExperimentsName().reduce(function(e, n) {
                        return void 0 !== t[n] && (e[n] = t[n]),
                        e
                    }, {});
                    i.setExperimentsInStorage(e)
                }
                ,
                this.create = function(e, n, t) {
                    var i = t = void 0 === t ? {} : t
                      , r = i.evaluatorArg
                      , a = i.overrideFn;
                    var t = "number" == typeof n ? function() {
                        return f.random() < n ? 0 : 1
                    }
                    : n;
                    if ("function" != typeof t)
                        throw new Error("evaluatorFn must be a function or number");
                    i = {
                        name: e,
                        enabled: function() {
                            return 1 === this.getSegmentOrCreate(e, r, a)
                        }
                        .bind(o),
                        evaluator: t
                    };
                    return o.register(((t = {})[e] = i,
                    t)),
                    i
                }
                ,
                this.experiments = e
            }
            i.setExperimentsInStorage = function(e) {
                if (e && "object" == typeof e)
                    try {
                        e = JSON.stringify(e),
                        Ln.setItem(xn, e)
                    } catch (e) {
                        return
                    }
            }
            ,
            i.getExperimentsFromStorage = function() {
                var e;
                try {
                    e = JSON.parse(Ln.getItem(xn))
                } catch (e) {}
                return e && "object" == typeof e && !s.isArray(e) ? e : {}
            }
            ;
            var e = i.prototype;
            return e.setSegment = function(e, n, t) {
                e = this.getExperiment(e);
                if (e) {
                    t = ("function" == typeof t ? t : e.evaluator)(n),
                    n = i.getExperimentsFromStorage();
                    return n[e.name] = t,
                    i.setExperimentsInStorage(n),
                    t
                }
            }
            ,
            e.getSegment = function(e) {
                return i.getExperimentsFromStorage()[e]
            }
            ,
            e.getSegmentOrCreate = function(e, n, t) {
                var i = this.getSegment(e);
                return void 0 === i ? this.setSegment(e, n, t) : i
            }
            ,
            e.register = function(e) {
                this.experiments = An({}, this.experiments, e)
            }
            ,
            i
        }();
        new n({});
        var Kn = n.getExperimentsFromStorage
          , On = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
          , Fn = (Ne = On,
        de(function(e, n, t) {
            return ye(e, n, t)
        }, {})(Ne));
        function zn(e) {
            for (var n = ""; e; )
                n = On[e % 62] + n,
                e = $(e / 62);
            return n
        }
        function Hn() {
            var t, i = zn(o(U() - 13885344e5) + o("000000" + $(1e6 * j())).slice(-6)) + zn($(238328 * j())) + "0", r = 0, e = i;
            return te(function(e, n) {
                t = Fn[i[i.length - 1 - n]],
                (i.length - n) % 2 && (t *= 2),
                r += t = 62 <= t ? t % 62 + 1 : t
            })(e),
            t = (t = r % 62) && On[62 - t],
            o(i).slice(0, 13) + t
        }
        var Gn = Hn()
          , Un = {
            library: "checkoutjs",
            platform: "browser",
            referer: b.href
        };
        function jn(e) {
            var t = {
                checkout_id: e ? e.id : Gn
            }
              , e = ["device", "env", "integration", "library", "os_version", "os", "platform_version", "platform", "referer"];
            return te(function(e) {
                var n = t;
                return ge(e, Un[e])(n)
            })(e),
            t
        }
        var $n, Yn, Zn = [], Wn = [], Vn = function(e) {
            return Zn.push(e)
        }, qn = function(e) {
            Yn = e
        }, Jn = function(e) {
            if (e && ($n = e),
            Zn.length && "live" === $n) {
                var n = _e(g, "sendBeacon")
                  , e = {
                    context: Yn,
                    addons: [{
                        name: "ua_parser",
                        input_key: "user_agent",
                        output_key: "user_agent_parsed"
                    }],
                    events: Zn.splice(0, Zn.length)
                }
                  , e = {
                    url: "https://lumberjack.razorpay.com/v1/track",
                    data: {
                        key: "ZmY5N2M0YzVkN2JiYzkyMWM1ZmVmYWJk",
                        data: (e = Ee(e),
                        e = i(e),
                        e = v(e),
                        e = _(e),
                        i(e))
                    }
                };
                try {
                    n ? g.sendBeacon(e.url, Ee(e.data)) : yn.post(e)
                } catch (e) {}
            }
        };
        function Xn(r, a, o, u) {
            r ? "test" !== ($n = r.getMode()) && p(function() {
                o instanceof Error && (o = {
                    message: o.message,
                    stack: o.stack
                });
                var e = jn(r);
                e.user_agent = null,
                e.mode = "live";
                var n = r.get("order_id");
                n && (e.order_id = n);
                var t = {
                    options: i = {}
                };
                o && (t.data = o);
                var i = we(i, De(r.get()));
                "function" == typeof r.get("handler") && (i.handler = !0),
                "string" == typeof r.get("callback_url") && (i.callback_url = !0),
                _e(i, "prefill") && te(["card"], function(e) {
                    _e(i.prefill, e) && (i.prefill[e] = !0)
                }),
                i.image && W(i.image) && (i.image = "base64");
                var n = r.get("external.wallets") || [];
                i.external_wallets = (n = n,
                de(function(e, n) {
                    return ye(n, !0)(e)
                }, {})(n)),
                Gn && (t.local_order_id = Gn),
                t.build_number = 1504800775,
                t.experiments = Kn(),
                Vn({
                    event: a,
                    properties: t,
                    timestamp: U()
                }),
                qn(e),
                u && Jn()
            }) : Wn.push([a, o, u])
        }
        e(function() {
            Jn()
        }, 1e3),
        Xn.dispatchPendingEvents = function(e) {
            var n;
            e && (n = Xn.bind(Xn, e),
            Wn.splice(0, Wn.length).forEach(function(e) {
                n.apply(Xn, e)
            }))
        }
        ,
        Xn.parseAnalyticsData = function(e) {
            K(e) && (e = e,
            ke(function(e, n) {
                Un[e] = n
            })(e))
        }
        ,
        Xn.makeUid = Hn,
        Xn.common = jn,
        Xn.props = Un,
        Xn.id = Gn,
        Xn.updateUid = function(e) {
            Gn = e,
            Xn.id = e
        }
        ,
        Xn.flush = Jn;
        var Qn, et = {}, nt = {}, tt = {
            setR: function(e) {
                Qn = e,
                Xn.dispatchPendingEvents(e)
            },
            track: function(e, n) {
                var t, i, r = void 0 === n ? {} : n, a = r.type, o = r.data, u = void 0 === o ? {} : o, n = r.r, o = void 0 === n ? Qn : n, n = r.immediately, r = void 0 !== n && n, n = (t = ee(et),
                ke(t, function(e, n) {
                    B(e) && (t[n] = e.call())
                }),
                t);
                i = Q(u || {}),
                ["token"].forEach(function(e) {
                    i[e] && (i[e] = "__REDACTED__")
                }),
                (u = K(u = i) ? Q(u) : {
                    data: u
                }).meta && K(u.meta) && (n = we(n, u.meta)),
                u.meta = n,
                u.meta.request_index = nt[Qn.id],
                Xn(o, e = a ? a + ":" + e : e, u, r)
            },
            setMeta: function(e, n) {
                ye(et, e, n)
            },
            removeMeta: function(e) {
                be(et, e)
            },
            getMeta: function() {
                return De(et)
            },
            updateRequestIndex: function(e) {
                if (!Qn || !e)
                    return 0;
                _e(nt, Qn.id) || (nt[Qn.id] = {});
                var n = nt[Qn.id];
                return _e(n, e) || (n[e] = -1),
                n[e] += 1,
                n[e]
            }
        }, F = function(t, i) {
            if (!t)
                return i;
            var r = {};
            return c.keys(i).forEach(function(e) {
                var n = i[e];
                "__PREFIX" !== e || "__PREFIX" !== n ? r[e] = t + ":" + n : r[t.toUpperCase()] = "" + t
            }),
            r
        }, k = F("card", An({}, {
            ADD_NEW_CARD: "add_new"
        }, {
            APP_SELECT: "app:select"
        })), n = F("saved_cards", {
            __PREFIX: "__PREFIX",
            CHECK_SAVED_CARDS: "check",
            HIDE_SAVED_CARDS: "hide",
            SHOW_SAVED_CARDS: "show",
            SKIP_SAVED_CARDS: "skip",
            EMI_PLAN_VIEW_SAVED_CARDS: "emi:plans:view",
            OTP_SUBMIT_SAVED_CARDS: "save:otp:submit",
            ACCESS_OTP_SUBMIT_SAVED_CARDS: "access:otp:submit",
            USER_CONSENT_FOR_TOKENIZATION: "user_consent_for_tokenization",
            TOKENIZATION_KNOW_MORE_MODAL: "tokenization_know_more_modal"
        }), Ne = F("emi", {
            VIEW_EMI_PLANS: "plans:view",
            EDIT_EMI_PLANS: "plans:edit",
            PAY_WITHOUT_EMI: "pay_without",
            VIEW_ALL_EMI_PLANS: "plans:view:all",
            SELECT_EMI_PLAN: "plan:select",
            CHOOSE_EMI_PLAN: "plan:choose",
            EMI_PLANS: "plans",
            EMI_CONTACT: "contact",
            EMI_CONTACT_FILLED: "contact:filled"
        }), e = An({}, {
            SHOW_AVS_SCREEN: "avs_screen:show"
        }, {
            HIDE_ADD_CARD_SCREEN: "add_cards:hide"
        }, {
            SHOW_PAYPAL_RETRY_SCREEN: "paypal_retry:show",
            SHOW_PAYPAL_RETRY_ON_OTP_SCREEN: "paypal_retry:show:otp_screen",
            PAYPAL_RETRY_CANCEL_BTN_CLICK: "paypal_retry:cancel_click",
            PAYPAL_RETRY_PAYPAL_BTN_CLICK: "paypal_retry:paypal_click",
            PAYPAL_RETRY_PAYPAL_ENABLED: "paypal_retry:paypal_enabled"
        });
        An({}, k, n, Ne, e);
        var it = F("cred", {
            ELIGIBILITY_CHECK: "eligibility_check",
            SUBTEXT_OFFER_EXPERIMENT: "subtext_offer_experiment",
            EXPERIMENT_OFFER_SELECTED: "experiment_offer_selected"
        });
        F("offer", An({}, {
            APPLY: "apply"
        }));
        F("p13n", An({}, {
            INSTRUMENTS_SHOWN: "instruments_shown",
            INSTRUMENTS_LIST: "instruments:list"
        }));
        F("home", An({}, {
            HOME_LOADED: "checkoutHomeScreenLoaded",
            PAYMENT_INSTRUMENT_SELECTED: "checkoutPaymentInstrumentSelected",
            PAYMENT_METHOD_SELECTED: "checkoutPaymentMethodSelected",
            METHODS_SHOWN: "methods:shown",
            METHODS_HIDE: "methods:hide",
            P13N_EXPERIMENT: "p13n:experiment",
            LANDING: "landing",
            PROCEED: "proceed"
        }));
        F("order", An({}, {
            INVALID_TPV: "invalid_tpv"
        }));
        var rt = "automatic_checkout_open"
          , at = "automatic_checkout_click";
        F("downtime", An({}, {
            ALERT_SHOW: "alert:show",
            CALLOUT_SHOW: "callout:show",
            DOWNTIME_ALERTSHOW: "alert:show"
        }));
        var ot, ut = "js_error", ct = (ot = {},
        c.keys(Bn).forEach(function(e) {
            var t = Bn[e]
              , e = "Track" + t.charAt(0).toUpperCase() + t.slice(1);
            ot[e] = function(e, n) {
                tt.track(e, {
                    type: t,
                    data: n
                })
            }
        }),
        ot.Track = function(e, n) {
            tt.track(e, {
                data: n
            })
        }
        ,
        ot);
        function mt(e) {
            return e
        }
        function lt() {
            return this._evts = {},
            this._defs = {},
            this
        }
        ct = An({}, ct, {
            setMeta: tt.setMeta,
            removeMeta: tt.removeMeta,
            updateRequestIndex: tt.updateRequestIndex,
            setR: tt.setR
        }),
        lt.prototype = {
            onNew: mt,
            def: function(e, n) {
                this._defs[e] = n
            },
            on: function(e, n) {
                var t;
                return N(e) && B(n) && ((t = this._evts)[e] || (t[e] = []),
                !1 !== this.onNew(e, n) && t[e].push(n)),
                this
            },
            once: function(n, e) {
                var t = e
                  , i = this;
                return this.on(n, e = function e() {
                    t.apply(i, arguments),
                    i.off(n, e)
                }
                )
            },
            off: function(t, e) {
                var n = arguments.length;
                if (!n)
                    return lt.call(this);
                var i = this._evts;
                if (2 === n) {
                    n = i[t];
                    if (!B(e) || !L(n))
                        return;
                    if (n.splice(ce(n, e), 1),
                    n.length)
                        return
                }
                return i[t] ? delete i[t] : (t += ".",
                ke(i, function(e, n) {
                    n.indexOf(t) || delete i[n]
                })),
                this
            },
            emit: function(e, n) {
                var t = this;
                return (this._evts[e] || []).forEach(function(e) {
                    try {
                        e.call(t, n)
                    } catch (e) {
                        console.error
                    }
                }),
                this
            },
            emitter: function() {
                var e = arguments
                  , n = this;
                return function() {
                    n.emit.apply(n, e)
                }
            }
        };
        var st = g.userAgent
          , dt = g.vendor;
        function ft(e) {
            return e.test(st)
        }
        function pt(e) {
            return e.test(dt)
        }
        ft(/MSIE |Trident\//);
        var ht = ft(/iPhone/)
          , n = ht || ft(/iPad/)
          , _t = ft(/Android/)
          , vt = ft(/iPad/)
          , yt = ft(/Windows NT/)
          , gt = ft(/Linux/)
          , bt = ft(/Mac OS/);
        ft(/^((?!chrome|android).)*safari/i) || pt(/Apple/),
        ft(/firefox/),
        ft(/Chrome/) && pt(/Google Inc/),
        ft(/; wv\) |Gecko\) Version\/[^ ]+ Chrome/);
        var kt = ft(/Instagram/);
        ft(/SamsungBrowser/);
        var Ne = ft(/FB_IAB/)
          , e = ft(/FBAN/)
          , St = Ne || e;
        var Et = ft(/; wv\) |Gecko\) Version\/[^ ]+ Chrome|Windows Phone|Opera Mini|UCBrowser|CriOS/) || St || kt || n || ft(/Android 4/);
        ft(/iPhone/),
        st.match(/Chrome\/(\d+)/);
        ft(/(Vivo|HeyTap|Realme|Oppo)Browser/);
        var wt = function() {
            return ht || vt ? "iOS" : _t ? "android" : yt ? "windows" : gt ? "linux" : bt ? "macOS" : "other"
        }
          , Dt = function() {
            return ht ? "iPhone" : vt ? "iPad" : _t ? "android" : m.matchMedia("(max-device-height: 485px),(max-device-width: 485px)").matches ? "mobile" : "desktop"
        }
          , Rt = {
            key: "",
            account_id: "",
            image: "",
            amount: 100,
            currency: "INR",
            order_id: "",
            invoice_id: "",
            subscription_id: "",
            auth_link_id: "",
            payment_link_id: "",
            notes: null,
            callback_url: "",
            redirect: !1,
            description: "",
            customer_id: "",
            recurring: null,
            payout: null,
            contact_id: "",
            signature: "",
            retry: !0,
            target: "",
            subscription_card_change: null,
            display_currency: "",
            display_amount: "",
            recurring_token: {
                max_amount: 0,
                expire_by: 0
            },
            checkout_config_id: "",
            send_sms_hash: !1,
            show_address: !0,
            show_coupons: !0,
            one_click_checkout: !1,
            force_cod: !1,
            mandatory_login: !1
        };
        function Ct(e, n, t, i) {
            var r = n[t = t.toLowerCase()]
              , n = typeof r;
            "object" == n && null === r ? N(i) && ("true" === i || "1" === i ? i = !0 : "false" !== i && "0" !== i || (i = !1)) : "string" == n && (M(i) || I(i)) ? i = o(i) : "number" == n ? i = u(i) : "boolean" == n && (N(i) ? "true" === i || "1" === i ? i = !0 : "false" !== i && "0" !== i || (i = !1) : M(i) && (i = !!i)),
            null !== r && n != typeof i || (e[t] = i)
        }
        function Pt(i, r, a) {
            ke(i[r], function(e, n) {
                var t = typeof e;
                "string" != t && "number" != t && "boolean" != t || (n = r + a[0] + n,
                1 < a.length && (n += a[1]),
                i[n] = e)
            }),
            delete i[r]
        }
        function At(e, i) {
            var r = {};
            return ke(e, function(e, t) {
                t in It ? ke(e, function(e, n) {
                    Ct(r, i, t + "." + n, e)
                }) : Ct(r, i, t, e)
            }),
            r
        }
        var It = {};
        function Mt(t) {
            var e;
            "object" == typeof (e = t).retry && "boolean" == typeof e.retry.enabled && (e.retry = e.retry.enabled),
            t = e,
            ke(Rt, function(e, t) {
                K(e) && !O(e) && (It[t] = !0,
                ke(e, function(e, n) {
                    Rt[t + "." + n] = e
                }),
                delete Rt[t])
            }),
            (t = At(t, Rt)).callback_url && Et && (t.redirect = !0),
            this.get = function(e) {
                return arguments.length ? (e in t ? t : Rt)[e] : t
            }
            ,
            this.set = function(e, n) {
                t[e] = n
            }
            ,
            this.unset = function(e) {
                delete t[e]
            }
        }
        var Nt = "rzp_device_id"
          , Bt = 1
          , Tt = ""
          , Lt = ""
          , xt = m.screen;
        function Kt() {
            return function(e) {
                e = new m.TextEncoder("utf-8").encode(e);
                return m.crypto.subtle.digest("SHA-1", e).then(function(e) {
                    return Tt = function(e) {
                        for (var n = [], t = new m.DataView(e), i = 0; i < t.byteLength; i += 4) {
                            var r = t.getUint32(i).toString(16)
                              , a = "00000000"
                              , a = (a + r).slice(-a.length);
                            n.push(a)
                        }
                        return n.join("")
                    }(e)
                })
            }([g.userAgent, g.language, (new d).getTimezoneOffset(), g.platform, g.cpuClass, g.hardwareConcurrency, xt.colorDepth, g.deviceMemory, xt.width + xt.height, xt.width * xt.height, m.devicePixelRatio].join())
        }
        try {
            Kt().then(function(e) {
                e && function(e) {
                    if (e) {
                        try {
                            Lt = Ln.getItem(Nt)
                        } catch (e) {}
                        if (!Lt) {
                            Lt = [Bt, e, d.now(), f.random().toString().slice(-8)].join(".");
                            try {
                                Ln.setItem(Nt, Lt)
                            } catch (e) {}
                        }
                    }
                }(Tt = e)
            }).catch(l)
        } catch (e) {}
        function Ot() {}
        function Ft(e) {
            return e()
        }
        function zt(e) {
            if (null == e)
                return Ot;
            for (var n = arguments.length, t = new s(1 < n ? n - 1 : 0), i = 1; i < n; i++)
                t[i - 1] = arguments[i];
            var r = e.subscribe.apply(e, t);
            return r.unsubscribe ? function() {
                return r.unsubscribe()
            }
            : r
        }
        function Ht(e) {
            var n;
            return zt(e, function(e) {
                return n = e
            })(),
            n
        }
        Pn.resolve();
        var Gt = [];
        function Ut(o, i) {
            var u;
            void 0 === i && (i = Ot);
            var c = new Set;
            function r(e) {
                if (a = e,
                ((r = o) != r ? a == a : r !== a || r && "object" == typeof r || "function" == typeof r) && (o = e,
                u)) {
                    for (var e = !Gt.length, n = Mn(c); !(t = n()).done; ) {
                        var t = t.value;
                        t[1](),
                        Gt.push(t, o)
                    }
                    if (e) {
                        for (var i = 0; i < Gt.length; i += 2)
                            Gt[i][0](Gt[i + 1]);
                        Gt.length = 0
                    }
                }
                var r, a
            }
            return {
                set: r,
                update: function(e) {
                    r(e(o))
                },
                subscribe: function(e, n) {
                    var t = [e, n = void 0 === n ? Ot : n];
                    return c.add(t),
                    1 === c.size && (u = i(r) || Ot),
                    e(o),
                    function() {
                        c.delete(t),
                        0 === c.size && (u(),
                        u = null)
                    }
                }
            }
        }
        function jt(e, u, n) {
            var c = !s.isArray(e)
              , m = c ? [e] : e
              , l = u.length < 2;
            return {
                subscribe: Ut(n, function(n) {
                    function t() {
                        var e;
                        a || (o(),
                        e = u(c ? r[0] : r, n),
                        l ? n(e) : o = "function" == typeof e ? e : Ot)
                    }
                    var i = !1
                      , r = []
                      , a = 0
                      , o = Ot
                      , e = m.map(function(e, n) {
                        return zt(e, function(e) {
                            r[n] = e,
                            a &= ~(1 << n),
                            i && t()
                        }, function() {
                            a |= 1 << n
                        })
                    })
                      , i = !0;
                    return t(),
                    function() {
                        e.forEach(Ft),
                        o()
                    }
                }).subscribe
            }
        }
        function $t(t, i, e) {
            i = Q(i);
            var n = t.method
              , r = qt[n].payment;
            return i.method = n,
            r.forEach(function(e) {
                var n = t[e];
                x(n) || (i[e] = n)
            }),
            t.token_id && e && (e = Re(e, "tokens.items", []),
            (e = se(function(e) {
                return e.id === t.token_id
            })(e)) && (i.token = e.token)),
            i
        }
        function Yt(e) {
            return !0
        }
        function Zt(e, n) {
            return [e]
        }
        var Wt = ["types", "iins", "issuers", "networks", "token_id"]
          , Vt = ["flows", "apps", "token_id", "vpas"]
          , qt = {
            card: {
                properties: Wt,
                payment: ["token"],
                groupedToIndividual: function(e, n) {
                    var n = Re(n, "tokens.items", [])
                      , t = Q(e);
                    if (Wt.forEach(function(e) {
                        delete t[e]
                    }),
                    e.token_id) {
                        var i = e.token_id
                          , n = se(n, function(e) {
                            return e.id === i
                        });
                        if (n)
                            return [we({
                                token_id: i,
                                type: n.card.type,
                                issuer: n.card.issuer,
                                network: n.card.network
                            }, t)]
                    }
                    var r, a, e = (r = e,
                    a = [],
                    (e = void 0 === (e = ["issuers", "networks", "types", "iins"]) ? [] : e).forEach(function(e) {
                        var i, n = r[e];
                        n && n.length && (i = e.slice(0, -1),
                        a = 0 === a.length ? ae(n, function(e) {
                            var n = {};
                            return n[i] = e,
                            n
                        }) : oe(n, function(t) {
                            return ae(a, function(e) {
                                var n;
                                return we(((n = {})[i] = t,
                                n), e)
                            })
                        }))
                    }),
                    a);
                    return ae(e, function(e) {
                        return we(e, t)
                    })
                },
                isValid: function(e) {
                    var n = l(e.issuers)
                      , t = l(e.networks)
                      , i = l(e.types);
                    return !(n && !e.issuers.length) && (!(t && !e.networks.length) && !(i && !e.types.length))
                }
            },
            netbanking: {
                properties: ["banks"],
                payment: ["bank"],
                groupedToIndividual: function(e) {
                    var n = Q(e);
                    return delete n.banks,
                    ae(e.banks || [], function(e) {
                        return we({
                            bank: e
                        }, n)
                    })
                },
                isValid: function(e) {
                    return l(e.banks) && 0 < e.banks.length
                }
            },
            wallet: {
                properties: ["wallets"],
                payment: ["wallet"],
                groupedToIndividual: function(e) {
                    var n = Q(e);
                    return delete n.wallets,
                    ae(e.wallets || [], function(e) {
                        return we({
                            wallet: e
                        }, n)
                    })
                },
                isValid: function(e) {
                    return l(e.wallets) && 0 < e.wallets.length
                }
            },
            upi: {
                properties: Vt,
                payment: ["flow", "app", "token", "vpa"],
                groupedToIndividual: function(t, e) {
                    var n, i = [], r = [], a = [], o = [], u = Re(e, "tokens.items", []), c = Q(t);
                    return Vt.forEach(function(e) {
                        delete c[e]
                    }),
                    t.flows && (i = t.flows),
                    t.vpas && (a = t.vpas),
                    t.apps && (r = t.apps),
                    me(i, "collect") && a.length && (n = ae(a, function(e) {
                        var n, e = we({
                            vpa: e,
                            flow: "collect"
                        }, c);
                        return t.token_id && (n = t.token_id,
                        se(u, function(e) {
                            return e.id === n
                        }) && (e.token_id = n)),
                        e
                    }),
                    o = pe(o, n)),
                    me(i, "intent") && r.length && (n = ae(r, function(e) {
                        return we({
                            app: e,
                            flow: "intent"
                        }, c)
                    }),
                    o = pe(o, n)),
                    0 < i.length && (i = ae(i, function(e) {
                        var n = we({
                            flow: e
                        }, c);
                        if (!("intent" === e && r.length || "collect" === e && a.length))
                            return n
                    }),
                    i = ue(l)(i),
                    o = pe(o, i)),
                    o
                },
                getPaymentPayload: function(e, n, t) {
                    return "collect" === (n = $t(e, n, t)).flow && (n.flow = "directpay",
                    n.token && n.vpa && delete n.vpa),
                    "qr" === n.flow && (n["_[upiqr]"] = 1,
                    n.flow = "intent"),
                    n.flow && (n["_[flow]"] = n.flow,
                    delete n.flow),
                    n.app && (n.upi_app = n.app,
                    delete n.app),
                    n
                },
                isValid: function(e) {
                    var n = l(e.flows)
                      , t = l(e.apps);
                    if (!n || !e.flows.length)
                        return !1;
                    if (t) {
                        if (!e.apps.length)
                            return !1;
                        if (!n || !me(e.flows, "intent"))
                            return !1
                    }
                    return !0
                }
            },
            cardless_emi: {
                properties: ["providers"],
                payment: ["provider"],
                groupedToIndividual: function(e) {
                    var n = Q(e);
                    return delete n.providers,
                    ae(e.providers || [], function(e) {
                        return we({
                            provider: e
                        }, n)
                    })
                },
                isValid: function(e) {
                    return l(e.providers) && 0 < e.providers.length
                }
            },
            paylater: {
                properties: ["providers"],
                payment: ["provider"],
                groupedToIndividual: function(e) {
                    var n = Q(e);
                    return delete n.providers,
                    ae(e.providers || [], function(e) {
                        return we({
                            provider: e
                        }, n)
                    })
                },
                isValid: function(e) {
                    return l(e.providers) && 0 < e.providers.length
                }
            },
            app: {
                properties: ["providers"],
                payment: ["provider"],
                groupedToIndividual: function(e) {
                    var n = Q(e);
                    return delete n.providers,
                    ae(e.providers || [], function(e) {
                        return we({
                            provider: e
                        }, n)
                    })
                },
                isValid: function(e) {
                    return l(e.providers) && 0 < e.providers.length
                }
            }
        };
        function Jt(e) {
            var n = e.method
              , n = qt[n];
            if (!n)
                return !1;
            var t = he(e);
            return re(n.properties, function(e) {
                return !me(t, e)
            })
        }
        qt.emi = qt.card,
        qt.credit_card = qt.card,
        qt.debit_card = qt.card,
        qt.upi_otm = qt.upi,
        ["card", "cod", "upi", "netbanking", "wallet", "upi_otm", "gpay", "emi", "cardless_emi", "qr", "paylater", "paypal", "bank_transfer", "nach", "app", "emandate"].forEach(function(e) {
            qt[e] || (qt[e] = {})
        }),
        ke(qt, function(e, n) {
            qt[n] = we({
                getPaymentPayload: $t,
                groupedToIndividual: Zt,
                isValid: Yt,
                properties: [],
                payment: []
            }, qt[n])
        });
        var F = Ut("")
          , Ne = Ut("")
          , e = jt([F, Ne], function(e) {
            var n = e[0]
              , e = e[1];
            return e ? n + e : ""
        })
          , Xt = Ut("")
          , Qt = Ut("");
        jt([Xt, Qt], function(e) {
            var n = e[0]
              , e = e[1];
            return e ? n + e : ""
        }),
        F.subscribe(function(e) {
            Xt.set(e)
        }),
        Ne.subscribe(function(e) {
            Qt.set(e)
        }),
        Ut(""),
        Ut(""),
        Ut(""),
        Ut(""),
        Ut(""),
        Ut("netbanking"),
        Ut(),
        Ut("");
        n = jt(Ut([]), function(e) {
            return oe(e, function(e) {
                return e.instruments
            })
        });
        Ut([]),
        Ut([]),
        Ut([]);
        F = jt([n, Ut(null)], function(e) {
            var n = e[0]
              , e = e[1]
              , t = void 0 === e ? null : e;
            return se(void 0 === n ? [] : n, function(e) {
                return e.id === t
            })
        });
        jt(F, function(e) {
            return e && (Jt(e) || function(e) {
                var n = Jt(e)
                  , t = me(["card", "emi"], e.method);
                if (n)
                    return 1;
                if (t)
                    return !e.token_id;
                if ("upi" === e.method && e.flows) {
                    if (1 < e.flows.length)
                        return 1;
                    if (me(e.flows, "omnichannel"))
                        return 1;
                    if (me(e.flows, "collect")) {
                        n = e._ungrouped;
                        if (1 === n.length) {
                            t = n[0],
                            n = t.flow,
                            t = t.vpa;
                            if ("collect" === n && t)
                                return
                        }
                        return 1
                    }
                    if (me(e.flows, "intent") && !e.apps)
                        return 1
                }
                return 1 < e._ungrouped.length
            }(e)) ? e : null
        }),
        jt(e, function(e) {
            return e && "+91" !== e && "+" !== e
        }),
        Ut([]);
        var ei = {
            api: "https://api.razorpay.com/",
            version: "v1/",
            frameApi: "/",
            cdn: "https://cdn.razorpay.com/"
        };
        try {
            we(ei, m.Razorpay.config)
        } catch (e) {}
        var ni = "add-card"
          , ti = Ut({});
        Ut({}),
        Ut("");
        var ii = Ut("");
        function ri(e, n) {
            return function(e, n) {
                var t, i, r = Gi(), e = null == r || null == (t = r.methods) ? void 0 : t[e];
                {
                    var a, o;
                    e && 0 < c.keys(e).length ? n ? (a = c.keys(e).includes("type") && null != e && null != (i = e.type) && i[n] ? s.isArray(e.type[n]) ? void 0 : e.type[n].amount || (null == e ? void 0 : e.amount) : null == e ? void 0 : e.amount) ? ti.update(function(e) {
                        return c.assign({}, e, ((e = {}).convenience_fee = a,
                        e.checkout_label = null == r ? void 0 : r.label_on_checkout,
                        e))
                    }) : ti.update(function(e) {
                        return c.assign({}, e, ((e = {}).checkout_label = null == r ? void 0 : r.label_on_checkout,
                        e))
                    }) : (o = null == e ? void 0 : e.amount) ? ti.update(function(e) {
                        return c.assign({}, e, ((e = {}).convenience_fee = o,
                        e.checkout_label = null == r ? void 0 : r.label_on_checkout,
                        e))
                    }) : ti.update(function(e) {
                        return c.assign({}, e, ((e = {}).checkout_label = null == r ? void 0 : r.label_on_checkout,
                        e))
                    }) : ti.update(function(e) {
                        return c.assign({}, e, ((e = {}).checkout_label = null == r ? void 0 : r.label_on_checkout,
                        e))
                    })
                }
            }(e, n),
            0
        }
        function ai() {
            return Ht(ii) === ni
        }
        function oi(e) {
            return e.replace(/\D/g, "")
        }
        var ui = {
            amex: "American Express",
            diners: "Diners Club",
            maestro: "Maestro",
            mastercard: "MasterCard",
            rupay: "RuPay",
            visa: "Visa",
            bajaj: "Bajaj Finserv",
            unknown: "unknown"
        }
          , ci = function(e) {
            return oi(e).slice(0, 6)
        }
          , mi = function(t) {
            var i;
            return ke(ui, function(e, n) {
                t !== e && t !== n || (i = n)
            }),
            i
        }
          , li = [{
            name: "visa",
            regex: /^4/
        }, {
            name: "mastercard",
            regex: /^(5[1-5]|2[2-7])/
        }, {
            name: "maestro16",
            regex: /^(50(81(25|26|59|92)|8227)|4(437|681))/
        }, {
            name: "amex",
            regex: /^3[47]/
        }, {
            name: "rupay",
            regex: /^787878/
        }, {
            name: "rupay",
            regex: /^(508[5-9]|60(80(0|)[^0]|8[1-4]|8500|698[5-9]|699|7[^9]|79[0-7]|798[0-4])|65(2(1[5-9]|[2-9])|30|31[0-4])|817[2-9]|81[89]|820[01])/
        }, {
            name: "discover",
            regex: /^(65[1,3-9]|6011)/
        }, {
            name: "maestro",
            regex: /^(6|5(0|[6-9])).{5}/
        }, {
            name: "diners",
            regex: /^3[0689]/
        }, {
            name: "jcb",
            regex: /^35/
        }, {
            name: "bajaj",
            regex: /^203040/
        }]
          , si = function(n) {
            n = n.replace(/\D/g, "");
            var t = "";
            return li.forEach(function(e) {
                e.regex.test(n) && (t = t || e.name)
            }),
            t
        }
          , di = {
            iin: {},
            token: {}
        };
        var fi = {
            iin: {}
        }
          , pi = {
            iin: {}
        };
        function hi(e) {
            var n = this;
            if (!function(e) {
                e = ci(e);
                return e && 6 <= e.length
            }(e))
                return Pn.resolve({});
            var r = ci(e)
              , t = pi.iin[r];
            return t ? (Ui() && ai() && fi.iin[r] && ri("card", null == (e = fi.iin[r]) ? void 0 : e.type),
            t) : (pi.iin[r] = new Pn(function(t, i) {
                var e = q(e = dr(n, "payment/iin"), {
                    iin: r,
                    "_[source]": Xn.props.library
                });
                yn.jsonp({
                    url: e,
                    callback: function(e) {
                        if (e.error)
                            return tt.track("features:card:fetch:failure", {
                                data: {
                                    iin: r,
                                    error: e.error
                                }
                            }),
                            i(e.error);
                        var n;
                        fi.iin[r] = e,
                        function(e, n) {
                            void 0 === n && (n = {}),
                            e = ci(e),
                            di.iin[e] || (di.iin[e] = {});
                            var t = di.iin[e];
                            n.issuer && (t.issuer = n.issuer),
                            n.network ? t.network = mi(n.network) : t.network = si(e),
                            n.type && (t.type = n.type)
                        }(r, e),
                        Ui() && ai() && ri("card", fi.iin[r] ? null == (n = fi.iin[r]) ? void 0 : n.type : null == e ? void 0 : e.type),
                        t(e),
                        tt.track("features:card:fetch:success", {
                            data: {
                                iin: r,
                                features: e
                            }
                        })
                    }
                }),
                tt.track("features:card:fetch:start", {
                    data: {
                        iin: r
                    }
                })
            }
            ),
            pi.iin[r])
        }
        function _i(e) {
            return gi + e.slice(0, 4) + ".gif"
        }
        var vi, yi, gi = ei.cdn + "bank/";
        yi = [],
        K(vi = vi = {
            ICIC_C: "ICICI Corporate",
            UTIB_C: "Axis Corporate",
            SBIN: "SBI",
            HDFC: "HDFC",
            ICIC: "ICICI",
            UTIB: "Axis",
            KKBK: "Kotak",
            YESB: "Yes",
            IBKL: "IDBI",
            BARB_R: "BOB",
            PUNB_R: "PNB",
            IOBA: "IOB",
            FDRL: "Federal",
            CORP: "Corporate",
            IDFB: "IDFC",
            INDB: "IndusInd",
            VIJB: "Vijaya Bank"
        }) && ke(vi, function(e, n) {
            yi.push([n, e])
        }),
        vi = yi,
        ae(function(e) {
            return {
                name: e[1],
                code: e[0],
                logo: _i(e[0])
            }
        })(vi);
        function bi(e) {
            var n = (e = function(e) {
                if (/^token_/.test(e))
                    return Q(di.token[e] || {});
                if (/^\d{6}$/.test(e))
                    return Q(di.iin[e] || {});
                var n = ci(e)
                  , e = {
                    last4: oi(e).slice(-4)
                };
                return we(e, di.iin[n] || {})
            }(e)).issuer;
            if (n || "amex" !== e.network || (n = "AMEX"),
            "debit" === e.type && (n += "_DC"),
            e = se(ki, function(e) {
                return e.code === n
            }))
                return {
                    name: e.name,
                    code: e.code,
                    logo: _i(e.code)
                }
        }
        var ki = [{
            code: "KKBK",
            name: "Kotak Mahindra Bank"
        }, {
            code: "HDFC_DC",
            name: "HDFC Debit Cards"
        }, {
            code: "HDFC",
            name: "HDFC Credit Cards"
        }, {
            code: "UTIB",
            name: "Axis Bank"
        }, {
            code: "INDB",
            name: "Indusind Bank"
        }, {
            code: "RATN",
            name: "RBL Bank"
        }, {
            code: "ICIC",
            name: "ICICI Bank"
        }, {
            code: "SCBL",
            name: "Standard Chartered Bank"
        }, {
            code: "YESB",
            name: "Yes Bank"
        }, {
            code: "AMEX",
            name: "American Express"
        }, {
            code: "SBIN",
            name: "State Bank of India"
        }, {
            code: "BARB",
            name: "Bank of Baroda"
        }, {
            code: "BAJAJ",
            name: "Bajaj Finserv"
        }, {
            code: "CITI",
            name: "CITI Bank"
        }, {
            code: "HSBC",
            name: "HSBC Credit Cards"
        }]
          , Ne = Ut("");
        Ut(""),
        Ut(""),
        Ut(""),
        Ut(Ht(void 0)),
        Ut("c3ds"),
        Ut(null),
        Ut(null),
        Ut(!1),
        Ut(""),
        Ut(""),
        Ut(""),
        Ut("");
        Ut(!0),
        Ut({}),
        Ut({}),
        Ut(null),
        Ut(null),
        Ut(!1);
        var n = jt(Ne, si)
          , Si = jt(Ne, ci)
          , F = Ut("")
          , Ne = jt([Ne, n], function(e) {
            var n = e[0];
            return "maestro" === e[1] && 5 < n.length
        });
        jt([Ne, Ut(!1)], function(e) {
            var n = e[0]
              , e = e[1];
            return n && e
        }),
        Ut(!1),
        Ut(""),
        Ut(""),
        Ut(!1),
        Ut(!0);
        var Ei, wi = Ut(), n = jt([wi, Si, F], function(e, t) {
            var i = e[0]
              , r = e[1]
              , n = e[2];
            t(!0),
            Ei && Ei.abort(),
            "card" === n && ("CRED_experimental_offer" === (null == i ? void 0 : i.id) && n === (null == i ? void 0 : i.payment_method) || i && 5 < r.length && ("card" !== (e = i.payment_method) && "emi" !== e || (i.emi_subvention ? hi(r).then(function() {
                var e, n;
                Ht(Si) === r && ((e = bi(r)) ? (n = i["AMEX" === e.code ? "payment_network" : "issuer"],
                e && n === e.code || t(!1)) : t(!1))
            }) : (n = Oi("validate/checkout/offers"),
            e = Hi(),
            Ei = yn.post({
                url: n,
                data: {
                    amount: zi(),
                    method: "card",
                    "card[number]": r,
                    order_id: e,
                    offers: [i.id]
                },
                callback: function(e) {
                    Ei = null,
                    (e.error || L(e) && !e.length) && (tt.track("offers:card_invalid", {
                        type: "behav",
                        data: {
                            offer_id: i.id,
                            iin: r
                        }
                    }),
                    t(!1))
                }
            })))))
        });
        jt([wi, n], function(e) {
            var n = e[0]
              , e = e[1];
            return n && e ? Ht(wi).amount : zi()
        }),
        Ut(!0);
        function Di(i, r) {
            return void 0 === r && (r = "."),
            function(e) {
                for (var n = r, t = 0; t < i; t++)
                    n += "0";
                return e.replace(n, "")
            }
        }
        function Ri(e, n) {
            return e.replace(/\./, n = void 0 === n ? "," : n)
        }
        function Ci(i) {
            ke(i, function(e, n) {
                var t;
                Ni[n] = (t = {},
                t = we(Ni.default)(t),
                we(Ni[n] || {})(t)),
                Ni[n].code = n,
                i[n] && (Ni[n].symbol = i[n])
            })
        }
        var Pi, Ai, Ii, Mi = {
            AED: {
                code: "784",
                denomination: 100,
                min_value: 10,
                min_auth_value: 100,
                symbol: "د.إ",
                name: "Emirati Dirham"
            },
            ALL: {
                code: "008",
                denomination: 100,
                min_value: 221,
                min_auth_value: 100,
                symbol: "Lek",
                name: "Albanian Lek"
            },
            AMD: {
                code: "051",
                denomination: 100,
                min_value: 975,
                min_auth_value: 100,
                symbol: "֏",
                name: "Armenian Dram"
            },
            ARS: {
                code: "032",
                denomination: 100,
                min_value: 80,
                min_auth_value: 100,
                symbol: "ARS",
                name: "Argentine Peso"
            },
            AUD: {
                code: "036",
                denomination: 100,
                min_value: 50,
                min_auth_value: 100,
                symbol: "A$",
                name: "Australian Dollar"
            },
            AWG: {
                code: "533",
                denomination: 100,
                min_value: 10,
                min_auth_value: 100,
                symbol: "Afl.",
                name: "Aruban or Dutch Guilder"
            },
            BBD: {
                code: "052",
                denomination: 100,
                min_value: 10,
                min_auth_value: 100,
                symbol: "Bds$",
                name: "Barbadian or Bajan Dollar"
            },
            BDT: {
                code: "050",
                denomination: 100,
                min_value: 168,
                min_auth_value: 100,
                symbol: "৳",
                name: "Bangladeshi Taka"
            },
            BMD: {
                code: "060",
                denomination: 100,
                min_value: 10,
                min_auth_value: 100,
                symbol: "$",
                name: "Bermudian Dollar"
            },
            BND: {
                code: "096",
                denomination: 100,
                min_value: 10,
                min_auth_value: 100,
                symbol: "BND",
                name: "Bruneian Dollar"
            },
            BOB: {
                code: "068",
                denomination: 100,
                min_value: 14,
                min_auth_value: 100,
                symbol: "Bs",
                name: "Bolivian Bolíviano"
            },
            BSD: {
                code: "044",
                denomination: 100,
                min_value: 10,
                min_auth_value: 100,
                symbol: "BSD",
                name: "Bahamian Dollar"
            },
            BWP: {
                code: "072",
                denomination: 100,
                min_value: 22,
                min_auth_value: 100,
                symbol: "P",
                name: "Botswana Pula"
            },
            BZD: {
                code: "084",
                denomination: 100,
                min_value: 10,
                min_auth_value: 100,
                symbol: "BZ$",
                name: "Belizean Dollar"
            },
            CAD: {
                code: "124",
                denomination: 100,
                min_value: 50,
                min_auth_value: 100,
                symbol: "C$",
                name: "Canadian Dollar"
            },
            CHF: {
                code: "756",
                denomination: 100,
                min_value: 50,
                min_auth_value: 100,
                symbol: "CHf",
                name: "Swiss Franc"
            },
            CNY: {
                code: "156",
                denomination: 100,
                min_value: 14,
                min_auth_value: 100,
                symbol: "¥",
                name: "Chinese Yuan Renminbi"
            },
            COP: {
                code: "170",
                denomination: 100,
                min_value: 1e3,
                min_auth_value: 100,
                symbol: "COL$",
                name: "Colombian Peso"
            },
            CRC: {
                code: "188",
                denomination: 100,
                min_value: 1e3,
                min_auth_value: 100,
                symbol: "₡",
                name: "Costa Rican Colon"
            },
            CUP: {
                code: "192",
                denomination: 100,
                min_value: 53,
                min_auth_value: 100,
                symbol: "$MN",
                name: "Cuban Peso"
            },
            CZK: {
                code: "203",
                denomination: 100,
                min_value: 46,
                min_auth_value: 100,
                symbol: "Kč",
                name: "Czech Koruna"
            },
            DKK: {
                code: "208",
                denomination: 100,
                min_value: 250,
                min_auth_value: 100,
                symbol: "DKK",
                name: "Danish Krone"
            },
            DOP: {
                code: "214",
                denomination: 100,
                min_value: 102,
                min_auth_value: 100,
                symbol: "RD$",
                name: "Dominican Peso"
            },
            DZD: {
                code: "012",
                denomination: 100,
                min_value: 239,
                min_auth_value: 100,
                symbol: "د.ج",
                name: "Algerian Dinar"
            },
            EGP: {
                code: "818",
                denomination: 100,
                min_value: 35,
                min_auth_value: 100,
                symbol: "E£",
                name: "Egyptian Pound"
            },
            ETB: {
                code: "230",
                denomination: 100,
                min_value: 57,
                min_auth_value: 100,
                symbol: "ብር",
                name: "Ethiopian Birr"
            },
            EUR: {
                code: "978",
                denomination: 100,
                min_value: 50,
                min_auth_value: 100,
                symbol: "€",
                name: "Euro"
            },
            FJD: {
                code: "242",
                denomination: 100,
                min_value: 10,
                min_auth_value: 100,
                symbol: "FJ$",
                name: "Fijian Dollar"
            },
            GBP: {
                code: "826",
                denomination: 100,
                min_value: 30,
                min_auth_value: 100,
                symbol: "£",
                name: "British Pound"
            },
            GIP: {
                code: "292",
                denomination: 100,
                min_value: 10,
                min_auth_value: 100,
                symbol: "GIP",
                name: "Gibraltar Pound"
            },
            GMD: {
                code: "270",
                denomination: 100,
                min_value: 100,
                min_auth_value: 100,
                symbol: "D",
                name: "Gambian Dalasi"
            },
            GTQ: {
                code: "320",
                denomination: 100,
                min_value: 16,
                min_auth_value: 100,
                symbol: "Q",
                name: "Guatemalan Quetzal"
            },
            GYD: {
                code: "328",
                denomination: 100,
                min_value: 418,
                min_auth_value: 100,
                symbol: "G$",
                name: "Guyanese Dollar"
            },
            HKD: {
                code: "344",
                denomination: 100,
                min_value: 400,
                min_auth_value: 100,
                symbol: "HK$",
                name: "Hong Kong Dollar"
            },
            HNL: {
                code: "340",
                denomination: 100,
                min_value: 49,
                min_auth_value: 100,
                symbol: "HNL",
                name: "Honduran Lempira"
            },
            HRK: {
                code: "191",
                denomination: 100,
                min_value: 14,
                min_auth_value: 100,
                symbol: "kn",
                name: "Croatian Kuna"
            },
            HTG: {
                code: "332",
                denomination: 100,
                min_value: 167,
                min_auth_value: 100,
                symbol: "G",
                name: "Haitian Gourde"
            },
            HUF: {
                code: "348",
                denomination: 100,
                min_value: 555,
                min_auth_value: 100,
                symbol: "Ft",
                name: "Hungarian Forint"
            },
            IDR: {
                code: "360",
                denomination: 100,
                min_value: 1e3,
                min_auth_value: 100,
                symbol: "Rp",
                name: "Indonesian Rupiah"
            },
            ILS: {
                code: "376",
                denomination: 100,
                min_value: 10,
                min_auth_value: 100,
                symbol: "₪",
                name: "Israeli Shekel"
            },
            INR: {
                code: "356",
                denomination: 100,
                min_value: 100,
                min_auth_value: 100,
                symbol: "₹",
                name: "Indian Rupee"
            },
            JMD: {
                code: "388",
                denomination: 100,
                min_value: 250,
                min_auth_value: 100,
                symbol: "J$",
                name: "Jamaican Dollar"
            },
            KES: {
                code: "404",
                denomination: 100,
                min_value: 201,
                min_auth_value: 100,
                symbol: "Ksh",
                name: "Kenyan Shilling"
            },
            KGS: {
                code: "417",
                denomination: 100,
                min_value: 140,
                min_auth_value: 100,
                symbol: "Лв",
                name: "Kyrgyzstani Som"
            },
            KHR: {
                code: "116",
                denomination: 100,
                min_value: 1e3,
                min_auth_value: 100,
                symbol: "៛",
                name: "Cambodian Riel"
            },
            KYD: {
                code: "136",
                denomination: 100,
                min_value: 10,
                min_auth_value: 100,
                symbol: "CI$",
                name: "Caymanian Dollar"
            },
            KZT: {
                code: "398",
                denomination: 100,
                min_value: 759,
                min_auth_value: 100,
                symbol: "₸",
                name: "Kazakhstani Tenge"
            },
            LAK: {
                code: "418",
                denomination: 100,
                min_value: 1e3,
                min_auth_value: 100,
                symbol: "₭",
                name: "Lao Kip"
            },
            LBP: {
                code: "422",
                denomination: 100,
                min_value: 1e3,
                min_auth_value: 100,
                symbol: "&#1604;.&#1604;.",
                name: "Lebanese Pound"
            },
            LKR: {
                code: "144",
                denomination: 100,
                min_value: 358,
                min_auth_value: 100,
                symbol: "රු",
                name: "Sri Lankan Rupee"
            },
            LRD: {
                code: "430",
                denomination: 100,
                min_value: 325,
                min_auth_value: 100,
                symbol: "L$",
                name: "Liberian Dollar"
            },
            LSL: {
                code: "426",
                denomination: 100,
                min_value: 29,
                min_auth_value: 100,
                symbol: "LSL",
                name: "Basotho Loti"
            },
            MAD: {
                code: "504",
                denomination: 100,
                min_value: 20,
                min_auth_value: 100,
                symbol: "د.م.",
                name: "Moroccan Dirham"
            },
            MDL: {
                code: "498",
                denomination: 100,
                min_value: 35,
                min_auth_value: 100,
                symbol: "MDL",
                name: "Moldovan Leu"
            },
            MKD: {
                code: "807",
                denomination: 100,
                min_value: 109,
                min_auth_value: 100,
                symbol: "ден",
                name: "Macedonian Denar"
            },
            MMK: {
                code: "104",
                denomination: 100,
                min_value: 1e3,
                min_auth_value: 100,
                symbol: "MMK",
                name: "Burmese Kyat"
            },
            MNT: {
                code: "496",
                denomination: 100,
                min_value: 1e3,
                min_auth_value: 100,
                symbol: "₮",
                name: "Mongolian Tughrik"
            },
            MOP: {
                code: "446",
                denomination: 100,
                min_value: 17,
                min_auth_value: 100,
                symbol: "MOP$",
                name: "Macau Pataca"
            },
            MUR: {
                code: "480",
                denomination: 100,
                min_value: 70,
                min_auth_value: 100,
                symbol: "₨",
                name: "Mauritian Rupee"
            },
            MVR: {
                code: "462",
                denomination: 100,
                min_value: 31,
                min_auth_value: 100,
                symbol: "Rf",
                name: "Maldivian Rufiyaa"
            },
            MWK: {
                code: "454",
                denomination: 100,
                min_value: 1e3,
                min_auth_value: 100,
                symbol: "MK",
                name: "Malawian Kwacha"
            },
            MXN: {
                code: "484",
                denomination: 100,
                min_value: 39,
                min_auth_value: 100,
                symbol: "Mex$",
                name: "Mexican Peso"
            },
            MYR: {
                code: "458",
                denomination: 100,
                min_value: 10,
                min_auth_value: 100,
                symbol: "RM",
                name: "Malaysian Ringgit"
            },
            NAD: {
                code: "516",
                denomination: 100,
                min_value: 29,
                min_auth_value: 100,
                symbol: "N$",
                name: "Namibian Dollar"
            },
            NGN: {
                code: "566",
                denomination: 100,
                min_value: 723,
                min_auth_value: 100,
                symbol: "₦",
                name: "Nigerian Naira"
            },
            NIO: {
                code: "558",
                denomination: 100,
                min_value: 66,
                min_auth_value: 100,
                symbol: "NIO",
                name: "Nicaraguan Cordoba"
            },
            NOK: {
                code: "578",
                denomination: 100,
                min_value: 300,
                min_auth_value: 100,
                symbol: "NOK",
                name: "Norwegian Krone"
            },
            NPR: {
                code: "524",
                denomination: 100,
                min_value: 221,
                min_auth_value: 100,
                symbol: "रू",
                name: "Nepalese Rupee"
            },
            NZD: {
                code: "554",
                denomination: 100,
                min_value: 50,
                min_auth_value: 100,
                symbol: "NZ$",
                name: "New Zealand Dollar"
            },
            PEN: {
                code: "604",
                denomination: 100,
                min_value: 10,
                min_auth_value: 100,
                symbol: "S/",
                name: "Peruvian Sol"
            },
            PGK: {
                code: "598",
                denomination: 100,
                min_value: 10,
                min_auth_value: 100,
                symbol: "PGK",
                name: "Papua New Guinean Kina"
            },
            PHP: {
                code: "608",
                denomination: 100,
                min_value: 106,
                min_auth_value: 100,
                symbol: "₱",
                name: "Philippine Peso"
            },
            PKR: {
                code: "586",
                denomination: 100,
                min_value: 227,
                min_auth_value: 100,
                symbol: "₨",
                name: "Pakistani Rupee"
            },
            QAR: {
                code: "634",
                denomination: 100,
                min_value: 10,
                min_auth_value: 100,
                symbol: "QR",
                name: "Qatari Riyal"
            },
            RUB: {
                code: "643",
                denomination: 100,
                min_value: 130,
                min_auth_value: 100,
                symbol: "₽",
                name: "Russian Ruble"
            },
            SAR: {
                code: "682",
                denomination: 100,
                min_value: 10,
                min_auth_value: 100,
                symbol: "SR",
                name: "Saudi Arabian Riyal"
            },
            SCR: {
                code: "690",
                denomination: 100,
                min_value: 28,
                min_auth_value: 100,
                symbol: "SRe",
                name: "Seychellois Rupee"
            },
            SEK: {
                code: "752",
                denomination: 100,
                min_value: 300,
                min_auth_value: 100,
                symbol: "SEK",
                name: "Swedish Krona"
            },
            SGD: {
                code: "702",
                denomination: 100,
                min_value: 50,
                min_auth_value: 100,
                symbol: "S$",
                name: "Singapore Dollar"
            },
            SLL: {
                code: "694",
                denomination: 100,
                min_value: 1e3,
                min_auth_value: 100,
                symbol: "Le",
                name: "Sierra Leonean Leone"
            },
            SOS: {
                code: "706",
                denomination: 100,
                min_value: 1e3,
                min_auth_value: 100,
                symbol: "Sh.so.",
                name: "Somali Shilling"
            },
            SSP: {
                code: "728",
                denomination: 100,
                min_value: 100,
                min_auth_value: 100,
                symbol: "SS£",
                name: "South Sudanese Pound"
            },
            SVC: {
                code: "222",
                denomination: 100,
                min_value: 18,
                min_auth_value: 100,
                symbol: "₡",
                name: "Salvadoran Colon"
            },
            SZL: {
                code: "748",
                denomination: 100,
                min_value: 29,
                min_auth_value: 100,
                symbol: "E",
                name: "Swazi Lilangeni"
            },
            THB: {
                code: "764",
                denomination: 100,
                min_value: 64,
                min_auth_value: 100,
                symbol: "฿",
                name: "Thai Baht"
            },
            TTD: {
                code: "780",
                denomination: 100,
                min_value: 14,
                min_auth_value: 100,
                symbol: "TT$",
                name: "Trinidadian Dollar"
            },
            TZS: {
                code: "834",
                denomination: 100,
                min_value: 1e3,
                min_auth_value: 100,
                symbol: "Sh",
                name: "Tanzanian Shilling"
            },
            USD: {
                code: "840",
                denomination: 100,
                min_value: 50,
                min_auth_value: 100,
                symbol: "$",
                name: "US Dollar"
            },
            UYU: {
                code: "858",
                denomination: 100,
                min_value: 67,
                min_auth_value: 100,
                symbol: "$U",
                name: "Uruguayan Peso"
            },
            UZS: {
                code: "860",
                denomination: 100,
                min_value: 1e3,
                min_auth_value: 100,
                symbol: "so'm",
                name: "Uzbekistani Som"
            },
            YER: {
                code: "886",
                denomination: 100,
                min_value: 501,
                min_auth_value: 100,
                symbol: "﷼",
                name: "Yemeni Rial"
            },
            ZAR: {
                code: "710",
                denomination: 100,
                min_value: 29,
                min_auth_value: 100,
                symbol: "R",
                name: "South African Rand"
            }
        }, Ne = {
            three: function(e, n) {
                e = o(e).replace(new RegExp("(.{1,3})(?=(...)+(\\..{" + n + "})$)","g"), "$1,");
                return Di(n)(e)
            },
            threecommadecimal: function(e, n) {
                e = Ri(o(e)).replace(new RegExp("(.{1,3})(?=(...)+(\\,.{" + n + "})$)","g"), "$1.");
                return Di(n, ",")(e)
            },
            threespaceseparator: function(e, n) {
                e = o(e).replace(new RegExp("(.{1,3})(?=(...)+(\\..{" + n + "})$)","g"), "$1 ");
                return Di(n)(e)
            },
            threespacecommadecimal: function(e, n) {
                e = Ri(o(e)).replace(new RegExp("(.{1,3})(?=(...)+(\\,.{" + n + "})$)","g"), "$1 ");
                return Di(n, ",")(e)
            },
            szl: function(e, n) {
                e = o(e).replace(new RegExp("(.{1,3})(?=(...)+(\\..{" + n + "})$)","g"), "$1, ");
                return Di(n)(e)
            },
            chf: function(e, n) {
                e = o(e).replace(new RegExp("(.{1,3})(?=(...)+(\\..{" + n + "})$)","g"), "$1'");
                return Di(n)(e)
            },
            inr: function(e, n) {
                e = o(e).replace(new RegExp("(.{1,2})(?=.(..)+(\\..{" + n + "})$)","g"), "$1,");
                return Di(n)(e)
            },
            none: function(e) {
                return o(e)
            }
        }, Ni = {
            default: {
                decimals: 2,
                format: Ne.three,
                minimum: 100
            },
            AED: {
                minor: "fil",
                minimum: 10
            },
            AFN: {
                minor: "pul"
            },
            ALL: {
                minor: "qindarka",
                minimum: 221
            },
            AMD: {
                minor: "luma",
                minimum: 975
            },
            ANG: {
                minor: "cent"
            },
            AOA: {
                minor: "lwei"
            },
            ARS: {
                format: Ne.threecommadecimal,
                minor: "centavo",
                minimum: 80
            },
            AUD: {
                format: Ne.threespaceseparator,
                minimum: 50,
                minor: "cent"
            },
            AWG: {
                minor: "cent",
                minimum: 10
            },
            AZN: {
                minor: "qäpik"
            },
            BAM: {
                minor: "fenning"
            },
            BBD: {
                minor: "cent",
                minimum: 10
            },
            BDT: {
                minor: "paisa",
                minimum: 168
            },
            BGN: {
                minor: "stotinki"
            },
            BHD: {
                decimals: 3,
                minor: "fils"
            },
            BIF: {
                decimals: 0,
                major: "franc",
                minor: "centime"
            },
            BMD: {
                minor: "cent",
                minimum: 10
            },
            BND: {
                minor: "sen",
                minimum: 10
            },
            BOB: {
                minor: "centavo",
                minimum: 14
            },
            BRL: {
                format: Ne.threecommadecimal,
                minimum: 50,
                minor: "centavo"
            },
            BSD: {
                minor: "cent",
                minimum: 10
            },
            BTN: {
                minor: "chetrum"
            },
            BWP: {
                minor: "thebe",
                minimum: 22
            },
            BYR: {
                decimals: 0,
                major: "ruble"
            },
            BZD: {
                minor: "cent",
                minimum: 10
            },
            CAD: {
                minimum: 50,
                minor: "cent"
            },
            CDF: {
                minor: "centime"
            },
            CHF: {
                format: Ne.chf,
                minimum: 50,
                minor: "rappen"
            },
            CLP: {
                decimals: 0,
                format: Ne.none,
                major: "peso",
                minor: "centavo"
            },
            CNY: {
                minor: "jiao",
                minimum: 14
            },
            COP: {
                format: Ne.threecommadecimal,
                minor: "centavo",
                minimum: 1e3
            },
            CRC: {
                format: Ne.threecommadecimal,
                minor: "centimo",
                minimum: 1e3
            },
            CUC: {
                minor: "centavo"
            },
            CUP: {
                minor: "centavo",
                minimum: 53
            },
            CVE: {
                minor: "centavo"
            },
            CZK: {
                format: Ne.threecommadecimal,
                minor: "haler",
                minimum: 46
            },
            DJF: {
                decimals: 0,
                major: "franc",
                minor: "centime"
            },
            DKK: {
                minimum: 250,
                minor: "øre"
            },
            DOP: {
                minor: "centavo",
                minimum: 102
            },
            DZD: {
                minor: "centime",
                minimum: 239
            },
            EGP: {
                minor: "piaster",
                minimum: 35
            },
            ERN: {
                minor: "cent"
            },
            ETB: {
                minor: "cent",
                minimum: 57
            },
            EUR: {
                minimum: 50,
                minor: "cent"
            },
            FJD: {
                minor: "cent",
                minimum: 10
            },
            FKP: {
                minor: "pence"
            },
            GBP: {
                minimum: 30,
                minor: "pence"
            },
            GEL: {
                minor: "tetri"
            },
            GHS: {
                minor: "pesewas",
                minimum: 3
            },
            GIP: {
                minor: "pence",
                minimum: 10
            },
            GMD: {
                minor: "butut"
            },
            GTQ: {
                minor: "centavo",
                minimum: 16
            },
            GYD: {
                minor: "cent",
                minimum: 418
            },
            HKD: {
                minimum: 400,
                minor: "cent"
            },
            HNL: {
                minor: "centavo",
                minimum: 49
            },
            HRK: {
                format: Ne.threecommadecimal,
                minor: "lipa",
                minimum: 14
            },
            HTG: {
                minor: "centime",
                minimum: 167
            },
            HUF: {
                decimals: 0,
                format: Ne.none,
                major: "forint",
                minimum: 555
            },
            IDR: {
                format: Ne.threecommadecimal,
                minor: "sen",
                minimum: 1e3
            },
            ILS: {
                minor: "agorot",
                minimum: 10
            },
            INR: {
                format: Ne.inr,
                minor: "paise"
            },
            IQD: {
                decimals: 3,
                minor: "fil"
            },
            IRR: {
                minor: "rials"
            },
            ISK: {
                decimals: 0,
                format: Ne.none,
                major: "króna",
                minor: "aurar"
            },
            JMD: {
                minor: "cent",
                minimum: 250
            },
            JOD: {
                decimals: 3,
                minor: "fil"
            },
            JPY: {
                decimals: 0,
                minimum: 50,
                minor: "sen"
            },
            KES: {
                minor: "cent",
                minimum: 201
            },
            KGS: {
                minor: "tyyn",
                minimum: 140
            },
            KHR: {
                minor: "sen",
                minimum: 1e3
            },
            KMF: {
                decimals: 0,
                major: "franc",
                minor: "centime"
            },
            KPW: {
                minor: "chon"
            },
            KRW: {
                decimals: 0,
                major: "won",
                minor: "chon"
            },
            KWD: {
                decimals: 3,
                minor: "fil"
            },
            KYD: {
                minor: "cent",
                minimum: 10
            },
            KZT: {
                minor: "tiyn",
                minimum: 759
            },
            LAK: {
                minor: "at",
                minimum: 1e3
            },
            LBP: {
                format: Ne.threespaceseparator,
                minor: "piastre",
                minimum: 1e3
            },
            LKR: {
                minor: "cent",
                minimum: 358
            },
            LRD: {
                minor: "cent",
                minimum: 325
            },
            LSL: {
                minor: "lisente",
                minimum: 29
            },
            LTL: {
                format: Ne.threespacecommadecimal,
                minor: "centu"
            },
            LVL: {
                minor: "santim"
            },
            LYD: {
                decimals: 3,
                minor: "dirham"
            },
            MAD: {
                minor: "centime",
                minimum: 20
            },
            MDL: {
                minor: "ban",
                minimum: 35
            },
            MGA: {
                decimals: 0,
                major: "ariary"
            },
            MKD: {
                minor: "deni"
            },
            MMK: {
                minor: "pya",
                minimum: 1e3
            },
            MNT: {
                minor: "mongo",
                minimum: 1e3
            },
            MOP: {
                minor: "avo",
                minimum: 17
            },
            MRO: {
                minor: "khoum"
            },
            MUR: {
                minor: "cent",
                minimum: 70
            },
            MVR: {
                minor: "lari",
                minimum: 31
            },
            MWK: {
                minor: "tambala",
                minimum: 1e3
            },
            MXN: {
                minor: "centavo",
                minimum: 39
            },
            MYR: {
                minor: "sen",
                minimum: 10
            },
            MZN: {
                decimals: 0,
                major: "metical"
            },
            NAD: {
                minor: "cent",
                minimum: 29
            },
            NGN: {
                minor: "kobo",
                minimum: 723
            },
            NIO: {
                minor: "centavo",
                minimum: 66
            },
            NOK: {
                format: Ne.threecommadecimal,
                minimum: 300,
                minor: "øre"
            },
            NPR: {
                minor: "paise",
                minimum: 221
            },
            NZD: {
                minimum: 50,
                minor: "cent"
            },
            OMR: {
                minor: "baiza",
                decimals: 3
            },
            PAB: {
                minor: "centesimo"
            },
            PEN: {
                minor: "centimo",
                minimum: 10
            },
            PGK: {
                minor: "toea",
                minimum: 10
            },
            PHP: {
                minor: "centavo",
                minimum: 106
            },
            PKR: {
                minor: "paisa",
                minimum: 227
            },
            PLN: {
                format: Ne.threespacecommadecimal,
                minor: "grosz"
            },
            PYG: {
                decimals: 0,
                major: "guarani",
                minor: "centimo"
            },
            QAR: {
                minor: "dirham",
                minimum: 10
            },
            RON: {
                format: Ne.threecommadecimal,
                minor: "bani"
            },
            RUB: {
                format: Ne.threecommadecimal,
                minor: "kopeck",
                minimum: 130
            },
            RWF: {
                decimals: 0,
                major: "franc",
                minor: "centime"
            },
            SAR: {
                minor: "halalat",
                minimum: 10
            },
            SBD: {
                minor: "cent"
            },
            SCR: {
                minor: "cent",
                minimum: 28
            },
            SEK: {
                format: Ne.threespacecommadecimal,
                minimum: 300,
                minor: "öre"
            },
            SGD: {
                minimum: 50,
                minor: "cent"
            },
            SHP: {
                minor: "new pence"
            },
            SLL: {
                minor: "cent",
                minimum: 1e3
            },
            SOS: {
                minor: "centesimi",
                minimum: 1e3
            },
            SRD: {
                minor: "cent"
            },
            STD: {
                minor: "centimo"
            },
            SSP: {
                minor: "piaster"
            },
            SVC: {
                minor: "centavo",
                minimum: 18
            },
            SYP: {
                minor: "piaster"
            },
            SZL: {
                format: Ne.szl,
                minor: "cent",
                minimum: 29
            },
            THB: {
                minor: "satang",
                minimum: 64
            },
            TJS: {
                minor: "diram"
            },
            TMT: {
                minor: "tenga"
            },
            TND: {
                decimals: 3,
                minor: "millime"
            },
            TOP: {
                minor: "seniti"
            },
            TRY: {
                minor: "kurus"
            },
            TTD: {
                minor: "cent",
                minimum: 14
            },
            TWD: {
                minor: "cent"
            },
            TZS: {
                minor: "cent",
                minimum: 1e3
            },
            UAH: {
                format: Ne.threespacecommadecimal,
                minor: "kopiyka"
            },
            UGX: {
                minor: "cent"
            },
            USD: {
                minimum: 50,
                minor: "cent"
            },
            UYU: {
                format: Ne.threecommadecimal,
                minor: "centé",
                minimum: 67
            },
            UZS: {
                minor: "tiyin",
                minimum: 1e3
            },
            VND: {
                format: Ne.none,
                minor: "hao,xu"
            },
            VUV: {
                decimals: 0,
                major: "vatu",
                minor: "centime"
            },
            WST: {
                minor: "sene"
            },
            XAF: {
                decimals: 0,
                major: "franc",
                minor: "centime"
            },
            XCD: {
                minor: "cent"
            },
            XPF: {
                decimals: 0,
                major: "franc",
                minor: "centime"
            },
            YER: {
                minor: "fil",
                minimum: 501
            },
            ZAR: {
                format: Ne.threespaceseparator,
                minor: "cent",
                minimum: 29
            },
            ZMK: {
                minor: "ngwee"
            }
        }, Bi = function(e) {
            return Ni[e] || Ni.default
        }, Ti = ["AED", "ALL", "AMD", "ARS", "AUD", "AWG", "BBD", "BDT", "BMD", "BND", "BOB", "BSD", "BWP", "BZD", "CAD", "CHF", "CNY", "COP", "CRC", "CUP", "CZK", "DKK", "DOP", "DZD", "EGP", "ETB", "EUR", "FJD", "GBP", "GHS", "GIP", "GMD", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "INR", "JMD", "KES", "KGS", "KHR", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "MAD", "MDL", "MKD", "MMK", "MNT", "MOP", "MUR", "MVR", "MWK", "MXN", "MYR", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "PEN", "PGK", "PHP", "PKR", "QAR", "RUB", "SAR", "SCR", "SEK", "SGD", "SLL", "SOS", "SSP", "SVC", "SZL", "THB", "TTD", "TZS", "USD", "UYU", "UZS", "YER", "ZAR"], Li = {
            AED: "د.إ",
            AFN: "&#x60b;",
            ALL: "Lek",
            AMD: "֏",
            ANG: "NAƒ",
            AOA: "Kz",
            ARS: "ARS",
            AUD: "A$",
            AWG: "Afl.",
            AZN: "ман",
            BAM: "KM",
            BBD: "Bds$",
            BDT: "৳",
            BGN: "лв",
            BHD: "د.ب",
            BIF: "FBu",
            BMD: "$",
            BND: "BND",
            BOB: "Bs.",
            BRL: "R$",
            BSD: "BSD",
            BTN: "Nu.",
            BWP: "P",
            BYR: "Br",
            BZD: "BZ$",
            CAD: "C$",
            CDF: "FC",
            CHF: "CHf",
            CLP: "CLP$",
            CNY: "¥",
            COP: "COL$",
            CRC: "₡",
            CUC: "&#x20b1;",
            CUP: "$MN",
            CVE: "Esc",
            CZK: "Kč",
            DJF: "Fdj",
            DKK: "DKK",
            DOP: "RD$",
            DZD: "د.ج",
            EGP: "E£",
            ERN: "Nfa",
            ETB: "ብር",
            EUR: "€",
            FJD: "FJ$",
            FKP: "FK&#163;",
            GBP: "£",
            GEL: "ლ",
            GHS: "&#x20b5;",
            GIP: "GIP",
            GMD: "D",
            GNF: "FG",
            GTQ: "Q",
            GYD: "G$",
            HKD: "HK$",
            HNL: "HNL",
            HRK: "kn",
            HTG: "G",
            HUF: "Ft",
            IDR: "Rp",
            ILS: "₪",
            INR: "₹",
            IQD: "ع.د",
            IRR: "&#xfdfc;",
            ISK: "ISK",
            JMD: "J$",
            JOD: "د.ا",
            JPY: "&#165;",
            KES: "Ksh",
            KGS: "Лв",
            KHR: "៛",
            KMF: "CF",
            KPW: "KPW",
            KRW: "KRW",
            KWD: "د.ك",
            KYD: "CI$",
            KZT: "₸",
            LAK: "₭",
            LBP: "&#1604;.&#1604;.",
            LD: "LD",
            LKR: "රු",
            LRD: "L$",
            LSL: "LSL",
            LTL: "Lt",
            LVL: "Ls",
            LYD: "LYD",
            MAD: "د.م.",
            MDL: "MDL",
            MGA: "Ar",
            MKD: "ден",
            MMK: "MMK",
            MNT: "₮",
            MOP: "MOP$",
            MRO: "UM",
            MUR: "₨",
            MVR: "Rf",
            MWK: "MK",
            MXN: "Mex$",
            MYR: "RM",
            MZN: "MT",
            NAD: "N$",
            NGN: "₦",
            NIO: "NIO",
            NOK: "NOK",
            NPR: "रू",
            NZD: "NZ$",
            OMR: "ر.ع.",
            PAB: "B/.",
            PEN: "S/",
            PGK: "PGK",
            PHP: "₱",
            PKR: "₨",
            PLN: "Zł",
            PYG: "&#x20b2;",
            QAR: "QR",
            RON: "RON",
            RSD: "Дин.",
            RUB: "₽",
            RWF: "RF",
            SAR: "SR",
            SBD: "SI$",
            SCR: "SRe",
            SDG: "&#163;Sd",
            SEK: "SEK",
            SFR: "Fr",
            SGD: "S$",
            SHP: "&#163;",
            SLL: "Le",
            SOS: "Sh.so.",
            SRD: "Sr$",
            SSP: "SS£",
            STD: "Db",
            SVC: "₡",
            SYP: "S&#163;",
            SZL: "E",
            THB: "฿",
            TJS: "SM",
            TMT: "M",
            TND: "د.ت",
            TOP: "T$",
            TRY: "TL",
            TTD: "TT$",
            TWD: "NT$",
            TZS: "Sh",
            UAH: "&#x20b4;",
            UGX: "USh",
            USD: "$",
            UYU: "$U",
            UZS: "so'm",
            VEF: "Bs",
            VND: "&#x20ab;",
            VUV: "VT",
            WST: "T",
            XAF: "FCFA",
            XCD: "EC$",
            XOF: "CFA",
            XPF: "CFPF",
            YER: "﷼",
            ZAR: "R",
            ZMK: "ZK",
            ZWL: "Z$"
        };
        function xi(e, n, t) {
            return void 0 === t && (t = !0),
            [Li[n], (e = e,
            n = Bi(n = n),
            e /= f.pow(10, n.decimals),
            n.format(e.toFixed(n.decimals), n.decimals))].join(t ? " " : "")
        }
        Ai = {},
        ke(Pi = Mi, function(e, n) {
            Mi[n] = e,
            Ni[n] = Ni[n] || {},
            Pi[n].min_value && (Ni[n].minimum = Pi[n].min_value),
            Pi[n].denomination && (Ni[n].decimals = f.LOG10E * f.log(Pi[n].denomination)),
            Ai[n] = Pi[n].symbol
        }),
        we(Li, Ai),
        Ci(Ai),
        Ci(Li),
        de(Ti, function(e, n) {
            return e[n] = Li[n],
            e
        }, {}),
        Ut();
        var Ki, Oi = function(e) {
            return dr(void 0, e)
        }, Fi = function(e) {
            return (void 0).get(e)
        }, zi = function() {
            return Fi("amount")
        }, Hi = (Ki = "order_id",
        function() {
            return Fi(Ki)
        }
        );
        Ut(!0);
        jt([e], function(e) {
            return e[0].startsWith("+91")
        });
        function Gi() {
            var e;
            return (null == Ii || null == (e = Ii.order) ? void 0 : e.convenience_fee_config) || null
        }
        function Ui() {
            return l(Gi())
        }
        function ji(e, t, n) {
            void 0 === n && (n = {});
            var i = Q(e);
            n.feesRedirect && (i.view = "html");
            var r = t.get;
            return ["amount", "currency", "signature", "description", "order_id", "account_id", "notes", "subscription_id", "auth_link_id", "payment_link_id", "customer_id", "recurring", "subscription_card_change", "recurring_token.max_amount", "recurring_token.expire_by"].forEach(function(e) {
                var n = i;
                ve(e)(n) || (n = r(e)) && ("boolean" == typeof n && (n = 1),
                i[e.replace(/\.(\w+)/g, "[$1]")] = n)
            }),
            e = r("key"),
            !i.key_id && e && (i.key_id = e),
            n.avoidPopup && "wallet" === i.method && (i["_[source]"] = "checkoutjs"),
            (n.tez || n.gpay) && (i["_[flow]"] = "intent",
            i["_[app]"] || (i["_[app]"] = $i)),
            ["integration", "integration_version", "integration_parent_version"].forEach(function(e) {
                var n = t.get("_." + e);
                n && (i["_[" + e + "]"] = n)
            }),
            (n = Tt) && (i["_[shield][fhash]"] = n),
            (n = Lt) && (i["_[device_id]"] = n),
            i["_[shield][tz]"] = -(new d).getTimezoneOffset(),
            n = Yi,
            ke(function(e, n) {
                i["_[shield][" + n + "]"] = e
            })(n),
            i["_[build]"] = 1504800775,
            Pt(i, "notes", "[]"),
            Pt(i, "card", "[]"),
            n = i["card[expiry]"],
            N(n) && (i["card[expiry_month]"] = n.slice(0, 2),
            i["card[expiry_year]"] = n.slice(-2),
            delete i["card[expiry]"]),
            i._ = Xn.common(),
            Pt(i, "_", "[]"),
            i
        }
        var $i = "com.google.android.apps.nbu.paisa.user"
          , Yi = {}
          , F = "forceIframeFlow"
          , n = "onlyPhoneRequired"
          , Ne = "forcePopupCustomCheckout";
        (e = {})[F] = !0,
        e[n] = !0,
        e[Ne] = !0,
        Ne = ki,
        de(function(e, n) {
            return e[n.code] = n,
            e
        }, {})(Ne);
        var Ne = ei.cdn
          , Zi = Ne + "cardless_emi/"
          , Wi = Ne + "cardless_emi-sq/"
          , Vi = {
            min_amount: 3e5,
            headless: !0,
            fee_bearer_customer: !0
        };
        Se({
            walnut369: {
                name: "Walnut369",
                fee_bearer_customer: !1,
                headless: !1,
                pushToFirst: !0,
                min_amount: 100
            },
            bajaj: {
                name: "Bajaj Finserv"
            },
            sezzle: {
                name: "Sezzle",
                headless: !1,
                fee_bearer_customer: !1,
                min_amount: 2e4
            },
            earlysalary: {
                name: "EarlySalary",
                fee_bearer_customer: !1
            },
            zestmoney: {
                name: "ZestMoney",
                min_amount: 9e4,
                fee_bearer_customer: !1
            },
            flexmoney: {
                name: "Cardless EMI by InstaCred",
                headless: !1,
                fee_bearer_customer: !1
            },
            fdrl: {
                name: "Federal Bank Cardless EMI",
                headless: !1
            },
            hdfc: {
                name: "HDFC Bank Cardless EMI",
                headless: !1
            },
            idfb: {
                name: "IDFC First Bank Cardless EMI",
                headless: !1
            },
            kkbk: {
                name: "Kotak Mahindra Bank Cardless EMI",
                headless: !1
            },
            icic: {
                name: "ICICI Bank Cardless EMI",
                headless: !1
            },
            hcin: {
                name: "Home Credit Ujjwal Card",
                headless: !1,
                min_amount: 5e4
            }
        }, function(e, n) {
            var t = {}
              , t = we(Vi)(t)
              , t = we({
                code: n,
                logo: Zi + n + ".svg",
                sqLogo: Wi + n + ".svg"
            })(t);
            return we(e)(t)
        });
        var qi = {
            S0: "S0",
            S1: "S1",
            S2: "S2",
            S3: "S3"
        }
          , Ne = Object.freeze({
            __proto__: null,
            capture: function(e, n) {
                var t = n.analytics
                  , i = n.severity
                  , i = void 0 === i ? qi.S1 : i
                  , n = n.unhandled
                  , n = void 0 !== n && n;
                try {
                    var r = t || {}
                      , a = r.event
                      , o = r.data
                      , u = r.immediately
                      , c = void 0 === u || u
                      , m = "string" == typeof a ? a : ut;
                    tt.track(m, {
                        data: An({}, "object" == typeof o ? o : {}, {
                            error: function(e, n) {
                                var t = {
                                    tags: n
                                };
                                switch (!0) {
                                case !e:
                                    t.message = "NA";
                                    break;
                                case "string" == typeof e:
                                    t.message = e;
                                    break;
                                case "object" == typeof e:
                                    var i = e.name
                                      , r = e.message
                                      , a = e.stack
                                      , o = e.fileName
                                      , u = e.lineNumber
                                      , c = e.columnNumber
                                      , t = An({}, JSON.parse(JSON.stringify(e)), {
                                        name: i,
                                        message: r,
                                        stack: a,
                                        fileName: o,
                                        lineNumber: u,
                                        columnNumber: c,
                                        tags: n
                                    });
                                    break;
                                default:
                                    t.message = JSON.stringify(e)
                                }
                                return t
                            }(e, {
                                severity: i,
                                unhandled: n
                            })
                        }),
                        immediately: l(c)
                    })
                } catch (e) {}
            }
        });
        An({
            SEVERITY_LEVELS: qi
        }, Ne);
        var Ne = ei.cdn
          , Ji = Ne + "paylater/"
          , Xi = Ne + "paylater-sq/"
          , Qi = {
            min_amount: 3e5
        };
        function er(e) {
            this.name = e,
            this._exists = !1,
            this.platform = "",
            this.bridge = {},
            this.init()
        }
        Se({
            epaylater: {
                name: "ePayLater"
            },
            getsimpl: {
                name: "Simpl"
            },
            icic: {
                name: "ICICI Bank PayLater"
            },
            hdfc: {
                name: "FlexiPay by HDFC Bank"
            },
            lazypay: {
                name: "LazyPay"
            }
        }, function(e, n) {
            var t = {}
              , t = we(Qi)(t)
              , t = we({
                code: n,
                logo: Ji + n + ".svg",
                sqLogo: Xi + n + ".svg"
            })(t);
            return we(e)(t)
        }),
        er.prototype = {
            init: function() {
                var e = this.name
                  , n = window[e]
                  , e = ((window.webkit || {}).messageHandlers || {})[e];
                e ? (this._exists = !0,
                this.bridge = e,
                this.platform = "ios") : n && (this._exists = !0,
                this.bridge = n,
                this.platform = "android")
            },
            exists: function() {
                return this._exists
            },
            get: function(e) {
                if (this.exists())
                    if ("android" === this.platform) {
                        if (B(this.bridge[e]))
                            return this.bridge[e]
                    } else if ("ios" === this.platform)
                        return this.bridge.postMessage
            },
            has: function(e) {
                return !(!this.exists() || !this.get(e))
            },
            callAndroid: function(e) {
                for (var n = arguments.length, t = new s(1 < n ? n - 1 : 0), i = 1; i < n; i++)
                    t[i - 1] = arguments[i];
                var r = t
                  , t = ae(function(e) {
                    return "object" == typeof e ? Ee(e) : e
                })(r)
                  , e = this.get(e);
                if (e)
                    return e.apply(this.bridge, t)
            },
            callIos: function(e) {
                var n = this.get(e);
                if (n)
                    try {
                        var t = {
                            action: e
                        }
                          , i = arguments.length <= 1 ? void 0 : arguments[1];
                        return i && (t.body = i),
                        n.call(this.bridge, t)
                    } catch (e) {}
            },
            call: function(e) {
                for (var n = arguments.length, t = new s(1 < n ? n - 1 : 0), i = 1; i < n; i++)
                    t[i - 1] = arguments[i];
                var r = this.get(e)
                  , t = [e].concat(t);
                r && (this.callAndroid.apply(this, t),
                this.callIos.apply(this, t))
            }
        },
        new er("CheckoutBridge"),
        new er("StorageBridge");
        var Ne = ei.cdn
          , nr = Ne + "wallet/"
          , tr = Ne + "wallet-sq/"
          , ir = ["mobikwik", "freecharge", "payumoney"];
        Se({
            airtelmoney: ["Airtel Money", 32],
            amazonpay: ["Amazon Pay", 28],
            citrus: ["Citrus Wallet", 32],
            freecharge: ["Freecharge", 18],
            jiomoney: ["JioMoney", 68],
            mobikwik: ["Mobikwik", 20],
            olamoney: ["Ola Money (Postpaid + Wallet)", 22],
            paypal: ["PayPal", 20],
            paytm: ["Paytm", 18],
            payumoney: ["PayUMoney", 18],
            payzapp: ["PayZapp", 24],
            phonepe: ["PhonePe", 20],
            sbibuddy: ["SBI Buddy", 22],
            zeta: ["Zeta", 25],
            citibankrewards: ["Citibank Reward Points", 20],
            itzcash: ["Itz Cash", 20],
            paycash: ["PayCash", 20]
        }, function(e, n) {
            return {
                power: -1 !== ir.indexOf(n),
                name: e[0],
                h: e[1],
                code: n,
                logo: nr + n + ".png",
                sqLogo: tr + n + ".png"
            }
        });
        var rr = function(e) {
            if (void 0 === e && (e = b.search),
            N(e)) {
                e = e.slice(1);
                return i = {},
                e.split(/=|&/).forEach(function(e, n, t) {
                    n % 2 && (i[t[n - 1]] = r(e))
                }),
                i
            }
            var i;
            return {}
        }();
        var ar = {}
          , or = {};
        function ur(e) {
            return {
                "_[agent][platform]": (Re(window, "webkit.messageHandlers.CheckoutBridge") ? {
                    platform: "ios"
                } : {
                    platform: rr.platform || "web",
                    library: "checkoutjs",
                    version: (rr.version || 1504800775) + ""
                }).platform,
                "_[agent][device]": null != e && e.cred ? "desktop" !== Dt() ? "mobile" : "desktop" : Dt(),
                "_[agent][os]": wt()
            }
        }
        [{
            package_name: $i,
            method: "upi"
        }, {
            package_name: "com.phonepe.app",
            method: "upi"
        }, {
            package_name: "cred",
            method: "app"
        }].forEach(function(e) {
            or[e] = !1
        });
        function cr(e, n, t) {
            mr[e] = {
                eligible: n,
                offer: t
            }
        }
        var mr = void 0;
        function lr(e) {
            return ei.api + ei.version + (e = void 0 === e ? "" : e)
        }
        var sr = ["key", "order_id", "invoice_id", "subscription_id", "auth_link_id", "payment_link_id", "contact_id", "checkout_config_id"];
        function dr(e, n) {
            n = lr(n);
            for (var t = 0; t < sr.length; t++) {
                var i = sr[t]
                  , r = e.get(i)
                  , i = "key" === i ? "key_id" : "x_entity_id";
                if (r) {
                    var a = e.get("account_id");
                    return a && (r += "&account_id=" + a),
                    n + (0 <= n.indexOf("?") ? "&" : "?") + i + "=" + r
                }
            }
            return n
        }
        function fr(n) {
            var t, i = this;
            if (!G(this, fr))
                return new fr(n);
            lt.call(this),
            this.id = Xn.makeUid(),
            tt.setR(this);
            try {
                t = function(e) {
                    e && "object" == typeof e || Z("Invalid options");
                    e = new Mt(e);
                    return function(t, i) {
                        void 0 === i && (i = []);
                        var r = !0;
                        return t = t.get(),
                        ke(_r, function(e, n) {
                            me(i, n) || n in t && ((e = e(t[n], t)) && (r = !1,
                            Z("Invalid " + n + " (" + e + ")")))
                        }),
                        r
                    }(e, ["amount"]),
                    function(e) {
                        var t = e.get("notes");
                        ke(t, function(e, n) {
                            N(e) ? 254 < e.length && (t[n] = e.slice(0, 254)) : M(e) || I(e) || delete t[n]
                        })
                    }(e),
                    e
                }(n),
                this.get = t.get,
                this.set = t.set
            } catch (e) {
                var r = e.message;
                this.get && this.isLiveMode() || K(n) && !n.parent && m.alert(r),
                Z(r)
            }
            ["integration", "integration_version", "integration_parent_version"].forEach(function(e) {
                var n = i.get("_." + e);
                n && (Xn.props[e] = n)
            }),
            sr.every(function(e) {
                return !t.get(e)
            }) && Z("No key passed"),
            this.postInit()
        }
        Se = fr.prototype = new lt;
        function pr(e, n) {
            return yn.jsonp({
                url: lr("preferences"),
                data: e,
                callback: n
            })
        }
        function hr(e) {
            if (e) {
                var t = e.get
                  , i = {}
                  , n = t("key");
                n && (i.key_id = n);
                var r = [t("currency")]
                  , a = t("display_currency")
                  , n = t("display_amount");
                a && ("" + n).length && r.push(a),
                i.currency = r,
                ["order_id", "customer_id", "invoice_id", "payment_link_id", "subscription_id", "auth_link_id", "recurring", "subscription_card_change", "account_id", "contact_id", "checkout_config_id", "amount"].forEach(function(e) {
                    var n = t(e);
                    n && (i[e] = n)
                }),
                i["_[build]"] = 1504800775,
                i["_[checkout_id]"] = e.id,
                i["_[library]"] = Xn.props.library,
                i["_[platform]"] = Xn.props.platform;
                e = ur() || {};
                return i = An({}, i, e)
            }
        }
        Se.postInit = mt,
        Se.onNew = function(e, n) {
            var t = this;
            "ready" === e && (this.prefs ? n(e, this.prefs) : pr(hr(this), function(e) {
                e.methods && (t.prefs = e,
                t.methods = e.methods),
                n(t.prefs, e)
            }))
        }
        ,
        Se.emi_calculator = function(e, n) {
            return fr.emi.calculator(this.get("amount") / 100, e, n)
        }
        ,
        fr.emi = {
            calculator: function(e, n, t) {
                if (!t)
                    return f.ceil(e / n);
                n = f.pow(1 + (t /= 1200), n);
                return h(e * t * n / (n - 1), 10)
            },
            calculatePlan: function(e, n, t) {
                var i = this.calculator(e, n, t);
                return {
                    total: t ? i * n : e,
                    installment: i
                }
            }
        },
        fr.payment = {
            getMethods: function(n) {
                return pr({
                    key_id: fr.defaults.key
                }, function(e) {
                    n(e.methods || e)
                })
            },
            getPrefs: function(n, t) {
                var i = P();
                return tt.track("prefs:start", {
                    type: Nn
                }),
                K(n) && (n["_[request_index]"] = tt.updateRequestIndex("preferences")),
                yn({
                    url: q(lr("preferences"), n),
                    callback: function(e) {
                        if (tt.track("prefs:end", {
                            type: Nn,
                            data: {
                                time: i()
                            }
                        }),
                        e.xhr && 0 === e.xhr.status)
                            return pr(n, t);
                        t(e)
                    }
                })
            },
            getRewards: function(e, n) {
                var t = P();
                return tt.track("rewards:start", {
                    type: Nn
                }),
                yn({
                    url: q(lr("checkout/rewards"), e),
                    callback: function(e) {
                        tt.track("rewards:end", {
                            type: Nn,
                            data: {
                                time: t()
                            }
                        }),
                        n(e)
                    }
                })
            }
        },
        Se.isLiveMode = function() {
            var e = this.preferences;
            return !e && /^rzp_l/.test(this.get("key")) || e && "live" === e.mode
        }
        ,
        Se.getMode = function() {
            var e = this.preferences;
            return this.get("key") || e ? !e && /^rzp_l/.test(this.get("key")) || e && "live" === e.mode ? "live" : "test" : "pending"
        }
        ,
        Se.calculateFees = function(e) {
            var i = this;
            return new Pn(function(n, t) {
                e = ji(e, i),
                yn.post({
                    url: lr("payments/calculate/fees"),
                    data: e,
                    callback: function(e) {
                        return (e.error ? t : n)(e)
                    }
                })
            }
            )
        }
        ,
        Se.fetchVirtualAccount = function(e) {
            var r = e.customer_id
              , a = e.order_id
              , o = e.notes;
            return new Pn(function(n, t) {
                var e, i;
                a ? (e = {
                    customer_id: r,
                    notes: o
                },
                r || delete e.customer_id,
                o || delete e.notes,
                i = lr("orders/" + a + "/virtual_accounts?x_entity_id=" + a),
                yn.post({
                    url: i,
                    data: e,
                    callback: function(e) {
                        return (e.error ? t : n)(e)
                    }
                })) : t("Order ID is required to fetch the account details")
            }
            )
        }
        ,
        Se.checkCREDEligibility = function(o) {
            var e, n = ar[e = void 0 === e ? Xn.id : e], t = ur({
                cred: !0
            }) || {}, i = q(dr(n.r, "payments/validate/account"));
            return new Pn(function(r, a) {
                if (!o)
                    return a(new Error("contact is required to check eligibility"));
                yn.post({
                    url: i,
                    data: An({
                        entity: "cred",
                        value: o,
                        "_[checkout_id]": null == n ? void 0 : n.id
                    }, t),
                    callback: function(e) {
                        var n = "ELIGIBLE" === (null == (n = e.data) ? void 0 : n.state);
                        if (ct.Track(it.ELIGIBILITY_CHECK, {
                            source: "validate_api",
                            isEligible: n
                        }),
                        n) {
                            var t, i = null == e || null == (t = e.data) || null == (i = t.offer) ? void 0 : i.description;
                            return cr(o, !0, i),
                            r(e)
                        }
                        return cr(o, !1),
                        a(e)
                    }
                })
            }
            )
        }
        ;
        var _r = {
            notes: function(e) {
                if (K(e) && 15 < z(he(e)))
                    return "At most 15 notes are allowed"
            },
            amount: function(e, n) {
                var t = n.display_currency || n.currency || "INR"
                  , i = Bi(t)
                  , r = i.minimum
                  , a = "";
                if (i.decimals && i.minor ? a = " " + i.minor : i.major && (a = " " + i.major),
                void 0 === (i = r) && (i = 100),
                (/[^0-9]/.test(e = e) || !(i <= (e = h(e, 10)))) && !n.recurring)
                    return "should be passed in integer" + a + ". Minimum value is " + r + a + ", i.e. " + xi(r, t)
            },
            currency: function(e) {
                if (!me(Ti, e))
                    return "The provided currency is not currently supported"
            },
            display_currency: function(e) {
                if (!(e in Li) && e !== fr.defaults.display_currency)
                    return "This display currency is not supported"
            },
            display_amount: function(e) {
                if (!(e = o(e).replace(/([^0-9.])/g, "")) && e !== fr.defaults.display_amount)
                    return ""
            },
            payout: function(e, n) {
                if (e)
                    return n.key ? n.contact_id ? void 0 : "contact_id is required for a Payout" : "key is required for a Payout"
            }
        };
        fr.configure = function(e, n) {
            void 0 === n && (n = {}),
            ke(At(e, Rt), function(e, n) {
                typeof Rt[n] == typeof e && (Rt[n] = e)
            }),
            n.library && (Xn.props.library = n.library),
            n.referer && (Xn.props.referer = n.referer)
        }
        ,
        fr.defaults = Rt,
        m.Razorpay = fr,
        Rt.timeout = 0,
        Rt.name = "",
        Rt.partnership_logo = "",
        Rt.nativeotp = !0,
        Rt.remember_customer = !1,
        Rt.personalization = !1,
        Rt.paused = !1,
        Rt.fee_label = "",
        Rt.force_terminal_id = "",
        Rt.is_donation_checkout = !1,
        Rt.keyless_header = "",
        Rt.min_amount_label = "",
        Rt.partial_payment = {
            min_amount_label: "",
            full_amount_label: "",
            partial_amount_label: "",
            partial_amount_description: "",
            select_partial: !1
        },
        Rt.method = {
            netbanking: null,
            card: !0,
            credit_card: !0,
            debit_card: !0,
            cardless_emi: null,
            wallet: null,
            emi: !0,
            upi: null,
            upi_intent: !0,
            qr: !0,
            bank_transfer: !0,
            upi_otm: !0,
            cod: !0
        },
        Rt.prefill = {
            amount: "",
            wallet: "",
            provider: "",
            method: "",
            name: "",
            contact: "",
            email: "",
            vpa: "",
            "card[number]": "",
            "card[expiry]": "",
            "card[cvv]": "",
            "billing_address[line1]": "",
            "billing_address[line2]": "",
            "billing_address[postal_code]": "",
            "billing_address[city]": "",
            "billing_address[country]": "",
            "billing_address[state]": "",
            bank: "",
            "bank_account[name]": "",
            "bank_account[account_number]": "",
            "bank_account[account_type]": "",
            "bank_account[ifsc]": "",
            auth_type: ""
        },
        Rt.features = {
            cardsaving: !0
        },
        Rt.readonly = {
            contact: !1,
            email: !1,
            name: !1
        },
        Rt.hidden = {
            contact: !1,
            email: !1
        },
        Rt.modal = {
            confirm_close: !1,
            ondismiss: mt,
            onhidden: mt,
            escape: !0,
            animation: !m.matchMedia("(prefers-reduced-motion: reduce)").matches,
            backdropclose: !1,
            handleback: !0
        },
        Rt.external = {
            wallets: [],
            handler: mt
        },
        Rt.theme = {
            upi_only: !1,
            color: "",
            backdrop_color: "rgba(0,0,0,0.6)",
            image_padding: !0,
            image_frame: !0,
            close_button: !0,
            close_method_back: !1,
            hide_topbar: !1,
            branding: "",
            debit_card: !1
        },
        Rt._ = {
            integration: null,
            integration_version: null,
            integration_parent_version: null
        },
        Rt.config = {
            display: {}
        };
        var vr, yr, gr, br, kr = m.screen, Sr = m.scrollTo, Er = ht, wr = {
            overflow: "",
            metas: null,
            orientationchange: function() {
                wr.resize.call(this),
                wr.scroll.call(this)
            },
            resize: function() {
                var e = m.innerHeight || kr.height;
                Cr.container.style.position = e < 450 ? "absolute" : "fixed",
                this.el.style.height = f.max(e, 460) + "px"
            },
            scroll: function() {
                var e;
                "number" == typeof m.pageYOffset && (m.innerHeight < 460 ? (e = 460 - m.innerHeight,
                m.pageYOffset > 120 + e && mn(e)) : this.isFocused || mn(0))
            }
        };
        function Dr() {
            return wr.metas || (wr.metas = tn('head meta[name=viewport],head meta[name="theme-color"]')),
            wr.metas
        }
        function Rr(e) {
            try {
                Cr.backdrop.style.background = e
            } catch (e) {}
        }
        function Cr(e) {
            if (vr = a.body,
            yr = a.head,
            gr = vr.style,
            e)
                return this.getEl(e),
                this.openRzp(e);
            this.getEl(),
            this.time = U()
        }
        Cr.prototype = {
            getEl: function(e) {
                var n;
                return this.el || (n = {
                    style: "opacity: 1; height: 100%; position: relative; background: none; display: block; border: 0 none transparent; margin: 0px; padding: 0px; z-index: 2;",
                    allowtransparency: !0,
                    frameborder: 0,
                    width: "100%",
                    height: "100%",
                    allowpaymentrequest: !0,
                    src: (n = e,
                    (e = ei.frame) || (e = lr("checkout"),
                    (n = hr(n)) ? e = q(e, n) : e += "/public"),
                    e),
                    class: "razorpay-checkout-frame"
                },
                this.el = (e = Pe("iframe"),
                ze(n)(e))),
                this.el
            },
            openRzp: function(e) {
                var n, t = (n = this.el,
                He({
                    width: "100%",
                    height: "100%"
                })(n)), i = e.get("parent"), r = (i = i && rn(i)) || Cr.container;
                !function(e, n) {
                    if (!br)
                        try {
                            var t;
                            (br = a.createElement("div")).className = "razorpay-loader";
                            var i = "margin:-25px 0 0 -25px;height:50px;width:50px;animation:rzp-rot 1s infinite linear;-webkit-animation:rzp-rot 1s infinite linear;border: 1px solid rgba(255, 255, 255, 0.2);border-top-color: rgba(255, 255, 255, 0.7);border-radius: 50%;";
                            i += n ? "margin: 100px auto -150px;border: 1px solid rgba(0, 0, 0, 0.2);border-top-color: rgba(0, 0, 0, 0.7);" : "position:absolute;left:50%;top:50%;",
                            br.setAttribute("style", i),
                            t = br,
                            Te(e)(t)
                        } catch (e) {}
                }(r, i),
                e !== this.rzp && (Ae(t) !== r && (n = r,
                Le(t)(n)),
                this.rzp = e),
                i ? (t = t,
                Fe("minHeight", "530px")(t),
                this.embedded = !0) : (r = r,
                r = Fe("display", "block")(r),
                je(r),
                Rr(e.get("theme.backdrop_color")),
                /^rzp_t/.test(e.get("key")) && Cr.ribbon && (Cr.ribbon.style.opacity = 1),
                this.setMetaAndOverflow()),
                this.bind(),
                this.onload()
            },
            makeMessage: function() {
                var e, n, t, i = this.rzp, r = i.get(), a = {
                    integration: Xn.props.integration,
                    referer: Xn.props.referer || b.href,
                    options: r,
                    library: Xn.props.library,
                    id: i.id
                };
                return i.metadata && (a.metadata = i.metadata),
                ke(i.modal.options, function(e, n) {
                    r["modal." + n] = e
                }),
                this.embedded && (delete r.parent,
                a.embedded = !0),
                (t = (e = r).image) && N(t) && (W(t) || t.indexOf("http") && (n = b.protocol + "//" + b.hostname + (b.port ? ":" + b.port : ""),
                i = "",
                "/" !== t[0] && "/" !== (i += b.pathname.replace(/[^/]*$/g, ""))[0] && (i = "/" + i),
                e.image = n + i + t)),
                a
            },
            close: function() {
                var e;
                Rr(""),
                Cr.ribbon && (Cr.ribbon.style.opacity = 0),
                (e = this.$metas) && e.forEach(xe),
                (e = Dr()) && e.forEach(Te(yr)),
                gr.overflow = wr.overflow,
                this.unbind(),
                Er && Sr(0, wr.oldY),
                Xn.flush()
            },
            bind: function() {
                var e, i = this;
                this.listeners || (this.listeners = [],
                e = {},
                Er && (e.orientationchange = wr.orientationchange,
                this.rzp.get("parent") || (e.resize = wr.resize)),
                ke(e, function(e, n) {
                    var t;
                    i.listeners.push((t = window,
                    Ue(n, e.bind(i))(t)))
                }))
            },
            unbind: function() {
                this.listeners.forEach(function(e) {
                    "function" == typeof e && e()
                }),
                this.listeners = null
            },
            setMetaAndOverflow: function() {
                var e;
                yr && (Dr().forEach(function(e) {
                    return xe(e)
                }),
                this.$metas = [(e = Pe("meta"),
                ze({
                    name: "viewport",
                    content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                })(e)), (e = Pe("meta"),
                ze({
                    name: "theme-color",
                    content: this.rzp.get("theme.color")
                })(e))],
                this.$metas.forEach(Te(yr)),
                wr.overflow = gr.overflow,
                gr.overflow = "hidden",
                Er && (wr.oldY = m.pageYOffset,
                m.scrollTo(0, 0),
                wr.orientationchange.call(this)))
            },
            postMessage: function(e) {
                e.id = this.rzp.id,
                e = Ee(e),
                this.el.contentWindow.postMessage(e, "*")
            },
            onmessage: function(e) {
                var n, t, i = X(e.data);
                i && (n = i.event,
                t = this.rzp,
                e.origin && "frame" === i.source && e.source === this.el.contentWindow && (i = i.data,
                this["on" + n](i),
                "dismiss" !== n && "fault" !== n || tt.track(n, {
                    data: i,
                    r: t,
                    immediately: !0
                })))
            },
            onload: function() {
                this.rzp && this.postMessage(this.makeMessage())
            },
            onfocus: function() {
                this.isFocused = !0
            },
            onblur: function() {
                this.isFocused = !1,
                wr.orientationchange.call(this)
            },
            onrender: function() {
                br && (xe(br),
                br = null),
                this.rzp.emit("render")
            },
            onevent: function(e) {
                this.rzp.emit(e.event, e.data)
            },
            onredirect: function(e) {
                Xn.flush(),
                e.target || (e.target = this.rzp.get("target") || "_top"),
                on(e)
            },
            onsubmit: function(n) {
                Xn.flush();
                var t = this.rzp;
                "wallet" === n.method && (t.get("external.wallets") || []).forEach(function(e) {
                    if (e === n.wallet)
                        try {
                            t.get("external.handler").call(t, n)
                        } catch (e) {}
                }),
                t.emit("payment.submit", {
                    method: n.method
                })
            },
            ondismiss: function(e) {
                this.close();
                var n = this.rzp.get("modal.ondismiss");
                B(n) && p(function() {
                    return n(e)
                })
            },
            onhidden: function() {
                Xn.flush(),
                this.afterClose();
                var e = this.rzp.get("modal.onhidden");
                B(e) && e()
            },
            oncomplete: function(e) {
                this.close();
                var n = this.rzp
                  , t = n.get("handler");
                tt.track("checkout_success", {
                    r: n,
                    data: e,
                    immediately: !0
                }),
                B(t) && p(function() {
                    t.call(n, e)
                }, 200)
            },
            onpaymenterror: function(e) {
                Xn.flush();
                try {
                    var n, t = this.rzp.get("callback_url"), i = this.rzp.get("redirect") || Et, r = this.rzp.get("retry");
                    if (i && t && !1 === r)
                        return null != e && null != (n = e.error) && n.metadata && (e.error.metadata = JSON.stringify(e.error.metadata)),
                        void on({
                            url: t,
                            content: e,
                            method: "post",
                            target: this.rzp.get("target") || "_top"
                        });
                    this.rzp.emit("payment.error", e),
                    this.rzp.emit("payment.failed", e)
                } catch (e) {}
            },
            onfailure: function(e) {
                this.ondismiss(),
                m.alert("Payment Failed.\n" + e.error.description),
                this.onhidden()
            },
            onfault: function(e) {
                var n = "Something went wrong.";
                N(e) ? n = e : T(e) && (e.message || e.description) && (n = e.message || e.description),
                Xn.flush(),
                this.rzp.close();
                var t = this.rzp.get("callback_url");
                (this.rzp.get("redirect") || Et) && t ? un(t, {
                    error: e
                }, "post") : m.alert("Oops! Something went wrong.\n" + n),
                this.afterClose()
            },
            afterClose: function() {
                Cr.container.style.display = "none"
            },
            onflush: function(e) {
                Xn.flush(e)
            }
        };
        var Pr, Se = H(fr);
        function Ar(n) {
            return function e() {
                return Pr ? n.call(this) : (p(e.bind(this), 99),
                this)
            }
        }
        !function e() {
            (Pr = a.body || a.getElementsByTagName("body")[0]) || p(e, 99)
        }();
        var Ir = a.currentScript || (H = tn("script"))[H.length - 1];
        function Mr(e) {
            var n, t = Ae(Ir), t = Le((n = Pe(),
            Ge(cn(e))(n)))(t), t = ye("onsubmit", mt)(t);
            Ke(t)
        }
        function Nr(a) {
            var e, n = Ae(Ir), n = Le((e = Pe("input"),
            we({
                type: "submit",
                value: a.get("buttontext"),
                className: "razorpay-payment-button"
            })(e)))(n);
            ye("onsubmit", function(e) {
                e.preventDefault();
                var n = this.action
                  , t = this.method
                  , i = this.target
                  , e = a.get();
                if (N(n) && n && !e.callback_url) {
                    i = {
                        url: n,
                        content: de(this.querySelectorAll("[name]"), function(e, n) {
                            return e[n.name] = n.value,
                            e
                        }, {}),
                        method: N(t) ? t : "get",
                        target: N(i) && i
                    };
                    try {
                        var r = _(Ee({
                            request: i,
                            options: Ee(e),
                            back: b.href
                        }));
                        e.callback_url = lr("checkout/onyx") + "?data=" + r
                    } catch (e) {}
                }
                return a.open(),
                ct.TrackBehav(at),
                !1
            })(n)
        }
        var Br, Tr;
        function Lr() {
            var e, n, t, i;
            return Br || (t = Pe(),
            i = ye("className", "razorpay-container")(t),
            n = ye("innerHTML", "<style>@keyframes rzp-rot{to{transform: rotate(360deg);}}@-webkit-keyframes rzp-rot{to{-webkit-transform: rotate(360deg);}}</style>")(i),
            e = He({
                zIndex: 1e9,
                position: "fixed",
                top: 0,
                display: "none",
                left: 0,
                height: "100%",
                width: "100%",
                "-webkit-overflow-scrolling": "touch",
                "-webkit-backface-visibility": "hidden",
                "overflow-y": "visible"
            })(n),
            Br = Te(Pr)(e),
            t = Cr.container = Br,
            i = Pe(),
            i = ye("className", "razorpay-backdrop")(i),
            i = He({
                "min-height": "100%",
                transition: "0.3s ease-out",
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%"
            })(i),
            n = Te(t)(i),
            e = Cr.backdrop = n,
            t = "rotate(45deg)",
            i = "opacity 0.3s ease-in",
            n = Pe("span"),
            n = ye("innerHTML", "Test Mode")(n),
            n = He({
                "text-decoration": "none",
                background: "#D64444",
                border: "1px dashed white",
                padding: "3px",
                opacity: "0",
                "-webkit-transform": t,
                "-moz-transform": t,
                "-ms-transform": t,
                "-o-transform": t,
                transform: t,
                "-webkit-transition": i,
                "-moz-transition": i,
                transition: i,
                "font-family": "lato,ubuntu,helvetica,sans-serif",
                color: "white",
                position: "absolute",
                width: "200px",
                "text-align": "center",
                right: "-50px",
                top: "50px"
            })(n),
            n = Te(e)(n),
            Cr.ribbon = n),
            Br
        }
        function xr(e) {
            return Tr ? Tr.openRzp(e) : (Tr = new Cr(e),
            e = m,
            Ue("message", Tr.onmessage.bind(Tr))(e),
            e = Br,
            Le(Tr.el)(e)),
            Tr
        }
        fr.open = function(e) {
            return fr(e).open()
        }
        ,
        Se.postInit = function() {
            this.modal = {
                options: {}
            },
            this.get("parent") && this.open()
        }
        ;
        var Kr = Se.onNew;
        Se.onNew = function(e, n) {
            "payment.error" === e && Xn(this, "event_paymenterror", b.href),
            B(Kr) && Kr.call(this, e, n)
        }
        ,
        Se.open = Ar(function() {
            this.metadata || (this.metadata = {}),
            this.metadata.openedAt = d.now();
            var e = this.checkoutFrame = xr(this);
            return Xn(this, "open"),
            e.el.contentWindow || (e.close(),
            e.afterClose(),
            m.alert("This browser is not supported.\nPlease try payment in another browser.")),
            "-new.js" === Ir.src.slice(-7) && Xn(this, "oldscript", b.href),
            this
        }),
        Se.resume = function(e) {
            var n = this.checkoutFrame;
            n && n.postMessage({
                event: "resume",
                data: e
            })
        }
        ,
        Se.close = function() {
            var e = this.checkoutFrame;
            e && e.postMessage({
                event: "close"
            })
        }
        ;
        Se = Ar(function() {
            Lr(),
            Tr = xr();
            try {
                !function() {
                    var i = {};
                    ke(Ir.attributes, function(e) {
                        var n, t = e.name.toLowerCase();
                        /^data-/.test(t) && (n = i,
                        t = t.replace(/^data-/, ""),
                        "true" === (e = e.value) ? e = !0 : "false" === e && (e = !1),
                        /^notes\./.test(t) && (i.notes || (i.notes = {}),
                        n = i.notes,
                        t = t.replace(/^notes\./, "")),
                        n[t] = e)
                    });
                    var e = i.key;
                    e && 0 < e.length && (i.handler = Mr,
                    e = fr(i),
                    i.parent || (ct.TrackRender(rt, e),
                    Nr(e)))
                }()
            } catch (e) {}
        });
        m.addEventListener("rzp_error", function(e) {
            e = e.detail;
            tt.track("cfu_error", {
                data: {
                    error: e
                },
                immediately: !0
            })
        }),
        m.addEventListener("rzp_network_error", function(e) {
            e = e.detail;
            e && "https://lumberjack.razorpay.com/v1/track" === e.baseUrl || tt.track("network_error", {
                data: e,
                immediately: !0
            })
        }),
        Xn.props.library = "checkoutjs",
        Rt.handler = function(e) {
            var n;
            !G(this, fr) || (n = this.get("callback_url")) && un(n, e, "post")
        }
        ,
        Rt.buttontext = "Pay Now",
        Rt.parent = null,
        _r.parent = function(e) {
            if (!rn(e))
                return "parent provided for embedded mode doesn't exist"
        }
        ,
        Se()
    }()
}();
