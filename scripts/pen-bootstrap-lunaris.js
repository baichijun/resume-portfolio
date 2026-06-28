Delete("YKsGt")
Delete("h0AMy")
Delete("f6XvN")
SetVariables({
  bg: { type: "color", value: "#0D1117" },
  "bg-secondary": { type: "color", value: "#161B22" },
  "text-primary": { type: "color", value: "#E6EDF3" },
  "text-muted": { type: "color", value: "#8B949E" },
  accent: { type: "color", value: "#7C6BF5" },
  "accent-secondary": { type: "color", value: "#58A6FF" },
  border: { type: "color", value: "#30363D" },
  "card-bg": { type: "color", value: "#161B22" },
  "radius-md": { type: "number", value: 10 },
  "font-display": { type: "string", value: "Geist" },
  "font-body": { type: "string", value: "Geist" }
}, true)
desktop=Insert(document,{type:"frame",name:"Desktop",x:0,y:0,width:1440,height:3200,layout:"vertical",fill:"$bg",clip:false,padding:[80,48,48,48],gap:48})
Insert(desktop,{type:"text",name:"Hero/Headline",fontFamily:"$font-display",fontSize:60,fontWeight:"700",fill:"$text-primary",content:"綦广名"})
Insert(desktop,{type:"text",name:"Hero/Tagline",fontFamily:"$font-body",fontSize:18,fill:"$text-muted",content:"Lunaris · Project Portfolio"})
Insert(desktop,{type:"frame",name:"Shell/AccentBar",width:120,height:4,fill:"$accent",cornerRadius:2})
Insert(desktop,{type:"text",name:"Section/About",fontFamily:"$font-display",fontSize:28,fontWeight:"600",fill:"$accent",content:"关于我"})
Insert(desktop,{type:"frame",name:"Card/About",width:1344,layout:"vertical",padding:24,fill:"$card-bg",stroke:"$border",strokeWidth:1,cornerRadius:"$radius-md"})
mobile=Insert(document,{type:"frame",name:"Mobile",x:1600,y:0,width:390,height:4000,layout:"vertical",fill:"$bg",clip:false,padding:[72,16,32,16],gap:32})
Insert(mobile,{type:"text",name:"Hero/Headline",fontFamily:"$font-display",fontSize:36,fontWeight:"700",fill:"$text-primary",content:"綦广名"})
