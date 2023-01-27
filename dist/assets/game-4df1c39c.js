import"./modulepreload-polyfill-ec808ebb.js";const a=new WebSocket("ws://localhost:5000");let c=`
############################################################################################################
#                                                     |    |                                               #
#                                                     |    |                                               #
#                                                     |____|                                               #
#                                                                                                          #
#                                                                                                          #
#                                                                                                          #
#                                                                                                          #
#                +----------------+                                                                        #
#                |                |                                                                        #
#                                 |                                                                        #
#                |                +----------------+                                                       #
#                |                                 |                                                       #
#                |                                 |                                                       #
#                |                       +---------+                                                       #
#                |                       |                                                                 #
#                +-----------------------+       +------+                                                  #
#                                                |      |                                                  #
#                                                |      |                                                  #
#                                                |      |                                                  #
#                                                |      |                                                  #
#                                                +------+                                                  #
#                                                                                                          #
#                                                                                                          #
#                                                                                                          #
#                                                                                                          #
#                                                                                                          #
#                                                                                                          #
#                                                                                                          #
#                                                                                                          #
#                                     +----------+                                                         #
#                                     |          |                                                         #
#                                     |          |                                                         #
#                                     |          |                                                         #
#                                     |          |                                                         #
#                            +---] [--+          +---[ ]-+                                                 #
#                            |                           |                                                 #
#                            |                   +-------+                                                 #
#                            |                   |                                                         #
#                            |                   |                                                         #
#                            |                   |                                                         #
#                            |                   |                                                         #
#                            +-------------------+                                                         #
#                                                                                                          #
#                                                                                                          #
#                                                                                                          #
#                                                                                                          #
#                                                                                                          #
#                                                                                                          #
#                                                                                                          #
#                                                                                                          #
#                                                                                                          #
#                                                                                                          #
#                                                                                                          #
#                                                                                                          #
#                                                                                                          #
#                                                                                                          #
#                                                                                                          #
#                                                                                                          #
############################################################################################################
`;const d=e=>{let t=c.split(`
`);for(const[o,n]of e)t[n+1]=t[n+1].substring(0,o)+"0"+t[n+1].substring(o+1);return t},i=function(e){const t=document.getElementById("game-map-div"),o=d(e);t.textContent=o.join(`
`)},s=function(e){a.readyState?a.send(e):setTimeout(function(){s(e)},100)};onload=()=>{const e=document.cookie.split("=")[1];s(`setClient_${e}`),i([[0,0]])};globalThis.addEventListener("keydown",e=>{e.keyCode==37?s("go_left"):e.keyCode==38?s("go_up"):e.keyCode==39?s("go_right"):e.keyCode==40&&s("go_down")});a.onmessage=e=>{const t=JSON.parse(e.data),o=t.data;switch(t.type){case"playersPos":{console.log(o),i(o);break}}};
