(window.webpackJsonp=window.webpackJsonp||[]).push([[0],Array(32).concat([function(e,t,n){e.exports=n(72)},,,,,function(e,t,n){},,,,,,,,,,,,,function(e,t,n){var i={"./Archbishop Geofri.png":51,"./Atziri.png":52,"./Avarius.png":53,"./Baran.png":54,"./Brutus.png":55,"./Doedre.png":56,"./Dominus.png":57,"./Eleron.png":58,"./Hillock.png":59,"./Izaro.png":60,"./Kitava.png":61,"./Kuduku.png":62,"./Lunaris.png":63,"./Malachai.png":64,"./Piety.png":65,"./Rhys.png":66,"./Shavronne.png":67,"./Solaris.png":68,"./The Elder.png":69,"./The Shaper.png":70,"./Veritania.png":71};function r(e){var t=a(e);return n(t)}function a(e){var t=i[e];if(!(t+1)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return t}r.keys=function(){return Object.keys(i)},r.resolve=a,e.exports=r,r.id=50},function(e,t,n){e.exports=n.p+"static/media/Archbishop Geofri.6e0351ba.png"},function(e,t,n){e.exports=n.p+"static/media/Atziri.e1aff68e.png"},function(e,t,n){e.exports=n.p+"static/media/Avarius.bb0beb40.png"},function(e,t,n){e.exports=n.p+"static/media/Baran.c2cc7940.png"},function(e,t,n){e.exports=n.p+"static/media/Brutus.b2bc13c6.png"},function(e,t,n){e.exports=n.p+"static/media/Doedre.57e7d4e8.png"},function(e,t,n){e.exports=n.p+"static/media/Dominus.fabc0820.png"},function(e,t,n){e.exports=n.p+"static/media/Eleron.a938a8e5.png"},function(e,t,n){e.exports=n.p+"static/media/Hillock.4f59f957.png"},function(e,t,n){e.exports=n.p+"static/media/Izaro.eb3f6068.png"},function(e,t,n){e.exports=n.p+"static/media/Kitava.cb87a5dd.png"},function(e,t,n){e.exports=n.p+"static/media/Kuduku.8c3ddd80.png"},function(e,t,n){e.exports=n.p+"static/media/Lunaris.85e8ae6c.png"},function(e,t,n){e.exports=n.p+"static/media/Malachai.4b573964.png"},function(e,t,n){e.exports=n.p+"static/media/Piety.a55b7f84.png"},function(e,t,n){e.exports=n.p+"static/media/Rhys.dce28a7e.png"},function(e,t,n){e.exports=n.p+"static/media/Shavronne.bef48886.png"},function(e,t,n){e.exports=n.p+"static/media/Solaris.e8e6af49.png"},function(e,t,n){e.exports=n.p+"static/media/The Elder.ea02a95d.png"},function(e,t,n){e.exports=n.p+"static/media/The Shaper.cda64217.png"},function(e,t,n){e.exports=n.p+"static/media/Veritania.3cbf82c9.png"},function(e,t,n){"use strict";n.r(t);var i=n(0),r=n.n(i),a=n(16),o=n.n(a),s=n(1),c=n(2),u=n(6),l=n(5),h=n(7),d=n(8),f=(n(37),n(14)),p=n(17),v=n.n(p),b=n(24),m=function(){function e(t,n){if(Object(s.a)(this,e),this.beats=void 0,this.outOf=void 0,0===n)throw new Error("Power ranking attempted to divide by zero");this.beats=t,this.outOf=n}return Object(c.a)(e,[{key:"toFloat",get:function(){return this.beats/this.outOf}}]),e}(),g=n(11),y=n.n(g);function E(e){return e?Math.round(100*e):0}function k(e,t){for(var n={},i=0;i<e;i++)i!==t&&(n[i]=void 0);return n}var w=n(9),O=n(13),j=n(73),x=n(28),C=n(4);var R=n(15);function S(e){var t=Math.round(e).toString(16);return 1==t.length?"0"+t:t}var T,D,N=function(){function e(t,n,i){Object(s.a)(this,e),this.r=void 0,this.g=void 0,this.b=void 0,this.r=t,this.g=n,this.b=i}return Object(c.a)(e,[{key:"toHex",value:function(){return"#"+S(this.r)+S(this.g)+S(this.b)}},{key:"toRgba",value:function(){return"rgba(".concat(this.r,", ").concat(this.g,", ").concat(this.b,", 1)")}}]),e}();function I(e,t,n){return new N(e.r+n*(t.r-e.r),e.g+n*(t.g-e.g),e.b+n*(t.b-e.b)).toHex()}!function(e){e.Neutral="NEUTRAL",e.Friend="FRIEND",e.Enemy="ENEMY",e.Pawn="PAWN",e.Queen="QUEEN",e.Hunter="HUNTER",e.Target="TARGET",e.Dupe="DUPE",e.Deceiver="DECEIVER"}(T||(T={})),function(e){e.Threat="THREAT",e.Weak="WEAK",e.Neutral="NEUTRAL"}(D||(D={}));var M={NEUTRAL:"-",FRIEND:"\u2665",ENEMY:"\ud83d\udc94",PAWN:"THEY \u2665 ME",QUEEN:"I \u2665 THEM",HUNTER:"THEY \ud83d\udc94 ME",TARGET:"I \ud83d\udc94 THEM",DUPE:"I \ud83d\udc94 THEM THEY \u2665 ME",DECEIVER:"I \u2665 THEM THEY \ud83d\udc94 ME"},W={THREAT:"\ud83d\udca2",WEAK:"\ud83d\udca4",NEUTRAL:"-"},B={NEUTRAL:0,FRIEND:1,ENEMY:-1,PAWN:.66,QUEEN:.33,HUNTER:-.66,TARGET:-.33,DUPE:.25,DECEIVER:-.25},U={true:{true:T.Friend,false:T.Dupe,undefined:T.Pawn},false:{true:T.Deceiver,false:T.Enemy,undefined:T.Hunter},undefined:{true:T.Queen,false:T.Target,undefined:T.Neutral}};function H(e){return!0===e?"true":!1===e?"false":"undefined"}function A(e,t,n,i){if("number"!==typeof n&&"number"!==typeof i)return U[H(n)][H(i)];var r=n>e,a=n>t;return r&&a?T.Friend:r&&!a?T.Pawn:!r&&a?T.Queen:T.Enemy}var P=new N(51,255,249),F=function(){function e(t){var n=this;Object(s.a)(this,e),this.subs=[],this.view=void 0,this.refreshData=function(e){e?e.id!==n.view.props.id?n.view.setState({popularity:z(n.view.props.relationships[e.id],e.relationships[n.view.props.id]),powerRanking:L(n.view.props.powerRankings[e.id],e.powerRankings[n.view.props.id])}):n.view.setState({popularity:2,powerRanking:2}):n.view.setState(n.defaultState)},this.view=t}return Object(c.a)(e,[{key:"backgroundColor",value:function(e){var t=Ze();return null!==t&&t.id===e.id?P.toHex():e.isEvicted||e.isJury?void 0:this.view.state.displayMode.backgroundColor(this.view.state)}},{key:"subscribe",value:function(){var e=this,t=[];t.push(qe.subscribe({next:this.refreshData})),t.push($e.subscribe({next:function(t){return e.view.setState({displayMode:t})}})),this.subs=t}},{key:"unsubscribe",value:function(){this.subs.forEach(function(e){return e.unsubscribe()})}},{key:"defaultState",get:function(){return{popularity:this.view.props.popularity,displayMode:$e.value,powerRanking:this.view.props.powerRanking}}}]),e}();function L(e,t){return"number"===typeof e?e:"number"===typeof t?t:!0===e?1:!1===e?0:void 0}function z(e,t){if(!Object(R.isNullOrUndefined)(e)||!Object(R.isNullOrUndefined)(t)){if("number"===typeof e)return e;if("number"===typeof t)return t;var n=A(0,0,e,t);return B[n]}}var K=n(3);function V(){var e=Object(C.a)(["\n  filter: sepia(100%);\n"]);return V=function(){return e},e}function Y(){var e=Object(C.a)(["\n  filter: grayscale(100%);\n"]);return Y=function(){return e},e}function J(){var e=Object(C.a)(["\n  min-width: 100px;\n  width: 100%;\n  width: -moz-available; /* For Mozzila */\n  width: -webkit-fill-available; /* For Chrome */\n  width: stretch; /* Unprefixed */\n"]);return J=function(){return e},e}function G(){var e=Object(C.a)(["\n  font-weight: 100;\n  color: #c3ae88;\n  background-color: #5d5340;\n  filter: brightness(0.6);\n"]);return G=function(){return e},e}function Q(){var e=Object(C.a)(["\n  font-weight: 100;\n  color: grey;\n  background-color: #111111;\n"]);return Q=function(){return e},e}function _(){var e=Object(C.a)(["\n  margin: 5px;\n  border: 1px solid\n    ",";\n  color: black;\n  border-radius: 5px;\n  text-align: center;\n  font-weight: 600;\n  max-width: 7rem;\n  word-wrap: break-word;\n  -webkit-transition-property: none;\n  -moz-transition-property: none;\n  -o-transition-property: none;\n  transition-property: none;\n"]);return _=function(){return e},e}function X(){var e=Object(C.a)(["\n  font-weight: 100;\n  font-size: small;\n"]);return X=function(){return e},e}var q=K.c.small(X()),Z=K.c.div(_(),function(e){return e.theme.portraitBorder}),$=Object(K.c)(Z)(Q()),ee=Object(K.c)(Z)(G()),te=K.c.img(J()),ne=Object(K.c)(te)(Y()),ie=Object(K.c)(te)(V()),re=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(u.a)(this,Object(l.a)(t).call(this,e))).controller=void 0,n.controller=new F(Object(d.a)(Object(d.a)(n))),n.state=n.controller.defaultState,n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){Object(R.isNullOrUndefined)(this.props.id)||this.controller.subscribe()}},{key:"componentWillUnmount",value:function(){this.controller.unsubscribe()}},{key:"onClick",value:function(){if(!Object(R.isNullOrUndefined)(this.props.id)&&this.props.relationships){var e,t={id:this.props.id,relationships:this.props.relationships,isEvicted:!!this.props.isEvicted,popularity:this.props.popularity||0,superiors:this.props.superiors,powerRankings:this.props.powerRankings};!(e=t)||Ze()&&Ze().id===e.id?qe.next(null):qe.next(e)}}},{key:"render",value:function(){var e,t=this,n=this.props,i=function(e){var t=e.isEvicted?ne:te;return t=e.isJury?ie:t}(n);e=this.state.displayMode.generateSubtitle(this.props,this.state,!!n.detailed);var a=Z;return n.isJury?a=ee:n.isEvicted&&(a=$),r.a.createElement(a,{onClick:function(){return t.onClick()},style:{backgroundColor:this.controller.backgroundColor(n)}},r.a.createElement(i,{src:n.imageURL,style:{height:100}}),r.a.createElement("br",null),n.name,r.a.createElement("br",null),r.a.createElement(q,null,e))}}]),t}(r.a.Component);function ae(e,t){return r.a.createElement(re,Object.assign({},e,{key:t,detailed:!1}))}var oe=n(27),se=n.n(oe);function ce(){var e=Object(C.a)(["\n    max-width: 200px;\n    padding: 3px 8px;\n    color: #fff;\n    text-align: center;\n    background-color: #000;\n    border-radius: 4px;\n"]);return ce=function(){return e},e}var ue=K.c.p(ce()),le=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(u.a)(this,Object(l.a)(t).call(this,e))).state={visible:!1},n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(se.a,{position:["top","bottom"],isOpen:this.state.visible,content:r.a.createElement(ue,null,this.props.text)},r.a.createElement("div",{onMouseEnter:function(){return e.setState({visible:!0})},onMouseLeave:function(){return e.setState({visible:!1})}},this.props.children))}}]),t}(r.a.Component),he=-1;function de(e){var t=[];return e.houseguests&&0!==e.houseguests.length?(e.houseguests.forEach(function(n){var i;i=e.detailed?function(e,t){return r.a.createElement(re,Object.assign({},e,{key:t,detailed:!0}))}(n,he++):ae(n,he++),n.tooltip&&(i=r.a.createElement(le,{text:n.tooltip},i)),t.push(i)}),r.a.createElement("div",{className:"columns is-gapless is-mobile is-multiline ".concat(e.centered&&"is-centered")},t)):r.a.createElement("div",null)}function fe(){var e=Object(C.a)(["\n  margin-left: 3px;\n  margin-right: 3px;\n  margin-bottom: 3px;\n  background: ",";\n"]);return fe=function(){return e},e}function pe(){var e=Object(C.a)(["\n  box-shadow: ",";\n  border-radius: 6px;\n  margin-left: 3px;\n  margin-right: 3px;\n  margin-bottom: 5px;\n  padding-bottom: 10px;\n  padding-top: 1px;\n  background: ",";\n"]);return pe=function(){return e},e}var ve=K.c.div(pe(),function(e){return"light"===e.theme.name?"0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1)":""},function(e){return e.theme.overlay}),be=K.c.div(fe(),function(e){return e.theme.bodyArea});function me(e){return r.a.createElement(ve,{className:e.className||""},e.children)}function ge(e){return r.a.createElement(be,{style:e.style,className:"box ".concat(e.className||"")},e.children)}function ye(){var e=Object(C.a)(["\n  text-align: center;\n  color: ",";\n"]);return ye=function(){return e},e}function Ee(){var e=Object(C.a)(["\n  text-align: center;\n  color: ",";\n"]);return Ee=function(){return e},e}var ke=K.c.div(Ee(),function(e){return e.theme.text}),we=K.c.p(ye(),function(e){return e.theme.text});function Oe(e){return e.noMargin?r.a.createElement(ke,null,e.children):r.a.createElement(we,{style:e.style},e.children," ")}function je(e){return r.a.createElement(Oe,{style:e.style||{},noMargin:e.noMargin},r.a.createElement("b",null,e.children," "))}function xe(e){var t=e.houseguests;if(!t||0===t.length)return r.a.createElement("div",null);var n=y.a.groupBy(t,function(e){return void 0===e.tribe?e.tribe:e.tribe.name}),i=[];return y.a.forEach(n,function(e,t){if(!("undefined"===t&&y.a.size(n)>1)){var a=e[0].tribe?e[0].tribe.color:"";i.push(r.a.createElement(me,{key:t},"undefined"!==t&&r.a.createElement(je,{style:{color:a}},t),"undefined"!==t&&r.a.createElement("hr",{style:{color:a}}),r.a.createElement(de,{houseguests:e,centered:!0})))}}),r.a.createElement("div",{style:{margin:"auto",maxWidth:-1}},i)}function Ce(){var e=Object(C.a)(["\n    color: ",";\n"]);return Ce=function(){return e},e}function Re(){var e=Object(C.a)(["\n    color: ",";\n"]);return Re=function(){return e},e}var Se=K.c.div(Re(),function(e){return e.theme.text});K.c.input(Ce(),function(e){return e.theme.text});function Te(e,t,n){return De(e)?t.push(r.a.createElement("div",{key:n++},"".concat(De(e)))):t.push(r.a.createElement("br",{key:n++,style:{lineHeight:1}})),n}function De(e){return"".concat(e.hohWins?"\u2654 ".concat(e.hohWins):"").concat(e.povWins&&e.hohWins?"|\ud83d\udec7 ".concat(e.povWins):e.povWins?"\ud83d\udec7 ".concat(e.povWins):"").concat((e.hohWins||e.povWins)&&e.nominations?"|":"").concat(e.nominations?"\u2718 ".concat(e.nominations):"")}function Ne(e,t){var n=[],i=e.relationships[t.id],r=t.relationships[e.id];return n.push(M[A(e.popularity||0,t.popularity,i,r)]),n}function Ie(e){var t=[],n={friends:e.thinksImThreat,enemies:e.thinksImWeak},i=n.friends>0?"".concat(n.friends," ").concat(W[D.Threat]):"",r=n.enemies>0?"".concat(n.enemies," ").concat(W[D.Weak]):"";return t.push("".concat(i).concat(i&&r&&" | ").concat(r)),t}function Me(e){var t=[],n={friends:e.likedBy,enemies:e.dislikedBy},i=n.friends>0?"".concat(n.friends," ").concat(M[T.Friend]):"",r=n.enemies>0?"".concat(n.enemies," ").concat(M[T.Enemy]):"";return t.push("".concat(i).concat(i&&r&&" | ").concat(r)),t}var We=new N(252,137,137),Be=new N(137,252,137),Ue={minColor:We,maxColor:Be,backgroundColor:function(e){var t=e.popularity;if(void 0===t)return"rgb(170, 170, 170)";var n=function(e){if(!e)return 0;var t=e*e;return e>=0?2*e-t:t+2*e}(t);return I(We,Be,(n+1)/2)},generateSubtitle:function(e,t){arguments.length>2&&void 0!==arguments[2]&&arguments[2];var n=0,i=[],a=function(e,t,n,i,a){if(e.isEvicted)t.push(r.a.createElement("br",{key:n++,style:{lineHeight:1}}));else{var o=Ze();if(o&&o.id!==e.id){var s=i(e,o);t=t.concat(s.map(function(e){return r.a.createElement("div",{key:n++},e)}))}else{var c=a(e);t=t.concat(c.map(function(e){return r.a.createElement("div",{key:n++},e)}))}}return{subtitle:t,key:n}}(e,i,n=Te(e,i,n),Ne,Me);return i=a.subtitle,n=a.key,i}},He=new N(192,181,255),Ae=new N(255,204,94),Pe={minColor:He,maxColor:Ae,backgroundColor:function(e){var t=e.powerRanking;return void 0===t?"rgb(170, 170, 170)":I(He,Ae,t)},generateSubtitle:function(e,t,n){var i,a=0,o=[];if(a=function(e,t,n,i,a){var o,s,c=e.popularity;if(c&&(c>1||c<-1)&&(c=t.popularity),c&&!t.isEvicted){"".concat(E(c),"%");var u=(s=c,E((o=t).popularity)!==E(s)?0:o.deltaPopularity?E(o.deltaPopularity):0);if(n&&0!==u){var l=u>0?" | \u2191":" | \u2193";"".concat(l," ").concat(u,"%")}i.push(r.a.createElement("div",{key:a++},""))}return a}(t,e,!!n,o,a),a=Te(e,o,a),e.isEvicted)o.push(r.a.createElement("br",{key:a++,style:{lineHeight:1}}));else{var s=Ze();s&&s.id!==e.id?o.push(r.a.createElement("div",{key:a++},"".concat(void 0===(i=e.powerRankings[s.id])?"-":i?"\ud83d\udca2 THREAT":"\ud83d\udca4 WEAK"))):s&&s.id===e.id?(o.push(r.a.createElement("div",{key:a++},"I'M SEEN AS")),o.push(r.a.createElement("div",{key:a++},Ie(e)))):o.push(r.a.createElement("div",{key:a++},Ie(e)))}return o}};var Fe=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(u.a)(this,Object(l.a)(t).call(this,e))).sub=null,n.state={selected:e.mode===$e.value},n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.sub=$e.subscribe({next:function(t){t!==e.props.mode&&e.setState({selected:!1})}})}},{key:"componentWillUnmount",value:function(){this.sub&&this.sub.unsubscribe()}},{key:"render",value:function(){var e,t,n=this,i=(e=this.props).disabled?{}:{background:"linear-gradient(90deg, ".concat(e.mode.minColor.toRgba()," 0%, ").concat(e.mode.maxColor.toRgba()," 100%)"),cursor:"pointer"};return r.a.createElement("span",{className:"level-item tag is-medium is-light",style:i,onClick:function(){var e;!n.props.disabled&&(e=n.props.mode,$e.next(e)),!n.props.disabled&&n.setState({selected:!0})}},(t=this.props.text,this.state.selected?r.a.createElement("b",null,t):r.a.createElement("i",null,t)))}}]),t}(r.a.Component);function Le(){var e=Object(C.a)(["\n  background: ",";\n"]);return Le=function(){return e},e}var ze=Object(K.c)(ge)(Le(),function(e){return e.theme.overlay});function Ke(){return r.a.createElement(ze,{className:"level is-mobile",key:"viewsbar"},r.a.createElement(Fe,{mode:Ue,text:"Relationships"}),r.a.createElement(Fe,{mode:Pe,text:"Threat Level"}))}var Ve=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(u.a)(this,Object(l.a)(t).call(this,e))).subs=[],n.state={cast:_e.value},n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.subs.push(_e.subscribe(function(t){e.setState({cast:t})}))}},{key:"componentWillUnmount",value:function(){this.subs.forEach(function(e){return e.unsubscribe()})}},{key:"render",value:function(){return 0===this.state.cast.length?r.a.createElement(Se,null,"Cast is empty."):r.a.createElement(Se,null,r.a.createElement(Ke,null),r.a.createElement(xe,{houseguests:this.state.cast}))}}]),t}(r.a.Component),Ye=new j.a(r.a.createElement(Ve,null)),Je=new j.a(null),Ge=new x.a;function Qe(e){Ge.next(e)}var _e=new j.a([]),Xe=new j.a([]),qe=new j.a(null);function Ze(){return qe.value}var $e=new j.a(Ue),et=new j.a(!1),tt=new x.a,nt=function(){function e(t){Object(s.a)(this,e),this.rng=void 0,this.rng=O.a.xorshift128plus(t)}return Object(c.a)(e,[{key:"randomFloat",value:function(){var e,t=this.rng.next(),n=Object(w.a)(t,2);return e=n[0],this.rng=n[1],e/2147483647}},{key:"randomInt",value:function(e,t){var n,i=O.a.uniformIntDistribution(e,t,this.rng),r=Object(w.a)(i,2);return n=r[0],this.rng=r[1],n}},{key:"flipCoin",value:function(){var e,t=this.rng.next(),n=Object(w.a)(t,2);return e=n[0],this.rng=n[1],e%2===0}},{key:"seed",value:function(e){this.rng=O.a.xorshift128plus(e)}}]),e}();new j.a(new nt(0)),Xe.subscribe({next:function(){}});function it(e,t){return e.houseguestCache[t]}function rt(e){return e.houseguests.filter(function(e){return!e.isEvicted})}function at(e){return e.remainingPlayers-2<=jt()}var ot=function(){function e(t){Object(s.a)(this,e),this.houseguests=[],this.houseguestCache={},this.remainingPlayers=0,this.phase=0,this.previousHOH=void 0,this.log=[];var n=y.a.cloneDeep(t);Object.assign(this,n)}return Object(c.a)(e,[{key:"currentLog",get:function(){return this.log[this.phase]}}]),e}(),st=function e(){Object(s.a)(this,e),this.nominationsPreVeto=[],this.vetoWinner=void 0,this.winner=void 0,this.runnerUp=void 0,this.nominationsPostVeto=[],this.evicted=-1,this.votes={},this.votesInMajority=-1,this.outOf=-1,this.soleVoter=void 0};var ct=function(){function e(){Object(s.a)(this,e)}return Object(c.a)(e,[{key:"nextEpisode",value:function(e,t){var n,i=new ot(e);throw 0===e.phase&&function(e){for(var t=0;t<e.length;t++){e[t].relationships;for(var n=t+1;n<e.length;n++)e[n].relationships}}(i.houseguests),i.phase++,rt(e).length>2&&(i.log[i.phase]=new st),at(e)&&(n=rt(i)).forEach(function(e){e.powerRanking=new m(n.length-1-e.superiors.size,n.length-1)}),function(e){rt(e).forEach(function(t){var n=function(e,t){var n=0,i=0,r=e.id;return t.forEach(function(e){e.id!==r&&(i++,n+=e.relationships[r])}),0===i?0:n/i}(t,rt(e));t.deltaPopularity=(E(n)-E(t.popularity))/100,t.popularity=n})}(i),function(e){var t=rt(e);t.forEach(function(e){e.getFriendEnemyCount=function(){var n=0,i=0;return t.forEach(function(t){var r=A(e.popularity,t.popularity,e.relationshipWith(t),!1);e.id!==t.id&&(r===T.Friend?n++:r===T.Enemy&&i++)}),{friends:n,enemies:i}}})}(i),new Error("You can't call this function.")}}]),e}(),ut={canPlayWith:function(e){return e>1},eliminates:1,arrowsEnabled:!0,hasViewsbar:!0};var lt={canPlayWith:function(e){return 3===e},eliminates:2,arrowsEnabled:!0,hasViewsbar:!0};function ht(){var e=Object(C.a)(["\n    position: -webkit-sticky;\n    position: sticky;\n    top: 20px;\n    right: 20px;\n"]);return ht=function(){return e},e}K.c.img(ht());function dt(){var e=Object(C.a)(["\n  height: 0.4em;\n  background-color: #000000;\n"]);return dt=function(){return e},e}function ft(){var e=Object(C.a)(["\n  background-color: ",";\n"]);return ft=function(){return e},e}function pt(){var e=Object(C.a)(["\n  background-color: ",";\n"]);return pt=function(){return e},e}function vt(){var e=Object(C.a)(["\n  background-color: ",";\n"]);return vt=function(){return e},e}function bt(){var e=Object(C.a)(["\n  background-color: ",";\n"]);return bt=function(){return e},e}function mt(){var e=Object(C.a)(["\n  background-color: ",";\n"]);return mt=function(){return e},e}function gt(){var e=Object(C.a)(["\n  background-color: ",";\n"]);return gt=function(){return e},e}function yt(){var e=Object(C.a)(["\n  background-color: ",";\n"]);return yt=function(){return e},e}function Et(){var e=Object(C.a)(["\n  border: 1px solid\n    ",";\n  border-collapse: collapse;\n"]);return Et=function(){return e},e}function kt(){var e=Object(C.a)(["\n  padding: 0.1em 0.4em;\n  border: 1px solid\n    ",";\n"]);return kt=function(){return e},e}var wt=K.c.td(kt(),function(e){return e.theme.tableCellBorder});K.c.table(Et(),function(e){return e.theme.tableCellBorder}),Object(K.c)(wt)(yt(),function(e){return e.theme.grayCell}),Object(K.c)(wt)(gt(),function(e){return e.theme.lightGrayCell}),Object(K.c)(wt)(mt(),function(e){return e.theme.evictedCell}),Object(K.c)(wt)(bt(),function(e){return e.theme.winnerCell}),Object(K.c)(wt)(vt(),function(e){return e.theme.runnerUpCell}),Object(K.c)(wt)(pt(),function(e){return e.theme.nomineeCell}),Object(K.c)(wt)(ft(),function(e){return e.theme.hohCell}),K.c.tr(dt());var Ot={canPlayWith:function(e){return 1===e},eliminates:1,arrowsEnabled:!1,hasViewsbar:!1};function jt(){return xt}var xt=7;var Ct=function(){function e(){Object(s.a)(this,e),this.factory=void 0,this.factory=new ct}return Object(c.a)(e,[{key:"renderEpisode",value:function(e,t){return this.factory.nextEpisode(e,t)}},{key:"whichEpisodeType",value:function(e){return 3===e?lt:2===e?Ot:ut}}]),e}(),Rt=function(){function e(t){var n=this;Object(s.a)(this,e),this.view=void 0,this.subscriptions=[],this.season=new Ct,this.scenes=[],this.selectedEpisode=0,this.switchSceneRelative=function(e){var t=n.view.state.selectedScene,i=n.scenes.length,r=t+e;if(!(r<0)){var a,o=n.view.state.episodes[n.view.state.episodes.length-1];if(r<i)n.switchToScene(r);else if(r===i){var s=o.gameState,c=rt(o.gameState).length,u=n.season.whichEpisodeType(c);c>0&&(a=n.season.renderEpisode(s,u),Je.next(a),n.switchSceneRelative(1))}}},this.view=t,this.subscriptions.push(Je.subscribe({next:function(e){return n.onNewEpisode(e)}})),this.subscriptions.push(Ge.subscribe({next:function(e){n.switchSceneRelative(e)}}))}return Object(c.a)(e,[{key:"getSelectedEpisode",value:function(){return this.selectedEpisode}},{key:"switchToScene",value:function(){var e=Object(b.a)(v.a.mark(function e(t){return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return Ye.next(this.scenes[t].scene.render),this.selectedEpisode=this.scenes[t].index,e.next=4,this.view.setState({selectedScene:t});case 4:null!==Ze()&&qe.next(it(this.scenes[this.view.state.selectedScene].scene.gameState,Ze().id));case 5:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"_handleKeyDown",value:function(e){var t=this.view.state;void 0!==t.episodes[this.selectedEpisode]&&t.episodes[this.selectedEpisode].type.arrowsEnabled&&(37===e.keyCode?Qe(-1):39===e.keyCode&&Qe(1))}},{key:"onNewEpisode",value:function(e){var t=this;if(e){var n=Object(f.a)({},this.view.state),i=(0===this.scenes.length?-1:this.scenes[this.scenes.length-1].index)+1;this.scenes.push({scene:e,index:i}),e.scenes.forEach(function(e){return t.scenes.push({scene:e,index:i})}),n.episodes.push(e),this.view.setState(n)}else this.view.setState({episodes:[],selectedScene:0}),this.scenes=[]}},{key:"destroy",value:function(){this.subscriptions.forEach(function(e){return e.unsubscribe()})}},{key:"handleKeyDown",get:function(){return this._handleKeyDown.bind(this)}}]),e}(),St=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(u.a)(this,Object(l.a)(t).call(this,e))).controller=void 0,n.controller=new Rt(Object(d.a)(Object(d.a)(n))),n.state={episodes:[],selectedScene:0},n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){document.addEventListener("keydown",this.controller.handleKeyDown)}},{key:"componentWillUnmount",value:function(){this.controller.destroy()}},{key:"render",value:function(){return r.a.createElement(ge,{style:{minWidth:180,display:"none"}},r.a.createElement(Se,null,this.getEpisodes()))}},{key:"getHighlight",value:function(e,t){return t===this.state.selectedScene?r.a.createElement("mark",null,e):e}},{key:"getEpisodes",value:function(){var e=this,t=[],n=-1,i=0;return this.state.episodes.forEach(function(a){var o=++n;t.push(r.a.createElement("b",{key:o,onClick:function(){e.controller.switchToScene(o)}},e.getHighlight(a.title,o))),t.push(r.a.createElement("br",{key:--i})),a.scenes.forEach(function(o){var s=++n;e.controller.getSelectedEpisode()===a.gameState.phase&&(t.push(r.a.createElement("a",{key:s,onClick:function(){return e.controller.switchToScene(s)}},e.getHighlight(o.title,s))),t.push(r.a.createElement("br",{key:--i})))})}),t}}]),t}(r.a.Component),Tt={name:"light",bg:"#fff",text:"#363537",toggleBorder:"#FFF",gradient:"linear-gradient(#39598A, #79D7ED)",bodyArea:"#fff",link:"blue",mark:"yellow",overlay:"fff",evictedCell:"#fa8072",grayCell:"#eaecf0",lightGrayCell:"#f8f9fa",winnerCell:"#73fb76",runnerUpCell:"#d1e8ef",nomineeCell:"#959ffd",hohCell:"#CCFFCC",portraitBorder:"gray",tableCellBorder:"#a2a9b1"},Dt={name:"dark",bg:"#121212",text:"#FAFAFA",bodyArea:"#363537",toggleBorder:"#6B8096",gradient:"linear-gradient(#091236, #1E215D)",link:"lightblue",mark:"#7e006d",overlay:"#444346",evictedCell:"#9d4c43",grayCell:"#5e5e5e",lightGrayCell:"#404040",runnerUpCell:"#9fbec882",nomineeCell:"#6c75d0",winnerCell:"#00ac04",hohCell:"#3f783f",portraitBorder:"#484848",tableCellBorder:"#53575b"};function Nt(){var e=Object(i.useState)("dark"),t=Object(w.a)(e,2),n=t[0],a=t[1],o="button ".concat("dark"===n?"is-dark":"is-light");return r.a.createElement("div",{className:o,onClick:function(){"light"===n?(a("dark"),tt.next(Dt)):(a("light"),tt.next(Tt))}},"light"===n?"Dark mode":"Light mode")}var It=function(){function e(t){var n=this;if(Object(s.a)(this,e),this.houseguests=[],this.cache={},this.nonEvictedHouseguests=0,this.nonEvictedIDs=[],this.houseguests=t,t.length>4096)throw new Error("The max number of players is 4096.");t.forEach(function(e){n.cache[e.name.toUpperCase()]=e,!e.isEvicted&&n.nonEvictedHouseguests++,!e.isEvicted&&n.nonEvictedIDs.push(e.id)})}return Object(c.a)(e,[{key:"getById",value:function(e){if(void 0===this.houseguests[e])throw Error("invalid id");return this.houseguests[e]}},{key:"get",value:function(e){return this.cache[e.toUpperCase()]}},{key:"getRelationship",value:function(e,t,n){return this.get(e)[n][this.get(t).id]}},{key:"updatePopularities",value:function(e){var t=this.nonEvictedHouseguests-1;void 0===e.popularity&&(e.popularity=0),e.popularity=(e.likedBy-e.dislikedBy)/t,void 0===e.powerRanking&&(e.powerRanking=0),0===e.likedBy&&0===e.dislikedBy&&(e.popularity=void 0),e.powerRanking=function(e,t,n){if(0===n)return 0;var i=2*n;return.5+e/i-t/i}(e.thinksImThreat,e.thinksImWeak,t),0===e.thinksImThreat&&0===e.thinksImWeak&&(e.powerRanking=void 0)}},{key:"dropYourBuffs",value:function(){this.houseguests.forEach(function(e){e.tribe=void 0})}},{key:"evict",value:function(e){var t=this,n=this.get(e),i=this.nonEvictedIDs.indexOf(n.id);n.isEvicted||(n.isEvicted=!0,this.nonEvictedHouseguests--,this.nonEvictedIDs.forEach(function(n){t.neutral(e,t.houseguests[n].name),t.neutral(t.houseguests[n].name,e),t.utr(e,t.houseguests[n].name),t.utr(t.houseguests[n].name,e)}),this.nonEvictedIDs.splice(i,1))}},{key:"unevict",value:function(e){var t=this.get(e);t.isEvicted&&(t.isEvicted=!1,this.nonEvictedHouseguests++,this.nonEvictedIDs.push(t.id))}},{key:"setRelationship",value:function(e,t,n,i,r,a){var o=this.getRelationship(e,t,a),s=this.get(e),c=this.get(t);o===n||(s.isEvicted||s.isJury||c.isJury||c.isEvicted)&&void 0!==n||(void 0===o?!0===n?c[i]++:c[r]++:void 0===n?!0===o?c[i]--:c[r]--:!0===n?c[i]++&&c[r]--:c[i]--&&c[r]++,s[a][c.id]=n,this.updatePopularities(c))}},{key:"tribe",value:function(e,t){var n=this;if(e.name.includes("#")||e.name.includes("="))throw new Error("Tribe names cannot contain # or =");t.forEach(function(t){n.get(t).tribe=e})}},{key:"like",value:function(e,t){this.setRelationship(e,t,!0,"likedBy","dislikedBy","relationships")}},{key:"dislike",value:function(e,t){this.setRelationship(e,t,!1,"likedBy","dislikedBy","relationships")}},{key:"neutral",value:function(e,t){this.setRelationship(e,t,void 0,"likedBy","dislikedBy","relationships")}},{key:"friends",value:function(e,t){this.like(e,t),this.like(t,e)}},{key:"threat",value:function(e,t){this.setRelationship(e,t,!0,"thinksImThreat","thinksImWeak","powerRankings")}},{key:"weak",value:function(e,t){this.setRelationship(e,t,!1,"thinksImThreat","thinksImWeak","powerRankings")}},{key:"utr",value:function(e,t){this.setRelationship(e,t,void 0,"thinksImThreat","thinksImWeak","powerRankings")}},{key:"alliance",value:function(e){for(var t=0;t<e.length;t++)for(var n=t+1;n<e.length;n++)this.friends(e[t],e[n])}},{key:"enemies",value:function(e,t){this.dislike(e,t),this.dislike(t,e)}}]),e}(),Mt=function(){for(var e="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+-".split(""),t=new Map,n=0;n<e.length;n++)t.set(e[n],n);return{fromInt:function(t){for(var n="";n=e[63&t]+n,0!==(t>>>=6););return n},toInt:function(e){for(var n=0,i=e.split(""),r=0;r<i.length;r++){var a=t.get(i[r]);if(void 0===a)throw new Error("Tried to decode an invalid B64 string");n=(n<<6)+a}return n}}}();function Wt(e,t){var n=new It(y.a.cloneDeep(e.houseguests));n.houseguests.forEach(function(e){n.unevict(e.name)}),n.dropYourBuffs();var i=t.trim();try{if(4!==i.split("|").length)throw new Error("Not a code");var r=i.split("|"),a=Object(w.a)(r,4),o=a[0],s=a[1],c=a[2],u=a[3];if(c.length%2>0||s.length%2>0||u.length%2>0)throw new Error("Misaligned bytes: (".concat(s.length,", ").concat(c.length,", ").concat(u.length));!function(e,t){var n="",i="",r=0,a=0,o=[t.relationships,t.powerRankings],s=o[0],c=o[1];e.houseguests.forEach(function(t){t.isEvicted||t.isJury||e.nonEvictedIDs.forEach(function(o){t.id!==o&&(0===n.length&&(n=Bt("".concat(s[r]).concat(s[r+1])),r+=2),e.setRelationship(t.name,e.houseguests[o].name,Ht(n[0]),"likedBy","dislikedBy","relationships"),n=n.slice(1),0===i.length&&(i=Bt("".concat(c[a]).concat(c[a+1])),a+=2),e.setRelationship(t.name,e.houseguests[o].name,Ht(i[0]),"thinksImThreat","thinksImWeak","powerRankings"),i=i.slice(1))})})}(n,{relationships:c,powerRankings:u}),function(e,t){var n=0;for(;void 0!==t[2*n];)e.evict(Pt(e,"".concat(t[2*n]).concat(t[2*n+1]),"evictees").name),n++}(n,s),function(e,t){t.split("=").forEach(function(t){var n=t.indexOf("#");if(-1===n)throw new Error("Invalid tribe, does not have a color");var i=t.slice(0,n),r=t.slice(n+1,n+7),a=t.slice(n+7);if(!At.test(r))throw new Error("Invalid color: ".concat(r));for(var o=[],s=0;void 0!==a[2*s];)o.push(Pt(e,"".concat(a[2*s]).concat(a[2*s+1]),"tribes").name),s++;e.tribe({color:"#".concat(r),name:i},o)})}(n,o)}catch(l){return alert(l),null}return n}var Bt=function(e){return Mt.toInt(e).toString(3).padStart(7,"0")},Ut=new Map(Object.entries({0:!1,1:!0,2:void 0}));function Ht(e){var t=Ut.get(e);if(void 0===t&&"2"!==e)throw new Error("".concat(e," is not a ternary value"));return t}var At=/([a-f0-9]){6}/;function Pt(e,t,n){var i=Mt.toInt(t);if(i>=e.houseguests.length)throw new Error("".concat(i," (").concat(t,") exceeds the maximum id: ").concat(e.houseguests.length," in ").concat(n));return e.houseguests[i]}var Ft=function e(t){var n=this;Object(s.a)(this,e),this.view=void 0,this.onSubmit=function(){if(n.view.state.inputCode){var e=Wt(n.view.state.rMapper,n.view.state.inputCode);n.view.setState({inputCode:""}),null!==e&&(n.view.setState({rMapper:e}),_e.next(e.houseguests))}},this.view=t};var Lt=function(e){var t=[];return function(e,t,n,i){e.keys().map(function(r,a){var o=r.replace(".png","").replace("./","");t.push({name:o,imageURL:e(r),id:a,isEvicted:n.has(o.toLowerCase()),isJury:i.has(o.toLowerCase()),relationships:k(e.length-1,a),powerRankings:k(e.length-1,a),likedBy:0,dislikedBy:0,thinksImThreat:0,thinksImWeak:0})})}(e,t,new Set,new Set),new It(t)}(n(50));var zt=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(u.a)(this,Object(l.a)(t).call(this,e))).controller=void 0,n.handleChange=function(e){n.setState({inputCode:e.target.value})}.bind(Object(d.a)(Object(d.a)(n))),n.controller=new Ft(Object(d.a)(Object(d.a)(n))),n.state={inputCode:"",rMapper:Lt},n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){_e.next(this.state.rMapper.houseguests)}},{key:"render",value:function(){var e=Object(f.a)({},{marginTop:30},this.props.style||{});return r.a.createElement(ge,{className:"level is-mobile",style:e},r.a.createElement(Se,{className:"level-item"},"Enter Code:",r.a.createElement("input",{className:"input",value:this.state.inputCode,onChange:this.handleChange}),r.a.createElement("button",{disabled:!this.state.inputCode,className:"button is-light",onClick:this.controller.onSubmit},"Submit")),r.a.createElement("div",{className:"level-item"},r.a.createElement(Nt,null)))}}]),t}(r.a.Component);function Kt(){var e=Object(C.a)(["\n    overflow-x: auto;\n"]);return Kt=function(){return e},e}var Vt=Object(K.c)(ge)(Kt()),Yt=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(u.a)(this,Object(l.a)(t).call(this,e))).contentStream=void 0,n.state={content:null},n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.contentStream=Ye.subscribe(function(t){e.setState({content:t})})}},{key:"componentDidUpdate",value:function(e,t){t.content!==this.state.content&&window.scrollTo(0,0)}},{key:"componentWillUnmount",value:function(){this.contentStream.unsubscribe()}},{key:"render",value:function(){return r.a.createElement(Vt,null,this.state.content)}}]),t}(r.a.Component),Jt=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(u.a)(this,Object(l.a)(t).call(this,e))).state={fullscreen:!1},e.controller.inject(Object(d.a)(Object(d.a)(n))),n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.props.controller.subscribe()}},{key:"componentWillUnmount",value:function(){this.props.controller.unsubscribe()}},{key:"render",value:function(){var e=this.state.fullscreen,t={display:e?"none":""},n=e?{margin:"auto"}:{margin:"auto",maxWidth:1380,overflow:"hidden"};return r.a.createElement("div",{style:n},r.a.createElement(St,null),r.a.createElement(zt,{style:t}),r.a.createElement("div",{className:"columns"},r.a.createElement("div",{className:"column",style:{overflowX:"hidden"}},r.a.createElement(Yt,null))))}}]),t}(r.a.Component),Gt=function(){function e(){Object(s.a)(this,e),this.view=new Jt({controller:this}),this.subscriptions=[]}return Object(c.a)(e,[{key:"inject",value:function(e){this.view=e}},{key:"subscribe",value:function(){var e=this;this.unsubscribe(),this.subscriptions.push(et.subscribe(function(t){e.view.setState({fullscreen:t})}))}},{key:"unsubscribe",value:function(){this.subscriptions.forEach(function(e){return e.unsubscribe()})}}]),e}();function Qt(){var e=Object(C.a)(["\n  *,\n  *::after,\n  *::before {\n    box-sizing: border-box;\n  }\n  div {\n    transition: all 0.25s linear;\n  }\n\n  body {\n    background: ",";\n    color: ",";\n       transition: all 0.25s linear;\n  }"]);return Qt=function(){return e},e}var _t=Object(K.b)(Qt(),function(e){return e.theme.bg},function(e){return e.theme.text}),Xt=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(u.a)(this,Object(l.a)(t).call(this,e))).sub=null,n.state={theme:Dt},n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.sub=tt.subscribe(function(t){e.setState({theme:t})})}},{key:"componentWillUnmount",value:function(){this.sub&&this.sub.unsubscribe()}},{key:"render",value:function(){return r.a.createElement(K.a,{theme:this.state.theme},r.a.createElement(r.a.Fragment,null,r.a.createElement(_t,null),r.a.createElement(Jt,{controller:new Gt})))}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(Xt,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}]),[[32,1,2]]]);
//# sourceMappingURL=main.14ebccc9.chunk.js.map