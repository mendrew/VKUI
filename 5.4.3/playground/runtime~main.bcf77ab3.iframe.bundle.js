!function(){"use strict";var e={},o={};function t(n){var r=o[n];if(void 0!==r)return r.exports;var s=o[n]={id:n,loaded:!1,exports:{}};return e[n].call(s.exports,s,s.exports,t),s.loaded=!0,s.exports}t.m=e,function(){t.amdO={}}(),function(){var e=[];t.O=function(o,n,r,s){if(n){s=s||0;for(var i=e.length;i>0&&e[i-1][2]>s;i--)e[i]=e[i-1];e[i]=[n,r,s];return}for(var a=1/0,i=0;i<e.length;i++){for(var n=e[i][0],r=e[i][1],s=e[i][2],c=!0,p=0;p<n.length;p++)a>=s&&Object.keys(t.O).every(function(e){return t.O[e](n[p])})?n.splice(p--,1):(c=!1,s<a&&(a=s));if(c){e.splice(i--,1);var d=r();void 0!==d&&(o=d)}}return o}}(),function(){t.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(o,{a:o}),o}}(),function(){var e,o=Object.getPrototypeOf?function(e){return Object.getPrototypeOf(e)}:function(e){return e.__proto__};t.t=function(n,r){if(1&r&&(n=this(n)),8&r||"object"==typeof n&&n&&(4&r&&n.__esModule||16&r&&"function"==typeof n.then))return n;var s=Object.create(null);t.r(s);var i={};e=e||[null,o({}),o([]),o(o)];for(var a=2&r&&n;"object"==typeof a&&!~e.indexOf(a);a=o(a))Object.getOwnPropertyNames(a).forEach(function(e){i[e]=function(){return n[e]}});return i.default=function(){return n},t.d(s,i),s}}(),function(){t.d=function(e,o){for(var n in o)t.o(o,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:o[n]})}}(),function(){t.f={},t.e=function(e){return Promise.all(Object.keys(t.f).reduce(function(o,n){return t.f[n](e,o),o},[]))}}(),function(){t.u=function(e){return""+(({234:"components-Pagination-Pagination-stories",278:"components-AdaptiveIconRenderer-AdaptiveIconRenderer-stories",643:"components-RichTooltip-RichTooltip-stories",650:"components-Progress-Progress-stories",736:"components-WriteBar-WriteBar-stories",969:"components-PullToRefresh-PullToRefresh-stories",1037:"components-CardGrid-CardGrid-stories",1065:"components-Badge-Badge-stories",1067:"components-CardScroll-CardScroll-stories",1195:"components-Input-Input-stories",1238:"components-SubnavigationButton-SubnavigationButton-stories",1310:"components-GridAvatar-GridAvatar-stories",1314:"components-Header-Header-stories",1325:"components-Tooltip-Tooltip-stories",1385:"components-Root-Root-stories",1574:"components-ScreenSpinner-ScreenSpinner-stories",1739:"components-CustomSelectOption-CustomSelectOption-stories",1747:"components-Button-Button-stories",1857:"components-Snackbar-Snackbar-stories",1895:"components-ModalCardBase-ModalCardBase-stories",1957:"components-VisuallyHidden-VisuallyHidden-stories",1975:"components-File-File-stories",2178:"components-UsersStack-UsersStack-stories",2358:"components-AdaptivityProvider-AdaptivityProvider-stories",2503:"components-ContentCard-ContentCard-stories",2580:"components-ImageBase-ImageBaseOverlay-ImageBaseOverlay-stories",2612:"components-InfoRow-InfoRow-stories",2748:"components-SplitLayout-SplitLayout-stories",2753:"components-CellButton-CellButton-stories",2968:"components-SegmentedControl-SegmentedControl-stories",3046:"components-Typography-Paragraph-Paragraph-stories",3067:"components-CalendarRange-CalendarRange-stories",3083:"components-TabsItem-TabsItem-stories",3106:"components-Link-Link-stories",3150:"components-PlatformProvider-PlatformProvider-stories",3317:"components-PopoutWrapper-PopoutWrapper-stories",3423:"components-ConfigProvider-ConfigProvider-stories",3430:"components-SubnavigationBar-SubnavigationBar-stories",3551:"components-MiniInfoCell-MiniInfoCell-stories",3859:"components-ChipsInput-ChipsInput-stories",3929:"components-Slider-Slider-stories",4072:"components-ModalRoot-ModalRoot-stories",4197:"components-NativeSelect-NativeSelect-stories",4249:"components-LocaleProvider-LocaleProvider-stories",4395:"components-Gallery-Gallery-stories",4529:"components-Chip-Chip-stories",4612:"components-Checkbox-Checkbox-stories",4679:"components-Textarea-Textarea-stories",4758:"components-Placeholder-Placeholder-stories",4759:"components-PromoBanner-PromoBanner-stories",4795:"components-SimpleCell-SimpleCell-stories",4869:"components-Tappable-Tappable-stories",5051:"components-FormLayoutGroup-FormLayoutGroup-stories",5179:"components-ChipsSelect-ChipsSelect-stories",5266:"components-Typography-Footnote-Footnote-stories",5523:"components-Div-Div-stories",5571:"components-TabbarItem-TabbarItem-stories",5632:"components-Search-Search-stories",5646:"components-Typography-Typography-stories",5689:"components-Banner-Banner-stories",5783:"components-Typography-Title-Title-stories",5838:"components-ActionSheetItem-ActionSheetItem-stories",5846:"components-HorizontalScroll-HorizontalScroll-stories",5961:"components-FormItem-FormItem-stories",5989:"components-Avatar-Avatar-stories",6027:"components-Typography-Caption-Caption-stories",6038:"components-ActionSheet-ActionSheet-stories",6103:"components-Gradient-Gradient-stories",6144:"components-DatePicker-DatePicker-stories",6171:"components-FormField-FormField-stories",6256:"components-IconButton-IconButton-stories",6298:"components-FormStatus-FormStatus-stories",6311:"components-Switch-Switch-stories",6550:"components-ModalPage-ModalPage-stories",6575:"components-FixedLayout-FixedLayout-stories",6606:"components-Spacing-Spacing-stories",6615:"components-Cell-Cell-stories",6714:"components-Panel-Panel-stories",6980:"components-AppearanceProvider-AppearanceProvider-stories",7149:"components-SelectMimicry-SelectMimicry-stories",7202:"components-CustomSelect-CustomSelect-stories",7216:"components-Separator-Separator-stories",7302:"components-Epic-Epic-stories",7478:"components-Touch-Touch-stories",7518:"components-Card-Card-stories",7524:"components-DateRangeInput-DateRangeInput-stories",7531:"components-Select-Select-stories",7586:"components-Alert-Alert-stories",7712:"components-Tabbar-Tabbar-stories",7717:"components-ImageBase-ImageBaseBadge-ImageBaseBadge-stories",7773:"components-PanelHeader-PanelHeader-stories",7867:"components-DateInput-DateInput-stories",7978:"components-Calendar-Calendar-stories",8016:"components-Typography-Text-Text-stories",8034:"components-HorizontalCell-HorizontalCell-stories",8101:"components-List-List-stories",8110:"components-Footer-Footer-stories",8232:"components-Typography-Headline-Headline-stories",8258:"components-ModalCard-ModalCard-stories",8313:"components-Accordion-Accordion-stories",8488:"components-RichCell-RichCell-stories",8620:"components-Tabs-Tabs-stories",8783:"components-Spinner-Spinner-stories",8832:"components-Group-Group-stories",8991:"components-View-View-stories",9212:"components-ButtonGroup-ButtonGroup-stories",9285:"components-TextTooltip-TextTooltip-stories",9495:"components-Radio-Radio-stories",9704:"components-RadioGroup-RadioGroup-stories",9705:"components-Popover-Popover-stories",9802:"components-Typography-Subhead-Subhead-stories",9873:"components-PanelSpinner-PanelSpinner-stories",9904:"components-RangeSlider-RangeSlider-stories",9908:"components-Counter-Counter-stories"})[e]||e)+"."+({26:"842619c1",68:"42f0855f",234:"ecfef02b",278:"342966f8",409:"f1050a67",428:"ee9551a0",643:"2df8a02a",650:"f1baa47f",736:"2ae36d99",949:"bff2089b",969:"80dd52ed",1037:"2e0727e5",1065:"361ef937",1067:"62833d5e",1127:"74a07b22",1195:"35004ce8",1238:"0cc89c28",1264:"07b2771d",1285:"346bb373",1310:"bc5d435e",1314:"e04c3766",1325:"62b6f0d8",1345:"9e7c6de4",1385:"974136b3",1419:"ef1c2c79",1526:"4a48606c",1574:"e640f011",1716:"3a2828fe",1739:"19009527",1747:"96f0ce89",1849:"87a924b3",1857:"b3dcc284",1895:"8b9f4b82",1957:"acbdee51",1975:"2eb0b27f",2068:"f15414d6",2161:"6204b25e",2178:"29aa2ee8",2229:"7f346ca1",2310:"03390a14",2358:"d0055f7b",2503:"cb73fef9",2580:"93d50316",2612:"67807d0d",2748:"dce4ef52",2753:"a7817647",2872:"48d22662",2968:"dbf1f192",3046:"22b6e511",3067:"6f62e23f",3083:"02d8ed6c",3106:"33bbc921",3150:"c1f0b33d",3317:"ad112150",3423:"e1012452",3430:"2460c724",3551:"975b4423",3604:"ef2717d4",3843:"a793cb6b",3859:"f9cbb4b1",3929:"6e6d3ab1",4072:"80b1dd05",4197:"f6deb3de",4249:"03427925",4395:"76b7301d",4529:"147f59a2",4534:"6f2de65b",4612:"d71a7b12",4679:"530dad6a",4758:"6bcc8ae5",4759:"bdfd701a",4795:"318a303f",4869:"8bd81f0d",4888:"cbc267fd",5019:"9f65229e",5051:"b62cb2c3",5179:"d6536ff5",5266:"4da8ee56",5516:"0dc34f64",5523:"9745105b",5571:"ef08925c",5632:"319106ab",5646:"efd73a30",5689:"b49e52c7",5778:"759034da",5783:"da2a7f3c",5838:"4713e7b0",5846:"b73ca71e",5853:"ea884c68",5961:"7e708d51",5989:"b0e35427",6027:"a603d6ac",6038:"d94a6c0b",6065:"c6817476",6098:"239704c4",6103:"65f3ad15",6116:"5281f64e",6132:"0a9682b3",6144:"322cdfa3",6145:"c616b3f0",6171:"a5d1bbe1",6256:"77902d1c",6298:"37246c68",6311:"a8a59dd4",6351:"f979eb88",6396:"f1375d95",6550:"d1692aa1",6575:"6d9d0814",6606:"caf6dcce",6615:"21f0f3b0",6714:"bfffd982",6721:"e306fe1c",6980:"7cf8b360",7050:"39a19343",7149:"59f3f8fd",7202:"25df6685",7216:"560be401",7302:"5efe9e7b",7478:"69f9e438",7518:"fafd9197",7524:"2ef2f3c2",7531:"73910432",7586:"aeed731f",7587:"c842ae21",7712:"7df48d19",7717:"fea3de7b",7773:"66e91b15",7867:"200232bf",7978:"52e509c7",8001:"42183bd1",8016:"dac5c14d",8034:"e7334fcc",8036:"38df556f",8101:"b1607031",8110:"b4b35319",8157:"2ac2cd40",8232:"d2340114",8258:"e8f8a7fa",8313:"f295f363",8333:"81a7a0df",8416:"ad6f883e",8488:"396296b5",8620:"8231c8ef",8681:"24ed09bb",8783:"b866b8ca",8802:"edf0316e",8821:"62b8066b",8832:"d220de27",8898:"e26552c6",8991:"3d78c25e",9011:"5036dd1b",9212:"8c298728",9285:"f519769f",9409:"c5c4e1dc",9495:"f1572529",9704:"64b7a4c3",9705:"477607ea",9802:"e40ce496",9873:"122cc35e",9904:"3ab574ad",9908:"d48447f5"})[e]+".iframe.bundle.js"}}(),function(){t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||Function("return this")()}catch(e){if("object"==typeof window)return window}}()}(),function(){t.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)}}(),function(){var e={},o="@vkontakte/vkui:";t.l=function(n,r,s,i){if(e[n]){e[n].push(r);return}if(void 0!==s)for(var a,c,p=document.getElementsByTagName("script"),d=0;d<p.length;d++){var l=p[d];if(l.getAttribute("src")==n||l.getAttribute("data-webpack")==o+s){a=l;break}}a||(c=!0,(a=document.createElement("script")).charset="utf-8",a.timeout=120,t.nc&&a.setAttribute("nonce",t.nc),a.setAttribute("data-webpack",o+s),a.src=n),e[n]=[r];var u=function(o,t){a.onerror=a.onload=null,clearTimeout(m);var r=e[n];if(delete e[n],a.parentNode&&a.parentNode.removeChild(a),r&&r.forEach(function(e){return e(t)}),o)return o(t)},m=setTimeout(u.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=u.bind(null,a.onerror),a.onload=u.bind(null,a.onload),c&&document.head.appendChild(a)}}(),function(){t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){t.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e}}(),function(){t.p=""}(),function(){var e={1303:0};t.f.j=function(o,n){var r=t.o(e,o)?e[o]:void 0;if(0!==r){if(r)n.push(r[2]);else if(1303!=o){var s=new Promise(function(t,n){r=e[o]=[t,n]});n.push(r[2]=s);var i=t.p+t.u(o),a=Error();t.l(i,function(n){if(t.o(e,o)&&(0!==(r=e[o])&&(e[o]=void 0),r)){var s=n&&("load"===n.type?"missing":n.type),i=n&&n.target&&n.target.src;a.message="Loading chunk "+o+" failed.\n("+s+": "+i+")",a.name="ChunkLoadError",a.type=s,a.request=i,r[1](a)}},"chunk-"+o,o)}else e[o]=0}},t.O.j=function(o){return 0===e[o]};var o=function(o,n){var r,s,i=n[0],a=n[1],c=n[2],p=0;if(i.some(function(o){return 0!==e[o]})){for(r in a)t.o(a,r)&&(t.m[r]=a[r]);if(c)var d=c(t)}for(o&&o(n);p<i.length;p++)s=i[p],t.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return t.O(d)},n=self.webpackChunk_vkontakte_vkui=self.webpackChunk_vkontakte_vkui||[];n.forEach(o.bind(null,0)),n.push=o.bind(null,n.push.bind(n))}(),function(){t.nc=void 0}()}();