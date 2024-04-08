"use strict";(self.webpackChunkcomplex_react_app=self.webpackChunkcomplex_react_app||[]).push([[729],{729:(e,t,a)=>{a.r(t),a.d(t,{default:()=>h});var l=a(540),n=a(569),s=a(266),c=a(767),r=a(976),o=a(149),m=a(809),i=a(663),u=a(953),d=a(343),p=a(306);const h=function(){const e=(0,c.Zp)(),t=(0,l.useContext)(p.A),a=(0,l.useContext)(d.A),[h,E]=(0,l.useState)(!0),[f,g]=(0,l.useState)(),{id:w}=(0,c.g)(),[N,y]=(0,l.useState)(!1);if((0,l.useEffect)((()=>{const e=s.A.CancelToken.source();return async function(){try{const t=await s.A.get(`/post/${w}`,{cancelToken:e.token});t.data?(g(t.data),E(!1)):y(!0)}catch(e){console.log("There was a problem or the request was canceled."),y(!0)}}(),()=>{e.cancel()}}),[w]),N)return l.createElement(u.A,null);if(!h&&!f)return l.createElement(u.A,null);if(h)return l.createElement(n.A,{title:"..."},l.createElement(o.A,null));const b=new Date(f.createdDate);return b.getMonth(),b.getDate(),b.getFullYear(),l.createElement(n.A,{title:f?f.title:"..."}," ",f?l.createElement("div",null,l.createElement("div",{className:"d-flex justify-content-between"},l.createElement("h2",null,f.title),!!a.loggedIn&&a.user.username==f.author.username&&l.createElement("span",{className:"pt-2"},l.createElement(r.N_,{to:`/post/${f._id}/edit`,"data-tooltip-content":"Edit","data-tooltip-id":"edit",className:"text-primary mr-2"},l.createElement("i",{className:"fas fa-edit"})),l.createElement(i.m_,{id:"edit",className:"custom-tooltip"}),l.createElement("a",{onClick:async function(){if(window.confirm("Do you really want to delete this post?"))try{"Success"==(await s.A.delete(`/post/${w}`,{data:{token:a.user.token}})).data&&(t({type:"flashMessage",value:"Post was successfully deleted"}),e(`/profile/${a.user.username}`))}catch(e){console.log("There was a problem with deleting")}},"data-tooltip-content":"Delete","data-tooltip-id":"delete",className:"delete-post-button text-danger"},l.createElement("i",{className:"fas fa-trash"})),l.createElement(i.m_,{id:"delete",className:"custom-tooltip"}))),l.createElement("p",{className:"text-muted small mb-4"},l.createElement(r.N_,{to:`/profile/${f.author.username}`},l.createElement("img",{className:"avatar-tiny",src:f.author.avatar,alt:"avatar"})),"Posted by ",l.createElement(r.N_,{to:`/profile/${f.author.username}`},f.author.username)," on ",new Date(f.createdDate).toLocaleDateString()),l.createElement("div",{className:"body-content"},l.createElement(m.o,{children:f.body,allowedElements:["p","br","strong","em","h1","h2","h3","h4","h5","h6","ul","li"]}))):l.createElement("div",{className:"text-center"},l.createElement("p",null,"Loading post...")))}}}]);