Delete("YKsGt")
Delete("h0AMy")
Delete("f6XvN")
SetVariables({
  bg: { type: "color", value: "#0F172A" },
  "bg-secondary": { type: "color", value: "#FFFFFF0F" },
  "text-primary": { type: "color", value: "#F8FAFC" },
  "text-muted": { type: "color", value: "#94A3B8" },
  accent: { type: "color", value: "#38BDF8" },
  "accent-secondary": { type: "color", value: "#A78BFA" },
  border: { type: "color", value: "#FFFFFF2E" },
  "card-bg": { type: "color", value: "#FFFFFF14" },
  "card-hover": { type: "color", value: "#FFFFFF24" },
  "radius-md": { type: "number", value: 20 },
  shadow: { type: "string", value: "0 8px 32px rgba(0, 0, 0, 0.3)" },
  "font-display": { type: "string", value: "Syne" },
  "font-body": { type: "string", value: "DM Sans" }
}, true)
headerComp=Insert(document,{type:"frame",name:"Component/Header",x:-2000,y:0,reusable:true,layout:"horizontal",width:1152,height:61,alignItems:"center",justifyContent:"space_between",padding:[0,24],fill:"#0F172AB3",stroke:"$border",strokeWidth:{bottom:1},effect:{type:"background_blur",radius:16}})
Insert(headerComp,{type:"text",name:"Logo",fontFamily:"$font-display",fontSize:18,fontWeight:"700",fill:"$text-primary",content:"Resume"})
nav=Insert(headerComp,{type:"frame",name:"Nav",layout:"horizontal",gap:24,alignItems:"center"})
Insert(nav,{type:"text",name:"Nav Item",fontFamily:"$font-body",fontSize:14,fill:"$text-muted",content:"首页 · 关于 · 项目 · 联系"})
headerMobile=Insert(document,{type:"frame",name:"Component/HeaderMobile",x:-2000,y:100,reusable:true,layout:"horizontal",width:390,height:61,alignItems:"center",justifyContent:"space_between",padding:[0,16],fill:"#0F172ACC",stroke:"$border",strokeWidth:{bottom:1},effect:{type:"background_blur",radius:16}})
Insert(headerMobile,{type:"text",name:"Logo",fontFamily:"$font-display",fontSize:18,fontWeight:"700",fill:"$text-primary",content:"Resume"})
Insert(headerMobile,{type:"text",name:"Menu",fontFamily:"$font-body",fontSize:14,fill:"$text-primary",content:"菜单"})
footerComp=Insert(document,{type:"frame",name:"Component/Footer",x:-2000,y:200,reusable:true,layout:"vertical",width:1152,gap:8,padding:[32,16],alignItems:"center",stroke:"$border",strokeWidth:{top:1}})
Insert(footerComp,{type:"text",name:"Copyright",fontFamily:"$font-body",fontSize:14,fill:"$text-muted",content:"© 2026 Resume Portfolio"})
sectionTitle=Insert(document,{type:"frame",name:"Component/SectionTitle",x:-2000,y:320,reusable:true,layout:"vertical",width:1152,gap:12})
Insert(sectionTitle,{type:"text",name:"Title",fontFamily:"$font-display",fontSize:36,fontWeight:"700",fill:"$accent",content:"区块标题"})
Insert(sectionTitle,{type:"text",name:"Subtitle",fontFamily:"$font-body",fontSize:16,fill:"$text-muted",content:"区块副标题"})
glassCard=Insert(document,{type:"frame",name:"Component/GlassCard",x:-2000,y:480,reusable:true,layout:"vertical",width:400,gap:16,padding:24,fill:"$card-bg",stroke:"$border",strokeWidth:1,cornerRadius:"$radius-md",effect:{type:"background_blur",radius:16}})
Insert(glassCard,{type:"text",name:"Card Placeholder",fontFamily:"$font-body",fontSize:14,fill:"$text-muted",content:"玻璃卡片"})
projectCard=Insert(document,{type:"frame",name:"Component/ProjectCard",x:-2000,y:640,reusable:true,layout:"vertical",width:360,gap:12,padding:24,fill:"$card-bg",stroke:"$border",strokeWidth:1,cornerRadius:"$radius-md",effect:{type:"background_blur",radius:12}})
Insert(projectCard,{type:"text",name:"Title",fontFamily:"$font-body",fontSize:18,fontWeight:"600",fill:"$text-primary",content:"项目名称"})
Insert(projectCard,{type:"text",name:"Desc",fontFamily:"$font-body",fontSize:14,fill:"$text-muted",content:"项目描述"})
contactCard=Insert(document,{type:"frame",name:"Component/ContactCard",x:-2000,y:820,reusable:true,layout:"vertical",width:260,gap:8,padding:24,fill:"$card-bg",stroke:"$border",strokeWidth:1,cornerRadius:"$radius-md",alignItems:"center",effect:{type:"background_blur",radius:12}})
Insert(contactCard,{type:"text",name:"Label",fontFamily:"$font-body",fontSize:14,fill:"$text-muted",content:"邮箱"})
Insert(contactCard,{type:"text",name:"Value",fontFamily:"$font-body",fontSize:16,fontWeight:"600",fill:"$text-primary",content:"hello@example.com"})
btnPrimary=Insert(document,{type:"frame",name:"Component/ButtonPrimary",x:-2000,y:980,reusable:true,layout:"horizontal",padding:[12,24],fill:"$accent",cornerRadius:"$radius-md",alignItems:"center"})
Insert(btnPrimary,{type:"text",name:"Label",fontFamily:"$font-body",fontSize:14,fontWeight:"600",fill:"#0F172A",content:"主要按钮"})
btnSecondary=Insert(document,{type:"frame",name:"Component/ButtonSecondary",x:-2000,y:1060,reusable:true,layout:"horizontal",padding:[12,24],stroke:"$border",strokeWidth:1,cornerRadius:"$radius-md",alignItems:"center"})
Insert(btnSecondary,{type:"text",name:"Label",fontFamily:"$font-body",fontSize:14,fill:"$text-primary",content:"次要按钮"})
badge=Insert(document,{type:"frame",name:"Component/PlaceholderBadge",x:-2000,y:1140,reusable:true,layout:"horizontal",padding:[6,12],fill:"$card-hover",stroke:"$border",strokeWidth:1,cornerRadius:999})
Insert(badge,{type:"text",name:"Label",fontFamily:"$font-body",fontSize:12,fill:"$text-muted",content:"待补充"})
themeSwitcher=Insert(document,{type:"frame",name:"Component/ThemeSwitcher",x:-2000,y:1220,reusable:true,layout:"horizontal",gap:8,padding:8,fill:"$card-bg",stroke:"$border",strokeWidth:1,cornerRadius:"$radius-md",effect:{type:"background_blur",radius:12}})
Insert(themeSwitcher,{type:"text",name:"Label",fontFamily:"$font-body",fontSize:12,fill:"$text-muted",content:"Dark · Glass · Brutalist"})
desktop=Insert(document,{type:"frame",name:"Desktop",x:0,y:0,width:1440,height:5008,layout:"vertical",fill:"$bg",clip:false})
bg=Insert(desktop,{type:"frame",name:"Background",width:1440,height:5008,layout:"none",layoutPosition:"absolute",x:0,y:0})
Insert(bg,{type:"ellipse",name:"Blur Sky",x:-128,y:80,width:384,height:384,fill:"#0EA5E933",effect:{type:"blur",radius:64}})
Insert(bg,{type:"ellipse",name:"Blur Violet",x:1100,y:3200,width:320,height:320,fill:"#8B5CF633",effect:{type:"blur",radius:64}})
Insert(desktop,{type:"ref",ref:headerComp,name:"Header",width:"fill_container"})
hero=Insert(desktop,{type:"frame",name:"Hero",width:"fill_container",layout:"vertical",padding:[96,32,80,32],gap:32,alignItems:"center"})
Insert(hero,{type:"text",name:"Headline",fontFamily:"$font-display",fontSize:72,fontWeight:"800",fill:"$text-primary",textAlign:"center",content:"测试开发工程师"})
Insert(hero,{type:"ref",ref:btnPrimary,name:"CTA Primary"})
Insert(desktop,{type:"ref",ref:sectionTitle,name:"About Title"})
Insert(desktop,{type:"ref",ref:glassCard,name:"About Card",width:1152})
Insert(desktop,{type:"ref",ref:sectionTitle,name:"Projects Title"})
Insert(desktop,{type:"ref",ref:projectCard,name:"Project 1"})
Insert(desktop,{type:"ref",ref:footerComp,name:"Footer",width:"fill_container"})
Insert(desktop,{type:"ref",ref:themeSwitcher,name:"Theme Switcher"})
mobile=Insert(document,{type:"frame",name:"Mobile",x:1600,y:0,width:390,height:7187,layout:"vertical",fill:"$bg",clip:false})
Insert(mobile,{type:"ref",ref:headerMobile,name:"Header Mobile",width:"fill_container"})
mHero=Insert(mobile,{type:"frame",name:"Hero",width:"fill_container",layout:"vertical",padding:[96,16,48,16],gap:24,alignItems:"center"})
Insert(mHero,{type:"text",name:"Headline",fontFamily:"$font-display",fontSize:48,fontWeight:"800",fill:"$text-primary",textAlign:"center",content:"测试开发工程师"})
Insert(mobile,{type:"ref",ref:sectionTitle,name:"About Title",width:358})
Insert(mobile,{type:"ref",ref:glassCard,name:"About Card",width:358})
Insert(mobile,{type:"ref",ref:footerComp,name:"Footer",width:"fill_container"})
Insert(mobile,{type:"ref",ref:themeSwitcher,name:"Theme Switcher"})
