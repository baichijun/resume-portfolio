Delete("YKsGt")
Delete("h0AMy")
Delete("f6XvN")
SetVariables({
  bg: { type: "color", value: "#F0F4FF" },
  "bg-secondary": { type: "color", value: "#FFFFFF" },
  "text-primary": { type: "color", value: "#1E1B4B" },
  "text-muted": { type: "color", value: "#6366F1" },
  accent: { type: "color", value: "#6366F1" },
  "accent-secondary": { type: "color", value: "#A855F7" },
  border: { type: "color", value: "#C7D2FE" },
  "card-bg": { type: "color", value: "#FFFFFFD9" },
  "radius-md": { type: "number", value: 20 },
  shadow: { type: "string", value: "0 12px 40px rgba(99, 102, 241, 0.12)" },
  "font-display": { type: "string", value: "Plus Jakarta Sans" },
  "font-body": { type: "string", value: "Plus Jakarta Sans" }
}, true)
desktop=Insert(document,{type:"frame",name:"Desktop",x:0,y:0,width:1440,height:3200,layout:"vertical",fill:"$bg",clip:false,padding:[80,48,48,48],gap:48})
Insert(desktop,{type:"text",name:"Hero/Headline",fontFamily:"$font-display",fontSize:56,fontWeight:"800",fill:"$text-primary",content:"綦广名"})
Insert(desktop,{type:"text",name:"Hero/Tagline",fontFamily:"$font-body",fontSize:18,fill:"$text-muted",content:"Halo · Soft luminous portfolio"})
Insert(desktop,{type:"frame",name:"Hero/Glow",width:200,height:200,fill:"$accent",opacity:0.15,cornerRadius:999})
Insert(desktop,{type:"text",name:"Section/About",fontFamily:"$font-display",fontSize:30,fontWeight:"700",fill:"$accent",content:"关于我"})
Insert(desktop,{type:"frame",name:"Card/About",width:1344,layout:"vertical",padding:28,fill:"$card-bg",stroke:"$border",strokeWidth:1,cornerRadius:"$radius-md"})
mobile=Insert(document,{type:"frame",name:"Mobile",x:1600,y:0,width:390,height:4000,layout:"vertical",fill:"$bg",clip:false,padding:[72,16,32,16],gap:32})
Insert(mobile,{type:"text",name:"Hero/Headline",fontFamily:"$font-display",fontSize:34,fontWeight:"800",fill:"$text-primary",content:"綦广名"})
