Delete("YKsGt")
Delete("h0AMy")
Delete("f6XvN")
SetVariables({
  background: { type: "color", value: "#FAFAFA" },
  foreground: { type: "color", value: "#09090B" },
  primary: { type: "color", value: "#18181B" },
  "primary-foreground": { type: "color", value: "#FAFAFA" },
  muted: { type: "color", value: "#F4F4F5" },
  "muted-foreground": { type: "color", value: "#71717A" },
  border: { type: "color", value: "#E4E4E7" },
  card: { type: "color", value: "#FFFFFF" },
  "radius-md": { type: "number", value: 8 },
  "font-display": { type: "string", value: "Inter" },
  "font-body": { type: "string", value: "Inter" }
}, true)
desktop=Insert(document,{type:"frame",name:"Desktop",x:0,y:0,width:1440,height:3200,layout:"vertical",fill:"$background",clip:false,padding:[80,48,48,48],gap:48})
Insert(desktop,{type:"text",name:"Hero/Headline",fontFamily:"$font-display",fontSize:64,fontWeight:"700",fill:"$foreground",content:"綦广名"})
Insert(desktop,{type:"text",name:"Hero/Tagline",fontFamily:"$font-body",fontSize:18,fill:"$muted-foreground",content:"项目管理 · PMO"})
Insert(desktop,{type:"frame",name:"Hero/CTA",layout:"horizontal",padding:[12,24],fill:"$primary",cornerRadius:"$radius-md"})
Insert(desktop,{type:"text",name:"Section/About",fontFamily:"$font-display",fontSize:32,fontWeight:"600",fill:"$foreground",content:"关于我"})
Insert(desktop,{type:"frame",name:"Card/About",width:1344,layout:"vertical",padding:24,fill:"$card",stroke:"$border",strokeWidth:1,cornerRadius:"$radius-md"})
Insert(desktop,{type:"text",name:"Section/Projects",fontFamily:"$font-display",fontSize:32,fontWeight:"600",fill:"$foreground",content:"项目经历"})
mobile=Insert(document,{type:"frame",name:"Mobile",x:1600,y:0,width:390,height:4000,layout:"vertical",fill:"$background",clip:false,padding:[72,16,32,16],gap:32})
Insert(mobile,{type:"text",name:"Hero/Headline",fontFamily:"$font-display",fontSize:40,fontWeight:"700",fill:"$foreground",content:"綦广名"})
