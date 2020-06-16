(window.webpackJsonp = window.webpackJsonp || []).push([
  [0],
  {
    46: function (e, t, n) {
      'use strict';
      n.r(t);
      var r = n(1),
        o = n.n(r),
        a = n(0),
        i = n.n(a),
        c = n(6),
        s = n.n(c),
        f = n(5),
        u = n(8),
        d = n(10),
        l = n.n(d),
        p = n(12),
        m = n.n(p),
        b = Object(u.b)({
          name: 'currencies',
          initialState: { error: !1, isFetching: !1, list: {} },
          reducers: {
            setFetchingError: function (e, t) {
              e.error = t.payload;
            },
            setFetchingState: function (e, t) {
              e.isFetching = t.payload;
            },
            saveListToLocalStorage: function (e, t) {
              var n = { list: t.payload, createdAt: Date.now() };
              localStorage.setItem('currencies_list', JSON.stringify(n));
            },
            update: function (e, t) {
              e.list = t.payload;
            },
          },
        }),
        g = b.actions,
        h = g.update,
        v = g.setFetchingState,
        w = g.setFetchingError,
        y = g.saveListToLocalStorage,
        O = function () {
          return function (e) {
            !0 !==
              e(function (e) {
                var t = localStorage.getItem('currencies_list');
                if (null === t) return !1;
                var n = JSON.parse(t);
                return (
                  !(n.createdAt + 864e5 < Date.now()) && (e(h(n.list)), !0)
                );
              }) &&
              e(
                (function () {
                  var e = m()(
                    l.a.mark(function e(t) {
                      var n, r;
                      return l.a.wrap(
                        function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (
                                  t(v(!0)),
                                  (e.prev = 1),
                                  (e.next = 4),
                                  fetch(
                                    'https://api.frankfurter.app/currencies'
                                  )
                                );
                              case 4:
                                return (n = e.sent), (e.next = 7), n.json();
                              case 7:
                                (r = e.sent), t(h(r)), t(y(r)), (e.next = 15);
                                break;
                              case 12:
                                (e.prev = 12), (e.t0 = e.catch(1)), t(w(!0));
                              case 15:
                                t(v(!1));
                              case 16:
                              case 'end':
                                return e.stop();
                            }
                        },
                        e,
                        null,
                        [[1, 12]]
                      );
                    })
                  );
                  return function (t) {
                    return e.apply(this, arguments);
                  };
                })()
              );
          };
        },
        j = b.reducer,
        x = n(20),
        S = n.n(x),
        C = Intl.DateTimeFormat('sv'),
        E = function (e, t, n) {
          if ('string' !== typeof e || 0 === e.length)
            throw new TypeError(
              '`from` must be a non empty string representing currency symbol.'
            );
          if (
            (null !== t && 'string' !== typeof t && !Array.isArray(t)) ||
            (null !== t && 0 === t.length) ||
            (Array.isArray(t) &&
              t.find(function (e) {
                return 'string' !== typeof e || 0 === e.length;
              }))
          )
            throw new TypeError(
              '`to` must be a null OR non empty string OR array of strings representing currency symbol.'
            );
          if (n instanceof Date && !Number.isNaN(n.valueOf(n)))
            throw new TypeError('`date` must be a valid Date');
          var r = new URL('https://api.frankfurter.app/');
          if (
            ((r.pathname = C.format(n)),
            r.searchParams.set('from', e.toUpperCase()),
            null !== t)
          ) {
            var o = '';
            (o = Array.isArray(t) ? t.join(',') : t),
              r.searchParams.set('to', o);
          }
          return r.toString();
        },
        N = function (e) {
          return C.format(e);
        };
      function z(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          t &&
            (r = r.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, r);
        }
        return n;
      }
      var I = Object(u.b)({
          name: 'rates',
          initialState: { error: !1, rates: {} },
          reducers: {
            setFetchingError: function (e, t) {
              e.error = t.payload;
            },
            setFetchingState: function (e, t) {
              e.isFetching = t.payload;
            },
            saveStateToLocal: function (e) {
              localStorage.setItem('curr_rates', JSON.stringify(e.rates));
            },
            replaceRates: function (e, t) {
              e.rates = t.payload;
            },
            addRate: function (e, t) {
              var n = t.payload,
                r = n.base,
                o = n.date,
                a = n.rates,
                i = n.needUpdate;
              'undefined' === typeof e.rates[r] && (e.rates[r] = {}),
                'undefined' === typeof e.rates[r][o] && (e.rates[r][o] = {}),
                !0 === i && (e.rates[r][o].needUpdate = !0),
                (e.rates[r][o] = (function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2
                      ? z(Object(n), !0).forEach(function (t) {
                          S()(e, t, n[t]);
                        })
                      : Object.getOwnPropertyDescriptors
                      ? Object.defineProperties(
                          e,
                          Object.getOwnPropertyDescriptors(n)
                        )
                      : z(Object(n)).forEach(function (t) {
                          Object.defineProperty(
                            e,
                            t,
                            Object.getOwnPropertyDescriptor(n, t)
                          );
                        });
                  }
                  return e;
                })({}, a, {}, JSON.parse(JSON.stringify(e.rates[r][o]))));
            },
          },
        }),
        k = I.actions,
        P = k.setFetchingError,
        F = (k.setFetchingState, k.saveStateToLocal),
        D = k.replaceRates,
        R = k.addRate,
        L = function (e) {
          var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null,
            n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : Date.now();
          return (function () {
            var r = m()(
              l.a.mark(function r(o) {
                var a, i, c;
                return l.a.wrap(
                  function (r) {
                    for (;;)
                      switch ((r.prev = r.next)) {
                        case 0:
                          if (e !== t) {
                            r.next = 2;
                            break;
                          }
                          return r.abrupt('return');
                        case 2:
                          return (r.prev = 2), (r.next = 5), fetch(E(e, t, n));
                        case 5:
                          return (a = r.sent), (r.next = 8), a.json();
                        case 8:
                          (i = r.sent),
                            (c = N(n)),
                            i.date !== c && ((i.date = c), (i.needUpdate = !0)),
                            o(R(i)),
                            o(F()),
                            (r.next = 18);
                          break;
                        case 15:
                          (r.prev = 15), (r.t0 = r.catch(2)), o(P(!0));
                        case 18:
                        case 'end':
                          return r.stop();
                      }
                  },
                  r,
                  null,
                  [[2, 15]]
                );
              })
            );
            return function (e) {
              return r.apply(this, arguments);
            };
          })();
        },
        A = I.reducer,
        U = Object(u.a)({ reducer: { currencies: j, rates: A } }),
        T = n(3),
        _ = n.n(T),
        J = n(21),
        B = n.n(J),
        K = n(2),
        W = '#fff',
        X = '#f1f3f5',
        H = '#f1f1f1',
        V = '#d7d7d7',
        Z = '#000',
        M = '#272525',
        q = '#e5e5e5',
        G = '#0f7baa',
        Q = '#c1525c',
        Y =
          (n(41),
          Object(K.d)([
            '0%{transform:translateX(-100%);}100%{transform:translateX(100%);}',
          ])),
        $ = Object(K.b)(
          [
            "position:relative;overflow:hidden;&:before,&:after{content:'';position:absolute;left:0;top:0;width:100%;height:100%;}:before{z-index:3;background:",
            ';}&:after{background:linear-gradient( 90deg,transparent,rgba(255,255,255,0.2),transparent );transform:translateX(-100%);animation:',
            ' 1.5s infinite;z-index:4;}',
          ],
          V,
          Y
        ),
        ee = K.c.div.withConfig({ componentId: 'sc-5fdu8f-0' })([
          "font-size:1em;padding:0.5em;min-width:200px;display:flex;flex-direction:column;position:relative;background:linear-gradient(-90deg,transparent,rgba(255,255,255,1));&:before,&:after{content:'';background:rgba(0,0,0,0.2);position:absolute;}&:before{width:calc(100% - 1em);height:1px;left:0.5em;bottom:0;}&:after{width:1px;height:calc(100% - 1em);right:0;bottom:0.5em;}",
        ]),
        te = K.c.h2.withConfig({ componentId: 'sc-5fdu8f-1' })([
          'font-size:1em;font-weight:400;margin:0 0 0.25em;',
        ]),
        ne = K.c.div.withConfig({ componentId: 'sc-5fdu8f-2' })([
          'font-size:2em;font-weight:700;margin-left:auto;',
        ]),
        re = Object(K.c)(te).withConfig({ componentId: 'sc-5fdu8f-3' })(
          ['', ' width:75px;height:1em;'],
          $
        ),
        oe = Object(K.c)(ne).withConfig({ componentId: 'sc-5fdu8f-4' })(
          ['', ' width:100px;height:1em;'],
          $
        ),
        ae = o()(re, {}),
        ie = o()(oe, {}),
        ce = function (e) {
          var t = e.from,
            n = e.to,
            r = e.rate,
            a = e.className;
          return 'undefined' === typeof t ||
            'undefined' === typeof n ||
            'undefined' === typeof r
            ? o()(ee, { className: a }, void 0, ae, ie)
            : o()(
                ee,
                { className: a },
                void 0,
                o()(te, {}, void 0, t, ' / ', n),
                o()(ne, {}, void 0, r)
              );
        };
      ce.defaultProps = { from: void 0, to: void 0, rate: void 0 };
      var se = ce,
        fe = K.c.div.withConfig({ componentId: 'sc-90zfy9-0' })([
          'display:flex;width:100%;',
        ]),
        ue = Object(K.c)(se).withConfig({ componentId: 'sc-90zfy9-1' })([
          'flex:1 1 auto;',
        ]),
        de = function (e) {
          var t = e.className,
            n = e.from,
            r = e.to,
            i = e.date,
            c = Object(f.b)(),
            s = Object(a.useState)(!1),
            u = _()(s, 2),
            d = u[0],
            l = u[1],
            p = N(i),
            m = Object(f.c)(function (e) {
              if (d) return null;
              var t = [];
              return (
                'string' === typeof r ? t.push(r) : (t = r),
                t.map(function (t) {
                  var r, a;
                  return o()(
                    ue,
                    {
                      from: n,
                      to: t,
                      rate:
                        null === (r = e.rates.rates[n]) ||
                        void 0 === r ||
                        null === (a = r[p]) ||
                        void 0 === a
                          ? void 0
                          : a[t],
                    },
                    ''.concat(n, '/').concat(t)
                  );
                })
              );
            });
          return (
            Object(a.useEffect)(function () {
              l(!0), c(L(n, r, i)).then(l(!1));
            }, []),
            o()(fe, { className: t }, void 0, m)
          );
        },
        le = Object(K.b)(
          [
            'background:',
            ';border:2px solid ',
            ";font:700 1em 'Roboto',sans-serif;padding:0.75em 0.5em;border-radius:4px;min-width:260px;margin-top:8px;&:focus{outline:2px ",
            ' solid;box-shadow:0 0 5px 0 ',
            ';}',
          ],
          W,
          q,
          G,
          G
        ),
        pe = n(25),
        me = {
          from: 'USD',
          to: [
            'EUR',
            'PLN',
            'RUB',
            'CZK',
            'NOK',
            'SEK',
            'KRW',
            'THB',
            'AUD',
            'CHF',
          ],
        },
        be = {
          from: { value: 'PLN', label: '(PLN) Polish Z\u0142oty' },
          to: { value: 'EUR', label: '(EUR) Euro' },
        },
        ge = K.c.form.withConfig({ componentId: 'sc-1jnahz0-0' })(
          [
            'color:',
            ';display:flex;@media (max-width:680px){flex-direction:column;}',
          ],
          Z
        ),
        he = K.c.div.withConfig({ componentId: 'sc-1jnahz0-1' })([
          'margin:0 40px 0;',
        ]),
        ve = K.c.label.withConfig({ componentId: 'sc-1jnahz0-2' })([
          'display:flex;flex-direction:column;font-size:1em;margin-bottom:2em;',
        ]),
        we = K.c.input.withConfig({ componentId: 'sc-1jnahz0-3' })(
          ['', ' border-color:', ''],
          le,
          function (e) {
            return e.error ? Q : q;
          }
        ),
        ye = K.c.output.withConfig({ componentId: 'sc-1jnahz0-4' })(
          ['', ' background:', ';border-color:', ''],
          le,
          H,
          function (e) {
            return e.error ? Q : q;
          }
        ),
        Oe = Object(K.c)(pe.a).withConfig({ componentId: 'sc-1jnahz0-5' })(
          [
            '.react-select__control{',
            '}.react-select__value-container{padding:0;}.react-select__indicators{display:none;}',
          ],
          le
        ),
        je = function () {
          var e = Object(f.b)(),
            t = Object(a.useState)(1),
            n = _()(t, 2),
            r = n[0],
            i = n[1],
            c = Object(a.useState)(1),
            s = _()(c, 2),
            u = s[0],
            d = s[1],
            l = Object(a.useState)(be.from.value),
            p = _()(l, 2),
            m = p[0],
            b = p[1],
            g = Object(a.useState)(be.to.value),
            h = _()(g, 2),
            v = h[0],
            w = h[1],
            y = Object(a.useState)(!1),
            O = _()(y, 2),
            j = O[0],
            x = O[1],
            S = Object(a.useState)(!1),
            C = _()(S, 2),
            E = C[0],
            z = C[1],
            I = Object(f.c)(function (e) {
              var t, n;
              return m === v
                ? 1
                : null === (t = e.rates.rates[m]) ||
                  void 0 === t ||
                  null === (n = t[N(Date.now())]) ||
                  void 0 === n
                ? void 0
                : n[v];
            }),
            k = Object(f.c)(function (e) {
              var t = e.currencies.list;
              return Object.entries(t).map(function (e) {
                return {
                  value: e[0],
                  label: '('.concat(e[0], ') ').concat(e[1]),
                };
              });
            });
          return (
            Object(a.useEffect)(function () {
              if (!j && !E)
                return 'undefined' === typeof I
                  ? (x(!0), void e(L(m, v)).then(x(!1)))
                  : void d(r * I);
            }),
            o()(
              ge,
              {},
              void 0,
              o()(
                he,
                {},
                void 0,
                o()(
                  ve,
                  {},
                  void 0,
                  'From',
                  o()(Oe, {
                    options: k,
                    defaultValue: be.from,
                    classNamePrefix: 'react-select',
                    onChange: function (e) {
                      var t = e.value;
                      b(t);
                    },
                  })
                ),
                o()(
                  ve,
                  {},
                  void 0,
                  'Amount',
                  o()(we, {
                    value: r,
                    onChange: function (e) {
                      var t = e.target.value.split(',').join('.'),
                        n = Number.isNaN(Number(t));
                      i(t), z(n);
                    },
                    onBlur: function (e) {
                      '' === e.target.value && i('0');
                    },
                    type: 'text',
                    pellcheck: 'false',
                    error: E,
                  })
                )
              ),
              o()(
                he,
                {},
                void 0,
                o()(
                  ve,
                  {},
                  void 0,
                  'To',
                  o()(Oe, {
                    options: k,
                    defaultValue: be.to,
                    classNamePrefix: 'react-select',
                    onChange: function (e) {
                      var t = e.value;
                      w(t);
                    },
                  })
                ),
                o()(
                  ve,
                  {},
                  void 0,
                  'Exchanged Amount',
                  o()(ye, { error: E }, void 0, u)
                )
              )
            )
          );
        };
      function xe() {
        var e = B()([
          '\n  body {\n    background: ',
          ';\n    color: ',
          ";\n    font-family: 'Roboto', sans-serif;\n  }\n  \n  *,\n  *:before,\n  *:after {\n    box-sizing: border-box;\n  }\n",
        ]);
        return (
          (xe = function () {
            return e;
          }),
          e
        );
      }
      var Se = Object(K.a)(xe(), X, M),
        Ce = K.c.div.withConfig({ componentId: 'w3zbcp-0' })([
          'min-height:100vh;width:100%;display:flex;justify-content:center;align-items:center;flex-direction:column;',
        ]),
        Ee = K.c.h1.withConfig({ componentId: 'w3zbcp-1' })([
          'font-weight:500;font-size:3em;text-align:center;line-height:1em;width:100%;',
        ]),
        Ne = K.c.span.withConfig({ componentId: 'w3zbcp-2' })([
          'display:block;text-align:center;font-size:0.75em;',
        ]),
        ze = Object(K.c)(de).withConfig({ componentId: 'w3zbcp-3' })([
          'position:absolute;left:0;top:0;',
        ]),
        Ie = o()(Se, {}),
        ke = o()(
          Ce,
          {},
          void 0,
          o()(Ee, {}, void 0, 'Currency ', o()(Ne, {}, void 0, 'Exchange')),
          o()(je, {})
        ),
        Pe = function () {
          var e = Object(f.b)(),
            t = Object(a.useState)(!1),
            n = _()(t, 2),
            r = n[0],
            c = n[1],
            s = Object(a.useState)(me.to),
            u = _()(s, 2),
            d = u[0],
            l = u[1];
          function p() {
            c(window.innerWidth >= 400);
            var e = Math.floor(window.innerWidth / 200);
            l(me.to.slice(0, e));
          }
          return (
            Object(a.useEffect)(function () {
              e(O()),
                e(function (e) {
                  var t = localStorage.getItem('curr_rates');
                  return null !== t && (e(D(JSON.parse(t))), !0);
                }),
                p();
            }, []),
            Object(a.useEffect)(function () {
              return (
                window.addEventListener('resize', p),
                function () {
                  window.removeEventListener('resize', p);
                }
              );
            }),
            i.a.createElement(
              i.a.Fragment,
              null,
              Ie,
              ke,
              r ? o()(ze, { from: me.from, to: d, date: Date.now() }) : null
            )
          );
        };
      s.a.render(
        o()(f.a, { store: U }, void 0, o()(Pe, {})),
        document.getElementById('root')
      );
    },
  },
  [[46, 1, 2]],
]);
