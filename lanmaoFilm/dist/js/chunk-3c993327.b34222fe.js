(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3c993327"],{"2eb4":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",[e._v("个人中心：")]),a("div",{staticClass:"userdiv"},[e._v("当前用户："+e._s(e.$store.state.user.name)+" "),a("div",{staticClass:"logout",on:{touchstart:e.handleToLogout}},[e._v("退出")])])])},o=[],s=(a("b0c0"),a("bc3a")),c=a.n(s),i=a("7826"),l={name:"center",methods:{handleToLogout:function(){var e=this;this.axios.get("/api2/users/logout").then((function(t){console.log(t);var a=t.data.status;0===a&&e.$router.push("/mine/login")})).catch((function(e){console.log(e)}))},handleToUpload:function(e){var t=this,a=e.target.files[0],n=new FormData;n.append("file",a,a.name);var o={headers:{"Content-Type":"multipart/form-data"}};this.axios.post("/api2/users/uploadUserHead",n,o).then((function(e){var a=e.data.status,n=t;0===a&&Object(i["a"])({title:"信息",content:"上传头像成功",ok:"确定",hanldeOk:function(){this.$store.commit("user/USER_NAME",{name:n.$store.state.user.name,isAdmin:n.$store.state.user.isAdmin,userHead:e.data.data.userHead+"?"+Math.random()})}})}))}},beforeRouteEnter:function(e,t,a){c.a.get("/api2/users/getUser").then((function(e){var t=e.data.status;a(0===t?function(t){localStorage.setItem("name",e.data.data.username),localStorage.setItem("isAdmin",e.data.data.isAdmin),t.$store.commit("user/USER_NAME",{name:e.data.data.username,isAdmin:e.data.data.isAdmin,userHead:e.data.data.userHead})}:"/mine/login")})).catch((function(e){console.log("err>",e)}))}},r=l,d=(a("fa1b"),a("2877")),u=Object(d["a"])(r,n,o,!1,null,"27523ae0",null);t["default"]=u.exports},5546:function(e,t,a){},7826:function(e,t,a){"use strict";var n=a("2b0e"),o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"messageBox"},[a("h2",[e._v(e._s(e.title))]),a("p",[e._v(e._s(e.content))]),a("div",[e.cancel?a("div",{on:{touchstart:e.handleCancel}},[e._v(e._s(e.cancel))]):e._e(),e.ok?a("div",{on:{touchstart:e.handleOk}},[e._v(e._s(e.ok))]):e._e()])])},s=[],c={name:"MessageBox"},i=c,l=(a("ca21"),a("2877")),r=Object(l["a"])(i,o,s,!1,null,"1eba985e",null),d=r.exports;a.d(t,"a",(function(){return u}));var u=function(){return function(e){var t={title:"",content:"",cancel:"",ok:"",handleCancel:null,handleOk:null},a=n["default"].extend(d);for(var o in e)t[o]=e[o];var s=new a({el:document.createElement("div"),data:{title:t.title,content:t.content,cancel:t.cancel,ok:t.ok},methods:{handleCancel:function(){t.handleCancel&&t.handleCancel.call(this),document.body.removeChild(s.$el)},handleOk:function(){t.handleOk&&t.handleOk.call(this),document.body.removeChild(s.$el)}}});document.body.appendChild(s.$el)}}()},aab3:function(e,t,a){},ca21:function(e,t,a){"use strict";var n=a("5546"),o=a.n(n);o.a},fa1b:function(e,t,a){"use strict";var n=a("aab3"),o=a.n(n);o.a}}]);
//# sourceMappingURL=chunk-3c993327.b34222fe.js.map