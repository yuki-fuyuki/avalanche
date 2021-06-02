"use strict";const namedMonth=["January","February","March","April","May","June","July","August","September","October","November","December"];const namedDay=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function runningTimeInMilliseconds(e){return 1e3*60*60*e}const oneDay=24*60*60*1e3;function getNextRun(){var e=new Date;e.setUTCHours(19);e.setUTCMinutes(0);e.setUTCSeconds(0);e.setUTCDate(e.getUTCDate()+6-e.getUTCDay());var n=Math.floor(e.valueOf()/(oneDay*7))%2==1;if(n){return e}else{e.setUTCDate(e.getUTCDate()+7);return e}}function getCustomEvent(e,n,t,a){return new Date(Date.UTC(e,n,t,a))}function formatDateForPublish(e){var n=e.toString();var t=n.indexOf(":");var a=`${namedDay[e.getDay()]}, ${e.getDate()} ${namedMonth[e.getMonth()]} ${e.getFullYear()}, ${n.substring(t-2,t+3)}\n${n.substring(t+6)}`;return a}function timeUntil(e,n){var t=e-new Date;if(t<=0&&t>=-runningTimeInMilliseconds(n)){return"Right now!"}else if(t<-runningTimeInMilliseconds(n)){return`In the past.`}else{return"In "+formatCountdown(t/1e3)}}function formatCountdown(e){var n=Math.floor(e/(60*60*24));var t=Math.floor(e/(60*60)%24);var a=Math.floor(e/60%60);var e=Math.floor(e%60);var r="";if(n>0){r+=`${n} day${n!=1?"s":""}, `}return r+`${t} hour${t!=1?"s":""}, ${a} minute${a!=1?"s":""}, and ${e} second${e!=1?"s":""} from now.`}function updateTimeRemaining(e,n,t){if(t===undefined)t="";document.getElementById(t+"remaining").innerText=timeUntil(e,n)}function startTimer(e,n,t,a,r,i){if(e===undefined)e="";var u;if(n==undefined){u=getNextRun();i=3}else{u=getCustomEvent(n,t,a,r)}var o=document.getElementById(e+"nextRun");if(o!=null)o.innerText=formatDateForPublish(u);updateTimeRemaining(u,i,e);setTimeout(1001-new Date%1e3,setInterval(()=>updateTimeRemaining(u,i,e),1e3))}