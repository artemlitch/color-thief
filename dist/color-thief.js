if(!t)var t={map:function(t,r){var n={};return r?t.map(function(t,o){return n.index=o,r.call(n,t)}):t.slice()},naturalOrder:function(t,r){return t<r?-1:t>r?1:0},sum:function(t,r){var n={};return t.reduce(r?function(t,o,e){return n.index=e,t+r.call(n,o)}:function(t,r){return t+r},0)},max:function(r,n){return Math.max.apply(null,n?t.map(r,n):r)}};var r=function(){var r=5,n=8-r,o=1e3;function e(t,n,o){return(t<<2*r)+(n<<r)+o}function i(t){var r=[],n=!1;function o(){r.sort(t),n=!0}return{push:function(t){r.push(t),n=!1},peek:function(t){return n||o(),void 0===t&&(t=r.length-1),r[t]},pop:function(){return n||o(),r.pop()},size:function(){return r.length},map:function(t){return r.map(t)},debug:function(){return n||o(),r}}}function u(t,r,n,o,e,i,u){this.r1=t,this.r2=r,this.g1=n,this.g2=o,this.b1=e,this.b2=i,this.histo=u}function a(){this.vboxes=new i(function(r,n){return t.naturalOrder(r.vbox.count()*r.vbox.volume(),n.vbox.count()*n.vbox.volume())})}function s(r,n){if(n.count()){var o=n.r2-n.r1+1,i=n.g2-n.g1+1,u=t.max([o,i,n.b2-n.b1+1]);if(1==n.count())return[n.copy()];var a,s,h,c,f=0,v=[],l=[];if(u==o)for(a=n.r1;a<=n.r2;a++){for(c=0,s=n.g1;s<=n.g2;s++)for(h=n.b1;h<=n.b2;h++)c+=r[e(a,s,h)]||0;v[a]=f+=c}else if(u==i)for(a=n.g1;a<=n.g2;a++){for(c=0,s=n.r1;s<=n.r2;s++)for(h=n.b1;h<=n.b2;h++)c+=r[e(s,a,h)]||0;v[a]=f+=c}else for(a=n.b1;a<=n.b2;a++){for(c=0,s=n.r1;s<=n.r2;s++)for(h=n.g1;h<=n.g2;h++)c+=r[e(s,h,a)]||0;v[a]=f+=c}return v.forEach(function(t,r){l[r]=f-t}),function(t){var r,o,e,i,u,s=t+"1",h=t+"2",c=0;for(a=n[s];a<=n[h];a++)if(v[a]>f/2){for(e=n.copy(),i=n.copy(),u=(r=a-n[s])<=(o=n[h]-a)?Math.min(n[h]-1,~~(a+o/2)):Math.max(n[s],~~(a-1-r/2));!v[u];)u++;for(c=l[u];!c&&v[u-1];)c=l[--u];return e[h]=u,i[s]=e[h]+1,[e,i]}}(u==o?"r":u==i?"g":"b")}}return u.prototype={volume:function(t){return this._volume&&!t||(this._volume=(this.r2-this.r1+1)*(this.g2-this.g1+1)*(this.b2-this.b1+1)),this._volume},count:function(t){var r=this.histo;if(!this._count_set||t){var n,o,i,u=0;for(n=this.r1;n<=this.r2;n++)for(o=this.g1;o<=this.g2;o++)for(i=this.b1;i<=this.b2;i++)u+=r[e(n,o,i)]||0;this._count=u,this._count_set=!0}return this._count},copy:function(){return new u(this.r1,this.r2,this.g1,this.g2,this.b1,this.b2,this.histo)},avg:function(t){var n=this.histo;if(!this._avg||t){var o,i,u,a,s=0,h=1<<8-r,c=0,f=0,v=0;for(i=this.r1;i<=this.r2;i++)for(u=this.g1;u<=this.g2;u++)for(a=this.b1;a<=this.b2;a++)s+=o=n[e(i,u,a)]||0,c+=o*(i+.5)*h,f+=o*(u+.5)*h,v+=o*(a+.5)*h;this._avg=s?[~~(c/s),~~(f/s),~~(v/s)]:[~~(h*(this.r1+this.r2+1)/2),~~(h*(this.g1+this.g2+1)/2),~~(h*(this.b1+this.b2+1)/2)]}return this._avg},contains:function(t){var r=t[0]>>n;return gval=t[1]>>n,bval=t[2]>>n,r>=this.r1&&r<=this.r2&&gval>=this.g1&&gval<=this.g2&&bval>=this.b1&&bval<=this.b2}},a.prototype={push:function(t){this.vboxes.push({vbox:t,color:t.avg()})},palette:function(){return this.vboxes.map(function(t){return t.color})},size:function(){return this.vboxes.size()},map:function(t){for(var r=this.vboxes,n=0;n<r.size();n++)if(r.peek(n).vbox.contains(t))return r.peek(n).color;return this.nearest(t)},nearest:function(t){for(var r,n,o,e=this.vboxes,i=0;i<e.size();i++)((n=Math.sqrt(Math.pow(t[0]-e.peek(i).color[0],2)+Math.pow(t[1]-e.peek(i).color[1],2)+Math.pow(t[2]-e.peek(i).color[2],2)))<r||void 0===r)&&(r=n,o=e.peek(i).color);return o},forcebw:function(){var r=this.vboxes;r.sort(function(r,n){return t.naturalOrder(t.sum(r.color),t.sum(n.color))});var n=r[0].color;n[0]<5&&n[1]<5&&n[2]<5&&(r[0].color=[0,0,0]);var o=r.length-1,e=r[o].color;e[0]>251&&e[1]>251&&e[2]>251&&(r[o].color=[255,255,255])}},{quantize:function(h,c){if(!h.length||c<2||c>256)return!1;var f=function(t){var o,i=new Array(1<<3*r);return t.forEach(function(t){o=e(t[0]>>n,t[1]>>n,t[2]>>n),i[o]=(i[o]||0)+1}),i}(h);f.forEach(function(){});var v=function(t,r){var o,e,i,a=1e6,s=0,h=1e6,c=0,f=1e6,v=0;return t.forEach(function(t){(o=t[0]>>n)<a?a=o:o>s&&(s=o),(e=t[1]>>n)<h?h=e:e>c&&(c=e),(i=t[2]>>n)<f?f=i:i>v&&(v=i)}),new u(a,s,h,c,f,v,r)}(h,f),l=new i(function(r,n){return t.naturalOrder(r.count(),n.count())});function g(t,r){for(var n,e=t.size(),i=0;i<o;){if(e>=r)return;if(i++>o)return;if((n=t.pop()).count()){var u=s(f,n),a=u[0],h=u[1];if(!a)return;t.push(a),h&&(t.push(h),e++)}else t.push(n),i++}}l.push(v),g(l,.75*c);for(var p=new i(function(r,n){return t.naturalOrder(r.count()*r.volume(),n.count()*n.volume())});l.size();)p.push(l.pop());g(p,c);for(var b=new a;p.size();)b.push(p.pop());return b}}}().quantize,n=function(t){this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),this.width=this.canvas.width=t.width,this.height=this.canvas.height=t.height,this.context.drawImage(t,0,0,this.width,this.height)};n.prototype.getImageData=function(){return this.context.getImageData(0,0,this.width,this.height)};var o=function(){};o.prototype.getColor=function(t,r){return void 0===r&&(r=10),this.getPalette(t,5,r)[0]},o.prototype.getPalette=function(t,o,e){var i=function(t){var r=t.colorCount,n=t.quality;if(void 0!==r&&Number.isInteger(r)){if(1===r)throw new Error("colorCount should be between 2 and 20. To get one color, call getColor() instead of getPalette()");r=Math.max(r,2),r=Math.min(r,20)}else r=10;return void 0===n||Number.isInteger(n)?n=10:n<1&&(n=10),{colorCount:r,quality:n}}({colorCount:o,quality:e}),u=new n(t),a=function(t,r,n){for(var o=t,e=[],i=0,u=void 0,a=void 0,s=void 0,h=void 0,c=void 0;i<r;i+=n)a=o[0+(u=4*i)],s=o[u+1],h=o[u+2],(void 0===(c=o[u+3])||c>=125)&&(a>250&&s>250&&h>250||e.push([a,s,h]));return e}(u.getImageData().data,u.width*u.height,i.quality),s=r(a,i.colorCount);return s?s.palette():null},o.prototype.getColorFromUrl=function(t,r,n){var o=document.createElement("img"),e=this;o.addEventListener("load",function(){var i=e.getPalette(o,5,n);r(i[0],t)}),o.src=t},o.prototype.getImageData=function(t,r){var n=new XMLHttpRequest;n.open("GET",t,!0),n.responseType="arraybuffer",n.onload=function(){if(200==this.status){var t=new Uint8Array(this.response);o=t.length;for(var n=new Array(o),o=0;o<t.length;o++)n[o]=String.fromCharCode(t[o]);var e=n.join(""),i=window.btoa(e);r("data:image/png;base64,"+i)}else console.error("Error fetching image")},n.send()},o.prototype.getColorAsync=function(t,r,n){var o=this;this.getImageData(t,function(t){var e=document.createElement("img");e.addEventListener("load",function(){var t=o.getPalette(e,5,n);r(t[0],this)}),e.crossorigin="anonymous",e.src=t})},module.exports=o;
//# sourceMappingURL=color-thief.js.map
