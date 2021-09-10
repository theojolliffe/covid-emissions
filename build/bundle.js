var app=function(){"use strict";function e(){}function t(e){return e()}function n(){return Object.create(null)}function o(e){e.forEach(t)}function r(e){return"function"==typeof e}function i(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function a(e,t){e.appendChild(t)}function l(e,t,n){e.insertBefore(t,n||null)}function s(e){e.parentNode.removeChild(e)}function c(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function u(e){return document.createElement(e)}function d(e){return document.createTextNode(e)}function h(){return d(" ")}function p(e,t,n,o){return e.addEventListener(t,n,o),()=>e.removeEventListener(t,n,o)}function m(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function f(e){return""===e?null:+e}function g(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}function y(e,t){e.value=null==t?"":t}function w(e,t,n,o){e.style.setProperty(t,n,o?"important":"")}function v(e,t){for(let n=0;n<e.options.length;n+=1){const o=e.options[n];if(o.__value===t)return void(o.selected=!0)}e.selectedIndex=-1}function x(e){const t=e.querySelector(":checked")||e.options[0];return t&&t.__value}let b;function k(e){b=e}const C=[],_=[],M=[],T=[],H=Promise.resolve();let E=!1;function S(e){M.push(e)}let $=!1;const L=new Set;function A(){if(!$){$=!0;do{for(let e=0;e<C.length;e+=1){const t=C[e];k(t),P(t.$$)}for(k(null),C.length=0;_.length;)_.pop()();for(let e=0;e<M.length;e+=1){const t=M[e];L.has(t)||(L.add(t),t())}M.length=0}while(C.length);for(;T.length;)T.pop()();E=!1,$=!1,L.clear()}}function P(e){if(null!==e.fragment){e.update(),o(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(S)}}const W=new Set;function O(e,t){-1===e.$$.dirty[0]&&(C.push(e),E||(E=!0,H.then(A)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function N(i,a,l,c,u,d,h,p=[-1]){const m=b;k(i);const f=i.$$={fragment:null,ctx:null,props:d,update:e,not_equal:u,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(m?m.$$.context:a.context||[]),callbacks:n(),dirty:p,skip_bound:!1,root:a.target||m.$$.root};h&&h(f.root);let g=!1;if(f.ctx=l?l(i,a.props||{},((e,t,...n)=>{const o=n.length?n[0]:t;return f.ctx&&u(f.ctx[e],f.ctx[e]=o)&&(!f.skip_bound&&f.bound[e]&&f.bound[e](o),g&&O(i,e)),t})):[],f.update(),g=!0,o(f.before_update),f.fragment=!!c&&c(f.ctx),a.target){if(a.hydrate){const e=function(e){return Array.from(e.childNodes)}(a.target);f.fragment&&f.fragment.l(e),e.forEach(s)}else f.fragment&&f.fragment.c();a.intro&&((y=i.$$.fragment)&&y.i&&(W.delete(y),y.i(w))),function(e,n,i,a){const{fragment:l,on_mount:s,on_destroy:c,after_update:u}=e.$$;l&&l.m(n,i),a||S((()=>{const n=s.map(t).filter(r);c?c.push(...n):o(n),e.$$.on_mount=[]})),u.forEach(S)}(i,a.target,a.anchor,a.customElement),A()}var y,w;k(m)}var F=[{question:"How do you commute?",answers:[{id:"5a",text:"Walk",selected:""},{id:"5a",text:"Cycle",selected:""},{id:"5b",text:"Bus",selected:""},{id:"5b",text:"Train",selected:""},{id:"5b",text:"London Underground",selected:""},{id:"5c",text:"Motorbike",selected:""},{id:"5d",text:"Car",selected:"selected"}],answerChoice:"Car"},{question:"What kind of car do you drive?",answers:[{id:"5a",text:"City car",selected:""},{id:"5a",text:"Supermini",selected:""},{id:"5b",text:"Small family car",selected:""},{id:"5b",text:"Large family car",selected:""},{id:"5b",text:"Executive",selected:""},{id:"5c",text:"Luxury",selected:""},{id:"5d",text:"Sports car",selected:""},{id:"5d",text:"4x4/SUV",selected:"selected"},{id:"5d",text:"Multi-Purpose Vehicle",selected:""},{id:"5d",text:"Not sure",selected:""}],answerChoice:"4x4/SUV"},{question:"What's the fuel type?",answers:[{id:"5a",text:"Petrol",selected:"selected"},{id:"5a",text:"Diesel",selected:""},{id:"5b",text:"Plug-in Hybrid",selected:""},{id:"5b",text:"Electric Vehicle",selected:""},{id:"5b",text:"Not sure",selected:""}],answerChoice:"Petrol"}],B={Walk:0,Cycle:0,Bus:.103,Train:.036,"London Underground":.028,Motorbike:.101,Car:{"City car":{Petrol:.13525,Diesel:.10837,"Plug-in Hybrid":.02235,"Electric Vehicle":0,"Not sure":.13513},Supermini:{Petrol:.15017,Diesel:.1308,"Plug-in Hybrid":.02235,"Electric Vehicle":0,"Not sure":.14778},"Small family car":{Petrol:.17343,Diesel:.14197,"Plug-in Hybrid":.06588,"Electric Vehicle":0,"Not sure":.15819},"Large family car":{Petrol:.20161,Diesel:.16098,"Plug-in Hybrid":.07309,"Electric Vehicle":0,"Not sure":.17052},Executive:{Petrol:.22699,Diesel:.16735,"Plug-in Hybrid":.0738,"Electric Vehicle":0,"Not sure":.1803},Luxury:{Petrol:.32797,Diesel:.20198,"Plug-in Hybrid":.09285,"Electric Vehicle":0,"Not sure":.25454},"Sports car":{Petrol:.24096,Diesel:.16996,"Plug-in Hybrid":.0773,"Electric Vehicle":0,"Not sure":.23029},"4x4/SUV":{Petrol:.21844,Diesel:.19141,"Plug-in Hybrid":.07503,"Electric Vehicle":0,"Not sure":.19784},"Multi-Purpose Vehicle":{Petrol:.19351,Diesel:.17627,"Plug-in Hybrid":.07503,"Electric Vehicle":0,"Not sure":.18086},"Not sure":{Petrol:.1743,Diesel:.16844,"Plug-in Hybrid":.06995,"Electric Vehicle":0,"Not sure":.1714}}};function I(e,t,n){const o=e.slice();return o[46]=t[n],o}function V(e,t,n){const o=e.slice();return o[49]=t[n],o}function D(e,t,n){const o=e.slice();return o[49]=t[n],o}function G(e,t,n){const o=e.slice();return o[49]=t[n],o}function j(e){let t,n,o,r,i,c=e[49].text+"";return{c(){t=u("option"),n=d(c),o=h(),t.selected=r=e[49].selected,t.__value=i=e[49].text,t.value=t.__value},m(e,r){l(e,t,r),a(t,n),a(t,o)},p(e,o){1&o[0]&&c!==(c=e[49].text+"")&&g(n,c),1&o[0]&&r!==(r=e[49].selected)&&(t.selected=r),1&o[0]&&i!==(i=e[49].text)&&(t.__value=i,t.value=t.__value)},d(e){e&&s(t)}}}function U(e){let t,n,r,i,d,g,x,b,k,C,_,M,T,H,E,$,L,A,P=e[0][1].answers,W=[];for(let t=0;t<P.length;t+=1)W[t]=z(D(e,P,t));let O="Not sure"!=e[0][1].answerChoice&&q(e),N=e[0][2].answers,F=[];for(let t=0;t<N.length;t+=1)F[t]=K(V(e,N,t));return{c(){t=u("p"),t.textContent="What kind of car do you drive?",n=h(),r=u("select");for(let e=0;e<W.length;e+=1)W[e].c();i=h(),O&&O.c(),d=h(),g=u("p"),g.textContent="What's the fuel type?",x=h(),b=u("select");for(let e=0;e<F.length;e+=1)F[e].c();k=h(),C=u("p"),C.textContent="On average, how many people do you ride with?",_=h(),M=u("div"),T=u("div"),H=u("label"),H.textContent="Enter the number of people you share your commute with",E=h(),$=u("input"),w(t,"float","left"),w(t,"margin","0px 50px 0px 0px"),m(r,"class","addressSelect"),m(r,"id","select2"),void 0===e[0][1].answerChoice&&S((()=>e[27].call(r))),w(g,"float","left"),w(g,"margin","0px 50px 0px 0px"),m(b,"class","addressSelect"),m(b,"id","select3"),void 0===e[0][2].answerChoice&&S((()=>e[29].call(b))),w(C,"float","left"),w(C,"margin","0px 50px 0px 0px"),m(H,"class","visuallyhidden"),m(H,"for","shareInput"),m($,"id","shareInput"),m($,"type","number"),m($,"step","0.5"),m($,"min","0"),m($,"max","4"),m(T,"class","input-group"),w(M,"display","flex")},m(o,s){l(o,t,s),l(o,n,s),l(o,r,s);for(let e=0;e<W.length;e+=1)W[e].m(r,null);v(r,e[0][1].answerChoice),l(o,i,s),O&&O.m(o,s),l(o,d,s),l(o,g,s),l(o,x,s),l(o,b,s);for(let e=0;e<F.length;e+=1)F[e].m(b,null);v(b,e[0][2].answerChoice),l(o,k,s),l(o,C,s),l(o,_,s),l(o,M,s),a(M,T),a(T,H),a(T,E),a(T,$),y($,e[1]),L||(A=[p(r,"change",e[27]),p(r,"change",e[28]),p(b,"change",e[29]),p(b,"change",e[30]),p($,"input",e[31])],L=!0)},p(e,t){if(1&t[0]){let n;for(P=e[0][1].answers,n=0;n<P.length;n+=1){const o=D(e,P,n);W[n]?W[n].p(o,t):(W[n]=z(o),W[n].c(),W[n].m(r,null))}for(;n<W.length;n+=1)W[n].d(1);W.length=P.length}if(1&t[0]&&v(r,e[0][1].answerChoice),"Not sure"!=e[0][1].answerChoice?O?O.p(e,t):(O=q(e),O.c(),O.m(d.parentNode,d)):O&&(O.d(1),O=null),1&t[0]){let n;for(N=e[0][2].answers,n=0;n<N.length;n+=1){const o=V(e,N,n);F[n]?F[n].p(o,t):(F[n]=K(o),F[n].c(),F[n].m(b,null))}for(;n<F.length;n+=1)F[n].d(1);F.length=N.length}1&t[0]&&v(b,e[0][2].answerChoice),2&t[0]&&f($.value)!==e[1]&&y($,e[1])},d(e){e&&s(t),e&&s(n),e&&s(r),c(W,e),e&&s(i),O&&O.d(e),e&&s(d),e&&s(g),e&&s(x),e&&s(b),c(F,e),e&&s(k),e&&s(C),e&&s(_),e&&s(M),L=!1,o(A)}}}function z(e){let t,n,o,r,i,c=e[49].text+"";return{c(){t=u("option"),n=d(c),o=h(),t.selected=r=e[49].selected,t.__value=i=e[49].text,t.value=t.__value},m(e,r){l(e,t,r),a(t,n),a(t,o)},p(e,o){1&o[0]&&c!==(c=e[49].text+"")&&g(n,c),1&o[0]&&r!==(r=e[49].selected)&&(t.selected=r),1&o[0]&&i!==(i=e[49].text)&&(t.__value=i,t.value=t.__value)},d(e){e&&s(t)}}}function q(e){let t,n,o,r,i,c,h,p=e[22][e[0][1].answerChoice][0]+"",m=e[22][e[0][1].answerChoice][1]+"";return{c(){t=u("p"),n=d("For example, "),o=u("i"),r=d(p),i=d(" or "),c=u("i"),h=d(m),w(t,"display","inline-block"),w(t,"width","100%")},m(e,s){l(e,t,s),a(t,n),a(t,o),a(o,r),a(t,i),a(t,c),a(c,h)},p(e,t){1&t[0]&&p!==(p=e[22][e[0][1].answerChoice][0]+"")&&g(r,p),1&t[0]&&m!==(m=e[22][e[0][1].answerChoice][1]+"")&&g(h,m)},d(e){e&&s(t)}}}function K(e){let t,n,o,r,i,c=e[49].text+"";return{c(){t=u("option"),n=d(c),o=h(),t.selected=r=e[49].selected,t.__value=i=e[49].text,t.value=t.__value},m(e,r){l(e,t,r),a(t,n),a(t,o)},p(e,o){1&o[0]&&c!==(c=e[49].text+"")&&g(n,c),1&o[0]&&r!==(r=e[49].selected)&&(t.selected=r),1&o[0]&&i!==(i=e[49].text)&&(t.__value=i,t.value=t.__value)},d(e){e&&s(t)}}}function R(e){let t,n,o,r,i,c,h,p,m,f=Math.round(1e3*e[5])+"";return{c(){t=u("p"),t.innerHTML="The average daily round commute by road is <strong>31.4 km</strong>, according to the National Travel Survey.",n=u("p"),o=d("Your vehicle emits approximately "),r=u("strong"),i=d(f),c=d(" grams of CO"),h=u("sub"),h.textContent="2",p=d("e"),m=d(" per kilometre."),w(t,"display","inline-block")},m(e,s){l(e,t,s),l(e,n,s),a(n,o),a(n,r),a(r,i),a(r,c),a(r,h),a(r,p),a(n,m)},p(e,t){32&t[0]&&f!==(f=Math.round(1e3*e[5])+"")&&g(i,f)},d(e){e&&s(t),e&&s(n)}}}function Y(t){let n,o;return{c(){n=u("p"),n.innerHTML="The average daily round commute by road is <strong>31.4 km</strong>, according to the National Travel Survey.",o=u("p"),o.innerHTML="Riding a motorbike to work emits about <strong>101 grams of CO<sub>2</sub>e</strong> per kilometre.",w(n,"display","inline-block")},m(e,t){l(e,n,t),l(e,o,t)},p:e,d(e){e&&s(n),e&&s(o)}}}function J(t){let n,o;return{c(){n=u("p"),n.innerHTML="The average daily round commute by rail is <strong>55.0 km</strong>, according to the National Travel Survey.",o=u("p"),o.innerHTML="Taking the tube to work emits, on average, <strong>28 grams of CO<sub>2</sub>e</strong> per kilometre for each passenger, depending on how full the tube is.",w(n,"display","inline-block")},m(e,t){l(e,n,t),l(e,o,t)},p:e,d(e){e&&s(n),e&&s(o)}}}function Z(t){let n,o;return{c(){n=u("p"),n.innerHTML="The average daily round commute by rail is <strong>55.0 km</strong>, according to the National Travel Survey.",o=u("p"),o.innerHTML="Taking the train to work emits, on average, <strong>36 grams of CO<sub>2</sub>e</strong> per kilometre for each passenger, depending on how full the train is.",w(n,"display","inline-block")},m(e,t){l(e,n,t),l(e,o,t)},p:e,d(e){e&&s(n),e&&s(o)}}}function Q(t){let n,o,r;return{c(){n=u("p"),n.innerHTML="The average daily round commute is <strong>17.1 km</strong> for people who take the bus, according to the National Travel Survey.",o=u("p"),o.innerHTML="Taking the bus to work emits approximately <strong>103 grams of CO<sub>2</sub>e</strong> per kilometre for each passenger.",r=u("p"),w(n,"display","inline-block")},m(e,t){l(e,n,t),l(e,o,t),l(e,r,t)},p:e,d(e){e&&s(n),e&&s(o),e&&s(r)}}}function X(t){let n,o;return{c(){n=u("p"),n.innerHTML="The average daily round commute is <strong>10.6 km</strong> for those who cycle to work, according to the National Travel Survey.",o=u("p"),o.textContent="Cycling to work emits no greenhouse gas, although bike manufacturing produces some greenhouse gas, as does producing the food needed for energy to cycle.",w(n,"display","inline-block")},m(e,t){l(e,n,t),l(e,o,t)},p:e,d(e){e&&s(n),e&&s(o)}}}function ee(t){let n,o;return{c(){n=u("p"),n.innerHTML="The average daily round commute is <strong>2.9 km</strong> for those who walk to work, according to the National Travel Survey.",o=u("p"),o.textContent="Walking to work emits no greenhouse gas, although GHG is emitted during the production of the food that provides the required calories.",w(n,"display","inline-block")},m(e,t){l(e,n,t),l(e,o,t)},p:e,d(e){e&&s(n),e&&s(o)}}}function te(e){let t,n,i,c,d,f,g,w;return{c(){t=u("div"),n=u("label"),n.textContent="Enter your vehicle's fuel consumption rate",i=h(),c=u("input"),d=h(),f=u("button"),f.textContent="Enter",m(n,"class","visuallyhidden"),m(n,"for","fuelInput"),m(c,"class","typedInput"),m(c,"id","fuelInput"),m(c,"placeholder","Grams of CO2e per kilometre"),m(f,"id","cavBut"),m(t,"class","input-group")},m(o,s){l(o,t,s),a(t,n),a(t,i),a(t,c),y(c,e[7]),a(t,d),a(t,f),g||(w=[p(c,"input",e[32]),p(f,"click",(function(){r(e[23](e[7]))&&e[23](e[7]).apply(this,arguments)}))],g=!0)},p(t,n){e=t,128&n[0]&&c.value!==e[7]&&y(c,e[7])},d(e){e&&s(t),g=!1,o(w)}}}function ne(e){let t,n,o,r,i,c,h,p,m,f,y,w=Math.round(e[4]*e[3]/(e[1]+1)*10)/10+"",v="Car"==e[0][0].answerChoice&&re(e);return{c(){t=u("p"),n=d("Commuting "),o=u("strong"),r=d(e[3]),i=d(" km"),c=d(",\n\t\t\t\t  "),v&&v.c(),h=d("\n\t\t\t\t  you will emit "),p=u("strong"),m=d(w),f=d(" kg of GHG"),y=d(".")},m(e,s){l(e,t,s),a(t,n),a(t,o),a(o,r),a(o,i),a(t,c),v&&v.m(t,null),a(t,h),a(t,p),a(p,m),a(p,f),a(t,y)},p(e,n){8&n[0]&&g(r,e[3]),"Car"==e[0][0].answerChoice?v?v.p(e,n):(v=re(e),v.c(),v.m(t,h)):v&&(v.d(1),v=null),26&n[0]&&w!==(w=Math.round(e[4]*e[3]/(e[1]+1)*10)/10+"")&&g(m,w)},d(e){e&&s(t),v&&v.d()}}}function oe(e){let t,n,o,r,i,c,h,p,m=70*e[3]+"";return{c(){t=u("p"),n=d("Commuting "),o=u("strong"),r=d(e[3]),i=d(" km"),c=d(", you will burn about "),h=d(m),p=d(" calories, depending on the speed you walk and other metabolic factors.")},m(e,s){l(e,t,s),a(t,n),a(t,o),a(o,r),a(o,i),a(t,c),a(t,h),a(t,p)},p(e,t){8&t[0]&&g(r,e[3]),8&t[0]&&m!==(m=70*e[3]+"")&&g(h,m)},d(e){e&&s(t)}}}function re(e){let t,n,o,r,i,a=e[25][e[1]]+"",c=ge(e[1])+"";return{c(){t=d("sharing your journey with, on average, "),n=d(a),o=d(" other"),r=d(c),i=d(", individually")},m(e,a){l(e,t,a),l(e,n,a),l(e,o,a),l(e,r,a),l(e,i,a)},p(e,t){2&t[0]&&a!==(a=e[25][e[1]]+"")&&g(n,a),2&t[0]&&c!==(c=ge(e[1])+"")&&g(r,c)},d(e){e&&s(t),e&&s(n),e&&s(o),e&&s(r),e&&s(i)}}}function ie(e){let t,n,o,r,i,c,h,p,m,f,y,w,v=e[25][e[2]]+"",x=ge(e[2])+"",b=Math.round(10*e[17])/10+"";return{c(){t=u("p"),n=d("Avoiding your commute "),o=d(v),r=d(" day"),i=d(x),c=d(" per week, you will save  "),h=u("strong"),p=d(b),m=d(" kg CO"),f=u("sub"),f.textContent="2",y=d("e"),w=d(" in a typical year of 44 working weeks.")},m(e,s){l(e,t,s),a(t,n),a(t,o),a(t,r),a(t,i),a(t,c),a(t,h),a(h,p),a(h,m),a(h,f),a(h,y),a(t,w)},p(e,t){4&t[0]&&v!==(v=e[25][e[2]]+"")&&g(o,v),4&t[0]&&x!==(x=ge(e[2])+"")&&g(i,x),131072&t[0]&&b!==(b=Math.round(10*e[17])/10+"")&&g(p,b)},d(e){e&&s(t)}}}function ae(e){let t,n,o,r,i,c,p,m,f,y,w,v,x,b,k,C,_=e[25][e[2]]+"",M=ge(e[2])+"",T=44*e[2]*e[3]*70+"",H=Math.round(4*e[2]*e[3]*70*4.965/1e3*10)/10+"";return{c(){t=u("p"),n=d("Avoiding your commute "),o=d(_),r=d(" day"),i=d(M),c=d(" per week, you will save "),p=d(T),m=d(" calories in a typical year of 44 working weeks. If you consumed a diet of beef, cheese, rice and peas, "),f=u("strong"),y=d(H),w=d(" kg CO"),v=u("sub"),v.textContent="2",x=d("e"),b=d(" would be emitted in food production."),k=h(),C=u("p"),C.textContent="The same amount of calories may still be consumed when working from home and the walk to work may be replaced with recreational exercise."},m(e,s){l(e,t,s),a(t,n),a(t,o),a(t,r),a(t,i),a(t,c),a(t,p),a(t,m),a(t,f),a(f,y),a(f,w),a(f,v),a(f,x),a(t,b),l(e,k,s),l(e,C,s)},p(e,t){4&t[0]&&_!==(_=e[25][e[2]]+"")&&g(o,_),4&t[0]&&M!==(M=ge(e[2])+"")&&g(i,M),12&t[0]&&T!==(T=44*e[2]*e[3]*70+"")&&g(p,T),12&t[0]&&H!==(H=Math.round(4*e[2]*e[3]*70*4.965/1e3*10)/10+"")&&g(y,H)},d(e){e&&s(t),e&&s(k),e&&s(C)}}}function le(e){let t,n,o=Array(+(e[17]/.87/.06/24).toFixed(0)).fill(0).map(e[36]).join("")+"";return{c(){t=u("p"),n=d(o),w(t,"font-size","xx-large")},m(e,o){l(e,t,o),a(t,n)},p(e,t){131072&t[0]&&o!==(o=Array(+(e[17]/.87/.06/24).toFixed(0)).fill(0).map(e[36]).join("")+"")&&g(n,o)},d(e){e&&s(t)}}}function se(e){let t,n,o=Array(+(4*e[2]*e[3]*70*4.965/1e3/.87/.06/24).toFixed(0)).fill(0).map(e[35]).join("")+"";return{c(){t=u("p"),n=d(o),w(t,"font-size","xx-large")},m(e,o){l(e,t,o),a(t,n)},p(e,t){12&t[0]&&o!==(o=Array(+(4*e[2]*e[3]*70*4.965/1e3/.87/.06/24).toFixed(0)).fill(0).map(e[35]).join("")+"")&&g(n,o)},d(e){e&&s(t)}}}function ce(e){let t,n,o,r,i,c,d,f,g=e[10]&&ue(e);return{c(){t=u("div"),n=u("p"),n.innerHTML="<strong>Please enter a full and valid post code.</strong>",o=h(),r=u("p"),r.textContent="If there is no publicly avaiable data for your address consider looking at a nearby property of similar size.",i=u("button"),i.textContent="Or manually enter your heating costs",c=h(),g&&g.c(),m(i,"id","cavBut"),w(t,"background-color","#EAEAEA"),w(t,"padding","16px 16px"),w(t,"margin-bottom","16px")},m(s,u){l(s,t,u),a(t,n),a(t,o),a(t,r),a(t,i),a(t,c),g&&g.m(t,null),d||(f=p(i,"click",e[19]),d=!0)},p(e,n){e[10]?g?g.p(e,n):(g=ue(e),g.c(),g.m(t,null)):g&&(g.d(1),g=null)},d(e){e&&s(t),g&&g.d(),d=!1,f()}}}function ue(e){let t,n,i,c,d,f,g,w;return{c(){t=u("div"),n=u("label"),n.textContent="Enter your average annual heating costs",i=h(),c=u("input"),d=h(),f=u("button"),f.textContent="Search",m(n,"class","visuallyhidden"),m(n,"for","costOfHeat"),m(c,"id","costOfHeat"),m(c,"class","typedInput"),m(c,"placeholder","Average annual cost of heating (GBP)"),m(f,"id","cavBut"),m(t,"class","input-group")},m(o,s){l(o,t,s),a(t,n),a(t,i),a(t,c),y(c,e[8]),a(t,d),a(t,f),g||(w=[p(c,"input",e[38]),p(f,"click",(function(){r(e[8])&&e[8].apply(this,arguments)}))],g=!0)},p(t,n){e=t,256&n[0]&&c.value!==e[8]&&y(c,e[8])},d(e){e&&s(t),g=!1,o(w)}}}function de(e){let t,n,r,i,d,f,g,y,x,b,k,C,_=e[16],M=[];for(let t=0;t<_.length;t+=1)M[t]=he(I(e,_,t));let T=e[10]&&pe(e);return{c(){t=u("form"),n=u("select"),r=u("option"),r.textContent="Select an address\n\t\t\t\t\t\t  ";for(let e=0;e<M.length;e+=1)M[e].c();i=h(),d=u("br"),f=h(),g=u("div"),y=u("p"),y.textContent="If there is no publicly avaiable data for your address consider looking at a nearby property of similar size.",x=u("button"),x.textContent="Or manually enter your heating costs",b=h(),T&&T.c(),r.__value="",r.value=r.__value,r.disabled=!0,r.selected=!0,m(n,"class","addressSelect"),m(n,"id","select4"),void 0===e[15]&&S((()=>e[39].call(n))),m(t,"class","addressForm"),m(x,"id","cavBut"),w(g,"background-color","#EAEAEA"),w(g,"padding","16px 16px"),w(g,"margin-bottom","16px")},m(o,s){l(o,t,s),a(t,n),a(n,r);for(let e=0;e<M.length;e+=1)M[e].m(n,null);v(n,e[15]),l(o,i,s),l(o,d,s),l(o,f,s),l(o,g,s),a(g,y),a(g,x),a(g,b),T&&T.m(g,null),k||(C=[p(n,"change",e[39]),p(n,"blur",e[40]),p(n,"change",e[41]),p(x,"click",e[19])],k=!0)},p(e,t){if(65536&t[0]){let o;for(_=e[16],o=0;o<_.length;o+=1){const r=I(e,_,o);M[o]?M[o].p(r,t):(M[o]=he(r),M[o].c(),M[o].m(n,null))}for(;o<M.length;o+=1)M[o].d(1);M.length=_.length}98304&t[0]&&v(n,e[15]),e[10]?T?T.p(e,t):(T=pe(e),T.c(),T.m(g,null)):T&&(T.d(1),T=null)},d(e){e&&s(t),c(M,e),e&&s(i),e&&s(d),e&&s(f),e&&s(g),T&&T.d(),k=!1,o(C)}}}function he(e){let t,n,o,r,i=e[46].address+"";return{c(){t=u("option"),n=d(i),o=h(),t.__value=r=e[46],t.value=t.__value},m(e,r){l(e,t,r),a(t,n),a(t,o)},p(e,o){65536&o[0]&&i!==(i=e[46].address+"")&&g(n,i),65536&o[0]&&r!==(r=e[46])&&(t.__value=r,t.value=t.__value)},d(e){e&&s(t)}}}function pe(e){let t,n,i,c,d,f,g,w;return{c(){t=u("div"),n=u("label"),n.textContent="Enter your average annual heating costs",i=h(),c=u("input"),d=h(),f=u("button"),f.textContent="Search",m(n,"class","visuallyhidden"),m(n,"for","costOfHeat2"),m(c,"id","costOfHeat2"),m(c,"class","typedInput"),m(c,"placeholder","Average annual cost of heating (GBP)"),m(f,"id","cavBut"),m(t,"class","input-group")},m(o,s){l(o,t,s),a(t,n),a(t,i),a(t,c),y(c,e[8]),a(t,d),a(t,f),g||(w=[p(c,"input",e[42]),p(f,"click",(function(){r(e[8])&&e[8].apply(this,arguments)}))],g=!0)},p(t,n){e=t,256&n[0]&&c.value!==e[8]&&y(c,e[8])},d(e){e&&s(t),g=!1,o(w)}}}function me(e){let t,n,o,r,i,c,p,f,y,w,v,x,b,k,C,_,M,T,H,E,S,$,L,A,P,W,O,N,F,B,I,V,D=e[15]["total-floor-area"]+"",G=e[15]["property-type"].toLowerCase()+"",j=e[15]["number-heated-rooms"]+"",U=e[15]["co2-emissions-current"]+"",z=e[15]["heating-cost-current"]+"",q=6.966*e[15]["heating-cost-current"]+"",K=6.966*e[15]["heating-cost-current"]/2618+"";return{c(){t=u("div"),n=u("p"),o=d("According to "),r=u("a"),r.textContent="Energy Performance of Buildings Data",i=d(", this "),c=d(D),p=d(" m"),f=u("sup"),f.textContent="2",y=h(),w=d(G),v=d(" has "),x=d(j),b=d(" heated rooms and emits about "),k=d(U),C=d(" tonnes of CO"),_=u("sub"),_.textContent="2",M=d(" in an average year."),T=h(),H=u("p"),E=d("Heating this property costs approximately £"),S=d(z),$=d(" per year, producing about "),L=d(q),A=d(" kgCO"),P=u("sub"),P.textContent="2",W=d("e (based on DEFRA's conversion factors).\n\t\t\t\t\t  "),O=u("p"),N=d("This property emits approximately "),F=d(K),B=d(" kgCO"),I=u("sub"),I.textContent="2",V=d("e for each hour the heating is switched on."),m(r,"href","https://epc.opendatacommunities.org/")},m(e,s){l(e,t,s),a(t,n),a(n,o),a(n,r),a(n,i),a(n,c),a(n,p),a(n,f),a(n,y),a(n,w),a(n,v),a(n,x),a(n,b),a(n,k),a(n,C),a(n,_),a(n,M),a(t,T),a(t,H),a(H,E),a(H,S),a(H,$),a(H,L),a(H,A),a(H,P),a(H,W),a(t,O),a(O,N),a(O,F),a(O,B),a(O,I),a(O,V)},p(e,t){32768&t[0]&&D!==(D=e[15]["total-floor-area"]+"")&&g(c,D),32768&t[0]&&G!==(G=e[15]["property-type"].toLowerCase()+"")&&g(w,G),32768&t[0]&&j!==(j=e[15]["number-heated-rooms"]+"")&&g(x,j),32768&t[0]&&U!==(U=e[15]["co2-emissions-current"]+"")&&g(k,U),32768&t[0]&&z!==(z=e[15]["heating-cost-current"]+"")&&g(S,z),32768&t[0]&&q!==(q=6.966*e[15]["heating-cost-current"]+"")&&g(L,q),32768&t[0]&&K!==(K=6.966*e[15]["heating-cost-current"]/2618+"")&&g(F,K)},d(e){e&&s(t)}}}function fe(t){let n,i,x,b,k,C,_,M,T,H,E,$,L,A,P,W,O,N,F,B,I,V,D,z,q,K,re,ue,he,pe,fe,ge,ye,we,ve,xe,be,ke,Ce,_e,Me,Te,He,Ee,Se,$e,Le,Ae,Pe,We,Oe,Ne,Fe,Be,Ie,Ve,De,Ge,je,Ue,ze,qe,Ke,Re,Ye,Je,Ze,Qe,Xe,et,tt,nt,ot,rt,it,at,lt,st,ct,ut,dt,ht,pt,mt,ft,gt,yt,wt,vt,xt,bt,kt,Ct,_t,Mt,Tt,Ht,Et,St,$t,Lt,At,Pt,Wt,Ot,Nt,Ft,Bt,It,Vt,Dt,Gt,jt=("Walk"==t[0][0].answerChoice?Math.round(4*t[2]*t[3]*70*4.965/1e3*10)/10:Math.round(44*t[2]*(t[4]*t[3])/(t[1]+1)*10)/10)+"",Ut=("Walk"==t[0][0].answerChoice?Math.round(4*t[2]*t[3]*70*4.965/1e3/.87*10)/10:Math.round(t[17]/.87*10)/10)+"",zt=("Walk"==t[0][0].answerChoice?Math.round(4*t[2]*t[3]*70*4.965/1e3/.87/.06/24):Math.round(t[17]/.87/.06/24))+"",qt=("Walk"==t[0][0].answerChoice?(4*t[2]*t[3]*70*4.965/1e3/22).toFixed(0):(t[17]/22).toFixed(0))+"",Kt=("Walk"==t[0][0].answerChoice?Math.round(4*t[2]*t[3]*70*4.965/1e3*10)/10:Math.round(10*t[17])/10)+"",Rt=Array(+(t[17]/22).toFixed(0)).fill(0).map(t[44]).join("")+"",Yt=t[0][0].answers,Jt=[];for(let e=0;e<Yt.length;e+=1)Jt[e]=j(G(t,Yt,e));let Zt="Car"==t[0][0].answerChoice&&U(t);function Qt(e,t){return"Walk"==e[0][0].answerChoice?ee:"Cycle"==e[0][0].answerChoice?X:"Bus"==e[0][0].answerChoice?Q:"Train"==e[0][0].answerChoice?Z:"London Underground"==e[0][0].answerChoice?J:"Motorbike"==e[0][0].answerChoice?Y:R}let Xt=Qt(t),en=Xt(t),tn=t[9]&&te(t);function nn(e,t){return"Walk"==e[0][0].answerChoice?oe:ne}let on=nn(t),rn=on(t);function an(e,t){return"Walk"==e[0][0].answerChoice?ae:ie}let ln=an(t),sn=ln(t);function cn(e,t){return"Walk"==e[0][0].answerChoice?se:le}let un=cn(t),dn=un(t),hn=t[13]&&ce(t),pn=t[11]&&de(t),mn=t[12]&&me(t);return{c(){n=u("main"),i=u("div"),x=u("div"),b=u("article"),k=u("div"),k.innerHTML='<section><header><h2>Will working from home cut UK emissions?</h2></header> \n\t\t\t  <p>Most people (85%) who worked from home during the pandemic want to use a &quot;hybrid&quot; approach of both home and office work in future, <a href="https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/articles/businessandindividualattitudestowardsthefutureofhomeworkinguk/apriltomay2021" target="_blank">according to BICS data</a></p> \n\t\t\t  <p>However, there was some uncertainty among businesses, with 32% stating they were not sure what proportion of the workforce will be working from their usual place of work, and 38% expected the majority of their workforce to come back.</p> \n\t\t\t  <p>It is unclear whether continued remote working will reduce or increase UK emissions but individuals can estimate the impact of working from home on their household emissions.</p> \n\t\t\t  <p>Those with longer commutes on the road and lower levels of home energy consumption are more likely to see a reduction in emissions for each day they work from home.</p></section>',C=h(),_=u("div"),M=u("section"),T=u("header"),T.innerHTML="<h3>The commute</h3>",H=h(),E=u("form"),$=u("p"),$.textContent="How do you travel to work?",L=h(),A=u("select");for(let e=0;e<Jt.length;e+=1)Jt[e].c();P=h(),Zt&&Zt.c(),W=h(),en.c(),O=h(),N=u("div"),F=u("p"),F.textContent="If your vehicle type isn't listed you can manually enter your vehicle's fuel consumption rate.",B=u("p"),B.innerHTML='The <a href="https://carfueldata.vehicle-certification-agency.gov.uk">Vehicle Certification Agency</a> has information about the fuel consumption rate of different vehicles.',I=u("button"),I.textContent="Enter your vehicle's fuel consumption rate",V=h(),tn&&tn.c(),D=h(),z=u("p"),z.innerHTML="<strong>How far is your daily round commute?</strong>",q=h(),K=u("div"),re=u("div"),ue=u("label"),ue.textContent="Specify the length of your round commute",he=h(),pe=u("input"),fe=h(),rn.c(),ge=h(),ye=u("p"),ye.textContent="How many days will you work from home each week?",we=h(),ve=u("div"),xe=u("div"),be=u("label"),be.textContent="Enter the amount of days you will work from home each week",ke=h(),Ce=u("input"),_e=h(),sn.c(),Me=h(),Te=u("div"),He=u("p"),Ee=d(jt),Se=d(" \n\t\t\t\t  kg CO2e can generate about "),$e=d(Ut),Le=d(" KWh of electricity from coal, enough to power a 60 Watt "),Ae=u("strong"),Pe=d("light bulb for about "),We=d(zt),Oe=d(" days"),Ne=d(" (24 hour)."),Fe=h(),dn.c(),Be=h(),Ie=u("div"),Ve=u("section"),De=u("h3"),De.textContent="The remote workplace",Ge=h(),je=u("p"),je.textContent="For many home workers, the GHG emissions saved on commuting will be lost to heating their home while their usual place of work is being ran at reduced capacity.",Ue=h(),ze=u("h4"),ze.innerHTML="How much CO<sub>2</sub> is produced by your home&#39;s heating system?",qe=h(),Ke=u("div"),Re=u("div"),Ye=u("label"),Ye.textContent="Enter a full English or Welsh postcode",Je=h(),Ze=u("input"),Qe=h(),Xe=u("button"),Xe.textContent="Search",et=h(),hn&&hn.c(),tt=h(),pn&&pn.c(),nt=h(),mn&&mn.c(),ot=h(),rt=u("p"),rt.textContent="The amount of time remote workers choose to heat their home will be crucial in determining their household emissions.",it=h(),at=u("p"),at.innerHTML="<strong>How many extra hours will you heat your house?</strong>",lt=h(),st=u("div"),ct=u("div"),ut=u("label"),ut.textContent="Specify the length of your round commute",dt=h(),ht=u("input"),pt=h(),mt=u("p"),ft=d("Heating the average house for an additional "),gt=u("strong"),yt=d(t[6]),wt=d(" hours"),vt=d(" each home working day, twice per week per day, you would use an additional 332,112kg of GHG in a typical year of 44 working weeks."),xt=h(),bt=u("div"),kt=u("p"),Ct=d("A mature tree can absorb around "),_t=u("strong"),_t.innerHTML="22 kg of CO<sub>2</sub>",Mt=d(" per year. Therefore, you would need to plant about "),Tt=u("strong"),Ht=d(qt),Et=d(" trees"),St=d(" per year in order to save "),$t=u("strong"),Lt=d(Kt),At=d(" kg CO"),Pt=u("sub"),Pt.textContent="2",Wt=d("e"),Ot=d("."),Nt=h(),Ft=u("p"),Bt=d(Rt),It=h(),Vt=u("div"),Vt.innerHTML="<section><p>In one year working from home 3 days every week you would approximately save xx tonnes of GHG</p> \n\t\t\t  <p>This makes up about 12% of the total emissions of the average person in the UK.</p> \n\t\t\t  <p>Heating only the room you are working in, working at local hubs and seasonal commuting patterns (travelling to work in the winter) could all prove to be environmentally friendly options for the future of work.</p></section>",m(k,"class","section__content--markdown"),w($,"float","left"),w($,"margin","0px 50px 0px 0px"),m(A,"class","addressSelect"),m(A,"id","select1"),void 0===t[0][0].answerChoice&&S((()=>t[26].call(A))),w(E,"float","left"),m(I,"id","cavBut"),w(N,"background-color","#EAEAEA"),w(N,"padding","16px 16px"),w(N,"margin-bottom","16px"),w(N,"padding","20px"),m(ue,"class","visuallyhidden"),m(ue,"for","commSlide"),m(pe,"class","slider"),m(pe,"id","commSlide"),m(pe,"type","range"),m(pe,"step","1"),m(pe,"min","0"),m(pe,"max","300"),m(re,"class","input-group"),m(K,"id","slide-cont"),w(ye,"float","left"),w(ye,"margin","0px 50px 0px 0px"),m(be,"class","visuallyhidden"),m(be,"for","wfhDpW"),m(Ce,"id","wfhDpW"),m(Ce,"type","number"),m(Ce,"step","1"),m(Ce,"min","0"),m(Ce,"max","5"),m(xe,"class","input-group"),w(ve,"display","flex"),m(Te,"class","green"),m(_,"class","section__content--markdown"),m(Ye,"class","visuallyhidden"),m(Ye,"for","postcodeInput"),m(Ze,"id","postcodeInput"),m(Ze,"class","typedInput"),m(Ze,"placeholder","Enter a postcode (England or Wales)"),m(Xe,"id","postcodeSearch"),m(Re,"class","input-group"),m(ut,"class","visuallyhidden"),m(ut,"for","hoursSlide"),m(ht,"class","slider"),m(ht,"id","hoursSlide"),m(ht,"type","range"),m(ht,"step","1"),m(ht,"min","0"),m(ht,"max","24"),m(ct,"class","input-group"),m(st,"id","slide-cont"),w(Ft,"font-size","xx-large"),m(bt,"class","green"),m(Ie,"class","section__content--markdown"),m(Vt,"class","section__content--markdown"),m(b,"class","col"),m(x,"class","col-wrap"),m(i,"class","wrapper")},m(e,o){l(e,n,o),a(n,i),a(i,x),a(x,b),a(b,k),a(b,C),a(b,_),a(_,M),a(M,T),a(M,H),a(M,E),a(E,$),a(E,L),a(E,A);for(let e=0;e<Jt.length;e+=1)Jt[e].m(A,null);v(A,t[0][0].answerChoice),a(E,P),Zt&&Zt.m(E,null),a(M,W),en.m(M,null),a(M,O),a(M,N),a(N,F),a(N,B),a(N,I),a(N,V),tn&&tn.m(N,null),a(M,D),a(M,z),a(M,q),a(M,K),a(K,re),a(re,ue),a(re,he),a(re,pe),y(pe,t[3]),a(M,fe),rn.m(M,null),a(M,ge),a(M,ye),a(M,we),a(M,ve),a(ve,xe),a(xe,be),a(xe,ke),a(xe,Ce),y(Ce,t[2]),a(M,_e),sn.m(M,null),a(M,Me),a(M,Te),a(Te,He),a(He,Ee),a(He,Se),a(He,$e),a(He,Le),a(He,Ae),a(Ae,Pe),a(Ae,We),a(Ae,Oe),a(He,Ne),a(Te,Fe),dn.m(Te,null),a(b,Be),a(b,Ie),a(Ie,Ve),a(Ve,De),a(Ve,Ge),a(Ve,je),a(Ve,Ue),a(Ve,ze),a(Ve,qe),a(Ve,Ke),a(Ke,Re),a(Re,Ye),a(Re,Je),a(Re,Ze),y(Ze,t[14]),a(Re,Qe),a(Re,Xe),a(Ve,et),hn&&hn.m(Ve,null),a(Ve,tt),pn&&pn.m(Ve,null),a(Ve,nt),mn&&mn.m(Ve,null),a(Ve,ot),a(Ve,rt),a(Ve,it),a(Ve,at),a(Ve,lt),a(Ve,st),a(st,ct),a(ct,ut),a(ct,dt),a(ct,ht),y(ht,t[6]),a(Ve,pt),a(Ve,mt),a(mt,ft),a(mt,gt),a(gt,yt),a(gt,wt),a(mt,vt),a(Ve,xt),a(Ve,bt),a(bt,kt),a(kt,Ct),a(kt,_t),a(kt,Mt),a(kt,Tt),a(Tt,Ht),a(Tt,Et),a(kt,St),a(kt,$t),a($t,Lt),a($t,At),a($t,Pt),a($t,Wt),a(kt,Ot),a(bt,Nt),a(bt,Ft),a(Ft,Bt),a(b,It),a(b,Vt),Dt||(Gt=[p(A,"change",t[26]),p(A,"change",t[24]),p(I,"click",t[18]),p(pe,"change",t[33]),p(pe,"input",t[33]),p(Ce,"input",t[34]),p(Ze,"input",t[37]),p(Xe,"click",(function(){r(t[20](t[14]))&&t[20](t[14]).apply(this,arguments)})),p(ht,"change",t[43]),p(ht,"input",t[43])],Dt=!0)},p(e,n){if(t=e,1&n[0]){let e;for(Yt=t[0][0].answers,e=0;e<Yt.length;e+=1){const o=G(t,Yt,e);Jt[e]?Jt[e].p(o,n):(Jt[e]=j(o),Jt[e].c(),Jt[e].m(A,null))}for(;e<Jt.length;e+=1)Jt[e].d(1);Jt.length=Yt.length}1&n[0]&&v(A,t[0][0].answerChoice),"Car"==t[0][0].answerChoice?Zt?Zt.p(t,n):(Zt=U(t),Zt.c(),Zt.m(E,null)):Zt&&(Zt.d(1),Zt=null),Xt===(Xt=Qt(t))&&en?en.p(t,n):(en.d(1),en=Xt(t),en&&(en.c(),en.m(M,O))),t[9]?tn?tn.p(t,n):(tn=te(t),tn.c(),tn.m(N,null)):tn&&(tn.d(1),tn=null),8&n[0]&&y(pe,t[3]),on===(on=nn(t))&&rn?rn.p(t,n):(rn.d(1),rn=on(t),rn&&(rn.c(),rn.m(M,ge))),4&n[0]&&f(Ce.value)!==t[2]&&y(Ce,t[2]),ln===(ln=an(t))&&sn?sn.p(t,n):(sn.d(1),sn=ln(t),sn&&(sn.c(),sn.m(M,Me))),31&n[0]&&jt!==(jt=("Walk"==t[0][0].answerChoice?Math.round(4*t[2]*t[3]*70*4.965/1e3*10)/10:Math.round(44*t[2]*(t[4]*t[3])/(t[1]+1)*10)/10)+"")&&g(Ee,jt),131085&n[0]&&Ut!==(Ut=("Walk"==t[0][0].answerChoice?Math.round(4*t[2]*t[3]*70*4.965/1e3/.87*10)/10:Math.round(t[17]/.87*10)/10)+"")&&g($e,Ut),131085&n[0]&&zt!==(zt=("Walk"==t[0][0].answerChoice?Math.round(4*t[2]*t[3]*70*4.965/1e3/.87/.06/24):Math.round(t[17]/.87/.06/24))+"")&&g(We,zt),un===(un=cn(t))&&dn?dn.p(t,n):(dn.d(1),dn=un(t),dn&&(dn.c(),dn.m(Te,null))),16384&n[0]&&Ze.value!==t[14]&&y(Ze,t[14]),t[13]?hn?hn.p(t,n):(hn=ce(t),hn.c(),hn.m(Ve,tt)):hn&&(hn.d(1),hn=null),t[11]?pn?pn.p(t,n):(pn=de(t),pn.c(),pn.m(Ve,nt)):pn&&(pn.d(1),pn=null),t[12]?mn?mn.p(t,n):(mn=me(t),mn.c(),mn.m(Ve,ot)):mn&&(mn.d(1),mn=null),64&n[0]&&y(ht,t[6]),64&n[0]&&g(yt,t[6]),131085&n[0]&&qt!==(qt=("Walk"==t[0][0].answerChoice?(4*t[2]*t[3]*70*4.965/1e3/22).toFixed(0):(t[17]/22).toFixed(0))+"")&&g(Ht,qt),131085&n[0]&&Kt!==(Kt=("Walk"==t[0][0].answerChoice?Math.round(4*t[2]*t[3]*70*4.965/1e3*10)/10:Math.round(10*t[17])/10)+"")&&g(Lt,Kt),131072&n[0]&&Rt!==(Rt=Array(+(t[17]/22).toFixed(0)).fill(0).map(t[44]).join("")+"")&&g(Bt,Rt)},i:e,o:e,d(e){e&&s(n),c(Jt,e),Zt&&Zt.d(),en.d(),tn&&tn.d(),rn.d(),sn.d(),dn.d(),hn&&hn.d(),pn&&pn.d(),mn&&mn.d(),Dt=!1,o(Gt)}}}function ge(e){return 1==e?"":"s"}function ye(e,t,n){let o,r,i,a=F;console.log("input",a);let l,s,c=1,u=5,d=1,h=!1;let p=!1;let m,g,y=!1,w=!1,v=!1,b="";function k(){n(12,w=!0),console.log("selectAd",m)}let C={Walk:2.9,Cycle:10.6,Bus:17.1,Train:55,"London Underground":55,Motorbike:31.4,Car:31.4},_=C[a[0].answerChoice];return e.$$.update=()=>{1&e.$$.dirty[0]&&n(5,o=B.Car[a[1].answerChoice][a[2].answerChoice]),33&e.$$.dirty[0]&&n(4,r="Car"==a[0].answerChoice?o:B[a[0].answerChoice]),30&e.$$.dirty[0]&&n(17,i=44*d*(r*_)/(c+1))},[a,c,d,_,r,o,u,l,s,h,p,y,w,v,b,m,g,i,function(){n(9,h=!h)},function(){n(10,p=!p)},function(e){let t="https://epc.opendatacommunities.org/api/v1/domestic/search?postcode="+e.replace(/\s/g,"");fetch(t,{method:"get",headers:new Headers({Authorization:"Basic dGhlb2pvbGxpZmZlQGdtYWlsLmNvbTpjOTFlMWEzMzRjNTk4NDg0MTlmYTdjYTkwM2I5ZTdkOGQxMjJiMWU3",Accept:"application/json"})}).then((e=>{if(e.ok)return e.json();throw new Error("Something went wrong")})).then((e=>{n(13,v=!1),console.log("EPC DATA",e.rows),n(16,g=e.rows),n(11,y=!0)})).catch((e=>{n(13,v=!0),console.log(e)}))},k,{"City car":["Citroën C1","Fiat Panda"],Supermini:["Ford Fiesta","Renault CLIO"],"Small family car":["Volkswagen Golf","Ford Focus"],"Large family car":["BMW 3 Series","ŠKODA Octavia"],Executive:["BMW 5 Series","Audi A5"],Luxury:["Jaguar XF","Mercedes-Benz S-Class"],"Sports car":["Mercedes-Benz SLK","Porsche 911"],"4x4/SUV":["Suzuki Jimny","Land Rover Discovery"],"Multi-Purpose Vehicle":["Ford C-Max","Renault Scenic"]},function(e){n(4,r=e/1e3)},function(){n(3,_=C[a[0].answerChoice])},{0:"no",.5:"0.5",1:"one",1.5:"one and a half",2:"two",2.5:"two and a half",3:"three",3.5:"three and a half",4:"four",5:"five"},function(){a[0].answerChoice=x(this),n(0,a)},function(){a[1].answerChoice=x(this),n(0,a)},e=>{},function(){a[2].answerChoice=x(this),n(0,a)},e=>{},function(){c=f(this.value),n(1,c)},function(){l=this.value,n(7,l)},function(){_=f(this.value),n(3,_)},function(){d=f(this.value),n(2,d)},e=>"💡",e=>"💡",function(){b=this.value,n(14,b)},function(){s=this.value,n(8,s)},function(){m=x(this),n(15,m),n(16,g)},e=>k(),e=>k(),function(){s=this.value,n(8,s)},function(){u=f(this.value),n(6,u)},e=>"🌳"]}return new class extends class{$destroy(){!function(e,t){const n=e.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}(this,1),this.$destroy=e}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}{constructor(e){super(),N(this,e,ye,fe,i,{},null,[-1,-1])}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
